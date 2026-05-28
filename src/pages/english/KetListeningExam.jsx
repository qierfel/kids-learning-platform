import { useMemo, useState } from 'react'
import ExamShell from './ExamShell'
import { ketListeningSample } from '../../data/ketListening'

export default function KetListeningExam({ onBack, onAddMistake }) {
  const questions = ketListeningSample.parts.flatMap(part =>
    part.questions.map(q => ({ ...q, partTitle: part.title, audio: part.audio })),
  )
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(null)

  const answeredCount = useMemo(
    () => Object.values(answers).filter(Boolean).length,
    [answers],
  )

  function submit({ autoSubmitted }) {
    const score = questions.reduce((sum, q) => sum + (answers[q.id] === q.answer ? 1 : 0), 0)
    setSubmitted({ score, total: questions.length, autoSubmitted })
    questions.forEach(q => {
      if (answers[q.id] && answers[q.id] !== q.answer) {
        onAddMistake?.({
          subject: '英语',
          category: 'KET听力',
          prompt: q.prompt,
          userAnswer: answers[q.id],
          correctAnswer: q.answer,
        })
      }
    })
  }

  if (submitted) {
    return (
      <div className="ket-page">
        <button className="ket-back-btn" onClick={onBack}>← 返回 KET 首页</button>
        <div className="ket-result-card">
          <div className="ket-result-badge">Listening Result</div>
          <h1 className="ket-result-title">听力已交卷</h1>
          <p className="ket-result-score">{submitted.score} / {submitted.total}</p>
          <p className="ket-result-note">
            {submitted.autoSubmitted ? '时间到，系统已自动交卷。' : '你已提前完成本次样板听力。'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="ket-page">
      <button className="ket-back-btn" onClick={onBack}>← 返回 KET 首页</button>
      <ExamShell
        examId="ket-listening-sample-1"
        title={ketListeningSample.title}
        subtitle="听力样板考试 · 时间到自动交卷"
        durationMinutes={ketListeningSample.durationMinutes}
        answeredCount={answeredCount}
        totalCount={questions.length}
        onSubmit={submit}
      >
        <div className="ket-paper-card">
          <div className="ket-audio-box">
            <div className="ket-audio-label">听力材料</div>
            <audio controls src={questions[0]?.audio}>
              Your browser does not support audio playback.
            </audio>
            <p className="ket-audio-note">第一版先接样板音频位，后续可替换为真题音频。</p>
          </div>

          <div className="ket-question-list">
            {questions.map((q, index) => (
              <div key={q.id} className="ket-question-card">
                <div className="ket-question-meta">{q.partTitle} · 第 {index + 1} 题</div>
                <div className="ket-question-title">{q.prompt}</div>
                <div className="ket-options">
                  {q.options.map(option => (
                    <label key={option} className={`ket-option${answers[q.id] === option ? ' ket-option--active' : ''}`}>
                      <input
                        type="radio"
                        name={q.id}
                        checked={answers[q.id] === option}
                        onChange={() => setAnswers(prev => ({ ...prev, [q.id]: option }))}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ExamShell>
    </div>
  )
}
