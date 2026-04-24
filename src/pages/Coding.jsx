import { useState } from 'react'
import codingLessons from '../data/codingLessons'
import Lesson1 from './coding/Lesson1'
import Lesson2 from './coding/Lesson2'
import Lesson3 from './coding/Lesson3'
import Lesson4 from './coding/Lesson4'
import Lesson5 from './coding/Lesson5'
import Lesson6 from './coding/Lesson6'
import './Coding.css'

const LESSON_COMPONENTS = [null, Lesson1, Lesson2, Lesson3, Lesson4, Lesson5, Lesson6]

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
        <p className="coding-hero-sub">探索人工智能的世界 · 6 节互动课程</p>
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
            <div className="coding-intro-value">6 节课</div>
          </div>
        </div>
        <div className="coding-intro-card">
          <span className="coding-intro-icon">🏆</span>
          <div>
            <div className="coding-intro-label">完成后</div>
            <div className="coding-intro-value">获得证书</div>
          </div>
        </div>
      </div>

      <h2 className="coding-section-title">课程目录</h2>

      <div className="coding-lesson-list">
        {codingLessons.map((lesson, idx) => (
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
  )
}
