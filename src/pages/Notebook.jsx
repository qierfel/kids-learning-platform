import { useState, useEffect, useRef } from 'react'
import './Notebook.css'

const SUBJECTS = ['不限科目', '语文', '数学', '英语', '物理', '化学', '历史', '地理']

function getToken() { return localStorage.getItem('session_token') }

export default function Notebook({ user }) {
  const [messages, setMessages] = useState([])
  const [subject, setSubject] = useState('不限科目')
  const [inputText, setInputText] = useState('')
  const [streamingText, setStreamingText] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [ttsEnabled, setTtsEnabled] = useState(false)
  const [threadId, setThreadId] = useState(null)
  const [showHistory, setShowHistory] = useState(false)
  const [historyList, setHistoryList] = useState([])
  const [historyLoading, setHistoryLoading] = useState(false)

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

    const userName = user.nickname || user.email.split('@')[0]
    const userMsg = { role: 'user', content: text, userName, time: Date.now() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)

    let tid = threadId

    setIsStreaming(true)
    setStreamingText('')

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ type: 'chat', payload: { messages: newMessages, subject } }),
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
      setStreamingText('')

      // Save to KV
      if (!tid) {
        const saveRes = await fetch('/api/threads', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            action: 'create', token: getToken(),
            userName, subject, content: text, messages: finalMessages,
          }),
        })
        const saveData = await saveRes.json()
        if (saveData.thread) { tid = saveData.thread.id; setThreadId(tid) }
      } else {
        await fetch('/api/threads', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ action: 'update', token: getToken(), id: tid, messages: finalMessages }),
        })
      }

      if (ttsEnabled && fullText && window.speechSynthesis) {
        const utter = new window.SpeechSynthesisUtterance(fullText)
        utter.lang = 'zh-CN'
        utter.rate = 0.9
        window.speechSynthesis.speak(utter)
      }
    } catch (e) {
      const detail = e.message || '未知错误'
      const hint = detail.includes('API key') ? '（请检查服务器 API Key 配置）'
        : detail.includes('Upstream') ? '（AI 服务暂时不可用，请稍后重试）'
        : detail.includes('Failed to fetch') ? '（网络连接失败，请检查网络）'
        : ''
      const errMsg = { role: 'ai', content: `抱歉，出现了错误${hint}：${detail}`, time: Date.now() }
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
    if (!SpeechRecognition) { alert('您的浏览器不支持语音输入，请手动输入'); return }

    const recognition = new SpeechRecognition()
    recognition.lang = subject === '英语' ? 'en-US' : 'zh-CN'
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

  function newChat() {
    setMessages([])
    setStreamingText('')
    setThreadId(null)
    setInputText('')
    setIsStreaming(false)
  }

  async function loadHistory() {
    setShowHistory(true)
    setHistoryLoading(true)
    try {
      const res = await fetch('/api/threads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'list', token: getToken() }),
      })
      const data = await res.json()
      setHistoryList(data.threads || [])
    } catch { /* silent */ }
    setHistoryLoading(false)
  }

  function loadThread(thread) {
    setMessages(thread.messages || [])
    setThreadId(thread.id)
    setSubject(thread.subject || '不限科目')
    setShowHistory(false)
    setStreamingText('')
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

  // History view
  if (showHistory) {
    return (
      <div className="chat-view">
        <div className="chat-topbar">
          <button className="topbar-icon-btn" onClick={() => setShowHistory(false)}>← 返回</button>
          <div className="topbar-title">历史对话</div>
          <div style={{ width: 60 }} />
        </div>
        <div className="history-view">
          {historyLoading && <div className="history-loading">加载中...</div>}
          {!historyLoading && historyList.length === 0 && (
            <div className="history-empty">还没有历史对话</div>
          )}
          {historyList.map(thread => (
            <div key={thread.id} className="history-card" onClick={() => loadThread(thread)}>
              <div className="history-card-top">
                <span className={`subject-pill subject-pill-${thread.subject}`}>{thread.subject || '不限科目'}</span>
                <span className="history-time">
                  {thread.createdAt ? new Date(thread.createdAt).toLocaleDateString('zh-CN') : ''}
                </span>
              </div>
              <div className="history-preview">{thread.content}</div>
              <div className="history-count">💬 {thread.messages?.length || 0} 条消息</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const hasMessages = messages.length > 0

  return (
    <div className="chat-view">
      <div className="chat-topbar">
        <div className="topbar-teacher">
          <div className="teacher-avatar">👩‍🏫</div>
          <div className="teacher-info">
            <div className="teacher-name">晓敏老师</div>
            <div className="teacher-status">资深教师 · 随时在线</div>
          </div>
        </div>
        <div className="topbar-actions">
          <button
            className={`topbar-icon-btn tts-btn ${ttsEnabled ? 'active' : ''}`}
            onClick={() => setTtsEnabled(v => !v)}
            title={ttsEnabled ? '关闭朗读' : '开启朗读'}
          >
            {ttsEnabled ? '🔊' : '🔇'}
          </button>
          <button className="topbar-icon-btn" onClick={loadHistory} title="历史记录">📋</button>
          <button className="topbar-icon-btn" onClick={newChat} title="新对话">✏️</button>
        </div>
      </div>

      <div className="subject-selector">
        {SUBJECTS.map(s => (
          <button
            key={s}
            className={`subject-pill ${subject === s ? 'active' : ''}`}
            onClick={() => setSubject(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="chat-messages">
        {!hasMessages && !isStreaming && (
          <div className="chat-welcome">
            <div className="welcome-avatar">👩‍🏫</div>
            <div className="welcome-bubble">
              你好！我是晓敏老师 🌟<br />
              有什么不懂的题目，或者想复习的知识点，都可以问我！<br />
              <small>我会引导你自己找到答案～</small>
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`message message-${m.role === 'ai' ? 'ai' : 'user'}`}>
            <div className="msg-avatar">{m.role === 'ai' ? '👩‍🏫' : '👤'}</div>
            <div className={`msg-bubble ${m.role === 'ai' ? 'bubble-ai' : 'bubble-user'}`}>
              {m.content}
            </div>
          </div>
        ))}

        {isStreaming && (
          <div className="message message-ai">
            <div className="msg-avatar">👩‍🏫</div>
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

      <div className="chat-input-bar">
        <button
          className={`mic-btn ${isListening ? 'listening' : ''}`}
          onClick={toggleVoice}
          title={isListening ? '停止录音' : '语音输入'}
        >
          🎤
        </button>
        <textarea
          ref={textareaRef}
          className="chat-input"
          placeholder="问晓敏老师..."
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
          发送
        </button>
      </div>
    </div>
  )
}
