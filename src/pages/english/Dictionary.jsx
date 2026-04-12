import { useState, useEffect, useCallback } from 'react'
import './Dictionary.css'

const STORAGE_KEY = 'en_vocab_book'

function loadVocabBook() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}
function saveVocabBook(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

// ── Free Dictionary API ──────────────────────────────────────
async function lookupWord(word) {
  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.trim())}`)
  if (!res.ok) throw new Error('not found')
  return res.json()
}

// ── Component ─────────────────────────────────────────────────
export default function Dictionary({ onBack }) {
  const [tab, setTab] = useState('lookup')   // lookup | book
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
    ? vocabBook.some(w => w.word.toLowerCase() === result[0]?.word?.toLowerCase())
    : false

  async function search(e) {
    e?.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setResult(null)
    setError('')
    try {
      const data = await lookupWord(query)
      setResult(data)
    } catch {
      setError(`找不到单词 "${query}"，请检查拼写`)
    }
    setLoading(false)
  }

  function addToBook() {
    if (!result?.[0]) return
    const entry = result[0]
    const shortDef = entry.meanings?.[0]?.definitions?.[0]?.definition || ''
    const phonetic = entry.phonetics?.find(p => p.text)?.text || entry.phonetic || ''
    const pos = entry.meanings?.[0]?.partOfSpeech || ''
    const newWord = {
      word: entry.word,
      phonetic,
      pos,
      definition: shortDef,
      addedAt: Date.now(),
    }
    const updated = [newWord, ...vocabBook.filter(w => w.word.toLowerCase() !== entry.word.toLowerCase())]
    setVocabBook(updated)
    saveVocabBook(updated)
  }

  function removeFromBook(word) {
    const updated = vocabBook.filter(w => w.word !== word)
    setVocabBook(updated)
    saveVocabBook(updated)
  }

  function playAudio(entry) {
    const audioUrl = entry.phonetics?.find(p => p.audio)?.audio
    if (audioUrl) {
      new Audio(audioUrl).play().catch(() => {})
    } else {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(entry.word)
      u.lang = 'en-US'
      window.speechSynthesis.speak(u)
    }
  }

  // ── 生词本 ────────────────────────────────────────────────
  const filteredBook = bookSearch.trim()
    ? vocabBook.filter(w =>
        w.word.toLowerCase().includes(bookSearch.toLowerCase()) ||
        w.definition.toLowerCase().includes(bookSearch.toLowerCase())
      )
    : vocabBook

  function startQuiz() {
    if (vocabBook.length === 0) return
    setQuizIdx(0)
    setQuizFlipped(false)
    setQuizMode(true)
  }

  // ── Lookup Tab ────────────────────────────────────────────
  function renderLookup() {
    return (
      <div className="dict-lookup">
        <form className="dict-search-form" onSubmit={search}>
          <input
            className="dict-search-input"
            type="text"
            placeholder="输入英文单词…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          <button className="dict-search-btn" type="submit" disabled={loading}>
            {loading ? '…' : '查'}
          </button>
        </form>

        {error && <p className="dict-error">{error}</p>}

        {result && result[0] && (() => {
          const entry = result[0]
          return (
            <div className="dict-result">
              <div className="dict-word-row">
                <h2 className="dict-word">{entry.word}</h2>
                {entry.phonetics?.find(p => p.text) && (
                  <span className="dict-phonetic">{entry.phonetics.find(p => p.text).text}</span>
                )}
                <button className="dict-play-btn" onClick={() => playAudio(entry)} title="朗读">🔊</button>
                <button
                  className={`dict-add-btn ${isInBook ? 'in-book' : ''}`}
                  onClick={addToBook}
                >
                  {isInBook ? '✅ 已收藏' : '＋ 加入生词本'}
                </button>
              </div>

              {entry.meanings?.map((m, mi) => (
                <div key={mi} className="dict-meaning-block">
                  <span className="dict-pos">{m.partOfSpeech}</span>
                  {m.definitions.slice(0, 3).map((d, di) => (
                    <div key={di} className="dict-definition">
                      <p className="dict-def-text">
                        <span className="dict-def-num">{di + 1}.</span> {d.definition}
                      </p>
                      {d.example && (
                        <p className="dict-example">"{d.example}"</p>
                      )}
                    </div>
                  ))}
                  {m.synonyms?.length > 0 && (
                    <div className="dict-synonyms">
                      <span className="dict-syn-label">同义词：</span>
                      {m.synonyms.slice(0, 5).map((s, i) => (
                        <button key={i} className="dict-syn-tag" onClick={() => { setQuery(s); setResult(null) }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        })()}

        {!result && !loading && !error && (
          <div className="dict-hint">
            <p>🔍 支持查询任意英文单词</p>
            <p>查到的词可以一键加入生词本，随时复习</p>
          </div>
        )}
      </div>
    )
  }

  // ── 生词本 Tab ─────────────────────────────────────────────
  function renderBook() {
    if (quizMode) {
      const card = vocabBook[quizIdx]
      if (!card) return null
      return (
        <div className="dict-quiz">
          <div className="dict-quiz-bar">
            <button className="dict-quiz-exit" onClick={() => setQuizMode(false)}>✕ 退出复习</button>
            <span className="dict-quiz-counter">{quizIdx + 1} / {vocabBook.length}</span>
          </div>
          <div
            className={`dict-quiz-card ${quizFlipped ? 'flipped' : ''}`}
            onClick={() => setQuizFlipped(f => !f)}
          >
            <div className="dict-quiz-front">
              <div className="dict-quiz-word">{card.word}</div>
              {card.phonetic && <div className="dict-quiz-phonetic">{card.phonetic}</div>}
              <div className="dict-quiz-tap">点击查看释义</div>
            </div>
            <div className="dict-quiz-back">
              {card.pos && <span className="dict-quiz-pos">{card.pos}</span>}
              <div className="dict-quiz-def">{card.definition}</div>
            </div>
          </div>
          <div className="dict-quiz-nav">
            <button onClick={() => { setQuizIdx(i => Math.max(0, i - 1)); setQuizFlipped(false) }} disabled={quizIdx === 0}>← 上一个</button>
            <button onClick={() => { setQuizIdx(i => Math.min(vocabBook.length - 1, i + 1)); setQuizFlipped(false) }} disabled={quizIdx === vocabBook.length - 1}>下一个 →</button>
          </div>
        </div>
      )
    }

    return (
      <div className="dict-book">
        <div className="dict-book-header">
          <span className="dict-book-count">共 {vocabBook.length} 个单词</span>
          {vocabBook.length > 0 && (
            <button className="dict-quiz-start-btn" onClick={startQuiz}>🃏 闪卡复习</button>
          )}
        </div>

        {vocabBook.length > 0 && (
          <div className="dict-book-search-row">
            <input
              className="dict-book-search"
              type="text"
              placeholder="🔍 搜索生词本"
              value={bookSearch}
              onChange={e => setBookSearch(e.target.value)}
            />
            {bookSearch && <button className="dict-book-search-clear" onClick={() => setBookSearch('')}>✕</button>}
          </div>
        )}

        {vocabBook.length === 0 ? (
          <div className="dict-book-empty">
            <p>📭 生词本还是空的</p>
            <p>在"查词"中搜索单词，点击"＋ 加入生词本"即可收藏</p>
          </div>
        ) : filteredBook.length === 0 ? (
          <p className="dict-book-no-result">没有匹配的单词</p>
        ) : (
          <div className="dict-book-list">
            {filteredBook.map((w, i) => (
              <div key={i} className="dict-book-item">
                <div className="dict-book-item-left">
                  <div className="dict-book-item-word">
                    {w.word}
                    {w.phonetic && <span className="dict-book-item-phonetic">{w.phonetic}</span>}
                    {w.pos && <span className="dict-book-item-pos">{w.pos}</span>}
                  </div>
                  <div className="dict-book-item-def">{w.definition}</div>
                </div>
                <button className="dict-book-remove" onClick={() => removeFromBook(w.word)} title="删除">✕</button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="dictionary-page">
      <div className="dict-tabs">
        <button className={`dict-tab ${tab === 'lookup' ? 'active' : ''}`} onClick={() => setTab('lookup')}>
          🔍 查词
        </button>
        <button className={`dict-tab ${tab === 'book' ? 'active' : ''}`} onClick={() => setTab('book')}>
          📒 生词本 {vocabBook.length > 0 && <span className="dict-tab-badge">{vocabBook.length}</span>}
        </button>
      </div>

      {tab === 'lookup' ? renderLookup() : renderBook()}
    </div>
  )
}
