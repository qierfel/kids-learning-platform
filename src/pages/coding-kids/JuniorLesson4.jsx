import { useState } from 'react'
import './JuniorLesson.css'

const CHARACTERS = ['🦊', '🐱', '🐼']
const PLACES = ['森林', '海边', '太空站']
const ACTIONS = ['找宝物', '交朋友', '开派对']

export default function JuniorLesson4({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [hero, setHero] = useState(CHARACTERS[0])
  const [place, setPlace] = useState(PLACES[0])
  const [action, setAction] = useState(ACTIONS[0])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #f3e8ff, #ffe4e6)' }}>
        <div className="junior-badge" style={{ background: '#e9d5ff', color: '#7e22ce' }}>第 4 课</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">📚</div></div>
          <div>
            <h1 className="junior-title">故事页面工厂</h1>
            <p className="junior-sub">把角色、地点、动作拼成一页故事</p>
          </div>
        </div>
      </div>
      <div className="junior-goals">
        <div className="junior-goal">学会把页面分成几块内容</div>
        <div className="junior-goal">做一页会讲故事的小页面</div>
      </div>
      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((key) => (
          <button key={key} className="junior-tab" onClick={() => setTab(key)} style={tab === key ? { borderColor: '#a855f7', color: '#7e22ce' } : {}}>
            {key === 'learn' ? '看一看' : key === 'do' ? '玩一玩' : key === 'ai' ? '问问 AI' : '我学会了'}
          </button>
        ))}
      </div>
      <div className="junior-content">
        {tab === 'learn' && (
          <div className="junior-card">
            <h2>一页故事通常有 3 样</h2>
            <div className="junior-pill-row">
              <div className="junior-pill">主角</div>
              <div className="junior-pill">地点</div>
              <div className="junior-pill">事情</div>
            </div>
            <p style={{ marginTop: 12 }}>把这三样排在页面上，就已经像一个真正的小故事了。</p>
          </div>
        )}
        {tab === 'do' && (
          <div className="junior-card">
            <h2>拼你的故事</h2>
            <div className="junior-grid-3">
              {CHARACTERS.map((item) => (
                <button key={item} className={`junior-option-btn${hero === item ? ' active' : ''}`} onClick={() => setHero(item)} style={hero === item ? { borderColor: '#a855f7', color: '#7e22ce' } : {}}>
                  <div className="junior-big-emoji">{item}</div>
                  <div>主角</div>
                </button>
              ))}
            </div>
            <div className="junior-grid-3">
              {PLACES.map((item) => (
                <button key={item} className={`junior-option-btn${place === item ? ' active' : ''}`} onClick={() => setPlace(item)} style={place === item ? { borderColor: '#a855f7', color: '#7e22ce' } : {}}>
                  <div>{item}</div>
                </button>
              ))}
            </div>
            <div className="junior-grid-3">
              {ACTIONS.map((item) => (
                <button key={item} className={`junior-option-btn${action === item ? ' active' : ''}`} onClick={() => setAction(item)} style={action === item ? { borderColor: '#a855f7', color: '#7e22ce' } : {}}>
                  <div>{item}</div>
                </button>
              ))}
            </div>
            <div className="story-preview" style={{ borderColor: '#c084fc' }}>
              <div className="story-top" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
                我的故事页面
              </div>
              <div className="story-body">
                <div style={{ textAlign: 'center', fontSize: 62 }}>{hero}</div>
                <div style={{ fontSize: 22, fontWeight: 900, textAlign: 'center', color: '#4c1d95' }}>
                  {hero} 在 {place}
                </div>
                <div style={{ marginTop: 10, textAlign: 'center', color: '#64748b', fontSize: 15 }}>
                  今天它要去 {action}
                </div>
              </div>
            </div>
          </div>
        )}
        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <div className="junior-prompt">{`我想做一页儿童故事网页。\n主角是 ${hero}。\n地点在 ${place}。\n它要去 ${action}。\n请帮我想一句短短的开场白。`}</div>
          </div>
        )}
        {tab === 'work' && (
          <div className="junior-card">
            <h2>今天我学会了</h2>
            <p>页面不只是按钮和字，它也可以讲故事。主角、地点、动作一拼，故事就出现了。</p>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">📚🪄</div>
              <h3>故事拼装师</h3>
              <p>你已经会做一页自己的故事小站啦。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
