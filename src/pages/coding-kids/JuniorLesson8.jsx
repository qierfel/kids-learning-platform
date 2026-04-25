import { useState } from 'react'
import './JuniorLesson.css'

const MOODS = [
  { id: 'happy', label: '开心', emoji: '😄', color: '#f59e0b', text: '今天像太阳一样亮晶晶。' },
  { id: 'cool', label: '冷静', emoji: '😌', color: '#0ea5e9', text: '慢慢来，也很棒。' },
  { id: 'wow', label: '惊喜', emoji: '🤩', color: '#8b5cf6', text: '哇，今天想做点新东西！' },
]

export default function JuniorLesson8({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [mood, setMood] = useState(MOODS[0])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #ffe4e6, #fde68a)' }}>
        <div className="junior-badge" style={{ background: '#fecdd3', color: '#be123c' }}>第 8 课</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">😊</div></div>
          <div>
            <h1 className="junior-title">表情切换机</h1>
            <p className="junior-sub">一个页面，也可以有不同心情</p>
          </div>
        </div>
      </div>
      <div className="junior-goals">
        <div className="junior-goal">让页面出现不同表情</div>
        <div className="junior-goal">感受“状态切换”</div>
      </div>
      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((key) => (
          <button key={key} className="junior-tab" onClick={() => setTab(key)} style={tab === key ? { borderColor: '#fb7185', color: '#be123c' } : {}}>
            {key === 'learn' ? '看一看' : key === 'do' ? '玩一玩' : key === 'ai' ? '问问 AI' : '我学会了'}
          </button>
        ))}
      </div>
      <div className="junior-content">
        {tab === 'learn' && (
          <div className="junior-card">
            <h2>什么叫“切换”？</h2>
            <p>现在是一个样子，点一下变成另一个样子，这就叫切换。网页里很多小效果，都是这样来的。</p>
          </div>
        )}
        {tab === 'do' && (
          <div className="junior-card">
            <h2>今天你的页面是什么心情？</h2>
            <div className="junior-grid-3">
              {MOODS.map((item) => (
                <button key={item.id} className={`junior-option-btn${mood.id === item.id ? ' active' : ''}`} onClick={() => setMood(item)} style={mood.id === item.id ? { borderColor: item.color, color: item.color } : {}}>
                  <div className="junior-big-emoji">{item.emoji}</div>
                  <div>{item.label}</div>
                </button>
              ))}
            </div>
            <div className="junior-result" style={{ borderColor: `${mood.color}55` }}>
              <div style={{ fontSize: 68, textAlign: 'center' }}>{mood.emoji}</div>
              <div className="junior-result-title" style={{ textAlign: 'center', color: mood.color, marginTop: 6 }}>{mood.label}页面</div>
              <div className="junior-result-copy" style={{ textAlign: 'center' }}>{mood.text}</div>
            </div>
          </div>
        )}
        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <div className="junior-prompt">{`我想做一个会切换表情的小页面。\n现在有开心、冷静、惊喜 3 种心情。\n请你帮我每种心情写一句很短的话。`}</div>
          </div>
        )}
        {tab === 'work' && (
          <div className="junior-card">
            <h2>今天我学会了</h2>
            <p>原来一个页面不一定只有一个样子。它也可以随着选择切换心情。</p>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">😊🔄</div>
              <h3>状态切换员</h3>
              <p>你已经会做会换表情的小页面啦。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
