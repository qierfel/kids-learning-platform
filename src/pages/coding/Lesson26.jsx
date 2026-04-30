import { useState } from 'react'
import './Lesson.css'
import PromptCompareLab from './PromptCompareLab'

const DEVICE_BADGE = (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
    <span style={{ background: '#dcfce7', color: '#15803d', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>💻 主要用电脑</span>
    <span style={{ background: '#fef3c7', color: '#92400e', fontSize: 11, padding: '4px 10px', borderRadius: 999 }}>⚠️ 这些工具在电脑浏览器上体验最好，手机屏幕太小</span>
  </div>
)

const WEB_TOOLS = [
  {
    id: 'v0',
    name: 'V0',
    emoji: '⚡',
    color: '#111827',
    bg: '#f9fafb',
    tag: '国际 · Vercel出品',
    tagColor: '#374151',
    url: 'v0.dev',
    aiFeature: 'AI对话生成完整网页代码',
    desc: '由 Vercel 出品，描述你想要的网页，AI直接生成可运行的代码，还能持续对话修改',
    free: '每月有免费额度',
    steps: [
      '打开 v0.dev，用GitHub账号登录（需要家长帮忙注册GitHub）',
      '在对话框里用中文或英文描述你的网页，例如"做一个有彩虹按钮的欢迎页面"',
      'AI生成代码后，右边预览区可以直接看效果',
      '不满意就继续说："把背景改成深色" "加一个输入框"——AI会更新',
      '点"Deploy"可以把网页发布到真实网址（Vercel托管）',
    ],
  },
  {
    id: 'bolt',
    name: 'Bolt.new',
    emoji: '🔩',
    color: '#0f172a',
    bg: '#f8fafc',
    tag: '国际 · 全栈生成',
    tagColor: '#0f172a',
    url: 'bolt.new',
    aiFeature: 'AI生成完整前后端项目',
    desc: '不只是网页，Bolt能生成有数据库、有逻辑的完整小应用——功能更强但稍微复杂一点',
    free: '每天有免费额度',
    steps: [
      '打开 bolt.new，用邮箱注册或Google登录',
      '在输入框描述你要做什么，例如"帮我做一个记事本应用"',
      'AI生成项目文件，左边看代码，右边看效果',
      '点击修改功能，说"加一个删除按钮"——Bolt会修改对应代码',
      '完成后点"Deploy"发布，或下载代码保存',
    ],
  },
  {
    id: 'cursor',
    name: 'Cursor',
    emoji: '🖱️',
    color: '#7c3aed',
    bg: '#f5f3ff',
    tag: '国际 · 安装软件',
    tagColor: '#6d28d9',
    url: 'cursor.com',
    aiFeature: 'AI结对编程，边写边提示',
    desc: '需要安装到电脑，适合想真正学写代码的同学——AI会帮你理解错误、给出建议、完成代码',
    free: '有免费版',
    steps: [
      '打开 cursor.com 下载并安装 Cursor 编辑器',
      '新建一个文件夹，用 Cursor 打开它',
      '按 Cmd+K（Mac）或 Ctrl+K（Windows）唤出AI对话',
      '说"帮我创建一个简单的HTML欢迎页"，AI会生成文件',
      '用浏览器打开HTML文件就能看到效果',
    ],
  },
]

const WEB_TYPES = [
  { id: 'welcome', label: '🏠 欢迎页面', example: '做一个个人欢迎页，有我的名字、一张图和一句自我介绍' },
  { id: 'quiz', label: '❓ 知识问答', example: '做一个关于动物知识的3题问答小游戏，有答对答错提示' },
  { id: 'gallery', label: '🖼️ 图片展示', example: '做一个展示我最喜欢的4张图片的画廊页面' },
  { id: 'tool', label: '🔧 小工具', example: '做一个输入名字就会显示"你好，xxx！欢迎光临！"的小工具' },
  { id: 'story', label: '📖 互动故事', example: '做一个有两个选择分支的互动故事页面，不同选择有不同结局' },
  { id: 'custom', label: '✏️ 我自己设计', example: '' },
]

const WEB_CONCEPTS = [
  { icon: '📄', name: 'HTML', desc: '网页的骨架——决定有什么内容' },
  { icon: '🎨', name: 'CSS', desc: '网页的外观——决定长什么样子' },
  { icon: '⚙️', name: 'JavaScript', desc: '网页的行为——决定能做什么事' },
  { icon: '🌐', name: '发布/部署', desc: '把网页放到网上，让别人能看到' },
]

const QUIZ = [
  {
    q: 'V0 和 Bolt 的主要区别是什么？',
    options: [
      'V0更便宜，Bolt更贵',
      'V0主要生成网页，Bolt能生成更完整的前后端应用',
      'V0需要安装软件，Bolt不需要',
      '没有区别，功能完全一样',
    ],
    correct: 1,
    explain: 'V0专注于生成漂亮的网页界面，Bolt能生成包括数据库和逻辑的完整应用，功能更强大也更复杂。',
  },
  {
    q: '用AI工具做好网页后，想让别人通过网址访问，需要做什么？',
    options: ['把文件发给对方', '打印出来寄给对方', '点"Deploy/发布"部署到网上', '直接截图发给对方'],
    correct: 2,
    explain: '网页需要"部署"到服务器上，才能生成真实的网址供别人访问。V0和Bolt都支持一键部署！',
  },
  {
    q: 'HTML、CSS、JavaScript分别负责什么？',
    options: [
      'HTML=样式，CSS=内容，JS=结构',
      'HTML=内容结构，CSS=外观样式，JS=交互行为',
      'HTML=动画，CSS=数据库，JS=图片',
      '三个都是负责样式的',
    ],
    correct: 1,
    explain: 'HTML是骨架（内容），CSS是皮肤（样式），JavaScript是肌肉（行为/交互）。三者配合组成一个网页！',
  },
]

const accentColor = '#111827'

export default function Lesson26({ onBack }) {
  const [tab, setTab] = useState(0)
  const [selectedType, setSelectedType] = useState(null)
  const [customType, setCustomType] = useState('')
  const [selectedTool, setSelectedTool] = useState(null)
  const [toolStep, setToolStep] = useState(null)
  const [checkedItems, setCheckedItems] = useState([])
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)
  const [webDone, setWebDone] = useState(false)

  const tabs = ['学一学', '我的策划', '去制作', '测一测', '我的作品']

  const webType = selectedType
  const typeExample = webType
    ? webType.id === 'custom'
      ? customType || '你的网页创意'
      : webType.example
    : ''

  function toggleItem(key) {
    setCheckedItems(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
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
        <h1 className="lesson-title">第26课：我的第一个AI网页</h1>
        <p className="lesson-subtitle">用AI对话生成真实可运行的网页，发布到网上给大家看</p>
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
          <div className="info-card" style={{ background: '#f9fafb', borderLeft: `4px solid ${accentColor}` }}>
            <h3 style={{ color: '#111', marginTop: 0 }}>🌐 什么是网页？</h3>
            <p style={{ margin: 0, lineHeight: 1.8 }}>
              你每天用的微信、B站、百度地图——背后都是一个个网页。
              网页由 <strong>HTML</strong>（内容）、<strong>CSS</strong>（样式）和 <strong>JavaScript</strong>（交互）组成。
              现在有了AI，你不需要记代码，只需要<strong>说清楚你想要什么</strong>，AI帮你写！
            </p>
          </div>

          <h3 style={{ color: '#111' }}>🧱 网页的三个基础构成</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {WEB_CONCEPTS.map(c => (
              <div key={c.name} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: '#f9fafb', borderRadius: 12, padding: '14px 18px',
                border: '1px solid #e5e7eb'
              }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#111', marginBottom: 2, fontSize: 15 }}>{c.name}</div>
                  <div style={{ fontSize: 13, color: '#6b7280' }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 20, padding: '16px 20px', background: '#fafafa',
            borderRadius: 12, border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontWeight: 700, color: '#111', marginBottom: 10 }}>💡 怎么和AI说才能得到好网页？</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { bad: '做个网页', good: '做一个个人欢迎页，有我的名字和一张彩色背景图，页面中间有一个"你好！"的大标题' },
                { bad: '帮我加按钮', good: '在页面底部加一个紫色的按钮，点击后弹出"感谢你的访问！"' },
              ].map((eg, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div style={{ background: '#fef2f2', borderRadius: 8, padding: '10px 14px' }}>
                    <div style={{ fontSize: 11, color: '#b91c1c', marginBottom: 4, fontWeight: 600 }}>❌ 模糊描述</div>
                    <div style={{ fontSize: 13, color: '#374151' }}>"{eg.bad}"</div>
                  </div>
                  <div style={{ background: '#f0fdf4', borderRadius: 8, padding: '10px 14px' }}>
                    <div style={{ fontSize: 11, color: '#15803d', marginBottom: 4, fontWeight: 600 }}>✅ 清晰描述</div>
                    <div style={{ fontSize: 13, color: '#374151' }}>"{eg.good}"</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="info-card" style={{ marginTop: 16, background: '#fffbeb', borderLeft: '4px solid #f59e0b' }}>
            <h4 style={{ color: '#92400e', marginTop: 0 }}>🌟 你做出的是真正的网页！</h4>
            <p style={{ margin: 0, lineHeight: 1.8, color: '#78350f' }}>
              用 V0 或 Bolt 生成的网页，可以<strong>发布到真实网址</strong>，用手机扫码就能访问！
              你可以把链接发给家人朋友，让他们打开看看你做的作品。
            </p>
          </div>
        </div>
      )}

      {/* ── Tab 1: 我的策划 ── */}
      {tab === 1 && (
        <div className="tab-content">
          <h3 style={{ color: '#111' }}>🎯 选一种网页类型</h3>
          <p style={{ color: '#6b7280', fontSize: 14 }}>你想做什么样的网页？</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            {WEB_TYPES.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t)}
                style={{
                  border: `2px solid ${selectedType?.id === t.id ? accentColor : '#e5e7eb'}`,
                  background: selectedType?.id === t.id ? '#f3f4f6' : '#fff',
                  borderRadius: 10, padding: '12px 14px', cursor: 'pointer',
                  fontWeight: selectedType?.id === t.id ? 700 : 400,
                  color: selectedType?.id === t.id ? '#111' : '#374151',
                  fontSize: 14, textAlign: 'left', transition: 'all 0.15s'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {selectedType?.id === 'custom' && (
            <textarea
              value={customType}
              onChange={e => setCustomType(e.target.value)}
              placeholder="描述你想做的网页，例如：一个展示我的宠物照片的网站"
              style={{
                width: '100%', minHeight: 80, borderRadius: 10, border: '2px solid #d1d5db',
                padding: '12px 14px', fontSize: 14, resize: 'vertical', boxSizing: 'border-box',
                fontFamily: 'inherit', color: '#374151'
              }}
            />
          )}

          {selectedType && (
            <div style={{
              marginTop: 20, padding: '16px 20px', background: '#f9fafb',
              borderRadius: 12, border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontWeight: 700, color: '#111', marginBottom: 10 }}>📝 你可以这样告诉AI：</div>
              <div style={{
                background: '#fff', borderRadius: 8, padding: '14px 16px',
                border: '1px solid #e5e7eb', fontSize: 14, color: '#374151',
                lineHeight: 1.7, fontStyle: 'italic'
              }}>
                "{typeExample || '输入你的想法'}"
              </div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 8 }}>
                💡 直接复制这句话粘贴到 V0 或 Bolt 的对话框里！
              </div>
              <button
                onClick={() => setTab(2)}
                style={{
                  marginTop: 14, background: accentColor, color: '#fff',
                  border: 'none', borderRadius: 8, padding: '10px 22px',
                  fontSize: 14, fontWeight: 700, cursor: 'pointer'
                }}
              >
                想好了，去制作 →
              </button>
            </div>
          )}

          {selectedType && (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ color: '#111', marginBottom: 4 }}>🤖 先让 AI 写一版网页内容（试试三种提示词）</h3>
              <p style={{ color: '#6b7280', fontSize: 14, marginTop: 0 }}>
                同样一个网页想法，告诉 AI 时含糊一点 vs 说清楚一点，差别非常大。让 AI 真的写一段网页内容（标题 + 段落 + 按钮文字）给你看！
              </p>
              <PromptCompareLab
                subject="ai-web-copy"
                accent={accentColor}
                intro="点按钮，让 AI 用每条提示词写一份网页内容稿。"
                hint="说清楚【是什么页面 + 给谁看 + 要包含什么 + 整体风格】，AI 写出来的稿才能直接进 V0 ✨"
                prompts={[
                  {
                    id: 'l26-bad',
                    label: '太简单',
                    text: `帮我做一个网页：${typeExample || '我的想法'}。`,
                  },
                  {
                    id: 'l26-mid',
                    label: '加了点细节',
                    text: `帮我设计一个网页内容：${typeExample || '我的想法'}。给我标题、一段介绍文字、和一些按钮文字。`,
                  },
                  {
                    id: 'l26-good',
                    label: '内容+受众+模块+风格',
                    text: `请帮我写一份网页文案，准备粘贴到 V0：网页类型是"${typeExample || '我的网页'}"，受众是我的同学（10-12岁）。请输出：
1. 网页主标题（吸引人，10字以内）
2. 副标题（一句话点明用途）
3. 三个内容板块的标题 + 每个板块 30-50字 的介绍
4. 一个主按钮的文字 + 一个次要按钮的文字
5. 整体视觉风格建议（颜色 / 字体感觉 / 整体氛围）

请直接给我成品，不要解释。`,
                  },
                ]}
                allowCustom={true}
                customLabel="✏️ 你也想个提示词"
                customPlaceholder={`比如把受众改成"我的爸妈"或"幼儿园弟弟妹妹"，看看 AI 写的内容会变成什么样`}
              />
            </div>
          )}
        </div>
      )}

      {/* ── Tab 2: 去制作 ── */}
      {tab === 2 && (
        <div className="tab-content">
          <p style={{ color: '#6b7280', fontSize: 14, marginTop: 0 }}>选一个工具，推荐先试 V0——最容易上手</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {WEB_TOOLS.map(tool => (
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
                        background: '#f3f4f6', color: tool.tagColor, border: '1px solid #e5e7eb'
                      }}>{tool.tag}</span>
                    </div>
                    <div style={{ fontSize: 13, color: '#6b7280', marginTop: 3 }}>{tool.desc}</div>
                    <div style={{ fontSize: 12, color: tool.color === '#111827' ? '#374151' : tool.color, marginTop: 4, fontWeight: 600 }}>
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
                      border: '1px solid #e5e7eb'
                    }}>
                      <span style={{ fontSize: 13, color: '#6b7280' }}>🌐</span>
                      <span style={{ fontSize: 13, color: '#374151', fontWeight: 600 }}>{tool.url}</span>
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
                            border: `1px solid ${toolStep === `${tool.id}-${si}` ? '#374151' : 'transparent'}`,
                            borderRadius: 8, padding: '10px 12px', cursor: 'pointer', transition: 'all 0.15s'
                          }}
                        >
                          <span style={{
                            width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                            background: toolStep === `${tool.id}-${si}` ? '#111' : '#e5e7eb',
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

                    {typeExample && (
                      <div style={{
                        marginTop: 14, padding: '12px 16px',
                        background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb'
                      }}>
                        <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>💬 把这句话复制进对话框：</div>
                        <div style={{ fontSize: 14, color: '#374151', fontStyle: 'italic' }}>
                          "{typeExample}"
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
                background: '#f9fafb', borderRadius: 14, padding: '20px 22px',
                border: '1px solid #e5e7eb', marginBottom: 16
              }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#111', lineHeight: 1.6 }}>
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
                      marginTop: 14, background: '#111', color: '#fff',
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
              <div style={{ fontSize: 22, fontWeight: 700, color: '#111', margin: '14px 0 8px' }}>
                {quizScore} / {QUIZ.length} 题答对
              </div>
              <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 24 }}>
                {quizScore === QUIZ.length ? '完美！你已经了解AI网页工具的核心知识！' : '继续去做一个真正的网页吧！'}
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
          <h3 style={{ color: '#111', marginTop: 0 }}>🌐 完成清单</h3>
          <p style={{ color: '#6b7280', fontSize: 14 }}>完成这些步骤，你就有了第一个真正的网页作品！</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {[
              { key: '决定', label: '决定了网页主题和类型', icon: '🎯' },
              { key: '生成', label: '用AI工具生成了网页', icon: '⚡' },
              { key: '修改', label: '对话调整了至少一个地方', icon: '✏️' },
              { key: '发布', label: '发布/导出了网页', icon: '🚀' },
            ].map(item => (
              <label
                key={item.key}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                  background: checkedItems.includes(item.key) ? '#f9fafb' : '#fafafa',
                  border: `2px solid ${checkedItems.includes(item.key) ? '#374151' : '#e5e7eb'}`,
                  borderRadius: 10, padding: '14px 16px', transition: 'all 0.15s'
                }}
              >
                <input
                  type="checkbox"
                  checked={checkedItems.includes(item.key)}
                  onChange={() => toggleItem(item.key)}
                  style={{ width: 18, height: 18 }}
                />
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <span style={{ fontWeight: 600, fontSize: 14, color: '#374151' }}>{item.label}</span>
              </label>
            ))}
          </div>

          {!webDone ? (
            <button
              onClick={() => setWebDone(true)}
              style={{
                width: '100%', background: '#111', color: '#fff',
                border: 'none', borderRadius: 12, padding: '16px',
                fontSize: 16, fontWeight: 700, cursor: 'pointer'
              }}
            >
              🎉 我的网页做好了！
            </button>
          ) : (
            <div style={{
              textAlign: 'center', padding: '30px 24px',
              background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
              borderRadius: 16, border: '2px solid #374151'
            }}>
              <div style={{ fontSize: 60 }}>🌐</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#111', margin: '14px 0 8px' }}>
                第一个AI网页完成！
              </div>
              <div style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.8 }}>
                你已经用AI做出了一个真正可以运行的网页<br />
                把链接发给家人朋友，让他们打开看看！
              </div>
              <div style={{
                marginTop: 20, padding: '14px 20px', background: '#fff',
                borderRadius: 10, border: '1px solid #e5e7eb', textAlign: 'left'
              }}>
                <div style={{ fontWeight: 700, color: '#111', marginBottom: 8 }}>🚀 挑战升级</div>
                <ul style={{ margin: 0, paddingLeft: 18, color: '#374151', fontSize: 13, lineHeight: 2 }}>
                  <li>再对话给网页加一个新功能，看看会变成什么样</li>
                  <li>试着做两种不同类型的网页，比比看哪个更酷</li>
                  <li>下一课：用AI帮你开发微信小程序！</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
