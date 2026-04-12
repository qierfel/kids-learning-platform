import { TEXTBOOK_LINKS, textbookUrl } from '../data/textbookLinks'
import './TextbookLink.css'

// 按年级直达的官方电子教材选择器
// 数据来自教育部「国家中小学智慧教育平台」公开 API
//
// 用法：
//   <TextbookLink subject="数学" />                  // 显示数学全部 12 本
//   <TextbookLink subject="数学" grade={1} semester="上" />  // 高亮指定一本
export default function TextbookLink({ subject, grade, semester }) {
  const data = TEXTBOOK_LINKS[subject]
  if (!data) return null

  return (
    <div className="textbook-picker">
      <div className="textbook-picker-header">
        <span className="textbook-picker-icon">📖</span>
        <div className="textbook-picker-text">
          <div className="textbook-picker-title">官方电子教材</div>
          <div className="textbook-picker-desc">
            国家中小学智慧教育平台 · {data.publisher}{subject}
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
              href={textbookUrl(b.id)}
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
