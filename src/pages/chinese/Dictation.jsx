import { useState, useMemo } from 'react'
import { CHARACTER_LISTS } from '../../data/characterLists'
import { vocabList } from '../../data/vocabList'
import { ttsSpeak } from '../../utils/tts'

const HISTORY_KEY = 'dictation_history'

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}') }
  catch { return {} }
}

function saveHistory(h) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(h))
}

function updateItemHistory(history, item, correct) {
  const prev = history[item] || { correct: 0, wrong: 0, lastDate: null }
  return {
    ...history,
    [item]: {
      correct: correct ? prev.correct + 1 : prev.correct,
      wrong: correct ? prev.wrong : prev.wrong + 1,
      lastDate: new Date().toISOString().slice(0, 10),
    },
  }
}

function computeStats(history) {
  const entries = Object.entries(history)
  if (!entries.length) return { total: 0, correctRate: 0, errorItems: [] }
  const total = entries.reduce((s, [, v]) => s + (v.correct || 0) + (v.wrong || 0), 0)
  const totalCorrect = entries.reduce((s, [, v]) => s + (v.correct || 0), 0)
  const errorItems = entries
    .filter(([, v]) => (v.wrong || 0) >= 2)
    .map(([k, v]) => ({ item: k, wrong: v.wrong || 0 }))
    .sort((a, b) => b.wrong - a.wrong)
  return {
    total,
    correctRate: total === 0 ? 0 : Math.round((totalCorrect / total) * 100),
    errorItems,
  }
}

function hiddenDisplay(item) {
  return [...item].map(() => '？').join('')
}

const S = {
  container: {
    maxWidth: 520,
    margin: '0 auto',
    padding: '16px 12px 48px',
    fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
  },
  header: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 },
  backBtn: { background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', padding: '4px 8px', borderRadius: 6, color: '#555' },
  title: { fontSize: 22, fontWeight: 700, color: '#222', margin: 0 },
  section: { marginBottom: 16 },
  label: { fontSize: 13, color: '#666', marginBottom: 6, display: 'block', fontWeight: 600 },
  btnGroup: { display: 'flex', flexWrap: 'wrap', gap: 8 },
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
  ttsBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px',
    background: '#f0f4ff', border: '2px solid #c5d8ff', borderRadius: 24,
    cursor: 'pointer', fontSize: 15, color: '#4a90e2', fontWeight: 600, marginTop: 12,
  },
  progressBar: { height: 6, background: '#f0f0f0', borderRadius: 4, marginBottom: 16, overflow: 'hidden' },
  progressFill: (pct) => ({
    height: '100%', width: `${pct}%`,
    background: 'linear-gradient(90deg, #4a90e2, #7b5ea7)',
    borderRadius: 4, transition: 'width 0.3s',
  }),
  actionRow: { display: 'flex', gap: 12, marginTop: 8 },
  correctBtn: {
    flex: 1, padding: '14px', background: '#e8f5e9', border: '2px solid #81c784',
    borderRadius: 12, color: '#2e7d32', fontSize: 16, fontWeight: 700, cursor: 'pointer',
  },
  wrongBtn: {
    flex: 1, padding: '14px', background: '#fce4ec', border: '2px solid #e57373',
    borderRadius: 12, color: '#c62828', fontSize: 16, fontWeight: 700, cursor: 'pointer',
  },
  revealBtn: {
    width: '100%', padding: '14px', background: '#fff9c4', border: '2px solid #f9a825',
    borderRadius: 12, color: '#e65100', fontSize: 16, fontWeight: 700, cursor: 'pointer',
  },
  badge: { display: 'inline-block', padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 700, marginLeft: 4 },
  errorBadge: { background: '#fce4ec', color: '#c62828' },
  resultGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
    gap: 8, marginTop: 12,
  },
  resultCell: (correct) => ({
    background: correct ? '#e8f5e9' : '#fce4ec',
    border: `2px solid ${correct ? '#81c784' : '#e57373'}`,
    borderRadius: 10, textAlign: 'center', padding: '8px 4px',
    fontWeight: 700, color: correct ? '#2e7d32' : '#c62828',
    cursor: 'pointer',
  }),
  sectionTitle: { fontSize: 15, fontWeight: 700, color: '#333', marginBottom: 10, marginTop: 4 },
  statCard: {
    background: '#f8f9ff', borderRadius: 12, padding: '16px 20px', marginBottom: 12,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  statLabel: { fontSize: 14, color: '#666' },
  statValue: { fontSize: 24, fontWeight: 700, color: '#4a90e2' },
}

export default function Dictation({ onBack }) {
  const [phase, setPhase] = useState('select')
  const [selectStep, setSelectStep] = useState('range') // 'range' | 'items'

  const [grade, setGrade] = useState(1)
  const [semester, setSemester] = useState('上')
  const [dictMode, setDictMode] = useState('chars') // 'chars' | 'words'
  const [selectedLessons, setSelectedLessons] = useState(new Set())
  const [selectedItems, setSelectedItems] = useState(new Set())

  const [queue, setQueue] = useState([])
  const [current, setCurrent] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [sessionResults, setSessionResults] = useState([])

  const [history, setHistory] = useState(loadHistory)
  const stats = useMemo(() => computeStats(history), [history])

  const gradeData = useMemo(
    () => CHARACTER_LISTS.find(g => g.grade === grade && g.semester === semester),
    [grade, semester]
  )

  // Items grouped by lesson for the items-selection screen
  const lessonItems = useMemo(() => {
    if (!gradeData || selectedLessons.size === 0) return []
    const vocabKey = `${grade}-${semester === '上' ? '1' : '2'}`
    const lv = vocabList[vocabKey] || []
    return gradeData.lessons
      .filter(l => selectedLessons.has(l.lesson))
      .map(l => {
        if (dictMode === 'chars') {
          return {
            lesson: l.lesson,
            title: l.title,
            items: [...new Set([...(l.type1 || []), ...(l.type2 || [])])],
          }
        }
        const lessonVocab = lv.find(v => v.lesson === l.lesson)
        return { lesson: l.lesson, title: l.title, items: lessonVocab?.words || [] }
      })
      .filter(l => l.items.length > 0)
  }, [gradeData, selectedLessons, dictMode, grade, semester])

  function handleGradeChange(g) {
    setGrade(g)
    setSelectedLessons(new Set())
    setSelectedItems(new Set())
    setSelectStep('range')
  }

  function handleSemesterChange(s) {
    setSemester(s)
    setSelectedLessons(new Set())
    setSelectedItems(new Set())
    setSelectStep('range')
  }

  function handleModeChange(mode) {
    setDictMode(mode)
    setSelectedItems(new Set())
  }

  function toggleLesson(num) {
    setSelectedLessons(prev => {
      const next = new Set(prev)
      if (next.has(num)) next.delete(num)
      else next.add(num)
      return next
    })
  }

  function selectAllLessons() {
    if (!gradeData) return
    setSelectedLessons(new Set(gradeData.lessons.map(l => l.lesson)))
  }

  function clearLessons() {
    setSelectedLessons(new Set())
  }

  function toggleItem(item) {
    setSelectedItems(prev => {
      const next = new Set(prev)
      if (next.has(item)) next.delete(item)
      else next.add(item)
      return next
    })
  }

  function selectAllItems() {
    setSelectedItems(new Set(lessonItems.flatMap(l => l.items)))
  }

  function clearAllItems() {
    setSelectedItems(new Set())
  }

  function goToItems() {
    setSelectedItems(new Set(lessonItems.flatMap(l => l.items)))
    setSelectStep('items')
  }

  function startDictation(itemsArray) {
    const q = [...itemsArray].sort(() => Math.random() - 0.5)
    if (!q.length) return
    setQueue(q)
    setCurrent(0)
    setRevealed(false)
    setSessionResults([])
    setPhase('practice')
    speakItem(q[0])
  }

  function speakItem(item) {
    if (!item) return
    ttsSpeak(item, { voice: 'shimmer' }).catch(() => {})
  }

  function handleReveal() { setRevealed(true) }

  function handleMark(correct) {
    const item = queue[current]
    const newHistory = updateItemHistory(history, item, correct)
    setHistory(newHistory)
    saveHistory(newHistory)
    const newResults = [...sessionResults, { item, correct }]
    setSessionResults(newResults)
    const nextIdx = current + 1
    if (nextIdx >= queue.length) {
      setPhase('result')
    } else {
      setCurrent(nextIdx)
      setRevealed(false)
      speakItem(queue[nextIdx])
    }
  }

  function resetToSelect() {
    setPhase('select')
    setSelectStep('range')
    setRevealed(false)
    setQueue([])
    setCurrent(0)
    setSessionResults([])
  }

  // =========================================
  // RENDER: SELECT — RANGE STEP
  // =========================================
  if (phase === 'select' && selectStep === 'range') {
    const lessons = gradeData?.lessons || []

    return (
      <div style={S.container}>
        <div style={S.header}>
          {onBack && <button style={S.backBtn} onClick={onBack}>←</button>}
          <h2 style={S.title}>听写练习</h2>
        </div>

        {stats.total > 0 && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {[
              { label: '已练习', value: stats.total, color: '#4a90e2', bg: '#f0f4ff' },
              { label: '正确率', value: `${stats.correctRate}%`, color: '#43a047', bg: '#f0fff4' },
              { label: '易错字', value: stats.errorItems.length, color: '#e53935', bg: '#fff0f4' },
            ].map(({ label, value, color, bg }) => (
              <div key={label} style={{ flex: 1, background: bg, borderRadius: 10, padding: '10px 14px' }}>
                <div style={{ fontSize: 11, color: '#888' }}>{label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color }}>{value}</div>
              </div>
            ))}
          </div>
        )}

        <div style={S.section}>
          <span style={S.label}>年级</span>
          <div style={S.btnGroup}>
            {[1,2,3,4,5,6].map(g => (
              <button key={g} style={S.btn(grade === g)} onClick={() => handleGradeChange(g)}>{g}年级</button>
            ))}
          </div>
        </div>

        <div style={S.section}>
          <span style={S.label}>学期</span>
          <div style={S.btnGroup}>
            {['上', '下'].map(s => (
              <button key={s} style={S.btn(semester === s)} onClick={() => handleSemesterChange(s)}>{s}册</button>
            ))}
          </div>
        </div>

        <div style={S.section}>
          <span style={S.label}>听写类型</span>
          <div style={S.btnGroup}>
            <button style={S.btn(dictMode === 'chars', '#7b5ea7')} onClick={() => handleModeChange('chars')}>📝 听写字</button>
            <button style={S.btn(dictMode === 'words', '#7b5ea7')} onClick={() => handleModeChange('words')}>📖 听写词语</button>
          </div>
        </div>

        {lessons.length > 0 && (
          <div style={S.section}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={S.label}>选择课文（可多选）</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={selectAllLessons} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 12, border: '1px solid #c5d8ff', background: '#f0f6ff', cursor: 'pointer', color: '#4a90e2', fontWeight: 600 }}>全选</button>
                <button onClick={clearLessons} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 12, border: '1px solid #ddd', background: '#f8f8f8', cursor: 'pointer', color: '#888' }}>清空</button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {lessons.map(l => {
                const isSelected = selectedLessons.has(l.lesson)
                let itemCount = 0
                if (dictMode === 'chars') {
                  itemCount = new Set([...(l.type1 || []), ...(l.type2 || [])]).size
                } else {
                  const vocabKey = `${grade}-${semester === '上' ? '1' : '2'}`
                  const lessonVocab = (vocabList[vocabKey] || []).find(v => v.lesson === l.lesson)
                  itemCount = lessonVocab?.words?.length || 0
                }
                return (
                  <button
                    key={l.lesson}
                    onClick={() => toggleLesson(l.lesson)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                      borderRadius: 10, border: `2px solid ${isSelected ? '#4a90e2' : '#e8e8e8'}`,
                      background: isSelected ? '#f0f6ff' : '#fafafa',
                      cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <span style={{
                      width: 20, height: 20, borderRadius: 5,
                      border: `2px solid ${isSelected ? '#4a90e2' : '#ccc'}`,
                      background: isSelected ? '#4a90e2' : '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      {isSelected && <span style={{ color: '#fff', fontSize: 11, fontWeight: 900, lineHeight: 1 }}>✓</span>}
                    </span>
                    <span style={{ flex: 1, fontSize: 14, color: '#333' }}>
                      第{l.lesson}课 · {l.title}
                    </span>
                    {itemCount > 0 && (
                      <span style={{ fontSize: 12, color: '#aaa' }}>{itemCount}{dictMode === 'chars' ? '字' : '词'}</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <button
          style={{
            ...S.startBtn,
            opacity: selectedLessons.size === 0 ? 0.4 : 1,
            cursor: selectedLessons.size === 0 ? 'not-allowed' : 'pointer',
          }}
          disabled={selectedLessons.size === 0}
          onClick={goToItems}
        >
          下一步：选择具体内容 →
        </button>

        {stats.errorItems.length > 0 && (
          <div style={{ marginTop: 28, paddingTop: 20, borderTop: '2px solid #f0f0f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={S.sectionTitle}>
                易错字本
                <span style={{ ...S.badge, ...S.errorBadge, marginLeft: 8 }}>
                  {stats.errorItems.length}个
                </span>
              </div>
              <button
                onClick={() => startDictation(stats.errorItems.map(e => e.item))}
                style={{ padding: '8px 16px', background: '#fce4ec', border: '2px solid #e57373', borderRadius: 20, color: '#c62828', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
              >
                立即复习
              </button>
            </div>
            <div style={S.resultGrid}>
              {stats.errorItems.map(({ item, wrong }) => (
                <div
                  key={item}
                  style={{ background: '#fff0f4', border: '2px solid #ef9a9a', borderRadius: 10, textAlign: 'center', padding: '8px 4px', cursor: 'pointer' }}
                  onClick={() => ttsSpeak(item, { voice: 'shimmer' }).catch(() => {})}
                >
                  <div style={{ fontSize: item.length === 1 ? 22 : 15, fontWeight: 700, color: '#c62828' }}>{item}</div>
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
  // RENDER: SELECT — ITEMS STEP
  // =========================================
  if (phase === 'select' && selectStep === 'items') {
    const totalSelected = selectedItems.size
    const totalAvailable = lessonItems.reduce((s, l) => s + l.items.length, 0)

    return (
      <div style={S.container}>
        <div style={S.header}>
          <button style={S.backBtn} onClick={() => setSelectStep('range')}>←</button>
          <h2 style={S.title}>选择听写内容</h2>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 14, color: '#555' }}>
            已选 <strong style={{ color: '#4a90e2' }}>{totalSelected}</strong> / {totalAvailable} 个{dictMode === 'chars' ? '字' : '词'}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={selectAllItems} style={{ fontSize: 13, padding: '6px 14px', borderRadius: 14, border: '1px solid #4a90e2', background: '#f0f6ff', color: '#4a90e2', cursor: 'pointer', fontWeight: 600 }}>全选</button>
            <button onClick={clearAllItems} style={{ fontSize: 13, padding: '6px 14px', borderRadius: 14, border: '1px solid #ddd', background: '#f8f8f8', color: '#888', cursor: 'pointer' }}>清空</button>
          </div>
        </div>

        {lessonItems.map(({ lesson, title, items }) => {
          const allSelected = items.every(it => selectedItems.has(it))
          return (
            <div key={lesson} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', borderLeft: '3px solid #4a90e2', paddingLeft: 8 }}>
                  第{lesson}课 · {title}
                </div>
                <button
                  onClick={() => {
                    setSelectedItems(prev => {
                      const next = new Set(prev)
                      if (allSelected) { items.forEach(it => next.delete(it)) }
                      else { items.forEach(it => next.add(it)) }
                      return next
                    })
                  }}
                  style={{ fontSize: 12, padding: '3px 10px', borderRadius: 10, border: '1px solid #ddd', background: allSelected ? '#4a90e2' : '#f8f9ff', color: allSelected ? '#fff' : '#888', cursor: 'pointer' }}
                >
                  {allSelected ? '取消全课' : '全选本课'}
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {items.map(item => {
                  const isSelected = selectedItems.has(item)
                  return (
                    <button
                      key={item}
                      onClick={() => toggleItem(item)}
                      style={{
                        padding: dictMode === 'chars' ? '8px 10px' : '8px 14px',
                        borderRadius: 10,
                        border: `2px solid ${isSelected ? '#4a90e2' : '#e8e8e8'}`,
                        background: isSelected ? '#e8f4ff' : '#fafafa',
                        fontSize: dictMode === 'chars' ? 20 : 16,
                        fontWeight: 700,
                        color: isSelected ? '#1a6bc4' : '#555',
                        cursor: 'pointer',
                        position: 'relative',
                      }}
                    >
                      {item}
                      {isSelected && (
                        <span style={{
                          position: 'absolute', top: -6, right: -6, width: 16, height: 16,
                          background: '#4a90e2', borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <span style={{ color: '#fff', fontSize: 10, fontWeight: 900 }}>✓</span>
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}

        {lessonItems.length === 0 && (
          <div style={{ textAlign: 'center', color: '#aaa', padding: '40px 0', fontSize: 15 }}>
            所选课文暂无{dictMode === 'chars' ? '生字' : '词语'}数据
          </div>
        )}

        <button
          style={{
            ...S.startBtn,
            opacity: totalSelected === 0 ? 0.4 : 1,
            cursor: totalSelected === 0 ? 'not-allowed' : 'pointer',
          }}
          disabled={totalSelected === 0}
          onClick={() => startDictation([...selectedItems])}
        >
          开始听写（{totalSelected}个{dictMode === 'chars' ? '字' : '词'}）
        </button>
      </div>
    )
  }

  // =========================================
  // RENDER: PRACTICE PHASE
  // =========================================
  if (phase === 'practice') {
    const item = queue[current]
    const pct = Math.round((current / queue.length) * 100)
    const itemHistory = history[item] || { correct: 0, wrong: 0 }
    const isErrorItem = itemHistory.wrong >= 2
    const isWord = item && item.length > 1

    return (
      <div style={S.container}>
        <div style={S.header}>
          <button style={S.backBtn} onClick={resetToSelect}>←</button>
          <h2 style={S.title}>听写中</h2>
          <span style={{ marginLeft: 'auto', fontSize: 14, color: '#888' }}>
            {current + 1} / {queue.length}
          </span>
        </div>

        <div style={S.progressBar}>
          <div style={S.progressFill(pct)} />
        </div>

        <div style={S.card}>
          <div style={{ marginBottom: 8 }}>
            {isErrorItem && <span style={{ ...S.badge, ...S.errorBadge }}>易错</span>}
          </div>
          {revealed ? (
            <div style={{ fontSize: isWord ? 60 : 96, lineHeight: 1.2, color: '#222', userSelect: 'none', letterSpacing: isWord ? 4 : 2, fontWeight: 700 }}>
              {item}
            </div>
          ) : (
            <div style={{ fontSize: isWord ? 60 : 96, lineHeight: 1.2, color: '#ddd', letterSpacing: isWord ? 4 : 2, fontWeight: 700 }}>
              {hiddenDisplay(item)}
            </div>
          )}
          <div style={{ marginTop: 12, fontSize: 13, color: '#aaa' }}>
            {revealed ? '请对照并评分' : `请在纸上写出刚才听到的${isWord ? '词语' : '字'}`}
          </div>
          <button style={S.ttsBtn} onClick={() => speakItem(item)}>
            🔊 再听一遍
          </button>
        </div>

        {(itemHistory.correct > 0 || itemHistory.wrong > 0) && (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 12, fontSize: 13, color: '#888' }}>
            <span>历史：</span>
            <span style={{ color: '#43a047' }}>✓ {itemHistory.correct}次</span>
            <span style={{ color: '#e53935' }}>✗ {itemHistory.wrong}次</span>
          </div>
        )}

        {!revealed ? (
          <button style={S.revealBtn} onClick={handleReveal}>显示答案</button>
        ) : (
          <div style={S.actionRow}>
            <button style={S.wrongBtn} onClick={() => handleMark(false)}>✗ 写错了</button>
            <button style={S.correctBtn} onClick={() => handleMark(true)}>✓ 写对了</button>
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
    const correctCount = sessionResults.filter(r => r.correct).length
    const wrongCount = total - correctCount
    const rate = total === 0 ? 0 : Math.round((correctCount / total) * 100)
    const wrongItems = sessionResults.filter(r => !r.correct)

    return (
      <div style={S.container}>
        <div style={S.header}>
          <button style={S.backBtn} onClick={resetToSelect}>←</button>
          <h2 style={S.title}>本次结果</h2>
        </div>

        <div style={{
          background: rate >= 80
            ? 'linear-gradient(135deg, #43a047, #1b5e20)'
            : rate >= 60
              ? 'linear-gradient(135deg, #f9a825, #e65100)'
              : 'linear-gradient(135deg, #e53935, #b71c1c)',
          borderRadius: 16, padding: '24px', textAlign: 'center', color: '#fff', marginBottom: 20,
        }}>
          <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1 }}>{rate}%</div>
          <div style={{ fontSize: 18, marginTop: 8, opacity: 0.9 }}>
            {rate >= 90 ? '太棒了！' : rate >= 70 ? '不错！继续加油！' : '再接再厉！'}
          </div>
          <div style={{ fontSize: 14, marginTop: 12, opacity: 0.8 }}>
            写对 {correctCount} 个 · 写错 {wrongCount} 个 · 共 {total} 个
          </div>
        </div>

        {wrongItems.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={S.sectionTitle}>
              本次写错的字/词
              <span style={{ ...S.badge, ...S.errorBadge, marginLeft: 8 }}>{wrongItems.length}个</span>
            </div>
            <div style={S.resultGrid}>
              {wrongItems.map(({ item }) => (
                <div key={item} style={{ ...S.resultCell(false), fontSize: item.length > 1 ? 14 : 20 }}
                  onClick={() => ttsSpeak(item, { voice: 'shimmer' }).catch(() => {})}
                  title="点击朗读"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginBottom: 20 }}>
          <div style={S.sectionTitle}>本次全部</div>
          <div style={S.resultGrid}>
            {sessionResults.map(({ item, correct: c }, i) => (
              <div key={`${item}-${i}`} style={{ ...S.resultCell(c), fontSize: item.length > 1 ? 14 : 20 }}
                onClick={() => ttsSpeak(item, { voice: 'shimmer' }).catch(() => {})}
                title="点击朗读"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {wrongItems.length > 0 && (
            <button
              style={{ ...S.startBtn, background: 'linear-gradient(135deg, #e53935, #b71c1c)' }}
              onClick={() => startDictation(wrongItems.map(r => r.item))}
            >
              重练错误字/词（{wrongItems.length}个）
            </button>
          )}
          <button style={S.startBtn} onClick={() => startDictation(queue)}>再来一遍</button>
          <button style={{ ...S.startBtn, background: 'linear-gradient(135deg, #78909c, #455a64)' }} onClick={resetToSelect}>
            重新选择
          </button>
        </div>

        <div style={{ marginTop: 24 }}>
          <div style={S.sectionTitle}>累计统计</div>
          <div style={S.statCard}>
            <span style={S.statLabel}>总练习次数</span>
            <span style={S.statValue}>{stats.total}</span>
          </div>
          <div style={S.statCard}>
            <span style={S.statLabel}>累计正确率</span>
            <span style={{ ...S.statValue, color: '#43a047' }}>{stats.correctRate}%</span>
          </div>
          <div style={S.statCard}>
            <span style={S.statLabel}>易错字/词数量</span>
            <span style={{ ...S.statValue, color: '#e53935' }}>{stats.errorItems.length}</span>
          </div>
        </div>
      </div>
    )
  }

  return null
}
