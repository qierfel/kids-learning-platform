import { useMemo, useState } from 'react'
import ExamShell from './ExamShell'
import { ketReadingWritingOfficialSample } from '../../data/ketReadingWriting'

function normalizeText(value) {
  return String(value || '').trim().toLowerCase()
}

export default function KetReadingWritingExam({ onBack, onAddMistake }) {
  const [answers, setAnswers] = useState({})
  const [part6, setPart6] = useState('')
  const [part7, setPart7] = useState('')
  const [submitted, setSubmitted] = useState(null)

  const scoredQuestions = ketReadingWritingOfficialSample.scoredParts.flatMap(part =>
    part.questions.map(question => ({ ...question, partTitle: part.title })),
  )

  const answeredCount = useMemo(() => {
    const scoredCount = Object.values(answers).filter(value => String(value || '').trim()).length
    const writingCount = (part6.trim() ? 1 : 0) + (part7.trim() ? 1 : 0)
    return scoredCount + writingCount
  }, [answers, part6, part7])

  function isCorrect(question, userAnswer) {
    if (Array.isArray(question.answer)) {
      return question.answer.some(item => normalizeText(item) === normalizeText(userAnswer))
    }
    return normalizeText(question.answer) === normalizeText(userAnswer)
  }

  function submit({ autoSubmitted }) {
    const readingScore = scoredQuestions.reduce(
      (sum, q) => sum + (isCorrect(q, answers[q.id]) ? 1 : 0),
      0,
    )

    scoredQuestions.forEach(q => {
      const userAnswer = answers[q.id]
      if (String(userAnswer || '').trim() && !isCorrect(q, userAnswer)) {
        onAddMistake?.({
          subject: '英语',
          category: 'KET阅读与写作',
          prompt: `${q.partTitle} · 第 ${q.number} 题`,
          userAnswer,
          correctAnswer: Array.isArray(q.answer) ? q.answer.join(' / ') : q.answer,
        })
      }
    })

    setSubmitted({
      autoSubmitted,
      readingScore,
      readingTotal: scoredQuestions.length,
      part6Ready: Boolean(part6.trim()),
      part7Ready: Boolean(part7.trim()),
    })
  }

  if (submitted) {
    return (
      <div className="ket-page">
        <button className="ket-back-btn" onClick={onBack}>← 返回 KET 首页</button>
        <div className="ket-result-card">
          <div className="ket-result-badge">Reading & Writing Result</div>
          <h1 className="ket-result-title">读写已交卷</h1>
          <p className="ket-result-score">Reading {submitted.readingScore} / {submitted.readingTotal}</p>
          <p className="ket-result-note">
            {submitted.autoSubmitted ? '时间到，系统已自动交卷。' : '你已完成这套官方样题读写。'}
          </p>
          <p className="ket-result-note">
            Writing Part 6：{submitted.part6Ready ? '已提交' : '未提交'} ｜ Part 7：{submitted.part7Ready ? '已提交' : '未提交'}
          </p>
          <div className="ket-resource-list">
            <a href={ketReadingWritingOfficialSample.media.questions} target="_blank" rel="noreferrer">查看官方题目</a>
            <a href={ketReadingWritingOfficialSample.media.answerKey} target="_blank" rel="noreferrer">查看官方答案</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ket-page">
      <button className="ket-back-btn" onClick={onBack}>← 返回 KET 首页</button>
      <ExamShell
        examId={ketReadingWritingOfficialSample.paperId}
        title={ketReadingWritingOfficialSample.title}
        subtitle="官方样题试运行 · Reading 自动判分 + Writing 提交留档"
        durationMinutes={ketReadingWritingOfficialSample.durationMinutes}
        answeredCount={answeredCount}
        totalCount={scoredQuestions.length + 2}
        onSubmit={submit}
      >
        <div className="ket-paper-card">
          <div className="ket-resource-panel">
            <div className="ket-resource-title">官方资料</div>
            <div className="ket-resource-list">
              <a href={ketReadingWritingOfficialSample.media.questions} target="_blank" rel="noreferrer">打开读写题目 PDF</a>
              <a href={ketReadingWritingOfficialSample.media.answerKey} target="_blank" rel="noreferrer">打开读写答案 PDF</a>
            </div>
            <ul className="ket-note-list">
              {ketReadingWritingOfficialSample.notes.map(note => <li key={note}>{note}</li>)}
            </ul>
          </div>

          {ketReadingWritingOfficialSample.scoredParts.map(part => (
            <div key={part.id} className="ket-part-block">
              <div className="ket-section-label">{part.title}</div>
              {part.passage ? <p className="ket-passage">{part.passage}</p> : null}
              {part.questions.map(question => (
                <div key={question.id} className="ket-question-card">
                  <div className="ket-question-meta">{part.title} · 第 {question.number} 题</div>
                  <div className="ket-question-title">{question.prompt}</div>
                  {question.options ? (
                    <div className="ket-options">
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

          <div className="ket-section-label">Writing Part 6</div>
          <div className="ket-writing-card">
            <div className="ket-question-title">{ketReadingWritingOfficialSample.writing.part6.title}</div>
            <p className="ket-passage">{ketReadingWritingOfficialSample.writing.part6.prompt}</p>
            <textarea
              className="ket-writing-textarea"
              value={part6}
              onChange={e => setPart6(e.target.value)}
              placeholder="在这里输入 Part 6 的邮件答案。"
            />
          </div>

          <div className="ket-section-label">Writing Part 7</div>
          <div className="ket-writing-card">
            <div className="ket-question-title">{ketReadingWritingOfficialSample.writing.part7.title}</div>
            <p className="ket-passage">{ketReadingWritingOfficialSample.writing.part7.prompt}</p>
            <textarea
              className="ket-writing-textarea"
              value={part7}
              onChange={e => setPart7(e.target.value)}
              placeholder="在这里输入 Part 7 的故事写作答案。"
            />
          </div>
        </div>
      </ExamShell>
    </div>
  )
}
