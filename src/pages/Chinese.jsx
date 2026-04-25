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
  { id: 'confusables',    img: '/icons/generated/chinese/confusables.png',      label: '同音/形近字', desc: '对比练习', ready: true  },
  { id: 'poems',          img: '/icons/generated/chinese/poems.png',            label: '古诗词',      desc: '朗读背诵', ready: true  },
  { id: 'dictionary',     img: '/icons/generated/chinese/dictionary.png',       label: '查词 · 生词本', desc: '拼音例句', ready: true  },
  { id: 'character_list', img: '/icons/generated/chinese/character-list.png',   label: '生字表',      desc: '点字发音', ready: true  },
  { id: 'dictation',      img: '/icons/generated/chinese/dictation.png',        label: '听写练习',    desc: '听写复习', ready: true  },
  { id: 'idioms',         img: '/icons/generated/chinese/idioms.png',           label: '成语故事',    desc: '故事小测', ready: false },
]

const JUNIOR_TOOLS = [
  { id: 'junior_poems',     img: '/icons/generated/chinese/junior-poems.png',      label: '古诗文',     desc: '必背篇目', ready: true  },
  { id: 'junior_knowledge', img: '/icons/generated/chinese/junior-knowledge.png',  label: '语文知识点', desc: '修辞文体', ready: true  },
  { id: 'junior_reading',   img: '/icons/generated/chinese/junior-reading.png',    label: '阅读理解',   desc: '现代文阅读', ready: false },
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
        <div className="subject-eyebrow">Chinese Language Hall</div>
        <h2 className="subject-title">趣味语文 <span className="edition">人教版</span></h2>
        <p className="subject-lead">
          生字、古诗词、词典、听写和初中拓展，都放在这里继续学。
        </p>
      </div>

      <div className="stage-tabs">
        <button className={`stage-tab ${stage === 'primary' ? 'active' : ''}`} onClick={() => { setStage('primary'); setActiveTool(null) }}>
          小学（1-6年级）
        </button>
        <button className={`stage-tab ${stage === 'junior' ? 'active' : ''}`} onClick={() => { setStage('junior'); setActiveTool(null) }}>
          初中（7-9年级）
        </button>
      </div>

      {stage === 'primary' && (
        <div className="cn-textbook-wrap">
          <TextbookLink subject="语文" />
        </div>
      )}

      <div className="cn-card-grid">
        {tools.map(t => (
          <button
            key={t.id}
            className={`cn-card${t.ready ? '' : ' coming-soon'}`}
            onClick={() => t.ready && setActiveTool(t.id)}
          >
            {t.img
              ? (
                <div className="cn-card-img-wrap">
                  <img src={t.img} alt={t.label} className="cn-card-img" />
                </div>
              ) : (
                <div className="cn-card-placeholder">
                  <span className="cn-card-placeholder-label">{t.label}</span>
                </div>
              )
            }
            <div className="cn-card-info">
              <div className="tool-label">{t.label}</div>
              <div className="tool-desc">{t.desc}</div>
            </div>
            {!t.ready && <span className="badge">即将上线</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
