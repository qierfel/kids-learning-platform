import { useState } from 'react'
import './ConfusableDetail.css'

export default function ConfusableDetail({ item, quizMode, onBack }) {
  const [mode, setMode] = useState(quizMode ? 'quiz' : 'study')
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [nextReady, setNextReady] = useState(false)

  // 生成练习题：每个字的所有词都出题，随机打乱
  function buildQuestions() {
    const all = []
    item.chars.forEach((char, i) => {
      item.words[i].forEach(word => {
        if (word.length >= 2 && word.includes(char)) {
          all.push({ blank: word.replace(char, '＿'), answer: char, word })
        }
      })
    })
    // Fisher-Yates 洗牌
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]]
    }
    return all.length > 0 ? all : item.chars.map((char, i) => ({
      blank: `＿（${item.meaning[i] || char}）`,
      answer: char,
      word: char,
    }))
  }

  // 用惰性初始化，保证题目只生成一次，不随重渲染变化
  const [questions, setQuestions] = useState(() => buildQuestions())

  function handleAnswer(char) {
    if (quizAnswer !== null) return
    setQuizAnswer(char)
    if (char === questions[quizIndex].answer) setScore(s => s + 1)
    setNextReady(false)
    setTimeout(() => setNextReady(true), 400)
  }

  function nextQuestion() {
    if (quizIndex + 1 >= questions.length) {
      setDone(true)
    } else {
      setQuizIndex(i => i + 1)
      setQuizAnswer(null)
    }
  }

  function restart() {
    setQuestions(buildQuestions())
    setQuizIndex(0)
    setQuizAnswer(null)
    setScore(0)
    setDone(false)
    setNextReady(false)
  }

  return (
    <div className="detail">
      <button className="back-btn" onClick={onBack}>← 返回</button>

      <div className="mode-tabs">
        <button className={mode === 'study' ? 'tab active' : 'tab'} onClick={() => { setMode('study'); restart() }}>学习</button>
        <button className={mode === 'quiz' ? 'tab active' : 'tab'} onClick={() => { setMode('quiz'); restart() }}>练习</button>
      </div>

      {mode === 'study' && (
        <div className="study-view">
          <div className="char-cards">
            {item.chars.map((char, i) => (
              <div key={i} className="char-card">
                <div className="big-char">{char}</div>
                <div className="char-pinyin">{item.pinyin[i]}</div>
                <div className="char-meaning">{item.meaning[i]}</div>
                <div className="char-words">
                  {item.words[i].map((w, j) => (
                    <span key={j} className="word-tag">{w}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="tip-box">
            <span className="tip-icon">💡</span>
            <span className="tip-text">{item.tip}</span>
          </div>
        </div>
      )}

      {mode === 'quiz' && !done && (
        <div className="quiz-view">
          <p className="quiz-progress">{quizIndex + 1} / {questions.length}</p>
          <p className="quiz-question">填入正确的字：</p>
          <p className="quiz-blank">{questions[quizIndex].blank}</p>

          <div className="quiz-options">
            {item.chars.map((char, i) => {
              let cls = 'option-btn'
              if (quizAnswer !== null) {
                if (char === questions[quizIndex].answer) cls += ' correct'
                else if (char === quizAnswer) cls += ' wrong'
              }
              return (
                <button
                  key={i}
                  className={cls}
                  onPointerDown={(e) => { e.preventDefault(); handleAnswer(char) }}
                >
                  {char}
                </button>
              )
            })}
          </div>

          {quizAnswer !== null && (
            <div className="quiz-feedback">
              {quizAnswer === questions[quizIndex].answer
                ? <p className="feedback-correct">正确！完整词语：{questions[quizIndex].word}</p>
                : <p className="feedback-wrong">应该是"{questions[quizIndex].answer}"，完整词语：{questions[quizIndex].word}</p>
              }
              <button className="next-btn" onClick={nextQuestion} disabled={!nextReady}>
                {quizIndex + 1 >= questions.length ? '查看结果' : '下一题'}
              </button>
            </div>
          )}
        </div>
      )}

      {mode === 'quiz' && done && (
        <div className="quiz-done">
          <div className="score-circle">{score}/{questions.length}</div>
          <p className="score-msg">
            {score === questions.length ? '全对！太棒了！' : score >= questions.length / 2 ? '不错，继续加油！' : '再练一次吧！'}
          </p>
          <button className="restart-btn" onClick={restart}>再练一次</button>
          <button className="study-btn" onClick={() => { setMode('study'); restart() }}>去学习</button>
        </div>
      )}
    </div>
  )
}
