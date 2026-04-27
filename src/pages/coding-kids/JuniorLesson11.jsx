import { useMemo, useState } from 'react'
import './JuniorLesson.css'

const THEMES = ['海边小站', '彩虹故事页', '动物欢迎卡']
const AUDIENCES = ['给同学看', '给家长看', '给自己收藏']
const STYLES = ['可爱一点', '勇敢一点', '梦幻一点']

export default function JuniorLesson11({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [theme, setTheme] = useState(THEMES[0])
  const [audience, setAudience] = useState(AUDIENCES[0])
  const [style, setStyle] = useState(STYLES[0])

  const opener = useMemo(() => {
    if (style === '可爱一点') return `欢迎来到 ${theme}，今天我们一起慢慢玩。`
    if (style === '勇敢一点') return `欢迎来到 ${theme}，准备好去挑战新的任务吧！`
    return `欢迎来到 ${theme}，这里有亮晶晶的小惊喜等着你。`
  }, [theme, style])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #fef3c7, #dbeafe)' }}>
        <div className="junior-badge" style={{ background: '#fde68a', color: '#92400e' }}>第 11 课 · 升级舱</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">💡</div></div>
          <div>
            <h1 className="junior-title">请 AI 帮我想点子</h1>
            <p className="junior-sub">这次不是随便问一句，而是学会把主题、对象和风格一起说清楚</p>
          </div>
        </div>
      </div>

      <div className="junior-goals">
        <div className="junior-goal">学会把“我要做什么”说清楚</div>
        <div className="junior-goal">让 AI 真的帮你生成能用的开场白</div>
      </div>

      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((key) => (
          <button key={key} className="junior-tab" onClick={() => setTab(key)} style={tab === key ? { borderColor: '#f59e0b', color: '#b45309' } : {}}>
            {key === 'learn' ? '看任务' : key === 'do' ? '搭提示卡' : key === 'ai' ? '问问 AI' : '完成检查'}
          </button>
        ))}
      </div>

      <div className="junior-content">
        {tab === 'learn' && (
          <>
            <div className="junior-card">
              <div className="junior-kicker">IDEA TEMPLATE</div>
              <h2>好问题不是长，而是清楚</h2>
              <p>问 AI 的时候，小朋友最容易漏掉 3 件事：做什么、给谁看、想要什么感觉。今天你要把这 3 件事都说出来。</p>
              <div className="junior-mini-grid">
                <div className="junior-mini-panel">
                  <div className="junior-mini-title">主题</div>
                  <div className="junior-mini-copy">我要做海边、动物还是彩虹故事？</div>
                </div>
                <div className="junior-mini-panel">
                  <div className="junior-mini-title">对象</div>
                  <div className="junior-mini-copy">这页是给同学、家长还是自己看？</div>
                </div>
              </div>
            </div>
            <div className="junior-card">
              <h2>今天的挑战</h2>
              <div className="junior-checklist">
                {['选一个主题', '选一个给谁看的对象', '再选一种页面风格', '最后拼成一条完整的 AI 提示词'].map((item) => (
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
              <h2>先选主题和对象</h2>
              <div className="junior-grid-3">
                {THEMES.map((item) => (
                  <button key={item} className={`junior-option-btn${theme === item ? ' active' : ''}`} onClick={() => setTheme(item)} style={theme === item ? { borderColor: '#f59e0b', color: '#b45309' } : {}}>
                    <div>{item}</div>
                  </button>
                ))}
              </div>
              <div className="junior-grid-3">
                {AUDIENCES.map((item) => (
                  <button key={item} className={`junior-option-btn${audience === item ? ' active' : ''}`} onClick={() => setAudience(item)} style={audience === item ? { borderColor: '#f59e0b', color: '#b45309' } : {}}>
                    <div>{item}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="junior-card">
              <div className="junior-kicker">BUILD 2.0</div>
              <h2>再给它一种风格</h2>
              <div className="junior-grid-3">
                {STYLES.map((item) => (
                  <button key={item} className={`junior-option-btn${style === item ? ' active' : ''}`} onClick={() => setStyle(item)} style={style === item ? { borderColor: '#f59e0b', color: '#b45309' } : {}}>
                    <div>{item}</div>
                  </button>
                ))}
              </div>

              <div className="junior-result">
                <div className="junior-result-title" style={{ textAlign: 'center', color: '#b45309' }}>我现在会这样问 AI</div>
                <div className="junior-result-copy" style={{ textAlign: 'center' }}>我要做：{theme}</div>
                <div className="junior-result-copy" style={{ textAlign: 'center' }}>展示给：{audience}</div>
                <div className="junior-result-copy" style={{ textAlign: 'center' }}>风格想要：{style}</div>
                <div className="junior-stage" style={{ marginTop: 14 }}>
                  <div style={{ fontWeight: 900, color: '#f8fafc' }}>AI 可能给我的开场白</div>
                  <div style={{ marginTop: 8, color: '#cbd5e1', lineHeight: 1.7 }}>{opener}</div>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <div className="junior-prompt">{`我想做一个儿童网页。\n主题是：${theme}\n这页是：${audience}\n我想要的感觉是：${style}\n请帮我写：\n1. 一句开场白\n2. 一个页面名字\n3. 两个可以加上的小元素`}</div>
          </div>
        )}

        {tab === 'work' && (
          <div className="junior-card">
            <h2>完成检查</h2>
            <div className="junior-checklist">
              {[
                { done: true, label: '我会先告诉 AI 我在做什么' },
                { done: true, label: '我会补充这页是给谁看的' },
                { done: true, label: '我会再告诉 AI 我想要什么风格' },
                { done: true, label: '我能得到更像真的作品的结果' },
              ].map((item) => (
                <div key={item.label} className={`junior-check-item${item.done ? ' done' : ''}`}>
                  <span className="junior-check-mark">✓</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">💡🤝</div>
              <h3>AI 点子导演</h3>
              <p>你已经会给 AI 一条更完整、更能做出结果的任务了。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
