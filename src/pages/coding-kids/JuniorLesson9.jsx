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

const BOOSTS = [
  { id: 'gift', label: '宝箱结局', emoji: '🎁' },
  { id: 'map', label: '藏宝图', emoji: '🗺️' },
  { id: 'friend', label: '新朋友', emoji: '🤝' },
]

export default function JuniorLesson9({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [first, setFirst] = useState('forest')
  const [second, setSecond] = useState('fox')
  const [boost, setBoost] = useState(BOOSTS[0])
  const [tries, setTries] = useState(0)

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
        <div className="junior-badge" style={{ background: '#99f6e4', color: '#115e59' }}>第 9 课 · 升级舱</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">🧭</div></div>
          <div>
            <h1 className="junior-title">分叉小迷宫</h1>
            <p className="junior-sub">这次不只是两步选择，而是要把迷宫做成有分支、有结局、有升级道具的小冒险</p>
          </div>
        </div>
      </div>

      <div className="junior-goals">
        <div className="junior-goal">做出两步分支的小迷宫</div>
        <div className="junior-goal">再给迷宫加一个结局升级道具</div>
      </div>

      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((key) => (
          <button key={key} className="junior-tab" onClick={() => setTab(key)} style={tab === key ? { borderColor: '#14b8a6', color: '#0f766e' } : {}}>
            {key === 'learn' ? '看任务' : key === 'do' ? '做迷宫' : key === 'ai' ? '问问 AI' : '完成检查'}
          </button>
        ))}
      </div>

      <div className="junior-content">
        {tab === 'learn' && (
          <>
            <div className="junior-card">
              <div className="junior-kicker">BRANCH QUEST</div>
              <h2>今天你要做什么？</h2>
              <div className="junior-checklist">
                {['先做第一步路线选择', '再做第二步路线选择', '最后给结局加一个升级道具'].map((item) => (
                  <div key={item} className="junior-check-item">
                    <span className="junior-check-mark">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="junior-card">
              <h2>为什么这节比前面更难？</h2>
              <p>因为今天不只是“选完就结束”。你还要让不同路线通向不同结局，再给结局加一个额外奖励，这样它才更像小游戏。</p>
            </div>
          </>
        )}

        {tab === 'do' && (
          <>
            <div className="junior-card">
              <div className="junior-kicker">BUILD 1.0</div>
              <h2>先选第一步路线</h2>
              <div className="junior-grid-2">
                {STEP_ONE.map((item) => (
                  <button key={item.id} className={`junior-option-btn${first === item.id ? ' active' : ''}`} onClick={() => { setFirst(item.id); setSecond(STEP_TWO[item.id][0].id) }} style={first === item.id ? { borderColor: '#14b8a6', color: '#0f766e' } : {}}>
                    <div className="junior-big-emoji">{item.emoji}</div>
                    <div>{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="junior-card">
              <div className="junior-kicker">BUILD 2.0</div>
              <h2>再选第二步路线和奖励</h2>
              <div className="junior-grid-2">
                {STEP_TWO[first].map((item) => (
                  <button key={item.id} className={`junior-option-btn${second === item.id ? ' active' : ''}`} onClick={() => setSecond(item.id)} style={second === item.id ? { borderColor: '#14b8a6', color: '#0f766e' } : {}}>
                    <div className="junior-big-emoji">{item.emoji}</div>
                    <div>{item.label}</div>
                  </button>
                ))}
              </div>
              <div className="junior-grid-3">
                {BOOSTS.map((item) => (
                  <button key={item.id} className={`junior-option-btn${boost.id === item.id ? ' active' : ''}`} onClick={() => setBoost(item)} style={boost.id === item.id ? { borderColor: '#14b8a6', color: '#0f766e' } : {}}>
                    <div className="junior-big-emoji">{item.emoji}</div>
                    <div>{item.label}</div>
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', placeItems: 'center', marginTop: 16 }}>
                <button className="junior-action-btn" style={{ maxWidth: 220, background: '#0f766e' }} onClick={() => setTries((prev) => prev + 1)}>
                  开始探险
                </button>
              </div>

              <div className="junior-result">
                <div style={{ fontSize: 60, textAlign: 'center' }}>{result.emoji}</div>
                <div className="junior-result-title" style={{ textAlign: 'center', color: '#0f766e', marginTop: 8 }}>{result.title}</div>
                <div className="junior-result-copy" style={{ textAlign: 'center' }}>{result.copy}</div>
                <div className="junior-stage" style={{ marginTop: 14 }}>
                  <div style={{ fontWeight: 900, color: '#f8fafc' }}>额外奖励：{boost.emoji} {boost.label}</div>
                  <div style={{ marginTop: 6, color: '#cbd5e1', lineHeight: 1.7 }}>
                    你已经探险了 {tries} 次。现在这个迷宫不只会出结果，还多了一个可以继续升级的结局奖励。
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <div className="junior-prompt">{`我在做一个两步选择小游戏。\n第一步是：${STEP_ONE.find((item) => item.id === first)?.label}\n第二步是：${STEP_TWO[first].find((item) => item.id === second)?.label}\n现在的奖励是：${boost.label}\n请帮我再想：\n1. 两个新的结局\n2. 一个更酷的隐藏奖励`}</div>
          </div>
        )}

        {tab === 'work' && (
          <div className="junior-card">
            <h2>完成检查</h2>
            <div className="junior-checklist">
              {[
                { done: true, label: '我做出了第一步选择' },
                { done: true, label: '我做出了第二步选择' },
                { done: !!boost.id, label: '我给结局加了一个奖励' },
                { done: tries > 0, label: '我让小游戏真正跑出了一次结果' },
              ].map((item) => (
                <div key={item.label} className={`junior-check-item${item.done ? ' done' : ''}`}>
                  <span className="junior-check-mark">{item.done ? '✓' : '•'}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">🧭🌟</div>
              <h3>分支冒险设计师</h3>
              <p>你已经会做不止一层选择，还会给结局加奖励了。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
