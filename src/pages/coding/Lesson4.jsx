import { useState } from 'react'
import './Lesson.css'

const POSITIVE_WORDS = ['好', '棒', '喜欢', '开心', '快乐', '美丽', '厉害', '完美', '太好了', '优秀', '精彩', '赞', '爱', '高兴', '满意', '舒服', '有趣']
const NEGATIVE_WORDS = ['差', '烂', '讨厌', '难过', '糟糕', '失败', '伤心', '后悔', '无聊', '坏', '可惜', '失望', '生气', '不好', '恐怖']

function analyzeSentiment(text) {
  let pos = 0
  let neg = 0
  for (const w of POSITIVE_WORDS) {
    const matches = (text.match(new RegExp(w, 'g')) || []).length
    pos += matches
  }
  for (const w of NEGATIVE_WORDS) {
    const matches = (text.match(new RegExp(w, 'g')) || []).length
    neg += matches
  }
  if (pos > neg) return { label: '😊 积极', cls: 'positive', detail: `找到 ${pos} 个积极词，${neg} 个消极词` }
  if (neg > pos) return { label: '😔 消极', cls: 'negative', detail: `找到 ${neg} 个消极词，${pos} 个积极词` }
  return { label: '😐 中性', cls: 'neutral', detail: `积极词和消极词数量相当（各 ${pos} 个）` }
}

const WORD_PREDICT = [
  { sentence: '我昨天去公园，看见了很多漂亮的___', options: ['花朵', '电脑', '汽车', '数学'], correct: 0 },
  { sentence: '小明肚子饿了，他去厨房找___', options: ['书本', '食物', '铅笔', '玩具'], correct: 1 },
  { sentence: '下雨了，妈妈出门要带___', options: ['雨伞', '太阳镜', '冬天外套', '游泳圈'], correct: 0 },
  { sentence: '小狗饿了，汪汪地叫着找___', options: ['猫咪', '骨头', '书本', '汽车'], correct: 1 },
]

const QUIZ = [
  {
    q: 'NLP 是什么的缩写？',
    options: ['Network Language Processing', 'Natural Language Processing', 'Neural Learning Protocol', 'New Language Program'],
    correct: 1,
    explain: 'NLP = Natural Language Processing，自然语言处理。研究让计算机理解和生成人类语言的技术。',
  },
  {
    q: '情感分析能做什么？',
    options: ['分析人的性格', '判断文字是正面/负面/中性', '翻译外语文章', '生成诗歌'],
    correct: 1,
    explain: '情感分析就是让AI判断一段文字表达的情绪倾向——是积极、消极还是中性。购物平台用它分析用户评价！',
  },
  {
    q: 'AI如何预测下一个词？',
    options: ['随机猜测', '从大量文字中学习哪些词经常一起出现', '让人类告诉它', '用字典查询'],
    correct: 1,
    explain: 'AI学习了海量文本后，知道哪些词常常一起出现，就能预测上下文中缺失的词！',
  },
]

export default function Lesson4({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [predIdx, setPredIdx] = useState(0)
  const [predAnswer, setPredAnswer] = useState(null)
  const [predScore, setPredScore] = useState(0)
  const [predDone, setPredDone] = useState(false)
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  function handleAnalyze() {
    if (!text.trim()) return
    setResult(analyzeSentiment(text))
  }

  function handlePredAnswer(optIdx) {
    if (predAnswer !== null) return
    const correct = optIdx === WORD_PREDICT[predIdx].correct
    setPredAnswer({ optIdx, correct })
    if (correct) setPredScore(s => s + 1)
  }

  function nextPred() {
    if (predIdx + 1 >= WORD_PREDICT.length) setPredDone(true)
    else { setPredIdx(i => i + 1); setPredAnswer(null) }
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

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#fef3c7', color: '#92400e' }}>第 4 课</span>
        <span className="lesson-hero-emoji">💬</span>
        <h1 className="lesson-hero-title">AI 如何理解语言</h1>
        <p className="lesson-hero-sub">AI & Natural Language</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>了解AI如何处理和理解文字</li>
          <li>理解情感分析的基本原理</li>
          <li>体验词语预测游戏</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {[['learn', '📖 学一学'], ['sentiment', '😊 情感分析'], ['predict', '🔮 词语预测'], ['quiz', '✅ 测一测']].map(([id, label]) => (
          <button key={id} className={`lesson-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      {/* ── 学一学 ── */}
      {tab === 'learn' && (
        <>
          <div className="lesson-section">
            <div className="lesson-section-title">💬 语言——人类最复杂的发明</div>
            <div className="lesson-card">
              <p className="lesson-text">
                人类交流用语言，但计算机只懂数字。<strong>自然语言处理（NLP）</strong>就是让AI理解、处理人类语言的技术。
              </p>
              <div className="lesson-highlight">
                🤖 NLP = Natural Language Processing（自然语言处理）
              </div>
              <p className="lesson-text">
                每天，NLP都在默默工作：<br />
                • 微信语音转文字 • 机器翻译 • 搜索引擎 • 智能客服 • 写作助手
              </p>
            </div>
          </div>

          <div className="lesson-section">
            <div className="lesson-section-title">🧩 AI 如何"读懂"文字？</div>
            <div className="lesson-card">
              {[
                { step: '第一步', title: '分词', desc: '把句子切成一个个词语。"我爱编程" → ["我", "爱", "编程"]', emoji: '✂️' },
                { step: '第二步', title: '转成数字', desc: '每个词变成一串数字（向量），相近意思的词数字也相近', emoji: '🔢' },
                { step: '第三步', title: '理解上下文', desc: 'AI分析词与词之间的关系，理解整句话的含义', emoji: '🧠' },
                { step: '第四步', title: '生成回应', desc: '根据理解，生成合适的回答、翻译或分析结果', emoji: '💡' },
              ].map(({ step, title, desc, emoji }) => (
                <div key={step} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>{emoji}</span>
                  <div>
                    <div style={{ fontSize: '11px', color: '#888', marginBottom: '2px' }}>{step}</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e', marginBottom: '2px' }}>{title}</div>
                    <div style={{ fontSize: '13px', color: '#555', lineHeight: '1.5' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-section">
            <div className="lesson-section-title">😊 情感分析</div>
            <div className="lesson-card">
              <p className="lesson-text">
                <strong>情感分析</strong>让AI判断文字表达的情绪。购物平台用它自动分析用户评价是好评还是差评！
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '12px 0' }}>
                {[
                  { text: '"这家餐厅太棒了，食物美味极了！"', emoji: '😊', label: '积极', color: '#10b981' },
                  { text: '"等了一个小时，服务态度很差。"', emoji: '😔', label: '消极', color: '#ef4444' },
                  { text: '"这家店在中心街道，营业到晚上十点。"', emoji: '😐', label: '中性', color: '#888' },
                ].map(row => (
                  <div key={row.text} style={{ background: '#f8f9fc', borderRadius: '10px', padding: '10px 12px', border: `2px solid ${row.color}30` }}>
                    <div style={{ fontSize: '13px', color: '#333', marginBottom: '5px', lineHeight: '1.5' }}>"{row.text}"</div>
                    <span style={{ background: row.color + '20', color: row.color, fontSize: '12px', fontWeight: 700, padding: '2px 10px', borderRadius: '10px' }}>
                      {row.emoji} {row.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lesson-section">
            <div className="lesson-section-title">🔮 词语预测</div>
            <div className="lesson-card">
              <p className="lesson-text">
                GPT、文心一言这类AI的核心能力之一，就是预测"下一个词"。它们学习了海量文章后，知道什么词在什么场景中最可能出现。
              </p>
              <div className="lesson-think">
                🤔 想想看：当你看到"我肚子饿了，想吃___"，你会填什么？AI 和你一样，靠上下文来猜！
              </div>
            </div>
          </div>

          <div className="lesson-section">
            <button className="quiz-next-btn" style={{ background: '#f59e0b' }} onClick={() => setTab('sentiment')}>
              继续：试试情感分析 →
            </button>
          </div>
        </>
      )}

      {/* ── 情感分析 ── */}
      {tab === 'sentiment' && (
        <div className="lesson-interactive">
          <div className="interactive-title">😊 情感分析器</div>
          <div className="interactive-card">
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '14px', lineHeight: '1.6' }}>
              输入一句话，AI帮你分析这句话的情感倾向！
              试试"今天天气真好，心情开心极了！"或"这道题太难了，我好失望。"
            </p>
            <textarea
              className="sentiment-input"
              rows={4}
              placeholder="在这里输入你想分析的句子..."
              value={text}
              onChange={e => { setText(e.target.value); setResult(null) }}
            />
            <button className="sentiment-btn" onClick={handleAnalyze}>
              🔍 分析情感
            </button>
            {result && (
              <div className={`sentiment-result ${result.cls}`}>
                <div style={{ fontSize: '28px', marginBottom: '6px' }}>{result.label.split(' ')[0]}</div>
                <div style={{ fontSize: '18px', fontWeight: 800, marginBottom: '4px' }}>{result.label.split(' ')[1]}</div>
                <div style={{ fontSize: '13px', opacity: 0.8 }}>{result.detail}</div>
              </div>
            )}
            <div style={{ marginTop: '14px', padding: '12px', background: '#fffbeb', borderRadius: '10px', fontSize: '12px', color: '#92400e', lineHeight: '1.6', border: '1.5px solid #fef3c7' }}>
              💡 <strong>原理揭秘：</strong>这个简单AI维护了一个"积极词表"和"消极词表"，统计句子里哪类词更多，就判断为哪种情感。真实的AI用更复杂的神经网络，能理解上下文和反讽！
            </div>
          </div>
        </div>
      )}

      {/* ── 词语预测 ── */}
      {tab === 'predict' && (
        <div className="lesson-interactive">
          <div className="interactive-title">🔮 词语预测挑战</div>
          <div className="interactive-card">
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '14px', lineHeight: '1.6' }}>
              根据上下文，猜猜空白处最可能是什么词？这就是AI做的事！
            </p>
            {!predDone ? (
              <>
                <div className="quiz-progress">
                  <span className="quiz-progress-text">{predIdx + 1} / {WORD_PREDICT.length}</span>
                  <div className="quiz-progress-bar">
                    <div className="quiz-progress-fill" style={{ width: `${((predIdx + 1) / WORD_PREDICT.length) * 100}%`, background: '#f59e0b' }} />
                  </div>
                </div>
                <div style={{ background: '#fffbeb', borderRadius: '12px', padding: '16px', marginBottom: '14px', fontSize: '16px', fontWeight: 600, color: '#1a1a2e', lineHeight: '1.6', border: '2px solid #fef3c7' }}>
                  {WORD_PREDICT[predIdx].sentence}
                </div>
                <div className="quiz-options">
                  {WORD_PREDICT[predIdx].options.map((opt, i) => {
                    let cls = 'quiz-option'
                    if (predAnswer !== null) {
                      if (i === WORD_PREDICT[predIdx].correct) cls += ' reveal'
                      else if (i === predAnswer.optIdx && !predAnswer.correct) cls += ' wrong'
                    }
                    return <button key={i} className={cls} onClick={() => handlePredAnswer(i)}>{opt}</button>
                  })}
                </div>
                {predAnswer !== null && (
                  <>
                    <div className={`quiz-feedback ${predAnswer.correct ? 'correct' : 'wrong'}`}>
                      {predAnswer.correct ? '✅ 你和AI想的一样！' : '❌ 这次和AI猜的不同！'} AI 靠上下文推断最可能的词。
                    </div>
                    <button className="quiz-next-btn" style={{ background: '#f59e0b' }} onClick={nextPred}>
                      {predIdx + 1 < WORD_PREDICT.length ? '下一题 →' : '查看结果 →'}
                    </button>
                  </>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '52px', marginBottom: '12px' }}>{predScore >= 3 ? '🏆' : '🤖'}</div>
                <div style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>
                  你猜对了 {predScore} / {WORD_PREDICT.length} 个！
                </div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '16px', lineHeight: '1.6' }}>
                  {predScore === WORD_PREDICT.length ? '太厉害了！你的语言直觉和AI一样准！' : 'AI 用这种方式预测了无数句子，变得越来越聪明！'}
                </div>
                <button className="quiz-next-btn" style={{ background: '#f59e0b' }} onClick={() => { setPredIdx(0); setPredAnswer(null); setPredScore(0); setPredDone(false) }}>
                  再玩一次
                </button>
              </div>
            )}
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
                    <div className="quiz-progress-fill" style={{ width: `${((quizIdx + 1) / QUIZ.length) * 100}%`, background: '#f59e0b' }} />
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
                    <button className="quiz-next-btn" style={{ background: '#f59e0b' }} onClick={nextQuestion}>
                      {quizIdx + 1 < QUIZ.length ? '下一题 →' : '查看结果 →'}
                    </button>
                  </>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '52px', marginBottom: '12px' }}>{quizScore === QUIZ.length ? '🏆' : '🌟'}</div>
                <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>得了 {quizScore} / {QUIZ.length} 分！</div>
                <button className="quiz-next-btn" style={{ background: '#f59e0b' }} onClick={() => { setQuizIdx(0); setQuizAnswer(null); setQuizScore(0); setQuizDone(false) }}>
                  重新测验
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
