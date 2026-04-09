import { useState } from 'react'
import WordQuiz from './english/WordQuiz'
import SRSStudy from './english/SRSStudy'
import './Subject.css'

const TOOLS = [
  { id: 'srs', icon: '📅', label: '记忆计划', desc: '记忆曲线 · 每日任务 · 默写测验 · 雅思词汇', ready: true },
  { id: 'words', icon: 'W', label: '单词速练', desc: '年级词汇 · KET · PET · FCE · 闪卡', ready: true },
  { id: 'grammar', icon: 'G', label: '语法讲解', desc: '时态 · 句型 · AI错题分析', ready: false },
  { id: 'reading', icon: 'R', label: '阅读理解', desc: '短文 · 选择题 · AI讲解', ready: false },
]

export default function English({ user }) {
  const [activeTool, setActiveTool] = useState(null)

  if (activeTool === 'srs') return <SRSStudy user={user} onBack={() => setActiveTool(null)} />
  if (activeTool === 'words') return <WordQuiz onBack={() => setActiveTool(null)} />

  return (
    <div className="subject-page">
      <h2 className="subject-title">英语 <span className="edition">KET · PET · FCE</span></h2>
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
