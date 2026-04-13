import { useState, useRef } from 'react'
import { ttsSpeak, ttsStop } from '../../utils/tts'
import { TEXTBOOK_VOCAB, getUnits, AVAILABLE_GRADES, AVAILABLE_SEMESTERS } from '../../data/englishTextbook'
import './TextbookVocab.css'

const STORAGE_KEY = 'en_textbook_vocab_history'

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} }
}
function saveHistory(h) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(h))
}

// ── Dictation mode — 听英文写英文 ────────────────────────────────────────────
function DictationMode({ items, type, onBack }) {
  const [idx, setIdx]           = useState(0)
  const [played, setPlayed]     = useState(false)   // 是否已听过一次
  const [revealed, setRevealed] = useState(false)   // 是否显示答案
  const [hintShown, setHintShown] = useState(false) // 是否显示中文提示
  const [scores, setScores]     = useState([])
  const [done, setDone]         = useState(false)
  const [playing, setPlaying]   = useState(false)

  const history = useRef(loadHistory())

  function recordResult(key, correct) {
    const h = history.current
    if (!h[key]) h[key] = { correct: 0, wrong: 0 }
    if (correct) h[key].correct++
    else h[key].wrong++
    saveHistory(h)
  }

  async function playItem() {
    if (playing) return
    setPlaying(true)
    await ttsSpeak(items[idx].en, { voice: 'nova' })
    setPlayed(true)
    setPlaying(false)
  }

  // 切题时自动播放
  function goTo(newIdx, scoreList) {
    setIdx(newIdx)
    setPlayed(false)
    setRevealed(false)
    setHintShown(false)
    setPlaying(false)
    // 自动播放下一题
    setTimeout(() => {
      ttsSpeak(items[newIdx].en, { voice: 'nova' })
      setPlayed(true)
    }, 300)
  }

  function mark(correct) {
    recordResult(items[idx].en, correct)
    const newScores = [...scores, correct ? 'correct' : 'wrong']
    setScores(newScores)
    if (idx + 1 >= items.length) {
      setDone(true)
    } else {
      goTo(idx + 1, newScores)
    }
  }

  function restart() {
    setIdx(0)
    setScores([])
    setPlayed(false)
    setRevealed(false)
    setHintShown(false)
    setDone(false)
    setTimeout(() => {
      ttsSpeak(items[0].en, { voice: 'nova' })
      setPlayed(true)
    }, 300)
  }

  // 第一题自动播放（仅一次）
  const autoPlayedRef = useRef(false)
  if (!autoPlayedRef.current) {
    autoPlayedRef.current = true
    setTimeout(() => {
      ttsSpeak(items[0].en, { voice: 'nova' })
      setPlayed(true)
    }, 400)
  }

  if (done) {
    const correctCount = scores.filter(s => s === 'correct').length
    const pct = Math.round((correctCount / items.length) * 100)
    return (
      <div className="tv-dictation-result">
        <div className="tv-result-emoji">{pct === 100 ? '🏆' : pct >= 80 ? '🌟' : pct >= 60 ? '👍' : '💪'}</div>
        <div className="tv-result-score" style={{ color: pct >= 80 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#ef4444' }}>
          {pct}%
        </div>
        <div className="tv-result-label">{items.length} 题，写对 {correctCount} 题</div>
        <div className="tv-result-items">
          {items.map((item, i) => (
            <div key={i} className={`tv-result-item ${scores[i]}`}>
              <span className="tv-result-mark">{scores[i] === 'correct' ? '✓' : '✗'}</span>
              <div className="tv-result-text">
                <span className="tv-result-en">{item.en}</span>
                <span className="tv-result-cn">{item.cn}</span>
              </div>
              <button className="tv-result-play" onClick={() => ttsSpeak(item.en, { voice: 'nova' })}>🔊</button>
            </div>
          ))}
        </div>
        <div className="tv-result-btns">
          <button className="tv-btn-primary" onClick={restart}>再练一次</button>
          <button className="tv-btn-ghost" onClick={onBack}>返回</button>
        </div>
      </div>
    )
  }

  const item = items[idx]

  return (
    <div className="tv-dictation">
      <div className="tv-dictation-bar">
        <button className="tv-back-link" onClick={() => { ttsStop(); onBack() }}>← 退出听写</button>
        <span className="tv-dictation-progress">{idx + 1} / {items.length}</span>
      </div>

      <div className="tv-progress-track">
        <div className="tv-progress-fill" style={{ width: `${(idx / items.length) * 100}%` }} />
      </div>

      <div className="tv-dictation-card">
        {/* 主播放按钮 */}
        <button
          className={`tv-listen-btn ${playing ? 'playing' : ''}`}
          onClick={playItem}
          disabled={playing}
        >
          <span className="tv-listen-icon">{playing ? '🔉' : '🔊'}</span>
          <span className="tv-listen-label">{playing ? '播放中…' : played ? '再听一次' : '点击听音频'}</span>
        </button>

        {/* 慢速播放 */}
        {played && !revealed && (
          <button className="tv-slow-btn" onClick={async () => {
            setPlaying(true)
            // 慢速：重复每个词，加停顿
            const words = item.en.split(' ')
            for (const w of words) {
              await ttsSpeak(w, { voice: 'nova' })
              await new Promise(r => setTimeout(r, 400))
            }
            setPlaying(false)
          }}>
            🐢 慢读
          </button>
        )}

        {/* 中文提示（可选显示） */}
        {played && !hintShown && !revealed && (
          <button className="tv-hint-btn" onClick={() => setHintShown(true)}>
            💡 显示中文提示
          </button>
        )}
        {hintShown && !revealed && (
          <div className="tv-dictation-hint-text">{item.cn}</div>
        )}

        {/* 答案区域 */}
        {revealed ? (
          <div className="tv-answer-block">
            <div className="tv-dictation-answer">{item.en}</div>
            <div className="tv-dictation-answer-cn">{item.cn}</div>
            <div className="tv-mark-btns">
              <button className="tv-mark-correct" onClick={() => mark(true)}>✓ 写对了</button>
              <button className="tv-mark-wrong" onClick={() => mark(false)}>✗ 写错了</button>
            </div>
          </div>
        ) : (
          played && (
            <button className="tv-reveal-btn" onClick={() => setRevealed(true)}>
              核对答案
            </button>
          )
        )}

        {!played && (
          <div className="tv-dictation-prompt">
            {type === 'words' ? '听音频，写出这个单词的拼写' : '听音频，写出这个句子'}
          </div>
        )}
      </div>

      <div className="tv-mini-scores">
        {scores.map((s, i) => (
          <span key={i} className={`tv-mini-dot ${s}`} />
        ))}
      </div>
    </div>
  )
}

// ── Word / Sentence list view ────────────────────────────────────────────────
function UnitView({ unit, color, onDictateWords, onDictateSentences, onBack }) {
  const [activeTab, setActiveTab] = useState('words')
  const history = loadHistory()

  function getWrongCount(en) {
    return history[en]?.wrong || 0
  }

  return (
    <div className="tv-unit-view">
      <div className="tv-unit-header" style={{ borderColor: color }}>
        <button className="tv-back-link" onClick={onBack}>← 返回</button>
        <div className="tv-unit-title">
          <span className="tv-unit-num" style={{ background: color }}>Unit {unit.unit}</span>
          <span className="tv-unit-name">{unit.title}</span>
        </div>
      </div>

      <div className="tv-tabs">
        <button
          className={`tv-tab ${activeTab === 'words' ? 'active' : ''}`}
          onClick={() => setActiveTab('words')}
          style={activeTab === 'words' ? { color, borderColor: color } : {}}
        >
          📝 单词 ({unit.words.length})
        </button>
        <button
          className={`tv-tab ${activeTab === 'sentences' ? 'active' : ''}`}
          onClick={() => setActiveTab('sentences')}
          style={activeTab === 'sentences' ? { color, borderColor: color } : {}}
        >
          💬 句子 ({unit.sentences.length})
        </button>
      </div>

      {activeTab === 'words' && (
        <>
          <div className="tv-word-list">
            {unit.words.map((w, i) => {
              const wrongs = getWrongCount(w.en)
              return (
                <div key={i} className="tv-word-item">
                  <button className="tv-word-play" onClick={() => ttsSpeak(w.en, { voice: 'nova' })}>🔊</button>
                  <div className="tv-word-en">{w.en}</div>
                  <div className="tv-word-cn">{w.cn}</div>
                  {wrongs >= 2 && <span className="tv-error-badge">错{wrongs}</span>}
                </div>
              )
            })}
          </div>
          <div className="tv-dictate-bar">
            <button className="tv-dictate-btn" style={{ background: color }} onClick={onDictateWords}>
              🎧 听写单词 — 听英文写拼写
            </button>
          </div>
        </>
      )}

      {activeTab === 'sentences' && (
        <>
          <div className="tv-sentence-list">
            {unit.sentences.map((s, i) => {
              const wrongs = getWrongCount(s.en)
              return (
                <div key={i} className="tv-sentence-item">
                  <div className="tv-sentence-en">
                    <button className="tv-sent-play" onClick={() => ttsSpeak(s.en, { voice: 'nova' })}>🔊</button>
                    {s.en}
                    {wrongs >= 2 && <span className="tv-error-badge">错{wrongs}</span>}
                  </div>
                  <div className="tv-sentence-cn">{s.cn}</div>
                </div>
              )
            })}
          </div>
          <div className="tv-dictate-bar">
            <button className="tv-dictate-btn" style={{ background: color }} onClick={onDictateSentences}>
              🎧 听写句子 — 听英文写句子
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// ── Unit List (grade/semester selected) ─────────────────────────────────────
function UnitList({ grade, semester, color, onSelectUnit, onBack }) {
  const units = getUnits(grade, semester)

  return (
    <div className="tv-unit-list-page">
      <div className="tv-page-header">
        <button className="tv-back-link" onClick={onBack}>← 返回</button>
        <div className="tv-page-title">
          <span>{grade}年级{semester}册</span>
          <span className="tv-page-sub">共 {units.length} 个单元</span>
        </div>
      </div>
      <div className="tv-unit-grid">
        {units.map(unit => (
          <button
            key={unit.unit}
            className="tv-unit-card"
            style={{ borderTopColor: color }}
            onClick={() => onSelectUnit(unit)}
          >
            <div className="tv-unit-card-num" style={{ color }}>Unit {unit.unit}</div>
            <div className="tv-unit-card-title">{unit.title}</div>
            <div className="tv-unit-card-meta">
              <span>📝 {unit.words.length}词</span>
              <span>💬 {unit.sentences.length}句</span>
            </div>
          </button>
        ))}
        {units.length === 0 && (
          <div className="tv-empty">暂无数据</div>
        )}
      </div>
    </div>
  )
}

// ── Grade/Semester selector ──────────────────────────────────────────────────
const GRADE_COLORS = {
  3: '#10b981',
  4: '#3b82f6',
  5: '#8b5cf6',
  6: '#f59e0b',
}

function GradeSelector({ onSelect }) {
  const [selectedGrade, setSelectedGrade] = useState(null)

  return (
    <div className="tv-selector">
      <div className="tv-selector-title">选择年级</div>
      <div className="tv-grade-grid">
        {AVAILABLE_GRADES.map(g => (
          <button
            key={g}
            className={`tv-grade-btn ${selectedGrade === g ? 'active' : ''}`}
            style={{
              borderColor: GRADE_COLORS[g],
              background: selectedGrade === g ? GRADE_COLORS[g] : '#fff',
              color: selectedGrade === g ? '#fff' : GRADE_COLORS[g],
            }}
            onClick={() => setSelectedGrade(g)}
          >
            {g}年级
          </button>
        ))}
      </div>

      {selectedGrade && (
        <>
          <div className="tv-selector-title" style={{ marginTop: 20 }}>选择学期</div>
          <div className="tv-semester-row">
            {AVAILABLE_SEMESTERS.map(s => (
              <button
                key={s}
                className="tv-sem-btn"
                style={{ background: GRADE_COLORS[selectedGrade] }}
                onClick={() => onSelect(selectedGrade, s, GRADE_COLORS[selectedGrade])}
              >
                {s}册
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ── Main Export ──────────────────────────────────────────────────────────────
export default function TextbookVocab({ onBack }) {
  const [view, setView] = useState('select') // 'select' | 'units' | 'unit' | 'dictate-words' | 'dictate-sentences'
  const [selectedGrade, setSelectedGrade] = useState(null)
  const [selectedSemester, setSelectedSemester] = useState(null)
  const [selectedColor, setSelectedColor] = useState('#10b981')
  const [selectedUnit, setSelectedUnit] = useState(null)

  function handleSelectGrade(grade, semester, color) {
    setSelectedGrade(grade)
    setSelectedSemester(semester)
    setSelectedColor(color)
    setView('units')
  }

  function handleSelectUnit(unit) {
    setSelectedUnit(unit)
    setView('unit')
  }

  if (view === 'dictate-words') {
    return (
      <div className="tv-page">
        <DictationMode
          items={selectedUnit.words}
          type="words"
          onBack={() => setView('unit')}
        />
      </div>
    )
  }

  if (view === 'dictate-sentences') {
    return (
      <div className="tv-page">
        <DictationMode
          items={selectedUnit.sentences}
          type="sentences"
          onBack={() => setView('unit')}
        />
      </div>
    )
  }

  if (view === 'unit') {
    return (
      <div className="tv-page">
        <UnitView
          unit={selectedUnit}
          color={selectedColor}
          onDictateWords={() => setView('dictate-words')}
          onDictateSentences={() => setView('dictate-sentences')}
          onBack={() => setView('units')}
        />
      </div>
    )
  }

  if (view === 'units') {
    return (
      <div className="tv-page">
        <UnitList
          grade={selectedGrade}
          semester={selectedSemester}
          color={selectedColor}
          onSelectUnit={handleSelectUnit}
          onBack={() => setView('select')}
        />
      </div>
    )
  }

  return (
    <div className="tv-page">
      <div className="tv-top-bar">
        <button className="tv-back-link" onClick={onBack}>← 返回英语</button>
        <div className="tv-top-title">
          <span className="tv-top-icon">📚</span>
          <div>
            <div className="tv-top-name">教材词汇</div>
            <div className="tv-top-sub">译林版 3-6年级 · 单词 · 句型 · 听写</div>
          </div>
        </div>
      </div>
      <GradeSelector onSelect={handleSelectGrade} />
    </div>
  )
}
