import { useState } from 'react'
import './Lesson.css'

const STYLES = [
  { id: 'robot', label: '🤖 机器人', desc: '用机器人的方式说话，每个字都很精确', prompt: '请用冷静、精确的机器人口吻重新表达这句话，可以加入一些科技感词汇和机械感符号，保持简短有趣。' },
  { id: 'poet', label: '📜 诗人', desc: '用诗人的方式说话，充满意境和想象', prompt: '请用充满诗意和想象力的方式重新表达这句话，语言优美，可以有比喻，像一首小诗。' },
  { id: 'detective', label: '🕵️ 侦探', desc: '用侦探的方式说话，充满悬疑感', prompt: '请用老练侦探的口吻重新表达这句话，神秘、严肃、充满推理感。' },
  { id: 'pirate', label: '🏴‍☠️ 海盗', desc: '用海盗的方式说话，豪爽又夸张', prompt: '请用豪爽海盗的方式重新表达这句话，热情、夸张、充满冒险感，可以加上海盗常用的感叹词。' },
]

const QUIZ = [
  {
    q: '在AI编程中，"输入"指的是什么？',
    options: ['AI给出的回答', '你发给AI的内容（文字、图片等）', '程序运行的速度', '代码的长度'],
    correct: 1,
    explain: '"输入"就是你提供给AI（或程序）的内容，比如你打的文字、上传的图片。就像投入到机器里的"原材料"。',
  },
  {
    q: '下面哪个例子是"输出"？',
    options: ['你在键盘上打字', 'AI根据你的问题给出的回答', '你选择的风格', '你点击发送按钮'],
    correct: 1,
    explain: '"输出"是程序处理之后返回给你的结果。AI根据你的问题给出的回答，就是AI的输出。',
  },
  {
    q: '如果把AI比作一个工厂，"处理"的过程像什么？',
    options: ['把原料运进来', '工人把原料加工成产品', '把产品送出去', '关闭工厂'],
    correct: 1,
    explain: '输入→处理→输出。"处理"就像工厂里的加工环节：把你的输入（原料）变成有用的输出（产品）。',
  },
]

export default function Lesson13({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [inputText, setInputText] = useState('')
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [aiOutput, setAiOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [history, setHistory] = useState([])
  const [speaking, setSpeaking] = useState(false)
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  const accentColor = '#6366f1'

  function speak(text) {
    if (!window.speechSynthesis || !text) return
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = 'zh-CN'
    utter.rate = 0.9
    utter.onstart = () => setSpeaking(true)
    utter.onend = () => setSpeaking(false)
    utter.onerror = () => setSpeaking(false)
    window.speechSynthesis.speak(utter)
  }

  async function handleTransform() {
    if (!inputText.trim() || !selectedStyle) return
    setLoading(true)
    setError('')
    setAiOutput('')
    const style = STYLES.find(s => s.id === selectedStyle)
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'chat',
          payload: {
            messages: [{ role: 'user', content: `${style.prompt}\n\n原句：「${inputText.trim()}」\n\n请直接给出变声后的句子，不需要解释。` }],
            subject: '变声器',
          },
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      const result = data.text || ''
      setAiOutput(result)
      setHistory(h => [{ input: inputText.trim(), style: style.label, output: result }, ...h].slice(0, 5))
      speak(result)
    } catch (e) {
      setError('AI 暂时没有响应，请稍后再试。')
    } finally {
      setLoading(false)
    }
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
        <span className="lesson-hero-badge" style={{ background: '#e0e7ff', color: '#4338ca' }}>第 13 课 · 模块 C</span>
        <span className="lesson-hero-emoji">🔄</span>
        <h1 className="lesson-hero-title">输入和输出</h1>
        <p className="lesson-hero-sub">Input & Output</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>理解"输入"和"输出"是什么</li>
          <li>知道AI如何把输入变成输出</li>
          <li>亲手做一个AI变声器小工具</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {['learn', 'do', 'ai', 'quiz', 'work'].map(t => (
          <button key={t} className={`lesson-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}
            style={tab === t ? { borderBottomColor: accentColor, color: accentColor } : {}}>
            {t === 'learn' ? '学一学' : t === 'do' ? '做一做' : t === 'ai' ? '用AI帮忙' : t === 'quiz' ? '测一测' : '我的作品'}
          </button>
        ))}
      </div>

      {tab === 'learn' && (
        <div className="lesson-content">
          <div className="lesson-section">
            <h2 className="lesson-section-title">🔄 什么是输入和输出？</h2>
            <p className="lesson-text">所有程序都遵循一个最基本的规律：</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0', flexWrap: 'wrap' }}>
              {[{ label: '输入', emoji: '📥', desc: '你给程序的内容', color: '#6366f1' },
                { label: '处理', emoji: '⚙️', desc: '程序或AI加工', color: '#8b5cf6' },
                { label: '输出', emoji: '📤', desc: '程序给你的结果', color: '#0ea5e9' }].map((item, i, arr) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ background: `${item.color}15`, border: `2px solid ${item.color}40`, borderRadius: 12, padding: '12px 18px', textAlign: 'center', minWidth: 90 }}>
                    <div style={{ fontSize: 28 }}>{item.emoji}</div>
                    <div style={{ fontWeight: 700, color: item.color, fontSize: 15 }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{item.desc}</div>
                  </div>
                  {i < arr.length - 1 && <span style={{ fontSize: 22, color: '#94a3b8' }}>→</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">💡 生活中的例子</h2>
            <div className="lesson-step-list">
              {[
                { step: '📱', title: '语音助手', desc: '输入：你说"今天天气怎么样？"→ 处理：助手联网查天气 → 输出：播报今日天气' },
                { step: '🤖', title: '问AI问题', desc: '输入：你打的问题 → 处理：AI理解并思考 → 输出：AI给你的回答' },
                { step: '🧮', title: '计算器', desc: '输入：你按的数字和符号 → 处理：数学运算 → 输出：屏幕上显示的结果' },
              ].map(s => (
                <div key={s.step} className="lesson-step-item">
                  <span className="lesson-step-num" style={{ background: accentColor, fontSize: 20 }}>{s.step}</span>
                  <div><strong>{s.title}</strong><p>{s.desc}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">🔑 今天要做什么？</h2>
            <p className="lesson-text">我们要做一个 <strong>AI变声器</strong>：你输入一句话，AI用不同的"风格"把它重新说出来。</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
              {STYLES.map(s => (
                <div key={s.id} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 10, padding: '8px 14px', fontSize: 14 }}>
                  {s.label}<br /><span style={{ color: '#94a3b8', fontSize: 12 }}>{s.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-tip-box">
            💡 <strong>关键洞察：</strong>输入决定输出！同样一句话，输入给不同风格的AI，输出就完全不同。这就是AI的魔力所在。
          </div>
        </div>
      )}

      {tab === 'do' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🎙️ 搭建你的变声器</h2>
          <p className="lesson-text">输入一句话，选择风格，看看AI如何"变声"！</p>

          <div className="l8-field">
            <label className="l8-label">📥 输入一句话（你的原句）</label>
            <input
              className="l8-input"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="比如：今天我很开心！或者：妈妈叫我去吃饭。"
              maxLength={60}
            />
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{inputText.length}/60</div>
          </div>

          <div className="l8-field">
            <label className="l8-label">⚙️ 选择变声风格（处理方式）</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginTop: 8 }}>
              {STYLES.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStyle(s.id)}
                  style={{
                    border: `2px solid ${selectedStyle === s.id ? accentColor : '#e2e8f0'}`,
                    borderRadius: 12, padding: '12px', textAlign: 'left',
                    background: selectedStyle === s.id ? `${accentColor}10` : '#fff',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{s.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            className="lesson-btn"
            style={{ background: inputText.trim() && selectedStyle ? accentColor : '#e2e8f0', color: inputText.trim() && selectedStyle ? '#fff' : '#94a3b8' }}
            disabled={!inputText.trim() || !selectedStyle || loading}
            onClick={handleTransform}
          >
            {loading ? '⚙️ AI正在变声...' : '🎙️ 变声！'}
          </button>

          {error && <div style={{ color: '#ef4444', fontSize: 14, marginTop: 12, padding: '10px 14px', background: '#fff5f5', borderRadius: 8 }}>{error}</div>}

          {aiOutput && (
            <div style={{ marginTop: 16, padding: '16px', background: `${accentColor}08`, border: `2px solid ${accentColor}30`, borderRadius: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: 13, color: accentColor, fontWeight: 600 }}>
                  📤 输出 · {STYLES.find(s => s.id === selectedStyle)?.label} 版本：
                </div>
                <button
                  onClick={() => speak(aiOutput)}
                  disabled={speaking}
                  style={{ background: speaking ? '#e2e8f0' : accentColor, color: speaking ? '#94a3b8' : '#fff', border: 'none', borderRadius: 20, padding: '5px 14px', fontSize: 13, cursor: speaking ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: 5, transition: 'all 0.2s' }}
                >
                  {speaking ? '🔊 朗读中...' : '🔊 朗读'}
                </button>
              </div>
              <div style={{ fontSize: 16, color: '#1e293b', lineHeight: 1.7 }}>{aiOutput}</div>
            </div>
          )}

          {history.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#475569', marginBottom: 8 }}>📋 变声记录</div>
              {history.map((h, i) => (
                <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '10px 14px', marginBottom: 8, fontSize: 13 }}>
                  <span style={{ color: '#94a3b8' }}>原句：</span>{h.input}
                  <span style={{ color: '#94a3b8', margin: '0 6px' }}>→</span>
                  <span style={{ color: accentColor }}>{h.style}</span>
                  <div style={{ marginTop: 4, color: '#1e293b' }}>{h.output}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'ai' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🤖 AI帮你理解输入输出</h2>
          <p className="lesson-text">在"做一做"里，你已经直接体验了AI变声器！这里分享一个更强的提问技巧：</p>

          <div className="ai-prompt-card">
            <div className="ai-prompt-title">📋 让AI解释任何程序的输入输出</div>
            <div className="ai-prompt-body">
              我是一个10岁的小学生，正在学编程。<br /><br />
              请帮我分析这个程序/工具的输入和输出：<br />
              <strong>工具名称：</strong>[比如：翻译软件]<br /><br />
              请用这个格式告诉我：<br />
              - 输入：用户需要提供什么？<br />
              - 处理：程序在做什么？<br />
              - 输出：用户最终得到什么？<br /><br />
              请用简单的语言解释，举一个具体例子。
            </div>
          </div>

          <div className="lesson-tip-box" style={{ marginTop: 16 }}>
            <strong>试试这些例子：</strong>
            <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
              <li>分析"搜索引擎"的输入和输出</li>
              <li>分析"天气App"的输入和输出</li>
              <li>分析"图像识别AI"的输入和输出</li>
            </ul>
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
                {quizScore === 3 ? '🎉 全对！你已经掌握了输入输出的核心概念！' : quizScore === 2 ? '👍 答对两题，继续加油！' : '💪 再去"学一学"复习一下，然后回来挑战！'}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'work' && (
        <div className="lesson-content">
          <div className="certificate">
            <div className="certificate-title">🔄 AI变声器 · 完成！</div>
            <div className="certificate-name">输入 → 处理 → 输出</div>
            <div className="certificate-sub">第 13 课 · 模块 C · AI 项目实践</div>
            <div style={{ fontSize: 14, color: '#93c5fd', margin: '16px 0', lineHeight: 1.8 }}>
              你学会了程序最核心的概念：<br />
              <strong style={{ color: '#bfdbfe' }}>输入 → 处理 → 输出</strong><br />
              你亲手做了一个AI变声器，<br />
              同样的输入，不同的处理方式，产生不同的输出！
            </div>
            <div style={{ fontSize: 24, letterSpacing: 4 }}>⭐⭐⭐</div>
          </div>

          {history.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={{ fontWeight: 600, color: '#475569', marginBottom: 10 }}>📋 我的变声记录：</div>
              {history.map((h, i) => (
                <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '10px 14px', marginBottom: 8, fontSize: 13 }}>
                  <strong>原句：</strong>{h.input}<br />
                  <strong>风格：</strong>{h.style}<br />
                  <strong>输出：</strong>{h.output}
                </div>
              ))}
            </div>
          )}

          <div className="lesson-next-preview" style={{ marginTop: 16 }}>
            <div className="lesson-next-title">🚀 下一课预告：第 14 课 · 做一个问答小工具</div>
            <p>你将用AI做一个真正的知识问答工具——选话题、问问题、得答案，像一个随身携带的AI老师！</p>
          </div>
        </div>
      )}
    </div>
  )
}
