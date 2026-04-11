import { useState, useRef } from 'react'
import './Listening.css'

// ─── Data ────────────────────────────────────────────────────────────────────

const KEWENJUNDUAN_TEXTS = [
  {
    id: 1,
    title: 'My Family',
    grade: 'Grade 3',
    preview: 'This is my family. My father is tall.',
    full: 'This is my family. My father is tall. My mother is beautiful. My sister is lovely. I love my family very much.',
  },
  {
    id: 2,
    title: 'My School',
    grade: 'Grade 3',
    preview: 'I go to Green Hill School. My school is big and beautiful.',
    full: 'I go to Green Hill School. My school is big and beautiful. We have a library and a playground. I love my school.',
  },
  {
    id: 3,
    title: 'Seasons',
    grade: 'Grade 4',
    preview: 'There are four seasons in a year. Spring is warm.',
    full: 'There are four seasons in a year. Spring is warm. Summer is hot. Autumn is cool. Winter is cold. My favourite season is spring.',
  },
  {
    id: 4,
    title: 'My Day',
    grade: 'Grade 4',
    preview: 'I get up at seven o\'clock. I have breakfast at half past seven.',
    full: 'I get up at seven o\'clock. I have breakfast at half past seven. I go to school at eight o\'clock. After school, I do my homework.',
  },
  {
    id: 5,
    title: 'Animals',
    grade: 'Grade 5',
    preview: 'Animals are our friends. Dogs are loyal.',
    full: 'Animals are our friends. Dogs are loyal. Cats are clever. Birds can fly. Fish can swim. We should protect animals and nature.',
  },
  {
    id: 6,
    title: 'The Internet',
    grade: 'Grade 6',
    preview: 'The internet has changed our lives. We can learn, shop, and talk to friends online.',
    full: 'The internet has changed our lives. We can learn, shop, and talk to friends online. But we should use the internet wisely and safely.',
  },
]

const GRADED_STORIES = [
  {
    id: 1,
    title: 'The Red Ball',
    level: 'A1',
    preview: 'Tom has a red ball. He likes to play with it.',
    full: 'Tom has a red ball. He likes to play with it. One day, the ball went into the garden. Tom ran to get it. He saw a dog. The dog was friendly. The dog played with Tom and the ball. Tom was very happy.',
  },
  {
    id: 2,
    title: 'A Rainy Day',
    level: 'A1',
    preview: 'It is raining today. Lucy cannot go outside.',
    full: 'It is raining today. Lucy cannot go outside. She sits by the window. She draws pictures of the rain. She draws clouds and puddles. Her mum makes hot chocolate. Lucy drinks it and feels warm. She likes rainy days now.',
  },
  {
    id: 3,
    title: 'The New Puppy',
    level: 'A2',
    preview: 'Jack\'s family got a new puppy last week.',
    full: 'Jack\'s family got a new puppy last week. The puppy is small and brown. Jack named him Biscuit. Every morning, Jack takes Biscuit for a walk in the park. Biscuit loves to run and jump. He barks at birds and butterflies. Jack\'s friends all want to play with Biscuit. Jack is very proud of his puppy.',
  },
  {
    id: 4,
    title: 'The School Trip',
    level: 'A2',
    preview: 'Our class went on a trip to the science museum last Friday.',
    full: 'Our class went on a trip to the science museum last Friday. We saw an exhibition about space. I learned that the sun is one million times bigger than the Earth. We also watched a video about black holes. My favourite part was the rocket model. We could sit inside it and pretend to be astronauts. I want to be a scientist when I grow up.',
  },
  {
    id: 5,
    title: 'A Special Gift',
    level: 'B1',
    preview: 'Every year, Maya\'s grandmother sent her a birthday gift from another country.',
    full: 'Every year, Maya\'s grandmother sent her a birthday gift from another country. This year, the gift arrived in a large wooden box. Maya opened it carefully. Inside was a beautiful hand-painted music box. When Maya wound it up, it played a gentle melody she had never heard before. She found a note at the bottom: "This song is our family\'s secret tune, passed down through generations. Now it belongs to you." Maya played the melody again and again, feeling more connected to her family history than ever before.',
  },
  {
    id: 6,
    title: 'The Mountain Rescue',
    level: 'B1',
    preview: 'The fog had come in quickly, and Daniel realised he had taken the wrong path.',
    full: 'The fog had come in quickly, and Daniel realised he had taken the wrong path. He checked his phone — no signal. He remembered what his hiking instructor had told him: stay calm, stay put, and use what you have. Daniel found shelter under a wide rock and used branches to mark an arrow pointing toward where he had camped. Two hours later, he heard voices. The mountain rescue team had found his arrow and followed it. Daniel never hikes without telling someone his plan again.',
  },
]

const BILIBILI_RESOURCES = [
  {
    title: 'Peppa Pig 英语',
    description: '趣味英语动画，适合幼儿至小学低年级',
    icon: '🐷',
    url: 'https://search.bilibili.com/all?keyword=Peppa+Pig+%E8%8B%B1%E8%AF%AD',
  },
  {
    title: '英语分级读物',
    description: '适合不同英语水平的分级阅读材料',
    icon: '📚',
    url: 'https://search.bilibili.com/all?keyword=%E8%8B%B1%E8%AF%AD%E5%88%86%E7%BA%A7%E8%AF%BB%E7%89%A9',
  },
  {
    title: '少儿英语动画',
    description: '儿童英语动画合集，多种风格',
    icon: '🎬',
    url: 'https://search.bilibili.com/all?keyword=%E5%B0%91%E5%84%BF%E8%8B%B1%E8%AF%AD%E5%8A%A8%E7%94%BB',
  },
  {
    title: '牛津阅读树',
    description: 'Oxford Reading Tree 经典英语启蒙读本',
    icon: '🌳',
    url: 'https://search.bilibili.com/all?keyword=Oxford+Reading+Tree',
  },
]

const TABS = ['课文朗读', '分级故事', '磨耳朵资源']

const GRADE_COLOR = {
  'Grade 3': '#10b981',
  'Grade 4': '#3b82f6',
  'Grade 5': '#f59e0b',
  'Grade 6': '#7c3aed',
}

const LEVEL_COLOR = {
  A1: '#10b981',
  A2: '#3b82f6',
  B1: '#f59e0b',
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Listening({ onBack }) {
  const [activeTab, setActiveTab] = useState(0)
  const [playingId, setPlayingId] = useState(null)
  const [expandedId, setExpandedId] = useState(null)
  const utteranceRef = useRef(null)

  function speak(text, id) {
    if (playingId === id) {
      window.speechSynthesis.cancel()
      setPlayingId(null)
      return
    }
    window.speechSynthesis.cancel()
    const utter = new window.SpeechSynthesisUtterance(text)
    utter.lang = 'en-US'
    utter.rate = 0.8
    utter.onend = () => setPlayingId(null)
    utter.onerror = () => setPlayingId(null)
    utteranceRef.current = utter
    setPlayingId(id)
    window.speechSynthesis.speak(utter)
  }

  function stopAll() {
    window.speechSynthesis.cancel()
    setPlayingId(null)
  }

  function toggleExpand(id) {
    setExpandedId(prev => (prev === id ? null : id))
  }

  return (
    <div className="listening-page">
      {/* Header */}
      <div className="listening-header">
        {onBack && (
          <button className="listening-back-btn" onClick={() => { stopAll(); onBack() }}>
            ← 返回
          </button>
        )}
        <div className="listening-title-group">
          <span className="listening-icon">🎧</span>
          <h2 className="listening-title">Listening Practice</h2>
          <span className="listening-subtitle">英语听力训练</span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="listening-tabs">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={`listening-tab${activeTab === i ? ' active' : ''}`}
            onClick={() => { stopAll(); setActiveTab(i) }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Tab 0: 课文朗读 ── */}
      {activeTab === 0 && (
        <div className="listening-content">
          <p className="listening-tip">
            沪教版风格课文 · 点击 ▶ 收听 TTS 朗读（语速 0.8）
          </p>
          <div className="text-card-list">
            {KEWENJUNDUAN_TEXTS.map(item => {
              const isPlaying = playingId === item.id
              const isExpanded = expandedId === item.id
              return (
                <div key={item.id} className={`text-card${isPlaying ? ' playing' : ''}`}>
                  <div className="text-card-top">
                    <div className="text-card-meta">
                      <span
                        className="grade-badge"
                        style={{ background: GRADE_COLOR[item.grade] }}
                      >
                        {item.grade}
                      </span>
                      <span className="text-card-title">{item.title}</span>
                    </div>
                    <div className="text-card-actions">
                      <button
                        className={`play-btn${isPlaying ? ' stop' : ''}`}
                        onClick={() => speak(item.full, item.id)}
                      >
                        {isPlaying ? '⏹ Stop' : '▶ Listen'}
                      </button>
                      <button
                        className="expand-btn"
                        onClick={() => toggleExpand(item.id)}
                      >
                        {isExpanded ? '收起' : '展开'}
                      </button>
                    </div>
                  </div>
                  <p className="text-card-preview">
                    {isExpanded ? item.full : item.preview}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Tab 1: 分级故事 ── */}
      {activeTab === 1 && (
        <div className="listening-content">
          <p className="listening-tip">
            CEFR 分级故事 · 适合 A1–B1 学习者 · TTS 朗读
          </p>
          <div className="text-card-list">
            {GRADED_STORIES.map(item => {
              const isPlaying = playingId === item.id
              const isExpanded = expandedId === item.id
              return (
                <div key={item.id} className={`text-card${isPlaying ? ' playing' : ''}`}>
                  <div className="text-card-top">
                    <div className="text-card-meta">
                      <span
                        className="grade-badge"
                        style={{ background: LEVEL_COLOR[item.level] }}
                      >
                        {item.level}
                      </span>
                      <span className="text-card-title">{item.title}</span>
                    </div>
                    <div className="text-card-actions">
                      <button
                        className={`play-btn${isPlaying ? ' stop' : ''}`}
                        onClick={() => speak(item.full, item.id)}
                      >
                        {isPlaying ? '⏹ Stop' : '▶ Listen'}
                      </button>
                      <button
                        className="expand-btn"
                        onClick={() => toggleExpand(item.id)}
                      >
                        {isExpanded ? '收起' : '展开'}
                      </button>
                    </div>
                  </div>
                  <p className="text-card-preview">
                    {isExpanded ? item.full : item.preview}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Tab 2: 磨耳朵资源 ── */}
      {activeTab === 2 && (
        <div className="listening-content">
          <p className="listening-tip">
            以下资源链接至 Bilibili 搜索页面，点击即可在新标签页搜索相关内容
          </p>
          <div className="resource-grid">
            {BILIBILI_RESOURCES.map(r => (
              <a
                key={r.title}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card"
              >
                <div className="resource-icon">{r.icon}</div>
                <div className="resource-info">
                  <div className="resource-name">{r.title}</div>
                  <div className="resource-desc">{r.description}</div>
                </div>
                <div className="resource-arrow">→</div>
              </a>
            ))}
          </div>
          <p className="resource-note">
            * 资源链接至 Bilibili 搜索结果页，不包含直接视频链接。请在安全、合规的网络环境下使用。
          </p>
        </div>
      )}
    </div>
  )
}
