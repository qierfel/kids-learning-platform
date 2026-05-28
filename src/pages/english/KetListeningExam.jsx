import { useMemo, useState } from 'react'
import ExamShell from './ExamShell'
import { ketListeningOfficialSample } from '../../data/ketListening'

function normalizeAnswer(value) {
  return String(value || '').trim().toLowerCase()
}

export default function KetListeningExam({ onBack, onAddMistake }) {
  const questions = ketListeningOfficialSample.parts.flatMap(part =>
    part.questions.map(q => ({ ...q, partTitle: part.title })),
  )
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(null)

  const answeredCount = useMemo(
    () => Object.values(answers).filter(value => String(value || '').trim()).length,
    [answers],
  )

  function isCorrect(question, userAnswer) {
    return normalizeAnswer(userAnswer) === normalizeAnswer(question.answer)
  }

  function submit({ autoSubmitted }) {
    const score = questions.reduce(
      (sum, q) => sum + (isCorrect(q, answers[q.id]) ? 1 : 0),
      0,
    )
    setSubmitted({ score, total: questions.length, autoSubmitted })
    questions.forEach(q => {
      const userAnswer = answers[q.id]
      if (String(userAnswer || '').trim() && !isCorrect(q, userAnswer)) {
        onAddMistake?.({
          subject: '英语',
          category: 'KET听力',
          prompt: `${q.partTitle} · 第 ${q.number} 题`,
          userAnswer,
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
            {submitted.autoSubmitted ? '时间到，系统已自动交卷。' : '你已完成这套官方样题听力。'}
          </p>
          <div className="ket-resource-list">
            <a href={ketListeningOfficialSample.media.answerKey} target="_blank" rel="noreferrer">查看官方答案</a>
            <a href={ketListeningOfficialSample.media.tapeScript} target="_blank" rel="noreferrer">查看听力原文</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ket-page">
      <button className="ket-back-btn" onClick={onBack}>← 返回 KET 首页</button>
      <ExamShell
        examId={ketListeningOfficialSample.paperId}
        title={ketListeningOfficialSample.title}
        subtitle="官方样题试运行 · 时间到自动交卷"
        durationMinutes={ketListeningOfficialSample.durationMinutes}
        answeredCount={answeredCount}
        totalCount={questions.length}
        onSubmit={submit}
      >
        <div className="ket-paper-card">
          <div className="ket-resource-panel">
            <div className="ket-resource-title">官方资料</div>
            <div className="ket-resource-list">
              <a href={ketListeningOfficialSample.media.questionPaper} target="_blank" rel="noreferrer">打开听力题目 PDF</a>
              <a href={ketListeningOfficialSample.media.answerKey} target="_blank" rel="noreferrer">打开答案 PDF</a>
              <a href={ketListeningOfficialSample.media.tapeScript} target="_blank" rel="noreferrer">打开听力原文 PDF</a>
            </div>
            <ul className="ket-note-list">
              {ketListeningOfficialSample.notes.map(note => <li key={note}>{note}</li>)}
            </ul>
          </div>

          <div className="ket-audio-box">
            <div className="ket-audio-label">官方听力音频</div>
            <audio controls src={ketListeningOfficialSample.media.audio}>
              Your browser does not support audio playback.
            </audio>
          </div>

          <div className="ket-question-list">
            {ketListeningOfficialSample.parts.map(part => (
              <div key={part.partId} className="ket-part-block">
                <div className="ket-section-label">{part.title}</div>
                <p className="ket-section-subtitle">{part.instructions}</p>
                {part.questions.map(question => (
                  <div key={question.id} className="ket-question-card">
                    <div className="ket-question-meta">{part.title} · 第 {question.number} 题</div>
                    <div className="ket-question-title">{question.prompt}</div>
                    {question.options ? (
                      <div className={`ket-options${question.options.length > 3 ? ' ket-options--compact' : ''}`}>
                        {question.options.map(option => (
                          <label key={option} className={`ket-option${answers[question.id] === option ? ' ket-option--active' : ''}`}>
                            <input
                              type="radio"
                              name={question.id}
                              checked={answers[question.id] === option}
                              onChange={() => setAnswers(prev => ({ ...prev, [question.id]: option }))}
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <input
                        className="ket-short-input"
                        value={answers[question.id] || ''}
                        onChange={e => setAnswers(prev => ({ ...prev, [question.id]: e.target.value }))}
                        placeholder="请输入答案"
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </ExamShell>
    </div>
  )
}
