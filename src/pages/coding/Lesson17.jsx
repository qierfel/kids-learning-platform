import { useState } from 'react'
import './Lesson.css'

const DEVICE_BADGE = (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
    <span style={{ background: '#dcfce7', color: '#15803d', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>💻 推荐电脑</span>
    <span style={{ background: '#e0e7ff', color: '#4338ca', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>🖥️ iPad也可以</span>
    <span style={{ background: '#f1f5f9', color: '#475569', fontSize: 11, padding: '4px 10px', borderRadius: 999 }}>📍 注册账号推荐用电脑，操作更方便</span>
  </div>
)

const TOOLS = [
  {
    id: 'doubaob',
    name: '豆包',
    maker: '字节跳动',
    emoji: '🫘',
    color: '#6366f1',
    bg: '#eef2ff',
    tag: '国内',
    tagColor: '#4338ca',
    register: 'doubao.com',
    steps: ['打开 doubao.com', '点击"立即体验"', '用手机号 / 微信快捷登录', '填写昵称，完成！'],
    tip: '最推荐新手第一个注册，无需科学上网，中文很流畅',
    need: ['手机号 或 微信账号'],
  },
  {
    id: 'kimi',
    name: 'Kimi',
    maker: '月之暗面',
    emoji: '🌙',
    color: '#8b5cf6',
    bg: '#faf5ff',
    tag: '国内',
    tagColor: '#7c3aed',
    register: 'kimi.moonshot.cn',
    steps: ['打开 kimi.moonshot.cn', '点击"注册"', '手机号接收验证码', '设置密码，完成！'],
    tip: '长文本处理能力强，适合读长文章和整理笔记',
    need: ['手机号'],
  },
  {
    id: 'tongyi',
    name: '通义千问',
    maker: '阿里巴巴',
    emoji: '☁️',
    color: '#f97316',
    bg: '#fff7ed',
    tag: '国内',
    tagColor: '#c2410c',
    register: 'tongyi.aliyun.com',
    steps: ['打开 tongyi.aliyun.com', '点击登录 / 注册', '用淘宝 / 支付宝快捷登录', '完成！（如已有阿里账号可直接用）'],
    tip: '有阿里账号直接登录超方便，功能丰富',
    need: ['阿里 / 淘宝 / 支付宝账号 或 手机号'],
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    maker: 'OpenAI',
    emoji: '🤖',
    color: '#10b981',
    bg: '#f0fdf4',
    tag: '国际',
    tagColor: '#047857',
    register: 'chat.openai.com',
    steps: ['需要能访问国际网络', '打开 chat.openai.com', '点击"Sign up"', '用邮箱注册，接收验证码', '完成设置，开始使用！'],
    tip: '全球最知名的AI聊天工具，需要能访问国际网络',
    need: ['邮箱地址', '能访问国际网络'],
  },
  {
    id: 'claude',
    name: 'Claude',
    maker: 'Anthropic',
    emoji: '🌿',
    color: '#f59e0b',
    bg: '#fffbeb',
    tag: '国际',
    tagColor: '#b45309',
    register: 'claude.ai',
    steps: ['需要能访问国际网络', '打开 claude.ai', '点击"Sign up"', '用邮箱注册，验证邮箱', '完成！即可开始使用'],
    tip: '在创意写作和分析方面非常出色，本平台已内置Claude',
    need: ['邮箱地址', '能访问国际网络'],
  },
]

const QUIZ = [
  {
    q: '注册国内AI工具（如豆包、Kimi），通常需要什么？',
    options: ['护照', '手机号或已有国内社交账号', '信用卡', '科学上网工具'],
    correct: 1,
    explain: '国内AI工具注册非常简单！用手机号或绑定的微信/支付宝账号就能直接登录，无需繁琐步骤。',
  },
  {
    q: '注册ChatGPT和Claude这类国际AI工具，额外需要什么？',
    options: ['中国手机号', '能访问国际网络的网络环境', '高端设备', '年龄必须满18岁'],
    correct: 1,
    explain: '国际AI工具需要在能访问国际网络的环境下注册和使用。如果暂时无法访问，先从国内工具开始！',
  },
  {
    q: '新手最应该先注册哪个AI工具？',
    options: ['ChatGPT', 'Claude', '豆包或Kimi（国内工具）', 'Midjourney'],
    correct: 2,
    explain: '国内工具（豆包/Kimi）注册最简单，无需科学上网，中文体验好，非常适合入门！',
  },
]

export default function Lesson17({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [selectedTool, setSelectedTool] = useState(null)
  const [completedTools, setCompletedTools] = useState([])
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)
  const [myFirstTool, setMyFirstTool] = useState(null)

  const accentColor = '#10b981'
  const tool = TOOLS.find(t => t.id === selectedTool)

  function handleMark(id) {
    setCompletedTools(c => c.includes(id) ? c : [...c, id])
    setSelectedTool(null)
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

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#dcfce7', color: '#14532d' }}>第 17 课 · 模块 D · 工具基础</span>
        <span className="lesson-hero-emoji">🔑</span>
        <h1 className="lesson-hero-title">开通你的 AI 账号</h1>
        <p className="lesson-hero-sub">Set Up AI Accounts — 开启你的AI创作之门</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>认识主流AI工具的注册方式（国内 + 国际）</li>
          <li>了解每个工具需要什么账号条件</li>
          <li>至少成功登录一个AI工具，正式出发！</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {['learn', 'guide', 'quiz', 'work'].map(t => (
          <button key={t} className={`lesson-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}
            style={tab === t ? { borderBottomColor: accentColor, color: accentColor } : {}}>
            {t === 'learn' ? '学一学' : t === 'guide' ? '注册指南' : t === 'quiz' ? '测一测' : '我的账号'}
          </button>
        ))}
      </div>

      {tab === 'learn' && (
        <div className="lesson-content">
          {DEVICE_BADGE}
          <div className="lesson-section">
            <h2 className="lesson-section-title">🔑 为什么要注册账号？</h2>
            <p className="lesson-text">注册账号是使用AI的第一步。有了账号，AI才能记住你的对话历史，也才能持续帮你学习和创作。国内工具门槛低、注册简单；国际工具功能更强，但需要多一点准备。</p>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">🗂️ 5个你应该了解的AI工具</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
              {TOOLS.map(t => (
                <div key={t.id} style={{ background: t.bg, border: `1.5px solid ${t.color}30`, borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 24 }}>{t.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 800, color: t.color, fontSize: 15 }}>{t.name}</span>
                      <span style={{ background: t.tagColor + '20', color: t.tagColor, fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 999 }}>{t.tag}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{t.maker} · {t.tip.slice(0, 30)}...</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">⚡ 开始的最佳顺序</h2>
            <div className="lesson-step-list">
              {[
                { step: '1', title: '先注册豆包或Kimi', desc: '国内工具，无需科学上网，手机号注册即可，5分钟搞定' },
                { step: '2', title: '用起来！先感受AI', desc: '不要光注册不用，马上提一个问题试试看' },
                { step: '3', title: '有条件的话注册ChatGPT/Claude', desc: '国际工具功能更强大，可以同时对比两者的差别' },
              ].map(s => (
                <div key={s.step} className="lesson-step-item">
                  <span className="lesson-step-num" style={{ background: accentColor }}>{s.step}</span>
                  <div><strong>{s.title}</strong><p>{s.desc}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-tip-box">
            💡 <strong>关于国际工具：</strong>如果家里暂时无法访问国际网络，先把豆包/Kimi用好，功能已经非常强大！条件具备了再试国际工具。
          </div>
        </div>
      )}

      {tab === 'guide' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">📋 手把手注册指南</h2>
          <p className="lesson-text">点击任意工具，查看详细注册步骤。</p>

          {!selectedTool ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
              {TOOLS.map(t => (
                <button key={t.id} onClick={() => setSelectedTool(t.id)}
                  style={{ background: completedTools.includes(t.id) ? t.bg : '#fff', border: `2px solid ${completedTools.includes(t.id) ? t.color : '#e2e8f0'}`, borderRadius: 14, padding: '14px 16px', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 24 }}>{t.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, color: t.color }}>{t.name}</span>
                      <span style={{ background: t.tagColor + '20', color: t.tagColor, fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 999 }}>{t.tag}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{t.register}</div>
                  </div>
                  {completedTools.includes(t.id)
                    ? <span style={{ color: accentColor, fontWeight: 700, fontSize: 13 }}>✓ 已完成</span>
                    : <span style={{ color: '#94a3b8', fontSize: 13 }}>→ 查看</span>}
                </button>
              ))}
            </div>
          ) : (
            <div>
              <button onClick={() => setSelectedTool(null)} style={{ fontSize: 13, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 12, textDecoration: 'underline' }}>← 返回列表</button>

              <div style={{ background: tool.bg, border: `2px solid ${tool.color}40`, borderRadius: 16, padding: '18px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 28 }}>{tool.emoji}</span>
                  <div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, color: tool.color, fontSize: 18 }}>{tool.name}</span>
                      <span style={{ background: tool.tagColor + '20', color: tool.tagColor, fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 999 }}>{tool.tag} · {tool.maker}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>网址：{tool.register}</div>
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 8, fontSize: 14 }}>📋 注册需要准备：</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {tool.need.map(n => (
                      <span key={n} style={{ background: '#fff', border: `1.5px solid ${tool.color}60`, color: tool.color, fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 999 }}>{n}</span>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 8, fontSize: 14 }}>🪜 注册步骤：</div>
                  {tool.steps.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                      <div style={{ background: tool.color, color: '#fff', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                      <div style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.6 }}>{step}</div>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#fff', borderRadius: 10, padding: '10px 12px', border: `1px solid ${tool.color}30`, fontSize: 13, color: '#475569', marginBottom: 16 }}>
                  💡 {tool.tip}
                </div>

                {!completedTools.includes(tool.id) ? (
                  <button className="lesson-btn" style={{ background: tool.color }} onClick={() => handleMark(tool.id)}>
                    ✅ 我已注册成功！
                  </button>
                ) : (
                  <div style={{ color: accentColor, fontWeight: 700, textAlign: 'center', padding: 10 }}>✓ 已完成注册！</div>
                )}
              </div>
            </div>
          )}

          {completedTools.length >= 1 && !selectedTool && (
            <div style={{ marginTop: 16, background: '#f0fdf4', border: '2px solid #86efac', borderRadius: 12, padding: '14px', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, color: '#15803d' }}>🎉 你已经注册了 {completedTools.length} 个AI工具！出发！</div>
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
                {quizScore === 3 ? '🎉 全对！你是AI工具达人！' : quizScore === 2 ? '👍 不错，快去注册一个试试！' : '💪 回去"注册指南"看一看再来！'}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'work' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🎖️ 我的第一个AI账号</h2>
          <p className="lesson-text">选出你已经注册或最想先注册的那一个：</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {TOOLS.map(t => (
              <button key={t.id} onClick={() => setMyFirstTool(t.id)}
                style={{ border: `2.5px solid ${myFirstTool === t.id ? t.color : '#e2e8f0'}`, borderRadius: 14, padding: '12px 14px', textAlign: 'left', background: myFirstTool === t.id ? t.bg : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{t.emoji}</span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 700, color: t.color }}>{t.name}</span>
                  <span style={{ marginLeft: 6, background: t.tagColor + '20', color: t.tagColor, fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 999 }}>{t.tag}</span>
                </div>
                {myFirstTool === t.id && <span style={{ color: t.color, fontWeight: 700, fontSize: 18 }}>✓</span>}
              </button>
            ))}
          </div>

          {myFirstTool && (
            <div className="certificate">
              <div className="certificate-title">🔑 账号开通！正式出发！</div>
              <div className="certificate-name">
                我的第一个AI工具：{TOOLS.find(t => t.id === myFirstTool)?.emoji} {TOOLS.find(t => t.id === myFirstTool)?.name}
              </div>
              <div className="certificate-sub">第 17 课 · 模块 D · 工具基础</div>
              <div style={{ fontSize: 14, color: '#93c5fd', margin: '16px 0', lineHeight: 1.8 }}>
                今天开了门，下面就是：<br />
                <strong style={{ color: '#bfdbfe' }}>认识各种AI → 动手体验 → 用AI做作品</strong>
              </div>
              <div style={{ fontSize: 24, letterSpacing: 4 }}>⭐⭐⭐</div>
            </div>
          )}

          <div className="lesson-next-preview" style={{ marginTop: 16 }}>
            <div className="lesson-next-title">🚀 下一课预告：第 18 课 · 会聊天的AI</div>
            <p>账号开通了，下一步就是认识主流的聊天AI！豆包、Kimi、ChatGPT、Claude——各有特点，我们一起来比一比。</p>
          </div>
        </div>
      )}
    </div>
  )
}
