import { useState } from 'react'
import codingLessons from '../data/codingLessons'
import Lesson1 from './coding/Lesson1'
import Lesson2 from './coding/Lesson2'
import Lesson3 from './coding/Lesson3'
import Lesson4 from './coding/Lesson4'
import Lesson5 from './coding/Lesson5'
import Lesson6 from './coding/Lesson6'
import Lesson7 from './coding/Lesson7'
import Lesson8 from './coding/Lesson8'
import Lesson9 from './coding/Lesson9'
import Lesson10 from './coding/Lesson10'
import Lesson11 from './coding/Lesson11'
import Lesson12 from './coding/Lesson12'
import './Coding.css'

const LESSON_COMPONENTS = [null, Lesson1, Lesson2, Lesson3, Lesson4, Lesson5, Lesson6, Lesson7, Lesson8, Lesson9, Lesson10, Lesson11, Lesson12]

const MODULE_A = codingLessons.filter(l => l.id <= 6)
const MODULE_B = codingLessons.filter(l => l.id >= 7)

export default function Coding({ user }) {
  const [activeLesson, setActiveLesson] = useState(null)

  if (activeLesson) {
    const LessonComp = LESSON_COMPONENTS[activeLesson]
    return <LessonComp onBack={() => setActiveLesson(null)} user={user} />
  }

  return (
    <div className="coding-page">
      <div className="coding-hero">
        <div className="coding-hero-icon">🤖</div>
        <h1 className="coding-hero-title">AI 编程启蒙</h1>
        <p className="coding-hero-sub">探索人工智能 · 动手创作网页 · 12 节互动课程</p>
      </div>

      <div className="coding-intro">
        <div className="coding-intro-card">
          <span className="coding-intro-icon">🎯</span>
          <div>
            <div className="coding-intro-label">适合年龄</div>
            <div className="coding-intro-value">8 - 12 岁</div>
          </div>
        </div>
        <div className="coding-intro-card">
          <span className="coding-intro-icon">📚</span>
          <div>
            <div className="coding-intro-label">课程数量</div>
            <div className="coding-intro-value">12 节课</div>
          </div>
        </div>
        <div className="coding-intro-card">
          <span className="coding-intro-icon">🏆</span>
          <div>
            <div className="coding-intro-label">完成后</div>
            <div className="coding-intro-value">做出作品</div>
          </div>
        </div>
      </div>

      <div className="coding-module-section">
        <div className="coding-module-header">
          <span className="coding-module-badge" style={{ background: '#eef2ff', color: '#4338ca' }}>模块 A</span>
          <h2 className="coding-section-title">AI 素养启蒙</h2>
          <p className="coding-module-desc">认识AI、理解数据、训练模型</p>
        </div>
        <div className="coding-lesson-list">
          {MODULE_A.map((lesson) => (
            <button
              key={lesson.id}
              className="coding-lesson-card"
              style={{ '--lesson-color': lesson.color, background: lesson.bg }}
              onClick={() => setActiveLesson(lesson.id)}
            >
              <div className="coding-lesson-num">第 {lesson.id} 课</div>
              <div className="coding-lesson-emoji">{lesson.emoji}</div>
              <div className="coding-lesson-info">
                <div className="coding-lesson-title">{lesson.title}</div>
                <div className="coding-lesson-sub">{lesson.subtitle}</div>
                <div className="coding-lesson-meta">
                  <span className="coding-lesson-time">⏱ {lesson.duration}</span>
                  <span className="coding-lesson-goals">🎯 {lesson.objectives.length} 个目标</span>
                </div>
              </div>
              <div className="coding-lesson-arrow">→</div>
            </button>
          ))}
        </div>
      </div>

      <div className="coding-module-section">
        <div className="coding-module-header">
          <span className="coding-module-badge" style={{ background: '#fff7ed', color: '#c2410c' }}>模块 B</span>
          <h2 className="coding-section-title">AI 创作入门</h2>
          <p className="coding-module-desc">做网页、加交互、用AI协作、完成作品</p>
        </div>
        <div className="coding-lesson-list">
          {MODULE_B.map((lesson) => (
            <button
              key={lesson.id}
              className="coding-lesson-card"
              style={{ '--lesson-color': lesson.color, background: lesson.bg }}
              onClick={() => setActiveLesson(lesson.id)}
            >
              <div className="coding-lesson-num">第 {lesson.id} 课</div>
              <div className="coding-lesson-emoji">{lesson.emoji}</div>
              <div className="coding-lesson-info">
                <div className="coding-lesson-title">{lesson.title}</div>
                <div className="coding-lesson-sub">{lesson.subtitle}</div>
                <div className="coding-lesson-meta">
                  <span className="coding-lesson-time">⏱ {lesson.duration}</span>
                  <span className="coding-lesson-goals">🎯 {lesson.objectives.length} 个目标</span>
                </div>
              </div>
              <div className="coding-lesson-arrow">→</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
