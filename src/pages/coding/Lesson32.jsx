import { useState } from 'react'
import LessonNewStructure, { InfoCard, SectionTitle, AiCallButton, AiResult, OutputCard } from './LessonNewStructure'

const accent = '#10b981'

const SAMPLE_CODE = `<button onclick="changeColor()">
  点我换颜色
</button>

<script>
function changeColor() {
  document.body.style.background = 'pink';
}
</script>`

async function explainCode(style, code) {
  const stylePrompts = {
    beginner: `请用"初学者版本"解释下面这段代码，假设读者完全不懂编程，用日常语言说明每一行在做什么，不要用专业术语：\n\n${code}`,
    child: `请用"小学生能懂的方式"解释下面这段代码，用比喻、故事或者超级简单的词语，让一个从没学过编程的小学生也能理解：\n\n${code}`,
    commented: `请给下面这段代码加上中文注释，在每一行或每个重要部分旁边加上注释说明它在做什么（用 // 注释格式），要让初学者一看就懂：\n\n${code}`,
  }

  const res = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      type: 'chat',
      payload: {
        messages: [{ role: 'user', content: stylePrompts[style] }],
        subject: 'L32 AI解释代码',
        system: `你是一位耐心的AI编程老师，专门帮10-12岁的孩子理解代码。
规则：
- 用简单中文，亲切友好的语气
- 避免专业术语，实在要用的话要用括号解释
- 解释要具体，不要模糊
- 控制在200字内`,
      },
    }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.text || ''
}

export default function Lesson32({ onBack }) {
  const [results, setResults] = useState({})
  const [loadings, setLoadings] = useState({})
  const [errors, setErrors] = useState({})
  const [customCode, setCustomCode] = useState('')
  const [customStyle, setCustomStyle] = useState('beginner')
  const [customResult, setCustomResult] = useState('')
  const [customLoading, setCustomLoading] = useState(false)
  const [customError, setCustomError] = useState('')
  const [cardText, setCardText] = useState('')
  const [cardSaved, setCardSaved] = useState(false)

  async function runExplain(style) {
    setLoadings(s => ({ ...s, [style]: true }))
    setErrors(s => ({ ...s, [style]: '' }))
    try {
      const result = await explainCode(style, SAMPLE_CODE)
      setResults(r => ({ ...r, [style]: result }))
    } catch {
      setErrors(s => ({ ...s, [style]: 'AI 老师暂时没有响应，请稍后再试。' }))
    } finally {
      setLoadings(s => ({ ...s, [style]: false }))
    }
  }

  async function runCustom() {
    const code = customCode.trim() || SAMPLE_CODE
    setCustomLoading(true)
    setCustomError('')
    setCustomResult('')
    try {
      const result = await explainCode(customStyle, code)
      setCustomResult(result)
    } catch {
      setCustomError('AI 老师暂时没有响应，请稍后再试。')
    } finally {
      setCustomLoading(false)
    }
  }

  const EXPLAIN_STYLES = [
    { id: 'beginner', label: '初学者版本', emoji: '📚', color: '#6366f1', desc: '假设你完全不懂编程，用日常语言解释每一行' },
    { id: 'child', label: '小学生版本', emoji: '🧒', color: '#f97316', desc: '用比喻和故事，让从没学过的小朋友也能懂' },
    { id: 'commented', label: '带注释版本', emoji: '💬', color: '#10b981', desc: '在代码每行旁边加上中文注释说明' },
  ]

  const sections = [
    /* 0. 今天做什么 */
    <div>
      <InfoCard accent={accent}>
        <h3 style={{ color: accent, margin: '0 0 8px' }}>📖 今天：让 AI 用你能懂的话解释代码</h3>
        <p style={{ margin: 0, lineHeight: 1.8, fontSize: 14, color: '#cbd5e1' }}>
          同一段代码，AI 可以用 <strong style={{ color: '#f8fafc' }}>3 种不同的方式</strong> 解释：
          初学者版、小学生版、带中文注释版。你来选最适合自己的！
        </p>
      </InfoCard>
      <SectionTitle accent={accent}>📋 今天的流程</SectionTitle>
      {[
        '看一段真实的网页代码（一个换颜色的按钮）',
        '让 AI 用 3 种方式解释这段代码',
        '比较：哪种解释最容易看懂？',
        '用你最喜欢的方式，做一张"代码解释卡"作品',
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
        { emoji: '🔍', title: '什么叫"看懂一段代码"', body: '不是一字不差地背下来，而是能说出"这段代码是干什么的"。就像读一篇文章，你能说出大意就够了。' },
        { emoji: '🎯', title: '适合你的解释方式才是最好的', body: '对初学者来说，"这行代码就像一个遥控器"比"这是一个事件监听器"有用多了。解释的好坏取决于你听不听得懂。' },
        { emoji: '📝', title: '带注释的代码是最好的学习资料', body: '专业程序员写代码都会加注释，这样自己以后看也能看懂。学会让AI帮你的代码加注释，是超好用的技能！' },
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
    </div>,

    /* 2. 先看一个例子 */
    <div>
      <SectionTitle accent={accent}>👀 今天要解释的代码</SectionTitle>
      <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12, lineHeight: 1.6 }}>
        这是一段真实的网页代码——一个点击后会换背景颜色的按钮。
        你先看一眼，猜猜每行在做什么，然后让 AI 帮你解释。
      </p>
      <div style={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: 12, padding: '16px', marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: '#64748b', marginBottom: 8, fontWeight: 700 }}>代码预览：</div>
        <pre style={{ margin: 0, fontSize: 13, color: '#e2e8f0', lineHeight: 1.7, overflowX: 'auto', fontFamily: 'monospace' }}>
          {SAMPLE_CODE}
        </pre>
      </div>
      <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4, lineHeight: 1.7 }}>
        🤔 <strong style={{ color: '#f8fafc' }}>先想想：</strong>这段代码让网页发生了什么变化？你看出来了吗？
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 14 }}>
        {['点击按钮，背景变粉色', '点击按钮，按钮消失', '点击按钮，出现一段文字'].map((guess, i) => (
          <div key={i} style={{
            background: i === 0 ? '#f0fdf4' : 'rgba(15,23,42,0.5)',
            border: `1.5px solid ${i === 0 ? '#86efac' : 'rgba(148,163,184,0.2)'}`,
            borderRadius: 10, padding: '10px', fontSize: 12,
            color: i === 0 ? '#14532d' : '#94a3b8',
            textAlign: 'center', lineHeight: 1.5,
          }}>
            {i === 0 && '✅ '}{guess}
          </div>
        ))}
      </div>
    </div>,

    /* 3. 自己动手做 */
    <div>
      <SectionTitle accent={accent}>🛠️ 让 AI 用 3 种方式解释这段代码</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {EXPLAIN_STYLES.map(s => (
          <div key={s.id} style={{ border: `1.5px solid ${s.color}40`, borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', background: `${s.color}10` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 700, color: s.color, fontSize: 14 }}>{s.emoji} {s.label}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{s.desc}</div>
                </div>
                <button
                  onClick={() => runExplain(s.id)}
                  disabled={loadings[s.id]}
                  style={{
                    padding: '7px 16px', borderRadius: 999, border: 'none',
                    background: loadings[s.id] ? '#4b5563' : s.color,
                    color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', flexShrink: 0,
                  }}
                >
                  {loadings[s.id] ? '⏳ 生成中…' : results[s.id] ? '🔁 再来一次' : '▶ 让AI解释'}
                </button>
              </div>
            </div>
            {errors[s.id] && (
              <div style={{ padding: '10px 16px', background: '#fef2f2', color: '#b91c1c', fontSize: 13 }}>
                {errors[s.id]}
              </div>
            )}
            {results[s.id] && (
              <div style={{ padding: '14px 16px', background: 'rgba(15,23,42,0.5)', fontSize: 13, color: '#e2e8f0', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                {results[s.id]}
              </div>
            )}
          </div>
        ))}
      </div>
      {Object.keys(results).length >= 2 && (
        <InfoCard accent={accent} style={{ marginTop: 14 }}>
          <p style={{ margin: 0, fontSize: 13, color: '#d1fae5', lineHeight: 1.7 }}>
            👀 看到 3 种解释的区别了吗？哪一种你最容易看懂？
            记住你的偏好，下次遇到不懂的代码，就用那种方式让 AI 解释！
          </p>
        </InfoCard>
      )}
    </div>,

    /* 4. 让AI帮你一次 */
    <div>
      <SectionTitle accent={accent}>🤝 换一段代码，自己来解释</SectionTitle>
      <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12, lineHeight: 1.6 }}>
        粘贴一段你自己的代码，或者用下面的例子，让 AI 用你选的方式解释。
      </p>
      <textarea
        value={customCode}
        onChange={e => setCustomCode(e.target.value)}
        placeholder={`粘贴你的代码（留空则用默认代码）：\n\n${SAMPLE_CODE}`}
        style={{
          width: '100%', minHeight: 120, borderRadius: 10, border: `1.5px solid ${accent}40`,
          padding: '10px 12px', fontSize: 12, background: 'rgba(15,23,42,0.8)',
          color: '#e2e8f0', resize: 'vertical', boxSizing: 'border-box',
          fontFamily: 'monospace', lineHeight: 1.6, marginBottom: 12,
        }}
      />
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>选择解释方式：</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {EXPLAIN_STYLES.map(s => (
            <button
              key={s.id}
              onClick={() => setCustomStyle(s.id)}
              style={{
                padding: '7px 14px', borderRadius: 999, border: `1.5px solid ${customStyle === s.id ? s.color : '#4b5563'}`,
                background: customStyle === s.id ? `${s.color}20` : 'transparent',
                color: customStyle === s.id ? s.color : '#94a3b8',
                fontSize: 12, fontWeight: 700, cursor: 'pointer',
              }}
            >
              {s.emoji} {s.label}
            </button>
          ))}
        </div>
      </div>
      <AiCallButton onClick={runCustom} loading={customLoading} label="📖 让AI解释这段代码" accent={accent} />
      <AiResult text={customResult} error={customError} accent={accent} />
    </div>,

    /* 5. 常见问题 */
    <div>
      <SectionTitle accent={accent}>❓ 常见问题</SectionTitle>
      {[
        {
          q: '如果AI的解释我还是看不懂怎么办？',
          a: '继续追问！"你解释的X是什么意思？用更简单的比喻说一遍" 或者 "假设我完全不懂任何编程知识，再解释一遍"。',
        },
        {
          q: '带注释的代码更好吗？',
          a: '对初学者来说很有帮助！但是真正写项目的时候，注释太多也会让代码变得乱。好的代码要"恰到好处"——重要的地方加注释，简单明了的行不需要。',
        },
        {
          q: '我能让AI解释任何语言的代码吗？',
          a: '可以！HTML、CSS、JavaScript、Python……AI 都能解释。只要你把代码粘贴给它，说明你的理解程度，它就能给你适合你水平的解释。',
        },
        {
          q: '解释代码和学代码有什么区别？',
          a: '解释代码是"我能读懂这段"，学代码是"我能自己写出来"。都很重要！先能读懂，再能自己写，这是好的学习顺序。',
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
        <h4 style={{ color: '#fed7aa', margin: '0 0 8px' }}>挑战：让AI把复杂代码改成更容易看懂的版本</h4>
        <p style={{ margin: 0, fontSize: 13, color: '#ffedd5', lineHeight: 1.7 }}>
          不只是解释——让 AI 帮你把一段复杂代码重写成更容易看懂的版本。
          用这个提示词：
        </p>
      </InfoCard>
      <div style={{ background: 'rgba(15,23,42,0.7)', border: `1.5px solid ${accent}30`, borderRadius: 12, padding: '14px', marginTop: 12 }}>
        <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#94a3b8', lineHeight: 1.7 }}>
          "下面这段代码功能是对的，但对初学者来说太难懂了。<br />
          请帮我用更简单、更容易理解的方式重写它，<br />
          但要保持同样的功能，并加上中文注释。"
        </div>
      </div>
      <InfoCard accent={accent} style={{ marginTop: 12 }}>
        <p style={{ margin: 0, fontSize: 13, color: '#d1fae5', lineHeight: 1.7 }}>
          💡 "重写成更容易看懂的版本"是一个非常实用的技能！
          你以后会在真实项目中经常用到这个方法，让 AI 帮你把别人的复杂代码变成你能理解的版本。
        </p>
      </InfoCard>
    </div>,

    /* 7. 本课作品输出 */
    <div>
      <SectionTitle accent={accent}>🏆 本课作品：我的代码解释卡</SectionTitle>
      <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 14, lineHeight: 1.6 }}>
        用你自己的话，说说今天那段代码在做什么。不需要技术词汇，就像给朋友解释一样。
      </p>
      <textarea
        value={cardText}
        onChange={e => setCardText(e.target.value)}
        placeholder={`用自己的话写出来，例如：\n\n这段代码里有一个按钮。\n当我点击这个按钮的时候，\n它会调用一个叫 changeColor 的函数，\n这个函数会把整个网页的背景颜色变成粉色。\n\n就像遥控器上的按钮控制电视一样，\n这个按钮控制网页的颜色！`}
        style={{
          width: '100%', minHeight: 140, borderRadius: 10, border: `1.5px solid ${accent}40`,
          padding: '12px 14px', fontSize: 13, background: 'rgba(15,23,42,0.8)',
          color: '#f8fafc', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit', lineHeight: 1.7,
          marginBottom: 14,
        }}
      />

      <button
        onClick={() => setCardSaved(true)}
        disabled={!cardText.trim()}
        style={{
          width: '100%', padding: '14px', borderRadius: 12, border: 'none',
          background: !cardText.trim() ? '#4b5563' : accent,
          color: '#fff', fontSize: 15, fontWeight: 700, cursor: cardText.trim() ? 'pointer' : 'default',
          marginBottom: 14,
        }}
      >
        💾 保存我的解释卡
      </button>

      {cardSaved && (
        <OutputCard title="📖 我的代码解释卡" accent={accent}>
          <div style={{ fontSize: 13, color: '#e2e8f0', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
            {cardText}
          </div>
          <div style={{ marginTop: 12, padding: '10px', background: `${accent}10`, borderRadius: 8, fontSize: 12, color: '#6ee7b7' }}>
            ✅ 第32课完成！你学会了让AI用你能懂的方式解释代码——这是高效学习编程的超级秘诀！
          </div>
        </OutputCard>
      )}

      <InfoCard accent="#6b7280" style={{ marginTop: 16 }}>
        <p style={{ margin: 0, fontSize: 13, color: '#cbd5e1', lineHeight: 1.7 }}>
          📌 <strong>模块 A 完成！</strong>你学会了：比较不同AI回答风格、让AI拆任务、让AI解释代码。
          下一个模块（模块 B）开始，你会进入 AI 协作开发——让 AI 帮你查 bug、美化网页、升级作品！
        </p>
      </InfoCard>
    </div>,
  ]

  return (
    <LessonNewStructure
      onBack={onBack}
      accent={accent}
      module="模块 H · AI 编程搭档入门"
      lessonNum={32}
      title="让 AI 用我能懂的话解释"
      subtitle="AI Explains Code · 三种解释方式任你选"
      sections={sections}
    />
  )
}
