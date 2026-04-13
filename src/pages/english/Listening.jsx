import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { HEINEMANN } from '../../data/heinemann'
import { OXFORD } from '../../data/oxford'
import razLevels from '../../data/razLevels'
import PdfCover, { PlaceholderCover } from '../../components/PdfCover'
import './Listening.css'

// ─── Data ─────────────────────────────────────────────────────────────────────

const TEXTS = {
  课文朗读: [
    {
      id: 'k1', title: 'My Family', grade: 'Grade 3', color: '#10b981',
      text: 'This is my family. My father is tall and strong. My mother is beautiful and kind. My sister is small and lovely. We live in a big house. We love each other very much. We are a happy family.',
    },
    {
      id: 'k2', title: 'My School', grade: 'Grade 3', color: '#10b981',
      text: 'I go to Green Hill School. My school is big and beautiful. We have a library, a playground, and a computer room. My classroom is on the second floor. My teacher is Miss Wang. She is very kind. I love my school very much.',
    },
    {
      id: 'k3', title: 'Seasons', grade: 'Grade 4', color: '#3b82f6',
      text: 'There are four seasons in a year. Spring is warm and flowers bloom. Summer is hot and we go swimming. Autumn is cool and the leaves turn red and yellow. Winter is cold and sometimes it snows. My favourite season is spring because everything is green and new.',
    },
    {
      id: 'k4', title: 'My Day', grade: 'Grade 4', color: '#3b82f6',
      text: 'I get up at seven o\'clock every morning. I wash my face and brush my teeth. I have breakfast at half past seven. I go to school at eight o\'clock. After school, I do my homework. In the evening, I read books or watch TV. I go to bed at nine o\'clock.',
    },
    {
      id: 'k5', title: 'Animals', grade: 'Grade 5', color: '#f59e0b',
      text: 'Animals are our friends. Dogs are loyal and protect our homes. Cats are clever and like to play. Birds can fly high in the sky. Fish can swim fast in the water. Some animals live in forests. Others live in the sea. We should protect animals and their homes in nature.',
    },
    {
      id: 'k6', title: 'The Internet', grade: 'Grade 6', color: '#7c3aed',
      text: 'The internet has changed our lives in many ways. We can learn new things, shop for goods, and talk to friends and family online. Students can find information for their homework quickly. However, we should use the internet wisely and safely. We should not spend too much time online. Balance is very important.',
    },
  ],
  分级故事: [
    {
      id: 's1', title: 'The Red Ball', level: 'A1', color: '#10b981',
      text: 'Tom has a red ball. He likes to play with it every day. One afternoon, the ball rolled into the garden. Tom ran to get it. He saw a friendly dog sitting near the flowers. The dog wagged its tail. Tom threw the ball. The dog ran and brought it back. Tom laughed and played with the dog all afternoon. It was a wonderful day.',
    },
    {
      id: 's2', title: 'A Rainy Day', level: 'A1', color: '#10b981',
      text: 'It is raining today. Lucy cannot go outside to play. She sits by the window and watches the raindrops. She draws pictures of clouds and puddles in her sketchbook. Her mum comes into the room. She makes two cups of hot chocolate. Lucy holds the warm cup in both hands. She looks at the rain and feels happy and cozy. She likes rainy days now.',
    },
    {
      id: 's3', title: 'The New Puppy', level: 'A2', color: '#3b82f6',
      text: 'Jack\'s family got a new puppy last week. The puppy is small, brown, and very playful. Jack named him Biscuit. Every morning, Jack takes Biscuit for a walk in the park near their house. Biscuit loves to run and jump through the grass. He barks at birds and chases butterflies. All of Jack\'s friends want to play with Biscuit. Jack feels very proud of his little dog.',
    },
    {
      id: 's4', title: 'The School Trip', level: 'A2', color: '#3b82f6',
      text: 'Our class went on a trip to the science museum last Friday. We saw a wonderful exhibition about space. I learned that the sun is one million times bigger than the Earth. We also watched a short film about black holes. My favourite part was the life-size rocket model. We could sit inside and pretend to be astronauts travelling to the moon. On the bus home, everyone talked about what they had seen. I want to be a scientist when I grow up.',
    },
    {
      id: 's5', title: 'A Special Gift', level: 'B1', color: '#f59e0b',
      text: 'Every year on her birthday, Maya received a gift from her grandmother who lived in another country. This year, the gift arrived in a large wooden box. Maya opened it carefully and found a beautiful hand-painted music box inside. When she wound it up, it played a gentle melody she had never heard before. At the bottom of the box, she found a handwritten note. It said that the song was a secret family tune, passed down through generations. Now it belonged to Maya. She played the melody again and again, feeling deeply connected to her family history.',
    },
    {
      id: 's6', title: 'The Mountain Rescue', level: 'B1', color: '#f59e0b',
      text: 'The fog came in quickly, and Daniel realised he had taken the wrong path up the mountain. He checked his phone but there was no signal. He remembered what his hiking instructor had once told him: stay calm, stay put, and use what you have around you. Daniel found shelter under a wide flat rock and used broken branches to mark a large arrow on the ground, pointing toward his campsite. He waited patiently for two hours. Then he heard voices in the distance. The mountain rescue team had spotted his arrow and followed it. Daniel was safe. He never went hiking without telling someone his exact route again.',
    },
  ],
  磨耳朵: [
    {
      id: 'm1', title: 'My Pet Cat', level: 'A1', color: '#10b981',
      text: 'I have a pet cat. Her name is Lily. She is white and very soft. Lily sleeps on my bed every night. In the morning, she wakes me up by touching my face with her paw. I give her milk and cat food for breakfast. She likes to sit near the window and watch the birds outside. Sometimes she chases a toy mouse around the room. Lily is my best friend. I love her very much.',
    },
    {
      id: 'm2', title: 'The Big Tree', level: 'A1', color: '#10b981',
      text: 'There is a big tree in our garden. It is very old. Its branches are wide and strong. In spring, green leaves grow on every branch. In summer, children sit under the tree to stay cool. Birds build nests in its branches and sing beautiful songs. In autumn, the leaves turn orange and yellow and fall to the ground. In winter, the tree stands bare but strong. The big tree has been in our garden for one hundred years.',
    },
    {
      id: 'm3', title: 'Breakfast Time', level: 'A1', color: '#10b981',
      text: 'I eat breakfast every morning before school. Today I have toast with butter and a glass of orange juice. My sister eats a bowl of cereal with milk. My father drinks a cup of black coffee and reads the news on his phone. My mother makes scrambled eggs for everyone. She puts a little salt and pepper on top. We all sit together at the table. We talk about our plans for the day. Breakfast is my favourite meal because I eat it with my whole family.',
    },
    {
      id: 'm4', title: 'Learning to Cook', level: 'A2', color: '#3b82f6',
      text: 'Last Saturday, my mum taught me how to make vegetable soup. First, we washed and cut the vegetables: carrots, potatoes, and onions. Then we put them into a big pot with water and a little salt. We waited for the water to boil. Mum showed me how to stir the soup slowly with a wooden spoon. After thirty minutes, the kitchen smelled wonderful. We tasted the soup and added a little more salt. When it was ready, we poured it into bowls. My soup was delicious! I felt very proud of myself.',
    },
    {
      id: 'm5', title: 'Our Neighbourhood', level: 'A2', color: '#3b82f6',
      text: 'I live in a busy neighbourhood in the city. On my street, there is a bakery that smells of fresh bread every morning. Next to it is a small bookshop where I buy comic books on weekends. Across the road, there is a park with a pond and a running track. Old people sit on benches and feed the ducks. Children play on the swings and the climbing frame. At the end of the street, there is a supermarket where my mum buys food. I know nearly everyone in my neighbourhood. It feels like a big family.',
    },
    {
      id: 'm6', title: 'The Power of Habit', level: 'B1', color: '#7c3aed',
      text: 'Scientists say that about forty percent of our daily actions are habits — things we do automatically without thinking. When we repeat an action many times, our brain creates a shortcut so we can do it without using much mental energy. This is why brushing our teeth or tying our shoelaces feels effortless. The same process works for both good and bad habits. If you practise reading for twenty minutes every evening, it soon becomes something you do naturally. The key to building a good habit is to start small, be consistent, and connect the new habit to something you already do every day.',
    },
    {
      id: 'm7', title: 'City Life and Country Life', level: 'B1', color: '#7c3aed',
      text: 'People often debate whether it is better to live in a city or in the countryside. Cities offer many advantages: job opportunities, excellent public transport, world-class hospitals, and a huge variety of restaurants and entertainment. However, city life also brings stress, noise, air pollution, and high living costs. The countryside, on the other hand, provides clean air, beautiful natural scenery, and a quieter, slower pace of life. Communities tend to be smaller and more closely connected. The disadvantage is that there are fewer career choices and services may be further away. Ultimately, the best place to live depends on your personality, your career, and what you value most in life.',
    },
  ],
}

// ─── Word-highlight reader ────────────────────────────────────────────────────

function ReadAlongText({ text, charIndex, playing }) {
  const containerRef = useRef(null)
  const words = useMemo(() => {
    const result = []
    const regex = /\S+/g
    let m
    while ((m = regex.exec(text)) !== null)
      result.push({ word: m[0], start: m.index, end: m.index + m[0].length })
    return result
  }, [text])

  const activeIdx = playing && charIndex >= 0
    ? (() => {
        let idx = -1
        for (let i = 0; i < words.length; i++) {
          if (words[i].start <= charIndex) idx = i
          else break
        }
        return idx
      })()
    : -1

  useEffect(() => {
    if (activeIdx >= 0 && containerRef.current)
      containerRef.current.querySelector('.word-active')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [activeIdx])

  const parts = []
  let lastEnd = 0
  words.forEach((w, i) => {
    if (w.start > lastEnd) parts.push(<span key={`g${i}`}>{text.slice(lastEnd, w.start)}</span>)
    parts.push(<span key={i} className={i === activeIdx ? 'word-active' : 'word-normal'}>{w.word}</span>)
    lastEnd = w.end
  })
  if (lastEnd < text.length) parts.push(<span key="tail">{text.slice(lastEnd)}</span>)

  return <div className="read-along-text" ref={containerRef}>{parts}</div>
}

function TextCard({ item, badge, playingId, charIndex, onPlay, loading }) {
  const isPlaying = playingId === item.id
  return (
    <div className={`listen-card${isPlaying ? ' listen-card-active' : ''}`} style={{ '--card-color': item.color }}>
      <div className="listen-card-header">
        <div className="listen-card-meta">
          <span className="listen-badge" style={{ background: item.color }}>{badge}</span>
          <span className="listen-card-title">{item.title}</span>
        </div>
        <button
          className={`listen-play-btn${isPlaying ? ' playing' : ''}`}
          style={{ borderColor: item.color, color: isPlaying ? '#fff' : item.color, background: isPlaying ? item.color : 'transparent' }}
          onClick={() => onPlay(item)}
          disabled={loading}
        >
          {loading ? '⏳ 生成…' : isPlaying ? '⏹ Stop' : '▶ Listen'}
        </button>
      </div>
      <ReadAlongText text={item.text} charIndex={isPlaying ? charIndex : -1} playing={isPlaying} />
    </div>
  )
}

// ─── Graded Listening (multi-select playlist) ─────────────────────────────────

// 三个系列的配置
const SERIES_LIST = [
  { id: 'heinemann', label: '海尼曼', color: '#f59e0b',
    levels: HEINEMANN.levels.map(l => ({ ...l, color: { gk:'#f59e0b', g1:'#10b981', g2:'#6366f1' }[l.id] })) },
  { id: 'oxford',    label: '牛津树', color: '#3b82f6',
    levels: OXFORD.levels },
  { id: 'raz',       label: 'RAZ',    color: '#8b5cf6',
    levels: razLevels.map(l => ({ id: l.level, label: l.level.toUpperCase(), desc: `${l.count}本`, color: '#8b5cf6', books: l.books })) },
]

function fmt(s) {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

function GradedListening() {
  const [seriesId, setSeriesId]   = useState('heinemann')
  const [levelId, setLevelId]     = useState('gk')
  const [selected, setSelected]   = useState(new Set())  // "seriesId|levelId|bookKey"
  const [search, setSearch]       = useState('')
  const [playlist, setPlaylist]   = useState([])
  const [playIdx, setPlayIdx]     = useState(0)
  const [playing, setPlaying]     = useState(false)
  const [isPaused, setIsPaused]   = useState(false)
  const [progress, setProgress]   = useState(0)
  const [duration, setDuration]   = useState(0)
  const audioRef = useRef(null)

  const currentSeries = SERIES_LIST.find(s => s.id === seriesId)
  const currentLevel  = currentSeries?.levels.find(l => l.id === levelId) || currentSeries?.levels[0]
  const books = currentLevel?.books || []
  const lc = currentLevel?.color || currentSeries?.color || '#6366f1'

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return q ? books.filter(b => (b.title||'').toLowerCase().includes(q) || String(b.num||'').includes(q)) : books
  }, [books, search])

  function bookKey(b) { return `${seriesId}|${levelId}|${b.num ?? b.title}` }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !playing || playlist.length === 0) return
    audio.src = playlist[playIdx]?.audio || ''
    audio.play().catch(() => {})
  }, [playIdx, playing]) // eslint-disable-line

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime  = () => setProgress(audio.currentTime)
    const onDur   = () => setDuration(audio.duration || 0)
    const onPlay  = () => setIsPaused(false)
    const onPause = () => setIsPaused(true)
    const onEnded = () => {
      if (playIdx < playlist.length - 1) setPlayIdx(i => i + 1)
      else { setPlaying(false); setProgress(0) }
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('durationchange', onDur)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('durationchange', onDur)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
    }
  }, [playIdx, playlist])

  function switchSeries(sid) {
    const s = SERIES_LIST.find(x => x.id === sid)
    setSeriesId(sid)
    setLevelId(s?.levels[0]?.id || '')
    setSearch('')
  }

  function toggleBook(book) {
    const k = bookKey(book)
    setSelected(prev => { const n = new Set(prev); n.has(k) ? n.delete(k) : n.add(k); return n })
  }

  function selectAll() { setSelected(prev => { const n = new Set(prev); filtered.forEach(b => n.add(bookKey(b))); return n }) }
  function clearSel()  { setSelected(new Set()) }

  function startPlay() {
    const pl = []
    SERIES_LIST.forEach(s => {
      s.levels.forEach(lv => {
        lv.books.forEach(b => {
          const k = `${s.id}|${lv.id}|${b.num ?? b.title}`
          if (selected.has(k)) pl.push({ ...b, _series: s.label, _level: lv.label })
        })
      })
    })
    if (!pl.length) return
    setPlaylist(pl); setPlayIdx(0); setProgress(0); setPlaying(true)
  }

  function stopPlay()    { audioRef.current?.pause(); setPlaying(false); setProgress(0) }
  function togglePause() { const a = audioRef.current; if (!a) return; a.paused ? a.play().catch(()=>{}) : a.pause() }
  function seekTo(e)     { const a = audioRef.current; if (!a || !duration) return; const r = e.currentTarget.getBoundingClientRect(); a.currentTime = ((e.clientX - r.left) / r.width) * duration }
  function jumpTo(idx)   { if (idx >= 0 && idx < playlist.length) { setPlayIdx(idx); setProgress(0) } }

  const cur = playlist[playIdx]
  const pct = duration > 0 ? (progress / duration) * 100 : 0

  return (
    <div style={{ paddingBottom: playing || selected.size > 0 ? 88 : 0 }}>

      {/* 系列选择 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {SERIES_LIST.map(s => (
          <button key={s.id} onClick={() => switchSeries(s.id)}
            style={{ padding: '7px 16px', borderRadius: 20, border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all .15s',
              background: seriesId === s.id ? s.color : '#f1f5f9',
              color: seriesId === s.id ? '#fff' : '#64748b' }}>
            {s.label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 12, color: '#94a3b8', alignSelf: 'center' }}>已选 {selected.size} 本</span>
      </div>

      {/* 级别 tabs */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        {currentSeries?.levels.map(lv => (
          <button key={lv.id} onClick={() => { setLevelId(lv.id); setSearch('') }}
            className="gl-level-tab"
            style={{ background: levelId === lv.id ? (lv.color || lc) : '#f1f5f9', color: levelId === lv.id ? '#fff' : '#64748b' }}>
            {lv.label}
            <span className="gl-level-count">{lv.books.length}</span>
          </button>
        ))}
      </div>

      {/* 搜索 + 操作 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜书名…" className="gl-search" />
        <button onClick={selectAll} className="gl-action-btn">全选</button>
        {selected.size > 0 && <button onClick={clearSel} className="gl-action-btn gl-action-clear">清除</button>}
      </div>

      {/* 书目网格 */}
      <div className="gl-grid">
        {filtered.map(book => {
          const k = bookKey(book)
          const isSel = selected.has(k)
          const isNow = playing && cur?.audio === book.audio
          return (
            <div key={k} onClick={() => toggleBook(book)}
              className={`gl-book-card ${isSel ? 'selected' : ''} ${isNow ? 'now-playing' : ''}`}
              style={{ '--lc': lc }}>
              {isSel && <div className="gl-check">{isNow ? '♪' : '✓'}</div>}
              {/* 封面 */}
              <div className="gl-book-cover">
                {book.pdf
                  ? <PdfCover pdfUrl={book.pdf} color={lc} title={book.title} />
                  : <PlaceholderCover color={lc} title={book.title} />
                }
                {isNow && (
                  <div className="gl-cover-playing">
                    <span className="gl-cover-note">♪</span>
                  </div>
                )}
              </div>
              {/* 文字 */}
              {book.num && <div className="gl-book-num">#{book.num}{book.tag ? ` · ${book.tag}` : ''}</div>}
              <div className="gl-book-title">{book.title}</div>
            </div>
          )
        })}
      </div>

      <audio ref={audioRef} />

      {playing ? (
        <div className="gl-player">
          <div className="gl-player-row">
            <button onClick={() => jumpTo(playIdx - 1)} disabled={playIdx === 0} className="gl-ctrl-btn">⏮</button>
            <button onClick={togglePause} className="gl-play-btn">{isPaused ? '▶' : '⏸'}</button>
            <button onClick={() => jumpTo(playIdx + 1)} disabled={playIdx >= playlist.length - 1} className="gl-ctrl-btn">⏭</button>
            <div className="gl-player-info">
              <div className="gl-player-title">{cur?.title}</div>
              <div className="gl-player-sub">
                <span className="gl-player-badge" style={{ background: lc }}>{cur?._series} {cur?._level}</span>
                第 {playIdx + 1} / {playlist.length} 首 · {fmt(progress)} / {fmt(duration)}
              </div>
            </div>
            <button onClick={stopPlay} className="gl-close-btn">✕</button>
          </div>
          <div className="gl-progress-bar" onClick={seekTo}>
            <div className="gl-progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      ) : selected.size > 0 ? (
        <div className="gl-start-bar">
          <span className="gl-start-info">已选 <strong>{selected.size}</strong> 本</span>
          <button onClick={startPlay} className="gl-start-btn">▶ 播放</button>
        </div>
      ) : null}
    </div>
  )
}

// ─── Main Listening Component ─────────────────────────────────────────────────

// ─── OpenAI TTS engine ────────────────────────────────────────────────────────

// In-memory cache: text → object URL (freed on unload)
const ttsAudioCache = new Map()

async function fetchTTSAudio(text, voice = 'nova') {
  const key = `${voice}||${text}`
  if (ttsAudioCache.has(key)) return ttsAudioCache.get(key)
  const url = `/api/tts?voice=${encodeURIComponent(voice)}&text=${encodeURIComponent(text)}`
  const resp = await fetch(url)
  if (!resp.ok) throw new Error(`TTS ${resp.status}: ${await resp.text()}`)
  const blob = await resp.blob()
  const objUrl = URL.createObjectURL(blob)
  ttsAudioCache.set(key, objUrl)
  return objUrl
}

// Build word-timing estimates from the full text + audio duration.
// Returns array of { charStart, charEnd, estTime } for each word.
function buildWordTimings(text, duration) {
  const words = []
  const re = /\S+/g
  let m
  while ((m = re.exec(text)) !== null)
    words.push({ charStart: m.index, charEnd: m.index + m[0].length, word: m[0] })
  if (!words.length) return []
  // Assign proportion: each char takes (duration / totalChars) seconds
  const totalChars = text.length
  words.forEach(w => {
    w.estTime = (w.charStart / totalChars) * duration
  })
  return words
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const TABS = ['课文朗读', '分级故事', '磨耳朵', '分级读物']

export default function Listening({ onBack }) {
  const [activeTab, setActiveTab]   = useState(0)
  const [playingId, setPlayingId]   = useState(null)
  const [charIndex, setCharIndex]   = useState(-1)
  const [loading, setLoading]       = useState(false)
  const audioRef  = useRef(null)
  const wordTimingsRef = useRef([])
  const rafRef    = useRef(null)

  function stopAll() {
    cancelAnimationFrame(rafRef.current)
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = '' }
    setPlayingId(null)
    setCharIndex(-1)
    setLoading(false)
  }

  // Update charIndex by scanning word timings on each animation frame
  function startHighlightLoop(audio, text) {
    const tick = () => {
      const t = audio.currentTime
      const words = wordTimingsRef.current
      let idx = -1
      for (let i = words.length - 1; i >= 0; i--) {
        if (words[i].estTime <= t) { idx = words[i].charStart; break }
      }
      setCharIndex(idx)
      if (!audio.paused && !audio.ended) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  const handlePlay = useCallback(async (item) => {
    if (playingId === item.id) { stopAll(); return }
    stopAll()
    setLoading(true)
    setPlayingId(item.id)

    let audioUrl
    try {
      audioUrl = await fetchTTSAudio(item.text, 'nova')
    } catch (e) {
      console.error('TTS failed:', e)
      setLoading(false)
      setPlayingId(null)
      return
    }

    if (!audioRef.current) return // unmounted
    const audio = audioRef.current
    audio.src = audioUrl
    audio.onloadedmetadata = () => {
      wordTimingsRef.current = buildWordTimings(item.text, audio.duration)
      setLoading(false)
      setCharIndex(0)
      audio.play().catch(() => {})
      startHighlightLoop(audio, item.text)
    }
    audio.onended = () => { setPlayingId(null); setCharIndex(-1); cancelAnimationFrame(rafRef.current) }
    audio.onerror = () => { setPlayingId(null); setCharIndex(-1); setLoading(false) }
    audio.load()
  }, [playingId])

  function switchTab(i) { stopAll(); setActiveTab(i) }

  const items = TEXTS[TABS[activeTab]] || []

  return (
    <div className="listening-page">
      <div className="listening-header">
        {onBack && (
          <button className="listening-back-btn" onClick={() => { stopAll(); onBack() }}>← 返回</button>
        )}
        <div className="listening-title-row">
          <span className="listening-icon">🎧</span>
          <h2 className="listening-title">Listening Practice</h2>
        </div>
        <p className="listening-subtitle">
          {activeTab === 3 ? '勾选书目，一键连续播放外教音频' : '点击 ▶ Listen，文字随朗读自动高亮滚动'}
        </p>
      </div>

      <div className="listening-tabs">
        {TABS.map((tab, i) => (
          <button key={tab} className={`listening-tab${activeTab === i ? ' active' : ''}`}
            onClick={() => switchTab(i)}>
            {tab}
          </button>
        ))}
      </div>

      {/* Hidden audio element for OpenAI TTS playback */}
      <audio ref={audioRef} style={{ display: 'none' }} />

      {activeTab === 3 ? (
        <GradedListening />
      ) : (
        <div className="listening-list">
          {items.map(item => (
            <TextCard key={item.id} item={item} badge={item.grade || item.level}
              playingId={playingId} charIndex={charIndex} onPlay={handlePlay}
              loading={loading && playingId === item.id} />
          ))}
        </div>
      )}
    </div>
  )
}
