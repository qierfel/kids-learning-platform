import { useMemo, useState } from 'react'
import './JuniorLesson.css'

const MOODS = [
  { id: 'happy', label: '开心模式', emoji: '😄', copy: '今天适合做会发光的小作品。' },
  { id: 'brave', label: '勇敢模式', emoji: '🦁', copy: '今天可以试一个更难一点的功能。' },
  { id: 'dreamy', label: '梦幻模式', emoji: '🌈', copy: '今天让页面变得更像故事乐园。' },
]

export default function JuniorLesson13({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [name, setName] = useState('')
  const [favorite, setFavorite] = useState('')
  const [mood, setMood] = useState(MOODS[0])

  const filledCount = [name.trim(), favorite.trim(), mood?.id].filter(Boolean).length
  const progress = Math.round((filledCount / 3) * 100)

  const title = useMemo(() => {
    if (!name.trim()) return '我的输入实验室'
    return `${name} 的输入实验室`
  }, [name])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #d1fae5, #ccfbf1)' }}>
        <div className="junior-badge" style={{ background: '#a7f3d0', color: '#065f46' }}>第 13 课 · 工具舱</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">⌨️</div></div>
          <div>
            <h1 className="junior-title">输入小盒子</h1>
            <p className="junior-sub">不只是写一个字，而是让页面真的把你的内容读进去</p>
          </div>
        </div>
      </div>

      <div className="junior-goals">
        <div className="junior-goal">认识输入框会把内容装进页面</div>
        <div className="junior-goal">做出一个会读取名字和喜好的小页面</div>
      </div>

      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((k) => (
          <button key={k} className="junior-tab" onClick={() => setTab(k)} style={tab === k ? { borderColor: '#10b981', color: '#047857' } : {}}>
            {k === 'learn' ? '看一看' : k === 'do' ? '动手做' : k === 'ai' ? '问问 AI' : '完成啦'}
          </button>
        ))}
      </div>

      <div className="junior-content">
        {tab === 'learn' && (
          <>
            <div className="junior-card">
              <div className="junior-kicker">INPUT MISSION</div>
              <h2>输入框像什么？</h2>
              <p>像一个会收东西的小盒子。你把字装进去，页面就能拿出来，再把它变成新的结果。</p>
              <div className="junior-mini-grid">
                <div className="junior-mini-panel">
                  <div className="junior-mini-title">先输入</div>
                  <div className="junior-mini-copy">写名字、写喜欢的东西、写一句话。</div>
                </div>
                <div className="junior-mini-panel">
                  <div className="junior-mini-title">再显示</div>
                  <div className="junior-mini-copy">页面把你写的内容重新拼成新的句子。</div>
                </div>
              </div>
            </div>

            <div className="junior-card">
              <h2>今天不是只做一个输入框</h2>
              <p>今天你要做 3 件事：输入名字、输入喜欢的东西、再给页面选一种心情模式。这样结果才更像真的小工具。</p>
              <div className="junior-checklist">
                {['写下名字', '写下最喜欢的东西', '选一个页面心情模式'].map((item) => (
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
              <h2>先把内容装进去</h2>
              <input
                className="junior-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="写你的名字"
                maxLength={10}
              />
              <div style={{ height: 10 }} />
              <input
                className="junior-input"
                value={favorite}
                onChange={(e) => setFavorite(e.target.value)}
                placeholder="再写一个你最喜欢的东西，比如：宇宙、猫咪、火箭"
                maxLength={14}
              />

              <div className="junior-meter">
                <div className="junior-meter-label">工具装配进度</div>
                <div className="junior-meter-track">
                  <div className="junior-meter-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>

            <div className="junior-card">
              <div className="junior-kicker">BUILD 2.0</div>
              <h2>再给它选一种模式</h2>
              <div className="junior-grid-3">
                {MOODS.map((item) => (
                  <button
                    key={item.id}
                    className={`junior-option-btn${mood.id === item.id ? ' active' : ''}`}
                    onClick={() => setMood(item)}
                    style={mood.id === item.id ? { borderColor: '#10b981', color: '#047857' } : {}}
                  >
                    <div className="junior-big-emoji">{item.emoji}</div>
                    <div>{item.label}</div>
                  </button>
                ))}
              </div>

              <div className="junior-result">
                <div className="junior-result-title" style={{ textAlign: 'center', color: '#047857' }}>{title}</div>
                <div className="junior-result-copy" style={{ textAlign: 'center' }}>
                  {name.trim()
                    ? `你好，${name}！`
                    : '先写下名字，页面才会认识你。'}
                </div>
                <div className="junior-result-copy" style={{ textAlign: 'center' }}>
                  {favorite.trim()
                    ? `我读到你喜欢：${favorite}。`
                    : '再写一个你喜欢的东西，让页面更像你的。'}
                </div>
                <div className="junior-stage" style={{ marginTop: 14 }}>
                  <div style={{ fontWeight: 900, color: '#f8fafc', marginBottom: 6 }}>{mood.emoji} {mood.label}</div>
                  <div style={{ color: '#cbd5e1', lineHeight: 1.6 }}>{mood.copy}</div>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <p>今天别只问“输入框是什么”，可以开始让 AI 帮你升级工具。</p>
            <div className="junior-prompt">{`我在做一个儿童输入页面。\n页面里有：名字、喜欢的东西、心情模式。\n请你帮我想 2 个更好玩的输入内容，\n让这个小工具更像真的作品。`}</div>
          </div>
        )}

        {tab === 'work' && (
          <div className="junior-card">
            <h2>今天留下的作品</h2>
            <p>你已经做出了第一张“真工具前夜”页面。它不只是会回应，还会把不同输入拼成新的结果。</p>
            <div className="junior-checklist">
              {[
                { done: !!name.trim(), label: '我让页面读到了名字' },
                { done: !!favorite.trim(), label: '我让页面读到了第二个输入' },
                { done: !!mood.id, label: '我给页面加了一种模式' },
              ].map((item) => (
                <div key={item.label} className={`junior-check-item${item.done ? ' done' : ''}`}>
                  <span className="junior-check-mark">{item.done ? '✓' : '•'}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">⌨️🧠</div>
              <h3>输入工具启动员</h3>
              <p>你已经从“点一点”正式走到“页面会读我的内容”了。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
