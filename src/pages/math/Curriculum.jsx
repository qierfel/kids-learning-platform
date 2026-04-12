import { useState, useMemo } from 'react'
import mathCurriculum from '../../data/mathCurriculum'
import TextbookLink from '../../components/TextbookLink'
import './Curriculum.css'

const DIFFICULTY_LABELS = ['', '入门', '基础', '中等', '较难', '挑战']
const DIFFICULTY_COLORS = ['', '#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444']

export default function Curriculum({ onBack }) {
  const grades = mathCurriculum.grades
  const [selected, setSelected] = useState(`${grades[0].grade}-${grades[0].semester}`)
  const [openUnit, setOpenUnit] = useState(null)
  const [openTopic, setOpenTopic] = useState(null)

  const current = useMemo(
    () => grades.find(g => `${g.grade}-${g.semester}` === selected),
    [grades, selected]
  )

  // 统计：单元数 + 知识点总数
  const stats = useMemo(() => {
    if (!current) return { units: 0, topics: 0 }
    return {
      units: current.units.length,
      topics: current.units.reduce((sum, u) => sum + u.topics.length, 0),
    }
  }, [current])

  return (
    <div className="curriculum">
      <button className="back-btn" onClick={onBack}>← 数学</button>
      <h2 className="curriculum-title">
        课程体系 <span className="edition">{mathCurriculum.edition}</span>
      </h2>

      {/* 年级选择 */}
      <div className="grade-tabs">
        {grades.map(g => {
          const key = `${g.grade}-${g.semester}`
          return (
            <button
              key={key}
              className={selected === key ? 'grade-tab active' : 'grade-tab'}
              onClick={() => {
                setSelected(key)
                setOpenUnit(null)
                setOpenTopic(null)
              }}
            >
              {g.grade}年级{g.semester}册
            </button>
          )
        })}
      </div>

      {current && (
        <>
          <div className="stats">
            <span>{stats.units} 个单元</span>
            <span className="dot">·</span>
            <span>{stats.topics} 个知识点</span>
          </div>

          <TextbookLink subject="数学" edition={`苏教版${current.grade}年级${current.semester}册`} />

          <div className="units">
            {current.units.map(unit => {
              const isOpen = openUnit === unit.id
              return (
                <div key={unit.id} className="unit-card">
                  <div
                    className="unit-header"
                    onClick={() => {
                      setOpenUnit(isOpen ? null : unit.id)
                      setOpenTopic(null)
                    }}
                  >
                    <div className="unit-order">{unit.order}</div>
                    <div className="unit-info">
                      <div className="unit-name">{unit.name}</div>
                      <div className="unit-meta">{unit.topics.length} 个知识点</div>
                    </div>
                    <div className="unit-expand">{isOpen ? '▲' : '▼'}</div>
                  </div>

                  {isOpen && (
                    <div className="unit-body">
                      {unit.overview && <div className="unit-overview">{unit.overview}</div>}
                      <div className="topic-list">
                        {unit.topics.map(topic => {
                          const tOpen = openTopic === topic.id
                          return (
                            <div key={topic.id} className="topic">
                              <div
                                className="topic-header"
                                onClick={() => setOpenTopic(tOpen ? null : topic.id)}
                              >
                                <div className="topic-name">{topic.name}</div>
                                <div
                                  className="difficulty-badge"
                                  style={{
                                    background: DIFFICULTY_COLORS[topic.difficulty] + '22',
                                    color: DIFFICULTY_COLORS[topic.difficulty],
                                  }}
                                >
                                  {DIFFICULTY_LABELS[topic.difficulty]}
                                </div>
                                <div className="topic-expand">{tOpen ? '−' : '+'}</div>
                              </div>

                              {tOpen && (
                                <div className="topic-body">
                                  {topic.objectives?.length > 0 && (
                                    <Section title="学习目标" items={topic.objectives} />
                                  )}
                                  {topic.keyPoints?.length > 0 && (
                                    <Section title="核心概念" items={topic.keyPoints} accent />
                                  )}
                                  {topic.commonMistakes?.length > 0 && (
                                    <Section title="常见易错" items={topic.commonMistakes} warn />
                                  )}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

function Section({ title, items, accent, warn }) {
  return (
    <div className={`section ${accent ? 'accent' : ''} ${warn ? 'warn' : ''}`}>
      <div className="section-title">{title}</div>
      <ul className="section-list">
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </div>
  )
}
