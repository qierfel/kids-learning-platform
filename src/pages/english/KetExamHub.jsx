import { useState } from 'react'
import KetListeningExam from './KetListeningExam'
import KetReadingWritingExam from './KetReadingWritingExam'
import KetSpeakingExam from './KetSpeakingExam'
import './KetExam.css'

const CARDS = [
  { id: 'full', label: '完整模拟', desc: '后续接整套真题与计时考试', status: '规划中' },
  { id: 'listening', label: '听力专项', desc: '音频播放 + 题目 + 自动判分', status: '已开放样板' },
  { id: 'readingWriting', label: '阅读与写作', desc: '阅读判分 + 写作 AI 判卷', status: '已开放样板' },
  { id: 'speaking', label: '口语模拟', desc: '分 Part 口试 + AI 评分', status: '已开放样板' },
]

export default function KetExamHub({ user, onBack, onAddMistake }) {
  const [active, setActive] = useState(null)

  if (active === 'listening') return <KetListeningExam onBack={() => setActive(null)} onAddMistake={onAddMistake} />
  if (active === 'readingWriting') return <KetReadingWritingExam onBack={() => setActive(null)} onAddMistake={onAddMistake} />
  if (active === 'speaking') return <KetSpeakingExam onBack={() => setActive(null)} user={user} />

  return (
    <div className="ket-page">
      <button className="ket-back-btn" onClick={onBack}>← 返回英语主页</button>

      <div className="ket-hero">
        <div className="ket-hero-badge">KET Exam Hub</div>
        <h1 className="ket-hero-title">KET 模拟考试平台</h1>
        <p className="ket-hero-sub">
          听力、阅读与写作、口语三大板块统一接入，支持计时、提前交卷和后续 AI 评分。
        </p>
      </div>

      <div className="ket-overview">
        <div className="ket-overview-card">
          <div className="ket-overview-label">当前阶段</div>
          <div className="ket-overview-value">平台骨架已启动</div>
        </div>
        <div className="ket-overview-card">
          <div className="ket-overview-label">考试规则</div>
          <div className="ket-overview-value">限时作答 + 自动交卷</div>
        </div>
        <div className="ket-overview-card ket-overview-card--accent">
          <div className="ket-overview-label">下一步</div>
          <div className="ket-overview-value">接入真题与音频</div>
        </div>
      </div>

      <div className="ket-section-head">
        <h2 className="ket-section-title">开始 KET 训练</h2>
        <p className="ket-section-subtitle">先用样板流程跑通整套考试体验，后续直接替换成真实资料。</p>
      </div>

      <div className="ket-card-grid">
        {CARDS.map(card => (
          <button
            key={card.id}
            className={`ket-card${card.id === 'full' ? ' ket-card--coming' : ''}`}
            onClick={() => card.id !== 'full' && setActive(card.id)}
          >
            <div className="ket-card-top">
              <div className="ket-card-title">{card.label}</div>
              <span className="ket-card-status">{card.status}</span>
            </div>
            <div className="ket-card-desc">{card.desc}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
