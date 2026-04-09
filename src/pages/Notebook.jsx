import { useState, useEffect, useRef } from 'react'
import {
  collection, addDoc, onSnapshot, doc, updateDoc,
  serverTimestamp, orderBy, query
} from 'firebase/firestore'
import { db } from '../firebase/config'
import './Notebook.css'

const SUBJECTS = ['全部', '语文', '数学', '英语', '其他']

export default function Notebook({ user }) {
  const [questions, setQuestions] = useState([])
  const [subject, setSubject] = useState('全部')
  const [selected, setSelected] = useState(null)
  const [showNew, setShowNew] = useState(false)

  useEffect(() => {
    const q = query(collection(db, 'questions'), orderBy('createdAt', 'desc'))
    return onSnapshot(q, snap => {
      setQuestions(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
  }, [])

  const filtered = subject === '全部'
    ? questions
    : questions.filter(q => q.subject === subject)

  if (selected) {
    return (
      <Thread
        question={selected}
        user={user}
        onBack={() => setSelected(null)}
      />
    )
  }

  return (
    <div className="notebook">
      <div className="notebook-header">
        <h2 className="page-title">问题讨论</h2>
        <button className="new-btn" onClick={() => setShowNew(true)}>+ 提问</button>
      </div>

      <div className="subject-tabs">
        {SUBJECTS.map(s => (
          <button
            key={s}
            className={subject === s ? 'subject-tab active' : 'subject-tab'}
            onClick={() => setSubject(s)}
          >{s}</button>
        ))}
      </div>

      {showNew && (
        <NewQuestion
          user={user}
          onClose={() => setShowNew(false)}
          onCreated={q => { setShowNew(false); setSelected(q) }}
        />
      )}

      <div className="question-list">
        {filtered.length === 0 && (
          <p className="empty">还没有问题，点击"提问"开始吧！</p>
        )}
        {filtered.map(q => (
          <div key={q.id} className="question-card" onClick={() => setSelected(q)}>
            <div className="question-card-top">
              <span className={`subject-badge subject-${q.subject}`}>{q.subject}</span>
              <span className={`status-badge ${q.status}`}>{q.status === 'resolved' ? '已解决' : '讨论中'}</span>
            </div>
            <div className="question-content">{q.content}</div>
            <div className="question-meta">
              <span className="question-author">{q.userName}</span>
              <span className="question-count">💬 {q.messages?.length || 0} 条回复</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function NewQuestion({ user, onClose, onCreated }) {
  const [content, setContent] = useState('')
  const [subject, setSubject] = useState('语文')
  const [loading, setLoading] = useState(false)

  async function submit() {
    if (!content.trim()) return
    setLoading(true)
    const userName = user.email.split('@')[0]
    const docRef = await addDoc(collection(db, 'questions'), {
      userId: user.uid,
      userName,
      subject,
      content: content.trim(),
      status: 'open',
      messages: [{ role: 'user', content: content.trim(), userName, time: Date.now() }],
      createdAt: serverTimestamp(),
    })
    // 马上拿到 AI 第一条引导
    const aiText = await askAI(content.trim(), [], subject)
    if (aiText) {
      await updateDoc(doc(db, 'questions', docRef.id), {
        messages: [
          { role: 'user', content: content.trim(), userName, time: Date.now() },
          { role: 'ai', content: aiText, time: Date.now() + 1 },
        ]
      })
    }
    setLoading(false)
    onCreated({ id: docRef.id, userId: user.uid, userName, subject, content: content.trim(), status: 'open', messages: [] })
  }

  return (
    <div className="new-question-panel">
      <div className="new-question-title">提一个问题</div>
      <div className="new-question-subjects">
        {['语文', '数学', '英语', '其他'].map(s => (
          <button
            key={s}
            className={subject === s ? 'subject-tab active' : 'subject-tab'}
            onClick={() => setSubject(s)}
          >{s}</button>
        ))}
      </div>
      <textarea
        className="new-question-input"
        placeholder="把你的问题写在这里，比如：'己'和'已'怎么区分？"
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={3}
      />
      <div className="new-question-actions">
        <button className="cancel-btn" onClick={onClose}>取消</button>
        <button className="submit-btn" onClick={submit} disabled={loading || !content.trim()}>
          {loading ? '提交中...' : '提交'}
        </button>
      </div>
    </div>
  )
}

function Thread({ question, user, onBack }) {
  const [messages, setMessages] = useState(question.messages || [])
  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(false)
  const [resolved, setResolved] = useState(question.status === 'resolved')
  const bottomRef = useRef(null)

  // 实时同步消息
  useEffect(() => {
    return onSnapshot(doc(db, 'questions', question.id), snap => {
      const data = snap.data()
      if (data) {
        setMessages(data.messages || [])
        setResolved(data.status === 'resolved')
      }
    })
  }, [question.id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendReply() {
    if (!reply.trim() || loading) return
    const userName = user.email.split('@')[0]
    const userMsg = { role: 'user', content: reply.trim(), userName, time: Date.now() }
    const newMessages = [...messages, userMsg]
    setReply('')
    setLoading(true)

    await updateDoc(doc(db, 'questions', question.id), { messages: newMessages })

    // AI 回复（带上下文历史）
    const aiText = await askAI(question.content, newMessages, question.subject)
    if (aiText) {
      const aiMsg = { role: 'ai', content: aiText, time: Date.now() }
      await updateDoc(doc(db, 'questions', question.id), { messages: [...newMessages, aiMsg] })
    }
    setLoading(false)
  }

  async function toggleResolved() {
    const newStatus = resolved ? 'open' : 'resolved'
    await updateDoc(doc(db, 'questions', question.id), { status: newStatus })
  }

  return (
    <div className="thread">
      <div className="thread-topbar">
        <button className="back-btn" onClick={onBack}>← 返回</button>
        {user.uid === question.userId && (
          <button
            className={resolved ? 'resolve-btn resolved' : 'resolve-btn'}
            onClick={toggleResolved}
          >
            {resolved ? '✓ 已解决' : '标记解决'}
          </button>
        )}
      </div>

      <div className="thread-question">
        <span className={`subject-badge subject-${question.subject}`}>{question.subject}</span>
        <p className="thread-question-content">{question.content}</p>
        <span className="thread-author">— {question.userName}</span>
      </div>

      <div className="thread-messages">
        {messages.map((m, i) => (
          <div key={i} className={`message message-${m.role}`}>
            <div className="message-header">
              {m.role === 'ai' ? '🤖 AI老师' : `👤 ${m.userName}`}
            </div>
            <div className="message-bubble">{m.content}</div>
          </div>
        ))}
        {loading && (
          <div className="message message-ai">
            <div className="message-header">🤖 AI老师</div>
            <div className="message-bubble thinking">思考中...</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {!resolved && (
        <div className="thread-input-area">
          <textarea
            className="thread-input"
            placeholder="说说你的想法..."
            value={reply}
            onChange={e => setReply(e.target.value)}
            rows={2}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendReply() }
            }}
          />
          <button className="send-btn" onClick={sendReply} disabled={loading || !reply.trim()}>
            发送
          </button>
        </div>
      )}
      {resolved && <p className="resolved-tip">✓ 这个问题已解决</p>}
    </div>
  )
}

async function askAI(question, history, subject) {
  try {
    const res = await fetch('/api/claude', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        type: 'question_guide',
        payload: { question, history, subject },
      }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.text || null
  } catch {
    return null
  }
}
