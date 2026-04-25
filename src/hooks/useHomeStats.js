import { useState, useEffect, useCallback } from 'react'
import { calcTodayStats } from '../utils/activityLogger'
import { getStreakInfo } from '../utils/sessionTracker'
import { checkAndUpdateAchievements, getAchievementState, markNotified as _markNotified } from '../utils/checkAchievements'
import { ACHIEVEMENTS } from '../data/achievements'

const READ_MARKS_KEY = uid => `notebook_read_marks_${uid}`
const WRITING_KEY = 'essay_correct_history'

function getToken() { return localStorage.getItem('session_token') }

export function useHomeStats(user) {
  const uid = user?.uid
  const [stats, setStats] = useState({
    loading: true,
    mistakesCount: 0,
    notebookUnread: [],
    todayDiscussions: 0,
    srsWordsToday: 0,
    exercisesToday: 0,
    writingToday: 0,
    streak: { currentStreak: 0, longestStreak: 0 },
    pendingNotifications: [],  // unlocked IDs not yet shown as modal
    recentBadges: [],          // last 1-3 unlocked badge objects
  })

  useEffect(() => {
    if (!uid) return
    load(uid)
  }, [uid])

  function load(userId) {
    // 1. Local activity log stats (synchronous)
    const act = calcTodayStats(userId)

    // 2. Writing history — read directly for accuracy
    let writingToday = act.writingSubmits
    try {
      const hist = JSON.parse(localStorage.getItem(WRITING_KEY)) || []
      const zhToday = new Date().toLocaleDateString('zh-CN')
      writingToday = Math.max(writingToday, hist.filter(h => h.date === zhToday).length)
    } catch {}

    const streak = getStreakInfo(userId)

    // 3. Check achievements and compute pending notifications
    checkAndUpdateAchievements(userId)
    const achState = getAchievementState(userId)
    const notifiedSet = new Set(achState.notifiedIds || [])
    const pendingNotifications = (achState.unlockedIds || []).filter(id => !notifiedSet.has(id))
    const recentBadges = (achState.recentlyUnlocked || [])
      .sort((a, b) => b.unlockedAt - a.unlockedAt)
      .slice(0, 3)
      .map(r => ACHIEVEMENTS.find(a => a.id === r.id))
      .filter(Boolean)

    setStats({
      loading: false,
      mistakesCount: 0,
      notebookUnread: [],
      todayDiscussions: act.discussionAsks,
      srsWordsToday: act.srsWords,
      exercisesToday: act.exercises,
      writingToday,
      streak,
      pendingNotifications,
      recentBadges,
    })

    const token = getToken()
    if (!token) return

    // 4. Mistakes from KV
    fetch('/api/mistakes-api', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action: 'list', token }),
    })
      .then(r => r.json())
      .then(data => {
        const pending = (data.mistakes || []).filter(m => m.status !== 'mastered').length
        const mastered = (data.mistakes || []).filter(m => m.status === 'mastered').length
        // Cache mastered count for achievement checks
        try {
          localStorage.setItem(`mistakes_stats_${userId}`, JSON.stringify({ mastered }))
        } catch {}
        setStats(s => ({ ...s, mistakesCount: pending }))
      })
      .catch(() => {})

    // 5. Notebook threads — unread AI replies + today's discussions
    fetch('/api/threads', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action: 'list', token }),
    })
      .then(r => r.json())
      .then(data => {
        const threads = data.threads || []
        let readMarks = {}
        try { readMarks = JSON.parse(localStorage.getItem(READ_MARKS_KEY(userId))) || {} } catch {}

        const today = new Date().toISOString().slice(0, 10)
        let todayDiscussions = act.discussionAsks
        const unreadSubjects = new Set()

        for (const thread of threads) {
          if (thread.createdAt) {
            const d = new Date(thread.createdAt).toISOString().slice(0, 10)
            if (d === today) todayDiscussions++
          }
          const msgs = thread.messages || []
          const last = msgs[msgs.length - 1]
          if (!last || last.role !== 'ai') continue
          const lastTime = last.time || thread.updatedAt || 0
          if (lastTime > (readMarks[thread.id] || 0)) {
            unreadSubjects.add(thread.subject || '未知')
          }
        }

        setStats(s => ({
          ...s,
          notebookUnread: [...unreadSubjects],
          todayDiscussions: Math.max(s.todayDiscussions, todayDiscussions),
        }))
      })
      .catch(() => {})
  }

  const markNotified = useCallback((ids) => {
    if (!uid || !ids.length) return
    _markNotified(uid, ids)
    setStats(s => ({
      ...s,
      pendingNotifications: s.pendingNotifications.filter(id => !ids.includes(id)),
    }))
  }, [uid])

  return { ...stats, markNotified }
}
