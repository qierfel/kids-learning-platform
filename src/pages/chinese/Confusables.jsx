import { useState } from 'react'
import confusables from '../../data/confusables'
import ConfusableDetail from './ConfusableDetail'
import './Confusables.css'

const GRADES = [1, 2, 3, 4, 5, 6]
const TYPES = [
  { value: 'all', label: '全部' },
  { value: 'homophone', label: '同音字' },
  { value: 'similar', label: '形近字' },
]

export default function Confusables() {
  const [grade, setGrade] = useState('all')
  const [type, setType] = useState('all')
  const [selected, setSelected] = useState(null)
  const [quizMode, setQuizMode] = useState(false)

  const filtered = confusables.filter(item =>
    (grade === 'all' || item.grade === Number(grade)) &&
    (type === 'all' || item.type === type)
  )

  if (selected) {
    return <ConfusableDetail
      item={selected}
      quizMode={quizMode}
      onBack={() => { setSelected(null); setQuizMode(false) }}
    />
  }

  return (
    <div className="confusables">
      <h2 className="page-title">同音字 / 形近字</h2>

      <div className="filters">
        <div className="filter-group">
          <span className="filter-label">年级</span>
          <button className={grade === 'all' ? 'filter-btn active' : 'filter-btn'} onClick={() => setGrade('all')}>全部</button>
          {GRADES.map(g => (
            <button key={g} className={grade === String(g) ? 'filter-btn active' : 'filter-btn'} onClick={() => setGrade(String(g))}>{g}年级</button>
          ))}
        </div>
        <div className="filter-group">
          <span className="filter-label">类型</span>
          {TYPES.map(t => (
            <button key={t.value} className={type === t.value ? 'filter-btn active' : 'filter-btn'} onClick={() => setType(t.value)}>{t.label}</button>
          ))}
        </div>
      </div>

      <div className="confusable-list">
        {filtered.map(item => (
          <div key={item.id} className="confusable-card">
            <div className="card-chars">
              {item.chars.map((c, i) => (
                <span key={i} className="card-char">{c}</span>
              ))}
            </div>
            <div className="card-meta">
              <span className={`type-badge ${item.type}`}>
                {item.type === 'homophone' ? '同音字' : '形近字'}
              </span>
              <span className="grade-badge">{item.grade}年级</span>
            </div>
            <div className="card-actions">
              <button className="action-btn study" onClick={() => { setSelected(item); setQuizMode(false) }}>学习</button>
              <button className="action-btn quiz" onClick={() => { setSelected(item); setQuizMode(true) }}>练习</button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="empty">暂无符合条件的内容</p>
      )}
    </div>
  )
}
