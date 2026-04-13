import { useState, useEffect, useRef, useMemo } from 'react'
import './HumanHistory.css'

const BASE = import.meta.env.BASE_URL || '/'
const VOL_LABELS = ['', '远古人类', '青铜时代', '古代文明', '罗马衰亡', '文艺复兴']
const VOL_COLORS = ['', '#f59e0b', '#10b981', '#6366f1', '#e85d4a', '#8b5cf6']

// ── ReadAlong 组件 ──────────────────────────────────────────
function ReadAlong({ text, charIndex, playing }) {
  const ref = useRef(null)
  const words = useMemo(() => {
    const result = []
    const regex = /(\S+)/g
    let m
    while ((m = regex.exec(text)) !== null) {
      result.push({ word: m[1], start: m.index, end: m.index + m[1].length })
    }
    return result
  }, [text])

  const activeIdx = playing && charIndex >= 0
    ? words.findIndex((w, i) => {
        const next = words[i + 1]
        return charIndex >= w.start && (next ? charIndex < next.start : true)
      })
    : -1

  useEffect(() => {
    if (activeIdx >= 0 && ref.current) {
      ref.current.querySelector('.wh-word-active')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [activeIdx])

  return (
    <p ref={ref} className="wh-en-text">
      {words.map((w, i) => (
        <span key={i} className={i === activeIdx ? 'wh-word-active' : 'wh-word'}>
          {w.word}{' '}
        </span>
      ))}
    </p>
  )
}

// ── OpenAI TTS helpers ─────────────────────────────────────
const ttsCache = new Map()

async function fetchTTSAudio(text) {
  const cached = ttsCache.get(text)
  if (cached) return cached
  const url = `/api/tts?voice=nova&text=${encodeURIComponent(text)}`
  const resp = await fetch(url)
  if (!resp.ok) throw new Error(`TTS ${resp.status}`)
  const blob = await resp.blob()
  const objUrl = URL.createObjectURL(blob)
  ttsCache.set(text, objUrl)
  return objUrl
}

function buildWordTimings(text, duration) {
  const words = []
  const re = /\S+/g
  let m
  while ((m = re.exec(text)) !== null)
    words.push({ charStart: m.index, estTime: (m.index / text.length) * duration })
  return words
}

// ── Main Component ──────────────────────────────────────────
export default function HumanHistory({ onBack }) {
  const [index, setIndex] = useState(null)
  const [activeVol, setActiveVol] = useState(1)
  const [volData, setVolData] = useState({})
  const [loadingVol, setLoadingVol] = useState(false)
  const [selectedLecture, setSelectedLecture] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // TTS 状态
  const [playingPara, setPlayingPara] = useState(null)
  const [charIndex, setCharIndex]     = useState(-1)
  const [loadingPara, setLoadingPara] = useState(null)
  const audioRef    = useRef(null)
  const wordTimings = useRef([])
  const rafRef      = useRef(null)
  const queueRef    = useRef([])   // for playAll paragraph queue

  // 加载目录
  useEffect(() => {
    fetch(`${BASE}data/humanHistory_index.json`)
      .then(r => r.json())
      .then(setIndex)
      .catch(() => setIndex([]))
  }, [])

  async function loadVol(vol) {
    if (volData[vol]) return
    setLoadingVol(true)
    try {
      const res = await fetch(`${BASE}data/humanHistory_vol${vol}.json`)
      const data = await res.json()
      setVolData(prev => ({ ...prev, [vol]: data }))
    } catch {}
    setLoadingVol(false)
  }

  useEffect(() => { loadVol(activeVol) }, [activeVol])

  function openLecture(lec) {
    stopTTS()
    setSelectedLecture(lec)
  }

  // ── TTS ──
  function stopTTS() {
    cancelAnimationFrame(rafRef.current)
    queueRef.current = []
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = '' }
    setPlayingPara(null)
    setCharIndex(-1)
    setLoadingPara(null)
  }

  function startHighlight(audio, text) {
    cancelAnimationFrame(rafRef.current)
    const tick = () => {
      const t = audio.currentTime
      const ws = wordTimings.current
      let ci = -1
      for (let i = ws.length - 1; i >= 0; i--) {
        if (ws[i].estTime <= t) { ci = ws[i].charStart; break }
      }
      setCharIndex(ci)
      if (!audio.paused && !audio.ended) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  async function playPara(paraIdx, text) {
    stopTTS()
    setLoadingPara(paraIdx)
    let audioUrl
    try { audioUrl = await fetchTTSAudio(text) }
    catch { setLoadingPara(null); return }

    const audio = audioRef.current
    if (!audio) return
    audio.src = audioUrl
    audio.onloadedmetadata = () => {
      wordTimings.current = buildWordTimings(text, audio.duration)
      setLoadingPara(null)
      setPlayingPara(paraIdx)
      setCharIndex(0)
      audio.play().catch(() => {})
      startHighlight(audio, text)
    }
    audio.onended = () => { setPlayingPara(null); setCharIndex(-1); cancelAnimationFrame(rafRef.current) }
    audio.onerror = () => { setPlayingPara(null); setCharIndex(-1); setLoadingPara(null) }
    audio.load()
  }

  function togglePara(paraIdx, text) {
    if (playingPara === paraIdx) stopTTS()
    else playPara(paraIdx, text)
  }

  async function playAll() {
    if (!selectedLecture) return
    stopTTS()
    const paras = selectedLecture.paragraphs.map((p, i) => ({ idx: i, text: p.en }))
    queueRef.current = paras

    async function playNext() {
      const queue = queueRef.current
      if (!queue.length) { setPlayingPara(null); setCharIndex(-1); return }
      const { idx, text } = queue.shift()
      setLoadingPara('all')
      let audioUrl
      try { audioUrl = await fetchTTSAudio(text) }
      catch { setLoadingPara(null); setPlayingPara(null); return }

      const audio = audioRef.current
      if (!audio || !queueRef.current) return  // stopped
      audio.src = audioUrl
      audio.onloadedmetadata = () => {
        wordTimings.current = buildWordTimings(text, audio.duration)
        setLoadingPara(null)
        setPlayingPara(idx)
        setCharIndex(0)
        audio.play().catch(() => {})
        startHighlight(audio, text)
      }
      audio.onended = () => playNext()
      audio.onerror = () => { setPlayingPara(null); setCharIndex(-1) }
      audio.load()
    }

    playNext()
  }

  // ── 搜索过滤 ──
  const q = searchQuery.trim().toLowerCase()
  const filteredIndex = index
    ? index.filter(l =>
        l.vol === activeVol &&
        (!q || l.titleEn.toLowerCase().includes(q) || l.titleZh.includes(q))
      )
    : []

  // ── 讲座详情页 ──
  if (selectedLecture) {
    const isPlayingAll = typeof playingPara === 'number' && queueRef.current !== null && loadingPara === 'all'
      || (typeof playingPara === 'number' && queueRef.current?.length >= 0 && playingPara !== null && loadingPara !== playingPara)

    return (
      <div className="wh-page">
        <audio ref={audioRef} style={{ display: 'none' }} />
        <div className="wh-detail-header">
          <button className="wh-back" onClick={() => { stopTTS(); setSelectedLecture(null) }}>← 返回目录</button>
          <div className="wh-detail-title-row">
            <h2 className="wh-detail-title">{selectedLecture.titleEn}</h2>
            <p className="wh-detail-title-zh">{selectedLecture.titleZh}</p>
          </div>
          <div className="wh-detail-actions">
            <button
              className={`wh-play-all-btn ${playingPara !== null ? 'playing' : ''}`}
              onClick={playingPara !== null ? stopTTS : playAll}
              disabled={loadingPara === 'all'}
            >
              {loadingPara === 'all' ? '⏳ 生成…' : playingPara !== null ? '⏹ 停止' : '▶ 全文朗读'}
            </button>
          </div>
        </div>

        <div className="wh-paragraphs">
          {selectedLecture.paragraphs.map((para, i) => (
            <div key={i} className={`wh-para-block ${playingPara === i ? 'playing' : ''}`}>
              <div className="wh-para-en">
                <button
                  className="wh-para-play"
                  onClick={() => togglePara(i, para.en)}
                  title={playingPara === i ? '停止' : '朗读'}
                  disabled={loadingPara === i}
                >
                  {loadingPara === i ? '⏳' : playingPara === i ? '⏹' : '🔊'}
                </button>
                <ReadAlong
                  text={para.en}
                  charIndex={playingPara === i ? charIndex : -1}
                  playing={playingPara === i}
                />
              </div>
              {para.zh && (
                <div className="wh-para-zh">{para.zh}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ── 目录页 ──
  const currentVolLectures = volData[activeVol] || []

  return (
    <div className="wh-page">
      <h2 className="wh-page-title">
        人类大历史
        <span className="wh-page-sub">World History · 中英双语 · 98讲</span>
      </h2>

      {/* 辑选择 */}
      <div className="wh-vol-tabs">
        {[1,2,3,4,5].map(v => (
          <button
            key={v}
            className={`wh-vol-tab ${activeVol === v ? 'active' : ''}`}
            style={activeVol === v ? { borderBottomColor: VOL_COLORS[v], color: VOL_COLORS[v] } : {}}
            onClick={() => { setActiveVol(v); setSearchQuery('') }}
          >
            第{v}辑
            <span className="wh-vol-label">{VOL_LABELS[v]}</span>
          </button>
        ))}
      </div>

      {/* 搜索 */}
      <div className="wh-search-row">
        <input
          className="wh-search-input"
          type="text"
          placeholder="🔍 搜索讲座标题"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        {searchQuery && <button className="wh-search-clear" onClick={() => setSearchQuery('')}>✕</button>}
      </div>

      {/* 讲座列表 */}
      {loadingVol ? (
        <div className="wh-loading">加载中…</div>
      ) : (
        <div className="wh-lecture-list">
          {(searchQuery ? filteredIndex : (index || []).filter(l => l.vol === activeVol)).map(item => {
            const lecture = currentVolLectures.find(l => l.id === item.id)
            return (
              <button
                key={item.id}
                className="wh-lecture-card"
                onClick={() => lecture ? openLecture(lecture) : null}
                disabled={!lecture}
                style={{ borderLeftColor: VOL_COLORS[activeVol] }}
              >
                <div className="wh-lec-num" style={{ color: VOL_COLORS[activeVol] }}>
                  Lecture {item.lecture}
                </div>
                <div className="wh-lec-title-en">{item.titleEn}</div>
                {item.titleZh && <div className="wh-lec-title-zh">{item.titleZh}</div>}
                <div className="wh-lec-meta">{item.count} 段落</div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
