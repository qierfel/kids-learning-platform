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

export default function Speaking({ user, onBack }) {
  const [messages, setMessages] = useState([])
  const [level, setLevel] = useState('KET')
  const [inputText, setInputText] = useState('')
  const [streamingText, setStreamingText] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [isVoiceCall, setIsVoiceCall] = useState(false)   // phone-call UI mode
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [interimText, setInterimText] = useState('')
  const [ttsEnabled, setTtsEnabled] = useState(true)

  const bottomRef = useRef(null)
  const textareaRef = useRef(null)
  const recognitionRef = useRef(null)

  // Refs that stay current inside async/event callbacks
  const voiceModeRef = useRef(false)
  const messagesRef = useRef([])
  const isStreamingRef = useRef(false)
  const levelRef = useRef('KET')
  const ttsEnabledRef = useRef(true)

  useEffect(() => { messagesRef.current = messages }, [messages])
  useEffect(() => { isStreamingRef.current = isStreaming }, [isStreaming])
  useEffect(() => { levelRef.current = level }, [level])
  useEffect(() => { ttsEnabledRef.current = ttsEnabled }, [ttsEnabled])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  // ── Core send ─────────────────────────────────────────────────────────────
  async function sendMessage(textOverride) {
    const text = (textOverride !== undefined ? textOverride : inputText).trim()
    if (!text || isStreamingRef.current) return

    setInputText('')
    setInterimText('')

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

      // Only animate text in chat mode; in voice-call mode skip straight to TTS
      if (!voiceModeRef.current) {
        for (let i = 1; i <= fullText.length; i++) {
          setStreamingText(fullText.slice(0, i))
          await new Promise(r => setTimeout(r, 18))
        }
      }

      const aiMsg = { role: 'ai', content: fullText, time: Date.now() }
      const finalMessages = [...newMessages, aiMsg]
      setMessages(finalMessages)
      messagesRef.current = finalMessages
      setStreamingText('')
      setIsStreaming(false)
      isStreamingRef.current = false

      if (ttsEnabledRef.current && fullText) {
        setIsSpeaking(true)
        ttsSpeak(fullText, {
          onEnd: () => {
            setIsSpeaking(false)
            if (voiceModeRef.current) setTimeout(() => startRecognition(), 300)
          },
        }).catch(() => {
          setIsSpeaking(false)
          if (voiceModeRef.current) setTimeout(() => startRecognition(), 300)
        })
      } else if (voiceModeRef.current) {
        setTimeout(() => startRecognition(), 300)
      }
    } catch (e) {
      const detail = e.message || 'Unknown error'
      const errMsg = { role: 'ai', content: `Oops! Something went wrong: ${detail}`, time: Date.now() }
      const errMessages = [...newMessages, errMsg]
      setMessages(errMessages)
      messagesRef.current = errMessages
      setStreamingText('')
      setIsStreaming(false)
      isStreamingRef.current = false
      if (voiceModeRef.current) setTimeout(() => startRecognition(), 1500)
    }
  }

  // ── Recognition ───────────────────────────────────────────────────────────
  function startRecognition() {
    if (!voiceModeRef.current || isStreamingRef.current) return

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.continuous = false
    recognition.interimResults = true

    let finalTranscript = ''
    let errorHandled = false

    recognition.onresult = e => {
      let interim = ''
      finalTranscript = ''
      for (const result of e.results) {
        if (result.isFinal) finalTranscript += result[0].transcript
        else interim += result[0].transcript
      }
      setInterimText(finalTranscript || interim)
    }

    recognition.onerror = e => {
      errorHandled = true
      setIsListening(false)
      setInterimText('')
      if (e.error === 'no-speech' && voiceModeRef.current) {
        setTimeout(() => startRecognition(), 600)
      }
    }

    recognition.onend = () => {
      setIsListening(false)
      setInterimText('')
      if (errorHandled) return
      const transcript = finalTranscript.trim()
      if (transcript && voiceModeRef.current) {
        sendMessage(transcript)
      } else if (voiceModeRef.current && !isStreamingRef.current) {
        setTimeout(() => startRecognition(), 600)
      }
    }

    recognitionRef.current = recognition
    try { recognition.start(); setIsListening(true) } catch { /* ignore */ }
  }

  // ── Start / end voice call ────────────────────────────────────────────────
  function startVoiceCall() {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert('请使用 Chrome 浏览器以支持语音功能。Safari 暂不支持实时语音识别。')
      return
    }
    voiceModeRef.current = true
    setIsVoiceCall(true)
    ttsStop()
    setIsSpeaking(false)
    startRecognition()
  }

  function endVoiceCall() {
    voiceModeRef.current = false
    setIsVoiceCall(false)
    recognitionRef.current?.stop()
    ttsStop()
    setIsListening(false)
    setIsSpeaking(false)
    setInterimText('')
  }

  // ── Text input helpers ────────────────────────────────────────────────────
  function handleInputChange(e) {
    setInputText(e.target.value)
    const ta = textareaRef.current
    if (ta) { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 100) + 'px' }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const hasMessages = messages.length > 0

  // ── Voice call UI (phone-call style) ──────────────────────────────────────
  if (isVoiceCall) {
    const callStatus = isSpeaking  ? { label: 'Emma is speaking…',  sub: 'Listen carefully',     icon: '🔊', cls: 'vc-speaking' }
                     : isStreaming ? { label: 'Emma is thinking…',   sub: 'Just a moment',         icon: '💭', cls: 'vc-thinking' }
                     : isListening ? { label: 'Listening…',          sub: interimText || 'Speak now', icon: '🎙️', cls: 'vc-listening' }
                     :               { label: 'Getting ready…',      sub: 'Almost there',          icon: '⏳', cls: '' }

    return (
      <div className="vc-overlay">
        {/* Exit button */}
        <button className="vc-exit-btn" onClick={endVoiceCall}>✕ 退出对话</button>

        {/* Level selector */}
        <div className="vc-level-row">
          {LEVELS.map(l => (
            <button
              key={l.value}
              className={`vc-level-btn ${level === l.value ? 'active' : ''}`}
              onClick={() => setLevel(l.value)}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Emma avatar */}
        <div className={`vc-avatar-wrap ${callStatus.cls}`}>
          <div className="vc-avatar-ring" />
          <div className="vc-avatar">🧑‍🏫</div>
        </div>

        <div className="vc-name">Emma Teacher</div>

        {/* Status */}
        <div className="vc-status-label">{callStatus.icon} {callStatus.label}</div>
        {callStatus.sub && (
          <div className="vc-status-sub">{callStatus.sub}</div>
        )}

        {/* Big hang-up style end button */}
        <button className="vc-hangup-btn" onClick={endVoiceCall}>
          📵
        </button>
        <div className="vc-hangup-hint">点击结束</div>

        {/* Mute TTS toggle */}
        <button
          className={`vc-mute-btn ${ttsEnabled ? '' : 'muted'}`}
          onClick={() => { if (ttsEnabled) ttsStop(); setTtsEnabled(v => !v) }}
        >
          {ttsEnabled ? '🔊 有声' : '🔇 静音'}
        </button>
      </div>
    )
  }

  // ── Chat UI (default) ──────────────────────────────────────────────────────
  return (
    <div className="chat-view">
      {/* Top bar */}
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

      {/* Level selector */}
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

      {/* Messages */}
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

      {/* Voice call entry banner */}
      <div className="vc-entry-banner" onClick={startVoiceCall}>
        <span className="vc-entry-icon">📞</span>
        <div className="vc-entry-text">
          <div className="vc-entry-title">开始语音对话</div>
          <div className="vc-entry-sub">和 Emma 直接用语音交流，无需打字</div>
        </div>
        <span className="vc-entry-arrow">›</span>
      </div>

      {/* Text input bar */}
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
