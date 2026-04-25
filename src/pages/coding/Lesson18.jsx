import { useState } from 'react'
import './Lesson.css'

const ALL_MODULES = [
  { module: 'A', title: 'AI 素养启蒙', range: '第 1-6 课', color: '#6366f1', skills: ['认识AI', '数据', '机器学习', '自然语言', '图像识别', '决策树'] },
  { module: 'B', title: 'AI 创作入门', range: '第 7-12 课', color: '#f59e0b', skills: ['网页结构', '内容规划', '视觉设计', '按钮交互', 'AI提问', '完成作品'] },
  { module: 'C', title: 'AI 项目实践', range: '第 13-18 课', color: '#8b5cf6', skills: ['输入输出', '问答工具', '展示网站', '改Bug', '迭代升级', '发布展示'] },
]

const PRESENT_TIPS = [
  { step: '1', title: '说"是什么"', desc: '我做了一个______，它可以______。', tip: '一句话让听众秒懂你的作品' },
  { step: '2', title: '说"怎么做的"', desc: '我用了______技术，最难的地方是______，我用______方法解决了。', tip: '展示你解决问题的能力' },
  { step: '3', title: '说"我学到了什么"', desc: '做这个作品我学会了______，下次我想改进______。', tip: '学习者的成长反思让人印象深刻' },
]

const QUIZ = [
  {
    q: '介绍自己的作品时，最重要的第一句话是？',
    options: ['这个作品有多少行代码', '用一句话说清楚这个作品是什么、能做什么', '我花了多少时间做这个', '介绍你用的编程语言'],
    correct: 1,
    explain: '第一句话要让听众马上知道这是什么作品、有什么用。其他细节再慢慢补充。',
  },
  {
    q: '"发布"一个作品意味着什么？',
    options: ['把代码删掉', '让别人也可以看到、使用你的作品', '自己保留，不给别人看', '打印出来'],
    correct: 1,
    explain: '发布就是让作品"走出"你的电脑，让更多人能看到和使用。可以是分享链接、展示给朋友、上传到平台等。',
  },
  {
    q: '完成了18节课的学习，接下来最好的行动是？',
    options: ['停下来休息，不用再做了', '继续做新项目，把技能用起来', '把所有代码删掉重来一遍', '等到学会更多才开始做'],
    correct: 1,
    explain: '学会了就要用！继续做新项目才能让技能变得更熟练。每一个你做的作品，都会让你进步一大步。',
  },
]

export default function Lesson18({ onBack }) {
  const [tab, setTab] = useState('learn')

  // Showcase form
  const [workName, setWorkName] = useState('')
  const [workDesc, setWorkDesc] = useState('')
  const [proudPoint, setProudPoint] = useState('')
  const [nextPlan, setNextPlan] = useState('')
  const [learnedThing, setLearnedThing] = useState('')

  // AI speech
  const [aiSpeech, setAiSpeech] = useState('')
  const [loadingAi, setLoadingAi] = useState(false)
  const [aiError, setAiError] = useState('')

  // Certificate
  const [yourName, setYourName] = useState('')
  const [showCert, setShowCert] = useState(false)

  // Quiz
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  const accentColor = '#8b5cf6'

  async function handleGenerateSpeech() {
    if (!workName.trim()) return
    setLoadingAi(true)
    setAiError('')
    setAiSpeech('')

    const prompt = `请帮我写一段作品展示演讲稿，用第一人称，语气自信又可爱，不超过120字。

我的信息：
- 作品名称：${workName.trim()}
- 作品功能：${workDesc.trim() || '一个AI编程学习项目'}
- 最自豪的地方：${proudPoint.trim() || '完成了整个作品'}
- 我学到的：${learnedThing.trim() || '很多编程和AI的知识'}
- 下一步计划：${nextPlan.trim() || '继续做更多项目'}

请直接给出演讲稿文字，分3段：第一段说作品是什么，第二段说最自豪的地方，第三段说学到了什么和下一步打算。`

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ type: 'chat', payload: { messages: [{ role: 'user', content: prompt }], subject: '作品展示演讲' } }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setAiSpeech(data.text || '')
    } catch {
      setAiError('AI暂时没有响应，请稍后再试。')
    } finally {
      setLoadingAi(false)
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

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回课程列表</button>

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#ede9fe', color: '#6d28d9' }}>第 18 课 · 模块 C · 最终课</span>
        <span className="lesson-hero-emoji">🎓</span>
        <h1 className="lesson-hero-title">发布与展示</h1>
        <p className="lesson-hero-sub">Publish & Present</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>学会向别人介绍自己的作品</li>
          <li>用AI生成作品展示演讲稿</li>
          <li>完成18课全部学习，获得结业证书</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {['learn', 'do', 'ai', 'quiz', 'work'].map(t => (
          <button key={t} className={`lesson-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}
            style={tab === t ? { borderBottomColor: accentColor, color: accentColor } : {}}>
            {t === 'learn' ? '学一学' : t === 'do' ? '做一做' : t === 'ai' ? '用AI帮忙' : t === 'quiz' ? '测一测' : '结业证书'}
          </button>
        ))}
      </div>

      {tab === 'learn' && (
        <div className="lesson-content">
          <div className="lesson-section">
            <h2 className="lesson-section-title">🎓 什么是"发布"？</h2>
            <p className="lesson-text">发布就是让你的作品走出你的电脑，让别人也能看到和使用。可以是：把链接发给朋友、在课堂上展示、上传到平台……哪怕只是给家人看一看，也算发布！</p>
            <div className="lesson-tip-box">
              💡 <strong>重要心态：</strong>作品不需要"完美"才能发布。先发布出去，收集反馈，再继续改进——这才是真正的发布精神！
            </div>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">🎤 怎么展示你的作品？</h2>
            <div className="lesson-step-list">
              {PRESENT_TIPS.map(s => (
                <div key={s.step} className="lesson-step-item">
                  <span className="lesson-step-num" style={{ background: accentColor }}>{s.step}</span>
                  <div>
                    <strong>{s.title}</strong>
                    <p style={{ fontStyle: 'italic', color: '#475569' }}>{s.desc}</p>
                    <p style={{ fontSize: 12, color: '#94a3b8' }}>👉 {s.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">🏆 你走过的 18 课旅程</h2>
            {ALL_MODULES.map(m => (
              <div key={m.module} style={{ background: `${m.color}10`, border: `1.5px solid ${m.color}30`, borderRadius: 12, padding: '12px 14px', marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, color: m.color }}>模块 {m.module}：{m.title}</span>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>{m.range}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {m.skills.map(s => (
                    <span key={s} style={{ background: `${m.color}20`, color: m.color, borderRadius: 6, padding: '3px 8px', fontSize: 12 }}>✓ {s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'do' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">📋 填写你的作品展示卡</h2>
          <p className="lesson-text">认真填写，之后AI会帮你把这些信息变成一段完整的展示演讲稿！</p>

          <div className="l8-field">
            <label className="l8-label">🏷️ 你的作品名称 *</label>
            <input className="l8-input" value={workName} onChange={e => setWorkName(e.target.value)} placeholder={'比如：我的兴趣展示网站'} maxLength={30} />
          </div>

          <div className="l8-field">
            <label className="l8-label">📖 这个作品能做什么？</label>
            <input className="l8-input" value={workDesc} onChange={e => setWorkDesc(e.target.value)} placeholder={'比如：展示我的名字、爱好和AI生成的自我介绍'} maxLength={60} />
          </div>

          <div className="l8-field">
            <label className="l8-label">🌟 你最自豪的一点</label>
            <input className="l8-input" value={proudPoint} onChange={e => setProudPoint(e.target.value)} placeholder={'比如：第一次让AI真正帮我生成了有用的文字'} maxLength={60} />
          </div>

          <div className="l8-field">
            <label className="l8-label">📚 你在这次学习中学到了什么？</label>
            <input className="l8-input" value={learnedThing} onChange={e => setLearnedThing(e.target.value)} placeholder={'比如：学会了输入输出、怎么向AI提问、如何改Bug'} maxLength={60} />
          </div>

          <div className="l8-field">
            <label className="l8-label">🚀 你的下一步计划</label>
            <input className="l8-input" value={nextPlan} onChange={e => setNextPlan(e.target.value)} placeholder={'比如：给网站加上更多功能，或者学真正的HTML/CSS'} maxLength={60} />
          </div>

          {workName.trim() && (
            <div style={{ marginTop: 16, background: `${accentColor}08`, border: `2px solid ${accentColor}30`, borderRadius: 14, padding: '16px' }}>
              <div style={{ fontWeight: 700, color: accentColor, marginBottom: 12 }}>📋 你的展示卡预览</div>
              <div style={{ fontSize: 14, color: '#1e293b', lineHeight: 2 }}>
                <div><strong>作品名：</strong>{workName}</div>
                {workDesc && <div><strong>功能：</strong>{workDesc}</div>}
                {proudPoint && <div><strong>最自豪：</strong>{proudPoint}</div>}
                {learnedThing && <div><strong>学到了：</strong>{learnedThing}</div>}
                {nextPlan && <div><strong>下一步：</strong>{nextPlan}</div>}
              </div>
              <div className="lesson-tip-box" style={{ marginTop: 12 }}>
                🎤 去"用AI帮忙"，把这些信息变成一段漂亮的演讲稿！
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'ai' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🤖 让AI帮你写展示演讲稿</h2>
          <p className="lesson-text">
            {!workName.trim()
              ? '先去"做一做"填写你的作品信息，再回来生成演讲稿！'
              : '你的作品信息已经填好了！点击按钮，AI帮你生成一段演讲稿。'}
          </p>

          {workName.trim() && (
            <>
              <div style={{ background: '#faf5ff', border: '1.5px solid #d8b4fe', borderRadius: 12, padding: '12px 16px', marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: '#7c3aed', fontWeight: 600, marginBottom: 6 }}>将为这个作品生成演讲稿：</div>
                <div style={{ fontSize: 14, color: '#1e293b' }}>
                  {workName}{workDesc && ` — ${workDesc}`}
                </div>
              </div>

              <button className="lesson-btn" style={{ background: accentColor }} disabled={loadingAi} onClick={handleGenerateSpeech}>
                {loadingAi ? '✍️ AI正在创作...' : '🎤 生成展示演讲稿！'}
              </button>

              {aiError && <div style={{ color: '#ef4444', fontSize: 13, marginTop: 10, padding: '8px 12px', background: '#fff5f5', borderRadius: 8 }}>{aiError}</div>}

              {aiSpeech && (
                <div style={{ marginTop: 16, padding: '18px', background: '#faf5ff', border: '2px solid #c4b5fd', borderRadius: 14 }}>
                  <div style={{ fontSize: 13, color: accentColor, fontWeight: 600, marginBottom: 10 }}>🎤 你的展示演讲稿：</div>
                  <div style={{ fontSize: 15, color: '#1e293b', lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>{aiSpeech}</div>
                  <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                    <button onClick={handleGenerateSpeech} style={{ fontSize: 12, color: accentColor, background: 'none', border: `1px solid ${accentColor}`, borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>
                      重新生成
                    </button>
                  </div>
                </div>
              )}

              {aiSpeech && (
                <div className="lesson-tip-box" style={{ marginTop: 12 }}>
                  🎤 把这段话大声读给家人或同学听——你就完成了第一次正式的作品展示！
                </div>
              )}
            </>
          )}

          <div className="ai-prompt-card" style={{ marginTop: 20 }}>
            <div className="ai-prompt-title">📋 更多展示场景的提示词</div>
            <div className="ai-prompt-body">
              场景1：给父母介绍<br />
              "帮我把这段演讲稿改成向父母介绍的版本，更口语化，强调我学到了什么"<br /><br />
              场景2：给老师展示<br />
              "帮我改成更正式的版本，适合在课堂上向老师展示"<br /><br />
              场景3：写简短的作品介绍<br />
              "帮我用30字以内总结这个作品，用于发朋友圈"
            </div>
          </div>
        </div>
      )}

      {tab === 'quiz' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🎯 最终测验</h2>
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
                  {quizIdx + 1 < QUIZ.length ? '下一题 →' : '🎓 完成测验，领取结业证书！'}
                </button>
              )}
            </div>
          ) : (
            <div className="quiz-done">
              <div className="quiz-done-score">{quizScore}/{QUIZ.length}</div>
              <div className="quiz-done-msg">
                {quizScore === 3 ? '🎉 满分！去"结业证书"领取你的专属证书！' : quizScore === 2 ? '👍 答对两题！快去领取结业证书！' : '💪 没关系，学到了就是赚到了！去领证书吧！'}
              </div>
              <button className="lesson-btn" style={{ background: accentColor, marginTop: 16 }} onClick={() => setTab('work')}>
                🎓 去领取结业证书！
              </button>
            </div>
          )}
        </div>
      )}

      {tab === 'work' && (
        <div className="lesson-content">
          {!showCert ? (
            <>
              <h2 className="lesson-section-title">🎓 领取你的结业证书</h2>
              <p className="lesson-text">最后一步！输入你的名字，生成专属结业证书。</p>
              <div className="l8-field">
                <label className="l8-label">👤 你的名字</label>
                <input className="l8-input" value={yourName} onChange={e => setYourName(e.target.value)} placeholder={'你叫什么名字？'} maxLength={10} />
              </div>
              <button className="lesson-btn" style={{ background: yourName.trim() ? accentColor : '#e2e8f0', color: yourName.trim() ? '#fff' : '#94a3b8' }}
                disabled={!yourName.trim()} onClick={() => setShowCert(true)}>
                🎓 生成我的结业证书！
              </button>
            </>
          ) : (
            <>
              <div style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #1e40af 100%)', borderRadius: 20, padding: '30px 24px', textAlign: 'center', color: '#fff', marginBottom: 20, boxShadow: '0 8px 32px rgba(109,40,217,0.4)' }}>
                <div style={{ fontSize: 48, marginBottom: 8 }}>🎓</div>
                <div style={{ fontSize: 13, color: '#c4b5fd', letterSpacing: 3, marginBottom: 12 }}>AI 编程创作屋 · 结业证书</div>
                <div style={{ fontSize: 26, fontWeight: 900, marginBottom: 4 }}>{yourName}</div>
                <div style={{ fontSize: 14, color: '#ddd6fe', marginBottom: 20 }}>已完成 18 课 · 模块 A + B + C 全部课程</div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
                  {ALL_MODULES.map(m => (
                    <div key={m.module} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 8px' }}>
                      <div style={{ fontSize: 12, color: '#c4b5fd', marginBottom: 4 }}>模块 {m.module}</div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{m.title}</div>
                      <div style={{ fontSize: 11, color: '#ddd6fe', marginTop: 2 }}>{m.range}</div>
                    </div>
                  ))}
                </div>

                <div style={{ fontSize: 13, color: '#ddd6fe', lineHeight: 1.8, marginBottom: 16 }}>
                  你已经从"认识AI"走到了"发布展示作品"，<br />
                  从不懂输入输出，到亲手做问答工具、展示网站，<br />
                  学会改Bug、迭代升级，最终站在台前介绍自己的作品。<br />
                  <strong style={{ color: '#fff' }}>这只是你创作之路的开始！</strong>
                </div>

                <div style={{ fontSize: 28, letterSpacing: 6 }}>⭐⭐⭐⭐⭐</div>
              </div>

              {aiSpeech && (
                <div style={{ background: '#faf5ff', border: '2px solid #c4b5fd', borderRadius: 14, padding: '16px', marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, color: accentColor, marginBottom: 8 }}>🎤 你的作品展示演讲稿</div>
                  <div style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{aiSpeech}</div>
                </div>
              )}

              <div style={{ background: '#f0fdf4', border: '2px solid #86efac', borderRadius: 14, padding: '16px' }}>
                <div style={{ fontWeight: 700, color: '#15803d', marginBottom: 10 }}>🚀 接下来你可以做什么？</div>
                {[
                  { emoji: '💻', text: '学习真正的 HTML/CSS/JavaScript，让你的网页能真正上线' },
                  { emoji: '🤖', text: '继续用 Claude、ChatGPT 等 AI 工具，做更复杂的项目' },
                  { emoji: '🎮', text: '试试 Scratch 游戏编程，或者 Python 数据科学' },
                  { emoji: '🌟', text: '把你的作品分享给朋友和家人，听取反馈，继续改进' },
                ].map(item => (
                  <div key={item.emoji} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8, fontSize: 14, color: '#1e293b' }}>
                    <span style={{ fontSize: 18 }}>{item.emoji}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
