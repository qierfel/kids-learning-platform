import { useState } from 'react'
import './Reading.css'

// ─── Data ────────────────────────────────────────────────────────────────────

const PASSAGES = [
  // ── KET ──
  {
    id: 1,
    level: 'KET',
    title: 'A Day at the Zoo',
    topic: 'Animals',
    text: `Last Saturday, Tom and his family went to the city zoo. They saw many animals. Tom loved the pandas most. The pandas were eating bamboo. There was also a show with dolphins. The dolphins could jump very high. Tom's little sister was scared of the lions. They had lunch at the zoo café. Tom had a sandwich and some juice. It was a wonderful day.`,
    questions: [
      {
        q: 'Where did Tom go last Saturday?',
        options: ['To the zoo', 'To the park', 'To the beach', 'To the museum'],
        answer: 0,
        explanation: 'The passage says "Tom and his family went to the city zoo."',
      },
      {
        q: 'What were the pandas doing?',
        options: ['Sleeping', 'Playing', 'Eating bamboo', 'Swimming'],
        answer: 2,
        explanation: 'The text states "The pandas were eating bamboo."',
      },
      {
        q: "How did Tom's sister feel about the lions?",
        options: ['Excited', 'Scared', 'Happy', 'Bored'],
        answer: 1,
        explanation: "The passage says \"Tom's little sister was scared of the lions.\"",
      },
      {
        q: 'What did Tom have for lunch?',
        options: ['Pizza and water', 'Sandwich and juice', 'Noodles and tea', 'Rice and soup'],
        answer: 1,
        explanation: '"Tom had a sandwich and some juice."',
      },
    ],
  },
  {
    id: 2,
    level: 'KET',
    title: 'My Favourite Sport',
    topic: 'Sports',
    text: `Emma loves basketball. She plays basketball every day after school. Her team has twelve players. Emma is the tallest girl on the team. Last week, her team played against another school. The game was exciting. Emma scored ten points. Her team won by five points. After the game, the coach said Emma was the best player. Emma was very happy. She wants to play basketball in college one day.`,
    questions: [
      {
        q: 'When does Emma play basketball?',
        options: ['In the morning', 'At lunchtime', 'After school', 'On weekends'],
        answer: 2,
        explanation: '"She plays basketball every day after school."',
      },
      {
        q: "How many players are on Emma's team?",
        options: ['Ten', 'Eleven', 'Twelve', 'Thirteen'],
        answer: 2,
        explanation: '"Her team has twelve players."',
      },
      {
        q: 'How many points did Emma score?',
        options: ['Five', 'Eight', 'Ten', 'Fifteen'],
        answer: 2,
        explanation: '"Emma scored ten points."',
      },
      {
        q: 'What did the coach say about Emma?',
        options: [
          'She needs to practise more',
          'She was the best player',
          'She should join another team',
          'She scored too few points',
        ],
        answer: 1,
        explanation: '"The coach said Emma was the best player."',
      },
    ],
  },

  // ── PET ──
  {
    id: 3,
    level: 'PET',
    title: 'Social Media and Teenagers',
    topic: 'Technology',
    text: `Social media has become a big part of teenagers' lives. Many young people spend several hours a day on platforms like Instagram and TikTok. While social media helps people stay connected with friends and family, it also has some negative effects. Research shows that too much time on social media can lead to feelings of loneliness and anxiety. Some teenagers compare themselves to others and feel unhappy. However, social media can also be used in positive ways. Young people share creative work, raise awareness about important issues, and even start small businesses online. The key is balance — using social media wisely without letting it control your life.`,
    questions: [
      {
        q: 'According to the text, what is one negative effect of social media?',
        options: [
          'It costs too much money',
          'It can lead to loneliness and anxiety',
          'It makes people lazy',
          'It slows down computers',
        ],
        answer: 1,
        explanation: '"Research shows that too much time on social media can lead to feelings of loneliness and anxiety."',
      },
      {
        q: 'What does the text suggest is most important?',
        options: [
          'Deleting all social media',
          'Only using social media for business',
          'Using social media in a balanced way',
          'Spending more time online',
        ],
        answer: 2,
        explanation: '"The key is balance — using social media wisely without letting it control your life."',
      },
      {
        q: 'Which of the following is mentioned as a positive use of social media?',
        options: ['Watching films', 'Playing games', 'Sharing creative work', 'Reading news'],
        answer: 2,
        explanation: '"Young people share creative work, raise awareness about important issues, and even start small businesses online."',
      },
    ],
  },

  // ── FCE ──
  {
    id: 4,
    level: 'FCE',
    title: 'The Psychology of Colour',
    topic: 'Science & Psychology',
    text: `Colour psychology is the study of how colours affect human behaviour and emotions. Researchers have found that different colours can have significant impacts on our mood, productivity, and even physical health. Red, for instance, is associated with energy and excitement, but it can also increase anxiety and aggression. This is why red is often used in restaurants — it stimulates appetite and encourages people to eat quickly. Blue, on the other hand, is calming and promotes concentration. Many offices and schools use blue because it is believed to enhance productivity. Green is linked to nature and balance, reducing stress and creating a sense of harmony. Yellow represents optimism and creativity, though too much of it can cause irritability. Marketers carefully choose colours to influence consumer behaviour, and interior designers select colours to create specific atmospheres. Understanding colour psychology can help us make better choices about our environments.`,
    questions: [
      {
        q: 'Why is red commonly used in restaurants, according to the text?',
        options: [
          'It is the most attractive colour',
          'It stimulates appetite and encourages fast eating',
          'It reduces customer anxiety',
          'It is associated with luxury',
        ],
        answer: 1,
        explanation: '"This is why red is often used in restaurants — it stimulates appetite and encourages people to eat quickly."',
      },
      {
        q: 'What effect does blue have, according to researchers?',
        options: [
          'It increases energy',
          'It promotes aggression',
          'It enhances productivity',
          'It stimulates creativity',
        ],
        answer: 2,
        explanation: '"Blue... is calming and promotes concentration... it is believed to enhance productivity."',
      },
      {
        q: "The word 'irritability' in the passage is closest in meaning to:",
        options: ['Excitement', 'Sadness', 'Annoyance', 'Confusion'],
        answer: 2,
        explanation: 'Irritability means a tendency to become annoyed or impatient easily — closest to "annoyance".',
      },
      {
        q: 'What is the main purpose of this text?',
        options: [
          'To argue that colour psychology is unreliable',
          'To explain how colours affect us and why this knowledge is useful',
          'To recommend specific colours for offices',
          'To describe how marketers manipulate consumers',
        ],
        answer: 1,
        explanation: 'The passage explains the effects of various colours on behaviour and mood, then concludes that this knowledge helps us make better choices.',
      },
    ],
  },
]

const LEVELS = ['KET', 'PET', 'FCE']
const LEVEL_COLOR = { KET: '#10b981', PET: '#f59e0b', FCE: '#7c3aed' }
const LETTERS = ['A', 'B', 'C', 'D']

// ─── Component ────────────────────────────────────────────────────────────────

export default function Reading({ user, onBack }) {
  const [activeLevel, setActiveLevel] = useState('KET')
  const [selectedPassage, setSelectedPassage] = useState(null)
  const [userAnswers, setUserAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [aiExplain, setAiExplain] = useState('')
  const [aiLoading, setAiLoading] = useState(false)

  const filtered = PASSAGES.filter(p => p.level === activeLevel)

  function openPassage(passage) {
    setSelectedPassage(passage)
    setUserAnswers({})
    setShowResults(false)
    setAiExplain('')
  }

  function closePassage() {
    setSelectedPassage(null)
    setUserAnswers({})
    setShowResults(false)
    setAiExplain('')
  }

  function selectAnswer(qIdx, optIdx) {
    if (showResults) return
    setUserAnswers(prev => ({ ...prev, [qIdx]: optIdx }))
  }

  function checkAnswers() {
    setShowResults(true)
  }

  async function askAI() {
    if (!selectedPassage) return
    setAiLoading(true)
    setAiExplain('')
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'reading_explain',
          payload: {
            title: selectedPassage.title,
            level: selectedPassage.level,
            topic: selectedPassage.topic,
            text: selectedPassage.text,
          },
        }),
      })
      const data = await res.json()
      setAiExplain(data.text || '暂无解析，请稍后重试。')
    } catch {
      setAiExplain('请求失败，请检查网络连接。')
    }
    setAiLoading(false)
  }

  const score = selectedPassage
    ? selectedPassage.questions.filter((q, i) => userAnswers[i] === q.answer).length
    : 0

  // ── Passage Reading View ──
  if (selectedPassage) {
    const total = selectedPassage.questions.length
    const answered = Object.keys(userAnswers).length
    const allAnswered = answered === total

    return (
      <div className="reading-page">
        {/* Header */}
        <div className="reading-header">
          <button className="reading-back-btn" onClick={closePassage}>
            ← 返回列表
          </button>
          <div className="reading-header-info">
            <span
              className="reading-level-tag"
              style={{ background: LEVEL_COLOR[selectedPassage.level] }}
            >
              {selectedPassage.level}
            </span>
            <span className="reading-header-title">{selectedPassage.title}</span>
            <span className="reading-header-topic">{selectedPassage.topic}</span>
          </div>
        </div>

        <div className="reading-body">
          {/* Article */}
          <section className="reading-article">
            <h3 className="article-title">{selectedPassage.title}</h3>
            <p className="article-text">{selectedPassage.text}</p>

            {/* AI Explain */}
            <div className="ai-explain-section">
              <button
                className="ai-explain-btn"
                onClick={askAI}
                disabled={aiLoading}
              >
                {aiLoading ? '⏳ AI 分析中…' : '🤖 AI Explain'}
              </button>
              {aiExplain && (
                <div className="ai-explain-box">
                  <div className="ai-explain-label">AI 解析</div>
                  <p className="ai-explain-text">{aiExplain}</p>
                </div>
              )}
            </div>
          </section>

          {/* Questions */}
          <section className="reading-quiz">
            <h4 className="quiz-heading">Comprehension Questions</h4>
            <div className="quiz-list">
              {selectedPassage.questions.map((q, qIdx) => {
                const chosen = userAnswers[qIdx]
                const isCorrect = chosen === q.answer
                return (
                  <div key={qIdx} className={`quiz-item${showResults ? (isCorrect ? ' correct' : ' wrong') : ''}`}>
                    <p className="quiz-question">
                      <span className="quiz-num">Q{qIdx + 1}.</span> {q.q}
                    </p>
                    <div className="quiz-options">
                      {q.options.map((opt, oIdx) => {
                        let cls = 'quiz-option'
                        if (chosen === oIdx) cls += ' chosen'
                        if (showResults) {
                          if (oIdx === q.answer) cls += ' answer'
                          else if (chosen === oIdx) cls += ' wrong-choice'
                        }
                        return (
                          <button
                            key={oIdx}
                            className={cls}
                            onClick={() => selectAnswer(qIdx, oIdx)}
                            disabled={showResults}
                          >
                            <span className="option-letter">{LETTERS[oIdx]}</span>
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                    {showResults && !isCorrect && (
                      <p className="quiz-explanation">
                        <strong>解析：</strong>{q.explanation}
                      </p>
                    )}
                    {showResults && isCorrect && (
                      <p className="quiz-explanation correct-note">
                        Correct! {q.explanation}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Check Answers */}
            <div className="quiz-footer">
              {!showResults ? (
                <button
                  className="check-btn"
                  onClick={checkAnswers}
                  disabled={!allAnswered}
                >
                  {allAnswered ? 'Check Answers' : `请先回答全部 ${total} 题 (${answered}/${total})`}
                </button>
              ) : (
                <div className="score-display">
                  <span className="score-icon">{score === total ? '🎉' : score >= total / 2 ? '👍' : '💪'}</span>
                  <span className="score-text">
                    得分：{score} / {total}
                    {score === total && '  满分！'}
                  </span>
                  <button
                    className="retry-btn"
                    onClick={() => { setUserAnswers({}); setShowResults(false) }}
                  >
                    重新作答
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    )
  }

  // ── Passage List View ──
  return (
    <div className="reading-page">
      {/* Header */}
      <div className="reading-header">
        {onBack && (
          <button className="reading-back-btn" onClick={onBack}>
            ← 返回
          </button>
        )}
        <div className="reading-title-group">
          <span className="reading-icon">📖</span>
          <h2 className="reading-title">Reading Comprehension</h2>
          <span className="reading-subtitle">英语阅读理解</span>
        </div>
      </div>

      {/* Level Tabs */}
      <div className="reading-level-tabs">
        {LEVELS.map(lv => (
          <button
            key={lv}
            className={`reading-level-tab${activeLevel === lv ? ' active' : ''}`}
            style={activeLevel === lv ? { borderBottomColor: LEVEL_COLOR[lv], color: LEVEL_COLOR[lv] } : {}}
            onClick={() => setActiveLevel(lv)}
          >
            {lv}
          </button>
        ))}
      </div>

      {/* Passage Cards */}
      <div className="reading-content">
        <p className="reading-tip">
          {activeLevel === 'KET' && 'KET (A2) — 基础词汇阅读，适合小学中高年级'}
          {activeLevel === 'PET' && 'PET (B1) — 中级阅读，适合初中阶段'}
          {activeLevel === 'FCE' && 'FCE (B2) — 较难阅读，适合高中及备考阶段'}
        </p>
        <div className="passage-list">
          {filtered.length === 0 && (
            <p className="no-passages">该级别暂无文章，敬请期待。</p>
          )}
          {filtered.map(p => (
            <button
              key={p.id}
              className="passage-card"
              onClick={() => openPassage(p)}
            >
              <div className="passage-card-left">
                <span
                  className="passage-level-badge"
                  style={{ background: LEVEL_COLOR[p.level] }}
                >
                  {p.level}
                </span>
                <div className="passage-info">
                  <div className="passage-card-title">{p.title}</div>
                  <div className="passage-card-meta">
                    <span className="passage-topic">{p.topic}</span>
                    <span className="passage-qcount">{p.questions.length} questions</span>
                  </div>
                </div>
              </div>
              <span className="passage-card-arrow">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
