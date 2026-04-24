import { useState, useCallback } from 'react'
import './Lesson.css'

const GRID_SIZE = 10
const COLORS = ['#1a1a2e', '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#ffffff']
const COLOR_NAMES = ['黑色', '红色', '蓝色', '绿色', '黄色', '白色（擦除）']

const DEFAULT_GRID = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('#ffffff'))

function detectShape(grid) {
  let filledCount = 0
  const filledCells = []
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] !== '#ffffff') {
        filledCount++
        filledCells.push([r, c])
      }
    }
  }
  if (filledCount < 3) return null
  const rows = filledCells.map(([r]) => r)
  const cols = filledCells.map(([, c]) => c)
  const minR = Math.min(...rows)
  const maxR = Math.max(...rows)
  const minC = Math.min(...cols)
  const maxC = Math.max(...cols)
  const height = maxR - minR + 1
  const width = maxC - minC + 1
  const ratio = height / width

  if (filledCount > 25) return { shape: '大图案', emoji: '🎨', desc: '画了很多格子，像一幅画！' }
  if (ratio > 2.5) return { shape: '竖线', emoji: '|', desc: '高而窄的形状，像一条竖线！' }
  if (ratio < 0.4) return { shape: '横线', emoji: '—', desc: '宽而矮的形状，像一条横线！' }
  if (Math.abs(ratio - 1) < 0.3 && filledCount > 6) return { shape: '正方形区域', emoji: '⬛', desc: '宽高接近，像一个方块！' }
  if (filledCount < 8) return { shape: '小点', emoji: '•', desc: '只有几个像素，像一个小点！' }
  return { shape: '不规则图案', emoji: '🖼️', desc: '形状很独特，难以分类！' }
}

const QUIZ = [
  {
    q: '图像在计算机中是如何存储的？',
    options: ['作为一幅画存储', '作为像素网格，每个像素有颜色数字', '作为声音波形', '作为文字描述'],
    correct: 1,
    explain: '图像由一格格的像素组成，每个像素用数字表示颜色（如RGB：红0-255，绿0-255，蓝0-255）。',
  },
  {
    q: 'AI识别图像，最核心的挑战是什么？',
    options: ['图片文件太大', '同一物体在不同角度、光线下像素完全不同', '颜色太多', '需要很多电'],
    correct: 1,
    explain: '同一只猫，侧面、正面、白天、黑夜拍出来像素完全不同。AI需要学会找到"猫"的本质特征，而不只是特定的像素排列。',
  },
  {
    q: '下面哪个是计算机视觉的应用？',
    options: ['音乐推荐', '车牌自动识别', '语音翻译', '文章生成'],
    correct: 1,
    explain: '车牌识别就是典型的计算机视觉应用——AI"看"摄像头拍到的图像，识别出车牌上的文字和数字。',
  },
]

export default function Lesson5({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [grid, setGrid] = useState(DEFAULT_GRID)
  const [selectedColor, setSelectedColor] = useState('#1a1a2e')
  const [isDrawing, setIsDrawing] = useState(false)
  const [detection, setDetection] = useState(null)
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  const paintCell = useCallback((r, c) => {
    setGrid(prev => {
      const next = prev.map(row => [...row])
      next[r][c] = selectedColor
      return next
    })
    setDetection(null)
  }, [selectedColor])

  function clearGrid() {
    setGrid(DEFAULT_GRID)
    setDetection(null)
  }

  function analyze() {
    const result = detectShape(grid)
    setDetection(result)
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

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回课程列表</button>

      <div className="lesson-hero" style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)' }}>
        <span className="lesson-hero-badge" style={{ background: '#fce7f3', color: '#9d174d' }}>第 5 课</span>
        <span className="lesson-hero-emoji">👁️</span>
        <h1 className="lesson-hero-title">AI 的眼睛</h1>
        <p className="lesson-hero-sub">Computer Vision</p>
      </div>

      <div className="lesson-objectives">
        <div className="lesson-objectives-title">本课目标</div>
        <ul className="lesson-objectives-list">
          <li>理解图像在计算机中如何用数字表示</li>
          <li>了解图像识别的基本原理</li>
          <li>动手体验像素画板</li>
        </ul>
      </div>

      <div className="lesson-tabs">
        {[['learn', '📖 学一学'], ['draw', '🎨 像素画板'], ['quiz', '✅ 测一测']].map(([id, label]) => (
          <button key={id} className={`lesson-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      {/* ── 学一学 ── */}
      {tab === 'learn' && (
        <>
          <div className="lesson-section">
            <div className="lesson-section-title">📷 图像 = 数字的网格</div>
            <div className="lesson-card">
              <p className="lesson-text">
                计算机看图片，其实看的是<strong>一格格的像素（Pixel）</strong>。每个像素有三个数字表示颜色——红、绿、蓝各0到255。
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '3px', margin: '12px auto', width: 'fit-content' }}>
                {[
                  '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6',
                  '#8b5cf6', '#ec4899', '#1a1a2e', '#fff', '#94a3b8',
                  '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6',
                  '#8b5cf6', '#ec4899', '#1a1a2e', '#fff', '#94a3b8',
                  '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6',
                ].map((c, i) => (
                  <div key={i} style={{ width: '28px', height: '28px', background: c, borderRadius: '4px', border: '1px solid rgba(0,0,0,0.1)' }} />
                ))}
              </div>
              <div style={{ textAlign: 'center', fontSize: '12px', color: '#888', margin: '4px 0 10px' }}>
                ↑ 每个小格就是一个像素
              </div>
              <div className="lesson-highlight">
                📸 一张1000×1000的照片 = 100万个像素 = 300万个数字（RGB三通道）
              </div>
            </div>
          </div>

          <div className="lesson-section">
            <div className="lesson-section-title">🧠 AI 如何识别图像？</div>
            <div className="lesson-card">
              {[
                { step: '1', title: '输入像素', desc: 'AI把图片变成数字网格，每个像素 = 三个数字', emoji: '🔢' },
                { step: '2', title: '提取特征', desc: '找边缘、形状、纹理等基本特征，就像人眼先看轮廓', emoji: '🔍' },
                { step: '3', title: '组合理解', desc: '把小特征组合成大特征：边缘→形状→眼睛→脸', emoji: '🧩' },
                { step: '4', title: '判断结果', desc: '综合所有特征，给出识别结论（如：这是猫）', emoji: '🎯' },
              ].map(s => (
                <div key={s.step} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>{s.emoji}</span>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e', marginBottom: '2px' }}>{s.title}</div>
                    <div style={{ fontSize: '13px', color: '#555', lineHeight: '1.5' }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-section">
            <div className="lesson-section-title">🌍 计算机视觉的应用</div>
            <div className="example-grid">
              {[
                { emoji: '🚗', label: '车牌识别', desc: '高速公路自动收费' },
                { emoji: '👤', label: '人脸识别', desc: '解锁手机/安防' },
                { emoji: '🏥', label: '医疗诊断', desc: 'X光片AI分析' },
                { emoji: '🛒', label: '自动结账', desc: '扫描商品价格' },
                { emoji: '🌾', label: '农业检测', desc: '识别农作物病虫害' },
                { emoji: '🎮', label: '体感游戏', desc: '识别玩家动作' },
              ].map(item => (
                <div key={item.label} className="example-item">
                  <div className="example-item-emoji">{item.emoji}</div>
                  <div className="example-item-label">{item.label}</div>
                  <div className="example-item-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lesson-section">
            <button className="quiz-next-btn" style={{ background: '#ec4899' }} onClick={() => setTab('draw')}>
              继续：去像素画板 →
            </button>
          </div>
        </>
      )}

      {/* ── 像素画板 ── */}
      {tab === 'draw' && (
        <div className="lesson-interactive">
          <div className="interactive-title">🎨 像素画板 + AI 形状识别</div>
          <div className="interactive-card">
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '12px', lineHeight: '1.6' }}>
              用像素格子画一个形状，然后让AI来识别！每个格子就是一个像素，就像真实图片一样。
            </p>

            {/* 颜色选择 */}
            <div className="pixel-controls">
              {COLORS.map((c, i) => (
                <button
                  key={c}
                  className={`color-btn ${selectedColor === c ? 'selected' : ''}`}
                  style={{ background: c, boxShadow: c === '#ffffff' ? 'inset 0 0 0 1px #ddd' : undefined }}
                  onClick={() => setSelectedColor(c)}
                  title={COLOR_NAMES[i]}
                />
              ))}
              <button className="pixel-clear-btn" onClick={clearGrid}>清空</button>
            </div>

            {/* 像素格子 */}
            <div
              className="pixel-canvas"
              style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
              onMouseLeave={() => setIsDrawing(false)}
            >
              {grid.map((row, r) =>
                row.map((cellColor, c) => (
                  <div
                    key={`${r}-${c}`}
                    className="pixel-cell"
                    style={{ background: cellColor }}
                    onMouseDown={() => { setIsDrawing(true); paintCell(r, c) }}
                    onMouseEnter={() => { if (isDrawing) paintCell(r, c) }}
                    onMouseUp={() => setIsDrawing(false)}
                    onTouchStart={e => { e.preventDefault(); setIsDrawing(true); paintCell(r, c) }}
                    onTouchMove={e => {
                      e.preventDefault()
                      const touch = e.touches[0]
                      const el = document.elementFromPoint(touch.clientX, touch.clientY)
                      if (el && el.dataset.r && el.dataset.c) paintCell(+el.dataset.r, +el.dataset.c)
                    }}
                    data-r={r}
                    data-c={c}
                  />
                ))
              )}
            </div>

            <button
              onClick={analyze}
              style={{ width: '100%', padding: '12px', background: '#ec4899', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: '12px' }}
            >
              👁️ AI 识别我的图案！
            </button>

            {detection && (
              <div style={{ marginTop: '12px', padding: '16px', background: '#fdf2f8', borderRadius: '14px', border: '2px solid #f9a8d4', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '6px' }}>{detection.emoji}</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#9d174d', marginBottom: '4px' }}>
                  AI 识别为：{detection.shape}
                </div>
                <div style={{ fontSize: '13px', color: '#666' }}>{detection.desc}</div>
              </div>
            )}

            <div style={{ marginTop: '12px', padding: '10px', background: '#f8f9fc', borderRadius: '10px', fontSize: '12px', color: '#666', lineHeight: '1.6', border: '1px solid #e8edf2' }}>
              💡 真实的AI用数以百万计的像素和复杂的神经网络来识别图像。这里我们用简单的形状特征规则来体验这个过程！
            </div>
          </div>
        </div>
      )}

      {/* ── 测一测 ── */}
      {tab === 'quiz' && (
        <div className="lesson-interactive">
          <div className="interactive-title">✅ 知识测验</div>
          <div className="interactive-card">
            {!quizDone ? (
              <>
                <div className="quiz-progress">
                  <span className="quiz-progress-text">{quizIdx + 1} / {QUIZ.length}</span>
                  <div className="quiz-progress-bar">
                    <div className="quiz-progress-fill" style={{ width: `${((quizIdx + 1) / QUIZ.length) * 100}%`, background: '#ec4899' }} />
                  </div>
                </div>
                <div className="quiz-question">{QUIZ[quizIdx].q}</div>
                <div className="quiz-options">
                  {QUIZ[quizIdx].options.map((opt, i) => {
                    let cls = 'quiz-option'
                    if (quizAnswer !== null) {
                      if (i === QUIZ[quizIdx].correct) cls += ' reveal'
                      else if (i === quizAnswer.optIdx && !quizAnswer.correct) cls += ' wrong'
                    }
                    return <button key={i} className={cls} onClick={() => handleQuizAnswer(i)}>{opt}</button>
                  })}
                </div>
                {quizAnswer !== null && (
                  <>
                    <div className={`quiz-feedback ${quizAnswer.correct ? 'correct' : 'wrong'}`}>
                      {quizAnswer.correct ? '✅ 正确！' : '❌ 再想想！'} {QUIZ[quizIdx].explain}
                    </div>
                    <button className="quiz-next-btn" style={{ background: '#ec4899' }} onClick={nextQuestion}>
                      {quizIdx + 1 < QUIZ.length ? '下一题 →' : '查看结果 →'}
                    </button>
                  </>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '52px', marginBottom: '12px' }}>{quizScore === QUIZ.length ? '🏆' : '🌟'}</div>
                <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>得了 {quizScore} / {QUIZ.length} 分！</div>
                <button className="quiz-next-btn" style={{ background: '#ec4899' }} onClick={() => { setQuizIdx(0); setQuizAnswer(null); setQuizScore(0); setQuizDone(false) }}>
                  重新测验
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
