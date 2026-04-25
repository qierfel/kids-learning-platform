import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllActivityDates } from '../utils/activityLogger'
import { getStreakInfo, trackDailyVisit, getTodayMinutes } from '../utils/sessionTracker'
import { computeAchievementStats, getAchievementState } from '../utils/checkAchievements'
import { ACHIEVEMENTS } from '../data/achievements'
import './Achievements.css'

const CATEGORY_LABELS = {
  streak:   '坚持打卡',
  words:    '单词积累',
  mistakes: '错题掌握',
  time:     '学习时长',
  exercise: '练习达人',
}

const CONDITION_UNIT = {
  streak:            '天',
  total_words:       '词',
  mastered_mistakes: '道',
  total_minutes:     '分钟',
  total_exercises:   '道',
}

function getProgressValue(condition, stats) {
  switch (condition.type) {
    case 'login_count':       return stats.hasLoggedIn ? 1 : 0
    case 'streak':            return stats.streak || 0
    case 'total_words':       return stats.totalWords || 0
    case 'mastered_mistakes': return stats.masteredMistakes || 0
    case 'total_minutes':     return Math.round(stats.totalMinutes || 0)
    case 'total_exercises':   return stats.totalExercises || 0
    default:                  return 0
  }
}

// Build calendar cells for the current month
function buildCalendar(activityDates) {
  const dateSet = new Set(activityDates)
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDow = (firstDay.getDay() + 6) % 7 // 0=Mon
  const cells = []
  for (let i = 0; i < startDow; i++) cells.push(null)
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    cells.push({
      day: d, dateStr,
      isToday: dateStr === today.toISOString().slice(0, 10),
      hasActivity: dateSet.has(dateStr),
    })
  }
  return { cells, monthLabel: `${year}年${month + 1}月` }
}

const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日']

// Group badges by category, preserving order within each group
function groupBadges() {
  const order = ['streak', 'words', 'mistakes', 'time', 'exercise']
  const groups = {}
  for (const cat of order) groups[cat] = []
  for (const a of ACHIEVEMENTS) {
    if (groups[a.category]) groups[a.category].push(a)
  }
  return order.map(cat => ({ cat, label: CATEGORY_LABELS[cat], items: groups[cat] }))
}

export default function Achievements({ user }) {
  const navigate = useNavigate()
  const [activityDates, setActivityDates] = useState([])
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0 })
  const [achStats, setAchStats] = useState(null)
  const [unlockedIds, setUnlockedIds] = useState(new Set())
  const [todayMin, setTodayMin] = useState(0)

  useEffect(() => {
    if (!user?.uid) return
    trackDailyVisit(user.uid)
    setActivityDates(getAllActivityDates(user.uid))
    setStreak(getStreakInfo(user.uid))
    setTodayMin(getTodayMinutes(user.uid))

    const stats = computeAchievementStats(user.uid)
    setAchStats(stats)
    const achState = getAchievementState(user.uid)
    setUnlockedIds(new Set(achState.unlockedIds || []))
  }, [user?.uid])

  const { cells, monthLabel } = buildCalendar(activityDates)
  const badgeGroups = groupBadges()
  const todayH = Math.floor(todayMin / 60)
  const todayM = Math.round(todayMin % 60)

  return (
    <div className="achievements">
      <div className="ach-header">
        <button className="ach-back-btn" onClick={() => navigate('/')}>← 返回首页</button>
        <h1 className="ach-title">我的成就</h1>
      </div>

      {/* Learning calendar */}
      <section className="ach-section">
        <div className="ach-section-title">学习日历</div>

        <div className="ach-calendar">
          <div className="ach-cal-month">{monthLabel}</div>
          <div className="ach-cal-grid">
            {WEEKDAYS.map(w => (
              <div key={w} className="ach-cal-weekday">{w}</div>
            ))}
            {cells.map((cell, i) =>
              cell === null
                ? <div key={`e-${i}`} className="ach-cal-cell ach-cal-cell--empty" />
                : (
                  <div
                    key={cell.dateStr}
                    className={[
                      'ach-cal-cell',
                      cell.hasActivity ? 'ach-cal-cell--active' : '',
                      cell.isToday ? 'ach-cal-cell--today' : '',
                    ].filter(Boolean).join(' ')}
                    title={cell.dateStr}
                  >
                    {cell.day}
                  </div>
                )
            )}
          </div>
        </div>

        <div className="ach-streak-row">
          <div className="ach-streak-card">
            <div className="ach-streak-num">{streak.currentStreak}</div>
            <div className="ach-streak-label">连续打卡（天）</div>
          </div>
          <div className="ach-streak-card">
            <div className="ach-streak-num">{streak.longestStreak}</div>
            <div className="ach-streak-label">历史最长（天）</div>
          </div>
          <div className="ach-streak-card">
            <div className="ach-streak-num">{activityDates.length}</div>
            <div className="ach-streak-label">累计打卡（天）</div>
          </div>
        </div>
      </section>

      {/* Today's summary */}
      {achStats && (
        <section className="ach-section">
          <div className="ach-section-title">今日学习</div>
          <div className="ach-summary-row">
            <div className="ach-summary-card">
              <div className="ach-summary-val">
                {todayH > 0 ? `${todayH}h ` : ''}{todayM}min
              </div>
              <div className="ach-summary-label">有效学习时长</div>
            </div>
            <div className="ach-summary-card">
              <div className="ach-summary-val">{achStats.totalWords}</div>
              <div className="ach-summary-label">累计背单词</div>
            </div>
            <div className="ach-summary-card">
              <div className="ach-summary-val">{achStats.totalExercises}</div>
              <div className="ach-summary-label">累计完成练习</div>
            </div>
            <div className="ach-summary-card">
              <div className="ach-summary-val">{achStats.masteredMistakes}</div>
              <div className="ach-summary-label">掌握错题</div>
            </div>
          </div>
        </section>
      )}

      {/* Badge wall */}
      <section className="ach-section">
        <div className="ach-section-title">勋章墙</div>
        {badgeGroups.map(({ cat, label, items }) => (
          <div key={cat} className="ach-badge-group">
            <div className="ach-badge-group-label">{label}</div>
            <div className="ach-badge-list">
              {items.map(badge => {
                const unlocked = unlockedIds.has(badge.id)
                const current = achStats ? getProgressValue(badge.condition, achStats) : 0
                const target = badge.condition.value
                const unit = CONDITION_UNIT[badge.condition.type] || ''
                const pct = badge.condition.type === 'login_count'
                  ? (unlocked ? 100 : 0)
                  : Math.min(100, Math.round((current / target) * 100))

                return (
                  <div
                    key={badge.id}
                    className={`ach-badge-item ${unlocked ? 'ach-badge-item--unlocked' : 'ach-badge-item--locked'}`}
                  >
                    <div className="ach-badge-icon">{badge.icon}</div>
                    <div className="ach-badge-info">
                      <div className="ach-badge-name">{badge.label}</div>
                      <div className="ach-badge-desc">{badge.desc}</div>
                      {!unlocked && badge.condition.type !== 'login_count' && (
                        <>
                          <div className="ach-badge-prog-bar">
                            <div className="ach-badge-prog-fill" style={{ width: `${pct}%` }} />
                          </div>
                          <div className="ach-badge-prog-text">
                            {current} / {target} {unit}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="ach-badge-status">
                      {unlocked ? '✅' : '🔒'}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
