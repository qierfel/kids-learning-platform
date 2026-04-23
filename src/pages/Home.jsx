import { useNavigate } from 'react-router-dom'
import './Home.css'

const GRID_ITEMS = [
  { path: '/mistakes', label: '错题本', icon: '/icons/extracted_named/lookup_notebook_icon.png' },
  { path: '/notebook', label: '问题讨论', icon: '/icons/extracted_named/robot_mascot_icon.png' },
  { path: '/math', label: '数学', icon: '/icons/extracted_named/fun_math_button.png' },
  { path: '/chinese', label: '语文', icon: '/icons/extracted_named/fun_chinese_button_green.png' },
  { path: '/english', label: '英语', icon: '/icons/extracted_named/fun_english_button_blue.png' },
  { path: '/physics', label: '物理', icon: '/icons/extracted_named/fun_physics_button_red.png' },
  { path: '/chemistry', label: '化学', icon: '/icons/extracted_named/fun_chemistry_button_orange.png' },
  { path: '/history', label: '历史', icon: '/icons/extracted_named/fun_history_button_brown.png' },
  { path: '/geography', label: '地理', icon: '/icons/extracted_named/fun_geography_button_gold.png' },
  { path: '/chinese', label: '小学', icon: '/icons/extracted_named/schoolhouse_icon.png' },
  { path: '/physics', label: '初中', icon: '/icons/extracted_named/junior_torch_icon.png' },
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
          <button key={i} className="home-grid-item" onClick={() => navigate(item.path)}>
            <img src={item.icon} alt={item.label} className="home-grid-icon" />
            <span className="home-grid-label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
