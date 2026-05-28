import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

function storageKey(examId) {
  return `exam_timer_${examId}`
}

export default function useExamTimer({
  examId,
  durationSeconds,
  autoStart = true,
  onExpire,
}) {
  const [startedAt, setStartedAt] = useState(null)
  const [ended, setEnded] = useState(false)
  const expireRef = useRef(onExpire)

  useEffect(() => {
    expireRef.current = onExpire
  }, [onExpire])

  useEffect(() => {
    const raw = localStorage.getItem(storageKey(examId))
    if (!raw) {
      if (autoStart) {
        const now = Date.now()
        setStartedAt(now)
        localStorage.setItem(storageKey(examId), JSON.stringify({ startedAt: now, ended: false }))
      }
      return
    }
    try {
      const parsed = JSON.parse(raw)
      if (parsed?.startedAt) setStartedAt(parsed.startedAt)
      if (parsed?.ended) setEnded(true)
    } catch {
      localStorage.removeItem(storageKey(examId))
    }
  }, [examId, autoStart])

  useEffect(() => {
    if (!startedAt || ended) return
    const tick = () => {
      const remaining = durationSeconds - Math.floor((Date.now() - startedAt) / 1000)
      if (remaining <= 0) {
        setEnded(true)
        localStorage.setItem(storageKey(examId), JSON.stringify({ startedAt, ended: true }))
        expireRef.current?.()
      }
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [durationSeconds, examId, startedAt, ended])

  const elapsedSeconds = useMemo(() => {
    if (!startedAt) return 0
    return Math.max(0, Math.floor((Date.now() - startedAt) / 1000))
  }, [startedAt])

  const remainingSeconds = useMemo(() => {
    if (!startedAt) return durationSeconds
    return Math.max(0, durationSeconds - elapsedSeconds)
  }, [durationSeconds, elapsedSeconds, startedAt])

  const start = useCallback(() => {
    if (startedAt) return
    const now = Date.now()
    setStartedAt(now)
    setEnded(false)
    localStorage.setItem(storageKey(examId), JSON.stringify({ startedAt: now, ended: false }))
  }, [examId, startedAt])

  const finish = useCallback(() => {
    if (!startedAt) return
    setEnded(true)
    localStorage.setItem(storageKey(examId), JSON.stringify({ startedAt, ended: true }))
  }, [examId, startedAt])

  const reset = useCallback(() => {
    localStorage.removeItem(storageKey(examId))
    setStartedAt(null)
    setEnded(false)
  }, [examId])

  return {
    startedAt,
    started: Boolean(startedAt),
    ended,
    elapsedSeconds,
    remainingSeconds,
    start,
    finish,
    reset,
  }
}
