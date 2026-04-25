import { useMemo, useState } from 'react'
import './JuniorLesson.css'

const WEATHER = [
  { id: 'sunny', label: '晴天', emoji: '☀️' },
  { id: 'rainy', label: '下雨', emoji: '🌧️' },
]

const ENERGY = [
  { id: 'high', label: '很有精神', emoji: '⚡' },
  { id: 'low', label: '想安静一点', emoji: '🫧' },
]

export default function JuniorLesson3({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [weather, setWeather] = useState('sunny')
  const [energy, setEnergy] = useState('high')

  const result = useMemo(() => {
    if (weather === 'sunny' && energy === 'high') return { emoji: '🛴', title: '去外面滑一圈', copy: '天气好，精神也好，适合动一动。' }
    if (weather === 'sunny' && energy === 'low') return { emoji: '📖', title: '找个角落看绘本', copy: '天气明亮，心情也可以慢慢来。' }
    if (weather === 'rainy' && energy === 'high') return { emoji: '🧩', title: '来一局拼图挑战', copy: '外面下雨，室内也能玩得很起劲。' }
    return { emoji: '☕', title: '抱着小毯子听故事', copy: '下雨天和安静心情最适合暖暖地待着。' }
  }, [weather, energy])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #dbeafe, #e0f2fe)' }}>
        <div className="junior-badge" style={{ background: '#bfdbfe', color: '#1d4ed8' }}>第 3 课</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">🚪</div></div>
          <div>
            <h1 className="junior-title">如果……就……</h1>
            <p className="junior-sub">选择不同，结果就会不同</p>
          </div>
        </div>
      </div>
      <div className="junior-goals">
        <div className="junior-goal">认识最简单的条件逻辑</div>
        <div className="junior-goal">看到“选择”和“结果”的关系</div>
      </div>
      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((key) => (
          <button key={key} className="junior-tab" onClick={() => setTab(key)} style={tab === key ? { borderColor: '#3b82f6', color: '#1d4ed8' } : {}}>
            {key === 'learn' ? '看一看' : key === 'do' ? '玩一玩' : key === 'ai' ? '问问 AI' : '我学会了'}
          </button>
        ))}
      </div>
      <div className="junior-content">
        {tab === 'learn' && (
          <div className="junior-card">
            <h2>什么叫“如果……就……”？</h2>
            <p>如果下雨，就带伞。 如果肚子饿，就找点吃的。很多程序也是这样想的。</p>
            <div className="junior-pill-row">
              <div className="junior-pill">如果</div>
              <div className="junior-pill">选择</div>
              <div className="junior-pill">结果</div>
            </div>
          </div>
        )}
        {tab === 'do' && (
          <div className="junior-card">
            <h2>今天你适合做什么？</h2>
            <div className="junior-grid-2">
              {WEATHER.map((item) => (
                <button key={item.id} className={`junior-option-btn${weather === item.id ? ' active' : ''}`} onClick={() => setWeather(item.id)} style={weather === item.id ? { borderColor: '#3b82f6', color: '#1d4ed8' } : {}}>
                  <div className="junior-big-emoji">{item.emoji}</div>
                  <div>{item.label}</div>
                </button>
              ))}
            </div>
            <div className="junior-grid-2">
              {ENERGY.map((item) => (
                <button key={item.id} className={`junior-option-btn${energy === item.id ? ' active' : ''}`} onClick={() => setEnergy(item.id)} style={energy === item.id ? { borderColor: '#3b82f6', color: '#1d4ed8' } : {}}>
                  <div className="junior-big-emoji">{item.emoji}</div>
                  <div>{item.label}</div>
                </button>
              ))}
            </div>
            <div className="junior-result">
              <div style={{ fontSize: 48, textAlign: 'center' }}>{result.emoji}</div>
              <div className="junior-result-title" style={{ textAlign: 'center', marginTop: 8 }}>{result.title}</div>
              <div className="junior-result-copy" style={{ textAlign: 'center' }}>{result.copy}</div>
            </div>
          </div>
        )}
        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <div className="junior-prompt">{`我想做一个“如果……就……”小游戏。\n请你帮我想 2 个选择，\n再给出 4 个不同结果。\n要像给小朋友玩的。`}</div>
          </div>
        )}
        {tab === 'work' && (
          <div className="junior-card">
            <h2>今天我学会了</h2>
            <p>选项变了，结果也会变。原来小游戏也可以这样做出来。</p>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">🚪✨</div>
              <h3>条件小侦探</h3>
              <p>你已经会看懂最简单的判断逻辑啦。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
