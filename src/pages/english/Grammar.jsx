import { useState } from 'react'
import { GRAMMAR_BOOK } from '../../data/grammarPoints'
import './Grammar.css'

const LEVEL_COLOR = { KET: '#10b981', PET: '#f59e0b', FCE: '#7c3aed' }

function getGrammarResources(point) {
  const base = [
    { icon: '🇬🇧', label: 'British Council - Grammar', url: `https://learnenglish.britishcouncil.org/grammar` },
    { icon: '📖', label: 'BBC Learning English - Grammar', url: 'https://www.bbc.co.uk/learningenglish/english/course/upper-intermediate/unit-1/tab/grammar' },
  ]
  if (point.level === 'KET') return [
    { icon: '🎯', label: 'Cambridge A2 Grammar Practice', url: 'https://www.cambridgeenglish.org/learning-english/activities-for-learners/?level=a2&skill=grammar' },
    ...base,
  ]
  if (point.level === 'PET') return [
    { icon: '🎯', label: 'Cambridge B1 Grammar Practice', url: 'https://www.cambridgeenglish.org/learning-english/activities-for-learners/?level=b1&skill=grammar' },
    ...base,
  ]
  return [
    { icon: '🎯', label: 'Cambridge B2 Grammar Practice', url: 'https://www.cambridgeenglish.org/learning-english/activities-for-learners/?level=b2&skill=grammar' },
    ...base,
  ]
}

export default function Grammar({ user, onBack }) {
  const [activeChapter, setActiveChapter] = useState(0)
  const [activePoint, setActivePoint] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
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

  async function callAPI(body) {
    const res = await fetch('/api/claude', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    const text = await res.text()
    let data
    try { data = JSON.parse(text) }
    catch { throw new Error(`服务器错误 (HTTP ${res.status})`) }
    if (!res.ok || data.error) {
      throw new Error(data.error || data.detail || `HTTP ${res.status}`)
    }
    return data
  }

  async function askAI(type) {
    if (!activePoint) return
    setAiLoading(true)
    setAiResult('')
    try {
      const data = await callAPI({
        type: 'grammar_explain',
        payload: {
          grammarPoint: activePoint.title,
          level: activePoint.level,
          queryType: type,
          summary: activePoint.summary,
        },
      })
      setAiResult(data.text || '（AI 未返回内容）')
    } catch (e) {
      setAiResult(`⚠️ 请求失败：${e.message}`)
    }
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
      const data = await callAPI({
        type: 'grammar_practice',
        payload: {
          grammarPoint: activePoint.title,
          level: activePoint.level,
        },
      })
      try {
        // Claude 可能返回 ```json ... ``` 包裹的文本，先剥离
        let raw = (data.text || '').replace(/^```json?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim()
        // 兜底：用正则提取 JSON 数组
        const match = raw.match(/\[[\s\S]*\]/)
        const parsed = JSON.parse(match ? match[0] : raw)
        if (Array.isArray(parsed)) setQuizItems(parsed)
        else setAiResult(data.text || '')
      } catch { setAiResult(data.text || '') }
    } catch (e) {
      setAiResult(`⚠️ 请求失败：${e.message}`)
    }
    setAiLoading(false)
  }

  // ── Detail view ──────────────────────────────────────────────
  if (activePoint) {
    const chapter = activePoint._chapterTitle
      ? { chapter: activePoint._chapter, title: activePoint._chapterTitle }
      : GRAMMAR_BOOK[activeChapter]
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
            {activePoint.explain && (
              <div className="grammar-intro-box">
                <p className="grammar-intro-text">{activePoint.explain}</p>
              </div>
            )}
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

            {/* 资源链接 */}
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 8 }}>📚 在线资源</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {getGrammarResources(activePoint).map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 13, color: '#3b82f6', textDecoration: 'none', padding: '6px 10px',
                      background: '#eff6ff', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>{r.icon}</span> {r.label}
                  </a>
                ))}
              </div>
            </div>
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

  // Search: flat list across all chapters
  const q = searchQuery.trim().toLowerCase()
  const allPoints = q
    ? GRAMMAR_BOOK.flatMap(c => c.points.map(p => ({ ...p, _chapter: c.chapter, _chapterTitle: c.title })))
        .filter(p =>
          p.title.toLowerCase().includes(q) ||
          (p.summary || '').toLowerCase().includes(q) ||
          (p.level || '').toLowerCase().includes(q)
        )
    : null

  return (
    <div className="grammar-page">
      <h2 className="grammar-page-title">
        英语语法
        <span className="grammar-subtitle">语法书 · {GRAMMAR_BOOK.length} 章 · {totalPoints} 考点</span>
      </h2>

      {/* Search bar */}
      <div className="grammar-search-row">
        <input
          className="grammar-search-input"
          type="text"
          placeholder="🔍 搜索语法点（如 tense、主语、KET）"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="grammar-search-clear" onClick={() => setSearchQuery('')}>✕</button>
        )}
      </div>

      {/* Search results */}
      {allPoints ? (
        <div className="grammar-point-list">
          {allPoints.length === 0 ? (
            <p className="grammar-empty">没有找到匹配的语法点</p>
          ) : (
            allPoints.map(p => (
              <div key={p.id} className="grammar-point-card" onClick={() => openPoint(p)}>
                <div className="grammar-point-left">
                  <div className="grammar-point-title">{p.title}</div>
                  <div className="grammar-point-summary">{p._chapter} · {p._chapterTitle}</div>
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
            ))
          )}
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}
