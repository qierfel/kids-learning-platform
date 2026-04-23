import { useNavigate } from 'react-router-dom'
import './Home.css'

const GRID_ITEMS = [
  { path: '/mistakes', label: '错题本', icon: '/icons/extracted_named/wrong_book_card_sheet.png', card: true },
  { path: '/notebook', label: '问题讨论', icon: '/icons/extracted_named/problem_discussion_card_sheet.png', card: true },
  { path: '/math', label: '数学', icon: '/icons/extracted_named/math_icon_sheet.png' },
  { path: '/chinese', label: '语文', icon: '/icons/extracted_named/chinese_icon_sheet.png' },
  { path: '/english', label: '英语', icon: '/icons/extracted_named/english_icon_sheet.png' },
  { path: '/physics', label: '物理', icon: '/icons/extracted_named/physics_icon_sheet.png' },
  { path: '/chemistry', label: '化学', icon: '/icons/extracted_named/chemistry_icon_sheet.png' },
  { path: '/history', label: '历史', icon: '/icons/extracted_named/history_icon_sheet.png' },
  { path: '/geography', label: '地理', icon: '/icons/extracted_named/geography_icon_sheet.png' },
  { path: '/chinese', label: '小学', icon: '/icons/extracted_named/elementary_icon_sheet.png' },
  { path: '/physics', label: '初中', icon: '/icons/extracted_named/junior_icon_sheet.png' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <div className="home-header">
        <h1 className="home-title">今天学什么？</h1>
      </div>
      <div className="home-grid">
        {GRID_ITEMS.map((item, i) => (
          <button key={i} className="home-grid-item" aria-label={item.label} onClick={() => navigate(item.path)}>
            <img src={item.icon} alt={item.label} className={item.card ? 'home-grid-icon' : 'home-grid-icon home-grid-icon--sheet'} />
          </button>
        ))}
      </div>
    </div>
  )
}
