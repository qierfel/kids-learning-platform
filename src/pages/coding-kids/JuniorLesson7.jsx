import { useMemo, useState } from 'react'
import './JuniorLesson.css'

const STATES = [
  { id: 'sleep', label: '睡觉模式', emoji: '😴', color: '#64748b', copy: '现在基地会安静下来，星灯也会慢慢变暗。', action: '轻轻关灯' },
  { id: 'party', label: '派对模式', emoji: '🥳', color: '#f97316', copy: '彩灯亮起来了，机器人准备开一场迷你派对。', action: '点亮彩灯' },
  { id: 'rocket', label: '发射模式', emoji: '🚀', color: '#2563eb', copy: '倒数开始，控制台已经准备升空。', action: '启动发射' },
]

const BOOSTS = [
  { id: 'light', label: '光圈', emoji: '💡' },
  { id: 'voice', label: '语音', emoji: '🔊' },
  { id: 'badge', label: '徽章', emoji: '🏅' },
]

export default function JuniorLesson7({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [stateIdx, setStateIdx] = useState(0)
  const [boost, setBoost] = useState(BOOSTS[0])
  const [pressCount, setPressCount] = useState(0)

  const current = STATES[stateIdx]
  const progress = Math.min(100, 34 + pressCount * 16)
  const launchLevel = pressCount === 0 ? '待机中' : pressCount < 3 ? '已启动' : '升级版控制台'

  const resultTitle = useMemo(() => {
    if (pressCount === 0) return `${current.label}控制台`
    return `${current.label}控制台 ${pressCount}.0`
  }, [current.label, pressCount])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #cffafe, #dbeafe)' }}>
        <div className="junior-badge" style={{ background: '#bae6fd', color: '#0c4a6e' }}>第 7 课 · 升级舱</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">🪄</div></div>
          <div>
            <h1 className="junior-title">按钮变变变</h1>
            <p className="junior-sub">这次不是只点一下，而是做一个真的会切换、会升级的小控制台</p>
          </div>
        </div>
      </div>

      <div className="junior-goals">
        <div className="junior-goal">让按钮控制 3 种不同状态</div>
        <div className="junior-goal">再给控制台装一个升级功能</div>
      </div>

      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((key) => (
          <button key={key} className="junior-tab" onClick={() => setTab(key)} style={tab === key ? { borderColor: '#06b6d4', color: '#0f766e' } : {}}>
            {key === 'learn' ? '看任务' : key === 'do' ? '做控制台' : key === 'ai' ? '问问 AI' : '完成检查'}
          </button>
        ))}
      </div>

      <div className="junior-content">
        {tab === 'learn' && (
          <>
            <div className="junior-card">
              <div className="junior-kicker">MISSION MAP</div>
              <h2>今天你要做两步升级</h2>
              <div className="junior-checklist">
                {['先做 3 种按钮状态', '再给页面装一个升级功能', '最后做出会展示结果的控制台'].map((item) => (
                  <div key={item} className="junior-check-item">
                    <span className="junior-check-mark">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="junior-card">
              <h2>按钮不是只会换颜色</h2>
              <p>真正好玩的按钮，一按会换状态，再按还能继续升级。今天你做的就是一个能切状态、会显示等级、还能加功能的小控制台。</p>
              <div className="junior-mini-grid">
                <div className="junior-mini-panel">
                  <div className="junior-mini-title">第一步</div>
                  <div className="junior-mini-copy">做出睡觉、派对、发射 3 种状态。</div>
                </div>
                <div className="junior-mini-panel">
                  <div className="junior-mini-title">第二步</div>
                  <div className="junior-mini-copy">给控制台再装一个光圈、语音或徽章功能。</div>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'do' && (
          <>
            <div className="junior-card">
              <div className="junior-kicker">BUILD 1.0</div>
              <h2>先选控制台状态</h2>
              <div className="junior-grid-3">
                {STATES.map((item, index) => (
                  <button
                    key={item.id}
                    className={`junior-option-btn${current.id === item.id ? ' active' : ''}`}
                    onClick={() => setStateIdx(index)}
                    style={current.id === item.id ? { borderColor: item.color, color: item.color } : {}}
                  >
                    <div className="junior-big-emoji">{item.emoji}</div>
                    <div>{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="junior-card">
              <div className="junior-kicker">BUILD 2.0</div>
              <h2>再装一个升级功能</h2>
              <div className="junior-grid-3">
                {BOOSTS.map((item) => (
                  <button
                    key={item.id}
                    className={`junior-option-btn${boost.id === item.id ? ' active' : ''}`}
                    onClick={() => setBoost(item)}
                    style={boost.id === item.id ? { borderColor: current.color, color: current.color } : {}}
                  >
                    <div className="junior-big-emoji">{item.emoji}</div>
                    <div>{item.label}</div>
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', placeItems: 'center', marginTop: 16 }}>
                <button
                  className="junior-action-btn"
                  style={{ maxWidth: 220, background: current.color }}
                  onClick={() => setPressCount((prev) => prev + 1)}
                >
                  {current.action}
                </button>
              </div>

              <div className="junior-meter">
                <div className="junior-meter-label">控制台升级进度</div>
                <div className="junior-meter-track">
                  <div className="junior-meter-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="project-preview" style={{ borderColor: `${current.color}66` }}>
                <div className="project-top" style={{ background: current.color }}>{resultTitle}</div>
                <div className="project-body">
                  <div style={{ fontSize: 64, textAlign: 'center' }}>{current.emoji}</div>
                  <div className="junior-result-title" style={{ textAlign: 'center', color: current.color, marginTop: 8 }}>{launchLevel}</div>
                  <div className="junior-result-copy" style={{ textAlign: 'center' }}>{current.copy}</div>
                  <div className="junior-stage" style={{ marginTop: 14 }}>
                    <div style={{ fontWeight: 900, color: '#f8fafc' }}>已装功能：{boost.emoji} {boost.label}</div>
                    <div style={{ marginTop: 6, color: '#cbd5e1', lineHeight: 1.7 }}>
                      你已经按了 {pressCount} 次按钮。现在这个页面不只是切换状态，还多了一个可以继续展示的升级点。
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <p>今天不要只问“按钮是什么”，而是让 AI 帮你想更多状态和升级点。</p>
            <div className="junior-prompt">{`我在做一个儿童按钮控制台。\n现在有 3 个状态：${STATES.map((item) => item.label).join('、')}。\n已经有的升级功能是：${boost.label}。\n请再帮我想 2 个更酷的状态名字，\n和 2 个可以继续加上的升级功能。`}</div>
          </div>
        )}

        {tab === 'work' && (
          <div className="junior-card">
            <h2>完成检查</h2>
            <div className="junior-checklist">
              {[
                { done: true, label: '我做出了 3 个按钮状态' },
                { done: !!boost.id, label: '我给页面装了一个升级功能' },
                { done: pressCount > 0, label: '我让按钮真的推动了结果变化' },
                { done: pressCount >= 3, label: '我把控制台按到了升级版' },
              ].map((item) => (
                <div key={item.label} className={`junior-check-item${item.done ? ' done' : ''}`}>
                  <span className="junior-check-mark">{item.done ? '✓' : '•'}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">🪄🔘</div>
              <h3>按钮控制台工程师</h3>
              <p>你已经会做不止一个状态的按钮页面，还会把它继续升级了。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
