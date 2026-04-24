import { useState } from 'react'
import './Lesson.css'

const PROJECT_TYPES = [
  { id: 'intro', label: '自我介绍页', emoji: '👤', desc: '展示你是谁、你的爱好和梦想' },
  { id: 'hobby', label: '兴趣展示页', emoji: '❤️', desc: '展示你最喜欢的东西' },
  { id: 'welcome', label: '欢迎小页面', emoji: '🎉', desc: '做一个有趣的欢迎界面' },
]

const THEMES = [
  { id: 'ocean', label: '海洋蓝', primary: '#0ea5e9', secondary: '#e0f2fe', text: '#0c4a6e' },
  { id: 'forest', label: '森林绿', primary: '#10b981', secondary: '#d1fae5', text: '#064e3b' },
  { id: 'candy', label: '糖果粉', primary: '#ec4899', secondary: '#fce7f3', text: '#831843' },
  { id: 'galaxy', label: '星空紫', primary: '#8b5cf6', secondary: '#ede9fe', text: '#4c1d95' },
]

const BUTTON_TYPES = [
  { id: 'counter', label: '点赞计数器', emoji: '👍' },
  { id: 'toggle', label: '显示/隐藏内容', emoji: '👁️' },
  { id: 'mood', label: '心情切换', emoji: '😊' },
]

const MOODS = ['😊', '😄', '🤩', '🥳', '🎉']

const QUIZ = [
  {
    q: '完成一个小作品后，向别人介绍时最重要的是说什么？',
    options: ['代码有多少行', '这个作品是什么、有什么功能、你是怎么做的', '它比别人的好在哪里', '花了多少时间'],
    correct: 1,
    explain: '介绍作品时要说清楚：做的是什么、能做什么、怎么做的。这三点能让别人快速理解你的作品。',
  },
  {
    q: '在AI编程启蒙的学习路径中，1-6课完成后的下一步是？',
    options: ['学高数', '开始做真正的网页和小工具', '学会所有编程语言', '立刻找工作'],
    correct: 1,
    explain: '认识了AI之后，下一步是"用AI做东西"——真正动手做网页和小工具，把知识变成作品。',
  },
  {
    q: '做一个好项目，最关键的第一步是？',
    options: ['找最好的工具', '写最长的代码', '想清楚要做什么、为什么做', '先设计最复杂的功能'],
    correct: 2,
    explain: '想清楚"要做什么、为什么做"是最关键的第一步。目标明确，后面所有步骤才有方向。',
  },
]

export default function Lesson12({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [step, setStep] = useState(1)
  const [projType, setProjType] = useState(null)
  const [projName, setProjName] = useState('')
  const [projDesc, setProjDesc] = useState('')
  const [projTheme, setProjTheme] = useState('ocean')
  const [projButton, setProjButton] = useState(null)
  const [completed, setCompleted] = useState(false)
  const [count, setCount] = useState(0)
  const [showExtra, setShowExtra] = useState(false)
  const [moodIdx, setMoodIdx] = useState(0)
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

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

  const theme = THEMES.find(t => t.id === projTheme)

  const canNext1 = projType !== null
  const canNext2 = projName.trim().length > 0
  const canNext3 = true
  const canNext4 = projButton !== null

  function handleComplete() {
    setCompleted(true)
    setTab('work')
  }

  const selectedType = PROJECT_TYPES.find(t => t.id === projType)
  const selectedBtn = BUTTON_TYPES.find(b => b.id === projButton)

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回课程列表</button>

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#fef3c7', color: '#b45309' }}>第 12 课</span>
        <span className="lesson-hero-emoji">🌟</span>
        <h1 className="lesson-hero-title">完成我的小作品</h1>
        <p className="lesson-hero-sub">My Mini Project</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>整合前面所有学过的知识</li>
          <li>独立完成一个小网页作品</li>
          <li>学会向别人介绍自己的作品</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {['learn', 'do', 'ai', 'quiz', 'work'].map(t => (
          <button key={t} className={`lesson-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}
            style={tab === t ? { borderBottomColor: '#f59e0b', color: '#f59e0b' } : {}}>
            {t === 'learn' ? '学一学' : t === 'do' ? '做一做' : t === 'ai' ? '用AI帮忙' : t === 'quiz' ? '测一测' : '我的作品'}
          </button>
        ))}
      </div>

      {tab === 'learn' && (
        <div className="lesson-content">
          <div className="lesson-section">
            <h2 className="lesson-section-title">🌟 你已经学了很多！</h2>
            <p className="lesson-text">回顾一下这12节课你走过的路：</p>
            <div className="l12-journey">
              {[
                { lessons: '第1-6课', title: 'AI素养启蒙', items: ['认识AI', '理解数据', '训练模型', '语言理解', '图像识别', '决策树'], color: '#6366f1' },
                { lessons: '第7-11课', title: 'AI创作入门', items: ['网页结构', '内容规划', '视觉设计', '按钮交互', 'AI协作提问'], color: '#f59e0b' },
                { lessons: '第12课', title: '完成作品', items: ['整合所有技能', '独立完成项目', '展示你的创作'], color: '#10b981' },
              ].map(block => (
                <div key={block.lessons} className="l12-block" style={{ borderColor: block.color }}>
                  <div className="l12-block-header" style={{ background: block.color, color: '#fff' }}>
                    {block.lessons}：{block.title}
                  </div>
                  <div className="l12-block-items">
                    {block.items.map(item => (
                      <span key={item} className="l12-block-tag" style={{ background: `${block.color}20`, color: block.color }}>
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lesson-section">
            <h2 className="lesson-section-title">🚀 如何展示你的作品</h2>
            <p className="lesson-text">做完作品，下一步是学会向别人介绍它。</p>
            <div className="lesson-step-list">
              {[
                { step: '1', title: '说清楚"做了什么"', desc: '"我做了一个个人介绍网页，可以展示我的名字和爱好。"' },
                { step: '2', title: '说一个"我学到的"', desc: '"我第一次知道按钮可以控制显示和隐藏内容。"' },
                { step: '3', title: '说一个"下次想改进的"', desc: '"下次我想加上一张真实的照片，让网页更像真的。"' },
              ].map(s => (
                <div key={s.step} className="lesson-step-item">
                  <span className="lesson-step-num" style={{ background: '#f59e0b' }}>{s.step}</span>
                  <div><strong>{s.title}</strong><p>{s.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="lesson-tip-box">
            💡 <strong>重要：</strong>做完比做好更重要！先完成一个能运行的版本，再一步步改进——这才是真正的工程师思维。
          </div>
        </div>
      )}

      {tab === 'do' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🏗️ 我的第一个作品</h2>

          <div className="l12-steps-header">
            {[1, 2, 3, 4, 5].map(s => (
              <div key={s} className={`l12-step-dot${step >= s ? ' done' : ''}${step === s ? ' current' : ''}`}>
                <span>{step > s ? '✓' : s}</span>
              </div>
            ))}
          </div>
          <div className="l12-step-label">
            {step === 1 && '第1步：选择作品类型'}
            {step === 2 && '第2步：起名字，写简介'}
            {step === 3 && '第3步：选颜色风格'}
            {step === 4 && '第4步：添加一个按钮'}
            {step === 5 && '第5步：预览你的作品'}
          </div>

          {step === 1 && (
            <div className="l12-step-content">
              <p className="lesson-text">你想做哪种小网页？</p>
              <div className="l12-type-grid">
                {PROJECT_TYPES.map(pt => (
                  <button
                    key={pt.id}
                    className={`l12-type-btn${projType === pt.id ? ' selected' : ''}`}
                    onClick={() => setProjType(pt.id)}
                  >
                    <span className="l12-type-emoji">{pt.emoji}</span>
                    <strong>{pt.label}</strong>
                    <span>{pt.desc}</span>
                  </button>
                ))}
              </div>
              <button className="lesson-btn" style={{ background: canNext1 ? '#f59e0b' : '#e2e8f0', color: canNext1 ? '#fff' : '#94a3b8' }}
                disabled={!canNext1} onClick={() => setStep(2)}>下一步 →</button>
            </div>
          )}

          {step === 2 && (
            <div className="l12-step-content">
              <p className="lesson-text">给你的网页起个名字，写一句简介。</p>
              <div className="l8-field">
                <label className="l8-label">网页名称 *</label>
                <input className="l8-input" value={projName} onChange={e => setProjName(e.target.value)}
                  placeholder={projType === 'intro' ? '比如：小明的个人主页' : projType === 'hobby' ? '比如：我爱画画！' : '比如：欢迎来访！'} maxLength={20} />
              </div>
              <div className="l8-field">
                <label className="l8-label">一句话简介</label>
                <input className="l8-input" value={projDesc} onChange={e => setProjDesc(e.target.value)}
                  placeholder="比如：这是我用心做的第一个网页！" maxLength={40} />
              </div>
              <div className="l12-nav-btns">
                <button className="lesson-btn" style={{ background: '#e2e8f0', color: '#475569' }} onClick={() => setStep(1)}>← 上一步</button>
                <button className="lesson-btn" style={{ background: canNext2 ? '#f59e0b' : '#e2e8f0', color: canNext2 ? '#fff' : '#94a3b8' }}
                  disabled={!canNext2} onClick={() => setStep(3)}>下一步 →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="l12-step-content">
              <p className="lesson-text">选择你喜欢的颜色主题：</p>
              <div className="l12-theme-grid">
                {THEMES.map(th => (
                  <button key={th.id}
                    className={`l12-theme-btn${projTheme === th.id ? ' selected' : ''}`}
                    style={{ background: th.secondary, borderColor: projTheme === th.id ? th.primary : 'transparent' }}
                    onClick={() => setProjTheme(th.id)}>
                    <span className="l12-theme-dot" style={{ background: th.primary }} />
                    <strong style={{ color: th.primary }}>{th.label}</strong>
                    {projTheme === th.id && <span>✓</span>}
                  </button>
                ))}
              </div>
              <div className="l12-nav-btns">
                <button className="lesson-btn" style={{ background: '#e2e8f0', color: '#475569' }} onClick={() => setStep(2)}>← 上一步</button>
                <button className="lesson-btn" style={{ background: '#f59e0b', color: '#fff' }} onClick={() => setStep(4)}>下一步 →</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="l12-step-content">
              <p className="lesson-text">选择一个交互按钮加入你的网页：</p>
              <div className="l12-btn-grid">
                {BUTTON_TYPES.map(bt => (
                  <button key={bt.id}
                    className={`l12-btn-choice${projButton === bt.id ? ' selected' : ''}`}
                    onClick={() => setProjButton(bt.id)}>
                    <span>{bt.emoji}</span>
                    <strong>{bt.label}</strong>
                  </button>
                ))}
              </div>
              <div className="l12-nav-btns">
                <button className="lesson-btn" style={{ background: '#e2e8f0', color: '#475569' }} onClick={() => setStep(3)}>← 上一步</button>
                <button className="lesson-btn" style={{ background: canNext4 ? '#f59e0b' : '#e2e8f0', color: canNext4 ? '#fff' : '#94a3b8' }}
                  disabled={!canNext4} onClick={() => setStep(5)}>预览作品 →</button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="l12-step-content">
              <p className="lesson-text">你的作品预览：</p>
              <div className="l12-preview" style={{ borderColor: theme.primary }}>
                <div className="l12-preview-header" style={{ background: theme.primary }}>
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>{projName || '我的网页'}</span>
                </div>
                <div className="l12-preview-hero" style={{ background: theme.secondary }}>
                  <div className="l12-preview-icon">{selectedType?.emoji || '🌟'}</div>
                  <h2 style={{ color: theme.primary, margin: '8px 0 4px', fontSize: 20 }}>{projName}</h2>
                  {projDesc && <p style={{ color: theme.text, fontSize: 13, margin: 0 }}>{projDesc}</p>}
                </div>
                <div className="l12-preview-body">
                  <div className="l12-preview-btn-demo">
                    {projButton === 'counter' && (
                      <div className="l12-interact-demo">
                        <span style={{ fontSize: 24, fontWeight: 800, color: theme.primary }}>{count}</span>
                        <button className="l12-demo-btn" style={{ background: theme.primary }} onClick={() => setCount(c => c + 1)}>
                          👍 点赞！
                        </button>
                      </div>
                    )}
                    {projButton === 'toggle' && (
                      <div className="l12-interact-demo">
                        <button className="l12-demo-btn" style={{ background: theme.primary }} onClick={() => setShowExtra(s => !s)}>
                          {showExtra ? '🙈 收起内容' : '👁️ 展开内容'}
                        </button>
                        {showExtra && <p style={{ fontSize: 13, color: theme.text, marginTop: 8 }}>这是你隐藏的内容！点上面按钮可以收起。</p>}
                      </div>
                    )}
                    {projButton === 'mood' && (
                      <div className="l12-interact-demo">
                        <span style={{ fontSize: 40 }}>{MOODS[moodIdx]}</span>
                        <button className="l12-demo-btn" style={{ background: theme.primary }} onClick={() => setMoodIdx(i => (i + 1) % MOODS.length)}>
                          换个心情！
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="l12-preview-footer" style={{ color: theme.text, opacity: 0.6, fontSize: 11, marginTop: 12 }}>
                    Made with ❤️ by AI编程学习
                  </div>
                </div>
              </div>
              <div className="l12-nav-btns">
                <button className="lesson-btn" style={{ background: '#e2e8f0', color: '#475569' }} onClick={() => setStep(4)}>← 修改</button>
                <button className="lesson-btn" style={{ background: '#f59e0b', color: '#fff' }} onClick={handleComplete}>
                  🎉 完成！查看我的作品
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'ai' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🤖 让AI帮你完善作品</h2>
          <p className="lesson-text">用这个模板，把你的作品发给AI，让它帮你继续改进！</p>

          <div className="ai-prompt-card">
            <div className="ai-prompt-title">📋 完整项目提问模板</div>
            <div className="ai-prompt-body">
              我正在做一个{projName || '[作品名]'}网页作品。<br /><br />
              <strong>作品类型：</strong>{selectedType?.label || '[类型]'}<br />
              <strong>颜色风格：</strong>{theme.label}<br />
              <strong>已有功能：</strong>{selectedBtn?.label || '[按钮类型]'}<br /><br />
              <strong>我想改进的地方：</strong><br />
              1. [比如：加上一张图片]<br />
              2. [比如：让颜色更好看]<br />
              3. [比如：加上我的联系方式]<br /><br />
              请先帮我完成第1个改进，其他的等我确认后再继续。
            </div>
          </div>

          <div className="lesson-tip-box" style={{ marginTop: 16 }}>
            <strong>你的下一步方向：</strong>
            <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
              <li>进阶：学习真正的HTML/CSS/JavaScript</li>
              <li>工具：试试 Replit、CodePen 等在线编辑器</li>
              <li>AI：用 Claude 或 ChatGPT 帮你继续改进作品</li>
              <li>分享：把你的网页链接发给朋友看！</li>
            </ul>
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
                <button className="lesson-btn" style={{ background: '#f59e0b' }} onClick={nextQuestion}>
                  {quizIdx + 1 < QUIZ.length ? '下一题 →' : '查看结果'}
                </button>
              )}
            </div>
          ) : (
            <div className="quiz-done">
              <div className="quiz-done-score">{quizScore}/{QUIZ.length}</div>
              <div className="quiz-done-msg">
                {quizScore === 3 ? '🎉 满分！AI创作入门模块全部完成！' : quizScore === 2 ? '👍 答对两题，非常棒！' : '💪 没关系，回去学一学再来挑战！'}
              </div>
              <p style={{ color: '#64748b', fontSize: 14 }}>去"做一做"完成你的第一个作品吧！🚀</p>
            </div>
          )}
        </div>
      )}

      {tab === 'work' && (
        <div className="lesson-content">
          {completed && projName ? (
            <>
              <div className="certificate">
                <div className="certificate-title">🌟 作品完成！</div>
                <div className="certificate-name">{projName}</div>
                <div className="certificate-sub">{selectedType?.label} · {theme.label} · {selectedBtn?.label}</div>
                <div style={{ fontSize: 14, color: '#93c5fd', margin: '16px 0', lineHeight: 1.8 }}>
                  {projDesc && <div style={{ marginBottom: 8 }}>"{projDesc}"</div>}
                  恭喜你完成了 AI 编程创作入门的全部 12 课！<br />
                  你已经从"认识AI"走到了"用AI做作品"。<br />
                  这只是开始——继续创作，不断进步！
                </div>
                <div style={{ fontSize: 28, letterSpacing: 4 }}>⭐⭐⭐</div>
              </div>

              <div className="l12-share-card">
                <div className="l12-share-title">📢 介绍你的作品</div>
                <div className="l12-share-script">
                  我做了一个 <strong>{selectedType?.label || '小网页'}</strong>，叫 <strong>「{projName}」</strong>。
                  {projDesc && ` ${projDesc}`}
                  {' '}用的是<strong>{theme.label}</strong>颜色风格，还加了<strong>{selectedBtn?.label}</strong>功能。
                  <br /><br />
                  我在这个作品里学到了：网页的结构、如何选颜色、如何让按钮有反应，以及怎么向AI提问来帮我做得更好。
                  <br /><br />
                  下次我想继续改进它，加上更多功能！
                </div>
                <div className="lesson-tip-box" style={{ marginTop: 12 }}>
                  🎤 把这段话读给家人或朋友听——你就完成了你的第一次"作品展示"！
                </div>
              </div>

              <div className="lesson-next-preview" style={{ marginTop: 16 }}>
                <div className="lesson-next-title">🚀 下一阶段预告：模块 C · AI 项目实践</div>
                <p>你已经完成了模块 B 的全部 12 课！下一阶段，你将学习做更完整的小项目——输入/输出工具、问答小程序、兴趣展示网站……继续用 AI 创作，越做越厉害！</p>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🚧</div>
              <p>先去"做一做"完成你的作品，然后回来这里查看！</p>
              <button className="lesson-btn" style={{ background: '#f59e0b', margin: '16px auto' }} onClick={() => setTab('do')}>
                去做一做 →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
