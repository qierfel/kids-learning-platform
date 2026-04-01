import './Subject.css'

const TOOLS = [
  { icon: '算', label: '口算练习', desc: '加减乘除 · 计时 · 错题本', ready: false },
  { icon: '乘', label: '乘法表', desc: '游戏化背诵', ready: false },
  { icon: '形', label: '图形公式', desc: '面积 · 周长 · 公式卡片', ready: false },
]

export default function MathPage() {
  return (
    <div className="subject-page">
      <h2 className="subject-title">数学 <span className="edition">苏教版</span></h2>
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
