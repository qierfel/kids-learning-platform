import { useState } from 'react'
import './Lesson.css'
import PromptCompareLab from './PromptCompareLab'

const DEVICE_BADGE = (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
    <span style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>📱 手机</span>
    <span style={{ background: '#e0e7ff', color: '#4338ca', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>🖥️ iPad</span>
    <span style={{ background: '#dcfce7', color: '#15803d', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>💻 电脑</span>
    <span style={{ background: '#f1f5f9', color: '#475569', fontSize: 11, padding: '4px 10px', borderRadius: 999 }}>📍 三种设备都能完成本课</span>
  </div>
)

const DEVICES = [
  {
    id: 'phone',
    name: '手机',
    emoji: '📱',
    color: '#3b82f6',
    bg: '#eff6ff',
    border: '#bfdbfe',
    best: ['随时随地聊天AI', '语音对话', '图片识别拍照', '快速查AI问答'],
    limited: ['写代码不方便（屏幕小）', '做PPT或网页体验差', '部分AI工具没有手机版'],
    tools: [
      { name: '豆包', tag: '国内', color: '#6366f1' },
      { name: 'Kimi', tag: '国内', color: '#8b5cf6' },
      { name: '通义', tag: '国内', color: '#f97316' },
      { name: 'ChatGPT', tag: '国际', color: '#10b981' },
    ],
  },
  {
    id: 'tablet',
    name: 'iPad / 平板',
    emoji: '🖥️',
    color: '#8b5cf6',
    bg: '#faf5ff',
    border: '#d8b4fe',
    best: ['手写笔记 + AI批改', '看图 + 画图AI', '做设计和排版', '聊天AI（屏幕舒适）'],
    limited: ['部分专业工具不支持平板', '写复杂代码仍不如电脑方便'],
    tools: [
      { name: '豆包', tag: '国内', color: '#6366f1' },
      { name: '即梦', tag: '国内', color: '#ec4899' },
      { name: '可灵', tag: '国内', color: '#f59e0b' },
      { name: 'ChatGPT', tag: '国际', color: '#10b981' },
    ],
  },
  {
    id: 'computer',
    name: '电脑',
    emoji: '💻',
    color: '#10b981',
    bg: '#f0fdf4',
    border: '#86efac',
    best: ['写代码 + AI辅助（最顺手）', '做PPT / 网页 / 小程序', '注册AI账号（最方便）', '同时开多个AI工具对比'],
    limited: ['需要坐下来，不如手机随身'],
    tools: [
      { name: 'Claude', tag: '国际', color: '#f97316' },
      { name: 'Cursor', tag: '国际', color: '#0ea5e9' },
      { name: 'V0', tag: '国际', color: '#6366f1' },
      { name: 'Gamma', tag: '国际', color: '#ec4899' },
      { name: '美图PPT', tag: '国内', color: '#f59e0b' },
    ],
  },
]

const SCENARIOS = [
  { q: '想随时随地问AI一个问题', best: 'phone', hint: '手机最方便，随时随地！' },
  { q: '想用AI帮你做一份PPT', best: 'computer', hint: '电脑屏幕大，操作最顺手' },
  { q: '想用AI画一张好看的图', best: 'tablet', hint: 'iPad + Apple Pencil配合画图AI效果极佳！' },
  { q: '想用AI写一个网页程序', best: 'computer', hint: '写代码用电脑，Cursor/V0这些工具都是为电脑设计的' },
  { q: '想注册一个新的AI账号', best: 'computer', hint: '电脑注册更方便，表单操作更顺畅' },
]

const QUIZ = [
  {
    q: '想在上学路上快速问AI问题，用哪个设备最合适？',
    options: ['电脑', '手机', 'iPad', '都不合适'],
    correct: 1,
    explain: '手机随身携带，随时可以问AI！豆包、Kimi等都有很好的手机端体验。',
  },
  {
    q: '用AI帮助写代码，哪个设备体验最好？',
    options: ['手机', 'iPad', '电脑', '三个一样'],
    correct: 2,
    explain: '写代码需要大屏幕、键盘，电脑是最佳选择。Cursor等AI编程工具都是专为电脑设计的。',
  },
  {
    q: '下面哪个说法是正确的？',
    options: ['手机什么AI都不能用', '电脑才能用AI', '不同设备适合不同AI任务', '只有最新设备才能用AI'],
    correct: 2,
    explain: '三种设备都能用AI，只是适合的场景不同。了解各设备优势，才能发挥AI的最大价值！',
  },
]

export default function Lesson16({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [myDevice, setMyDevice] = useState(null)
  const [scenarioAnswers, setScenarioAnswers] = useState({})
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  const accentColor = '#0ea5e9'
  const device = DEVICES.find(d => d.id === selectedDevice)

  function handleScenario(idx, answer) {
    setScenarioAnswers(a => ({ ...a, [idx]: answer }))
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

  const scenariosCompleted = Object.keys(scenarioAnswers).length

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回课程列表</button>

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#e0f2fe', color: '#0369a1' }}>第 16 课 · 模块 D · 工具基础</span>
        <span className="lesson-hero-emoji">📱</span>
        <h1 className="lesson-hero-title">你的设备能做什么</h1>
        <p className="lesson-hero-sub">Device Capabilities — 认识你的AI学习搭档</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>了解手机、iPad、电脑各自能用哪些AI工具</li>
          <li>知道不同设备做AI任务时的优缺点</li>
          <li>选好你的主力学习设备，开始下一步</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {['learn', 'do', 'match', 'ai', 'quiz', 'work'].map(t => (
          <button key={t} className={`lesson-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}
            style={tab === t ? { borderBottomColor: accentColor, color: accentColor } : {}}>
            {t === 'learn' ? '学一学' : t === 'do' ? '设备对比' : t === 'match' ? '场景匹配' : t === 'ai' ? '问AI选设备' : t === 'quiz' ? '测一测' : '我的设备'}
          </button>
        ))}
      </div>

      {tab === 'learn' && (
        <div className="lesson-content">
          {DEVICE_BADGE}
          <div className="lesson-section">
            <h2 className="lesson-section-title">📱 三种设备，三种学习方式</h2>
            <p className="lesson-text">用AI学习，不一定要有最新的设备——但要知道你手上的设备最适合做什么！手机、iPad、电脑各有擅长，找到你的最佳搭档很重要。</p>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">🗂️ 快速认识三兄弟</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
              {DEVICES.map(d => (
                <div key={d.id} style={{ background: d.bg, border: `2px solid ${d.border}`, borderRadius: 14, padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 24 }}>{d.emoji}</span>
                    <span style={{ fontWeight: 800, color: d.color, fontSize: 16 }}>{d.name}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#1e293b', lineHeight: 1.7 }}>
                    <strong>最擅长：</strong>{d.best[0]}、{d.best[1]}<br />
                    <strong>不太适合：</strong>{d.limited[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">💡 国内 vs 国际 AI 工具</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 10 }}>
              <div style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe', borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ fontWeight: 700, color: '#1d4ed8', marginBottom: 8, fontSize: 14 }}>🇨🇳 国内工具</div>
                <div style={{ fontSize: 13, color: '#1e293b', lineHeight: 1.7 }}>
                  豆包 / Kimi / 通义 / 文心<br />
                  ✓ 无需翻墙<br />
                  ✓ 中文更流利<br />
                  ✓ 手机端更完善
                </div>
              </div>
              <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ fontWeight: 700, color: '#15803d', marginBottom: 8, fontSize: 14 }}>🌍 国际工具</div>
                <div style={{ fontSize: 13, color: '#1e293b', lineHeight: 1.7 }}>
                  ChatGPT / Claude / Gemini<br />
                  ✓ 功能更强大<br />
                  ✓ 编程辅助更专业<br />
                  ⚠ 需要网络条件配合
                </div>
              </div>
            </div>
            <div className="lesson-tip-box" style={{ marginTop: 12 }}>
              💡 <strong>建议：</strong>先用国内工具上手（无需注册麻烦），熟悉了再探索国际工具。两种都了解是最好的！
            </div>
          </div>
        </div>
      )}

      {tab === 'do' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🔍 点击查看每个设备的详情</h2>
          <p className="lesson-text">选择你感兴趣的设备，看看它能用哪些AI工具。</p>

          <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            {DEVICES.map(d => (
              <button key={d.id} onClick={() => setSelectedDevice(d.id === selectedDevice ? null : d.id)}
                style={{ flex: 1, minWidth: 100, padding: '10px 8px', borderRadius: 14, border: `2px solid ${selectedDevice === d.id ? d.color : '#e2e8f0'}`, background: selectedDevice === d.id ? d.bg : '#fff', cursor: 'pointer', fontWeight: 700, color: d.color, fontSize: 13 }}>
                {d.emoji} {d.name}
              </button>
            ))}
          </div>

          {device && (
            <div style={{ background: device.bg, border: `2px solid ${device.border}`, borderRadius: 16, padding: '18px 16px' }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: device.color, marginBottom: 14 }}>{device.emoji} {device.name}</div>

              <div style={{ marginBottom: 14 }}>
                <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 8, fontSize: 14 }}>✅ 最擅长的事：</div>
                {device.best.map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 5, fontSize: 13, color: '#334155' }}>
                    <span style={{ color: device.color, marginTop: 1 }}>●</span>{b}
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 14 }}>
                <div style={{ fontWeight: 700, color: '#475569', marginBottom: 8, fontSize: 14 }}>⚠️ 相对不便的地方：</div>
                {device.limited.map((l, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 5, fontSize: 13, color: '#64748b' }}>
                    <span style={{ color: '#94a3b8', marginTop: 1 }}>●</span>{l}
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 8, fontSize: 14 }}>🛠️ 推荐搭配的AI工具：</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {device.tools.map(t => (
                    <span key={t.name} style={{ background: '#fff', border: `1.5px solid ${t.color}`, color: t.color, fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>
                      {t.name} <span style={{ opacity: 0.7, fontWeight: 500 }}>({t.tag})</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!selectedDevice && (
            <div style={{ textAlign: 'center', padding: '30px 20px', color: '#94a3b8', fontSize: 14 }}>
              ↑ 点击上方按钮，查看各设备详情
            </div>
          )}
        </div>
      )}

      {tab === 'match' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🎯 场景匹配练习</h2>
          <p className="lesson-text">读下面的情景，选出最合适的设备！</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
            {SCENARIOS.map((s, i) => (
              <div key={i} style={{ background: scenarioAnswers[i] === s.best ? '#f0fdf4' : '#f8fafc', border: `1.5px solid ${scenarioAnswers[i] ? (scenarioAnswers[i] === s.best ? '#86efac' : '#fca5a5') : '#e2e8f0'}`, borderRadius: 14, padding: '14px 16px' }}>
                <div style={{ fontWeight: 600, color: '#1e293b', marginBottom: 10, fontSize: 14 }}>场景 {i + 1}：{s.q}</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {DEVICES.map(d => (
                    <button key={d.id} onClick={() => handleScenario(i, d.id)}
                      disabled={!!scenarioAnswers[i]}
                      style={{ padding: '7px 14px', borderRadius: 999, border: `2px solid ${scenarioAnswers[i] === d.id ? (d.id === s.best ? '#10b981' : '#ef4444') : d.color}`, background: scenarioAnswers[i] === d.id ? (d.id === s.best ? '#f0fdf4' : '#fff5f5') : '#fff', color: d.color, fontSize: 13, fontWeight: 700, cursor: scenarioAnswers[i] ? 'default' : 'pointer' }}>
                      {d.emoji} {d.name}
                    </button>
                  ))}
                </div>
                {scenarioAnswers[i] && (
                  <div style={{ marginTop: 10, fontSize: 13, color: scenarioAnswers[i] === s.best ? '#15803d' : '#b91c1c', background: scenarioAnswers[i] === s.best ? '#dcfce7' : '#fee2e2', borderRadius: 8, padding: '8px 12px' }}>
                    {scenarioAnswers[i] === s.best ? '✅ 正确！' : '❌ 再想想—'} {s.hint}
                  </div>
                )}
              </div>
            ))}
          </div>

          {scenariosCompleted === SCENARIOS.length && (
            <div style={{ marginTop: 16, background: '#f0fdf4', border: '2px solid #86efac', borderRadius: 12, padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>🎉</div>
              <div style={{ fontWeight: 700, color: '#15803d' }}>场景匹配完成！你对各设备的优势越来越了解了！</div>
            </div>
          )}
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
                {quizScore === 3 ? '🎉 全对！你是设备选择专家！' : quizScore === 2 ? '👍 不错！继续加油！' : '💪 回去设备对比看一看，再来！'}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'work' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">📱 选择你的主力设备</h2>
          <p className="lesson-text">根据今天学到的，选出最适合你现在学AI的主力设备：</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            {DEVICES.map(d => (
              <button key={d.id} onClick={() => setMyDevice(d.id)}
                style={{ border: `2.5px solid ${myDevice === d.id ? d.color : '#e2e8f0'}`, borderRadius: 16, padding: '14px 16px', textAlign: 'left', background: myDevice === d.id ? d.bg : '#fff', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{d.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: d.color, fontSize: 15 }}>{d.name}</div>
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>适合：{d.best[0]}</div>
                  </div>
                  {myDevice === d.id && <span style={{ marginLeft: 'auto', color: d.color, fontWeight: 700, fontSize: 20 }}>✓</span>}
                </div>
              </button>
            ))}
          </div>

          {myDevice && (
            <div className="certificate">
              <div className="certificate-title">📱 设备就位！</div>
              <div className="certificate-name">
                我的主力设备：{DEVICES.find(d => d.id === myDevice)?.emoji} {DEVICES.find(d => d.id === myDevice)?.name}
              </div>
              <div className="certificate-sub">第 16 课 · 模块 D · 工具基础</div>
              <div style={{ fontSize: 14, color: '#93c5fd', margin: '16px 0', lineHeight: 1.8 }}>
                我知道了：不同设备适合不同的AI任务<br />
                <strong style={{ color: '#bfdbfe' }}>手机随时用 · iPad画图好 · 电脑做项目</strong>
              </div>
              <div style={{ fontSize: 24, letterSpacing: 4 }}>⭐⭐⭐</div>
            </div>
          )}

          <div className="lesson-next-preview" style={{ marginTop: 16 }}>
            <div className="lesson-next-title">🚀 下一课预告：第 17 课 · 开通你的AI账号</div>
            <p>知道了用什么设备，下一步就是开通账号！我们会手把手教你注册主流AI工具，让你正式开始用AI创作。</p>
          </div>
        </div>
      )}

      {tab === 'ai' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🤖 让 AI 帮你选设备</h2>
          <p className="lesson-text">同样是“帮我选设备”，问法不同，AI 给你的建议会差很多。</p>
          <PromptCompareLab
            prompts={[
              { id: 'device-old', label: '旧问法', text: '我该用什么设备学AI？', tone: 'weak' },
              { id: 'device-new', label: 'GPT-5.5 新问法', text: '任务：帮10-12岁学生选学习AI编程的主力设备。我的情况：平时有手机和iPad，周末能用电脑。我主要想做网页、问AI问题、做小作品。请输出：1. 主力设备建议；2. 每种设备最适合做什么；3. 我这周的使用方案。限制：用简单中文，80字内。', tone: 'strong' },
            ]}
            subject="设备建议对比"
            accent={accentColor}
            hint="带上自己的设备条件和任务目标，AI 才能给出真正能执行的建议。"
            intro="先试试这两种问法："
          />
        </div>
      )}
    </div>
  )
}
