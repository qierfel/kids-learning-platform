import { useState } from 'react'
import './Lesson.css'

const ELEMENTS = [
  { id: 'logo', icon: '🏷️', label: '网站名称 / Logo', desc: '告诉访客这是哪个网站', correct: 'top' },
  { id: 'nav', icon: '📋', label: '导航菜单', desc: '帮你跳转到不同页面', correct: 'top' },
  { id: 'banner', icon: '🖼️', label: '大图/横幅', desc: '吸引眼球的主视觉区域', correct: 'content' },
  { id: 'text', icon: '📝', label: '正文段落', desc: '介绍内容的文字', correct: 'content' },
  { id: 'button', icon: '🔵', label: '操作按钮', desc: '点击后触发某个动作', correct: 'content' },
  { id: 'search', icon: '🔍', label: '搜索框', desc: '输入关键词查找内容', correct: 'top' },
  { id: 'copy', icon: '©️', label: '版权信息', desc: '网站归属和年份', correct: 'bottom' },
  { id: 'links', icon: '🔗', label: '底部链接', desc: '关于我们、联系方式等', correct: 'bottom' },
]

const ZONES = [
  { id: 'top', label: '顶部区域', color: '#f97316', desc: '导航、Logo' },
  { id: 'content', label: '内容区域', color: '#06b6d4', desc: '正文、图片、按钮' },
  { id: 'bottom', label: '底部区域', color: '#8b5cf6', desc: '版权、链接' },
]

const QUIZ = [
  {
    q: '浏览器是用来做什么的？',
    options: ['写网页代码', '运行和显示网页', '画网页设计图', '存储网页文件'],
    correct: 1,
    explain: '浏览器（比如Chrome、Safari）就是网页运行的"舞台"，我们用它来打开和查看网页。',
  },
  {
    q: '网页的"导航栏"最常出现在哪里？',
    options: ['页面底部', '页面中间', '页面顶部', '页面右侧'],
    correct: 2,
    explain: '导航栏通常在网页顶部，方便用户快速找到想去的页面，就像路标一样。',
  },
  {
    q: '下面哪个不是网页的基本元素？',
    options: ['标题文字', '图片', '鼠标', '按钮'],
    correct: 2,
    explain: '鼠标是用来操作电脑的工具，不是网页本身的元素。标题、图片、按钮都是网页上看得到的元素。',
  },
]

export default function Lesson7({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [selected, setSelected] = useState(null)
  const [placed, setPlaced] = useState({})
  const [checked, setChecked] = useState(false)
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  function handleElementClick(id) {
    if (checked) return
    setSelected(id === selected ? null : id)
  }

  function handleZoneClick(zoneId) {
    if (!selected || checked) return
    setPlaced(prev => ({ ...prev, [selected]: zoneId }))
    setSelected(null)
  }

  function handleCheck() {
    if (Object.keys(placed).length < ELEMENTS.length) return
    setChecked(true)
  }

  function handleQuizAnswer(optIdx) {
    if (quizAnswer !== null) return
    const correct = optIdx === QUIZ[quizIdx].correct
    setQuizAnswer({ optIdx, correct })
    if (correct) setQuizScore(s => s + 1)
  }

  function nextQuestion() {
    if (quizIdx + 1 >= QUIZ.length) setQuizDone(true)
    else { setQuizIdx(i => i + 1); setQuizAnswer(null) }
  }

  const score = checked ? ELEMENTS.filter(e => placed[e.id] === e.correct).length : 0

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回课程列表</button>

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#ffedd5', color: '#c2410c' }}>第 7 课</span>
        <span className="lesson-hero-emoji">🌐</span>
        <h1 className="lesson-hero-title">网页是什么</h1>
        <p className="lesson-hero-sub">What is a Webpage?</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>知道网页由哪些基本元素组成</li>
          <li>理解浏览器是运行网页的地方</li>
          <li>能认出标题、导航、内容、按钮、底部五大区域</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {['learn', 'do', 'ai', 'quiz'].map(t => (
          <button key={t} className={`lesson-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}
            style={tab === t ? { borderBottomColor: '#f97316', color: '#f97316' } : {}}>
            {t === 'learn' ? '学一学' : t === 'do' ? '做一做' : t === 'ai' ? '用AI帮忙' : '测一测'}
          </button>
        ))}
      </div>

      {tab === 'learn' && (
        <div className="lesson-content">
          <div className="lesson-section">
            <h2 className="lesson-section-title">🌐 网页就像一个房间</h2>
            <p className="lesson-text">
              你每天打开的网页，其实就像一个精心布置的房间。房间有不同的区域——入口、客厅、储藏室……网页也一样，
              分成不同的部分，每个部分都有自己的工作。
            </p>
            <div className="lesson-info-grid">
              {[
                { icon: '🔝', name: '顶部区域', desc: '放 Logo、导航菜单，帮访客找方向' },
                { icon: '📄', name: '内容区域', desc: '放正文、图片、视频，是网页的"主体"' },
                { icon: '⬇️', name: '底部区域', desc: '放版权信息、联系方式、附加链接' },
              ].map(z => (
                <div key={z.name} className="lesson-info-card">
                  <span style={{ fontSize: 28 }}>{z.icon}</span>
                  <strong>{z.name}</strong>
                  <p>{z.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lesson-section">
            <h2 className="lesson-section-title">🧩 网页的基本零件</h2>
            <div className="lesson-keyword-list">
              {[
                ['🏷️', '标题（Title）', '告诉你这个页面叫什么'],
                ['📋', '导航栏（Nav）', '带你跳转到不同页面的菜单'],
                ['🖼️', '图片（Image）', '让页面更生动的视觉内容'],
                ['🔵', '按钮（Button）', '点击后会触发某个动作'],
                ['🔗', '链接（Link）', '点击跳转到另一个地方'],
                ['📝', '文字段落（Text）', '页面上的正文内容'],
              ].map(([icon, name, desc]) => (
                <div key={name} className="lesson-keyword-item">
                  <span className="lesson-keyword-icon">{icon}</span>
                  <div>
                    <strong>{name}</strong>
                    <span className="lesson-keyword-desc">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lesson-section">
            <h2 className="lesson-section-title">🖥️ 浏览器是什么</h2>
            <p className="lesson-text">
              浏览器就是你用来"看"网页的软件，比如 Chrome、Safari、Edge。
              网页的代码写好之后，浏览器负责把它变成你看到的漂亮页面——就像翻译官。
            </p>
            <div className="lesson-tip-box">
              💡 <strong>小技巧：</strong>右键点击任何网页，选"检查"或"查看页面源代码"，就能看到网页背后的代码！
            </div>
          </div>
        </div>
      )}

      {tab === 'do' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🧩 网页拆拆看</h2>
          <p className="lesson-text">
            下面有 8 个网页元素。先点选一个元素，再点击你认为它应该属于的区域。全部放完后，点"检查答案"！
          </p>

          <div className="l7-game-wrap">
            <div className="l7-elements">
              <div className="l7-zone-label">网页元素（点击选中）</div>
              <div className="l7-element-grid">
                {ELEMENTS.map(el => (
                  <button
                    key={el.id}
                    className={`l7-element-card${selected === el.id ? ' selected' : ''}${placed[el.id] ? ' placed' : ''}${checked ? (placed[el.id] === el.correct ? ' correct' : ' wrong') : ''}`}
                    onClick={() => handleElementClick(el.id)}
                  >
                    <span className="l7-el-icon">{el.icon}</span>
                    <span className="l7-el-label">{el.label}</span>
                    {placed[el.id] && (
                      <span className="l7-el-zone">→ {ZONES.find(z => z.id === placed[el.id])?.label}</span>
                    )}
                    {checked && (
                      <span className="l7-el-result">{placed[el.id] === el.correct ? '✅' : '❌'}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="l7-zones">
              <div className="l7-zone-label">点击放置到这里↓</div>
              {ZONES.map(zone => (
                <button
                  key={zone.id}
                  className={`l7-zone${selected ? ' droppable' : ''}`}
                  style={{ borderColor: zone.color, background: selected ? `${zone.color}15` : '#fff' }}
                  onClick={() => handleZoneClick(zone.id)}
                >
                  <strong style={{ color: zone.color }}>{zone.label}</strong>
                  <span className="l7-zone-desc">{zone.desc}</span>
                  <div className="l7-zone-count">
                    {Object.entries(placed).filter(([, v]) => v === zone.id).length} 个元素
                  </div>
                </button>
              ))}
            </div>
          </div>

          {!checked && (
            <button
              className="lesson-btn"
              style={{ background: '#f97316', opacity: Object.keys(placed).length < ELEMENTS.length ? 0.4 : 1 }}
              disabled={Object.keys(placed).length < ELEMENTS.length}
              onClick={handleCheck}
            >
              检查答案 ({Object.keys(placed).length}/{ELEMENTS.length})
            </button>
          )}

          {checked && (
            <div className="lesson-result-box">
              <div className="lesson-result-score">
                {score >= 7 ? '🎉' : score >= 5 ? '👍' : '💪'} {score}/{ELEMENTS.length} 正确
              </div>
              <p>{score >= 7 ? '太棒了！你对网页结构已经很熟悉了！' : score >= 5 ? '不错！再想想哪几个放错了。' : '没关系，多读几遍"学一学"再来试试！'}</p>
              <div className="l7-answers">
                {ELEMENTS.map(el => (
                  <div key={el.id} className={`l7-answer-row ${placed[el.id] === el.correct ? 'ok' : 'err'}`}>
                    {el.icon} {el.label} → 正确区域：{ZONES.find(z => z.id === el.correct)?.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'ai' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🤖 用AI问问看</h2>
          <p className="lesson-text">遇到不懂的网页元素，可以直接问AI！下面是一些好用的问法：</p>

          <div className="ai-chat-demo">
            {[
              { role: 'kid', text: 'AI，导航栏是什么？' },
              { role: 'ai', text: '导航栏就是网页顶部的菜单，里面有"首页"、"关于我们"这样的链接。点击它们就能跳到不同的页面——就像超市里的指示牌，告诉你想去的地方在哪里。' },
              { role: 'kid', text: '按钮和链接有什么区别？' },
              { role: 'ai', text: '链接通常是蓝色带下划线的文字，点击后跳转到另一个页面。按钮通常有边框或颜色，点击后可以触发各种动作——比如提交表单、显示菜单、播放视频等。简单说：链接用来"跳转"，按钮用来"做事"。' },
            ].map((msg, i) => (
              <div key={i} className={`ai-chat-bubble ${msg.role}`}>
                <span className="ai-chat-avatar">{msg.role === 'kid' ? '🧒' : '🤖'}</span>
                <span className="ai-chat-text">{msg.text}</span>
              </div>
            ))}
          </div>

          <div className="lesson-tip-box" style={{ marginTop: 20 }}>
            <strong>试试这些提问方式：</strong>
            <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
              <li>"XX 是什么？"</li>
              <li>"XX 和 YY 有什么区别？"</li>
              <li>"举个例子说明 XX"</li>
              <li>"为什么网页需要 XX？"</li>
            </ul>
          </div>
        </div>
      )}

      {tab === 'quiz' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🎯 测一测</h2>
          {!quizDone ? (
            <div className="quiz-wrap">
              <div className="quiz-progress">第 {quizIdx + 1} / {QUIZ.length} 题</div>
              <div className="quiz-question">{QUIZ[quizIdx].q}</div>
              <div className="quiz-options">
                {QUIZ[quizIdx].options.map((opt, i) => {
                  let cls = 'quiz-option'
                  if (quizAnswer !== null) {
                    if (i === QUIZ[quizIdx].correct) cls += ' correct reveal'
                    else if (i === quizAnswer.optIdx && !quizAnswer.correct) cls += ' wrong reveal'
                  }
                  return (
                    <button key={i} className={cls} onClick={() => handleQuizAnswer(i)}>{opt}</button>
                  )
                })}
              </div>
              {quizAnswer && (
                <div className="quiz-explain">
                  {quizAnswer.correct ? '✅ 正确！' : '❌ 再想想'} {QUIZ[quizIdx].explain}
                </div>
              )}
              {quizAnswer && (
                <button className="lesson-btn" style={{ background: '#f97316' }} onClick={nextQuestion}>
                  {quizIdx + 1 < QUIZ.length ? '下一题 →' : '查看结果'}
                </button>
              )}
            </div>
          ) : (
            <div className="quiz-done">
              <div className="quiz-done-score">{quizScore}/{QUIZ.length}</div>
              <div className="quiz-done-msg">
                {quizScore === 3 ? '🎉 满分！你对网页的理解已经很棒了！' : quizScore === 2 ? '👍 答对两题，继续加油！' : '💪 没关系，回去学一学再来挑战！'}
              </div>
              <p style={{ color: '#64748b', fontSize: 14 }}>第 8 课：做我的第一个网页 👉</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
