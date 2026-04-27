import { useMemo, useState } from 'react'
import './JuniorLesson.css'

const WORKS = [
  { id: 'welcome', name: '欢迎语生成器', emoji: '💌', skill: '输入后生成结果' },
  { id: 'toolwall', name: '小工具展示页', emoji: '🧩', skill: '把多个模块排进一页' },
  { id: 'upgrade', name: '2.0 升级作品', emoji: '🚀', skill: '比较升级前后差别' },
]

const POWERS = [
  { id: 'input', label: '我会做输入框', emoji: '⌨️' },
  { id: 'layout', label: '我会拼页面模块', emoji: '🧱' },
  { id: 'upgrade', label: '我会升级版本', emoji: '🛠️' },
  { id: 'ai', label: '我会请 AI 帮忙', emoji: '🤖' },
]

export default function JuniorLesson18({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [work, setWork] = useState(WORKS[0])
  const [powers, setPowers] = useState([POWERS[0].id, POWERS[3].id])
  const [speech, setSpeech] = useState('')

  function togglePower(id) {
    setPowers((prev) => (
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id].slice(-3)
    ))
  }

  const selectedPowers = useMemo(
    () => POWERS.filter((item) => powers.includes(item.id)),
    [powers],
  )

  const finalSpeech = useMemo(() => {
    if (speech.trim()) return speech.trim()
    return `这是我的 ${work.name}。我最厉害的是 ${selectedPowers.map((item) => item.label.replace('我会', '')).join('、') || work.skill}。`
  }, [speech, work, selectedPowers])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #ede9fe, #fef3c7)' }}>
        <div className="junior-badge" style={{ background: '#ddd6fe', color: '#6d28d9' }}>第 18 课 · 工具舱毕业</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">👑</div></div>
          <div>
            <h1 className="junior-title">小小毕业发布会</h1>
            <p className="junior-sub">这次不是普通展示，而是真正整理一份毕业作品，并准备进入下一条开发线</p>
          </div>
        </div>
      </div>

      <div className="junior-goals">
        <div className="junior-goal">整理一份真正能展示的毕业作品</div>
        <div className="junior-goal">把你已经会的能力讲清楚</div>
      </div>

      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((k) => (
          <button key={k} className="junior-tab" onClick={() => setTab(k)} style={tab === k ? { borderColor: '#8b5cf6', color: '#6d28d9' } : {}}>
            {k === 'learn' ? '看一看' : k === 'do' ? '做发布会' : k === 'ai' ? '问问 AI' : '毕业啦'}
          </button>
        ))}
      </div>

      <div className="junior-content">
        {tab === 'learn' && (
          <div className="junior-card">
            <div className="junior-kicker">BIG LAUNCH</div>
            <h2>为什么这次不只是“作品展”？</h2>
            <p>因为你现在已经不是只会点点看了。你已经会输入、会组合、会升级、会请 AI 帮忙，所以这节课要像真正发布作品那样，把“我会什么”讲出来。</p>
          </div>
        )}

        {tab === 'do' && (
          <>
            <div className="junior-card">
              <div className="junior-kicker">STEP 1</div>
              <h2>先选你的毕业作品</h2>
              <div className="junior-grid-3">
                {WORKS.map((item) => (
                  <button
                    key={item.id}
                    className={`junior-option-btn${work.id === item.id ? ' active' : ''}`}
                    onClick={() => setWork(item)}
                    style={work.id === item.id ? { borderColor: '#8b5cf6', color: '#6d28d9' } : {}}
                  >
                    <div className="junior-big-emoji">{item.emoji}</div>
                    <div>{item.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="junior-card">
              <div className="junior-kicker">STEP 2</div>
              <h2>再选 2 到 3 个“我已经会了”</h2>
              <div className="junior-grid-2">
                {POWERS.map((item) => (
                  <button
                    key={item.id}
                    className={`junior-option-btn${powers.includes(item.id) ? ' active' : ''}`}
                    onClick={() => togglePower(item.id)}
                    style={powers.includes(item.id) ? { borderColor: '#8b5cf6', color: '#6d28d9' } : {}}
                  >
                    <div className="junior-big-emoji">{item.emoji}</div>
                    <div>{item.label}</div>
                  </button>
                ))}
              </div>
              <div style={{ height: 14 }} />
              <textarea
                className="junior-textarea"
                value={speech}
                onChange={(e) => setSpeech(e.target.value)}
                placeholder="也可以自己写 2 到 3 句发布会介绍词"
                maxLength={120}
              />
            </div>

            <div className="junior-card">
              <div className="junior-kicker">RESULT</div>
              <h2>这是你的毕业发布卡</h2>
              <div className="junior-result">
                <div style={{ fontSize: 64, textAlign: 'center' }}>{work.emoji}</div>
                <div className="junior-result-title" style={{ textAlign: 'center', color: '#6d28d9' }}>{work.name}</div>
                <div className="junior-result-copy" style={{ textAlign: 'center' }}>{finalSpeech}</div>
                <div className="junior-pill-row" style={{ justifyContent: 'center' }}>
                  {selectedPowers.map((item) => (
                    <div key={item.id} className="junior-pill">{item.emoji} {item.label}</div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <p>现在可以让 AI 帮你整理“发布会台词”，也可以请它推荐下一步该学什么。</p>
            <div className="junior-prompt">{`我刚完成 7-10 岁 AI 小创作乐园。\n我的毕业作品是：${work.name}\n我已经会：${selectedPowers.map((item) => item.label).join('、') || work.skill}\n请你帮我整理成 3 句小朋友在发布会上可以说的话，\n最后再告诉我，下一步最适合进入什么样的课程。`}</div>
          </div>
        )}

        {tab === 'work' && (
          <div className="junior-card">
            <h2>毕业啦，但不是结束</h2>
            <p>你已经走完了一条真正的“小工具前夜”路线。接下来最自然的下一步，就是进入 `10-12 岁` 的真实开发线，开始做更完整的网页和项目。</p>
            <div className="junior-checklist">
              {[
                { done: true, label: '我已经有一个能展示的毕业作品' },
                { done: selectedPowers.length >= 2, label: '我已经能说出自己会的 2 项以上能力' },
                { done: true, label: '我已经准备进入更真实的开发课程' },
              ].map((item) => (
                <div key={item.label} className={`junior-check-item${item.done ? ' done' : ''}`}>
                  <span className="junior-check-mark">{item.done ? '✓' : '•'}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">👑🚀</div>
              <h3>小小创作毕业生</h3>
              <p>你已经完成了从“会回应”到“会做小工具”的整条小童升级线。</p>
            </div>
            <div className="junior-stage" style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 900, color: '#f8fafc', marginBottom: 6 }}>下一步入口</div>
              <div style={{ color: '#cbd5e1', lineHeight: 1.6 }}>
                去 `10-12 岁 AI 编程创作屋`，开始做更完整的网页、交互和真正的项目。
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
