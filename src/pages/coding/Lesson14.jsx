import { useState } from 'react'
import './Lesson.css'
import PromptCompareLab from './PromptCompareLab'

const DEVICE_BADGE = (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '12px 0 4px' }}>
    {['📱 手机', '📱 iPad', '💻 电脑'].map(d => (
      <span key={d} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 20, padding: '4px 12px', fontSize: 13, color: '#475569' }}>{d}</span>
    ))}
    <span style={{ fontSize: 12, color: '#94a3b8', alignSelf: 'center' }}>· 有浏览器就能用</span>
  </div>
)

const FORTUNE_TYPES = [
  { id: 'school', label: '📚 学习运', prompt: '请给一个孩子关于"学习运"的有趣占卜结果，语气神秘有趣，加一条学习小建议，不超过60字。', color: '#6366f1' },
  { id: 'friend', label: '👫 友情运', prompt: '请给一个孩子关于"友情运"的有趣占卜结果，语气温暖神秘，加一条交友小建议，不超过60字。', color: '#ec4899' },
  { id: 'luck', label: '🍀 今日幸运', prompt: '请给一个孩子关于"今日幸运"的有趣占卜结果，包括幸运颜色和幸运数字，语气活泼神秘，不超过60字。', color: '#f59e0b' },
  { id: 'dream', label: '🌟 梦想运', prompt: '请给一个孩子关于"梦想运"的有趣占卜结果，语气鼓励且神秘，给一条追梦小建议，不超过60字。', color: '#10b981' },
]

const UPGRADES = [
  { version: 'v1.0', title: '基础占卜机', desc: '只有一个按钮，随机给你一句话', icon: '🎱' },
  { version: 'v1.5', title: '加上名字', desc: '输入你的名字，占卜结果更个性化', icon: '👤' },
  { version: 'v2.0', title: '选类别', desc: '可以选"学习运"、"友情运"等不同类别', icon: '📂' },
  { version: 'v2.5', title: '加音效朗读', desc: '点击后自动朗读占卜结果', icon: '🔊' },
]

const QUIZ = [
  {
    q: '"迭代升级"是什么意思？',
    options: ['把作品删掉重新做', '一次加完所有功能', '先做基础版，发现问题再一步步改进', '等到完美了再开始'],
    correct: 2,
    explain: '迭代就是小步前进：先做能用的基础版，再逐步加功能。专业程序员都这样做！',
  },
  {
    q: '做占卜机 v2.0 时，最应该先问的是？',
    options: ['代码要写多少行？', '用户用起来感觉怎么样？哪里不够好？', '要加多少个功能？', '会不会出Bug？'],
    correct: 1,
    explain: '升级前要先想"用户体验哪里不够好"。用户反馈是升级方向最好的指南针！',
  },
  {
    q: '占卜机的"输出"是什么？',
    options: ['你选的运势类别', '你的名字', 'AI给出的占卜结果文字', '点击的按钮'],
    correct: 2,
    explain: '记住：输入→处理→输出。占卜结果文字是AI处理之后给你的"输出"。',
  },
]

export default function Lesson14({ onBack }) {
  const [tab, setTab] = useState('learn')

  // Fortune teller state
  const [userName, setUserName] = useState('')
  const [selectedType, setSelectedType] = useState(null)
  const [fortuneResult, setFortuneResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [speaking, setSpeaking] = useState(false)
  const [fortuneCount, setFortuneCount] = useState(0)

  // Quiz
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  const accentColor = '#8b5cf6'

  function speak(text) {
    if (!window.speechSynthesis || !text) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'zh-CN'
    u.rate = 0.85
    u.onstart = () => setSpeaking(true)
    u.onend = () => setSpeaking(false)
    u.onerror = () => setSpeaking(false)
    window.speechSynthesis.speak(u)
  }

  async function handleFortune() {
    if (!selectedType) return
    setLoading(true)
    setError('')
    setFortuneResult('')
    const ft = FORTUNE_TYPES.find(f => f.id === selectedType)
    const namePrefix = userName.trim() ? `为${userName.trim()}` : ''
    const prompt = `任务：生成一条儿童友好的占卜结果。

对象：${userName.trim() ? `${userName.trim()}，10-12岁孩子` : '一位10-12岁孩子'}
主题：${ft.label}

输出要求：
1. 语气神秘但温暖
2. 给1条具体的小建议
3. 如果适合，可以加入幸运颜色或幸运数字

限制：
- 不超过60字
- 不要写得像大人星座文案`
    try {
      const res = await fetch('/api/openai-text', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          system: '你是儿童AI课程里的创意占卜助手。请输出简短、有趣、适合孩子阅读的结果。',
          messages: [{ role: 'user', content: `${namePrefix}${prompt}` }],
          reasoningEffort: 'low',
          verbosity: 'low',
          maxOutputTokens: 180,
          metadata: { lesson: '14', subject: '占卜机' },
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      const result = data.text || ''
      setFortuneResult(result)
      setFortuneCount(c => c + 1)
      speak(result)
    } catch {
      setError('占卜师暂时外出，请稍后再试。')
    } finally {
      setLoading(false)
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

  const ft = FORTUNE_TYPES.find(f => f.id === selectedType)

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回课程列表</button>

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#ede9fe', color: '#6d28d9' }}>第 14 课 · 模块 C</span>
        <span className="lesson-hero-emoji">🔮</span>
        <h1 className="lesson-hero-title">占卜机 + 作品升级</h1>
        <p className="lesson-hero-sub">Fortune Teller & Upgrade</p>
        {DEVICE_BADGE}
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>用AI做一个有趣的占卜机</li>
          <li>学会把已有作品加上新功能</li>
          <li>理解"迭代升级"的思路</li>
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
            <h2 className="lesson-section-title">🔮 什么是占卜机？</h2>
            <p className="lesson-text">占卜机是一种"输入你的问题，AI给你有趣的答案"的小工具。它不是真的能预测未来，但能用AI生成有创意的回答，非常好玩！</p>
            <div className="lesson-tip-box">
              🔑 <strong>今天的双重任务：</strong>①先做一个能用的基础占卜机；②再一步步给它加功能，体验"迭代升级"！
            </div>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">📈 什么是"迭代升级"？</h2>
            <p className="lesson-text">迭代 = 先做出能用的版本，再慢慢加功能，越做越好。看看占卜机是怎么一步步升级的：</p>
            <div style={{ marginTop: 12 }}>
              {UPGRADES.map((u, i) => (
                <div key={u.version} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ background: accentColor, color: '#fff', borderRadius: 8, padding: '4px 8px', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', marginTop: 2 }}>{u.version}</div>
                  <div style={{ flex: 1, background: `${accentColor}${i === 3 ? '20' : '10'}`, borderRadius: 10, padding: '10px 12px', border: `1.5px solid ${accentColor}${i === 3 ? '50' : '20'}` }}>
                    <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 14 }}>{u.icon} {u.title}</div>
                    <div style={{ color: '#64748b', fontSize: 13, marginTop: 2 }}>{u.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'do' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🔮 你的 AI 占卜机（v2.0）</h2>
          <p className="lesson-text">这已经是升级后的版本——有名字输入 + 四种运势类别！</p>

          <div className="l8-field">
            <label className="l8-label">👤 你的名字（可选，让占卜更个性化）</label>
            <input className="l8-input" value={userName} onChange={e => setUserName(e.target.value)}
              placeholder="比如：小明" maxLength={8} />
          </div>

          <div className="l8-field">
            <label className="l8-label">🌟 选择你想占卜的运势</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginTop: 8 }}>
              {FORTUNE_TYPES.map(ft => (
                <button key={ft.id} onClick={() => setSelectedType(ft.id)}
                  style={{ border: `2px solid ${selectedType === ft.id ? ft.color : '#e2e8f0'}`, borderRadius: 12, padding: '14px 10px', background: selectedType === ft.id ? `${ft.color}12` : '#fff', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{ft.label.split(' ')[0]}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: selectedType === ft.id ? ft.color : '#475569' }}>{ft.label.split(' ').slice(1).join(' ')}</div>
                </button>
              ))}
            </div>
          </div>

          <button className="lesson-btn"
            style={{ background: selectedType && !loading ? accentColor : '#e2e8f0', color: selectedType && !loading ? '#fff' : '#94a3b8' }}
            disabled={!selectedType || loading} onClick={handleFortune}>
            {loading ? '🔮 占卜师正在推算...' : '✨ 开始占卜！'}
          </button>

          {error && <div style={{ color: '#ef4444', fontSize: 14, marginTop: 12, padding: '10px 14px', background: '#fff5f5', borderRadius: 8 }}>{error}</div>}

          {fortuneResult && (
            <div style={{ marginTop: 16, padding: '20px', background: 'linear-gradient(135deg, #faf5ff, #ede9fe)', border: `2px solid ${ft?.color || accentColor}40`, borderRadius: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🔮</div>
              <div style={{ fontSize: 13, color: accentColor, fontWeight: 600, marginBottom: 10 }}>
                {ft?.label} {userName && `· ${userName}的专属占卜`}
              </div>
              <div style={{ fontSize: 15, color: '#1e293b', lineHeight: 1.8, fontStyle: 'italic' }}>{fortuneResult}</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 14 }}>
                <button onClick={() => speak(fortuneResult)} disabled={speaking}
                  style={{ background: speaking ? '#e2e8f0' : accentColor, color: speaking ? '#94a3b8' : '#fff', border: 'none', borderRadius: 20, padding: '6px 16px', fontSize: 13, cursor: speaking ? 'default' : 'pointer' }}>
                  {speaking ? '🔊 朗读中...' : '🔊 朗读'}
                </button>
                <button onClick={handleFortune}
                  style={{ background: 'none', border: `1.5px solid ${accentColor}`, color: accentColor, borderRadius: 20, padding: '6px 16px', fontSize: 13, cursor: 'pointer' }}>
                  🎲 再占一次
                </button>
              </div>
            </div>
          )}

          {fortuneCount > 0 && (
            <div style={{ marginTop: 12, fontSize: 13, color: '#94a3b8', textAlign: 'center' }}>
              你已经占卜了 {fortuneCount} 次 ✨
            </div>
          )}
        </div>
      )}

      {tab === 'ai' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🤖 用AI继续升级你的占卜机</h2>
          <p className="lesson-text">在"做一做"你体验了 v2.0。想做 v3.0 吗？用这个提示词让AI帮你设计下一步升级：</p>

          <div className="ai-prompt-card">
            <div className="ai-prompt-title">📋 作品升级提示词模板</div>
            <div className="ai-prompt-body">
              我做了一个AI占卜机，现在的功能是：<br />
              - 可以输入名字<br />
              - 可以选4种运势（学习/友情/幸运/梦想）<br />
              - AI给出占卜结果，还能朗读<br /><br />
              我想升级它，请帮我设计下一个版本（v3.0）：<br />
              1. 可以加什么新功能？（给3个建议）<br />
              2. 哪个功能最容易实现？先从哪个开始？<br />
              3. 用什么样的提示词让AI生成更好的占卜内容？
            </div>
          </div>

          <div className="lesson-tip-box" style={{ marginTop: 16 }}>
            <strong>升级的黄金法则：</strong>
            <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
              <li>一次只升级一个功能，测试没问题再加下一个</li>
              <li>先问"用户最想要什么"，再决定加什么功能</li>
              <li>v1.0 能用就发布，收到反馈再继续改</li>
            </ul>
          </div>

          <div style={{ marginTop: 24 }}>
            <h2 className="lesson-section-title">🔬 提示词对比：为什么新版更稳</h2>
            <PromptCompareLab
              prompts={[
                { id: 'old-fortune', label: '旧问法', text: '给我一个学习运占卜。', tone: 'weak' },
                { id: 'new-fortune', label: 'GPT-5.5 新问法', text: '任务：生成一条给10-12岁孩子看的学习运占卜。输出要求：1. 神秘但温暖；2. 给1条具体学习建议；3. 不超过60字。限制：不要写得太成人化。', tone: 'strong' },
              ]}
              subject="占卜机对比"
              accent={accentColor}
              hint="说清楚对象、语气、长度和限制后，输出会更稳定、更像产品内容。"
              intro="占卜类内容最怕发散。试试看两种问法的差别："
            />
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
                {quizScore === 3 ? '🎉 全对！你已经掌握了迭代思维！' : quizScore === 2 ? '👍 答对两题，继续！' : '💪 回去"学一学"复习一下，再来！'}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'work' && (
        <div className="lesson-content">
          <div className="certificate">
            <div className="certificate-title">🔮 占卜机 · 完成！</div>
            <div className="certificate-name">
              {fortuneCount > 0 ? `共占卜 ${fortuneCount} 次` : '去"做一做"体验占卜机吧！'}
            </div>
            <div className="certificate-sub">第 14 课 · 模块 C · 过渡实践</div>
            <div style={{ fontSize: 14, color: '#93c5fd', margin: '16px 0', lineHeight: 1.8 }}>
              你学会了：<br />
              <strong style={{ color: '#bfdbfe' }}>v1.0 → v2.0 → 持续迭代升级</strong><br />
              占卜机只是开始——用同样的思路，你可以升级任何作品！
            </div>
            <div style={{ fontSize: 24, letterSpacing: 4 }}>⭐⭐⭐</div>
          </div>

          {fortuneResult && (
            <div style={{ marginTop: 16, background: '#faf5ff', border: '1.5px solid #c4b5fd', borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontWeight: 600, color: accentColor, marginBottom: 6 }}>🔮 你的最新占卜结果：</div>
              <div style={{ fontSize: 14, color: '#1e293b', fontStyle: 'italic', lineHeight: 1.7 }}>{fortuneResult}</div>
            </div>
          )}

          <div className="lesson-next-preview" style={{ marginTop: 16 }}>
            <div className="lesson-next-title">🚀 下一课预告：第 15 课 · Bug 修复 + 作品集</div>
            <p>别怕报错！下一课你将学会读懂错误，用AI修复Bug，然后把所有作品整理成一个漂亮的作品集！</p>
          </div>
        </div>
      )}
    </div>
  )
}
