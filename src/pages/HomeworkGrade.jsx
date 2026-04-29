import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { logActivity } from '../utils/activityLogger'
import './HomeworkGrade.css'

function getToken() { return localStorage.getItem('session_token') }

async function apiMistakes(body) {
  const res = await fetch('/api/mistakes-api', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...body, token: getToken() }),
  })
  return res.json()
}

const MAX_DIM = 1600
const MAX_BYTES = 900_000

// Compress image: scale down + re-encode JPEG until under MAX_BYTES
async function compressImage(file) {
  const url = URL.createObjectURL(file)
  try {
    const img = await new Promise((resolve, reject) => {
      const i = new Image()
      i.onload = () => resolve(i)
      i.onerror = reject
      i.src = url
    })
    let { naturalWidth: w, naturalHeight: h } = img
    if (w > MAX_DIM || h > MAX_DIM) {
      const scale = MAX_DIM / Math.max(w, h)
      w = Math.round(w * scale)
      h = Math.round(h * scale)
    }
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    canvas.getContext('2d').drawImage(img, 0, 0, w, h)
    let quality = 0.88
    let dataUrl = canvas.toDataURL('image/jpeg', quality)
    while (dataUrl.length * 0.75 > MAX_BYTES && quality > 0.4) {
      quality -= 0.1
      dataUrl = canvas.toDataURL('image/jpeg', quality)
    }
    return { dataUrl, width: w, height: h }
  } finally {
    URL.revokeObjectURL(url)
  }
}

function dataUrlToBase64(dataUrl) {
  return dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl
}

const SUBJECT_FALLBACK = '语文'
const VALID_SUBJECTS = ['语文', '数学', '英语', '物理', '化学', '历史', '地理']

export default function HomeworkGrade({ user }) {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('upload') // upload | grading | result | error
  const [imageDataUrl, setImageDataUrl] = useState('')
  const [imageDims, setImageDims] = useState({ width: 0, height: 0 })
  const [grade, setGrade] = useState(3)
  const [result, setResult] = useState(null) // { errors, summary, subject }
  const [errorMsg, setErrorMsg] = useState('')
  const [savedIds, setSavedIds] = useState({}) // index -> mistakeId
  const [activeIndex, setActiveIndex] = useState(null)
  const [savingAll, setSavingAll] = useState(false)
  const [savingOne, setSavingOne] = useState({})

  const cameraInputRef = useRef(null)
  const galleryInputRef = useRef(null)
  const canvasRef = useRef(null)
  const imgElRef = useRef(null)
  const annotatedDataUrlRef = useRef('')

  const drawAnnotations = useCallback(() => {
    const canvas = canvasRef.current
    const img = imgElRef.current
    if (!canvas || !img || !result) return
    const ratio = img.naturalWidth ? img.naturalHeight / img.naturalWidth : 1
    const cw = Math.min(960, img.naturalWidth || 800)
    const ch = Math.round(cw * ratio)
    canvas.width = cw
    canvas.height = ch
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, cw, ch)

    const errors = Array.isArray(result.errors) ? result.errors : []
    errors.forEach((err, i) => {
      const bb = err.boundingBox
      if (!bb) return
      const x = clamp01(bb.x) * cw
      const y = clamp01(bb.y) * ch
      const w = Math.max(8, clamp01(bb.width) * cw)
      const h = Math.max(8, clamp01(bb.height) * ch)
      const isActive = activeIndex === i
      ctx.lineWidth = isActive ? 5 : 3
      ctx.strokeStyle = isActive ? '#ff8a00' : '#e53e3e'
      ctx.shadowColor = 'rgba(0,0,0,0.18)'
      ctx.shadowBlur = isActive ? 6 : 3
      ctx.strokeRect(x, y, w, h)
      ctx.shadowBlur = 0

      // Number badge top-left of box
      const label = String(i + 1)
      const badgeR = 16
      const bx = Math.max(badgeR, x)
      const by = Math.max(badgeR, y)
      ctx.beginPath()
      ctx.fillStyle = isActive ? '#ff8a00' : '#e53e3e'
      ctx.arc(bx, by, badgeR, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 18px system-ui, -apple-system, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(label, bx, by)
    })
    annotatedDataUrlRef.current = canvas.toDataURL('image/png')
  }, [result, activeIndex])

  useEffect(() => {
    if (phase !== 'result' || !result || !imageDataUrl) return
    const img = new Image()
    img.onload = () => {
      imgElRef.current = img
      drawAnnotations()
    }
    img.src = imageDataUrl
  }, [phase, result, imageDataUrl, drawAnnotations])

  useEffect(() => {
    if (phase === 'result' && imgElRef.current) drawAnnotations()
  }, [activeIndex, phase, drawAnnotations])

  async function handleFile(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setErrorMsg('请上传图片文件')
      return
    }
    try {
      const { dataUrl, width, height } = await compressImage(file)
      setImageDataUrl(dataUrl)
      setImageDims({ width, height })
      setErrorMsg('')
      setResult(null)
      setSavedIds({})
      setActiveIndex(null)
      setPhase('upload')
    } catch {
      setErrorMsg('图片处理失败，请换一张试试')
    }
  }

  async function startGrading() {
    if (!imageDataUrl) return
    setPhase('grading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'grade_homework',
          payload: {
            imageBase64: dataUrlToBase64(imageDataUrl),
            mediaType: 'image/jpeg',
            grade: `${grade}`,
          },
        }),
      })
      const json = await res.json()
      if (json.parsed) {
        const parsed = json.parsed
        const errors = Array.isArray(parsed.errors) ? parsed.errors : []
        const subject = VALID_SUBJECTS.includes(parsed.subject) ? parsed.subject : SUBJECT_FALLBACK
        setResult({ errors, summary: parsed.summary || '', subject })
        setPhase('result')
        if (errors.length > 0) {
          logActivity(user?.uid, { type: 'homework_graded', count: errors.length, subject, moduleKey: 'homework_grade' })
        }
      } else {
        setErrorMsg(json.error || 'AI 没识别出内容，换张更清晰的照片再试一次吧')
        setPhase('error')
      }
    } catch (err) {
      setErrorMsg(err?.message || '网络出了点小问题，重试一下')
      setPhase('error')
    }
  }

  async function saveOne(index) {
    if (savedIds[index]) return
    const err = result.errors[index]
    if (!err) return
    setSavingOne(s => ({ ...s, [index]: true }))
    try {
      const data = await apiMistakes({
        action: 'create',
        subject: VALID_SUBJECTS.includes(err.subject) ? err.subject : result.subject,
        topic: err.topic || '',
        grade,
        question: err.question || '',
        myAnswer: err.myAnswer || '',
        correctAnswer: err.correctAnswer || '',
      })
      if (data?.mistake?.id) {
        setSavedIds(s => ({ ...s, [index]: data.mistake.id }))
        if (err.explanation) {
          await apiMistakes({ action: 'update', id: data.mistake.id, explanation: err.explanation })
        }
      } else {
        cacheLocalFallback(err, grade, result.subject)
        setSavedIds(s => ({ ...s, [index]: 'local' }))
      }
    } catch {
      cacheLocalFallback(err, grade, result.subject)
      setSavedIds(s => ({ ...s, [index]: 'local' }))
    }
    setSavingOne(s => ({ ...s, [index]: false }))
  }

  async function saveAll() {
    if (!result?.errors?.length) return
    setSavingAll(true)
    for (let i = 0; i < result.errors.length; i++) {
      if (!savedIds[i]) await saveOne(i)
    }
    setSavingAll(false)
  }

  function downloadAnnotated() {
    const url = annotatedDataUrlRef.current
    if (!url) return
    const a = document.createElement('a')
    a.href = url
    a.download = `批改结果_${new Date().toISOString().slice(0, 10)}.png`
    a.click()
  }

  function reset() {
    setImageDataUrl('')
    setImageDims({ width: 0, height: 0 })
    setResult(null)
    setSavedIds({})
    setActiveIndex(null)
    setErrorMsg('')
    setPhase('upload')
  }

  const errors = result?.errors || []
  const allSaved = errors.length > 0 && errors.every((_, i) => savedIds[i])

  return (
    <div className="hwgrade">
      <div className="hwgrade-header">
        <h2 className="page-title">📸 作业批改</h2>
        <button className="hwgrade-link" onClick={() => navigate('/mistakes')}>错题本 →</button>
      </div>
      <p className="hwgrade-sub">拍照上传作业，AI 老师自动找出错题、画红圈、给讲解，可一键存进错题本。</p>

      {phase !== 'result' && (
        <div className="hwgrade-grade-row">
          <span className="hwgrade-grade-label">孩子年级</span>
          <div className="hwgrade-grade-btns">
            {[1,2,3,4,5,6,7,8,9].map(g => (
              <button key={g} className={grade === g ? 'hwgrade-grade-btn active' : 'hwgrade-grade-btn'} onClick={() => setGrade(g)}>{g}</button>
            ))}
          </div>
        </div>
      )}

      {phase === 'upload' && !imageDataUrl && (
        <div className="hwgrade-upload" onClick={() => galleryInputRef.current?.click()}>
          <div className="hwgrade-upload-icon">📷</div>
          <div className="hwgrade-upload-title">点击选择作业照片</div>
          <div className="hwgrade-upload-hint">支持拍照或从相册选取（一张图）</div>
          <div className="hwgrade-upload-btns">
            <button className="hwgrade-btn hwgrade-btn-primary" onClick={e => { e.stopPropagation(); cameraInputRef.current?.click() }}>📷 拍照</button>
            <button className="hwgrade-btn hwgrade-btn-secondary" onClick={e => { e.stopPropagation(); galleryInputRef.current?.click() }}>🖼️ 相册</button>
          </div>
        </div>
      )}

      {phase === 'upload' && imageDataUrl && (
        <div className="hwgrade-preview">
          <img src={imageDataUrl} alt="作业预览" className="hwgrade-preview-img" />
          <div className="hwgrade-preview-meta">{imageDims.width}×{imageDims.height}px</div>
          <div className="hwgrade-preview-actions">
            <button className="hwgrade-btn hwgrade-btn-secondary" onClick={() => galleryInputRef.current?.click()}>重新选择</button>
            <button className="hwgrade-btn hwgrade-btn-primary" onClick={startGrading}>🔍 开始批改</button>
          </div>
        </div>
      )}

      {phase === 'grading' && (
        <div className="hwgrade-loading">
          <div className="hwgrade-loading-spinner">⏳</div>
          <div className="hwgrade-loading-text">AI 老师正在批改作业…</div>
          <div className="hwgrade-loading-hint">通常需要 10-20 秒，请稍等</div>
        </div>
      )}

      {phase === 'error' && (
        <div className="hwgrade-error">
          <div className="hwgrade-error-icon">😕</div>
          <div className="hwgrade-error-text">{errorMsg || '出错了'}</div>
          <div className="hwgrade-preview-actions">
            <button className="hwgrade-btn hwgrade-btn-secondary" onClick={reset}>重新上传</button>
            {imageDataUrl && (
              <button className="hwgrade-btn hwgrade-btn-primary" onClick={startGrading}>🔁 再试一次</button>
            )}
          </div>
        </div>
      )}

      {phase === 'result' && result && (
        <>
          <div className="hwgrade-summary">
            <span className="hwgrade-summary-icon">{errors.length === 0 ? '🎉' : '✏️'}</span>
            <div className="hwgrade-summary-text">
              <div className="hwgrade-summary-title">
                {errors.length === 0 ? '全对！太棒了' : `发现 ${errors.length} 道错题`}
              </div>
              {result.summary && <div className="hwgrade-summary-body">{result.summary}</div>}
            </div>
          </div>

          <div className="hwgrade-canvas-wrap">
            <canvas ref={canvasRef} className="hwgrade-canvas" />
            <div className="hwgrade-canvas-actions">
              <button className="hwgrade-btn hwgrade-btn-secondary" onClick={downloadAnnotated}>⬇️ 下载标注图</button>
              <button className="hwgrade-btn hwgrade-btn-secondary" onClick={reset}>📷 换一张</button>
            </div>
          </div>

          {errors.length > 0 && (
            <>
              <div className="hwgrade-actions-bar">
                <button
                  className="hwgrade-btn hwgrade-btn-primary hwgrade-btn-block"
                  onClick={saveAll}
                  disabled={savingAll || allSaved}
                >
                  {allSaved ? '✅ 已全部加入错题本' : savingAll ? '保存中...' : '✅ 全部加入错题本'}
                </button>
                {allSaved && (
                  <button className="hwgrade-btn hwgrade-btn-secondary" onClick={() => navigate('/mistakes')}>
                    打开错题本 →
                  </button>
                )}
              </div>

              <ol className="hwgrade-error-list">
                {errors.map((err, i) => (
                  <li
                    key={i}
                    className={activeIndex === i ? 'hwgrade-err active' : 'hwgrade-err'}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onClick={() => setActiveIndex(i)}
                  >
                    <div className="hwgrade-err-head">
                      <span className="hwgrade-err-num">{i + 1}</span>
                      <span className="hwgrade-err-subject">{err.subject || result.subject}</span>
                      {err.topic && <span className="hwgrade-err-topic">{err.topic}</span>}
                      {err.errorType && <span className="hwgrade-err-type">{err.errorType}</span>}
                    </div>
                    <div className="hwgrade-err-q">{err.question || '（题目未识别）'}</div>
                    <div className="hwgrade-err-answers">
                      <div className="hwgrade-err-mine">我的：{err.myAnswer || '—'}</div>
                      <div className="hwgrade-err-right">正确：{err.correctAnswer || '—'}</div>
                    </div>
                    {err.explanation && (
                      <div className="hwgrade-err-explain">💡 {err.explanation}</div>
                    )}
                    <div className="hwgrade-err-actions">
                      {savedIds[i]
                        ? <span className="hwgrade-saved">✓ 已加入错题本{savedIds[i] === 'local' ? '（本地暂存）' : ''}</span>
                        : <button className="hwgrade-btn-mini" onClick={e => { e.stopPropagation(); saveOne(i) }} disabled={savingOne[i]}>
                            {savingOne[i] ? '保存中...' : '+ 加入错题本'}
                          </button>
                      }
                    </div>
                  </li>
                ))}
              </ol>
            </>
          )}
        </>
      )}

      {/* hidden file inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={handleFile}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFile}
      />
    </div>
  )
}

function clamp01(v) {
  const n = Number(v)
  if (Number.isNaN(n)) return 0
  if (n < 0) return 0
  if (n > 1) return 1
  return n
}

const PENDING_KEY = 'homework_grade_pending_mistakes'

function cacheLocalFallback(err, grade, fallbackSubject) {
  try {
    const raw = localStorage.getItem(PENDING_KEY)
    const list = raw ? JSON.parse(raw) : []
    list.push({
      subject: VALID_SUBJECTS.includes(err.subject) ? err.subject : fallbackSubject,
      topic: err.topic || '',
      grade,
      question: err.question || '',
      myAnswer: err.myAnswer || '',
      correctAnswer: err.correctAnswer || '',
      explanation: err.explanation || '',
      cachedAt: Date.now(),
    })
    localStorage.setItem(PENDING_KEY, JSON.stringify(list))
  } catch { /* localStorage full or disabled */ }
}
