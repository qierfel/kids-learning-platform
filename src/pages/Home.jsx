import { useNavigate } from 'react-router-dom'
import './Home.css'

const FEATURED_TRACKS = [
  {
    path: '/chinese',
    title: '小学学习馆',
    subtitle: '语文、数学、英语一起学',
    description: '更适合日常学习和基础打牢，像一张温暖的学习地图。',
    icon: '/icons/generated/elementary-icon.png',
    tone: 'elementary',
    tag: '日常学习',
  },
  {
    path: '/coding',
    title: 'AI 编程创作屋',
    subtitle: '做网页、做小工具、做自己的作品',
    description: '把 AI 当成创作搭档，让孩子更快进入“我做出来了”的状态。',
    icon: '/icons/generated/ai-coding-icon.png',
    tone: 'coding',
    tag: '项目制作',
  },
  {
    path: '/physics',
    title: '初中探索站',
    subtitle: '物理、化学、历史、地理',
    description: '适合更强的阅读和理解任务，也适合系统梳理知识点。',
    icon: '/icons/generated/junior-icon.png',
    tone: 'junior',
    tag: '进阶探索',
  },
]

const QUICK_TOOLS = [
  {
    path: '/mistakes',
    label: '错题本',
    description: '把做错的内容留下来，之后更容易查漏补缺。',
    icon: '/icons/generated/mistakes-icon.png',
  },
  {
    path: '/notebook',
    label: '问题讨论',
    description: '随时记录问题、继续追问，也能当学习对话本。',
    icon: '/icons/generated/discussion-icon.png',
  },
]

const SUBJECT_GROUPS = [
  {
    title: '小学基础',
    subtitle: '更适合每天打开就继续学一点',
    items: [
      { path: '/chinese', label: '语文', icon: '/icons/generated/chinese-icon.png' },
      { path: '/math', label: '数学', icon: '/icons/generated/math-icon.png' },
      { path: '/english', label: '英语', icon: '/icons/generated/english-icon.png' },
    ],
  },
  {
    title: '初中拓展',
    subtitle: '适合更高年级或想继续探索的内容',
    items: [
      { path: '/physics', label: '物理', icon: '/icons/extracted_named/physics_icon_sheet.png' },
      { path: '/chemistry', label: '化学', icon: '/icons/extracted_named/chemistry_icon_sheet.png' },
      { path: '/history', label: '历史', icon: '/icons/extracted_named/history_icon_sheet.png' },
      { path: '/geography', label: '地理', icon: '/icons/extracted_named/geography_icon_sheet.png' },
    ],
  },
]

const HOME_NOTES = [
  '手机上更适合快速进入今天的任务。',
  'iPad 上最适合沉浸式学习和陪学。',
  '电脑上更适合总览内容、讨论和作品展示。',
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-hero-copy">
          <div className="home-hero-badge">Kids Learning Platform</div>
          <h1 className="home-title">把每天的学习，变成一段更舒服的探索旅程。</h1>
          <p className="home-subtitle">
            这里不是把内容堆在一起，而是把孩子常用的学习入口、讨论空间和 AI 创作工具，整理成更清楚、更好看的学习桌面。
          </p>
          <div className="home-hero-actions">
            <button className="home-primary-btn" onClick={() => navigate('/coding')}>先去 AI 编程</button>
            <button className="home-secondary-btn" onClick={() => navigate('/english')}>继续学科内容</button>
          </div>
        </div>

        <div className="home-hero-panel">
          <div className="home-hero-card home-hero-card--primary">
            <div className="home-hero-card-label">今日推荐</div>
            <div className="home-hero-card-title">AI 编程创作屋</div>
            <div className="home-hero-card-text">从启蒙走向项目制作，用更强的反馈感把孩子带进创作状态。</div>
          </div>
          <div className="home-hero-card-row">
            <div className="home-hero-card">
              <div className="home-hero-mini-label">学习节奏</div>
              <div className="home-hero-mini-value">短时、高频、可展示</div>
            </div>
            <div className="home-hero-card">
              <div className="home-hero-mini-label">推荐设备</div>
              <div className="home-hero-mini-value">手机 / iPad / 电脑</div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-head">
          <div>
            <h2 className="home-section-title">从哪里开始</h2>
            <p className="home-section-subtitle">把最重要的学习入口放在最前面，减少孩子每次打开时的犹豫。</p>
          </div>
        </div>

        <div className="home-feature-grid">
          {FEATURED_TRACKS.map((track) => (
            <button
              key={track.title}
              className={`home-feature-card home-feature-card--${track.tone}`}
              onClick={() => navigate(track.path)}
            >
              <div className="home-feature-top">
                <span className="home-feature-tag">{track.tag}</span>
                <span className="home-feature-arrow">→</span>
              </div>
              <div className="home-feature-content">
                <img
                  src={track.icon}
                  alt={track.title}
                  className={`home-feature-icon${track.icon.includes('_sheet') ? ' home-feature-icon--sheet' : ''}`}
                />
                <div className="home-feature-copy">
                  <div className="home-feature-title">{track.title}</div>
                  <div className="home-feature-sub">{track.subtitle}</div>
                  <p className="home-feature-desc">{track.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-head">
          <div>
            <h2 className="home-section-title">学习工具</h2>
            <p className="home-section-subtitle">把容易反复使用的工具放成稳定入口，减少页面切换的成本。</p>
          </div>
        </div>

        <div className="home-tool-grid">
          {QUICK_TOOLS.map((tool) => (
            <button key={tool.label} className="home-tool-card" onClick={() => navigate(tool.path)}>
              <img src={tool.icon} alt={tool.label} className="home-tool-icon" />
              <div className="home-tool-copy">
                <div className="home-tool-title">{tool.label}</div>
                <p className="home-tool-desc">{tool.description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-head">
          <div>
            <h2 className="home-section-title">按学科继续</h2>
            <p className="home-section-subtitle">首页不再把所有内容平铺，而是按学习场景分成更清楚的入口层级。</p>
          </div>
        </div>

        <div className="home-subject-groups">
          {SUBJECT_GROUPS.map((group) => (
            <div key={group.title} className="home-subject-group">
              <div className="home-subject-head">
                <div className="home-subject-title">{group.title}</div>
                <div className="home-subject-subtitle">{group.subtitle}</div>
              </div>

      <div className="home-subject-grid">
                {group.items.map((item) => (
                  <button key={item.label} className="home-subject-card" onClick={() => navigate(item.path)}>
                    <img
                      src={item.icon}
                      alt={item.label}
                      className={`home-subject-icon${item.icon.includes('_sheet') ? ' home-subject-icon--sheet' : ''}`}
                    />
                    <span className="home-subject-label">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section home-section--note">
        <div className="home-note-card">
          <div className="home-note-title">多设备使用建议</div>
          <div className="home-note-grid">
            {HOME_NOTES.map((note) => (
              <div key={note} className="home-note-item">{note}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
