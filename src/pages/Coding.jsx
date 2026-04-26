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

const CODING_NOTES = [
  '启蒙部分负责让孩子不再怕 AI，创作部分负责让孩子真正入坑。',
  '课程页要更像"闯关做作品"，而不是一组单独知识点。',
  '手机适合快速继续进度，iPad 更适合完整做一课，电脑更适合作品展示与家长陪学。',
]

export default function Coding({ user }) {
  const [track, setTrack] = useState('tween')
  const [activeLesson, setActiveLesson] = useState(null)

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
              ? '给 7-10 岁孩子的 AI 创作入口。少一点字，多一点图、多一点动手，先把"会玩"变成"会做"。'
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
                <button className="coding-secondary-btn" onClick={() => setActiveLesson(6)}>先看看最后作品</button>
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
          <div className="coding-highlight-card">
            <div className="coding-highlight-label">推荐路线</div>
            <div className="coding-highlight-title">{isKids ? '先玩图形，再做小作品' : '先启蒙，再做项目'}</div>
            <div className="coding-highlight-text">
              {isKids
                ? '这一条线更适合小童：一课一个小互动，先认识顺序、选择、颜色和故事页面。'
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
          </div>
        </div>

        <div className="coding-track-grid">
          {isKids ? (
            <>
              <div className="coding-track-card coding-track-card--intro">
                <div className="coding-track-tag">第一段</div>
                <div className="coding-track-title">先会玩</div>
                <p className="coding-track-desc">机器人、颜色、如果就会怎样，这几课先把"程序会回应我"变得很直观。</p>
                <button className="coding-track-btn" onClick={() => setActiveLesson(1)}>从第 1 课开始</button>
              </div>
              <div className="coding-track-card coding-track-card--build">
                <div className="coding-track-tag">第二段</div>
                <div className="coding-track-title">再会做</div>
                <p className="coding-track-desc">把故事、选择和风格拼起来，做出一个可爱的小作品。</p>
                <button className="coding-track-btn" onClick={() => setActiveLesson(4)}>从第 4 课开始</button>
              </div>
              <div className="coding-track-card coding-track-card--build">
                <div className="coding-track-tag">第三段</div>
                <div className="coding-track-title">会展示</div>
                <p className="coding-track-desc">后半段开始做按钮变化、表情切换、双场景故事，再把作品整理出来。</p>
                <button className="coding-track-btn" onClick={() => setActiveLesson(7)}>从第 7 课开始</button>
              </div>
              <div className="coding-track-card coding-track-card--build">
                <div className="coding-track-tag">第四段</div>
                <div className="coding-track-title">做小工具</div>
                <p className="coding-track-desc">继续往后会认识输入框、欢迎语、小工具和毕业作品升级，形成完整 18 课。</p>
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
          {lessons.map((lesson) => (
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
          <div className="coding-note-title">{isKids ? '小童版设计重点' : '这个专区现在在往哪里走'}</div>
          <div className="coding-note-grid">
            {(isKids ? [
              '7-10 岁先不压太多文字，优先让孩子点一下就看见变化。',
              '页面更像"故事和小游戏工厂"，而不是一节节技术说明。',
              '手机和平板上都要舒服，家长陪着看时也能一眼懂在做什么。',
            ] : CODING_NOTES).map((note) => (
              <div key={note} className="coding-note-item">{note}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
