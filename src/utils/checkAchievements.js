// Achievement state management: compute stats, check unlocks, manage notifications
import { ACHIEVEMENTS, checkUnlocked } from '../data/achievements'
import { getStreakInfo } from './sessionTracker'

const ACHIEV_KEY = uid => `achievements_${uid}`

function getUid(userId) {
  return userId || localStorage.getItem('user_uid') || null
}

// Compute achievement-relevant stats from localStorage
export function computeAchievementStats(userId) {
  const uid = getUid(userId)
  const streak = getStreakInfo(uid)

  // Count reviewed SRS words across all levels by scanning localStorage keys
  let totalWords = 0
  try {
    const prefix = `srs_${uid}_`
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(prefix)) {
        const data = JSON.parse(localStorage.getItem(key))
        if (data?.progress) {
          totalWords += Object.values(data.progress).filter(c => (c.reps || 0) > 0).length
        }
      }
    }
  } catch {}

  // Count exercises from activity log (all-time)
  let totalExercises = 0
  try {
    const actLog = JSON.parse(localStorage.getItem(`activity_log_${uid}`)) || []
    for (const day of actLog) {
      for (const event of (day.events || [])) {
        if (['arithmetic_drill', 'word_quiz', 'dictation_session'].includes(event.type)) {
          totalExercises += event.count || 0
        }
      }
    }
  } catch {}

  // Mastered mistakes from locally-cached stat
  let masteredMistakes = 0
  try {
    const cached = JSON.parse(localStorage.getItem(`mistakes_stats_${uid}`))
    if (cached?.mastered) masteredMistakes = cached.mastered
  } catch {}

  // Total effective learning minutes from time_log
  let totalMinutes = 0
  try {
    const timeLog = JSON.parse(localStorage.getItem(`time_log_${uid}`)) || []
    for (const day of timeLog) totalMinutes += day.minutes || 0
  } catch {}

  return {
    hasLoggedIn: true,
    streak: streak.currentStreak,
    totalWords,
    masteredMistakes,
    totalMinutes,
    totalExercises,
  }
}

export function getAchievementState(userId) {
  const uid = getUid(userId)
  if (!uid) return { unlockedIds: [], notifiedIds: [], recentlyUnlocked: [] }
  try {
    return JSON.parse(localStorage.getItem(ACHIEV_KEY(uid))) || { unlockedIds: [], notifiedIds: [], recentlyUnlocked: [] }
  } catch {
    return { unlockedIds: [], notifiedIds: [], recentlyUnlocked: [] }
  }
}

function saveAchievementState(userId, state) {
  const uid = getUid(userId)
  if (!uid) return
  try { localStorage.setItem(ACHIEV_KEY(uid), JSON.stringify(state)) } catch {}
}

// Call after each logActivity. Returns array of newly unlocked achievement IDs.
export function checkAndUpdateAchievements(userId) {
  const uid = getUid(userId)
  if (!uid) return []

  const stats = computeAchievementStats(uid)
  const currentUnlocked = checkUnlocked(stats)
  const state = getAchievementState(uid)

  const prevSet = new Set(state.unlockedIds || [])
  const newlyUnlocked = currentUnlocked.filter(id => !prevSet.has(id))

  if (newlyUnlocked.length > 0 || currentUnlocked.length !== prevSet.size) {
    const now = Date.now()
    const recentlyUnlocked = [
      ...(state.recentlyUnlocked || []),
      ...newlyUnlocked.map(id => ({ id, unlockedAt: now })),
    ].slice(-10)
    saveAchievementState(uid, { ...state, unlockedIds: currentUnlocked, recentlyUnlocked })
  }

  return newlyUnlocked
}

export function markNotified(userId, achievementIds) {
  const uid = getUid(userId)
  if (!uid || !achievementIds.length) return
  const state = getAchievementState(uid)
  const notifiedSet = new Set([...(state.notifiedIds || []), ...achievementIds])
  saveAchievementState(uid, { ...state, notifiedIds: [...notifiedSet] })
}
