import { useState, useEffect, useRef } from 'react'
import { ttsSpeak } from '../utils/tts'
import { logActivity } from '../utils/activityLogger'
import './Notebook.css'

const READ_MARKS_KEY = uid => `notebook_read_marks_${uid}`

function updateReadMark(userId, threadId) {
  if (!userId || !threadId) return
  let marks = {}
  try { marks = JSON.parse(localStorage.getItem(READ_MARKS_KEY(userId))) || {} } catch {}
  marks[threadId] = Date.now()
  try { localStorage.setItem(READ_MARKS_KEY(userId), JSON.stringify(marks)) } catch {}
}

const SUBJECTS = ['不限科目', '语文', '数学', '英语', '物理', '化学', '历史', '地理', 'AI编程']

const TEACHER_PROFILES = {
  academic: {
    key: 'academic',
    name: '晓敏老师',
    avatar: '👩‍🏫',
    status: '资深学科老师 · 引导式答疑',
    welcomeLines: ['你好！我是晓敏老师 🌟', '有不会的题目、知识点复习、作业困惑，都可以来问我。'],
    hint: '可以直接发文字，也可以📷拍照上传题目～',
    placeholder: '问晓敏老师…',
  },
  coding: {
    key: 'coding',
    name: '阿创老师',
    avatar: '🤖',
    status: 'AI编程课老师 · 项目开发陪练',
    welcomeLines: ['你好！我是阿创老师 🚀', '想做网页、小游戏或小工具，都可以跟我一起拆项目、定路线、查 bug。'],
    hint: '可以聊项目点子、页面结构、实现步骤，也可以贴代码或截图。',
    placeholder: '和阿创老师聊项目开发…',
  },
}

function getToken() { return localStorage.getItem('session_token') }

// ── 压缩图片到合适大小 ────────────────────────────────────────────────────────
function compressImage(file, maxWidth = 1200, quality = 0.82) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let { width, height } = img
        if (width > maxWidth) { height = Math.round((height * maxWidth) / width); width = maxWidth }
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d').drawImage(img, 0, 0, width, height)
        const dataUrl = canvas.toDataURL('image/jpeg', quality)
        const base64 = dataUrl.split(',')[1]
        resolve({ base64, dataUrl, mediaType: 'image/jpeg' })
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

export default function Notebook({ user }) {
  const [messages, setMessages]       = useState([])
  const [subject, setSubject]         = useState('不限科目')
  const [teacherRole, setTeacherRole] = useState('academic')
  const [inputText, setInputText]     = useState('')
  const [streamingText, setStreamingText] = useState('')
  const [isStreaming, setIsStreaming]  = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [ttsEnabled, setTtsEnabled]   = useState(false)
  const [threadId, setThreadId]       = useState(null)
  const [showHistory, setShowHistory] = useState(false)
  const [historyList, setHistoryList] = useState([])
  const [historyLoading, setHistoryLoading] = useState(false)

  // 图片状态
  const [pendingImage, setPendingImage] = useState(null) // { base64, dataUrl, mediaType }
  const [imageLoading, setImageLoading] = useState(false)

  const bottomRef     = useRef(null)
  const recognitionRef = useRef(null)
  const textareaRef   = useRef(null)
  const fileInputRef  = useRef(null)
  const teacher = TEACHER_PROFILES[teacherRole] || TEACHER_PROFILES.academic

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  // ── 选择/拍摄图片 ──────────────────────────────────────────────────────────
  async function handleImageChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    setImageLoading(true)
    const result = await compressImage(file)
    setPendingImage(result)
    setImageLoading(false)
    // 自动聚焦输入框
    setTimeout(() => textareaRef.current?.focus(), 100)
  }

  function clearImage() {
    setPendingImage(null)
  }

  // ── 发送消息 ───────────────────────────────────────────────────────────────
  async function sendMessage() {
    const text = inputText.trim()
    if ((!text && !pendingImage) || isStreaming) return
    setInputText('')
    if (textareaRef.current) { textareaRef.current.style.height = 'auto' }
    logActivity(user?.uid, { type: 'discussion_ask', subject, moduleKey: 'notebook', count: 1 })

    const userName = user.nickname || user.email.split('@')[0]
    const userMsg = {
      role: 'user',
      content: text,
      image: pendingImage ? { base64: pendingImage.base64, dataUrl: pendingImage.dataUrl, mediaType: pendingImage.mediaType } : null,
      userName,
      time: Date.now(),
    }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setPendingImage(null)

    let tid = threadId
    setIsStreaming(true)
    setStreamingText('')

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ type: 'chat', payload: { messages: newMessages, subject, teacherRole } }),
      })

      const data = await res.json()
      if (data.error) throw new Error(data.error)
      const fullText = data.text || ''

      // 打字动画
      for (let i = 1; i <= fullText.length; i++) {
        setStreamingText(fullText.slice(0, i))
        await new Promise(r => setTimeout(r, 18))
      }

      const aiMsg = { role: 'ai', content: fullText, time: Date.now() }
      const finalMessages = [...newMessages, aiMsg]
      setMessages(finalMessages)
      setStreamingText('')

      // 保存到 KV（图片消息不存 base64，节省空间）
      const msgsToSave = finalMessages.map(m => ({
        ...m,
        image: m.image ? { dataUrl: m.image.dataUrl, mediaType: m.image.mediaType } : null,
      }))

      if (!tid) {
        const saveRes = await fetch('/api/threads', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            action: 'create', token: getToken(),
            userName, subject, teacherRole, content: text || '[图片]', messages: msgsToSave,
          }),
        })
        const saveData = await saveRes.json()
        if (saveData.thread) { tid = saveData.thread.id; setThreadId(tid) }
      } else {
        await fetch('/api/threads', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ action: 'update', token: getToken(), id: tid, teacherRole, messages: msgsToSave }),
        })
      }

      if (ttsEnabled && fullText) {
        ttsSpeak(fullText, { lang: 'zh-CN' }).catch(() => {})
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

  // ── 语音输入 ───────────────────────────────────────────────────────────────
  function toggleVoice() {
    if (isListening) { recognitionRef.current?.stop(); setIsListening(false); return }
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
    setMessages([]); setStreamingText(''); setThreadId(null)
    setInputText(''); setIsStreaming(false); setPendingImage(null)
  }

  async function loadHistory() {
    setShowHistory(true); setHistoryLoading(true)
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
    setMessages(thread.messages || []); setThreadId(thread.id)
    setSubject(thread.subject || '不限科目'); setShowHistory(false)
    setTeacherRole(thread.teacherRole || 'academic')
    setStreamingText(''); setPendingImage(null)
    updateReadMark(user?.uid, thread.id)
  }

  function handleInputChange(e) {
    setInputText(e.target.value)
    const ta = textareaRef.current
    if (ta) { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 100) + 'px' }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  // ── 历史记录视图 ───────────────────────────────────────────────────────────
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
                <div className="history-card-meta">
                  <span className={`subject-pill subject-pill-${thread.subject}`}>{thread.subject || '不限科目'}</span>
                  <span className={`teacher-tag ${thread.teacherRole === 'coding' ? 'teacher-tag-coding' : ''}`}>
                    {thread.teacherRole === 'coding' ? '🤖 AI编程老师' : '👩‍🏫 学科老师'}
                  </span>
                </div>
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
  const canSend = (inputText.trim() || pendingImage) && !isStreaming

  return (
    <div className="chat-view">
      {/* 顶栏 */}
      <div className="chat-topbar">
        <div className="topbar-teacher">
          <div className={`teacher-avatar ${teacherRole === 'coding' ? 'teacher-avatar-coding' : ''}`}>{teacher.avatar}</div>
          <div className="teacher-info">
            <div className="teacher-name">{teacher.name}</div>
            <div className="teacher-status">{teacher.status}</div>
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

      <div className="teacher-selector">
        {Object.values(TEACHER_PROFILES).map(profile => (
          <button
            key={profile.key}
            className={`teacher-pill ${teacherRole === profile.key ? 'active' : ''}`}
            onClick={() => setTeacherRole(profile.key)}
          >
            <span className="teacher-pill-avatar">{profile.avatar}</span>
            <span>{profile.name}</span>
          </button>
        ))}
      </div>

      {/* 科目选择 */}
      <div className="subject-selector">
        {SUBJECTS.map(s => (
          <button key={s} className={`subject-pill ${subject === s ? 'active' : ''}`} onClick={() => setSubject(s)}>
            {s}
          </button>
        ))}
      </div>

      {/* 消息列表 */}
      <div className="chat-messages">
        {!hasMessages && !isStreaming && (
          <div className="chat-welcome">
            <div className={`welcome-avatar ${teacherRole === 'coding' ? 'welcome-avatar-coding' : ''}`}>{teacher.avatar}</div>
            <div className="welcome-bubble">
              {teacher.welcomeLines.map((line, idx) => <div key={idx}>{line}</div>)}
              <small>{teacher.hint}</small>
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`message message-${m.role === 'ai' ? 'ai' : 'user'}`}>
            <div className={`msg-avatar ${m.role === 'ai' && teacherRole === 'coding' ? 'msg-avatar-coding' : ''}`}>{m.role === 'ai' ? teacher.avatar : '👤'}</div>
            <div className={`msg-bubble ${m.role === 'ai' ? 'bubble-ai' : 'bubble-user'}`}>
              {/* 图片气泡 */}
              {m.image?.dataUrl && (
                <img
                  src={m.image.dataUrl}
                  alt="题目图片"
                  className="msg-image"
                  onClick={() => window.open(m.image.dataUrl)}
                />
              )}
              {/* 文字内容 */}
              {m.content && <div className={m.image?.dataUrl ? 'msg-text-below-image' : ''}>{m.content}</div>}
            </div>
          </div>
        ))}

        {isStreaming && (
          <div className="message message-ai">
            <div className={`msg-avatar ${teacherRole === 'coding' ? 'msg-avatar-coding' : ''}`}>{teacher.avatar}</div>
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

      {/* 图片预览区 */}
      {(pendingImage || imageLoading) && (
        <div className="image-preview-bar">
          {imageLoading ? (
            <div className="image-preview-loading">⏳ 处理图片…</div>
          ) : (
            <>
              <img src={pendingImage.dataUrl} alt="待发送" className="image-preview-thumb" />
              <div className="image-preview-info">
                <span className="image-preview-label">📷 已添加图片</span>
                <span className="image-preview-hint">可以补充文字说明，然后发送</span>
              </div>
              <button className="image-preview-del" onClick={clearImage}>✕</button>
            </>
          )}
        </div>
      )}

      {/* 输入栏 */}
      <div className="chat-input-bar">
        {/* 隐藏的文件输入 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />

        {/* 拍照/上传按钮 */}
        <button
          className={`camera-btn ${pendingImage ? 'has-image' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          title="拍照传题"
          disabled={isStreaming || imageLoading}
        >
          📷
        </button>

        {/* 语音按钮 */}
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
          placeholder={pendingImage ? '补充说明（可选），然后发送…' : teacher.placeholder}
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={isStreaming}
        />
        <button
          className="send-btn"
          onClick={sendMessage}
          disabled={!canSend}
        >
          发送
        </button>
      </div>
    </div>
  )
}
