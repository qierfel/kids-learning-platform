import { useMemo, useState } from 'react'
import './JuniorLesson.css'

const MODULES = [
  { id: 'welcome', label: '欢迎卡', emoji: '💌' },
  { id: 'badge', label: '徽章块', emoji: '🏅' },
  { id: 'tool', label: '小工具区', emoji: '🛠️' },
  { id: 'story', label: '故事角', emoji: '📚' },
]

export default function JuniorLesson16({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [title, setTitle] = useState('')
  const [picked, setPicked] = useState(['welcome', 'tool'])

  function toggle(moduleId) {
    setPicked((prev) => (
      prev.includes(moduleId)
        ? prev.filter((x) => x !== moduleId)
        : [...prev, moduleId].slice(-4)
    ))
  }

  const chosenModules = useMemo(
    () => MODULES.filter((item) => picked.includes(item.id)),
    [picked],
  )

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #fde68a, #fed7aa)' }}>
        <div className="junior-badge" style={{ background: '#fde68a', color: '#92400e' }}>第 16 课 · 工具舱</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">🧩</div></div>
          <div>
            <h1 className="junior-title">我的小工具展示页</h1>
            <p className="junior-sub">这次不是摆几个贴纸，而是把多个模块排进同一页</p>
          </div>
        </div>
      </div>

      <div className="junior-goals">
        <div className="junior-goal">理解一个页面可以有多个区块</div>
        <div className="junior-goal">做出更像真实产品的小页面</div>
      </div>

      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((k) => (
          <button key={k} className="junior-tab" onClick={() => setTab(k)} style={tab === k ? { borderColor: '#f59e0b', color: '#b45309' } : {}}>
            {k === 'learn' ? '看一看' : k === 'do' ? '搭页面' : k === 'ai' ? '问问 AI' : '完成啦'}
          </button>
        ))}
      </div>

      <div className="junior-content">
        {tab === 'learn' && (
          <>
            <div className="junior-card">
              <div className="junior-kicker">PAGE COMBO</div>
              <h2>完整页面为什么更有意思？</h2>
              <p>因为它不只做一件事。一个页面可以同时有欢迎区、作品区、故事区、小工具区，这样看起来才像真正的创作产品。</p>
            </div>
          </>
        )}

        {tab === 'do' && (
          <>
            <div className="junior-card">
              <div className="junior-kicker">STEP 1</div>
              <h2>先给你的页面起名字</h2>
              <input className="junior-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="比如：我的快乐控制台" maxLength={18} />
            </div>

            <div className="junior-card">
              <div className="junior-kicker">STEP 2</div>
              <h2>选 2 到 4 个页面模块</h2>
              <div className="junior-grid-2">
                {MODULES.map((item) => (
                  <button
                    key={item.id}
                    className={`junior-option-btn${picked.includes(item.id) ? ' active' : ''}`}
                    onClick={() => toggle(item.id)}
                    style={picked.includes(item.id) ? { borderColor: '#f59e0b', color: '#b45309' } : {}}
                  >
                    <div className="junior-big-emoji">{item.emoji}</div>
                    <div>{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="junior-card">
              <div className="junior-kicker">RESULT</div>
              <h2>这是你的小工具展示页</h2>
              <div className="project-preview" style={{ borderColor: '#f59e0b' }}>
                <div className="project-top" style={{ background: '#f59e0b' }}>
                  {title.trim() || '我的小工具展示页'}
                </div>
                <div className="project-body">
                  <div className="junior-grid-2" style={{ marginTop: 0 }}>
                    {chosenModules.map((item) => (
                      <div key={item.id} className="junior-mini-panel" style={{ background: '#fff7ed', borderColor: 'rgba(245, 158, 11, 0.18)' }}>
                        <div style={{ fontSize: 28 }}>{item.emoji}</div>
                        <div className="junior-mini-title" style={{ color: '#92400e' }}>{item.label}</div>
                        <div className="junior-mini-copy" style={{ color: '#9a3412' }}>这里可以放一个属于你的页面区块。</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <p>这次可以问 AI “页面还缺什么模块”，而不是只让它想名字。</p>
            <div className="junior-prompt">{`我在做一个儿童小工具展示页。\n现在页面里有：${chosenModules.map((item) => item.label).join('、') || '欢迎卡和小工具区'}。\n请你告诉我，\n如果我要让页面更像真的产品，还可以再加哪 2 个简单模块？`}</div>
          </div>
        )}

        {tab === 'work' && (
          <div className="junior-card">
            <h2>今天留下的作品</h2>
            <p>今天最重要的不是某一个按钮，而是你第一次像产品设计师一样，把多个功能区块装进了一页。</p>
            <div className="junior-checklist">
              {[
                { done: !!title.trim(), label: '我给页面起了自己的名字' },
                { done: picked.length >= 2, label: '我给页面装了至少两个模块' },
                { done: picked.length >= 3, label: '我挑战了三模块以上的页面结构' },
              ].map((item) => (
                <div key={item.label} className={`junior-check-item${item.done ? ' done' : ''}`}>
                  <span className="junior-check-mark">{item.done ? '✓' : '•'}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">🧩📄</div>
              <h3>页面拼装设计师</h3>
              <p>你已经开始理解：一个页面可以由很多不同模块组合而成。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
