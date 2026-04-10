import { useState, useEffect, useRef, useCallback } from 'react'
import {
  collection, addDoc, onSnapshot, doc, updateDoc,
  serverTimestamp, orderBy, query, where, getDocs
} from 'firebase/firestore'
import { db } from '../firebase/config'
import './Notebook.css'

const SUBJECTS = ['不限科目', '语文', '数学', '英语', '物理', '化学', '历史', '地理']

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
  const isStreamingRef = useRef(false)
  const recognitionRef = useRef(null)
  const textareaRef = useRef(null)

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  // Real-time sync from Firestore (skip during streaming)
  useEffect(() => {
    if (!threadId) return
    return onSnapshot(doc(db, 'questions', threadId), snap => {
      if (isStreamingRef.current) return // don't overwrite during streaming
      const data = snap.data()
      if (data?.messages) setMessages(data.messages)
    })
  }, [threadId])

  // Send message
  async function sendMessage() {
    const text = inputText.trim()
    if (!text || isStreaming) return
    setInputText('')

    const userName = user.email.split('@')[0]
    const userMsg = { role: 'user', content: text, userName, time: Date.now() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)

    // Save/create thread
    let tid = threadId
    if (!tid) {
      const docRef = await addDoc(collection(db, 'questions'), {
        userId: user.uid,
        userName,
        subject,
        content: text,
        status: 'open',
        messages: newMessages,
        createdAt: serverTimestamp(),
      })
      tid = docRef.id
      setThreadId(tid)
    } else {
      await updateDoc(doc(db, 'questions', tid), { messages: newMessages })
    }

    // Stream AI response
    setIsStreaming(true)
    isStreamingRef.current = true
    setStreamingText('')

    try {
      const res = await fetch('/api/claude-stream', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, subject }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buf = ''
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buf += decoder.decode(value, { stream: true })
        const lines = buf.split('\n')
        buf = lines.pop() || ''
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') break
          try {
            const ev = JSON.parse(data)
            if (ev.text) {
              fullText += ev.text
              setStreamingText(fullText)
            } else if (ev.error) {
              fullText = `⚠️ ${ev.error}`
              setStreamingText(fullText)
            }
          } catch { /* ignore */ }
        }
      }

      // Finalize AI message
      const aiMsg = { role: 'ai', content: fullText, time: Date.now() }
      const finalMessages = [...newMessages, aiMsg]
      setMessages(finalMessages)
      setStreamingText('')

      await updateDoc(doc(db, 'questions', tid), { messages: finalMessages })

      // TTS
      if (ttsEnabled && fullText && window.speechSynthesis) {
        const utter = new window.SpeechSynthesisUtterance(fullText)
        utter.lang = 'zh-CN'
        utter.rate = 0.9
        window.speechSynthesis.speak(utter)
      }
    } catch (e) {
      const errMsg = { role: 'ai', content: `⚠️ ${e.message || '未知错误'}`, time: Date.now() }
      const finalMessages = [...newMessages, errMsg]
      setMessages(finalMessages)
      setStreamingText('')
    }

    isStreamingRef.current = false
    setIsStreaming(false)
  }

  // Voice input
  function toggleVoice() {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('您的浏览器不支持语音输入，请手动输入')
      return
    }

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

  // New conversation
  function newChat() {
    setMessages([])
    setStreamingText('')
    setThreadId(null)
    setInputText('')
    setIsStreaming(false)
    isStreamingRef.current = false
  }

  // Load history
  async function loadHistory() {
    setShowHistory(true)
    setHistoryLoading(true)
    try {
      const q = query(
        collection(db, 'questions'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      )
      const snap = await getDocs(q)
      setHistoryList(snap.docs.map(d => ({ id: d.id, ...d.data() })))
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

  // Handle textarea auto-grow
  function handleInputChange(e) {
    setInputText(e.target.value)
    const ta = textareaRef.current
    if (ta) {
      ta.style.height = 'auto'
      ta.style.height = Math.min(ta.scrollHeight, 100) + 'px'
    }
  }

  // Handle Enter key
  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
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
                  {thread.createdAt?.toDate?.()?.toLocaleDateString?.('zh-CN') || ''}
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
      {/* Top bar */}
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
          <button className="topbar-icon-btn" onClick={loadHistory} title="历史记录">
            📋
          </button>
          <button className="topbar-icon-btn" onClick={newChat} title="新对话">
            ✏️
          </button>
        </div>
      </div>

      {/* Subject selector */}
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

      {/* Messages area */}
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
            <div className="msg-avatar">
              {m.role === 'ai' ? '👩‍🏫' : '👤'}
            </div>
            <div className={`msg-bubble ${m.role === 'ai' ? 'bubble-ai' : 'bubble-user'}`}>
              {m.content}
            </div>
          </div>
        ))}

        {/* Streaming message */}
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

      {/* Input bar */}
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
