import { useState } from 'react'
import './Lesson.css'

const DEVICE_BADGE = (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
    <span style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>🖥️ iPad</span>
    <span style={{ background: '#dcfce7', color: '#15803d', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>💻 电脑</span>
    <span style={{ background: '#fffbeb', color: '#92400e', fontSize: 11, padding: '4px 10px', borderRadius: 999 }}>💡 AI PPT工具在电脑上体验最完整</span>
  </div>
)

const PPT_TOOLS = [
  {
    id: 'gamma',
    name: 'Gamma',
    emoji: '✨',
    color: '#7c3aed',
    bg: '#f5f3ff',
    tag: '国际 · 对话生成',
    tagColor: '#6d28d9',
    url: 'gamma.app',
    aiFeature: 'AI一句话生成完整PPT',
    desc: '只需说一句话，AI自动生成带图片、布局精美的完整演示文稿',
    free: '免费版每月40积分，可生成约8-10份PPT',
    steps: [
      '打开 gamma.app，用Google账号或邮箱注册',
      '点击"新建"→选"从头开始"或"粘贴文字"',
      '用中文或英文描述你的PPT主题，例如"关于太空探索的8页演示"',
      'AI自动生成→预览效果→点每一页可以继续修改',
      '满意后点"分享"获取链接，或导出为PPT文件',
    ],
  },
  {
    id: 'meitu',
    name: '美图PPT',
    emoji: '🎯',
    color: '#db2777',
    bg: '#fdf2f8',
    tag: '国内 · 无需翻墙',
    tagColor: '#9d174d',
    url: 'designkit.meitu.com/ppt',
    aiFeature: 'AI一键生成PPT + 智能排版',
    desc: '美图出品的PPT工具，国内直接访问，AI自动生成大纲和内容，微信登录超方便',
    free: '基础功能免费，会员解锁更多模板',
    steps: [
      '打开 designkit.meitu.com/ppt，用微信或手机号登录',
      '点击"AI生成PPT"→输入你的主题',
      'AI生成大纲→确认后一键生成所有页面',
      '点击每一页文字或图片可以直接编辑',
      '完成后导出PPT或直接在线分享',
    ],
  },
  {
    id: 'beautiful',
    name: 'Beautiful.ai',
    emoji: '🖼️',
    color: '#0891b2',
    bg: '#ecfeff',
    tag: '国际 · 智能排版',
    tagColor: '#0e7490',
    url: 'beautiful.ai',
    aiFeature: 'SmartSlide智能布局自动调整',
    desc: '侧重于"自动帮你排好看"——你拖入内容，AI帮你美化布局，不会做设计也能出好作品',
    free: '免费版可用基础功能',
    steps: [
      '打开 beautiful.ai，用邮箱注册',
      '选择一个模板风格开始',
      '按提示添加文字和图片内容',
      '布局会自动调整→你只需关注内容',
      '演示时直接全屏播放，或导出分享',
    ],
  },
]

const PPT_TOPICS = [
  { id: 'science', label: '🔬 科学实验', example: '关于火山爆发原理的8页演示PPT' },
  { id: 'nature', label: '🌿 自然探索', example: '关于深海生物的6页演示PPT，配漂亮图片' },
  { id: 'hobby', label: '⚽ 我的爱好', example: '介绍我最喜欢的足球运动的8页PPT' },
  { id: 'future', label: '🚀 未来畅想', example: '关于2050年的城市生活的6页演示PPT' },
  { id: 'book', label: '📚 书籍分享', example: '关于《哈利波特》的故事介绍PPT，适合同学看' },
  { id: 'custom', label: '✏️ 我自己想', example: '' },
]

const PPT_ELEMENTS = [
  { icon: '📌', name: '标题页', desc: '主题 + 你的名字，一眼看懂是什么' },
  { icon: '📋', name: '目录/大纲', desc: '告诉观众PPT讲几个部分' },
  { icon: '📄', name: '内容页', desc: '每个要点配一张图，文字不超过5行' },
  { icon: '💡', name: '重点高亮', desc: '最重要的一句话放大或加色彩' },
  { icon: '🙋', name: '结尾页', desc: '"谢谢观看"或"欢迎提问"' },
]

const QUIZ = [
  {
    q: 'Gamma最厉害的功能是什么？',
    options: ['手动拖拽排版', 'AI一句话生成完整PPT', '背景音乐自动匹配', '自动翻译成英文'],
    correct: 1,
    explain: 'Gamma只需要你描述一句话，AI就能自动生成完整的演示文稿，包括布局、图片和内容！',
  },
  {
    q: '哪个工具国内不用翻墙就能用？',
    options: ['Gamma', 'Beautiful.ai', '美图PPT', '以上都不行'],
    correct: 2,
    explain: '美图PPT是国内产品，直接访问 designkit.meitu.com/ppt，用微信就能登录，非常方便！',
  },
  {
    q: '做PPT时，一页内容最好是？',
    options: ['写满所有内容越详细越好', '只放一个要点，配一张图', '每页写至少10行文字', '不需要图片，纯文字'],
    correct: 1,
    explain: '好的PPT每页只讲一个要点，配一张好图，观众看得懂也记得住。内容太多反而让人看不进去。',
  },
]

const accentColor = '#7c3aed'

export default function Lesson25({ onBack }) {
  const [tab, setTab] = useState(0)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [customTopic, setCustomTopic] = useState('')
  const [selectedTool, setSelectedTool] = useState(null)
  const [toolStep, setToolStep] = useState(null)
  const [checkedElements, setCheckedElements] = useState([])
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)
  const [pptDone, setPptDone] = useState(false)

  const tabs = ['学一学', '我的策划', '去制作', '测一测', '我的作品']

  const topic = selectedTopic
  const topicExample = topic
    ? topic.id === 'custom'
      ? customTopic || '你的主题'
      : topic.example
    : ''

  function toggleElement(name) {
    setCheckedElements(prev =>
      prev.includes(name) ? prev.filter(e => e !== name) : [...prev, name]
    )
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
        <div className="lesson-tag">Module G · 真项目</div>
        <h1 className="lesson-title">第25课：我的第一份AI PPT</h1>
        <p className="lesson-subtitle">用AI一句话生成漂亮的演示文稿，让表达更精彩</p>
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

      {/* ── Tab 0: 学一学 ── */}
      {tab === 0 && (
        <div className="tab-content">
          <div className="info-card" style={{ background: '#f5f3ff', borderLeft: `4px solid ${accentColor}` }}>
            <h3 style={{ color: accentColor, marginTop: 0 }}>✨ AI PPT是什么？</h3>
            <p style={{ margin: 0, lineHeight: 1.8 }}>
              以前做PPT要一页页设计，现在AI工具只需要你<strong>说一句话</strong>，
              比如"帮我做一个关于太空探索的8页PPT"，AI就会自动生成所有内容、配图和排版！
            </p>
          </div>

          <h3 style={{ color: accentColor }}>📌 一份好PPT有哪些部分？</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PPT_ELEMENTS.map(el => (
              <div key={el.name} style={{
                display: 'flex', alignItems: 'flex-start', gap: 14,
                background: '#faf5ff', borderRadius: 12, padding: '14px 18px',
                border: '1px solid #e9d5ff'
              }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{el.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#5b21b6', marginBottom: 3 }}>{el.name}</div>
                  <div style={{ fontSize: 14, color: '#6b7280' }}>{el.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="info-card" style={{ marginTop: 20, background: '#fffbeb', borderLeft: '4px solid #f59e0b' }}>
            <h4 style={{ color: '#92400e', marginTop: 0 }}>💡 AI PPT的使用技巧</h4>
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2, color: '#78350f' }}>
              <li>描述越具体，生成效果越好——告诉AI"几页"、"给谁看"、"什么风格"</li>
              <li>AI生成后还可以继续编辑，不满意就改</li>
              <li>图片可以让AI重新生成，或者自己上传</li>
              <li>完成后导出为PPT文件，方便在学校展示</li>
            </ul>
          </div>

          <div style={{
            marginTop: 20, padding: '16px 20px', background: '#f0fdf4',
            borderRadius: 12, border: '1px solid #bbf7d0'
          }}>
            <div style={{ fontWeight: 700, color: '#15803d', marginBottom: 8 }}>🆚 AI PPT vs 传统PPT</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div style={{ background: '#fff', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>传统做法</div>
                <div style={{ fontSize: 13, color: '#374151' }}>从空白开始→一页页设计→找图片→调布局<br/>⏱ 可能要几小时</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ fontSize: 12, color: '#15803d', marginBottom: 4, fontWeight: 600 }}>AI做法</div>
                <div style={{ fontSize: 13, color: '#374151' }}>输入主题→AI生成→微调内容→完成<br/>⏱ 可能只要5分钟</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 1: 我的策划 ── */}
      {tab === 1 && (
        <div className="tab-content">
          <h3 style={{ color: accentColor }}>📋 第一步：选一个主题</h3>
          <p style={{ color: '#6b7280', fontSize: 14 }}>你想做一份关于什么的PPT？给同学、老师或家长展示？</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            {PPT_TOPICS.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTopic(t)}
                style={{
                  border: `2px solid ${selectedTopic?.id === t.id ? accentColor : '#e5e7eb'}`,
                  background: selectedTopic?.id === t.id ? '#f5f3ff' : '#fff',
                  borderRadius: 10, padding: '12px 14px', cursor: 'pointer',
                  fontWeight: selectedTopic?.id === t.id ? 700 : 400,
                  color: selectedTopic?.id === t.id ? accentColor : '#374151',
                  fontSize: 14, textAlign: 'left', transition: 'all 0.15s'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {selectedTopic?.id === 'custom' && (
            <textarea
              value={customTopic}
              onChange={e => setCustomTopic(e.target.value)}
              placeholder="写下你的PPT主题，例如：关于我最喜欢的动漫角色的介绍PPT"
              style={{
                width: '100%', minHeight: 80, borderRadius: 10, border: '2px solid #d8b4fe',
                padding: '12px 14px', fontSize: 14, resize: 'vertical', boxSizing: 'border-box',
                fontFamily: 'inherit', color: '#374151'
              }}
            />
          )}

          {selectedTopic && (
            <>
              <h3 style={{ color: accentColor, marginTop: 24 }}>✅ 第二步：确认要有哪些部分</h3>
              <p style={{ color: '#6b7280', fontSize: 14 }}>勾选你打算放进PPT的内容（后面做的时候可以对照）</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {PPT_ELEMENTS.map(el => (
                  <label
                    key={el.name}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                      background: checkedElements.includes(el.name) ? '#f5f3ff' : '#fafafa',
                      border: `2px solid ${checkedElements.includes(el.name) ? '#c4b5fd' : '#e5e7eb'}`,
                      borderRadius: 10, padding: '12px 16px', transition: 'all 0.15s'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checkedElements.includes(el.name)}
                      onChange={() => toggleElement(el.name)}
                      style={{ width: 18, height: 18, accentColor }}
                    />
                    <span style={{ fontSize: 20 }}>{el.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, color: '#374151', fontSize: 14 }}>{el.name}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af' }}>{el.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </>
          )}

          {selectedTopic && (
            <div style={{
              marginTop: 24, padding: '16px 20px', background: '#f5f3ff',
              borderRadius: 12, border: `1px solid #c4b5fd`
            }}>
              <div style={{ fontWeight: 700, color: accentColor, marginBottom: 8 }}>📝 我的PPT策划单</div>
              <div style={{ fontSize: 14, lineHeight: 2, color: '#374151' }}>
                <div>🎯 <strong>主题：</strong>{topicExample || '（请在上面选一个主题）'}</div>
                <div>📄 <strong>计划包含：</strong>
                  {checkedElements.length > 0
                    ? checkedElements.join(' · ')
                    : '（还没勾选部分）'}
                </div>
                <div>⏱ <strong>目标时长：</strong>5-10分钟</div>
              </div>
              <button
                onClick={() => setTab(2)}
                style={{
                  marginTop: 14, background: accentColor, color: '#fff',
                  border: 'none', borderRadius: 8, padding: '10px 22px',
                  fontSize: 14, fontWeight: 700, cursor: 'pointer'
                }}
              >
                策划好了，去制作 →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Tab 2: 去制作 ── */}
      {tab === 2 && (
        <div className="tab-content">
          <p style={{ color: '#6b7280', fontSize: 14, marginTop: 0 }}>选一个工具，跟着步骤一步步做，不懂可以叫家长帮忙打开网站</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {PPT_TOOLS.map(tool => (
              <div
                key={tool.id}
                style={{
                  border: `2px solid ${selectedTool === tool.id ? tool.color : '#e5e7eb'}`,
                  borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.15s'
                }}
              >
                <button
                  onClick={() => {
                    setSelectedTool(selectedTool === tool.id ? null : tool.id)
                    setToolStep(null)
                  }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                    background: selectedTool === tool.id ? tool.bg : '#fff',
                    border: 'none', padding: '16px 18px', cursor: 'pointer', textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: 32 }}>{tool.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 16, color: '#111' }}>{tool.name}</span>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                        background: tool.bg, color: tool.tagColor, border: `1px solid ${tool.color}40`
                      }}>{tool.tag}</span>
                    </div>
                    <div style={{ fontSize: 13, color: '#6b7280', marginTop: 3 }}>{tool.desc}</div>
                    <div style={{ fontSize: 12, color: tool.color, marginTop: 4, fontWeight: 600 }}>
                      🤖 {tool.aiFeature}
                    </div>
                  </div>
                  <span style={{ fontSize: 18, color: '#9ca3af' }}>
                    {selectedTool === tool.id ? '▲' : '▼'}
                  </span>
                </button>

                {selectedTool === tool.id && (
                  <div style={{ padding: '0 18px 18px', background: tool.bg }}>
                    <div style={{
                      display: 'flex', gap: 8, padding: '10px 14px',
                      background: '#fff', borderRadius: 8, marginBottom: 14,
                      border: `1px solid ${tool.color}30`
                    }}>
                      <span style={{ fontSize: 13, color: '#6b7280' }}>🌐</span>
                      <span style={{ fontSize: 13, color: tool.color, fontWeight: 600 }}>{tool.url}</span>
                      <span style={{ fontSize: 12, color: '#9ca3af', marginLeft: 'auto' }}>{tool.free}</span>
                    </div>

                    <div style={{ fontWeight: 700, color: '#374151', marginBottom: 10, fontSize: 14 }}>
                      📋 操作步骤（点击步骤打勾）
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {tool.steps.map((step, si) => (
                        <div
                          key={si}
                          onClick={() => setToolStep(toolStep === `${tool.id}-${si}` ? null : `${tool.id}-${si}`)}
                          style={{
                            display: 'flex', alignItems: 'flex-start', gap: 10,
                            background: toolStep === `${tool.id}-${si}` ? '#fff' : 'transparent',
                            border: `1px solid ${toolStep === `${tool.id}-${si}` ? tool.color : 'transparent'}`,
                            borderRadius: 8, padding: '10px 12px', cursor: 'pointer', transition: 'all 0.15s'
                          }}
                        >
                          <span style={{
                            width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                            background: toolStep === `${tool.id}-${si}` ? tool.color : '#e5e7eb',
                            color: toolStep === `${tool.id}-${si}` ? '#fff' : '#6b7280',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 12, fontWeight: 700
                          }}>{toolStep === `${tool.id}-${si}` ? '✓' : si + 1}</span>
                          <span style={{
                            fontSize: 14, lineHeight: 1.6,
                            color: toolStep === `${tool.id}-${si}` ? '#111' : '#374151',
                            fontWeight: toolStep === `${tool.id}-${si}` ? 600 : 400
                          }}>{step}</span>
                        </div>
                      ))}
                    </div>

                    {topicExample && (
                      <div style={{
                        marginTop: 14, padding: '12px 16px',
                        background: '#fff', borderRadius: 8, border: `1px solid ${tool.color}40`
                      }}>
                        <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>💬 你可以这样告诉AI：</div>
                        <div style={{ fontSize: 14, color: '#374151', fontStyle: 'italic' }}>
                          "{topicExample}"
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 3: 测一测 ── */}
      {tab === 3 && (
        <div className="tab-content">
          {!quizDone ? (
            <>
              <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 6 }}>
                第 {quizIdx + 1} 题 / 共 {QUIZ.length} 题
              </div>
              <div style={{
                background: '#f5f3ff', borderRadius: 14, padding: '20px 22px',
                border: `1px solid #e9d5ff`, marginBottom: 16
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
                      marginTop: 14, background: accentColor, color: '#fff',
                      border: 'none', borderRadius: 8, padding: '12px 28px',
                      fontSize: 15, fontWeight: 700, cursor: 'pointer'
                    }}
                  >
                    {quizIdx + 1 < QUIZ.length ? '下一题 →' : '看结果'}
                  </button>
                </>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '30px 20px' }}>
              <div style={{ fontSize: 56 }}>
                {quizScore === QUIZ.length ? '🏆' : quizScore >= 2 ? '🌟' : '📚'}
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: accentColor, margin: '14px 0 8px' }}>
                {quizScore} / {QUIZ.length} 题答对
              </div>
              <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 24 }}>
                {quizScore === QUIZ.length ? '完美！AI PPT的知识你全掌握了！' : '继续加油，去制作自己的PPT吧！'}
              </div>
              <button
                onClick={() => { setQuizIdx(0); setQuizAnswer(null); setQuizScore(0); setQuizDone(false) }}
                style={{
                  background: '#f3f4f6', color: '#374151', border: 'none',
                  borderRadius: 8, padding: '10px 24px', fontSize: 14, cursor: 'pointer'
                }}
              >
                再做一次
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Tab 4: 我的作品 ── */}
      {tab === 4 && (
        <div className="tab-content">
          <h3 style={{ color: accentColor, marginTop: 0 }}>🎓 完成清单</h3>
          <p style={{ color: '#6b7280', fontSize: 14 }}>做完了这些，你的AI PPT就完成了！</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {[
              { key: '主题', label: '确定了PPT主题', icon: '🎯' },
              { key: '内容', label: '用AI生成了PPT内容', icon: '✨' },
              { key: '编辑', label: '检查并修改了内容', icon: '✏️' },
              { key: '分享', label: '导出或获取了分享链接', icon: '📤' },
            ].map(item => (
              <label
                key={item.key}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                  background: checkedElements.includes(item.key) ? '#f5f3ff' : '#fafafa',
                  border: `2px solid ${checkedElements.includes(item.key) ? '#c4b5fd' : '#e5e7eb'}`,
                  borderRadius: 10, padding: '14px 16px', transition: 'all 0.15s'
                }}
              >
                <input
                  type="checkbox"
                  checked={checkedElements.includes(item.key)}
                  onChange={() => toggleElement(item.key)}
                  style={{ width: 18, height: 18, accentColor }}
                />
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <span style={{ fontWeight: 600, fontSize: 14, color: '#374151' }}>{item.label}</span>
              </label>
            ))}
          </div>

          {!pptDone ? (
            <button
              onClick={() => setPptDone(true)}
              style={{
                width: '100%', background: accentColor, color: '#fff',
                border: 'none', borderRadius: 12, padding: '16px',
                fontSize: 16, fontWeight: 700, cursor: 'pointer'
              }}
            >
              🎉 我的AI PPT做好了！
            </button>
          ) : (
            <div style={{
              textAlign: 'center', padding: '30px 24px',
              background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
              borderRadius: 16, border: '2px solid #c4b5fd'
            }}>
              <div style={{ fontSize: 60 }}>🎤</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: accentColor, margin: '14px 0 8px' }}>
                第一份AI PPT完成！
              </div>
              <div style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.8 }}>
                你已经学会用AI工具快速制作演示文稿<br />
                试着在班级或家里展示你的PPT吧！
              </div>
              <div style={{
                marginTop: 20, padding: '14px 20px', background: '#fff',
                borderRadius: 10, border: '1px solid #e9d5ff', textAlign: 'left'
              }}>
                <div style={{ fontWeight: 700, color: accentColor, marginBottom: 8 }}>🚀 挑战升级</div>
                <ul style={{ margin: 0, paddingLeft: 18, color: '#374151', fontSize: 13, lineHeight: 2 }}>
                  <li>再做一份不同主题的PPT，比比看哪个更好看</li>
                  <li>试着把PPT分享给一位朋友或家人</li>
                  <li>下一课：用AI做一个真正的网页！</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
