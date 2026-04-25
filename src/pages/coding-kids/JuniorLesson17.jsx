import { useState } from 'react'
import './JuniorLesson.css'

const IMPROVES = [
  { id: 'color', label: '换更好看的颜色', emoji: '🎨' },
  { id: 'button', label: '加一个按钮', emoji: '🔘' },
  { id: 'emoji', label: '加更多表情', emoji: '😄' },
]

export default function JuniorLesson17({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [picked, setPicked] = useState(IMPROVES[0])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #dbeafe, #e0e7ff)' }}>
        <div className="junior-badge" style={{ background: '#bfdbfe', color: '#1d4ed8' }}>第 17 课</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">🚀</div></div>
          <div><h1 className="junior-title">升级成 2.0</h1><p className="junior-sub">作品做完了，还能继续变更好</p></div>
        </div>
      </div>
      <div className="junior-goals"><div className="junior-goal">学会给旧作品加新东西</div><div className="junior-goal">知道作品可以越做越好</div></div>
      <div className="junior-tabs">{['learn','do','ai','work'].map((k)=><button key={k} className="junior-tab" onClick={()=>setTab(k)} style={tab===k?{borderColor:'#3b82f6',color:'#1d4ed8'}:{}}>{k==='learn'?'看一看':k==='do'?'做一做':k==='ai'?'问问 AI':'我学会了'}</button>)}</div>
      <div className="junior-content">
        {tab==='learn' && <div className="junior-card"><h2>什么叫 2.0？</h2><p>不是推翻重来，而是在原来的作品上再加一点好看的、好玩的、好用的东西。</p></div>}
        {tab==='do' && <div className="junior-card"><h2>给旧作品加一个升级点</h2><div className="junior-grid-3">{IMPROVES.map((item)=><button key={item.id} className={`junior-option-btn${picked.id===item.id?' active':''}`} onClick={()=>setPicked(item)} style={picked.id===item.id?{borderColor:'#3b82f6',color:'#1d4ed8'}:{}}><div className="junior-big-emoji">{item.emoji}</div><div>{item.label}</div></button>)}</div><div className="junior-result"><div style={{fontSize:56,textAlign:'center'}}>{picked.emoji}</div><div className="junior-result-title" style={{textAlign:'center',color:'#1d4ed8'}}>今天的升级点</div><div className="junior-result-copy" style={{textAlign:'center'}}>{picked.label}</div></div></div>}
        {tab==='ai' && <div className="junior-card"><h2>可以这样问 AI</h2><div className="junior-prompt">{`我已经做了一个儿童小页面。\n现在我想给它升级成 2.0。\n请你告诉我最简单的 3 种升级方法。`}</div></div>}
        {tab==='work' && <div className="junior-card"><h2>今天我学会了</h2><p>作品做完不是结束。会升级，说明你已经更像小小创作者了。</p><div className="junior-certificate"><div className="junior-certificate-emoji">🚀✨</div><h3>作品升级员</h3><p>你已经会把 1.0 变成 2.0 啦。</p></div></div>}
      </div>
    </div>
  )
}
