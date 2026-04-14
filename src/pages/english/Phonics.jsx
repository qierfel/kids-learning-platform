import { useState, useEffect, useRef } from 'react'
import { PHONICS_PARTS } from '../../data/phonics'
import './GradedReading.css'

const MEDIA_BASE = '/media/35 I陪娃-尼尔森自然拼读【完结】/初级'
const LS_KEY = 'phonics_watched'

function loadWatched() {
  try {
    const raw = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
    return new Set(raw)
  } catch {
    return new Set()
  }
}

function saveWatched(set) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify([...set]))
  } catch { /* ignore */ }
}

function watchedKey(partId, num) {
  return `${partId}-${num}`
}

export default function Phonics({ onBack }) {
  const [activePartIdx, setActivePartIdx] = useState(0)
  const [watched, setWatched] = useState(() => loadWatched())
  const [player, setPlayer] = useState(null) // { partIdx, lessonIdx }
  const videoRef = useRef(null)

  const activePart = PHONICS_PARTS[activePartIdx]

  function markWatched(partId, num) {
    setWatched(prev => {
      const next = new Set(prev)
      next.add(watchedKey(partId, num))
      saveWatched(next)
      return next
    })
  }

  function openLesson(partIdx, lessonIdx) {
    setPlayer({ partIdx, lessonIdx })
  }

  function closePlayer() {
    setPlayer(null)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  function prevLesson() {
    if (!player) return
    const { partIdx, lessonIdx } = player
    if (lessonIdx > 0) {
      setPlayer({ partIdx, lessonIdx: lessonIdx - 1 })
    } else if (partIdx > 0) {
      const prevPart = PHONICS_PARTS[partIdx - 1]
      setPlayer({ partIdx: partIdx - 1, lessonIdx: prevPart.lessons.length - 1 })
    }
  }

  function nextLesson() {
    if (!player) return
    const { partIdx, lessonIdx } = player
    const part = PHONICS_PARTS[partIdx]
    if (lessonIdx < part.lessons.length - 1) {
      setPlayer({ partIdx, lessonIdx: lessonIdx + 1 })
    } else if (partIdx < PHONICS_PARTS.length - 1) {
      setPlayer({ partIdx: partIdx + 1, lessonIdx: 0 })
    }
  }

  function handleVideoEnded() {
    if (!player) return
    const { partIdx, lessonIdx } = player
    const part = PHONICS_PARTS[partIdx]
    const lesson = part.lessons[lessonIdx]
    markWatched(part.id, lesson.num)
    nextLesson()
  }

  // reset video when player changes
  useEffect(() => {
    if (videoRef.current && player) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {})
    }
  }, [player])

  // keyboard ESC to close
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') closePlayer()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const watchedCount = activePart.lessons.filter(l =>
    watched.has(watchedKey(activePart.id, l.num))
  ).length

  const playerPart = player ? PHONICS_PARTS[player.partIdx] : null
  const playerLesson = player ? playerPart.lessons[player.lessonIdx] : null
  const hasPrev = player && (player.lessonIdx > 0 || player.partIdx > 0)
  const hasNext = player && (
    player.lessonIdx < PHONICS_PARTS[player.partIdx].lessons.length - 1 ||
    player.partIdx < PHONICS_PARTS.length - 1
  )

  return (
    <div className="gr-page">
      {/* ── Sticky Header ── */}
      <div className="gr-header">
        <button className="gr-back-btn" onClick={onBack}>← 返回</button>
        <div className="gr-title-group">
          <span className="gr-icon">🔤</span>
          <div>
            <h2 className="gr-title">自然拼读</h2>
            <div className="gr-subtitle">尼尔森体系 · 148集视频课</div>
          </div>
        </div>
      </div>

      {/* ── Part Tabs ── */}
      <div className="gr-stage-tabs">
        {PHONICS_PARTS.map((part, idx) => (
          <button
            key={part.id}
            className={`gr-stage-tab ${activePartIdx === idx ? 'active' : ''}`}
            style={activePartIdx === idx
              ? { color: part.color, borderColor: part.color }
              : {}
            }
            onClick={() => setActivePartIdx(idx)}
          >
            {part.label}
            <span className="gr-stage-tab-sub">{part.desc}</span>
          </button>
        ))}
      </div>

      {/* ── Progress Bar ── */}
      <div style={{ padding: '10px 20px 0' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 6,
        }}>
          <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>
            已学 {watchedCount} / {activePart.lessons.length} 课
          </span>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>
            {activePart.lessons.length > 0
              ? Math.round((watchedCount / activePart.lessons.length) * 100)
              : 0}%
          </span>
        </div>
        <div style={{
          height: 6,
          background: '#e2e8f0',
          borderRadius: 3,
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${activePart.lessons.length > 0
              ? (watchedCount / activePart.lessons.length) * 100
              : 0}%`,
            background: activePart.color,
            borderRadius: 3,
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      {/* ── Lesson Grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 10,
        padding: '14px 20px 60px',
      }}
        className="phonics-grid"
      >
        {activePart.lessons.map((lesson, idx) => {
          const isWatched = watched.has(watchedKey(activePart.id, lesson.num))
          return (
            <button
              key={`${lesson.part}-${lesson.num}`}
              onClick={() => openLesson(activePartIdx, idx)}
              style={{
                background: isWatched ? '#f0fdf4' : '#fff',
                border: `1.5px solid ${isWatched ? '#86efac' : '#e2e8f0'}`,
                borderRadius: 12,
                padding: '12px 8px',
                cursor: 'pointer',
                textAlign: 'center',
                position: 'relative',
                transition: 'transform 0.15s, box-shadow 0.15s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.09)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = ''
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'
              }}
            >
              {isWatched && (
                <span style={{
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#22c55e',
                  display: 'block',
                }} />
              )}
              <div style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#1e293b',
                lineHeight: 1.4,
              }}>
                第 {lesson.num} 课
              </div>
              <div style={{
                fontSize: 10,
                color: activePart.color,
                fontWeight: 700,
                marginTop: 3,
              }}>
                {activePart.label}
              </div>
            </button>
          )
        })}
      </div>

      {/* Mobile grid fix */}
      <style>{`
        @media (max-width: 600px) {
          .phonics-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>

      {/* ── Video Player Overlay ── */}
      {player && playerLesson && (
        <div
          onClick={e => { if (e.target === e.currentTarget) closePlayer() }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Player Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            background: 'rgba(0,0,0,0.6)',
            flexShrink: 0,
          }}>
            <div style={{ color: '#fff', fontSize: 15, fontWeight: 700 }}>
              第 {playerLesson.num} 课 · {playerPart.label}
            </div>
            <button
              onClick={closePlayer}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                borderRadius: '50%',
                width: 36,
                height: 36,
                color: '#fff',
                fontSize: 18,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>
          </div>

          {/* Video */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <video
              ref={videoRef}
              key={`${playerPart.id}-${playerLesson.num}`}
              controls
              playsInline
              onEnded={handleVideoEnded}
              style={{ width: '100%', height: '100%', background: '#000', objectFit: 'contain' }}
              src={`/media/${encodeURIComponent('35 I陪娃-尼尔森自然拼读【完结】')}/${encodeURIComponent('初级')}/${encodeURIComponent(playerLesson.part)}/${encodeURIComponent(playerLesson.filename)}`}
            />
          </div>

          {/* Player Footer Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            padding: '12px 16px',
            background: 'rgba(0,0,0,0.6)',
            flexShrink: 0,
          }}>
            <button
              onClick={prevLesson}
              disabled={!hasPrev}
              style={{
                background: hasPrev ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                border: 'none',
                borderRadius: 8,
                padding: '8px 20px',
                color: hasPrev ? '#fff' : '#666',
                fontSize: 14,
                cursor: hasPrev ? 'pointer' : 'default',
              }}
            >
              ‹ 上一课
            </button>
            <button
              onClick={() => markWatched(playerPart.id, playerLesson.num)}
              style={{
                background: watched.has(watchedKey(playerPart.id, playerLesson.num))
                  ? '#22c55e'
                  : 'rgba(255,255,255,0.15)',
                border: 'none',
                borderRadius: 8,
                padding: '8px 16px',
                color: '#fff',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              {watched.has(watchedKey(playerPart.id, playerLesson.num)) ? '✓ 已学' : '标记已学'}
            </button>
            <button
              onClick={nextLesson}
              disabled={!hasNext}
              style={{
                background: hasNext ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                border: 'none',
                borderRadius: 8,
                padding: '8px 20px',
                color: hasNext ? '#fff' : '#666',
                fontSize: 14,
                cursor: hasNext ? 'pointer' : 'default',
              }}
            >
              下一课 ›
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
