import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useHomeStats } from '../hooks/useHomeStats'
import { usePlan } from '../hooks/usePlan'
import { trackDailyVisit } from '../utils/sessionTracker'
import { ACHIEVEMENTS } from '../data/achievements'
import './Home.css'

const FEATURED_TRACKS = [
  {
    path: '/chinese',
    title: '小学学习馆',
    subtitle: '语文、数学、英语一起学',
    description: '语文、数学、英语的常用入口。',
    icon: '/icons/generated/elementary-icon.png',
    tone: 'elementary',
    tag: '日常学习',
  },
  {
    path: '/coding',
    title: 'AI 编程创作屋',
    subtitle: '做网页、做小工具、做自己的作品',
    description: '做网页、做小工具、继续你的项目。',
    icon: '/icons/generated/ai-coding-icon.png',
    tone: 'coding',
    tag: '项目制作',
  },
  {
    path: '/physics',
    title: '初中探索站',
    subtitle: '物理、化学、历史、地理',
    description: '适合进阶阅读和学科探索。',
    icon: '/icons/generated/junior-icon.png',
    tone: 'junior',
    tag: '进阶探索',
  },
]

const QUICK_TOOLS = [
  {
    path: '/mistakes',
    label: '错题本',
    description: '把错题留下来，回头复习更方便。',
    icon: '/icons/generated/mistakes-icon.png',
  },
  {
    path: '/notebook',
    label: '问题讨论',
    description: '把问题记下来，继续追问和讨论。',
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

const STAT_CARDS = [
  { key: 'mistakes', path: '/mistakes', label: '错题本',   icon: '/icons/generated/mistakes-icon.png',   sub: '道待复习' },
  { key: 'notebook', path: '/notebook', label: '问题讨论', icon: '/icons/generated/discussion-icon.png' },
  { key: 'words',    path: '/english',  label: '单词记忆', icon: '/icons/generated/english-icon.png',    sub: '今日已背（词）' },
  { key: 'ai',       path: '/coding',   label: 'AI 练习',  icon: '/icons/generated/ai-coding-icon.png',  sub: '今日完成（题/篇）' },
]

function PlanProgressRow({ label, plan, onClick }) {
  return (
    <button className="home-plan-row" onClick={onClick}>
      <span className="home-plan-row-label">{label}</span>
      <div className="home-plan-bar-wrap">
        <div className="home-plan-bar-fill" style={{ width: `${plan.pct}%` }} />
      </div>
      <span className="home-plan-pct">{plan.pct}%</span>
      <span className="home-plan-count">{plan.doneCount}/{plan.totalCount} 项</span>
    </button>
  )
}

export default function Home({ user }) {
  const navigate = useNavigate()
  const stats = useHomeStats(user)
  const plan = usePlan(user)

  // Celebration modal state — show first pending notification
  const [modalBadge, setModalBadge] = useState(null)

  useEffect(() => {
    if (user?.uid) trackDailyVisit(user.uid)
  }, [user?.uid])

  // Pop up the first pending notification once stats load
  useEffect(() => {
    if (!stats.loading && stats.pendingNotifications?.length > 0 && !modalBadge) {
      const id = stats.pendingNotifications[0]
      const badge = ACHIEVEMENTS.find(a => a.id === id)
      if (badge) setModalBadge(badge)
    }
  }, [stats.loading, stats.pendingNotifications])

  function closeModal() {
    if (modalBadge) {
      stats.markNotified([modalBadge.id])
      setModalBadge(null)
    }
  }

  const name = user?.nickname || '同学'
  const hasPlan = plan.todayPlan || plan.weekPlan

  return (
    <div className="home">
      {/* Achievement unlock modal */}
      {modalBadge && (
        <div className="home-ach-modal-overlay" onClick={closeModal}>
          <div className="home-ach-modal" onClick={e => e.stopPropagation()}>
            <div className="home-ach-modal-shine" />
            <div className="home-ach-modal-icon">{modalBadge.icon}</div>
            <div className="home-ach-modal-kicker">成就解锁！</div>
            <div className="home-ach-modal-name">{modalBadge.label}</div>
            <div className="home-ach-modal-desc">{modalBadge.desc}</div>
            <button className="home-ach-modal-btn" onClick={closeModal}>太棒了！</button>
          </div>
        </div>
      )}

      {/* Greeting bar */}
      <div className="home-greeting">
        <div>
          <span className="home-greeting-text">{getGreeting()}，{name}！</span>
          <span className="home-greeting-date">{todayLabel()}</span>
        </div>
      </div>

      {/* ── 学习计划 ── */}
      <section className="home-section home-section--plan">
        <div className="home-section-head">
          <div>
            <h2 className="home-section-title">学习计划</h2>
            <p className="home-section-subtitle">
              {hasPlan ? '点击进入计划详情或修改。' : '制定今日或本周计划，轻松追踪进度。'}
            </p>
          </div>
          <button className="home-plan-edit-btn" onClick={() => navigate('/plan')}>
            {hasPlan ? '修改 →' : '制定计划 →'}
          </button>
        </div>

        {hasPlan ? (
          <div className="home-plan-rows">
            {plan.todayPlan && (
              <PlanProgressRow label="今日" plan={plan.todayPlan} onClick={() => navigate('/plan')} />
            )}
            {plan.weekPlan && (
              <PlanProgressRow label="本周" plan={plan.weekPlan} onClick={() => navigate('/plan')} />
            )}
          </div>
        ) : (
          <div className="home-plan-empty">
            还没有学习计划 — 点击「制定计划」设定今天想完成的内容。
          </div>
        )}
      </section>

      {/* ── 今日学习状态 ── */}
      <section className="home-section home-section--stats">
        <div className="home-section-head">
          <div>
            <h2 className="home-section-title">今日学习状态</h2>
            <p className="home-section-subtitle">看看今天已经完成了多少。</p>
          </div>
        </div>

        <div className="home-stats-grid">
          <button className="home-stat-card" onClick={() => navigate(STAT_CARDS[0].path)}>
            <div className="home-stat-icon-wrap">
              <img src={STAT_CARDS[0].icon} alt={STAT_CARDS[0].label} className="home-stat-icon" />
            </div>
            <div className="home-stat-body">
              <div className="home-stat-label">{STAT_CARDS[0].label}</div>
              <div className="home-stat-value">{stats.loading ? '—' : stats.mistakesCount}</div>
              <div className="home-stat-sub">{STAT_CARDS[0].sub}</div>
            </div>
          </button>

          <button className="home-stat-card" onClick={() => navigate(STAT_CARDS[1].path)}>
            <div className="home-stat-icon-wrap">
              <img src={STAT_CARDS[1].icon} alt={STAT_CARDS[1].label} className="home-stat-icon" />
            </div>
            <div className="home-stat-body">
              <div className="home-stat-label">{STAT_CARDS[1].label}</div>
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

          <button className="home-stat-card" onClick={() => navigate(STAT_CARDS[2].path)}>
            <div className="home-stat-icon-wrap">
              <img src={STAT_CARDS[2].icon} alt={STAT_CARDS[2].label} className="home-stat-icon" />
            </div>
            <div className="home-stat-body">
              <div className="home-stat-label">{STAT_CARDS[2].label}</div>
              <div className="home-stat-value">{stats.srsWordsToday}</div>
              <div className="home-stat-sub">{STAT_CARDS[2].sub}</div>
            </div>
          </button>

          <button className="home-stat-card" onClick={() => navigate(STAT_CARDS[3].path)}>
            <div className="home-stat-icon-wrap">
              <img src={STAT_CARDS[3].icon} alt={STAT_CARDS[3].label} className="home-stat-icon" />
            </div>
            <div className="home-stat-body">
              <div className="home-stat-label">{STAT_CARDS[3].label}</div>
              <div className="home-stat-value">{stats.exercisesToday + stats.writingToday}</div>
              <div className="home-stat-sub">{STAT_CARDS[3].sub}</div>
            </div>
          </button>
        </div>
      </section>

      {/* ── 成就入口 ── */}
      <section className="home-section home-section--achievements">
        <div className="home-ach-row">
          <div className="home-ach-info">
            <div className="home-ach-kicker">Achievement</div>
            <div className="home-ach-title">学习成就</div>
            <div className="home-ach-streak">
              {stats.streak.currentStreak > 0
                ? `连续打卡 ${stats.streak.currentStreak} 天`
                : '今天还没打卡，快来学习吧！'}
            </div>
          </div>
          <div className="home-ach-side">
            <div className="home-ach-badge">
              {stats.streak.currentStreak > 0 ? `${stats.streak.currentStreak} Day Streak` : 'Start Today'}
            </div>
            <button className="home-ach-link" onClick={() => navigate('/achievements')}>
              查看全部 →
            </button>
          </div>
        </div>

        {/* Recent unlocked badges */}
        {stats.recentBadges.length > 0 && (
          <div className="home-recent-badges">
            {stats.recentBadges.map(badge => (
              <div key={badge.id} className="home-recent-badge">
                <span className="home-recent-badge-icon">{badge.icon}</span>
                <span className="home-recent-badge-label">{badge.label}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── 从哪里开始 ── */}
      <section className="home-section">
        <div className="home-section-head">
          <div>
            <h2 className="home-section-title">从哪里开始</h2>
            <p className="home-section-subtitle">选一个入口，直接继续。</p>
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
            <p className="home-section-subtitle">常用工具放在这里，打开就能用。</p>
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
