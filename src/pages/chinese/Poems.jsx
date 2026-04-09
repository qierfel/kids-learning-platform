import { useState, useRef } from 'react'
import poems from '../../data/poems'
import audioManifest from '../../data/poem-audio-manifest.json'
import './Poems.css'

const GRADES = [1, 2, 3, 4, 5, 6]
const BASE_URL = '/kids-learning-platform/audio/poems/'

export default function Poems() {
  const [grade, setGrade] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = grade === 'all' ? poems : poems.filter(p => p.grade === Number(grade))

  if (selected) {
    return <PoemDetail poem={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div className="poems">
      <h2 className="page-title">古诗词</h2>

      <div className="grade-tabs">
        <button className={grade === 'all' ? 'grade-btn active' : 'grade-btn'} onClick={() => setGrade('all')}>全部</button>
        {GRADES.map(g => (
          <button key={g} className={grade === String(g) ? 'grade-btn active' : 'grade-btn'} onClick={() => setGrade(String(g))}>{g}年级</button>
        ))}
      </div>

      <div className="poem-list">
        {filtered.map((poem, i) => (
          <div key={i} className="poem-card" onClick={() => setSelected(poem)}>
            <div className="poem-card-title">{poem.title}</div>
            <div className="poem-card-meta">{poem.dynasty} · {poem.author}</div>
            <div className="poem-card-preview">{poem.lines[0]}</div>
            {audioManifest[poem.title] && <span className="audio-badge">🔊</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

function PoemDetail({ poem, onBack }) {
  const [mode, setMode] = useState('read') // read | recite
  const [revealed, setRevealed] = useState([])
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const audioFile = audioManifest[poem.title]
  const audioUrl = audioFile ? `${BASE_URL}${audioFile}` : null

  function togglePlay() {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play()
      setPlaying(true)
    }
  }

  function startRecite() {
    // 随机遮住一半句子
    const indices = poem.lines.map((_, i) => i)
    const hide = indices.sort(() => Math.random() - 0.5).slice(0, Math.ceil(poem.lines.length / 2))
    setRevealed([])
    setMode('recite')
    // 存储需要遮住的行
    audioRef.current?.pause()
    setPlaying(false)
    return hide
  }

  const [hiddenLines] = useState(() => {
    const indices = poem.lines.map((_, i) => i)
    return new Set(indices.sort(() => Math.random() - 0.5).slice(0, Math.ceil(poem.lines.length / 2)))
  })

  return (
    <div className="poem-detail">
      <button className="back-btn" onClick={onBack}>← 返回</button>

      <div className="poem-header">
        <h2 className="poem-title">{poem.title}</h2>
        <p className="poem-meta">{poem.dynasty} · {poem.author}</p>
      </div>

      <div className="mode-tabs">
        <button className={mode === 'read' ? 'tab active' : 'tab'} onClick={() => setMode('read')}>阅读</button>
        <button className={mode === 'recite' ? 'tab active' : 'tab'} onClick={() => setMode('recite')}>背诵</button>
      </div>

      {mode === 'read' && (
        <div className="poem-body">
          {audioUrl && (
            <div className="audio-player">
              <audio ref={audioRef} src={audioUrl} onEnded={() => setPlaying(false)} />
              <button className="play-btn" onClick={togglePlay}>
                {playing ? '⏸ 暂停' : '▶ 朗读'}
              </button>
            </div>
          )}
          <div className="poem-lines">
            {poem.lines.map((line, i) => (
              <p key={i} className="poem-line">{line}</p>
            ))}
          </div>
        </div>
      )}

      {mode === 'recite' && (
        <div className="poem-body">
          <p className="recite-hint">点击空白处查看答案</p>
          <div className="poem-lines">
            {poem.lines.map((line, i) => (
              <p key={i} className="poem-line">
                {hiddenLines.has(i) && !revealed.includes(i)
                  ? <span className="hidden-line" onClick={() => setRevealed(r => [...r, i])}>
                      {'＿'.repeat(line.replace(/[，。、]/g, '').length)}
                    </span>
                  : line
                }
              </p>
            ))}
          </div>
          <button className="reveal-all-btn" onClick={() => setRevealed(poem.lines.map((_, i) => i))}>
            显示全部
          </button>
        </div>
      )}
    </div>
  )
}
