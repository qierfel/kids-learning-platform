import { useState, useEffect, useRef } from 'react'
import { GRADE_WORDS, EXAM_WORDS, IELTS_WORDS } from '../../data/englishWords'
import { sm2Update, newCard, getTodayPlan, estimatePlan, getStats } from '../../utils/srs'
import { ttsSpeak } from '../../utils/tts'
import { logActivity } from '../../utils/activityLogger'
import './SRSStudy.css'

const LEVEL_LABELS = {
  grade3: '三年级', grade4: '四年级', grade5: '五年级', grade6: '六年级',
  KET: 'KET (A2)', PET: 'PET (B1)', FCE: 'FCE (B2)',
  IELTS: 'IELTS 学术词汇',
}

function getWordPool(level) {
  if (level.startsWith('grade')) {
    const g = parseInt(level.replace('grade', ''))
    return GRADE_WORDS[g] || []
  }
  if (level === 'IELTS') return IELTS_WORDS
  return EXAM_WORDS[level] || []
}

// LocalStorage key for SRS progress
function lsKey(userId, level) { return `srs_${userId}_${level}` }
function lsGet(userId, level) { try { return JSON.parse(localStorage.getItem(lsKey(userId, level))) } catch { return null } }
function lsSet(userId, level, data) { localStorage.setItem(lsKey(userId, level), JSON.stringify(data)) }

export default function SRSStudy({ user, onBack }) {
  const [phase, setPhase] = useState('loading') // loading | home | setup | session | stats
  const [level, setLevel] = useState(null)
  const [plan, setPlan] = useState(null)       // { wordsPerDay, startDate }
  const [progress, setProgress] = useState({}) // word → card state
  const [todayPlan, setTodayPlan] = useState(null)

  // Load saved plan for selected level
  async function loadLevel(lvl) {
    setLevel(lvl)
    setPhase('loading')
    const saved = lsGet(user.uid, lvl)
    if (saved) {
      setPlan(saved.plan)
      setProgress(saved.progress || {})
      const pool = getWordPool(lvl)
      setTodayPlan(getTodayPlan(pool, saved.progress || {}, saved.plan.wordsPerDay))
      setPhase('home')
    } else {
      setPlan(null)
      setProgress({})
      setTodayPlan(null)
      setPhase('setup')
    }
  }

  // Save progress to localStorage
  async function saveProgress(newProgress) {
    lsSet(user.uid, level, { plan, progress: newProgress, updatedAt: Date.now() })
    setProgress(newProgress)
  }

  async function createPlan(wordsPerDay) {
    const newPlan = { wordsPerDay, startDate: Date.now() }
    lsSet(user.uid, level, { plan: newPlan, progress: {}, updatedAt: Date.now() })
    setPlan(newPlan)
    setProgress({})
    const pool = getWordPool(level)
    setTodayPlan(getTodayPlan(pool, {}, wordsPerDay))
    setPhase('home')
  }

  useEffect(() => { setPhase('levelSelect') }, [])

  if (phase === 'loading') return <div className="srs-loading">加载中...</div>

  if (phase === 'levelSelect') {
    return (
      <LevelSelect onSelect={loadLevel} onBack={onBack} />
    )
  }

  if (phase === 'setup') {
    const pool = getWordPool(level)
    return (
      <PlanSetup
        level={level}
        totalWords={pool.length}
        onConfirm={createPlan}
        onBack={() => setPhase('levelSelect')}
      />
    )
  }

  if (phase === 'home') {
    const pool = getWordPool(level)
    const stats = getStats(pool, progress)
    return (
      <Home
        level={level}
        plan={plan}
        todayPlan={todayPlan}
        stats={stats}
        onStartSession={() => setPhase('session')}
        onViewStats={() => setPhase('stats')}
        onChangePlan={() => setPhase('setup')}
        onBack={() => setPhase('levelSelect')}
      />
    )
  }

  if (phase === 'session') {
    return (
      <Session
        level={level}
        todayPlan={todayPlan}
        progress={progress}
        onFinish={async (newProgress) => {
          await saveProgress(newProgress)
          const pool = getWordPool(level)
          const wordCount = (todayPlan?.dueReviews?.length || 0) + (todayPlan?.todayNew?.length || 0)
          if (wordCount > 0) {
            logActivity(user.uid, { type: 'srs_review', subject: '英语', moduleKey: 'srs', count: wordCount })
          }
          setTodayPlan(getTodayPlan(pool, newProgress, plan.wordsPerDay))
          setPhase('home')
        }}
        onBack={() => setPhase('home')}
      />
    )
  }

  if (phase === 'stats') {
    const pool = getWordPool(level)
    const stats = getStats(pool, progress)
    return (
      <StatsView
        level={level}
        stats={stats}
        pool={pool}
        progress={progress}
        plan={plan}
        onBack={() => setPhase('home')}
      />
    )
  }
}

// ── 选择词库 ─────────────────────────────────────────────────
function LevelSelect({ onSelect, onBack }) {
  return (
    <div className="srs">
      <button className="srs-back" onClick={onBack}>← 英语</button>
      <h2 className="srs-title">记忆计划</h2>
      <p className="srs-subtitle">选择要背诵的词库，系统按记忆曲线安排每日任务</p>

      <div className="level-section">
        <div className="level-section-title">按年级（人教版 PEP）</div>
        <div className="level-grid">
          {['grade3','grade4','grade5','grade6'].map(l => (
            <button key={l} className="level-card" onClick={() => onSelect(l)}>
              <div className="level-icon">📚</div>
              <div className="level-name">{LEVEL_LABELS[l]}</div>
              <div className="level-count">{getWordPool(l).length} 个单词</div>
            </button>
          ))}
        </div>
      </div>

      <div className="level-section">
        <div className="level-section-title">剑桥英语考试</div>
        <div className="level-grid">
          {['KET','PET','FCE'].map(l => (
            <button key={l} className="level-card level-card-exam" onClick={() => onSelect(l)}>
              <div className="level-icon">🎓</div>
              <div className="level-name">{LEVEL_LABELS[l]}</div>
              <div className="level-count">{getWordPool(l).length} 个单词</div>
            </button>
          ))}
        </div>
      </div>

      <div className="level-section">
        <div className="level-section-title">雅思备考</div>
        <div className="level-grid">
          <button className="level-card level-card-exam" onClick={() => onSelect('IELTS')}>
            <div className="level-icon">🌏</div>
            <div className="level-name">{LEVEL_LABELS['IELTS']}</div>
            <div className="level-count">{getWordPool('IELTS').length} 个单词</div>
          </button>
        </div>
      </div>
    </div>
  )
}

// ── 制定计划 ─────────────────────────────────────────────────
function PlanSetup({ level, totalWords, onConfirm, onBack }) {
  const [perDay, setPerDay] = useState(10)
  const { learnDays, totalDays } = estimatePlan(totalWords, perDay)
  const finishDate = new Date(Date.now() + totalDays * 86400000)
  const finishStr = `${finishDate.getMonth() + 1}月${finishDate.getDate()}日`

  return (
    <div className="srs">
      <button className="srs-back" onClick={onBack}>← 返回</button>
      <h2 className="srs-title">制定计划</h2>
      <div className="plan-level-badge">{LEVEL_LABELS[level]}</div>
      <p className="plan-desc">共 <strong>{totalWords}</strong> 个单词，设定每天新词数量：</p>

      <div className="per-day-selector">
        {[5, 10, 15, 20, 30].map(n => (
          <button
            key={n}
            className={perDay === n ? 'per-day-btn active' : 'per-day-btn'}
            onClick={() => setPerDay(n)}
          >
            {n}词/天
          </button>
        ))}
      </div>

      <div className="plan-estimate">
        <div className="estimate-row">
          <span>预计学完时间</span>
          <strong>{learnDays} 天</strong>
        </div>
        <div className="estimate-row">
          <span>含复习完成时间</span>
          <strong>{totalDays} 天</strong>
        </div>
        <div className="estimate-row">
          <span>目标完成日期</span>
          <strong>{finishStr}</strong>
        </div>
        <div className="estimate-row">
          <span>每日学习时间约</span>
          <strong>{Math.ceil(perDay * 1.5)} 分钟</strong>
        </div>
      </div>

      <button className="plan-confirm-btn" onClick={() => onConfirm(perDay)}>
        开始计划！
      </button>
    </div>
  )
}

// ── 主页（今日任务）─────────────────────────────────────────
function Home({ level, plan, todayPlan, stats, onStartSession, onViewStats, onChangePlan, onBack }) {
  const total = todayPlan ? todayPlan.dueReviews.length + todayPlan.todayNew.length : 0
  const masteredPct = Math.round((stats.mastered / stats.total) * 100)

  return (
    <div className="srs">
      <div className="srs-topbar">
        <button className="srs-back" onClick={onBack}>← 词库</button>
        <button className="stats-link" onClick={onViewStats}>统计</button>
      </div>

      <div className="home-level">{LEVEL_LABELS[level]}</div>

      <div className="progress-ring-wrap">
        <svg className="progress-ring" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#e8edf2" strokeWidth="10"/>
          <circle
            cx="60" cy="60" r="50" fill="none" stroke="#7c3aed" strokeWidth="10"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={`${2 * Math.PI * 50 * (1 - masteredPct / 100)}`}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
          <text x="60" y="55" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1a1a2e">{masteredPct}%</text>
          <text x="60" y="72" textAnchor="middle" fontSize="11" fill="#888">已掌握</text>
        </svg>
      </div>

      <div className="stats-mini">
        <div className="stat-mini-item"><span className="stat-dot mastered" />已掌握 {stats.mastered}</div>
        <div className="stat-mini-item"><span className="stat-dot review" />复习中 {stats.reviewing}</div>
        <div className="stat-mini-item"><span className="stat-dot learning" />学习中 {stats.learning}</div>
        <div className="stat-mini-item"><span className="stat-dot unseen" />未学 {stats.unseen}</div>
      </div>

      <div className="today-card">
        <div className="today-title">今日任务</div>
        <div className="today-items">
          <div className="today-item">
            <span className="today-item-label">📖 新词</span>
            <span className="today-item-num">{todayPlan?.todayNew.length || 0}</span>
          </div>
          <div className="today-item">
            <span className="today-item-label">🔄 复习</span>
            <span className="today-item-num">{todayPlan?.dueReviews.length || 0}</span>
          </div>
          <div className="today-item">
            <span className="today-item-label">⏱ 约</span>
            <span className="today-item-num">{Math.ceil(total * 0.5)}分钟</span>
          </div>
        </div>
      </div>

      {total > 0 ? (
        <button className="start-session-btn" onClick={onStartSession}>
          开始今日学习 ({total} 个)
        </button>
      ) : (
        <div className="all-done">
          <div className="all-done-icon">🎉</div>
          <div>今天的任务完成了！明天再来</div>
        </div>
      )}

      <button className="change-plan-btn" onClick={onChangePlan}>调整计划</button>
    </div>
  )
}

// ── 学习会话 ─────────────────────────────────────────────────
const PHASE_LEARN = 'learn'   // 展示新词
const PHASE_QUIZ = 'quiz'     // 4选1认识
const PHASE_RECALL = 'recall' // 看中文拼英文（仅复习单词）
const PHASE_RATE = 'rate'     // 给出难度评级

function buildSessionQueue(todayPlan) {
  // 先复习到期词，再学新词
  // 每个新词：learn → quiz → rate
  // 每个复习词：quiz → rate
  const queue = []

  todayPlan.dueReviews.forEach(w => {
    queue.push({ type: 'review', word: w, stage: PHASE_QUIZ })
  })

  todayPlan.todayNew.forEach(w => {
    queue.push({ type: 'new', word: w, stage: PHASE_LEARN })
  })

  return queue
}

function buildOptions(word, pool) {
  const others = pool.filter(w => w.word !== word.word)
  const shuffled = [...others].sort(() => Math.random() - 0.5).slice(0, 3)
  return [...shuffled, word].sort(() => Math.random() - 0.5)
}

function Session({ level, todayPlan, progress, onFinish, onBack }) {
  const pool = getWordPool(level)
  const [queue] = useState(() => buildSessionQueue(todayPlan))
  const [idx, setIdx] = useState(0)
  const [stage, setStage] = useState(queue[0]?.stage || PHASE_LEARN)
  const [selected, setSelected] = useState(null)
  const [recallInput, setRecallInput] = useState('')
  const [recallResult, setRecallResult] = useState(null)
  const [newProgress, setNewProgress] = useState({ ...progress })
  const [learnTimer, setLearnTimer] = useState(3)
  const timerRef = useRef(null)
  const inputRef = useRef(null)

  function playWordAudio(word) {
    if (!word) return
    ttsSpeak(word).catch(() => {})
  }

  // 进入 LEARN 阶段时自动播放
  useEffect(() => {
    if (stage === PHASE_LEARN && queue[idx]) {
      playWordAudio(queue[idx].word.word)
    }
  }, [idx, stage])

  const current = queue[idx]
  const done = idx >= queue.length

  // Learn 阶段倒计时
  useEffect(() => {
    if (stage !== PHASE_LEARN) return
    setLearnTimer(3)
    timerRef.current = setInterval(() => {
      setLearnTimer(t => {
        if (t <= 1) { clearInterval(timerRef.current); setStage(PHASE_QUIZ); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [idx, stage])

  useEffect(() => {
    if (stage === PHASE_RECALL) inputRef.current?.focus()
  }, [stage])

  function handleQuizAnswer(opt) {
    if (selected) return
    setSelected(opt)
    setTimeout(() => {
      const correct = opt.word === current.word.word
      if (!correct) {
        // 答错 → rate immediately with fail
        applyRating(0)
      } else if (current.type === 'review') {
        // 复习词答对 → 进入 recall（拼写确认）
        setStage(PHASE_RECALL)
        setSelected(null)
      } else {
        // 新词答对 → rate
        setStage(PHASE_RATE)
        setSelected(null)
      }
    }, 800)
  }

  function handleRecallSubmit() {
    const ans = recallInput.trim().toLowerCase()
    const correct = ans === current.word.word.toLowerCase()
    setRecallResult(correct ? 'correct' : 'wrong')
    setTimeout(() => {
      applyRating(correct ? 2 : 1)
      setRecallInput('')
      setRecallResult(null)
    }, 1000)
  }

  function applyRating(quality) {
    const card = newProgress[current.word.word] || newCard()
    const updated = sm2Update(card, quality)
    const np = { ...newProgress, [current.word.word]: updated }
    setNewProgress(np)
    advance(np)
  }

  function advance(np) {
    const nextIdx = idx + 1
    if (nextIdx >= queue.length) {
      onFinish(np)
    } else {
      setIdx(nextIdx)
      setStage(queue[nextIdx].stage)
      setSelected(null)
    }
  }

  if (done) return null

  const progressPct = Math.round((idx / queue.length) * 100)
  const options = stage === PHASE_QUIZ ? buildOptions(current.word, pool) : []

  return (
    <div className="session">
      <div className="session-topbar">
        <button className="srs-back" onClick={onBack}>退出</button>
        <span className="session-counter">{idx + 1}/{queue.length}</span>
        <span className="session-tag">{current.type === 'new' ? '新词' : '复习'}</span>
      </div>
      <div className="session-progress"><div className="session-progress-bar" style={{ width: `${progressPct}%` }} /></div>

      {stage === PHASE_LEARN && (
        <div className="learn-card">
          <div className="learn-word-row">
            <span className="learn-word">{current.word.word}</span>
            <button className="word-audio-btn" onClick={() => playWordAudio(current.word.word)} title="播放发音">🔊</button>
          </div>
          <div className="learn-meaning">{current.word.meaning}</div>
          <div className="learn-example">{current.word.example}</div>
          <div className="learn-timer">{learnTimer > 0 ? `${learnTimer}秒后开始测试` : ''}</div>
          <button className="learn-skip" onClick={() => { clearInterval(timerRef.current); setStage(PHASE_QUIZ) }}>
            我记住了，直接测试
          </button>
        </div>
      )}

      {stage === PHASE_QUIZ && (
        <div className="quiz-card">
          <div className="quiz-prompt">这个单词的中文意思是？</div>
          <div className="quiz-word-row">
            <span className="quiz-word">{current.word.word}</span>
            <button className="word-audio-btn" onClick={() => playWordAudio(current.word.word)} title="播放发音">🔊</button>
          </div>
          <div className="quiz-options">
            {options.map((opt, i) => {
              let cls = 'quiz-opt'
              if (selected) {
                if (opt.word === current.word.word) cls += ' correct'
                else if (opt.word === selected.word) cls += ' wrong'
              }
              return (
                <button
                  key={i}
                  className={cls}
                  onPointerDown={e => { e.preventDefault(); handleQuizAnswer(opt) }}
                >
                  {opt.meaning}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {stage === PHASE_RECALL && (
        <div className="recall-card">
          <div className="recall-prompt">根据中文，拼写英文单词：</div>
          <div className="recall-meaning">{current.word.meaning}</div>
          <input
            ref={inputRef}
            className={`recall-input ${recallResult === 'correct' ? 'recall-correct' : recallResult === 'wrong' ? 'recall-wrong' : ''}`}
            value={recallInput}
            onChange={e => setRecallInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleRecallSubmit()}
            placeholder="输入英文单词..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
          {recallResult === 'wrong' && (
            <div className="recall-answer">正确拼写：<strong>{current.word.word}</strong></div>
          )}
          <button className="recall-submit" onClick={handleRecallSubmit}>确认</button>
        </div>
      )}

      {stage === PHASE_RATE && (
        <div className="rate-card">
          <div className="rate-word">{current.word.word}</div>
          <div className="rate-meaning">{current.word.meaning}</div>
          <div className="rate-example">{current.word.example}</div>
          <div className="rate-prompt">你觉得这个词：</div>
          <div className="rate-btns">
            <button className="rate-btn rate-fail" onClick={() => applyRating(0)}>
              <span>❌</span> 不会
            </button>
            <button className="rate-btn rate-hard" onClick={() => applyRating(1)}>
              <span>😅</span> 模糊
            </button>
            <button className="rate-btn rate-good" onClick={() => applyRating(2)}>
              <span>✓</span> 记得
            </button>
            <button className="rate-btn rate-easy" onClick={() => applyRating(3)}>
              <span>⭐</span> 很熟
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── 统计页 ───────────────────────────────────────────────────
function StatsView({ level, stats, pool, progress, plan, onBack }) {
  const now = Date.now()
  const dueToday = pool.filter(w => {
    const p = progress[w.word]
    return p && p.status !== 'mastered' && p.nextReview <= now
  }).length

  const dueTomorrow = pool.filter(w => {
    const p = progress[w.word]
    return p && p.status !== 'mastered' && p.nextReview > now && p.nextReview <= now + 86400000
  }).length

  return (
    <div className="srs">
      <button className="srs-back" onClick={onBack}>← 返回</button>
      <h2 className="srs-title">{LEVEL_LABELS[level]} · 统计</h2>

      <div className="stats-grid">
        <div className="stats-box"><div className="stats-num">{stats.total}</div><div className="stats-lbl">总单词</div></div>
        <div className="stats-box mastered-box"><div className="stats-num">{stats.mastered}</div><div className="stats-lbl">已掌握</div></div>
        <div className="stats-box review-box"><div className="stats-num">{stats.reviewing}</div><div className="stats-lbl">复习中</div></div>
        <div className="stats-box learning-box"><div className="stats-num">{stats.learning}</div><div className="stats-lbl">学习中</div></div>
        <div className="stats-box unseen-box"><div className="stats-num">{stats.unseen}</div><div className="stats-lbl">未接触</div></div>
        <div className="stats-box due-box"><div className="stats-num">{dueToday}</div><div className="stats-lbl">今日到期</div></div>
      </div>

      <div className="stats-forecast">
        <div className="forecast-title">复习预报</div>
        <div className="forecast-row"><span>明天到期</span><strong>{dueTomorrow} 个</strong></div>
        <div className="forecast-row"><span>每日新词计划</span><strong>{plan.wordsPerDay} 个/天</strong></div>
        <div className="forecast-row">
          <span>预计完成日期</span>
          <strong>{stats.unseen > 0
            ? `还需约 ${Math.ceil(stats.unseen / plan.wordsPerDay)} 天学完新词`
            : '新词已全部学完 🎉'
          }</strong>
        </div>
      </div>

      <div className="mastered-list-title">已掌握的单词</div>
      <div className="mastered-list">
        {pool.filter(w => progress[w.word]?.status === 'mastered').map(w => (
          <span key={w.word} className="mastered-tag">{w.word}</span>
        ))}
        {stats.mastered === 0 && <span className="no-mastered">继续学习，掌握后会显示在这里</span>}
      </div>
    </div>
  )
}
