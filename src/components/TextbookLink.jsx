import { TEXTBOOK_LINKS } from '../data/textbookLinks'
import './TextbookLink.css'

// 按年级直达的电子教材选择器
// 数据来源：电子课本网（dzkbw.com），免登录、免费
export default function TextbookLink({ subject, grade, semester }) {
  const data = TEXTBOOK_LINKS[subject]
  if (!data) return null

  return (
    <div className="textbook-picker">
      <div className="textbook-picker-header">
        <span className="textbook-picker-icon">📖</span>
        <div className="textbook-picker-text">
          <div className="textbook-picker-title">电子教材</div>
          <div className="textbook-picker-desc">
            {data.publisher}{subject} · 免登录在线查看
          </div>
        </div>
      </div>
      <div className="textbook-picker-grid">
        {data.books.map(b => {
          const active = b.grade === grade && b.semester === semester
          return (
            <a
              key={`${b.grade}-${b.semester}`}
              className={`textbook-chip ${active ? 'active' : ''}`}
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`${b.grade}年级${b.semester}册`}
            >
              {b.grade}{b.semester}
            </a>
          )
        })}
      </div>
    </div>
  )
}
