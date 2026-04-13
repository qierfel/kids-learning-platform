import { useState, useRef, useEffect } from 'react'
import { PICTURE_BOOKS } from '../../data/pictureBooks'
import { mediaUrl } from '../../utils/media'
import './GradedReading.css'

// ── 音频播放器（复用 GradedReading 样式）────────────────────────
function AudioPlayer({ book, color, audioRef, isPlaying, progress, duration, audioError, onToggle, onSeek }) {
  function fmt(sec) {
    if (!sec || isNaN(sec)) return '0:00'
    return `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`
  }
  return (
    <div className="gr-player" style={{ borderColor: color }}>
      <div className="gr-player-title">
        <span className="gr-player-icon">🔊</span>
        <span>{book.title}</span>
      </div>
      <div className="gr-player-controls">
        <button className="gr-play-btn" onClick={onToggle} style={{ background: color }}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <span className="gr-time">{fmt(progress)}</span>
        <div className="gr-progress-bar" onClick={onSeek}>
          <div className="gr-progress-fill" style={{ width: duration ? `${(progress / duration) * 100}%` : '0%', background: color }} />
        </div>
        <span className="gr-time">{fmt(duration)}</span>
      </div>
      {audioError && <div className="gr-audio-error">⚠️ 音频加载失败 — 请确认媒体文件已挂载</div>}
    </div>
  )
}

// ── PDF 阅读器（弗洛格）─────────────────────────────────────────
function PdfReader({ book, color, onClose }) {
  const [pdfError, setPdfError] = useState(false)
  return (
    <div className="gr-reader">
      <div className="gr-reader-header" style={{ borderBottomColor: color }}>
        <button className="gr-back-btn" onClick={onClose}>← 书单</button>
        <div className="gr-reader-title">
          <span className="gr-reader-badge" style={{ background: color }}>Book {book.num}</span>
          <span className="gr-reader-name">{book.title}</span>
        </div>
      </div>
      <div className="gr-reader-body">
        {pdfError ? (
          <div className="gr-pdf-placeholder">
            <div className="gr-pdf-placeholder-icon">📄</div>
            <div className="gr-pdf-placeholder-text">PDF 尚未下载完成</div>
            <div className="gr-pdf-placeholder-sub">PDF 下载完后自动可用</div>
          </div>
        ) : (
          <iframe
            key={book.pdf}
            className="gr-pdf-frame"
            src={mediaUrl(book.pdf)}
            title={book.title}
            onError={() => setPdfError(true)}
          />
        )}
      </div>
    </div>
  )
}

export default function PictureBooks({ onBack }) {
  const [selectedSeries, setSelectedSeries] = useState(null)
  const [playingBook, setPlayingBook]       = useState(null)
  const [pdfBook, setPdfBook]               = useState(null)
  const [isPlaying, setIsPlaying]           = useState(false)
  const [progress, setProgress]             = useState(0)
  const [duration, setDuration]             = useState(0)
  const [audioError, setAudioError]         = useState(false)
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
    audio.src = mediaUrl(book.audio)
    audio.load()
    audio.play().then(() => setIsPlaying(true)).catch(() => setAudioError(true))
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

  // PDF 阅读器视图
  if (pdfBook) {
    const series = PICTURE_BOOKS.find(s => s.id === 'frog')
    return <PdfReader book={pdfBook} color={series.color} onClose={() => setPdfBook(null)} />
  }

  const series = selectedSeries ? PICTURE_BOOKS.find(s => s.id === selectedSeries) : null
  const color = series?.color || '#f59e0b'

  // 书单视图
  if (series) {
    return (
      <div className="gr-page">
        <audio ref={audioRef} />
        <div className="gr-header">
          <button className="gr-back-btn" onClick={() => { setSelectedSeries(null); setPlayingBook(null) }}>← 系列列表</button>
          <div className="gr-header-info">
            <span className="gr-level-badge" style={{ background: color }}>{series.icon} {series.name}</span>
            <span className="gr-header-grade">{series.nameEn}</span>
            <span className="gr-header-count">{series.books.length} 本</span>
          </div>
        </div>

        {series.type === 'audio' && playingBook && (
          <AudioPlayer
            book={playingBook} color={color} audioRef={audioRef}
            isPlaying={isPlaying} progress={progress} duration={duration}
            audioError={audioError} onToggle={togglePlay} onSeek={seek}
          />
        )}

        <div className="gr-book-grid">
          {series.books.map((book) => {
            const active = series.type === 'audio' && playingBook?.num === book.num
            return (
              <button
                key={book.num}
                className={`gr-book-card ${active ? 'active' : ''}`}
                style={active ? { borderColor: color, background: `${color}18` } : {}}
                onClick={() => {
                  if (series.type === 'audio') {
                    playBook(book)
                  } else {
                    setPdfBook(book)
                  }
                }}
              >
                <div className="gr-book-cover" style={{ background: `${color}30` }}>
                  <span className="gr-book-icon">
                    {series.type === 'pdf' ? '📄' : (active && isPlaying ? '🔊' : series.icon)}
                  </span>
                </div>
                <div className="gr-book-num" style={{ color }}>#{book.num}</div>
                <div className="gr-book-title">{book.title}</div>
                {series.type === 'pdf' && <div className="gr-pdf-badge">PDF</div>}
                {active && isPlaying && <div className="gr-playing-dot" style={{ background: color }} />}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // 系列选择首页
  return (
    <div className="gr-page">
      <audio ref={audioRef} />
      <div className="gr-header">
        <button className="gr-back-btn" onClick={onBack}>← 返回</button>
        <div className="gr-title-group">
          <span className="gr-icon">🖼️</span>
          <h2 className="gr-title">英文绘本</h2>
          <span className="gr-subtitle">音频朗读 · PDF绘本</span>
        </div>
      </div>

      <div className="gr-series-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {PICTURE_BOOKS.map(s => (
          <button key={s.id} className="gr-series-card" style={{ borderTopColor: s.color }} onClick={() => setSelectedSeries(s.id)}>
            <div className="gr-series-label" style={{ color: s.color }}>{s.icon} {s.name}</div>
            <div className="gr-series-full">{s.nameEn}</div>
            <div className="gr-series-full">{s.desc}</div>
            <div className="gr-series-total">{s.books.length} 本</div>
          </button>
        ))}
      </div>
    </div>
  )
}
