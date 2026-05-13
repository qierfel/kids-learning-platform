import { useState } from 'react'
import LessonNewStructure, { InfoCard, SectionTitle, AiCallButton, AiResult, OutputCard } from './LessonNewStructure'

const accent = '#0ea5e9'

const EXAMPLE_PROJECTS = [
  { id: 'hobby', label: '介绍爱好的网页', emoji: '⭐' },
  { id: 'wordcard', label: '单词卡复习工具', emoji: '📚' },
  { id: 'quiz', label: '小问答游戏页面', emoji: '❓' },
  { id: 'diary', label: '今日心情记录页', emoji: '📓' },
  { id: 'custom', label: '我自己的项目', emoji: '✏️' },
]

async function callClaude(userPrompt) {
  const res = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      type: 'chat',
      payload: {
        messages: [{ role: 'user', content: userPrompt }],
        subject: 'L31 AI拆任务',
        system: `你是一位帮助10-12岁初学者学编程的AI老师。
你的任务是把一个大的网页制作目标拆成清晰的5步计划。
规则：
- 用简单中文，像和小朋友说话一样
- 严格给出编号1-5的五个步骤
- 每步只有一句话，说明"要做什么"
- 第1步一定是最小、最容易开始的那一步
- 不要写代码，只写步骤说明
- 格式：每行一个步骤，用数字开头`,
      },
    }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.text || ''
}

export default function Lesson31({ onBack }) {
  const [selectedProject, setSelectedProject] = useState(null)
  const [customProject, setCustomProject] = useState('')
  const [steps, setSteps] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [focusStep, setFocusStep] = useState(null)
  const [wrongPromptResult, setWrongPromptResult] = useState('')
  const [wrongLoading, setWrongLoading] = useState(false)
  const [outputSaved, setOutputSaved] = useState(false)

  const projectName = selectedProject === 'custom'
    ? customProject
    : EXAMPLE_PROJECTS.find(p => p.id === selectedProject)?.label || ''

  async function getSteps() {
    if (!projectName.trim()) return
    setLoading(true)
    setError('')
    setSteps('')
    setFocusStep(null)
    try {
      const result = await callClaude(`请帮我把这个项目拆成5个步骤：${projectName}`)
      setSteps(result)
    } catch {
      setError('AI 老师暂时没有响应，请稍后再试。')
    } finally {
      setLoading(false)
    }
  }

  async function tryWrongPrompt() {
    setWrongLoading(true)
    setWrongPromptResult('')
    try {
      const result = await callClaude(`直接帮我做完：${projectName || '一个介绍爱好的网页'}`)
      setWrongPromptResult(result)
    } catch {
      setWrongPromptResult('（AI直接给了一大堆代码……这就是"错误问法"的结果）')
    } finally {
      setWrongLoading(false)
    }
  }

  const parsedSteps = steps
    ? steps.split('\n').filter(l => l.trim() && /^\d/.test(l.trim()))
    : []

  const sections = [
    /* 0. 今天做什么 */
    <div>
      <InfoCard accent={accent}>
        <h3 style={{ color: accent, margin: '0 0 8px' }}>🧩 今天：让 AI 帮你拆任务，不是帮你做完</h3>
        <p style={{ margin: 0, lineHeight: 1.8, fontSize: 14, color: '#cbd5e1' }}>
          很多初学者一上来就让 AI "帮我做一个网页"，结果 AI 给了一堆代码，完全看不懂。
          今天你要学一个更聪明的做法：<strong style={{ color: '#f8fafc' }}>先让 AI 把大任务拆成 5 步，再一步一步来。</strong>
        </p>
      </InfoCard>
      <SectionTitle accent={accent}>📋 今天的流程</SectionTitle>
      {[
        '选一个你想做的项目',
        '体验"错误问法"（让AI直接做完）VS "正确问法"（让AI拆成5步）',
        '选出你最想先做的第1步',
        '完成你的"项目5步拆解图"作品',
      ].map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 14px', background: 'rgba(15,23,42,0.5)', borderRadius: 10, marginBottom: 8 }}>
          <span style={{ color: accent, fontWeight: 800, fontSize: 18, minWidth: 24 }}>{i + 1}</span>
          <span style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{step}</span>
        </div>
      ))}
    </div>,

    /* 1. 你会学到什么 */
    <div>
      <SectionTitle accent={accent}>🧠 本课三件事</SectionTitle>
      {[
        { emoji: '🔪', title: '什么是"大任务"', body: '一个大任务就是"做一个网页"。它太大了，不知道从哪里开始。AI 也不知道。' },
        { emoji: '🪜', title: '什么是"可执行的小步骤"', body: '把大任务拆成："第1步：先写一个标题" —— 这就变得可以开始了！每步只做一件事。' },
        { emoji: '🎯', title: '为什么初学者更需要只要第一步', body: '如果你让 AI 直接做完整个项目，你会看到一大堆代码，完全不知道每行在干什么。先看第1步，慢慢来，学得更扎实。' },
      ].map(item => (
        <div key={item.title} style={{
          display: 'flex', gap: 14, padding: '14px', background: 'rgba(15,23,42,0.5)',
          borderRadius: 12, marginBottom: 10, border: `1px solid ${accent}20`,
        }}>
          <span style={{ fontSize: 28, flexShrink: 0 }}>{item.emoji}</span>
          <div>
            <div style={{ fontWeight: 700, color: '#f8fafc', marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>{item.body}</div>
          </div>
        </div>
      ))}
      <InfoCard accent="#10b981">
        <p style={{ margin: 0, fontSize: 13, color: '#d1fae5', lineHeight: 1.7 }}>
          💡 <strong>工程师的秘诀</strong>：真实的软件开发也是这样做的——先做最小可用的版本（MVP），再慢慢加功能。
          你今天学的不只是"怎么问AI"，而是<strong>专业的项目管理思维</strong>！
        </p>
      </InfoCard>
    </div>,

    /* 2. 先看一个例子 */
    <div>
      <SectionTitle accent={accent}>👀 两种问法，结果完全不同</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
        <div style={{ background: '#fef2f2', border: '1.5px solid #f87171', borderRadius: 12, padding: '14px' }}>
          <div style={{ fontWeight: 700, color: '#b91c1c', marginBottom: 8 }}>❌ 错误问法（让AI直接做完）</div>
          <div style={{ fontFamily: 'monospace', fontSize: 12, background: 'rgba(0,0,0,0.05)', borderRadius: 6, padding: '8px', marginBottom: 8, color: '#374151' }}>
            "帮我做一个单词卡复习工具"
          </div>
          <div style={{ fontSize: 13, color: '#7f1d1d', lineHeight: 1.6 }}>
            结果：AI 给你 100 行代码 + 一堆 CSS + JavaScript……你完全不知道哪行是哪行，放弃了。
          </div>
        </div>
        <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 12, padding: '14px' }}>
          <div style={{ fontWeight: 700, color: '#14532d', marginBottom: 8 }}>✅ 正确问法（让AI拆成5步）</div>
          <div style={{ fontFamily: 'monospace', fontSize: 12, background: 'rgba(0,0,0,0.05)', borderRadius: 6, padding: '8px', marginBottom: 8, color: '#374151' }}>
            "请把"做单词卡复习工具"拆成5个步骤，每步只说要做什么，不要写代码"
          </div>
          <div style={{ fontSize: 13, color: '#14532d', lineHeight: 1.8 }}>
            结果：<br />
            1. 先创建一个HTML文件，只放标题<br />
            2. 加一个显示单词的卡片区域<br />
            3. 写一条测试单词的数据<br />
            4. 加一个"下一个"按钮<br />
            5. 让按钮点击后显示下一个单词<br />
            <strong>→ 现在你知道从哪里开始了！</strong>
          </div>
        </div>
      </div>
    </div>,

    /* 3. 自己动手做 */
    <div>
      <SectionTitle accent={accent}>🛠️ 选一个项目，让 AI 帮你拆成 5 步</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
        {EXAMPLE_PROJECTS.map(p => (
          <button
            key={p.id}
            onClick={() => { setSelectedProject(p.id); setSteps(''); setError('') }}
            style={{
              border: `2px solid ${selectedProject === p.id ? accent : 'rgba(148,163,184,0.2)'}`,
              background: selectedProject === p.id ? `${accent}20` : 'rgba(15,23,42,0.5)',
              borderRadius: 12, padding: '12px', cursor: 'pointer', textAlign: 'left',
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 4 }}>{p.emoji}</div>
            <div style={{ fontSize: 13, color: selectedProject === p.id ? '#bae6fd' : '#94a3b8', fontWeight: selectedProject === p.id ? 700 : 400 }}>
              {p.label}
            </div>
          </button>
        ))}
      </div>

      {selectedProject === 'custom' && (
        <input
          value={customProject}
          onChange={e => setCustomProject(e.target.value)}
          placeholder="写下你的项目名称，例如：我的生日计划网页"
          style={{
            width: '100%', borderRadius: 10, border: `2px solid ${accent}50`,
            padding: '12px 14px', fontSize: 14, background: 'rgba(15,23,42,0.8)',
            color: '#f8fafc', boxSizing: 'border-box', marginBottom: 12,
          }}
        />
      )}

      <AiCallButton
        onClick={getSteps}
        loading={loading}
        label={`🧩 让 AI 把"${projectName || '选一个项目'}"拆成 5 步`}
        accent={accent}
      />
      <AiResult text={steps} error={error} accent={accent} />

      {parsedSteps.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 700, color: '#f8fafc', marginBottom: 10, fontSize: 14 }}>
            📌 点击你想先做的那一步：
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {parsedSteps.map((step, i) => (
              <button
                key={i}
                onClick={() => setFocusStep(focusStep === i ? null : i)}
                style={{
                  border: `2px solid ${focusStep === i ? accent : 'rgba(148,163,184,0.2)'}`,
                  background: focusStep === i ? `${accent}20` : 'rgba(15,23,42,0.5)',
                  borderRadius: 10, padding: '12px 14px', cursor: 'pointer', textAlign: 'left',
                  color: focusStep === i ? '#bae6fd' : '#e2e8f0', fontSize: 14, fontWeight: focusStep === i ? 700 : 400,
                  transition: 'all 0.15s',
                }}
              >
                {step}
              </button>
            ))}
          </div>
          {focusStep !== null && (
            <InfoCard accent={accent} style={{ marginTop: 12 }}>
              <p style={{ margin: 0, fontSize: 14, color: '#bae6fd', lineHeight: 1.7 }}>
                ✅ 你选了第 {focusStep + 1} 步！把这一步告诉 AI，让 AI <strong>只帮你做这一步</strong>。
                记住：不要让 AI 直接跳到第 5 步！
              </p>
            </InfoCard>
          )}
        </div>
      )}
    </div>,

    /* 4. 让AI帮你一次 */
    <div>
      <SectionTitle accent={accent}>🤝 体验"错误问法"，感受一下区别</SectionTitle>
      <InfoCard accent="#f59e0b">
        <p style={{ margin: 0, fontSize: 14, color: '#fef3c7', lineHeight: 1.7 }}>
          ⚠️ 接下来我们故意用错误的方式问 AI——让 AI 直接帮我们做完整个项目。
          你来判断：这个答案适合初学者吗？你看得懂吗？
        </p>
      </InfoCard>
      <AiCallButton
        onClick={tryWrongPrompt}
        loading={wrongLoading}
        label='❌ 用错误方式问 AI（让AI直接做完）'
        accent="#f59e0b"
      />
      {wrongPromptResult && (
        <div style={{ marginTop: 12, padding: '14px', background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: 12 }}>
          <div style={{ fontWeight: 700, color: '#b45309', marginBottom: 8, fontSize: 13 }}>
            AI 的回答（看看有多复杂）：
          </div>
          <div style={{ fontSize: 12, color: '#92400e', lineHeight: 1.6 }}>{wrongPromptResult}</div>
        </div>
      )}
      <InfoCard accent="#0ea5e9" style={{ marginTop: 16 }}>
        <p style={{ margin: 0, fontSize: 13, color: '#bae6fd', lineHeight: 1.7 }}>
          💡 看到区别了吗？"直接做完"的答案对初学者太难了。
          用"拆成5步"的方式，你才能一步一步真正学会。
        </p>
      </InfoCard>
    </div>,

    /* 5. 常见问题 */
    <div>
      <SectionTitle accent={accent}>❓ 常见问题</SectionTitle>
      {[
        {
          q: '如果 AI 给的步骤还是太复杂怎么办？',
          a: '可以继续追问："第1步太难了，能再拆细一点吗？" AI 会帮你把每一步继续拆小。',
        },
        {
          q: '一定要按照 AI 给的顺序来吗？',
          a: '不一定！AI 给的是建议。你可以根据自己的情况调整，比如你觉得先做第3步更简单，就先做第3步。',
        },
        {
          q: '如果我不知道怎么做 AI 说的第1步怎么办？',
          a: '继续问 AI！"第1步怎么做？用最简单的方式解释，我是初学者，只需要知道最关键的一个知识点。"',
        },
        {
          q: '"5步"是固定的吗？可以拆成10步吗？',
          a: '完全可以！5步只是一个建议。项目越复杂，可以拆越多步。只要每一步都是"只做一件事"就好。',
        },
      ].map(item => (
        <div key={item.q} style={{ marginBottom: 12, background: 'rgba(15,23,42,0.5)', borderRadius: 12, padding: '14px' }}>
          <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: 14, marginBottom: 6 }}>Q: {item.q}</div>
          <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>A: {item.a}</div>
        </div>
      ))}
    </div>,

    /* 6. 挑战升级 */
    <div>
      <SectionTitle accent={accent}>⚡ 挑战升级</SectionTitle>
      <InfoCard accent="#f97316">
        <h4 style={{ color: '#fed7aa', margin: '0 0 8px' }}>挑战：再拆一个项目，比较两次的区别</h4>
        <p style={{ margin: 0, fontSize: 13, color: '#ffedd5', lineHeight: 1.7 }}>
          再选一个你感兴趣的项目，让 AI 帮你拆 5 步。试试看，你这次拆出来的步骤比第一次更清楚吗？
        </p>
      </InfoCard>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
        {[
          { name: '阅读记录本（记你读过的书）', prompt: '请帮我把"做一个阅读记录本网页"拆成5步，我是初学者，只会一点HTML，每步只说要做什么，不要写代码。' },
          { name: '天气心情网页（每天填心情）', prompt: '请帮我把"做一个记录今天心情的小网页"拆成5步，我是10岁的初学者，每步只说一件事，不写代码。' },
          { name: '我的兴趣展示页（展示爱好收藏）', prompt: '请帮我把"做一个展示我兴趣爱好的网页"拆成5步，语言简单一点，我是小学生，每步只说要做什么事情。' },
        ].map(item => (
          <div key={item.name} style={{ background: 'rgba(15,23,42,0.5)', border: `1px solid ${accent}20`, borderRadius: 12, padding: '12px 14px' }}>
            <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: 14, marginBottom: 4 }}>📌 {item.name}</div>
            <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#94a3b8', lineHeight: 1.6, marginBottom: 4 }}>
              示例提示词："{item.prompt}"
            </div>
          </div>
        ))}
      </div>
      <InfoCard accent={accent} style={{ marginTop: 12 }}>
        <p style={{ margin: 0, fontSize: 13, color: '#bae6fd', lineHeight: 1.7 }}>
          💡 每次用"拆5步"的方式，你都在练习把<strong>大任务变成可执行的小步骤</strong>。
          这是编程项目管理最核心的技能之一！
        </p>
      </InfoCard>
    </div>,

    /* 7. 本课作品输出 */
    <div>
      <SectionTitle accent={accent}>🏆 本课作品：我的项目 5 步拆解图</SectionTitle>
      {steps && parsedSteps.length > 0 ? (
        <OutputCard title={`📋 ${projectName} — 我的 5 步计划`} accent={accent}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {parsedSteps.map((step, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', gap: 10, padding: '10px 12px',
                  background: focusStep === i ? `${accent}20` : 'rgba(255,255,255,0.05)',
                  borderRadius: 8, border: focusStep === i ? `1.5px solid ${accent}` : '1px solid rgba(148,163,184,0.1)',
                }}
              >
                <span style={{
                  minWidth: 22, height: 22, borderRadius: 999,
                  background: i === 0 ? accent : 'rgba(148,163,184,0.2)',
                  color: '#fff', fontSize: 11, fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>{i + 1}</span>
                <span style={{ color: focusStep === i ? '#bae6fd' : '#cbd5e1', fontSize: 13, lineHeight: 1.5 }}>
                  {step.replace(/^\d+[.、\s]+/, '')}
                  {focusStep === i && ' ← 我要先做这步！'}
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: '10px', background: `${accent}10`, borderRadius: 8, fontSize: 12, color: '#7dd3fc' }}>
            ✅ 第31课完成！你学会了用 AI 拆任务——先要第一步，慢慢推进，这才是正确的开发方式。
          </div>
          <button
            onClick={() => setOutputSaved(true)}
            style={{
              marginTop: 10, padding: '10px', borderRadius: 10, border: 'none',
              background: outputSaved ? '#10b981' : accent,
              color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', width: '100%',
            }}
          >
            {outputSaved ? '✓ 已记下这份计划！' : '💾 记住这份计划！'}
          </button>
        </OutputCard>
      ) : (
        <div style={{ textAlign: 'center', padding: '30px 16px', color: '#6b7280', fontSize: 14 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🧩</div>
          先去第 4 节"动手做"，选一个项目让 AI 拆成 5 步，<br />然后回来这里看你的完整拆解图！
        </div>
      )}

      <InfoCard accent="#6b7280" style={{ marginTop: 16 }}>
        <p style={{ margin: 0, fontSize: 13, color: '#cbd5e1', lineHeight: 1.7 }}>
          📌 <strong>下一课预告</strong>：你学会了让 AI 拆任务。下一课，你会学到如何让 AI
          <strong>用你能懂的话解释代码</strong>——初学者版、小学生版、带注释版，三种解释方式任你选！
        </p>
      </InfoCard>
    </div>,
  ]

  return (
    <LessonNewStructure
      onBack={onBack}
      accent={accent}
      module="模块 H · AI 编程搭档入门"
      lessonNum={31}
      title="AI 不替我做，AI 帮我拆"
      subtitle="AI Breaks It Down · 学会让AI拆任务"
      sections={sections}
    />
  )
}
