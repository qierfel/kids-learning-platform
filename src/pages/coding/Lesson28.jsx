import { useState } from 'react'
import './Lesson.css'
import PromptCompareLab from './PromptCompareLab'

const DEVICE_BADGE = (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
    <span style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>📱 手机</span>
    <span style={{ background: '#e0e7ff', color: '#4338ca', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>🖥️ iPad</span>
    <span style={{ background: '#dcfce7', color: '#15803d', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>💻 电脑</span>
    <span style={{ background: '#fdf4ff', color: '#86198f', fontSize: 11, padding: '4px 10px', borderRadius: 999 }}>🎬 视频/音乐工具 手机电脑都能用</span>
  </div>
)

const VIDEO_TOOLS = [
  {
    id: 'kling',
    name: '可灵AI',
    emoji: '🎬',
    color: '#7c3aed',
    bg: '#f5f3ff',
    tag: '国内 · 无需翻墙',
    tagColor: '#6d28d9',
    url: 'klingai.com',
    type: '视频生成',
    aiFeature: '文字/图片→AI生成视频',
    desc: '快手出品的视频生成AI，输入文字或图片，AI自动生成一段真实感很强的视频',
    free: '每天有免费生成额度',
    steps: [
      '打开 klingai.com，用手机号或微信登录',
      '选择"文生视频"或"图生视频"',
      '文生视频：描述你想要的画面，例如"一只小猫在春天的花园里追蝴蝶，阳光明媚，慢动作"',
      '图生视频：上传一张图片，让AI让图片"动起来"',
      '等待生成（大约1-3分钟）→下载保存',
    ],
  },
  {
    id: 'runway',
    name: 'Runway',
    emoji: '🎥',
    color: '#0891b2',
    bg: '#ecfeff',
    tag: '国际 · 功能强大',
    tagColor: '#0e7490',
    url: 'runwayml.com',
    type: '视频生成',
    aiFeature: 'Gen-3 Alpha高质量视频生成',
    desc: '电影级AI视频工具，质量非常高，很多真实电影都在用它。需要注册，可能需要家长帮忙',
    free: '注册后有免费积分',
    steps: [
      '打开 runwayml.com，用邮箱或Google账号注册',
      '进入 Gen-3 Alpha 视频生成功能',
      '用英文描述画面，例如"A cat chasing butterflies in a sunny garden, slow motion"',
      '选择视频时长和风格→点击生成',
      '等待生成→下载或分享',
    ],
  },
]

const MUSIC_TOOLS = [
  {
    id: 'suno',
    name: 'Suno',
    emoji: '🎵',
    color: '#db2777',
    bg: '#fdf2f8',
    tag: '国际 · 最受欢迎',
    tagColor: '#9d174d',
    url: 'suno.com',
    type: '音乐生成',
    aiFeature: '输入歌词+风格→AI生成完整歌曲',
    desc: '全球最受欢迎的AI音乐工具，输入歌词和风格，几十秒后AI帮你唱出完整的歌，还有配乐！',
    free: '每天免费生成10首',
    steps: [
      '打开 suno.com，用Google账号或邮箱注册',
      '点击"Create"创建新歌',
      '在"Lyrics"里输入歌词（可以中文或英文）',
      '在"Style of Music"里描述风格，例如"pop, upbeat, female vocal"',
      '点击"Create"→等待约30秒→听你的AI歌曲！',
    ],
  },
  {
    id: 'udio',
    name: 'Udio',
    emoji: '🎶',
    color: '#0ea5e9',
    bg: '#f0f9ff',
    tag: '国际 · 高音质',
    tagColor: '#0369a1',
    url: 'udio.com',
    type: '音乐生成',
    aiFeature: '高质量AI音乐生成',
    desc: '另一个很棒的AI音乐工具，生成的音乐质量非常高，支持更多音乐风格',
    free: '每月有一定免费额度',
    steps: [
      '打开 udio.com，用Google账号登录',
      '在输入框描述你想要的音乐风格和内容',
      '例如："欢快的儿童歌曲，关于夏天和冰淇淋"',
      '点击生成→等待约1分钟',
      '满意后下载MP3保存',
    ],
  },
  {
    id: 'tianyin',
    name: '天音',
    emoji: '🎤',
    color: '#f59e0b',
    bg: '#fffbeb',
    tag: '国内 · 无需翻墙',
    tagColor: '#92400e',
    url: 'tianyin.music',
    type: '音乐生成',
    aiFeature: 'AI生成中文歌曲',
    desc: '网易出品的AI音乐工具，专注中文歌曲生成，用微信登录就能用，更适合中文歌词',
    free: '注册后有免费额度',
    steps: [
      '搜索"天音AI音乐"或打开 tianyin.music',
      '用微信或手机号登录',
      '输入你的歌词（建议先用Claude帮你写歌词）',
      '选择音乐风格和演唱风格',
      '生成后试听→满意就下载保存',
    ],
  },
]

const CREATIVE_PROMPTS = [
  {
    type: 'video',
    label: '🎬 视频创意',
    ideas: [
      '一只小狗在雪地里奔跑，慢动作，温暖阳光',
      '夜空中的流星雨，星星一颗颗划过，很梦幻',
      '一朵花从种子慢慢长大开花的过程，延时摄影风格',
      '一个机器人在城市里散步，看着窗户里的人类生活',
    ],
  },
  {
    type: 'music',
    label: '🎵 音乐创意',
    ideas: [
      '一首快乐的儿童歌，讲我的暑假，有吉他伴奏',
      '一首轻柔的钢琴曲，适合睡前听，很放松',
      '一首关于宇宙和星星的歌，有电子音效，神秘感',
      '一首关于我的猫咪的可爱小歌，活泼风格',
    ],
  },
]

const QUIZ = [
  {
    q: '可灵AI和Suno分别主要用来做什么？',
    options: [
      '可灵做图片，Suno做视频',
      '可灵做视频，Suno做音乐',
      '可灵做音乐，Suno做图片',
      '两个都是做视频的',
    ],
    correct: 1,
    explain: '可灵AI是快手出品的视频生成工具，输入文字或图片就能生成视频；Suno是全球最受欢迎的AI音乐生成工具，能帮你创作带演唱的完整歌曲！',
  },
  {
    q: '用Suno生成歌曲时，"Style of Music"里应该填什么？',
    options: [
      '歌词内容', '你喜欢的歌手名字', '音乐风格描述，比如"pop, upbeat"', '歌曲的时长'],
    correct: 2,
    explain: 'Style of Music是告诉AI你想要什么风格的音乐，比如"pop（流行）、jazz（爵士）、upbeat（欢快）、female vocal（女声）"等，描述越准确，生成效果越贴合你的想法！',
  },
  {
    q: '用AI工具生成的视频和音乐，可以用来做什么？',
    options: [
      '只能自己欣赏，不能分享', '可以分享给家人朋友，也可以放进自己的作品集', '必须上传到官方平台才能看', '生成后会自动消失'],
    correct: 1,
    explain: '你生成的AI视频和音乐可以下载保存、分享给别人、放进作品集展示，甚至作为你项目的背景音乐！记住：要注明是AI生成的哦。',
  },
]

const accentColor = '#db2777'

export default function Lesson28({ onBack }) {
  const [tab, setTab] = useState(0)
  const [activeCategory, setActiveCategory] = useState('video')
  const [selectedTool, setSelectedTool] = useState(null)
  const [toolStep, setToolStep] = useState(null)
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [checkedItems, setCheckedItems] = useState([])
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)
  const [mediaDone, setMediaDone] = useState(false)

  const tabs = ['学一学', '选工具做', '创意灵感', '测一测', '我的作品']

  const allTools = [...VIDEO_TOOLS, ...MUSIC_TOOLS]
  const displayTools = activeCategory === 'video' ? VIDEO_TOOLS : MUSIC_TOOLS

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
        <h1 className="lesson-title">第28课：我的第一段AI短视频/歌</h1>
        <p className="lesson-subtitle">用AI生成视频和音乐，做出属于你自己的数字创作作品</p>
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
          <div className="info-card" style={{ background: '#fdf2f8', borderLeft: `4px solid ${accentColor}` }}>
            <h3 style={{ color: '#9d174d', marginTop: 0 }}>🎬🎵 AI让创作变得超级容易</h3>
            <p style={{ margin: 0, lineHeight: 1.8 }}>
              以前要做一段视频，需要摄像机、剪辑软件、配音演员……
              要创作一首歌，需要会弹琴、会录音……
              现在，你只需要<strong>描述你想要什么</strong>，AI几分钟内就能帮你做好！
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 20 }}>
            <div style={{ background: '#f5f3ff', borderRadius: 14, padding: '18px 16px', border: '2px solid #e9d5ff' }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>🎬</div>
              <div style={{ fontWeight: 700, color: '#5b21b6', marginBottom: 8 }}>AI视频生成</div>
              <ul style={{ margin: 0, paddingLeft: 16, color: '#6b7280', fontSize: 13, lineHeight: 2 }}>
                <li>输入文字描述画面</li>
                <li>或上传图片让它动起来</li>
                <li>AI生成真实感视频</li>
                <li>几分钟完成</li>
              </ul>
            </div>
            <div style={{ background: '#fdf2f8', borderRadius: 14, padding: '18px 16px', border: '2px solid #fbcfe8' }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>🎵</div>
              <div style={{ fontWeight: 700, color: '#9d174d', marginBottom: 8 }}>AI音乐生成</div>
              <ul style={{ margin: 0, paddingLeft: 16, color: '#6b7280', fontSize: 13, lineHeight: 2 }}>
                <li>输入歌词或主题</li>
                <li>选择音乐风格</li>
                <li>AI作曲+演唱</li>
                <li>30秒出一首完整歌</li>
              </ul>
            </div>
          </div>

          <h3 style={{ color: accentColor, marginTop: 24 }}>💡 写好提示词的关键</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: '🌍', tip: '描述场景', detail: '在哪里？什么时候？什么天气？' },
              { icon: '🎭', tip: '说清主角', detail: '谁在做什么？动物、人、物体？什么样子？' },
              { icon: '🎞️', tip: '描述镜头感', detail: '慢动作？俯拍？特写？宽广的全景？' },
              { icon: '🎨', tip: '说明风格', detail: '真实感？卡通？梦幻？赛博朋克？温暖治愈？' },
            ].map(item => (
              <div key={item.tip} style={{
                display: 'flex', gap: 14, alignItems: 'flex-start',
                background: '#fdf2f8', borderRadius: 10, padding: '12px 16px',
                border: '1px solid #fbcfe8'
              }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#9d174d', fontSize: 14 }}>{item.tip}</div>
                  <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 1: 选工具做 ── */}
      {tab === 1 && (
        <div className="tab-content">
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            {['video', 'music'].map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setSelectedTool(null); setToolStep(null) }}
                style={{
                  flex: 1, border: `2px solid ${activeCategory === cat ? accentColor : '#e5e7eb'}`,
                  background: activeCategory === cat ? '#fdf2f8' : '#fff',
                  borderRadius: 10, padding: '12px', cursor: 'pointer',
                  fontWeight: activeCategory === cat ? 700 : 400,
                  color: activeCategory === cat ? accentColor : '#374151',
                  fontSize: 15, transition: 'all 0.15s'
                }}
              >
                {cat === 'video' ? '🎬 视频工具' : '🎵 音乐工具'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {displayTools.map(tool => (
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
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 2: 创意灵感 ── */}
      {tab === 2 && (
        <div className="tab-content">
          <p style={{ color: '#6b7280', fontSize: 14, marginTop: 0 }}>
            不知道做什么？从这里选一个创意，直接复制进工具里用！
          </p>
          {CREATIVE_PROMPTS.map(cat => (
            <div key={cat.type} style={{ marginBottom: 24 }}>
              <h3 style={{ color: cat.type === 'video' ? '#5b21b6' : accentColor }}>{cat.label}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {cat.ideas.map((idea, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPrompt(idea)}
                    style={{
                      border: `2px solid ${selectedPrompt === idea
                        ? (cat.type === 'video' ? '#7c3aed' : accentColor)
                        : '#e5e7eb'}`,
                      background: selectedPrompt === idea
                        ? (cat.type === 'video' ? '#f5f3ff' : '#fdf2f8')
                        : '#fff',
                      borderRadius: 10, padding: '14px 16px', cursor: 'pointer',
                      textAlign: 'left', fontSize: 14, color: '#374151',
                      transition: 'all 0.15s', lineHeight: 1.5
                    }}
                  >
                    {idea}
                    {selectedPrompt === idea && (
                      <span style={{ display: 'block', fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
                        ✓ 已选中，复制这段话粘贴到工具里
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div style={{
            padding: '16px 20px', background: '#fffbeb',
            borderRadius: 12, border: '1px solid #fde68a'
          }}>
            <div style={{ fontWeight: 700, color: '#92400e', marginBottom: 8 }}>🎯 用Claude帮你写歌词</div>
            <p style={{ margin: 0, fontSize: 14, color: '#78350f', lineHeight: 1.7 }}>
              想做一首歌但不会写歌词？可以先去找Claude，告诉它：
              "帮我写一首关于[你的主题]的歌词，4段，每段4行，风格要[你想要的风格]"
              然后把歌词复制到Suno或天音里生成！
            </p>
          </div>

          <div style={{ marginTop: 24 }}>
            <h3 style={{ color: accentColor, marginBottom: 4 }}>🤖 现场试：让 AI 写一段{activeCategory === 'video' ? '视频脚本' : '歌词'}（三种提示词对比）</h3>
            <p style={{ color: '#6b7280', fontSize: 14, marginTop: 0 }}>
              丢给{activeCategory === 'video' ? '可灵 / Runway' : 'Suno / 天音'}之前，先让 Claude 写个稿。三种提示词从随便说→说清楚→主体+场景+风格+情绪，差距一眼看出来！
            </p>
            {activeCategory === 'video' ? (
              <PromptCompareLab
                subject="ai-video-script"
                accent={accentColor}
                intro="点按钮，让 AI 用每条提示词写一段 5-8 秒的视频脚本。"
                hint="说清楚【主角 + 场景 + 镜头 + 风格 + 情绪】，AI 写出来的脚本才能直接喂给视频 AI ✨"
                prompts={[
                  {
                    id: 'l28-vid-bad',
                    label: '太模糊',
                    text: '帮我写一段 5 秒的短视频脚本。',
                  },
                  {
                    id: 'l28-vid-mid',
                    label: '说了主角',
                    text: '帮我写一段 5 秒的短视频脚本，主角是一只小猫。',
                  },
                  {
                    id: 'l28-vid-good',
                    label: '主角+场景+镜头+风格+情绪',
                    text: `请帮我写一段适合喂给可灵 AI 的视频提示词，时长 5-8 秒。要求：
- 主角：一只橙色小猫
- 场景：春天的窗台，外面下小雨
- 镜头：先慢慢推近到猫的眼睛，再切到窗外
- 风格：电影感、暖色调、像宫崎骏的画
- 情绪：宁静、有点想念

请直接输出一段可以粘贴到可灵的中文提示词（80 字以内），不要解释。`,
                  },
                ]}
                allowCustom={true}
                customLabel="✏️ 你也写一条视频提示词"
                customPlaceholder={`换主角、换场景、换风格——看 AI 给你写出什么样的画面`}
              />
            ) : (
              <PromptCompareLab
                subject="ai-song-lyrics"
                accent={accentColor}
                intro="点按钮，让 AI 用每条提示词写一段歌词草稿。"
                hint="说清楚【主题 + 段数行数 + 听众 + 风格 + 情绪】，AI 写出来的歌词才能直接进 Suno ✨"
                prompts={[
                  {
                    id: 'l28-song-bad',
                    label: '太模糊',
                    text: '帮我写首歌。',
                  },
                  {
                    id: 'l28-song-mid',
                    label: '说了主题',
                    text: '帮我写一首关于夏天的歌。',
                  },
                  {
                    id: 'l28-song-good',
                    label: '主题+结构+受众+风格',
                    text: `请帮我写一首要丢给 Suno 生成的中文歌歌词。要求：
- 主题：暑假和好朋友一起骑车去看夕阳
- 结构：主歌 1（4行）+ 副歌（4行，要重复出彩的一句）+ 主歌 2（4行）+ 副歌（重复）
- 听众：我的同学（10-12岁）
- 风格：流行 + 一点点民谣，活泼向上
- 韵脚要押韵
请直接输出歌词，每段前用【主歌1】【副歌】等标签，方便我贴进 Suno。`,
                  },
                ]}
                allowCustom={true}
                customLabel="✏️ 你也写一条歌词提示词"
                customPlaceholder={`换主题、换风格、换段数——看 AI 写出来的歌词差别多大`}
              />
            )}
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
                background: '#fdf2f8', borderRadius: 14, padding: '20px 22px',
                border: '1px solid #fbcfe8', marginBottom: 16
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
                {quizScore === QUIZ.length ? '完美！AI视频和音乐工具你全掌握了！' : '去做一段自己的AI视频或音乐吧！'}
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
          <h3 style={{ color: accentColor, marginTop: 0 }}>🎬 完成清单</h3>
          <p style={{ color: '#6b7280', fontSize: 14 }}>做完这些，你就有了自己的AI创作作品！</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {[
              { key: '注册', label: '注册了至少一个AI视频或音乐工具', icon: '📝' },
              { key: '生成', label: '成功生成了一段视频或一首歌', icon: '✨' },
              { key: '保存', label: '下载或保存了作品', icon: '💾' },
              { key: '分享', label: '把作品分享给了至少一位家人或朋友', icon: '📤' },
            ].map(item => (
              <label
                key={item.key}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                  background: checkedItems.includes(item.key) ? '#fdf2f8' : '#fafafa',
                  border: `2px solid ${checkedItems.includes(item.key) ? '#f9a8d4' : '#e5e7eb'}`,
                  borderRadius: 10, padding: '14px 16px', transition: 'all 0.15s'
                }}
              >
                <input
                  type="checkbox"
                  checked={checkedItems.includes(item.key)}
                  onChange={() => toggleItem(item.key)}
                  style={{ width: 18, height: 18, accentColor }}
                />
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <span style={{ fontWeight: 600, fontSize: 14, color: '#374151' }}>{item.label}</span>
              </label>
            ))}
          </div>

          {!mediaDone ? (
            <button
              onClick={() => setMediaDone(true)}
              style={{
                width: '100%', background: accentColor, color: '#fff',
                border: 'none', borderRadius: 12, padding: '16px',
                fontSize: 16, fontWeight: 700, cursor: 'pointer'
              }}
            >
              🎉 我的AI作品完成了！
            </button>
          ) : (
            <div style={{
              textAlign: 'center', padding: '30px 24px',
              background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
              borderRadius: 16, border: `2px solid ${accentColor}`
            }}>
              <div style={{ fontSize: 60 }}>🎬🎵</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: accentColor, margin: '14px 0 8px' }}>
                AI创作者！
              </div>
              <div style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.8 }}>
                你已经用AI创作了自己的视频或音乐<br />
                这可是真正的数字艺术创作！
              </div>
              <div style={{
                marginTop: 20, padding: '14px 20px', background: '#fff',
                borderRadius: 10, border: '1px solid #fbcfe8', textAlign: 'left'
              }}>
                <div style={{ fontWeight: 700, color: accentColor, marginBottom: 8 }}>🚀 挑战升级</div>
                <ul style={{ margin: 0, paddingLeft: 18, color: '#374151', fontSize: 13, lineHeight: 2 }}>
                  <li>试着把AI视频和AI音乐合在一起，做一个完整的短片</li>
                  <li>用Claude写歌词，再用Suno把它唱出来</li>
                  <li>下一课：把所有作品放进你的AI作品集，正式毕业！</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
