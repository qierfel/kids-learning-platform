import { useState, useEffect, useCallback } from 'react'

const PLAN_KEY = uid => `learning_plans_${uid}`

function today() { return new Date().toISOString().slice(0, 10) }

function getWeekRange(date = new Date()) {
  const d = new Date(date)
  const dow = d.getDay()
  const diff = dow === 0 ? 6 : dow - 1  // distance to Monday
  const mon = new Date(d); mon.setDate(d.getDate() - diff)
  const sun = new Date(mon); sun.setDate(mon.getDate() + 6)
  return {
    start: mon.toISOString().slice(0, 10),
    end: sun.toISOString().slice(0, 10),
  }
}

function sumByModuleKey(moduleKey, actLog) {
  let total = 0
  for (const day of actLog) {
    for (const evt of (day.events || [])) {
      if (evt.moduleKey === moduleKey) total += evt.count || 0
    }
  }
  return total
}

function enrichWithProgress(plan, actLog) {
  const items = plan.items.map(item => {
    const completed = sumByModuleKey(item.moduleKey, actLog)
    return { ...item, completedValue: completed, done: completed >= item.targetValue }
  })
  const doneCount = items.filter(i => i.done).length
  const pct = items.length > 0 ? Math.round((doneCount / items.length) * 100) : 0
  return { ...plan, items, doneCount, totalCount: items.length, pct }
}

export function usePlan(user) {
  const uid = user?.uid
  const [todayPlan, setTodayPlan] = useState(null)
  const [weekPlan, setWeekPlan] = useState(null)
  const [plans, setPlans] = useState([])

  const load = useCallback((userId) => {
    if (!userId) return
    let raw = []
    try { raw = JSON.parse(localStorage.getItem(PLAN_KEY(userId))) || [] } catch {}
    setPlans(raw)

    let actLog = []
    try { actLog = JSON.parse(localStorage.getItem(`activity_log_${userId}`)) || [] } catch {}

    const t = today()
    const week = getWeekRange()

    const daily = raw.find(p =>
      p.type === 'daily' && p.startDate === t && p.status === 'active'
    )
    const weekly = raw.find(p =>
      p.type === 'weekly' && p.startDate <= t && p.endDate >= t && p.status === 'active'
    )

    if (daily) {
      const dayLog = actLog.filter(d => d.date === t)
      setTodayPlan(enrichWithProgress(daily, dayLog))
    } else {
      setTodayPlan(null)
    }

    if (weekly) {
      const weekLog = actLog.filter(d => d.date >= week.start && d.date <= week.end)
      setWeekPlan(enrichWithProgress(weekly, weekLog))
    } else {
      setWeekPlan(null)
    }
  }, [])

  useEffect(() => { load(uid) }, [uid, load])

  const savePlan = useCallback((plan) => {
    if (!uid) return
    let raw = []
    try { raw = JSON.parse(localStorage.getItem(PLAN_KEY(uid))) || [] } catch {}
    const idx = raw.findIndex(p => p.id === plan.id)
    if (idx >= 0) raw[idx] = plan
    else raw.push(plan)
    try { localStorage.setItem(PLAN_KEY(uid), JSON.stringify(raw)) } catch {}
    load(uid)
  }, [uid, load])

  const deletePlan = useCallback((planId) => {
    if (!uid) return
    let raw = []
    try { raw = JSON.parse(localStorage.getItem(PLAN_KEY(uid))) || [] } catch {}
    try { localStorage.setItem(PLAN_KEY(uid), JSON.stringify(raw.filter(p => p.id !== planId))) } catch {}
    load(uid)
  }, [uid, load])

  return { plans, todayPlan, weekPlan, savePlan, deletePlan, reload: () => load(uid) }
}

// Helpers for PlanEditor
export function makeWeekRange() { return getWeekRange() }
export function getTodayStr() { return today() }
