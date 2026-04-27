import { useState } from 'react'
import './Lesson.css'

const DATA_TYPES = [
  { emoji: '🖼️', name: '图像数据', examples: ['照片', '视频帧', '医学扫描'], color: '#6366f1' },
  { emoji: '🔤', name: '文字数据', examples: ['新闻文章', '聊天记录', '书本内容'], color: '#0ea5e9' },
  { emoji: '🔢', name: '数字数据', examples: ['温度记录', '成绩表', '价格历史'], color: '#10b981' },
  { emoji: '🎵', name: '声音数据', examples: ['语音录音', '音乐文件', '噪音样本'], color: '#f59e0b' },
]

const LABEL_ITEMS = [
  { emoji: '🍎', label: '苹果', correct: '水果' },
  { emoji: '🐱', label: '猫咪', correct: '动物' },
  { emoji: '🚗', label: '汽车', correct: '交通工具' },
  { emoji: '🍊', label: '橙子', correct: '水果' },
  { emoji: '🐶', label: '小狗', correct: '动物' },
  { emoji: '✈️', label: '飞机', correct: '交通工具' },
  { emoji: '🍇', label: '葡萄', correct: '水果' },
  { emoji: '🦁', label: '狮子', correct: '动物' },
  { emoji: '🚂', label: '火车', correct: '交通工具' },
]

const CATEGORIES = ['水果', '动物', '交通工具']

const QUIZ = [
  {
    q: '为什么 AI 需要大量数据？',
    options: ['让AI存储更多文件', '让AI从更多例子中学习规律', '让AI运行更快', '让AI占用更多内存'],
    correct: 1,
    explain: '数据越多，AI 学到的规律越准确。就像做练习题，做得越多，解题能力越强！',
  },
  {
    q: '"标签"在机器学习中指什么？',
    options: ['贴在商品上的价格标', '告诉AI数据属于哪类的信息', '数据的文件名', '数据的大小'],
    correct: 1,
    explain: '标签就是告诉AI"这个数据是什么"的信息。比如给猫的照片贴上"猫"的标签，AI才知道该学什么。',
  },
  {
    q: '下面哪个不是AI的训练数据？',
    options: ['10万张猫狗照片', '一个空文件夹', '10年的天气记录', '百万条用户评论'],
    correct: 1,
    explain: '空文件夹没有任何信息，AI无法从中学到任何东西。AI需要大量有意义的数据才能学习！',
  },
]

const BUILD_TARGETS = ['做识别猫狗的 AI', '做推荐音乐的 AI', '做判断天气的 AI']
const BUILD_DATA = ['很多图片', '很多听歌记录', '很多天气数据']
const BUILD_LABELS = ['这是什么', '这个人喜欢什么', '这是晴天还是雨天']

export default function Lesson2({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [placed, setPlaced] = useState({}) // { itemIdx: category }
  const [checked, setChecked] = useState(false)
  const [target, setTarget] = useState(BUILD_TARGETS[0])
  const [dataChoice, setDataChoice] = useState(BUILD_DATA[0])
  const [labelChoice, setLabelChoice] = useState(BUILD_LABELS[0])
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  const remaining = LABEL_ITEMS.filter((_, i) => placed[i] === undefined)

  function placeItem(itemIdx, category) {
    if (checked) return
    setPlaced(prev => ({ ...prev, [itemIdx]: category }))
  }

  function removeFromBin(itemIdx) {
    if (checked) return
    setPlaced(prev => { const n = { ...prev }; delete n[itemIdx]; return n })
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

  const correctCount = Object.entries(placed).filter(([i, cat]) => LABEL_ITEMS[+i].correct === cat).length

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回课程列表</button>

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#e0f2fe', color: '#0369a1' }}>第 2 课</span>
        <span className="lesson-hero-emoji">📊</span>
        <h1 className="lesson-hero-title">数据是 AI 的食物</h1>
        <p className="lesson-hero-sub">Data - AI's Food</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>了解什么是数据，以及数据有哪些类型</li>
          <li>理解"数据集"和"标签"的概念</li>
          <li>体验给数据打标签的过程</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {[['learn', '📖 学一学'], ['play', '🏷️ 给数据贴标签'], ['ai', '🤖 用AI帮忙'], ['quiz', '✅ 测一测'], ['work', '🌟 本课输出']].map(([id, label]) => (
          <button key={id} className={`lesson-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      {/* ── 学一学 ── */}
      {tab === 'learn' && (
        <>
          <div className="lesson-section">
            <div className="lesson-section-title">🍔 数据：AI 的食物</div>
            <div className="lesson-card">
              <p className="lesson-text">
                就像人需要食物才能成长，<strong>AI 需要数据才能学习</strong>。没有数据，AI 什么都不会！
              </p>
              <div className="lesson-highlight">
                📦 数据（Data）= 计算机能存储和处理的信息。<br />
                数据集（Dataset）= 一大堆同类数据的集合。
              </div>
              <p className="lesson-text">
                比如：10万张猫和狗的照片，就是一个"图像数据集"。AI 通过看这些照片，学会区分猫和狗。
              </p>
            </div>
          </div>

          <div className="lesson-section">
            <div className="lesson-section-title">🗂️ 数据的四大类型</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {DATA_TYPES.map(type => (
                <div key={type.name} style={{
                  background: '#fff',
                  borderRadius: '14px',
                  padding: '14px',
                  border: `2px solid ${type.color}33`,
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}>
                  <span style={{ fontSize: '28px', flexShrink: 0 }}>{type.emoji}</span>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: type.color, marginBottom: '4px' }}>{type.name}</div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {type.examples.map(ex => (
                        <span key={ex} style={{ background: type.color + '15', color: type.color, fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '10px' }}>{ex}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-section">
            <div className="lesson-section-title">🏷️ 什么是"标签"？</div>
            <div className="lesson-card">
              <p className="lesson-text">
                只有数据还不够，AI 还需要知道"这个数据代表什么"——这就是<strong>标签（Label）</strong>。
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '12px 0' }}>
                {[
                  { data: '🐱 一张猫的照片', label: '"猫"', color: '#6366f1' },
                  { data: '🍎 苹果的图像', label: '"苹果"', color: '#10b981' },
                  { data: '☀️ 天气描述文字', label: '"晴天"', color: '#f59e0b' },
                ].map(row => (
                  <div key={row.data} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8f9fc', borderRadius: '10px', padding: '10px 12px' }}>
                    <span style={{ fontSize: '15px', flex: 1 }}>{row.data}</span>
                    <span style={{ fontSize: '18px' }}>→</span>
                    <span style={{ background: row.color + '20', color: row.color, fontSize: '13px', fontWeight: 700, padding: '3px 12px', borderRadius: '20px', border: `1.5px solid ${row.color}40` }}>标签: {row.label}</span>
                  </div>
                ))}
              </div>
              <div className="lesson-tip">
                💡 给数据贴标签叫做"数据标注"，这是训练AI非常重要的工作。很多AI公司有专门的标注员来完成这项工作！
              </div>
            </div>
          </div>

          <div className="lesson-section">
            <div className="lesson-section-title">📏 好数据 vs 坏数据</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ background: '#f0fdf4', borderRadius: '12px', padding: '12px', border: '1.5px solid #10b98130' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#065f46', marginBottom: '6px' }}>✅ 好数据</div>
                {['数量多', '标签准确', '种类丰富', '没有重复'].map(t => <div key={t} style={{ fontSize: '12px', color: '#065f46', marginBottom: '3px' }}>• {t}</div>)}
              </div>
              <div style={{ background: '#fef2f2', borderRadius: '12px', padding: '12px', border: '1.5px solid #ef444430' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#991b1b', marginBottom: '6px' }}>❌ 坏数据</div>
                {['数量太少', '标签错误', '种类单一', '充满噪音'].map(t => <div key={t} style={{ fontSize: '12px', color: '#991b1b', marginBottom: '3px' }}>• {t}</div>)}
              </div>
            </div>
            <div className="lesson-think" style={{ marginTop: '10px' }}>
              🤔 垃圾进，垃圾出（Garbage In, Garbage Out）：坏数据训练出来的AI，给出的答案也是垃圾。
            </div>
          </div>

          <div className="lesson-section">
            <button className="quiz-next-btn" style={{ background: '#0ea5e9' }} onClick={() => setTab('play')}>
              继续：去给数据贴标签 →
            </button>
          </div>
        </>
      )}

      {/* ── 贴标签游戏 ── */}
      {tab === 'play' && (
        <div className="lesson-interactive">
          <div className="interactive-title">🏷️ 数据标注员</div>
          <div className="interactive-card">
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '14px', lineHeight: '1.6' }}>
              你是一名数据标注员！把下面的数据点击分类到正确的类别中。AI 需要这些标签才能学习！
            </p>

            {/* 待分类池 */}
            {remaining.length > 0 && (
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#888', marginBottom: '8px' }}>待标注的数据（点击分类）：</div>
                <div className="sort-pool">
                  {LABEL_ITEMS.map((item, idx) => placed[idx] !== undefined ? null : (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                      <span style={{ fontSize: '28px' }}>{item.emoji}</span>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {CATEGORIES.map(cat => (
                          <button
                            key={cat}
                            onClick={() => placeItem(idx, cat)}
                            style={{ padding: '3px 8px', fontSize: '10px', fontWeight: 700, border: '1.5px solid #e8edf2', borderRadius: '10px', background: '#f8f9fc', cursor: 'pointer', fontFamily: 'inherit' }}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 分类桶 */}
            {CATEGORIES.map(cat => {
              const catEmojis = ['🍎', '🐾', '🚦']
              const catIdx = CATEGORIES.indexOf(cat)
              const itemsInBin = Object.entries(placed).filter(([_, c]) => c === cat)
              return (
                <div key={cat} className="sort-bin" style={{ background: checked ? '#f9fafb' : '#f9fafb' }}>
                  <div className="sort-bin-label">{catEmojis[catIdx]} {cat}</div>
                  <div className="sort-bin-items">
                    {itemsInBin.length === 0 && <span style={{ fontSize: '12px', color: '#bbb' }}>（还没有数据）</span>}
                    {itemsInBin.map(([idxStr, _]) => {
                      const item = LABEL_ITEMS[+idxStr]
                      const isCorrect = item.correct === cat
                      return (
                        <button
                          key={idxStr}
                          onClick={() => removeFromBin(+idxStr)}
                          className="sort-bin-item"
                          style={{
                            background: checked ? (isCorrect ? '#d1fae5' : '#fee2e2') : '#e8edf2',
                            color: checked ? (isCorrect ? '#065f46' : '#991b1b') : '#333',
                            border: 'none',
                          }}
                          title={checked ? '' : '点击取消分类'}
                        >
                          {item.emoji} {item.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {remaining.length === 0 && !checked && (
              <button className="sort-check-btn" onClick={() => setChecked(true)}>
                ✓ 检查我的答案
              </button>
            )}

            {checked && (
              <div style={{ marginTop: '12px', padding: '14px', background: '#fdf4ff', borderRadius: '14px', textAlign: 'center', border: '2px solid #d8b4fe' }}>
                <div style={{ fontSize: '28px', marginBottom: '6px' }}>{correctCount === LABEL_ITEMS.length ? '🎉' : '💪'}</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#7c3aed', marginBottom: '4px' }}>
                  {correctCount}/{LABEL_ITEMS.length} 个正确！
                </div>
                <div style={{ fontSize: '13px', color: '#666' }}>
                  {correctCount === LABEL_ITEMS.length ? '完美！你是超级标注员！' : '不错！再仔细看看哪些放错了（红色），重试一下！'}
                </div>
                <button className="sort-reset-btn" onClick={() => { setPlaced({}); setChecked(false) }}>重新标注</button>
              </div>
            )}

            <div className="lesson-card" style={{ marginTop: '18px' }}>
              <div className="lesson-section-title">🧩 第二任务：给一个 AI 配齐数据</div>
              <p className="lesson-text">现在你来决定：想做什么 AI、要喂它什么数据、还要贴什么标签。</p>
              <div className="example-grid">
                {BUILD_TARGETS.map((item) => (
                  <button key={item} className="quiz-option" style={{ background: target === item ? '#dbeafe' : undefined }} onClick={() => setTarget(item)}>
                    {item}
                  </button>
                ))}
              </div>
              <div className="example-grid">
                {BUILD_DATA.map((item) => (
                  <button key={item} className="quiz-option" style={{ background: dataChoice === item ? '#dcfce7' : undefined }} onClick={() => setDataChoice(item)}>
                    {item}
                  </button>
                ))}
              </div>
              <div className="example-grid">
                {BUILD_LABELS.map((item) => (
                  <button key={item} className="quiz-option" style={{ background: labelChoice === item ? '#fef3c7' : undefined }} onClick={() => setLabelChoice(item)}>
                    {item}
                  </button>
                ))}
              </div>
              <div className="lesson-tip">
                你的数据集方案：为了<strong>{target}</strong>，我要准备<strong>{dataChoice}</strong>，并告诉 AI：<strong>{labelChoice}</strong>。
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'ai' && (
        <div className="lesson-content">
          <div className="lesson-section">
            <div className="lesson-section-title">🤖 让 AI 帮你补齐数据方案</div>
            <div className="lesson-card">
              <p className="lesson-text">这一课最适合让 AI 帮你做两件事：解释“为什么需要这种数据”，以及“还缺什么标签”。</p>
              <div className="lesson-tip">
                可以这样问：<br />
                `我想 {target}。我目前想到的数据是 {dataChoice}，标签是 {labelChoice}。请告诉我这样够不够，还缺什么。`
              </div>
              <div className="lesson-think">
                如果 AI 说“数据不够”，你可以继续追问：`还要再补哪几类例子，AI 才不会学偏？`
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
                    return <button key={i} className={cls} onClick={() => handleQuizAnswer(i)}>{opt}</button>
                  })}
                </div>
                {quizAnswer !== null && (
                  <>
                    <div className={`quiz-feedback ${quizAnswer.correct ? 'correct' : 'wrong'}`}>
                      {quizAnswer.correct ? '✅ 正确！' : '❌ 答错了！'} {QUIZ[quizIdx].explain}
                    </div>
                    <button className="quiz-next-btn" style={{ background: '#0ea5e9' }} onClick={nextQuestion}>
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
                  {quizScore === QUIZ.length ? '满分！你已经理解了数据的重要性！' : '复习一下"学一学"部分再试试吧！'}
                </div>
                <button className="quiz-next-btn" style={{ background: '#0ea5e9' }} onClick={() => { setQuizIdx(0); setQuizAnswer(null); setQuizScore(0); setQuizDone(false) }}>
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
              <p className="lesson-text">学完这一课，你应该能自己说清楚一个最小的数据集方案。</p>
              <div className="lesson-highlight">
                为了<strong>{target}</strong>，我要准备<strong>{dataChoice}</strong>，并给数据贴上<strong>{labelChoice}</strong>这样的标签。
              </div>
              <div className="lesson-tip">
                如果你能把“目标 + 数据 + 标签”三件事一起讲清楚，就说明你已经不只是知道“数据重要”，而是开始会设计数据了。
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
