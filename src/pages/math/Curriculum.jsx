import { useState, useMemo } from 'react'
import mathCurriculum from '../../data/mathCurriculum'
import TextbookLink from '../../components/TextbookLink'
import './Curriculum.css'

const DIFFICULTY_LABELS = ['', '入门', '基础', '中等', '较难', '挑战']
const DIFFICULTY_COLORS = ['', '#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444']

export default function Curriculum({ onBack }) {
  const grades = mathCurriculum.grades
  const [selected, setSelected] = useState(`${grades[0].grade}-${grades[0].semester}`)
  const [openUnit, setOpenUnit] = useState(null)
  const [openTopic, setOpenTopic] = useState(null)
  // AI 功能状态
  const [activeTab, setActiveTab] = useState('info') // info | explain | practice
  const [aiLoading, setAiLoading] = useState(false)
  const [aiExplain, setAiExplain] = useState('')
  const [quizItems, setQuizItems] = useState(null)
  const [userAnswers, setUserAnswers] = useState({})
  const [showAns, setShowAns] = useState(false)
  const [practiceDiff, setPracticeDiff] = useState(0) // 0 = 用知识点默认难度

  const current = useMemo(
    () => grades.find(g => `${g.grade}-${g.semester}` === selected),
    [grades, selected]
  )

  const stats = useMemo(() => {
    if (!current) return { units: 0, topics: 0 }
    return {
      units: current.units.length,
      topics: current.units.reduce((sum, u) => sum + u.topics.length, 0),
    }
  }, [current])

  function selectTopic(id) {
    setOpenTopic(openTopic === id ? null : id)
    setActiveTab('info')
    setAiExplain('')
    setQuizItems(null)
    setUserAnswers({})
    setShowAns(false)
    setPracticeDiff(0)
  }

  async function fetchExplain(topic) {
    setAiLoading(true)
    setAiExplain('')
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'math_explain',
          payload: {
            topic: topic.name,
            grade: current.grade,
            objectives: topic.objectives,
            keyPoints: topic.keyPoints,
          },
        }),
      })
      const json = await res.json()
      setAiExplain(json.text || '请求失败')
    } catch { setAiExplain('网络错误，请重试') }
    setAiLoading(false)
  }

  async function fetchPractice(topic, diffOverride) {
    const diff = diffOverride || practiceDiff || topic.difficulty
    setAiLoading(true)
    setQuizItems(null)
    setUserAnswers({})
    setShowAns(false)
    setAiExplain('')
    if (diffOverride) setPracticeDiff(diffOverride)
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'math_practice',
          payload: {
            topic: topic.name,
            grade: current.grade,
            difficulty: diff,
          },
        }),
      })
      const json = await res.json()
      let raw = (json.text || '').replace(/^```json?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim()
      const match = raw.match(/\[[\s\S]*\]/)
      const parsed = JSON.parse(match ? match[0] : raw)
      if (Array.isArray(parsed)) setQuizItems(parsed)
      else setAiExplain(json.text || '')
    } catch { setAiExplain('出题失败，请重试') }
    setAiLoading(false)
  }

  // 找当前展开的 topic 对象
  const currentTopic = useMemo(() => {
    if (!current || !openTopic) return null
    for (const u of current.units) {
      const t = u.topics.find(t => t.id === openTopic)
      if (t) return t
    }
    return null
  }, [current, openTopic])

  return (
    <div className="curriculum">
      <button className="back-btn" onClick={onBack}>← 数学</button>
      <h2 className="curriculum-title">
        课程体系 <span className="edition">{mathCurriculum.edition}</span>
      </h2>

      <div className="grade-tabs">
        {grades.map(g => {
          const key = `${g.grade}-${g.semester}`
          return (
            <button
              key={key}
              className={selected === key ? 'grade-tab active' : 'grade-tab'}
              onClick={() => {
                setSelected(key)
                setOpenUnit(null)
                selectTopic(null)
              }}
            >
              {g.grade}年级{g.semester}册
            </button>
          )
        })}
      </div>

      {current && (
        <>
          <div className="stats">
            <span>{stats.units} 个单元</span>
            <span className="dot">·</span>
            <span>{stats.topics} 个知识点</span>
          </div>

          <TextbookLink subject="数学" grade={current.grade} semester={current.semester} />

          <div className="units">
            {current.units.map(unit => {
              const isOpen = openUnit === unit.id
              return (
                <div key={unit.id} className="unit-card">
                  <div
                    className="unit-header"
                    onClick={() => {
                      setOpenUnit(isOpen ? null : unit.id)
                      selectTopic(null)
                    }}
                  >
                    <div className="unit-order">{unit.order}</div>
                    <div className="unit-info">
                      <div className="unit-name">{unit.name}</div>
                      <div className="unit-meta">{unit.topics.length} 个知识点</div>
                    </div>
                    <div className="unit-expand">{isOpen ? '▲' : '▼'}</div>
                  </div>

                  {isOpen && (
                    <div className="unit-body">
                      {unit.overview && <div className="unit-overview">{unit.overview}</div>}
                      <div className="topic-list">
                        {unit.topics.map(topic => {
                          const tOpen = openTopic === topic.id
                          return (
                            <div key={topic.id} className="topic">
                              <div
                                className="topic-header"
                                onClick={() => selectTopic(topic.id)}
                              >
                                <div className="topic-name">{topic.name}</div>
                                <div
                                  className="difficulty-badge"
                                  style={{
                                    background: DIFFICULTY_COLORS[topic.difficulty] + '22',
                                    color: DIFFICULTY_COLORS[topic.difficulty],
                                  }}
                                >
                                  {DIFFICULTY_LABELS[topic.difficulty]}
                                </div>
                                <div className="topic-expand">{tOpen ? '−' : '+'}</div>
                              </div>

                              {tOpen && (
                                <div className="topic-body">
                                  {/* 三个 tab */}
                                  <div className="topic-tabs">
                                    {[['info', '📋 概要'], ['explain', '📖 讲解'], ['practice', '✏️ 练习']].map(([id, label]) => (
                                      <button
                                        key={id}
                                        className={`topic-tab ${activeTab === id ? 'active' : ''}`}
                                        onClick={() => setActiveTab(id)}
                                      >
                                        {label}
                                      </button>
                                    ))}
                                  </div>

                                  {activeTab === 'info' && (
                                    <div className="topic-info">
                                      {topic.objectives?.length > 0 && (
                                        <Section title="学习目标" items={topic.objectives} />
                                      )}
                                      {topic.keyPoints?.length > 0 && (
                                        <Section title="核心概念" items={topic.keyPoints} accent />
                                      )}
                                      {topic.commonMistakes?.length > 0 && (
                                        <Section title="常见易错" items={topic.commonMistakes} warn />
                                      )}
                                    </div>
                                  )}

                                  {activeTab === 'explain' && (
                                    <div className="topic-explain">
                                      {!aiExplain && !aiLoading && (
                                        <button className="ai-btn" onClick={() => fetchExplain(topic)}>
                                          🤖 AI 讲解这个知识点
                                        </button>
                                      )}
                                      {aiLoading && activeTab === 'explain' && !aiExplain && (
                                        <div className="ai-loading">正在生成讲解...</div>
                                      )}
                                      {aiExplain && (
                                        <div className="ai-result">{aiExplain}</div>
                                      )}
                                    </div>
                                  )}

                                  {activeTab === 'practice' && (() => {
                                    const curDiff = practiceDiff || topic.difficulty
                                    const nextDiff = Math.min(curDiff + 1, 5)
                                    // 判定全对：showAns 且每题用户答案包含正确答案关键内容
                                    const allCorrect = showAns && quizItems && quizItems.every((q, i) => {
                                      const ua = (userAnswers[i] || '').trim()
                                      const ca = String(q.a).trim()
                                      return ua && (ua === ca || ca.includes(ua) || ua.includes(ca))
                                    })

                                    return (
                                    <div className="topic-practice">
                                      <div className="practice-diff-bar">
                                        当前难度：
                                        <span
                                          className="difficulty-badge"
                                          style={{
                                            background: DIFFICULTY_COLORS[curDiff] + '22',
                                            color: DIFFICULTY_COLORS[curDiff],
                                          }}
                                        >
                                          {DIFFICULTY_LABELS[curDiff]}
                                        </span>
                                      </div>

                                      {!quizItems && (
                                        <button
                                          className="ai-btn"
                                          onClick={() => fetchPractice(topic)}
                                          disabled={aiLoading}
                                        >
                                          {aiLoading ? '出题中...' : '🤖 AI 出练习题'}
                                        </button>
                                      )}

                                      {quizItems && (
                                        <>
                                          {quizItems.map((q, i) => (
                                            <div key={i} className="quiz-item">
                                              <div className="quiz-q">
                                                <span className="quiz-num">{i + 1}.</span>
                                                {q.type && <span className="quiz-type">{q.type}</span>}
                                                {q.q}
                                              </div>
                                              <input
                                                className="quiz-input"
                                                placeholder="写下你的答案"
                                                value={userAnswers[i] || ''}
                                                onChange={e => setUserAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                                              />
                                              {showAns && (
                                                <div className="quiz-ans">
                                                  ✅ {q.a}
                                                  {q.explain && <span className="quiz-explain"> —— {q.explain}</span>}
                                                </div>
                                              )}
                                            </div>
                                          ))}

                                          {/* 全对 → 升级提示 */}
                                          {allCorrect && curDiff < 5 && (
                                            <div className="level-up-banner">
                                              <div className="level-up-text">🎉 全部正确！挑战更高难度？</div>
                                              <button
                                                className="level-up-btn"
                                                onClick={() => fetchPractice(topic, nextDiff)}
                                                disabled={aiLoading}
                                              >
                                                {aiLoading ? '出题中...' : `⬆️ 升级到「${DIFFICULTY_LABELS[nextDiff]}」`}
                                              </button>
                                            </div>
                                          )}

                                          {allCorrect && curDiff >= 5 && (
                                            <div className="level-up-banner max">
                                              <div className="level-up-text">🏆 最高难度全对！这个知识点你完全掌握了！</div>
                                            </div>
                                          )}

                                          <div className="quiz-actions">
                                            {!showAns && (
                                              <button className="quiz-show-btn" onClick={() => setShowAns(true)}>
                                                查看答案
                                              </button>
                                            )}
                                            <button
                                              className="ai-btn"
                                              onClick={() => fetchPractice(topic)}
                                              disabled={aiLoading}
                                            >
                                              {aiLoading ? '出题中...' : '换一批（同难度）'}
                                            </button>
                                          </div>
                                        </>
                                      )}

                                      {aiExplain && !quizItems && (
                                        <div className="ai-result">{aiExplain}</div>
                                      )}
                                    </div>
                                    )
                                  })()}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

function Section({ title, items, accent, warn }) {
  return (
    <div className={`section ${accent ? 'accent' : ''} ${warn ? 'warn' : ''}`}>
      <div className="section-title">{title}</div>
      <ul className="section-list">
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </div>
  )
}
