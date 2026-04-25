import { useState } from 'react'
import './JuniorLesson.css'

const COLORS = [
  { id: 'blue', label: '蓝色', color: '#2563eb', bg: '#dbeafe' },
  { id: 'green', label: '绿色', color: '#16a34a', bg: '#dcfce7' },
  { id: 'pink', label: '粉色', color: '#db2777', bg: '#fce7f3' },
]

export default function JuniorLesson15({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [name, setName] = useState('')
  const [color, setColor] = useState(COLORS[0])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #dcfce7, #dbeafe)' }}>
        <div className="junior-badge" style={{ background: '#bbf7d0', color: '#166534' }}>第 15 课</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">🧃</div></div>
          <div><h1 className="junior-title">名字和颜色小机器</h1><p className="junior-sub">输入名字，再给它一种喜欢的颜色</p></div>
        </div>
      </div>
      <div className="junior-goals"><div className="junior-goal">把名字和颜色拼起来</div><div className="junior-goal">让工具更像自己的小作品</div></div>
      <div className="junior-tabs">{['learn','do','ai','work'].map((k)=><button key={k} className="junior-tab" onClick={()=>setTab(k)} style={tab===k?{borderColor:'#22c55e',color:'#15803d'}:{}}>{k==='learn'?'看一看':k==='do'?'做一做':k==='ai'?'问问 AI':'我学会了'}</button>)}</div>
      <div className="junior-content">
        {tab==='learn' && <div className="junior-card"><h2>怎么让作品更像“我的”？</h2><p>最简单的办法，就是把自己的名字和自己喜欢的颜色放进去。</p></div>}
        {tab==='do' && <div className="junior-card"><h2>做你的名字小机器</h2><input className="l8-input" value={name} onChange={(e)=>setName(e.target.value)} placeholder="写你的名字" /><div className="junior-grid-3">{COLORS.map((item)=><button key={item.id} className={`junior-option-btn${color.id===item.id?' active':''}`} onClick={()=>setColor(item)} style={color.id===item.id?{borderColor:item.color,color:item.color}:{}}><div>{item.label}</div></button>)}</div><div className="junior-result" style={{background:color.bg,borderColor:color.color+'55'}}><div style={{fontSize:56,textAlign:'center'}}>🧃</div><div className="junior-result-title" style={{textAlign:'center',color:color.color}}>{name ? `${name} 的颜色机器` : '我的颜色机器'}</div><div className="junior-result-copy" style={{textAlign:'center'}}>今天它最喜欢 {color.label}。</div></div></div>}
        {tab==='ai' && <div className="junior-card"><h2>可以这样问 AI</h2><div className="junior-prompt">{`我在做一个儿童名字小工具。\n会显示名字和颜色。\n请你帮我想一句很短的介绍话。`}</div></div>}
        {tab==='work' && <div className="junior-card"><h2>今天我学会了</h2><p>我已经会把输入和页面风格拼到一起了。</p><div className="junior-certificate"><div className="junior-certificate-emoji">🧃🎨</div><h3>作品拼装师</h3><p>你的小工具越来越像真的啦。</p></div></div>}
      </div>
    </div>
  )
}
