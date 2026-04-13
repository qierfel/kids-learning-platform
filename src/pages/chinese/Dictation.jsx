import { useState, useEffect, useCallback } from 'react'
import { CHARACTER_LISTS } from '../../data/characterLists'
import { ttsSpeak } from '../../utils/tts'

const HISTORY_KEY = 'dictation_history'

// ---------- localStorage helpers ----------
function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveHistory(h) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(h))
}

function updateCharHistory(history, char, correct) {
  const prev = history[char] || { char, correct: 0, wrong: 0, lastDate: null }
  return {
    ...history,
    [char]: {
      char,
      correct: correct ? prev.correct + 1 : prev.correct,
      wrong: correct ? prev.wrong : prev.wrong + 1,
      lastDate: new Date().toISOString().slice(0, 10),
    },
  }
}

// ---------- Statistics helper ----------
function computeStats(history) {
  const chars = Object.values(history)
  if (!chars.length) return { total: 0, correctRate: 0, errorChars: [] }
  const total = chars.reduce((s, c) => s + c.correct + c.wrong, 0)
  const totalCorrect = chars.reduce((s, c) => s + c.correct, 0)
  const errorChars = chars.filter(c => c.wrong >= 2)
  return {
    total,
    correctRate: total === 0 ? 0 : Math.round((totalCorrect / total) * 100),
    errorChars,
  }
}

// ---------- Styles ----------
const S = {
  container: {
    maxWidth: 480,
    margin: '0 auto',
    padding: '16px 12px 32px',
    fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  backBtn: {
    background: 'none',
    border: 'none',
    fontSize: 20,
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: 6,
    color: '#555',
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: '#222',
    margin: 0,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
    display: 'block',
  },
  btnGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  btn: (active, color = '#4a90e2') => ({
    padding: '8px 16px',
    border: `2px solid ${active ? color : '#ddd'}`,
    borderRadius: 20,
    background: active ? color : '#fff',
    color: active ? '#fff' : '#333',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: active ? 600 : 400,
    transition: 'all 0.15s',
  }),
  startBtn: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #4a90e2, #7b5ea7)',
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    fontSize: 18,
    fontWeight: 700,
    cursor: 'pointer',
    marginTop: 8,
  },
  card: {
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
    padding: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  charDisplay: {
    fontSize: 96,
    lineHeight: 1.2,
    color: '#222',
    userSelect: 'none',
    letterSpacing: 2,
  },
  charHidden: {
    fontSize: 96,
    lineHeight: 1.2,
    color: '#ddd',
    letterSpacing: 2,
  },
  ttsBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '10px 20px',
    background: '#f0f4ff',
    border: '2px solid #c5d8ff',
    borderRadius: 24,
    cursor: 'pointer',
    fontSize: 15,
    color: '#4a90e2',
    fontWeight: 600,
    marginTop: 12,
  },
  progress: {
    fontSize: 13,
    color: '#888',
    marginBottom: 8,
  },
  progressBar: (pct) => ({
    height: 6,
    background: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  }),
  progressFill: (pct) => ({
    height: '100%',
    width: `${pct}%`,
    background: 'linear-gradient(90deg, #4a90e2, #7b5ea7)',
    borderRadius: 4,
    transition: 'width 0.3s',
  }),
  actionRow: {
    display: 'flex',
    gap: 12,
    marginTop: 8,
  },
  correctBtn: {
    flex: 1,
    padding: '14px',
    background: '#e8f5e9',
    border: '2px solid #81c784',
    borderRadius: 12,
    color: '#2e7d32',
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
  },
  wrongBtn: {
    flex: 1,
    padding: '14px',
    background: '#fce4ec',
    border: '2px solid #e57373',
    borderRadius: 12,
    color: '#c62828',
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
  },
  revealBtn: {
    flex: 1,
    padding: '14px',
    background: '#fff9c4',
    border: '2px solid #f9a825',
    borderRadius: 12,
    color: '#e65100',
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
  },
  badge: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 10,
    fontSize: 11,
    fontWeight: 700,
    marginLeft: 4,
  },
  errorBadge: {
    background: '#fce4ec',
    color: '#c62828',
  },
  statCard: {
    background: '#f8f9ff',
    borderRadius: 12,
    padding: '16px 20px',
    marginBottom: 12,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 700,
    color: '#4a90e2',
  },
  resultGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(56px, 1fr))',
    gap: 8,
    marginTop: 12,
  },
  resultCell: (correct) => ({
    background: correct ? '#e8f5e9' : '#fce4ec',
    border: `2px solid ${correct ? '#81c784' : '#e57373'}`,
    borderRadius: 10,
    textAlign: 'center',
    padding: '8px 4px',
    fontSize: 20,
    fontWeight: 700,
    color: correct ? '#2e7d32' : '#c62828',
  }),
  sectionTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#333',
    marginBottom: 10,
    marginTop: 4,
  },
}

// =========================================
// Main component
// =========================================
export default function Dictation({ onBack }) {
  const [phase, setPhase] = useState('select') // 'select' | 'practice' | 'result'

  // Selection state
  const [grade, setGrade] = useState(1)
  const [semester, setSemester] = useState('上')
  const [charType, setCharType] = useState('type1') // 'type1' | 'type2' | 'all'
  const [lessonFilter, setLessonFilter] = useState(null) // null = all lessons
  const [errorOnly, setErrorOnly] = useState(false)

  // Practice state
  const [queue, setQueue] = useState([])
  const [current, setCurrent] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [sessionResults, setSessionResults] = useState([]) // [{char, correct}]

  // History
  const [history, setHistory] = useState(loadHistory)

  // Derived stats
  const stats = computeStats(history)

  // ---- Get current grade/semester data ----
  const gradeData = CHARACTER_LISTS.find(
    g => g.grade === grade && g.semester === semester
  )

  // ---- Build character pool based on selection ----
  const buildQueue = useCallback(() => {
    if (!gradeData) return []

    let chars = []
    if (lessonFilter !== null) {
      const lesson = gradeData.lessons.find(l => l.lesson === lessonFilter)
      if (lesson) {
        if (charType === 'type1') chars = lesson.type1
        else if (charType === 'type2') chars = lesson.type2
        else chars = [...lesson.type1, ...lesson.type2]
      }
    } else {
      if (charType === 'type1') chars = gradeData.type1
      else if (charType === 'type2') chars = gradeData.type2
      else chars = [...gradeData.type1, ...gradeData.type2]
    }

    // Remove duplicates
    chars = [...new Set(chars)]

    // Error-only filter
    if (errorOnly) {
      chars = chars.filter(c => (history[c]?.wrong || 0) >= 2)
    }

    // Shuffle
    return [...chars].sort(() => Math.random() - 0.5)
  }, [gradeData, charType, lessonFilter, errorOnly, history])

  // ---- Start dictation ----
  function startDictation() {
    const q = buildQueue()
    if (!q.length) return
    setQueue(q)
    setCurrent(0)
    setRevealed(false)
    setSessionResults([])
    setPhase('practice')
    // Speak first char
    speakChar(q[0])
  }

  function speakChar(char) {
    if (!char) return
    ttsSpeak(char, { voice: 'shimmer' }).catch(() => {})
  }

  function handleReveal() {
    setRevealed(true)
  }

  function handleMark(correct) {
    const char = queue[current]
    const newHistory = updateCharHistory(history, char, correct)
    setHistory(newHistory)
    saveHistory(newHistory)

    const result = { char, correct }
    const newResults = [...sessionResults, result]
    setSessionResults(newResults)

    const nextIdx = current + 1
    if (nextIdx >= queue.length) {
      // Done
      setPhase('result')
    } else {
      setCurrent(nextIdx)
      setRevealed(false)
      speakChar(queue[nextIdx])
    }
  }

  function handleRepeat() {
    speakChar(queue[current])
  }

  function resetToSelect() {
    setPhase('select')
    setRevealed(false)
    setQueue([])
    setCurrent(0)
    setSessionResults([])
  }

  function restartSame() {
    const q = buildQueue()
    setQueue(q)
    setCurrent(0)
    setRevealed(false)
    setSessionResults([])
    setPhase('practice')
    speakChar(q[0])
  }

  function practiceErrors() {
    const errorChars = sessionResults.filter(r => !r.correct).map(r => r.char)
    if (!errorChars.length) return
    const q = [...errorChars].sort(() => Math.random() - 0.5)
    setQueue(q)
    setCurrent(0)
    setRevealed(false)
    setSessionResults([])
    setPhase('practice')
    speakChar(q[0])
  }

  // =========================================
  // RENDER: SELECT PHASE
  // =========================================
  if (phase === 'select') {
    const currentGradeData = CHARACTER_LISTS.find(
      g => g.grade === grade && g.semester === semester
    )
    const lessons = currentGradeData?.lessons || []

    let previewChars = []
    if (currentGradeData) {
      if (lessonFilter !== null) {
        const lesson = currentGradeData.lessons.find(l => l.lesson === lessonFilter)
        if (lesson) {
          if (charType === 'type1') previewChars = lesson.type1
          else if (charType === 'type2') previewChars = lesson.type2
          else previewChars = [...lesson.type1, ...lesson.type2]
        }
      } else {
        if (charType === 'type1') previewChars = currentGradeData.type1
        else if (charType === 'type2') previewChars = currentGradeData.type2
        else previewChars = [...currentGradeData.type1, ...currentGradeData.type2]
      }
      previewChars = [...new Set(previewChars)]
      if (errorOnly) previewChars = previewChars.filter(c => (history[c]?.wrong || 0) >= 2)
    }

    return (
      <div style={S.container}>
        <div style={S.header}>
          {onBack && (
            <button style={S.backBtn} onClick={onBack}>←</button>
          )}
          <h2 style={S.title}>听写练习</h2>
        </div>

        {/* Stats summary */}
        {stats.total > 0 && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <div style={{ flex: 1, background: '#f0f4ff', borderRadius: 10, padding: '10px 14px' }}>
              <div style={{ fontSize: 11, color: '#888' }}>已练习</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#4a90e2' }}>{stats.total}</div>
            </div>
            <div style={{ flex: 1, background: '#f0fff4', borderRadius: 10, padding: '10px 14px' }}>
              <div style={{ fontSize: 11, color: '#888' }}>正确率</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#43a047' }}>{stats.correctRate}%</div>
            </div>
            <div style={{ flex: 1, background: '#fff0f4', borderRadius: 10, padding: '10px 14px' }}>
              <div style={{ fontSize: 11, color: '#888' }}>易错字</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#e53935' }}>{stats.errorChars.length}</div>
            </div>
          </div>
        )}

        {/* Grade */}
        <div style={S.section}>
          <span style={S.label}>年级</span>
          <div style={S.btnGroup}>
            {[1, 2, 3, 4, 5, 6].map(g => (
              <button
                key={g}
                style={S.btn(grade === g)}
                onClick={() => { setGrade(g); setLessonFilter(null) }}
              >
                {g}年级
              </button>
            ))}
          </div>
        </div>

        {/* Semester */}
        <div style={S.section}>
          <span style={S.label}>学期</span>
          <div style={S.btnGroup}>
            {['上', '下'].map(s => (
              <button
                key={s}
                style={S.btn(semester === s)}
                onClick={() => { setSemester(s); setLessonFilter(null) }}
              >
                {s}册
              </button>
            ))}
          </div>
        </div>

        {/* Char type */}
        <div style={S.section}>
          <span style={S.label}>字的类型</span>
          <div style={S.btnGroup}>
            {[
              { v: 'type1', label: '一类字（会写）' },
              { v: 'type2', label: '二类字（会认）' },
              { v: 'all', label: '全部' },
            ].map(({ v, label }) => (
              <button
                key={v}
                style={S.btn(charType === v, '#7b5ea7')}
                onClick={() => setCharType(v)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Lesson filter */}
        {lessons.length > 0 && (
          <div style={S.section}>
            <span style={S.label}>按课文筛选（可选）</span>
            <div style={S.btnGroup}>
              <button
                style={S.btn(lessonFilter === null, '#43a047')}
                onClick={() => setLessonFilter(null)}
              >
                全册
              </button>
              {lessons.map(l => (
                <button
                  key={l.lesson}
                  style={S.btn(lessonFilter === l.lesson, '#43a047')}
                  onClick={() => setLessonFilter(lessonFilter === l.lesson ? null : l.lesson)}
                >
                  第{l.lesson}课
                </button>
              ))}
            </div>
            {lessonFilter !== null && (
              <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
                {lessons.find(l => l.lesson === lessonFilter)?.title}
              </div>
            )}
          </div>
        )}

        {/* Error only toggle */}
        {stats.errorChars.length > 0 && (
          <div style={S.section}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={errorOnly}
                onChange={e => setErrorOnly(e.target.checked)}
                style={{ width: 16, height: 16, cursor: 'pointer' }}
              />
              <span style={{ fontSize: 14, color: '#c62828', fontWeight: 600 }}>
                只练易错字（错2次以上）
                <span style={{ ...S.badge, ...S.errorBadge }}>{stats.errorChars.length}</span>
              </span>
            </label>
          </div>
        )}

        {/* Preview */}
        <div style={{ marginBottom: 16 }}>
          <span style={S.label}>
            共 <strong>{previewChars.length}</strong> 个字
          </span>
          {previewChars.length > 0 && (
            <div style={{
              background: '#f8f9ff',
              borderRadius: 10,
              padding: '10px 14px',
              fontSize: 18,
              letterSpacing: 4,
              color: '#444',
              lineHeight: 1.8,
              wordBreak: 'break-all',
            }}>
              {previewChars.join(' ')}
            </div>
          )}
        </div>

        <button
          style={{
            ...S.startBtn,
            opacity: previewChars.length === 0 ? 0.4 : 1,
            cursor: previewChars.length === 0 ? 'not-allowed' : 'pointer',
          }}
          disabled={previewChars.length === 0}
          onClick={startDictation}
        >
          开始听写 →
        </button>

        {/* Error notebook section */}
        {stats.errorChars.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <div style={S.sectionTitle}>
              易错字本
              <span style={{ ...S.badge, ...S.errorBadge, marginLeft: 8 }}>
                {stats.errorChars.length}字
              </span>
            </div>
            <div style={S.resultGrid}>
              {stats.errorChars.map(({ char, wrong }) => (
                <div
                  key={char}
                  style={{
                    background: '#fff0f4',
                    border: '2px solid #ef9a9a',
                    borderRadius: 10,
                    textAlign: 'center',
                    padding: '8px 4px',
                  }}
                >
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#c62828' }}>{char}</div>
                  <div style={{ fontSize: 10, color: '#e57373' }}>错{wrong}次</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // =========================================
  // RENDER: PRACTICE PHASE
  // =========================================
  if (phase === 'practice') {
    const char = queue[current]
    const pct = Math.round((current / queue.length) * 100)
    const charHistory = history[char] || { correct: 0, wrong: 0 }
    const isErrorChar = charHistory.wrong >= 2

    return (
      <div style={S.container}>
        <div style={S.header}>
          <button style={S.backBtn} onClick={resetToSelect}>←</button>
          <h2 style={S.title}>听写中</h2>
          <span style={{ marginLeft: 'auto', fontSize: 14, color: '#888' }}>
            {current + 1} / {queue.length}
          </span>
        </div>

        {/* Progress */}
        <div style={S.progressBar()}>
          <div style={S.progressFill(pct)} />
        </div>

        {/* Character card */}
        <div style={S.card}>
          <div style={{ marginBottom: 8 }}>
            {isErrorChar && (
              <span style={{ ...S.badge, ...S.errorBadge }}>易错字</span>
            )}
          </div>

          {revealed ? (
            <div style={S.charDisplay}>{char}</div>
          ) : (
            <div style={S.charHidden}>？</div>
          )}

          <div style={{ marginTop: 12, fontSize: 13, color: '#aaa' }}>
            {revealed ? '请对照并评分' : '请在纸上写出刚才听到的字'}
          </div>

          <button style={S.ttsBtn} onClick={handleRepeat}>
            🔊 再听一遍
          </button>
        </div>

        {/* History for this char */}
        {(charHistory.correct > 0 || charHistory.wrong > 0) && (
          <div style={{
            display: 'flex',
            gap: 8,
            justifyContent: 'center',
            marginBottom: 12,
            fontSize: 13,
            color: '#888',
          }}>
            <span>历史：</span>
            <span style={{ color: '#43a047' }}>✓ {charHistory.correct}次</span>
            <span style={{ color: '#e53935' }}>✗ {charHistory.wrong}次</span>
          </div>
        )}

        {/* Actions */}
        {!revealed ? (
          <button style={S.revealBtn} onClick={handleReveal}>
            显示答案
          </button>
        ) : (
          <div style={S.actionRow}>
            <button style={S.wrongBtn} onClick={() => handleMark(false)}>
              ✗ 写错了
            </button>
            <button style={S.correctBtn} onClick={() => handleMark(true)}>
              ✓ 写对了
            </button>
          </div>
        )}
      </div>
    )
  }

  // =========================================
  // RENDER: RESULT PHASE
  // =========================================
  if (phase === 'result') {
    const total = sessionResults.length
    const correct = sessionResults.filter(r => r.correct).length
    const wrong = total - correct
    const rate = total === 0 ? 0 : Math.round((correct / total) * 100)
    const wrongChars = sessionResults.filter(r => !r.correct)

    return (
      <div style={S.container}>
        <div style={S.header}>
          <button style={S.backBtn} onClick={resetToSelect}>←</button>
          <h2 style={S.title}>本次结果</h2>
        </div>

        {/* Score banner */}
        <div style={{
          background: rate >= 80
            ? 'linear-gradient(135deg, #43a047, #1b5e20)'
            : rate >= 60
              ? 'linear-gradient(135deg, #f9a825, #e65100)'
              : 'linear-gradient(135deg, #e53935, #b71c1c)',
          borderRadius: 16,
          padding: '24px',
          textAlign: 'center',
          color: '#fff',
          marginBottom: 20,
        }}>
          <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1 }}>{rate}%</div>
          <div style={{ fontSize: 18, marginTop: 8, opacity: 0.9 }}>
            {rate >= 90 ? '太棒了！' : rate >= 70 ? '不错！继续加油！' : '再接再厉！'}
          </div>
          <div style={{ fontSize: 14, marginTop: 12, opacity: 0.8 }}>
            写对 {correct} 个 · 写错 {wrong} 个 · 共 {total} 个
          </div>
        </div>

        {/* Wrong chars */}
        {wrongChars.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={S.sectionTitle}>
              本次写错的字
              <span style={{ ...S.badge, ...S.errorBadge, marginLeft: 8 }}>
                {wrongChars.length}字
              </span>
            </div>
            <div style={S.resultGrid}>
              {wrongChars.map(({ char }) => (
                <div
                  key={char}
                  style={S.resultCell(false)}
                  onClick={() => ttsSpeak(char, { voice: 'shimmer' })}
                  title="点击朗读"
                >
                  {char}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All results */}
        <div style={{ marginBottom: 20 }}>
          <div style={S.sectionTitle}>本次全部字</div>
          <div style={S.resultGrid}>
            {sessionResults.map(({ char, correct: c }, i) => (
              <div
                key={`${char}-${i}`}
                style={S.resultCell(c)}
                onClick={() => ttsSpeak(char, { voice: 'shimmer' })}
                title="点击朗读"
              >
                {char}
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {wrongChars.length > 0 && (
            <button
              style={{ ...S.startBtn, background: 'linear-gradient(135deg, #e53935, #b71c1c)' }}
              onClick={practiceErrors}
            >
              重练错误字（{wrongChars.length}个）
            </button>
          )}
          <button style={S.startBtn} onClick={restartSame}>
            再来一遍
          </button>
          <button
            style={{
              ...S.startBtn,
              background: 'linear-gradient(135deg, #78909c, #455a64)',
            }}
            onClick={resetToSelect}
          >
            重新选择
          </button>
        </div>

        {/* Cumulative stats */}
        <div style={{ marginTop: 24 }}>
          <div style={S.sectionTitle}>累计统计</div>
          <div style={S.statCard}>
            <span style={S.statLabel}>总练习次数</span>
            <span style={S.statValue}>{computeStats(history).total}</span>
          </div>
          <div style={S.statCard}>
            <span style={S.statLabel}>累计正确率</span>
            <span style={{ ...S.statValue, color: '#43a047' }}>
              {computeStats(history).correctRate}%
            </span>
          </div>
          <div style={S.statCard}>
            <span style={S.statLabel}>易错字数量</span>
            <span style={{ ...S.statValue, color: '#e53935' }}>
              {computeStats(history).errorChars.length}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return null
}
