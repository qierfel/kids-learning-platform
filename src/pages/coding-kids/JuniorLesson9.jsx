import { useMemo, useState } from 'react'
import './JuniorLesson.css'

const STEP_ONE = [
  { id: 'forest', label: '去森林', emoji: '🌳' },
  { id: 'sea', label: '去海边', emoji: '🌊' },
]

const STEP_TWO = {
  forest: [
    { id: 'fox', label: '跟狐狸走', emoji: '🦊' },
    { id: 'owl', label: '跟猫头鹰走', emoji: '🦉' },
  ],
  sea: [
    { id: 'fish', label: '跟小鱼走', emoji: '🐟' },
    { id: 'shell', label: '捡贝壳走', emoji: '🐚' },
  ],
}

export default function JuniorLesson9({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [first, setFirst] = useState('forest')
  const [second, setSecond] = useState('fox')

  const result = useMemo(() => {
    const map = {
      fox: { emoji: '🍄', title: '找到秘密蘑菇屋', copy: '你沿着森林小路，发现了藏起来的宝藏。' },
      owl: { emoji: '🌙', title: '来到月光树顶', copy: '你爬到了高高的树上，看见夜空发光。' },
      fish: { emoji: '🐠', title: '潜进彩虹珊瑚区', copy: '海水下面藏着会发亮的小世界。' },
      shell: { emoji: '💎', title: '捡到闪亮贝壳盒', copy: '沙滩边藏着今天的小惊喜。' },
    }
    return map[second]
  }, [second])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #ccfbf1, #dbeafe)' }}>
        <div className="junior-badge" style={{ background: '#99f6e4', color: '#115e59' }}>第 9 课</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">🧭</div></div>
          <div>
            <h1 className="junior-title">分叉小迷宫</h1>
            <p className="junior-sub">两步选择，会走到不同地方</p>
          </div>
        </div>
      </div>
      <div className="junior-goals">
        <div className="junior-goal">继续练习选择和分支</div>
        <div className="junior-goal">做出两步结果页面</div>
      </div>
      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((key) => (
          <button key={key} className="junior-tab" onClick={() => setTab(key)} style={tab === key ? { borderColor: '#14b8a6', color: '#0f766e' } : {}}>
            {key === 'learn' ? '看一看' : key === 'do' ? '玩一玩' : key === 'ai' ? '问问 AI' : '我学会了'}
          </button>
        ))}
      </div>
      <div className="junior-content">
        {tab === 'learn' && (
          <div className="junior-card">
            <h2>分叉像什么？</h2>
            <p>像走路遇到岔口。先选左边还是右边，再继续选，最后就会到不一样的地方。</p>
          </div>
        )}
        {tab === 'do' && (
          <div className="junior-card">
            <h2>选你的迷宫路线</h2>
            <div className="junior-grid-2">
              {STEP_ONE.map((item) => (
                <button key={item.id} className={`junior-option-btn${first === item.id ? ' active' : ''}`} onClick={() => { setFirst(item.id); setSecond(STEP_TWO[item.id][0].id) }} style={first === item.id ? { borderColor: '#14b8a6', color: '#0f766e' } : {}}>
                  <div className="junior-big-emoji">{item.emoji}</div>
                  <div>{item.label}</div>
                </button>
              ))}
            </div>
            <div className="junior-grid-2">
              {STEP_TWO[first].map((item) => (
                <button key={item.id} className={`junior-option-btn${second === item.id ? ' active' : ''}`} onClick={() => setSecond(item.id)} style={second === item.id ? { borderColor: '#14b8a6', color: '#0f766e' } : {}}>
                  <div className="junior-big-emoji">{item.emoji}</div>
                  <div>{item.label}</div>
                </button>
              ))}
            </div>
            <div className="junior-result">
              <div style={{ fontSize: 60, textAlign: 'center' }}>{result.emoji}</div>
              <div className="junior-result-title" style={{ textAlign: 'center', color: '#0f766e', marginTop: 8 }}>{result.title}</div>
              <div className="junior-result-copy" style={{ textAlign: 'center' }}>{result.copy}</div>
            </div>
          </div>
        )}
        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <div className="junior-prompt">{`我想做一个两步选择小游戏。\n第一步选地点，第二步选路线。\n请你帮我再想 4 个不同结果。`}</div>
          </div>
        )}
        {tab === 'work' && (
          <div className="junior-card">
            <h2>今天我学会了</h2>
            <p>原来多一步选择，页面就会更像真正的小游戏。</p>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">🧭🌟</div>
              <h3>分支路线师</h3>
              <p>你已经会做两步小迷宫啦。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
