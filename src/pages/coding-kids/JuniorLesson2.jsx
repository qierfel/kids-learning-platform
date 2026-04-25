import { useState } from 'react'
import './JuniorLesson.css'

const THEMES = [
  { id: 'sun', name: '太阳黄', bg: '#fff7cc', accent: '#f59e0b', emoji: '🌞' },
  { id: 'sea', name: '海洋蓝', bg: '#dbeafe', accent: '#2563eb', emoji: '🌊' },
  { id: 'mint', name: '薄荷绿', bg: '#d1fae5', accent: '#059669', emoji: '🍀' },
]

const STICKERS = ['🦄', '🚀', '🐙', '🍓', '🌈', '🎈']

export default function JuniorLesson2({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [theme, setTheme] = useState(THEMES[0])
  const [sticker, setSticker] = useState(STICKERS[0])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #fff7ed, #fde68a)' }}>
        <div className="junior-badge" style={{ background: '#fed7aa', color: '#9a3412' }}>第 2 课</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">🎨</div></div>
          <div>
            <h1 className="junior-title">颜色魔法秀</h1>
            <p className="junior-sub">同一张卡，换颜色就像换心情</p>
          </div>
        </div>
      </div>

      <div className="junior-goals">
        <div className="junior-goal">知道颜色会让页面变不一样</div>
        <div className="junior-goal">做一张自己的小卡片</div>
      </div>

      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((key) => (
          <button key={key} className="junior-tab" onClick={() => setTab(key)} style={tab === key ? { borderColor: '#f97316', color: '#c2410c' } : {}}>
            {key === 'learn' ? '看一看' : key === 'do' ? '玩一玩' : key === 'ai' ? '问问 AI' : '我学会了'}
          </button>
        ))}
      </div>

      <div className="junior-content">
        {tab === 'learn' && (
          <>
            <div className="junior-card">
              <h2>颜色像衣服</h2>
              <p>同样一张页面，换了颜色，就会看起来更安静、更开心，或者更像冒险乐园。</p>
            </div>
            <div className="junior-card">
              <h3>今天不记难词</h3>
              <p>你只要记住：颜色会改变感觉。</p>
            </div>
          </>
        )}

        {tab === 'do' && (
          <div className="junior-card">
            <h2>做一张快乐小卡片</h2>
            <div className="junior-grid-3">
              {THEMES.map((item) => (
                <button
                  key={item.id}
                  className={`junior-option-btn${theme.id === item.id ? ' active' : ''}`}
                  onClick={() => setTheme(item)}
                  style={theme.id === item.id ? { borderColor: item.accent, color: item.accent } : {}}
                >
                  <div className="junior-big-emoji">{item.emoji}</div>
                  <div>{item.name}</div>
                </button>
              ))}
            </div>
            <div className="sticker-row">
              {STICKERS.map((item) => (
                <button key={item} className={`sticker${sticker === item ? ' active' : ''}`} onClick={() => setSticker(item)}>
                  {item}
                </button>
              ))}
            </div>
            <div className="story-preview" style={{ borderColor: theme.accent }}>
              <div className="story-top" style={{ background: theme.accent }}>
                小小欢迎卡
              </div>
              <div className="story-body" style={{ background: theme.bg }}>
                <div style={{ fontSize: 56, textAlign: 'center' }}>{sticker}</div>
                <div style={{ textAlign: 'center', fontSize: 20, fontWeight: 900, color: theme.accent }}>欢迎来到我的彩色小站</div>
                <div style={{ textAlign: 'center', fontSize: 14, color: '#475569', marginTop: 8 }}>今天这张卡片的感觉是：{theme.name}</div>
              </div>
            </div>
          </div>
        )}

        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <div className="junior-prompt">{`我在做一张儿童网页小卡片。\n我想让它看起来更开心一点。\n请你给我 3 种颜色感觉，\n每种只用很短的话告诉我。`}</div>
          </div>
        )}

        {tab === 'work' && (
          <div className="junior-card">
            <h2>今天我学会了</h2>
            <p>颜色会改变页面的感觉。换颜色，就像给作品换新衣服。</p>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">🎨🌈</div>
              <h3>色彩小魔法师</h3>
              <p>你已经会做自己的彩色小卡片啦。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
