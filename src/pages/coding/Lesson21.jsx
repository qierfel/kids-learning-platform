import { useState } from 'react'
import './Lesson.css'

const DEVICE_BADGE = (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
    <span style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>📱 手机</span>
    <span style={{ background: '#e0e7ff', color: '#4338ca', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>🖥️ iPad</span>
    <span style={{ background: '#dcfce7', color: '#15803d', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>💻 电脑</span>
    <span style={{ background: '#faf5ff', color: '#7c3aed', fontSize: 11, padding: '4px 10px', borderRadius: 999 }}>📍 三种设备都支持，本课已内置AI写作</span>
  </div>
)

const PROMPT_PAIRS = [
  {
    id: 'weak',
    label: '弱提示词',
    prompt: '帮我写一段话',
    issue: '太模糊了——AI不知道写什么主题、什么风格、给谁看、多长',
  },
  {
    id: 'medium',
    label: '中等提示词',
    prompt: '帮我写一段关于友情的话',
    issue: '好一些，但还缺少：语气、字数、对象、用途',
  },
  {
    id: 'strong',
    label: '强提示词',
    prompt: '帮我写一段关于友情的话，写给我的好朋友，语气温暖真诚，不超过60字，适合在生日贺卡里用',
    issue: null,
  },
]

const WRITING_SCENES = [
  { id: 'birthday', label: '🎂 生日祝福', template: '帮我写一段生日祝福，送给我的[同学/朋友/家人]，语气温暖有趣，不超过60字，像真朋友说话那种感觉' },
  { id: 'intro', label: '👋 自我介绍', template: '帮我写一段自我介绍，我叫[名字]，[年级]学生，喜欢[爱好]，想展示我的[特点]。语气自信活泼，不超过80字' },
  { id: 'story', label: '📖 故事开头', template: '帮我写一个故事的开头，主角是[人/动物/机器人]，发生在[地方]，氛围[温暖/神秘/冒险]，不超过100字，要吸引人继续读' },
  { id: 'review', label: '⭐ 书/电影感想', template: '我看了[书名/电影名]，感觉[印象最深的地方]。帮我写一段读后感，语气真实，像学生写的，不超过100字' },
  { id: 'custom', label: '✏️ 我自己写', template: '' },
]

const QUIZ = [
  {
    q: '让AI写出好文字，最关键的是什么？',
    options: ['用最复杂的词汇', '提示词要说清楚主题、对象、语气、字数', '请求越短越好', '用英文提示词'],
    correct: 1,
    explain: '好提示词 = 主题 + 对象 + 语气 + 字数 + 用途。信息越具体，AI给出的文字越贴合你的需求！',
  },
  {
    q: '"帮我写一段话"和"帮我写一段给好友的60字生日祝福，语气轻松"——哪个提示词更好？',
    options: ['第一个，简单更好', '第二个，描述具体', '两个一样', '都不好'],
    correct: 1,
    explain: '第二个！主题（生日祝福）、对象（好友）、字数（60字）、语气（轻松）都说清楚了，AI才能写出你真正想要的内容。',
  },
  {
    q: 'AI写出来的文字，你应该怎么对待？',
    options: ['直接用，不用改', '完全不用，自己写', '当成草稿，理解后按需修改', '全部背下来'],
    correct: 2,
    explain: 'AI的文字是"初稿"，你要读懂它，按自己的想法修改，加入你自己的感情和语气。这才是正确用AI的方式！',
  },
]

export default function Lesson21({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [selectedScene, setSelectedScene] = useState(null)
  const [customPrompt, setCustomPrompt] = useState('')
  const [filledPrompt, setFilledPrompt] = useState('')
  const [aiResult, setAiResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [aiError, setAiError] = useState('')
  const [comparedResult, setComparedResult] = useState({})
  const [compareLoading, setCompareLoading] = useState(null)
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  const accentColor = '#8b5cf6'

  async function fetchAI(prompt, key) {
    if (key) {
      setCompareLoading(key)
    } else {
      setLoading(true)
      setAiError('')
      setAiResult('')
    }
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ type: 'chat', payload: { messages: [{ role: 'user', content: prompt }], subject: 'AI写作' } }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      if (key) {
        setComparedResult(r => ({ ...r, [key]: data.text || '' }))
      } else {
        setAiResult(data.text || '')
      }
    } catch {
      if (!key) setAiError('AI暂时没有响应，请稍后再试。')
    } finally {
      if (key) setCompareLoading(null)
      else setLoading(false)
    }
  }

  function handleSceneSelect(scene) {
    setSelectedScene(scene.id)
    if (scene.id !== 'custom') {
      setFilledPrompt(scene.template)
    } else {
      setFilledPrompt('')
    }
    setAiResult('')
    setAiError('')
  }

  function handleWrite() {
    const prompt = selectedScene === 'custom' ? customPrompt : filledPrompt
    if (!prompt.trim()) return
    fetchAI(prompt.trim(), null)
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

  const activePrompt = selectedScene === 'custom' ? customPrompt : filledPrompt
  const scene = WRITING_SCENES.find(s => s.id === selectedScene)

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回课程列表</button>

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#ede9fe', color: '#4c1d95' }}>第 21 课 · 模块 F · 动手体验</span>
        <span className="lesson-hero-emoji">✍️</span>
        <h1 className="lesson-hero-title">用 AI 写一段话</h1>
        <p className="lesson-hero-sub">Write with AI — 感受提示词的力量</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>知道好提示词和坏提示词有什么区别</li>
          <li>用内置AI写出一段真实有用的文字</li>
          <li>学会把AI的输出变成自己的作品</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {['learn', 'compare', 'write', 'quiz', 'work'].map(t => (
          <button key={t} className={`lesson-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}
            style={tab === t ? { borderBottomColor: accentColor, color: accentColor } : {}}>
            {t === 'learn' ? '学一学' : t === 'compare' ? '对比实验' : t === 'write' ? '动手写' : t === 'quiz' ? '测一测' : '我的作品'}
          </button>
        ))}
      </div>

      {tab === 'learn' && (
        <div className="lesson-content">
          {DEVICE_BADGE}
          <div className="lesson-section">
            <h2 className="lesson-section-title">✍️ 为什么AI写的好坏差这么多？</h2>
            <p className="lesson-text">AI写出来的文字质量，90%取决于你怎么问它。同样是让AI写东西，提示词写得好，出来的内容可能让人惊艳；写得随意，出来的可能是废话。区别就在：你有没有说清楚你要什么。</p>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">📊 三种提示词，三种结果</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
              {PROMPT_PAIRS.map((p, i) => (
                <div key={p.id} style={{ background: p.issue ? (i === 0 ? '#fff5f5' : '#fffbeb') : '#f0fdf4', border: `1.5px solid ${p.issue ? (i === 0 ? '#fca5a5' : '#fde68a') : '#86efac'}`, borderRadius: 12, padding: '12px 14px' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 18 }}>{p.issue ? (i === 0 ? '❌' : '⚠️') : '✅'}</span>
                    <span style={{ fontWeight: 700, color: p.issue ? (i === 0 ? '#b91c1c' : '#b45309') : '#15803d', fontSize: 14 }}>{p.label}</span>
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: 13, background: '#fff', borderRadius: 8, padding: '8px 12px', color: '#1e293b', marginBottom: p.issue ? 8 : 0 }}>
                    "{p.prompt}"
                  </div>
                  {p.issue && (
                    <div style={{ fontSize: 12, color: i === 0 ? '#b91c1c' : '#92400e' }}>
                      ⚠️ 问题：{p.issue}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">🏗️ 好提示词的4个要素</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
              {[
                { icon: '🎯', label: '主题', desc: '写什么内容', eg: '生日祝福/自我介绍' },
                { icon: '👤', label: '对象/用途', desc: '给谁看/用在哪', eg: '好朋友/贺卡里用' },
                { icon: '🎭', label: '语气风格', desc: '什么感觉', eg: '温暖/轻松/正式' },
                { icon: '📏', label: '字数限制', desc: '写多长', eg: '不超过60字' },
              ].map(item => (
                <div key={item.label} style={{ background: '#faf5ff', border: '1.5px solid #d8b4fe', borderRadius: 12, padding: '12px' }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
                  <div style={{ fontWeight: 800, color: accentColor, fontSize: 14 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: '#64748b', margin: '4px 0' }}>{item.desc}</div>
                  <div style={{ fontSize: 11, background: '#ede9fe', borderRadius: 6, padding: '3px 8px', color: '#5b21b6' }}>例：{item.eg}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'compare' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🔬 对比实验：同一件事，不同提示词</h2>
          <p className="lesson-text">点击下面的按钮，让AI用三种不同的提示词生成内容，亲眼看差别！</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
            {PROMPT_PAIRS.map((p, i) => (
              <div key={p.id} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                  <div>
                    <span style={{ fontWeight: 700, color: '#1e293b', fontSize: 14 }}>{p.issue ? (i === 0 ? '❌' : '⚠️') : '✅'} {p.label}</span>
                    <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#475569', marginTop: 4, background: '#f1f5f9', borderRadius: 6, padding: '4px 8px' }}>
                      "{p.prompt.slice(0, 40)}{p.prompt.length > 40 ? '...' : ''}"
                    </div>
                  </div>
                  <button onClick={() => fetchAI(p.prompt, p.id)}
                    disabled={compareLoading === p.id}
                    style={{ flexShrink: 0, padding: '6px 12px', background: accentColor, color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                    {compareLoading === p.id ? '生成中...' : '生成'}
                  </button>
                </div>
                {comparedResult[p.id] && (
                  <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 12px', fontSize: 13, color: '#1e293b', lineHeight: 1.8 }}>
                    {comparedResult[p.id]}
                  </div>
                )}
              </div>
            ))}
          </div>

          {Object.keys(comparedResult).length === 3 && (
            <div style={{ marginTop: 14, background: '#f0fdf4', border: '2px solid #86efac', borderRadius: 12, padding: '14px', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, color: '#15803d' }}>👀 看到区别了吗？强提示词的效果明显更好！</div>
            </div>
          )}
        </div>
      )}

      {tab === 'write' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">✏️ 选一个场景，动手写！</h2>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {WRITING_SCENES.map(s => (
              <button key={s.id} onClick={() => handleSceneSelect(s)}
                style={{ padding: '8px 12px', borderRadius: 999, border: `2px solid ${selectedScene === s.id ? accentColor : '#e2e8f0'}`, background: selectedScene === s.id ? '#faf5ff' : '#f8fafc', color: selectedScene === s.id ? accentColor : '#475569', fontSize: 13, fontWeight: selectedScene === s.id ? 700 : 400, cursor: 'pointer' }}>
                {s.label}
              </button>
            ))}
          </div>

          {selectedScene && selectedScene !== 'custom' && (
            <div className="l8-field">
              <label className="l8-label">📝 你的提示词（可以修改里面的 [括号] 部分）：</label>
              <textarea
                style={{ width: '100%', border: `2px solid ${accentColor}40`, borderRadius: 10, padding: '10px 14px', fontSize: 14, fontFamily: 'inherit', minHeight: 100, resize: 'vertical', boxSizing: 'border-box', outline: 'none' }}
                value={filledPrompt}
                onChange={e => setFilledPrompt(e.target.value)}
                maxLength={400}
              />
            </div>
          )}

          {selectedScene === 'custom' && (
            <div className="l8-field">
              <label className="l8-label">✏️ 用好提示词的4要素，写出你的提示词：</label>
              <textarea
                style={{ width: '100%', border: `2px solid ${accentColor}40`, borderRadius: 10, padding: '10px 14px', fontSize: 14, fontFamily: 'inherit', minHeight: 100, resize: 'vertical', boxSizing: 'border-box', outline: 'none' }}
                value={customPrompt}
                onChange={e => setCustomPrompt(e.target.value)}
                placeholder="记住：主题 + 对象/用途 + 语气 + 字数限制"
                maxLength={400}
              />
            </div>
          )}

          {selectedScene && (
            <button className="lesson-btn" style={{ background: activePrompt.trim() ? accentColor : '#e2e8f0', color: activePrompt.trim() ? '#fff' : '#94a3b8' }}
              disabled={!activePrompt.trim() || loading} onClick={handleWrite}>
              {loading ? '✍️ AI正在写...' : '🚀 让AI来写！'}
            </button>
          )}

          {aiError && <div style={{ color: '#ef4444', fontSize: 13, marginTop: 10, padding: '8px 12px', background: '#fff5f5', borderRadius: 8 }}>{aiError}</div>}

          {aiResult && (
            <div style={{ marginTop: 14, padding: '16px', background: '#faf5ff', border: '2px solid #d8b4fe', borderRadius: 12 }}>
              <div style={{ fontSize: 13, color: accentColor, fontWeight: 700, marginBottom: 8 }}>✍️ AI写的内容：</div>
              <div style={{ fontSize: 15, color: '#1e293b', lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>{aiResult}</div>
              <div style={{ marginTop: 12, fontSize: 12, color: '#94a3b8' }}>
                💡 觉得不满意？修改提示词再试试，或者在下方告诉AI怎么改。
              </div>
              <button onClick={() => { setAiResult(''); setAiError('') }}
                style={{ marginTop: 8, fontSize: 12, color: accentColor, background: 'none', border: `1px solid ${accentColor}`, borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>
                重新生成
              </button>
            </div>
          )}

          {!selectedScene && (
            <div style={{ textAlign: 'center', padding: '30px 20px', color: '#94a3b8', fontSize: 14 }}>
              ↑ 先选一个写作场景
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
                {quizScore === 3 ? '🎉 全对！你是AI写作高手！' : quizScore === 2 ? '👍 不错！继续磨练提示词！' : '💪 回去"学一学"看4个要素！'}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'work' && (
        <div className="lesson-content">
          <div className="certificate">
            <div className="certificate-title">✍️ AI写作达人！</div>
            <div className="certificate-name">
              {aiResult ? `完成了：${scene?.label || '自定义写作'}` : '去"动手写"完成一段文字！'}
            </div>
            <div className="certificate-sub">第 21 课 · 模块 F · 动手体验</div>
            <div style={{ fontSize: 14, color: '#93c5fd', margin: '16px 0', lineHeight: 1.8 }}>
              今天学会了：<br />
              <strong style={{ color: '#bfdbfe' }}>主题 + 对象 + 语气 + 字数 = 好文字</strong>
            </div>
            <div style={{ fontSize: 24, letterSpacing: 4 }}>⭐⭐⭐</div>
          </div>

          {aiResult && (
            <div style={{ marginTop: 14, padding: '16px', background: '#faf5ff', border: '2px solid #d8b4fe', borderRadius: 12 }}>
              <div style={{ fontSize: 13, color: accentColor, fontWeight: 700, marginBottom: 8 }}>📄 我用AI写的：</div>
              <div style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>{aiResult}</div>
            </div>
          )}

          <div className="lesson-next-preview" style={{ marginTop: 16 }}>
            <div className="lesson-next-title">🚀 下一课预告：第 22 课 · 用AI画一张图</div>
            <p>写了文字，下一步用AI画出你的图！学会写绘画提示词，去即梦/可灵这些平台，把脑海里的画面变成真实的图片。</p>
          </div>
        </div>
      )}
    </div>
  )
}
