import { useNavigate } from 'react-router-dom'
import './Home.css'

const SUBJECTS = [
  {
    path: '/chinese',
    label: '语文',
    icon: '语',
    desc: '古诗词 · 成语 · 同音字',
    color: '#ff6b6b',
    bg: '#fff5f5',
  },
  {
    path: '/math',
    label: '数学',
    icon: '数',
    desc: '口算 · 乘法表 · 图形',
    color: '#4ecdc4',
    bg: '#f0fffe',
  },
  {
    path: '/english',
    label: '英语',
    icon: 'E',
    desc: '单词 · KET · PET · FCE',
    color: '#a78bfa',
    bg: '#f5f3ff',
  },
]

export default function Home({ user }) {
  const navigate = useNavigate()

  return (
    <div className="home">
      <div className="home-header">
        <h1 className="home-title">今天学什么？</h1>
        <p className="home-sub">选择一个科目开始学习</p>
      </div>

      <div className="subject-grid">
        {SUBJECTS.map(s => (
          <button key={s.path} className="subject-card" onClick={() => navigate(s.path)}
            style={{ '--card-color': s.color, '--card-bg': s.bg }}>
            <div className="subject-icon">{s.icon}</div>
            <div className="subject-label">{s.label}</div>
            <div className="subject-desc">{s.desc}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
