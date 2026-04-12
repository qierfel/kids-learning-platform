import { useState } from 'react'
import { TEXTBOOK_LINKS } from '../data/textbookLinks'
import './TextbookLink.css'

export default function TextbookLink({ subject, grade, semester }) {
  const data = TEXTBOOK_LINKS[subject]
  const [open, setOpen] = useState(false)
  if (!data) return null

  // 如果传了 grade/semester，直接高亮那一本
  const highlighted = grade && semester
    ? data.books.find(b => b.grade === grade && b.semester === semester)
    : null

  return (
    <div className="textbook-dropdown">
      <button className="textbook-dropdown-btn" onClick={() => setOpen(!open)}>
        <span className="textbook-dropdown-icon">📖</span>
        <span className="textbook-dropdown-label">
          电子教材
          <span className="textbook-dropdown-sub">{data.publisher}</span>
        </span>
        <span className={`textbook-dropdown-arrow ${open ? 'open' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="textbook-dropdown-menu">
          <div className="textbook-dropdown-note">国家智慧教育平台 · 首次需免费注册</div>
          {data.books.map(b => (
            <a
              key={`${b.grade}-${b.semester}`}
              className={`textbook-dropdown-item ${highlighted && b.grade === grade && b.semester === semester ? 'active' : ''}`}
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {b.grade}年级{b.semester}册
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
