import { useState } from 'react'
import './Lesson.css'

const DEVICE_BADGE = (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
    <span style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>📱 手机</span>
    <span style={{ background: '#e0e7ff', color: '#4338ca', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>🖥️ iPad</span>
    <span style={{ background: '#dcfce7', color: '#15803d', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>💻 电脑</span>
    <span style={{ background: '#f0f9ff', color: '#0369a1', fontSize: 11, padding: '4px 10px', borderRadius: 999 }}>📍 本课内置AI，三种设备都可以</span>
  </div>
)

const TASK_EXAMPLES = [
  {
    id: 'study',
    label: '📚 制定学习计划',
    emoji: '📚',
    desc: '让AI帮你把一周的作业/复习排成清晰的计划表',
    prompt: '我有一周的时间，需要完成这些任务：[列举你的作业/复习内容]。请帮我制定一个合理的每日计划，每天2小时，把难的和简单的搭配着来，并告诉我怎么保持专注。',
  },
  {
    id: 'present',
    label: '🎤 准备一次演讲',
    emoji: '🎤',
    desc: '让AI帮你把演讲从零开始做成完整稿',
    prompt: '我需要做一个关于[主题]的3分钟演讲，给我的同班同学听。请帮我：1. 想出一个吸引人的开头；2. 列出3个主要内容点；3. 写一个有力的结尾。要适合10-12岁学生的语气。',
  },
  {
    id: 'gift',
    label: '🎁 策划一个礼物',
    emoji: '🎁',
    desc: '让AI帮你想出有创意的礼物方案和实施步骤',
    prompt: '我想给[关系，比如：妈妈/好朋友]一个特别的生日惊喜，预算大约[金额]元。请帮我：1. 想3个有创意的礼物方案；2. 每个方案的实施步骤；3. 怎么让这个礼物更有惊喜感。',
  },
  {
    id: 'project',
    label: '💻 做一个小项目',
    emoji: '💻',
    desc: '让AI帮你把想法拆成可执行的步骤',
    prompt: '我想做一个[项目描述，比如：关于我最爱动物的介绍网页/生日倒计时小工具]。我是初学者。请帮我：1. 把这个项目拆成5个简单步骤；2. 每步需要多长时间；3. 第一步从哪里开始。',
  },
  {
    id: 'custom',
    label: '✏️ 我自己想做的事',
    emoji: '✏️',
    desc: '用AI帮你做任何你想完成的事',
    prompt: '',
  },
]

const DECOMPOSE_STEPS = [
  { step: '1', title: '说清楚你想做什么', desc: '具体描述目标，越清楚越好', eg: '"我想做一个介绍我最爱球队的网页"' },
  { step: '2', title: '说出你的限制', desc: '时间、资源、技能水平', eg: '"我是初学者，有3天时间"' },
  { step: '3', title: '让AI拆成小步骤', desc: '要求AI分解任务并估计时间', eg: '"请拆成5步，告诉我每步大概要多久"' },
  { step: '4', title: '一步一步执行', desc: '完成一步再问下一步', eg: '"第一步我做完了，现在告诉我第二步怎么做"' },
]

const QUIZ = [
  {
    q: '让AI帮你做一件复杂的事，最好的方式是？',
    options: ['把所有要求一口气说完，让AI全部搞定', '先描述目标，让AI帮你拆成小步骤，一步一步做', '让AI帮你写完，你直接交给老师', '不用AI，自己做'],
    correct: 1,
    explain: '拆任务是关键！大目标→小步骤→一步一步做。这样不会被大任务吓到，也容易保持进度！',
  },
  {
    q: '向AI描述任务时，以下哪种说法最有效？',
    options: ['"帮我做一个网页"', '"帮我做一个介绍我最喜欢球队的网页，我是初学者，有3天时间，第一步怎么做？"', '"做网页给我"', '"帮我做作业"'],
    correct: 1,
    explain: '有效的任务描述包含：做什么 + 你的情况（初学者）+ 时间限制 + 具体第一步。AI才能给出真正有帮助的回应！',
  },
  {
    q: 'AI帮你拆完任务后，最好的做法是？',
    options: ['把AI给的方案全部打印出来', '完成第一步，有问题就继续问AI', '等AI帮你自动完成每一步', '把方案保存起来，以后再做'],
    correct: 1,
    explain: '马上开始第一步！每完成一步就向AI反馈，有困难时追问细节。AI是你的"实时教练"，不是"自动完成机器"。',
  },
]

export default function Lesson23({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [selectedTask, setSelectedTask] = useState(null)
  const [customPrompt, setCustomPrompt] = useState('')
  const [filledPrompt, setFilledPrompt] = useState('')
  const [aiResult, setAiResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [aiError, setAiError] = useState('')
  const [followUp, setFollowUp] = useState('')
  const [followResult, setFollowResult] = useState('')
  const [followLoading, setFollowLoading] = useState(false)
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  const accentColor = '#0ea5e9'

  async function fetchAI(prompt, isFollowUp) {
    if (isFollowUp) {
      setFollowLoading(true)
      setFollowResult('')
    } else {
      setLoading(true)
      setAiError('')
      setAiResult('')
    }
    try {
      const messages = isFollowUp && aiResult
        ? [
            { role: 'user', content: filledPrompt || customPrompt },
            { role: 'assistant', content: aiResult },
            { role: 'user', content: prompt },
          ]
        : [{ role: 'user', content: prompt }]
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ type: 'chat', payload: { messages, subject: 'AI助手做一件事' } }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      if (isFollowUp) setFollowResult(data.text || '')
      else setAiResult(data.text || '')
    } catch {
      if (!isFollowUp) setAiError('AI暂时没有响应，请稍后再试。')
    } finally {
      if (isFollowUp) setFollowLoading(false)
      else setLoading(false)
    }
  }

  function handleTaskSelect(task) {
    setSelectedTask(task.id)
    setFilledPrompt(task.id !== 'custom' ? task.prompt : '')
    setAiResult('')
    setFollowResult('')
    setAiError('')
  }

  function handleStart() {
    const prompt = selectedTask === 'custom' ? customPrompt : filledPrompt
    if (!prompt.trim()) return
    fetchAI(prompt.trim(), false)
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

  const task = TASK_EXAMPLES.find(t => t.id === selectedTask)
  const activePrompt = selectedTask === 'custom' ? customPrompt : filledPrompt

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回课程列表</button>

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#e0f2fe', color: '#0c4a6e' }}>第 23 课 · 模块 F · 动手体验</span>
        <span className="lesson-hero-emoji">🤝</span>
        <h1 className="lesson-hero-title">用 AI 帮你做一件事</h1>
        <p className="lesson-hero-sub">AI as Your Assistant — 拆任务，一步步搞定</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>学会把大任务拆成小步骤，让AI陪你一步步做</li>
          <li>亲手用AI完成一件真实的事</li>
          <li>知道什么任务适合交给AI，什么不适合</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {['learn', 'do', 'quiz', 'work'].map(t => (
          <button key={t} className={`lesson-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}
            style={tab === t ? { borderBottomColor: accentColor, color: accentColor } : {}}>
            {t === 'learn' ? '学一学' : t === 'do' ? '一起做！' : t === 'quiz' ? '测一测' : '我的成果'}
          </button>
        ))}
      </div>

      {tab === 'learn' && (
        <div className="lesson-content">
          {DEVICE_BADGE}
          <div className="lesson-section">
            <h2 className="lesson-section-title">🤝 AI是你的"事情助手"</h2>
            <p className="lesson-text">AI不只是聊天和画图。它最强大的能力之一，是帮你把"我不知道怎么开始"的大事，变成"可以马上行动"的小步骤。关键不是让AI替你做，而是让AI帮你拆清楚、一步步搞定。</p>

            <div style={{ background: '#f0f9ff', border: '1.5px solid #bae6fd', borderRadius: 12, padding: '14px 16px', marginTop: 12 }}>
              <div style={{ fontWeight: 700, color: '#0369a1', marginBottom: 8 }}>✅ 适合让AI帮忙的事：</div>
              <div style={{ fontSize: 13, color: '#1e293b', lineHeight: 1.9 }}>
                📋 制定计划（学习/项目/旅行）<br />
                📝 整理思路（演讲稿/作文/展示）<br />
                💡 头脑风暴（礼物创意/活动方案）<br />
                🔧 拆解项目（步骤/时间/资源）<br />
                📖 解释概念（遇到不懂的地方）
              </div>
            </div>

            <div style={{ background: '#fff5f5', border: '1.5px solid #fca5a5', borderRadius: 12, padding: '14px 16px', marginTop: 10 }}>
              <div style={{ fontWeight: 700, color: '#b91c1c', marginBottom: 8 }}>⚠️ 不适合完全交给AI的事：</div>
              <div style={{ fontSize: 13, color: '#1e293b', lineHeight: 1.9 }}>
                ❌ 你自己的作业和考试（靠AI不是真学会）<br />
                ❌ 需要你真实经历的事（AI没法替你去做运动）<br />
                ❌ 需要人情感判断的事（跟朋友道歉要你自己说）
              </div>
            </div>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">🪜 "AI帮做一件事"的4步法</h2>
            <div className="lesson-step-list">
              {DECOMPOSE_STEPS.map(s => (
                <div key={s.step} className="lesson-step-item">
                  <span className="lesson-step-num" style={{ background: accentColor }}>{s.step}</span>
                  <div>
                    <strong>{s.title}</strong>
                    <p>{s.desc}</p>
                    <div style={{ fontSize: 12, color: '#64748b', background: '#f0f9ff', borderRadius: 6, padding: '4px 8px', marginTop: 4 }}>
                      例：{s.eg}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'do' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🎯 选一件你想做的事</h2>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {TASK_EXAMPLES.map(t => (
              <button key={t.id} onClick={() => handleTaskSelect(t)}
                style={{ padding: '8px 12px', borderRadius: 999, border: `2px solid ${selectedTask === t.id ? accentColor : '#e2e8f0'}`, background: selectedTask === t.id ? '#f0f9ff' : '#f8fafc', color: selectedTask === t.id ? accentColor : '#475569', fontSize: 13, fontWeight: selectedTask === t.id ? 700 : 400, cursor: 'pointer' }}>
                {t.label}
              </button>
            ))}
          </div>

          {selectedTask && (
            <>
              {task && task.id !== 'custom' && (
                <div style={{ background: '#f0f9ff', border: '1.5px solid #bae6fd', borderRadius: 12, padding: '12px 14px', marginBottom: 14, fontSize: 13, color: '#0369a1' }}>
                  💡 {task.desc}。下面是模板提示词，把 [括号里] 的内容改成你的实际情况：
                </div>
              )}

              <div className="l8-field">
                <label className="l8-label">{selectedTask === 'custom' ? '✏️ 描述你想做的事（用4步法写提示词）：' : '📝 你的提示词（修改 [括号] 里的内容）：'}</label>
                {selectedTask === 'custom' ? (
                  <textarea
                    style={{ width: '100%', border: `2px solid ${accentColor}40`, borderRadius: 10, padding: '10px 14px', fontSize: 14, fontFamily: 'inherit', minHeight: 110, resize: 'vertical', boxSizing: 'border-box', outline: 'none' }}
                    value={customPrompt}
                    onChange={e => setCustomPrompt(e.target.value)}
                    placeholder={'我想做/完成：______\n我的情况：______（年龄/技能水平/时间）\n请帮我拆成3-5个步骤，告诉我从哪里开始。'}
                    maxLength={500}
                  />
                ) : (
                  <textarea
                    style={{ width: '100%', border: `2px solid ${accentColor}40`, borderRadius: 10, padding: '10px 14px', fontSize: 14, fontFamily: 'inherit', minHeight: 110, resize: 'vertical', boxSizing: 'border-box', outline: 'none' }}
                    value={filledPrompt}
                    onChange={e => setFilledPrompt(e.target.value)}
                    maxLength={500}
                  />
                )}
              </div>

              <button className="lesson-btn" style={{ background: activePrompt.trim() ? accentColor : '#e2e8f0', color: activePrompt.trim() ? '#fff' : '#94a3b8' }}
                disabled={!activePrompt.trim() || loading} onClick={handleStart}>
                {loading ? '🤝 AI正在拆任务...' : '🚀 让AI帮我！'}
              </button>

              {aiError && <div style={{ color: '#ef4444', fontSize: 13, marginTop: 10, padding: '8px 12px', background: '#fff5f5', borderRadius: 8 }}>{aiError}</div>}

              {aiResult && (
                <div style={{ marginTop: 14 }}>
                  <div style={{ padding: '16px', background: '#f0f9ff', border: '2px solid #bae6fd', borderRadius: 12 }}>
                    <div style={{ fontSize: 13, color: accentColor, fontWeight: 700, marginBottom: 8 }}>🤝 AI的方案：</div>
                    <div style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>{aiResult}</div>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>💬 继续问AI（比如：第一步怎么做？有什么工具？）</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input
                        style={{ flex: 1, border: '2px solid #e2e8f0', borderRadius: 8, padding: '8px 12px', fontSize: 14, fontFamily: 'inherit', outline: 'none' }}
                        value={followUp}
                        onChange={e => setFollowUp(e.target.value)}
                        placeholder="第一步具体怎么做？"
                        onKeyDown={e => e.key === 'Enter' && followUp.trim() && fetchAI(followUp.trim(), true)}
                      />
                      <button onClick={() => fetchAI(followUp.trim(), true)}
                        disabled={!followUp.trim() || followLoading}
                        style={{ padding: '8px 16px', background: followUp.trim() ? accentColor : '#e2e8f0', color: followUp.trim() ? '#fff' : '#94a3b8', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                        {followLoading ? '...' : '问'}
                      </button>
                    </div>
                    {followResult && (
                      <div style={{ marginTop: 10, padding: '12px 14px', background: '#fff', border: '1.5px solid #bae6fd', borderRadius: 10, fontSize: 14, color: '#1e293b', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                        {followResult}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {!selectedTask && (
            <div style={{ textAlign: 'center', padding: '30px 20px', color: '#94a3b8', fontSize: 14 }}>
              ↑ 选一件你想做的事，开始！
            </div>
          )}
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
                {quizScore === 3 ? '🎉 全对！AI任务达人！' : quizScore === 2 ? '👍 不错！去"一起做"完成一件事！' : '💪 回去"学一学"看4步法！'}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'work' && (
        <div className="lesson-content">
          <div className="certificate">
            <div className="certificate-title">🤝 模块 F 完成！</div>
            <div className="certificate-name">
              {aiResult ? `完成了：${task?.emoji} ${task?.label || '自定义任务'}` : '去"一起做"完成一件事！'}
            </div>
            <div className="certificate-sub">第 23 课 · 模块 F · 动手体验</div>
            <div style={{ fontSize: 14, color: '#93c5fd', margin: '16px 0', lineHeight: 1.8 }}>
              模块F结束！你已经用AI写了文字、画了图、做了一件事<br />
              <strong style={{ color: '#bfdbfe' }}>下一步：用AI做真实的大作品！</strong>
            </div>
            <div style={{ fontSize: 24, letterSpacing: 4 }}>⭐⭐⭐</div>
          </div>

          {aiResult && (
            <div style={{ marginTop: 14, padding: '14px', background: '#f0f9ff', border: '1.5px solid #bae6fd', borderRadius: 12 }}>
              <div style={{ fontSize: 13, color: accentColor, fontWeight: 700, marginBottom: 6 }}>📋 AI帮我制定的方案：</div>
              <div style={{ fontSize: 13, color: '#1e293b', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{aiResult.slice(0, 300)}{aiResult.length > 300 ? '...' : ''}</div>
            </div>
          )}

          <div className="lesson-next-preview" style={{ marginTop: 16 }}>
            <div className="lesson-next-title">🚀 下一课预告：第 24 课 · 我的第一张AI海报</div>
            <p>模块G正式开始！第24课你要做一张真实的AI海报——用AI工具从零到一，完成一个可以分享的真实作品！</p>
          </div>
        </div>
      )}
    </div>
  )
}
