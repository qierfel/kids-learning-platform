import { useMemo, useState } from 'react'
import './JuniorLesson.css'

const COLORS = [
  { id: 'blue', label: '蓝色', color: '#2563eb', bg: '#dbeafe' },
  { id: 'green', label: '绿色', color: '#16a34a', bg: '#dcfce7' },
  { id: 'pink', label: '粉色', color: '#db2777', bg: '#fce7f3' },
]

const BADGES = ['🚀', '🌈', '🤖', '🪄']

export default function JuniorLesson15({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [name, setName] = useState('')
  const [color, setColor] = useState(COLORS[0])
  const [badge, setBadge] = useState(BADGES[0])

  const title = useMemo(() => name.trim() ? `${name} 的 2.0 小机器` : '我的 2.0 小机器', [name])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #dcfce7, #dbeafe)' }}>
        <div className="junior-badge" style={{ background: '#bbf7d0', color: '#166534' }}>第 15 课 · 工具舱</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">🧃</div></div>
          <div>
            <h1 className="junior-title">名字和颜色小机器</h1>
            <p className="junior-sub">这次要做的不是 1 个输入，而是“名字 + 颜色 + 徽章”的 2.0 小产品</p>
          </div>
        </div>
      </div>

      <div className="junior-goals">
        <div className="junior-goal">把名字、颜色和标记拼在一起</div>
        <div className="junior-goal">第一次感受 1.0 和 2.0 的差别</div>
      </div>

      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((k) => (
          <button key={k} className="junior-tab" onClick={() => setTab(k)} style={tab === k ? { borderColor: '#22c55e', color: '#15803d' } : {}}>
            {k === 'learn' ? '看一看' : k === 'do' ? '升级 2.0' : k === 'ai' ? '问问 AI' : '完成啦'}
          </button>
        ))}
      </div>

      <div className="junior-content">
        {tab === 'learn' && (
          <>
            <div className="junior-card">
              <div className="junior-kicker">1.0 VS 2.0</div>
              <h2>什么叫“更像真的产品”？</h2>
              <p>不是只显示一个名字，而是让页面多一点个性：颜色、徽章、标题、风格，都会让它更像自己的作品。</p>
              <div className="junior-mini-grid">
                <div className="junior-mini-panel">
                  <div className="junior-mini-title">1.0</div>
                  <div className="junior-mini-copy">只有名字，结果很单薄。</div>
                </div>
                <div className="junior-mini-panel">
                  <div className="junior-mini-title">2.0</div>
                  <div className="junior-mini-copy">名字 + 颜色 + 徽章，感觉马上不一样。</div>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'do' && (
          <>
            <div className="junior-card">
              <div className="junior-kicker">STEP 1</div>
              <h2>先输入名字</h2>
              <input className="junior-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="写你的名字" maxLength={10} />
            </div>

            <div className="junior-card">
              <div className="junior-kicker">STEP 2</div>
              <h2>再选颜色和徽章</h2>
              <div className="junior-grid-3">
                {COLORS.map((item) => (
                  <button
                    key={item.id}
                    className={`junior-option-btn${color.id === item.id ? ' active' : ''}`}
                    onClick={() => setColor(item)}
                    style={color.id === item.id ? { borderColor: item.color, color: item.color } : {}}
                  >
                    <div className="junior-big-emoji">🎨</div>
                    <div>{item.label}</div>
                  </button>
                ))}
              </div>
              <div className="sticker-row">
                {BADGES.map((item) => (
                  <button key={item} className={`sticker${badge === item ? ' active' : ''}`} onClick={() => setBadge(item)}>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="junior-card">
              <div className="junior-kicker">RESULT</div>
              <h2>看一眼 2.0 的样子</h2>
              <div className="junior-mini-grid">
                <div className="junior-mini-panel">
                  <div className="junior-mini-title">1.0</div>
                  <div className="junior-mini-copy">{name.trim() ? `${name} 的页面` : '只有名字的小页面'}</div>
                </div>
                <div className="junior-mini-panel">
                  <div className="junior-mini-title">2.0</div>
                  <div className="junior-mini-copy">颜色、徽章、标题都一起升级了。</div>
                </div>
              </div>

              <div className="junior-result" style={{ background: color.bg, borderColor: `${color.color}55` }}>
                <div style={{ fontSize: 56, textAlign: 'center' }}>{badge}</div>
                <div className="junior-result-title" style={{ textAlign: 'center', color: color.color }}>{title}</div>
                <div className="junior-result-copy" style={{ textAlign: 'center' }}>
                  {name.trim() ? `${name} 今天选择了 ${color.label} 模式。` : `先写名字，这台小机器才真正属于你。`}
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <p>这次可以让 AI 帮你想“2.0 还缺什么”，而不只是帮你写一句介绍。</p>
            <div className="junior-prompt">{`我做了一个儿童名字和颜色小机器。\n现在它有：名字、颜色、徽章。\n请你告诉我，\n如果我要升级成 3.0，还可以再加哪 3 个简单功能？`}</div>
          </div>
        )}

        {tab === 'work' && (
          <div className="junior-card">
            <h2>今天留下的作品</h2>
            <p>你第一次不只是做出结果，还看到了“升级前后差别”。这就是产品 2.0 的味道。</p>
            <div className="junior-checklist">
              {[
                { done: !!name.trim(), label: '我给作品放进了名字' },
                { done: !!color.id, label: '我给作品选了自己的颜色' },
                { done: !!badge, label: '我给作品加了一个徽章' },
              ].map((item) => (
                <div key={item.label} className={`junior-check-item${item.done ? ' done' : ''}`}>
                  <span className="junior-check-mark">{item.done ? '✓' : '•'}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">🧃🚀</div>
              <h3>2.0 小产品升级师</h3>
              <p>你已经不只是在做页面，而是在给作品做真正的升级。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
