import { useState, useEffect, useRef } from 'react'
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
  const [isListening, setIsListening] = useState(false)
  const [ttsEnabled, setTtsEnabled] = useState(true)

  const bottomRef = useRef(null)
  const recognitionRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  async function sendMessage() {
    const text = inputText.trim()
    if (!text || isStreaming) return
    setInputText('')

    const userMsg = { role: 'user', content: text, time: Date.now() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)

    setIsStreaming(true)
    setStreamingText('')

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'speaking_tutor',
          payload: { messages: newMessages, level },
        }),
      })

      const data = await res.json()
      if (data.error) throw new Error(data.error)
      const fullText = data.text || ''

      // Typing animation — same 18ms pattern as Notebook.jsx
      for (let i = 1; i <= fullText.length; i++) {
        setStreamingText(fullText.slice(0, i))
        await new Promise(r => setTimeout(r, 18))
      }

      const aiMsg = { role: 'ai', content: fullText, time: Date.now() }
      setMessages([...newMessages, aiMsg])
      setStreamingText('')

      if (ttsEnabled && fullText && window.speechSynthesis) {
        const utter = new window.SpeechSynthesisUtterance(fullText)
        utter.lang = 'en-US'
        utter.rate = 0.9
        window.speechSynthesis.speak(utter)
      }
    } catch (e) {
      const detail = e.message || 'Unknown error'
      const errMsg = { role: 'ai', content: `Oops! Something went wrong: ${detail}`, time: Date.now() }
      setMessages([...newMessages, errMsg])
      setStreamingText('')
    }

    setIsStreaming(false)
  }

  function toggleVoice() {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Your browser does not support voice input. Please type instead.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.continuous = false
    recognition.interimResults = true
    recognition.onresult = e => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join('')
      setInputText(transcript)
    }
    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)
    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }

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
              if (ttsEnabled) window.speechSynthesis?.cancel()
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

      {/* Input bar */}
      <div className="chat-input-bar">
        <button
          className={`mic-btn ${isListening ? 'listening' : ''}`}
          onClick={toggleVoice}
          title={isListening ? 'Stop recording' : 'Speak in English'}
        >
          🎤
        </button>
        <textarea
          ref={textareaRef}
          className="chat-input"
          placeholder="Type or speak in English..."
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={isStreaming}
        />
        <button
          className="send-btn"
          onClick={sendMessage}
          disabled={isStreaming || !inputText.trim()}
        >
          Send
        </button>
      </div>
    </div>
  )
}
