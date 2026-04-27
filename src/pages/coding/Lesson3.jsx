import { useState } from 'react'
import './Lesson.css'

// 动物数据集：每个动物有若干特征
const ANIMALS = [
  { name: '金鱼', emoji: '🐟', features: { hasLegs: false, canFly: false, hasFur: false, isBig: false } },
  { name: '老鹰', emoji: '🦅', features: { hasLegs: true, canFly: true, hasFur: false, isBig: true } },
  { name: '熊猫', emoji: '🐼', features: { hasLegs: true, canFly: false, hasFur: true, isBig: true } },
  { name: '蝴蝶', emoji: '🦋', features: { hasLegs: true, canFly: true, hasFur: false, isBig: false } },
  { name: '小猫', emoji: '🐱', features: { hasLegs: true, canFly: false, hasFur: true, isBig: false } },
  { name: '鲨鱼', emoji: '🦈', features: { hasLegs: false, canFly: false, hasFur: false, isBig: true } },
  { name: '鸽子', emoji: '🕊️', features: { hasLegs: true, canFly: true, hasFur: false, isBig: false } },
  { name: '狮子', emoji: '🦁', features: { hasLegs: true, canFly: false, hasFur: true, isBig: true } },
]

const TRAINING_SET = ANIMALS.slice(0, 5)
const TEST_SET = ANIMALS.slice(5)

const QUIZ = [
  {
    q: '"训练集"和"测试集"的主要区别是什么？',
    options: ['训练集更大', 'AI用训练集学习，用测试集检验效果', '测试集更重要', '它们完全一样'],
    correct: 1,
    explain: '训练集用于AI学习规律，测试集用于检验AI学到了什么——必须分开，否则就像考试前看到答案，没法真正检验能力！',
  },
  {
    q: '如果AI在训练集上表现很好，但在测试集上很差，说明什么？',
    options: ['AI非常厉害', '测试集太难了', 'AI过拟合了，死记硬背训练集', '需要更多测试集'],
    correct: 2,
    explain: '这叫"过拟合"——AI死记硬背了训练数据，却没有真正学到规律。遇到新数据就失败了！',
  },
  {
    q: '下面哪个类比最准确地描述了机器学习的"训练"过程？',
    options: ['读一遍课本就考试', '刷大量练习题后总结方法', '直接抄答案', '靠猜来答题'],
    correct: 1,
    explain: '机器学习就像刷练习题——从大量例题中总结规律，然后用这些规律解决新题目！',
  },
]

const IMPROVE_OPTIONS = [
  { id: 'more-data', label: '再找更多训练数据', reason: '让 AI 看过更多例子，不容易只记住少数样本。' },
  { id: 'better-labels', label: '把标签检查得更准', reason: '标签错了，AI 学到的规律也会跟着歪掉。' },
  { id: 'split-test', label: '训练集和测试集分开', reason: '这样才能真的看出 AI 有没有学会，不是只会背答案。' },
]

export default function Lesson3({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [rules, setRules] = useState({ hasLegs: null, canFly: null, hasFur: null, isBig: null })
  const [trainPhase, setTrainPhase] = useState('setup') // setup | training | testing | done
  const [testResults, setTestResults] = useState([])
  const [improve, setImprove] = useState(IMPROVE_OPTIONS[0])
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  const featureLabels = {
    hasLegs: '有腿', canFly: '会飞', hasFur: '有毛/皮毛', isBig: '体型大'
  }

  function applyRules(animal) {
    const f = animal.features
    let score = 0
    if (rules.hasLegs !== null && f.hasLegs === rules.hasLegs) score++
    if (rules.canFly !== null && f.canFly === rules.canFly) score++
    if (rules.hasFur !== null && f.hasFur === rules.hasFur) score++
    if (rules.isBig !== null && f.isBig === rules.isBig) score++
    return score
  }

  function runTest() {
    const results = TEST_SET.map(animal => ({
      animal,
      score: applyRules(animal),
      maxScore: Object.values(rules).filter(v => v !== null).length,
    }))
    setTestResults(results)
    setTrainPhase('done')
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

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#dcfce7', color: '#065f46' }}>第 3 课</span>
        <span className="lesson-hero-emoji">🏋️</span>
        <h1 className="lesson-hero-title">训练你的 AI</h1>
        <p className="lesson-hero-sub">Train Your AI</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>理解机器学习"训练"的含义</li>
          <li>知道训练集和测试集的区别</li>
          <li>亲手设计分类规则，体验训练过程</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {[['learn', '📖 学一学'], ['play', '🤖 训练AI'], ['ai', '🤖 用AI帮忙'], ['quiz', '✅ 测一测'], ['work', '🌟 本课输出']].map(([id, label]) => (
          <button key={id} className={`lesson-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      {/* ── 学一学 ── */}
      {tab === 'learn' && (
        <>
          <div className="lesson-section">
            <div className="lesson-section-title">🏋️ 什么是"训练"？</div>
            <div className="lesson-card">
              <p className="lesson-text">
                机器学习的"训练"，就是让AI<strong>看大量带标签的数据</strong>，从中找到规律。
                这就像你通过做很多道数学题，慢慢学会了解题方法。
              </p>
              <div className="lesson-highlight">
                🔄 训练过程：<br />
                输入数据 → AI 猜测答案 → 对比正确标签 → 调整规则 → 重复…
              </div>
            </div>
          </div>

          <div className="lesson-section">
            <div className="lesson-section-title">📚 训练集 vs 测试集</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
              <div style={{ background: '#f0fdf4', borderRadius: '14px', padding: '14px', border: '2px solid #10b98130' }}>
                <div style={{ fontSize: '22px', marginBottom: '6px', textAlign: 'center' }}>📝</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#065f46', marginBottom: '6px', textAlign: 'center' }}>训练集</div>
                <div style={{ fontSize: '12px', color: '#333', lineHeight: '1.6' }}>AI 用这部分数据学习规律，反复练习，调整自己</div>
              </div>
              <div style={{ background: '#eff6ff', borderRadius: '14px', padding: '14px', border: '2px solid #3b82f630' }}>
                <div style={{ fontSize: '22px', marginBottom: '6px', textAlign: 'center' }}>📋</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#1e40af', marginBottom: '6px', textAlign: 'center' }}>测试集</div>
                <div style={{ fontSize: '12px', color: '#333', lineHeight: '1.6' }}>全新数据，AI 没见过。用来检验 AI 真的学会了没有</div>
              </div>
            </div>
            <div className="lesson-tip">
              💡 类比：期末考试前的练习题 = 训练集；真正的期末考试 = 测试集。
              绝对不能用考试题来练习，否则只是"死记"，不是真的会了！
            </div>
          </div>

          <div className="lesson-section">
            <div className="lesson-section-title">🌳 决策树——最简单的AI</div>
            <div className="lesson-card">
              <p className="lesson-text">
                <strong>决策树</strong>是最容易理解的机器学习模型。它通过一系列是/否问题来做决定：
              </p>
              <div style={{ background: '#f8f9fc', borderRadius: '12px', padding: '14px', margin: '10px 0', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8', color: '#333' }}>
                有腿吗？<br />
                ├── 是 → 会飞吗？<br />
                │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── 是 → 鸟类<br />
                │&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── 否 → 陆地动物<br />
                └── 否 → 水生动物
              </div>
              <p className="lesson-text">
                每个问题都把数据分成两组，最终到达一个答案。简单，但非常有效！
              </p>
            </div>
          </div>

          <div className="lesson-section">
            <button className="quiz-next-btn" style={{ background: '#10b981' }} onClick={() => setTab('play')}>
              继续：去训练你的AI →
            </button>
          </div>
        </>
      )}

      {/* ── 训练AI游戏 ── */}
      {tab === 'play' && (
        <div className="lesson-interactive">
          <div className="interactive-title">🤖 动物分类器训练营</div>
          <div className="interactive-card">
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '14px', lineHeight: '1.6' }}>
              你来扮演AI工程师！观察训练集的动物，设置分类规则，然后用测试集检验效果！
            </p>

            {/* 训练集 */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#10b981', marginBottom: '8px' }}>
                📝 训练集（{TRAINING_SET.length} 个动物）— 观察特征，学习规律
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {TRAINING_SET.map(animal => (
                  <div key={animal.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f0fdf4', borderRadius: '10px', padding: '8px 12px', fontSize: '13px' }}>
                    <span style={{ fontSize: '22px' }}>{animal.emoji}</span>
                    <span style={{ fontWeight: 700, minWidth: '50px' }}>{animal.name}</span>
                    {Object.entries(animal.features).map(([k, v]) => (
                      <span key={k} style={{
                        fontSize: '11px',
                        padding: '2px 7px',
                        borderRadius: '10px',
                        background: v ? '#10b98120' : '#f3f4f6',
                        color: v ? '#065f46' : '#999',
                        fontWeight: 600,
                      }}>
                        {v ? '✓' : '✗'} {featureLabels[k]}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* 规则设置 */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#6366f1', marginBottom: '10px' }}>
                ⚙️ 设置你的分类规则（每个特征选择是/否/忽略）
              </div>
              {Object.keys(rules).map(key => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, minWidth: '80px', color: '#333' }}>{featureLabels[key]}</span>
                  {[{ val: true, label: '✓ 是' }, { val: false, label: '✗ 否' }, { val: null, label: '— 忽略' }].map(opt => (
                    <button
                      key={String(opt.val)}
                      onClick={() => setRules(prev => ({ ...prev, [key]: opt.val }))}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        border: '2px solid',
                        borderColor: rules[key] === opt.val ? '#6366f1' : '#e8edf2',
                        background: rules[key] === opt.val ? '#6366f1' : '#f8f9fc',
                        color: rules[key] === opt.val ? '#fff' : '#666',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {trainPhase !== 'done' && (
              <button
                onClick={runTest}
                style={{ width: '100%', padding: '12px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                🧪 用测试集检验我的规则！
              </button>
            )}

            {/* 测试结果 */}
            {trainPhase === 'done' && (
              <div style={{ marginTop: '14px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#3b82f6', marginBottom: '8px' }}>
                  📋 测试集结果（{TEST_SET.length} 个新动物）
                </div>
                {testResults.map(({ animal, score, maxScore }) => (
                  <div key={animal.name} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: score === maxScore ? '#f0fdf4' : score > 0 ? '#fffbeb' : '#fef2f2',
                    borderRadius: '10px',
                    padding: '10px 12px',
                    marginBottom: '6px',
                    border: `1.5px solid ${score === maxScore ? '#10b981' : score > 0 ? '#f59e0b' : '#ef4444'}30`,
                  }}>
                    <span style={{ fontSize: '24px' }}>{animal.emoji}</span>
                    <span style={{ fontWeight: 700, fontSize: '13px', minWidth: '50px' }}>{animal.name}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        规则匹配 {score} / {maxScore} 项
                      </div>
                      <div style={{ height: '6px', background: '#e8edf2', borderRadius: '3px', marginTop: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: maxScore > 0 ? `${(score / maxScore) * 100}%` : '0%', background: score === maxScore ? '#10b981' : score > 0 ? '#f59e0b' : '#ef4444', borderRadius: '3px' }} />
                      </div>
                    </div>
                    <span style={{ fontSize: '18px' }}>{score === maxScore ? '🎯' : score > 0 ? '🤔' : '❌'}</span>
                  </div>
                ))}
                <button
                  onClick={() => { setTrainPhase('setup'); setTestResults([]) }}
                  className="sort-reset-btn"
                >
                  调整规则，重新训练
                </button>
              </div>
            )}

            <div className="lesson-card" style={{ marginTop: '18px' }}>
              <div className="lesson-section-title">🛠️ 第二任务：你会怎么把它训得更好？</div>
              <p className="lesson-text">真的训练 AI，不是跑一次就结束，还要知道下一步该改哪里。</p>
              <div className="example-grid">
                {IMPROVE_OPTIONS.map((item) => (
                  <button key={item.id} className="quiz-option" style={{ background: improve.id === item.id ? '#dcfce7' : undefined }} onClick={() => setImprove(item)}>
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="lesson-tip">
                你选的升级方案：<strong>{improve.label}</strong>。因为：{improve.reason}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'ai' && (
        <div className="lesson-content">
          <div className="lesson-section">
            <div className="lesson-section-title">🤖 让 AI 帮你看训练过程</div>
            <div className="lesson-card">
              <p className="lesson-text">这一课最适合问 AI 的，不是“答案是什么”，而是“为什么这样训练不够好”。</p>
              <div className="lesson-tip">
                可以这样问：<br />
                `我正在做一个动物分类器。我现在用了这些规则：有腿、会飞、有毛、体型大。请你告诉我，这样的训练为什么还可能不够准？`
              </div>
              <div className="lesson-think">
                继续追问：`如果测试集表现不好，我应该先改数据、改标签，还是改规则？为什么？`
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
                    <div className="quiz-progress-fill" style={{ width: `${((quizIdx + 1) / QUIZ.length) * 100}%`, background: '#10b981' }} />
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
                    return <button key={i} className={cls} onClick={() => handleQuizAnswer(i)}>{opt}</button>
                  })}
                </div>
                {quizAnswer !== null && (
                  <>
                    <div className={`quiz-feedback ${quizAnswer.correct ? 'correct' : 'wrong'}`}>
                      {quizAnswer.correct ? '✅ 正确！' : '❌ 答错了！'} {QUIZ[quizIdx].explain}
                    </div>
                    <button className="quiz-next-btn" style={{ background: '#10b981' }} onClick={nextQuestion}>
                      {quizIdx + 1 < QUIZ.length ? '下一题 →' : '查看结果 →'}
                    </button>
                  </>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '52px', marginBottom: '12px' }}>{quizScore === QUIZ.length ? '🏆' : quizScore >= 2 ? '🌟' : '📚'}</div>
                <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>得了 {quizScore} / {QUIZ.length} 分！</div>
                <button className="quiz-next-btn" style={{ background: '#10b981' }} onClick={() => { setQuizIdx(0); setQuizAnswer(null); setQuizScore(0); setQuizDone(false) }}>
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
              <p className="lesson-text">学完这一课，你应该能自己讲清楚一次最小的训练流程。</p>
              <div className="lesson-highlight">
                我先用训练集让 AI 学规则，再用测试集检验它是不是真的学会了。如果效果不好，我会优先：<strong>{improve.label}</strong>。
              </div>
              <div className="lesson-tip">
                如果你能把“训练 → 测试 → 改进”这 3 步顺下来讲出来，就说明你已经开始有 AI 工程师的思路了。
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
