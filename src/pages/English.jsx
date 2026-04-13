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
  {
    id: 'listening',
    emoji: '🎧',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    tag: 'LISTEN',
    label: '听力练习',
    desc: 'TTS朗读 · 分级故事',
    ready: true,
  },
  {
    id: 'history',
    emoji: '🌍',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    tag: 'HISTORY',
    label: '人类大历史',
    desc: '中英双语 · 98讲 · TTS朗读',
    ready: true,
  },
  {
    id: 'phonics',
    emoji: '🔤',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    tag: 'PHONICS',
    label: '自然拼读',
    desc: '尼尔森体系 · 148集视频',
    ready: true,
  },
  {
    id: 'speaking',
    emoji: '💬',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    tag: 'SPEAK',
    label: '口语对话',
    desc: 'AI外教 Emma · 实时纠错',
    ready: true,
  },
  {
    id: 'reading_hub',
    emoji: '📚',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    tag: 'READ',
    label: '阅读中心',
    desc: '分级 · 绘本 · 章节书 · 考试阅读',
    ready: true,
  },
  {
    id: 'writing',
    emoji: '✍️',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    tag: 'WRITE',
    label: '写作练习',
    desc: 'AI批改 · 自动录入错题本',
    ready: true,
  },
  {
    id: 'grammar',
    emoji: '📝',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    tag: 'GRAMMAR',
    label: '语法讲解',
    desc: '14章65个知识点 · AI练习题',
    ready: true,
  },
  {
    id: 'srs',
    emoji: '🧠',
    gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    tag: 'VOCAB',
    label: '词汇记忆',
    desc: '记忆曲线 · 每日任务 · KET/PET/FCE',
    ready: true,
  },
  {
    id: 'words',
    emoji: '⚡',
    gradient: 'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
    tag: 'FLASH',
    label: '单词速练',
    desc: '沪教版 · KET · PET · FCE 闪卡',
    ready: true,
  },
  {
    id: 'textbook_vocab',
    emoji: '📖',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    tag: 'TEXTBOOK',
    label: '教材词汇',
    desc: '译林版3-6年级 · 单词句型 · 听写练习',
    ready: true,
  },
  {
    id: 'dictionary',
    emoji: '🔍',
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    tag: 'DICT',
    label: '查词 · 生词本',
    desc: '即查即存 · 闪音 · 例句 · 闪卡复习',
    ready: true,
  },
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

  if (activeTool === 'srs')         return <SRSStudy user={user} onBack={() => setActiveTool(null)} />
  if (activeTool === 'words')       return <WordQuiz onBack={() => setActiveTool(null)} />
  if (activeTool === 'dictionary')  return <Dictionary onBack={() => setActiveTool(null)} />
  if (activeTool === 'grammar')     return <Grammar user={user} onBack={() => setActiveTool(null)} />
  if (activeTool === 'reading_hub') return <ReadingHub user={user} onBack={() => setActiveTool(null)} />
  if (activeTool === 'history')     return <HumanHistory onBack={() => setActiveTool(null)} />
  if (activeTool === 'phonics')     return <Phonics onBack={() => setActiveTool(null)} />
  if (activeTool === 'listening')   return <Listening onBack={() => setActiveTool(null)} />
  if (activeTool === 'speaking')    return <Speaking user={user} onBack={() => setActiveTool(null)} />
  if (activeTool === 'writing')     return <Writing user={user} onBack={() => setActiveTool(null)} onAddMistake={handleAddMistake} />
  if (activeTool === 'textbook_vocab') return <TextbookVocab onBack={() => setActiveTool(null)} />

  return (
    <div className="en-page">
      <div className="en-hero">
        <h1 className="en-hero-title">趣味英语</h1>
        <p className="en-hero-sub">听说读写 · 词汇 · 查词 · 全方位英语学习</p>
      </div>

      <div className="en-card-grid">
        {CARDS.map(card => (
          <div
            key={card.id}
            className={`en-card${card.ready ? '' : ' en-card--coming'}`}
            onClick={() => card.ready && setActiveTool(card.id)}
          >
            <div
              className="en-card-visual"
              style={{ background: card.gradient }}
            >
              <span className="en-card-emoji">{card.emoji}</span>
              <span className="en-card-tag">{card.tag}</span>
            </div>
            <div className="en-card-info">
              <div className="en-card-label">{card.label}</div>
              <div className="en-card-desc">{card.desc}</div>
            </div>
            {!card.ready && <span className="en-card-soon">即将上线</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
