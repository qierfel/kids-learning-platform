import { useState } from 'react'
import './Lesson.css'

const DEVICE_BADGE = (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
    <span style={{ background: '#dcfce7', color: '#15803d', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>💻 主要用电脑</span>
    <span style={{ background: '#e0e7ff', color: '#4338ca', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>🖥️ iPad部分可用</span>
    <span style={{ background: '#f1f5f9', color: '#475569', fontSize: 11, padding: '4px 10px', borderRadius: 999 }}>📍 部分工具需安装客户端，推荐用电脑</span>
  </div>
)

const WORK_TOOLS = [
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'AI 写代码',
    emoji: '⌨️',
    color: '#6366f1',
    bg: '#eef2ff',
    tag: '国际 · 免费起步',
    tagColor: '#4338ca',
    url: 'cursor.com',
    desc: 'AI加持的代码编辑器，在你写代码时实时给建议、帮补全、帮调试。',
    strengths: ['写代码时AI实时建议', '一句话生成整段代码', '帮你找Bug并修复', '支持多种编程语言'],
    useCase: '你想做一个网页/小工具，让Cursor帮你快速写出来',
    difficulty: '入门需一点代码基础',
    diffColor: '#f59e0b',
    steps: ['去 cursor.com 下载安装', '用邮箱注册账号（有免费额度）', '打开项目文件夹', '按 Ctrl+K 或 Cmd+K 呼出AI对话', '描述你想要的功能，AI帮你写代码'],
  },
  {
    id: 'v0',
    name: 'V0',
    category: 'AI 做网页',
    emoji: '🌐',
    color: '#0ea5e9',
    bg: '#f0f9ff',
    tag: '国际 · 免费试用',
    tagColor: '#0369a1',
    url: 'v0.dev',
    desc: '只需用文字描述你想要的网页，V0直接生成完整的网页代码，可以预览、下载、继续修改。',
    strengths: ['纯文字描述即可生成网页', '实时预览效果', '生成代码可直接下载', '支持React/Tailwind'],
    useCase: '用几句话描述你的网页想法，30秒得到一个完整网页',
    difficulty: '无需代码基础',
    diffColor: '#10b981',
    steps: ['打开 v0.dev（需要国际网络）', '点击"Sign in"用邮箱注册', '在输入框里描述你的网页', '比如："做一个蓝色主题的自我介绍网页，有头像、名字和爱好"', '等待几秒，预览并下载代码'],
  },
  {
    id: 'gamma',
    name: 'Gamma',
    category: 'AI 做PPT',
    emoji: '📊',
    color: '#8b5cf6',
    bg: '#faf5ff',
    tag: '国际 · 免费限额',
    tagColor: '#7c3aed',
    url: 'gamma.app',
    desc: '输入一段文字或主题，Gamma自动生成精美的演示文稿，带有好看的排版和配色。',
    strengths: ['主题→完整PPT只需10秒', '模板精美专业', '支持导出PDF/PPT', '支持中文内容'],
    useCase: '你要做一个"我的AI学习展示"PPT，Gamma帮你一键生成',
    difficulty: '无需任何基础',
    diffColor: '#10b981',
    steps: ['打开 gamma.app', '用邮箱注册（谷歌账号更快）', '点击"New"→"Generate"', '输入你的PPT主题', '选喜欢的风格，等待生成', '在线编辑并导出'],
  },
  {
    id: 'meituppt',
    name: '美图PPT',
    category: 'AI 做PPT（国内）',
    emoji: '🎨',
    color: '#ec4899',
    bg: '#fdf2f8',
    tag: '国内 · 免费额度多',
    tagColor: '#9d174d',
    url: 'designkit.meitu.com/ppt',
    desc: '国内的AI PPT工具，输入主题一键生成，中文支持好，模板多，无需科学上网。',
    strengths: ['无需科学上网', '中文PPT效果好', '模板量大', '支持微信/手机号登录'],
    useCase: '想做中文PPT、不想用国际工具时的首选',
    difficulty: '无需任何基础',
    diffColor: '#10b981',
    steps: ['打开 designkit.meitu.com/ppt', '微信扫码或手机号登录', '点击"AI生成PPT"', '输入PPT主题和要点', '选择模板风格，一键生成', '在线编辑，下载PPTX格式'],
  },
  {
    id: 'wxmini',
    name: '微信开发者工具',
    category: 'AI 做小程序',
    emoji: '📱',
    color: '#10b981',
    bg: '#f0fdf4',
    tag: '国内 · 免费',
    tagColor: '#047857',
    url: 'developers.weixin.qq.com/miniprogram/dev/devtools/download.html',
    desc: '开发微信小程序的官方工具，结合AI（如Cursor/通义灵码）可以快速搭建小程序界面。',
    strengths: ['官方免费工具', '模拟器直接预览', '结合AI可快速开发', '发布到真实微信环境'],
    useCase: '做一个真实可用的微信小程序，比如生日倒计时、每日一句话小程序',
    difficulty: '需要一点代码基础',
    diffColor: '#f59e0b',
    steps: ['微信公众平台注册小程序账号', '下载并安装微信开发者工具', '新建项目，选"小程序"', '结合AI工具写代码', '在模拟器里预览效果', '（可选）发布到微信'],
  },
]

const COMPARE_DIMS = [
  { label: '入门门槛', key: 'difficulty' },
  { label: '主要用途', key: 'useCase' },
  { label: '网络要求', key: 'tag' },
]

const QUIZ = [
  {
    q: '想用文字描述直接生成一个网页，哪个工具最合适？',
    options: ['Cursor', 'V0', '微信开发者工具', '美图PPT'],
    correct: 1,
    explain: 'V0专门做这件事！你只需用文字描述网页内容，它直接生成可预览、可下载的网页代码。',
  },
  {
    q: '要做中文PPT、又不想用国际工具，最应该选哪个？',
    options: ['Gamma', 'Cursor', '美图PPT', 'V0'],
    correct: 2,
    explain: '美图PPT是国内工具，无需科学上网，中文PPT效果好，手机号即可登录，非常适合国内用户！',
  },
  {
    q: 'Cursor最主要的用途是什么？',
    options: ['生成图片', '写PPT', 'AI辅助写代码', '管理文件'],
    correct: 2,
    explain: 'Cursor是AI代码编辑器——在你写代码时实时给出AI建议，帮你补全、调试、生成代码。',
  },
]

export default function Lesson20({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [selectedTool, setSelectedTool] = useState(null)
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)
  const [myTool, setMyTool] = useState(null)

  const accentColor = '#f97316'
  const toolDetail = WORK_TOOLS.find(t => t.id === selectedTool)

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

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#ffedd5', color: '#7c2d12' }}>第 20 课 · 模块 E · 工具大全</span>
        <span className="lesson-hero-emoji">🛠️</span>
        <h1 className="lesson-hero-title">会做工的 AI</h1>
        <p className="lesson-hero-sub">AI Productivity Tools — 用AI工具，让创作效率翻倍</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>认识Cursor、V0、Gamma、美图PPT、微信开发者工具</li>
          <li>知道每个工具适合做什么、怎么入门</li>
          <li>选定你最想先试的那一个，准备动手！</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {['learn', 'tools', 'steps', 'quiz', 'work'].map(t => (
          <button key={t} className={`lesson-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}
            style={tab === t ? { borderBottomColor: accentColor, color: accentColor } : {}}>
            {t === 'learn' ? '学一学' : t === 'tools' ? '认识工具' : t === 'steps' ? '入门步骤' : t === 'quiz' ? '测一测' : '我要去试'}
          </button>
        ))}
      </div>

      {tab === 'learn' && (
        <div className="lesson-content">
          {DEVICE_BADGE}
          <div className="lesson-section">
            <h2 className="lesson-section-title">🛠️ "会做工"的AI是什么？</h2>
            <p className="lesson-text">除了聊天和画图，AI还能帮你做很多"实际工作"：写代码、做PPT、搭网页、做小程序……这些工具把AI变成了你的"创作加速器"，让你本来要做好几天的事，可能几分钟就搞定。</p>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">📦 今天认识5个工具</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
              {WORK_TOOLS.map(t => (
                <div key={t.id} style={{ background: t.bg, border: `1.5px solid ${t.color}30`, borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 26, flexShrink: 0 }}>{t.emoji}</span>
                  <div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontWeight: 800, color: t.color, fontSize: 15 }}>{t.name}</span>
                      <span style={{ background: t.tagColor + '20', color: t.tagColor, fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 999 }}>{t.category}</span>
                    </div>
                    <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.5 }}>{t.desc.slice(0, 50)}...</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-tip-box">
            💡 <strong>策略：</strong>无需全部都学！先选一个你最感兴趣的，用它做出一个真实作品——这比把所有工具都浅尝一遍有意义得多。
          </div>
        </div>
      )}

      {tab === 'tools' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🔍 点击工具，查看详情</h2>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {WORK_TOOLS.map(t => (
              <button key={t.id} onClick={() => setSelectedTool(t.id === selectedTool ? null : t.id)}
                style={{ padding: '8px 12px', borderRadius: 999, border: `2px solid ${selectedTool === t.id ? t.color : '#e2e8f0'}`, background: selectedTool === t.id ? t.bg : '#fff', color: t.color, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                {t.emoji} {t.name}
              </button>
            ))}
          </div>

          {toolDetail && (
            <div style={{ background: toolDetail.bg, border: `2px solid ${toolDetail.color}40`, borderRadius: 16, padding: '18px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 30 }}>{toolDetail.emoji}</span>
                <div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 900, color: toolDetail.color, fontSize: 20 }}>{toolDetail.name}</span>
                    <span style={{ background: toolDetail.tagColor + '20', color: toolDetail.tagColor, fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 999 }}>{toolDetail.tag}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>网址：{toolDetail.url}</div>
                </div>
              </div>

              <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.7, marginBottom: 14 }}>{toolDetail.desc}</p>

              <div style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 8, fontSize: 14 }}>✅ 四大优势：</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  {toolDetail.strengths.map((s, i) => (
                    <div key={i} style={{ background: '#fff', border: `1px solid ${toolDetail.color}30`, borderRadius: 8, padding: '7px 10px', fontSize: 12, color: '#1e293b' }}>
                      <span style={{ color: toolDetail.color }}>● </span>{s}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#fff', borderRadius: 10, padding: '10px 12px', marginBottom: 10, fontSize: 13 }}>
                <strong style={{ color: toolDetail.color }}>🎯 使用场景：</strong> {toolDetail.useCase}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, color: '#64748b' }}>入门难度：</span>
                <span style={{ background: toolDetail.diffColor + '20', color: toolDetail.diffColor, fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>{toolDetail.difficulty}</span>
              </div>
            </div>
          )}

          {!selectedTool && (
            <div style={{ textAlign: 'center', padding: '30px 20px', color: '#94a3b8', fontSize: 14 }}>
              ↑ 点击工具名称，查看详细介绍
            </div>
          )}
        </div>
      )}

      {tab === 'steps' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🪜 入门步骤（手把手）</h2>
          <p className="lesson-text">选一个工具，查看从零开始的入门步骤：</p>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {WORK_TOOLS.map(t => (
              <button key={t.id} onClick={() => setSelectedTool(t.id === selectedTool ? null : t.id)}
                style={{ padding: '8px 12px', borderRadius: 999, border: `2px solid ${selectedTool === t.id ? t.color : '#e2e8f0'}`, background: selectedTool === t.id ? t.bg : '#fff', color: t.color, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                {t.emoji} {t.name}
              </button>
            ))}
          </div>

          {toolDetail && (
            <div style={{ background: toolDetail.bg, border: `2px solid ${toolDetail.color}40`, borderRadius: 14, padding: '18px 16px' }}>
              <div style={{ fontWeight: 800, color: toolDetail.color, fontSize: 16, marginBottom: 14 }}>{toolDetail.emoji} {toolDetail.name} · 入门步骤</div>
              {toolDetail.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < toolDetail.steps.length - 1 ? 12 : 0, alignItems: 'flex-start' }}>
                  <div style={{ background: toolDetail.color, color: '#fff', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.6, paddingTop: 4 }}>{step}</div>
                </div>
              ))}
              <div style={{ marginTop: 14, background: '#fff', borderRadius: 10, padding: '10px 12px', fontSize: 13, color: '#475569' }}>
                💡 遇到问题？去 {toolDetail.url} 官方文档或者直接问AI："我在用{toolDetail.name}，[描述你遇到的情况]，怎么解决？"
              </div>
            </div>
          )}

          {!selectedTool && (
            <div style={{ textAlign: 'center', padding: '30px 20px', color: '#94a3b8', fontSize: 14 }}>
              ↑ 点击上方按钮，查看入门步骤
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
                {quizScore === 3 ? '🎉 全对！工具达人！' : quizScore === 2 ? '👍 不错！去试试最感兴趣的！' : '💪 回去"认识工具"看一看，再来！'}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'work' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🚀 我最想先试这个！</h2>
          <p className="lesson-text">选出你最想优先尝试的工具：</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {WORK_TOOLS.map(t => (
              <button key={t.id} onClick={() => setMyTool(t.id)}
                style={{ border: `2.5px solid ${myTool === t.id ? t.color : '#e2e8f0'}`, borderRadius: 14, padding: '12px 14px', textAlign: 'left', background: myTool === t.id ? t.bg : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{t.emoji}</span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 700, color: t.color }}>{t.name}</span>
                  <span style={{ marginLeft: 6, fontSize: 12, color: '#64748b' }}>· {t.category}</span>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{t.difficulty}</div>
                </div>
                {myTool === t.id && <span style={{ color: t.color, fontWeight: 700, fontSize: 18 }}>✓</span>}
              </button>
            ))}
          </div>

          {myTool && (
            <div className="certificate">
              <div className="certificate-title">🛠️ 工具就位！准备做作品！</div>
              <div className="certificate-name">
                {WORK_TOOLS.find(t => t.id === myTool)?.emoji} {WORK_TOOLS.find(t => t.id === myTool)?.name}
              </div>
              <div className="certificate-sub">第 20 课 · 模块 E · 工具大全</div>
              <div style={{ fontSize: 14, color: '#93c5fd', margin: '16px 0', lineHeight: 1.8 }}>
                模块E结束！你认识了聊天AI、画图AI、做工AI<br />
                <strong style={{ color: '#bfdbfe' }}>下一步：用AI真正做出作品！</strong>
              </div>
              <div style={{ fontSize: 24, letterSpacing: 4 }}>⭐⭐⭐</div>
            </div>
          )}

          <div className="lesson-next-preview" style={{ marginTop: 16 }}>
            <div className="lesson-next-title">🚀 下一课预告：第 21 课 · 用AI写一段话</div>
            <p>工具认识了，下面就是上手做！第21课会直接用嵌入式AI，教你写出一段真正打动人的文字——感受提示词的力量。</p>
          </div>
        </div>
      )}
    </div>
  )
}
