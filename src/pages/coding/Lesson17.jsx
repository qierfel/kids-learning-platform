import { useState } from 'react'
import './Lesson.css'

const UPGRADES = [
  {
    id: 'counter',
    label: '加一个点赞计数器',
    emoji: '👍',
    desc: '每次点击按钮，数字加一',
    v1: '一个静态的按钮，点击没有反应',
    v2: '按钮变成计数器，显示点击次数',
  },
  {
    id: 'toggle',
    label: '加一个显示/隐藏功能',
    emoji: '👁️',
    desc: '点击按钮展开或收起内容',
    v1: '所有内容都显示在页面上',
    v2: '有些内容可以折叠，点击展开',
  },
  {
    id: 'theme',
    label: '加一个深色/浅色切换',
    emoji: '🌙',
    desc: '切换页面的颜色主题',
    v1: '只有一种颜色风格',
    v2: '可以在浅色和深色之间切换',
  },
]

const VERSION_HISTORY = [
  { v: 'v1.0', desc: '基础版——能运行，有基本功能' },
  { v: 'v1.1', desc: '修复Bug——把发现的问题都修好' },
  { v: 'v2.0', desc: '功能升级——加入新功能，体验更好' },
  { v: 'v2.1', desc: '外观优化——让界面更好看' },
]

const QUIZ = [
  {
    q: '什么是"迭代"？',
    options: ['把作品删掉重做', '一次次小步改进，让作品越来越好', '等到完美再发布', '让别人帮你做'],
    correct: 1,
    explain: '"迭代"就是不断小步改进。先做出基础版，发现问题就修，想到新功能就加——这是专业开发者的工作方式。',
  },
  {
    q: '给作品加新功能时，最好的做法是？',
    options: ['把所有想到的功能一次全加进去', '一次只加一个功能，测试没问题再加下一个', '功能越多越好，越快越好', '不加功能，保持简单就好'],
    correct: 1,
    explain: '一次只加一个功能！这样如果出了Bug，你知道是哪里出的问题。同时加很多功能，找Bug就很难了。',
  },
  {
    q: '版本号"v2.0"通常意味着什么？',
    options: ['有2个Bug', '只做了2个改动', '有重大更新，通常是新功能或大改版', '上线了2次'],
    correct: 2,
    explain: '版本号是给升级做记录的。v1.x 通常是小改动，v2.0 意味着有重大更新。这让大家一看就知道改了多少。',
  },
]

export default function Lesson17({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [selectedUpgrade, setSelectedUpgrade] = useState(null)
  const [completedUpgrades, setCompletedUpgrades] = useState([])

  // Counter upgrade
  const [count, setCount] = useState(0)
  // Toggle upgrade
  const [showSecret, setShowSecret] = useState(false)
  // Theme upgrade
  const [darkMode, setDarkMode] = useState(false)

  // AI upgrade advisor
  const [projectDesc, setProjectDesc] = useState('')
  const [aiAdvice, setAiAdvice] = useState('')
  const [loadingAi, setLoadingAi] = useState(false)
  const [aiError, setAiError] = useState('')

  // Quiz
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  const accentColor = '#ec4899'

  async function handleGetAdvice() {
    if (!projectDesc.trim()) return
    setLoadingAi(true)
    setAiError('')
    setAiAdvice('')

    const prompt = `我是一个10-12岁的编程学习者，我做了一个小项目，想升级它。请给我3个具体的升级建议。

我的项目描述：${projectDesc.trim()}

请给出3个具体的升级点，每个建议包括：
- 升级内容（加什么功能）
- 预期效果（用户会有什么更好的体验）
- 难度评估（简单/中等/有挑战）

每个建议不超过40字，语气轻松友好，鼓励孩子去尝试。`

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ type: 'chat', payload: { messages: [{ role: 'user', content: prompt }], subject: '作品升级顾问' } }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setAiAdvice(data.text || '')
    } catch {
      setAiError('AI暂时没有响应，请稍后再试。')
    } finally {
      setLoadingAi(false)
    }
  }

  function handleCompleteUpgrade(id) {
    setCompletedUpgrades(c => c.includes(id) ? c : [...c, id])
    setSelectedUpgrade(null)
  }

  function handleQuizAnswer(optIdx) {
    if (quizAnswer !== null) return
    const correct = optIdx === QUIZ[quizIdx].correct
    setQuizAnswer({ optIdx, correct })
    if (correct) setQuizScore(s => s + 1)
  }

  function nextQuestion() {
    if (quizIdx + 1 >= QUIZ.length) setQuizDone(true)
    else { setQuizIdx(i => i + 1); setQuizAnswer(null) }
  }

  const upgrade = UPGRADES.find(u => u.id === selectedUpgrade)

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回课程列表</button>

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#fce7f3', color: '#9d174d' }}>第 17 课 · 模块 C</span>
        <span className="lesson-hero-emoji">⬆️</span>
        <h1 className="lesson-hero-title">让作品升级</h1>
        <p className="lesson-hero-sub">Level Up Your Work</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>理解什么是"迭代"和版本升级</li>
          <li>学会给作品添加新功能</li>
          <li>用AI获得升级建议并实施</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {['learn', 'do', 'ai', 'quiz', 'work'].map(t => (
          <button key={t} className={`lesson-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}
            style={tab === t ? { borderBottomColor: accentColor, color: accentColor } : {}}>
            {t === 'learn' ? '学一学' : t === 'do' ? '做一做' : t === 'ai' ? '用AI帮忙' : t === 'quiz' ? '测一测' : '我的作品'}
          </button>
        ))}
      </div>

      {tab === 'learn' && (
        <div className="lesson-content">
          <div className="lesson-section">
            <h2 className="lesson-section-title">⬆️ 什么是迭代？</h2>
            <p className="lesson-text">迭代就是：先做一个基础版，用起来发现问题，改进它，再加新功能，再改进……这样一次次小步升级的过程。</p>
            <div style={{ background: '#fdf2f8', border: '1.5px solid #f9a8d4', borderRadius: 12, padding: 14, marginTop: 12 }}>
              <div style={{ fontWeight: 700, color: '#9d174d', marginBottom: 8 }}>软件版本的进化：</div>
              {VERSION_HISTORY.map((v, i) => (
                <div key={v.v} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: i < VERSION_HISTORY.length - 1 ? 10 : 0 }}>
                  <div style={{ background: accentColor, color: '#fff', borderRadius: 6, padding: '3px 8px', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>{v.v}</div>
                  <div style={{ color: '#1e293b', fontSize: 14 }}>{v.desc}</div>
                  {i < VERSION_HISTORY.length - 1 && <div style={{ width: 0, borderLeft: '2px dashed #f9a8d4', height: 16, position: 'absolute', marginLeft: 26, marginTop: 26 }} />}
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">🛠️ 今天怎么升级？</h2>
            <div className="lesson-step-list">
              {[
                { step: '1', title: '选一个升级功能', desc: '从3个选项中选一个你想加的功能' },
                { step: '2', title: '亲手体验升级前后的差别', desc: '看看加了功能后，用户体验有什么变化' },
                { step: '3', title: '让AI给你的作品提建议', desc: '输入你的作品描述，AI给你3个具体升级方向' },
              ].map(s => (
                <div key={s.step} className="lesson-step-item">
                  <span className="lesson-step-num" style={{ background: accentColor }}>{s.step}</span>
                  <div><strong>{s.title}</strong><p>{s.desc}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-tip-box">
            💡 <strong>迭代原则：</strong>一次只加一个功能，测试没问题再加下一个。贪心一次加太多，Bug 就找不到了！
          </div>
        </div>
      )}

      {tab === 'do' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🚀 给作品加功能</h2>
          <p className="lesson-text">选一个功能，亲手体验"升级前"和"升级后"的差别！</p>

          {!selectedUpgrade ? (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
                {UPGRADES.map(u => (
                  <button key={u.id} onClick={() => setSelectedUpgrade(u.id)}
                    style={{ border: `2px solid ${completedUpgrades.includes(u.id) ? accentColor : '#e2e8f0'}`, borderRadius: 14, padding: '14px 16px', textAlign: 'left', background: completedUpgrades.includes(u.id) ? '#fdf2f8' : '#fff', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: 20, marginRight: 8 }}>{u.emoji}</span>
                        <span style={{ fontWeight: 700, color: '#1e293b' }}>{u.label}</span>
                        <div style={{ fontSize: 12, color: '#64748b', marginTop: 4, marginLeft: 28 }}>{u.desc}</div>
                      </div>
                      {completedUpgrades.includes(u.id)
                        ? <span style={{ color: accentColor, fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>✓ 已体验</span>
                        : <span style={{ color: '#94a3b8', fontSize: 13 }}>→ 试试</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <button onClick={() => setSelectedUpgrade(null)} style={{ fontSize: 13, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 12, textDecoration: 'underline' }}>← 返回选择</button>

              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>{upgrade.emoji} {upgrade.label}</div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div style={{ background: '#fff5f5', border: '1.5px solid #fca5a5', borderRadius: 12, padding: 12 }}>
                  <div style={{ fontSize: 12, color: '#ef4444', fontWeight: 700, marginBottom: 6 }}>✗ 升级前 v1.0</div>
                  <div style={{ fontSize: 13, color: '#475569' }}>{upgrade.v1}</div>
                </div>
                <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 12, padding: 12 }}>
                  <div style={{ fontSize: 12, color: '#10b981', fontWeight: 700, marginBottom: 6 }}>✓ 升级后 v2.0</div>
                  <div style={{ fontSize: 13, color: '#475569' }}>{upgrade.v2}</div>
                </div>
              </div>

              <div style={{ border: '2px solid #f9a8d4', borderRadius: 14, padding: 16, background: '#fdf2f8', marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#9d174d', marginBottom: 12 }}>🎮 升级后效果演示：</div>

                {selectedUpgrade === 'counter' && (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 48, fontWeight: 900, color: accentColor, marginBottom: 8 }}>{count}</div>
                    <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 10 }}>点击次数</div>
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                      <button className="lesson-btn" style={{ background: accentColor, margin: 0 }} onClick={() => setCount(c => c + 1)}>👍 点赞！</button>
                      <button className="lesson-btn" style={{ background: '#e2e8f0', color: '#475569', margin: 0 }} onClick={() => setCount(0)}>重置</button>
                    </div>
                  </div>
                )}

                {selectedUpgrade === 'toggle' && (
                  <div>
                    <div style={{ background: '#fff', borderRadius: 10, padding: 14, marginBottom: 10 }}>
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>我的个人页面</div>
                      <p style={{ fontSize: 14, color: '#475569', margin: 0 }}>大家好，我是一个爱学习的孩子！</p>
                    </div>
                    <button className="lesson-btn" style={{ background: accentColor, margin: 0 }} onClick={() => setShowSecret(s => !s)}>
                      {showSecret ? '🙈 收起我的秘密' : '👁️ 展开我的秘密'}
                    </button>
                    {showSecret && (
                      <div style={{ background: '#fff', borderRadius: 10, padding: 14, marginTop: 10, border: '1px dashed #f9a8d4' }}>
                        <div style={{ fontSize: 13, color: '#475569' }}>🌟 我的秘密：我最喜欢的颜色是粉色，梦想是成为一名工程师！</div>
                      </div>
                    )}
                  </div>
                )}

                {selectedUpgrade === 'theme' && (
                  <div style={{ background: darkMode ? '#1e293b' : '#fff', borderRadius: 10, padding: 14, transition: 'all 0.3s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <span style={{ fontWeight: 700, color: darkMode ? '#f1f5f9' : '#1e293b' }}>我的展示页</span>
                      <button onClick={() => setDarkMode(d => !d)} style={{ background: darkMode ? '#f1f5f9' : '#1e293b', color: darkMode ? '#1e293b' : '#f1f5f9', border: 'none', borderRadius: 20, padding: '4px 12px', fontSize: 12, cursor: 'pointer' }}>
                        {darkMode ? '☀️ 浅色' : '🌙 深色'}
                      </button>
                    </div>
                    <p style={{ fontSize: 13, color: darkMode ? '#94a3b8' : '#475569', margin: 0 }}>这是一个支持深色模式的展示页！</p>
                  </div>
                )}
              </div>

              <button className="lesson-btn" style={{ background: accentColor }} onClick={() => handleCompleteUpgrade(selectedUpgrade)}>
                ✅ 体验完成，标记升级！
              </button>
            </div>
          )}
        </div>
      )}

      {tab === 'ai' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🤖 让AI给你的作品提升级建议</h2>
          <p className="lesson-text">描述你现在的作品，AI会给你3个具体的升级方向！</p>

          <div className="l8-field">
            <label className="l8-label">📝 描述你现在的作品 *</label>
            <textarea
              style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: 10, padding: '10px 14px', fontSize: 14, fontFamily: 'inherit', minHeight: 80, resize: 'vertical', boxSizing: 'border-box', outline: 'none' }}
              value={projectDesc}
              onChange={e => setProjectDesc(e.target.value)}
              placeholder={'比如：我做了一个兴趣展示网站，有名字、爱好图标和AI生成的自我介绍，颜色是海洋蓝主题，还没有任何互动功能。'}
              maxLength={200}
            />
          </div>

          <button className="lesson-btn" style={{ background: projectDesc.trim() ? accentColor : '#e2e8f0', color: projectDesc.trim() ? '#fff' : '#94a3b8' }}
            disabled={!projectDesc.trim() || loadingAi} onClick={handleGetAdvice}>
            {loadingAi ? '💡 AI正在想方案...' : '⬆️ 给我升级建议！'}
          </button>

          {aiError && <div style={{ color: '#ef4444', fontSize: 13, marginTop: 10, padding: '8px 12px', background: '#fff5f5', borderRadius: 8 }}>{aiError}</div>}

          {aiAdvice && (
            <div style={{ marginTop: 14, padding: '16px', background: '#fdf2f8', border: '2px solid #f9a8d4', borderRadius: 12 }}>
              <div style={{ fontSize: 13, color: accentColor, fontWeight: 600, marginBottom: 8 }}>💡 AI的升级建议：</div>
              <div style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>{aiAdvice}</div>
              <button onClick={handleGetAdvice} style={{ marginTop: 10, fontSize: 12, color: accentColor, background: 'none', border: `1px solid ${accentColor}`, borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>
                重新生成建议
              </button>
            </div>
          )}

          <div className="ai-prompt-card" style={{ marginTop: 20 }}>
            <div className="ai-prompt-title">📋 让AI帮你设计升级路线图</div>
            <div className="ai-prompt-body">
              我的作品现在有这些功能：[列举现有功能]<br /><br />
              我想在接下来[1周/1个月]内升级它。<br />
              请帮我制定一个升级路线图，<br />
              按照从简单到难的顺序，<br />
              每次只加一个功能，<br />
              共3个升级步骤。
            </div>
          </div>
        </div>
      )}

      {tab === 'quiz' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🎯 测一测</h2>
          {!quizDone ? (
            <div className="quiz-wrap">
              <div className="quiz-progress">第 {quizIdx + 1} / {QUIZ.length} 题</div>
              <div className="quiz-question">{QUIZ[quizIdx].q}</div>
              <div className="quiz-options">
                {QUIZ[quizIdx].options.map((opt, i) => {
                  let cls = 'quiz-option'
                  if (quizAnswer !== null) {
                    if (i === QUIZ[quizIdx].correct) cls += ' correct reveal'
                    else if (i === quizAnswer.optIdx && !quizAnswer.correct) cls += ' wrong reveal'
                  }
                  return <button key={i} className={cls} onClick={() => handleQuizAnswer(i)}>{opt}</button>
                })}
              </div>
              {quizAnswer && <div className="quiz-explain">{quizAnswer.correct ? '✅ 正确！' : '❌ 再想想'} {QUIZ[quizIdx].explain}</div>}
              {quizAnswer && (
                <button className="lesson-btn" style={{ background: accentColor }} onClick={nextQuestion}>
                  {quizIdx + 1 < QUIZ.length ? '下一题 →' : '查看结果'}
                </button>
              )}
            </div>
          ) : (
            <div className="quiz-done">
              <div className="quiz-done-score">{quizScore}/{QUIZ.length}</div>
              <div className="quiz-done-msg">
                {quizScore === 3 ? '🎉 全对！你掌握了迭代思维！' : quizScore === 2 ? '👍 答对两题，快了！' : '💪 回去"学一学"复习一下迭代原理！'}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'work' && (
        <div className="lesson-content">
          <div className="certificate">
            <div className="certificate-title">⬆️ 作品升级 · 完成！</div>
            <div className="certificate-name">
              {completedUpgrades.length > 0 ? `体验了 ${completedUpgrades.length} 个升级功能` : '开始你的第一次升级！'}
            </div>
            <div className="certificate-sub">第 17 课 · 模块 C · AI 项目实践</div>
            <div style={{ fontSize: 14, color: '#93c5fd', margin: '16px 0', lineHeight: 1.8 }}>
              你学会了迭代的核心：<br />
              <strong style={{ color: '#bfdbfe' }}>v1.0 → 发现问题 → v1.1 → 加功能 → v2.0</strong><br />
              每一次小改进，都让作品更好！
            </div>
            <div style={{ fontSize: 24, letterSpacing: 4 }}>⭐⭐⭐</div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 600, color: '#475569', marginBottom: 10 }}>📋 今天体验的升级：</div>
            {UPGRADES.map(u => (
              <div key={u.id} style={{ background: completedUpgrades.includes(u.id) ? '#fdf2f8' : '#f8fafc', border: `1px solid ${completedUpgrades.includes(u.id) ? '#f9a8d4' : '#e2e8f0'}`, borderRadius: 10, padding: '10px 14px', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14 }}>{u.emoji} {u.label}</span>
                <span style={{ fontSize: 13, color: completedUpgrades.includes(u.id) ? accentColor : '#94a3b8', fontWeight: 600 }}>
                  {completedUpgrades.includes(u.id) ? '✓ 已体验' : '○ 未完成'}
                </span>
              </div>
            ))}
          </div>

          {aiAdvice && (
            <div style={{ marginTop: 12, padding: '14px', background: '#fdf2f8', border: '1.5px solid #f9a8d4', borderRadius: 12 }}>
              <div style={{ fontSize: 13, color: accentColor, fontWeight: 600, marginBottom: 6 }}>💡 你的作品升级建议（来自AI）：</div>
              <div style={{ fontSize: 13, color: '#1e293b', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{aiAdvice}</div>
            </div>
          )}

          <div className="lesson-next-preview" style={{ marginTop: 16 }}>
            <div className="lesson-next-title">🚀 最后一课预告：第 18 课 · 发布与展示</div>
            <p>这是你 18 课学习旅程的最后一站！你将学会向别人介绍你的作品，用AI生成展示演讲稿，完成结业！</p>
          </div>
        </div>
      )}
    </div>
  )
}
