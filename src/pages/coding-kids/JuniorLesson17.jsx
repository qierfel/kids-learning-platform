import { useMemo, useState } from 'react'
import './JuniorLesson.css'

const IMPROVES = [
  { id: 'color', label: '换更厉害的配色', emoji: '🎨', effect: '页面看起来更有气质' },
  { id: 'button', label: '加一个按钮区', emoji: '🔘', effect: '页面不只是看，还能点' },
  { id: 'badge', label: '加作品徽章', emoji: '🏅', effect: '页面更像正式发布作品' },
  { id: 'helper', label: '加说明提示', emoji: '💬', effect: '别人一看就知道怎么玩' },
]

export default function JuniorLesson17({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [selected, setSelected] = useState([IMPROVES[0].id, IMPROVES[1].id])

  function toggle(id) {
    setSelected((prev) => (
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id].slice(-4)
    ))
  }

  const selectedItems = useMemo(
    () => IMPROVES.filter((item) => selected.includes(item.id)),
    [selected],
  )

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #dbeafe, #e0e7ff)' }}>
        <div className="junior-badge" style={{ background: '#bfdbfe', color: '#1d4ed8' }}>第 17 课 · 工具舱</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">🚀</div></div>
          <div>
            <h1 className="junior-title">升级成 2.0</h1>
            <p className="junior-sub">这次要真的比较 1.0 和 2.0，而不是只选一个“想升级什么”</p>
          </div>
        </div>
      </div>

      <div className="junior-goals">
        <div className="junior-goal">学会看出 1.0 和 2.0 的区别</div>
        <div className="junior-goal">给作品加出真正看得见的升级点</div>
      </div>

      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((k) => (
          <button key={k} className="junior-tab" onClick={() => setTab(k)} style={tab === k ? { borderColor: '#3b82f6', color: '#1d4ed8' } : {}}>
            {k === 'learn' ? '看一看' : k === 'do' ? '升级作品' : k === 'ai' ? '问问 AI' : '完成啦'}
          </button>
        ))}
      </div>

      <div className="junior-content">
        {tab === 'learn' && (
          <div className="junior-card">
            <div className="junior-kicker">VERSION THINKING</div>
            <h2>什么才算真正升级？</h2>
            <p>不是只换个颜色就结束，而是让页面变得更清楚、更好玩、更像正式作品。升级以后，别人一看就知道它更厉害了。</p>
            <div className="junior-mini-grid">
              <div className="junior-mini-panel">
                <div className="junior-mini-title">1.0</div>
                <div className="junior-mini-copy">能用，但有点单薄。</div>
              </div>
              <div className="junior-mini-panel">
                <div className="junior-mini-title">2.0</div>
                <div className="junior-mini-copy">更好看、更清楚、更多一点互动。</div>
              </div>
            </div>
          </div>
        )}

        {tab === 'do' && (
          <>
            <div className="junior-card">
              <div className="junior-kicker">STEP 1</div>
              <h2>选至少两个升级点</h2>
              <div className="junior-grid-2">
                {IMPROVES.map((item) => (
                  <button
                    key={item.id}
                    className={`junior-option-btn${selected.includes(item.id) ? ' active' : ''}`}
                    onClick={() => toggle(item.id)}
                    style={selected.includes(item.id) ? { borderColor: '#3b82f6', color: '#1d4ed8' } : {}}
                  >
                    <div className="junior-big-emoji">{item.emoji}</div>
                    <div>{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="junior-card">
              <div className="junior-kicker">STEP 2</div>
              <h2>看看 2.0 多了什么</h2>
              <div className="junior-mini-grid">
                <div className="junior-mini-panel">
                  <div className="junior-mini-title">作品 1.0</div>
                  <div className="junior-mini-copy">有主题，但还比较简单。</div>
                </div>
                <div className="junior-mini-panel">
                  <div className="junior-mini-title">作品 2.0</div>
                  <div className="junior-mini-copy">已经装上这些升级点：{selectedItems.map((item) => item.label).join('、')}。</div>
                </div>
              </div>

              <div className="junior-checklist">
                {selectedItems.map((item) => (
                  <div key={item.id} className="junior-check-item done">
                    <span className="junior-check-mark">✓</span>
                    <span>{item.emoji} {item.effect}</span>
                  </div>
                ))}
              </div>

              <div className="junior-result">
                <div className="junior-result-title" style={{ textAlign: 'center', color: '#1d4ed8' }}>今天的 2.0 方案</div>
                <div className="junior-result-copy" style={{ textAlign: 'center' }}>
                  {selectedItems.length >= 2
                    ? `你已经给作品选好了 ${selectedItems.length} 个升级点。`
                    : '至少选 2 个升级点，作品才像真正进入 2.0。'}
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <p>现在可以让 AI 帮你比较“1.0 和 2.0”，这才更像产品升级。</p>
            <div className="junior-prompt">{`我有一个儿童小页面。\n现在准备从 1.0 升级到 2.0。\n我已经选了这些升级点：${selectedItems.map((item) => item.label).join('、')}。\n请你告诉我，\n升级以后别人最容易看出来的 2 个变化是什么？`}</div>
          </div>
        )}

        {tab === 'work' && (
          <div className="junior-card">
            <h2>今天留下的作品</h2>
            <p>今天你不是做了一个新页，而是学会了“让旧作品继续长大”。这已经很接近真正做产品的人在做的事了。</p>
            <div className="junior-checklist">
              {[
                { done: selectedItems.length >= 2, label: '我给作品加了至少两个升级点' },
                { done: selectedItems.length >= 3, label: '我挑战了三升级点版本' },
                { done: true, label: '我开始会比较 1.0 和 2.0 的差别' },
              ].map((item) => (
                <div key={item.label} className={`junior-check-item${item.done ? ' done' : ''}`}>
                  <span className="junior-check-mark">{item.done ? '✓' : '•'}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">🚀🛠️</div>
              <h3>2.0 升级工程师</h3>
              <p>你已经开始用“版本升级”的方式思考作品，而不是每次都从头来。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
