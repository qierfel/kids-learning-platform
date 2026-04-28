import { useState } from 'react'
import './Lesson.css'
import PromptCompareLab from './PromptCompareLab'

const MOODS = ['😐', '🙂', '😄', '😁', '🤩']

const QUIZ = [
  {
    q: '网页上的"点击事件"是什么意思？',
    options: ['网页每隔一段时间自动刷新', '用户点击某个元素后触发的动作', '网页被别人点击打开', '鼠标移上去就会消失'],
    correct: 1,
    explain: '点击事件（Click Event）就是用户点击某个按钮或元素时，网页"监听"到这个动作并执行某些代码。',
  },
  {
    q: '下面哪个是"点击按钮后触发动作"的好例子？',
    options: ['背景颜色一直自动变化', '点击"展开详情"按钮后显示更多内容', '图片随机移动位置', '文字不停地在屏幕上跑'],
    correct: 1,
    explain: '点击按钮后触发"显示更多内容"是典型的交互设计——用户主动操作，网页响应，这才叫"互动"。',
  },
  {
    q: '如果你想做一个"点一次显示、再点一次隐藏"的效果，这叫什么？',
    options: ['循环', '切换（Toggle）', '计数器', '动画'],
    correct: 1,
    explain: 'Toggle（切换）就是在两种状态之间反复切换——开/关、显示/隐藏、选中/未选中，是交互设计中最基础的模式。',
  },
]

export default function Lesson10({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [count, setCount] = useState(0)
  const [showSecret, setShowSecret] = useState(false)
  const [moodIdx, setMoodIdx] = useState(0)
  const [chosen, setChosen] = useState([])
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  function toggleChosen(id) {
    setChosen(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function nextMood() {
    setMoodIdx(i => (i + 1) % MOODS.length)
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

  const BUTTON_DEMOS = [
    {
      id: 'counter',
      icon: '🔢',
      title: '计数器按钮',
      desc: '每点一次，数字加1。适合记录点赞数、投票数。',
    },
    {
      id: 'toggle',
      icon: '👁️',
      title: '切换按钮',
      desc: '点击显示/隐藏内容。适合展示更多内容、折叠菜单。',
    },
    {
      id: 'mood',
      icon: '😄',
      title: '心情切换',
      desc: '每点一次换一个表情。适合状态更新、趣味互动。',
    },
  ]

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回课程列表</button>

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #fff5f5 0%, #fee2e2 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#fee2e2', color: '#b91c1c' }}>第 10 课</span>
        <span className="lesson-hero-emoji">🖱️</span>
        <h1 className="lesson-hero-title">让按钮有反应</h1>
        <p className="lesson-hero-sub">Interactive Buttons</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>理解"点击事件"是什么</li>
          <li>知道按钮可以触发不同的动作</li>
          <li>亲手搭建一个有交互的小页面</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {['learn', 'do', 'ai', 'quiz', 'work'].map(t => (
          <button key={t} className={`lesson-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}
            style={tab === t ? { borderBottomColor: '#ef4444', color: '#ef4444' } : {}}>
            {t === 'learn' ? '学一学' : t === 'do' ? '做一做' : t === 'ai' ? '用AI帮忙' : t === 'quiz' ? '测一测' : '本课作品'}
          </button>
        ))}
      </div>

      {tab === 'learn' && (
        <div className="lesson-content">
          <div className="lesson-section">
            <h2 className="lesson-section-title">🖱️ 网页不只是"展示"</h2>
            <p className="lesson-text">
              你读过的书、看过的图片，只能"看"，不能互动。但网页不同——你可以点按钮、填表单、拖东西……
              <strong>这就是"交互"！</strong>
            </p>
            <div className="lesson-tip-box">
              💡 <strong>什么是点击事件？</strong><br />
              当你点击一个按钮，网页就"听"到了这个动作，然后执行你写好的代码——这就是"事件监听"，是所有交互的基础。
            </div>
          </div>
          <div className="lesson-section">
            <h2 className="lesson-section-title">🔵 按钮能做哪些事？</h2>
            <div className="lesson-info-grid">
              {[
                { icon: '🔢', name: '计数', desc: '点一次，数字+1。用于点赞、投票。' },
                { icon: '👁️', name: '显示/隐藏', desc: '展开详情、收起菜单、切换面板。' },
                { icon: '🎨', name: '改变样式', desc: '点击改颜色、切换主题、放大字体。' },
                { icon: '📤', name: '提交信息', desc: '发送表单、搜索、确认操作。' },
                { icon: '🔄', name: '切换内容', desc: '轮播图、标签页、状态切换。' },
                { icon: '🔗', name: '跳转页面', desc: '导航到新页面或新位置。' },
              ].map(c => (
                <div key={c.name} className="lesson-info-card">
                  <span style={{ fontSize: 28 }}>{c.icon}</span>
                  <strong>{c.name}</strong>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lesson-section">
            <h2 className="lesson-section-title">💭 交互的逻辑</h2>
            <p className="lesson-text">每一个按钮交互都遵循同一个逻辑：</p>
            <div className="l10-logic-row">
              <div className="l10-logic-box" style={{ background: '#fee2e2', color: '#b91c1c' }}>👆 用户点击</div>
              <span className="l10-logic-arrow">→</span>
              <div className="l10-logic-box" style={{ background: '#fff7ed', color: '#c2410c' }}>👂 网页监听</div>
              <span className="l10-logic-arrow">→</span>
              <div className="l10-logic-box" style={{ background: '#f0fdf4', color: '#166534' }}>⚡ 执行动作</div>
            </div>
          </div>
        </div>
      )}

      {tab === 'do' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🖱️ 按钮工坊</h2>
          <p className="lesson-text">下面是3种经典按钮！直接点击试试，看看它们如何响应。</p>

          <div className="l10-demos">
            <div className="l10-demo-card">
              <div className="l10-demo-header">
                <span>🔢</span>
                <div>
                  <strong>计数器按钮</strong>
                  <p>每点一次，数字加1</p>
                </div>
              </div>
              <div className="l10-demo-body">
                <div className="l10-counter-display">
                  <span className="l10-count-num">{count}</span>
                  <span className="l10-count-label">次</span>
                </div>
                <button className="l10-btn red" onClick={() => setCount(c => c + 1)}>
                  点我！+1
                </button>
                {count > 0 && <button className="l10-btn-reset" onClick={() => setCount(0)}>重置</button>}
              </div>
            </div>

            <div className="l10-demo-card">
              <div className="l10-demo-header">
                <span>👁️</span>
                <div>
                  <strong>切换按钮</strong>
                  <p>点击显示/隐藏内容</p>
                </div>
              </div>
              <div className="l10-demo-body">
                <button className="l10-btn red" onClick={() => setShowSecret(s => !s)}>
                  {showSecret ? '🙈 隐藏秘密' : '👁️ 显示秘密'}
                </button>
                {showSecret && (
                  <div className="l10-secret-box">
                    🤫 你发现了隐藏内容！
                    <br />这就是 Toggle（切换）效果。
                  </div>
                )}
              </div>
            </div>

            <div className="l10-demo-card">
              <div className="l10-demo-header">
                <span>😄</span>
                <div>
                  <strong>心情切换</strong>
                  <p>每点一次换个心情</p>
                </div>
              </div>
              <div className="l10-demo-body">
                <div className="l10-mood-display">{MOODS[moodIdx]}</div>
                <button className="l10-btn red" onClick={nextMood}>换个心情！</button>
                <div className="l10-mood-row">
                  {MOODS.map((m, i) => (
                    <span key={i} className={`l10-mood-dot${i === moodIdx ? ' active' : ''}`}>{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="l10-builder">
            <h3 className="l10-builder-title">🏗️ 搭建我的小页面</h3>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>选择你想放入小页面的按钮（可多选）：</p>
            <div className="l10-choose-row">
              {BUTTON_DEMOS.map(b => (
                <button
                  key={b.id}
                  className={`l10-choose-btn${chosen.includes(b.id) ? ' selected' : ''}`}
                  onClick={() => toggleChosen(b.id)}
                >
                  <span>{b.icon}</span>
                  <span>{b.title}</span>
                  {chosen.includes(b.id) && <span className="l10-check">✓</span>}
                </button>
              ))}
            </div>

            {chosen.length > 0 && (
              <div className="l10-mypage">
                <div className="l10-mypage-header">🌟 我的互动小页面</div>
                <div className="l10-mypage-body">
                  {chosen.includes('counter') && (
                    <div className="l10-mypage-widget">
                      <span style={{ fontSize: 22 }}>🔢 {count}</span>
                      <button className="l10-btn red" style={{ fontSize: 12, padding: '4px 12px' }} onClick={() => setCount(c => c + 1)}>+1</button>
                    </div>
                  )}
                  {chosen.includes('toggle') && (
                    <div className="l10-mypage-widget">
                      <button className="l10-btn red" style={{ fontSize: 12, padding: '4px 12px' }} onClick={() => setShowSecret(s => !s)}>
                        {showSecret ? '隐藏' : '显示'} 秘密
                      </button>
                      {showSecret && <span style={{ marginLeft: 8, fontSize: 13 }}>🤫 这是我的秘密！</span>}
                    </div>
                  )}
                  {chosen.includes('mood') && (
                    <div className="l10-mypage-widget">
                      <span style={{ fontSize: 28 }}>{MOODS[moodIdx]}</span>
                      <button className="l10-btn red" style={{ fontSize: 12, padding: '4px 12px' }} onClick={nextMood}>换心情</button>
                    </div>
                  )}
                </div>
                <div className="lesson-tip-box" style={{ margin: '12px 0 0' }}>
                  🎉 恭喜！你已经搭建了一个有交互的小页面！
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'ai' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🤖 让AI帮你加交互</h2>
          <p className="lesson-text">不知道怎么加按钮？告诉AI你想要什么效果！</p>

          <div className="ai-prompt-card">
            <div className="ai-prompt-title">📋 提问模板：请AI帮你加按钮</div>
            <div className="ai-prompt-body">
              我的网页上有一段文字，我想加一个按钮。<br /><br />
              <strong>按钮效果：</strong>[比如：点击后显示/隐藏这段文字]<br />
              <strong>按钮文字：</strong>[比如："展开详情" / "收起"]<br />
              <strong>我用的是：</strong>[HTML/React/其他]<br /><br />
              请给我完整的代码，并解释每一行是做什么的。
            </div>
          </div>

          <div className="ai-chat-demo" style={{ marginTop: 16 }}>
            {[
              { role: 'kid', text: '我想在网页上加一个按钮，点击后显示"你好，欢迎！"，再点一次就隐藏，用React怎么写？' },
              { role: 'ai', text: '好的！这叫"Toggle"效果，用React的useState实现：\n\nimport { useState } from \'react\'\n\nfunction App() {\n  const [show, setShow] = useState(false)\n  return (\n    <div>\n      <button onClick={() => setShow(!show)}>\n        {show ? \'隐藏\' : \'显示\'} 欢迎语\n      </button>\n      {show && <p>你好，欢迎！</p>}\n    </div>\n  )\n}\n\nuseState(false) 表示一开始是"隐藏状态"，点按钮后变成 true（显示），再点变回 false（隐藏）。' },
            ].map((msg, i) => (
              <div key={i} className={`ai-chat-bubble ${msg.role}`}>
                <span className="ai-chat-avatar">{msg.role === 'kid' ? '🧒' : '🤖'}</span>
                <span className="ai-chat-text" style={{ whiteSpace: 'pre-line', fontFamily: msg.role === 'ai' && i === 1 ? 'monospace' : 'inherit', fontSize: 13 }}>{msg.text}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24 }}>
            <h2 className="lesson-section-title">🔬 对比实验：按钮需求怎么问更有用</h2>
            <PromptCompareLab
              prompts={[
                { id: 'button-old', label: '旧问法', text: '给我的网页加个按钮。', tone: 'weak' },
                { id: 'button-new', label: '更好的问法', text: '任务：给我的个人网页加一个按钮交互。现在页面已经有标题和介绍。请帮我设计一个“显示更多内容”按钮，并告诉我：1. 点击前看到什么；2. 点击后显示什么；3. 初学者先做哪一步。限制：简单中文，分3点。', tone: 'strong' },
              ]}
              subject="按钮交互对比"
              accent="#ef4444"
              hint="交互类需求最重要的是把“点击前 / 点击后”说清楚。"
              intro="同样是“加按钮”，结构化问法会得到更能直接动手的建议："
            />
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
                <button className="lesson-btn" style={{ background: '#ef4444' }} onClick={nextQuestion}>
                  {quizIdx + 1 < QUIZ.length ? '下一题 →' : '查看结果'}
                </button>
              )}
            </div>
          ) : (
            <div className="quiz-done">
              <div className="quiz-done-score">{quizScore}/{QUIZ.length}</div>
              <div className="quiz-done-msg">
                {quizScore === 3 ? '🎉 满分！你完全理解了按钮交互！' : quizScore === 2 ? '👍 答对两题，非常棒！' : '💪 没关系，回去学一学再来挑战！'}
              </div>
              <p style={{ color: '#64748b', fontSize: 14 }}>第 11 课：请AI帮我一起做 →</p>
            </div>
          )}
        </div>
      )}
      {tab === 'work' && (
        <div className="lesson-content">
          <div className="lesson-work-card">
            <div className="lesson-work-title">🏅 本课作品：会动的小页面</div>
            {chosen.length > 0 ? (
              <>
                <p className="lesson-text" style={{ marginBottom: 12 }}>你的小页面包含了这些交互按钮：</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {BUTTON_DEMOS.filter(b => chosen.includes(b.id)).map(b => (
                    <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: '#fff5f5', borderRadius: 10, border: '1.5px solid #fca5a5' }}>
                      <span style={{ fontSize: 20 }}>{b.icon}</span>
                      <div>
                        <strong style={{ fontSize: 13, color: '#b91c1c' }}>{b.title}</strong>
                        <p style={{ fontSize: 11, color: '#888', margin: '2px 0 0' }}>{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="lesson-tip-box">
                💡 先去"做一做"选择你的按钮并搭建小页面，再来这里查看本课作品！
              </div>
            )}
            <div className="lesson-work-recap">
              <div className="lesson-work-recap-title">✅ 本课学到了</div>
              <ul>
                <li>点击事件：用户点一下，网页就"听"到并执行动作</li>
                <li>Toggle（切换）：在两种状态之间反复切换</li>
                <li>网页不只是展示，更能和用户互动</li>
              </ul>
            </div>
          </div>
          <div className="lesson-next-preview">
            <div className="lesson-next-title">👉 第 11 课预告：请AI帮我一起做</div>
            <p>下一课你将学会如何向 AI 说清楚你想要什么——好提问 vs 坏提问，还能生成属于你自己的 AI 提问模板！</p>
          </div>
        </div>
      )}
    </div>
  )
}
