// Session tracking for streak calculation and daily visit marking
import { getAllActivityDates, logActivity } from './activityLogger'

function getUid(userId) {
  return userId || localStorage.getItem('user_uid') || null
}

// Call once per page load to mark today as an active day
export function trackDailyVisit(userId) {
  const uid = getUid(userId)
  if (!uid) return
  const visitKey = `daily_visit_${uid}`
  const today = new Date().toISOString().slice(0, 10)
  if (localStorage.getItem(visitKey) !== today) {
    localStorage.setItem(visitKey, today)
    logActivity(uid, { type: 'daily_visit', subject: null, moduleKey: 'visit', count: 1 })
  }
}

export function getStreakInfo(userId) {
  const uid = getUid(userId)
  const dates = getAllActivityDates(uid)
  if (!dates.length) return { currentStreak: 0, longestStreak: 0, lastActiveDate: null }

  const sorted = [...new Set(dates)].sort()
  const today = new Date().toISOString().slice(0, 10)
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  const dateSet = new Set(sorted)

  // Current streak: walk backward from today (or yesterday if today not yet logged)
  let currentStreak = 0
  let cursor = dateSet.has(today) ? today : (dateSet.has(yesterday) ? yesterday : null)
  if (cursor) {
    let d = new Date(cursor)
    while (dateSet.has(d.toISOString().slice(0, 10))) {
      currentStreak++
      d = new Date(d.getTime() - 86400000)
    }
  }

  // Longest streak: scan sorted array
  let longest = currentStreak
  let run = 1
  for (let i = 1; i < sorted.length; i++) {
    const diffDays = (new Date(sorted[i]) - new Date(sorted[i - 1])) / 86400000
    if (diffDays === 1) { run++; if (run > longest) longest = run }
    else run = 1
  }

  return { currentStreak, longestStreak: longest, lastActiveDate: sorted[sorted.length - 1] }
}
