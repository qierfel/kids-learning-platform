// Session tracking: streak calculation, daily visit marking, interaction-based time tracking
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

// ── Interaction-based time tracking ────────────────────────────────────────
// Time is only counted when the user is actively interacting with the page.
// A heartbeat fires every 30s; if last interaction was < 3 min ago, add 0.5 min.

const TIME_LOG_KEY = uid => `time_log_${uid}`
const IDLE_THRESHOLD = 3 * 60 * 1000  // 3 minutes
const HEARTBEAT_MS = 30_000           // 30 seconds → 0.5 min per tick
const MAX_DAYS = 90

let _uid = null
let _lastInteraction = 0
let _heartbeatInterval = null

function onInteraction() {
  _lastInteraction = Date.now()
}

function addMinutes(uid, minutes) {
  const today = new Date().toISOString().slice(0, 10)
  let log
  try { log = JSON.parse(localStorage.getItem(TIME_LOG_KEY(uid))) || [] } catch { log = [] }

  let entry = log.find(d => d.date === today)
  if (!entry) { entry = { date: today, minutes: 0 }; log.push(entry) }
  entry.minutes = Math.round(((entry.minutes || 0) + minutes) * 10) / 10

  log.sort((a, b) => a.date.localeCompare(b.date))
  if (log.length > MAX_DAYS) log = log.slice(-MAX_DAYS)
  try { localStorage.setItem(TIME_LOG_KEY(uid), JSON.stringify(log)) } catch {}
}

function heartbeat() {
  if (!_uid) return
  if (Date.now() - _lastInteraction < IDLE_THRESHOLD) {
    addMinutes(_uid, 0.5) // 0.5 min per 30-second heartbeat
  }
}

export function initTimeTracking(userId) {
  const uid = getUid(userId)
  if (!uid) return
  _uid = uid
  _lastInteraction = Date.now()

  if (_heartbeatInterval) clearInterval(_heartbeatInterval)
  _heartbeatInterval = setInterval(heartbeat, HEARTBEAT_MS)

  document.addEventListener('click', onInteraction, { passive: true })
  document.addEventListener('keydown', onInteraction, { passive: true })
  document.addEventListener('scroll', onInteraction, { passive: true })
  document.addEventListener('touchstart', onInteraction, { passive: true })
}

export function cleanupTimeTracking() {
  if (_heartbeatInterval) { clearInterval(_heartbeatInterval); _heartbeatInterval = null }
  document.removeEventListener('click', onInteraction)
  document.removeEventListener('keydown', onInteraction)
  document.removeEventListener('scroll', onInteraction)
  document.removeEventListener('touchstart', onInteraction)
  _uid = null
}

export function getTodayMinutes(userId) {
  const uid = getUid(userId)
  if (!uid) return 0
  const today = new Date().toISOString().slice(0, 10)
  try {
    const log = JSON.parse(localStorage.getItem(TIME_LOG_KEY(uid))) || []
    return log.find(d => d.date === today)?.minutes || 0
  } catch { return 0 }
}

export function getTotalMinutes(userId) {
  const uid = getUid(userId)
  if (!uid) return 0
  try {
    const log = JSON.parse(localStorage.getItem(TIME_LOG_KEY(uid))) || []
    return log.reduce((sum, d) => sum + (d.minutes || 0), 0)
  } catch { return 0 }
}
