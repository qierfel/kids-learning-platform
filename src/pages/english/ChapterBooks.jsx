import { useState, useRef, useEffect } from 'react'
import { CHAPTER_BOOKS } from '../../data/chapterBooks'
import './GradedReading.css'

const cbStyles = `
.cb-chapter-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 8px 20px 80px;
}
.cb-chapter-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition: background 0.12s, border-color 0.12s;
  background: #fff;
  margin-bottom: 4px;
}
.cb-chapter-item:hover {
  background: #f8fafc;
  border-color: #e2e8f0;
}
.cb-chapter-item.active {
  border-color: var(--cb-color, #b8341f);
  background: color-mix(in srgb, var(--cb-color, #b8341f) 8%, #fff);
}
.cb-chapter-num {
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  width: 32px;
  flex-shrink: 0;
  text-align: center;
}
.cb-chapter-item.active .cb-chapter-num {
  color: var(--cb-color, #b8341f);
}
.cb-chapter-title {
  flex: 1;
  font-size: 14px;
  color: #1e293b;
  line-height: 1.4;
}
.cb-playing-icon {
  font-size: 14px;
  animation: pulse 1s ease-in-out infinite;
}
.cb-bottom-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 2px solid #e2e8f0;
  padding: 10px 16px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.cb-bottom-title {
  font-size: 12px;
  color: #475569;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cb-track-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 6px;
  padding: 14px 20px 60px;
}
.cb-track-btn {
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px 4px;
  font-size: 12px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  text-align: center;
  transition: background 0.12s, border-color 0.12s;
}
.cb-track-btn:hover { background: #f8fafc; }
.cb-track-btn.active {
  border-color: var(--cb-color, #6366f1);
  background: color-mix(in srgb, var(--cb-color, #6366f1) 10%, #fff);
  color: var(--cb-color, #6366f1);
}
.cb-book-tabs {
  display: flex;
  gap: 8px;
  padding: 12px 20px 0;
  flex-wrap: wrap;
}
.cb-book-tab {
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  border: 2px solid #e2e8f0;
  background: #fff;
  color: #475569;
  cursor: pointer;
  transition: all 0.12s;
}
.cb-book-tab.active {
  border-color: var(--cb-color, #6366f1);
  background: color-mix(in srgb, var(--cb-color, #6366f1) 12%, #fff);
  color: var(--cb-color, #6366f1);
}
`

function fmt(sec) {
  if (!sec || isNaN(sec)) return '0:00'
  return `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`
}

function BottomPlayer({ title, color, audioRef, isPlaying, progress, duration, audioError, onToggle, onSeek }) {
  return (
    <div className="cb-bottom-player">
      <div className="cb-bottom-title">🔊 {title}</div>
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

export default function ChapterBooks({ onBack }) {
  const [selectedSeries, setSelectedSeries] = useState(null)
  const [selectedBook, setSelectedBook]     = useState(null)  // for readers_2000
  const [playingItem, setPlayingItem]       = useState(null)  // { audio, label }
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

  function playAudio(audioSrc, label) {
    setAudioError(false)
    setPlayingItem({ audio: audioSrc, label })
    setProgress(0); setDuration(0)
    const audio = audioRef.current
    if (!audio) return
    audio.src = audioSrc
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

  const series = selectedSeries ? CHAPTER_BOOKS.find(s => s.id === selectedSeries) : null
  const color = series?.color || '#b8341f'

  // ── 西游记章节列表 ──────────────────────────────────────────────
  if (series?.id === 'journey_west') {
    return (
      <div className="gr-page" style={{ '--cb-color': color }}>
        <style>{cbStyles}</style>
        <audio ref={audioRef} />
        <div className="gr-header">
          <button className="gr-back-btn" onClick={() => { setSelectedSeries(null); setPlayingItem(null) }}>← 系列列表</button>
          <div className="gr-header-info">
            <span className="gr-level-badge" style={{ background: color }}>{series.icon} {series.name}</span>
            <span className="gr-header-grade">{series.desc}</span>
          </div>
        </div>
        <div className="cb-chapter-list">
          {series.chapters.map(ch => {
            const active = playingItem?.audio === ch.audio
            return (
              <div
                key={ch.num}
                className={`cb-chapter-item ${active ? 'active' : ''}`}
                style={{ '--cb-color': color }}
                onClick={() => playAudio(ch.audio, `Chapter ${ch.num}: ${ch.title}`)}
              >
                <span className="cb-chapter-num">{ch.num}</span>
                <span className="cb-chapter-title">{ch.title}</span>
                {active && isPlaying && <span className="cb-playing-icon">🔊</span>}
              </div>
            )
          })}
        </div>
        {playingItem && (
          <BottomPlayer
            title={playingItem.label} color={color} audioRef={audioRef}
            isPlaying={isPlaying} progress={progress} duration={duration}
            audioError={audioError} onToggle={togglePlay} onSeek={seek}
          />
        )}
      </div>
    )
  }

  // ── 2000词章节书 ───────────────────────────────────────────────
  if (series?.id === 'readers_2000') {
    const currentBook = selectedBook !== null
      ? series.books.find(b => b.bookNum === selectedBook)
      : null
    return (
      <div className="gr-page" style={{ '--cb-color': color }}>
        <style>{cbStyles}</style>
        <audio ref={audioRef} />
        <div className="gr-header">
          <button className="gr-back-btn" onClick={() => { setSelectedSeries(null); setPlayingItem(null); setSelectedBook(null) }}>← 系列列表</button>
          <div className="gr-header-info">
            <span className="gr-level-badge" style={{ background: color }}>{series.icon} {series.name}</span>
            <span className="gr-header-grade">{series.desc}</span>
          </div>
        </div>

        {/* 册选择 tabs */}
        <div className="cb-book-tabs">
          {series.books.map(b => (
            <button
              key={b.bookNum}
              className={`cb-book-tab ${selectedBook === b.bookNum ? 'active' : ''}`}
              style={{ '--cb-color': color }}
              onClick={() => { setSelectedBook(b.bookNum); setPlayingItem(null) }}
            >
              {b.title}
            </button>
          ))}
        </div>

        {currentBook ? (
          <>
            <div className="gr-section-title" style={{ paddingTop: 14 }}>
              {currentBook.title} — {currentBook.trackCount} 个 Track
            </div>
            <div className="cb-track-grid">
              {Array.from({ length: currentBook.trackCount }, (_, i) => i + 1).map(trackNum => {
                const audioSrc = series.audioPath(currentBook.bookNum, trackNum)
                const active = playingItem?.audio === audioSrc
                return (
                  <button
                    key={trackNum}
                    className={`cb-track-btn ${active ? 'active' : ''}`}
                    style={{ '--cb-color': color }}
                    onClick={() => playAudio(audioSrc, `Book ${currentBook.bookNum} Track ${trackNum}`)}
                  >
                    {active && isPlaying ? '🔊' : `T${trackNum}`}
                  </button>
                )
              })}
            </div>
            {playingItem && (
              <BottomPlayer
                title={playingItem.label} color={color} audioRef={audioRef}
                isPlaying={isPlaying} progress={progress} duration={duration}
                audioError={audioError} onToggle={togglePlay} onSeek={seek}
              />
            )}
          </>
        ) : (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
            请选择一册开始播放
          </div>
        )}
      </div>
    )
  }

  // ── 系列选择首页 ───────────────────────────────────────────────
  return (
    <div className="gr-page">
      <style>{cbStyles}</style>
      <audio ref={audioRef} />
      <div className="gr-header">
        <button className="gr-back-btn" onClick={onBack}>← 返回</button>
        <div className="gr-title-group">
          <span className="gr-icon">📖</span>
          <h2 className="gr-title">章节书</h2>
          <span className="gr-subtitle">有声书 · 章节音频</span>
        </div>
      </div>

      <div className="gr-series-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {CHAPTER_BOOKS.map(s => (
          <button key={s.id} className="gr-series-card" style={{ borderTopColor: s.color }} onClick={() => setSelectedSeries(s.id)}>
            <div className="gr-series-label" style={{ color: s.color }}>{s.icon} {s.name}</div>
            <div className="gr-series-full">{s.nameEn}</div>
            <div className="gr-series-full">{s.desc}</div>
            <div className="gr-series-total">
              {s.id === 'journey_west' ? `${s.chapters.length} 章` : `${s.books.length} 册`}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
