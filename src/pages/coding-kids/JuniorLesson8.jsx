import { useMemo, useState } from 'react'
import './JuniorLesson.css'

const MOODS = [
  { id: 'happy', label: '开心', emoji: '😄', color: '#f59e0b', text: '今天像太阳一样亮晶晶。' },
  { id: 'cool', label: '冷静', emoji: '😌', color: '#0ea5e9', text: '慢慢来，也很棒。' },
  { id: 'wow', label: '惊喜', emoji: '🤩', color: '#8b5cf6', text: '哇，今天想做点新东西！' },
]

const SCENES = [
  { id: 'sky', label: '天空房间', emoji: '☁️' },
  { id: 'sea', label: '海浪舞台', emoji: '🌊' },
  { id: 'space', label: '宇宙基地', emoji: '🪐' },
]

export default function JuniorLesson8({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [mood, setMood] = useState(MOODS[0])
  const [scene, setScene] = useState(SCENES[0])
  const [sparkles, setSparkles] = useState(0)

  const title = useMemo(() => `${scene.label} · ${mood.label}页面`, [scene.label, mood.label])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #ffe4e6, #fde68a)' }}>
        <div className="junior-badge" style={{ background: '#fecdd3', color: '#be123c' }}>第 8 课 · 升级舱</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">😊</div></div>
          <div>
            <h1 className="junior-title">表情切换机</h1>
            <p className="junior-sub">这次不只换表情，还要把场景、气氛和结果一起切换</p>
          </div>
        </div>
      </div>

      <div className="junior-goals">
        <div className="junior-goal">让页面同时切换表情和场景</div>
        <div className="junior-goal">做出一张真的有气氛的情绪页面</div>
      </div>

      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((key) => (
          <button key={key} className="junior-tab" onClick={() => setTab(key)} style={tab === key ? { borderColor: '#fb7185', color: '#be123c' } : {}}>
            {key === 'learn' ? '看任务' : key === 'do' ? '做切换机' : key === 'ai' ? '问问 AI' : '完成检查'}
          </button>
        ))}
      </div>

      <div className="junior-content">
        {tab === 'learn' && (
          <>
            <div className="junior-card">
              <div className="junior-kicker">SWITCH PLAN</div>
              <h2>今天不只切换 1 个东西</h2>
              <p>真正有趣的页面，点一下以后会一起变很多地方。今天你要让页面同时切换：表情、场景、句子。</p>
              <div className="junior-mini-grid">
                <div className="junior-mini-panel">
                  <div className="junior-mini-title">第一层</div>
                  <div className="junior-mini-copy">角色表情要变。</div>
                </div>
                <div className="junior-mini-panel">
                  <div className="junior-mini-title">第二层</div>
                  <div className="junior-mini-copy">整个场景也要跟着变。</div>
                </div>
              </div>
            </div>
            <div className="junior-card">
              <h2>挑战版目标</h2>
              <div className="junior-checklist">
                {['选 1 种心情', '选 1 个场景', '点亮页面特效', '最后做成一张能展示的结果卡'].map((item) => (
                  <div key={item} className="junior-check-item">
                    <span className="junior-check-mark">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'do' && (
          <>
            <div className="junior-card">
              <div className="junior-kicker">BUILD 1.0</div>
              <h2>先选今天的心情</h2>
              <div className="junior-grid-3">
                {MOODS.map((item) => (
                  <button key={item.id} className={`junior-option-btn${mood.id === item.id ? ' active' : ''}`} onClick={() => setMood(item)} style={mood.id === item.id ? { borderColor: item.color, color: item.color } : {}}>
                    <div className="junior-big-emoji">{item.emoji}</div>
                    <div>{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="junior-card">
              <div className="junior-kicker">BUILD 2.0</div>
              <h2>再给它配一个场景</h2>
              <div className="junior-grid-3">
                {SCENES.map((item) => (
                  <button key={item.id} className={`junior-option-btn${scene.id === item.id ? ' active' : ''}`} onClick={() => setScene(item)} style={scene.id === item.id ? { borderColor: mood.color, color: mood.color } : {}}>
                    <div className="junior-big-emoji">{item.emoji}</div>
                    <div>{item.label}</div>
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', placeItems: 'center', marginTop: 16 }}>
                <button
                  className="junior-action-btn"
                  style={{ maxWidth: 220, background: mood.color }}
                  onClick={() => setSparkles((prev) => prev + 1)}
                >
                  ✨ 点亮气氛
                </button>
              </div>

              <div className="junior-result" style={{ borderColor: `${mood.color}55` }}>
                <div style={{ fontSize: 68, textAlign: 'center' }}>{mood.emoji}</div>
                <div className="junior-result-title" style={{ textAlign: 'center', color: mood.color, marginTop: 6 }}>{title}</div>
                <div className="junior-result-copy" style={{ textAlign: 'center' }}>{mood.text}</div>
                <div className="junior-stage" style={{ marginTop: 14 }}>
                  <div style={{ fontWeight: 900, color: '#f8fafc' }}>{scene.emoji} {scene.label}</div>
                  <div style={{ marginTop: 6, color: '#cbd5e1', lineHeight: 1.7 }}>
                    你已经点亮了 {sparkles} 次气氛特效。现在这张页面不只是有表情，还多了场景和展示感。
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <div className="junior-prompt">{`我在做一个会切换表情和场景的小页面。\n现在的心情是：${mood.label}。\n现在的场景是：${scene.label}。\n请帮我写 2 句很短的话：\n1. 页面打开时的欢迎语\n2. 点亮气氛后的升级句子`}</div>
          </div>
        )}

        {tab === 'work' && (
          <div className="junior-card">
            <h2>完成检查</h2>
            <div className="junior-checklist">
              {[
                { done: true, label: '我让页面切换了表情' },
                { done: true, label: '我给页面配了一个场景' },
                { done: sparkles > 0, label: '我做出了额外的气氛效果' },
                { done: sparkles >= 2, label: '我把它变成了更完整的结果页' },
              ].map((item) => (
                <div key={item.label} className={`junior-check-item${item.done ? ' done' : ''}`}>
                  <span className="junior-check-mark">{item.done ? '✓' : '•'}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">😊🎭</div>
              <h3>情绪场景设计师</h3>
              <p>你已经会让一个页面同时换心情、换场景、换气氛了。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
