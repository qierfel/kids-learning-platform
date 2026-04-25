import { useState } from 'react'
import './Lesson.css'

const TOPICS = [
  { id: 'animal', label: '🦁 动物世界', desc: '关于动物的有趣知识', systemHint: '你是一个友善的动物知识专家，专门回答10-12岁孩子关于动物的问题。用简单有趣的语言，每次回答保持在100字以内，可以加表情符号。' },
  { id: 'space', label: '🚀 宇宙太空', desc: '关于星球和宇宙的秘密', systemHint: '你是一个生动的太空科普专家，专门回答10-12岁孩子关于宇宙和天文的问题。用简单有趣的语言，每次回答保持在100字以内，可以加表情符号。' },
  { id: 'science', label: '🔬 科学小秘密', desc: '日常生活中的科学原理', systemHint: '你是一个活泼的科学知识专家，专门回答10-12岁孩子关于日常科学原理的问题。用简单有趣的语言，每次回答保持在100字以内，可以加表情符号。' },
  { id: 'history', label: '🏛️ 历史故事', desc: '古今中外的历史故事', systemHint: '你是一个有趣的历史故事专家，专门回答10-12岁孩子关于历史的问题。用故事化的语言，每次回答保持在100字以内，可以加表情符号。' },
]

const SAMPLE_QUESTIONS = {
  animal: ['猫为什么爱睡觉？', '鲸鱼是鱼吗？', '变色龙怎么变色的？'],
  space: ['月亮为什么有阴晴圆缺？', '黑洞是什么？', '宇宙有多大？'],
  science: ['彩虹是怎么形成的？', '为什么天空是蓝色的？', '冰为什么会融化？'],
  history: ['长城是谁修建的？', '古埃及金字塔有什么用？', '为什么恐龙会灭绝？'],
}

const QUIZ = [
  {
    q: '做一个好的问答工具，最重要的第一步是什么？',
    options: ['让它支持所有话题', '明确它回答什么范围的问题', '让它看起来很漂亮', '让它能说话'],
    correct: 1,
    explain: '好的工具要"专而精"。先定好话题范围，AI才能给出更准确、更有用的回答。这叫"聚焦"。',
  },
  {
    q: '向AI提问时，下面哪种提问方式更好？',
    options: ['问什么？', '猫为什么会发出呼噜声，这代表什么意思？', '猫', '动物很有趣'],
    correct: 1,
    explain: '越具体的问题，AI给的答案越有帮助。"猫为什么会发出呼噜声"比"猫"或"问什么"具体得多。',
  },
  {
    q: '如果AI回答的内容让你看不懂，你应该怎么做？',
    options: ['放弃，不再问了', '换一个问题继续问', '问AI"可以说得更简单一点吗？"', '认为AI坏了'],
    correct: 2,
    explain: '你可以直接告诉AI你不懂，让它用更简单的语言解释。这叫"追问"，是使用AI工具的重要技巧！',
  },
]

export default function Lesson14({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  const accentColor = '#0ea5e9'
  const topic = TOPICS.find(t => t.id === selectedTopic)

  async function handleAsk() {
    if (!question.trim() || !selectedTopic || loading) return
    const userQ = question.trim()
    setQuestion('')
    setError('')
    const newMessages = [...messages, { role: 'user', content: userQ }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const apiMessages = [
        { role: 'user', content: `[系统设定：${topic.systemHint}]\n\n我的问题：${userQ}` },
      ]
      if (messages.length > 0) {
        // Build conversation context (last 4 exchanges)
        const recent = messages.slice(-4)
        const contextStr = recent.map(m => `${m.role === 'user' ? '孩子问' : 'AI答'}：${m.content}`).join('\n')
        apiMessages[0].content = `[系统设定：${topic.systemHint}]\n\n之前的对话：\n${contextStr}\n\n现在新的问题：${userQ}`
      }
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ type: 'chat', payload: { messages: apiMessages, subject: topic.label } }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setMessages([...newMessages, { role: 'ai', content: data.text || '' }])
    } catch {
      setError('AI暂时没有响应，请稍后再试。')
      setMessages(newMessages)
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

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回课程列表</button>

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#e0f2fe', color: '#0369a1' }}>第 14 课 · 模块 C</span>
        <span className="lesson-hero-emoji">❓</span>
        <h1 className="lesson-hero-title">做一个问答小工具</h1>
        <p className="lesson-hero-sub">Q&A Mini Tool</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>学会向AI提出清晰的问题</li>
          <li>理解AI问答工具的工作原理</li>
          <li>完成一个主题问答小程序</li>
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
            <h2 className="lesson-section-title">❓ 什么是问答工具？</h2>
            <p className="lesson-text">问答工具就是：你<strong>提问</strong>，它给出<strong>答案</strong>。最常见的例子是搜索引擎，而现在AI让问答工具变得更智能——它不只返回链接，而是直接给你一个人性化的回答。</p>
            <div className="lesson-tip-box" style={{ marginTop: 12 }}>
              🔑 <strong>关键区别：</strong>搜索引擎给你一堆网页链接；AI问答工具直接给你一个整理好的答案。
            </div>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">🎯 怎么问出好问题？</h2>
            <div className="lesson-step-list">
              {[
                { step: '1', title: '说清楚话题', desc: '不要只说"动物"，要说"猫为什么..."——越具体越好' },
                { step: '2', title: '说清楚你想要什么', desc: '问"是什么"还是"为什么"还是"怎么做"？目的不同，答案不同' },
                { step: '3', title: '学会追问', desc: '如果第一个回答没看懂，说"能说得更简单一点吗？"' },
              ].map(s => (
                <div key={s.step} className="lesson-step-item">
                  <span className="lesson-step-num" style={{ background: accentColor }}>{s.step}</span>
                  <div><strong>{s.title}</strong><p>{s.desc}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">🛠️ 今天要做什么？</h2>
            <p className="lesson-text">我们要搭一个<strong>专题问答工具</strong>：先选一个话题，然后你可以一直问关于这个话题的问题，AI专门回答。</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
              {TOPICS.map(t => (
                <div key={t.id} style={{ background: `${accentColor}10`, border: `1.5px solid ${accentColor}30`, borderRadius: 10, padding: '8px 14px', fontSize: 14 }}>
                  {t.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'do' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🛠️ 你的问答小工具</h2>

          {!selectedTopic ? (
            <>
              <p className="lesson-text">第一步：选择你的问答话题</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 12 }}>
                {TOPICS.map(t => (
                  <button key={t.id} onClick={() => { setSelectedTopic(t.id); setMessages([]) }}
                    style={{ border: '2px solid #e2e8f0', borderRadius: 14, padding: '16px 12px', textAlign: 'center', background: '#fff', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <div style={{ fontSize: 28, marginBottom: 6 }}>{t.label.split(' ')[0]}</div>
                    <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 14 }}>{t.label.split(' ').slice(1).join(' ')}</div>
                    <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{t.desc}</div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ background: `${accentColor}15`, border: `2px solid ${accentColor}40`, borderRadius: 10, padding: '6px 14px', fontWeight: 700, color: accentColor, fontSize: 14 }}>
                  {topic.label}
                </div>
                <button onClick={() => { setSelectedTopic(null); setMessages([]) }}
                  style={{ fontSize: 12, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                  换话题
                </button>
              </div>

              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>试试这些问题：</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                {SAMPLE_QUESTIONS[selectedTopic].map(q => (
                  <button key={q} onClick={() => setQuestion(q)}
                    style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 20, padding: '6px 12px', fontSize: 13, cursor: 'pointer', color: '#475569' }}>
                    {q}
                  </button>
                ))}
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, minHeight: 200, maxHeight: 360, overflowY: 'auto', padding: 12, marginBottom: 12 }}>
                {messages.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 14, paddingTop: 40 }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>❓</div>
                    在下方输入你的第一个问题！
                  </div>
                ) : (
                  messages.map((m, i) => (
                    <div key={i} style={{ marginBottom: 12, display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                      <div style={{
                        maxWidth: '80%', padding: '10px 14px', borderRadius: 12, fontSize: 14, lineHeight: 1.6,
                        background: m.role === 'user' ? accentColor : '#fff',
                        color: m.role === 'user' ? '#fff' : '#1e293b',
                        border: m.role === 'ai' ? '1px solid #e2e8f0' : 'none',
                      }}>
                        {m.content}
                      </div>
                    </div>
                  ))
                )}
                {loading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 8 }}>
                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '10px 14px', color: '#94a3b8', fontSize: 14 }}>
                      AI正在思考中...
                    </div>
                  </div>
                )}
              </div>

              {error && <div style={{ color: '#ef4444', fontSize: 13, marginBottom: 8, padding: '8px 12px', background: '#fff5f5', borderRadius: 8 }}>{error}</div>}

              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  style={{ flex: 1, border: '2px solid #e2e8f0', borderRadius: 10, padding: '10px 14px', fontSize: 14, outline: 'none' }}
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAsk()}
                  placeholder={`问关于${topic.label.split(' ').slice(1).join(' ')}的问题...`}
                  maxLength={100}
                  disabled={loading}
                />
                <button className="lesson-btn" style={{ background: question.trim() && !loading ? accentColor : '#e2e8f0', color: question.trim() && !loading ? '#fff' : '#94a3b8', padding: '10px 20px', margin: 0 }}
                  disabled={!question.trim() || loading} onClick={handleAsk}>
                  问！
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {tab === 'ai' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🤖 用AI设计你的问答工具</h2>
          <p className="lesson-text">在"做一做"你已经用了AI问答功能！这里学一个进阶技巧——如何让AI变成更专业的顾问：</p>

          <div className="ai-prompt-card">
            <div className="ai-prompt-title">📋 设计专题AI助手的提示词模板</div>
            <div className="ai-prompt-body">
              我想做一个关于[话题]的问答工具。<br /><br />
              请你扮演一个专门研究[话题]的专家，设定如下：<br />
              - 受众：10-12岁的小学生<br />
              - 回答长度：每次不超过100字<br />
              - 语言风格：友善、生动、可以加表情<br />
              - 擅长话题：[具体说明擅长什么方面]<br /><br />
              现在开始！我的第一个问题是：[你的问题]
            </div>
          </div>

          <div className="lesson-tip-box" style={{ marginTop: 16 }}>
            <strong>小技巧：</strong>告诉AI它是谁（角色）、说给谁听（受众）、怎么说（风格），AI的回答质量会大幅提升！这就是<strong>提示词工程</strong>的核心思路。
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
                {quizScore === 3 ? '🎉 全对！你已经是提问小达人了！' : quizScore === 2 ? '👍 答对两题，继续加油！' : '💪 回去"学一学"看看提问技巧，再来挑战！'}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'work' && (
        <div className="lesson-content">
          <div className="certificate">
            <div className="certificate-title">❓ 问答小工具 · 完成！</div>
            <div className="certificate-name">{topic ? topic.label : '主题问答工具'}</div>
            <div className="certificate-sub">第 14 课 · 模块 C · AI 项目实践</div>
            <div style={{ fontSize: 14, color: '#93c5fd', margin: '16px 0', lineHeight: 1.8 }}>
              你学会了：<br />
              <strong style={{ color: '#bfdbfe' }}>选好话题 → 问清楚问题 → 追问追到懂</strong><br />
              你已经自己做了一个AI问答工具！<br />
              {messages.length > 0 && `你一共问了 ${messages.filter(m => m.role === 'user').length} 个问题。`}
            </div>
            <div style={{ fontSize: 24, letterSpacing: 4 }}>⭐⭐⭐</div>
          </div>

          {messages.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={{ fontWeight: 600, color: '#475569', marginBottom: 10 }}>📋 我的问答记录：</div>
              {messages.filter(m => m.role === 'user').map((m, i) => (
                <div key={i} style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 10, padding: '8px 14px', marginBottom: 6, fontSize: 13 }}>
                  <strong style={{ color: '#0369a1' }}>Q{i + 1}：</strong>{m.content}
                </div>
              ))}
            </div>
          )}

          <div className="lesson-next-preview" style={{ marginTop: 16 }}>
            <div className="lesson-next-title">🚀 下一课预告：第 15 课 · 做一个兴趣展示网站</div>
            <p>你将亲手规划一个展示自己兴趣的页面，用AI帮你生成自我介绍文字，完成一个"属于你自己"的作品！</p>
          </div>
        </div>
      )}
    </div>
  )
}
