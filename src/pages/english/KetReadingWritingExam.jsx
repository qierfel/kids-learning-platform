import { useMemo, useState } from 'react'
import ExamShell from './ExamShell'
import { ketReadingWritingSample } from '../../data/ketReadingWriting'

export default function KetReadingWritingExam({ onBack, onAddMistake }) {
  const [answers, setAnswers] = useState({})
  const [essay, setEssay] = useState('')
  const [submitted, setSubmitted] = useState(null)

  const answeredCount = useMemo(() => {
    const readingCount = Object.values(answers).filter(Boolean).length
    return readingCount + (essay.trim() ? 1 : 0)
  }, [answers, essay])

  function submit({ autoSubmitted }) {
    const readingScore = ketReadingWritingSample.reading.reduce(
      (sum, q) => sum + (answers[q.id] === q.answer ? 1 : 0),
      0,
    )
    setSubmitted({
      readingScore,
      readingTotal: ketReadingWritingSample.reading.length,
      autoSubmitted,
      writingReady: Boolean(essay.trim()),
    })
    ketReadingWritingSample.reading.forEach(q => {
      if (answers[q.id] && answers[q.id] !== q.answer) {
        onAddMistake?.({
          subject: '英语',
          category: 'KET阅读',
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
          <div className="ket-result-badge">Reading & Writing Result</div>
          <h1 className="ket-result-title">读写已交卷</h1>
          <p className="ket-result-score">阅读 {submitted.readingScore} / {submitted.readingTotal}</p>
          <p className="ket-result-note">
            {submitted.autoSubmitted ? '时间到，系统已自动交卷。' : '你已提前交卷。'}
          </p>
          <p className="ket-result-note">
            写作部分：{submitted.writingReady ? '已提交，可进入后续 AI 判卷流程。' : '未填写写作内容。'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="ket-page">
      <button className="ket-back-btn" onClick={onBack}>← 返回 KET 首页</button>
      <ExamShell
        examId="ket-reading-writing-sample-1"
        title={ketReadingWritingSample.title}
        subtitle="读写样板考试 · 阅读自动判分 + 写作后续 AI 判卷"
        durationMinutes={ketReadingWritingSample.durationMinutes}
        answeredCount={answeredCount}
        totalCount={ketReadingWritingSample.reading.length + 1}
        onSubmit={submit}
      >
        <div className="ket-paper-card">
          <div className="ket-section-label">阅读部分</div>
          {ketReadingWritingSample.reading.map((q, index) => (
            <div key={q.id} className="ket-question-card">
              <div className="ket-question-meta">Reading · 第 {index + 1} 题</div>
              <div className="ket-passage">{q.passage}</div>
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

          <div className="ket-section-label">写作部分</div>
          <div className="ket-writing-card">
            <div className="ket-question-title">{ketReadingWritingSample.writing.prompt}</div>
            <textarea
              className="ket-writing-textarea"
              value={essay}
              onChange={e => setEssay(e.target.value)}
              placeholder="在这里输入你的写作答案，后续将接入 AI 判卷和评语。"
            />
          </div>
        </div>
      </ExamShell>
    </div>
  )
}
