import { useState } from 'react'
import './Formulas.css'

const FORMULAS = [
  {
    category: '长方形',
    grade: 3,
    icon: '▭',
    color: '#3b82f6',
    bg: '#eff6ff',
    items: [
      { name: '周长', formula: 'C = (长 + 宽) × 2', example: '长=5cm，宽=3cm，周长=(5+3)×2=16cm' },
      { name: '面积', formula: 'S = 长 × 宽', example: '长=5cm，宽=3cm，面积=5×3=15cm²' },
    ]
  },
  {
    category: '正方形',
    grade: 3,
    icon: '▪',
    color: '#8b5cf6',
    bg: '#f5f3ff',
    items: [
      { name: '周长', formula: 'C = 边长 × 4', example: '边长=4cm，周长=4×4=16cm' },
      { name: '面积', formula: 'S = 边长 × 边长', example: '边长=4cm，面积=4×4=16cm²' },
    ]
  },
  {
    category: '三角形',
    grade: 4,
    icon: '▲',
    color: '#f59e0b',
    bg: '#fffbeb',
    items: [
      { name: '面积', formula: 'S = 底 × 高 ÷ 2', example: '底=6cm，高=4cm，面积=6×4÷2=12cm²' },
      { name: '三角形三边', formula: '两边之和 > 第三边', example: '3+4>5 ✓，可以组成三角形' },
      { name: '内角和', formula: '三个内角之和 = 180°', example: '60°+70°+50°=180°' },
    ]
  },
  {
    category: '平行四边形',
    grade: 4,
    icon: '▱',
    color: '#10b981',
    bg: '#ecfdf5',
    items: [
      { name: '面积', formula: 'S = 底 × 高', example: '底=6cm，高=4cm，面积=6×4=24cm²' },
    ]
  },
  {
    category: '梯形',
    grade: 5,
    icon: '⏢',
    color: '#ef4444',
    bg: '#fef2f2',
    items: [
      { name: '面积', formula: 'S = (上底 + 下底) × 高 ÷ 2', example: '上底=3cm，下底=7cm，高=4cm，面积=(3+7)×4÷2=20cm²' },
    ]
  },
  {
    category: '圆',
    grade: 6,
    icon: '○',
    color: '#ec4899',
    bg: '#fdf2f8',
    items: [
      { name: '周长', formula: 'C = π × 直径 = 2πr', example: '半径=3cm，周长=2×3.14×3≈18.84cm' },
      { name: '面积', formula: 'S = π × r²', example: '半径=3cm，面积=3.14×3²≈28.26cm²' },
      { name: '圆周率', formula: 'π ≈ 3.14', example: '精确值无限不循环' },
    ]
  },
  {
    category: '长方体',
    grade: 5,
    icon: '▬',
    color: '#0ea5e9',
    bg: '#f0f9ff',
    items: [
      { name: '体积', formula: 'V = 长 × 宽 × 高', example: '长=4，宽=3，高=2，体积=4×3×2=24cm³' },
      { name: '表面积', formula: 'S = 2×(长×宽 + 长×高 + 宽×高)', example: '' },
    ]
  },
  {
    category: '正方体',
    grade: 5,
    icon: '▪',
    color: '#6366f1',
    bg: '#eef2ff',
    items: [
      { name: '体积', formula: 'V = 棱长³', example: '棱长=3cm，体积=3³=27cm³' },
      { name: '表面积', formula: 'S = 棱长² × 6', example: '棱长=3cm，表面积=9×6=54cm²' },
    ]
  },
  {
    category: '圆柱',
    grade: 6,
    icon: '⬭',
    color: '#14b8a6',
    bg: '#f0fdfa',
    items: [
      { name: '体积', formula: 'V = π × r² × 高', example: '半径=2，高=5，体积≈3.14×4×5=62.8cm³' },
      { name: '侧面积', formula: 'S侧 = 底面周长 × 高', example: '' },
      { name: '表面积', formula: 'S = 2πr² + 2πrh', example: '' },
    ]
  },
]

export default function Formulas({ onBack }) {
  const [grade, setGrade] = useState('全部')
  const [expanded, setExpanded] = useState(null)

  const filtered = grade === '全部' ? FORMULAS : FORMULAS.filter(f => f.grade <= Number(grade))

  return (
    <div className="formulas">
      <button className="back-btn" onClick={onBack}>← 数学</button>
      <h2 className="formulas-title">图形公式</h2>

      <div className="grade-tabs">
        {['全部', '3', '4', '5', '6'].map(g => (
          <button key={g} className={grade === g ? 'grade-tab active' : 'grade-tab'} onClick={() => setGrade(g)}>
            {g === '全部' ? '全部' : `≤${g}年级`}
          </button>
        ))}
      </div>

      <div className="formula-cards">
        {filtered.map((f, fi) => (
          <div key={fi} className="formula-card" style={{ '--card-color': f.color, '--card-bg': f.bg }}>
            <div className="formula-card-header" onClick={() => setExpanded(expanded === fi ? null : fi)}>
              <div className="formula-icon" style={{ color: f.color }}>{f.icon}</div>
              <div className="formula-category">{f.category}</div>
              <div className="formula-grade">{f.grade}年级</div>
              <div className="formula-expand">{expanded === fi ? '▲' : '▼'}</div>
            </div>

            {expanded === fi && (
              <div className="formula-items">
                {f.items.map((item, ii) => (
                  <div key={ii} className="formula-item">
                    <div className="formula-name">{item.name}</div>
                    <div className="formula-text">{item.formula}</div>
                    {item.example && <div className="formula-example">例：{item.example}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
