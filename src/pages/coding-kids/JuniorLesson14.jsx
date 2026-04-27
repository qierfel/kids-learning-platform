import { useMemo, useState } from 'react'
import './JuniorLesson.css'

const PLACES = [
  { id: 'lab', label: '我的实验室', emoji: '🧪' },
  { id: 'planet', label: '我的星球站', emoji: '🪐' },
  { id: 'garden', label: '我的快乐花园', emoji: '🌷' },
]

const TONES = [
  { id: 'warm', label: '温暖', line: '欢迎来到这里，今天一起慢慢变厉害。', color: '#f472b6' },
  { id: 'cool', label: '酷酷的', line: '欢迎进入创作模式，今天我们要做点厉害的。', color: '#22d3ee' },
  { id: 'magic', label: '魔法感', line: '欢迎进入闪闪发光的创作入口，冒险开始啦。', color: '#a78bfa' },
]

export default function JuniorLesson14({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [name, setName] = useState('')
  const [place, setPlace] = useState(PLACES[0])
  const [tone, setTone] = useState(TONES[0])

  const welcomeTitle = useMemo(() => {
    if (!name.trim()) return `${place.emoji} ${place.label}`
    return `${place.emoji} 欢迎你，${name}`
  }, [name, place])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #fce7f3, #ffe4e6)' }}>
        <div className="junior-badge" style={{ background: '#fbcfe8', color: '#9d174d' }}>第 14 课 · 工具舱</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">💌</div></div>
          <div>
            <h1 className="junior-title">欢迎语生成器</h1>
            <p className="junior-sub">这次不只是显示文字，而是做出一台真的会生成欢迎语的小机器</p>
          </div>
        </div>
      </div>

      <div className="junior-goals">
        <div className="junior-goal">把输入变成一段完整欢迎语</div>
        <div className="junior-goal">学会用地点和语气让结果不一样</div>
      </div>

      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((k) => (
          <button key={k} className="junior-tab" onClick={() => setTab(k)} style={tab === k ? { borderColor: '#f472b6', color: '#be185d' } : {}}>
            {k === 'learn' ? '看一看' : k === 'do' ? '生成器' : k === 'ai' ? '问问 AI' : '完成啦'}
          </button>
        ))}
      </div>

      <div className="junior-content">
        {tab === 'learn' && (
          <>
            <div className="junior-card">
              <div className="junior-kicker">GENERATOR IDEA</div>
              <h2>什么叫“生成器”？</h2>
              <p>不是只把一句固定的话摆出来，而是你换了名字、地点、语气，页面就会帮你拼出新的欢迎结果。</p>
              <div className="junior-mini-grid">
                <div className="junior-mini-panel">
                  <div className="junior-mini-title">输入材料</div>
                  <div className="junior-mini-copy">名字、地点、语气。</div>
                </div>
                <div className="junior-mini-panel">
                  <div className="junior-mini-title">输出结果</div>
                  <div className="junior-mini-copy">一张像真的欢迎卡片的页面。</div>
                </div>
              </div>
            </div>
            <div className="junior-card">
              <h2>今天要比上一课更难一点</h2>
              <p>上一课只是“页面读到了输入”。这一课要做到：输入之后，页面帮你真正生成一段像样的话。</p>
            </div>
          </>
        )}

        {tab === 'do' && (
          <>
            <div className="junior-card">
              <div className="junior-kicker">STEP 1</div>
              <h2>先输入名字，再选地点</h2>
              <input className="junior-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="写一个来访者名字" maxLength={10} />
              <div className="junior-grid-3">
                {PLACES.map((item) => (
                  <button
                    key={item.id}
                    className={`junior-option-btn${place.id === item.id ? ' active' : ''}`}
                    onClick={() => setPlace(item)}
                    style={place.id === item.id ? { borderColor: '#f472b6', color: '#be185d' } : {}}
                  >
                    <div className="junior-big-emoji">{item.emoji}</div>
                    <div>{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="junior-card">
              <div className="junior-kicker">STEP 2</div>
              <h2>再选一句语气</h2>
              <div className="junior-grid-3">
                {TONES.map((item) => (
                  <button
                    key={item.id}
                    className={`junior-option-btn${tone.id === item.id ? ' active' : ''}`}
                    onClick={() => setTone(item)}
                    style={tone.id === item.id ? { borderColor: item.color, color: item.color } : {}}
                  >
                    <div className="junior-big-emoji">✨</div>
                    <div>{item.label}</div>
                  </button>
                ))}
              </div>

              <div className="project-preview" style={{ borderColor: tone.color }}>
                <div className="project-top" style={{ background: tone.color }}>
                  {welcomeTitle}
                </div>
                <div className="project-body">
                  <div style={{ fontSize: 44, textAlign: 'center' }}>{place.emoji}</div>
                  <div style={{ textAlign: 'center', fontSize: 20, fontWeight: 900, color: tone.color }}>
                    {name.trim() ? `${name}，欢迎来到 ${place.label}` : `欢迎来到 ${place.label}`}
                  </div>
                  <div style={{ textAlign: 'center', fontSize: 14, color: '#64748b', marginTop: 8 }}>
                    {tone.line}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <p>这次可以让 AI 帮你继续升级生成器，而不是只想一句欢迎话。</p>
            <div className="junior-prompt">{`我做了一个欢迎语生成器。\n它会用名字、地点、语气来生成欢迎卡片。\n请你帮我再想 3 种新的语气，\n每种都要适合 7-10 岁小朋友。`}</div>
          </div>
        )}

        {tab === 'work' && (
          <div className="junior-card">
            <h2>今天留下的作品</h2>
            <p>这已经不是一张静态卡片，而是一台小生成器。你一改输入，它的欢迎结果就会跟着变。</p>
            <div className="junior-checklist">
              {[
                { done: !!name.trim(), label: '我让生成器读到了名字' },
                { done: !!place.id, label: '我让生成器知道要欢迎到哪里' },
                { done: !!tone.id, label: '我让生成器换了不同语气' },
              ].map((item) => (
                <div key={item.label} className={`junior-check-item${item.done ? ' done' : ''}`}>
                  <span className="junior-check-mark">{item.done ? '✓' : '•'}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">💌⚙️</div>
              <h3>欢迎语生成师</h3>
              <p>你已经会让页面根据不同输入，生成真正不一样的结果了。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
