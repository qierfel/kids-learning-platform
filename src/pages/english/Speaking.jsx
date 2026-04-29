import { useState, useEffect, useRef } from 'react'
import { ttsSpeak, ttsStop } from '../../utils/tts'
import '../Notebook.css'
import './Speaking.css'

const LEVELS = [
  { label: 'Beginner', value: 'KET' },
  { label: 'Elementary', value: 'PET' },
  { label: 'Intermediate', value: 'FCE' },
]

const WELCOME_MESSAGE = `Hi there! I'm Emma, your English tutor! 🌟\nTell me anything in English — I'll help you practice!\nTopic ideas: your day, hobbies, school life...`

const LEVEL_INSTRUCTIONS = {
  KET: 'The student is a beginner (A2). Speak slowly and clearly. Use very simple vocabulary and short sentences. Keep corrections simple and highly encouraging.',
  PET: 'The student is at elementary level (B1). Use common vocabulary at a moderate pace. Gently correct errors and introduce new words occasionally.',
  FCE: 'The student is at intermediate level (B2). Use varied vocabulary at a natural conversational pace. Actively suggest richer expressions and more sophisticated vocabulary.',
}
const BASE_INSTRUCTIONS = `You are Emma, a warm and encouraging English tutor for young learners.
Speak naturally and conversationally. Keep each response to 2-3 sentences, then ask one follow-up question.
React enthusiastically to what the student shares. Never say you are an AI.

Grammar correction: When the student makes a grammar error, gently say the correct version naturally. For example: "Almost! We actually say '[correct version]'" — then continue the conversation.

Expression improvement: When the student uses awkward or unnatural phrasing, offer a better alternative: "You could also say '[natural version]' — it sounds great!"

Vocabulary expansion: Occasionally introduce a useful new word related to the topic. Keep it brief: "By the way, a great word here is '___' — it means ___."

Expression enrichment: When the student uses a very simple sentence, model a richer version: "Nice! You could also say '[expanded version]' — that adds more colour."

Only correct the single most important mistake per turn. Prioritise keeping the conversation flowing naturally over heavy correction.`

export default function Speaking({ user, onBack }) {
  // ── Text chat state ──────────────────────────────────────────────────────
  const [messages, setMessages] = useState([])
  const [level, setLevel] = useState('KET')
  const [inputText, setInputText] = useState('')
  const [streamingText, setStreamingText] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [ttsEnabled, setTtsEnabled] = useState(true)

  // ── Realtime voice state ─────────────────────────────────────────────────
  const [isRealtimeMode, setIsRealtimeMode] = useState(false)
  // idle | connecting | listening | thinking | speaking | error
  const [rtStatus, setRtStatus] = useState('idle')
  const [rtError, setRtError] = useState('')
  const [rtMessages, setRtMessages] = useState([])
  const [rtUserTranscript, setRtUserTranscript] = useState('')
  const [rtAiTranscript, setRtAiTranscript] = useState('')
  const [waveData, setWaveData] = useState(() => new Array(20).fill(2))

  // ── Refs ─────────────────────────────────────────────────────────────────
  const bottomRef = useRef(null)
  const textareaRef = useRef(null)
  const messagesRef = useRef([])
  const isStreamingRef = useRef(false)
  const ttsEnabledRef = useRef(true)
  const levelRef = useRef('KET')

  // Realtime refs
  const pcRef = useRef(null)
  const dcRef = useRef(null)
  const audioElRef = useRef(null)
  const micStreamRef = useRef(null)
  const analyserRef = useRef(null)
  const rafRef = useRef(null)
  const rtAiTranscriptRef = useRef('')
  // Echo-loop guard: mute mic track while Emma is speaking, then re-enable
  // after a small buffer so trailing audio playback doesn't get re-captured.
  const isAiSpeakingRef = useRef(false)
  const unmuteTimerRef = useRef(null)

  useEffect(() => { messagesRef.current = messages }, [messages])
  useEffect(() => { isStreamingRef.current = isStreaming }, [isStreaming])
  useEffect(() => { ttsEnabledRef.current = ttsEnabled }, [ttsEnabled])
  useEffect(() => { levelRef.current = level }, [level])
  useEffect(() => { rtAiTranscriptRef.current = rtAiTranscript }, [rtAiTranscript])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  useEffect(() => () => cleanupRealtime(), [])

  // Push level update to live session when changed mid-call
  useEffect(() => {
    if (!isRealtimeMode || dcRef.current?.readyState !== 'open') return
    dcRef.current.send(JSON.stringify({
      type: 'session.update',
      session: {
        instructions: `${BASE_INSTRUCTIONS}\n\n${LEVEL_INSTRUCTIONS[level]}`,
      },
    }))
  }, [level, isRealtimeMode])

  // ── Waveform (mic input visualiser) ─────────────────────────────────────
  function startWaveform(stream) {
    try {
      const ctx = new AudioContext()
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 64
      ctx.createMediaStreamSource(stream).connect(analyser)
      analyserRef.current = analyser

      const buf = new Uint8Array(analyser.frequencyBinCount)
      const BARS = 20
      const step = Math.max(1, Math.floor(buf.length / BARS))

      function tick() {
        analyser.getByteTimeDomainData(buf)
        const bars = Array.from({ length: BARS }, (_, i) => {
          const v = buf[i * step] - 128
          return Math.max(2, Math.min(40, Math.abs(v) * 1.2))
        })
        setWaveData(bars)
        rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    } catch {
      // waveform is decorative — silently skip on unsupported browsers
    }
  }

  function stopWaveform() {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
    setWaveData(new Array(20).fill(2))
  }

  // ── Realtime cleanup ─────────────────────────────────────────────────────
  function cleanupRealtime() {
    stopWaveform()
    if (unmuteTimerRef.current) { clearTimeout(unmuteTimerRef.current); unmuteTimerRef.current = null }
    isAiSpeakingRef.current = false
    dcRef.current?.close(); dcRef.current = null
    pcRef.current?.close(); pcRef.current = null
    micStreamRef.current?.getTracks().forEach(t => t.stop()); micStreamRef.current = null
    if (audioElRef.current) {
      audioElRef.current.srcObject = null
      audioElRef.current.remove()
      audioElRef.current = null
    }
    analyserRef.current = null
  }

  // Disable the local mic track so Emma's playback (or speaker bleed) can't be
  // captured and shipped back to the server's VAD. WebRTC keeps transmitting
  // silence, so the connection stays alive — only the audio is gated.
  function muteMicForAiSpeech() {
    if (unmuteTimerRef.current) { clearTimeout(unmuteTimerRef.current); unmuteTimerRef.current = null }
    isAiSpeakingRef.current = true
    micStreamRef.current?.getAudioTracks().forEach(t => { t.enabled = false })
  }

  // Re-enable the mic after Emma finishes. The 500 ms delay covers buffered
  // audio still playing through the <audio> element after response.done fires.
  // Also clear any server-side input buffer as a defensive sweep.
  function unmuteMicAfterAiSpeech(delayMs = 500) {
    if (unmuteTimerRef.current) clearTimeout(unmuteTimerRef.current)
    unmuteTimerRef.current = setTimeout(() => {
      isAiSpeakingRef.current = false
      micStreamRef.current?.getAudioTracks().forEach(t => { t.enabled = true })
      if (dcRef.current?.readyState === 'open') {
        try { dcRef.current.send(JSON.stringify({ type: 'input_audio_buffer.clear' })) } catch {}
      }
      unmuteTimerRef.current = null
    }, delayMs)
  }

  // ── Realtime session ─────────────────────────────────────────────────────
  async function startRealtimeSession() {
    setRtError('')
    setRtStatus('connecting')
    setIsRealtimeMode(true)
    setRtMessages([])
    setRtUserTranscript('')
    setRtAiTranscript('')

    let step = '初始化'
    try {
      // 1. Get ephemeral token
      step = '获取会话令牌 (/api/realtime-session)'
      const sessRes = await fetch('/api/realtime-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level }),
      })
      const sessText = await sessRes.text()
      let sessData
      try { sessData = JSON.parse(sessText) } catch {
        throw new Error(`服务器返回非 JSON 响应 (HTTP ${sessRes.status})`)
      }
      if (!sessRes.ok || !sessData.client_secret?.value) {
        throw new Error(sessData.error || `HTTP ${sessRes.status}`)
      }
      const ephemeralKey = sessData.client_secret.value

      // 2. Microphone access — full echo/noise/gain pipeline so Emma's
      // playback isn't captured by the same mic that's feeding the API.
      step = '请求麦克风权限'
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      })
      micStreamRef.current = stream
      startWaveform(stream)

      // 3. RTCPeerConnection
      step = '建立 WebRTC 连接'
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      })
      pcRef.current = pc

      const audioEl = document.createElement('audio')
      audioEl.autoplay = true
      document.body.appendChild(audioEl)
      audioElRef.current = audioEl
      pc.ontrack = e => { audioEl.srcObject = e.streams[0] }
      stream.getTracks().forEach(t => pc.addTrack(t, stream))

      const dc = pc.createDataChannel('oai-events')
      dcRef.current = dc
      dc.onopen = () => setRtStatus('listening')
      dc.onmessage = e => { try { handleRtEvent(JSON.parse(e.data)) } catch {} }
      dc.onerror = () => { setRtError('连接出错，请重试'); setRtStatus('error') }

      // 4. SDP offer
      step = '创建 SDP Offer'
      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)

      // 5. SDP exchange via CF proxy
      step = 'SDP 交换 (/api/realtime-sdp)'
      const sdpRes = await fetch(
        '/api/realtime-sdp?model=gpt-4o-realtime-preview',
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${ephemeralKey}`, 'Content-Type': 'application/sdp' },
          body: offer.sdp,
        }
      )
      const answerSdp = await sdpRes.text()
      if (!sdpRes.ok) throw new Error(`HTTP ${sdpRes.status}: ${answerSdp.slice(0, 120)}`)

      // 6. Set remote description
      step = '设置远程 SDP'
      await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp })

    } catch (e) {
      const msg = e.message || ''
      const name = e.name || ''
      const combined = name + msg
      let errText
      if (/NotAllowedError|SecurityError|Permission denied|not-allowed/i.test(combined)) {
        errText = '麦克风权限被拒绝。\n请在浏览器设置中允许此网站使用麦克风，然后重试。'
      } else if (/NotFoundError|device not found/i.test(combined)) {
        errText = '未找到麦克风设备，\n请确认麦克风已连接。'
      } else if (/NotSupportedError|not supported/i.test(combined)) {
        errText = '当前浏览器不支持 WebRTC 语音功能。\n请使用 Chrome（桌面版）重试。'
      } else {
        errText = `步骤「${step}」失败：\n${name ? name + ': ' : ''}${msg || 'Unknown error'}`
      }
      setRtError(errText)
      setRtStatus('error')
      cleanupRealtime()
    }
  }

  function handleRtEvent(ev) {
    switch (ev.type) {
      case 'input_audio_buffer.speech_started':
        setRtStatus('listening')
        break

      case 'input_audio_buffer.speech_stopped':
        setRtStatus('thinking')
        break

      case 'conversation.item.input_audio_transcription.completed': {
        const t = ev.transcript?.trim()
        if (t) {
          setRtUserTranscript('')
          setRtMessages(prev => [...prev, { role: 'user', content: t, time: Date.now() }])
        }
        break
      }

      case 'conversation.item.input_audio_transcription.delta':
        // Drop any partial transcript that arrives while Emma is speaking —
        // it's almost certainly her own voice echoed through the speakers.
        if (isAiSpeakingRef.current) break
        setRtUserTranscript(prev => prev + (ev.delta || ''))
        break

      case 'response.created':
        muteMicForAiSpeech()
        setRtStatus('thinking')
        setRtAiTranscript('')
        rtAiTranscriptRef.current = ''
        break

      case 'response.audio_transcript.delta':
        setRtStatus('speaking')
        setRtAiTranscript(prev => prev + (ev.delta || ''))
        break

      case 'response.audio_transcript.done': {
        const t = (ev.transcript || rtAiTranscriptRef.current).trim()
        if (t) {
          setRtMessages(prev => [...prev, { role: 'ai', content: t, time: Date.now() }])
          setRtAiTranscript('')
          rtAiTranscriptRef.current = ''
        }
        break
      }

      case 'response.done':
      case 'response.cancelled':
      case 'response.failed':
        unmuteMicAfterAiSpeech()
        setRtStatus('listening')
        break

      case 'error':
        unmuteMicAfterAiSpeech(0)
        setRtError(`API 错误：${ev.error?.message || 'Unknown error'}`)
        setRtStatus('error')
        break
    }
  }

  function stopRealtimeSession() {
    cleanupRealtime()
    setIsRealtimeMode(false)
    setRtStatus('idle')
    setRtUserTranscript('')
    setRtAiTranscript('')
  }

  // ── Text chat ─────────────────────────────────────────────────────────────
  async function sendMessage(textOverride) {
    const text = (textOverride !== undefined ? textOverride : inputText).trim()
    if (!text || isStreamingRef.current) return

    setInputText('')
    const userMsg = { role: 'user', content: text, time: Date.now() }
    const newMessages = [...messagesRef.current, userMsg]
    setMessages(newMessages)
    messagesRef.current = newMessages

    setIsStreaming(true)
    isStreamingRef.current = true
    setStreamingText('')

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'speaking_tutor',
          payload: { messages: newMessages, level: levelRef.current },
        }),
      })

      const data = await res.json()
      if (data.error) throw new Error(data.error)
      const fullText = data.text || ''

      for (let i = 1; i <= fullText.length; i++) {
        setStreamingText(fullText.slice(0, i))
        await new Promise(r => setTimeout(r, 18))
      }

      const aiMsg = { role: 'ai', content: fullText, time: Date.now() }
      const finalMessages = [...newMessages, aiMsg]
      setMessages(finalMessages)
      messagesRef.current = finalMessages
      setStreamingText('')
      setIsStreaming(false)
      isStreamingRef.current = false

      if (ttsEnabledRef.current && fullText) {
        ttsSpeak(fullText).catch(() => {})
      }
    } catch (e) {
      const errMsg = { role: 'ai', content: `Oops! Something went wrong: ${e.message || 'Unknown error'}`, time: Date.now() }
      const errMessages = [...newMessages, errMsg]
      setMessages(errMessages)
      messagesRef.current = errMessages
      setStreamingText('')
      setIsStreaming(false)
      isStreamingRef.current = false
    }
  }

  function handleInputChange(e) {
    setInputText(e.target.value)
    const ta = textareaRef.current
    if (ta) { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 100) + 'px' }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const hasMessages = messages.length > 0

  // ── Realtime voice overlay ─────────────────────────────────────────────
  if (isRealtimeMode) {
    const STATUS_CFG = {
      connecting: { label: 'Connecting…',          sub: 'Setting up your session', icon: '⏳', ring: '' },
      listening:  { label: 'Listening…',            sub: rtUserTranscript || 'Speak now', icon: '🎙️', ring: 'rt-ring-listen' },
      thinking:   { label: 'Thinking…',             sub: 'Just a moment',           icon: '💭', ring: 'rt-ring-think' },
      speaking:   { label: 'Emma is speaking…',     sub: '',                         icon: '🔊', ring: 'rt-ring-speak' },
      error:      { label: 'Error',                 sub: '',                         icon: '❌', ring: '' },
      idle:       { label: 'Ready',                 sub: '',                         icon: '✅', ring: '' },
    }
    const st = STATUS_CFG[rtStatus] || STATUS_CFG.idle

    const displayMsgs = [...rtMessages]
    if (rtUserTranscript) displayMsgs.push({ role: 'user', content: rtUserTranscript, partial: true })
    if (rtAiTranscript)   displayMsgs.push({ role: 'ai',   content: rtAiTranscript,   partial: true })

    return (
      <div className="rt-overlay">
        <button className="rt-exit-btn" onClick={stopRealtimeSession}>✕ 退出对话</button>

        <div className="rt-level-row">
          {LEVELS.map(l => (
            <button
              key={l.value}
              className={`rt-level-btn ${level === l.value ? 'active' : ''}`}
              onClick={() => setLevel(l.value)}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Waveform — shows mic activity */}
        <div className="rt-waveform">
          {waveData.map((h, i) => (
            <div key={i} className="rt-bar" style={{ height: `${h}px` }} />
          ))}
        </div>

        {/* Avatar with ring animation */}
        <div className={`rt-avatar-wrap ${st.ring}`}>
          <div className="rt-avatar">🧑‍🏫</div>
        </div>

        <div className="rt-name">Emma Teacher</div>

        {rtStatus === 'error' ? (
          <div className="rt-error-box">
            {rtError.split('\n').map((ln, i) => <p key={i}>{ln}</p>)}
            <button className="rt-error-close" onClick={stopRealtimeSession}>返回</button>
          </div>
        ) : (
          <>
            <div className="rt-status-label">{st.icon} {st.label}</div>
            {st.sub && <div className="rt-status-sub">{st.sub}</div>}
          </>
        )}

        {/* Conversation transcript */}
        {displayMsgs.length > 0 && (
          <div className="rt-history">
            {displayMsgs.slice(-6).map((m, i) => (
              <div
                key={i}
                className={`rt-history-item rt-history-${m.role}${m.partial ? ' partial' : ''}`}
              >
                <span className="rt-history-who">{m.role === 'ai' ? 'Emma' : 'You'}:</span>
                {' '}{m.content}
              </div>
            ))}
          </div>
        )}

        {rtStatus !== 'error' && (
          <>
            <button className="rt-hangup-btn" onClick={stopRealtimeSession}>📵</button>
            <div className="rt-hangup-hint">点击结束</div>
          </>
        )}
      </div>
    )
  }

  // ── Text chat UI ──────────────────────────────────────────────────────────
  return (
    <div className="chat-view">
      <div className="chat-topbar">
        <div className="topbar-teacher">
          {onBack && (
            <button className="topbar-icon-btn speaking-back-btn" onClick={onBack} title="Go back">←</button>
          )}
          <div className="teacher-avatar speaking-emma-avatar">🧑‍🏫</div>
          <div className="teacher-info">
            <div className="teacher-name">Emma Teacher 🧑‍🏫</div>
            <div className="teacher-status">AI English Tutor · Always Online</div>
          </div>
        </div>
        <div className="topbar-actions">
          <button
            className={`topbar-icon-btn tts-btn ${ttsEnabled ? 'active' : ''}`}
            onClick={() => { if (ttsEnabled) ttsStop(); setTtsEnabled(v => !v) }}
            title={ttsEnabled ? 'Mute Emma' : 'Unmute Emma'}
          >
            {ttsEnabled ? '🔊' : '🔇'}
          </button>
        </div>
      </div>

      <div className="subject-selector speaking-level-selector">
        {LEVELS.map(l => (
          <button
            key={l.value}
            className={`subject-pill speaking-level-pill ${level === l.value ? 'active' : ''}`}
            onClick={() => setLevel(l.value)}
          >
            {l.label}
            <span className="speaking-level-tag">{l.value}</span>
          </button>
        ))}
      </div>

      <div className="chat-messages">
        {!hasMessages && !isStreaming && (
          <div className="chat-welcome">
            <div className="welcome-avatar">🧑‍🏫</div>
            <div className="welcome-bubble speaking-welcome-bubble">
              {WELCOME_MESSAGE.split('\n').map((line, i) => (
                <span key={i}>{line}{i < 2 && <br />}</span>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`message message-${m.role === 'ai' ? 'ai' : 'user'}`}>
            <div className="msg-avatar">{m.role === 'ai' ? '🧑‍🏫' : '👤'}</div>
            <div className={`msg-bubble ${m.role === 'ai' ? 'bubble-ai speaking-bubble-ai' : 'bubble-user speaking-bubble-user'}`}>
              {m.content}
            </div>
          </div>
        ))}

        {isStreaming && (
          <div className="message message-ai">
            <div className="msg-avatar">🧑‍🏫</div>
            <div className="msg-bubble bubble-ai streaming">
              {streamingText
                ? <>{streamingText}<span className="cursor">▋</span></>
                : <div className="thinking"><span /><span /><span /></div>}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Realtime voice entry banner */}
      <div className="vc-entry-banner" onClick={startRealtimeSession}>
        <span className="vc-entry-icon">🎙️</span>
        <div className="vc-entry-text">
          <div className="vc-entry-title">开始实时语音对话</div>
          <div className="vc-entry-sub">AI 语音直接和 Emma 对话，低延迟，更自然</div>
        </div>
        <span className="vc-entry-arrow">›</span>
      </div>

      <div className="chat-input-bar">
        <textarea
          ref={textareaRef}
          className="chat-input"
          placeholder="或者直接打字聊天…"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={isStreaming}
        />
        <button
          className="send-btn"
          onClick={() => sendMessage()}
          disabled={isStreaming || !inputText.trim()}
        >
          Send
        </button>
      </div>
    </div>
  )
}
