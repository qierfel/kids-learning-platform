import { useState } from 'react'
import './Lesson.css'
import PromptCompareLab from './PromptCompareLab'

const DEVICE_BADGE = (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
    <span style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>📱 手机</span>
    <span style={{ background: '#e0e7ff', color: '#4338ca', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>🖥️ iPad</span>
    <span style={{ background: '#dcfce7', color: '#15803d', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>💻 电脑</span>
    <span style={{ background: '#fdf2f8', color: '#9d174d', fontSize: 11, padding: '4px 10px', borderRadius: 999 }}>🎨 三种设备都能生成AI图片</span>
  </div>
)

const IMAGE_TOOLS = [
  {
    id: 'jimeng',
    name: '即梦',
    maker: '字节跳动（国内）',
    emoji: '✨',
    color: '#6366f1',
    bg: '#eef2ff',
    tag: '国内 · 推荐首选',
    tagColor: '#4338ca',
    url: 'jimeng.jianying.com',
    strengths: ['中文提示词效果好', '免费额度多', '图片精细', '支持手机/电脑'],
    style: '写实、二次元、中国风都很好',
    tip: '新手最推荐！中文提示词直接出好图，免费额度够用',
    promptExample: '一只戴着宇航员头盔的橙色猫咪，在星空下望向地球，梦幻风格',
  },
  {
    id: 'kling',
    name: '可灵',
    maker: '快手（国内）',
    emoji: '🎬',
    color: '#f97316',
    bg: '#fff7ed',
    tag: '国内 · 擅长视频',
    tagColor: '#c2410c',
    url: 'klingai.com',
    strengths: ['图片+视频都能生成', '动态效果很好', '创意场景出色', '多风格支持'],
    style: '动感、创意、写实都有',
    tip: '不只能出图，还能生成短视频！适合喜欢动态内容的同学',
    promptExample: '一朵玫瑰花在雨中缓缓盛开，水珠滑落花瓣，超清晰特写',
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    maker: 'Midjourney Inc.（国际）',
    emoji: '🌊',
    color: '#8b5cf6',
    bg: '#faf5ff',
    tag: '国际 · 最强画质',
    tagColor: '#7c3aed',
    url: 'midjourney.com',
    strengths: ['公认最强画质', '艺术风格出众', '社区资源丰富', '专业级作品'],
    style: '精美写实、油画、奇幻、建筑都顶级',
    tip: '全球设计师最爱！画质是公认最好的，但需要国际网络且按月付费',
    promptExample: 'A magical library floating in clouds, sunlight through windows, warm and mystical, 8k ultra detailed',
  },
  {
    id: 'dalle',
    name: 'DALL-E 3',
    maker: 'OpenAI（国际）',
    emoji: '🎨',
    color: '#10b981',
    bg: '#f0fdf4',
    tag: '国际 · 内置ChatGPT',
    tagColor: '#047857',
    url: 'chat.openai.com (ChatGPT Plus内置)',
    strengths: ['理解复杂中英文描述', '内置于ChatGPT', '细节表达准确', '支持修改指令'],
    style: '写实、插画、概念图都很准确',
    tip: '如果你有ChatGPT Plus账号，直接在对话框里说"帮我画..."就能用！',
    promptExample: 'A child astronaut floating in space, looking at colorful nebula, watercolor painting style, warm colors',
  },
]

const PROMPT_GUIDE = [
  { label: '主体', desc: '画什么？', example: '一只猫咪 / 一座城堡 / 一个小女孩' },
  { label: '场景', desc: '在哪里？什么环境？', example: '在星空下 / 森林里 / 海边日落时' },
  { label: '风格', desc: '要什么感觉？', example: '水彩画风格 / 真实照片 / 二次元 / 油画' },
  { label: '细节', desc: '特别要注意什么？', example: '超清晰 / 温暖色调 / 梦幻光线 / 8K画质' },
]

const PROMPT_BUILDER_PARTS = {
  subject: ['一只戴眼镜的熊猫', '一个女孩机器人', '一头独角兽', '一只小龙', '一座悬空城堡'],
  scene: ['在樱花树下', '在宇宙星云中', '在海边看日落', '在古老图书馆里', '在彩虹云朵上'],
  style: ['水彩画风格', '二次元动漫风', '写实照片', '中国工笔画', '油画质感'],
  detail: ['温暖橙色光线', '梦幻柔和色调', '超精细细节', '金色粒子飘散', '晨雾笼罩'],
}

const QUIZ = [
  {
    q: '用AI画图时，"提示词"最重要的作用是？',
    options: ['让AI知道你用的是哪个设备', '描述你想要的画面内容和风格', '告诉AI图片要多大', '决定图片的文件格式'],
    correct: 1,
    explain: '提示词就是你给AI的"画图说明书"！描述越具体（主体+场景+风格+细节），AI出的图越符合你的想象。',
  },
  {
    q: '以下哪个提示词更可能得到好效果？',
    options: ['画一张图', '画一只猫', '一只橙色猫咪坐在窗台上看雨，水彩风格，温暖光线，超清晰', '一张美丽的图片'],
    correct: 2,
    explain: '越具体的提示词，AI越能准确理解你的想法！颜色、姿势、场景、风格、画质——都说出来！',
  },
  {
    q: '国内画图AI（即梦/可灵）最大的优势是？',
    options: ['画质比Midjourney好', '无需特殊网络、中文提示词效果好、免费额度多', '比所有国际工具便宜', '可以生成3D模型'],
    correct: 1,
    explain: '国内工具门槛低、中文提示词直接好用、免费额度通常更多，非常适合入门！',
  },
]

export default function Lesson19({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [selectedTool, setSelectedTool] = useState(null)
  const [builderSelections, setBuilderSelections] = useState({ subject: null, scene: null, style: null, detail: null })
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)
  const [favoriteTool, setFavoriteTool] = useState(null)

  const accentColor = '#ec4899'
  const toolDetail = IMAGE_TOOLS.find(t => t.id === selectedTool)

  const builtPrompt = [
    builderSelections.subject,
    builderSelections.scene,
    builderSelections.style,
    builderSelections.detail,
  ].filter(Boolean).join('，')

  function selectBuilder(key, val) {
    setBuilderSelections(s => ({ ...s, [key]: s[key] === val ? null : val }))
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

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#fce7f3', color: '#831843' }}>第 19 课 · 模块 E · 工具大全</span>
        <span className="lesson-hero-emoji">🎨</span>
        <h1 className="lesson-hero-title">会画画的 AI</h1>
        <p className="lesson-hero-sub">AI Image Generation — 用一句话，让AI帮你画出来</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>认识即梦、可灵、Midjourney、DALL-E四大画图AI</li>
          <li>学会写出有效的绘画提示词</li>
          <li>拼出你的第一条AI绘画提示词！</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {['learn', 'tools', 'prompt', 'quiz', 'work'].map(t => (
          <button key={t} className={`lesson-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}
            style={tab === t ? { borderBottomColor: accentColor, color: accentColor } : {}}>
            {t === 'learn' ? '学一学' : t === 'tools' ? '认识工具' : t === 'prompt' ? '拼提示词' : t === 'quiz' ? '测一测' : '我要去画'}
          </button>
        ))}
      </div>

      {tab === 'learn' && (
        <div className="lesson-content">
          {DEVICE_BADGE}
          <div className="lesson-section">
            <h2 className="lesson-section-title">🎨 AI画图是怎么工作的？</h2>
            <p className="lesson-text">AI画图工具（文生图）就是：你输入一段文字描述，AI就自动生成一张图片。不需要会画画，只需要能描述你想要的东西！这是目前最酷的AI能力之一。</p>

            <div style={{ background: '#fdf2f8', border: '1.5px solid #f9a8d4', borderRadius: 12, padding: '14px 16px', marginTop: 14 }}>
              <div style={{ fontWeight: 700, color: '#9d174d', marginBottom: 10 }}>✨ 工作原理（超简单版）：</div>
              {[
                { step: '你写提示词', desc: '比如：一只猫在星空下弹吉他，梦幻水彩风格' },
                { step: 'AI理解你的意思', desc: '把文字变成它"理解"的画面信息' },
                { step: '生成图片', desc: '几秒钟内，符合你描述的图片出现了！' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < 2 ? 10 : 0, alignItems: 'flex-start' }}>
                  <div style={{ background: accentColor, color: '#fff', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <div>
                    <strong style={{ fontSize: 14, color: '#1e293b' }}>{s.step}</strong>
                    <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">📝 好提示词的4个要素</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
              {PROMPT_GUIDE.map((g, i) => (
                <div key={i} style={{ background: '#fff', border: '1.5px solid #f9a8d4', borderRadius: 12, padding: '12px' }}>
                  <div style={{ fontWeight: 800, color: accentColor, fontSize: 16, marginBottom: 4 }}>{g.label}</div>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{g.desc}</div>
                  <div style={{ fontSize: 11, background: '#fdf2f8', borderRadius: 6, padding: '4px 8px', color: '#831843' }}>例：{g.example}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-tip-box">
            💡 <strong>关键技巧：</strong>用逗号分隔不同要素。中文国内工具直接用中文；Midjourney推荐用英文提示词效果最好！
          </div>
        </div>
      )}

      {tab === 'tools' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🛠️ 四大画图AI对比</h2>
          <p className="lesson-text">点击工具查看详情和示例提示词。</p>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {IMAGE_TOOLS.map(t => (
              <button key={t.id} onClick={() => setSelectedTool(t.id === selectedTool ? null : t.id)}
                style={{ padding: '8px 14px', borderRadius: 999, border: `2px solid ${selectedTool === t.id ? t.color : '#e2e8f0'}`, background: selectedTool === t.id ? t.bg : '#fff', color: t.color, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                {t.emoji} {t.name}
              </button>
            ))}
          </div>

          {toolDetail && (
            <div style={{ background: toolDetail.bg, border: `2px solid ${toolDetail.color}40`, borderRadius: 16, padding: '18px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 30 }}>{toolDetail.emoji}</span>
                <div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontWeight: 900, color: toolDetail.color, fontSize: 20 }}>{toolDetail.name}</span>
                    <span style={{ background: toolDetail.tagColor + '20', color: toolDetail.tagColor, fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 999 }}>{toolDetail.tag}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{toolDetail.maker}</div>
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 8, fontSize: 14 }}>✅ 特色能力：</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  {toolDetail.strengths.map((s, i) => (
                    <div key={i} style={{ background: '#fff', border: `1px solid ${toolDetail.color}30`, borderRadius: 8, padding: '7px 10px', fontSize: 12, color: '#1e293b' }}>
                      <span style={{ color: toolDetail.color }}>● </span>{s}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#fff', borderRadius: 10, padding: '10px 12px', marginBottom: 10, fontSize: 13 }}>
                <strong style={{ color: toolDetail.color }}>风格擅长：</strong> {toolDetail.style}
              </div>

              <div style={{ background: '#f8fafc', borderRadius: 10, padding: '10px 12px', marginBottom: 10, fontSize: 13, color: '#475569' }}>
                💡 {toolDetail.tip}
              </div>

              <div style={{ background: '#fff', border: `1.5px dashed ${toolDetail.color}60`, borderRadius: 10, padding: '10px 12px' }}>
                <div style={{ fontSize: 12, color: toolDetail.color, fontWeight: 700, marginBottom: 6 }}>📝 示例提示词：</div>
                <div style={{ fontSize: 13, color: '#1e293b', fontStyle: 'italic', lineHeight: 1.6 }}>"{toolDetail.promptExample}"</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 6 }}>前往 {toolDetail.url} 试试这个提示词！</div>
              </div>
            </div>
          )}

          {!selectedTool && (
            <div style={{ textAlign: 'center', padding: '30px 20px', color: '#94a3b8', fontSize: 14 }}>
              ↑ 点击工具名称，查看详细介绍
            </div>
          )}
        </div>
      )}

      {tab === 'prompt' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🔧 提示词拼图工坊</h2>
          <p className="lesson-text">从每一类中选一个词，拼出你的专属AI绘画提示词！</p>

          {Object.entries(PROMPT_BUILDER_PARTS).map(([key, options]) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 14, marginBottom: 8 }}>
                {key === 'subject' ? '🎭 主体（画什么？）' : key === 'scene' ? '🌍 场景（在哪里？）' : key === 'style' ? '🎨 风格（什么感觉？）' : '✨ 细节（特别要求）'}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {options.map(opt => (
                  <button key={opt} onClick={() => selectBuilder(key, opt)}
                    style={{ padding: '7px 12px', borderRadius: 999, border: `2px solid ${builderSelections[key] === opt ? accentColor : '#e2e8f0'}`, background: builderSelections[key] === opt ? '#fdf2f8' : '#f8fafc', color: builderSelections[key] === opt ? accentColor : '#475569', fontSize: 13, fontWeight: builderSelections[key] === opt ? 700 : 400, cursor: 'pointer' }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div style={{ background: builtPrompt ? '#fdf2f8' : '#f8fafc', border: `2px solid ${builtPrompt ? accentColor : '#e2e8f0'}`, borderRadius: 14, padding: '14px 16px', marginTop: 8 }}>
            <div style={{ fontSize: 13, color: accentColor, fontWeight: 700, marginBottom: 6 }}>🎯 你的提示词：</div>
            <div style={{ fontSize: 15, color: builtPrompt ? '#1e293b' : '#94a3b8', lineHeight: 1.7, minHeight: 40 }}>
              {builtPrompt || '← 在上方选择各部分，提示词会自动拼出来'}
            </div>
          </div>

          {builtPrompt && (
            <div style={{ marginTop: 12, background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 10, padding: '12px 14px', fontSize: 13, color: '#15803d' }}>
              🎉 提示词写好了！去这些平台试试吧：<br />
              <strong>即梦（jimeng.jianying.com）</strong> 或 <strong>可灵（klingai.com）</strong><br />
              把上面这段话粘贴进去，看看AI画出来什么！
            </div>
          )}

          <div style={{ marginTop: 24 }}>
            <h2 className="lesson-section-title">🤖 真的让 AI 来"读"你的提示词</h2>
            <p className="lesson-text" style={{ marginBottom: 8 }}>
              下面三条提示词，从最简单到最完整。让 AI 用每条来想象画面、给出建议——你就能直观感受到：提示词差一点，AI 想出来的画面差很多！
            </p>
            <PromptCompareLab
              subject="ai-image-prompt"
              accent={accentColor}
              intro="点按钮，让 AI 用每条提示词描述它脑中的画面、并打分。"
              hint="主体 + 场景 + 风格 + 细节，缺一条 AI 都得自己脑补 ✏️"
              prompts={[
                {
                  id: 'l19-bad',
                  label: '太简单',
                  text: '请你扮演 AI 画图老师。我给你一条画图提示词："一只猫"。请用 60 字以内描述：如果按这条提示词去画，AI 大概会画出什么样的画面？这条提示词缺了哪些关键信息？给它打 1-10 分。',
                },
                {
                  id: 'l19-mid',
                  label: '还不够',
                  text: '请你扮演 AI 画图老师。我给你一条画图提示词："一只橙色小猫在窗台上"。请用 60 字以内描述：如果按这条提示词去画，AI 大概会画出什么样的画面？还缺什么？给它打 1-10 分。',
                },
                {
                  id: 'l19-good',
                  label: '主体+场景+风格+细节',
                  text: '请你扮演 AI 画图老师。我给你一条画图提示词："一只橙色小猫坐在木窗台上看雨，水彩画风格，温暖橙色光线，超清晰细节"。请用 60 字以内描述：如果按这条提示词去画，AI 大概会画出什么样的画面？给它打 1-10 分，并说说为什么。',
                },
              ]}
              allowCustom={true}
              customLabel="✏️ 试试你刚拼好的提示词"
              customPlaceholder="把上面拼出来的提示词粘贴进来，让 AI 评价一下，再决定要不要拿去画图工具用"
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
                {quizScore === 3 ? '🎉 全对！你是AI画图达人！' : quizScore === 2 ? '👍 不错！去画图平台试试吧！' : '💪 回去"认识工具"复习一下！'}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'work' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🎨 我要去画！</h2>
          <p className="lesson-text">选一个你最想去试的画图AI：</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {IMAGE_TOOLS.map(t => (
              <button key={t.id} onClick={() => setFavoriteTool(t.id)}
                style={{ border: `2.5px solid ${favoriteTool === t.id ? t.color : '#e2e8f0'}`, borderRadius: 14, padding: '12px 14px', textAlign: 'left', background: favoriteTool === t.id ? t.bg : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{t.emoji}</span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 700, color: t.color }}>{t.name}</span>
                  <span style={{ marginLeft: 6, background: t.tagColor + '20', color: t.tagColor, fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 999 }}>{t.tag}</span>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{t.style}</div>
                </div>
                {favoriteTool === t.id && <span style={{ color: t.color, fontWeight: 700, fontSize: 18 }}>✓</span>}
              </button>
            ))}
          </div>

          {favoriteTool && (
            <>
              <div className="certificate">
                <div className="certificate-title">🎨 AI画图！出发！</div>
                <div className="certificate-name">
                  {IMAGE_TOOLS.find(t => t.id === favoriteTool)?.emoji} {IMAGE_TOOLS.find(t => t.id === favoriteTool)?.name}
                </div>
                <div className="certificate-sub">第 19 课 · 模块 E · 工具大全</div>
                <div style={{ fontSize: 14, color: '#93c5fd', margin: '16px 0', lineHeight: 1.8 }}>
                  今天学会了：好提示词 = 主体 + 场景 + 风格 + 细节<br />
                  <strong style={{ color: '#bfdbfe' }}>用文字描述，让AI帮你画出来！</strong>
                </div>
                <div style={{ fontSize: 24, letterSpacing: 4 }}>⭐⭐⭐</div>
              </div>

              {builtPrompt && (
                <div style={{ marginTop: 14, background: '#fdf2f8', border: '2px solid #f9a8d4', borderRadius: 12, padding: '14px' }}>
                  <div style={{ fontSize: 13, color: accentColor, fontWeight: 700, marginBottom: 6 }}>✏️ 你拼好的提示词，带过去用：</div>
                  <div style={{ fontSize: 14, color: '#1e293b', fontStyle: 'italic' }}>{builtPrompt}</div>
                </div>
              )}
            </>
          )}

          <div className="lesson-next-preview" style={{ marginTop: 16 }}>
            <div className="lesson-next-title">🚀 下一课预告：第 20 课 · 会做工的AI</div>
            <p>聊天AI、画图AI都认识了！下一课认识"会做工的AI"：Cursor帮你写代码、Gamma帮你做PPT、V0帮你做网页！</p>
          </div>
        </div>
      )}
    </div>
  )
}
