import { useState } from 'react'
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

function countWords(text) {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length
}

export default function Writing({ user, onBack, onAddMistake }) {
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
      // Try to parse structured JSON from AI response
      let parsed = null
      try {
        parsed = typeof json.text === 'string' ? JSON.parse(json.text) : json
      } catch {
        parsed = null
      }
      if (parsed && parsed.score) {
        setResult(parsed)
      } else {
        // Fallback: show raw text
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

  // ── Writing view ─────────────────────────────────────────────
  if (activePrompt) {
    const color = LEVEL_COLOR[level]
    const hasGrammarErrors = result && (result.grammar?.errors > 0 || result.grammar?.feedback)

    return (
      <div className="writing-page">
        <button className="writing-back-link" onClick={backToPrompts}>
          ← Back to prompts
        </button>

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
          <div className="writing-wordcount">
            Words: {wordCount} / {activePrompt.targetWords}
          </div>
        </div>

        <button
          className="writing-submit-btn"
          onClick={submitForGrading}
          disabled={!userText.trim() || grading}
        >
          ✨ Submit for AI Grading
        </button>

        {grading && (
          <div className="writing-loading">
            AI is grading your work... 🤔
          </div>
        )}

        {gradingError && (
          <div className="writing-error">{gradingError}</div>
        )}

        {result && !result.raw && (
          <div className="writing-result-card">
            <div className="writing-result-header">
              <span className="writing-result-title">AI Grading Result</span>
              <span className="writing-overall-score" style={{ color }}>
                {result.score}
              </span>
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
                <button className="writing-add-mistake-btn" onClick={handleAddMistake}>
                  📝 Add errors to 错题本
                </button>
              )}
              <button className="writing-try-again-btn" onClick={tryAgain}>
                Try Again
              </button>
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
                <button className="writing-add-mistake-btn" onClick={handleAddMistake}>
                  📝 Add errors to 错题本
                </button>
              )}
              <button className="writing-try-again-btn" onClick={tryAgain}>
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ── Prompt list ───────────────────────────────────────────────
  return (
    <div className="writing-page">
      <h2 className="writing-page-title">
        English Writing
        <span className="writing-page-subtitle">AI-powered writing practice</span>
      </h2>

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
