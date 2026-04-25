import { useState } from 'react'
import './JuniorLesson.css'

const PROJECTS = [
  { name: '快乐小站', emoji: '🌈', skill: '颜色和按钮' },
  { name: '故事页面', emoji: '📚', skill: '场景和角色' },
  { name: '选择小游戏', emoji: '🎮', skill: '分支和结果' },
]

export default function JuniorLesson12({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [project, setProject] = useState(PROJECTS[0])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #e0e7ff, #fef3c7)' }}>
        <div className="junior-badge" style={{ background: '#c7d2fe', color: '#4338ca' }}>第 12 课</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">🏅</div></div>
          <div>
            <h1 className="junior-title">我的小童作品展</h1>
            <p className="junior-sub">把做过的东西整理出来，展示给别人看</p>
          </div>
        </div>
      </div>
      <div className="junior-goals">
        <div className="junior-goal">整理自己的快乐小作品</div>
        <div className="junior-goal">学会展示给家长和朋友看</div>
      </div>
      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((key) => (
          <button key={key} className="junior-tab" onClick={() => setTab(key)} style={tab === key ? { borderColor: '#6366f1', color: '#4338ca' } : {}}>
            {key === 'learn' ? '看一看' : key === 'do' ? '整理作品' : key === 'ai' ? '问问 AI' : '完成啦'}
          </button>
        ))}
      </div>
      <div className="junior-content">
        {tab === 'learn' && (
          <div className="junior-card">
            <h2>作品做完以后，还可以做什么？</h2>
            <p>可以展示。告诉别人：我做了什么，我最喜欢哪一部分，我下次还想加什么。</p>
          </div>
        )}
        {tab === 'do' && (
          <div className="junior-card">
            <h2>选一个你最想展示的作品</h2>
            <div className="junior-grid-3">
              {PROJECTS.map((item) => (
                <button key={item.name} className={`junior-option-btn${project.name === item.name ? ' active' : ''}`} onClick={() => setProject(item)} style={project.name === item.name ? { borderColor: '#6366f1', color: '#4338ca' } : {}}>
                  <div className="junior-big-emoji">{item.emoji}</div>
                  <div>{item.name}</div>
                </button>
              ))}
            </div>
            <div className="junior-result">
              <div style={{ fontSize: 62, textAlign: 'center' }}>{project.emoji}</div>
              <div className="junior-result-title" style={{ textAlign: 'center', color: '#4338ca' }}>{project.name}</div>
              <div className="junior-result-copy" style={{ textAlign: 'center' }}>我最喜欢它会用到：{project.skill}</div>
              <div className="junior-stage" style={{ marginTop: 14 }}>
                <div style={{ fontWeight: 900, color: '#1f2937' }}>展示时可以这样说：</div>
                <div style={{ marginTop: 8, color: '#64748b', lineHeight: 1.7 }}>
                  这是我的 {project.name}。<br />
                  我最喜欢它的 {project.skill}。<br />
                  下次我还想给它加更多表情和颜色。
                </div>
              </div>
            </div>
          </div>
        )}
        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <div className="junior-prompt">{`我想介绍我的小作品。\n作品名字是：${project.name}\n我最喜欢的地方是：${project.skill}\n请帮我整理成 3 句小朋友能说的话。`}</div>
          </div>
        )}
        {tab === 'work' && (
          <div className="junior-card">
            <h2>完成啦</h2>
            <p>你已经从“会点会选”走到了“会做一个自己的小作品”。这就是很棒的开始。</p>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">🏅🌟</div>
              <h3>小小创作毕业生</h3>
              <p>你已经完成 7-10 岁 AI 小创作乐园第一阶段啦。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
