import { useState } from 'react'
import GradedReading from './GradedReading'
import PictureBooks from './PictureBooks'
import ChapterBooks from './ChapterBooks'
import Reading from './Reading'
import '../Subject.css'

const CATEGORIES = [
  { id: 'graded',  icon: '📚', label: '分级读物', desc: 'RAZ · 海尼曼 · 牛津树 · 音频+PDF', color: '#6366f1', ready: true },
  { id: 'picture', icon: '🖼️', label: '英文绘本', desc: '小猪小象 · 弗洛格 · 音频+PDF',    color: '#f59e0b', ready: true },
  { id: 'chapter', icon: '📖', label: '章节书',   desc: '西游记英文版 · 2000词 · 108章',   color: '#e85d4a', ready: true },
  { id: 'novel',   icon: '📕', label: '小说',     desc: '英文原版小说 · 有声书',            color: '#8b5cf6', ready: false },
  { id: 'exam',    icon: '📝', label: '考试阅读', desc: 'KET/PET/FCE真题 · AI讲解',        color: '#10b981', ready: true },
]

export default function ReadingHub({ user, onBack }) {
  const [active, setActive] = useState(null)

  if (active === 'graded')  return <GradedReading onBack={() => setActive(null)} />
  if (active === 'picture') return <PictureBooks  onBack={() => setActive(null)} />
  if (active === 'chapter') return <ChapterBooks  onBack={() => setActive(null)} />
  if (active === 'exam')    return <Reading user={user} onBack={() => setActive(null)} />

  return (
    <div className="subject-page">
      <h2 className="subject-title">
        阅读 <span className="edition">分级 · 绘本 · 章节书 · 考试阅读</span>
      </h2>
      <button className="subject-back" onClick={onBack} style={{ cursor: 'pointer', background: 'none', border: 'none' }}>
        ← 返回英语
      </button>
      <div className="tool-grid">
        {CATEGORIES.map(cat => (
          <div
            key={cat.id}
            className={`tool-card ${cat.ready ? '' : 'coming-soon'}`}
            style={cat.ready ? { borderTop: `3px solid ${cat.color}` } : {}}
            onClick={() => cat.ready && setActive(cat.id)}
          >
            <div className="tool-icon" style={cat.ready ? { background: `${cat.color}18`, color: cat.color } : {}}>
              {cat.icon}
            </div>
            <div className="tool-label">{cat.label}</div>
            <div className="tool-desc">{cat.desc}</div>
            {!cat.ready && <span className="badge">即将上线</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
