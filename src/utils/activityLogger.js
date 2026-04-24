// Activity logging for home page stats and streak tracking
// localStorage key: activity_log_{userId}

const logKey = uid => `activity_log_${uid}`
const MAX_DAYS = 90

function todayDate() {
  return new Date().toISOString().slice(0, 10) // YYYY-MM-DD
}

function getUid(userId) {
  return userId || localStorage.getItem('user_uid') || null
}

export function logActivity(userId, event) {
  const uid = getUid(userId)
  if (!uid) return

  const key = logKey(uid)
  let logs
  try { logs = JSON.parse(localStorage.getItem(key)) || [] } catch { logs = [] }

  const dateStr = todayDate()
  let day = logs.find(d => d.date === dateStr)
  if (!day) {
    day = { date: dateStr, events: [] }
    logs.push(day)
  }

  day.events.push({ ...event, timestamp: Date.now() })

  // Prune to MAX_DAYS, keeping most recent
  logs.sort((a, b) => a.date.localeCompare(b.date))
  if (logs.length > MAX_DAYS) logs = logs.slice(-MAX_DAYS)

  try { localStorage.setItem(key, JSON.stringify(logs)) } catch {}
}

export function getActivityForDate(userId, date) {
  const uid = getUid(userId)
  if (!uid) return { date, events: [] }
  try {
    const logs = JSON.parse(localStorage.getItem(logKey(uid))) || []
    return logs.find(d => d.date === date) || { date, events: [] }
  } catch { return { date, events: [] } }
}

export function getAllActivityDates(userId) {
  const uid = getUid(userId)
  if (!uid) return []
  try {
    const logs = JSON.parse(localStorage.getItem(logKey(uid))) || []
    return logs.filter(d => d.events.length > 0).map(d => d.date)
  } catch { return [] }
}

export function calcTodayStats(userId) {
  const day = getActivityForDate(userId, todayDate())
  const result = {
    srsWords: 0,
    exercises: 0,
    mistakeReviews: 0,
    discussionAsks: 0,
    writingSubmits: 0,
  }
  for (const e of day.events) {
    switch (e.type) {
      case 'srs_review':
      case 'srs_new_word':
        result.srsWords += e.count || 0
        break
      case 'arithmetic_drill':
      case 'word_quiz':
      case 'dictation_session':
        result.exercises += e.count || 0
        break
      case 'mistake_review':
        result.mistakeReviews += e.count || 0
        break
      case 'discussion_ask':
        result.discussionAsks += e.count || 0
        break
      case 'writing_submit':
        result.writingSubmits += e.count || 0
        break
    }
  }
  return result
}
