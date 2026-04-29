import { useState, useRef } from 'react'
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

function buildAnnotationPrompt(errors) {
  if (!errors || errors.length === 0) {
    return '这是一张小学生的作业照片。请保留原图所有内容不变，在作业右上角用红色批改笔写一个大大的红色对勾"✓"，并在旁边写"全对！太棒了"四个红色字。'
  }
  const lines = errors.map((e, i) => {
    const loc = e.location?.trim() || `第${i + 1}题位置`
    const correct = e.correctAnswer?.trim() || ''
    const detail = correct ? `（正确答案：${correct}）` : ''
    return `${i + 1}. ${loc}：用红色批改笔在该题目附近画一个红圈，并在旁边写一个红色"✗"标记${detail}`
  })
  return `这是一张小学生的作业照片。请保留原图所有内容（题目文字、答案、版面）完全不变，仅在原图上叠加用红色批改笔做的标注：

${lines.join('\n')}

要求：
- 只用纯红色（#E53E3E 类似的鲜红色）做标注，模仿真人老师用红笔批改
- 红色标注线条要清晰但不要遮挡题目本身的文字
- 不要修改、重写、移动或删除原图中任何已有内容
- 不要添加额外的装饰、水印、阴影或边框
- 输出与输入图片相同的尺寸和构图`
}

async function callImageEdit(imageBase64, prompt) {
  const candidates = [
    { url: '/api/generate-image', body: { inputImage: imageBase64, prompt, mediaType: 'image/jpeg' } },
    { url: '/api/generate-image', body: { image: imageBase64, prompt, mediaType: 'image/jpeg' } },
  ]
  for (const c of candidates) {
    try {
      const res = await fetch(c.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(c.body),
      })
      if (!res.ok) continue
      const data = await res.json()
      const url = extractImageUrl(data)
      if (url) return { url, raw: data }
    } catch { /* try next */ }
  }
  return null
}

function extractImageUrl(data) {
  if (!data) return null
  if (typeof data.url === 'string') return data.url
  if (typeof data.imageUrl === 'string') return data.imageUrl
  if (typeof data.dataUrl === 'string') return data.dataUrl
  if (typeof data.imageBase64 === 'string') {
    const mt = data.mediaType || 'image/png'
    return `data:${mt};base64,${data.imageBase64}`
  }
  if (typeof data.b64_json === 'string') {
    return `data:image/png;base64,${data.b64_json}`
  }
  if (Array.isArray(data.data) && data.data[0]) {
    const first = data.data[0]
    if (typeof first.url === 'string') return first.url
    if (typeof first.b64_json === 'string') return `data:image/png;base64,${first.b64_json}`
  }
  return null
}

export default function HomeworkGrade({ user }) {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('upload') // upload | grading_vision | grading_image | result | error
  const [imageDataUrl, setImageDataUrl] = useState('')
  const [imageDims, setImageDims] = useState({ width: 0, height: 0 })
  const [grade, setGrade] = useState(3)
  const [result, setResult] = useState(null) // { errors, summary, subject, annotatedUrl, annotatedFailed }
  const [errorMsg, setErrorMsg] = useState('')
  const [savedIds, setSavedIds] = useState({})
  const [savingAll, setSavingAll] = useState(false)
  const [savingOne, setSavingOne] = useState({})

  const cameraInputRef = useRef(null)
  const galleryInputRef = useRef(null)

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
      setPhase('upload')
    } catch {
      setErrorMsg('图片处理失败，请换一张试试')
    }
  }

  async function startGrading() {
    if (!imageDataUrl) return
    setErrorMsg('')

    // Step 1 — Vision analysis (Claude)
    setPhase('grading_vision')
    let parsed
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
      if (!json.parsed) {
        setErrorMsg(json.error || 'AI 没识别出内容，换张更清晰的照片再试一次吧')
        setPhase('error')
        return
      }
      parsed = json.parsed
    } catch (err) {
      setErrorMsg(err?.message || '网络出了点小问题，重试一下')
      setPhase('error')
      return
    }

    const errors = Array.isArray(parsed.errors) ? parsed.errors : []
    const subject = VALID_SUBJECTS.includes(parsed.subject) ? parsed.subject : SUBJECT_FALLBACK
    const baseResult = { errors, summary: parsed.summary || '', subject, annotatedUrl: '', annotatedFailed: false }

    // Step 2 — Image edit (OpenAI gpt-image-1 via /api/generate-image)
    setResult(baseResult)
    setPhase('grading_image')
    let annotatedUrl = ''
    let annotatedFailed = false
    try {
      const editPrompt = buildAnnotationPrompt(errors)
      const edit = await callImageEdit(dataUrlToBase64(imageDataUrl), editPrompt)
      if (edit?.url) annotatedUrl = edit.url
      else annotatedFailed = true
    } catch {
      annotatedFailed = true
    }

    setResult({ ...baseResult, annotatedUrl, annotatedFailed })
    setPhase('result')

    if (errors.length > 0) {
      logActivity(user?.uid, { type: 'homework_graded', count: errors.length, subject, moduleKey: 'homework_grade' })
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
    const url = result?.annotatedUrl || imageDataUrl
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
    setErrorMsg('')
    setPhase('upload')
  }

  const errors = result?.errors || []
  const allSaved = errors.length > 0 && errors.every((_, i) => savedIds[i])
  const displayImage = result?.annotatedUrl || imageDataUrl

  return (
    <div className="hwgrade">
      <div className="hwgrade-header">
        <h2 className="page-title">📸 作业批改</h2>
        <button className="hwgrade-link" onClick={() => navigate('/mistakes')}>错题本 →</button>
      </div>
      <p className="hwgrade-sub">拍照上传作业，AI 老师自动找出错题、用红笔标注，可一键存进错题本。</p>

      {phase !== 'result' && phase !== 'grading_image' && (
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

      {phase === 'grading_vision' && (
        <div className="hwgrade-loading">
          <div className="hwgrade-loading-spinner">🔎</div>
          <div className="hwgrade-loading-text">AI 老师正在看作业…</div>
          <div className="hwgrade-loading-hint">第 1 步：识别题目和错题（约 10 秒）</div>
        </div>
      )}

      {phase === 'grading_image' && (
        <div className="hwgrade-loading">
          <div className="hwgrade-loading-spinner">🖍️</div>
          <div className="hwgrade-loading-text">AI 老师正在用红笔批改…</div>
          <div className="hwgrade-loading-hint">第 2 步：在原图上标注错题（约 15-25 秒）</div>
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

          <div className="hwgrade-image-wrap">
            <img src={displayImage} alt="批改后作业" className="hwgrade-result-img" />
            {result.annotatedFailed && (
              <div className="hwgrade-fallback-note">
                ℹ️ AI 红笔标注暂不可用，下方仅显示原图。错题列表照常使用。
              </div>
            )}
            <div className="hwgrade-image-actions">
              <button className="hwgrade-btn hwgrade-btn-secondary" onClick={downloadAnnotated}>⬇️ 下载{result.annotatedUrl ? '标注' : '原'}图</button>
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
                  <li key={i} className="hwgrade-err">
                    <div className="hwgrade-err-head">
                      <span className="hwgrade-err-num">{i + 1}</span>
                      <span className="hwgrade-err-subject">{err.subject || result.subject}</span>
                      {err.topic && <span className="hwgrade-err-topic">{err.topic}</span>}
                      {err.errorType && <span className="hwgrade-err-type">{err.errorType}</span>}
                      {err.location && <span className="hwgrade-err-location">📍{err.location}</span>}
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
                        : <button className="hwgrade-btn-mini" onClick={() => saveOne(i)} disabled={savingOne[i]}>
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
