import { useMemo, useState } from 'react'
import './JuniorLesson.css'

const PROJECTS = [
  { name: '快乐小站', emoji: '🌈', skill: '颜色和按钮' },
  { name: '故事页面', emoji: '📚', skill: '场景和角色' },
  { name: '选择小游戏', emoji: '🎮', skill: '分支和结果' },
]

const TITLES = ['我的第一件作品', '今天也能继续升级', '欢迎来到我的小世界']

export default function JuniorLesson12({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [project, setProject] = useState(PROJECTS[0])
  const [title, setTitle] = useState(TITLES[0])
  const [favoritePart, setFavoritePart] = useState('')

  const readyCount = [project?.name, title.trim(), favoritePart.trim()].filter(Boolean).length
  const readyPercent = Math.round((readyCount / 3) * 100)

  const speech = useMemo(() => {
    const part = favoritePart.trim() || `它的 ${project.skill}`
    return `这是我的 ${project.name}。我最喜欢 ${part}。下次我还想继续给它升级。`
  }, [favoritePart, project])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #e0e7ff, #fef3c7)' }}>
        <div className="junior-badge" style={{ background: '#c7d2fe', color: '#4338ca' }}>第 12 课 · 升级舱</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">🏅</div></div>
          <div>
            <h1 className="junior-title">我的小童作品展</h1>
            <p className="junior-sub">这次不是只选一个作品，而是把它整理成一张能展示、能讲解、能升级的发布页</p>
          </div>
        </div>
      </div>

      <div className="junior-goals">
        <div className="junior-goal">整理一张真的能展示的小作品卡</div>
        <div className="junior-goal">学会用 3 句话介绍自己的作品</div>
      </div>

      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((key) => (
          <button key={key} className="junior-tab" onClick={() => setTab(key)} style={tab === key ? { borderColor: '#6366f1', color: '#4338ca' } : {}}>
            {key === 'learn' ? '看任务' : key === 'do' ? '做展页' : key === 'ai' ? '问问 AI' : '完成检查'}
          </button>
        ))}
      </div>

      <div className="junior-content">
        {tab === 'learn' && (
          <>
            <div className="junior-card">
              <div className="junior-kicker">SHOWCASE PLAN</div>
              <h2>作品展不是只摆一个名字</h2>
              <p>真正的作品展要有 3 样东西：作品名字、我最喜欢哪一部分、我以后还想加什么。</p>
              <div className="junior-checklist">
                {['选一个作品', '给它定一个展示标题', '写出我最喜欢的地方', '最后整理成展示卡和介绍词'].map((item) => (
                  <div key={item} className="junior-check-item">
                    <span className="junior-check-mark">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="junior-card">
              <h2>今天你会做出什么？</h2>
              <div className="junior-mini-grid">
                <div className="junior-mini-panel">
                  <div className="junior-mini-title">展示卡</div>
                  <div className="junior-mini-copy">让别人一眼看出这是什么作品。</div>
                </div>
                <div className="junior-mini-panel">
                  <div className="junior-mini-title">介绍词</div>
                  <div className="junior-mini-copy">让你自己能把作品讲给别人听。</div>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'do' && (
          <>
            <div className="junior-card">
              <div className="junior-kicker">BUILD 1.0</div>
              <h2>先选一件最想展示的作品</h2>
              <div className="junior-grid-3">
                {PROJECTS.map((item) => (
                  <button key={item.name} className={`junior-option-btn${project.name === item.name ? ' active' : ''}`} onClick={() => setProject(item)} style={project.name === item.name ? { borderColor: '#6366f1', color: '#4338ca' } : {}}>
                    <div className="junior-big-emoji">{item.emoji}</div>
                    <div>{item.name}</div>
                  </button>
                ))}
              </div>
              <div style={{ height: 12 }} />
              <div className="junior-grid-3">
                {TITLES.map((item) => (
                  <button key={item} className={`junior-option-btn${title === item ? ' active' : ''}`} onClick={() => setTitle(item)} style={title === item ? { borderColor: '#6366f1', color: '#4338ca' } : {}}>
                    <div>{item}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="junior-card">
              <div className="junior-kicker">BUILD 2.0</div>
              <h2>再写出你最喜欢的地方</h2>
              <textarea
                className="junior-textarea"
                value={favoritePart}
                onChange={(e) => setFavoritePart(e.target.value)}
                placeholder={`比如：我最喜欢它会用到 ${project.skill}，因为它一看就知道是我做的。`}
                maxLength={80}
              />

              <div className="junior-meter">
                <div className="junior-meter-label">作品展准备进度</div>
                <div className="junior-meter-track">
                  <div className="junior-meter-fill" style={{ width: `${readyPercent}%` }} />
                </div>
              </div>

              <div className="junior-result">
                <div style={{ fontSize: 62, textAlign: 'center' }}>{project.emoji}</div>
                <div className="junior-result-title" style={{ textAlign: 'center', color: '#4338ca' }}>{title}</div>
                <div className="junior-result-copy" style={{ textAlign: 'center' }}>作品名字：{project.name}</div>
                <div className="junior-result-copy" style={{ textAlign: 'center' }}>我最喜欢：{favoritePart.trim() || `它会用到 ${project.skill}`}</div>
                <div className="junior-stage" style={{ marginTop: 14 }}>
                  <div style={{ fontWeight: 900, color: '#f8fafc', marginBottom: 8 }}>展示时可以这样说</div>
                  <div style={{ color: '#cbd5e1', lineHeight: 1.8 }}>{speech}</div>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <div className="junior-prompt">{`我想介绍我的小作品。\n作品名字是：${project.name}\n展示标题是：${title}\n我最喜欢的地方是：${favoritePart.trim() || project.skill}\n请帮我整理成：\n1. 3 句小朋友能说的话\n2. 1 个更酷一点的作品标题`}</div>
          </div>
        )}

        {tab === 'work' && (
          <div className="junior-card">
            <h2>完成检查</h2>
            <div className="junior-checklist">
              {[
                { done: true, label: '我选出了一件最想展示的作品' },
                { done: !!title.trim(), label: '我给作品定了一个展示标题' },
                { done: !!favoritePart.trim(), label: '我写出了自己最喜欢的地方' },
                { done: readyPercent === 100, label: '我整理出了一张能展示也能讲解的作品卡' },
              ].map((item) => (
                <div key={item.label} className={`junior-check-item${item.done ? ' done' : ''}`}>
                  <span className="junior-check-mark">{item.done ? '✓' : '•'}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">🏅🌟</div>
              <h3>小小作品策展人</h3>
              <p>你已经会把作品整理成展页，也会把它清楚地讲给别人听了。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
