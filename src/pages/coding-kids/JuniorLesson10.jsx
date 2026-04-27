import { useMemo, useState } from 'react'
import './JuniorLesson.css'

const SCENES = [
  { id: 'morning', label: '早晨', emoji: '🌤️', copy: '主角从床上跳起来，准备出发。', color: '#f59e0b' },
  { id: 'night', label: '夜晚', emoji: '🌙', copy: '一天结束了，故事也慢慢安静下来。', color: '#6366f1' },
  { id: 'festival', label: '庆典', emoji: '🎆', copy: '最后来到热闹的大舞台，故事变得超闪亮。', color: '#ec4899' },
]

const HEROES = ['🐼', '🦄', '🐧']

export default function JuniorLesson10({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [hero, setHero] = useState(HEROES[0])
  const [sceneA, setSceneA] = useState(SCENES[0])
  const [sceneB, setSceneB] = useState(SCENES[1])
  const [ending, setEnding] = useState(SCENES[2])

  const storyTitle = useMemo(() => `${hero} 的三幕故事`, [hero])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #ede9fe, #fce7f3)' }}>
        <div className="junior-badge" style={{ background: '#ddd6fe', color: '#6d28d9' }}>第 10 课 · 升级舱</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">🎭</div></div>
          <div>
            <h1 className="junior-title">双场景故事页</h1>
            <p className="junior-sub">这次把故事真的排出来：开头、中间、结尾，要像一个完整作品</p>
          </div>
        </div>
      </div>

      <div className="junior-goals">
        <div className="junior-goal">把页面做成分场景故事卡</div>
        <div className="junior-goal">让故事有开头、中间、结尾</div>
      </div>

      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((key) => (
          <button key={key} className="junior-tab" onClick={() => setTab(key)} style={tab === key ? { borderColor: '#8b5cf6', color: '#6d28d9' } : {}}>
            {key === 'learn' ? '看任务' : key === 'do' ? '排故事' : key === 'ai' ? '问问 AI' : '完成检查'}
          </button>
        ))}
      </div>

      <div className="junior-content">
        {tab === 'learn' && (
          <>
            <div className="junior-card">
              <div className="junior-kicker">STORY PLAN</div>
              <h2>今天比前面多一步</h2>
              <p>前面你已经会做两个场景，这次我们把故事真正排成 3 部分：开头、中间、结尾。这样作品看起来就更像完整页面。</p>
              <div className="junior-checklist">
                {['选主角', '选开头场景', '选中间场景', '再加一个结尾场景'].map((item) => (
                  <div key={item} className="junior-check-item">
                    <span className="junior-check-mark">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="junior-card">
              <h2>为什么要多一个结尾？</h2>
              <p>因为有结尾，页面就不会像两张卡随便摆在一起。它会变成一条真正会往前走的故事线。</p>
            </div>
          </>
        )}

        {tab === 'do' && (
          <>
            <div className="junior-card">
              <div className="junior-kicker">BUILD 1.0</div>
              <h2>先选主角和前两幕</h2>
              <div className="sticker-row">
                {HEROES.map((item) => (
                  <button key={item} className={`sticker${hero === item ? ' active' : ''}`} onClick={() => setHero(item)}>
                    {item}
                  </button>
                ))}
              </div>
              <div className="junior-grid-3">
                {SCENES.map((item) => (
                  <button key={`a-${item.id}`} className={`junior-option-btn${sceneA.id === item.id ? ' active' : ''}`} onClick={() => setSceneA(item)} style={sceneA.id === item.id ? { borderColor: item.color, color: item.color } : {}}>
                    <div className="junior-big-emoji">{item.emoji}</div>
                    <div>开头：{item.label}</div>
                  </button>
                ))}
              </div>
              <div className="junior-grid-3">
                {SCENES.map((item) => (
                  <button key={`b-${item.id}`} className={`junior-option-btn${sceneB.id === item.id ? ' active' : ''}`} onClick={() => setSceneB(item)} style={sceneB.id === item.id ? { borderColor: item.color, color: item.color } : {}}>
                    <div className="junior-big-emoji">{item.emoji}</div>
                    <div>中间：{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="junior-card">
              <div className="junior-kicker">BUILD 2.0</div>
              <h2>再给故事加一个结尾</h2>
              <div className="junior-grid-3">
                {SCENES.map((item) => (
                  <button key={`c-${item.id}`} className={`junior-option-btn${ending.id === item.id ? ' active' : ''}`} onClick={() => setEnding(item)} style={ending.id === item.id ? { borderColor: item.color, color: item.color } : {}}>
                    <div className="junior-big-emoji">{item.emoji}</div>
                    <div>结尾：{item.label}</div>
                  </button>
                ))}
              </div>

              <div className="story-preview" style={{ borderColor: '#c4b5fd' }}>
                <div className="story-top" style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}>{storyTitle}</div>
                <div className="story-body">
                  {[sceneA, sceneB, ending].map((scene, index) => (
                    <div key={`${scene.id}-${index}`} className="junior-stage" style={{ background: scene.color + '15', marginTop: index === 0 ? 0 : 12 }}>
                      <div style={{ fontSize: 40 }}>{scene.emoji} {hero}</div>
                      <div style={{ fontWeight: 900, color: scene.color, marginTop: 6 }}>
                        {index === 0 ? '开头' : index === 1 ? '中间' : '结尾'}：{scene.label}
                      </div>
                      <div style={{ color: '#64748b', marginTop: 6 }}>{scene.copy}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <div className="junior-prompt">{`我想做一个儿童故事页。\n主角是 ${hero}。\n开头是 ${sceneA.label}，中间是 ${sceneB.label}，结尾是 ${ending.label}。\n请帮我每一幕写一句很短的话，\n让它像一个完整故事。`}</div>
          </div>
        )}

        {tab === 'work' && (
          <div className="junior-card">
            <h2>完成检查</h2>
            <div className="junior-checklist">
              {[
                { done: true, label: '我选出了一个主角' },
                { done: true, label: '我做出了开头和中间场景' },
                { done: true, label: '我给故事加上了结尾' },
                { done: true, label: '我把页面排成了更完整的故事线' },
              ].map((item) => (
                <div key={item.label} className={`junior-check-item${item.done ? ' done' : ''}`}>
                  <span className="junior-check-mark">✓</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">🎭📖</div>
              <h3>三幕故事编排师</h3>
              <p>你已经会把一个页面排成真正有开头、中间、结尾的小故事了。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
