import './Subject.css'

const TOOLS = [
  { icon: '诗', label: '古诗词', desc: '朗读 · 注释 · 背诵打卡', ready: false },
  { icon: '成', label: '成语故事', desc: '图文解释 · 例句 · 小测验', ready: false },
  { icon: '字', label: '同音/形近字', desc: '对比 · 组词 · 练习', ready: false },
]

export default function Chinese() {
  return (
    <div className="subject-page">
      <h2 className="subject-title">语文 <span className="edition">人教版</span></h2>
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
