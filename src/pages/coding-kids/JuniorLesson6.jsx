import { useState } from 'react'
import './JuniorLesson.css'

const THEMES = [
  { id: 'park', label: '小公园', color: '#16a34a', bg: '#dcfce7', emoji: '🌳' },
  { id: 'space', label: '小宇宙', color: '#2563eb', bg: '#dbeafe', emoji: '🪐' },
  { id: 'party', label: '小派对', color: '#db2777', bg: '#fce7f3', emoji: '🎉' },
]

const MASCOTS = ['🐻', '🐰', '🦊']
const BUTTONS = ['✨', '💖', '🌈']

export default function JuniorLesson6({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [theme, setTheme] = useState(THEMES[0])
  const [mascot, setMascot] = useState(MASCOTS[0])
  const [sticker, setSticker] = useState(BUTTONS[0])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #fef3c7, #fae8ff)' }}>
        <div className="junior-badge" style={{ background: '#fde68a', color: '#a16207' }}>第 6 课</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">🌟</div></div>
          <div>
            <h1 className="junior-title">我的快乐小作品</h1>
            <p className="junior-sub">把前面学的东西拼成一个真正的小项目</p>
          </div>
        </div>
      </div>
      <div className="junior-goals">
        <div className="junior-goal">把颜色、选择、故事拼到一起</div>
        <div className="junior-goal">做出属于自己的迷你页面</div>
      </div>
      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((key) => (
          <button key={key} className="junior-tab" onClick={() => setTab(key)} style={tab === key ? { borderColor: '#eab308', color: '#a16207' } : {}}>
            {key === 'learn' ? '看一看' : key === 'do' ? '做作品' : key === 'ai' ? '问问 AI' : '完成啦'}
          </button>
        ))}
      </div>
      <div className="junior-content">
        {tab === 'learn' && (
          <div className="junior-card">
            <h2>现在你已经会什么了？</h2>
            <div className="junior-pill-row">
              <div className="junior-pill">排顺序</div>
              <div className="junior-pill">换颜色</div>
              <div className="junior-pill">做选择</div>
              <div className="junior-pill">拼故事</div>
            </div>
            <p style={{ marginTop: 12 }}>今天，我们把这些小能力拼成一个快乐小作品。</p>
          </div>
        )}
        {tab === 'do' && (
          <div className="junior-card">
            <h2>组装你的快乐小站</h2>
            <div className="junior-grid-3">
              {THEMES.map((item) => (
                <button key={item.id} className={`junior-option-btn${theme.id === item.id ? ' active' : ''}`} onClick={() => setTheme(item)} style={theme.id === item.id ? { borderColor: item.color, color: item.color } : {}}>
                  <div className="junior-big-emoji">{item.emoji}</div>
                  <div>{item.label}</div>
                </button>
              ))}
            </div>
            <div className="sticker-row">
              {MASCOTS.map((item) => (
                <button key={item} className={`sticker${mascot === item ? ' active' : ''}`} onClick={() => setMascot(item)}>
                  {item}
                </button>
              ))}
            </div>
            <div className="sticker-row">
              {BUTTONS.map((item) => (
                <button key={item} className={`sticker${sticker === item ? ' active' : ''}`} onClick={() => setSticker(item)}>
                  {item}
                </button>
              ))}
            </div>
            <div className="project-preview" style={{ borderColor: theme.color }}>
              <div className="project-top" style={{ background: theme.color }}>
                {theme.emoji} 我的快乐小站
              </div>
              <div className="project-body" style={{ background: theme.bg }}>
                <div style={{ fontSize: 62, textAlign: 'center' }}>{mascot}</div>
                <div style={{ textAlign: 'center', fontSize: 22, fontWeight: 900, color: theme.color }}>欢迎来到我的 {theme.label}</div>
                <div style={{ textAlign: 'center', fontSize: 14, color: '#64748b', marginTop: 8 }}>今天的快乐按钮：{sticker}</div>
                <div style={{ display: 'grid', placeItems: 'center', marginTop: 14 }}>
                  <button style={{ minWidth: 120, minHeight: 46, border: 'none', borderRadius: 999, background: theme.color, color: '#fff', fontWeight: 900, fontSize: 18 }}>{sticker} 点我</button>
                </div>
              </div>
            </div>
          </div>
        )}
        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <div className="junior-prompt">{`我在做一个 7-10 岁小朋友的快乐小站。\n主题是 ${theme.label}。\n主角是 ${mascot}。\n请帮我想一句很短很可爱的欢迎语。`}</div>
          </div>
        )}
        {tab === 'work' && (
          <div className="junior-card">
            <h2>完成啦</h2>
            <p>这就是你的第一个小童版 AI 编程作品。它有主题、有角色、有按钮，也有自己的感觉。</p>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">🌟🏅</div>
              <h3>快乐创作家</h3>
              <p>你已经会做自己的迷你网页小项目啦。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
