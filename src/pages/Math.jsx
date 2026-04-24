import { useState } from 'react'
import ArithmeticDrill from './math/ArithmeticDrill'
import MathTable from './math/MathTable'
import Formulas from './math/Formulas'
import JuniorMath from './math/JuniorMath'
import Curriculum from './math/Curriculum'
import TextbookLink from '../components/TextbookLink'
import './Subject.css'

const TOOLS = [
  { id: 'curriculum', icon: '📚', label: '课程体系', desc: '苏教版 · 知识点树 · 易错点 · 难度', ready: true, tone: 'warm' },
  { id: 'junior', icon: '📐', label: '初中数学', desc: '代数 · 几何 · 函数 · 概率 · 中考考点', ready: true, tone: 'deep' },
  { id: 'drill', icon: '算', label: '口算练习', desc: '加减乘除 · 计时 · 自动存错题', ready: true, tone: 'gold' },
  { id: 'table', icon: '×', label: '乘法表', desc: '查看 · 分行练习 · 随机测验', ready: true, tone: 'mint' },
  { id: 'formulas', icon: '形', label: '图形公式', desc: '面积 · 周长 · 体积 · 例题', ready: true, tone: 'deep' },
]

const MATH_NOTES = [
  '先从“今天只做一道什么题”开始，更容易坚持。',
  'iPad 更适合口算、图形和公式这种半练习半讲解的节奏。',
  '初中数学入口保留在同一页，减少年级切换的迷路感。',
]

export default function MathPage({ user }) {
  const [activeTool, setActiveTool] = useState(null)

  if (activeTool === 'curriculum') return <Curriculum onBack={() => setActiveTool(null)} />
  if (activeTool === 'junior') return <JuniorMath user={user} onBack={() => setActiveTool(null)} />
  if (activeTool === 'drill') return <ArithmeticDrill user={user} onBack={() => setActiveTool(null)} />
  if (activeTool === 'table') return <MathTable onBack={() => setActiveTool(null)} />
  if (activeTool === 'formulas') return <Formulas onBack={() => setActiveTool(null)} />

  return (
    <div className="subject-shell subject-shell--math">
      <section className="subject-hero">
        <div className="subject-hero-copy">
          <div className="subject-eyebrow">Mathematics Studio</div>
          <h1 className="subject-title">
            数学
            <span className="edition">小学 · 初中</span>
          </h1>
          <p className="subject-lead">
            把计算、知识点、图形和进阶内容放进一套更清楚的入口里，让孩子在手机上也能快速开始，在 iPad 和电脑上也能更舒服地持续学。
          </p>
        </div>

        <div className="subject-hero-panel">
          <div className="subject-stat-card">
            <div className="subject-stat-label">推荐节奏</div>
            <div className="subject-stat-value">短练习 + 稳定复盘</div>
          </div>
          <div className="subject-stat-card">
            <div className="subject-stat-label">适合设备</div>
            <div className="subject-stat-value">手机 / iPad / 电脑</div>
          </div>
          <div className="subject-stat-card subject-stat-card--accent">
            <div className="subject-stat-label">学习路线</div>
            <div className="subject-stat-value">基础打牢，再做进阶探索</div>
          </div>
        </div>
      </section>

      <section className="subject-section">
        <div className="subject-section-head">
          <div>
            <h2 className="subject-section-title">教材与入口</h2>
            <p className="subject-section-subtitle">先看到今天能学什么，再决定走哪条路径。</p>
          </div>
        </div>
        <TextbookLink subject="数学" />
      </section>

      <section className="subject-section">
        <div className="subject-section-head">
          <div>
            <h2 className="subject-section-title">开始学习</h2>
            <p className="subject-section-subtitle">把最常用的数学功能整理成卡片入口，更适合孩子直接点击进入。</p>
          </div>
        </div>

        <div className="tool-grid">
          {TOOLS.map(t => (
            <button
              key={t.id}
              className={`tool-card tool-card--${t.tone}${t.ready ? '' : ' coming-soon'}`}
              onClick={() => t.ready && setActiveTool(t.id)}
            >
              <div className="tool-card-top">
                <div className="tool-icon">{t.icon}</div>
                {!t.ready && <span className="badge">即将上线</span>}
              </div>
              <div className="tool-label">{t.label}</div>
              <div className="tool-desc">{t.desc}</div>
            </button>
          ))}
        </div>
      </section>

      <section className="subject-section subject-section--notes">
        <div className="subject-note-panel">
          <div className="subject-note-title">这一页的设计重点</div>
          <div className="subject-note-grid">
            {MATH_NOTES.map((note) => (
              <div key={note} className="subject-note-item">{note}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
