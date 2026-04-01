import './Subject.css'

const TOOLS = [
  { icon: 'K', label: 'KET 词库', desc: 'A2 级别 · 约1500词', ready: false },
  { icon: 'P', label: 'PET 词库', desc: 'B1 级别 · 约3500词', ready: false },
  { icon: 'F', label: 'FCE 词库', desc: 'B2 级别 · 约5000词', ready: false },
  { icon: '年', label: '按年级学单词', desc: '三年级起 · 跟教材走', ready: false },
]

export default function English() {
  return (
    <div className="subject-page">
      <h2 className="subject-title">英语</h2>
      <div className="tool-grid">
        {TOOLS.map(t => (
          <div key={t.label} className={`tool-card ${t.ready ? '' : 'coming-soon'}`}>
            <div className="tool-icon">{t.icon}</div>
            <div className="tool-label">{t.label}</div>
            <div className="tool-desc">{t.desc}</div>
            {!t.ready && <span className="badge">即将上线</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
