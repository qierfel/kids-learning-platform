import { useState } from 'react'
import './Lesson.css'
import PromptCompareLab from './PromptCompareLab'

const DEVICE_BADGE = (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
    <span style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>📱 手机</span>
    <span style={{ background: '#e0e7ff', color: '#4338ca', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>🖥️ iPad</span>
    <span style={{ background: '#dcfce7', color: '#15803d', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>💻 电脑</span>
    <span style={{ background: '#f1f5f9', color: '#475569', fontSize: 11, padding: '4px 10px', borderRadius: 999 }}>📍 三种设备都可以完成本课</span>
  </div>
)

const AI_TOOLS = [
  {
    id: 'doubaob',
    name: '豆包',
    maker: '字节跳动（国内）',
    emoji: '🫘',
    color: '#6366f1',
    bg: '#eef2ff',
    tag: '国内 · 无需翻墙',
    tagColor: '#4338ca',
    strengths: ['中文理解极强', '对话自然流畅', '手机端体验好', '支持语音输入'],
    weakness: '国内工具中较新，某些专业任务不如Claude/GPT强',
    bestFor: '日常聊天、写作、解答问题、朗读',
    access: '简单',
    accessColor: '#10b981',
  },
  {
    id: 'kimi',
    name: 'Kimi',
    maker: '月之暗面（国内）',
    emoji: '🌙',
    color: '#8b5cf6',
    bg: '#faf5ff',
    tag: '国内 · 无需翻墙',
    tagColor: '#7c3aed',
    strengths: ['超长文本处理（读PDF/长文章）', '信息提取准确', '总结归纳能力强', '联网搜索'],
    weakness: '创意写作能力相比稍弱',
    bestFor: '读长文档、信息整理、联网查资料',
    access: '简单',
    accessColor: '#10b981',
  },
  {
    id: 'tongyi',
    name: '通义千问',
    maker: '阿里巴巴（国内）',
    emoji: '☁️',
    color: '#f97316',
    bg: '#fff7ed',
    tag: '国内 · 无需翻墙',
    tagColor: '#c2410c',
    strengths: ['多模态（图文音视频）', '与阿里生态联动', '代码辅助', '数学推理'],
    weakness: '功能全但各项不算最顶尖',
    bestFor: '图片理解、代码、有阿里账号的用户',
    access: '简单',
    accessColor: '#10b981',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    maker: 'OpenAI（国际）',
    emoji: '🤖',
    color: '#10b981',
    bg: '#f0fdf4',
    tag: '国际 · 需要网络条件',
    tagColor: '#047857',
    strengths: ['全球用户最多', '插件生态丰富', '代码能力强', '支持GPT-4多模态'],
    weakness: '需要网络条件，免费版有限制',
    bestFor: '编程、专业问答、英文任务',
    access: '需要条件',
    accessColor: '#f59e0b',
  },
  {
    id: 'claude',
    name: 'Claude',
    maker: 'Anthropic（国际）',
    emoji: '🌿',
    color: '#f59e0b',
    bg: '#fffbeb',
    tag: '国际 · 需要网络条件',
    tagColor: '#b45309',
    strengths: ['创意写作极强', '代码质量高', '逻辑分析准确', '长文本理解出色'],
    weakness: '需要网络条件，无搜索功能',
    bestFor: '创作、编程、分析、复杂推理',
    access: '需要条件',
    accessColor: '#f59e0b',
  },
]

const PROMPT_TEMPLATES = [
  { label: '让AI介绍自己', prompt: '你好！用100字内自我介绍，说说你能帮我做什么，语气活泼一点。' },
  { label: '让AI帮我写一段话', prompt: '帮我写一段关于"努力学习"的励志短句，要好听且适合10岁孩子，不超过50字。' },
  { label: '让AI讲个笑话', prompt: '给我讲一个适合小学生的关于猫咪的笑话，要让人真的笑出来！' },
  { label: '让AI帮我解释概念', prompt: '用小学生能懂的语言，解释一下"人工智能"是什么，不超过80字。' },
]

const QUIZ = [
  {
    q: '想用AI帮你整理一份10页的阅读材料，哪个工具最合适？',
    options: ['ChatGPT（担心超字数）', 'Kimi（长文本处理超强）', '豆包（语音更好）', 'Claude（创意更好）'],
    correct: 1,
    explain: 'Kimi专门擅长处理超长文本！读PDF、整理长文章是它最强的技能之一。',
  },
  {
    q: '国内聊天AI（豆包/Kimi等）最大的优点是？',
    options: ['功能最强大', '无需特殊网络条件、中文体验好', '价格最便宜', '可以生成图片'],
    correct: 1,
    explain: '国内工具最大优势：无需科学上网，中文理解自然，注册简单，适合所有家庭！',
  },
  {
    q: '向AI提问时，哪种方式更容易得到好答案？',
    options: ['说"帮我写东西"', '说"帮我写一段关于友谊的50字短句，语气温暖"', '"AI你好厉害，随便写点吧"', '"我想要一些文字"'],
    correct: 1,
    explain: '描述越具体（主题、字数、语气），AI给出的结果越符合你的需求！含糊的问题得到含糊的答案。',
  },
]

export default function Lesson18({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [selectedTool, setSelectedTool] = useState(null)
  const [chatInput, setChatInput] = useState('')
  const [chatResult, setChatResult] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const [chatError, setChatError] = useState('')
  const [usedTemplate, setUsedTemplate] = useState(null)
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)
  const [favoriteTool, setFavoriteTool] = useState(null)

  const accentColor = '#6366f1'
  const toolDetail = AI_TOOLS.find(t => t.id === selectedTool)

  async function handleChat() {
    if (!chatInput.trim()) return
    setChatLoading(true)
    setChatError('')
    setChatResult('')
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ type: 'chat', payload: { messages: [{ role: 'user', content: chatInput.trim() }], subject: '聊天AI体验' } }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setChatResult(data.text || '')
    } catch {
      setChatError('AI暂时没有响应，请稍后再试。')
    } finally {
      setChatLoading(false)
    }
  }

  function handleTemplate(t) {
    setChatInput(t.prompt)
    setUsedTemplate(t.label)
    setChatResult('')
    setChatError('')
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

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#e0e7ff', color: '#3730a3' }}>第 18 课 · 模块 E · 工具大全</span>
        <span className="lesson-hero-emoji">💬</span>
        <h1 className="lesson-hero-title">会聊天的 AI</h1>
        <p className="lesson-hero-sub">Conversational AI — 认识最强聊天AI，亲手试一试</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>认识豆包、Kimi、通义、ChatGPT、Claude五大聊天AI</li>
          <li>知道每个AI最擅长做什么，怎么选</li>
          <li>亲手用嵌入式Claude对话，感受AI的能力</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {['learn', 'compare', 'try', 'quiz', 'work'].map(t => (
          <button key={t} className={`lesson-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}
            style={tab === t ? { borderBottomColor: accentColor, color: accentColor } : {}}>
            {t === 'learn' ? '学一学' : t === 'compare' ? '对比工具' : t === 'try' ? '亲手试' : t === 'quiz' ? '测一测' : '我的最爱'}
          </button>
        ))}
      </div>

      {tab === 'learn' && (
        <div className="lesson-content">
          {DEVICE_BADGE}
          <div className="lesson-section">
            <h2 className="lesson-section-title">💬 什么是聊天AI？</h2>
            <p className="lesson-text">聊天AI（也叫"大语言模型"）就是能和你对话的人工智能。你问它问题，它给你回答。你让它写文章，它帮你写。你跟它聊天，它也会陪你聊！现在全世界有很多这样的AI，各有各的本领。</p>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">🏆 认识五大聊天AI</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
              {AI_TOOLS.map(t => (
                <div key={t.id} style={{ background: t.bg, border: `1.5px solid ${t.color}30`, borderRadius: 14, padding: '12px 14px', display: 'flex', gap: 12 }}>
                  <span style={{ fontSize: 26, flexShrink: 0 }}>{t.emoji}</span>
                  <div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontWeight: 800, color: t.color, fontSize: 15 }}>{t.name}</span>
                      <span style={{ background: t.tagColor + '20', color: t.tagColor, fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 999 }}>{t.tag}</span>
                    </div>
                    <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.6 }}>
                      <strong>最适合：</strong>{t.bestFor}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-tip-box">
            💡 <strong>核心策略：</strong>国内AI随时用（豆包/Kimi都很好）；有国际网络条件的再加上ChatGPT和Claude，双线组合最强！
          </div>
        </div>
      )}

      {tab === 'compare' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🔍 点击工具，查看详细对比</h2>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {AI_TOOLS.map(t => (
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
                <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 8, fontSize: 14 }}>✅ 四大强项：</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {toolDetail.strengths.map((s, i) => (
                    <div key={i} style={{ background: '#fff', border: `1px solid ${toolDetail.color}30`, borderRadius: 8, padding: '8px 10px', fontSize: 13, color: '#1e293b' }}>
                      <span style={{ color: toolDetail.color }}>● </span>{s}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: 10, padding: '10px 12px', fontSize: 13, color: '#64748b', marginBottom: 12 }}>
                <strong>相对不足：</strong>{toolDetail.weakness}
              </div>

              <div style={{ background: '#fff', borderRadius: 10, padding: '10px 12px', fontSize: 13, marginBottom: 10 }}>
                <strong style={{ color: toolDetail.color }}>🎯 最适合：</strong> {toolDetail.bestFor}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, color: '#64748b' }}>访问难度：</span>
                <span style={{ background: toolDetail.accessColor + '20', color: toolDetail.accessColor, fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>{toolDetail.access}</span>
              </div>
            </div>
          )}

          {!selectedTool && (
            <div style={{ textAlign: 'center', padding: '30px 20px', color: '#94a3b8', fontSize: 14 }}>
              ↑ 点击工具名称，查看详细对比
            </div>
          )}
        </div>
      )}

      {tab === 'try' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🌿 亲手和AI对话！</h2>
          <p className="lesson-text">下面接入的是 Claude AI。选一个模板快速开始，或者直接写你想问的！</p>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#475569', marginBottom: 8 }}>📋 快速模板（点击填入）：</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {PROMPT_TEMPLATES.map(t => (
                <button key={t.label} onClick={() => handleTemplate(t)}
                  style={{ padding: '7px 12px', borderRadius: 999, border: `1.5px solid ${usedTemplate === t.label ? accentColor : '#e2e8f0'}`, background: usedTemplate === t.label ? '#eef2ff' : '#f8fafc', color: usedTemplate === t.label ? accentColor : '#64748b', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="l8-field">
            <label className="l8-label">✏️ 你想对AI说什么？</label>
            <textarea
              style={{ width: '100%', border: `2px solid ${chatInput ? accentColor + '60' : '#e2e8f0'}`, borderRadius: 10, padding: '10px 14px', fontSize: 14, fontFamily: 'inherit', minHeight: 90, resize: 'vertical', boxSizing: 'border-box', outline: 'none', transition: 'border-color 0.2s' }}
              value={chatInput}
              onChange={e => { setChatInput(e.target.value); setUsedTemplate(null) }}
              placeholder="随便问它什么！比如：帮我讲个笑话，或者你能做什么？"
              maxLength={300}
            />
          </div>

          <button className="lesson-btn" style={{ background: chatInput.trim() ? accentColor : '#e2e8f0', color: chatInput.trim() ? '#fff' : '#94a3b8' }}
            disabled={!chatInput.trim() || chatLoading} onClick={handleChat}>
            {chatLoading ? '💬 AI正在回复...' : '🚀 发送给AI！'}
          </button>

          {chatError && <div style={{ color: '#ef4444', fontSize: 13, marginTop: 10, padding: '8px 12px', background: '#fff5f5', borderRadius: 8 }}>{chatError}</div>}

          {chatResult && (
            <div style={{ marginTop: 14, padding: '16px', background: '#eef2ff', border: '2px solid #c7d2fe', borderRadius: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>🌿</span>
                <span style={{ fontSize: 13, color: accentColor, fontWeight: 700 }}>Claude 的回复：</span>
              </div>
              <div style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>{chatResult}</div>
              <button onClick={() => { setChatResult(''); setChatInput('') }} style={{ marginTop: 10, fontSize: 12, color: '#94a3b8', background: 'none', border: '1px solid #e2e8f0', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>
                再问一次
              </button>
            </div>
          )}

          <div className="ai-prompt-card" style={{ marginTop: 20 }}>
            <div className="ai-prompt-title">💡 让AI回答得更好的小技巧</div>
            <div className="ai-prompt-body">
              <strong>说清楚你想要什么：</strong><br />
              ✗ 帮我写东西<br />
              ✓ 帮我写一段关于"友情"的50字短句，温暖一点<br /><br />
              <strong>告诉AI你的情况：</strong><br />
              ✓ 我是小学生，用简单的话解释...<br /><br />
              <strong>限定长度和格式：</strong><br />
              ✓ 不超过100字 / 用列表方式 / 给3个例子
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <h2 className="lesson-section-title">🔬 对比实验：同一个问题，三种问法</h2>
            <p className="lesson-text">同一个想法，用三种不同方式问 AI——结果差很多！点按钮看 AI 真实回答的对比：</p>
            <PromptCompareLab
              prompts={[
                { id: 'vague', label: '模糊问法', text: '解释一下人工智能', tone: 'weak' },
                { id: 'context', label: '加了情境', text: '我是小学生，用简单的话解释一下人工智能是什么', tone: 'medium' },
                { id: 'precise', label: '完整提示词', text: '我是10岁小学生，请用我能听懂的话解释"人工智能"是什么。要求：1) 用一个生活中的比喻； 2) 给一个具体例子； 3) 不超过80字。', tone: 'strong' },
              ]}
              subject="聊天AI体验"
              accent={accentColor}
              hint="加上身份、要求、字数后，AI 的回答会马上变得更贴合你需要！"
              intro="同一件事，问得越具体，AI 越能给你真正想要的答案："
              allowCustom
              customLabel="✏️ 用你自己的方式问 AI"
              customPlaceholder="试试加上：你是谁、想要什么、字数限制"
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
                {quizScore === 3 ? '🎉 全对！你是聊天AI专家！' : quizScore === 2 ? '👍 不错！继续探索更多AI！' : '💪 回去"对比工具"看一看，再来！'}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'work' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">⭐ 我最喜欢的聊天AI</h2>
          <p className="lesson-text">今天认识了5个聊天AI，你最喜欢哪个？</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {AI_TOOLS.map(t => (
              <button key={t.id} onClick={() => setFavoriteTool(t.id)}
                style={{ border: `2.5px solid ${favoriteTool === t.id ? t.color : '#e2e8f0'}`, borderRadius: 14, padding: '12px 14px', textAlign: 'left', background: favoriteTool === t.id ? t.bg : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{t.emoji}</span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 700, color: t.color }}>{t.name}</span>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>最适合：{t.bestFor.slice(0, 20)}...</div>
                </div>
                {favoriteTool === t.id && <span style={{ color: t.color, fontWeight: 700, fontSize: 18 }}>♥</span>}
              </button>
            ))}
          </div>

          {favoriteTool && (
            <div className="certificate">
              <div className="certificate-title">💬 AI对话达人！</div>
              <div className="certificate-name">
                我最喜欢：{AI_TOOLS.find(t => t.id === favoriteTool)?.emoji} {AI_TOOLS.find(t => t.id === favoriteTool)?.name}
              </div>
              <div className="certificate-sub">第 18 课 · 模块 E · 工具大全</div>
              <div style={{ fontSize: 14, color: '#93c5fd', margin: '16px 0', lineHeight: 1.8 }}>
                今天认识了5个聊天AI，还亲手用了Claude！<br />
                <strong style={{ color: '#bfdbfe' }}>会问问题的人，才是会用AI的人</strong>
              </div>
              <div style={{ fontSize: 24, letterSpacing: 4 }}>⭐⭐⭐</div>
            </div>
          )}

          {chatResult && (
            <div style={{ marginTop: 14, padding: '14px', background: '#eef2ff', border: '1.5px solid #c7d2fe', borderRadius: 12 }}>
              <div style={{ fontSize: 13, color: accentColor, fontWeight: 600, marginBottom: 6 }}>💬 你今天和AI聊了什么（来自"亲手试"）：</div>
              <div style={{ fontSize: 13, color: '#1e293b', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{chatResult.slice(0, 200)}{chatResult.length > 200 ? '...' : ''}</div>
            </div>
          )}

          <div className="lesson-next-preview" style={{ marginTop: 16 }}>
            <div className="lesson-next-title">🚀 下一课预告：第 19 课 · 会画画的AI</div>
            <p>聊天AI认识了，下一步认识会画画的AI！即梦、可灵、Midjourney——用一句话描述，就能让AI帮你画出来！</p>
          </div>
        </div>
      )}
    </div>
  )
}
