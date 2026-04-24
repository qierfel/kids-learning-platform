import { useState } from 'react'
import './Lesson.css'

// Decision tree for "今天去哪里玩？"
const DTREE = {
  question: '天气好吗？',
  yes: {
    question: '喜欢户外活动吗？',
    yes: {
      question: '有小伙伴一起吗？',
      yes: { result: { label: '去公园踢球！', emoji: '⚽', color: '#10b981', desc: 'AI 判断：天气好 + 户外 + 有伙伴 = 最适合团体运动！' } },
      no: { result: { label: '去公园骑车！', emoji: '🚲', color: '#3b82f6', desc: 'AI 判断：天气好 + 户外 + 独自 = 自在骑行最开心！' } },
    },
    no: {
      question: '想学新东西吗？',
      yes: { result: { label: '去图书馆！', emoji: '📚', color: '#8b5cf6', desc: 'AI 判断：天气好 + 室内 + 爱学习 = 安静读书最合适！' } },
      no: { result: { label: '去商场玩！', emoji: '🎮', color: '#f59e0b', desc: 'AI 判断：天气好 + 室内 + 放松 = 商场游乐最轻松！' } },
    },
  },
  no: {
    question: '喜欢看电影吗？',
    yes: { result: { label: '在家看电影！', emoji: '🎬', color: '#ec4899', desc: 'AI 判断：天气不好 + 喜欢电影 = 宅家观影完美！' } },
    no: {
      question: '有需要完成的作业吗？',
      yes: { result: { label: '在家做作业！', emoji: '📝', color: '#6366f1', desc: 'AI 判断：天气不好 + 不看电影 + 有作业 = 认真完成作业！' } },
      no: { result: { label: '邀请朋友来家里玩！', emoji: '🎲', color: '#f97316', desc: 'AI 判断：天气不好 + 不看电影 + 无作业 = 在家聚会最欢乐！' } },
    },
  },
}

const AI_ETHICS = [
  { emoji: '🔒', title: '隐私保护', desc: 'AI不应在未经同意的情况下收集个人信息' },
  { emoji: '⚖️', title: '公平性', desc: '训练数据有偏见，AI就会有偏见，要确保公平' },
  { emoji: '🧑‍⚖️', title: '责任归属', desc: 'AI犯错时，谁来负责？开发者？用户？' },
  { emoji: '🔍', title: '可解释性', desc: '人类需要能理解AI为什么做出某个决定' },
  { emoji: '🌍', title: '环境影响', desc: '训练大型AI需要大量电力，对环境有影响' },
  { emoji: '👶', title: '儿童保护', desc: '确保AI内容适合不同年龄，不伤害孩子' },
]

function DTreeNode({ node, depth = 0 }) {
  const [answer, setAnswer] = useState(null)

  if (node.result) {
    return (
      <div className="dtree-result" style={{ background: node.result.color + '15', border: `2px solid ${node.result.color}40` }}>
        <div className="dtree-result-emoji">{node.result.emoji}</div>
        <div className="dtree-result-label" style={{ color: node.result.color }}>{node.result.label}</div>
        <div className="dtree-result-desc">{node.result.desc}</div>
      </div>
    )
  }

  return (
    <div className="dtree-node" style={{ marginLeft: depth * 8 + 'px', borderLeft: depth > 0 ? `3px solid #e8edf2` : undefined }}>
      <div className="dtree-question">❓ {node.question}</div>
      <div className="dtree-choices">
        <button
          className={`dtree-choice ${answer === 'yes' ? 'selected' : ''}`}
          onClick={() => setAnswer('yes')}
          style={{ borderColor: answer === 'yes' ? '#10b981' : undefined, background: answer === 'yes' ? '#10b981' : undefined }}
        >
          ✅ 是
        </button>
        <button
          className={`dtree-choice ${answer === 'no' ? 'selected' : ''}`}
          onClick={() => setAnswer('no')}
          style={{ borderColor: answer === 'no' ? '#ef4444' : undefined, background: answer === 'no' ? '#ef4444' : undefined }}
        >
          ❌ 否
        </button>
      </div>
      {answer !== null && (
        <div style={{ marginTop: '10px' }}>
          <DTreeNode node={node[answer]} depth={depth + 1} />
        </div>
      )}
    </div>
  )
}

export default function Lesson6({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [dtreeKey, setDtreeKey] = useState(0)
  const [certified, setCertified] = useState(false)
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  const QUIZ = [
    {
      q: '决策树中，每个"节点"代表什么？',
      options: ['一个答案', '一个是/否问题', '一个数字', '一张图片'],
      correct: 1,
      explain: '决策树的每个内部节点是一个问题，根据答案（是/否）分叉走向不同路径，最终到达叶节点（答案）。',
    },
    {
      q: '下面哪条关于AI的说法是错误的？',
      options: ['AI能从数据中学习', 'AI是完全可靠的，不会出错', 'AI需要大量数据', 'AI可以应用在很多领域'],
      correct: 1,
      explain: 'AI可能因为训练数据有偏见、分布变化等原因出错。AI不是完全可靠的，需要人类监督和验证！',
    },
    {
      q: '"AI偏见"是什么意思？',
      options: ['AI不喜欢某些颜色', '因训练数据有偏差，AI对某些群体不公平', 'AI处理速度慢', 'AI需要充电'],
      correct: 1,
      explain: '如果训练数据主要来自某个群体，AI就可能对其他群体表现不公平。这就是AI偏见，是个严重的伦理问题！',
    },
  ]

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

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#ede9fe', color: '#5b21b6' }}>第 6 课</span>
        <span className="lesson-hero-emoji">🏆</span>
        <h1 className="lesson-hero-title">做小小 AI 工程师</h1>
        <p className="lesson-hero-sub">Mini AI Engineer</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>综合运用前5课知识，构建决策树</li>
          <li>了解AI的局限性和伦理问题</li>
          <li>完成全部6课，获得AI工程师证书！</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {[['learn', '📖 学一学'], ['build', '🌳 构建决策树'], ['ethics', '⚖️ AI伦理'], ['quiz', '✅ 测一测'], ['cert', '🏆 领证书']].map(([id, label]) => (
          <button key={id} className={`lesson-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      {/* ── 学一学 ── */}
      {tab === 'learn' && (
        <>
          <div className="lesson-section">
            <div className="lesson-section-title">🔭 我们学了什么？</div>
            <div className="lesson-card">
              <p className="lesson-text">恭喜！你已经学完了前5课。让我们回顾一下：</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '10px 0' }}>
                {[
                  { lesson: '第1课', topic: '认识AI', summary: 'AI是能从数据中学习的系统', emoji: '🤖' },
                  { lesson: '第2课', topic: '数据', summary: '数据是AI的食物，标签告诉AI答案', emoji: '📊' },
                  { lesson: '第3课', topic: '训练AI', summary: '训练集学习，测试集检验，决策树分类', emoji: '🏋️' },
                  { lesson: '第4课', topic: '语言AI', summary: 'NLP让AI理解文字，情感分析判断情绪', emoji: '💬' },
                  { lesson: '第5课', topic: '计算机视觉', summary: '图像=像素数字网格，AI找特征来识别', emoji: '👁️' },
                ].map(item => (
                  <div key={item.lesson} style={{ display: 'flex', gap: '10px', alignItems: 'center', background: '#f8f9fc', borderRadius: '10px', padding: '10px 12px', border: '1.5px solid #e8edf2' }}>
                    <span style={{ fontSize: '20px' }}>{item.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '11px', color: '#888' }}>{item.lesson} · {item.topic}</div>
                      <div style={{ fontSize: '13px', color: '#333', fontWeight: 600 }}>{item.summary}</div>
                    </div>
                    <span style={{ color: '#10b981', fontSize: '18px' }}>✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lesson-section">
            <div className="lesson-section-title">🏗️ AI 工程师的工作流程</div>
            <div className="lesson-card">
              {[
                { step: '1', title: '定义问题', desc: '我们要解决什么问题？输入和输出是什么？', emoji: '🎯' },
                { step: '2', title: '收集数据', desc: '找到或制作合适的数据集，并为数据打标签', emoji: '📦' },
                { step: '3', title: '选择模型', desc: '决策树？神经网络？根据问题选择合适的算法', emoji: '🧠' },
                { step: '4', title: '训练测试', desc: '训练模型，在测试集上评估效果，反复优化', emoji: '🔄' },
                { step: '5', title: '部署使用', desc: '把AI部署到产品中，监控表现，持续改进', emoji: '🚀' },
              ].map(s => (
                <div key={s.step} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#8b5cf6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0, fontSize: '13px' }}>{s.step}</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e', marginBottom: '2px' }}>{s.emoji} {s.title}</div>
                    <div style={{ fontSize: '13px', color: '#555', lineHeight: '1.5' }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-section">
            <div className="lesson-section-title">⚠️ AI 的局限性</div>
            <div className="lesson-card">
              {[
                { issue: '需要大量数据', detail: '没有足够的训练数据，AI就学不好' },
                { issue: '可能犯错', detail: 'AI不是100%准确的，会在边缘情况下失败' },
                { issue: '不能真正"理解"', detail: 'AI找的是规律，不是真正理解含义' },
                { issue: '不能泛化', detail: '遇到训练中没有的情况，AI可能完全失败' },
              ].map(item => (
                <div key={item.issue} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ color: '#f59e0b', fontSize: '14px', marginTop: '2px' }}>⚠</span>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e' }}>{item.issue}</div>
                    <div style={{ fontSize: '13px', color: '#666' }}>{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-section">
            <button className="quiz-next-btn" style={{ background: '#8b5cf6' }} onClick={() => setTab('build')}>
              继续：构建你的决策树 →
            </button>
          </div>
        </>
      )}

      {/* ── 决策树 ── */}
      {tab === 'build' && (
        <div className="lesson-interactive">
          <div className="interactive-title">🌳 互动决策树：今天去哪里玩？</div>
          <div className="interactive-card">
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '14px', lineHeight: '1.6' }}>
              这是一个帮你决定今天去哪里玩的AI！回答下面的问题，AI会根据你的答案推荐最佳选择。
              看看AI的推理路径，理解决策树是怎么工作的！
            </p>
            <div key={dtreeKey}>
              <DTreeNode node={DTREE} />
            </div>
            <button
              onClick={() => setDtreeKey(k => k + 1)}
              className="sort-reset-btn"
              style={{ marginTop: '12px' }}
            >
              🔄 重新开始，换个答案试试
            </button>
            <div style={{ marginTop: '12px', padding: '10px', background: '#faf5ff', borderRadius: '10px', fontSize: '12px', color: '#6d28d9', lineHeight: '1.6', border: '1.5px solid #ddd6fe' }}>
              💡 这个决策树有 3 层问题，可以做出 6 种不同的推荐。真实的AI决策树可能有数千层！
            </div>
          </div>
        </div>
      )}

      {/* ── AI伦理 ── */}
      {tab === 'ethics' && (
        <>
          <div className="lesson-section">
            <div className="lesson-section-title">⚖️ AI 伦理——用好AI的责任</div>
            <div className="lesson-card">
              <p className="lesson-text">
                AI非常强大，但强大的技术也需要<strong>负责任地使用</strong>。AI伦理就是确保AI对人类有益、公平、安全。
              </p>
            </div>
          </div>

          <div className="lesson-section">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {AI_ETHICS.map(item => (
                <div key={item.title} style={{ background: '#fff', borderRadius: '14px', padding: '14px', border: '1.5px solid #e8edf2', display: 'flex', gap: '12px', alignItems: 'flex-start', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <span style={{ fontSize: '24px', flexShrink: 0 }}>{item.emoji}</span>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e', marginBottom: '3px' }}>{item.title}</div>
                    <div style={{ fontSize: '13px', color: '#555', lineHeight: '1.5' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-section">
            <div className="lesson-card">
              <div className="lesson-think">
                🤔 思考题：如果一个AI用来判断学生的成绩，但训练数据全是城市学生的，它对农村学生公平吗？为什么？
              </div>
              <div className="lesson-highlight" style={{ marginTop: '10px' }}>
                💡 作为AI工程师，你有责任让AI变得更公平、更可靠、更有益于所有人！
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── 测一测 ── */}
      {tab === 'quiz' && (
        <div className="lesson-interactive">
          <div className="interactive-title">✅ 最终测验</div>
          <div className="interactive-card">
            {!quizDone ? (
              <>
                <div className="quiz-progress">
                  <span className="quiz-progress-text">{quizIdx + 1} / {QUIZ.length}</span>
                  <div className="quiz-progress-bar">
                    <div className="quiz-progress-fill" style={{ width: `${((quizIdx + 1) / QUIZ.length) * 100}%`, background: '#8b5cf6' }} />
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
                      {quizAnswer.correct ? '✅ 正确！' : '❌ 再想想！'} {QUIZ[quizIdx].explain}
                    </div>
                    <button className="quiz-next-btn" style={{ background: '#8b5cf6' }} onClick={nextQuestion}>
                      {quizIdx + 1 < QUIZ.length ? '下一题 →' : '查看结果 →'}
                    </button>
                  </>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '52px', marginBottom: '12px' }}>{quizScore === QUIZ.length ? '🏆' : '🌟'}</div>
                <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>得了 {quizScore} / {QUIZ.length} 分！</div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '16px', lineHeight: '1.6' }}>
                  {quizScore === QUIZ.length ? '满分！你已经是合格的小AI工程师了！' : '再复习一下，你能做到的！'}
                </div>
                {!certified && quizScore >= 2 && (
                  <button className="quiz-next-btn" style={{ background: '#8b5cf6' }} onClick={() => { setCertified(true); setTab('cert') }}>
                    🏆 领取 AI 工程师证书！
                  </button>
                )}
                <button className="sort-reset-btn" onClick={() => { setQuizIdx(0); setQuizAnswer(null); setQuizScore(0); setQuizDone(false) }}>
                  重新测验
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── 证书 ── */}
      {tab === 'cert' && (
        <>
          <div style={{ padding: '0 0 20px' }}>
            <div className="certificate">
              <div className="certificate-icon">🏆</div>
              <div className="certificate-title">AI 编程启蒙 · 结业证书</div>
              <div className="certificate-name">小小 AI 工程师</div>
              <div className="certificate-desc">
                恭喜你！完成了全部 6 节 AI 编程启蒙课程。<br />
                你已经掌握了人工智能的核心概念，<br />
                迈出了成为 AI 工程师的第一步！
              </div>
              <div className="certificate-badges">
                {['🤖 认识AI', '📊 数据', '🏋️ 训练', '💬 语言AI', '👁️ 计算机视觉', '🌳 决策树'].map(b => (
                  <span key={b} className="certificate-badge">{b}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="lesson-section">
            <div className="lesson-section-title">🚀 下一步怎么走？</div>
            <div className="lesson-card">
              {[
                { emoji: '🐍', title: '学习 Python', desc: '全球最流行的AI编程语言，语法简单，适合初学者' },
                { emoji: '🧪', title: '动手实验', desc: '用 Teachable Machine 等工具，不写代码也能训练AI' },
                { emoji: '📖', title: '继续学习', desc: '探索机器学习、深度学习，了解 ChatGPT、DALL-E 等前沿AI' },
                { emoji: '🌟', title: '保持好奇', desc: 'AI领域变化极快，保持好奇心，关注最新进展！' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '22px', flexShrink: 0 }}>{item.emoji}</span>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e', marginBottom: '2px' }}>{item.title}</div>
                    <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.5' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-section">
            <button className="quiz-next-btn" style={{ background: '#8b5cf6' }} onClick={onBack}>
              返回课程列表 →
            </button>
          </div>
        </>
      )}
    </div>
  )
}
