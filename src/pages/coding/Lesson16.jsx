import { useState } from 'react'
import './Lesson.css'

const BUGGY_EXAMPLES = [
  {
    id: 1,
    title: '按钮点了没反应',
    code: `<button onclick="sayHello()">打招呼</button>
<script>
  function sayHello {
    alert("你好！")
  }
</script>`,
    error: 'SyntaxError: Missing parentheses in call to function',
    bugs: [
      { line: 2, desc: '函数定义缺少括号', wrong: 'function sayHello {', right: 'function sayHello() {' },
    ],
    hint: '定义函数时，函数名后面必须有一对括号 ()，即使没有参数也不能省略。',
  },
  {
    id: 2,
    title: '颜色改不了',
    code: `<div stile="color: red;">
  这段文字应该是红色的
</div>`,
    error: '页面显示正常但文字颜色没变化，也没有报错',
    bugs: [
      { line: 0, desc: '属性名拼错了', wrong: 'stile=', right: 'style=' },
    ],
    hint: '这种错误叫"拼写错误"（typo），浏览器不认识 stile，就忽略了它。检查单词拼写！',
  },
  {
    id: 3,
    title: '图片显示不出来',
    code: `<img src="my photo.jpg" alt="我的照片">`,
    error: '图片区域显示错误图标，找不到图片',
    bugs: [
      { line: 0, desc: '文件名中间有空格', wrong: '"my photo.jpg"', right: '"my-photo.jpg" 或 "my_photo.jpg"' },
    ],
    hint: '文件名中的空格会让浏览器找不到文件！给文件命名时，用连字符 - 或下划线 _ 代替空格。',
  },
]

const BUG_TYPES = [
  { id: 'syntax', label: '语法错误', emoji: '❌', desc: '代码写法不对，程序直接不能运行', example: '函数缺少括号、引号没关上' },
  { id: 'typo', label: '拼写错误', emoji: '🔤', desc: '单词打错了，程序看不懂你在说什么', example: 'stile 写成 style、colur 写成 color' },
  { id: 'logic', label: '逻辑错误', emoji: '🤔', desc: '代码能运行，但结果不是你想要的', example: '加法写成了减法，条件判断反了' },
  { id: 'path', label: '路径错误', emoji: '🗺️', desc: '找不到文件或图片', example: '文件名拼错、路径写错了' },
]

const QUIZ = [
  {
    q: '遇到报错时，最正确的第一反应是？',
    options: ['关掉电脑重来', '仔细读报错信息，找到提示的位置', '删掉所有代码', '换一个项目'],
    correct: 1,
    explain: '报错信息就是程序给你的"线索"！仔细读，找到文件名和行号，就能快速定位问题。',
  },
  {
    q: '下面哪种情况属于"逻辑错误"？',
    options: ['程序直接报错崩溃', '程序能运行，但计算2+2得到了5', '找不到图片文件', '函数名写错了'],
    correct: 1,
    explain: '逻辑错误最难发现——程序能跑，但结果不对。需要你仔细想想"代码是不是做了正确的事"。',
  },
  {
    q: '用AI帮你找Bug时，哪种描述最有帮助？',
    options: ['"我的代码坏了"', '"这段代码有个Bug，不知道在哪"', '"这段代码报错：TypeError，第5行，请帮我找原因"', '"AI你最棒，帮我修好"'],
    correct: 2,
    explain: '给AI提供具体信息：错误类型、行号、你期望的结果。越具体，AI给的答案越有帮助！',
  },
]

export default function Lesson16({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [selectedExample, setSelectedExample] = useState(null)
  const [revealedBugs, setRevealedBugs] = useState({})
  const [fixedExamples, setFixedExamples] = useState({})

  // AI debug state
  const [bugDesc, setBugDesc] = useState('')
  const [bugCode, setBugCode] = useState('')
  const [aiExplanation, setAiExplanation] = useState('')
  const [loadingAi, setLoadingAi] = useState(false)
  const [aiError, setAiError] = useState('')

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  const accentColor = '#f59e0b'
  const fixedCount = Object.keys(fixedExamples).length

  function handleRevealBug(exId) {
    setRevealedBugs(r => ({ ...r, [exId]: true }))
  }

  function handleMarkFixed(exId) {
    setFixedExamples(f => ({ ...f, [exId]: true }))
  }

  async function handleAiDebug() {
    if (!bugDesc.trim()) return
    setLoadingAi(true)
    setAiError('')
    setAiExplanation('')

    const prompt = `我是一个10-12岁的编程学习者，我的代码遇到了问题，请帮我分析。

问题描述：${bugDesc.trim()}
${bugCode.trim() ? `\n相关代码：\n\`\`\`\n${bugCode.trim()}\n\`\`\`` : ''}

请帮我：
1. 用简单语言解释这个错误可能是什么
2. 最可能的原因是什么
3. 如何修复（给出简单步骤）

请用友善、鼓励的语气，不超过150字。`

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ type: 'chat', payload: { messages: [{ role: 'user', content: prompt }], subject: 'Debug助手' } }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setAiExplanation(data.text || '')
    } catch {
      setAiError('AI暂时没有响应，请稍后再试。')
    } finally {
      setLoadingAi(false)
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

  const example = BUGGY_EXAMPLES.find(e => e.id === selectedExample)

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回课程列表</button>

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#fef3c7', color: '#b45309' }}>第 16 课 · 模块 C</span>
        <span className="lesson-hero-emoji">🐛</span>
        <h1 className="lesson-hero-title">学会改 Bug</h1>
        <p className="lesson-hero-sub">Debug Like a Pro</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>不再害怕程序报错</li>
          <li>学会读懂常见错误信息</li>
          <li>用AI帮你找到并修复Bug</li>
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
            <h2 className="lesson-section-title">🐛 Bug 是什么？</h2>
            <p className="lesson-text">Bug 就是程序里的错误。就像一篇作文里有错别字，Bug 是代码里的"错误"。<strong>所有程序员</strong>——不管多厉害——都会写出 Bug。区别是：高手能快速找到并修复它。</p>
            <div className="lesson-tip-box">
              💪 <strong>重要心态：</strong>报错不是失败，是程序在告诉你"这里有问题，我帮你找到了！" 把报错当成朋友。
            </div>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">📚 常见的 Bug 类型</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginTop: 12 }}>
              {BUG_TYPES.map(bt => (
                <div key={bt.id} style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: 12, padding: '12px 14px' }}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{bt.emoji}</div>
                  <div style={{ fontWeight: 700, color: '#b45309', fontSize: 14 }}>{bt.label}</div>
                  <div style={{ color: '#78350f', fontSize: 12, margin: '4px 0' }}>{bt.desc}</div>
                  <div style={{ fontSize: 11, color: '#92400e', background: '#fef3c7', borderRadius: 6, padding: '4px 8px' }}>例：{bt.example}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-section">
            <h2 className="lesson-section-title">🔍 Debug 的三步法</h2>
            <div className="lesson-step-list">
              {[
                { step: '1', title: '读报错信息', desc: '找到"Error"后面的关键词和行号，这是最重要的线索' },
                { step: '2', title: '找到出错的地方', desc: '根据行号，去那行代码看看有没有拼错、少写、多写的地方' },
                { step: '3', title: '修复并测试', desc: '改完后重新运行，如果还有问题，重复前两步' },
              ].map(s => (
                <div key={s.step} className="lesson-step-item">
                  <span className="lesson-step-num" style={{ background: accentColor }}>{s.step}</span>
                  <div><strong>{s.title}</strong><p>{s.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'do' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🔍 Bug 侦探训练</h2>
          <p className="lesson-text">下面有 3 段有 Bug 的代码，你能找到错误在哪吗？</p>

          {!selectedExample ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
              {BUGGY_EXAMPLES.map(ex => (
                <button key={ex.id} onClick={() => setSelectedExample(ex.id)}
                  style={{ border: `2px solid ${fixedExamples[ex.id] ? '#10b981' : '#fde68a'}`, borderRadius: 14, padding: '14px 16px', textAlign: 'left', background: fixedExamples[ex.id] ? '#f0fdf4' : '#fffbeb', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>案例 {ex.id}：{ex.title}</span>
                    </div>
                    {fixedExamples[ex.id] ? <span style={{ color: '#10b981', fontSize: 13, fontWeight: 700 }}>✓ 已修复</span> : <span style={{ color: '#f59e0b', fontSize: 13 }}>→ 点击查看</span>}
                  </div>
                </button>
              ))}
              {fixedCount === BUGGY_EXAMPLES.length && (
                <div style={{ background: '#f0fdf4', border: '2px solid #86efac', borderRadius: 12, padding: '16px', textAlign: 'center', marginTop: 8 }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>🎉</div>
                  <div style={{ fontWeight: 700, color: '#15803d' }}>全部 Bug 修复完成！你是 Bug 侦探！</div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <button onClick={() => setSelectedExample(null)} style={{ fontSize: 13, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 12, textDecoration: 'underline' }}>← 返回案例列表</button>

              <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 8, fontSize: 16 }}>案例 {example.id}：{example.title}</div>

              <div style={{ background: '#1e293b', borderRadius: 10, padding: '14px 16px', fontFamily: 'monospace', fontSize: 13, color: '#e2e8f0', lineHeight: 1.8, marginBottom: 12, overflowX: 'auto' }}>
                {example.code.split('\n').map((line, i) => (
                  <div key={i} style={{ color: example.bugs.some(b => b.line === i) && revealedBugs[example.id] ? '#fbbf24' : '#e2e8f0' }}>
                    <span style={{ color: '#475569', marginRight: 12, userSelect: 'none' }}>{i + 1}</span>{line}
                  </div>
                ))}
              </div>

              <div style={{ background: '#fff5f5', border: '1.5px solid #fca5a5', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#ef4444', marginBottom: 14 }}>
                <strong>报错信息：</strong> {example.error}
              </div>

              {!revealedBugs[example.id] ? (
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="lesson-btn" style={{ background: accentColor, flex: 1 }} onClick={() => handleRevealBug(example.id)}>
                    🔍 揭示 Bug！
                  </button>
                </div>
              ) : (
                <div>
                  {example.bugs.map((bug, i) => (
                    <div key={i} style={{ background: '#fffbeb', border: '2px solid #fde68a', borderRadius: 12, padding: '14px 16px', marginBottom: 10 }}>
                      <div style={{ fontWeight: 700, color: '#b45309', marginBottom: 8 }}>🐛 发现 Bug：{bug.desc}</div>
                      <div style={{ fontSize: 13, fontFamily: 'monospace', marginBottom: 4 }}>
                        <span style={{ color: '#ef4444' }}>✗ 错误：</span><code style={{ background: '#fee2e2', padding: '2px 6px', borderRadius: 4 }}>{bug.wrong}</code>
                      </div>
                      <div style={{ fontSize: 13, fontFamily: 'monospace', marginBottom: 8 }}>
                        <span style={{ color: '#10b981' }}>✓ 正确：</span><code style={{ background: '#dcfce7', padding: '2px 6px', borderRadius: 4 }}>{bug.right}</code>
                      </div>
                      <div style={{ fontSize: 12, color: '#78350f', background: '#fef3c7', borderRadius: 8, padding: '8px 10px' }}>💡 {example.hint}</div>
                    </div>
                  ))}
                  {!fixedExamples[example.id] ? (
                    <button className="lesson-btn" style={{ background: '#10b981' }} onClick={() => { handleMarkFixed(example.id); setSelectedExample(null) }}>
                      ✅ 我明白了，标记为已修复！
                    </button>
                  ) : (
                    <div style={{ color: '#10b981', fontWeight: 700, textAlign: 'center', padding: 10 }}>✓ 已修复！</div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {tab === 'ai' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🤖 让AI帮你找Bug</h2>
          <p className="lesson-text">遇到自己找不到的 Bug？告诉 AI！描述越具体，AI帮你越快。</p>

          <div className="l8-field">
            <label className="l8-label">📝 描述你遇到的问题 *</label>
            <textarea
              style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: 10, padding: '10px 14px', fontSize: 14, fontFamily: 'inherit', minHeight: 80, resize: 'vertical', boxSizing: 'border-box', outline: 'none' }}
              value={bugDesc}
              onChange={e => setBugDesc(e.target.value)}
              placeholder={'比如：我的按钮点了没有反应，控制台显示：TypeError: sayHello is not a function'}
              maxLength={300}
            />
          </div>

          <div className="l8-field">
            <label className="l8-label">💻 粘贴出问题的代码（可选）</label>
            <textarea
              style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: 10, padding: '10px 14px', fontSize: 13, fontFamily: 'monospace', minHeight: 80, resize: 'vertical', boxSizing: 'border-box', outline: 'none', background: '#f8fafc' }}
              value={bugCode}
              onChange={e => setBugCode(e.target.value)}
              placeholder={'粘贴有问题的那段代码...'}
              maxLength={500}
            />
          </div>

          <button className="lesson-btn" style={{ background: bugDesc.trim() ? accentColor : '#e2e8f0', color: bugDesc.trim() ? '#fff' : '#94a3b8' }}
            disabled={!bugDesc.trim() || loadingAi} onClick={handleAiDebug}>
            {loadingAi ? '🔍 AI正在分析...' : '🐛 AI帮我找Bug！'}
          </button>

          {aiError && <div style={{ color: '#ef4444', fontSize: 13, marginTop: 10, padding: '8px 12px', background: '#fff5f5', borderRadius: 8 }}>{aiError}</div>}

          {aiExplanation && (
            <div style={{ marginTop: 14, padding: '16px', background: '#fffbeb', border: '2px solid #fde68a', borderRadius: 12 }}>
              <div style={{ fontSize: 13, color: accentColor, fontWeight: 600, marginBottom: 8 }}>🤖 AI的分析：</div>
              <div style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{aiExplanation}</div>
            </div>
          )}

          <div className="ai-prompt-card" style={{ marginTop: 20 }}>
            <div className="ai-prompt-title">📋 高效Debug提问模板</div>
            <div className="ai-prompt-body">
              我的代码遇到了问题，请帮我分析：<br /><br />
              <strong>报错信息：</strong>[粘贴错误提示]<br />
              <strong>出错位置：</strong>第[X]行<br />
              <strong>我期望的结果：</strong>[想要发生什么]<br />
              <strong>实际发生的：</strong>[实际发生了什么]<br /><br />
              代码：<br />
              [粘贴出问题的代码]<br /><br />
              请用简单语言告诉我错误原因和修复方法。
            </div>
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
                {quizScore === 3 ? '🎉 全对！你已经是Debug高手了！' : quizScore === 2 ? '👍 答对两题，继续加油！' : '💪 回去"学一学"看看Debug技巧，再来！'}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'work' && (
        <div className="lesson-content">
          <div className="certificate">
            <div className="certificate-title">🐛 Bug 侦探 · 认证！</div>
            <div className="certificate-name">
              {fixedCount === 3 ? '完美！修复了全部 3 个 Bug' : `修复了 ${fixedCount} / 3 个 Bug`}
            </div>
            <div className="certificate-sub">第 16 课 · 模块 C · AI 项目实践</div>
            <div style={{ fontSize: 14, color: '#93c5fd', margin: '16px 0', lineHeight: 1.8 }}>
              你学会了：<br />
              <strong style={{ color: '#bfdbfe' }}>读报错 → 找位置 → 分析原因 → 修复</strong><br />
              从今天开始，Bug 再也不会让你害怕了！
            </div>
            <div style={{ fontSize: 24, letterSpacing: 4 }}>⭐⭐⭐</div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 600, color: '#475569', marginBottom: 10 }}>📋 修复记录：</div>
            {BUGGY_EXAMPLES.map(ex => (
              <div key={ex.id} style={{ background: fixedExamples[ex.id] ? '#f0fdf4' : '#f8fafc', border: `1px solid ${fixedExamples[ex.id] ? '#86efac' : '#e2e8f0'}`, borderRadius: 10, padding: '10px 14px', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: '#1e293b' }}>案例 {ex.id}：{ex.title}</span>
                <span style={{ fontSize: 13, color: fixedExamples[ex.id] ? '#10b981' : '#94a3b8', fontWeight: 600 }}>
                  {fixedExamples[ex.id] ? '✓ 已修复' : '○ 未完成'}
                </span>
              </div>
            ))}
          </div>

          <div className="lesson-next-preview" style={{ marginTop: 16 }}>
            <div className="lesson-next-title">🚀 下一课预告：第 17 课 · 让作品升级</div>
            <p>你已经会做作品、会修Bug。下一步，学会给作品加新功能、一次次升级——这就是真正的迭代！</p>
          </div>
        </div>
      )}
    </div>
  )
}
