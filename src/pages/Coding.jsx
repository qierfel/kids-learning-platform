import { useState, useEffect } from 'react'
import codingLessons from '../data/codingLessons'
import { logActivity, getActivityForDate } from '../utils/activityLogger'
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
import Lesson13 from './coding/Lesson13'
import Lesson14 from './coding/Lesson14'
import Lesson15 from './coding/Lesson15'
import Lesson16 from './coding/Lesson16'
import Lesson17 from './coding/Lesson17'
import Lesson18 from './coding/Lesson18'
import Lesson19 from './coding/Lesson19'
import Lesson20 from './coding/Lesson20'
import Lesson21 from './coding/Lesson21'
import Lesson22 from './coding/Lesson22'
import Lesson23 from './coding/Lesson23'
import Lesson24 from './coding/Lesson24'
import Lesson25 from './coding/Lesson25'
import Lesson26 from './coding/Lesson26'
import Lesson27 from './coding/Lesson27'
import Lesson28 from './coding/Lesson28'
import Lesson29 from './coding/Lesson29'
import codingJuniorLessons from '../data/codingJuniorLessons'
import JuniorLesson1 from './coding-kids/JuniorLesson1'
import JuniorLesson2 from './coding-kids/JuniorLesson2'
import JuniorLesson3 from './coding-kids/JuniorLesson3'
import JuniorLesson4 from './coding-kids/JuniorLesson4'
import JuniorLesson5 from './coding-kids/JuniorLesson5'
import JuniorLesson6 from './coding-kids/JuniorLesson6'
import JuniorLesson7 from './coding-kids/JuniorLesson7'
import JuniorLesson8 from './coding-kids/JuniorLesson8'
import JuniorLesson9 from './coding-kids/JuniorLesson9'
import JuniorLesson10 from './coding-kids/JuniorLesson10'
import JuniorLesson11 from './coding-kids/JuniorLesson11'
import JuniorLesson12 from './coding-kids/JuniorLesson12'
import JuniorLesson13 from './coding-kids/JuniorLesson13'
import JuniorLesson14 from './coding-kids/JuniorLesson14'
import JuniorLesson15 from './coding-kids/JuniorLesson15'
import JuniorLesson16 from './coding-kids/JuniorLesson16'
import JuniorLesson17 from './coding-kids/JuniorLesson17'
import JuniorLesson18 from './coding-kids/JuniorLesson18'
import './Coding.css'

const LESSON_COMPONENTS = [null, Lesson1, Lesson2, Lesson3, Lesson4, Lesson5, Lesson6, Lesson7, Lesson8, Lesson9, Lesson10, Lesson11, Lesson12, Lesson13, Lesson14, Lesson15, Lesson16, Lesson17, Lesson18, Lesson19, Lesson20, Lesson21, Lesson22, Lesson23, Lesson24, Lesson25, Lesson26, Lesson27, Lesson28, Lesson29]
const JUNIOR_LESSON_COMPONENTS = [null, JuniorLesson1, JuniorLesson2, JuniorLesson3, JuniorLesson4, JuniorLesson5, JuniorLesson6, JuniorLesson7, JuniorLesson8, JuniorLesson9, JuniorLesson10, JuniorLesson11, JuniorLesson12, JuniorLesson13, JuniorLesson14, JuniorLesson15, JuniorLesson16, JuniorLesson17, JuniorLesson18]

// Treat ≥60s spent inside a lesson view as a completion signal for the
// learning plan's "AI编程" module (moduleKey: ai_coding, unit: 课). Each
// lesson counts at most once per day per track. Precise per-lesson signals
// (quiz pass / final project reached) would require touching every Lesson*.jsx,
// which is intentionally out of scope here.
const LESSON_COMPLETION_THRESHOLD_MS = 60 * 1000

const CODING_NOTES = [
  '启蒙部分负责让孩子不再怕 AI，创作部分负责让孩子真正入坑。',
  '课程页要更像"闯关做作品"，而不是一组单独知识点。',
  '手机适合快速继续进度，iPad 更适合完整做一课，电脑更适合作品展示与家长陪学。',
]

const KIDS_NOTES = [
  '前面先让孩子一按就有回应，后面要尽快进入“我能做一个自己的东西”。',
  '7-10 岁不是一直停留在可爱小游戏，而是要顺着台阶走到输入框、按钮、结果和小工具。',
  '每一课都应该像一个迷你创作实验，少一点说明，多一点变化、反馈和展示。',
]

function getLessonCardTheme(lessonId, track) {
  if (track === 'kids') {
    if (lessonId <= 6) return { accent: '#7dd3fc', bg: 'linear-gradient(135deg, rgba(12, 28, 54, 0.92), rgba(18, 74, 98, 0.82))' }
    if (lessonId <= 12) return { accent: '#f9a8d4', bg: 'linear-gradient(135deg, rgba(22, 22, 52, 0.92), rgba(88, 28, 84, 0.80))' }
    return { accent: '#86efac', bg: 'linear-gradient(135deg, rgba(13, 32, 39, 0.92), rgba(19, 78, 74, 0.82))' }
  }

  if (lessonId <= 6) return { accent: '#7dd3fc', bg: 'linear-gradient(135deg, rgba(9, 27, 46, 0.94), rgba(14, 63, 86, 0.82))' }
  if (lessonId <= 12) return { accent: '#f9a8d4', bg: 'linear-gradient(135deg, rgba(23, 24, 54, 0.94), rgba(91, 33, 95, 0.80))' }
  if (lessonId <= 17) return { accent: '#c4b5fd', bg: 'linear-gradient(135deg, rgba(24, 26, 62, 0.94), rgba(55, 48, 163, 0.80))' }
  if (lessonId <= 23) return { accent: '#86efac', bg: 'linear-gradient(135deg, rgba(12, 31, 38, 0.94), rgba(20, 83, 45, 0.82))' }
  return { accent: '#fdba74', bg: 'linear-gradient(135deg, rgba(40, 23, 18, 0.94), rgba(124, 45, 18, 0.82))' }
}

export default function Coding({ user }) {
  const [track, setTrack] = useState('tween')
  const [activeLesson, setActiveLesson] = useState(null)

  useEffect(() => {
    if (!activeLesson) return
    const enteredAt = Date.now()
    const lessonNum = activeLesson
    const trackKey = track
    return () => {
      if (Date.now() - enteredAt < LESSON_COMPLETION_THRESHOLD_MS) return
      const lessonId = `${trackKey}_${lessonNum}`
      const today = new Date().toISOString().slice(0, 10)
      const day = getActivityForDate(user?.uid, today)
      const already = day.events.some(
        e => e.type === 'coding_lesson_completed' && e.lessonId === lessonId
      )
      if (already) return
      logActivity(user?.uid, {
        type: 'coding_lesson_completed',
        subject: '跨学科',
        moduleKey: 'ai_coding',
        count: 1,
        lessonId,
      })
    }
  }, [activeLesson, track, user?.uid])

  if (activeLesson) {
    const LessonComp = track === 'kids' ? JUNIOR_LESSON_COMPONENTS[activeLesson] : LESSON_COMPONENTS[activeLesson]
    return <LessonComp onBack={() => setActiveLesson(null)} user={user} />
  }

  const isKids = track === 'kids'
  const lessons = isKids ? codingJuniorLessons : codingLessons

  return (
    <div className="coding-page">
      <section className="coding-hero">
        <div className="coding-hero-copy">
          <div className="coding-eyebrow">Future Maker Lab</div>
          <h1 className="coding-hero-title">{isKids ? 'AI 小创作乐园' : 'AI 编程创作屋'}</h1>
          <p className="coding-hero-sub">
            {isKids
              ? '给 7-10 岁孩子的 AI 创作入口。先让页面会回应，再让作品会长出来，最后把孩子轻轻带到真实工具和开发感觉面前。'
              : '这里不是只认识 AI，而是一步步把想法做成网页、小工具和可以展示的作品。'}
          </p>

          <div className="coding-age-switch">
            <button className={`coding-age-pill${track === 'kids' ? ' active' : ''}`} onClick={() => setTrack('kids')}>7-10 岁</button>
            <button className={`coding-age-pill${track === 'tween' ? ' active' : ''}`} onClick={() => setTrack('tween')}>10-12 岁</button>
          </div>

          <div className="coding-hero-actions">
            {isKids ? (
              <>
                <button className="coding-primary-btn" onClick={() => setActiveLesson(1)}>从第 1 课开始玩</button>
                <button className="coding-secondary-btn" onClick={() => setActiveLesson(13)}>直接看看工具课</button>
              </>
            ) : (
              <>
                <button className="coding-primary-btn" onClick={() => setActiveLesson(7)}>从创作入门开始</button>
                <button className="coding-secondary-btn" onClick={() => setActiveLesson(1)}>先看启蒙课程</button>
              </>
            )}
          </div>
        </div>

        <div className="coding-hero-side">
          <div className="coding-mascot-card" aria-hidden="true">
            <div className="coding-mascot-grid" />
            <div className="coding-mascot-orbit coding-mascot-orbit--one" />
            <div className="coding-mascot-orbit coding-mascot-orbit--two" />
            <div className="coding-mascot-spark coding-mascot-spark--one" />
            <div className="coding-mascot-spark coding-mascot-spark--two" />
            <div className="coding-mascot-spark coding-mascot-spark--three" />
            <div className="coding-mascot-stage">
              <div className="coding-mascot-shadow" />
              <div className="coding-mascot-dock" />
              <div className="coding-mascot-bot">
                <div className="coding-mascot-halo" />
                <div className="coding-mascot-antenna">
                  <span className="coding-mascot-antenna-dot" />
                </div>
                <div className="coding-mascot-head">
                  <div className="coding-mascot-head-cap" />
                  <div className="coding-mascot-face">
                    <span className="coding-mascot-eye coding-mascot-eye--left" />
                    <span className="coding-mascot-eye coding-mascot-eye--right" />
                    <span className="coding-mascot-mouth" />
                  </div>
                </div>
                <div className="coding-mascot-body">
                  <span className="coding-mascot-core" />
                  <span className="coding-mascot-panel-dot coding-mascot-panel-dot--one" />
                  <span className="coding-mascot-panel-dot coding-mascot-panel-dot--two" />
                  <span className="coding-mascot-arm coding-mascot-arm--left" />
                  <span className="coding-mascot-arm coding-mascot-arm--right" />
                  <span className="coding-mascot-leg coding-mascot-leg--left" />
                  <span className="coding-mascot-leg coding-mascot-leg--right" />
                </div>
              </div>
              <div className="coding-mascot-bubble coding-mascot-bubble--left">HELLO</div>
              <div className="coding-mascot-bubble coding-mascot-bubble--right">BUILD</div>
              <div className="coding-mascot-status">
                <div className="coding-mascot-status-label">AI Buddy</div>
                <div className="coding-mascot-status-text">Ready To Make Cool Stuff</div>
              </div>
            </div>
          </div>
          <div className="coding-side-panels">
            <div className="coding-highlight-card">
              <div className="coding-highlight-label">推荐路线</div>
              <div className="coding-highlight-title">{isKids ? '先会回应，再会做作品，再摸到真工具' : '先启蒙，再做项目'}</div>
              <div className="coding-highlight-text">
                {isKids
                  ? '这一条线更适合小童：先通过顺序、颜色、选择和故事感建立控制感，再快速过渡到按钮、输入和小工具。'
                  : '前 1-6 课建立 AI 认知，7-12 课开始进入网页和交互创作。'}
              </div>
            </div>
            <div className="coding-mini-stats">
              <div className="coding-mini-card">
                <div className="coding-mini-label">课程数量</div>
                <div className="coding-mini-value">{lessons.length} 节</div>
              </div>
              <div className="coding-mini-card">
                <div className="coding-mini-label">主要年龄</div>
                <div className="coding-mini-value">{isKids ? '7-10 岁' : '10-12 岁'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="coding-section">
        <div className="coding-section-head">
          <div>
            <h2 className="coding-section-title">{isKids ? '闯关地图' : '学习地图'}</h2>
            <p className="coding-section-subtitle">
              {isKids
                ? '小童版不追求讲太多概念，而是让孩子一边点、一边选、一边看到结果。'
                : '把课程分成两段来看，会更容易理解这条路径为什么能把孩子带入创作状态。'}
            </p>
            {isKids && (
              <p className="coding-section-subtitle coding-section-subtitle--accent">
                这条线不是一直“玩小游戏”，而是按四段升级：会回应 → 会做作品 → 会升级展示 → 会碰到真工具。
              </p>
            )}
          </div>
        </div>

        <div className="coding-track-grid">
          {isKids ? (
            <>
              <div className="coding-track-card coding-track-card--intro">
                <div className="coding-track-tag">启动舱 · 第 1-3 课</div>
                <div className="coding-track-title">先会回应</div>
                <p className="coding-track-desc">机器人、颜色、如果就会怎样，这几课先把“程序会回应我”变得很直观。</p>
                <button className="coding-track-btn" onClick={() => setActiveLesson(1)}>从第 1 课开始</button>
              </div>
              <div className="coding-track-card coding-track-card--build">
                <div className="coding-track-tag">创作舱 · 第 4-6 课</div>
                <div className="coding-track-title">再会拼作品</div>
                <p className="coding-track-desc">把故事、选择和风格拼起来，第一次做出“这是我做的”那种感觉。</p>
                <button className="coding-track-btn" onClick={() => setActiveLesson(4)}>从第 4 课开始</button>
              </div>
              <div className="coding-track-card coding-track-card--advanced">
                <div className="coding-track-tag">升级舱 · 第 7-12 课</div>
                <div className="coding-track-title">会升级会展示</div>
                <p className="coding-track-desc">按钮变化、表情切换、双场景故事、请 AI 帮忙，让作品开始像真的创作项目。</p>
                <button className="coding-track-btn" onClick={() => setActiveLesson(7)}>从第 7 课开始</button>
              </div>
              <div className="coding-track-card coding-track-card--tools">
                <div className="coding-track-tag">工具舱 · 第 13-18 课</div>
                <div className="coding-track-title">开始碰真工具</div>
                <p className="coding-track-desc">输入框、欢迎语、小工具、作品 2.0 和毕业展，让逻辑好的孩子可以提前摸到真实开发场景。</p>
                <button className="coding-track-btn" onClick={() => setActiveLesson(13)}>从第 13 课开始</button>
              </div>
            </>
          ) : (
            <>
              <div className="coding-track-card coding-track-card--intro">
                <div className="coding-track-tag">模块 A · 第 1-6 课</div>
                <div className="coding-track-title">AI 素养启蒙</div>
                <p className="coding-track-desc">认识 AI、数据、训练、语言和视觉，先建立兴趣和基础理解。</p>
                <button className="coding-track-btn" onClick={() => setActiveLesson(1)}>从第 1 课开始</button>
              </div>

              <div className="coding-track-card coding-track-card--build">
                <div className="coding-track-tag">模块 B · 第 7-12 课</div>
                <div className="coding-track-title">AI 创作入门</div>
                <p className="coding-track-desc">做网页、做交互、请 AI 帮忙，把"我学了"变成"我做出来了"。</p>
                <button className="coding-track-btn" onClick={() => setActiveLesson(7)}>从第 7 课开始</button>
              </div>

              <div className="coding-track-card coding-track-card--advanced">
                <div className="coding-track-tag">模块 C · 第 13-15 课</div>
                <div className="coding-track-title">过渡实践</div>
                <p className="coding-track-desc">AI 变声器、占卜机、Bug 修复——用三课把前面学的都用起来。</p>
                <button className="coding-track-btn" onClick={() => setActiveLesson(13)}>从第 13 课开始</button>
              </div>

              <div className="coding-track-card coding-track-card--tools">
                <div className="coding-track-tag">模块 D · 第 16-17 课</div>
                <div className="coding-track-title">工具基础</div>
                <p className="coding-track-desc">搞清楚手机/iPad/电脑能用哪些 AI，注册好你的第一个账号。</p>
                <button className="coding-track-btn" onClick={() => setActiveLesson(16)}>从第 16 课开始</button>
              </div>

              <div className="coding-track-card coding-track-card--survey">
                <div className="coding-track-tag">模块 E · 第 18-20 课</div>
                <div className="coding-track-title">工具大全</div>
                <p className="coding-track-desc">聊天 AI、画画 AI、做工 AI——认识当下最强大的 AI 工具们。</p>
                <button className="coding-track-btn" onClick={() => setActiveLesson(18)}>从第 18 课开始</button>
              </div>

              <div className="coding-track-card coding-track-card--hands">
                <div className="coding-track-tag">模块 F · 第 21-23 课</div>
                <div className="coding-track-title">动手体验</div>
                <p className="coding-track-desc">用 AI 真正写一段话、画一张图、帮你完成一件事。</p>
                <button className="coding-track-btn" onClick={() => setActiveLesson(21)}>从第 21 课开始</button>
              </div>

              <div className="coding-track-card coding-track-card--project">
                <div className="coding-track-tag">模块 G · 第 24-29 课</div>
                <div className="coding-track-title">真项目</div>
                <p className="coding-track-desc">海报、PPT、网页、小程序、短视频——一课一个真实作品，结业汇报。</p>
                <button className="coding-track-btn" onClick={() => setActiveLesson(24)}>从第 24 课开始</button>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="coding-section">
        <div className="coding-section-head">
          <div>
            <h2 className="coding-section-title">全部课程</h2>
            <p className="coding-section-subtitle">
              {isKids
                ? '每一课都尽量少一点字、多一点图和动手反馈。'
                : '每一课都应该让孩子得到一点看得见的反馈，逐渐形成作品感和持续学习欲望。'}
            </p>
          </div>
        </div>

        <div className="coding-lesson-list">
          {lessons.map((lesson) => {
            const theme = getLessonCardTheme(lesson.id, track)
            return (
            <button
              key={lesson.id}
              className="coding-lesson-card"
              style={{ '--lesson-color': theme.accent, background: theme.bg }}
              onClick={() => setActiveLesson(lesson.id)}
            >
              <div className="coding-lesson-leading">
                <div className="coding-lesson-num">第 {lesson.id} 课</div>
                <div className="coding-lesson-emoji">{lesson.emoji}</div>
              </div>

              <div className="coding-lesson-info">
                <div className="coding-lesson-title-row">
                  <div>
                    {lesson.stage && <div className="coding-lesson-stage">{lesson.stage}</div>}
                    <div className="coding-lesson-title">{lesson.title}</div>
                  </div>
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
          )})}
        </div>
      </section>

      <section className="coding-section coding-section--notes">
        <div className="coding-note-panel">
          <div className="coding-note-title">{isKids ? '小童版设计重点' : '这个专区现在在往哪里走'}</div>
          <div className="coding-note-grid">
            {(isKids ? KIDS_NOTES : CODING_NOTES).map((note) => (
              <div key={note} className="coding-note-item">{note}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
