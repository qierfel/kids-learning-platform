import { useState } from 'react'
import Confusables from './chinese/Confusables'
import Poems from './chinese/Poems'
import ChineseJunior from './chinese/ChineseJunior'
import ChineseDictionary from './chinese/ChineseDictionary'
import Dictation from './chinese/Dictation'
import CharacterList from './chinese/CharacterList'
import TextbookLink from '../components/TextbookLink'
import './Subject.css'

const PRIMARY_TOOLS = [
  { id: 'confusables',    image: '/icons/cn_card_chars.png',     label: '同音/形近字', desc: '对比 · 组词 · 练习',        ready: true },
  { id: 'poems',          image: '/icons/cn_card_poetry.png',    label: '古诗词',      desc: '朗读 · 背诵打卡 · 1-6年级', ready: true },
  { id: 'dictionary',     image: '/icons/cn_card_lookup.png',    label: '查词 · 生词本', desc: '汉字词语 · 拼音 · 例句',  ready: true },
  { id: 'character_list', image: '/icons/cn_card_shape.png',     label: '生字表',       desc: '一类字·二类字·点击发音',  ready: true },
  { id: 'dictation',      image: '/icons/cn_card_dictation.png', label: '听写练习',     desc: '听写·错字本·历史记录',     ready: true },
  { id: 'idioms',         image: '/icons/cn_card_idiom.png',     label: '成语故事',     desc: '图文解释 · 例句 · 小测验',  ready: false },
]

const JUNIOR_TOOLS = [
  { id: 'junior_poems',     emoji: '文', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', label: '古诗文',     desc: '7-9年级必背篇目 · 文言文', ready: true },
  { id: 'junior_knowledge', emoji: '知', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', label: '语文知识点', desc: '修辞 · 文体 · 语法 · 考点', ready: true },
  { id: 'junior_reading',   emoji: '读', gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)', label: '阅读理解',   desc: '现代文 · AI分析',           ready: false },
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
  if (activeTool === 'character_list') {
    return (
      <div className="subject-page">
        <button className="subject-back" onClick={() => setActiveTool(null)}>← 语文</button>
        <CharacterList />
      </div>
    )
  }
  if (activeTool === 'dictation') {
    return (
      <div className="subject-page">
        <button className="subject-back" onClick={() => setActiveTool(null)}>← 语文</button>
        <Dictation onBack={() => setActiveTool(null)} />
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
    <div className="subject-page cn-page">
      <div className="cn-hero">
        <h2 className="subject-title">趣味语文 <span className="edition">人教版</span></h2>
      </div>

      <div className="stage-tabs">
        <button className={`stage-tab ${stage === 'primary' ? 'active' : ''}`} onClick={() => { setStage('primary'); setActiveTool(null) }}>
          小学（1-6年级）
        </button>
        <button className={`stage-tab ${stage === 'junior' ? 'active' : ''}`} onClick={() => { setStage('junior'); setActiveTool(null) }}>
          初中（7-9年级）
        </button>
      </div>

      {stage === 'primary' && <TextbookLink subject="语文" />}

      <div className="cn-card-grid">
        {tools.map(t => (
          <div
            key={t.id}
            className={`cn-card ${t.ready ? '' : 'coming-soon'}`}
            onClick={() => t.ready && setActiveTool(t.id)}
          >
            {t.image
              ? <img src={t.image} alt={t.label} className="cn-card-img" />
              : (
                <div className="cn-card-visual" style={{ background: t.gradient }}>
                  <span className="cn-card-emoji">{t.emoji}</span>
                </div>
              )
            }
            <div className="cn-card-info">
              <div className="tool-label">{t.label}</div>
              <div className="tool-desc">{t.desc}</div>
            </div>
            {!t.ready && <span className="badge">即将上线</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
