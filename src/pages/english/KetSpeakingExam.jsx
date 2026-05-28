import { useMemo, useState } from 'react'
import ExamShell from './ExamShell'
import { ketSpeakingSample } from '../../data/ketSpeaking'

export default function KetSpeakingExam({ onBack }) {
  const [completedParts, setCompletedParts] = useState({})
  const [submitted, setSubmitted] = useState(null)

  const answeredCount = useMemo(
    () => Object.values(completedParts).filter(Boolean).length,
    [completedParts],
  )

  function submit({ autoSubmitted }) {
    setSubmitted({ autoSubmitted })
  }

  if (submitted) {
    return (
      <div className="ket-page">
        <button className="ket-back-btn" onClick={onBack}>← 返回 KET 首页</button>
        <div className="ket-result-card">
          <div className="ket-result-badge">Speaking Result</div>
          <h1 className="ket-result-title">口语样板已结束</h1>
          <p className="ket-result-note">
            {submitted.autoSubmitted ? '时间到，系统已自动结束口语测试。' : '你已完成本次口语样板。'}
          </p>
          <p className="ket-result-note">后续接入真实题库后，这里将显示 AI 评分、评语和改进建议。</p>
        </div>
      </div>
    )
  }

  return (
    <div className="ket-page">
      <button className="ket-back-btn" onClick={onBack}>← 返回 KET 首页</button>
      <ExamShell
        examId="ket-speaking-sample-1"
        title={ketSpeakingSample.title}
        subtitle="口语样板考试 · 每个 Part 可单独完成"
        durationMinutes={ketSpeakingSample.totalDurationMinutes}
        answeredCount={answeredCount}
        totalCount={ketSpeakingSample.parts.length}
        onSubmit={submit}
      >
        <div className="ket-paper-card">
          {ketSpeakingSample.parts.map((part, index) => (
            <div key={part.id} className="ket-question-card">
              <div className="ket-question-meta">Speaking · Part {index + 1}</div>
              <div className="ket-question-title">{part.title}</div>
              <p className="ket-passage">{part.prompt}</p>
              {part.followUps?.length ? (
                <ul className="ket-followups">
                  {part.followUps.map(item => <li key={item}>{item}</li>)}
                </ul>
              ) : null}
              <div className="ket-speaking-meta">
                <span>准备 {part.prepSeconds}s</span>
                <span>回答 {part.answerSeconds}s</span>
              </div>
              <button
                className="ket-primary-btn ket-primary-btn--small"
                onClick={() => setCompletedParts(prev => ({ ...prev, [part.id]: true }))}
              >
                标记本题已完成
              </button>
            </div>
          ))}
        </div>
      </ExamShell>
    </div>
  )
}
