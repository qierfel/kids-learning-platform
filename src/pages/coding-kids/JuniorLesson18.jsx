import { useState } from 'react'
import './JuniorLesson.css'

const WORKS = [
  { name: '欢迎语生成器', emoji: '💌' },
  { name: '贴纸收集页', emoji: '🪅' },
  { name: '双场景故事页', emoji: '🎭' },
]

export default function JuniorLesson18({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [work, setWork] = useState(WORKS[0])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #ede9fe, #fef3c7)' }}>
        <div className="junior-badge" style={{ background: '#ddd6fe', color: '#6d28d9' }}>第 18 课</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">👑</div></div>
          <div><h1 className="junior-title">快乐作品毕业展</h1><p className="junior-sub">把你最喜欢的作品，好好展示出来</p></div>
        </div>
      </div>
      <div className="junior-goals"><div className="junior-goal">完成小童版结业作品</div><div className="junior-goal">把作品讲给别人听</div></div>
      <div className="junior-tabs">{['learn','do','ai','work'].map((k)=><button key={k} className="junior-tab" onClick={()=>setTab(k)} style={tab===k?{borderColor:'#8b5cf6',color:'#6d28d9'}:{}}>{k==='learn'?'看一看':k==='do'?'整理展示':k==='ai'?'问问 AI':'毕业啦'}</button>)}</div>
      <div className="junior-content">
        {tab==='learn' && <div className="junior-card"><h2>毕业展要做什么？</h2><p>选一个你最喜欢的作品，说说它叫什么、它会做什么、你最喜欢哪一部分。</p></div>}
        {tab==='do' && <div className="junior-card"><h2>选一个毕业作品</h2><div className="junior-grid-3">{WORKS.map((item)=><button key={item.name} className={`junior-option-btn${work.name===item.name?' active':''}`} onClick={()=>setWork(item)} style={work.name===item.name?{borderColor:'#8b5cf6',color:'#6d28d9'}:{}}><div className="junior-big-emoji">{item.emoji}</div><div>{item.name}</div></button>)}</div><div className="junior-result"><div style={{fontSize:64,textAlign:'center'}}>{work.emoji}</div><div className="junior-result-title" style={{textAlign:'center',color:'#6d28d9'}}>{work.name}</div><div className="junior-result-copy" style={{textAlign:'center'}}>这是我的毕业作品。我最喜欢它会回应我、会变、会讲故事。</div></div></div>}
        {tab==='ai' && <div className="junior-card"><h2>可以这样问 AI</h2><div className="junior-prompt">{`我想介绍我的毕业作品。\n作品名字是：${work.name}\n请帮我整理成 3 句小朋友可以说的话。`}</div></div>}
        {tab==='work' && <div className="junior-card"><h2>毕业啦</h2><p>从顺序、颜色、选择，到输入、工具、展示，你已经真的做出了一条完整的小童创作线。</p><div className="junior-certificate"><div className="junior-certificate-emoji">👑🌟</div><h3>小童创作毕业生</h3><p>你已经完成 7-10 岁 AI 小创作乐园第二阶段啦。</p></div></div>}
      </div>
    </div>
  )
}
