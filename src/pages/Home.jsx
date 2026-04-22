import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const PRIMARY_SUBJECTS = [
  {
    path: '/chinese',
    tag: '趣味语文',
    label: '语文',
    icon: '/icons/extracted_named/fun_chinese_button_green.png',
    desc: '古诗词 · 成语 · 同音字 · 听写',
    tagColor: '#059669',
    bg: 'linear-gradient(145deg, #ffffff 0%, #e0f9ec 100%)',
  },
  {
    path: '/math',
    tag: '趣味数学',
    label: '数学',
    icon: '/icons/extracted_named/fun_math_button.png',
    desc: '口算 · 乘法表 · 公式 · 图形',
    tagColor: '#d97706',
    bg: 'linear-gradient(145deg, #ffffff 0%, #fef3d0 100%)',
  },
  {
    path: '/english',
    tag: '趣味英语',
    label: '英语',
    icon: '/icons/extracted_named/fun_english_button_blue.png',
    desc: '单词 · KET · PET · 听说读写',
    tagColor: '#2563eb',
    bg: 'linear-gradient(145deg, #ffffff 0%, #deeeff 100%)',
  },
]

const JUNIOR_SUBJECTS = [
  {
    path: '/physics',
    tag: '趣味物理',
    label: '物理',
    icon: '/icons/extracted_named/fun_physics_button_red.png',
    desc: '声光热力电 · 中考考点',
    tagColor: '#7c3aed',
    bg: 'linear-gradient(145deg, #ffffff 0%, #f0e8ff 100%)',
  },
  {
    path: '/chemistry',
    tag: '趣味化学',
    label: '化学',
    icon: '/icons/extracted_named/fun_chemistry_button_orange.png',
    desc: '方程式 · 酸碱盐 · 元素',
    tagColor: '#059669',
    bg: 'linear-gradient(145deg, #ffffff 0%, #e0f9ec 100%)',
  },
  {
    path: '/history',
    tag: '趣味历史',
    label: '历史',
    icon: '/icons/extracted_named/fun_history_button_brown.png',
    desc: '古代史 · 近代史 · 世界史',
    tagColor: '#b45309',
    bg: 'linear-gradient(145deg, #ffffff 0%, #f5ede0 100%)',
  },
  {
    path: '/geography',
    tag: '趣味地理',
    label: '地理',
    icon: '/icons/extracted_named/fun_geography_button_gold.png',
    desc: '中国地理 · 山西特色 · 世界',
    tagColor: '#0ea5e9',
    bg: 'linear-gradient(145deg, #ffffff 0%, #dff5ff 100%)',
  },
]

const TOOL_SUBJECTS = [
  {
    path: '/mistakes',
    tag: '错题本',
    label: '错题本',
    icon: '/icons/extracted_named/add_wrong_question_card.png',
    desc: '错题归纳 · AI解析 · 同类练习',
    tagColor: '#e53e3e',
    bg: 'linear-gradient(145deg, #ffffff 0%, #ffe0e0 100%)',
  },
  {
    path: '/notebook',
    tag: '问题讨论',
    label: '问题讨论',
    icon: '/icons/extracted_named/robot_mascot_icon.png',
    desc: '提问 · AI引导 · 线上讨论',
    tagColor: '#6366f1',
    bg: 'linear-gradient(145deg, #ffffff 0%, #eaecff 100%)',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const [grade, setGrade] = useState('primary') // 'primary' | 'junior'

  const subjects = grade === 'primary' ? PRIMARY_SUBJECTS : JUNIOR_SUBJECTS

  const allTags = [
    { key: 'primary', label: '小学' },
    ...PRIMARY_SUBJECTS.map(s => ({ key: s.path, label: s.tag, color: s.tagColor, path: s.path })),
    { key: 'junior', label: '初中' },
    ...JUNIOR_SUBJECTS.map(s => ({ key: s.path, label: s.tag, color: s.tagColor, path: s.path })),
  ]

  return (
    <div className="home">
      <div className="home-header">
        <h1 className="home-title">今天学什么？</h1>
        <p className="home-sub">选择科目开始学习</p>
      </div>

      {/* Tag cloud */}
      <div className="home-tags">
        {allTags.map(t => (
          t.path ? (
            <button
              key={t.key}
              className="home-tag"
              style={{ '--tag-color': t.color }}
              onClick={() => navigate(t.path)}
            >
              {t.label}
            </button>
          ) : (
            <span key={t.key} className="home-tag-section">{t.label}</span>
          )
        ))}
      </div>

      {/* Grade toggle */}
      <div className="home-grade-toggle">
        <button
          className={`grade-btn${grade === 'primary' ? ' active' : ''}`}
          onClick={() => setGrade('primary')}
        >
          小学（1-6年级）
        </button>
        <button
          className={`grade-btn${grade === 'junior' ? ' active' : ''}`}
          onClick={() => setGrade('junior')}
        >
          初中（7-9年级）
        </button>
      </div>

      {/* Subject cards */}
      <div className="home-subject-grid">
        {subjects.map(s => (
          <button
            key={s.path}
            className="home-subject-card"
            style={{ background: s.bg }}
            onClick={() => navigate(s.path)}
          >
            <img src={s.icon} alt={s.label} className="home-subject-icon" />
            <div className="home-subject-info">
              <div className="home-subject-label">{s.label}</div>
              <div className="home-subject-desc">{s.desc}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Tools */}
      <div className="home-tools-title">学习工具</div>
      <div className="home-tools-row">
        {TOOL_SUBJECTS.map(s => (
          <button
            key={s.path}
            className="home-tool-card"
            style={{ background: s.bg, '--tag-color': s.tagColor }}
            onClick={() => navigate(s.path)}
          >
            <img src={s.icon} alt={s.label} className="home-tool-icon" />
            <div>
              <div className="home-tool-label">{s.label}</div>
              <div className="home-tool-desc">{s.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
