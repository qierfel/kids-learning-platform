import { useState, useRef } from 'react'
import poems from '../../data/poems'
import audioManifest from '../../data/poem-audio-manifest.json'
import './Poems.css'

const GRADES = [1, 2, 3, 4, 5, 6]
const BASE_URL = '/kids-learning-platform/audio/poems/'

function splitDetailText(text) {
  if (!text) return []
  const normalized = text
    .replace(/常考：/g, '')
    .replace(/[；;]/g, '。')
    .replace(/([0-9]+)\.\s*/g, '')
  return normalized
    .split('。')
    .map(part => part.trim())
    .filter(Boolean)
}

function getSourceMeta(item) {
  if (item.sourceType || item.sourceName || item.sourceStatus) {
    return {
      type: item.sourceType || 'platform-draft',
      name: item.sourceName || '平台整理稿',
      status: item.sourceStatus || '待按教材核对'
    }
  }

  if (item.notes || item.theme || item.exam) {
    return {
      type: 'platform-draft',
      name: '平台整理稿',
      status: '待按教材核对'
    }
  }

  return null
}

export default function Poems() {
  const [grade, setGrade] = useState('all')
  const [selected, setSelected] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const q = searchQuery.trim().toLowerCase()
  const filtered = poems.filter(p =>
    (grade === 'all' || p.grade === Number(grade)) &&
    (!q || p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q) || p.dynasty.toLowerCase().includes(q) || (p.lines || []).some(l => l.includes(q)))
  )

  if (selected) {
    return <PoemDetail poem={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div className="poems">
      <h2 className="page-title">古诗词</h2>

      <div className="poem-source-legend">
        <span className="poem-legend-title">来源说明</span>
        <span className="poem-legend-item textbook">教材版：已按教材核对</span>
        <span className="poem-legend-item draft">整理稿：当前为平台整理稿，后续继续按教材终校</span>
      </div>

      <div className="poem-search-row">
        <input
          className="poem-search-input"
          type="text"
          placeholder="🔍 搜索诗题、作者、朝代或诗句"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="poem-search-clear" onClick={() => setSearchQuery('')}>✕</button>
        )}
      </div>

      <div className="grade-tabs">
        <button className={grade === 'all' ? 'grade-btn active' : 'grade-btn'} onClick={() => setGrade('all')}>全部</button>
        {GRADES.map(g => (
          <button key={g} className={grade === String(g) ? 'grade-btn active' : 'grade-btn'} onClick={() => setGrade(String(g))}>{g}年级</button>
        ))}
      </div>

      <div className="poem-list">
        {filtered.length === 0 ? (
          <p className="poem-empty">没有找到匹配的古诗词</p>
        ) : (
          filtered.map((poem, i) => (
            <div key={i} className="poem-card" onClick={() => setSelected(poem)}>
              {getSourceMeta(poem) && (
                <span className={`poem-card-source-badge ${getSourceMeta(poem).type}`}>
                  {getSourceMeta(poem).type === 'textbook' ? '教材版' : getSourceMeta(poem).type === 'platform-draft' ? '整理稿' : '已标源'}
                </span>
              )}
              <div className="poem-card-title">{poem.title}</div>
              <div className="poem-card-meta">{poem.dynasty} · {poem.author}</div>
              <div className="poem-card-preview">{poem.lines[0]}</div>
              {audioManifest[poem.title] && <span className="audio-badge">🔊</span>}
            </div>
          ))
        )}
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
  const sourceMeta = getSourceMeta(poem)
  const noteLines = splitDetailText(poem.notes)
  const examLines = splitDetailText(poem.exam)

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
          {poem.notes && (
            <div className="poem-detail-section">
              <div className="poem-detail-label">注释</div>
              <div className="poem-detail-list">
                {noteLines.map((line, index) => (
                  <div key={index} className="poem-detail-item">{line}</div>
                ))}
              </div>
            </div>
          )}
          {poem.theme && (
            <div className="poem-detail-section">
              <div className="poem-detail-label">主题思想</div>
              <p className="poem-detail-text">{poem.theme}</p>
            </div>
          )}
          {poem.exam && (
            <div className="poem-detail-section">
              <div className="poem-detail-label">常见考点</div>
              <div className="poem-detail-list">
                {examLines.map((line, index) => (
                  <div key={index} className="poem-detail-item">{line}</div>
                ))}
              </div>
            </div>
          )}
          {sourceMeta && (
            <div className="poem-detail-section poem-source-section">
              <div className="poem-detail-label">注释来源状态</div>
              <div className="poem-source-card">
                <span className={`poem-source-badge ${sourceMeta.type}`}>{sourceMeta.type}</span>
                <div className="poem-source-lines">
                  <div className="poem-source-line"><strong>来源：</strong>{sourceMeta.name}</div>
                  <div className="poem-source-line"><strong>状态：</strong>{sourceMeta.status}</div>
                </div>
              </div>
            </div>
          )}
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
