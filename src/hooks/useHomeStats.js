import { useState, useEffect } from 'react'
import { calcTodayStats } from '../utils/activityLogger'
import { getStreakInfo } from '../utils/sessionTracker'

const READ_MARKS_KEY = uid => `notebook_read_marks_${uid}`
const WRITING_KEY = 'essay_correct_history'

function getToken() { return localStorage.getItem('session_token') }

export function useHomeStats(user) {
  const uid = user?.uid
  const [stats, setStats] = useState({
    loading: true,
    mistakesCount: 0,
    notebookUnread: [],   // subjects with unread AI replies
    todayDiscussions: 0,
    srsWordsToday: 0,
    exercisesToday: 0,
    writingToday: 0,
    streak: { currentStreak: 0, longestStreak: 0 },
  })

  useEffect(() => {
    if (!uid) return
    load(uid)
  }, [uid])

  function load(userId) {
    // 1. Local activity log stats (synchronous)
    const act = calcTodayStats(userId)

    // 2. Writing history — read directly for accuracy (key predates activityLog)
    let writingToday = act.writingSubmits
    try {
      const hist = JSON.parse(localStorage.getItem(WRITING_KEY)) || []
      const zhToday = new Date().toLocaleDateString('zh-CN') // "2026/4/24"
      writingToday = Math.max(writingToday, hist.filter(h => h.date === zhToday).length)
    } catch {}

    const streak = getStreakInfo(userId)

    // Set local data immediately, then update with KV data below
    setStats({
      loading: false,
      mistakesCount: 0,
      notebookUnread: [],
      todayDiscussions: act.discussionAsks,
      srsWordsToday: act.srsWords,
      exercisesToday: act.exercises,
      writingToday,
      streak,
    })

    const token = getToken()
    if (!token) return

    // 3. Mistakes from KV — pending count (new + reviewing)
    fetch('/api/mistakes-api', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action: 'list', token }),
    })
      .then(r => r.json())
      .then(data => {
        const pending = (data.mistakes || []).filter(m => m.status !== 'mastered').length
        setStats(s => ({ ...s, mistakesCount: pending }))
      })
      .catch(() => {})

    // 4. Notebook threads — find unread AI replies and today's discussion count
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
        // Start with what activityLog already counted (from sendMessage hooks)
        let todayDiscussions = act.discussionAsks
        const unreadSubjects = new Set()

        for (const thread of threads) {
          // Count threads created today that weren't yet logged
          if (thread.createdAt) {
            const d = new Date(thread.createdAt).toISOString().slice(0, 10)
            if (d === today) todayDiscussions++
          }
          // Find threads where last message is AI and user hasn't read it yet
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
          // Only use KV count if it's larger (avoids double-counting with activityLog)
          todayDiscussions: Math.max(s.todayDiscussions, todayDiscussions),
        }))
      })
      .catch(() => {})
  }

  return stats
}
