import { useState, useEffect, useRef } from 'react'
import './MathTable.css'

export default function MathTable({ onBack }) {
  const [mode, setMode] = useState('view') // view | quiz
  const [selected, setSelected] = useState(null) // 1-9，选某一行练习
  const [quizNum, setQuizNum] = useState(null)
  const [quizItems, setQuizItems] = useState([])
  const [current, setCurrent] = useState(0)
  const [input, setInput] = useState('')
  const [score, setScore] = useState(0)
  const [wrong, setWrong] = useState([])
  const [done, setDone] = useState(false)
  const [shake, setShake] = useState(false)
  const inputRef = useRef(null)

  function startQuiz(n) {
    const items = Array.from({ length: 9 }, (_, i) => {
      const a = n, b = i + 1
      return { q: `${a} × ${b} =`, ans: String(a * b) }
    }).sort(() => Math.random() - 0.5)
    setQuizNum(n)
    setQuizItems(items)
    setCurrent(0)
    setInput('')
    setScore(0)
    setWrong([])
    setDone(false)
    setMode('quiz')
  }

  useEffect(() => {
    if (mode === 'quiz' && !done) inputRef.current?.focus()
  }, [mode, current, done])

  function submit() {
    if (!input.trim()) return
    const item = quizItems[current]
    const correct = input.trim() === item.ans
    if (!correct) {
      setShake(true)
      setTimeout(() => setShake(false), 400)
      setWrong(w => [...w, { ...item, user: input.trim() }])
    } else {
      setScore(s => s + 1)
    }
    setInput('')
    if (current + 1 >= quizItems.length) {
      setDone(true)
    } else {
      setCurrent(c => c + 1)
    }
  }

  if (mode === 'quiz') {
    if (done) {
      return (
        <div className="table-page">
          <button className="back-btn" onClick={() => setMode('view')}>← 乘法表</button>
          <div className="quiz-result">
            <div className="quiz-score">{score}<span>/{quizItems.length}</span></div>
            <div className="quiz-stars">{'⭐'.repeat(Math.ceil(score / quizItems.length * 5))}</div>
            {wrong.length > 0 && (
              <div className="quiz-wrongs">
                {wrong.map((w, i) => (
                  <div key={i} className="quiz-wrong-item">
                    {w.q} <em>{w.user}</em> → <strong>{w.ans}</strong>
                  </div>
                ))}
              </div>
            )}
            <div className="quiz-actions">
              <button className="again-btn" onClick={() => startQuiz(quizNum)}>再练一次</button>
              <button className="change-btn" onClick={() => setMode('view')}>返回</button>
            </div>
          </div>
        </div>
      )
    }

    const item = quizItems[current]
    return (
      <div className="table-page">
        <button className="back-btn" onClick={() => setMode('view')}>← 返回</button>
        <div className="quiz-header">{quizNum} 的乘法 · {current + 1}/{quizItems.length}</div>
        <div className={`quiz-question ${shake ? 'shake' : ''}`}>{item.q}</div>
        <input
          ref={inputRef}
          className="quiz-input"
          type="text"
          inputMode="numeric"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="输入答案"
        />
        <button className="confirm-btn" onClick={submit}>确认</button>
      </div>
    )
  }

  return (
    <div className="table-page">
      <button className="back-btn" onClick={onBack}>← 数学</button>
      <h2 className="table-title">乘法表</h2>

      {selected === null ? (
        <>
          <div className="table-grid">
            {Array.from({ length: 9 }, (_, row) => (
              Array.from({ length: row + 1 }, (_, col) => {
                const a = col + 1, b = row + 1
                return (
                  <div key={`${a}x${b}`} className="table-cell">
                    <span className="cell-eq">{a}×{b}={a * b}</span>
                  </div>
                )
              })
            ))}
          </div>

          <div className="row-practice">
            <div className="row-practice-title">选一行练习</div>
            <div className="row-btns">
              {Array.from({ length: 9 }, (_, i) => (
                <button key={i+1} className="row-btn" onClick={() => startQuiz(i + 1)}>
                  {i + 1} 的乘法
                </button>
              ))}
              <button className="row-btn row-btn-all" onClick={() => startQuiz(Math.ceil(Math.random() * 9))}>
                随机
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
