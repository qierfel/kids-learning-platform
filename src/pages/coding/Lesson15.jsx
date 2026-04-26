import { useState } from 'react'
import './Lesson.css'

const DEVICE_BADGE = (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '12px 0 4px' }}>
    {['📱 手机', '📱 iPad', '💻 电脑'].map(d => (
      <span key={d} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 20, padding: '4px 12px', fontSize: 13, color: '#475569' }}>{d}</span>
    ))}
    <span style={{ fontSize: 12, color: '#94a3b8', alignSelf: 'center' }}>· 有浏览器就能用</span>
  </div>
)

const BUG_CASES = [
  {
    id: 'typo',
    title: '按钮点了没反应',
    code: `<button onclik="sayHi()">打招呼</button>`,
    error: '没有报错，但按钮完全没用',
    bugLine: 'onclik',
    fix: 'onclick',
    type: '拼写错误',
    hint: '"onclik" 是不存在的属性。正确写法是 "onclick"。拼写错误是最常见的 Bug！',
  },
  {
    id: 'missing-quote',
    title: '页面样式全乱了',
    code: `<p style="color: red; font-size: 16px>这是红色文字</p>`,
    error: 'SyntaxError: 样式解析失败',
    bugLine: '16px>',
    fix: '16px">',
    type: '引号没关上',
    hint: 'style 属性的值必须用引号包围。这里 font-size: 16px 后面少了一个 " 号。',
  },
  {
    id: 'logic',
    title: '分数显示错了',
    code: `let score = 100\nif (score > 60) {\n  console.log("不及格")\n}`,
    error: '程序能运行，但100分的结果是"不及格"',
    bugLine: '"不及格"',
    fix: '"及格"',
    type: '逻辑错误',
    hint: 'score > 60 是真（100 > 60），所以会执行里面的代码。但"及格"和"不及格"写反了！',
  },
]

const MY_WORKS = [
  { id: 'l13', lesson: 'L13', title: 'AI 变声器', emoji: '🔄', desc: '输入一句话，AI 用不同风格重新说一遍' },
  { id: 'l14', lesson: 'L14', title: 'AI 占卜机', emoji: '🔮', desc: '选运势类别，AI 给你专属占卜结果' },
  { id: 'l15', lesson: 'L15', title: 'Bug 修复工具', emoji: '🐛', desc: '学会读报错、找 Bug、请 AI 帮忙修复' },
]

const QUIZ = [
  {
    q: '遇到代码报错时，最好的第一步是？',
    options: ['把代码全删了', '仔细读报错信息，找到行号和错误类型', '换个项目做', '关掉电脑'],
    correct: 1,
    explain: '报错信息是程序给你的线索！里面有文件名、行号、错误类型，帮你快速定位问题。',
  },
  {
    q: '"拼写错误"类型的Bug有什么特点？',
    options: ['程序会崩溃', '有时没有报错但功能失效', '代码变慢', '不会影响程序运行'],
    correct: 1,
    explain: '拼写错误最狡猾——有时浏览器直接忽略了错误的属性，不报错但功能就是不工作。',
  },
  {
    q: '作品集的作用是什么？',
    options: ['证明你写了很多代码', '让别人一眼看到你做过什么、会什么', '只用来存文件', '比赛评分用的'],
    correct: 1,
    explain: '作品集就是你的"能力展示"。别人看到你的作品集，就能快速了解你会什么、做过什么。',
  },
]

export default function Lesson15({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [selectedBug, setSelectedBug] = useState(null)
  const [revealedBugs, setRevealedBugs] = useState({})
  const [fixedBugs, setFixedBugs] = useState([])

  // Portfolio
  const [workNotes, setWorkNotes] = useState({})
  const [portfolioTitle, setPortfolioTitle] = useState('')

  // AI Debug
  const [bugInput, setBugInput] = useState('')
  const [aiDebug, setAiDebug] = useState('')
  const [loadingDebug, setLoadingDebug] = useState(false)
  const [debugError, setDebugError] = useState('')

  // Quiz
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  const accentColor = '#f59e0b'
  const bug = BUG_CASES.find(b => b.id === selectedBug)

  async function handleAiDebug() {
    if (!bugInput.trim()) return
    setLoadingDebug(true)
    setDebugError('')
    setAiDebug('')
    const prompt = `我是一个10-12岁的编程学习者，遇到了Bug，请用简单友善的语言帮我分析（不超过120字）：

问题：${bugInput.trim()}

请告诉我：①可能是什么类型的错误；②最可能的原因；③如何修复。语气要鼓励孩子。`
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ type: 'chat', payload: { messages: [{ role: 'user', content: prompt }], subject: 'Debug助手' } }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setAiDebug(data.text || '')
    } catch {
      setDebugError('AI 暂时没有响应，请稍后再试。')
    } finally {
      setLoadingDebug(false)
    }
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

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回课程列表</button>

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#fef3c7', color: '#b45309' }}>第 15 课 · 模块 C</span>
        <span className="lesson-hero-emoji">🐛</span>
        <h1 className="lesson-hero-title">Bug 修复 + 作品集</h1>
        <p className="lesson-hero-sub">Debug & Portfolio</p>
        {DEVICE_BADGE}
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>不再害怕程序报错，学会读懂错误</li>
          <li>用AI帮你找Bug并修复</li>
          <li>整理前面所有作品，形成作品集</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {['learn', 'do', 'ai', 'quiz', 'work'].map(t => (
          <button key={t} className={`lesson-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}
            style={tab === t ? { borderBottomColor: accentColor, color: accentColor } : {}}>
            {t === 'learn' ? '学一学' : t === 'do' ? '找Bug' : t === 'ai' ? 'AI助手' : t === 'quiz' ? '测一测' : '我的作品集'}
          </button>
        ))}
      </div>

      {tab === 'learn' && (
        <div className="lesson-content">
          <div className="lesson-section">
            <h2 className="lesson-section-title">🐛 Bug 是什么？别怕它！</h2>
            <p className="lesson-text">Bug 就是代码里的错误。<strong>所有程序员</strong>——不管多厉害——每天都在处理 Bug。区别是：有经验的程序员能快速找到并修复它。今天你就来练这个！</p>
            <div className="lesson-tip-box">
              💪 <strong>正确心态：</strong>报错不是失败，是程序在给你发"求救信号"——它告诉你问题在哪里。学会读懂这个信号，你就赢了。
            </div>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">📚 三种常见 Bug</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { emoji: '🔤', name: '拼写错误', desc: '把 onclick 写成 onclik，函数名写错——浏览器不认识，直接忽略', color: '#ef4444' },
                { emoji: '❝', name: '符号错误', desc: '引号没关、括号不配对——程序根本读不下去', color: '#f59e0b' },
                { emoji: '🔄', name: '逻辑错误', desc: '代码能跑，但结果和你想的不一样——最难发现', color: '#8b5cf6' },
              ].map(b => (
                <div key={b.name} style={{ background: `${b.color}10`, border: `1.5px solid ${b.color}30`, borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 12 }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{b.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: b.color }}>{b.name}</div>
                    <div style={{ fontSize: 13, color: '#475569', marginTop: 2 }}>{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">🗂️ 作品集是什么？</h2>
            <p className="lesson-text">作品集就是把你做过的所有作品整理在一起，让别人一眼看到你的能力。本课最后你会整理出模块 C 的三个作品！</p>
          </div>
        </div>
      )}

      {tab === 'do' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🔍 Bug 侦探训练</h2>
          <p className="lesson-text">下面有 3 段有 Bug 的代码，你能找到问题吗？</p>

          {!selectedBug ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {BUG_CASES.map(b => (
                <button key={b.id} onClick={() => setSelectedBug(b.id)}
                  style={{ border: `2px solid ${fixedBugs.includes(b.id) ? '#10b981' : '#fde68a'}`, borderRadius: 14, padding: '14px 16px', textAlign: 'left', background: fixedBugs.includes(b.id) ? '#f0fdf4' : '#fffbeb', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: 13, color: '#94a3b8', marginRight: 8 }}>{b.type}</span>
                      <span style={{ fontWeight: 700, color: '#1e293b' }}>{b.title}</span>
                    </div>
                    <span style={{ color: fixedBugs.includes(b.id) ? '#10b981' : '#f59e0b', fontSize: 13, fontWeight: 600 }}>
                      {fixedBugs.includes(b.id) ? '✓ 已修复' : '→ 查看'}
                    </span>
                  </div>
                </button>
              ))}
              {fixedBugs.length === 3 && (
                <div style={{ background: '#f0fdf4', border: '2px solid #86efac', borderRadius: 12, padding: '14px', textAlign: 'center', marginTop: 4 }}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>🎉</div>
                  <div style={{ fontWeight: 700, color: '#15803d' }}>全部 Bug 修复！你是真正的 Bug 侦探！</div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <button onClick={() => setSelectedBug(null)} style={{ fontSize: 13, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 12, textDecoration: 'underline' }}>← 返回</button>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#1e293b', marginBottom: 4 }}>{bug.title}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 10 }}>Bug 类型：{bug.type}</div>

              <div style={{ background: '#1e293b', borderRadius: 10, padding: '14px 16px', fontFamily: 'monospace', fontSize: 13, color: '#e2e8f0', lineHeight: 1.8, marginBottom: 10, overflowX: 'auto' }}>
                {bug.code.split('\n').map((line, i) => (
                  <div key={i} style={{ color: revealedBugs[bug.id] && line.includes(bug.bugLine) ? '#fbbf24' : '#e2e8f0' }}>
                    <span style={{ color: '#475569', marginRight: 12, userSelect: 'none' }}>{i + 1}</span>{line}
                  </div>
                ))}
              </div>

              <div style={{ background: '#fff5f5', border: '1.5px solid #fca5a5', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#ef4444', marginBottom: 12 }}>
                <strong>报错/现象：</strong> {bug.error}
              </div>

              {!revealedBugs[bug.id] ? (
                <button className="lesson-btn" style={{ background: accentColor }} onClick={() => setRevealedBugs(r => ({ ...r, [bug.id]: true }))}>
                  🔍 揭示 Bug！
                </button>
              ) : (
                <div>
                  <div style={{ background: '#fffbeb', border: '2px solid #fde68a', borderRadius: 12, padding: '14px', marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, color: '#b45309', marginBottom: 8 }}>🐛 发现了！</div>
                    <div style={{ fontSize: 13, fontFamily: 'monospace', marginBottom: 4 }}>
                      <span style={{ color: '#ef4444' }}>✗ 错误：</span>
                      <code style={{ background: '#fee2e2', padding: '2px 6px', borderRadius: 4 }}>{bug.bugLine}</code>
                    </div>
                    <div style={{ fontSize: 13, fontFamily: 'monospace', marginBottom: 10 }}>
                      <span style={{ color: '#10b981' }}>✓ 修复：</span>
                      <code style={{ background: '#dcfce7', padding: '2px 6px', borderRadius: 4 }}>{bug.fix}</code>
                    </div>
                    <div style={{ fontSize: 12, color: '#78350f', background: '#fef3c7', borderRadius: 8, padding: '8px 10px' }}>💡 {bug.hint}</div>
                  </div>
                  {!fixedBugs.includes(bug.id) ? (
                    <button className="lesson-btn" style={{ background: '#10b981' }} onClick={() => { setFixedBugs(f => [...f, bug.id]); setSelectedBug(null) }}>
                      ✅ 明白了，标记修复！
                    </button>
                  ) : (
                    <div style={{ color: '#10b981', fontWeight: 700, textAlign: 'center' }}>✓ 已修复</div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {tab === 'ai' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🤖 AI Debug 助手</h2>
          <p className="lesson-text">遇到自己找不到的 Bug？描述给 AI 听，AI 帮你分析！</p>

          <div className="l8-field">
            <label className="l8-label">📝 描述你遇到的问题 *</label>
            <textarea
              style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: 10, padding: '10px 14px', fontSize: 14, fontFamily: 'inherit', minHeight: 80, resize: 'vertical', boxSizing: 'border-box', outline: 'none' }}
              value={bugInput}
              onChange={e => setBugInput(e.target.value)}
              placeholder={'比如：我的按钮点了没反应，控制台显示 TypeError: sayHi is not a function，第3行'}
              maxLength={300}
            />
          </div>

          <button className="lesson-btn" style={{ background: bugInput.trim() ? accentColor : '#e2e8f0', color: bugInput.trim() ? '#fff' : '#94a3b8' }}
            disabled={!bugInput.trim() || loadingDebug} onClick={handleAiDebug}>
            {loadingDebug ? '🔍 AI正在分析...' : '🐛 AI 帮我找 Bug！'}
          </button>

          {debugError && <div style={{ color: '#ef4444', fontSize: 13, marginTop: 10, padding: '8px 12px', background: '#fff5f5', borderRadius: 8 }}>{debugError}</div>}

          {aiDebug && (
            <div style={{ marginTop: 14, padding: '16px', background: '#fffbeb', border: '2px solid #fde68a', borderRadius: 12 }}>
              <div style={{ fontSize: 13, color: accentColor, fontWeight: 600, marginBottom: 8 }}>🤖 AI 的分析：</div>
              <div style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{aiDebug}</div>
            </div>
          )}

          <div className="ai-prompt-card" style={{ marginTop: 20 }}>
            <div className="ai-prompt-title">📋 高效 Debug 提问模板</div>
            <div className="ai-prompt-body">
              我的代码遇到了 Bug，请帮我分析：<br /><br />
              <strong>报错信息：</strong>[粘贴报错文字]<br />
              <strong>出错位置：</strong>第 [X] 行<br />
              <strong>期望结果：</strong>[想发生什么]<br />
              <strong>实际结果：</strong>[实际发生了什么]<br /><br />
              [粘贴出问题的代码]<br /><br />
              请用简单语言告诉我原因和修复方法。
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
                {quizScore === 3 ? '🎉 全对！你是 Debug 高手！' : quizScore >= 2 ? '👍 不错！' : '💪 回去复习一下再来！'}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'work' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🗂️ 模块 C 作品集</h2>
          <p className="lesson-text">整理你在模块 C 完成的三个作品，形成你的第一份作品集！</p>

          <div className="l8-field">
            <label className="l8-label">📋 给你的作品集起个名字</label>
            <input className="l8-input" value={portfolioTitle} onChange={e => setPortfolioTitle(e.target.value)}
              placeholder={'比如：我的 AI 编程三件套'} maxLength={20} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '12px 0 20px' }}>
            {MY_WORKS.map(w => (
              <div key={w.id} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '14px 16px' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 28 }}>{w.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1e293b' }}>{w.title}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>{w.lesson}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: '#475569', marginBottom: 8 }}>{w.desc}</div>
                <div className="l8-field" style={{ margin: 0 }}>
                  <input className="l8-input" style={{ fontSize: 13 }}
                    value={workNotes[w.id] || ''}
                    onChange={e => setWorkNotes(n => ({ ...n, [w.id]: e.target.value }))}
                    placeholder={'写一句你学到了什么，或者最自豪的地方'}
                    maxLength={50}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="certificate">
            <div className="certificate-title">🗂️ 模块 C 作品集 · 完成！</div>
            <div className="certificate-name">{portfolioTitle || '我的 AI 编程作品集'}</div>
            <div className="certificate-sub">第 15 课 · 模块 C 结束 · 共 3 个作品</div>
            <div style={{ fontSize: 14, color: '#93c5fd', margin: '16px 0', lineHeight: 1.8 }}>
              模块 C 完成！你学会了：<br />
              <strong style={{ color: '#bfdbfe' }}>变声器 · 占卜机 · Bug 修复</strong><br />
              从这里开始，你将进入工具大全的世界！
            </div>
            <div style={{ fontSize: 24, letterSpacing: 4 }}>⭐⭐⭐</div>
          </div>

          <div className="lesson-next-preview" style={{ marginTop: 16 }}>
            <div className="lesson-next-title">🚀 下一课预告：第 16 课 · 你的设备能做什么</div>
            <p>模块 D 开始！手机、iPad、电脑能用哪些 AI？各有什么优缺点？帮你选好最适合的学习设备！</p>
          </div>
        </div>
      )}
    </div>
  )
}
