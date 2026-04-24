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

const CODING_NOTES = [
  '启蒙部分负责让孩子不再怕 AI，创作部分负责让孩子真正入坑。',
  '课程页要更像“闯关做作品”，而不是一组单独知识点。',
  '手机适合快速继续进度，iPad 更适合完整做一课，电脑更适合作品展示与家长陪学。',
]

export default function Coding({ user }) {
  const [activeLesson, setActiveLesson] = useState(null)

  if (activeLesson) {
    const LessonComp = LESSON_COMPONENTS[activeLesson]
    return <LessonComp onBack={() => setActiveLesson(null)} user={user} />
  }

  return (
    <div className="coding-page">
      <section className="coding-hero">
        <div className="coding-hero-copy">
          <div className="coding-eyebrow">Future Maker Lab</div>
          <h1 className="coding-hero-title">AI 编程创作屋</h1>
          <p className="coding-hero-sub">
            这里不是只认识 AI，而是一步步把想法做成网页、小工具和可以展示的作品。
          </p>

          <div className="coding-hero-actions">
            <button className="coding-primary-btn" onClick={() => setActiveLesson(7)}>从创作入门开始</button>
            <button className="coding-secondary-btn" onClick={() => setActiveLesson(1)}>先看启蒙课程</button>
          </div>
        </div>

        <div className="coding-hero-side">
          <div className="coding-highlight-card">
            <div className="coding-highlight-label">推荐路线</div>
            <div className="coding-highlight-title">先启蒙，再做项目</div>
            <div className="coding-highlight-text">前 1-6 课建立 AI 认知，7-12 课开始进入网页和交互创作。</div>
          </div>
          <div className="coding-mini-stats">
            <div className="coding-mini-card">
              <div className="coding-mini-label">课程数量</div>
              <div className="coding-mini-value">{codingLessons.length} 节</div>
            </div>
            <div className="coding-mini-card">
              <div className="coding-mini-label">主要年龄</div>
              <div className="coding-mini-value">10-12 岁</div>
            </div>
          </div>
        </div>
      </section>

      <section className="coding-section">
        <div className="coding-section-head">
          <div>
            <h2 className="coding-section-title">学习地图</h2>
            <p className="coding-section-subtitle">把课程分成两段来看，会更容易理解这条路径为什么能把孩子带入创作状态。</p>
          </div>
        </div>

        <div className="coding-track-grid">
          <div className="coding-track-card coding-track-card--intro">
            <div className="coding-track-tag">模块 A</div>
            <div className="coding-track-title">AI 素养启蒙</div>
            <p className="coding-track-desc">认识 AI、数据、训练、语言和视觉，先建立兴趣和基础理解。</p>
            <button className="coding-track-btn" onClick={() => setActiveLesson(1)}>从第 1 课开始</button>
          </div>

          <div className="coding-track-card coding-track-card--build">
            <div className="coding-track-tag">模块 B</div>
            <div className="coding-track-title">AI 创作入门</div>
            <p className="coding-track-desc">开始做网页、做交互、请 AI 帮忙，把“我学了”变成“我做出来了”。</p>
            <button className="coding-track-btn" onClick={() => setActiveLesson(7)}>从第 7 课开始</button>
          </div>
        </div>
      </section>

      <section className="coding-section">
        <div className="coding-section-head">
          <div>
            <h2 className="coding-section-title">全部课程</h2>
            <p className="coding-section-subtitle">每一课都应该让孩子得到一点看得见的反馈，逐渐形成作品感和持续学习欲望。</p>
          </div>
        </div>

        <div className="coding-lesson-list">
          {codingLessons.map((lesson) => (
            <button
              key={lesson.id}
              className="coding-lesson-card"
              style={{ '--lesson-color': lesson.color, background: lesson.bg }}
              onClick={() => setActiveLesson(lesson.id)}
            >
              <div className="coding-lesson-leading">
                <div className="coding-lesson-num">第 {lesson.id} 课</div>
                <div className="coding-lesson-emoji">{lesson.emoji}</div>
              </div>

              <div className="coding-lesson-info">
                <div className="coding-lesson-title-row">
                  <div className="coding-lesson-title">{lesson.title}</div>
                  <span className="coding-lesson-time">⏱ {lesson.duration}</span>
                </div>
                <div className="coding-lesson-sub">{lesson.subtitle}</div>
                <div className="coding-lesson-goals">
                  {lesson.objectives.slice(0, 2).map((goal) => (
                    <span key={goal} className="coding-goal-pill">{goal}</span>
                  ))}
                </div>
              </div>

              <div className="coding-lesson-arrow">→</div>
            </button>
          ))}
        </div>
      </section>

      <section className="coding-section coding-section--notes">
        <div className="coding-note-panel">
          <div className="coding-note-title">这个专区现在在往哪里走</div>
          <div className="coding-note-grid">
            {CODING_NOTES.map((note) => (
              <div key={note} className="coding-note-item">{note}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
