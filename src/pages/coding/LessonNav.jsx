import { useEffect, useRef, useState } from 'react'

const TWEEN_MODULE_LABELS = {
  A: '模块 A · AI 素养启蒙',
  B: '模块 B · AI 创作入门',
  C: '模块 C · 过渡实践',
  D: '模块 D · 工具基础',
  E: '模块 E · 工具大全',
  F: '模块 F · 动手体验',
  G: '模块 G · 真项目',
}

function getTweenModuleKey(lesson) {
  if (lesson.module) return lesson.module
  if (lesson.id <= 6) return 'A'
  return 'B'
}

function buildGroups(lessons, track) {
  const groups = []
  const indexByKey = new Map()
  lessons.forEach((lesson) => {
    let key
    let label
    if (track === 'kids') {
      key = lesson.stageId || lesson.stage || 'all'
      label = lesson.stage || '全部课程'
    } else {
      key = getTweenModuleKey(lesson)
      label = TWEEN_MODULE_LABELS[key] || `模块 ${key}`
    }
    if (!indexByKey.has(key)) {
      indexByKey.set(key, groups.length)
      groups.push({ key, label, items: [] })
    }
    groups[indexByKey.get(key)].items.push(lesson)
  })
  return groups
}

export default function LessonNav({ lessons, currentId, track, onJump }) {
  const [open, setOpen] = useState(false)
  const popoverRef = useRef(null)
  const triggerRef = useRef(null)

  const currentIndex = lessons.findIndex((l) => l.id === currentId)
  const prev = currentIndex > 0 ? lessons[currentIndex - 1] : null
  const next = currentIndex >= 0 && currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null
  const groups = buildGroups(lessons, track)

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (popoverRef.current?.contains(e.target)) return
      if (triggerRef.current?.contains(e.target)) return
      setOpen(false)
    }
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [currentId])

  function handleJump(id) {
    setOpen(false)
    onJump(id)
  }

  return (
    <div className="lesson-nav">
      <div className="lesson-nav-inner">
        <button
          type="button"
          className="lesson-nav-arrow"
          onClick={() => prev && handleJump(prev.id)}
          disabled={!prev}
          aria-label={prev ? `上一课：第 ${prev.id} 课` : '已是第一课'}
        >
          <span className="lesson-nav-arrow-symbol">←</span>
          <span className="lesson-nav-arrow-text">
            <span className="lesson-nav-arrow-label">上一课</span>
            {prev && <span className="lesson-nav-arrow-title">第 {prev.id} 课 · {prev.title}</span>}
          </span>
        </button>

        <button
          type="button"
          ref={triggerRef}
          className={`lesson-nav-current${open ? ' is-open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <span className="lesson-nav-current-count">第 {currentId} 课 / 共 {lessons.length} 课</span>
          <span className="lesson-nav-current-action">全部课程 ▾</span>
        </button>

        <button
          type="button"
          className="lesson-nav-arrow lesson-nav-arrow--next"
          onClick={() => next && handleJump(next.id)}
          disabled={!next}
          aria-label={next ? `下一课：第 ${next.id} 课` : '已是最后一课'}
        >
          <span className="lesson-nav-arrow-text lesson-nav-arrow-text--right">
            <span className="lesson-nav-arrow-label">下一课</span>
            {next && <span className="lesson-nav-arrow-title">第 {next.id} 课 · {next.title}</span>}
          </span>
          <span className="lesson-nav-arrow-symbol">→</span>
        </button>
      </div>

      {open && (
        <div className="lesson-nav-popover" ref={popoverRef} role="listbox">
          {groups.map((group) => (
            <div key={group.key} className="lesson-nav-group">
              <div className="lesson-nav-group-title">{group.label}</div>
              <div className="lesson-nav-group-items">
                {group.items.map((lesson) => (
                  <button
                    key={lesson.id}
                    type="button"
                    role="option"
                    aria-selected={lesson.id === currentId}
                    className={`lesson-nav-item${lesson.id === currentId ? ' is-active' : ''}`}
                    onClick={() => handleJump(lesson.id)}
                  >
                    <span className="lesson-nav-item-emoji">{lesson.emoji}</span>
                    <span className="lesson-nav-item-text">
                      <span className="lesson-nav-item-id">第 {lesson.id} 课</span>
                      <span className="lesson-nav-item-title">{lesson.title}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
