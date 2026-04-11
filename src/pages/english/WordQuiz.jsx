import { useState, useEffect, useCallback } from 'react'
import { GRADE_WORDS, EXAM_WORDS } from '../../data/englishWords'
import './WordQuiz.css'

// Fisher-Yates shuffle
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildQuestions(pool) {
  // 每题：显示中文 → 选英文单词（4选1）
  const shuffled = shuffle(pool)
  return shuffled.map((item, idx) => {
    const wrongPool = pool.filter((_, i) => i !== pool.indexOf(item))
    const distractors = shuffle(wrongPool).slice(0, 3).map(w => w.word)
    const options = shuffle([item.word, ...distractors])
    return { meaning: item.meaning, correct: item.word, options, example: item.example }
  })
}

export default function WordQuiz({ onBack }) {
  const [mode, setMode] = useState('setup') // setup | quiz | result | flashcard | browse
  const [subMode, setSubMode] = useState('grade') // grade | exam
  const [grade, setGrade] = useState(3)
  const [examLevel, setExamLevel] = useState('KET')
  const [wordSearch, setWordSearch] = useState('')

  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [results, setResults] = useState([])
  const [showNext, setShowNext] = useState(false)

  // Flashcard state
  const [cardIdx, setCardIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const pool = subMode === 'grade' ? (GRADE_WORDS[grade] || []) : (EXAM_WORDS[examLevel] || [])

  function startQuiz() {
    const qs = buildQuestions(pool)
    setQuestions(qs)
    setCurrent(0)
    setSelected(null)
    setResults([])
    setShowNext(false)
    setMode('quiz')
  }

  function startFlashcard() {
    setCardIdx(0)
    setFlipped(false)
    setMode('flashcard')
  }

  const handleAnswer = useCallback((opt) => {
    if (selected) return
    const q = questions[current]
    const correct = opt === q.correct
    setSelected(opt)
    setResults(r => [...r, { meaning: q.meaning, correct: q.correct, chosen: opt, ok: correct }])
    setTimeout(() => setShowNext(true), 600)
  }, [selected, questions, current])

  function next() {
    setSelected(null)
    setShowNext(false)
    if (current + 1 >= questions.length) {
      setMode('result')
    } else {
      setCurrent(c => c + 1)
    }
  }

  if (mode === 'setup') {
    return (
      <div className="wordquiz">
        <button className="back-btn" onClick={onBack}>← 英语</button>
        <h2 className="wq-title">单词练习</h2>

        <div className="mode-switch">
          <button className={subMode === 'grade' ? 'mode-btn active' : 'mode-btn'} onClick={() => setSubMode('grade')}>按年级</button>
          <button className={subMode === 'exam' ? 'mode-btn active' : 'mode-btn'} onClick={() => setSubMode('exam')}>考试词汇</button>
        </div>

        {subMode === 'grade' && (
          <div className="setup-section">
            <div className="setup-label">年级（人教版 PEP）</div>
            <div className="opt-btns">
              {[3,4,5,6].map(g => (
                <button key={g} className={grade === g ? 'opt-btn active' : 'opt-btn'} onClick={() => setGrade(g)}>
                  {g}年级
                </button>
              ))}
            </div>
            <div className="word-count">共 {pool.length} 个单词</div>
          </div>
        )}

        {subMode === 'exam' && (
          <div className="setup-section">
            <div className="setup-label">考试级别</div>
            <div className="opt-btns">
              {['KET', 'PET', 'FCE'].map(l => (
                <button key={l} className={examLevel === l ? 'opt-btn active' : 'opt-btn'} onClick={() => setExamLevel(l)}>
                  {l}
                </button>
              ))}
            </div>
            <div className="exam-desc">
              {examLevel === 'KET' && 'KET（A2级）剑桥英语初级，适合初中生'}
              {examLevel === 'PET' && 'PET（B1级）剑桥英语中级，适合中学生'}
              {examLevel === 'FCE' && 'FCE（B2级）剑桥英语高级，适合高中生'}
            </div>
            <div className="word-count">共 {pool.length} 个单词</div>
          </div>
        )}

        <div className="setup-actions">
          <button className="start-btn" onClick={startQuiz}>开始测验（选择题）</button>
          <button className="flash-btn" onClick={startFlashcard}>闪卡记忆</button>
          <button className="browse-btn" onClick={() => { setWordSearch(''); setMode('browse') }}>🔍 浏览单词</button>
        </div>
      </div>
    )
  }

  if (mode === 'browse') {
    const wq = wordSearch.trim().toLowerCase()
    const browsePool = wq
      ? pool.filter(w => w.word.toLowerCase().includes(wq) || w.meaning.toLowerCase().includes(wq))
      : pool
    return (
      <div className="wordquiz">
        <div className="wq-topbar">
          <button className="back-btn" onClick={() => setMode('setup')}>← 返回</button>
          <span className="wq-counter">{browsePool.length} / {pool.length} 词</span>
        </div>
        <div className="wq-browse-search-row">
          <input
            className="wq-browse-search"
            type="text"
            placeholder="🔍 搜索单词或中文释义"
            value={wordSearch}
            autoFocus
            onChange={e => setWordSearch(e.target.value)}
          />
          {wordSearch && <button className="wq-browse-clear" onClick={() => setWordSearch('')}>✕</button>}
        </div>
        <div className="wq-browse-list">
          {browsePool.length === 0 ? (
            <p className="wq-browse-empty">没有找到匹配的单词</p>
          ) : (
            browsePool.map((w, i) => (
              <div key={i} className="wq-browse-card">
                <span className="wq-browse-word">{w.word}</span>
                <span className="wq-browse-meaning">{w.meaning}</span>
                {w.example && <span className="wq-browse-example">{w.example}</span>}
              </div>
            ))
          )}
        </div>
      </div>
    )
  }

  if (mode === 'flashcard') {
    const card = pool[cardIdx]
    return (
      <div className="wordquiz">
        <div className="fc-topbar">
          <button className="back-btn" onClick={() => setMode('setup')}>← 返回</button>
          <span className="fc-counter">{cardIdx + 1} / {pool.length}</span>
        </div>

        <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(f => !f)}>
          <div className="fc-front">
            <div className="fc-word">{card.word}</div>
            <div className="fc-hint">点击翻转查看释义</div>
          </div>
          <div className="fc-back">
            <div className="fc-meaning">{card.meaning}</div>
            <div className="fc-example">{card.example}</div>
          </div>
        </div>

        <div className="fc-nav">
          <button className="fc-prev" onClick={() => { setCardIdx(i => Math.max(0, i-1)); setFlipped(false) }} disabled={cardIdx === 0}>
            ← 上一个
          </button>
          <button className="fc-next" onClick={() => { setCardIdx(i => Math.min(pool.length-1, i+1)); setFlipped(false) }} disabled={cardIdx === pool.length - 1}>
            下一个 →
          </button>
        </div>
      </div>
    )
  }

  if (mode === 'quiz') {
    const q = questions[current]
    const progress = (current / questions.length) * 100
    return (
      <div className="wordquiz">
        <div className="wq-topbar">
          <span className="wq-counter">{current + 1} / {questions.length}</span>
          <button className="exit-btn" onClick={() => setMode('setup')}>退出</button>
        </div>
        <div className="wq-progress"><div className="wq-progress-bar" style={{ width: `${progress}%` }} /></div>

        <div className="wq-meaning">{q.meaning}</div>
        <div className="wq-prompt">选出对应的英文单词</div>

        <div className="wq-options">
          {q.options.map(opt => {
            let cls = 'wq-option'
            if (selected) {
              if (opt === q.correct) cls += ' correct'
              else if (opt === selected) cls += ' wrong'
            }
            return (
              <button
                key={opt}
                className={cls}
                onPointerDown={e => { e.preventDefault(); handleAnswer(opt) }}
              >
                {opt}
              </button>
            )
          })}
        </div>

        {selected && <div className="wq-example">例句：{q.example}</div>}
        {showNext && (
          <button className="wq-next" onClick={next}>
            {current + 1 >= questions.length ? '查看结果' : '下一题 →'}
          </button>
        )}
      </div>
    )
  }

  if (mode === 'result') {
    const score = results.filter(r => r.ok).length
    const wrong = results.filter(r => !r.ok)
    return (
      <div className="wordquiz">
        <div className="wq-result-header">
          <div className="wq-score">{score}<span>/{results.length}</span></div>
          <div className="wq-stars">{'⭐'.repeat(Math.ceil(score / results.length * 5))}</div>
        </div>

        {wrong.length > 0 && (
          <div className="wq-wrongs">
            <div className="wq-wrongs-title">错题回顾</div>
            {wrong.map((w, i) => (
              <div key={i} className="wq-wrong-item">
                <span className="wq-wrong-meaning">{w.meaning}</span>
                <span className="wq-wrong-chosen">你选了：<em>{w.chosen}</em></span>
                <span className="wq-wrong-correct">正确：<strong>{w.correct}</strong></span>
              </div>
            ))}
          </div>
        )}

        <div className="wq-actions">
          <button className="again-btn" onClick={startQuiz}>再测一次</button>
          <button className="flash-again-btn" onClick={startFlashcard}>闪卡复习</button>
          <button className="back-flat-btn" onClick={() => setMode('setup')}>换词库</button>
        </div>
      </div>
    )
  }
}
