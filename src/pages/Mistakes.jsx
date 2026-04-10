import { useState, useEffect, useRef } from 'react'
import {
  collection, addDoc, onSnapshot, doc, updateDoc,
  serverTimestamp, query, where, orderBy
} from 'firebase/firestore'
import { db } from '../firebase/config'
import './Mistakes.css'

const SUBJECTS = ['全部', '语文', '数学', '英语', '物理', '化学', '历史', '地理']

const TOPICS = {
  语文: ['同音字/形近字', '古诗词', '词语填空', '阅读理解', '拼音', '组词造句', '作文', '其他'],
  数学: ['加减法', '乘除法', '分数', '小数', '图形面积/周长', '应用题', '方程', '其他'],
  英语: ['单词拼写', '语法', '阅读理解', '完形填空', '时态', '从句', '其他'],
  物理: ['声学', '光学', '热学', '力学', '电路', '欧姆定律', '电功电热', '磁学', '其他'],
  化学: ['物质构成', '化学方程式', '酸碱盐', '金属', '碳及氧化物', '溶液', '其他'],
  历史: ['中国古代史', '中国近代史', '中国现代史', '世界史', '其他'],
  地理: ['地球与地图', '世界地理', '中国地理', '山西地理', '气候', '人口与资源', '其他'],
}

const STATUS_LABELS = { new: '待复习', reviewing: '复习中', mastered: '已掌握' }
const STATUS_NEXT = { new: 'reviewing', reviewing: 'mastered', mastered: 'new' }

// Image to base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function Mistakes({ user }) {
  const [mistakes, setMistakes] = useState([])
  const [subject, setSubject] = useState('全部')
  const [selected, setSelected] = useState(null)
  const [showAdd, setShowAdd] = useState(false)

  useEffect(() => {
    const q = query(
      collection(db, 'mistakes'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    )
    return onSnapshot(q, snap => {
      setMistakes(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
  }, [user.uid])

  const filtered = subject === '全部' ? mistakes : mistakes.filter(m => m.subject === subject)

  const counts = { new: 0, reviewing: 0, mastered: 0 }
  mistakes.forEach(m => { if (counts[m.status] !== undefined) counts[m.status]++ })

  if (selected) {
    return (
      <MistakeDetail
        mistake={selected}
        user={user}
        onBack={() => setSelected(null)}
        onUpdate={updated => setSelected(updated)}
      />
    )
  }

  return (
    <div className="mistakes">
      <div className="mistakes-header">
        <h2 className="page-title">错题本</h2>
        <button className="new-btn" onClick={() => setShowAdd(true)}>+ 添加错题</button>
      </div>

      <div className="stats-row">
        <div className="stat-card stat-new"><div className="stat-num">{counts.new}</div><div className="stat-label">待复习</div></div>
        <div className="stat-card stat-reviewing"><div className="stat-num">{counts.reviewing}</div><div className="stat-label">复习中</div></div>
        <div className="stat-card stat-mastered"><div className="stat-num">{counts.mastered}</div><div className="stat-label">已掌握</div></div>
      </div>

      <div className="subject-tabs">
        {SUBJECTS.map(s => (
          <button key={s} className={subject === s ? 'subject-tab active' : 'subject-tab'} onClick={() => setSubject(s)}>{s}</button>
        ))}
      </div>

      {showAdd && (
        <AddMistake
          user={user}
          onClose={() => setShowAdd(false)}
          onAdded={m => { setShowAdd(false); setSelected(m) }}
        />
      )}

      <div className="mistake-list">
        {filtered.length === 0 && <p className="empty">这里还没有错题，点击右上角添加</p>}
        {filtered.map(m => (
          <div key={m.id} className="mistake-card" onClick={() => setSelected(m)}>
            <div className="mistake-card-top">
              <span className={`subject-badge subject-${m.subject}`}>{m.subject}</span>
              <span className="topic-badge">{m.topic}</span>
              <span className={`status-badge status-${m.status}`}>{STATUS_LABELS[m.status]}</span>
            </div>
            <div className="mistake-question">{m.question}</div>
            <div className="mistake-answers">
              <span className="wrong-answer">我的答案：{m.myAnswer}</span>
              <span className="right-answer">正确：{m.correctAnswer}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AddMistake({ user, onClose, onAdded }) {
  const [mode, setMode] = useState('photo') // 'photo' | 'manual'
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState('')
  const [ocrLoading, setOcrLoading] = useState(false)
  const [ocrDone, setOcrDone] = useState(false)
  const [ocrResult, setOcrResult] = useState(null)
  const fileInputRef = useRef(null)

  const [subject, setSubject] = useState('语文')
  const [topic, setTopic] = useState(TOPICS['语文'][0])
  const [grade, setGrade] = useState(3)
  const [question, setQuestion] = useState('')
  const [myAnswer, setMyAnswer] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubjectChange(s) {
    setSubject(s)
    setTopic(TOPICS[s][0])
  }

  async function handlePhoto(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
    setOcrDone(false)
    setOcrResult(null)
  }

  async function recognizePhoto() {
    if (!photoFile) return
    setOcrLoading(true)
    try {
      const imageBase64 = await fileToBase64(photoFile)
      const mediaType = photoFile.type || 'image/jpeg'
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ type: 'photo_ocr', payload: { imageBase64, mediaType } }),
      })
      const json = await res.json()
      if (json.parsed) {
        const p = json.parsed
        if (p.subject && TOPICS[p.subject]) { setSubject(p.subject); setTopic(TOPICS[p.subject][0]) }
        if (p.topic) setTopic(p.topic)
        if (p.question) setQuestion(p.question)
        if (p.myAnswer) setMyAnswer(p.myAnswer)
        if (p.correctAnswer) setCorrectAnswer(p.correctAnswer)
        setOcrResult(p)
        setOcrDone(true)
        setMode('manual') // switch to manual mode to let user review/edit
      }
    } catch { /* silent */ }
    setOcrLoading(false)
  }

  async function submit() {
    if (!question.trim() || !myAnswer.trim() || !correctAnswer.trim()) return
    setLoading(true)
    const data = {
      userId: user.uid,
      subject, topic, grade,
      question: question.trim(),
      myAnswer: myAnswer.trim(),
      correctAnswer: correctAnswer.trim(),
      status: 'new',
      explanation: null,
      similarQuestions: null,
      createdAt: serverTimestamp(),
    }
    const docRef = await addDoc(collection(db, 'mistakes'), data)
    setLoading(false)
    onAdded({ id: docRef.id, ...data, createdAt: new Date() })
  }

  return (
    <div className="add-panel">
      <div className="add-panel-title">添加错题</div>

      {/* Mode toggle */}
      <div className="photo-mode-toggle">
        <button
          className={mode === 'photo' ? 'mode-btn active' : 'mode-btn'}
          onClick={() => setMode('photo')}
        >
          📷 拍照识别
        </button>
        <button
          className={mode === 'manual' ? 'mode-btn active' : 'mode-btn'}
          onClick={() => setMode('manual')}
        >
          ✏️ 手动输入
        </button>
      </div>

      {/* Photo mode */}
      {mode === 'photo' && (
        <div className="photo-section">
          {!photoPreview ? (
            <div className="photo-upload-area" onClick={() => fileInputRef.current?.click()}>
              <div className="photo-upload-icon">📸</div>
              <div className="photo-upload-text">点击选择试卷照片</div>
              <div className="photo-upload-hint">支持拍照或从相册选取</div>
              <div className="photo-buttons">
                <button className="photo-btn camera-btn" onClick={e => { e.stopPropagation(); fileInputRef.current?.click() }}>
                  📷 拍照
                </button>
                <button className="photo-btn gallery-btn" onClick={e => { e.stopPropagation(); fileInputRef.current?.click() }}>
                  🖼️ 相册
                </button>
              </div>
            </div>
          ) : (
            <div className="photo-preview-container">
              <img src={photoPreview} alt="试卷照片" className="photo-preview" />
              <div className="photo-actions">
                <button className="photo-btn gallery-btn" onClick={() => fileInputRef.current?.click()}>
                  重新选择
                </button>
                {!ocrLoading && (
                  <button className="photo-btn recognize-btn" onClick={recognizePhoto}>
                    🔍 识别题目
                  </button>
                )}
                {ocrLoading && (
                  <div className="ocr-loading">
                    <span className="ocr-spinner">⏳</span>
                    <span>AI识别中...</span>
                  </div>
                )}
              </div>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: 'none' }}
            onChange={handlePhoto}
          />
        </div>
      )}

      {/* OCR success banner */}
      {ocrDone && ocrResult && (
        <div className="ocr-success">
          <span className="ocr-success-icon">✅</span>
          <div className="ocr-success-text">
            <strong>识别成功！</strong>
            <span>科目：{ocrResult.subject} · 知识点：{ocrResult.topic || '未识别'}</span>
          </div>
        </div>
      )}

      {/* Manual / review form - always shown in manual mode, hidden in photo mode unless OCR done */}
      {(mode === 'manual') && (
        <>
          <div className="form-row">
            <label>科目</label>
            <div className="btn-group">
              {['语文', '数学', '英语', '物理', '化学', '历史', '地理'].map(s => (
                <button key={s} className={subject === s ? 'btn-opt active' : 'btn-opt'} onClick={() => handleSubjectChange(s)}>{s}</button>
              ))}
            </div>
          </div>

          <div className="form-row">
            <label>年级</label>
            <div className="btn-group">
              {[1,2,3,4,5,6,7,8,9].map(g => (
                <button key={g} className={grade === g ? 'btn-opt active' : 'btn-opt'} onClick={() => setGrade(g)}>{g}年级</button>
              ))}
            </div>
          </div>

          <div className="form-row">
            <label>知识点</label>
            <select className="form-select" value={topic} onChange={e => setTopic(e.target.value)}>
              {TOPICS[subject].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div className="form-row">
            <label>题目</label>
            <textarea className="form-textarea" rows={2} placeholder="把题目内容写在这里" value={question} onChange={e => setQuestion(e.target.value)} />
          </div>

          <div className="form-row two-col">
            <div>
              <label>我的答案</label>
              <input className="form-input" placeholder="你当时写的" value={myAnswer} onChange={e => setMyAnswer(e.target.value)} />
            </div>
            <div>
              <label>正确答案</label>
              <input className="form-input" placeholder="正确的是" value={correctAnswer} onChange={e => setCorrectAnswer(e.target.value)} />
            </div>
          </div>

          <div className="add-panel-actions">
            <button className="cancel-btn" onClick={onClose}>取消</button>
            <button className="submit-btn" onClick={submit} disabled={loading || !question.trim() || !myAnswer.trim() || !correctAnswer.trim()}>
              {loading ? '保存中...' : '保存'}
            </button>
          </div>
        </>
      )}

      {mode === 'photo' && (
        <div className="add-panel-actions">
          <button className="cancel-btn" onClick={onClose}>取消</button>
        </div>
      )}
    </div>
  )
}

function MistakeDetail({ mistake, user, onBack, onUpdate }) {
  const [data, setData] = useState(mistake)
  const [loadingExplain, setLoadingExplain] = useState(false)
  const [loadingSimilar, setLoadingSimilar] = useState(false)
  const [practiceAnswers, setPracticeAnswers] = useState({})
  const [showAnswers, setShowAnswers] = useState({})

  async function loadExplanation() {
    if (data.explanation) return
    setLoadingExplain(true)
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'mistake_explain',
          payload: { subject: data.subject, topic: data.topic, question: data.question, myAnswer: data.myAnswer, correctAnswer: data.correctAnswer },
        }),
      })
      const json = await res.json()
      if (json.text) {
        await updateDoc(doc(db, 'mistakes', data.id), { explanation: json.text })
        const updated = { ...data, explanation: json.text }
        setData(updated)
        onUpdate(updated)
      }
    } catch { /* silent */ }
    setLoadingExplain(false)
  }

  async function loadSimilar() {
    if (data.similarQuestions) return
    setLoadingSimilar(true)
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'mistake_similar',
          payload: { subject: data.subject, topic: data.topic, question: data.question, correctAnswer: data.correctAnswer, grade: data.grade },
        }),
      })
      const json = await res.json()
      if (json.text) {
        let parsed = null
        try { parsed = JSON.parse(json.text) } catch { /* ignore parse error */ }
        if (Array.isArray(parsed)) {
          await updateDoc(doc(db, 'mistakes', data.id), { similarQuestions: parsed })
          const updated = { ...data, similarQuestions: parsed }
          setData(updated)
          onUpdate(updated)
        }
      }
    } catch { /* silent */ }
    setLoadingSimilar(false)
  }

  async function advanceStatus() {
    const next = STATUS_NEXT[data.status]
    await updateDoc(doc(db, 'mistakes', data.id), { status: next })
    const updated = { ...data, status: next }
    setData(updated)
    onUpdate(updated)
  }

  // 进入详情时自动加载解释
  useEffect(() => { loadExplanation() }, [])

  return (
    <div className="mistake-detail">
      <div className="detail-topbar">
        <button className="back-btn" onClick={onBack}>← 返回</button>
        <button className={`status-advance status-${data.status}`} onClick={advanceStatus}>
          {STATUS_LABELS[data.status]} →
        </button>
      </div>

      <div className="detail-card">
        <div className="detail-badges">
          <span className={`subject-badge subject-${data.subject}`}>{data.subject}</span>
          <span className="topic-badge">{data.topic}</span>
          <span className="grade-badge">{data.grade}年级</span>
        </div>
        <div className="detail-question">{data.question}</div>
        <div className="detail-answers">
          <div className="answer-box wrong">
            <div className="answer-label">我的答案（错误）</div>
            <div className="answer-value">{data.myAnswer}</div>
          </div>
          <div className="answer-box correct">
            <div className="answer-label">正确答案</div>
            <div className="answer-value">{data.correctAnswer}</div>
          </div>
        </div>
      </div>

      {/* AI 解析 */}
      <div className="section">
        <div className="section-title">💡 AI 解析</div>
        {loadingExplain && <div className="loading-text">正在分析错误原因...</div>}
        {data.explanation && <div className="explanation-text">{data.explanation}</div>}
      </div>

      {/* 同类练习题 */}
      <div className="section">
        <div className="section-title-row">
          <div className="section-title">📝 同类练习</div>
          {!data.similarQuestions && !loadingSimilar && (
            <button className="load-similar-btn" onClick={loadSimilar}>生成练习题</button>
          )}
          {data.similarQuestions && (
            <button className="load-similar-btn" onClick={async () => {
              await updateDoc(doc(db, 'mistakes', data.id), { similarQuestions: null })
              const updated = { ...data, similarQuestions: null }
              setData(updated)
              onUpdate(updated)
              setTimeout(loadSimilar, 100)
            }}>换一批</button>
          )}
        </div>
        {loadingSimilar && <div className="loading-text">正在出题...</div>}
        {data.similarQuestions && (
          <div className="similar-list">
            {data.similarQuestions.map((sq, i) => (
              <div key={i} className="similar-item">
                <div className="similar-q">{i + 1}. {sq.q}</div>
                <input
                  className="similar-input"
                  placeholder="写下你的答案"
                  value={practiceAnswers[i] || ''}
                  onChange={e => setPracticeAnswers(p => ({ ...p, [i]: e.target.value }))}
                />
                {showAnswers[i]
                  ? <div className="similar-answer">答案：{sq.a}</div>
                  : <button className="reveal-btn" onClick={() => setShowAnswers(s => ({ ...s, [i]: true }))}>查看答案</button>
                }
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
