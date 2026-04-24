import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllActivityDates } from '../utils/activityLogger'
import { getStreakInfo, trackDailyVisit } from '../utils/sessionTracker'
import './Achievements.css'

// Build an array of {date, hasActivity} for the current month
function buildCalendar(activityDates) {
  const dateSet = new Set(activityDates)
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() // 0-indexed

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  // Pad start to Monday (0=Sun → adjust)
  const startDow = (firstDay.getDay() + 6) % 7 // 0=Mon
  const cells = []
  for (let i = 0; i < startDow; i++) cells.push(null) // empty cells before month start
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const todayStr = today.toISOString().slice(0, 10)
    cells.push({ day: d, dateStr, isToday: dateStr === todayStr, hasActivity: dateSet.has(dateStr) })
  }
  return { cells, monthLabel: `${year}年${month + 1}月` }
}

const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日']

export default function Achievements({ user }) {
  const navigate = useNavigate()
  const [activityDates, setActivityDates] = useState([])
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0 })

  useEffect(() => {
    if (!user?.uid) return
    trackDailyVisit(user.uid)
    const dates = getAllActivityDates(user.uid)
    setActivityDates(dates)
    setStreak(getStreakInfo(user.uid))
  }, [user?.uid])

  const { cells, monthLabel } = buildCalendar(activityDates)

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
                ? <div key={`empty-${i}`} className="ach-cal-cell ach-cal-cell--empty" />
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

      {/* Badges — Phase 2 placeholder */}
      <section className="ach-section">
        <div className="ach-section-title">勋章墙 <span className="ach-coming-soon">（第二期上线）</span></div>
        <div className="ach-badge-placeholder">
          坚持打卡、背单词、复习错题，解锁专属勋章。
        </div>
      </section>
    </div>
  )
}
