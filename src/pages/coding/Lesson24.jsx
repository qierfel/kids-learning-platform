import { useState } from 'react'
import './Lesson.css'

const DEVICE_BADGE = (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
    <span style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>📱 手机</span>
    <span style={{ background: '#e0e7ff', color: '#4338ca', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>🖥️ iPad</span>
    <span style={{ background: '#dcfce7', color: '#15803d', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>💻 电脑</span>
    <span style={{ background: '#fffbeb', color: '#92400e', fontSize: 11, padding: '4px 10px', borderRadius: 999 }}>🖼️ 海报工具支持所有设备，电脑操作更顺手</span>
  </div>
)

const POSTER_TOOLS = [
  {
    id: 'canva',
    name: 'Canva',
    emoji: '🎨',
    color: '#6366f1',
    bg: '#eef2ff',
    tag: '国际 · 免费功能强',
    tagColor: '#4338ca',
    url: 'canva.com',
    aiFeature: 'Magic Studio（AI生图+AI文案）',
    desc: '全球最大设计平台，有AI生图、AI文案、海量模板，手机/电脑都很好用',
    free: '免费版功能已经很够用',
    steps: [
      '打开 canva.com，用邮箱或Google注册',
      '点击"创建设计"→选"海报"',
      '从模板库选一个喜欢的样式',
      '点击AI功能（Magic Studio）生成或修改图片',
      '修改文字、颜色，调整排版',
      '点击"分享/下载"导出图片',
    ],
  },
  {
    id: 'meitusheji',
    name: '美图设计室',
    emoji: '✨',
    color: '#ec4899',
    bg: '#fdf2f8',
    tag: '国内 · 免费额度多',
    tagColor: '#9d174d',
    url: 'design.meitu.com',
    aiFeature: 'AI生图+AI抠图+AI文案',
    desc: '美图出品的国内设计平台，中文模板丰富，AI能力强，微信/手机号登录',
    free: '每天免费次数足够做一张海报',
    steps: [
      '打开 design.meitu.com',
      '用手机号或微信扫码登录',
      '点击"新建设计"→选"海报"尺寸',
      '从海量模板里找一个你喜欢的',
      '用AI功能生成你想要的图片素材',
      '替换文字内容，调整配色',
      '下载保存到手机/电脑',
    ],
  },
  {
    id: 'gaoding',
    name: '稿定设计',
    emoji: '📐',
    color: '#f97316',
    bg: '#fff7ed',
    tag: '国内 · 模板超多',
    tagColor: '#c2410c',
    url: 'gaoding.com',
    aiFeature: 'AI一键成图+智能排版',
    desc: '专业设计工具，商业级模板海量，支持海报/传单/名片，AI功能实用',
    free: '有免费试用，部分高级模板付费',
    steps: [
      '打开 gaoding.com',
      '注册账号（微信/手机号）',
      '搜索"海报"找到你要的风格',
      '点击模板进入编辑',
      '用AI功能或替换为自己的内容',
      '调整文字和图片位置',
      '导出高清图片',
    ],
  },
]

const POSTER_ELEMENTS = [
  { icon: '🖼️', name: '主图/背景', desc: '吸引眼球的大图，决定整体氛围', tip: '用AI生成或选高质量图片' },
  { icon: '✍️', name: '标题文字', desc: '最大的文字，第一眼看到的', tip: '简短有力，不超过10字' },
  { icon: '📝', name: '副标题/正文', desc: '补充说明，比标题小', tip: '只写最重要的信息' },
  { icon: '🎨', name: '配色方案', desc: '整体颜色风格', tip: '一般2-3种颜色，不要太花' },
  { icon: '📐', name: '排版布局', desc: '元素的摆放位置', tip: '留白很重要，不要塞太满' },
]

const POSTER_THEMES = [
  { id: 'birthday', label: '🎂 生日派对', color: '#ec4899', keywords: '生日快乐、蛋糕、彩色气球、派对、欢乐' },
  { id: 'study', label: '📚 学习加油', color: '#6366f1', keywords: '奋斗、书本、星光、加油、未来' },
  { id: 'nature', label: '🌿 自然环保', color: '#10b981', keywords: '绿色、地球、树叶、保护、清新' },
  { id: 'sport', label: '⚽ 运动激情', color: '#f97316', keywords: '运动、活力、汗水、冠军、拼搏' },
  { id: 'tech', label: '🤖 科技未来', color: '#0ea5e9', keywords: 'AI、机器人、未来、数字、创新' },
  { id: 'custom', label: '✏️ 我的主题', color: '#8b5cf6', keywords: '' },
]

const QUIZ = [
  {
    q: '做AI海报时，最关键的第一步是？',
    options: ['马上选最贵的工具', '确定海报的主题和要传达的信息', '先把所有模板都看一遍', '找最多文字的模板'],
    correct: 1,
    explain: '主题先行！清楚要传达什么，才能选对模板、配对图片和文字。工具只是实现你想法的手段。',
  },
  {
    q: '一张好海报通常有几种主色？',
    options: ['越多越好，越丰富越好', '只用黑白', '2-3种颜色，保持统一感', '每个元素都不同颜色'],
    correct: 2,
    explain: '2-3种颜色最安全！颜色太多会显得乱，设计感反而降低。选好一个主色，搭配1-2个辅助色就够了。',
  },
  {
    q: '国内用户做AI海报，最推荐哪个工具？',
    options: ['只能用Canva', '美图设计室或稿定设计（中文好、免费、无需翻墙）', '一定要用Midjourney', '不用AI工具'],
    correct: 1,
    explain: '美图设计室和稿定设计都是国内平台，无需科学上网，中文模板多，免费额度足够。是国内用户的首选！',
  },
]

export default function Lesson24({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [selectedTheme, setSelectedTheme] = useState(null)
  const [customTheme, setCustomTheme] = useState('')
  const [selectedTool, setSelectedTool] = useState(null)
  const [toolStep, setToolStep] = useState(null)
  const [checkedElements, setCheckedElements] = useState([])
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)
  const [posterDone, setPosterDone] = useState(false)

  const accentColor = '#f59e0b'
  const toolDetail = POSTER_TOOLS.find(t => t.id === selectedTool)
  const theme = POSTER_THEMES.find(t => t.id === selectedTheme)

  function toggleElement(name) {
    setCheckedElements(e => e.includes(name) ? e.filter(x => x !== name) : [...e, name])
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

  const builtBrief = selectedTheme
    ? `海报主题：${selectedTheme === 'custom' ? customTheme || '自定义主题' : theme?.label.slice(2)}\n关键词：${selectedTheme === 'custom' ? customTheme : theme?.keywords}\n\n适合工具：${toolDetail?.name || '美图设计室 / Canva'}`
    : ''

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回课程列表</button>

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#fef3c7', color: '#78350f' }}>第 24 课 · 模块 G · 真项目</span>
        <span className="lesson-hero-emoji">🖼️</span>
        <h1 className="lesson-hero-title">我的第一张 AI 海报</h1>
        <p className="lesson-hero-sub">My First AI Poster — 从零到一，做一个可以分享的作品</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>了解一张好海报需要哪些要素</li>
          <li>选好工具，一步步做出你的第一张AI海报</li>
          <li>完成一个可以发给朋友/打印出来的真实作品</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {['learn', 'plan', 'tool', 'quiz', 'work'].map(t => (
          <button key={t} className={`lesson-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}
            style={tab === t ? { borderBottomColor: accentColor, color: accentColor } : {}}>
            {t === 'learn' ? '学一学' : t === 'plan' ? '我的策划' : t === 'tool' ? '选工具做' : t === 'quiz' ? '测一测' : '我的作品'}
          </button>
        ))}
      </div>

      {tab === 'learn' && (
        <div className="lesson-content">
          {DEVICE_BADGE}
          <div className="lesson-section">
            <h2 className="lesson-section-title">🖼️ 什么是"好海报"？</h2>
            <p className="lesson-text">一张好海报做到这3点：① 一眼就知道在说什么；② 让人想多看两秒；③ 信息清楚不复杂。现在有了AI工具，不需要会设计，也能做出专业感的海报！</p>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">🧱 海报的5个基本要素</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
              {POSTER_ELEMENTS.map(el => (
                <div key={el.name} style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{el.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#b45309', fontSize: 14 }}>{el.name}</div>
                    <div style={{ fontSize: 13, color: '#1e293b', marginTop: 2 }}>{el.desc}</div>
                    <div style={{ fontSize: 11, color: '#92400e', background: '#fef3c7', borderRadius: 6, padding: '3px 8px', marginTop: 6, display: 'inline-block' }}>💡 {el.tip}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-tip-box">
            💡 <strong>最重要的一条：</strong>留白是设计感的来源！不要把每个角落都填满，给眼睛留一点"呼吸空间"。
          </div>
        </div>
      )}

      {tab === 'plan' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">📋 策划你的海报</h2>
          <p className="lesson-text">做之前先想清楚，能让整个过程更顺！</p>

          <div className="lesson-section">
            <h2 className="lesson-section-title" style={{ fontSize: 16 }}>第一步：选主题</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
              {POSTER_THEMES.map(t => (
                <button key={t.id} onClick={() => setSelectedTheme(t.id)}
                  style={{ padding: '8px 14px', borderRadius: 999, border: `2px solid ${selectedTheme === t.id ? t.color : '#e2e8f0'}`, background: selectedTheme === t.id ? t.color + '15' : '#f8fafc', color: selectedTheme === t.id ? t.color : '#475569', fontSize: 13, fontWeight: selectedTheme === t.id ? 700 : 400, cursor: 'pointer' }}>
                  {t.label}
                </button>
              ))}
            </div>
            {selectedTheme === 'custom' && (
              <input
                style={{ width: '100%', marginTop: 10, border: '2px solid #e2e8f0', borderRadius: 8, padding: '8px 12px', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }}
                value={customTheme}
                onChange={e => setCustomTheme(e.target.value)}
                placeholder="描述你的海报主题，比如：我最爱的篮球明星"
              />
            )}
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title" style={{ fontSize: 16 }}>第二步：核对清单</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
              {POSTER_ELEMENTS.map(el => (
                <div key={el.name} onClick={() => toggleElement(el.name)}
                  style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 14px', background: checkedElements.includes(el.name) ? '#f0fdf4' : '#f8fafc', border: `1.5px solid ${checkedElements.includes(el.name) ? '#86efac' : '#e2e8f0'}`, borderRadius: 10, cursor: 'pointer' }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checkedElements.includes(el.name) ? '#10b981' : '#cbd5e1'}`, background: checkedElements.includes(el.name) ? '#10b981' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {checkedElements.includes(el.name) && <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: 16 }}>{el.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{el.name}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{el.tip}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedTheme && (
            <div style={{ background: '#fffbeb', border: '2px solid #fde68a', borderRadius: 14, padding: '14px 16px', marginTop: 10 }}>
              <div style={{ fontSize: 13, color: accentColor, fontWeight: 700, marginBottom: 8 }}>📋 你的海报策划：</div>
              <div style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>{builtBrief}</div>
            </div>
          )}
        </div>
      )}

      {tab === 'tool' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🛠️ 选一个工具，开始做！</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
            {POSTER_TOOLS.map(t => (
              <button key={t.id} onClick={() => { setSelectedTool(t.id === selectedTool ? null : t.id); setToolStep(null) }}
                style={{ border: `2px solid ${selectedTool === t.id ? t.color : '#e2e8f0'}`, borderRadius: 14, padding: '14px 16px', textAlign: 'left', background: selectedTool === t.id ? t.bg : '#fff', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{t.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, color: t.color, fontSize: 15 }}>{t.name}</span>
                      <span style={{ background: t.tagColor + '20', color: t.tagColor, fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 999 }}>{t.tag}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>AI功能：{t.aiFeature}</div>
                  </div>
                  <span style={{ color: selectedTool === t.id ? t.color : '#94a3b8', fontSize: 13 }}>{selectedTool === t.id ? '▼' : '▶'}</span>
                </div>
              </button>
            ))}
          </div>

          {toolDetail && (
            <div style={{ background: toolDetail.bg, border: `2px solid ${toolDetail.color}40`, borderRadius: 14, padding: '16px' }}>
              <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.7, marginBottom: 14 }}>{toolDetail.desc}</p>
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#15803d', marginBottom: 16 }}>
                💰 {toolDetail.free}
              </div>

              <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 12, fontSize: 14 }}>🪜 入门步骤（手把手）：</div>
              {toolDetail.steps.map((step, i) => (
                <div key={i} onClick={() => setToolStep(toolStep === i ? null : i)}
                  style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start', cursor: 'pointer', background: toolStep === i ? '#fff' : 'transparent', borderRadius: 10, padding: toolStep === i ? '10px 12px' : '4px 0', border: toolStep === i ? `1.5px solid ${toolDetail.color}40` : 'none' }}>
                  <div style={{ background: toolStep === i ? toolDetail.color : toolDetail.color + '40', color: '#fff', borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, transition: 'background 0.2s' }}>{i + 1}</div>
                  <div style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.6, paddingTop: 3 }}>{step}</div>
                </div>
              ))}
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
                {quizScore === 3 ? '🎉 全对！海报设计高手！' : quizScore === 2 ? '👍 不错！去做你的第一张海报！' : '💪 回去"学一学"看5个要素！'}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'work' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🖼️ 我的第一张AI海报</h2>

          <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: 14, padding: '16px', marginBottom: 20 }}>
            <div style={{ fontWeight: 700, color: '#b45309', marginBottom: 12 }}>✅ 完成了吗？打勾确认：</div>
            {[
              { id: 'theme', label: '我有一个明确的海报主题' },
              { id: 'tool', label: '我选了一个工具（美图/Canva/稿定）' },
              { id: 'made', label: '我完成了海报并导出/保存' },
              { id: 'share', label: '我觉得这张海报可以给别人看' },
            ].map(item => (
              <div key={item.id} onClick={() => toggleElement(item.id)}
                style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', cursor: 'pointer' }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checkedElements.includes(item.id) ? accentColor : '#cbd5e1'}`, background: checkedElements.includes(item.id) ? accentColor : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {checkedElements.includes(item.id) && <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>✓</span>}
                </div>
                <span style={{ fontSize: 14, color: '#1e293b' }}>{item.label}</span>
              </div>
            ))}
          </div>

          <button className="lesson-btn" style={{ background: accentColor }} onClick={() => setPosterDone(true)}>
            🎉 我的第一张AI海报完成了！
          </button>

          {posterDone && (
            <div className="certificate" style={{ marginTop: 16 }}>
              <div className="certificate-title">🖼️ 第一张AI海报！完成！</div>
              <div className="certificate-name">
                {selectedTheme ? `主题：${selectedTheme === 'custom' ? customTheme || '自定义' : theme?.label.slice(2)}` : '我的AI海报'}
              </div>
              <div className="certificate-sub">第 24 课 · 模块 G · 真项目</div>
              <div style={{ fontSize: 14, color: '#93c5fd', margin: '16px 0', lineHeight: 1.8 }}>
                从想法 → 策划 → 选工具 → 做出来<br />
                <strong style={{ color: '#bfdbfe' }}>模块G第一个真实作品！</strong>
              </div>
              <div style={{ fontSize: 24, letterSpacing: 4 }}>⭐⭐⭐</div>
            </div>
          )}

          <div className="lesson-next-preview" style={{ marginTop: 16 }}>
            <div className="lesson-next-title">🚀 下一课预告：第 25 课 · 我的第一份AI PPT</div>
            <p>海报做完了，下一步做PPT！用Gamma或美图PPT，只需输入主题，10秒内生成一份完整的演示文稿。</p>
          </div>
        </div>
      )}
    </div>
  )
}
