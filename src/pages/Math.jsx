import { useState } from 'react'
import ArithmeticDrill from './math/ArithmeticDrill'
import MathTable from './math/MathTable'
import Formulas from './math/Formulas'
import JuniorMath from './math/JuniorMath'
import Curriculum from './math/Curriculum'
import TextbookLink from '../components/TextbookLink'
import './Subject.css'

const TOOLS = [
  { id: 'curriculum', icon: '📚', label: '课程体系', desc: '苏教版 · 知识点树 · 易错点 · 难度', ready: true },
  { id: 'junior', icon: '📐', label: '初中数学', desc: '代数 · 几何 · 函数 · 概率 · 中考考点', ready: true },
  { id: 'drill', icon: '算', label: '口算练习', desc: '加减乘除 · 计时 · 自动存错题', ready: true },
  { id: 'table', icon: '×', label: '乘法表', desc: '查看 · 分行练习 · 随机测验', ready: true },
  { id: 'formulas', icon: '形', label: '图形公式', desc: '面积 · 周长 · 体积 · 例题', ready: true },
]

export default function MathPage({ user }) {
  const [activeTool, setActiveTool] = useState(null)

  if (activeTool === 'curriculum') return <Curriculum onBack={() => setActiveTool(null)} />
  if (activeTool === 'junior') return <JuniorMath user={user} onBack={() => setActiveTool(null)} />
  if (activeTool === 'drill') return <ArithmeticDrill user={user} onBack={() => setActiveTool(null)} />
  if (activeTool === 'table') return <MathTable onBack={() => setActiveTool(null)} />
  if (activeTool === 'formulas') return <Formulas onBack={() => setActiveTool(null)} />

  return (
    <div className="subject-page">
      <h2 className="subject-title">数学 <span className="edition">小学 · 初中</span></h2>
      <TextbookLink subject="数学" edition="苏教版小学数学" />
      <div className="tool-grid">
        {TOOLS.map(t => (
          <div
            key={t.id}
            className={`tool-card ${t.ready ? '' : 'coming-soon'}`}
            onClick={() => t.ready && setActiveTool(t.id)}
          >
            <div className="tool-icon">{t.icon}</div>
            <div className="tool-label">{t.label}</div>
            <div className="tool-desc">{t.desc}</div>
            {!t.ready && <span className="badge">即将上线</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
