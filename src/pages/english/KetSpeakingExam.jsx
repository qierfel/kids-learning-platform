import { useMemo, useState } from 'react'
import ExamShell from './ExamShell'
import { ketSpeakingOfficialSample } from '../../data/ketSpeaking'

export default function KetSpeakingExam({ onBack }) {
  const [completedParts, setCompletedParts] = useState({})
  const [notes, setNotes] = useState({})
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
          <h1 className="ket-result-title">口语试运行已结束</h1>
          <p className="ket-result-note">
            {submitted.autoSubmitted ? '时间到，系统已自动结束口语测试。' : '你已完成这套官方样题口语。'}
          </p>
          <p className="ket-result-note">下一版会接入录音、AI 评分、评语和改进建议。</p>
          <div className="ket-resource-list">
            <a href={ketSpeakingOfficialSample.media.speakingPdf} target="_blank" rel="noreferrer">查看官方口语题卡</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ket-page">
      <button className="ket-back-btn" onClick={onBack}>← 返回 KET 首页</button>
      <ExamShell
        examId={ketSpeakingOfficialSample.setId}
        title={ketSpeakingOfficialSample.title}
        subtitle="官方样题试运行 · 先跑通口试结构和计时"
        durationMinutes={ketSpeakingOfficialSample.totalDurationMinutes}
        answeredCount={answeredCount}
        totalCount={ketSpeakingOfficialSample.parts.length}
        onSubmit={submit}
      >
        <div className="ket-paper-card">
          <div className="ket-resource-panel">
            <div className="ket-resource-title">官方资料</div>
            <div className="ket-resource-list">
              <a href={ketSpeakingOfficialSample.media.speakingPdf} target="_blank" rel="noreferrer">打开 speaking PDF</a>
            </div>
            <ul className="ket-note-list">
              {ketSpeakingOfficialSample.notes.map(note => <li key={note}>{note}</li>)}
            </ul>
          </div>

          {ketSpeakingOfficialSample.parts.map((part, index) => (
            <div key={part.id} className="ket-question-card">
              <div className="ket-question-meta">Speaking · Part {index + 1}</div>
              <div className="ket-question-title">{part.title}</div>
              <p className="ket-passage">{part.prompt}</p>
              {part.bullets?.length ? (
                <ul className="ket-followups">
                  {part.bullets.map(item => <li key={item}>{item}</li>)}
                </ul>
              ) : null}
              <div className="ket-speaking-meta">
                <span>准备 {part.prepSeconds}s</span>
                <span>回答 {part.answerSeconds}s</span>
              </div>
              <textarea
                className="ket-writing-textarea ket-writing-textarea--compact"
                value={notes[part.id] || ''}
                onChange={e => setNotes(prev => ({ ...prev, [part.id]: e.target.value }))}
                placeholder="可以在这里记录你的回答要点或老师点评。"
              />
              <button
                className="ket-primary-btn ket-primary-btn--small"
                onClick={() => setCompletedParts(prev => ({ ...prev, [part.id]: true }))}
              >
                标记本 Part 已完成
              </button>
            </div>
          ))}

          <div className="ket-writing-card">
            <div className="ket-question-title">评分观察点</div>
            <ul className="ket-followups">
              {Object.entries(ketSpeakingOfficialSample.rubric).map(([key, value]) => (
                <li key={key}>{value}</li>
              ))}
            </ul>
          </div>
        </div>
      </ExamShell>
    </div>
  )
}
