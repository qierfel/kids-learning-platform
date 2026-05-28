import useExamTimer from './useExamTimer'

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export default function ExamShell({
  examId,
  title,
  subtitle,
  durationMinutes,
  answeredCount,
  totalCount,
  onSubmit,
  children,
}) {
  const timer = useExamTimer({
    examId,
    durationSeconds: durationMinutes * 60,
    onExpire: () => onSubmit?.({ autoSubmitted: true }),
  })

  const remainingMinutes = Math.floor(timer.remainingSeconds / 60)
  const danger = remainingMinutes < 5
  const warning = remainingMinutes < 10

  return (
    <div className="ket-shell">
      <div className={`ket-timer-bar${danger ? ' ket-timer-bar--danger' : warning ? ' ket-timer-bar--warning' : ''}`}>
        <div>
          <div className="ket-timer-label">考试计时</div>
          <div className="ket-timer-title">{title}</div>
          {subtitle ? <div className="ket-timer-subtitle">{subtitle}</div> : null}
        </div>
        <div className="ket-timer-right">
          <div className="ket-timer-clock">{formatTime(timer.remainingSeconds)}</div>
          <div className="ket-timer-meta">已完成 {answeredCount}/{totalCount}</div>
        </div>
      </div>

      {children}

      <div className="ket-submit-row">
        <button
          className="ket-secondary-btn"
          onClick={() => {
            if (window.confirm('确认重置当前样板考试吗？')) timer.reset()
          }}
        >
          重置计时
        </button>
        <button
          className="ket-primary-btn"
          onClick={() => {
            if (window.confirm('确认提前交卷吗？交卷后将不能继续修改。')) {
              timer.finish()
              onSubmit?.({ autoSubmitted: false })
            }
          }}
        >
          提前交卷
        </button>
      </div>
    </div>
  )
}
