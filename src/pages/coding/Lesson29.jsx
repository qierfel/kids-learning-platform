import { useState } from 'react'
import './Lesson.css'

const DEVICE_BADGE = (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
    <span style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>📱 手机</span>
    <span style={{ background: '#e0e7ff', color: '#4338ca', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>🖥️ iPad</span>
    <span style={{ background: '#dcfce7', color: '#15803d', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>💻 电脑</span>
    <span style={{ background: '#fdf4ff', color: '#86198f', fontSize: 11, padding: '4px 10px', borderRadius: 999 }}>🎓 最后一课，所有设备都可以完成</span>
  </div>
)

const JOURNEY_MODULES = [
  {
    id: 'A',
    name: 'Module A · AI认知',
    color: '#6366f1',
    bg: '#eef2ff',
    emoji: '🧠',
    lessons: ['认识AI', '数据是AI的食物', '训练你的AI', 'AI如何理解语言', 'AI的眼睛', '做小小AI工程师'],
    summary: '理解AI的原理、数据、训练方式，建立AI思维基础',
  },
  {
    id: 'B',
    name: 'Module B · 网页制作',
    color: '#0891b2',
    bg: '#ecfeff',
    emoji: '🌐',
    lessons: ['网页是什么', '做我的第一个网页', '让网页变好看', '让按钮有反应', '请AI帮我一起做', '完成我的小作品'],
    summary: '学习HTML/CSS/JS，动手做出自己的第一个网页作品',
  },
  {
    id: 'C',
    name: 'Module C · 项目实战',
    color: '#16a34a',
    bg: '#f0fdf4',
    emoji: '⚙️',
    lessons: ['输入和输出', '占卜机+作品升级', 'Bug修复+作品集'],
    summary: '调试代码、升级作品、完成第一个完整项目',
  },
  {
    id: 'D',
    name: 'Module D · 工具基础',
    color: '#d97706',
    bg: '#fffbeb',
    emoji: '🔑',
    lessons: ['你的设备能做什么', '开通你的AI账号'],
    summary: '了解设备能力，注册Claude/ChatGPT等AI工具账号',
  },
  {
    id: 'E',
    name: 'Module E · 工具大全',
    color: '#f97316',
    bg: '#fff7ed',
    emoji: '🛠️',
    lessons: ['会聊天的AI', '会画画的AI', '会做工的AI'],
    summary: '探索AI聊天、AI绘图、AI生产力工具的使用方法',
  },
  {
    id: 'F',
    name: 'Module F · AI协作',
    color: '#8b5cf6',
    bg: '#f5f3ff',
    emoji: '🤝',
    lessons: ['用AI写一段话', '用AI画一张图', '用AI帮你做一件事'],
    summary: '真正学会和AI协作——写作、画图、任务拆解',
  },
  {
    id: 'G',
    name: 'Module G · 真项目',
    color: '#f59e0b',
    bg: '#fffbeb',
    emoji: '🚀',
    lessons: ['我的第一张AI海报', '我的第一份AI PPT', '我的第一个AI网页', '我的第一个AI小程序', '我的第一段AI短视频/歌'],
    summary: '用AI工具完成5个真实项目：海报、PPT、网页、小程序、视频/音乐',
  },
]

const PORTFOLIO_PROJECTS = [
  { id: 'poster', emoji: '🖼️', name: 'AI海报', module: 'G', tool: 'Canva / 美图设计室 / 稿定', desc: '用AI工具设计的主题海报' },
  { id: 'ppt', emoji: '📊', name: 'AI PPT', module: 'G', tool: 'Gamma / 美图PPT', desc: '一句话生成的演示文稿' },
  { id: 'webpage', emoji: '🌐', name: 'AI网页', module: 'G', tool: 'V0 / Bolt', desc: '真实可访问的网页项目' },
  { id: 'miniapp', emoji: '📱', name: 'AI小程序', module: 'G', tool: '微信开发者工具', desc: '在微信里运行的小程序' },
  { id: 'video', emoji: '🎬', name: 'AI视频/歌', module: 'G', tool: '可灵 / Suno', desc: '用AI创作的视频或音乐' },
  { id: 'writing', emoji: '✍️', name: 'AI写作', module: 'F', tool: 'Claude / ChatGPT', desc: '用AI辅助写的一段话' },
  { id: 'image', emoji: '🎨', name: 'AI画作', module: 'F', tool: '即梦 / 可灵', desc: '用AI生成的图片作品' },
  { id: 'webpage2', emoji: '💻', name: '手写网页', module: 'B', tool: 'HTML + CSS + JS', desc: '自己写代码做的第一个网页' },
]

const INTRO_TEMPLATES = [
  {
    id: 'formal',
    label: '🎓 正式介绍风',
    prompt: '请帮我写一段作品集自我介绍，大约100字，风格正式一点。我是一名10-12岁的学生，完成了一套AI编程课程，学会了HTML/CSS/JS网页制作、和AI对话协作、用AI工具做海报/PPT/网页/小程序/视频/音乐。请用第一人称写，突出我的学习成果和对AI工具的掌握。',
  },
  {
    id: 'fun',
    label: '😄 活泼有趣风',
    prompt: '请帮我写一段超有趣的作品集自我介绍，大约80字，风格活泼、有创意。我学会了和AI一起创作：做网页、做小程序、让AI画画、让AI唱歌、做海报……总之就是玩转了一堆AI工具！请用第一人称写，让读的人感觉很好玩、很想了解我做了什么。',
  },
  {
    id: 'story',
    label: '📖 故事叙事风',
    prompt: '请帮我写一段作品集自我介绍，用讲故事的方式，大约120字。从"我第一次打开Claude时"开始，描述我从什么都不会，到学会HTML网页、AI绘图、AI写作、到最后做出真实的小程序和网页……是一段成长的旅程。用第一人称，感情真实，有细节感。',
  },
]

const QUIZ = [
  {
    q: '完成这29节课之后，你掌握了哪些核心能力？',
    options: [
      '只会用Claude聊天',
      'HTML/CSS/JS网页开发 + AI工具协作 + 真实项目制作',
      '只会做海报和PPT',
      '只会写Python代码',
    ],
    correct: 1,
    explain: '你学了AI原理、网页开发（HTML/CSS/JS）、AI工具使用（绘图、写作、视频、音乐），还做了海报、PPT、网页、小程序5个真实项目！这是全面的AI数字创作能力！',
  },
  {
    q: '你的AI作品集最重要的用途是什么？',
    options: [
      '只是为了给老师检查',
      '展示你的学习成果，让别人看到你会什么',
      '用来赚钱的',
      '只能自己看，不能分享',
    ],
    correct: 1,
    explain: '作品集是你能力的证明！可以展示给家人、老师、朋友，也可以在以后申请学校、课程或比赛时使用。把你做过的每个项目都记录下来，它会越来越有价值！',
  },
  {
    q: '学完这套课程，下一步最推荐做什么？',
    options: [
      '什么都不做，休息一下就好',
      '继续做项目——把任何一个作品做得更完整，或者用AI工具解决生活中的真实问题',
      '把所有工具的账号都注销掉',
      '等大学了再继续学',
    ],
    correct: 1,
    explain: '学编程和AI最重要的是"动手做"！把一个已有的项目继续升级，或者发现生活中的问题并用AI工具来解决——这才是真正的成长！',
  },
]

const accentColor = '#f59e0b'
const goldColor = '#d97706'

export default function Lesson29({ onBack }) {
  const [tab, setTab] = useState(0)
  const [expandedModule, setExpandedModule] = useState(null)
  const [checkedProjects, setCheckedProjects] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [customPrompt, setCustomPrompt] = useState('')
  const [studentName, setStudentName] = useState('')
  const [aiIntro, setAiIntro] = useState('')
  const [loading, setLoading] = useState(false)
  const [aiError, setAiError] = useState('')
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)
  const [graduated, setGraduated] = useState(false)

  const tabs = ['我的旅程', '我的作品集', 'AI写介绍', '测一测', '毕业证书']

  function toggleProject(id) {
    setCheckedProjects(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  async function generateIntro() {
    const prompt = selectedTemplate
      ? INTRO_TEMPLATES.find(t => t.id === selectedTemplate)?.prompt
      : customPrompt
    if (!prompt) return
    setLoading(true)
    setAiError('')
    setAiIntro('')
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'chat',
          payload: {
            messages: [{ role: 'user', content: prompt }],
            subject: 'AI作品集介绍',
          },
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setAiIntro(data.text || '')
    } catch {
      setAiError('AI暂时没有响应，请稍后再试。')
    } finally {
      setLoading(false)
    }
  }

  function handleQuizAnswer(idx) {
    if (quizAnswer !== null) return
    setQuizAnswer(idx)
    if (idx === QUIZ[quizIdx].correct) setQuizScore(s => s + 1)
  }

  function nextQuiz() {
    if (quizIdx + 1 < QUIZ.length) {
      setQuizIdx(q => q + 1)
      setQuizAnswer(null)
    } else {
      setQuizDone(true)
    }
  }

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回</button>
      {DEVICE_BADGE}

      <div className="lesson-header">
        <div className="lesson-tag">Module G · 真项目 · 最终课</div>
        <h1 className="lesson-title">第29课：我的AI作品集</h1>
        <p className="lesson-subtitle">整理你的创作旅程，用AI写自我介绍，正式毕业！</p>
      </div>

      <div className="tab-bar">
        {tabs.map((t, i) => (
          <button
            key={i}
            className={`tab-btn${tab === i ? ' active' : ''}`}
            style={tab === i ? { background: accentColor, color: '#fff' } : {}}
            onClick={() => setTab(i)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Tab 0: 我的旅程 ── */}
      {tab === 0 && (
        <div className="tab-content">
          <div className="info-card" style={{ background: '#fffbeb', borderLeft: `4px solid ${goldColor}` }}>
            <h3 style={{ color: goldColor, marginTop: 0 }}>🎓 你走完了整个旅程！</h3>
            <p style={{ margin: 0, lineHeight: 1.8 }}>
              从第1课"认识AI"到第29课，你经历了7个模块、29节课的学习。
              点开每个模块，看看你都掌握了什么！
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
            {JOURNEY_MODULES.map(mod => (
              <div
                key={mod.id}
                style={{
                  border: `2px solid ${expandedModule === mod.id ? mod.color : '#e5e7eb'}`,
                  borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.15s'
                }}
              >
                <button
                  onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                    background: expandedModule === mod.id ? mod.bg : '#fff',
                    border: 'none', padding: '14px 18px', cursor: 'pointer', textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{mod.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: mod.color }}>{mod.name}</div>
                    <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>{mod.summary}</div>
                  </div>
                  <span style={{ fontSize: 16, color: '#9ca3af' }}>
                    {expandedModule === mod.id ? '▲' : '▼'}
                  </span>
                </button>
                {expandedModule === mod.id && (
                  <div style={{ padding: '12px 18px 16px', background: mod.bg }}>
                    <div style={{ fontWeight: 600, color: mod.color, fontSize: 13, marginBottom: 8 }}>学过的课程：</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {mod.lessons.map((l, i) => (
                        <span key={i} style={{
                          background: '#fff', border: `1px solid ${mod.color}40`,
                          borderRadius: 20, padding: '4px 12px', fontSize: 13, color: '#374151'
                        }}>
                          ✓ {l}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 20, padding: '18px 20px', textAlign: 'center',
            background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
            borderRadius: 14, border: `2px solid ${goldColor}`
          }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🌟</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: goldColor }}>
              7个模块 · 29节课 · 你全部完成了！
            </div>
            <div style={{ fontSize: 13, color: '#78350f', marginTop: 6, lineHeight: 1.6 }}>
              你现在会的技能：AI原理 · 网页开发 · AI写作 · AI绘图<br />
              AI海报 · AI PPT · AI网页 · AI小程序 · AI视频/音乐
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 1: 我的作品集 ── */}
      {tab === 1 && (
        <div className="tab-content">
          <h3 style={{ color: goldColor }}>📁 整理你的作品</h3>
          <p style={{ color: '#6b7280', fontSize: 14 }}>勾选你做过的作品，看看你攒了多少成果！</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            {PORTFOLIO_PROJECTS.map(p => (
              <label
                key={p.id}
                style={{
                  display: 'flex', flexDirection: 'column', gap: 6,
                  background: checkedProjects.includes(p.id) ? '#fffbeb' : '#fafafa',
                  border: `2px solid ${checkedProjects.includes(p.id) ? goldColor : '#e5e7eb'}`,
                  borderRadius: 12, padding: '14px 14px', cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input
                    type="checkbox"
                    checked={checkedProjects.includes(p.id)}
                    onChange={() => toggleProject(p.id)}
                    style={{ width: 16, height: 16, accentColor: goldColor }}
                  />
                  <span style={{ fontSize: 20 }}>{p.emoji}</span>
                  <span style={{
                    fontWeight: 700, fontSize: 13,
                    color: checkedProjects.includes(p.id) ? goldColor : '#374151'
                  }}>{p.name}</span>
                </div>
                <div style={{ fontSize: 11, color: '#9ca3af', paddingLeft: 26 }}>{p.desc}</div>
                <div style={{
                  fontSize: 10, color: '#d97706', paddingLeft: 26, fontWeight: 600
                }}>🔧 {p.tool}</div>
              </label>
            ))}
          </div>

          {checkedProjects.length > 0 && (
            <div style={{
              padding: '16px 20px', background: '#fffbeb',
              borderRadius: 12, border: `2px solid ${goldColor}`
            }}>
              <div style={{ fontWeight: 700, color: goldColor, marginBottom: 8, fontSize: 16 }}>
                🎉 你的作品集：{checkedProjects.length} 件作品
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {checkedProjects.map(id => {
                  const p = PORTFOLIO_PROJECTS.find(pr => pr.id === id)
                  return p ? (
                    <span key={id} style={{
                      background: '#fff', border: `1px solid ${goldColor}60`,
                      borderRadius: 20, padding: '4px 12px', fontSize: 13, color: '#374151'
                    }}>
                      {p.emoji} {p.name}
                    </span>
                  ) : null
                })}
              </div>
              {checkedProjects.length >= 5 && (
                <div style={{ marginTop: 12, fontSize: 14, color: '#92400e', fontWeight: 600 }}>
                  🌟 太棒了！5件以上作品，你是真正的AI创作者！
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Tab 2: AI写介绍 ── */}
      {tab === 2 && (
        <div className="tab-content">
          <div className="info-card" style={{ background: '#fffbeb', borderLeft: `4px solid ${goldColor}` }}>
            <h3 style={{ color: goldColor, marginTop: 0 }}>✍️ 让AI帮你写作品集介绍</h3>
            <p style={{ margin: 0, lineHeight: 1.7, fontSize: 14 }}>
              选一个风格，或者自己写想法，让Claude帮你写一段自我介绍——
              放在作品集开头，让别人第一眼就知道你是谁、你会什么！
            </p>
          </div>

          <h3 style={{ color: goldColor, marginTop: 20 }}>🎨 选一种介绍风格</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {INTRO_TEMPLATES.map(t => (
              <button
                key={t.id}
                onClick={() => { setSelectedTemplate(t.id); setCustomPrompt('') }}
                style={{
                  border: `2px solid ${selectedTemplate === t.id ? goldColor : '#e5e7eb'}`,
                  background: selectedTemplate === t.id ? '#fffbeb' : '#fff',
                  borderRadius: 10, padding: '14px 16px', cursor: 'pointer',
                  textAlign: 'left', fontWeight: selectedTemplate === t.id ? 700 : 400,
                  color: selectedTemplate === t.id ? goldColor : '#374151',
                  fontSize: 15, transition: 'all 0.15s'
                }}
              >
                {t.label}
              </button>
            ))}
            <button
              onClick={() => setSelectedTemplate(null)}
              style={{
                border: `2px solid ${selectedTemplate === null && customPrompt !== undefined ? '#e5e7eb' : '#e5e7eb'}`,
                background: '#fff', borderRadius: 10, padding: '14px 16px', cursor: 'pointer',
                textAlign: 'left', color: '#374151', fontSize: 15
              }}
            >
              ✏️ 我自己来描述
            </button>
          </div>

          {selectedTemplate === null && (
            <textarea
              value={customPrompt}
              onChange={e => setCustomPrompt(e.target.value)}
              placeholder="告诉AI你想要什么风格的自我介绍，比如：帮我用50字写一句简短的作品集标语，突出我会用AI做各种创作……"
              style={{
                marginTop: 12, width: '100%', minHeight: 100, borderRadius: 10,
                border: '2px solid #fde68a', padding: '12px 14px', fontSize: 14,
                resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit', color: '#374151'
              }}
            />
          )}

          <button
            onClick={generateIntro}
            disabled={loading || (!selectedTemplate && !customPrompt.trim())}
            style={{
              marginTop: 16, width: '100%', background: loading ? '#fde68a' : goldColor, color: '#fff',
              border: 'none', borderRadius: 10, padding: '14px',
              fontSize: 16, fontWeight: 700, cursor: loading ? 'default' : 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {loading ? '⏳ AI正在写...' : '✨ 让AI帮我写介绍'}
          </button>

          {aiError && (
            <div style={{ marginTop: 12, padding: '12px 16px', background: '#fef2f2', borderRadius: 8, color: '#b91c1c', fontSize: 14 }}>
              {aiError}
            </div>
          )}

          {aiIntro && (
            <div style={{ marginTop: 16 }}>
              <div style={{
                padding: '18px 20px', background: '#fffbeb',
                borderRadius: 12, border: `2px solid ${goldColor}`,
                fontSize: 15, lineHeight: 1.8, color: '#374151', whiteSpace: 'pre-wrap'
              }}>
                {aiIntro}
              </div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 8 }}>
                💡 满意的话，把这段话复制保存到你的作品集里！不满意就再试一次，或者换个风格。
              </div>
              <button
                onClick={generateIntro}
                style={{
                  marginTop: 10, background: '#f3f4f6', color: '#374151',
                  border: '1px solid #e5e7eb', borderRadius: 8, padding: '10px 20px',
                  fontSize: 13, cursor: 'pointer'
                }}
              >
                🔄 再生成一次
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Tab 3: 测一测 ── */}
      {tab === 3 && (
        <div className="tab-content">
          {!quizDone ? (
            <>
              <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 6 }}>
                第 {quizIdx + 1} 题 / 共 {QUIZ.length} 题 · 最后的测试！
              </div>
              <div style={{
                background: '#fffbeb', borderRadius: 14, padding: '20px 22px',
                border: '1px solid #fde68a', marginBottom: 16
              }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#374151', lineHeight: 1.6 }}>
                  {QUIZ[quizIdx].q}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {QUIZ[quizIdx].options.map((opt, i) => {
                  let bg = '#fff', border = '#e5e7eb', color = '#374151'
                  if (quizAnswer !== null) {
                    if (i === QUIZ[quizIdx].correct) { bg = '#f0fdf4'; border = '#4ade80'; color = '#15803d' }
                    else if (i === quizAnswer) { bg = '#fef2f2'; border = '#f87171'; color = '#b91c1c' }
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handleQuizAnswer(i)}
                      style={{
                        border: `2px solid ${border}`, background: bg, color,
                        borderRadius: 10, padding: '14px 18px', cursor: quizAnswer !== null ? 'default' : 'pointer',
                        fontSize: 14, fontWeight: quizAnswer !== null && i === QUIZ[quizIdx].correct ? 700 : 400,
                        textAlign: 'left', transition: 'all 0.15s'
                      }}
                    >
                      {['A', 'B', 'C', 'D'][i]}. {opt}
                    </button>
                  )
                })}
              </div>
              {quizAnswer !== null && (
                <>
                  <div style={{
                    marginTop: 14, padding: '14px 18px',
                    background: quizAnswer === QUIZ[quizIdx].correct ? '#f0fdf4' : '#fef2f2',
                    borderRadius: 10,
                    color: quizAnswer === QUIZ[quizIdx].correct ? '#15803d' : '#b91c1c',
                    fontSize: 14, lineHeight: 1.6
                  }}>
                    {quizAnswer === QUIZ[quizIdx].correct ? '🎉 答对了！' : '😅 答错了。'}
                    {' '}{QUIZ[quizIdx].explain}
                  </div>
                  <button
                    onClick={nextQuiz}
                    style={{
                      marginTop: 14, background: goldColor, color: '#fff',
                      border: 'none', borderRadius: 8, padding: '12px 28px',
                      fontSize: 15, fontWeight: 700, cursor: 'pointer'
                    }}
                  >
                    {quizIdx + 1 < QUIZ.length ? '下一题 →' : '🎓 去拿毕业证！'}
                  </button>
                </>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '30px 20px' }}>
              <div style={{ fontSize: 56 }}>
                {quizScore === QUIZ.length ? '🏆' : '🌟'}
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: goldColor, margin: '14px 0 8px' }}>
                {quizScore} / {QUIZ.length} 题答对
              </div>
              <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 24 }}>
                {quizScore === QUIZ.length ? '全部答对！你真的掌握了这套课程的精髓！' : '很棒！去拿你的毕业证吧！'}
              </div>
              <button
                onClick={() => setTab(4)}
                style={{
                  background: goldColor, color: '#fff', border: 'none',
                  borderRadius: 10, padding: '14px 32px',
                  fontSize: 16, fontWeight: 700, cursor: 'pointer'
                }}
              >
                🎓 去拿毕业证 →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Tab 4: 毕业证书 ── */}
      {tab === 4 && (
        <div className="tab-content">
          {!graduated ? (
            <>
              <div style={{
                textAlign: 'center', padding: '24px 20px',
                background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
                borderRadius: 16, border: `2px solid ${goldColor}`, marginBottom: 24
              }}>
                <div style={{ fontSize: 50 }}>🎓</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: goldColor, margin: '12px 0 8px' }}>
                  最后一步：填写你的名字
                </div>
                <div style={{ fontSize: 14, color: '#92400e' }}>
                  输入你的名字，领取你的AI课程毕业证！
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                  你的名字（姓名或昵称都可以）
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  placeholder="例如：小明 / Leon / 李晓彤"
                  style={{
                    width: '100%', border: `2px solid ${goldColor}`, borderRadius: 10,
                    padding: '14px 16px', fontSize: 16, boxSizing: 'border-box',
                    color: '#374151', fontFamily: 'inherit'
                  }}
                />
              </div>

              <button
                onClick={() => studentName.trim() && setGraduated(true)}
                disabled={!studentName.trim()}
                style={{
                  width: '100%', background: studentName.trim() ? goldColor : '#fde68a',
                  color: '#fff', border: 'none', borderRadius: 12, padding: '16px',
                  fontSize: 17, fontWeight: 700, cursor: studentName.trim() ? 'pointer' : 'default'
                }}
              >
                🎉 领取我的毕业证书
              </button>
            </>
          ) : (
            <div style={{
              background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)',
              borderRadius: 20, padding: '36px 28px', textAlign: 'center',
              border: `3px solid ${goldColor}`,
              boxShadow: `0 4px 24px ${goldColor}40`
            }}>
              <div style={{ fontSize: 64, marginBottom: 8 }}>🏅</div>

              <div style={{
                fontSize: 11, letterSpacing: 3, color: '#92400e',
                textTransform: 'uppercase', marginBottom: 8
              }}>
                AI 编程课程 毕业证书
              </div>

              <div style={{
                fontSize: 13, color: '#a16207', marginBottom: 20
              }}>
                Certificate of Completion
              </div>

              <div style={{
                fontSize: 14, color: '#78350f', marginBottom: 8
              }}>
                此证书颁发给
              </div>

              <div style={{
                fontSize: 32, fontWeight: 900, color: goldColor,
                margin: '8px 0 20px', letterSpacing: 2
              }}>
                {studentName}
              </div>

              <div style={{
                fontSize: 13, color: '#92400e', lineHeight: 2, marginBottom: 20
              }}>
                已完成《10-12岁AI编程课程》全部29节课程<br />
                掌握了以下核心能力：
              </div>

              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center',
                marginBottom: 24
              }}>
                {['AI原理', '网页开发', 'AI写作', 'AI绘图', 'AI海报', 'AI PPT', 'AI网页', 'AI小程序', 'AI视频/音乐'].map(skill => (
                  <span key={skill} style={{
                    background: '#fff', border: `1px solid ${goldColor}60`,
                    borderRadius: 20, padding: '4px 14px', fontSize: 13,
                    color: '#78350f', fontWeight: 600
                  }}>
                    ✓ {skill}
                  </span>
                ))}
              </div>

              <div style={{
                borderTop: `1px dashed ${goldColor}80`,
                paddingTop: 16, marginTop: 4
              }}>
                <div style={{ fontSize: 12, color: '#a16207' }}>
                  完成日期：{new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>

              <div style={{
                marginTop: 24, padding: '16px 20px', background: '#fff8ed',
                borderRadius: 12, border: '1px solid #fde68a', textAlign: 'left'
              }}>
                <div style={{ fontWeight: 700, color: goldColor, marginBottom: 10, fontSize: 15 }}>
                  🚀 继续前行的方向
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, color: '#78350f', fontSize: 13, lineHeight: 2.2 }}>
                  <li>把你最喜欢的一个项目继续做完整，加新功能</li>
                  <li>用AI工具解决一个生活中的真实问题</li>
                  <li>尝试参加青少年编程比赛或AI创作大赛</li>
                  <li>教一位朋友或同学使用你学会的AI工具</li>
                  <li>探索 Python / 更多编程语言，向下一阶段出发！</li>
                </ul>
              </div>

              <div style={{ marginTop: 20, fontSize: 14, color: '#92400e', fontWeight: 600 }}>
                🌟 你不只是学过AI，你已经是AI创作者了！
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
