import { useState } from 'react'
import './Lesson.css'

const THEMES = [
  { id: 'ocean', label: '深海蓝', primary: '#0ea5e9', secondary: '#e0f2fe', text: '#0c4a6e' },
  { id: 'forest', label: '森林绿', primary: '#10b981', secondary: '#d1fae5', text: '#064e3b' },
  { id: 'sunset', label: '夕阳橙', primary: '#f97316', secondary: '#ffedd5', text: '#7c2d12' },
  { id: 'candy', label: '糖果粉', primary: '#ec4899', secondary: '#fce7f3', text: '#831843' },
  { id: 'galaxy', label: '星空紫', primary: '#8b5cf6', secondary: '#ede9fe', text: '#4c1d95' },
]

const FONT_SIZES = [
  { id: 'sm', label: '小字', titleSize: 18, bodySize: 12 },
  { id: 'md', label: '适中', titleSize: 22, bodySize: 14 },
  { id: 'lg', label: '大字', titleSize: 28, bodySize: 16 },
]

const RADIUS_OPTIONS = [
  { id: 'none', label: '方形', radius: 4 },
  { id: 'md', label: '圆角', radius: 12 },
  { id: 'xl', label: '大圆角', radius: 24 },
]

const QUIZ = [
  {
    q: '为什么网页要保持"颜色一致"？',
    options: ['用的颜色越多越好看', '颜色太统一会很单调', '风格统一让页面看起来专业整洁', '只要自己喜欢就好'],
    correct: 2,
    explain: '颜色一致让访客感觉网页是"整体设计"的，不会乱，专业感更强。通常一个网页用1-3种主色调就够了。',
  },
  {
    q: '增加文字和背景之间的"空白间距"会有什么效果？',
    options: ['让页面更拥挤', '让阅读更舒适、更易读', '浪费空间', '没有影响'],
    correct: 1,
    explain: '留白（空间）是设计中的重要工具，能让内容"呼吸"，减少视觉疲劳，让读者更专注。',
  },
  {
    q: '下面哪种颜色组合最适合"清新风格"的网页？',
    options: ['黑底红字', '蓝绿色搭配白色背景', '荧光黄搭配荧光绿', '深紫配深棕'],
    correct: 1,
    explain: '清新风格通常用明亮的蓝色、绿色搭配白色，给人轻盈、干净的感觉。',
  },
]

export default function Lesson9({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [theme, setTheme] = useState('ocean')
  const [fontSize, setFontSize] = useState('md')
  const [radius, setRadius] = useState('md')
  const [hasShadow, setHasShadow] = useState(true)
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  function handleQuizAnswer(optIdx) {
    if (quizAnswer !== null) return
    const correct = optIdx === QUIZ[quizIdx].correct
    setQuizAnswer({ optIdx, correct })
    if (correct) setQuizScore(s => s + 1)
  }

  function nextQuestion() {
    if (quizIdx + 1 >= QUIZ.length) setQuizDone(true)
    else { setQuizIdx(i => i + 1); setQuizAnswer(null) }
  }

  const t = THEMES.find(x => x.id === theme)
  const fs = FONT_SIZES.find(x => x.id === fontSize)
  const rd = RADIUS_OPTIONS.find(x => x.id === radius)

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回课程列表</button>

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#f3e8ff', color: '#7e22ce' }}>第 9 课</span>
        <span className="lesson-hero-emoji">🎨</span>
        <h1 className="lesson-hero-title">让网页变好看</h1>
        <p className="lesson-hero-sub">Style Your Webpage</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>理解颜色、字体、圆角、间距对视觉的影响</li>
          <li>知道什么叫"风格一致"</li>
          <li>完成网页样式升级</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {['learn', 'do', 'ai', 'quiz', 'work'].map(t => (
          <button key={t} className={`lesson-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}
            style={tab === t ? { borderBottomColor: '#a855f7', color: '#a855f7' } : {}}>
            {t === 'learn' ? '学一学' : t === 'do' ? '做一做' : t === 'ai' ? '用AI帮忙' : t === 'quiz' ? '测一测' : '本课作品'}
          </button>
        ))}
      </div>

      {tab === 'learn' && (
        <div className="lesson-content">
          <div className="lesson-section">
            <h2 className="lesson-section-title">🎨 颜色是情绪的语言</h2>
            <p className="lesson-text">不同颜色让人产生不同的感受，网页颜色的选择影响着访客的第一印象。</p>
            <div className="lesson-color-demo">
              {[
                { color: '#0ea5e9', label: '蓝色', feel: '冷静、专业、科技感' },
                { color: '#10b981', label: '绿色', feel: '自然、清新、生命力' },
                { color: '#f97316', label: '橙色', feel: '活力、热情、创造力' },
                { color: '#ec4899', label: '粉色', feel: '可爱、温柔、浪漫' },
                { color: '#8b5cf6', label: '紫色', feel: '神秘、优雅、想象力' },
              ].map(c => (
                <div key={c.color} className="lesson-color-swatch">
                  <div className="lesson-color-block" style={{ background: c.color }} />
                  <strong>{c.label}</strong>
                  <span>{c.feel}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lesson-section">
            <h2 className="lesson-section-title">📐 四个设计小秘诀</h2>
            <div className="lesson-step-list">
              {[
                { step: '1', title: '颜色统一', desc: '一个页面最好只用1-3种主色，太多颜色会让人觉得混乱。' },
                { step: '2', title: '字体大小有层次', desc: '标题大、正文小，用大小区分重要程度，让读者一眼知道看哪里。' },
                { step: '3', title: '圆角更亲切', desc: '方形边角感觉严肃，圆角感觉友好。儿童网站常用大圆角。' },
                { step: '4', title: '留白很重要', desc: '"空白"不是浪费空间，它让内容有喘息空间，读起来不累。' },
              ].map(s => (
                <div key={s.step} className="lesson-step-item">
                  <span className="lesson-step-num" style={{ background: '#a855f7' }}>{s.step}</span>
                  <div><strong>{s.title}</strong><p>{s.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="lesson-section">
            <h2 className="lesson-section-title">🔦 改造前 vs 改造后</h2>
            <div className="l9-compare">
              <div className="l9-compare-card bad">
                <div className="l9-compare-label">❌ 改造前</div>
                <div style={{ fontSize: 10, color: 'red', fontWeight: 900, background: 'yellow', padding: 4 }}>我的网页（超级大标题!!）</div>
                <div style={{ fontSize: 18, color: 'blue' }}>我叫小明</div>
                <div style={{ fontSize: 8, color: 'green' }}>我喜欢画画和音乐</div>
                <div style={{ fontSize: 14, background: 'red', color: 'lime', padding: 2 }}>点这里!!!</div>
                <span className="l9-compare-note">颜色太多、字体大小乱、没有空白</span>
              </div>
              <div className="l9-compare-card good">
                <div className="l9-compare-label">✅ 改造后</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#0ea5e9', marginBottom: 6 }}>Hi，我叫小明 👋</div>
                <div style={{ fontSize: 13, color: '#475569', marginBottom: 10 }}>我喜欢画画和音乐</div>
                <div style={{ fontSize: 12, background: '#0ea5e9', color: '#fff', padding: '6px 14px', borderRadius: 20, display: 'inline-block' }}>了解更多</div>
                <span className="l9-compare-note">颜色统一、层次清晰、简洁好看</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'do' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🎨 网页造型师</h2>
          <p className="lesson-text">调整下面的选项，右边的预览会实时更新，看看不同风格的效果！</p>

          <div className="l9-studio">
            <div className="l9-controls">
              <div className="l9-control-group">
                <label className="l9-control-label">🎨 颜色主题</label>
                <div className="l9-theme-row">
                  {THEMES.map(th => (
                    <button key={th.id}
                      className={`l9-theme-btn${theme === th.id ? ' selected' : ''}`}
                      style={{ background: th.primary, boxShadow: theme === th.id ? `0 0 0 3px ${th.primary}55` : 'none' }}
                      onClick={() => setTheme(th.id)}
                      title={th.label}
                    >
                      {theme === th.id && '✓'}
                    </button>
                  ))}
                </div>
                <div className="l9-theme-label">{t.label}</div>
              </div>

              <div className="l9-control-group">
                <label className="l9-control-label">🔤 字体大小</label>
                <div className="l9-option-row">
                  {FONT_SIZES.map(f => (
                    <button key={f.id}
                      className={`l9-option-btn${fontSize === f.id ? ' selected' : ''}`}
                      onClick={() => setFontSize(f.id)}>{f.label}</button>
                  ))}
                </div>
              </div>

              <div className="l9-control-group">
                <label className="l9-control-label">⬜ 卡片圆角</label>
                <div className="l9-option-row">
                  {RADIUS_OPTIONS.map(r => (
                    <button key={r.id}
                      className={`l9-option-btn${radius === r.id ? ' selected' : ''}`}
                      onClick={() => setRadius(r.id)}>{r.label}</button>
                  ))}
                </div>
              </div>

              <div className="l9-control-group">
                <label className="l9-control-label">💡 阴影效果</label>
                <div className="l9-option-row">
                  <button className={`l9-option-btn${hasShadow ? ' selected' : ''}`} onClick={() => setHasShadow(true)}>有阴影</button>
                  <button className={`l9-option-btn${!hasShadow ? ' selected' : ''}`} onClick={() => setHasShadow(false)}>无阴影</button>
                </div>
              </div>
            </div>

            <div className="l9-preview" style={{ background: t.secondary, borderRadius: rd.radius }}>
              <div className="l9-preview-header" style={{ background: t.primary, borderRadius: `${rd.radius}px ${rd.radius}px 0 0`, padding: '10px 16px' }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: fs.titleSize * 0.65 }}>🏠 我的网页</span>
              </div>
              <div className="l9-preview-body">
                <div className="l9-preview-card"
                  style={{
                    borderRadius: rd.radius,
                    boxShadow: hasShadow ? '0 4px 16px rgba(0,0,0,0.12)' : 'none',
                    background: '#fff',
                    padding: 16
                  }}>
                  <h2 style={{ fontSize: fs.titleSize, color: t.primary, margin: '0 0 6px' }}>Hi，我叫小明！</h2>
                  <p style={{ fontSize: fs.bodySize, color: t.text, margin: '0 0 10px' }}>我是一个12岁的小发明家，喜欢画画和音乐。</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {['画画', '音乐', '编程'].map(h => (
                      <span key={h} style={{
                        fontSize: fs.bodySize - 1,
                        background: t.secondary,
                        color: t.primary,
                        padding: '3px 10px',
                        borderRadius: rd.radius
                      }}>{h}</span>
                    ))}
                  </div>
                </div>
                <button style={{
                  marginTop: 12,
                  background: t.primary,
                  color: '#fff',
                  border: 'none',
                  borderRadius: rd.radius,
                  padding: `8px 20px`,
                  fontSize: fs.bodySize,
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: hasShadow ? `0 4px 12px ${t.primary}55` : 'none'
                }}>联系我 →</button>
              </div>
            </div>
          </div>

          <div className="lesson-tip-box" style={{ marginTop: 16 }}>
            🎉 你已经掌握了颜色主题、字体大小、圆角、阴影四个基本样式工具！这些就是真正的设计师每天用的！
          </div>
        </div>
      )}

      {tab === 'ai' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🤖 让AI帮你设计风格</h2>
          <p className="lesson-text">把你想要的视觉风格告诉AI，它可以给出具体的颜色值和样式建议。</p>

          <div className="ai-prompt-card">
            <div className="ai-prompt-title">📋 提问模板：请AI设计颜色方案</div>
            <div className="ai-prompt-body">
              请帮我设计一个网页的颜色方案。<br /><br />
              <strong>风格要求：</strong>[比如：清新、科技、可爱、简洁]<br />
              <strong>目标用户：</strong>[比如：小学生、爱好者、家长]<br />
              <strong>网页类型：</strong>[比如：个人介绍、兴趣展示、小工具]<br /><br />
              请给我：主色、背景色、文字颜色，以及一个搭配理由。
            </div>
          </div>

          <div className="ai-chat-demo" style={{ marginTop: 16 }}>
            {[
              { role: 'kid', text: '请帮我为一个"科学爱好者"个人网页设计颜色方案，风格要清新现代。' },
              { role: 'ai', text: '好的！给你推荐"科学蓝"方案：\n\n🎨 主色：#0ea5e9（天空蓝）\n🖼️ 背景色：#f0f9ff（极淡蓝）\n📝 文字色：#0c4a6e（深海蓝）\n✨ 按钮悬停色：#0284c7（深一档的蓝）\n\n搭配理由：蓝色给人科技感和冷静感，搭配白色背景干净利落，非常适合科学类网页。加一点深蓝做文字，对比清晰、易读。\n\n要继续推荐字体方案吗？' },
            ].map((msg, i) => (
              <div key={i} className={`ai-chat-bubble ${msg.role}`}>
                <span className="ai-chat-avatar">{msg.role === 'kid' ? '🧒' : '🤖'}</span>
                <span className="ai-chat-text" style={{ whiteSpace: 'pre-line' }}>{msg.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'quiz' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🎯 测一测</h2>
          {!quizDone ? (
            <div className="quiz-wrap">
              <div className="quiz-progress">第 {quizIdx + 1} / {QUIZ.length} 题</div>
              <div className="quiz-question">{QUIZ[quizIdx].q}</div>
              <div className="quiz-options">
                {QUIZ[quizIdx].options.map((opt, i) => {
                  let cls = 'quiz-option'
                  if (quizAnswer !== null) {
                    if (i === QUIZ[quizIdx].correct) cls += ' correct reveal'
                    else if (i === quizAnswer.optIdx && !quizAnswer.correct) cls += ' wrong reveal'
                  }
                  return <button key={i} className={cls} onClick={() => handleQuizAnswer(i)}>{opt}</button>
                })}
              </div>
              {quizAnswer && <div className="quiz-explain">{quizAnswer.correct ? '✅ 正确！' : '❌ 再想想'} {QUIZ[quizIdx].explain}</div>}
              {quizAnswer && (
                <button className="lesson-btn" style={{ background: '#a855f7' }} onClick={nextQuestion}>
                  {quizIdx + 1 < QUIZ.length ? '下一题 →' : '查看结果'}
                </button>
              )}
            </div>
          ) : (
            <div className="quiz-done">
              <div className="quiz-done-score">{quizScore}/{QUIZ.length}</div>
              <div className="quiz-done-msg">
                {quizScore === 3 ? '🎉 满分！你已经是小设计师了！' : quizScore === 2 ? '👍 答对两题，接近了！' : '💪 没关系，回去学一学再来挑战！'}
              </div>
              <p style={{ color: '#64748b', fontSize: 14 }}>第 10 课：让按钮有反应 →</p>
            </div>
          )}
        </div>
      )}
      {tab === 'work' && (
        <div className="lesson-content">
          <div className="lesson-work-card">
            <div className="lesson-work-title">🏅 本课作品：网页 2.0 美化版</div>
            <p className="lesson-text" style={{ marginBottom: 12 }}>你选择的样式方案：</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: '颜色主题', value: THEMES.find(x => x.id === theme)?.label },
                { label: '字体大小', value: FONT_SIZES.find(x => x.id === fontSize)?.label },
                { label: '卡片圆角', value: RADIUS_OPTIONS.find(x => x.id === radius)?.label },
                { label: '阴影效果', value: hasShadow ? '有阴影' : '无阴影' },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '8px 12px', background: '#f8f9fc', borderRadius: 8 }}>
                  <span style={{ color: '#888' }}>{row.label}</span>
                  <strong style={{ color: THEMES.find(x => x.id === theme)?.primary }}>{row.value}</strong>
                </div>
              ))}
            </div>
            <div className="lesson-work-recap">
              <div className="lesson-work-recap-title">✅ 本课学到了</div>
              <ul>
                <li>颜色传递情绪：蓝色冷静、橙色活力、粉色可爱</li>
                <li>一个页面用 1-3 种主色，颜色统一才专业</li>
                <li>圆角更亲切，留白让阅读更舒适</li>
              </ul>
            </div>
          </div>
          <div className="lesson-next-preview">
            <div className="lesson-next-title">👉 第 10 课预告：让按钮有反应</div>
            <p>下一课你将给网页加上"互动"！学会让按钮点一下就有变化——计数、显示隐藏、切换内容，让网页真正"活"起来。</p>
          </div>
        </div>
      )}
    </div>
  )
}
