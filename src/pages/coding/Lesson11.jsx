import { useState } from 'react'
import './Lesson.css'
import PromptCompareLab from './PromptCompareLab'

const PROMPT_PAIRS = [
  {
    bad: '帮我做网页',
    good: '帮我做一个个人介绍网页，包含我的名字、3个爱好和1张图片，颜色用蓝色系，移动端也要好看。',
    reason: '好的提问包含：想做什么、具体内容、风格要求，AI才能准确帮你。',
  },
  {
    bad: '这段代码有问题',
    good: '这段React代码点击按钮后没有反应，报错是"Cannot read property of undefined"，请帮我找出哪里写错了，并解释原因。',
    reason: '调试问题要说清：代码在哪、报什么错、想要什么结果，AI才能真正帮你找到问题。',
  },
  {
    bad: '让按钮好看一点',
    good: '我的按钮现在是白底黑字，感觉太普通。请帮我改成圆角、蓝色背景、白色文字，鼠标悬停时变深一点。',
    reason: '样式修改要说现在是什么样、想要什么效果——颜色、大小、圆角……越具体越好。',
  },
  {
    bad: '写个游戏',
    good: '帮我用HTML和JavaScript做一个简单的猜数字游戏：随机生成1-100的数字，玩家输入猜测，提示"太大了"或"太小了"，猜对了显示祝贺信息。',
    reason: '想要功能，先描述清楚游戏的完整规则：目标、输入、输出、结束条件。',
  },
]

const TYPES = ['网页', '小游戏', '小工具', '动画效果']
const FEATURES = ['漂亮的样式', '按钮交互', '图片展示', '文字效果', '颜色主题', '响应移动端']
const STYLES = ['清新简洁', '科技酷炫', '可爱卡通', '优雅精致']

const QUIZ = [
  {
    q: '下面哪种提问方式最容易让AI给出有用的回答？',
    options: ['"给我写个网页"', '"帮我做一个网页，主题是自我介绍，包含名字和3个爱好，用蓝色风格"', '"网页怎么做"', '"代码写一下"'],
    correct: 1,
    explain: '提问越具体——说清楚想做什么、包含什么、什么风格——AI回答越准确、越有用。',
  },
  {
    q: '当你遇到一个复杂任务时，最好的策略是？',
    options: ['让AI一次性帮你做完所有事', '把大任务拆成小步骤，一步一步请AI帮忙', '放弃，太难了', '照抄别人的代码'],
    correct: 1,
    explain: '把复杂任务拆成小步骤，每次只问一个具体的问题，AI的回答会更精准，你也更容易理解。',
  },
  {
    q: '发现AI的回答不是你想要的，应该怎么做？',
    options: ['换一个AI', '继续追问、补充说明、告诉AI哪里不对', '直接放弃', '把回答全部复制粘贴用'],
    correct: 1,
    explain: '和AI对话是一个"来回修正"的过程。告诉AI哪里不对、你期望的效果是什么，它就能不断调整。',
  },
]

export default function Lesson11({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [pairAnswers, setPairAnswers] = useState({})
  const [pairChecked, setPairChecked] = useState(false)
  const [genType, setGenType] = useState('')
  const [genFeatures, setGenFeatures] = useState([])
  const [genStyle, setGenStyle] = useState('')
  const [genName, setGenName] = useState('')
  const [generated, setGenerated] = useState(false)
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  function selectAnswer(idx, choice) {
    if (pairChecked) return
    setPairAnswers(prev => ({ ...prev, [idx]: choice }))
  }

  function checkPairs() {
    setPairChecked(true)
  }

  function toggleFeature(f) {
    setGenFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])
  }

  function generatePrompt() {
    if (!genType || !genStyle) return
    setGenerated(true)
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

  const pairScore = pairChecked ? Object.values(pairAnswers).filter(v => v === 'good').length : 0

  const promptText = generated ? `请帮我做一个${genStyle}风格的${genType}。
${genName ? `作品名称：${genName}` : ''}
需要包含以下功能：${genFeatures.length ? genFeatures.join('、') : '基础功能'}。

请分步骤告诉我怎么做：
第1步：搭建基本结构
第2步：添加${genFeatures[0] || '主要功能'}
第3步：优化${genStyle}风格的样式
第4步：测试和调整

遇到问题我会继续追问，请保持耐心详细地解释。` : ''

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回课程列表</button>

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#ccfbf1', color: '#0f766e' }}>第 11 课</span>
        <span className="lesson-hero-emoji">🤝</span>
        <h1 className="lesson-hero-title">请AI帮我一起做</h1>
        <p className="lesson-hero-sub">Collaborate with AI</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>知道怎样向AI描述清楚你想做什么</li>
          <li>学会把大任务拆成小步骤</li>
          <li>获得自己的第一套AI提问模板</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {['learn', 'do', 'ai', 'quiz', 'work'].map(t => (
          <button key={t} className={`lesson-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}
            style={tab === t ? { borderBottomColor: '#14b8a6', color: '#14b8a6' } : {}}>
            {t === 'learn' ? '学一学' : t === 'do' ? '做一做' : t === 'ai' ? '用AI帮忙' : t === 'quiz' ? '测一测' : '本课作品'}
          </button>
        ))}
      </div>

      {tab === 'learn' && (
        <div className="lesson-content">
          <div className="lesson-section">
            <h2 className="lesson-section-title">🤝 AI是你的编程搭档</h2>
            <p className="lesson-text">
              AI工具（比如 ChatGPT、Claude、Copilot）可以帮你写代码、解释错误、提供思路。
              但前提是：<strong>你得告诉它你想要什么。</strong>
            </p>
            <div className="lesson-tip-box">
              💡 和AI合作就像和一个聪明但不了解你的朋友合作——你描述得越清楚，他帮你做得越准。
            </div>
          </div>
          <div className="lesson-section">
            <h2 className="lesson-section-title">✅ 好提问 vs ❌ 坏提问</h2>
            <div className="l11-compare-wrap">
              <div className="l11-compare-col bad">
                <div className="l11-compare-head">❌ 坏提问</div>
                {['帮我做网页', '修复代码', '写个游戏', '加个按钮'].map(t => (
                  <div key={t} className="l11-compare-item">{t}</div>
                ))}
                <div className="l11-compare-reason">太模糊，AI不知道你想要什么</div>
              </div>
              <div className="l11-compare-col good">
                <div className="l11-compare-head">✅ 好提问</div>
                {[
                  '做蓝色风格的自我介绍网页，含名字和爱好',
                  '这段代码第5行报错，错误是"undefined"，帮我找原因',
                  '做猜数字游戏，1-100，提示大小，猜对显示祝贺',
                  '按钮加圆角、蓝底白字，悬停变深',
                ].map(t => (
                  <div key={t} className="l11-compare-item">{t}</div>
                ))}
                <div className="l11-compare-reason">具体、清楚，AI能立刻帮你</div>
              </div>
            </div>
          </div>
          <div className="lesson-section">
            <h2 className="lesson-section-title">🧩 好提问的4个要素</h2>
            <div className="lesson-step-list">
              {[
                { step: '1', title: '说清楚想做什么', desc: '是网页？游戏？工具？别让AI去猜。' },
                { step: '2', title: '说清楚要包含什么', desc: '有哪些具体的内容、功能、元素。' },
                { step: '3', title: '说清楚风格和限制', desc: '颜色、字体、大小、使用什么技术。' },
                { step: '4', title: '让AI一步一步来', desc: '不要一次让AI做完所有事，分步骤更容易检查和调整。' },
              ].map(s => (
                <div key={s.step} className="lesson-step-item">
                  <span className="lesson-step-num" style={{ background: '#14b8a6' }}>{s.step}</span>
                  <div><strong>{s.title}</strong><p>{s.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'do' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🎮 第一关：好提问 vs 坏提问</h2>
          <p className="lesson-text">下面每组有两个提问，选出你认为更好的那个：</p>

          <div className="l11-pairs">
            {PROMPT_PAIRS.map((pair, idx) => (
              <div key={idx} className="l11-pair-card">
                <div className="l11-pair-num">第 {idx + 1} 组</div>
                <div className="l11-pair-options">
                  {['bad', 'good'].map(type => (
                    <button
                      key={type}
                      className={`l11-pair-btn${pairAnswers[idx] === type ? ' selected' : ''}${pairChecked ? (type === 'good' ? ' correct' : ' wrong') : ''}`}
                      onClick={() => selectAnswer(idx, type)}
                    >
                      <span className="l11-pair-prefix">{type === 'bad' ? 'A' : 'B'}</span>
                      {type === 'bad' ? pair.bad : pair.good}
                      {pairChecked && type === 'good' && <span className="l11-pair-check">✅</span>}
                    </button>
                  ))}
                </div>
                {pairChecked && (
                  <div className="l11-pair-reason">
                    💡 {pair.reason}
                  </div>
                )}
              </div>
            ))}
          </div>

          {!pairChecked && (
            <button
              className="lesson-btn"
              style={{ background: '#14b8a6', opacity: Object.keys(pairAnswers).length < PROMPT_PAIRS.length ? 0.4 : 1 }}
              disabled={Object.keys(pairAnswers).length < PROMPT_PAIRS.length}
              onClick={checkPairs}
            >
              检查答案 ({Object.keys(pairAnswers).length}/{PROMPT_PAIRS.length})
            </button>
          )}

          {pairChecked && (
            <div className="lesson-result-box">
              <div className="lesson-result-score">
                {pairScore >= 3 ? '🎉' : '💪'} 答对 {pairScore}/{PROMPT_PAIRS.length} 组
              </div>
              <p>{pairScore >= 3 ? '太棒了！你已经掌握好提问的感觉！' : '继续练习，感受"具体描述"的威力！'}</p>
            </div>
          )}

          {pairChecked && (
            <div style={{ marginTop: 24 }}>
              <h2 className="lesson-section-title">🤖 让真 AI 来回答这两种提问</h2>
              <p className="lesson-text">理论说够了，现在让 AI 真的回答一下"坏提问"和"好提问"，看看回答差多少：</p>
              <PromptCompareLab
                prompts={[
                  { id: 'bad', label: '❌ 坏提问', text: PROMPT_PAIRS[0].bad, tone: 'weak' },
                  { id: 'good', label: '✅ 好提问', text: PROMPT_PAIRS[0].good, tone: 'strong' },
                ]}
                subject="好提问示范"
                accent="#14b8a6"
                hint="坏提问 AI 只能给套话；好提问 AI 才能给真正能用的步骤和代码！"
                intro="点 ▶ 让 AI 分别回答这两个提问，对比一下："
                allowCustom
                customLabel="✏️ 你自己写一个提问试试"
                customPlaceholder="试试加上：做什么 + 包含什么 + 风格要求"
              />
            </div>
          )}

          <div style={{ marginTop: 32 }}>
            <h2 className="lesson-section-title">🛠️ 第二关：生成我的提问模板</h2>
            <p className="lesson-text">回答几个问题，生成属于你的AI提问模板！</p>

            <div className="l11-gen-form">
              <div className="l11-gen-field">
                <label className="l11-gen-label">我想做什么类型？</label>
                <div className="l11-gen-options">
                  {TYPES.map(t => (
                    <button key={t} className={`l11-gen-btn${genType === t ? ' selected' : ''}`} onClick={() => setGenType(t)}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="l11-gen-field">
                <label className="l11-gen-label">我想要的功能（可多选）：</label>
                <div className="l11-gen-options">
                  {FEATURES.map(f => (
                    <button key={f} className={`l11-gen-btn${genFeatures.includes(f) ? ' selected' : ''}`} onClick={() => toggleFeature(f)}>{f}</button>
                  ))}
                </div>
              </div>
              <div className="l11-gen-field">
                <label className="l11-gen-label">我想要的风格：</label>
                <div className="l11-gen-options">
                  {STYLES.map(s => (
                    <button key={s} className={`l11-gen-btn${genStyle === s ? ' selected' : ''}`} onClick={() => setGenStyle(s)}>{s}</button>
                  ))}
                </div>
              </div>
              <div className="l11-gen-field">
                <label className="l11-gen-label">作品名称（可选）：</label>
                <input className="l8-input" value={genName} onChange={e => setGenName(e.target.value)} placeholder="比如：我的自我介绍网页" maxLength={20} />
              </div>
              <button
                className="lesson-btn"
                style={{ background: genType && genStyle ? '#14b8a6' : '#e2e8f0', color: genType && genStyle ? '#fff' : '#94a3b8' }}
                disabled={!genType || !genStyle}
                onClick={generatePrompt}
              >
                🚀 生成我的提问模板
              </button>
            </div>

            {generated && (
              <div className="l11-template-card">
                <div className="l11-template-header">📋 你的AI提问模板</div>
                <pre className="l11-template-body">{promptText}</pre>
                <div className="lesson-tip-box" style={{ marginTop: 12 }}>
                  🎉 保存这个模板！下次找AI帮忙时，用这个格式来提问。你可以把它复制下来，发给AI试试！
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'ai' && (
        <div className="lesson-content">
          <h2 className="lesson-section-title">🤖 和AI一起工作的节奏</h2>
          <p className="lesson-text">好的AI协作是一个"来回"的过程，不是一次性让AI做完所有事。</p>

          <div className="ai-chat-demo">
            {[
              { role: 'kid', text: '我想做一个自我介绍网页，先帮我规划一下结构，不用写代码。' },
              { role: 'ai', text: '好的！规划如下：\n\n第1部分：顶部导航\n- 左边放网站名\n- 右边放"联系我"按钮\n\n第2部分：主体介绍\n- 大头像/图片\n- 你的名字（大字）\n- 一句话介绍（副标题）\n\n第3部分：爱好卡片\n- 3-4个小卡片展示你的爱好\n\n第4部分：底部\n- 联系方式\n- 简单的版权信息\n\n这个结构满意吗？可以开始写第1部分的代码了吗？' },
              { role: 'kid', text: '很好！先帮我做顶部导航，蓝色背景，白色文字。' },
              { role: 'ai', text: '完成！顶部导航代码如下：\n\n<nav style="background:#0ea5e9; padding:12px 24px; display:flex; justify-content:space-between; align-items:center;">\n  <span style="color:white; font-weight:bold; font-size:18px">小明的网页</span>\n  <button style="background:white; color:#0ea5e9; border:none; padding:6px 16px; border-radius:20px;">联系我</button>\n</nav>\n\n下一步做主体介绍吗？' },
            ].map((msg, i) => (
              <div key={i} className={`ai-chat-bubble ${msg.role}`}>
                <span className="ai-chat-avatar">{msg.role === 'kid' ? '🧒' : '🤖'}</span>
                <span className="ai-chat-text" style={{ whiteSpace: 'pre-line', fontSize: 13 }}>{msg.text}</span>
              </div>
            ))}
          </div>

          <div className="lesson-tip-box" style={{ marginTop: 16 }}>
            <strong>学会这3句话，和AI沟通会顺畅很多：</strong>
            <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
              <li>"先帮我规划，不用写代码"——先看整体思路</li>
              <li>"这里不对，我想要的是……"——修正方向</li>
              <li>"解释一下这行代码是做什么的"——学习理解</li>
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
                  return <button key={i} className={cls} onClick={() => handleQuizAnswer(i)}>{opt}</button>
                })}
              </div>
              {quizAnswer && <div className="quiz-explain">{quizAnswer.correct ? '✅ 正确！' : '❌ 再想想'} {QUIZ[quizIdx].explain}</div>}
              {quizAnswer && (
                <button className="lesson-btn" style={{ background: '#14b8a6' }} onClick={nextQuestion}>
                  {quizIdx + 1 < QUIZ.length ? '下一题 →' : '查看结果'}
                </button>
              )}
            </div>
          ) : (
            <div className="quiz-done">
              <div className="quiz-done-score">{quizScore}/{QUIZ.length}</div>
              <div className="quiz-done-msg">
                {quizScore === 3 ? '🎉 满分！你已经掌握和AI合作的技巧！' : quizScore === 2 ? '👍 答对两题！' : '💪 没关系，回去学一学再来挑战！'}
              </div>
              <p style={{ color: '#64748b', fontSize: 14 }}>第 12 课：完成我的小作品 →</p>
            </div>
          )}
        </div>
      )}
      {tab === 'work' && (
        <div className="lesson-content">
          <div className="lesson-work-card">
            <div className="lesson-work-title">🏅 本课作品：我的 AI 提问卡</div>
            {generated ? (
              <div className="l11-template-card">
                <div className="l11-template-header">📋 {genName || genType + ' · ' + genStyle}</div>
                <pre className="l11-template-body">{promptText}</pre>
              </div>
            ) : (
              <div className="lesson-tip-box">
                💡 先去"做一做"生成你的提问模板，再来这里查看你的 AI 提问卡！
              </div>
            )}
            <div className="lesson-work-recap">
              <div className="lesson-work-recap-title">✅ 本课学到了</div>
              <ul>
                <li>好提问包含：做什么、有什么功能、什么风格</li>
                <li>把大任务拆成小步骤，一步一步问 AI</li>
                <li>AI 给错了不要放弃，告诉它哪里不对继续修正</li>
              </ul>
            </div>
          </div>
          <div className="lesson-next-preview">
            <div className="lesson-next-title">👉 第 12 课预告：完成我的小作品</div>
            <p>最后一课！你将把 7–11 课学到的所有技能融合在一起，做出一个完整的小作品，并学会向别人展示它！</p>
          </div>
        </div>
      )}
    </div>
  )
}
