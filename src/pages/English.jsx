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
import TextbookLink from '../components/TextbookLink'
import TextbookVocab from './english/TextbookVocab'
import './Subject.css'
import './English.css'

const CATEGORIES = [
  {
    id: 'listening',
    label: '听力',
    color: '#06b6d4',
    bg: '#ecfeff',
    tools: [
      { id: 'listening', icon: '🎧', label: '听力练习', desc: 'TTS朗读 · 分级故事', ready: true },
      { id: 'history',   icon: '🌍', label: '人类大历史', desc: '中英双语 · 98讲 · TTS朗读', ready: true },
      { id: 'phonics',   icon: '🔤', label: '自然拼读',   desc: '尼尔森体系 · 148集视频', ready: true },
    ],
  },
  {
    id: 'speaking',
    label: '口语',
    color: '#f59e0b',
    bg: '#fffbeb',
    tools: [
      { id: 'speaking', icon: '🗣️', label: '口语对话', desc: 'AI外教 Emma · 实时纠错', ready: true },
    ],
  },
  {
    id: 'reading',
    label: '阅读',
    color: '#10b981',
    bg: '#ecfdf5',
    tools: [
      { id: 'reading_hub', icon: '📖', label: '阅读', desc: '分级 · 绘本 · 章节书 · 考试阅读', ready: true },
    ],
  },
  {
    id: 'writing',
    label: '写作',
    color: '#8b5cf6',
    bg: '#f5f3ff',
    tools: [
      { id: 'writing', icon: '✏️', label: '写作练习', desc: 'AI批改 · 自动录入错题本', ready: true },
    ],
  },
  {
    id: 'grammar',
    label: '语法',
    color: '#0ea5e9',
    bg: '#f0f9ff',
    tools: [
      { id: 'grammar', icon: '📐', label: '语法讲解', desc: '14章65个知识点 · AI练习题', ready: true },
    ],
  },
  {
    id: 'vocab',
    label: '词汇',
    color: '#ef4444',
    bg: '#fef2f2',
    tools: [
      { id: 'srs',           icon: '📅', label: '词汇记忆',   desc: '记忆曲线 · 每日任务 · KET/PET/FCE', ready: true },
      { id: 'words',         icon: '📖', label: '单词速练',   desc: '沪教版 · KET · PET · FCE 闪卡',       ready: true },
      { id: 'textbook_vocab',icon: '📚', label: '教材词汇',   desc: '译林版3-6年级 · 单词句型 · 听写练习', ready: true },
    ],
  },
  {
    id: 'dictionary',
    label: '字典',
    color: '#6366f1',
    bg: '#eef2ff',
    tools: [
      { id: 'dictionary', icon: '🔎', label: '查词 · 生词本', desc: '即查即存 · 闪卡复习', ready: true },
    ],
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
  if (activeTool === 'phonics')    return <Phonics onBack={() => setActiveTool(null)} />
  if (activeTool === 'listening')   return <Listening onBack={() => setActiveTool(null)} />
  if (activeTool === 'speaking')    return <Speaking user={user} onBack={() => setActiveTool(null)} />
  if (activeTool === 'writing')      return <Writing user={user} onBack={() => setActiveTool(null)} onAddMistake={handleAddMistake} />
  if (activeTool === 'textbook_vocab') return <TextbookVocab onBack={() => setActiveTool(null)} />

  return (
    <div className="subject-page en-page">
      <h2 className="subject-title">
        英语
        <span className="edition">听说读写 · 词汇 · 字典</span>
      </h2>
      <TextbookLink subject="英语" />

      <div className="en-categories">
        {CATEGORIES.map(cat => (
          <div key={cat.id} className="en-category">
            <div
              className="en-cat-label"
              style={{ color: cat.color, borderColor: cat.color }}
            >
              {cat.label}
            </div>
            <div className="en-cat-tools">
              {cat.tools.map(t => (
                <div
                  key={t.id}
                  className={`en-tool-card ${t.ready ? '' : 'coming-soon'}`}
                  style={{ '--cat-color': cat.color, '--cat-bg': cat.bg }}
                  onClick={() => t.ready && setActiveTool(t.id)}
                >
                  <div className="en-tool-icon">{t.icon}</div>
                  <div className="en-tool-info">
                    <div className="en-tool-label">{t.label}</div>
                    <div className="en-tool-desc">{t.desc}</div>
                  </div>
                  {!t.ready && <span className="badge">即将上线</span>}
                  <div className="en-tool-arrow">›</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
