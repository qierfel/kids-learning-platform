import { useState } from 'react'
import './Lesson.css'

const THEMES = [
  { id: 'ocean', label: '海洋蓝', primary: '#0ea5e9', secondary: '#e0f2fe', text: '#0c4a6e' },
  { id: 'forest', label: '森林绿', primary: '#10b981', secondary: '#dcfce7', text: '#064e3b' },
  { id: 'candy', label: '糖果粉', primary: '#ec4899', secondary: '#fce7f3', text: '#831843' },
  { id: 'galaxy', label: '星空紫', primary: '#8b5cf6', secondary: '#ede9fe', text: '#4c1d95' },
  { id: 'fire', label: '烈焰橙', primary: '#f97316', secondary: '#ffedd5', text: '#7c2d12' },
]

const HOBBY_EMOJIS = ['🎨', '📚', '⚽', '🎮', '🎵', '🍕', '🌱', '🐾', '✈️', '🔬', '🎭', '🏊']

const QUIZ = [
  {
    q: '规划一个展示网站，第一步应该做什么？',
    options: ['先写代码', '先想清楚要展示什么内容', '先选颜色', '先找图片'],
    correct: 1,
    explain: '先想好"要展示什么"，才能知道需要哪些功能和内容。这叫"内容规划"，是做任何网站的第一步。',
  },
  {
    q: '下面哪个关于"自我介绍"的说法是正确的？',
    options: ['越长越好，什么都要写', '要突出你最独特的特点', '只写名字就够了', '一定要和别人一样'],
    correct: 1,
    explain: '好的自我介绍要突出你最独特的地方。不是越长越好，而是让别人一看就记住你。',
  },
  {
    q: '为什么要给网站选一个统一的颜色主题？',
    options: ['因为规定要这样做', '让网站看起来整洁、有设计感', '因为颜色可以更多', '让别人看不懂'],
    correct: 1,
    explain: '颜色一致让网站看起来专业、整洁。这叫"视觉一致性"，是设计师很重视的概念。',
  },
]

export default function Lesson15({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [motto, setMotto] = useState('')
  const [hobbies, setHobbies] = useState([])
  const [hobbyDesc, setHobbyDesc] = useState('')
  const [theme, setTheme] = useState('ocean')
  const [aiIntro, setAiIntro] = useState('')
  const [loadingIntro, setLoadingIntro] = useState(false)
  const [introError, setIntroError] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  const accentColor = '#10b981'
  const currentTheme = THEMES.find(t => t.id === theme)

  function toggleHobby(emoji) {
    setHobbies(h => h.includes(emoji) ? h.filter(e => e !== emoji) : h.length < 5 ? [...h, emoji] : h)
  }

  async function handleGenerateIntro() {
    if (!name.trim() || hobbies.length === 0) return
    setLoadingIntro(true)
    setIntroError('')
    setAiIntro('')
    const prompt = `请帮我写一段简短的个人兴趣自我介绍，用第一人称，活泼可爱的语气，不超过80字。\n\n我的信息：\n- 名字：${name.trim()}\n- 年龄：${age.trim() || '不透露'}岁\n- 兴趣爱好：${hobbies.join(' ')}${hobbyDesc.trim() ? `，尤其喜欢${hobbyDesc.trim()}` : ''}\n${motto.trim() ? `- 我的座右铭：${motto.trim()}` : ''}\n\n请直接给出介绍文字，不需要额外解释。`
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ type: 'chat', payload: { messages: [{ role: 'user', content: prompt }], subject: '个人介绍' } }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setAiIntro(data.text || '')
    } catch {
      setIntroError('AI暂时没有响应，请稍后再试。')
    } finally {
      setLoadingIntro(false)
    }
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

  const canPreview = name.trim().length > 0

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回课程列表</button>

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#dcfce7', color: '#15803d' }}>第 15 课 · 模块 C</span>
        <span className="lesson-hero-emoji">🌈</span>
        <h1 className="lesson-hero-title">做一个兴趣展示网站</h1>
        <p className="lesson-hero-sub">Interest Showcase</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>规划个人兴趣展示页面</li>
          <li>用AI生成自我介绍文字</li>
          <li>完成一个有内容的展示网站</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {['learn', 'do', 'ai', 'quiz', 'work'].map(t => (
          <button key={t} className={`lesson-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}
            style={tab === t ? { borderBottomColor: accentColor, color: accentColor } : {}}>
            {t === 'learn' ? '学一学' : t === 'do' ? '做一做' : t === 'ai' ? '用AI帮忙' : t === 'quiz' ? '测一测' : '我的作品'}
          </button>
        ))}
      </div>

      {tab === 'learn' && (
        <div className="lesson-content">
          <div className="lesson-section">
            <h2 className="lesson-section-title">🌈 什么是展示网站？</h2>
            <p className="lesson-text">展示网站就是一个"关于我"的页面，让别人通过网页认识你——你是谁、你喜欢什么、你的风格是什么。很多设计师、程序员、艺术家都有自己的展示网站。</p>
          </div>
          <div className="lesson-section">
            <h2 className="lesson-section-title">📋 规划需要哪几步？</h2>
            <div className="lesson-step-list">
              {[
                { step: '1', title: '基本信息', desc: '名字、简短介绍——让人一眼知道这是谁的页面' },
                { step: '2', title: '兴趣爱好', desc: '你最喜欢什么？用图标和文字展示出来' },
                { step: '3', title: '个性风格', desc: '颜色、字体——让页面"看起来像你"' },
                { step: '4', title: '一句话', desc: '你的座右铭或者最想说的话' },
              ].map(s => (
                <div key={s.step} className="lesson-step-item">
                  <span className="lesson-step-num" style={{ background: accentColor }}>{s.step}</span>
                  <div><strong>{s.title}</strong><p>{s.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="lesson-tip-box">
            💡 <strong>今天的任务：</strong>填写信息 → 选兴趣和颜色 → 让AI写自我介绍 → 预览完整展示页！
          </div>
        </div>
      )}

      {tab === 'do' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🛠️ 搭建你的展示网站</h2>
          <div className="l8-field">
            <label className="l8-label">👤 你的名字 *</label>
            <input className="l8-input" value={name} onChange={e => setName(e.target.value)} placeholder="你叫什么名字？" maxLength={10} />
          </div>
          <div className="l8-field">
            <label className="l8-label">🎂 年龄（可选）</label>
            <input className="l8-input" value={age} onChange={e => setAge(e.target.value)} placeholder="比如：11" maxLength={3} />
          </div>
          <div className="l8-field">
            <label className="l8-label">💬 你的座右铭（可选）</label>
            <input className="l8-input" value={motto} onChange={e => setMotto(e.target.value)} placeholder='比如：做真实的自己！' maxLength={30} />
          </div>
          <div className="l8-field">
            <label className="l8-label">❤️ 选兴趣标签（最多5个）</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 8 }}>
              {HOBBY_EMOJIS.map(emoji => (
                <button key={emoji} onClick={() => toggleHobby(emoji)}
                  style={{ fontSize: 26, width: 52, height: 52, border: `2px solid ${hobbies.includes(emoji) ? accentColor : '#e2e8f0'}`, borderRadius: 12, background: hobbies.includes(emoji) ? `${accentColor}15` : '#fff', cursor: 'pointer', transition: 'all 0.2s' }}>
                  {emoji}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>已选 {hobbies.length}/5</div>
          </div>
          {hobbies.length > 0 && (
            <div className="l8-field">
              <label className="l8-label">📝 关于你的兴趣，说一句话</label>
              <input className="l8-input" value={hobbyDesc} onChange={e => setHobbyDesc(e.target.value)} placeholder='比如：最爱踢足球，梦想成为职业球员' maxLength={40} />
            </div>
          )}
          <div className="l8-field">
            <label className="l8-label">🎨 颜色主题</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
              {THEMES.map(t => (
                <button key={t.id} onClick={() => setTheme(t.id)}
                  style={{ background: t.secondary, border: `2px solid ${theme === t.id ? t.primary : 'transparent'}`, borderRadius: 10, padding: '8px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 14, height: 14, borderRadius: '50%', background: t.primary, display: 'inline-block' }} />
                  <span style={{ fontSize: 13, color: t.primary, fontWeight: 600 }}>{t.label}</span>
                  {theme === t.id && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>
          <button className="lesson-btn" style={{ background: canPreview ? accentColor : '#e2e8f0', color: canPreview ? '#fff' : '#94a3b8' }}
            disabled={!canPreview} onClick={() => setShowPreview(true)}>
            👁️ 预览我的网站
          </button>
          {showPreview && canPreview && (
            <div style={{ marginTop: 20, border: `2px solid ${currentTheme.primary}`, borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ background: currentTheme.primary, padding: '16px 20px', color: '#fff' }}>
                <div style={{ fontSize: 20, fontWeight: 800 }}>{name} 的兴趣展示</div>
                {motto && <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>"{motto}"</div>}
              </div>
              <div style={{ background: currentTheme.secondary, padding: 16 }}>
                <div style={{ fontSize: 13, color: currentTheme.text, marginBottom: 8 }}>{age && `${age}岁 · `}我的兴趣爱好：</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
                  {hobbies.map(h => <span key={h} style={{ fontSize: 28 }}>{h}</span>)}
                  {hobbies.length === 0 && <span style={{ color: '#94a3b8', fontSize: 13 }}>（还没选兴趣标签）</span>}
                </div>
                {aiIntro
                  ? <div style={{ background: '#fff', borderRadius: 10, padding: '12px 14px', fontSize: 14, color: currentTheme.text, lineHeight: 1.7, border: `1px solid ${currentTheme.primary}40` }}>{aiIntro}</div>
                  : <div style={{ color: '#94a3b8', fontSize: 13, fontStyle: 'italic' }}>（去"用AI帮忙"生成自我介绍）</div>
                }
              </div>
              <div style={{ background: '#fff', padding: '10px 16px', textAlign: 'center', fontSize: 12, color: '#94a3b8' }}>Made with AI · {name}的个人展示页</div>
            </div>
          )}
        </div>
      )}

      {tab === 'ai' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🤖 让AI帮你写自我介绍</h2>
          <p className="lesson-text">填好了信息，让AI帮你生成一段自我介绍！生成后会自动出现在展示网站预览里。</p>
          {!name.trim() ? (
            <div className="lesson-tip-box">💡 先去"做一做"填写你的名字和兴趣，再回来生成介绍！</div>
          ) : (
            <>
              <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 12, padding: '14px 16px', marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: '#15803d', fontWeight: 600, marginBottom: 6 }}>AI将根据这些信息帮你写：</div>
                <div style={{ fontSize: 14, color: '#1e293b' }}>
                  👤 {name}{age && `，${age}岁`}<br />
                  ❤️ 兴趣：{hobbies.join(' ') || '（还没选）'}<br />
                  {hobbyDesc && `📝 ${hobbyDesc}`}<br />
                  {motto && `💬 座右铭：${motto}`}
                </div>
              </div>
              <button className="lesson-btn" style={{ background: hobbies.length > 0 ? accentColor : '#e2e8f0', color: hobbies.length > 0 ? '#fff' : '#94a3b8' }}
                disabled={hobbies.length === 0 || loadingIntro} onClick={handleGenerateIntro}>
                {loadingIntro ? '✍️ AI正在写...' : '✨ 生成自我介绍！'}
              </button>
              {introError && <div style={{ color: '#ef4444', fontSize: 13, marginTop: 10, padding: '8px 12px', background: '#fff5f5', borderRadius: 8 }}>{introError}</div>}
              {aiIntro && (
                <div style={{ marginTop: 14, padding: '16px', background: `${accentColor}08`, border: `2px solid ${accentColor}30`, borderRadius: 12 }}>
                  <div style={{ fontSize: 13, color: accentColor, fontWeight: 600, marginBottom: 8 }}>✅ AI生成的自我介绍：</div>
                  <div style={{ fontSize: 15, color: '#1e293b', lineHeight: 1.8 }}>{aiIntro}</div>
                  <button onClick={handleGenerateIntro} style={{ marginTop: 10, fontSize: 12, color: accentColor, background: 'none', border: `1px solid ${accentColor}`, borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>
                    重新生成
                  </button>
                </div>
              )}
              {aiIntro && <div className="lesson-tip-box" style={{ marginTop: 12 }}>🎉 介绍已生成！去"做一做"点"预览我的网站"，看完整效果！</div>}
            </>
          )}
          <div className="ai-prompt-card" style={{ marginTop: 20 }}>
            <div className="ai-prompt-title">📋 提示词拓展：让AI改风格</div>
            <div className="ai-prompt-body">
              我有一段自我介绍：<br />
              "[贴上AI生成的介绍]"<br /><br />
              请帮我改成[更酷/更可爱/更正式]的风格，<br />
              但保留我的名字和兴趣内容，不超过80字。
            </div>
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
                <button className="lesson-btn" style={{ background: accentColor }} onClick={nextQuestion}>
                  {quizIdx + 1 < QUIZ.length ? '下一题 →' : '查看结果'}
                </button>
              )}
            </div>
          ) : (
            <div className="quiz-done">
              <div className="quiz-done-score">{quizScore}/{QUIZ.length}</div>
              <div className="quiz-done-msg">
                {quizScore === 3 ? '🎉 全对！你已经是网站规划小能手了！' : quizScore === 2 ? '👍 答对两题，非常棒！' : '💪 回去"学一学"看看，再来挑战！'}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'work' && (
        <div className="lesson-content">
          <div className="certificate">
            <div className="certificate-title">🌈 兴趣展示网站 · 完成！</div>
            <div className="certificate-name">{name || '我的展示网站'}</div>
            <div className="certificate-sub">第 15 课 · 模块 C · AI 项目实践</div>
            <div style={{ fontSize: 14, color: '#93c5fd', margin: '16px 0', lineHeight: 1.8 }}>
              你完成了一个真正属于你自己的展示页面！<br />
              <strong style={{ color: '#bfdbfe' }}>规划内容 → AI生成介绍 → 主题定制</strong><br />
              {aiIntro && '你的AI自我介绍已经生成并展示在页面上了！'}
            </div>
            <div style={{ fontSize: 24, letterSpacing: 4 }}>⭐⭐⭐</div>
          </div>
          {name && (
            <div style={{ marginTop: 16, border: `2px solid ${currentTheme.primary}`, borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ background: currentTheme.primary, padding: '12px 16px', color: '#fff', fontWeight: 700 }}>{name} 的兴趣展示 · {currentTheme.label}主题</div>
              <div style={{ background: currentTheme.secondary, padding: 14 }}>
                {hobbies.length > 0 && <div style={{ fontSize: 24, marginBottom: 8 }}>{hobbies.join(' ')}</div>}
                {aiIntro && <div style={{ fontSize: 14, color: currentTheme.text, lineHeight: 1.7 }}>{aiIntro}</div>}
                {motto && <div style={{ fontSize: 13, color: currentTheme.primary, marginTop: 8, fontStyle: 'italic' }}>"{motto}"</div>}
              </div>
            </div>
          )}
          <div className="lesson-next-preview" style={{ marginTop: 16 }}>
            <div className="lesson-next-title">🚀 下一课预告：第 16 课 · 学会改 Bug</div>
            <p>别怕报错！下一课你将学会读懂错误信息，用AI帮你找到并修复Bug——从此Debug不再是噩梦！</p>
          </div>
        </div>
      )}
    </div>
  )
}
