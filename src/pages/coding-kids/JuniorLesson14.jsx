import { useState } from 'react'
import './JuniorLesson.css'

export default function JuniorLesson14({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [name, setName] = useState('')

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #fce7f3, #ffe4e6)' }}>
        <div className="junior-badge" style={{ background: '#fbcfe8', color: '#9d174d' }}>第 14 课</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">💌</div></div>
          <div><h1 className="junior-title">欢迎语生成器</h1><p className="junior-sub">写下名字，页面就会和你打招呼</p></div>
        </div>
      </div>
      <div className="junior-goals"><div className="junior-goal">让页面根据输入说话</div><div className="junior-goal">做一个会欢迎别人的小工具</div></div>
      <div className="junior-tabs">{['learn','do','ai','work'].map((k)=><button key={k} className="junior-tab" onClick={()=>setTab(k)} style={tab===k?{borderColor:'#f472b6',color:'#be185d'}:{}}>{k==='learn'?'看一看':k==='do'?'做一做':k==='ai'?'问问 AI':'我学会了'}</button>)}</div>
      <div className="junior-content">
        {tab==='learn' && <div className="junior-card"><h2>页面为什么会“说话”？</h2><p>因为它先读到你的输入，再把结果显示出来。这就像收到名字以后再说“欢迎你”。</p></div>}
        {tab==='do' && <div className="junior-card"><h2>做一个欢迎别人来的页面</h2><input className="l8-input" value={name} onChange={(e)=>setName(e.target.value)} placeholder="写一个名字" /><div className="junior-result"><div style={{fontSize:52,textAlign:'center'}}>💌</div><div className="junior-result-title" style={{textAlign:'center',color:'#be185d'}}>欢迎卡片</div><div className="junior-result-copy" style={{textAlign:'center'}}>{name ? `${name}，欢迎来到我的快乐页面！` : '先写一个名字吧。'}</div></div></div>}
        {tab==='ai' && <div className="junior-card"><h2>可以这样问 AI</h2><div className="junior-prompt">{`我想做一个欢迎语页面。\n当别人输入名字后，\n页面会说“欢迎来到我的快乐页面”。\n请你帮我再想 2 句可爱的欢迎话。`}</div></div>}
        {tab==='work' && <div className="junior-card"><h2>今天我学会了</h2><p>页面已经越来越像“小工具”了。它会先读输入，再给出回应。</p><div className="junior-certificate"><div className="junior-certificate-emoji">💌🌈</div><h3>欢迎语小作者</h3><p>你已经会做会打招呼的页面啦。</p></div></div>}
      </div>
    </div>
  )
}
