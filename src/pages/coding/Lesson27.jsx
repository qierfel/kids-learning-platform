import { useState } from 'react'
import './Lesson.css'

const DEVICE_BADGE = (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
    <span style={{ background: '#dcfce7', color: '#15803d', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>💻 主要用电脑</span>
    <span style={{ background: '#fef3c7', color: '#92400e', fontSize: 11, padding: '4px 10px', borderRadius: 999 }}>⚠️ 微信开发者工具需要安装到电脑，手机用来扫码预览</span>
  </div>
)

const MINI_CONCEPTS = [
  { icon: '📱', name: '小程序是什么', desc: '在微信里运行的小应用，不用下载安装，扫码或搜索就能用' },
  { icon: '🏗️', name: 'WXML', desc: '小程序的"HTML"——决定页面有什么内容和结构' },
  { icon: '🎨', name: 'WXSS', desc: '小程序的"CSS"——决定页面的颜色、大小、布局' },
  { icon: '⚙️', name: 'JavaScript', desc: '小程序的逻辑——决定按钮点了会发生什么' },
]

const MINI_STEPS = [
  {
    step: 1,
    title: '注册小程序账号',
    icon: '📝',
    desc: '需要家长帮忙完成这一步',
    details: [
      '打开 mp.weixin.qq.com，点击"立即注册"',
      '选择"小程序"类型，用邮箱注册',
      '完成邮箱验证后，进入管理后台',
      '在"开发→开发管理"里找到 AppID（小程序专属ID）',
    ],
  },
  {
    step: 2,
    title: '下载开发者工具',
    icon: '🔧',
    desc: '在电脑上安装微信官方工具',
    details: [
      '打开 developers.weixin.qq.com/miniprogram/dev/devtools/download.html',
      '选择适合你电脑的版本（Windows / Mac）下载并安装',
      '用微信扫码登录开发者工具',
    ],
  },
  {
    step: 3,
    title: '创建第一个小程序项目',
    icon: '✨',
    desc: '新建项目，选择模板',
    details: [
      '打开开发者工具，点击"+"新建项目',
      '填写项目名称，粘贴你的 AppID',
      '选择"JS-基础模板"开始',
      '点击"新建"，等待初始化完成',
    ],
  },
  {
    step: 4,
    title: '用AI帮你改代码',
    icon: '🤖',
    desc: '借助Cursor或复制代码让AI修改',
    details: [
      '用 Cursor 打开小程序项目文件夹',
      '告诉AI："帮我把首页改成：大标题写我的昵称，下面有一个绿色的按钮，点击后弹出欢迎语"',
      'AI生成修改后，复制代码回到对应的文件',
      '在开发者工具里点"编译"查看效果',
    ],
  },
  {
    step: 5,
    title: '在手机上预览',
    icon: '📱',
    desc: '用真实手机看效果！',
    details: [
      '在开发者工具顶部点击"预览"',
      '用自己的微信扫描生成的二维码',
      '小程序在你的手机上打开了！',
      '把二维码截图发给家人，让他们也扫一扫',
    ],
  },
]

const MINI_IDEAS = [
  { id: 'hello', emoji: '👋', name: '我的名片小程序', desc: '展示名字、爱好、一句个人介绍' },
  { id: 'quiz', emoji: '❓', name: '知识问答小程序', desc: '3道关于你喜欢话题的问答题' },
  { id: 'wish', emoji: '🌟', name: '许愿瓶小程序', desc: '输入愿望，点击保存，下次打开还在' },
  { id: 'calc', emoji: '🔢', name: '我的计算器', desc: '简单的加减法计算器，有漂亮界面' },
  { id: 'fortune', emoji: '🎱', name: '今日运势', desc: '点击按钮随机生成一句鼓励的话' },
]

const QUIZ = [
  {
    q: '微信小程序和普通App最大的区别是什么？',
    options: [
      '小程序只能在电脑上用',
      '小程序不需要下载安装，在微信里直接运行',
      '小程序只能做游戏',
      '小程序比App功能更多',
    ],
    correct: 1,
    explain: '小程序最大的优势是"即用即走"——用户不需要下载，在微信搜索或扫码就能直接打开使用！',
  },
  {
    q: 'WXML 相当于网页中的哪个技术？',
    options: ['CSS', 'JavaScript', 'HTML', 'Python'],
    correct: 2,
    explain: 'WXML（WeiXin Markup Language）就是小程序版的HTML，负责定义页面的内容结构，比如标题、按钮、图片在哪里。',
  },
  {
    q: '做好小程序想让手机真实运行，需要用什么工具？',
    options: ['直接在记事本里写代码', '微信开发者工具里点"预览"，用微信扫码', '发布到App Store', '通过蓝牙传输'],
    correct: 1,
    explain: '微信开发者工具有"预览"功能，会生成二维码，用微信扫一扫就能在真实手机上看到你的小程序效果！',
  },
]

const accentColor = '#07c160'

export default function Lesson27({ onBack }) {
  const [tab, setTab] = useState(0)
  const [expandedStep, setExpandedStep] = useState(null)
  const [doneSteps, setDoneSteps] = useState([])
  const [selectedIdea, setSelectedIdea] = useState(null)
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)
  const [miniDone, setMiniDone] = useState(false)

  const tabs = ['学一学', '了解流程', '选题目', '测一测', '我的作品']

  function toggleStep(step) {
    setExpandedStep(expandedStep === step ? null : step)
  }

  function markDone(step) {
    setDoneSteps(prev =>
      prev.includes(step) ? prev.filter(s => s !== step) : [...prev, step]
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
        <h1 className="lesson-title">第27课：我的第一个AI小程序</h1>
        <p className="lesson-subtitle">用微信开发者工具 + AI，做一个真正在手机微信里运行的小程序</p>
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
          <div className="info-card" style={{ background: '#f0fdf4', borderLeft: `4px solid ${accentColor}` }}>
            <h3 style={{ color: '#15803d', marginTop: 0 }}>📱 小程序：微信里的小应用</h3>
            <p style={{ margin: 0, lineHeight: 1.8 }}>
              你用过"健康码"、"共享单车"、"点餐小程序"吗？这些都是在<strong>微信里直接运行的小程序</strong>。
              今天你要用微信官方工具 + AI，做一个属于自己的小程序，并且能在手机上真实运行！
            </p>
          </div>

          <h3 style={{ color: accentColor }}>🧱 小程序的四个组成部分</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MINI_CONCEPTS.map(c => (
              <div key={c.name} style={{
                display: 'flex', alignItems: 'flex-start', gap: 14,
                background: '#f9fafb', borderRadius: 12, padding: '14px 18px',
                border: '1px solid #e5e7eb'
              }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#111', marginBottom: 2 }}>{c.name}</div>
                  <div style={{ fontSize: 13, color: '#6b7280' }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 20, padding: '16px 20px', background: '#fef3c7',
            borderRadius: 12, border: '1px solid #fde68a'
          }}>
            <div style={{ fontWeight: 700, color: '#92400e', marginBottom: 8 }}>👨‍👩‍👦 这节课需要家长陪同！</div>
            <p style={{ margin: 0, lineHeight: 1.7, color: '#78350f', fontSize: 14 }}>
              注册小程序账号需要成人邮箱和认证信息。
              开发者工具的安装也需要管理员权限。
              建议和爸爸妈妈一起完成——让他们看看你能做出什么厉害的东西！
            </p>
          </div>

          <div style={{
            marginTop: 16, padding: '16px 20px', background: '#f0fdf4',
            borderRadius: 12, border: '1px solid #bbf7d0'
          }}>
            <div style={{ fontWeight: 700, color: '#15803d', marginBottom: 8 }}>🤖 AI在哪里帮你？</div>
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2, color: '#166534', fontSize: 14 }}>
              <li>用 Cursor 打开项目文件，让AI帮你写或改代码</li>
              <li>不懂某段代码什么意思？让AI解释给你听</li>
              <li>想加一个新功能？直接告诉AI，它来实现</li>
              <li>遇到报错？把报错信息贴给AI，它帮你找问题</li>
            </ul>
          </div>
        </div>
      )}

      {/* ── Tab 1: 了解流程 ── */}
      {tab === 1 && (
        <div className="tab-content">
          <p style={{ color: '#6b7280', fontSize: 14, marginTop: 0 }}>
            做小程序分5个大步骤——点开每个步骤看详细说明，完成后打勾记录进度
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MINI_STEPS.map(s => (
              <div key={s.step} style={{
                border: `2px solid ${doneSteps.includes(s.step) ? accentColor : expandedStep === s.step ? '#d1d5db' : '#e5e7eb'}`,
                borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.15s',
                background: doneSteps.includes(s.step) ? '#f0fdf4' : '#fff'
              }}>
                <button
                  onClick={() => toggleStep(s.step)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                    border: 'none', padding: '16px 18px', cursor: 'pointer',
                    background: 'transparent', textAlign: 'left'
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                    background: doneSteps.includes(s.step) ? accentColor : '#e5e7eb',
                    color: doneSteps.includes(s.step) ? '#fff' : '#6b7280',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 14
                  }}>
                    {doneSteps.includes(s.step) ? '✓' : s.step}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 18 }}>{s.icon}</span>
                      <span style={{ fontWeight: 700, fontSize: 15, color: '#111' }}>{s.title}</span>
                    </div>
                    <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>{s.desc}</div>
                  </div>
                  <span style={{ fontSize: 16, color: '#9ca3af' }}>
                    {expandedStep === s.step ? '▲' : '▼'}
                  </span>
                </button>

                {expandedStep === s.step && (
                  <div style={{ padding: '0 18px 18px', borderTop: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                      {s.details.map((detail, di) => (
                        <div key={di} style={{
                          display: 'flex', gap: 10, alignItems: 'flex-start',
                          background: '#f9fafb', borderRadius: 8, padding: '10px 14px'
                        }}>
                          <span style={{
                            width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                            background: accentColor + '20', color: accentColor,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 11, fontWeight: 700
                          }}>{di + 1}</span>
                          <span style={{ fontSize: 13, lineHeight: 1.6, color: '#374151' }}>{detail}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => markDone(s.step)}
                      style={{
                        marginTop: 14,
                        background: doneSteps.includes(s.step) ? '#e5e7eb' : accentColor,
                        color: doneSteps.includes(s.step) ? '#374151' : '#fff',
                        border: 'none', borderRadius: 8, padding: '10px 20px',
                        fontSize: 14, fontWeight: 600, cursor: 'pointer'
                      }}
                    >
                      {doneSteps.includes(s.step) ? '✓ 已完成' : '标记完成'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {doneSteps.length === MINI_STEPS.length && (
            <div style={{
              marginTop: 16, padding: '16px 20px', background: '#f0fdf4',
              borderRadius: 12, border: `2px solid ${accentColor}`, textAlign: 'center'
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
              <div style={{ fontWeight: 700, color: '#15803d', fontSize: 16 }}>
                5个步骤全部完成！你的小程序已经在手机上运行了！
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Tab 2: 选题目 ── */}
      {tab === 2 && (
        <div className="tab-content">
          <h3 style={{ color: accentColor }}>💡 你想做哪种小程序？</h3>
          <p style={{ color: '#6b7280', fontSize: 14 }}>选一个想法，然后把它告诉AI，让AI帮你实现！</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {MINI_IDEAS.map(idea => (
              <button
                key={idea.id}
                onClick={() => setSelectedIdea(idea)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left',
                  border: `2px solid ${selectedIdea?.id === idea.id ? accentColor : '#e5e7eb'}`,
                  background: selectedIdea?.id === idea.id ? '#f0fdf4' : '#fff',
                  borderRadius: 12, padding: '16px 18px', cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                <span style={{ fontSize: 32 }}>{idea.emoji}</span>
                <div>
                  <div style={{
                    fontWeight: 700, fontSize: 15,
                    color: selectedIdea?.id === idea.id ? '#15803d' : '#111'
                  }}>{idea.name}</div>
                  <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>{idea.desc}</div>
                </div>
                {selectedIdea?.id === idea.id && (
                  <span style={{ marginLeft: 'auto', fontSize: 20, color: accentColor }}>✓</span>
                )}
              </button>
            ))}
          </div>

          {selectedIdea && (
            <div style={{
              marginTop: 20, padding: '16px 20px', background: '#f0fdf4',
              borderRadius: 12, border: `1px solid #bbf7d0`
            }}>
              <div style={{ fontWeight: 700, color: '#15803d', marginBottom: 10 }}>
                🤖 让AI帮你实现 "{selectedIdea.name}"
              </div>
              <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, marginBottom: 10 }}>
                用 Cursor 打开你的小程序项目，按 Cmd+K 呼出AI，然后这样说：
              </div>
              <div style={{
                background: '#fff', borderRadius: 8, padding: '14px 16px',
                border: '1px solid #bbf7d0', fontSize: 14, color: '#374151',
                lineHeight: 1.7, fontStyle: 'italic'
              }}>
                {idea.id === 'hello' && '"帮我把小程序首页改成一张名片样式：大标题是我的名字，下面是我的爱好列表，底部有一个绿色按钮点击后显示欢迎语"'}
                {idea.id === 'quiz' && '"帮我做一个3题知识问答小程序，有答题界面，答完后显示得分，有一个"再玩一次"按钮"'}
                {idea.id === 'wish' && '"帮我做一个许愿瓶小程序，有一个输入框和保存按钮，保存后能在列表里看到所有愿望"'}
                {idea.id === 'calc' && '"帮我做一个计算器小程序，有数字按钮和加减乘除，界面要好看，用微信绿色主题"'}
                {idea.id === 'fortune' && '"帮我做一个今日运势小程序，点击按钮随机显示一句鼓励的话，每次都不一样，界面要有星星装饰"'}
              </div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 8 }}>
                💡 可以直接复制这段话，让AI帮你写代码
              </div>
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
                第 {quizIdx + 1} 题 / 共 {QUIZ.length} 题
              </div>
              <div style={{
                background: '#f0fdf4', borderRadius: 14, padding: '20px 22px',
                border: '1px solid #bbf7d0', marginBottom: 16
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
                {quizScore === QUIZ.length ? '完美！小程序的知识你全掌握了！' : '继续加油，去做你的小程序吧！'}
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
          <h3 style={{ color: accentColor, marginTop: 0 }}>📱 完成清单</h3>
          <p style={{ color: '#6b7280', fontSize: 14 }}>完成这些，你就有了一个真正在手机上运行的小程序！</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {[
              { key: '账号', label: '注册了小程序账号（和家长一起）', icon: '📝' },
              { key: '工具', label: '安装并打开了微信开发者工具', icon: '🔧' },
              { key: '项目', label: '创建了第一个小程序项目', icon: '✨' },
              { key: '修改', label: '用AI修改了至少一处代码', icon: '🤖' },
              { key: '预览', label: '在手机微信里扫码预览成功', icon: '📱' },
            ].map(item => (
              <label
                key={item.key}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                  background: doneSteps.includes(item.key) ? '#f0fdf4' : '#fafafa',
                  border: `2px solid ${doneSteps.includes(item.key) ? '#4ade80' : '#e5e7eb'}`,
                  borderRadius: 10, padding: '14px 16px', transition: 'all 0.15s'
                }}
              >
                <input
                  type="checkbox"
                  checked={doneSteps.includes(item.key)}
                  onChange={() => markDone(item.key)}
                  style={{ width: 18, height: 18, accentColor }}
                />
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <span style={{ fontWeight: 600, fontSize: 14, color: '#374151' }}>{item.label}</span>
              </label>
            ))}
          </div>

          {!miniDone ? (
            <button
              onClick={() => setMiniDone(true)}
              style={{
                width: '100%', background: accentColor, color: '#fff',
                border: 'none', borderRadius: 12, padding: '16px',
                fontSize: 16, fontWeight: 700, cursor: 'pointer'
              }}
            >
              🎉 我的小程序做好了！
            </button>
          ) : (
            <div style={{
              textAlign: 'center', padding: '30px 24px',
              background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
              borderRadius: 16, border: `2px solid ${accentColor}`
            }}>
              <div style={{ fontSize: 60 }}>📱</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#15803d', margin: '14px 0 8px' }}>
                第一个AI小程序完成！
              </div>
              <div style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.8 }}>
                你已经做出了一个真正在微信里运行的小程序<br />
                把二维码分享给家人和同学，让他们扫码体验！
              </div>
              <div style={{
                marginTop: 20, padding: '14px 20px', background: '#fff',
                borderRadius: 10, border: '1px solid #bbf7d0', textAlign: 'left'
              }}>
                <div style={{ fontWeight: 700, color: '#15803d', marginBottom: 8 }}>🚀 挑战升级</div>
                <ul style={{ margin: 0, paddingLeft: 18, color: '#374151', fontSize: 13, lineHeight: 2 }}>
                  <li>让AI帮你再加一个新功能，比如页面切换或动画效果</li>
                  <li>把小程序分享给至少3个人，收集他们的反馈</li>
                  <li>下一课：用AI做一段短视频或一首AI歌！</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
