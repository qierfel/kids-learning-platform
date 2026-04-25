import { useState } from 'react'
import './JuniorLesson.css'

const STICKERS = ['⭐', '🌈', '🦄', '🍭', '🎈', '🚀']

export default function JuniorLesson16({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [picked, setPicked] = useState(['⭐', '🌈'])

  function toggle(item) {
    setPicked((prev) => prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item].slice(-4))
  }

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #fde68a, #fed7aa)' }}>
        <div className="junior-badge" style={{ background: '#fde68a', color: '#92400e' }}>第 16 课</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">🪅</div></div>
          <div><h1 className="junior-title">我的贴纸收集页</h1><p className="junior-sub">把多个小元素排成一页作品</p></div>
        </div>
      </div>
      <div className="junior-goals"><div className="junior-goal">整理多个小元素</div><div className="junior-goal">做一页更完整的作品</div></div>
      <div className="junior-tabs">{['learn','do','ai','work'].map((k)=><button key={k} className="junior-tab" onClick={()=>setTab(k)} style={tab===k?{borderColor:'#f59e0b',color:'#b45309'}:{}}>{k==='learn'?'看一看':k==='do'?'做一做':k==='ai'?'问问 AI':'我学会了'}</button>)}</div>
      <div className="junior-content">
        {tab==='learn' && <div className="junior-card"><h2>什么时候页面会更完整？</h2><p>当页面里不只有一个东西，而是有好几个小元素一起排好，看起来就更像“作品页”。</p></div>}
        {tab==='do' && <div className="junior-card"><h2>做你的贴纸页</h2><div className="sticker-row">{STICKERS.map((item)=><button key={item} className={`sticker${picked.includes(item)?' active':''}`} onClick={()=>toggle(item)}>{item}</button>)}</div><div className="project-preview" style={{borderColor:'#f59e0b'}}><div className="project-top" style={{background:'#f59e0b'}}>我的贴纸收集页</div><div className="project-body"><div className="sticker-row" style={{justifyContent:'center'}}>{picked.map((item)=><div key={item} className="sticker active" style={{cursor:'default'}}>{item}</div>)}</div><div style={{textAlign:'center',marginTop:12,color:'#64748b'}}>我最喜欢的 {picked.length} 个快乐贴纸</div></div></div></div>}
        {tab==='ai' && <div className="junior-card"><h2>可以这样问 AI</h2><div className="junior-prompt">{`我在做一个儿童贴纸页面。\n请你帮我想 3 个可爱的页面名字。`}</div></div>}
        {tab==='work' && <div className="junior-card"><h2>今天我学会了</h2><p>把很多小东西排整齐，也是一种做页面的本领。</p><div className="junior-certificate"><div className="junior-certificate-emoji">🪅📄</div><h3>页面整理员</h3><p>你已经会做更完整的一页作品啦。</p></div></div>}
      </div>
    </div>
  )
}
