import { useState } from 'react'
import WordQuiz from './english/WordQuiz'
import SRSStudy from './english/SRSStudy'
import Grammar from './english/Grammar'
import Speaking from './english/Speaking'
import Writing from './english/Writing'
import Listening from './english/Listening'
import Dictionary from './english/Dictionary'
import HumanHistory from './english/HumanHistory'
import Phonics from './english/Phonics'
import ReadingHub from './english/ReadingHub'
import TextbookVocab from './english/TextbookVocab'
import './English.css'

const CARDS = [
  { id: 'listening',      img: '/icons/generated/english/listening.png',       label: '听力练习',      desc: '听故事',   ready: true  },
  { id: 'history',        img: '/icons/generated/english/history.png',         label: '人类大历史',    desc: '双语学习', ready: true  },
  { id: 'phonics',        img: '/icons/generated/english/phonics.png',         label: '自然拼读',      desc: '发音规则', ready: true  },
  { id: 'speaking',       img: '/icons/generated/english/speaking.png',        label: '口语对话',      desc: '开口练习', ready: true  },
  { id: 'reading_hub',    img: '/icons/generated/english/reading-hub.png',     label: '阅读中心',      desc: '分级阅读', ready: true  },
  { id: 'writing',        img: '/icons/generated/english/writing.png',         label: '写作练习',      desc: '写句写文', ready: true  },
  { id: 'grammar',        img: '/icons/generated/english/grammar.png',         label: '语法讲解',      desc: '知识讲解', ready: true  },
  { id: 'srs',            img: '/icons/generated/english/srs.png',             label: '词汇记忆',      desc: '每日背词', ready: true  },
  { id: 'words',          img: '/icons/generated/english/words.png',           label: '单词速练',      desc: '闪卡速练', ready: true  },
  { id: 'textbook_vocab', img: '/icons/generated/english/textbook-vocab.png',  label: '教材词汇',      desc: '课本单词', ready: true  },
  { id: 'dictionary',     img: '/icons/generated/english/dictionary.png',      label: '查词 · 生词本', desc: '查词复习', ready: true  },
]

export default function English({ user }) {
  const [activeTool, setActiveTool] = useState(null)

  function handleAddMistake(mistake) {
    try {
      const existing = JSON.parse(localStorage.getItem('pending_mistakes') || '[]')
      localStorage.setItem('pending_mistakes', JSON.stringify([...existing, mistake]))
    } catch { /* ignore */ }
    alert('已记录到错题本 ✅')
  }

  if (activeTool === 'srs')            return <SRSStudy user={user} onBack={() => setActiveTool(null)} />
  if (activeTool === 'words')          return <WordQuiz onBack={() => setActiveTool(null)} />
  if (activeTool === 'dictionary')     return <Dictionary onBack={() => setActiveTool(null)} />
  if (activeTool === 'grammar')        return <Grammar user={user} onBack={() => setActiveTool(null)} />
  if (activeTool === 'reading_hub')    return <ReadingHub user={user} onBack={() => setActiveTool(null)} />
  if (activeTool === 'history')        return <HumanHistory onBack={() => setActiveTool(null)} />
  if (activeTool === 'phonics')        return <Phonics onBack={() => setActiveTool(null)} />
  if (activeTool === 'listening')      return <Listening onBack={() => setActiveTool(null)} />
  if (activeTool === 'speaking')       return <Speaking user={user} onBack={() => setActiveTool(null)} />
  if (activeTool === 'writing')        return <Writing user={user} onBack={() => setActiveTool(null)} onAddMistake={handleAddMistake} />
  if (activeTool === 'textbook_vocab') return <TextbookVocab onBack={() => setActiveTool(null)} />

  return (
    <div className="en-page">
      <div className="en-hero">
        <div className="en-hero-badge">English Studio</div>
        <h1 className="en-hero-title">趣味英语</h1>
        <p className="en-hero-sub">听说读写 · 词汇 · 查词 · 全方位英语学习</p>
        <p className="en-hero-desc">
          听说读写、词汇和查词入口，都放在这里继续学。
        </p>
      </div>

      <div className="en-overview">
        <div className="en-overview-card">
          <div className="en-overview-label">适合场景</div>
          <div className="en-overview-value">日常练习 + 长期积累</div>
        </div>
        <div className="en-overview-card">
          <div className="en-overview-label">推荐设备</div>
          <div className="en-overview-value">手机 / iPad / 电脑</div>
        </div>
        <div className="en-overview-card en-overview-card--accent">
          <div className="en-overview-label">学习重点</div>
          <div className="en-overview-value">听说读写一体推进</div>
        </div>
      </div>

      <div className="en-section-head">
        <div>
          <h2 className="en-section-title">开始学习</h2>
          <p className="en-section-subtitle">选一个入口，直接继续。</p>
        </div>
      </div>

      <div className="en-card-grid">
        {CARDS.map(card => (
          <button
            key={card.id}
            className={`en-card${card.ready ? '' : ' en-card--coming'}`}
            onClick={() => card.ready && setActiveTool(card.id)}
          >
            <div className="en-card-img-wrap">
              <img src={card.img} alt={card.label} className="en-card-img" />
            </div>
            <div className="en-card-info">
              <div className="en-card-label">{card.label}</div>
              <div className="en-card-desc">{card.desc}</div>
            </div>
            {!card.ready && <span className="en-card-soon">即将上线</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
