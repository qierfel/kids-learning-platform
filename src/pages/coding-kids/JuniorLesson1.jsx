import { useMemo, useState } from 'react'
import './JuniorLesson.css'

const COMMANDS = [
  { id: 'right', label: '向右', icon: '➡️' },
  { id: 'down', label: '向下', icon: '⬇️' },
]

export default function JuniorLesson1({ onBack }) {
  const [tab, setTab] = useState('learn')
  const [queue, setQueue] = useState([])

  const robot = useMemo(() => {
    let x = 0
    let y = 0
    queue.forEach((cmd) => {
      if (cmd === 'right') x = Math.min(3, x + 1)
      if (cmd === 'down') y = Math.min(3, y + 1)
    })
    return { x, y, success: x === 3 && y === 3 }
  }, [queue])

  return (
    <div className="junior-lesson-page">
      <button className="junior-back" onClick={onBack}>← 返回 7-10 岁课程</button>
      <div className="junior-hero" style={{ background: 'linear-gradient(135deg, #dcfce7, #dbeafe)' }}>
        <div className="junior-badge" style={{ background: '#bbf7d0', color: '#166534' }}>第 1 课</div>
        <div className="junior-hero-row">
          <div className="junior-emoji-wrap"><div className="junior-emoji">🤖</div></div>
          <div>
            <h1 className="junior-title">机器人听指令</h1>
            <p className="junior-sub">先学会“按顺序做事”</p>
          </div>
        </div>
      </div>

      <div className="junior-goals">
        <div className="junior-goal">认识“先做什么，再做什么”</div>
        <div className="junior-goal">让机器人走到星星那里</div>
      </div>

      <div className="junior-tabs">
        {['learn', 'do', 'ai', 'work'].map((key) => (
          <button
            key={key}
            className="junior-tab"
            onClick={() => setTab(key)}
            style={tab === key ? { borderColor: '#22c55e', color: '#166534' } : {}}
          >
            {key === 'learn' ? '看一看' : key === 'do' ? '玩一玩' : key === 'ai' ? '问问 AI' : '我学会了'}
          </button>
        ))}
      </div>

      <div className="junior-content">
        {tab === 'learn' && (
          <>
            <div className="junior-card">
              <h2>机器人为什么要听指令？</h2>
              <p>机器人不会猜，它只会一条一条照着做。你给它什么顺序，它就走什么顺序。</p>
              <div className="junior-pill-row">
                <div className="junior-pill">先</div>
                <div className="junior-pill">再</div>
                <div className="junior-pill">最后</div>
              </div>
            </div>
            <div className="junior-card">
              <h3>今天的小秘密</h3>
              <p>编程的第一步，就是把动作排成队。像排队坐滑梯一样，一个接一个。</p>
            </div>
          </>
        )}

        {tab === 'do' && (
          <div className="junior-card">
            <h2>把机器人送到星星那里</h2>
            <p>你只需要用两种指令：向右、向下。</p>
            <div className="command-row">
              {COMMANDS.map((cmd) => (
                <button key={cmd.id} className="command-chip" onClick={() => setQueue((prev) => [...prev, cmd.id])}>
                  {cmd.icon} {cmd.label}
                </button>
              ))}
              <button className="command-chip" onClick={() => setQueue([])}>🧹 清空</button>
            </div>
            <div className="command-list">
              {queue.length ? queue.map((cmd, i) => `${i + 1}.${cmd === 'right' ? '➡️' : '⬇️'}`).join('  ') : '先点几条指令吧'}
            </div>
            <div className="robot-board">
              {Array.from({ length: 16 }).map((_, idx) => {
                const x = idx % 4
                const y = Math.floor(idx / 4)
                const isRobot = robot.x === x && robot.y === y
                const isGoal = x === 3 && y === 3
                return (
                  <div key={idx} className={`robot-cell${isGoal ? ' goal' : ''}`}>
                    {isRobot ? '🤖' : isGoal ? '⭐' : '·'}
                  </div>
                )
              })}
            </div>
            <div className="junior-result">
              <div className="junior-result-title">{robot.success ? '太棒啦，到了！' : '还没到，继续试试'}</div>
              <div className="junior-result-copy">{robot.success ? '你刚刚已经在“编排步骤”了，这就是编程最开始的感觉。' : '想一想：是不是少了一步？或者顺序不对？'}</div>
            </div>
          </div>
        )}

        {tab === 'ai' && (
          <div className="junior-card">
            <h2>可以这样问 AI</h2>
            <p>问简单一点，AI 才更容易帮你。</p>
            <div className="junior-prompt">{`我在做机器人小游戏。\n现在机器人要走到星星那里。\n请你只告诉我下一步应该想什么，\n不要一次把答案全说完。`}</div>
          </div>
        )}

        {tab === 'work' && (
          <div className="junior-card">
            <h2>今天我学会了</h2>
            <p>机器人会不会动，跟“顺序”有关系。先排好步骤，再让它开始。</p>
            <div className="junior-certificate">
              <div className="junior-certificate-emoji">🤖⭐</div>
              <h3>顺序小指挥</h3>
              <p>你已经会给机器人排动作啦。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
