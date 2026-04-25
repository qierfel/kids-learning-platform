import { useState } from 'react'
import './JuniorLesson.css'

const THEMES = ['海边小站', '彩虹故事页', '动物欢迎卡']
const OPENERS = ['欢迎来到我的快乐页面！', '今天我们一起去冒险吧！', '这是我最喜欢的小世界。']

export default function JuniorLesson11({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [theme, setTheme] = useState(THEMES[0])
  const [opener, setOpener] = useState(OPENERS[0])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #fef3c7, #dbeafe)' }}>
        <div className="junior-badge" style={{ background: '#fde68a', color: '#92400e' }}>第 11 课</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">💡</div></div>
          <div>
            <h1 className="junior-title">请 AI 帮我想点子</h1>
            <p className="junior-sub">学会用短短的话，让 AI 给你灵感</p>
          </div>
        </div>
      </div>
      <div className="junior-goals">
        <div className="junior-goal">学会用很短的话问 AI</div>
        <div className="junior-goal">让 AI 帮忙想主题和开场白</div>
      </div>
      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((key) => (
          <button key={key} className="junior-tab" onClick={() => setTab(key)} style={tab === key ? { borderColor: '#f59e0b', color: '#b45309' } : {}}>
            {key === 'learn' ? '看一看' : key === 'do' ? '试一试' : key === 'ai' ? '问问 AI' : '我学会了'}
          </button>
        ))}
      </div>
      <div className="junior-content">
        {tab === 'learn' && (
          <div className="junior-card">
            <h2>问 AI，要短一点</h2>
            <p>小朋友用 AI，不用写很长。只要把主题说清楚，再告诉它“请帮我想一句话”就够了。</p>
          </div>
        )}
        {tab === 'do' && (
          <div className="junior-card">
            <h2>选一个主题和一句开场白</h2>
            <div className="junior-grid-3">
              {THEMES.map((item) => (
                <button key={item} className={`junior-option-btn${theme === item ? ' active' : ''}`} onClick={() => setTheme(item)} style={theme === item ? { borderColor: '#f59e0b', color: '#b45309' } : {}}>
                  <div>{item}</div>
                </button>
              ))}
            </div>
            <div className="junior-grid-3">
              {OPENERS.map((item) => (
                <button key={item} className={`junior-option-btn${opener === item ? ' active' : ''}`} onClick={() => setOpener(item)} style={opener === item ? { borderColor: '#f59e0b', color: '#b45309' } : {}}>
                  <div>{item}</div>
                </button>
              ))}
            </div>
            <div className="junior-result">
              <div className="junior-result-title" style={{ textAlign: 'center', color: '#b45309' }}>{theme}</div>
              <div className="junior-result-copy" style={{ textAlign: 'center' }}>{opener}</div>
            </div>
          </div>
        )}
        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <div className="junior-prompt">{`我想做一个儿童网页。\n主题是：${theme}\n请帮我写一句很短很可爱的开场白。`}</div>
          </div>
        )}
        {tab === 'work' && (
          <div className="junior-card">
            <h2>今天我学会了</h2>
            <p>AI 可以帮我想点子，但我自己先要知道我想做什么。</p>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">💡🤝</div>
              <h3>点子小导演</h3>
              <p>你已经会用短短的话请 AI 帮忙啦。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
