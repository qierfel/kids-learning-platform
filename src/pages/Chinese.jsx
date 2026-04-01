import { useState } from 'react'
import Confusables from './chinese/Confusables'
import './Subject.css'

const TOOLS = [
  { id: 'confusables', icon: '字', label: '同音/形近字', desc: '对比 · 组词 · 练习', ready: true },
  { id: 'poems', icon: '诗', label: '古诗词', desc: '朗读 · 注释 · 背诵打卡', ready: false },
  { id: 'idioms', icon: '成', label: '成语故事', desc: '图文解释 · 例句 · 小测验', ready: false },
]

export default function Chinese() {
  const [activeTool, setActiveTool] = useState(null)

  if (activeTool === 'confusables') {
    return (
      <div className="subject-page">
        <button className="subject-back" onClick={() => setActiveTool(null)}>← 语文</button>
        <Confusables />
      </div>
    )
  }

  return (
    <div className="subject-page">
      <h2 className="subject-title">语文 <span className="edition">人教版</span></h2>
      <div className="tool-grid">
        {TOOLS.map(t => (
          <div
            key={t.id}
            className={`tool-card ${t.ready ? '' : 'coming-soon'}`}
            onClick={() => t.ready && setActiveTool(t.id)}
          >
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
