import { useState } from 'react'
import './JuniorLesson.css'

export default function JuniorLesson13({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [name, setName] = useState('')

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #d1fae5, #ccfbf1)' }}>
        <div className="junior-badge" style={{ background: '#a7f3d0', color: '#065f46' }}>第 13 课</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">⌨️</div></div>
          <div><h1 className="junior-title">输入小盒子</h1><p className="junior-sub">把你写进去的字，拿出来看看</p></div>
        </div>
      </div>
      <div className="junior-goals"><div className="junior-goal">认识输入框</div><div className="junior-goal">把自己写的字显示出来</div></div>
      <div className="junior-tabs">{['learn','do','ai','work'].map((k)=><button key={k} className="junior-tab" onClick={()=>setTab(k)} style={tab===k?{borderColor:'#10b981',color:'#047857'}:{}}>{k==='learn'?'看一看':k==='do'?'玩一玩':k==='ai'?'问问 AI':'我学会了'}</button>)}</div>
      <div className="junior-content">
        {tab==='learn' && <div className="junior-card"><h2>输入框像什么？</h2><p>像一个可以把字装进去的小盒子。你打进去，页面就能拿到它。</p></div>}
        {tab==='do' && <div className="junior-card"><h2>试着写下你的名字</h2><input className="l8-input" value={name} onChange={(e)=>setName(e.target.value)} placeholder="把名字写在这里" /><div className="junior-result"><div className="junior-result-title" style={{textAlign:'center',color:'#047857'}}>页面读到了</div><div className="junior-result-copy" style={{textAlign:'center'}}>{name ? `你好，${name}！` : '先在上面写一点字吧。'}</div></div></div>}
        {tab==='ai' && <div className="junior-card"><h2>可以这样问 AI</h2><div className="junior-prompt">{`我想做一个儿童输入框页面。\n请你用很短的话解释：\n输入框是做什么的？`}</div></div>}
        {tab==='work' && <div className="junior-card"><h2>今天我学会了</h2><p>原来页面不只是点按钮，也可以先把字装进去。</p><div className="junior-certificate"><div className="junior-certificate-emoji">⌨️✨</div><h3>输入小能手</h3><p>你已经会用输入框啦。</p></div></div>}
      </div>
    </div>
  )
}
