import { useState, useEffect, useRef } from 'react'
import './Mistakes.css'

function getToken() { return localStorage.getItem('session_token') }

async function apiMistakes(body) {
  const res = await fetch('/api/mistakes-api', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...body, token: getToken() }),
  })
  return res.json()
}

const SUBJECTS = ['全部', '语文', '数学', '英语', '物理', '化学', '历史', '地理']

const TOPICS = {
  语文: [
    // 小学语文
    '拼音', '同音字/形近字', '词语填空', '组词造句', '古诗词默写', '古诗词理解',
    '阅读理解', '作文', '修辞手法', '文言文',
    // 初中语文
    '文言文翻译', '文言文实词虚词', '古诗词鉴赏', '现代文阅读', '说明文阅读',
    '议论文阅读', '名著阅读', '语言表达', '综合性学习', '其他',
  ],
  数学: [
    // 小学数学
    '整数加减法', '乘除法', '分数计算', '小数计算', '图形面积/周长', '应用题',
    // 初中数学
    '有理数与实数', '整式运算', '因式分解', '分式', '根式与指数',
    '一元一次方程', '一元二次方程', '不等式', '二元一次方程组',
    '一次函数', '反比例函数', '二次函数',
    '角与平行线', '三角形全等', '三角形相似', '勾股定理', '圆',
    '统计与数据分析', '概率', '其他',
  ],
  英语: [
    // 词汇
    'KET词汇', 'PET词汇', 'FCE词汇', '雅思词汇', '单词拼写',
    // 语法
    '名词', '代词', '形容词/副词', '动词时态', '一般现在时', '一般过去时',
    '现在进行时', '现在完成时', '过去完成时', '将来时',
    '被动语态', '非谓语动词', '情态动词', '虚拟语气',
    '定语从句', '状语从句', '名词性从句',
    // 题型
    '阅读理解', '完形填空', '语法填空', '改错', '写作', '其他',
  ],
  物理: [
    // 测量基础
    '长度与时间测量', '质量与密度',
    // 力学
    '力与运动', '惯性与牛顿定律', '重力/弹力/摩擦力', '压强', '液体压强', '大气压',
    '浮力', '功与功率', '机械能', '简单机械',
    // 声学
    '声音产生与传播', '声音三要素', '噪声控制',
    // 光学
    '光的直线传播', '光的反射', '平面镜成像', '光的折射', '凸透镜成像',
    // 热学
    '物态变化', '内能与热量', '热机与热值',
    // 电磁学
    '电荷与电路', '欧姆定律', '串并联电路', '电功率与电热', '磁场与电磁感应',
    '电动机与发电机', '变压器', '其他',
  ],
  化学: [
    // 基础
    '实验操作', '物质分类',
    // 物质结构
    '原子/分子/离子', '元素周期表', '化合价', '化学式计算',
    // 反应
    '四种基本反应类型', '质量守恒定律', '化学方程式配平', '常见化学反应',
    // 溶液
    '溶解度', '溶质质量分数', 'pH与酸碱', '离子检验',
    // 酸碱盐
    '盐酸/硫酸性质', 'NaOH/Ca(OH)₂性质', '盐的性质',
    // 生活化学
    '空气与水', '碳与CO/CO₂', '金属活动性', '铁的冶炼/防锈',
    '有机物', '化学与能源', '其他',
  ],
  历史: [
    // 中国古代史
    '夏商周与春秋战国', '秦朝统一', '汉朝', '三国两晋南北朝',
    '隋唐盛世', '宋辽金元', '明清时期',
    // 中国近代史
    '列强侵华与不平等条约', '洋务运动', '戊戌变法', '辛亥革命',
    '新文化运动', '五四运动与中共成立', '北伐与国共内战',
    '抗日战争', '解放战争',
    // 中国现代史
    '新中国成立与巩固', '三大改造与一五计划', '文化大革命',
    '改革开放', '现代化建设成就',
    // 世界史
    '古代文明', '文艺复兴与新航路', '资产阶级革命',
    '工业革命', '第一次世界大战', '俄国十月革命',
    '第二次世界大战', '冷战与多极化', '其他',
  ],
  地理: [
    // 地球与地图
    '地球形状与大小', '经纬线与经纬度', '地图三要素', '等高线地形图',
    // 世界地理
    '七大洲四大洋', '气候类型与分布', '世界人口与宗教',
    '发展中/发达国家', '全球性环境问题',
    // 中国地理
    '中国位置与疆域', '中国地形', '中国气候', '秦岭淮河线',
    '中国河流与水资源', '中国人口与民族', '中国农业', '中国工业',
    // 区域地理
    '南北方差异', '西北地区', '青藏地区',
    // 山西地理
    '山西位置与地形', '汾河与煤炭资源', '山西气候与农业',
    '山西经济与发展', '其他',
  ],
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
    apiMistakes({ action: 'list' }).then(data => {
      if (data.mistakes) setMistakes(data.mistakes)
    }).catch(() => {})
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
    try {
      const data = await apiMistakes({
        action: 'create',
        subject, topic, grade,
        question: question.trim(),
        myAnswer: myAnswer.trim(),
        correctAnswer: correctAnswer.trim(),
      })
      if (data.mistake) onAdded(data.mistake)
    } catch { /* silent */ }
    setLoading(false)
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
        await apiMistakes({ action: 'update', id: data.id, explanation: json.text })
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
          await apiMistakes({ action: 'update', id: data.id, similarQuestions: parsed })
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
    await apiMistakes({ action: 'update', id: data.id, status: next })
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
              await apiMistakes({ action: 'update', id: data.id, similarQuestions: null })
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
