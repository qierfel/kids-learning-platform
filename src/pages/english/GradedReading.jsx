import { useState, useRef, useEffect } from 'react'
import razLevels from '../../data/razLevels'
import { HEINEMANN } from '../../data/heinemann'
import { OXFORD_TREE } from '../../data/oxfordTree'
import { LRFOS } from '../../data/lrfos'
import PdfCover, { PlaceholderCover } from '../../components/PdfCover'

// 统一书卡封面组件
function BookCover({ book, color, isPlaying }) {
  return (
    <div className="gr-book-cover">
      {book?.pdf
        ? <PdfCover pdfUrl={book.pdf} color={color} title={book.title} />
        : <PlaceholderCover color={color} title={book?.title || ''} />
      }
      {isPlaying && (
        <div className="gr-cover-playing-overlay">
          <span>🔊</span>
        </div>
      )}
    </div>
  )
}
import './GradedReading.css'

const LEVEL_COLORS = {
  aa: '#a78bfa', A: '#60a5fa', B: '#34d399', C: '#4ade80',
  D: '#86efac', E: '#fde68a', F: '#fcd34d', G: '#fb923c',
  H: '#f87171', I: '#f472b6', J: '#c084fc', K: '#818cf8',
  L: '#38bdf8', M: '#2dd4bf', O: '#a3e635', P: '#facc15',
  Q: '#fb923c', R: '#f87171', S: '#e879f9', T: '#94a3b8',
}
const GRADE_ZH = {
  'Pre-K': '学前', 'K': '幼儿园',
  'G1': '一年级', 'G1-2': '一二年级', 'G2': '二年级',
  'G2-3': '二三年级', 'G3': '三年级', 'G3-4': '三四年级',
  'G4': '四年级', 'G4-5': '四五年级', 'G5': '五年级',
  'G5-6': '五六年级', 'G6': '六年级',
}

const totalHeinemann = HEINEMANN.levels.reduce((s, l) => s + l.books.length, 0)

const SERIES = [
  { id: 'raz',       label: 'RAZ',    labelFull: 'Reading A-Z',        color: '#6366f1', total: razLevels.reduce((s,l)=>s+l.count,0) },
  { id: 'heinemann', label: '海尼曼', labelFull: 'Heinemann GK·G1·G2', color: '#f59e0b', total: totalHeinemann },
  { id: 'oxford',    label: '牛津树', labelFull: 'Oxford Reading Tree', color: '#10b981', total: OXFORD_TREE.books.length },
  { id: 'lrfos',    label: 'LRFOS',  labelFull: "Let's Read and Find Out Science", color: '#0ea5e9', total: LRFOS.books.length },
]

// ── 通用音频播放器 ─────────────────────────────────────────────
function AudioPlayer({ book, color, audioRef, isPlaying, progress, duration, audioError, onToggle, onSeek, compact }) {
  function fmt(sec) {
    if (!sec || isNaN(sec)) return '0:00'
    return `${Math.floor(sec/60)}:${String(Math.floor(sec%60)).padStart(2,'0')}`
  }
  return (
    <div className={`gr-player ${compact ? 'compact' : ''}`} style={{ borderColor: color }}>
      {!compact && (
        <div className="gr-player-title">
          <span className="gr-player-icon">🔊</span>
          <span>{book.title}</span>
        </div>
      )}
      <div className="gr-player-controls">
        <button className="gr-play-btn" onClick={onToggle} style={{ background: color }}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <span className="gr-time">{fmt(progress)}</span>
        <div className="gr-progress-bar" onClick={onSeek}>
          <div className="gr-progress-fill" style={{ width: duration ? `${(progress/duration)*100}%` : '0%', background: color }} />
        </div>
        <span className="gr-time">{fmt(duration)}</span>
      </div>
      {audioError && <div className="gr-audio-error">⚠️ 音频加载失败 — 请确认开发服务器已启动</div>}
    </div>
  )
}

// ── 书本阅读器（音频 + PDF）────────────────────────────────────
function BookReader({ book, color, onClose }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress]   = useState(0)
  const [duration, setDuration]   = useState(0)
  const [audioError, setAudioError] = useState(false)
  const [pdfError, setPdfError]   = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => setProgress(audio.currentTime)
    const onDur  = () => setDuration(audio.duration)
    const onEnd  = () => setIsPlaying(false)
    const onErr  = () => setAudioError(true)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onDur)
    audio.addEventListener('ended', onEnd)
    audio.addEventListener('error', onErr)
    // auto-play
    audio.src = book.audio
    audio.load()
    audio.play().then(() => setIsPlaying(true)).catch(() => {})
    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onDur)
      audio.removeEventListener('ended', onEnd)
      audio.removeEventListener('error', onErr)
    }
  }, [book.audio])

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) { audio.pause(); setIsPlaying(false) }
    else { audio.play().then(() => setIsPlaying(true)).catch(() => setAudioError(true)) }
  }
  function seek(e) {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * duration
  }

  return (
    <div className="gr-reader">
      <audio ref={audioRef} />
      {/* 顶部栏 */}
      <div className="gr-reader-header" style={{ borderBottomColor: color }}>
        <button className="gr-back-btn" onClick={onClose}>← 书单</button>
        <div className="gr-reader-title">
          <span className="gr-reader-badge" style={{ background: color }}>Book {book.num}</span>
          <span className="gr-reader-name">{book.title}</span>
        </div>
        <AudioPlayer
          book={book} color={color} audioRef={audioRef}
          isPlaying={isPlaying} progress={progress} duration={duration}
          audioError={audioError} onToggle={togglePlay} onSeek={seek}
          compact
        />
      </div>

      {/* PDF 区域 */}
      <div className="gr-reader-body">
        {pdfError ? (
          <div className="gr-pdf-placeholder">
            <div className="gr-pdf-placeholder-icon">📄</div>
            <div className="gr-pdf-placeholder-text">PDF 尚未下载完成</div>
            <div className="gr-pdf-placeholder-sub">音频已可播放，PDF 下载完后自动可用</div>
          </div>
        ) : (
          <iframe
            key={book.pdf}
            className="gr-pdf-frame"
            src={book.pdf}
            title={book.title}
            onError={() => setPdfError(true)}
          />
        )}
      </div>
    </div>
  )
}

export default function GradedReading({ onBack }) {
  const [series, setSeries]               = useState('raz')
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [selectedStage, setSelectedStage] = useState(null)
  const [heinLevel, setHeinLevel]         = useState('gk')
  const [lrfosLevel, setLrfosLevel]       = useState('l1')
  const [readingBook, setReadingBook]     = useState(null)   // 阅读器打开的书（有PDF）
  const [playingBook, setPlayingBook]     = useState(null)   // 卡片内联播放的书（无PDF）
  const [isPlaying, setIsPlaying]         = useState(false)
  const [progress, setProgress]           = useState(0)
  const [duration, setDuration]           = useState(0)
  const [audioError, setAudioError]       = useState(false)
  const [searchQuery, setSearchQuery]     = useState('')
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => setProgress(audio.currentTime)
    const onDur  = () => setDuration(audio.duration)
    const onEnd  = () => setIsPlaying(false)
    const onErr  = () => setAudioError(true)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onDur)
    audio.addEventListener('ended', onEnd)
    audio.addEventListener('error', onErr)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onDur)
      audio.removeEventListener('ended', onEnd)
      audio.removeEventListener('error', onErr)
    }
  }, [])

  function playBook(book) {
    setAudioError(false)
    setPlayingBook(book)
    setProgress(0); setDuration(0)
    const audio = audioRef.current
    if (!audio) return
    audio.src = book.audio
    audio.load()
    audio.play().then(() => setIsPlaying(true)).catch(() => setAudioError(true))
  }

  function openBook(book) {
    if (book.pdf) {
      setReadingBook(book)
    } else {
      playBook(book)
    }
  }

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) { audio.pause(); setIsPlaying(false) }
    else { audio.play().then(() => setIsPlaying(true)).catch(() => setAudioError(true)) }
  }

  function seek(e) {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const t = ((e.clientX - rect.left) / rect.width) * duration
    audio.currentTime = t; setProgress(t)
  }

  function changeSeries(s) {
    setSeries(s); setSelectedLevel(null); setSelectedStage(null)
    setPlayingBook(null); setReadingBook(null); setSearchQuery('')
  }

  const seriesInfo = SERIES.find(s => s.id === series)
  const color = seriesInfo.color

  // ── 阅读器（海尼曼 GK 有PDF）────────────────────────────────
  if (readingBook) {
    const c = LEVEL_COLORS[selectedLevel] || color
    return (
      <BookReader
        book={readingBook}
        color={series === 'raz' ? c : color}
        onClose={() => setReadingBook(null)}
      />
    )
  }

  // ── 书单页（RAZ）─────────────────────────────────────────────
  if (series === 'raz' && selectedLevel) {
    const levelData = razLevels.find(l => l.level === selectedLevel)
    const lcolor = LEVEL_COLORS[selectedLevel] || color
    const q = searchQuery.toLowerCase()
    const books = q ? levelData.books.filter(b => b.title.toLowerCase().includes(q)) : levelData.books
    return (
      <div className="gr-page">
        <audio ref={audioRef} />
        <div className="gr-header">
          <button className="gr-back-btn" onClick={() => { setSelectedLevel(null); setPlayingBook(null) }}>← 级别列表</button>
          <div className="gr-header-info">
            <span className="gr-level-badge" style={{ background: lcolor }}>Level {levelData.level}</span>
            <span className="gr-header-grade">{GRADE_ZH[levelData.grade] || levelData.grade}</span>
            <span className="gr-header-count">{levelData.count} 本</span>
          </div>
        </div>
        {playingBook && <AudioPlayer book={playingBook} color={lcolor} audioRef={audioRef} isPlaying={isPlaying} progress={progress} duration={duration} audioError={audioError} onToggle={togglePlay} onSeek={seek} />}
        <div className="gr-search-row">
          <input className="gr-search-input" placeholder="🔍 搜索书名" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          {searchQuery && <button className="gr-search-clear" onClick={() => setSearchQuery('')}>✕</button>}
        </div>
        <div className="gr-book-grid">
          {books.map((book, i) => {
            const active = playingBook?.title === book.title
            return (
              <button key={i} className={`gr-book-card ${active ? 'active' : ''}`}
                style={active ? { borderColor: lcolor, background: `${lcolor}18` } : {}}
                onClick={() => openBook(book)}>
                <BookCover book={book} color={lcolor} isPlaying={active && isPlaying} />
                <div className="gr-book-title">{book.title}</div>
                {active && isPlaying && <div className="gr-playing-dot" style={{ background: lcolor }} />}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // ── 书单页（海尼曼）────────────────────────────────────────────
  if (series === 'heinemann') {
    const currentLevel = HEINEMANN.levels.find(l => l.id === heinLevel)
    const q = searchQuery.toLowerCase()
    const books = q
      ? currentLevel.books.filter(b => b.title.toLowerCase().includes(q) || String(b.num).includes(q))
      : currentLevel.books
    return (
      <div className="gr-page">
        <audio ref={audioRef} />
        <div className="gr-header">
          <button className="gr-back-btn" onClick={() => changeSeries('raz')}>← 返回</button>
          <div className="gr-header-info">
            <span className="gr-level-badge" style={{ background: color }}>海尼曼</span>
            <span className="gr-header-grade">{currentLevel.label} · {currentLevel.desc}</span>
            <span className="gr-header-count">{books.length} 本</span>
          </div>
        </div>
        {playingBook && <AudioPlayer book={playingBook} color={color} audioRef={audioRef} isPlaying={isPlaying} progress={progress} duration={duration} audioError={audioError} onToggle={togglePlay} onSeek={seek} />}

        {/* 级别 tabs */}
        <div className="gr-stage-tabs">
          {HEINEMANN.levels.map(lv => (
            <button
              key={lv.id}
              className={`gr-stage-tab ${heinLevel === lv.id ? 'active' : ''}`}
              style={heinLevel === lv.id ? { borderBottomColor: color, color } : {}}
              onClick={() => { setHeinLevel(lv.id); setSearchQuery(''); setPlayingBook(null) }}
            >
              {lv.label}
              <span className="gr-stage-tab-sub">{lv.books.length}本{lv.hasPdf ? ' · PDF' : ''}</span>
            </button>
          ))}
        </div>

        <div className="gr-search-row">
          <input className="gr-search-input" placeholder="🔍 搜索书名或编号" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          {searchQuery && <button className="gr-search-clear" onClick={() => setSearchQuery('')}>✕</button>}
        </div>
        <div className="gr-book-grid">
          {books.map((book, i) => {
            const active = playingBook?.title === book.title
            return (
              <button key={i} className={`gr-book-card ${active ? 'active' : ''}`}
                style={active ? { borderColor: color, background: `${color}18` } : {}}
                onClick={() => openBook(book)}>
                <BookCover book={book} color={color} isPlaying={active && isPlaying} />
                <div className="gr-book-num" style={{ color }}>
                  Book {book.num}{book.level ? ` · Lv.${book.level}` : ''}
                </div>
                <div className="gr-book-title">{book.title}</div>
                {book.pdf && <div className="gr-pdf-badge">PDF</div>}
                {active && isPlaying && <div className="gr-playing-dot" style={{ background: color }} />}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // ── 书单页（LRFOS）─────────────────────────────────────────────
  if (series === 'lrfos') {
    const currentLevel = LRFOS.levels.find(l => l.id === lrfosLevel)
    const q = searchQuery.toLowerCase()
    const books = q
      ? currentLevel.books.filter(b => b.title.toLowerCase().includes(q) || String(b.num).includes(q))
      : currentLevel.books
    return (
      <div className="gr-page">
        <audio ref={audioRef} />
        <div className="gr-header">
          <button className="gr-back-btn" onClick={() => changeSeries('raz')}>← 返回</button>
          <div className="gr-header-info">
            <span className="gr-level-badge" style={{ background: color }}>LRFOS</span>
            <span className="gr-header-grade">{currentLevel.label} · {currentLevel.desc}</span>
            <span className="gr-header-count">{books.length} 本</span>
          </div>
        </div>
        {playingBook && <AudioPlayer book={playingBook} color={color} audioRef={audioRef} isPlaying={isPlaying} progress={progress} duration={duration} audioError={audioError} onToggle={togglePlay} onSeek={seek} />}

        {/* 级别 tabs */}
        <div className="gr-stage-tabs">
          {LRFOS.levels.map(lv => (
            <button
              key={lv.id}
              className={`gr-stage-tab ${lrfosLevel === lv.id ? 'active' : ''}`}
              style={lrfosLevel === lv.id ? { borderBottomColor: color, color } : {}}
              onClick={() => { setLrfosLevel(lv.id); setSearchQuery(''); setPlayingBook(null) }}
            >
              {lv.label}
              <span className="gr-stage-tab-sub">{lv.books.length}本{lv.hasPdf ? ' · PDF' : ''}</span>
            </button>
          ))}
        </div>

        <div className="gr-search-row">
          <input className="gr-search-input" placeholder="🔍 搜索书名或编号" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          {searchQuery && <button className="gr-search-clear" onClick={() => setSearchQuery('')}>✕</button>}
        </div>
        <div className="gr-book-grid">
          {books.map((book, i) => {
            const active = playingBook?.title === book.title
            return (
              <button key={i} className={`gr-book-card ${active ? 'active' : ''}`}
                style={active ? { borderColor: color, background: `${color}18` } : {}}
                onClick={() => openBook(book)}>
                <BookCover book={book} color={color} isPlaying={active && isPlaying} />
                <div className="gr-book-num" style={{ color }}>Book {book.num}</div>
                <div className="gr-book-title">{book.title}</div>
                {book.pdf && <div className="gr-pdf-badge">PDF</div>}
                {active && isPlaying && <div className="gr-playing-dot" style={{ background: color }} />}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // ── 书单页（牛津树）────────────────────────────────────────────
  if (series === 'oxford') {
    const stages = OXFORD_TREE.stages
    const q = searchQuery.toLowerCase()
    const stageBooks = selectedStage
      ? OXFORD_TREE.books.filter(b => b.stage === selectedStage)
      : OXFORD_TREE.books
    const books = q ? stageBooks.filter(b => b.title.toLowerCase().includes(q)) : stageBooks
    return (
      <div className="gr-page">
        <audio ref={audioRef} />
        <div className="gr-header">
          <button className="gr-back-btn" onClick={() => changeSeries('raz')}>← 返回</button>
          <div className="gr-header-info">
            <span className="gr-level-badge" style={{ background: color }}>牛津树</span>
            <span className="gr-header-grade">Stage {selectedStage || '5-9'}</span>
            <span className="gr-header-count">{books.length} 本</span>
          </div>
        </div>
        {playingBook && <AudioPlayer book={playingBook} color={color} audioRef={audioRef} isPlaying={isPlaying} progress={progress} duration={duration} audioError={audioError} onToggle={togglePlay} onSeek={seek} />}
        <div className="gr-stage-tabs">
          <button className={`gr-stage-tab ${!selectedStage ? 'active' : ''}`} style={!selectedStage ? { borderBottomColor: color, color } : {}} onClick={() => setSelectedStage(null)}>全部</button>
          {stages.map(s => (
            <button key={s} className={`gr-stage-tab ${selectedStage === s ? 'active' : ''}`}
              style={selectedStage === s ? { borderBottomColor: color, color } : {}}
              onClick={() => setSelectedStage(s)}>Stage {s}</button>
          ))}
        </div>
        <div className="gr-search-row">
          <input className="gr-search-input" placeholder="🔍 搜索书名" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          {searchQuery && <button className="gr-search-clear" onClick={() => setSearchQuery('')}>✕</button>}
        </div>
        <div className="gr-book-grid">
          {books.map((book, i) => {
            const active = playingBook?.title === book.title
            return (
              <button key={i} className={`gr-book-card ${active ? 'active' : ''}`}
                style={active ? { borderColor: color, background: `${color}18` } : {}}
                onClick={() => openBook(book)}>
                <BookCover book={book} color={color} isPlaying={active && isPlaying} />
                <div className="gr-book-num" style={{ color }}>Stage {book.stage}-{String(book.num).padStart(2,'0')}</div>
                <div className="gr-book-title">{book.title}</div>
                {active && isPlaying && <div className="gr-playing-dot" style={{ background: color }} />}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // ── 系列选择首页 ───────────────────────────────────────────────
  return (
    <div className="gr-page">
      <audio ref={audioRef} />
      <div className="gr-header">
        <button className="gr-back-btn" onClick={onBack}>← 返回</button>
        <div className="gr-title-group">
          <span className="gr-icon">📚</span>
          <h2 className="gr-title">分级读物</h2>
          <span className="gr-subtitle">四大系列 · 音频朗读</span>
        </div>
      </div>

      <div className="gr-series-grid">
        {SERIES.map(s => (
          <button key={s.id} className="gr-series-card" style={{ borderTopColor: s.color }} onClick={() => changeSeries(s.id)}>
            <div className="gr-series-label" style={{ color: s.color }}>{s.label}</div>
            <div className="gr-series-full">{s.labelFull}</div>
            <div className="gr-series-total">{s.total} 本</div>
          </button>
        ))}
      </div>

      <div className="gr-section-title">📗 RAZ 级别选择</div>
      <div className="gr-level-grid">
        {razLevels.map(lv => {
          const c = LEVEL_COLORS[lv.level] || '#60a5fa'
          return (
            <button key={lv.level} className="gr-level-card" style={{ borderTopColor: c }}
              onClick={() => { setSeries('raz'); setSelectedLevel(lv.level) }}>
              <div className="gr-level-name" style={{ color: c }}>Level {lv.level}</div>
              <div className="gr-level-grade">{GRADE_ZH[lv.grade] || lv.grade}</div>
              <div className="gr-level-ar">AR {lv.ar}</div>
              <div className="gr-level-desc">{lv.desc}</div>
              <div className="gr-level-count">{lv.count} 本 →</div>
            </button>
          )
        })}
        {['N','U','V','W','X','Y','Z'].map(lv => (
          <div key={lv} className="gr-level-card coming">
            <div className="gr-level-name" style={{ color: '#94a3b8' }}>Level {lv}</div>
            <div className="gr-level-coming">下载中…</div>
          </div>
        ))}
      </div>
    </div>
  )
}
