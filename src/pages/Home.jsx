import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useHomeStats } from '../hooks/useHomeStats'
import { trackDailyVisit } from '../utils/sessionTracker'
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
    description: '把 AI 当成创作搭档，让孩子更快进入"我做出来了"的状态。',
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
      { path: '/physics', label: '物理', icon: '/icons/generated/physics-icon.png' },
      { path: '/chemistry', label: '化学', icon: '/icons/generated/chemistry-icon.png' },
      { path: '/history', label: '历史', icon: '/icons/generated/history-icon.png' },
      { path: '/geography', label: '地理', icon: '/icons/generated/geography-icon.png' },
    ],
  },
]

// Greeting based on time of day
function getGreeting() {
  const h = new Date().getHours()
  if (h < 6)  return '夜深了，注意休息 🌙'
  if (h < 12) return '早上好'
  if (h < 14) return '中午好'
  if (h < 18) return '下午好'
  return '晚上好'
}

function todayLabel() {
  return new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })
}

export default function Home({ user }) {
  const navigate = useNavigate()
  const stats = useHomeStats(user)

  // Mark today as an active day
  useEffect(() => {
    if (user?.uid) trackDailyVisit(user.uid)
  }, [user?.uid])

  const name = user?.nickname || '同学'
  const hasKVData = !stats.loading

  return (
    <div className="home">
      {/* Greeting bar */}
      <div className="home-greeting">
        <div>
          <span className="home-greeting-text">{getGreeting()}，{name}！</span>
          <span className="home-greeting-date">{todayLabel()}</span>
        </div>
      </div>

      {/* ── 今日学习状态 ── */}
      <section className="home-section home-section--stats">
        <div className="home-section-head">
          <div>
            <h2 className="home-section-title">今日学习状态</h2>
            <p className="home-section-subtitle">打开相关模块，数字会自动更新。</p>
          </div>
        </div>

        <div className="home-stats-grid">
          {/* Card 1: 错题本 */}
          <button className="home-stat-card" onClick={() => navigate('/mistakes')}>
            <div className="home-stat-icon">📕</div>
            <div className="home-stat-body">
              <div className="home-stat-label">错题本</div>
              <div className="home-stat-value">
                {stats.loading ? '—' : stats.mistakesCount}
              </div>
              <div className="home-stat-sub">道待复习</div>
            </div>
          </button>

          {/* Card 2: 问题讨论 */}
          <button className="home-stat-card" onClick={() => navigate('/notebook')}>
            <div className="home-stat-icon">💬</div>
            <div className="home-stat-body">
              <div className="home-stat-label">问题讨论</div>
              {stats.notebookUnread.length > 0
                ? <div className="home-stat-value home-stat-value--highlight">{stats.notebookUnread.length}</div>
                : <div className="home-stat-value">{stats.todayDiscussions}</div>
              }
              <div className="home-stat-sub">
                {stats.notebookUnread.length > 0
                  ? `${stats.notebookUnread.slice(0, 2).join('/')} 有新回复`
                  : stats.todayDiscussions > 0 ? '今日提问' : '暂无新回复'}
              </div>
            </div>
          </button>

          {/* Card 3: 单词记忆 */}
          <button className="home-stat-card" onClick={() => navigate('/english')}>
            <div className="home-stat-icon">📖</div>
            <div className="home-stat-body">
              <div className="home-stat-label">单词记忆</div>
              <div className="home-stat-value">{stats.srsWordsToday}</div>
              <div className="home-stat-sub">今日已背（词）</div>
            </div>
          </button>

          {/* Card 4: AI练习 / 写作 */}
          <button className="home-stat-card" onClick={() => navigate('/english')}>
            <div className="home-stat-icon">🧠</div>
            <div className="home-stat-body">
              <div className="home-stat-label">AI 练习</div>
              <div className="home-stat-value">{stats.exercisesToday + stats.writingToday}</div>
              <div className="home-stat-sub">今日完成（题/篇）</div>
            </div>
          </button>
        </div>
      </section>

      {/* ── 成就入口 ── */}
      <section className="home-section home-section--achievements">
        <div className="home-ach-row">
          <div className="home-ach-info">
            <div className="home-ach-title">🏆 成就</div>
            <div className="home-ach-streak">
              {stats.streak.currentStreak > 0
                ? `连续打卡 ${stats.streak.currentStreak} 天`
                : '今天还没打卡，快来学习吧！'}
            </div>
          </div>
          <button className="home-ach-link" onClick={() => navigate('/achievements')}>
            查看全部 →
          </button>
        </div>
      </section>

      {/* ── 从哪里开始 ── */}
      <section className="home-section">
        <div className="home-section-head">
          <div>
            <h2 className="home-section-title">从哪里开始</h2>
            <p className="home-section-subtitle">把最重要的学习入口放在最前面，减少每次打开时的犹豫。</p>
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

      {/* ── 学习工具 ── */}
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

      {/* ── 按学科继续 ── */}
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
    </div>
  )
}
