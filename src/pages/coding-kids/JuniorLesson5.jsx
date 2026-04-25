import { useMemo, useState } from 'react'
import './JuniorLesson.css'

const QUESTIONS = [
  {
    title: '你更喜欢哪种地方？',
    answers: [
      { label: '安静角落', type: 'soft' },
      { label: '热闹广场', type: 'spark' },
    ],
  },
  {
    title: '你更想怎么玩？',
    answers: [
      { label: '慢慢画画', type: 'soft' },
      { label: '闯关冒险', type: 'spark' },
    ],
  },
]

export default function JuniorLesson5({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [answers, setAnswers] = useState({})

  const result = useMemo(() => {
    const picks = Object.values(answers)
    const spark = picks.filter((x) => x === 'spark').length
    if (spark >= 2) return { emoji: '🚀', title: '你是冒险火花型', copy: '你喜欢动起来、试试看、冲向新东西。' }
    if (spark === 1) return { emoji: '🎈', title: '你是混合创作型', copy: '你既喜欢安静做东西，也喜欢偶尔冲刺。' }
    return { emoji: '🪴', title: '你是温柔创作型', copy: '你喜欢慢慢做、认真看、把作品养大。' }
  }, [answers])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #fce7f3, #fae8ff)' }}>
        <div className="junior-badge" style={{ background: '#fbcfe8', color: '#be185d' }}>第 5 课</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">🎮</div></div>
          <div>
            <h1 className="junior-title">选择小游戏</h1>
            <p className="junior-sub">选一选，就会出现不同结果</p>
          </div>
        </div>
      </div>
      <div className="junior-goals">
        <div className="junior-goal">做一个有选项的小测试</div>
        <div className="junior-goal">看到不同选择会有不同结果</div>
      </div>
      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((key) => (
          <button key={key} className="junior-tab" onClick={() => setTab(key)} style={tab === key ? { borderColor: '#ec4899', color: '#be185d' } : {}}>
            {key === 'learn' ? '看一看' : key === 'do' ? '玩一玩' : key === 'ai' ? '问问 AI' : '我学会了'}
          </button>
        ))}
      </div>
      <div className="junior-content">
        {tab === 'learn' && (
          <div className="junior-card">
            <h2>小游戏为什么有趣？</h2>
            <p>因为你一选，页面就会回应你。这样的页面，已经很像真正的小作品了。</p>
          </div>
        )}
        {tab === 'do' && (
          <div className="junior-card">
            <h2>测测你是哪种小创作者</h2>
            {QUESTIONS.map((q, idx) => (
              <div key={q.title} className="junior-stage">
                <div style={{ fontWeight: 900, color: '#1f2937' }}>{idx + 1}. {q.title}</div>
                <div className="junior-grid-2">
                  {q.answers.map((ans) => (
                    <button
                      key={ans.label}
                      className={`junior-option-btn${answers[idx] === ans.type ? ' active' : ''}`}
                      onClick={() => setAnswers((prev) => ({ ...prev, [idx]: ans.type }))}
                      style={answers[idx] === ans.type ? { borderColor: '#ec4899', color: '#be185d' } : {}}
                    >
                      <div>{ans.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {Object.keys(answers).length === QUESTIONS.length && (
              <div className="junior-result">
                <div style={{ fontSize: 52, textAlign: 'center' }}>{result.emoji}</div>
                <div className="junior-result-title" style={{ textAlign: 'center', marginTop: 8 }}>{result.title}</div>
                <div className="junior-result-copy" style={{ textAlign: 'center' }}>{result.copy}</div>
              </div>
            )}
          </div>
        )}
        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <div className="junior-prompt">{`我想做一个给小朋友玩的选择小游戏。\n请帮我想 2 个问题，\n每个问题 2 个选项，\n最后给出 3 种可爱的结果。`}</div>
          </div>
        )}
        {tab === 'work' && (
          <div className="junior-card">
            <h2>今天我学会了</h2>
            <p>一个有选项、有结果的小测试，就是一个很棒的小作品。</p>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">🎮💖</div>
              <h3>小游戏设计师</h3>
              <p>你已经会做自己的选择测试啦。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
