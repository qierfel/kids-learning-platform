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

// ── Main Component ──────────────────────────────────────────
export default function HumanHistory({ onBack }) {
  const [index, setIndex] = useState(null)          // [{id, vol, lecture, titleEn, titleZh}]
  const [activeVol, setActiveVol] = useState(1)
  const [volData, setVolData] = useState({})         // vol -> lectures[]
  const [loadingVol, setLoadingVol] = useState(false)
  const [selectedLecture, setSelectedLecture] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // TTS 状态
  const [playingPara, setPlayingPara] = useState(null)
  const [charIndex, setCharIndex] = useState(-1)
  const utterRef = useRef(null)

  // 加载目录
  useEffect(() => {
    fetch(`${BASE}data/humanHistory_index.json`)
      .then(r => r.json())
      .then(setIndex)
      .catch(() => setIndex([]))
  }, [])

  // 加载辑数据
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
    setPlayingPara(null)
    setCharIndex(-1)
  }

  // ── TTS ──
  function stopTTS() {
    window.speechSynthesis.cancel()
    setPlayingPara(null)
    setCharIndex(-1)
    utterRef.current = null
  }

  function playPara(paraIdx, text) {
    stopTTS()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'en-US'
    u.rate = 0.85
    u.onboundary = e => { if (e.name === 'word') setCharIndex(e.charIndex) }
    u.onend = () => { setPlayingPara(null); setCharIndex(-1) }
    u.onerror = () => { setPlayingPara(null); setCharIndex(-1) }
    utterRef.current = u
    setPlayingPara(paraIdx)
    setCharIndex(0)
    window.speechSynthesis.speak(u)
  }

  function togglePara(paraIdx, text) {
    if (playingPara === paraIdx) {
      stopTTS()
    } else {
      playPara(paraIdx, text)
    }
  }

  function playAll() {
    if (!selectedLecture) return
    stopTTS()
    const allText = selectedLecture.paragraphs.map(p => p.en).join(' ')
    const u = new SpeechSynthesisUtterance(allText)
    u.lang = 'en-US'
    u.rate = 0.85
    u.onend = () => { setPlayingPara(null); setCharIndex(-1) }
    utterRef.current = u
    setPlayingPara('all')
    window.speechSynthesis.speak(u)
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
    return (
      <div className="wh-page">
        <div className="wh-detail-header">
          <button className="wh-back" onClick={() => { stopTTS(); setSelectedLecture(null) }}>← 返回目录</button>
          <div className="wh-detail-title-row">
            <h2 className="wh-detail-title">{selectedLecture.titleEn}</h2>
            <p className="wh-detail-title-zh">{selectedLecture.titleZh}</p>
          </div>
          <div className="wh-detail-actions">
            <button
              className={`wh-play-all-btn ${playingPara === 'all' ? 'playing' : ''}`}
              onClick={playingPara === 'all' ? stopTTS : playAll}
            >
              {playingPara === 'all' ? '⏹ 停止' : '▶ 全文朗读'}
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
                >
                  {playingPara === i ? '⏹' : '🔊'}
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
