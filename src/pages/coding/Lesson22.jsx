import { useState } from 'react'
import './Lesson.css'

const DEVICE_BADGE = (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
    <span style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>📱 手机</span>
    <span style={{ background: '#e0e7ff', color: '#4338ca', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>🖥️ iPad</span>
    <span style={{ background: '#dcfce7', color: '#15803d', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>💻 电脑</span>
    <span style={{ background: '#fdf2f8', color: '#9d174d', fontSize: 11, padding: '4px 10px', borderRadius: 999 }}>🎨 去即梦/可灵等平台生成，本课负责教你写提示词</span>
  </div>
)

const STYLE_WORDS = [
  { group: '✨ 风格', options: ['水彩画风格', '油画质感', '二次元动漫', '中国工笔画', '写实照片', '赛博朋克', '童话插画', '素描线稿'] },
  { group: '🌈 色调', options: ['温暖橙色调', '冷蓝色调', '粉彩柔和', '对比强烈', '黑白灰', '金色光线', '霓虹灯光', '自然光'] },
  { group: '🎥 构图', options: ['正面特写', '俯视角', '广角全景', '侧面轮廓', '对称构图', '近大远小'] },
  { group: '⚡ 画质', options: ['超高清细节', '8K画质', '精细纹理', '梦幻朦胧', '电影级光影'] },
]

const SUBJECT_IDEAS = [
  '一只猫', '一条龙', '一座城堡', '一个小女孩', '一只机器人', '一朵花',
  '一片森林', '一艘飞船', '一只狐狸', '一个超级英雄',
]

const SCENE_IDEAS = [
  '在星空下', '在大海边', '在樱花树林里', '在古代城市', '在未来都市',
  '在云端', '在魔法学院', '在深海里', '在沙漠绿洲', '在月球上',
]

const PLATFORMS = [
  {
    name: '即梦',
    url: 'jimeng.jianying.com',
    emoji: '✨',
    color: '#6366f1',
    tag: '国内推荐',
    tagColor: '#4338ca',
    desc: '字节跳动出品，中文提示词效果极好，新手首选',
    steps: ['打开 jimeng.jianying.com', '用抖音/头条账号登录', '点击"文生图"', '粘贴你的提示词', '点击生成，等待几秒'],
  },
  {
    name: '可灵',
    url: 'klingai.com',
    emoji: '🎬',
    color: '#f97316',
    tag: '国内 · 图+视频',
    tagColor: '#c2410c',
    desc: '快手出品，图片和视频都能生成，效果很好',
    steps: ['打开 klingai.com', '用手机号注册登录', '选择"图片生成"', '输入你的提示词', '选择比例，点击生成'],
  },
  {
    name: 'Midjourney',
    url: 'midjourney.com',
    emoji: '🌊',
    color: '#8b5cf6',
    tag: '国际 · 最强画质',
    tagColor: '#7c3aed',
    desc: '全球公认最强画质，推荐英文提示词，按月付费',
    steps: ['需能访问国际网络', '打开 midjourney.com', '用邮箱注册', '在Discord里使用/imagine命令', '英文描述你的画面'],
  },
]

const PROMPT_STRUCTURE = [
  { step: '1', label: '主体', color: '#6366f1', placeholder: '画什么？', eg: '一只银色狐狸' },
  { step: '2', label: '场景', color: '#ec4899', placeholder: '在哪里？', eg: '站在冰雪森林中' },
  { step: '3', label: '风格', color: '#10b981', placeholder: '什么风格？', eg: '水彩画风格' },
  { step: '4', label: '细节', color: '#f59e0b', placeholder: '特别要求？', eg: '银色毛发，温暖金光，超清晰' },
]

const QUIZ = [
  {
    q: '对于国内用户来说，最推荐的入门画图AI是？',
    options: ['Midjourney（最强但复杂）', '即梦（简单、中文好、免费多）', 'DALL-E（需ChatGPT Plus）', '三个都一样'],
    correct: 1,
    explain: '即梦是国内用户的首选！无需科学上网、中文提示词直接用、免费额度足够练习、操作简单。',
  },
  {
    q: '以下哪个画图提示词写得最好？',
    options: ['画一只猫', '一只白猫，在雨中的窗台上，水彩风格，温暖室内光线透过窗户，超高清', '漂亮的图片', '猫咪图'],
    correct: 1,
    explain: '好提示词包含主体（白猫）、场景（雨中窗台）、风格（水彩）、光线（室内光）和细节（超高清）。越具体越好！',
  },
  {
    q: 'AI画图时，英文提示词和中文提示词的区别是？',
    options: ['英文一定比中文好', '中文一定比英文好', '国内工具中文好，Midjourney英文更强', '没有任何区别'],
    correct: 2,
    explain: '即梦/可灵等国内工具专门优化了中文，用中文就很好！Midjourney是国际工具，英文理解更准确。',
  },
]

export default function Lesson22({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [subject, setSubject] = useState('')
  const [scene, setScene] = useState('')
  const [selectedStyles, setSelectedStyles] = useState([])
  const [customStyle, setCustomStyle] = useState('')
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)
  const [myPlatform, setMyPlatform] = useState(null)
  const [selectedPlatform, setSelectedPlatform] = useState(null)

  const accentColor = '#10b981'

  function toggleStyle(style) {
    setSelectedStyles(s => s.includes(style) ? s.filter(x => x !== style) : [...s, style])
  }

  const builtPrompt = [
    subject.trim() || null,
    scene.trim() || null,
    ...selectedStyles,
    customStyle.trim() || null,
  ].filter(Boolean).join('，')

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

  const platformDetail = PLATFORMS.find(p => p.name === selectedPlatform)

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回课程列表</button>

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#dcfce7', color: '#14532d' }}>第 22 课 · 模块 F · 动手体验</span>
        <span className="lesson-hero-emoji">🖼️</span>
        <h1 className="lesson-hero-title">用 AI 画一张图</h1>
        <p className="lesson-hero-sub">Draw with AI — 用文字描述，让AI给你画出来</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>学会写出高质量的绘画提示词</li>
          <li>用即梦/可灵等平台生成你设计的图</li>
          <li>理解风格词、细节词如何影响生成结果</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {['learn', 'builder', 'platform', 'quiz', 'work'].map(t => (
          <button key={t} className={`lesson-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}
            style={tab === t ? { borderBottomColor: accentColor, color: accentColor } : {}}>
            {t === 'learn' ? '学一学' : t === 'builder' ? '写提示词' : t === 'platform' ? '去哪画' : t === 'quiz' ? '测一测' : '我的作品'}
          </button>
        ))}
      </div>

      {tab === 'learn' && (
        <div className="lesson-content">
          {DEVICE_BADGE}
          <div className="lesson-section">
            <h2 className="lesson-section-title">🖼️ 用文字"画"出一张图</h2>
            <p className="lesson-text">AI画图（文生图）就是：你用文字描述你想要的图片，AI自动生成出来。不用会画画，只要会描述。提示词写得越具体，出来的图越符合你的想象。</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
              {[
                { label: '❌ 弱提示词', text: '一只猫', result: '随机风格的普通猫咪', bad: true },
                { label: '✅ 强提示词', text: '一只白色波斯猫，坐在雨天的咖啡馆窗台上，水彩插画风格，温暖橙色室内光，超高清细节', result: '梦幻、细腻、有氛围的猫咪插画', bad: false },
              ].map((ex, i) => (
                <div key={i} style={{ background: ex.bad ? '#fff5f5' : '#f0fdf4', border: `1.5px solid ${ex.bad ? '#fca5a5' : '#86efac'}`, borderRadius: 12, padding: '12px 14px' }}>
                  <div style={{ fontWeight: 700, color: ex.bad ? '#b91c1c' : '#15803d', marginBottom: 6, fontSize: 14 }}>{ex.label}</div>
                  <div style={{ fontFamily: 'monospace', fontSize: 13, color: '#1e293b', marginBottom: 6, background: '#fff', padding: '6px 10px', borderRadius: 8 }}>"{ex.text}"</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>→ 结果：{ex.result}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">🧱 提示词的结构</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
              {PROMPT_STRUCTURE.map(s => (
                <div key={s.step} style={{ display: 'flex', gap: 12, alignItems: 'center', background: '#f8fafc', borderRadius: 10, padding: '10px 12px' }}>
                  <div style={{ background: s.color, color: '#fff', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{s.step}</div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontWeight: 700, color: s.color }}>{s.label}</span>
                    <span style={{ fontSize: 12, color: '#64748b', marginLeft: 8 }}>{s.placeholder}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#475569', background: '#fff', borderRadius: 6, padding: '3px 8px' }}>例：{s.eg}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-tip-box">
            💡 <strong>小技巧：</strong>用逗号分隔每个要素。中文直接用中文（即梦/可灵），Midjourney推荐英文效果更好。
          </div>
        </div>
      )}

      {tab === 'builder' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🔧 提示词构建器</h2>
          <p className="lesson-text">一步步填写，构建你的专属画图提示词：</p>

          <div className="l8-field">
            <label className="l8-label">🎭 第一步：主体（画什么？）</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
              {SUBJECT_IDEAS.map(s => (
                <button key={s} onClick={() => setSubject(s)}
                  style={{ padding: '5px 10px', borderRadius: 999, border: `1.5px solid ${subject === s ? '#6366f1' : '#e2e8f0'}`, background: subject === s ? '#eef2ff' : '#f8fafc', color: subject === s ? '#4338ca' : '#475569', fontSize: 12, cursor: 'pointer' }}>
                  {s}
                </button>
              ))}
            </div>
            <input
              style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: 8, padding: '8px 12px', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }}
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="或者自己写，比如：一只戴眼镜的小熊"
            />
          </div>

          <div className="l8-field">
            <label className="l8-label">🌍 第二步：场景（在哪里？）</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
              {SCENE_IDEAS.map(s => (
                <button key={s} onClick={() => setScene(s)}
                  style={{ padding: '5px 10px', borderRadius: 999, border: `1.5px solid ${scene === s ? '#ec4899' : '#e2e8f0'}`, background: scene === s ? '#fdf2f8' : '#f8fafc', color: scene === s ? '#9d174d' : '#475569', fontSize: 12, cursor: 'pointer' }}>
                  {s}
                </button>
              ))}
            </div>
            <input
              style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: 8, padding: '8px 12px', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }}
              value={scene}
              onChange={e => setScene(e.target.value)}
              placeholder="或者自己写，比如：在冰封的城堡屋顶"
            />
          </div>

          <div className="l8-field">
            <label className="l8-label">🎨 第三步：风格 + 细节（多选）</label>
            {STYLE_WORDS.map(group => (
              <div key={group.group} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>{group.group}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {group.options.map(opt => (
                    <button key={opt} onClick={() => toggleStyle(opt)}
                      style={{ padding: '5px 10px', borderRadius: 999, border: `1.5px solid ${selectedStyles.includes(opt) ? accentColor : '#e2e8f0'}`, background: selectedStyles.includes(opt) ? '#f0fdf4' : '#f8fafc', color: selectedStyles.includes(opt) ? '#14532d' : '#475569', fontSize: 12, cursor: 'pointer', fontWeight: selectedStyles.includes(opt) ? 700 : 400 }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <input
              style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: 8, padding: '8px 12px', fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', marginTop: 6 }}
              value={customStyle}
              onChange={e => setCustomStyle(e.target.value)}
              placeholder="自定义细节，比如：月光洒落、金色粒子飘散"
            />
          </div>

          <div style={{ background: builtPrompt ? '#f0fdf4' : '#f8fafc', border: `2px solid ${builtPrompt ? accentColor : '#e2e8f0'}`, borderRadius: 14, padding: '14px 16px', marginTop: 8 }}>
            <div style={{ fontSize: 13, color: accentColor, fontWeight: 700, marginBottom: 8 }}>🎯 你的提示词（可直接复制到画图平台）：</div>
            <div style={{ fontSize: 15, color: builtPrompt ? '#1e293b' : '#94a3b8', lineHeight: 1.8, minHeight: 40, whiteSpace: 'pre-wrap' }}>
              {builtPrompt || '← 在上方填写后，提示词会自动出现'}
            </div>
          </div>

          {builtPrompt && (
            <div style={{ marginTop: 12, background: '#dcfce7', border: '1.5px solid #86efac', borderRadius: 10, padding: '12px 14px', fontSize: 13, color: '#15803d', fontWeight: 600 }}>
              ✅ 提示词准备好了！去"去哪画"选一个平台，把它粘贴进去！
            </div>
          )}
        </div>
      )}

      {tab === 'platform' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🎨 选一个平台去画图</h2>
          <p className="lesson-text">点击平台查看入门步骤，把你的提示词粘贴进去！</p>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {PLATFORMS.map(p => (
              <button key={p.name} onClick={() => setSelectedPlatform(p.name === selectedPlatform ? null : p.name)}
                style={{ padding: '8px 14px', borderRadius: 999, border: `2px solid ${selectedPlatform === p.name ? p.color : '#e2e8f0'}`, background: selectedPlatform === p.name ? p.color + '15' : '#fff', color: p.color, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                {p.emoji} {p.name}
              </button>
            ))}
          </div>

          {platformDetail && (
            <div style={{ background: '#f8fafc', border: `2px solid ${platformDetail.color}40`, borderRadius: 14, padding: '16px' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 26 }}>{platformDetail.emoji}</span>
                <div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, color: platformDetail.color, fontSize: 18 }}>{platformDetail.name}</span>
                    <span style={{ background: platformDetail.tagColor + '20', color: platformDetail.tagColor, fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 999 }}>{platformDetail.tag}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{platformDetail.url}</div>
                </div>
              </div>

              <p style={{ fontSize: 13, color: '#334155', marginBottom: 14, lineHeight: 1.6 }}>{platformDetail.desc}</p>

              <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 10, fontSize: 14 }}>🪜 入门步骤：</div>
              {platformDetail.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                  <div style={{ background: platformDetail.color, color: '#fff', borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.6, paddingTop: 3 }}>{step}</div>
                </div>
              ))}

              {builtPrompt && (
                <div style={{ background: '#fff', border: `1.5px dashed ${platformDetail.color}60`, borderRadius: 10, padding: '10px 12px', marginTop: 10 }}>
                  <div style={{ fontSize: 12, color: platformDetail.color, fontWeight: 700, marginBottom: 6 }}>📋 你的提示词（直接复制）：</div>
                  <div style={{ fontSize: 13, color: '#1e293b', lineHeight: 1.7 }}>{builtPrompt}</div>
                </div>
              )}
            </div>
          )}

          {!selectedPlatform && (
            <div style={{ textAlign: 'center', padding: '30px 20px', color: '#94a3b8', fontSize: 14 }}>
              ↑ 点击平台名称，查看入门步骤
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
                {quizScore === 3 ? '🎉 全对！AI画图达人！' : quizScore === 2 ? '👍 不错！快去画一张！' : '💪 回去"学一学"复习提示词结构！'}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'work' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🎨 我要去画！</h2>
          <p className="lesson-text">选你最想去的画图平台：</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {PLATFORMS.map(p => (
              <button key={p.name} onClick={() => setMyPlatform(p.name)}
                style={{ border: `2.5px solid ${myPlatform === p.name ? p.color : '#e2e8f0'}`, borderRadius: 14, padding: '12px 14px', textAlign: 'left', background: myPlatform === p.name ? p.color + '12' : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{p.emoji}</span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 700, color: p.color }}>{p.name}</span>
                  <span style={{ marginLeft: 6, background: p.tagColor + '20', color: p.tagColor, fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 999 }}>{p.tag}</span>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{p.desc.slice(0, 30)}...</div>
                </div>
                {myPlatform === p.name && <span style={{ color: p.color, fontWeight: 700, fontSize: 18 }}>✓</span>}
              </button>
            ))}
          </div>

          {myPlatform && (
            <div className="certificate">
              <div className="certificate-title">🖼️ AI画图！出发！</div>
              <div className="certificate-name">
                {PLATFORMS.find(p => p.name === myPlatform)?.emoji} {myPlatform}
              </div>
              <div className="certificate-sub">第 22 课 · 模块 F · 动手体验</div>
              <div style={{ fontSize: 14, color: '#93c5fd', margin: '16px 0', lineHeight: 1.8 }}>
                今天学会了：<br />
                <strong style={{ color: '#bfdbfe' }}>主体 + 场景 + 风格 + 细节 = 好图</strong>
              </div>
              <div style={{ fontSize: 24, letterSpacing: 4 }}>⭐⭐⭐</div>
            </div>
          )}

          {builtPrompt && (
            <div style={{ marginTop: 14, background: '#f0fdf4', border: '2px solid #86efac', borderRadius: 12, padding: '14px' }}>
              <div style={{ fontSize: 13, color: accentColor, fontWeight: 700, marginBottom: 6 }}>✏️ 你在本课写好的提示词：</div>
              <div style={{ fontSize: 14, color: '#1e293b', fontStyle: 'italic', lineHeight: 1.7 }}>{builtPrompt}</div>
            </div>
          )}

          <div className="lesson-next-preview" style={{ marginTop: 16 }}>
            <div className="lesson-next-title">🚀 下一课预告：第 23 课 · 用AI帮你做一件事</div>
            <p>写完了、画完了，下一步用AI帮你做一件真实的事！学会把大任务拆成小步骤，让AI一步步陪你完成。</p>
          </div>
        </div>
      )}
    </div>
  )
}
