import { useState } from 'react'
import './JuniorLesson.css'

const STATES = [
  { id: 'sleep', label: '睡觉模式', emoji: '😴', color: '#64748b', copy: '现在按钮一按，角色会先安静下来。' },
  { id: 'party', label: '派对模式', emoji: '🥳', color: '#f97316', copy: '灯光亮起来，音乐好像也要开始了。' },
  { id: 'rocket', label: '发射模式', emoji: '🚀', color: '#2563eb', copy: '准备倒数，马上出发。' },
]

export default function JuniorLesson7({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [stateIdx, setStateIdx] = useState(0)
  const current = STATES[stateIdx]

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #cffafe, #dbeafe)' }}>
        <div className="junior-badge" style={{ background: '#bae6fd', color: '#0c4a6e' }}>第 7 课</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">🪄</div></div>
          <div>
            <h1 className="junior-title">按钮变变变</h1>
            <p className="junior-sub">按一下，就换一个状态</p>
          </div>
        </div>
      </div>
      <div className="junior-goals">
        <div className="junior-goal">知道按钮点一下就会变化</div>
        <div className="junior-goal">做一个会切换的小机关</div>
      </div>
      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((key) => (
          <button key={key} className="junior-tab" onClick={() => setTab(key)} style={tab === key ? { borderColor: '#06b6d4', color: '#0f766e' } : {}}>
            {key === 'learn' ? '看一看' : key === 'do' ? '玩一玩' : key === 'ai' ? '问问 AI' : '我学会了'}
          </button>
        ))}
      </div>
      <div className="junior-content">
        {tab === 'learn' && (
          <div className="junior-card">
            <h2>按钮像一个开关</h2>
            <p>你一按，它就能换颜色、换表情、换文字。按钮是网页里最会“动起来”的小东西。</p>
          </div>
        )}
        {tab === 'do' && (
          <div className="junior-card">
            <h2>试试这个魔法按钮</h2>
            <div className="project-preview" style={{ borderColor: current.color }}>
              <div className="project-top" style={{ background: current.color }}>按钮状态机</div>
              <div className="project-body">
                <div style={{ fontSize: 64, textAlign: 'center' }}>{current.emoji}</div>
                <div style={{ textAlign: 'center', fontSize: 20, fontWeight: 900, color: current.color }}>{current.label}</div>
                <div style={{ textAlign: 'center', marginTop: 8, color: '#64748b' }}>{current.copy}</div>
                <div style={{ display: 'grid', placeItems: 'center', marginTop: 16 }}>
                  <button
                    style={{ minWidth: 150, minHeight: 48, border: 'none', borderRadius: 999, background: current.color, color: '#fff', fontWeight: 900, fontSize: 16 }}
                    onClick={() => setStateIdx((prev) => (prev + 1) % STATES.length)}
                  >
                    ✨ 点一下试试
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <div className="junior-prompt">{`我想做一个按钮小游戏。\n点一下按钮以后，\n页面会换表情和文字。\n请你再帮我想 3 个可爱的状态名字。`}</div>
          </div>
        )}
        {tab === 'work' && (
          <div className="junior-card">
            <h2>今天我学会了</h2>
            <p>按钮不只是点一下，它还能让整个页面换一个样子。</p>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">🪄🔘</div>
              <h3>按钮小魔法师</h3>
              <p>你已经会做会变的按钮机关啦。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
