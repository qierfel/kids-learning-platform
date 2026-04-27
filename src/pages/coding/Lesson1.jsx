import { useState } from 'react'
import './Lesson.css'

const AI_OR_NOT = [
  { emoji: '🎵', label: '智能音乐推荐', isAI: true, explain: '对！音乐App会分析你的听歌习惯，推荐你喜欢的歌曲，这就是AI在工作。' },
  { emoji: '💡', label: '普通电灯开关', isAI: false, explain: '电灯开关按下就亮，关掉就灭，只有固定的规则，不会"学习"，不是AI。' },
  { emoji: '🤳', label: '人脸解锁手机', isAI: true, explain: '对！手机用AI识别你的脸，和存储的数据对比，判断是不是机主。' },
  { emoji: '📟', label: '普通计算器', isAI: false, explain: '计算器只会执行固定计算，不会学习，不会根据经验改变——不是AI。' },
  { emoji: '🚗', label: '自动驾驶汽车', isAI: true, explain: '对！自动驾驶需要AI识别道路、行人、标志，并不断从驾驶数据中学习。' },
  { emoji: '🌡️', label: '温度计', isAI: false, explain: '温度计只是测量温度，没有"学习"能力，是普通工具，不是AI。' },
  { emoji: '💬', label: '微信语音转文字', isAI: true, explain: '对！将语音转换为文字需要AI理解人类语音，是自然语言处理的典型应用。' },
  { emoji: '⏰', label: '闹钟定时器', isAI: false, explain: '闹钟按设定时间响铃，只执行固定指令，不会学习或改变行为。' },
]

const QUIZ = [
  {
    q: 'AI 和普通程序最大的区别是什么？',
    options: ['AI 运行速度更快', 'AI 能从数据中学习和改进', 'AI 需要更多电力', 'AI 只能在手机上使用'],
    correct: 1,
    explain: 'AI 最核心的特点是能从数据中"学习"，根据经验不断改进，而不是只执行固定规则。',
  },
  {
    q: '下面哪个最能体现 AI 的"学习"能力？',
    options: ['计算 2+2=4', '每次答题后越来越准确', '播放用户点的歌', '显示当前时间'],
    correct: 1,
    explain: '答题后越来越准确，说明系统在从错误中学习改进——这正是机器学习的核心！',
  },
  {
    q: '"人工智能"的英文缩写是？',
    options: ['IA', 'IT', 'AI', 'ML'],
    correct: 2,
    explain: 'AI 是 Artificial Intelligence 的缩写，Artificial 意思是"人工的"，Intelligence 意思是"智能"。',
  },
]

const AI_BUILD_OPTIONS = {
  sense: ['看图片', '听声音', '读文字'],
  data: ['很多照片', '很多录音', '很多聊天记录'],
  task: ['认出是什么', '判断心情', '给出推荐'],
}

export default function Lesson1({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [answers, setAnswers] = useState({}) // { idx: true/false }
  const [sense, setSense] = useState(AI_BUILD_OPTIONS.sense[0])
  const [dataType, setDataType] = useState(AI_BUILD_OPTIONS.data[0])
  const [task, setTask] = useState(AI_BUILD_OPTIONS.task[0])
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  function handleAIGuess(idx, guess) {
    if (answers[idx] !== undefined) return
    setAnswers(prev => ({ ...prev, [idx]: guess }))
  }

  function handleQuizAnswer(optIdx) {
    if (quizAnswer !== null) return
    const correct = optIdx === QUIZ[quizIdx].correct
    setQuizAnswer({ optIdx, correct })
    if (correct) setQuizScore(s => s + 1)
  }

  function nextQuestion() {
    if (quizIdx + 1 >= QUIZ.length) {
      setQuizDone(true)
    } else {
      setQuizIdx(i => i + 1)
      setQuizAnswer(null)
    }
  }

  const allAIAnswered = Object.keys(answers).length >= AI_OR_NOT.length

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回课程列表</button>

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#e0e7ff', color: '#4338ca' }}>第 1 课</span>
        <span className="lesson-hero-emoji">🤖</span>
        <h1 className="lesson-hero-title">认识 AI</h1>
        <p className="lesson-hero-sub">Hello, Artificial Intelligence!</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>理解人工智能（AI）是什么</li>
          <li>知道生活中哪些地方用到了AI</li>
          <li>区分AI和普通程序的不同</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {[['learn', '📖 学一学'], ['play', '🎮 做一做'], ['ai', '🤖 用AI帮忙'], ['quiz', '✅ 测一测'], ['work', '🌟 本课输出']].map(([id, label]) => (
          <button
            key={id}
            className={`lesson-tab ${tab === id ? 'active' : ''}`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── 学一学 ── */}
      {tab === 'learn' && (
        <>
          <div className="lesson-section">
            <div className="lesson-section-title">🌟 什么是 AI？</div>
            <div className="lesson-card">
              <p className="lesson-text">
                <strong>人工智能（AI）</strong>就是让计算机像人一样"聪明"——能看、能听、能理解、能做决定。
              </p>
              <div className="lesson-highlight">
                💡 关键词："人工"= 人类制造，"智能"= 能学习和解决问题
              </div>
              <p className="lesson-text">
                普通程序只会执行固定的指令，比如：按下按钮→播放音乐。而 AI 能从<strong>数据和经验</strong>中学习，越用越聪明！
              </p>
            </div>
          </div>

          <div className="lesson-section">
            <div className="lesson-section-title">🏠 生活中的 AI</div>
            <div className="example-grid">
              {[
                { emoji: '🗣️', label: '语音助手', desc: '小爱、Siri 听懂你说话' },
                { emoji: '📱', label: '人脸识别', desc: '手机看到你就解锁' },
                { emoji: '🎮', label: '游戏AI', desc: '电脑对手越来越强' },
                { emoji: '🛒', label: '购物推荐', desc: '猜你喜欢什么商品' },
                { emoji: '🎵', label: '音乐推荐', desc: '了解你的音乐口味' },
                { emoji: '🚗', label: '自动驾驶', desc: '汽车自己认路开车' },
              ].map(item => (
                <div key={item.label} className="example-item">
                  <div className="example-item-emoji">{item.emoji}</div>
                  <div className="example-item-label">{item.label}</div>
                  <div className="example-item-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-section">
            <div className="lesson-section-title">🔍 AI 如何工作？</div>
            <div className="lesson-card">
              <p className="lesson-text">AI 工作分三步：</p>
              {[
                { num: '1', title: '收集数据', desc: '看大量照片、听大量声音、读大量文字' },
                { num: '2', title: '学习规律', desc: '从数据中找到规律，就像你做了很多练习题' },
                { num: '3', title: '做出判断', desc: '碰到新情况，用学到的规律做决定' },
              ].map(step => (
                <div key={step.num} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#6366f1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0, fontSize: '14px' }}>{step.num}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#1a1a2e', marginBottom: '2px' }}>{step.title}</div>
                    <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.5' }}>{step.desc}</div>
                  </div>
                </div>
              ))}
              <div className="lesson-tip">
                🐣 类比：就像你学骑自行车——一开始摔倒，多练几次就会了。AI 也是靠"练习"（数据）学会技能的！
              </div>
            </div>
          </div>

          <div className="lesson-section">
            <div className="lesson-section-title">🔑 本课关键词</div>
            <div className="keyword-chips">
              {['人工智能', 'AI', '机器学习', '数据', '算法', '训练'].map(w => (
                <span key={w} className="keyword-chip">{w}</span>
              ))}
            </div>
          </div>

          <div className="lesson-section">
            <button className="quiz-next-btn" onClick={() => setTab('play')}>
              继续：去玩一玩 →
            </button>
          </div>
        </>
      )}

      {/* ── 玩一玩：AI侦探 ── */}
      {tab === 'play' && (
        <>
          <div className="lesson-interactive">
            <div className="interactive-title">🕵️ AI 侦探游戏</div>
            <div className="interactive-card">
              <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px', lineHeight: '1.6' }}>
                下面每个场景，你来判断：<strong>用了 AI？</strong>还是<strong>没用 AI？</strong>
                点击按钮回答，看看你能判断对几个！
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {AI_OR_NOT.map((item, idx) => {
                  const ans = answers[idx]
                  const answered = ans !== undefined
                  const correct = ans === item.isAI
                  return (
                    <div key={idx} style={{
                      background: answered ? (correct ? '#f0fdf4' : '#fef2f2') : '#f8f9fc',
                      borderRadius: '14px',
                      padding: '14px',
                      border: `2px solid ${answered ? (correct ? '#10b981' : '#ef4444') : '#e8edf2'}`,
                      transition: 'all 0.2s',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '28px' }}>{item.emoji}</span>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e' }}>{item.label}</span>
                        {answered && <span style={{ marginLeft: 'auto', fontSize: '18px' }}>{correct ? '✅' : '❌'}</span>}
                      </div>
                      {!answered && (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleAIGuess(idx, true)}
                            style={{ flex: 1, padding: '8px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                          >
                            🤖 用了AI
                          </button>
                          <button
                            onClick={() => handleAIGuess(idx, false)}
                            style={{ flex: 1, padding: '8px', background: '#f3f4f6', color: '#555', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                          >
                            ❌ 没用AI
                          </button>
                        </div>
                      )}
                      {answered && (
                        <div style={{ fontSize: '13px', color: correct ? '#065f46' : '#991b1b', lineHeight: '1.5', marginTop: '4px' }}>
                          {item.explain}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {allAIAnswered && (
                <div style={{ marginTop: '16px', padding: '16px', background: '#fdf4ff', borderRadius: '14px', textAlign: 'center', border: '2px solid #d8b4fe' }}>
                  <div style={{ fontSize: '32px', marginBottom: '6px' }}>🎉</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#7c3aed', marginBottom: '4px' }}>
                    全部完成！你真是AI侦探！
                  </div>
                  <div style={{ fontSize: '13px', color: '#888' }}>
                    正确: {Object.entries(answers).filter(([i, a]) => a === AI_OR_NOT[+i].isAI).length} / {AI_OR_NOT.length}
                  </div>
                  <button className="quiz-next-btn" style={{ marginTop: '12px' }} onClick={() => setTab('quiz')}>
                    去测一测 →
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="lesson-section">
            <div className="lesson-section-title">🧪 第二任务：拼一个 AI 点子</div>
            <div className="lesson-card">
              <p className="lesson-text">
                现在你来当小产品设计师。给 AI 选一种“看/听/读”的能力、准备一类数据，再决定它要帮人做什么。
              </p>

              <div className="lesson-highlight">今天不只是认识 AI，还要拼出一个你自己的 AI 小点子。</div>

              <div className="example-grid">
                {AI_BUILD_OPTIONS.sense.map((item) => (
                  <button key={item} className="quiz-option" style={{ background: sense === item ? '#dbeafe' : undefined }} onClick={() => setSense(item)}>
                    {item}
                  </button>
                ))}
              </div>
              <div className="example-grid">
                {AI_BUILD_OPTIONS.data.map((item) => (
                  <button key={item} className="quiz-option" style={{ background: dataType === item ? '#dcfce7' : undefined }} onClick={() => setDataType(item)}>
                    {item}
                  </button>
                ))}
              </div>
              <div className="example-grid">
                {AI_BUILD_OPTIONS.task.map((item) => (
                  <button key={item} className="quiz-option" style={{ background: task === item ? '#fef3c7' : undefined }} onClick={() => setTask(item)}>
                    {item}
                  </button>
                ))}
              </div>

              <div className="lesson-tip">
                你的 AI 点子：它会<strong>{sense}</strong>，通过学习<strong>{dataType}</strong>，最后帮助人们<strong>{task}</strong>。
              </div>
            </div>
          </div>
        </>
      )}

      {tab === 'ai' && (
        <div className="lesson-content">
          <div className="lesson-section">
            <div className="lesson-section-title">🤖 这节课怎么问 AI 更有用</div>
            <div className="lesson-card">
              <p className="lesson-text">这一课最适合让 AI 帮你做 3 件事：判断一个东西是不是 AI、解释为什么、帮你扩展成新的点子。</p>
              <div className="lesson-highlight">
                先自己猜，再让 AI 解释原因，学习效果最好。
              </div>
              <div className="lesson-tip">
                可以直接这样问：<br />
                `我在学“认识 AI”。请判断下面这些东西哪些用了 AI，并用 10 岁小朋友能懂的话解释原因：音乐推荐、人脸解锁、普通闹钟。`
              </div>
              <div className="lesson-think">
                也可以继续追问：`如果我想做一个会 {sense} 的 AI，它最需要什么数据？`
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 测一测 ── */}
      {tab === 'quiz' && (
        <div className="lesson-interactive">
          <div className="interactive-title">✅ 知识测验</div>
          <div className="interactive-card">
            {!quizDone ? (
              <>
                <div className="quiz-progress">
                  <span className="quiz-progress-text">{quizIdx + 1} / {QUIZ.length}</span>
                  <div className="quiz-progress-bar">
                    <div className="quiz-progress-fill" style={{ width: `${((quizIdx + 1) / QUIZ.length) * 100}%` }} />
                  </div>
                </div>
                <div className="quiz-question">{QUIZ[quizIdx].q}</div>
                <div className="quiz-options">
                  {QUIZ[quizIdx].options.map((opt, i) => {
                    let cls = 'quiz-option'
                    if (quizAnswer !== null) {
                      if (i === QUIZ[quizIdx].correct) cls += ' reveal'
                      else if (i === quizAnswer.optIdx && !quizAnswer.correct) cls += ' wrong'
                    }
                    return (
                      <button key={i} className={cls} onClick={() => handleQuizAnswer(i)}>
                        {opt}
                      </button>
                    )
                  })}
                </div>
                {quizAnswer !== null && (
                  <>
                    <div className={`quiz-feedback ${quizAnswer.correct ? 'correct' : 'wrong'}`}>
                      {quizAnswer.correct ? '✅ 回答正确！' : '❌ 再想想！'} {QUIZ[quizIdx].explain}
                    </div>
                    <button className="quiz-next-btn" onClick={nextQuestion}>
                      {quizIdx + 1 < QUIZ.length ? '下一题 →' : '查看结果 →'}
                    </button>
                  </>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '52px', marginBottom: '12px' }}>
                  {quizScore === QUIZ.length ? '🏆' : quizScore >= 2 ? '🌟' : '📚'}
                </div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px' }}>
                  得了 {quizScore} / {QUIZ.length} 分！
                </div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '16px', lineHeight: '1.6' }}>
                  {quizScore === QUIZ.length
                    ? '太棒了！你已经掌握了AI的基本概念，准备好进入下一课了！'
                    : quizScore >= 2
                    ? '不错！再复习一下知识点，你会更厉害的！'
                    : '多看看"学一学"部分，再来挑战吧！'}
                </div>
                <button className="quiz-next-btn" onClick={() => { setQuizIdx(0); setQuizAnswer(null); setQuizScore(0); setQuizDone(false) }}>
                  重新测验
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'work' && (
        <div className="lesson-content">
          <div className="lesson-section">
            <div className="lesson-section-title">🌟 本课输出</div>
            <div className="lesson-card">
              <p className="lesson-text">学完这一课，你不只是知道“AI 是什么”，还应该能说出一个你自己的 AI 点子。</p>
              <div className="lesson-tip">
                我的 AI 点子：它会<strong>{sense}</strong>，学习<strong>{dataType}</strong>，最后帮助人们<strong>{task}</strong>。
              </div>
              <div className="lesson-highlight">
                如果你能把这句话完整讲出来，就说明你已经从“认识 AI”走到“开始想做 AI 了”。
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
