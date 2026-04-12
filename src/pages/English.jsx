import { useState } from 'react'
import WordQuiz from './english/WordQuiz'
import SRSStudy from './english/SRSStudy'
import Grammar from './english/Grammar'
import Speaking from './english/Speaking'
import Writing from './english/Writing'
import Listening from './english/Listening'
import Reading from './english/Reading'
import GradedReading from './english/GradedReading'
import Dictionary from './english/Dictionary'
import HumanHistory from './english/HumanHistory'
import TextbookLink from '../components/TextbookLink'
import './Subject.css'

const TOOLS = [
  { id: 'srs',        icon: '📅', label: '词汇记忆',  desc: '记忆曲线 · 每日任务 · KET/PET/FCE', ready: true },
  { id: 'words',      icon: '📖', label: '单词速练',  desc: '沪教版 · KET · PET · FCE 闪卡', ready: true },
  { id: 'dictionary', icon: '🔎', label: '查词 · 生词本', desc: '即查即存 · 闪卡复习', ready: true },
  { id: 'grammar',    icon: '📐', label: '语法讲解',  desc: '14章65个知识点 · AI练习题', ready: true },
  { id: 'graded',     icon: '📚', label: '分级读物',  desc: 'RAZ aa–T · 海尼曼GK/G1 · 牛津树 · 音频', ready: true },
  { id: 'history',    icon: '🌍', label: '人类大历史', desc: '中英双语 · 98讲 · TTS朗读', ready: true },
  { id: 'listening',  icon: '🎧', label: '听力练习',  desc: 'TTS朗读 · 分级故事 · B站资源', ready: true },
  { id: 'speaking',   icon: '🗣️', label: '口语对话',  desc: 'AI外教 Emma · 实时纠错', ready: true },
  { id: 'reading',    icon: '📄', label: '阅读理解',  desc: 'KET/PET/FCE真题 · AI讲解', ready: true },
  { id: 'writing',    icon: '✏️', label: '写作练习',  desc: 'AI批改 · 自动录入错题本', ready: true },
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

  if (activeTool === 'srs')        return <SRSStudy user={user} onBack={() => setActiveTool(null)} />
  if (activeTool === 'words')      return <WordQuiz onBack={() => setActiveTool(null)} />
  if (activeTool === 'dictionary') return <Dictionary onBack={() => setActiveTool(null)} />
  if (activeTool === 'grammar')    return <Grammar user={user} onBack={() => setActiveTool(null)} />
  if (activeTool === 'graded')     return <GradedReading onBack={() => setActiveTool(null)} />
  if (activeTool === 'history')    return <HumanHistory onBack={() => setActiveTool(null)} />
  if (activeTool === 'listening')  return <Listening onBack={() => setActiveTool(null)} />
  if (activeTool === 'speaking')   return <Speaking user={user} onBack={() => setActiveTool(null)} />
  if (activeTool === 'reading')    return <Reading user={user} onBack={() => setActiveTool(null)} />
  if (activeTool === 'writing')    return <Writing user={user} onBack={() => setActiveTool(null)} onAddMistake={handleAddMistake} />

  return (
    <div className="subject-page">
      <h2 className="subject-title">英语 <span className="edition">听说读写 · 词汇 · 语法 · 查词</span></h2>
      <TextbookLink subject="英语" edition="译林版/人教版小学英语" />
      <div className="tool-grid">
        {TOOLS.map(t => (
          <div
            key={t.id}
            className={`tool-card ${t.ready ? '' : 'coming-soon'}`}
            onClick={() => t.ready && setActiveTool(t.id)}
          >
            <div className="tool-icon">{t.icon}</div>
            <div className="tool-label">{t.label}</div>
            <div className="tool-desc">{t.desc}</div>
            {!t.ready && <span className="badge">即将上线</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
