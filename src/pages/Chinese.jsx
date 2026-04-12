import { useState } from 'react'
import Confusables from './chinese/Confusables'
import Poems from './chinese/Poems'
import ChineseJunior from './chinese/ChineseJunior'
import ChineseDictionary from './chinese/ChineseDictionary'
import TextbookLink from '../components/TextbookLink'
import './Subject.css'

const PRIMARY_TOOLS = [
  { id: 'confusables', icon: '字', label: '同音/形近字', desc: '对比 · 组词 · 练习', ready: true },
  { id: 'poems',       icon: '诗', label: '古诗词',      desc: '朗读 · 背诵打卡 · 1-6年级', ready: true },
  { id: 'dictionary',  icon: '🔎', label: '查词 · 生词本', desc: '汉字词语 · 拼音 · 例句', ready: true },
  { id: 'idioms',      icon: '成', label: '成语故事',    desc: '图文解释 · 例句 · 小测验', ready: false },
]

const JUNIOR_TOOLS = [
  { id: 'junior_poems', icon: '诗', label: '古诗文', desc: '7-9年级必背篇目 · 文言文', ready: true },
  { id: 'junior_knowledge', icon: '知', label: '语文知识点', desc: '修辞 · 文体 · 语法 · 考点', ready: true },
  { id: 'junior_reading', icon: '读', label: '阅读理解', desc: '现代文 · AI分析', ready: false },
]

export default function Chinese() {
  const [stage, setStage] = useState('primary') // 'primary' | 'junior'
  const [activeTool, setActiveTool] = useState(null)

  if (activeTool === 'confusables') {
    return (
      <div className="subject-page">
        <button className="subject-back" onClick={() => setActiveTool(null)}>← 语文</button>
        <Confusables />
      </div>
    )
  }
  if (activeTool === 'poems') {
    return (
      <div className="subject-page">
        <button className="subject-back" onClick={() => setActiveTool(null)}>← 语文</button>
        <Poems />
      </div>
    )
  }
  if (activeTool === 'dictionary') {
    return (
      <div className="subject-page">
        <button className="subject-back" onClick={() => setActiveTool(null)}>← 语文</button>
        <ChineseDictionary />
      </div>
    )
  }
  if (activeTool === 'junior_poems' || activeTool === 'junior_knowledge') {
    return (
      <div className="subject-page">
        <button className="subject-back" onClick={() => setActiveTool(null)}>← 语文</button>
        <ChineseJunior section={activeTool} />
      </div>
    )
  }

  const tools = stage === 'primary' ? PRIMARY_TOOLS : JUNIOR_TOOLS

  return (
    <div className="subject-page">
      <h2 className="subject-title">语文 <span className="edition">人教版</span></h2>

      <div className="stage-tabs">
        <button className={`stage-tab ${stage === 'primary' ? 'active' : ''}`} onClick={() => { setStage('primary'); setActiveTool(null) }}>
          小学（1-6年级）
        </button>
        <button className={`stage-tab ${stage === 'junior' ? 'active' : ''}`} onClick={() => { setStage('junior'); setActiveTool(null) }}>
          初中（7-9年级）
        </button>
      </div>

      {stage === 'primary' && <TextbookLink subject="语文" />}

      <div className="tool-grid">
        {tools.map(t => (
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
