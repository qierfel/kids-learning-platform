import { useState } from 'react'
import './Lesson.css'

const COLOR_OPTIONS = [
  { id: 'blue', label: '海洋蓝', bg: '#0ea5e9', text: '#fff' },
  { id: 'green', label: '草地绿', bg: '#10b981', text: '#fff' },
  { id: 'purple', label: '梦幻紫', bg: '#a855f7', text: '#fff' },
  { id: 'orange', label: '活力橙', bg: '#f97316', text: '#fff' },
  { id: 'pink', label: '樱花粉', bg: '#ec4899', text: '#fff' },
]

const HOBBY_OPTIONS = ['画画', '音乐', '运动', '看书', '游戏', '科学', '旅游', '美食', '编程', '电影']

const QUIZ = [
  {
    q: '在做网页之前，最应该先做什么？',
    options: ['马上写代码', '规划好内容和结构', '选好字体颜色', '找好图片素材'],
    correct: 1,
    explain: '先规划内容和结构，知道你想说什么、怎么排，再动手才不会乱。就像搭房子先画图纸。',
  },
  {
    q: '个人介绍网页最重要的内容是？',
    options: ['华丽的特效动画', '介绍自己是谁、有什么特点', '超多的图片', '复杂的背景音乐'],
    correct: 1,
    explain: '个人介绍页的核心就是"我是谁、我有什么特别的地方"，内容比特效更重要。',
  },
  {
    q: '以下哪种描述最适合用在个人介绍网页里？',
    options: ['我叫小明，我什么都不会。', '小明，12岁，喜欢画画和科学，梦想是做游戏设计师。', '这是一个网页。', '欢迎来到我的主页，请多关照。'],
    correct: 1,
    explain: '好的介绍要具体：名字、年龄、兴趣爱好、小目标——让读者一下子记住你！',
  },
]

export default function Lesson8({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [name, setName] = useState('')
  const [intro, setIntro] = useState('')
  const [color, setColor] = useState('blue')
  const [hobbies, setHobbies] = useState([])
  const [dream, setDream] = useState('')
  const [generated, setGenerated] = useState(false)
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  function toggleHobby(h) {
    setHobbies(prev => prev.includes(h) ? prev.filter(x => x !== h) : prev.length < 4 ? [...prev, h] : prev)
  }

  function handleGenerate() {
    if (!name.trim()) return
    setGenerated(true)
  }

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

  const selectedColor = COLOR_OPTIONS.find(c => c.id === color)
  const canGenerate = name.trim().length > 0

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回课程列表</button>

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#cffafe', color: '#0e7490' }}>第 8 课</span>
        <span className="lesson-hero-emoji">📄</span>
        <h1 className="lesson-hero-title">做我的第一个网页</h1>
        <p className="lesson-hero-sub">My First Webpage</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>学会规划网页的内容</li>
          <li>知道用什么素材描述自己</li>
          <li>完成一个个人介绍页的设计方案</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {['learn', 'do', 'ai', 'quiz'].map(t => (
          <button key={t} className={`lesson-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}
            style={tab === t ? { borderBottomColor: '#06b6d4', color: '#06b6d4' } : {}}>
            {t === 'learn' ? '学一学' : t === 'do' ? '做一做' : t === 'ai' ? '用AI帮忙' : '测一测'}
          </button>
        ))}
      </div>

      {tab === 'learn' && (
        <div className="lesson-content">
          <div className="lesson-section">
            <h2 className="lesson-section-title">📄 你的第一个网页计划</h2>
            <p className="lesson-text">
              做网页不是一开始就写代码，而是先想清楚：<br />
              <strong>我想做什么？放什么内容？给谁看？</strong>
            </p>
            <div className="lesson-step-list">
              {[
                { step: '1', title: '想清楚主题', desc: '个人介绍？我的爱好？我喜欢的动物？先选一个方向。' },
                { step: '2', title: '整理要说的内容', desc: '名字、介绍、兴趣爱好、小目标……把素材列出来。' },
                { step: '3', title: '想好排列方式', desc: '先放什么？后放什么？一般：大标题 → 介绍 → 详情。' },
                { step: '4', title: '选好颜色风格', desc: '颜色影响人的感受。清新、酷炫、温暖……选一个你喜欢的。' },
              ].map(s => (
                <div key={s.step} className="lesson-step-item">
                  <span className="lesson-step-num" style={{ background: '#06b6d4' }}>{s.step}</span>
                  <div>
                    <strong>{s.title}</strong>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lesson-section">
            <h2 className="lesson-section-title">💡 好的个人介绍应该包含什么？</h2>
            <div className="lesson-info-grid">
              {[
                { icon: '👤', title: '名字和年龄', desc: '最基础的信息，让别人认识你' },
                { icon: '❤️', title: '兴趣爱好', desc: '你喜欢做什么？这最能体现"你是谁"' },
                { icon: '🌟', title: '小目标或梦想', desc: '你想成为什么？做什么？' },
                { icon: '😄', title: '一句有趣的话', desc: '让别人记住你的个性签名' },
              ].map(c => (
                <div key={c.icon} className="lesson-info-card">
                  <span style={{ fontSize: 28 }}>{c.icon}</span>
                  <strong>{c.title}</strong>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'do' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">📄 我的网页生成器</h2>
          <p className="lesson-text">填入你的信息，生成属于你的第一个网页预览！</p>

          <div className="l8-form">
            <div className="l8-field">
              <label className="l8-label">你的名字 *</label>
              <input className="l8-input" value={name} onChange={e => setName(e.target.value)}
                placeholder="比如：小明、Emily、Alex..." maxLength={12} />
            </div>
            <div className="l8-field">
              <label className="l8-label">一句介绍自己的话</label>
              <input className="l8-input" value={intro} onChange={e => setIntro(e.target.value)}
                placeholder="比如：我是一个爱画画的12岁小发明家！" maxLength={40} />
            </div>
            <div className="l8-field">
              <label className="l8-label">你的梦想或小目标</label>
              <input className="l8-input" value={dream} onChange={e => setDream(e.target.value)}
                placeholder="比如：做一款自己的游戏" maxLength={30} />
            </div>
            <div className="l8-field">
              <label className="l8-label">选择爱好（最多4个）</label>
              <div className="l8-hobby-grid">
                {HOBBY_OPTIONS.map(h => (
                  <button key={h}
                    className={`l8-hobby-btn${hobbies.includes(h) ? ' selected' : ''}`}
                    onClick={() => toggleHobby(h)}>{h}</button>
                ))}
              </div>
            </div>
            <div className="l8-field">
              <label className="l8-label">网页主色调</label>
              <div className="l8-color-row">
                {COLOR_OPTIONS.map(c => (
                  <button key={c.id}
                    className={`l8-color-btn${color === c.id ? ' selected' : ''}`}
                    style={{ background: c.bg }}
                    onClick={() => setColor(c.id)}
                    title={c.label}
                  >
                    {color === c.id && '✓'}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="lesson-btn"
              style={{ background: canGenerate ? '#06b6d4' : '#e2e8f0', color: canGenerate ? '#fff' : '#94a3b8' }}
              disabled={!canGenerate}
              onClick={handleGenerate}
            >
              ✨ 生成我的网页预览！
            </button>
          </div>

          {generated && (
            <div className="l8-preview" style={{ borderColor: selectedColor.bg }}>
              <div className="l8-preview-header" style={{ background: selectedColor.bg, color: selectedColor.text }}>
                <div className="l8-preview-nav">
                  <span>🏠 首页</span><span>关于我</span><span>我的作品</span>
                </div>
              </div>
              <div className="l8-preview-hero" style={{ background: `${selectedColor.bg}20` }}>
                <div className="l8-preview-avatar" style={{ background: selectedColor.bg, color: '#fff' }}>
                  {name[0]?.toUpperCase()}
                </div>
                <h2 className="l8-preview-name" style={{ color: selectedColor.bg }}>Hi，我是{name}！</h2>
                {intro && <p className="l8-preview-intro">{intro}</p>}
              </div>
              <div className="l8-preview-body">
                {hobbies.length > 0 && (
                  <div className="l8-preview-section">
                    <h3>❤️ 我喜欢</h3>
                    <div className="l8-preview-tags">
                      {hobbies.map(h => (
                        <span key={h} className="l8-preview-tag" style={{ background: `${selectedColor.bg}25`, color: selectedColor.bg }}>{h}</span>
                      ))}
                    </div>
                  </div>
                )}
                {dream && (
                  <div className="l8-preview-section">
                    <h3>🌟 我的目标</h3>
                    <p className="l8-preview-dream">{dream}</p>
                  </div>
                )}
                <div className="l8-preview-footer">
                  <button className="l8-preview-cta" style={{ background: selectedColor.bg, color: '#fff' }}>
                    联系我 →
                  </button>
                </div>
              </div>
              <div className="lesson-tip-box" style={{ margin: '16px 0 0' }}>
                🎉 <strong>恭喜！</strong>这就是你的第一个网页设计方案！在第 12 课，你会把它做得更完整。
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'ai' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🤖 让AI帮你做网页</h2>
          <p className="lesson-text">学会向AI描述你的需求，是做网页最重要的技能之一！</p>

          <div className="ai-prompt-card">
            <div className="ai-prompt-title">📋 提问模板</div>
            <div className="ai-prompt-body">
              请帮我做一个个人介绍网页。<br /><br />
              <strong>我的基本信息：</strong><br />
              - 名字：[你的名字]<br />
              - 年龄：[你的年龄]岁<br />
              - 喜欢：[你的爱好1]、[你的爱好2]<br />
              - 梦想：[你的目标]<br /><br />
              <strong>网页风格：</strong>[颜色风格，比如"清新蓝色"]<br /><br />
              请一步一步告诉我怎么做，先从标题开始。
            </div>
          </div>

          <div className="ai-chat-demo" style={{ marginTop: 16 }}>
            {[
              { role: 'kid', text: '请帮我做一个个人介绍网页。我叫小雨，12岁，喜欢画画和音乐，梦想是成为插画师。风格：清新粉色。' },
              { role: 'ai', text: '好的！我们一步一步来。\n\n第1步：先做标题区\n最顶部放你的名字"小雨"，下面放一句话介绍，比如"12岁的插画小达人 🎨"\n\n第2步：做爱好区\n用两个小卡片分别写"画画"和"音乐"，加上可爱的图标。\n\n第3步：加梦想区\n写上"我的梦想是成为一名插画师！"并放一张你喜欢的图片。\n\n要继续第4步吗？' },
            ].map((msg, i) => (
              <div key={i} className={`ai-chat-bubble ${msg.role}`}>
                <span className="ai-chat-avatar">{msg.role === 'kid' ? '🧒' : '🤖'}</span>
                <span className="ai-chat-text" style={{ whiteSpace: 'pre-line' }}>{msg.text}</span>
              </div>
            ))}
          </div>

          <div className="lesson-tip-box" style={{ marginTop: 16 }}>
            💡 <strong>注意：</strong>告诉AI越具体越好！名字、颜色、风格、要放什么内容……说得清楚，AI给的方案才更准确。
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
                <button className="lesson-btn" style={{ background: '#06b6d4' }} onClick={nextQuestion}>
                  {quizIdx + 1 < QUIZ.length ? '下一题 →' : '查看结果'}
                </button>
              )}
            </div>
          ) : (
            <div className="quiz-done">
              <div className="quiz-done-score">{quizScore}/{QUIZ.length}</div>
              <div className="quiz-done-msg">
                {quizScore === 3 ? '🎉 满分！你完全掌握了网页规划的思路！' : quizScore === 2 ? '👍 答对两题，继续加油！' : '💪 没关系，回去学一学再来挑战！'}
              </div>
              <p style={{ color: '#64748b', fontSize: 14 }}>第 9 课：让网页变好看 →</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
