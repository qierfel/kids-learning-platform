import { useState } from 'react'
import './ChineseDictionary.css'

const STORAGE_KEY = 'zh_vocab_book'

function loadVocabBook() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}
function saveVocabBook(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export default function ChineseDictionary() {
  const [tab, setTab] = useState('lookup')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [vocabBook, setVocabBook] = useState(loadVocabBook)
  const [bookSearch, setBookSearch] = useState('')
  const [quizMode, setQuizMode] = useState(false)
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizFlipped, setQuizFlipped] = useState(false)

  const isInBook = result
    ? vocabBook.some(w => w.word === result.word)
    : false

  async function search(e) {
    e?.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setResult(null)
    setError('')
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'chinese_dict',
          payload: { word: query.trim() },
        }),
      })
      const data = await res.json()
      if (!data.text) throw new Error('no result')
      // 解析 JSON 格式的返回
      let parsed
      try {
        const jsonStr = data.text.match(/\{[\s\S]*\}/)?.[0]
        parsed = JSON.parse(jsonStr)
      } catch {
        setError('解析失败，请重试')
        setLoading(false)
        return
      }
      setResult(parsed)
    } catch {
      setError(`查询"${query}"失败，请检查网络`)
    }
    setLoading(false)
  }

  function speak(text) {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'zh-CN'
    u.rate = 0.9
    window.speechSynthesis.speak(u)
  }

  function addToBook() {
    if (!result) return
    const newWord = {
      word: result.word,
      pinyin: result.pinyin || '',
      definition: result.definitions?.[0] || '',
      addedAt: Date.now(),
    }
    const updated = [newWord, ...vocabBook.filter(w => w.word !== result.word)]
    setVocabBook(updated)
    saveVocabBook(updated)
  }

  function removeFromBook(word) {
    const updated = vocabBook.filter(w => w.word !== word)
    setVocabBook(updated)
    saveVocabBook(updated)
  }

  const filteredBook = bookSearch.trim()
    ? vocabBook.filter(w =>
        w.word.includes(bookSearch) ||
        w.definition.includes(bookSearch) ||
        (w.pinyin || '').toLowerCase().includes(bookSearch.toLowerCase())
      )
    : vocabBook

  function startQuiz() {
    if (vocabBook.length === 0) return
    setQuizIdx(0)
    setQuizFlipped(false)
    setQuizMode(true)
  }

  // ── 查词 Tab ─────────────────────────────────────
  function renderLookup() {
    return (
      <div className="zhdict-lookup">
        <form className="zhdict-search-form" onSubmit={search}>
          <input
            className="zhdict-search-input"
            type="text"
            placeholder="输入汉字或词语…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          <button className="zhdict-search-btn" type="submit" disabled={loading}>
            {loading ? '…' : '查'}
          </button>
        </form>

        {error && <p className="zhdict-error">{error}</p>}

        {result && (
          <div className="zhdict-result">
            <div className="zhdict-word-row">
              <h2 className="zhdict-word">{result.word}</h2>
              {result.pinyin && <span className="zhdict-pinyin">{result.pinyin}</span>}
              <button className="zhdict-play-btn" onClick={() => speak(result.word)}>🔊</button>
              <button
                className={`zhdict-add-btn ${isInBook ? 'in-book' : ''}`}
                onClick={addToBook}
              >
                {isInBook ? '✅ 已收藏' : '＋ 生词本'}
              </button>
            </div>

            {result.definitions?.length > 0 && (
              <div className="zhdict-section">
                <div className="zhdict-section-label">📖 释义</div>
                {result.definitions.map((d, i) => (
                  <div key={i} className="zhdict-def-item">
                    <span className="zhdict-def-num">{i + 1}.</span> {d}
                  </div>
                ))}
              </div>
            )}

            {result.examples?.length > 0 && (
              <div className="zhdict-section">
                <div className="zhdict-section-label">✏️ 例句</div>
                {result.examples.map((ex, i) => (
                  <div key={i} className="zhdict-example">
                    <span className="zhdict-example-text">{ex}</span>
                    <button className="zhdict-ex-play" onClick={() => speak(ex)}>🔊</button>
                  </div>
                ))}
              </div>
            )}

            {result.synonyms?.length > 0 && (
              <div className="zhdict-section">
                <div className="zhdict-section-label">🔁 近义词</div>
                <div className="zhdict-tags">
                  {result.synonyms.map((s, i) => (
                    <button key={i} className="zhdict-tag" onClick={() => { setQuery(s); setResult(null) }}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            {result.antonyms?.length > 0 && (
              <div className="zhdict-section">
                <div className="zhdict-section-label">↔️ 反义词</div>
                <div className="zhdict-tags">
                  {result.antonyms.map((s, i) => (
                    <button key={i} className="zhdict-tag antonym" onClick={() => { setQuery(s); setResult(null) }}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            {result.tips && (
              <div className="zhdict-tips">
                <span className="zhdict-tips-icon">💡</span> {result.tips}
              </div>
            )}
          </div>
        )}

        {!result && !loading && !error && (
          <div className="zhdict-hint">
            <p>🔍 支持查询单字、词语、成语</p>
            <p>查到的词可以加入生词本，随时复习</p>
          </div>
        )}
      </div>
    )
  }

  // ── 生词本 Tab ────────────────────────────────────
  function renderBook() {
    if (quizMode) {
      const card = vocabBook[quizIdx]
      if (!card) return null
      return (
        <div className="zhdict-quiz">
          <div className="zhdict-quiz-bar">
            <button className="zhdict-quiz-exit" onClick={() => setQuizMode(false)}>✕ 退出复习</button>
            <span className="zhdict-quiz-counter">{quizIdx + 1} / {vocabBook.length}</span>
          </div>
          <div
            className={`zhdict-quiz-card ${quizFlipped ? 'flipped' : ''}`}
            onClick={() => setQuizFlipped(f => !f)}
          >
            <div className="zhdict-quiz-front">
              <div className="zhdict-quiz-word">{card.word}</div>
              {card.pinyin && <div className="zhdict-quiz-pinyin">{card.pinyin}</div>}
              <div className="zhdict-quiz-tap">点击查看释义</div>
            </div>
            <div className="zhdict-quiz-back">
              <div className="zhdict-quiz-def">{card.definition}</div>
            </div>
          </div>
          <div className="zhdict-quiz-nav">
            <button onClick={() => { setQuizIdx(i => Math.max(0, i - 1)); setQuizFlipped(false) }} disabled={quizIdx === 0}>← 上一个</button>
            <button onClick={() => { setQuizIdx(i => Math.min(vocabBook.length - 1, i + 1)); setQuizFlipped(false) }} disabled={quizIdx === vocabBook.length - 1}>下一个 →</button>
          </div>
        </div>
      )
    }

    return (
      <div className="zhdict-book">
        <div className="zhdict-book-header">
          <span className="zhdict-book-count">共 {vocabBook.length} 个词语</span>
          {vocabBook.length > 0 && (
            <button className="zhdict-quiz-start-btn" onClick={startQuiz}>🃏 闪卡复习</button>
          )}
        </div>

        {vocabBook.length > 0 && (
          <div className="zhdict-book-search-row">
            <input
              className="zhdict-book-search"
              type="text"
              placeholder="🔍 搜索生词本"
              value={bookSearch}
              onChange={e => setBookSearch(e.target.value)}
            />
            {bookSearch && <button className="zhdict-book-search-clear" onClick={() => setBookSearch('')}>✕</button>}
          </div>
        )}

        {vocabBook.length === 0 ? (
          <div className="zhdict-book-empty">
            <p>📭 生词本还是空的</p>
            <p>在"查词"中搜索词语，点击"＋ 生词本"即可收藏</p>
          </div>
        ) : filteredBook.length === 0 ? (
          <p className="zhdict-book-no-result">没有匹配的词语</p>
        ) : (
          <div className="zhdict-book-list">
            {filteredBook.map((w, i) => (
              <div key={i} className="zhdict-book-item">
                <div className="zhdict-book-item-left">
                  <div className="zhdict-book-item-word">
                    {w.word}
                    {w.pinyin && <span className="zhdict-book-item-pinyin">{w.pinyin}</span>}
                  </div>
                  <div className="zhdict-book-item-def">{w.definition}</div>
                </div>
                <button className="zhdict-book-remove" onClick={() => removeFromBook(w.word)}>✕</button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="zh-dictionary-page">
      <div className="zhdict-tabs">
        <button className={`zhdict-tab ${tab === 'lookup' ? 'active' : ''}`} onClick={() => setTab('lookup')}>
          🔍 查词
        </button>
        <button className={`zhdict-tab ${tab === 'book' ? 'active' : ''}`} onClick={() => setTab('book')}>
          📒 生词本 {vocabBook.length > 0 && <span className="zhdict-tab-badge">{vocabBook.length}</span>}
        </button>
      </div>
      {tab === 'lookup' ? renderLookup() : renderBook()}
    </div>
  )
}
