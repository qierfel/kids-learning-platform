import { useState, useRef } from 'react'
import './Writing.css'

const LEVEL_COLOR = { KET: '#10b981', PET: '#f59e0b', FCE: '#7c3aed' }

const PROMPTS = {
  KET: [
    { text: "Write about your favourite animal", targetWords: 50, range: '40-50 words' },
    { text: "Describe your school", targetWords: 50, range: '40-50 words' },
    { text: "Write about your weekend plans", targetWords: 50, range: '40-50 words' },
  ],
  PET: [
    { text: "Write a story beginning with 'It was a dark and stormy night...'", targetWords: 100, range: '100 words' },
    { text: "Write an email to a friend about a trip you took", targetWords: 100, range: '100 words' },
    { text: "Describe a person who inspires you", targetWords: 100, range: '100 words' },
  ],
  FCE: [
    { text: "Write an essay: 'Social media has more benefits than drawbacks.' Discuss.", targetWords: 190, range: '140-190 words' },
    { text: "Write a review of a book or film you enjoyed", targetWords: 190, range: '140-190 words' },
    { text: "Write a letter to the editor about an environmental issue", targetWords: 190, range: '140-190 words' },
  ],
}

const HISTORY_KEY = 'essay_correct_history'

function countWords(text) {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length
}

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
  } catch {
    return []
  }
}

function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)))
}

function normalizeMediaType(mt) {
  if (!mt || mt === 'image/jpg') return 'image/jpeg'
  if (['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(mt)) return mt
  return 'image/jpeg' // fallback for image/heic, image/avif, etc.
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result
      const base64 = dataUrl.split(',')[1].replace(/\s/g, '')
      resolve({ base64, mediaType: normalizeMediaType(file.type) })
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// ─────────────────────────────────────────────────────────────────
//  Writing Practice Tab
// ─────────────────────────────────────────────────────────────────

function WritingPractice({ onAddMistake }) {
  const [level, setLevel] = useState('KET')
  const [activePrompt, setActivePrompt] = useState(null)
  const [userText, setUserText] = useState('')
  const [grading, setGrading] = useState(false)
  const [result, setResult] = useState(null)
  const [gradingError, setGradingError] = useState('')

  function selectPrompt(prompt) {
    setActivePrompt(prompt)
    setUserText('')
    setResult(null)
    setGradingError('')
  }

  function backToPrompts() {
    setActivePrompt(null)
    setUserText('')
    setResult(null)
    setGradingError('')
  }

  async function submitForGrading() {
    if (!userText.trim()) return
    setGrading(true)
    setResult(null)
    setGradingError('')
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'writing_grade',
          payload: {
            level,
            prompt: activePrompt.text,
            text: userText,
            targetWords: activePrompt.targetWords,
          },
        }),
      })
      const json = await res.json()
      let parsed = null
      try {
        parsed = typeof json.text === 'string' ? JSON.parse(json.text) : json
      } catch {
        parsed = null
      }
      if (parsed && parsed.score) {
        setResult(parsed)
      } else {
        setResult({ raw: json.text || '无法解析评分结果。' })
      }
    } catch {
      setGradingError('请求失败，请检查网络连接。')
    }
    setGrading(false)
  }

  function handleAddMistake() {
    if (!onAddMistake || !result) return
    const suggestions = result.suggestions || result.grammar?.feedback || ''
    onAddMistake({
      subject: '英语',
      topic: '写作',
      question: activePrompt.text,
      myAnswer: userText,
      correctAnswer: suggestions,
      errorType: '方法错误',
    })
  }

  function tryAgain() {
    setUserText('')
    setResult(null)
    setGradingError('')
  }

  const wordCount = countWords(userText)
  const color = LEVEL_COLOR[level]

  if (activePrompt) {
    const hasGrammarErrors = result && (result.grammar?.errors > 0 || result.grammar?.feedback)
    return (
      <div>
        <button className="writing-back-link" onClick={backToPrompts}>← Back to prompts</button>

        <div className="writing-prompt-card" style={{ borderColor: color }}>
          <span className="writing-prompt-level-badge" style={{ background: color + '20', color }}>
            {level} · {activePrompt.range}
          </span>
          <p className="writing-prompt-text">{activePrompt.text}</p>
        </div>

        <div className="writing-area-wrapper">
          <textarea
            className="writing-textarea"
            placeholder="Start writing here..."
            value={userText}
            onChange={e => setUserText(e.target.value)}
            disabled={grading}
          />
          <div className="writing-wordcount">Words: {wordCount} / {activePrompt.targetWords}</div>
        </div>

        <button className="writing-submit-btn" onClick={submitForGrading} disabled={!userText.trim() || grading}>
          ✨ Submit for AI Grading
        </button>

        {grading && <div className="writing-loading">AI is grading your work... 🤔</div>}
        {gradingError && <div className="writing-error">{gradingError}</div>}

        {result && !result.raw && (
          <div className="writing-result-card">
            <div className="writing-result-header">
              <span className="writing-result-title">AI Grading Result</span>
              <span className="writing-overall-score" style={{ color }}>{result.score}</span>
            </div>
            {result.grammar && (
              <div className="writing-result-section">
                <div className="writing-result-section-title">📝 Grammar</div>
                <p className="writing-result-section-text">{result.grammar.feedback || result.grammar}</p>
              </div>
            )}
            {result.vocabulary && (
              <div className="writing-result-section">
                <div className="writing-result-section-title">📚 Vocabulary</div>
                <p className="writing-result-section-text">{result.vocabulary.feedback || result.vocabulary}</p>
              </div>
            )}
            {result.content && (
              <div className="writing-result-section">
                <div className="writing-result-section-title">💡 Content</div>
                <p className="writing-result-section-text">{result.content.feedback || result.content}</p>
              </div>
            )}
            {result.suggestions && (
              <div className="writing-result-section writing-result-suggestions">
                <div className="writing-result-section-title">🌟 Suggestions</div>
                <p className="writing-result-section-text">{result.suggestions}</p>
              </div>
            )}
            <div className="writing-result-actions">
              {hasGrammarErrors && onAddMistake && (
                <button className="writing-add-mistake-btn" onClick={handleAddMistake}>📝 Add errors to 错题本</button>
              )}
              <button className="writing-try-again-btn" onClick={tryAgain}>Try Again</button>
            </div>
          </div>
        )}

        {result && result.raw && (
          <div className="writing-result-card">
            <div className="writing-result-header">
              <span className="writing-result-title">AI Grading Result</span>
            </div>
            <p className="writing-result-raw">{result.raw}</p>
            <div className="writing-result-actions">
              {onAddMistake && (
                <button className="writing-add-mistake-btn" onClick={handleAddMistake}>📝 Add errors to 错题本</button>
              )}
              <button className="writing-try-again-btn" onClick={tryAgain}>Try Again</button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div className="writing-level-tabs">
        {['KET', 'PET', 'FCE'].map(l => (
          <button
            key={l}
            className={`writing-level-tab ${level === l ? 'active' : ''}`}
            style={level === l ? { background: LEVEL_COLOR[l], color: '#fff', borderColor: LEVEL_COLOR[l] } : {}}
            onClick={() => setLevel(l)}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="writing-prompts-list">
        {PROMPTS[level].map((prompt, i) => (
          <div
            key={i}
            className="writing-prompt-item"
            onClick={() => selectPrompt(prompt)}
            style={{ '--hover-border': LEVEL_COLOR[level] }}
          >
            <div className="writing-prompt-item-left">
              <div className="writing-prompt-item-text">{prompt.text}</div>
              <div className="writing-prompt-item-meta">{prompt.range}</div>
            </div>
            <span className="writing-prompt-arrow">›</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
//  Essay Correction Tab
// ─────────────────────────────────────────────────────────────────

function EssayCorrection({ onAddMistake }) {
  const [level, setLevel] = useState('KET')
  const [imagePreview, setImagePreview] = useState(null)
  const [imageData, setImageData] = useState(null) // { base64, mediaType }
  const [ocrText, setOcrText] = useState('')
  const [ocrLoading, setOcrLoading] = useState(false)
  const [ocrError, setOcrError] = useState('')
  const [correcting, setCorrecting] = useState(false)
  const [result, setResult] = useState(null)
  const [correctError, setCorrectError] = useState('')
  const [history, setHistory] = useState(loadHistory)
  const [showHistory, setShowHistory] = useState(false)
  const fileInputRef = useRef(null)
  const cameraInputRef = useRef(null)

  async function handleImageFile(file) {
    if (!file) return
    const { base64, mediaType } = await fileToBase64(file)
    setImageData({ base64, mediaType })
    setImagePreview(URL.createObjectURL(file))
    setOcrText('')
    setResult(null)
    setOcrError('')
    setCorrectError('')
  }

  async function doOCR() {
    if (!imageData) return
    setOcrLoading(true)
    setOcrError('')
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'essay_ocr',
          payload: { imageBase64: imageData.base64, mediaType: imageData.mediaType },
        }),
      })
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      setOcrText(json.text || '')
    } catch (e) {
      setOcrError('识别失败：' + e.message)
    }
    setOcrLoading(false)
  }

  async function doCorrect() {
    const text = ocrText.trim()
    if (!text) return
    setCorrecting(true)
    setResult(null)
    setCorrectError('')
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'essay_correct',
          payload: { essayText: text, level },
        }),
      })
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      let parsed = null
      try {
        const raw = typeof json.text === 'string' ? json.text : JSON.stringify(json)
        const m = raw.match(/\{[\s\S]*\}/)
        if (m) parsed = JSON.parse(m[0])
      } catch { /* fall through */ }
      if (parsed) {
        setResult(parsed)
        const entry = {
          id: Date.now(),
          date: new Date().toLocaleDateString('zh-CN'),
          level,
          essay: text.slice(0, 200),
          score: parsed.overallScore || '—',
          errorCount: parsed.errors?.length || 0,
        }
        const newHistory = [entry, ...history]
        setHistory(newHistory)
        saveHistory(newHistory)
      } else {
        setResult({ raw: json.text || '无法解析批改结果。' })
      }
    } catch (e) {
      setCorrectError('批改失败：' + e.message)
    }
    setCorrecting(false)
  }

  function handleAddMistake() {
    if (!onAddMistake || !result) return
    const errors = result.errors?.map(e => `${e.original} → ${e.corrected}（${e.explanation}）`).join('\n') || ''
    onAddMistake({
      subject: '英语',
      topic: '作文批改',
      question: ocrText.slice(0, 200),
      myAnswer: ocrText.slice(0, 200),
      correctAnswer: errors || result.summary || '',
      errorType: '方法错误',
    })
  }

  function reset() {
    setImagePreview(null)
    setImageData(null)
    setOcrText('')
    setResult(null)
    setOcrError('')
    setCorrectError('')
  }

  const color = LEVEL_COLOR[level]

  if (showHistory) {
    return (
      <div>
        <button className="writing-back-link" onClick={() => setShowHistory(false)}>← 返回批改</button>
        <h3 className="ec-section-title">批改历史记录</h3>
        {history.length === 0 ? (
          <p className="ec-empty">暂无历史记录</p>
        ) : (
          <div className="ec-history-list">
            {history.map(h => (
              <div key={h.id} className="ec-history-item">
                <div className="ec-history-meta">
                  <span className="ec-history-date">{h.date}</span>
                  <span className="ec-history-level" style={{ color: LEVEL_COLOR[h.level] || '#888' }}>{h.level}</span>
                  <span className="ec-history-score">{h.score}</span>
                  {h.errorCount > 0 && <span className="ec-history-errors">{h.errorCount} 处错误</span>}
                </div>
                <p className="ec-history-preview">{h.essay}{h.essay.length >= 200 ? '…' : ''}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      {/* Level selector */}
      <div className="ec-row-between" style={{ marginBottom: 16 }}>
        <div className="writing-level-tabs" style={{ marginBottom: 0 }}>
          {['KET', 'PET', 'FCE'].map(l => (
            <button
              key={l}
              className={`writing-level-tab ${level === l ? 'active' : ''}`}
              style={level === l ? { background: LEVEL_COLOR[l], color: '#fff', borderColor: LEVEL_COLOR[l] } : {}}
              onClick={() => setLevel(l)}
            >
              {l}
            </button>
          ))}
        </div>
        {history.length > 0 && (
          <button className="ec-history-btn" onClick={() => setShowHistory(true)}>
            📋 历史 ({history.length})
          </button>
        )}
      </div>

      {/* Step 1: Upload */}
      <div className="ec-step-card">
        <div className="ec-step-header">
          <span className="ec-step-num" style={{ background: color }}>1</span>
          <span className="ec-step-label">上传作文照片</span>
        </div>

        {imagePreview ? (
          <div className="ec-image-preview-wrap">
            <img src={imagePreview} className="ec-image-preview" alt="作文照片" />
            <button className="ec-remove-image" onClick={reset}>✕ 重新选择</button>
          </div>
        ) : (
          <div className="ec-upload-area">
            <button className="ec-upload-btn" onClick={() => cameraInputRef.current?.click()}>
              📷 拍照上传
            </button>
            <button className="ec-upload-btn ec-upload-btn--secondary" onClick={() => fileInputRef.current?.click()}>
              🖼 从相册选择
            </button>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: 'none' }}
              onChange={e => handleImageFile(e.target.files?.[0])}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={e => handleImageFile(e.target.files?.[0])}
            />
          </div>
        )}
      </div>

      {/* Step 2: OCR */}
      {imageData && (
        <div className="ec-step-card">
          <div className="ec-step-header">
            <span className="ec-step-num" style={{ background: color }}>2</span>
            <span className="ec-step-label">识别作文文字</span>
          </div>

          {!ocrText && (
            <button className="ec-action-btn" onClick={doOCR} disabled={ocrLoading} style={{ borderColor: color, color }}>
              {ocrLoading ? '识别中…' : '🔍 开始 OCR 识别'}
            </button>
          )}

          {ocrError && <div className="writing-error">{ocrError}</div>}

          {ocrText && (
            <div>
              <div className="ec-ocr-label">识别结果（可手动修改）：</div>
              <textarea
                className="writing-textarea"
                value={ocrText}
                onChange={e => setOcrText(e.target.value)}
                rows={8}
                disabled={correcting}
              />
              <div className="writing-wordcount">单词数：{countWords(ocrText)}</div>
            </div>
          )}
        </div>
      )}

      {/* Manual text input (no image) */}
      {!imageData && (
        <div className="ec-step-card">
          <div className="ec-step-header">
            <span className="ec-step-num" style={{ background: color }}>2</span>
            <span className="ec-step-label">或直接粘贴 / 输入作文</span>
          </div>
          <textarea
            className="writing-textarea"
            placeholder="在此输入或粘贴英语作文…"
            value={ocrText}
            onChange={e => setOcrText(e.target.value)}
            rows={8}
            disabled={correcting}
          />
          <div className="writing-wordcount">单词数：{countWords(ocrText)}</div>
        </div>
      )}

      {/* Step 3: Correct */}
      {ocrText.trim() && (
        <button className="writing-submit-btn" onClick={doCorrect} disabled={correcting}>
          {correcting ? '批改中… 🤔' : '✨ AI 批改作文'}
        </button>
      )}

      {correctError && <div className="writing-error">{correctError}</div>}

      {/* Result */}
      {result && !result.raw && (
        <div className="ec-result-card">
          <div className="ec-result-header">
            <div>
              <div className="ec-result-title">批改结果</div>
              <div className="ec-result-summary">{result.summary}</div>
            </div>
            <div className="ec-result-score" style={{ color }}>
              {result.overallScore}
            </div>
          </div>

          {/* Score breakdown */}
          <div className="ec-score-grid">
            {result.grammar && (
              <div className="ec-score-item">
                <div className="ec-score-item-label">语法</div>
                <div className="ec-score-item-value" style={{ color }}>{result.grammar.score}</div>
                <div className="ec-score-item-text">{result.grammar.feedback}</div>
              </div>
            )}
            {result.vocabulary && (
              <div className="ec-score-item">
                <div className="ec-score-item-label">词汇</div>
                <div className="ec-score-item-value" style={{ color }}>{result.vocabulary.score}</div>
                <div className="ec-score-item-text">{result.vocabulary.feedback}</div>
              </div>
            )}
            {result.content && (
              <div className="ec-score-item">
                <div className="ec-score-item-label">内容</div>
                <div className="ec-score-item-value" style={{ color }}>{result.content.score}</div>
                <div className="ec-score-item-text">{result.content.feedback}</div>
              </div>
            )}
          </div>

          {/* Errors */}
          {result.errors?.length > 0 && (
            <div className="ec-errors-section">
              <div className="ec-section-title">错误详情</div>
              {result.errors.map((err, i) => (
                <div key={i} className="ec-error-item">
                  <div className="ec-error-badge ec-error-badge--type">{err.type}</div>
                  <div className="ec-error-orig">✗ {err.original}</div>
                  <div className="ec-error-fix">✓ {err.corrected}</div>
                  <div className="ec-error-exp">{err.explanation}</div>
                </div>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {result.suggestions?.length > 0 && (
            <div className="ec-suggestions-section">
              <div className="ec-section-title">改进建议</div>
              <ul className="ec-suggestions-list">
                {result.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="writing-result-actions">
            {result.errors?.length > 0 && onAddMistake && (
              <button className="writing-add-mistake-btn" onClick={handleAddMistake}>
                📝 加入错题本
              </button>
            )}
            <button className="writing-try-again-btn" onClick={reset}>重新批改</button>
          </div>
        </div>
      )}

      {result && result.raw && (
        <div className="writing-result-card">
          <div className="writing-result-header">
            <span className="writing-result-title">批改结果</span>
          </div>
          <p className="writing-result-raw">{result.raw}</p>
          <div className="writing-result-actions">
            {onAddMistake && (
              <button className="writing-add-mistake-btn" onClick={handleAddMistake}>📝 加入错题本</button>
            )}
            <button className="writing-try-again-btn" onClick={reset}>重新批改</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
//  Main Writing Page with top tabs
// ─────────────────────────────────────────────────────────────────

export default function Writing({ user, onBack, onAddMistake }) {
  const [tab, setTab] = useState('practice')

  return (
    <div className="writing-page">
      <h2 className="writing-page-title">
        English Writing
        <span className="writing-page-subtitle">AI-powered writing</span>
      </h2>

      <div className="writing-main-tabs">
        <button
          className={`writing-main-tab ${tab === 'practice' ? 'active' : ''}`}
          onClick={() => setTab('practice')}
        >
          ✏️ 写作练习
        </button>
        <button
          className={`writing-main-tab ${tab === 'correct' ? 'active' : ''}`}
          onClick={() => setTab('correct')}
        >
          📝 作文批改
        </button>
      </div>

      {tab === 'practice' ? (
        <WritingPractice onAddMistake={onAddMistake} />
      ) : (
        <EssayCorrection onAddMistake={onAddMistake} />
      )}
    </div>
  )
}
