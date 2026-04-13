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
    category: '听力',
    icon: '🎧',
    label: '听力练习',
    desc: 'TTS朗读 · 分级故事',
    gradient: 'linear-gradient(145deg, #ffffff 0%, #e0f4ff 100%)',
    color: '#0891b2',
    ready: true,
  },
  {
    id: 'history',
    category: '历史文化',
    icon: '🌍',
    label: '人类大历史',
    desc: '中英双语 · 98讲 · TTS朗读',
    gradient: 'linear-gradient(145deg, #ffffff 0%, #f5ede0 100%)',
    color: '#b45309',
    ready: true,
  },
  {
    id: 'phonics',
    category: '拼读',
    icon: '🔤',
    label: '自然拼读',
    desc: '尼尔森体系 · 148集视频',
    gradient: 'linear-gradient(145deg, #ffffff 0%, #fef9d7 100%)',
    color: '#d97706',
    ready: true,
  },
  {
    id: 'speaking',
    category: '口语',
    icon: '🗣️',
    label: '口语对话',
    desc: 'AI外教 Emma · 实时纠错',
    gradient: 'linear-gradient(145deg, #ffffff 0%, #fff1e0 100%)',
    color: '#ea580c',
    ready: true,
  },
  {
    id: 'reading_hub',
    category: '阅读',
    icon: '📖',
    label: '阅读中心',
    desc: '分级 · 绘本 · 章节书 · 考试阅读',
    gradient: 'linear-gradient(145deg, #ffffff 0%, #e0f9ec 100%)',
    color: '#059669',
    ready: true,
  },
  {
    id: 'writing',
    category: '写作',
    icon: '✏️',
    label: '写作练习',
    desc: 'AI批改 · 自动录入错题本',
    gradient: 'linear-gradient(145deg, #ffffff 0%, #f3e8ff 100%)',
    color: '#7c3aed',
    ready: true,
  },
  {
    id: 'grammar',
    category: '语法',
    icon: '📐',
    label: '语法讲解',
    desc: '14章65个知识点 · AI练习题',
    gradient: 'linear-gradient(145deg, #ffffff 0%, #deeeff 100%)',
    color: '#2563eb',
    ready: true,
  },
  {
    id: 'srs',
    category: '词汇',
    icon: '📅',
    label: '词汇记忆',
    desc: '记忆曲线 · 每日任务 · KET/PET/FCE',
    gradient: 'linear-gradient(145deg, #ffffff 0%, #dff0ff 100%)',
    color: '#3b82f6',
    ready: true,
  },
  {
    id: 'words',
    category: '单词',
    icon: '🃏',
    label: '单词速练',
    desc: '沪教版 · KET · PET · FCE 闪卡',
    gradient: 'linear-gradient(145deg, #ffffff 0%, #e0eeff 100%)',
    color: '#4f46e5',
    ready: true,
  },
  {
    id: 'textbook_vocab',
    category: '教材',
    icon: '📚',
    label: '教材词汇',
    desc: '译林版3-6年级 · 单词句型 · 听写练习',
    gradient: 'linear-gradient(145deg, #ffffff 0%, #fff1e8 100%)',
    color: '#c2410c',
    ready: true,
  },
  {
    id: 'dictionary',
    category: '查词',
    icon: '🔎',
    label: '查词 · 生词本',
    desc: '即查即存 · 闪音 · 例句 · 闪卡复习',
    gradient: 'linear-gradient(145deg, #ffffff 0%, #d9feff 100%)',
    color: '#0891b2',
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
        <div className="en-hero-icon">🌟</div>
        <h1 className="en-hero-title">趣味英语</h1>
        <p className="en-hero-sub">听说读写 · 词汇 · 查词 · 全方位英语学习</p>
      </div>

      <div className="en-card-grid">
        {CARDS.map(card => (
          <div
            key={card.id}
            className={`en-card${card.ready ? '' : ' en-card--coming'}`}
            style={{ '--card-gradient': card.gradient, '--card-color': card.color }}
            onClick={() => card.ready && setActiveTool(card.id)}
          >
            <div className="en-card-icon-wrap">
              <span className="en-card-icon">{card.icon}</span>
            </div>
            <div className="en-card-bottom">
              <span className="en-card-badge">{card.category}</span>
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
