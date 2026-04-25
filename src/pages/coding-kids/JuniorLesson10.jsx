import { useState } from 'react'
import './JuniorLesson.css'

const SCENES = [
  { id: 'morning', label: '早晨', emoji: '🌤️', copy: '主角从床上跳起来，准备出发。', color: '#f59e0b' },
  { id: 'night', label: '夜晚', emoji: '🌙', copy: '一天结束了，故事也慢慢安静下来。', color: '#6366f1' },
]

const HEROES = ['🐼', '🦄', '🐧']

export default function JuniorLesson10({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [hero, setHero] = useState(HEROES[0])
  const [sceneA, setSceneA] = useState(SCENES[0])
  const [sceneB, setSceneB] = useState(SCENES[1])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #ede9fe, #fce7f3)' }}>
        <div className="junior-badge" style={{ background: '#ddd6fe', color: '#6d28d9' }}>第 10 课</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">🎭</div></div>
          <div>
            <h1 className="junior-title">双场景故事页</h1>
            <p className="junior-sub">一个故事，可以分成两块来讲</p>
          </div>
        </div>
      </div>
      <div className="junior-goals">
        <div className="junior-goal">把页面分成两个场景</div>
        <div className="junior-goal">让故事更完整</div>
      </div>
      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((key) => (
          <button key={key} className="junior-tab" onClick={() => setTab(key)} style={tab === key ? { borderColor: '#8b5cf6', color: '#6d28d9' } : {}}>
            {key === 'learn' ? '看一看' : key === 'do' ? '玩一玩' : key === 'ai' ? '问问 AI' : '我学会了'}
          </button>
        ))}
      </div>
      <div className="junior-content">
        {tab === 'learn' && (
          <div className="junior-card">
            <h2>为什么要分场景？</h2>
            <p>因为故事有开始，也有后面。把页面分成两块，就更像“先发生什么，再发生什么”。</p>
          </div>
        )}
        {tab === 'do' && (
          <div className="junior-card">
            <h2>做你的双场景故事</h2>
            <div className="sticker-row">
              {HEROES.map((item) => (
                <button key={item} className={`sticker${hero === item ? ' active' : ''}`} onClick={() => setHero(item)}>
                  {item}
                </button>
              ))}
            </div>
            <div className="junior-grid-2">
              {SCENES.map((item) => (
                <button key={item.id} className={`junior-option-btn${sceneA.id === item.id ? ' active' : ''}`} onClick={() => setSceneA(item)} style={sceneA.id === item.id ? { borderColor: item.color, color: item.color } : {}}>
                  <div className="junior-big-emoji">{item.emoji}</div>
                  <div>场景 1：{item.label}</div>
                </button>
              ))}
            </div>
            <div className="junior-grid-2">
              {SCENES.map((item) => (
                <button key={item.id} className={`junior-option-btn${sceneB.id === item.id ? ' active' : ''}`} onClick={() => setSceneB(item)} style={sceneB.id === item.id ? { borderColor: item.color, color: item.color } : {}}>
                  <div className="junior-big-emoji">{item.emoji}</div>
                  <div>场景 2：{item.label}</div>
                </button>
              ))}
            </div>
            <div className="story-preview" style={{ borderColor: '#c4b5fd' }}>
              <div className="story-top" style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}>我的双场景故事</div>
              <div className="story-body">
                <div className="junior-stage" style={{ background: sceneA.color + '15' }}>
                  <div style={{ fontSize: 40 }}>{sceneA.emoji} {hero}</div>
                  <div style={{ fontWeight: 900, color: sceneA.color, marginTop: 6 }}>{sceneA.label}</div>
                  <div style={{ color: '#64748b', marginTop: 6 }}>{sceneA.copy}</div>
                </div>
                <div className="junior-stage" style={{ background: sceneB.color + '15', marginTop: 12 }}>
                  <div style={{ fontSize: 40 }}>{sceneB.emoji} {hero}</div>
                  <div style={{ fontWeight: 900, color: sceneB.color, marginTop: 6 }}>{sceneB.label}</div>
                  <div style={{ color: '#64748b', marginTop: 6 }}>{sceneB.copy}</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <div className="junior-prompt">{`我想做一个两块内容的儿童故事页。\n主角是 ${hero}。\n第一场景是 ${sceneA.label}，第二场景是 ${sceneB.label}。\n请帮我每个场景写一句很短的话。`}</div>
          </div>
        )}
        {tab === 'work' && (
          <div className="junior-card">
            <h2>今天我学会了</h2>
            <p>原来一个页面也能像故事书一样，分两页来讲。</p>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">🎭📖</div>
              <h3>场景编排师</h3>
              <p>你已经会做更完整的故事页面啦。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
