import { useState, useEffect, useRef, useCallback } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/config'
import './ArithmeticDrill.css'

// ── 题目生成器 ──────────────────────────────────────────────
const CONFIGS = {
  1: [
    { label: '20以内加法', type: 'add', max: 20 },
    { label: '20以内减法', type: 'sub', max: 20 },
    { label: '加减混合', type: 'mix', max: 20 },
  ],
  2: [
    { label: '100以内加法', type: 'add', max: 100 },
    { label: '100以内减法', type: 'sub', max: 100 },
    { label: '乘法（1-6）', type: 'mul', max: 6 },
    { label: '加减混合', type: 'mix', max: 100 },
  ],
  3: [
    { label: '乘法表（1-9）', type: 'mul', max: 9 },
    { label: '除法（1-9）', type: 'div', max: 9 },
    { label: '两位数乘一位数', type: 'mul2', max: 9 },
    { label: '乘除混合', type: 'muldiv', max: 9 },
  ],
  4: [
    { label: '三位数加减法', type: 'add', max: 999 },
    { label: '两位数乘两位数', type: 'mul2x2', max: 99 },
    { label: '除法（含余数）', type: 'divr', max: 9 },
    { label: '四则混合', type: 'all', max: 99 },
  ],
  5: [
    { label: '大数加减法', type: 'add', max: 9999 },
    { label: '多位数乘法', type: 'mul3', max: 99 },
    { label: '四则混合', type: 'all', max: 99 },
  ],
  6: [
    { label: '综合口算', type: 'all', max: 999 },
    { label: '多位数乘除', type: 'mul3', max: 999 },
  ],
}

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }

function genQuestion(config) {
  const { type, max } = config
  let a, b, q, ans

  switch (type) {
    case 'add': {
      a = rand(1, max - 1); b = rand(1, max - a)
      q = `${a} + ${b} =`; ans = a + b; break
    }
    case 'sub': {
      a = rand(2, max); b = rand(1, a)
      q = `${a} - ${b} =`; ans = a - b; break
    }
    case 'mix': {
      if (Math.random() < 0.5) {
        a = rand(1, max - 1); b = rand(1, max - a)
        q = `${a} + ${b} =`; ans = a + b
      } else {
        a = rand(2, max); b = rand(1, a)
        q = `${a} - ${b} =`; ans = a - b
      }
      break
    }
    case 'mul': {
      a = rand(2, max); b = rand(2, max)
      q = `${a} × ${b} =`; ans = a * b; break
    }
    case 'mul2': {
      a = rand(11, 99); b = rand(2, max)
      q = `${a} × ${b} =`; ans = a * b; break
    }
    case 'mul2x2': {
      a = rand(11, max); b = rand(11, max)
      q = `${a} × ${b} =`; ans = a * b; break
    }
    case 'mul3': {
      a = rand(11, max); b = rand(2, 9)
      q = `${a} × ${b} =`; ans = a * b; break
    }
    case 'div': {
      b = rand(2, max); ans = rand(2, max)
      a = b * ans; q = `${a} ÷ ${b} =`; break
    }
    case 'divr': {
      b = rand(2, 9); ans = rand(2, 12)
      const r = rand(0, b - 1)
      a = b * ans + r
      q = `${a} ÷ ${b} =`
      ans = r === 0 ? ans : `${ans}……${r}`
      break
    }
    case 'muldiv': {
      if (Math.random() < 0.5) {
        a = rand(2, max); b = rand(2, max)
        q = `${a} × ${b} =`; ans = a * b
      } else {
        b = rand(2, max); ans = rand(2, max); a = b * ans
        q = `${a} ÷ ${b} =`
      }
      break
    }
    case 'all': {
      const op = rand(0, 3)
      if (op === 0) { a = rand(1, max); b = rand(1, max); q = `${a} + ${b} =`; ans = a + b }
      else if (op === 1) { a = rand(2, max); b = rand(1, a); q = `${a} - ${b} =`; ans = a - b }
      else if (op === 2) { a = rand(2, 12); b = rand(2, 12); q = `${a} × ${b} =`; ans = a * b }
      else { b = rand(2, 9); ans = rand(2, 12); a = b * ans; q = `${a} ÷ ${b} =` }
      break
    }
    default:
      a = rand(1, 10); b = rand(1, 10); q = `${a} + ${b} =`; ans = a + b
  }
  return { q, ans: String(ans) }
}

const TOTAL = 20

// ── 主组件 ──────────────────────────────────────────────────
export default function ArithmeticDrill({ user, onBack }) {
  const [grade, setGrade] = useState(null)
  const [configIdx, setConfigIdx] = useState(null)
  const [phase, setPhase] = useState('setup') // setup | drill | result

  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [input, setInput] = useState('')
  const [results, setResults] = useState([]) // {q, ans, user, correct}
  const [startTime, setStartTime] = useState(null)
  const [elapsed, setElapsed] = useState(0)
  const [shake, setShake] = useState(false)
  const inputRef = useRef(null)
  const timerRef = useRef(null)

  const config = grade && configIdx !== null ? CONFIGS[grade][configIdx] : null

  function startDrill() {
    const qs = Array.from({ length: TOTAL }, () => genQuestion(config))
    setQuestions(qs)
    setCurrent(0)
    setInput('')
    setResults([])
    setStartTime(Date.now())
    setElapsed(0)
    setPhase('drill')
  }

  // 计时器
  useEffect(() => {
    if (phase !== 'drill') return
    timerRef.current = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 500)
    return () => clearInterval(timerRef.current)
  }, [phase, startTime])

  // 自动聚焦
  useEffect(() => {
    if (phase === 'drill') inputRef.current?.focus()
  }, [phase, current])

  const submit = useCallback(() => {
    if (!input.trim()) return
    const q = questions[current]
    const correct = input.trim() === q.ans
    if (!correct) {
      setShake(true)
      setTimeout(() => setShake(false), 400)
    }
    const entry = { q: q.q, ans: q.ans, user: input.trim(), correct }
    const newResults = [...results, entry]
    setResults(newResults)
    setInput('')
    if (current + 1 >= TOTAL) {
      clearInterval(timerRef.current)
      setElapsed(Math.floor((Date.now() - startTime) / 1000))
      setPhase('result')
      // 把错题存入 Firestore
      const wrong = newResults.filter(r => !r.correct)
      if (wrong.length > 0 && user) {
        wrong.forEach(w => {
          addDoc(collection(db, 'mistakes'), {
            userId: user.uid,
            subject: '数学',
            topic: config.label,
            grade: Number(grade),
            question: w.q,
            myAnswer: w.user,
            correctAnswer: w.ans,
            status: 'new',
            explanation: null,
            similarQuestions: null,
            createdAt: serverTimestamp(),
          })
        })
      }
    } else {
      setCurrent(c => c + 1)
    }
  }, [input, questions, current, results, startTime, user, grade, config])

  if (phase === 'setup') {
    return (
      <div className="drill">
        <button className="back-btn" onClick={onBack}>← 数学</button>
        <h2 className="drill-title">口算练习</h2>

        <div className="setup-section">
          <div className="setup-label">选择年级</div>
          <div className="grade-btns">
            {[1,2,3,4,5,6].map(g => (
              <button key={g} className={grade === g ? 'grade-btn active' : 'grade-btn'} onClick={() => { setGrade(g); setConfigIdx(null) }}>
                {g}年级
              </button>
            ))}
          </div>
        </div>

        {grade && (
          <div className="setup-section">
            <div className="setup-label">选择题型</div>
            <div className="type-btns">
              {CONFIGS[grade].map((c, i) => (
                <button key={i} className={configIdx === i ? 'type-btn active' : 'type-btn'} onClick={() => setConfigIdx(i)}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          className="start-btn"
          disabled={!grade || configIdx === null}
          onClick={startDrill}
        >
          开始练习（{TOTAL}题）
        </button>
      </div>
    )
  }

  if (phase === 'drill') {
    const q = questions[current]
    const progress = ((current) / TOTAL) * 100
    return (
      <div className="drill">
        <div className="drill-topbar">
          <span className="drill-counter">{current + 1} / {TOTAL}</span>
          <span className="drill-timer">⏱ {elapsed}s</span>
        </div>
        <div className="drill-progress"><div className="drill-progress-bar" style={{ width: `${progress}%` }} /></div>

        <div className={`question-display ${shake ? 'shake' : ''}`}>{q.q}</div>

        <input
          ref={inputRef}
          className="drill-input"
          type="text"
          inputMode="numeric"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="输入答案，按回车确认"
          autoComplete="off"
        />
        <button className="confirm-btn" onClick={submit}>确认</button>
      </div>
    )
  }

  // result
  const score = results.filter(r => r.correct).length
  const wrong = results.filter(r => !r.correct)
  const mins = Math.floor(elapsed / 60)
  const secs = elapsed % 60
  const timeStr = mins > 0 ? `${mins}分${secs}秒` : `${secs}秒`

  return (
    <div className="drill">
      <div className="result-header">
        <div className="result-score">{score}<span className="result-total">/{TOTAL}</span></div>
        <div className="result-time">用时 {timeStr}</div>
        <div className="result-stars">{'⭐'.repeat(Math.ceil(score / TOTAL * 5))}</div>
        {wrong.length > 0 && <div className="result-hint">✓ {wrong.length} 道错题已自动保存到错题本</div>}
      </div>

      {wrong.length > 0 && (
        <div className="result-wrongs">
          <div className="wrongs-title">错题回顾</div>
          {wrong.map((w, i) => (
            <div key={i} className="wrong-item">
              <span className="wrong-q">{w.q}</span>
              <span className="wrong-user">你的答案：<em>{w.user}</em></span>
              <span className="wrong-ans">正确：<strong>{w.ans}</strong></span>
            </div>
          ))}
        </div>
      )}

      <div className="result-actions">
        <button className="again-btn" onClick={startDrill}>再练一次</button>
        <button className="change-btn" onClick={() => setPhase('setup')}>换题型</button>
        <button className="back-btn-flat" onClick={onBack}>返回</button>
      </div>
    </div>
  )
}
