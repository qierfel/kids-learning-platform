import './TextbookLink.css'

// 教育部「国家中小学智慧教育平台」电子教材入口
// 官方免费提供小学/初中/高中各版本电子教材
const PLATFORM_URL = 'https://basic.smartedu.cn/tchMaterial'

export default function TextbookLink({ subject, edition }) {
  return (
    <a
      className="textbook-link"
      href={PLATFORM_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="textbook-link-icon">📖</span>
      <div className="textbook-link-text">
        <div className="textbook-link-title">官方电子教材</div>
        <div className="textbook-link-desc">
          国家中小学智慧教育平台 · 免费 · {edition || subject}
        </div>
      </div>
      <span className="textbook-link-arrow">→</span>
    </a>
  )
}
