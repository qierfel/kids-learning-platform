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
  const [isVoiceMode, setIsVoiceMode] = useState(false)
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

  // Keep refs in sync with state
  useEffect(() => { messagesRef.current = messages }, [messages])
  useEffect(() => { isStreamingRef.current = isStreaming }, [isStreaming])
  useEffect(() => { levelRef.current = level }, [level])
  useEffect(() => { ttsEnabledRef.current = ttsEnabled }, [ttsEnabled])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  // ── Core send (accepts override text for voice auto-send) ─────────────────
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

      // Typing animation
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
        // TTS plays → after it ends, restart listening if still in voice mode
        setIsSpeaking(true)
        ttsSpeak(fullText, {
          onEnd: () => {
            setIsSpeaking(false)
            if (voiceModeRef.current) {
              setTimeout(() => startRecognition(), 300)
            }
          },
        }).catch(() => {
          setIsSpeaking(false)
          if (voiceModeRef.current) setTimeout(() => startRecognition(), 300)
        })
      } else {
        // TTS disabled — restart listening right away
        if (voiceModeRef.current) {
          setTimeout(() => startRecognition(), 300)
        }
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
      // Try restarting voice conversation after error
      if (voiceModeRef.current) {
        setTimeout(() => startRecognition(), 1500)
      }
    }
  }

  // ── Start a recognition round ─────────────────────────────────────────────
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
        if (result.isFinal) {
          finalTranscript += result[0].transcript
        } else {
          interim += result[0].transcript
        }
      }
      setInterimText(finalTranscript || interim)
    }

    recognition.onerror = e => {
      errorHandled = true
      setIsListening(false)
      setInterimText('')
      // 'no-speech' = silence timeout → restart quietly
      if (e.error === 'no-speech' && voiceModeRef.current) {
        setTimeout(() => startRecognition(), 600)
      }
      // other errors (aborted, network) → stop voice mode
    }

    recognition.onend = () => {
      setIsListening(false)
      setInterimText('')
      if (errorHandled) return // already handled above
      const transcript = finalTranscript.trim()
      if (transcript && voiceModeRef.current) {
        sendMessage(transcript)
      } else if (voiceModeRef.current && !isStreamingRef.current) {
        // Nothing said — restart listening
        setTimeout(() => startRecognition(), 600)
      }
    }

    recognitionRef.current = recognition
    try {
      recognition.start()
      setIsListening(true)
    } catch {
      // ignore "already started" errors
    }
  }

  // ── Toggle voice conversation mode ────────────────────────────────────────
  function toggleVoiceMode() {
    if (isVoiceMode) {
      voiceModeRef.current = false
      setIsVoiceMode(false)
      recognitionRef.current?.stop()
      ttsStop()
      setIsListening(false)
      setIsSpeaking(false)
      setInterimText('')
    } else {
      if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
        alert('Voice recognition is not supported in your browser. Please use Chrome.')
        return
      }
      voiceModeRef.current = true
      setIsVoiceMode(true)
      ttsStop()
      setIsSpeaking(false)
      startRecognition()
    }
  }

  // ── Text input helpers ────────────────────────────────────────────────────
  function handleInputChange(e) {
    setInputText(e.target.value)
    const ta = textareaRef.current
    if (ta) {
      ta.style.height = 'auto'
      ta.style.height = Math.min(ta.scrollHeight, 100) + 'px'
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  // ── Mic button state ──────────────────────────────────────────────────────
  const micState = isVoiceMode
    ? isSpeaking   ? 'voice-speaking'
    : isStreaming  ? 'voice-thinking'
    : isListening  ? 'listening'
    : 'voice-idle'
    : ''

  const micIcon = isVoiceMode
    ? isSpeaking   ? '🔊'
    : isStreaming  ? '💭'
    : isListening  ? '🎙️'
    : '⏸'
    : '🎤'

  const hasMessages = messages.length > 0

  return (
    <div className="chat-view">
      {/* Top bar */}
      <div className="chat-topbar">
        <div className="topbar-teacher">
          {onBack && (
            <button className="topbar-icon-btn speaking-back-btn" onClick={onBack} title="Go back">
              ←
            </button>
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
            onClick={() => {
              if (ttsEnabled) ttsStop()
              setTtsEnabled(v => !v)
            }}
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
            <div className="msg-avatar">
              {m.role === 'ai' ? '🧑‍🏫' : '👤'}
            </div>
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
                : <div className="thinking"><span /><span /><span /></div>
              }
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Voice status banner (shown above input when in voice mode) */}
      {isVoiceMode && (
        <div className="voice-status-bar">
          {isListening ? (
            <div className="voice-status-row">
              <span className="voice-dot voice-dot--listening" />
              <span className="voice-status-text">
                {interimText ? `"${interimText}"` : 'Listening…'}
              </span>
            </div>
          ) : isStreaming ? (
            <div className="voice-status-row">
              <div className="thinking thinking--inline"><span /><span /><span /></div>
              <span className="voice-status-text">Emma is thinking…</span>
            </div>
          ) : isSpeaking ? (
            <div className="voice-status-row">
              <span className="voice-dot voice-dot--speaking" />
              <span className="voice-status-text">Emma is speaking…</span>
            </div>
          ) : (
            <div className="voice-status-row">
              <span className="voice-dot voice-dot--idle" />
              <span className="voice-status-text">Tap 🎤 to stop · preparing to listen…</span>
            </div>
          )}
        </div>
      )}

      {/* Input bar */}
      <div className="chat-input-bar">
        <button
          className={`mic-btn ${micState}`}
          onClick={toggleVoiceMode}
          title={isVoiceMode ? 'Exit voice mode' : 'Start voice conversation'}
        >
          {micIcon}
        </button>
        <textarea
          ref={textareaRef}
          className="chat-input"
          placeholder={isVoiceMode ? 'Voice mode active — speak in English…' : 'Type or speak in English…'}
          value={isListening ? interimText : inputText}
          onChange={isListening ? undefined : handleInputChange}
          onKeyDown={isListening ? undefined : handleKeyDown}
          readOnly={isListening}
          rows={1}
          disabled={isStreaming && !isListening}
        />
        <button
          className="send-btn"
          onClick={() => sendMessage()}
          disabled={isStreaming || isListening || !inputText.trim()}
        >
          Send
        </button>
      </div>
    </div>
  )
}
