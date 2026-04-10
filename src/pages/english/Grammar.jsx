import { useState } from 'react'
import { GRAMMAR_BOOK } from '../../data/grammarPoints'
import './Grammar.css'

const LEVEL_COLOR = { KET: '#10b981', PET: '#f59e0b', FCE: '#7c3aed' }

export default function Grammar({ user, onBack }) {
  const [activeChapter, setActiveChapter] = useState(0)
  const [activePoint, setActivePoint] = useState(null)
  const [activeTab, setActiveTab] = useState('explain')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResult, setAiResult] = useState('')
  const [quizItems, setQuizItems] = useState(null)
  const [userAnswers, setUserAnswers] = useState({})
  const [showAns, setShowAns] = useState(false)

  function openPoint(point) {
    setActivePoint(point)
    setActiveTab('explain')
    setAiResult('')
    setUserAnswers({})
    setShowAns(false)
    setQuizItems(null)
  }

  async function askAI(type) {
    if (!activePoint) return
    setAiLoading(true)
    setAiResult('')
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'grammar_explain',
          payload: {
            grammarPoint: activePoint.title,
            level: activePoint.level,
            queryType: type,
            summary: activePoint.summary,
          },
        }),
      })
      const json = await res.json()
      setAiResult(json.text || '')
    } catch { setAiResult('请求失败，请检查网络。') }
    setAiLoading(false)
  }

  async function generatePractice() {
    if (!activePoint) return
    setAiLoading(true)
    setQuizItems(null)
    setUserAnswers({})
    setShowAns(false)
    setAiResult('')
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'grammar_practice',
          payload: {
            grammarPoint: activePoint.title,
            level: activePoint.level,
          },
        }),
      })
      const json = await res.json()
      try {
        const parsed = JSON.parse(json.text)
        if (Array.isArray(parsed)) setQuizItems(parsed)
        else setAiResult(json.text || '')
      } catch { setAiResult(json.text || '') }
    } catch { setAiResult('请求失败，请检查网络。') }
    setAiLoading(false)
  }

  // ── Detail view ──────────────────────────────────────────────
  if (activePoint) {
    const chapter = GRAMMAR_BOOK[activeChapter]
    return (
      <div className="grammar-detail">
        <button className="grammar-back" onClick={() => setActivePoint(null)}>
          ← {chapter.chapter} {chapter.title}
        </button>

        <div className="grammar-detail-header">
          <h2 className="grammar-detail-title">{activePoint.title}</h2>
          <span
            className="grammar-level-badge"
            style={{ background: LEVEL_COLOR[activePoint.level] + '20', color: LEVEL_COLOR[activePoint.level] }}
          >
            {activePoint.level}
          </span>
        </div>
        <p className="grammar-summary">{activePoint.summary}</p>

        <div className="grammar-tabs">
          {[['explain', '📖 讲解'], ['traps', '⚠️ 易错点'], ['practice', '✏️ 练习']].map(([id, label]) => (
            <button
              key={id}
              className={`grammar-tab ${activeTab === id ? 'active' : ''}`}
              onClick={() => { setActiveTab(id); setAiResult('') }}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'explain' && (
          <div className="grammar-explain">
            <div className="grammar-section-title">句型结构</div>
            {activePoint.structure.map((s, i) => (
              <div key={i} className="grammar-structure-card">
                <div className="grammar-struct-label">{s.label}</div>
                <div className="grammar-struct-formula">{s.formula}</div>
                <div className="grammar-struct-example">e.g. {s.example}</div>
              </div>
            ))}

            {activePoint.signals && (
              <>
                <div className="grammar-section-title">时间标志词</div>
                <div className="grammar-signals">
                  {activePoint.signals.map((s, i) => (
                    <span key={i} className="grammar-signal-tag">{s}</span>
                  ))}
                </div>
              </>
            )}

            {activePoint.tips && (
              <div className="grammar-tip-box">
                <span className="grammar-tip-label">💡 记忆技巧</span>
                <p className="grammar-tip-text">{activePoint.tips}</p>
              </div>
            )}

            <div className="grammar-ai-row">
              <button className="grammar-ai-btn" onClick={() => askAI('deep')} disabled={aiLoading}>
                {aiLoading ? '分析中...' : '🤖 AI 举更多例句'}
              </button>
            </div>
            {aiResult && <div className="grammar-ai-result">{aiResult}</div>}
          </div>
        )}

        {activeTab === 'traps' && (
          <div className="grammar-traps">
            <div className="grammar-section-title">常见错误 & 纠正</div>
            {activePoint.traps && activePoint.traps.map((t, i) => (
              <div key={i} className="grammar-trap-card">
                <div className="trap-wrong">❌ {t.wrong}</div>
                <div className="trap-right">✅ {t.right}</div>
                <div className="trap-explain">📌 {t.explain}</div>
              </div>
            ))}
            <div className="grammar-ai-row">
              <button className="grammar-ai-btn" onClick={() => askAI('more_traps')} disabled={aiLoading}>
                {aiLoading ? '分析中...' : '🤖 AI 补充更多易错点'}
              </button>
            </div>
            {aiResult && <div className="grammar-ai-result">{aiResult}</div>}
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="grammar-practice">
            <div className="grammar-section-title">语法练习题</div>
            {!quizItems && (
              <button className="grammar-gen-btn" onClick={generatePractice} disabled={aiLoading}>
                {aiLoading ? '出题中...' : '🤖 AI 出练习题'}
              </button>
            )}
            {quizItems && (
              <>
                {quizItems.map((q, i) => (
                  <div key={i} className="grammar-quiz-item">
                    <div className="grammar-quiz-q">{i + 1}. {q.q}</div>
                    <input
                      className="grammar-quiz-input"
                      placeholder="写下你的答案"
                      value={userAnswers[i] || ''}
                      onChange={e => setUserAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                    />
                    {showAns && (
                      <div className="grammar-quiz-ans">
                        ✅ {q.a}{q.explain ? `  —— ${q.explain}` : ''}
                      </div>
                    )}
                  </div>
                ))}
                <div className="grammar-practice-actions">
                  {!showAns && (
                    <button className="grammar-show-btn" onClick={() => setShowAns(true)}>
                      查看答案
                    </button>
                  )}
                  <button
                    className="grammar-gen-btn"
                    onClick={generatePractice}
                    disabled={aiLoading}
                  >
                    {aiLoading ? '出题中...' : '换一批'}
                  </button>
                </div>
              </>
            )}
            {aiResult && <div className="grammar-ai-result">{aiResult}</div>}
          </div>
        )}
      </div>
    )
  }

  // ── Chapter grid + point list ────────────────────────────────
  const chapter = GRAMMAR_BOOK[activeChapter]
  const totalPoints = GRAMMAR_BOOK.reduce((sum, c) => sum + c.points.length, 0)

  return (
    <div className="grammar-page">
      <h2 className="grammar-page-title">
        英语语法
        <span className="grammar-subtitle">语法书 · {GRAMMAR_BOOK.length} 章 · {totalPoints} 考点</span>
      </h2>

      {/* Chapter grid */}
      <div className="grammar-chapter-grid">
        {GRAMMAR_BOOK.map((c, i) => (
          <button
            key={c.id}
            className={`grammar-chapter-card ${activeChapter === i ? 'active' : ''}`}
            onClick={() => setActiveChapter(i)}
          >
            <span className="gc-icon">{c.icon}</span>
            <span className="gc-num">{c.chapter}</span>
            <span className="gc-title">{c.title}</span>
            <span className="gc-count">{c.points.length} 考点</span>
          </button>
        ))}
      </div>

      {/* Points for selected chapter */}
      <div className="grammar-chapter-header">
        <span className="grammar-chapter-label">{chapter.icon} {chapter.chapter} · {chapter.title}</span>
        <span className="grammar-chapter-sub">{chapter.points.length} 个语法点</span>
      </div>

      <div className="grammar-point-list">
        {chapter.points.map(p => (
          <div key={p.id} className="grammar-point-card" onClick={() => openPoint(p)}>
            <div className="grammar-point-left">
              <div className="grammar-point-title">{p.title}</div>
              <div className="grammar-point-summary">{p.summary}</div>
            </div>
            <div className="grammar-point-right">
              <span
                className="grammar-level-badge"
                style={{ background: LEVEL_COLOR[p.level] + '20', color: LEVEL_COLOR[p.level] }}
              >
                {p.level}
              </span>
              <span className="grammar-arrow">›</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
