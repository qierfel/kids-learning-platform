import { useState } from 'react'
import LessonNewStructure, { InfoCard, SectionTitle, AiCallButton, AiResult, OutputCard } from './LessonNewStructure'

const accent = '#f59e0b'

// 故意有 bug 的示例代码供孩子练习
const BUGGY_CODE = `<button onclick="showMsg()">点我</button>

<script>
  functoin showMsg() {
    alert("你好！")
  }
</script>`

const BUG_TEMPLATES = [
  {
    id: 'typo',
    label: '拼写错误',
    emoji: '✏️',
    want: '点击按钮弹出"你好！"的提示框',
    actual: '点击按钮没有任何反应，没有弹窗',
    tried: '我把代码复制进去了，但就是不工作',
    code: BUGGY_CODE,
  },
  {
    id: 'missing_tag',
    label: '标签没关闭',
    emoji: '🔖',
    want: '网页显示一个红色的大标题',
    actual: '网页的后半部分内容都变成红色了，整个乱掉了',
    tried: '我设置了 style="color:red" 但不知道哪里错了',
    code: `<h1 style="color:red">我的标题
<p>这是正文内容</p>`,
  },
  {
    id: 'wrong_selector',
    label: '选择器写错了',
    emoji: '🎯',
    want: '让 id 为 myBox 的方块变成蓝色',
    actual: 'CSS 加了但方块颜色完全没变',
    tried: '我写了 .myBox { color: blue; } 但没效果',
    code: `<div id="myBox">我是一个方块</div>

<style>
  .myBox { background: blue; }
</style>`,
  },
]

async function callClaudeDebug(want, actual, tried, code) {
  const prompt = `我是一名10岁的初学者，我的代码出问题了，请帮我排查：

我想让它做：${want}
实际发生了：${actual}
我已经试过：${tried}

代码如下：
${code}

请：
1. 告诉我最可能的原因是什么（用简单语言）
2. 给出修复建议（说做什么，不用写完整代码）
3. 给我一个防止以后出现同类错误的小提示`

  const res = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      type: 'chat',
      payload: {
        messages: [{ role: 'user', content: prompt }],
        subject: 'L33 AI查Bug',
        system: `你是一位帮10-12岁孩子调试代码的AI老师。
规则：
- 用亲切简单的中文
- 解释要像跟小朋友说话，不用专业词汇
- 每次只找最可能的一个原因，不要列一堆
- 回答控制在200字内`,
      },
    }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.text || ''
}

export default function Lesson33({ onBack }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [want, setWant] = useState('')
  const [actual, setActual] = useState('')
  const [tried, setTried] = useState('')
  const [code, setCode] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cardSaved, setCardSaved] = useState(false)

  function applyTemplate(t) {
    setSelectedTemplate(t.id)
    setWant(t.want)
    setActual(t.actual)
    setTried(t.tried)
    setCode(t.code)
    setResult('')
    setError('')
  }

  function clearTemplate() {
    setSelectedTemplate(null)
    setWant('')
    setActual('')
    setTried('')
    setCode('')
    setResult('')
    setError('')
  }

  async function runDebug() {
    if (!want.trim() || !actual.trim()) return
    setLoading(true)
    setError('')
    setResult('')
    try {
      const text = await callClaudeDebug(want, actual, tried, code)
      setResult(text)
    } catch {
      setError('AI 老师暂时没有响应，请稍后再试。')
    } finally {
      setLoading(false)
    }
  }

  const formReady = want.trim().length > 0 && actual.trim().length > 0

  const sections = [
    /* 0 今天做什么 */
    <div>
      <InfoCard accent={accent}>
        <h3 style={{ color: accent, margin: '0 0 8px' }}>🐛 今天：学会描述 bug，让 AI 帮你找问题</h3>
        <p style={{ margin: 0, lineHeight: 1.8, fontSize: 14, color: '#cbd5e1' }}>
          很多初学者遇到 bug 只会说"不能用"——这让 AI 完全没办法帮你。
          今天你要学会<strong style={{ color: '#f8fafc' }}>用 3 句话描述 bug</strong>，让 AI 快速定位问题。
        </p>
      </InfoCard>
      <SectionTitle accent={accent}>📋 今天的流程</SectionTitle>
      {[
        '看一个故意写坏的代码，猜猜哪里有问题',
        '学会描述 bug 的三要素：想做什么 / 发生了什么 / 试了什么',
        '用描述模板让 AI 帮你排查',
        '拿到自己的"查 bug 提问模板卡"作品',
      ].map((s, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 14px', background: 'rgba(15,23,42,0.5)', borderRadius: 10, marginBottom: 8 }}>
          <span style={{ color: accent, fontWeight: 800, fontSize: 18, minWidth: 24 }}>{i + 1}</span>
          <span style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{s}</span>
        </div>
      ))}
    </div>,

    /* 1 你会学到什么 */
    <div>
      <SectionTitle accent={accent}>🧠 本课三件事</SectionTitle>
      {[
        { emoji: '🔍', title: '什么是 bug', body: 'Bug 就是代码里的错误。可能是拼写错了、标点用错了、标签没关、逻辑搞反——任何让程序不按你想的方式运行的都叫 bug。' },
        { emoji: '📝', title: '"不能用"是最没用的描述', body: '好的 bug 报告要说三件事：① 我想让它做什么 ② 它实际发生了什么 ③ 我已经试了什么。这三句话能让 AI 快速找到原因。' },
        { emoji: '🤝', title: 'AI 是帮你排查的，不是替你想的', body: '给 AI 越多上下文，它排查越准。代码要贴出来，错误信息要贴出来，你试过的方法也要说。AI 不是魔法，它需要线索。' },
      ].map(item => (
        <div key={item.title} style={{ display: 'flex', gap: 14, padding: '14px', background: 'rgba(15,23,42,0.5)', borderRadius: 12, marginBottom: 10, border: `1px solid ${accent}20` }}>
          <span style={{ fontSize: 28, flexShrink: 0 }}>{item.emoji}</span>
          <div>
            <div style={{ fontWeight: 700, color: '#f8fafc', marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>{item.body}</div>
          </div>
        </div>
      ))}
    </div>,

    /* 2 先看一个例子 */
    <div>
      <SectionTitle accent={accent}>👀 两种 bug 报告，哪个更有用？</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
        <div style={{ background: '#fef2f2', border: '1.5px solid #f87171', borderRadius: 12, padding: '14px' }}>
          <div style={{ fontWeight: 700, color: '#b91c1c', marginBottom: 8 }}>❌ 没用的报告</div>
          <div style={{ fontFamily: 'monospace', fontSize: 13, color: '#7f1d1d', lineHeight: 1.7 }}>
            "我的代码不能用，帮我修"
          </div>
          <div style={{ fontSize: 12, color: '#991b1b', marginTop: 8, lineHeight: 1.6 }}>
            → AI 不知道你要做什么，不知道哪里出问题，不知道你试过什么——完全没办法帮你。
          </div>
        </div>
        <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 12, padding: '14px' }}>
          <div style={{ fontWeight: 700, color: '#14532d', marginBottom: 8 }}>✅ 有用的报告（三要素）</div>
          <div style={{ fontSize: 13, color: '#14532d', lineHeight: 1.8 }}>
            <strong>① 我想让它做：</strong>点击按钮弹出"你好"的提示框<br />
            <strong>② 实际发生了：</strong>点击按钮完全没有反应，没有弹窗也没有错误<br />
            <strong>③ 我已经试了：</strong>重新粘贴了代码，检查过按钮有没有 onclick<br />
            <br />
            <strong>代码：</strong>（粘贴代码）
          </div>
          <div style={{ fontSize: 12, color: '#166534', marginTop: 8, lineHeight: 1.6 }}>
            → AI 能立刻锁定范围，大概率找到问题所在。
          </div>
        </div>
      </div>
      <div style={{ marginTop: 14, padding: '12px 14px', background: 'rgba(15,23,42,0.5)', borderRadius: 10 }}>
        <div style={{ fontWeight: 700, color: '#f8fafc', marginBottom: 6, fontSize: 13 }}>🎯 今天的示例代码（找找哪里有 bug）：</div>
        <pre style={{ margin: 0, fontSize: 12, color: '#fde68a', lineHeight: 1.7, overflowX: 'auto', fontFamily: 'monospace' }}>{BUGGY_CODE}</pre>
        <div style={{ marginTop: 8, fontSize: 12, color: '#94a3b8' }}>💡 提示：仔细看第3行的函数名，有没有拼错？</div>
      </div>
    </div>,

    /* 3 自己动手做 */
    <div>
      <SectionTitle accent={accent}>🛠️ 选一个 bug 场景，或者填自己的问题</SectionTitle>

      <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 10 }}>快速选一个练习场景：</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
        {BUG_TEMPLATES.map(t => (
          <button
            key={t.id}
            onClick={() => applyTemplate(t)}
            style={{
              border: `2px solid ${selectedTemplate === t.id ? accent : 'rgba(148,163,184,0.2)'}`,
              background: selectedTemplate === t.id ? `${accent}20` : 'rgba(15,23,42,0.5)',
              borderRadius: 12, padding: '10px', cursor: 'pointer', textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 4 }}>{t.emoji}</div>
            <div style={{ fontSize: 12, color: selectedTemplate === t.id ? '#fde68a' : '#94a3b8', fontWeight: selectedTemplate === t.id ? 700 : 400 }}>{t.label}</div>
          </button>
        ))}
      </div>

      {selectedTemplate && (
        <button onClick={clearTemplate} style={{ fontSize: 12, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 10, padding: 0 }}>
          ✕ 清空，自己填
        </button>
      )}

      {[
        { label: '① 我想让它做什么', val: want, set: setWant, placeholder: '例如：点击按钮，页面背景变成蓝色' },
        { label: '② 实际发生了什么', val: actual, set: setActual, placeholder: '例如：点击按钮没有任何反应，背景没有变色' },
        { label: '③ 我已经试了什么（可选）', val: tried, set: setTried, placeholder: '例如：我检查了按钮有没有 onclick，代码复制粘贴过一次' },
      ].map(f => (
        <div key={f.label} style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0', marginBottom: 6 }}>{f.label}</div>
          <textarea
            value={f.val}
            onChange={e => f.set(e.target.value)}
            placeholder={f.placeholder}
            rows={2}
            style={{
              width: '100%', borderRadius: 10, border: `1.5px solid ${accent}40`,
              padding: '10px 12px', fontSize: 13, background: 'rgba(15,23,42,0.8)',
              color: '#f8fafc', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit', lineHeight: 1.6,
            }}
          />
        </div>
      ))}

      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0', marginBottom: 6 }}>代码（粘贴在这里，可选）</div>
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="粘贴你出问题的代码……"
          rows={5}
          style={{
            width: '100%', borderRadius: 10, border: `1.5px solid ${accent}40`,
            padding: '10px 12px', fontSize: 12, background: 'rgba(15,23,42,0.8)',
            color: '#fde68a', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'monospace', lineHeight: 1.7,
          }}
        />
      </div>

      <AiCallButton onClick={runDebug} loading={loading} label="🔍 让 AI 帮我查 bug" accent={accent} />
      <AiResult text={result} error={error} accent={accent} />
    </div>,

    /* 4 让AI帮你一次 */
    <div>
      <SectionTitle accent={accent}>🤝 让 AI 给两个可能原因，你来判断哪个更像</SectionTitle>
      <InfoCard accent={accent}>
        <p style={{ margin: 0, fontSize: 14, color: '#fef3c7', lineHeight: 1.7 }}>
          ⬆️ 在第4节（动手做）里选一个 bug 场景，让 AI 排查完之后——
          回来这里再问 AI 一个进阶问题：让 AI 给你 <strong>两个可能的原因</strong>，然后你来判断哪个更像你的情况。
        </p>
      </InfoCard>
      <div style={{ background: 'rgba(15,23,42,0.7)', border: `1.5px solid ${accent}30`, borderRadius: 12, padding: '14px', marginTop: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#fde68a', marginBottom: 8 }}>进阶提问模板：</div>
        <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#94a3b8', lineHeight: 1.8 }}>
          "除了你说的原因，还有没有另一个可能？<br />
          给我两个可能原因，用简单语言，我自己来判断哪个更像。"
        </div>
      </div>
      <div style={{ marginTop: 14 }}>
        {[
          { q: '可能原因A', placeholder: '例如：函数名拼错了（functoin 写成了 function）', color: '#f97316' },
          { q: '可能原因B', placeholder: '例如：onclick 没有加引号', color: '#0ea5e9' },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.q}</div>
            <div style={{ background: 'rgba(15,23,42,0.5)', border: `1px solid ${item.color}30`, borderRadius: 8, padding: '10px 12px', fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>
              {item.placeholder}
            </div>
          </div>
        ))}
      </div>
      <InfoCard accent="#10b981" style={{ marginTop: 12 }}>
        <p style={{ margin: 0, fontSize: 13, color: '#d1fae5', lineHeight: 1.7 }}>
          💡 学会<strong>自己判断哪个原因更可能</strong>，是从"让AI替你做"升级到"和AI一起做"的关键一步。
          你的经验 + AI的分析 = 最快找到 bug！
        </p>
      </InfoCard>
    </div>,

    /* 5 常见问题 */
    <div>
      <SectionTitle accent={accent}>❓ 常见问题</SectionTitle>
      {[
        { q: 'AI 给的答案不对，bug 还是在怎么办？', a: '补充更多信息再问一次！比如：把完整代码都贴上去、把浏览器的错误信息（Console 里的红字）也复制给 AI。信息越多越准确。' },
        { q: '怎么看浏览器的错误信息？', a: '在网页上按 F12（或右键→检查），点"Console"标签，红色的字就是错误信息。把它复制给 AI，AI 马上能看懂。' },
        { q: 'bug 太多，不知道先修哪个？', a: '从第一个报错开始修——修完第一个，很多其他错误可能自动消失了。就像多米诺骨牌，第一个倒了其他才会倒。' },
        { q: '写代码会不会一直有 bug？', a: '会！就连专业程序员每天也在调 bug，这是正常的事。调 bug 就是学习的过程，每次修好一个你都进步了一点。' },
      ].map(item => (
        <div key={item.q} style={{ marginBottom: 12, background: 'rgba(15,23,42,0.5)', borderRadius: 12, padding: '14px' }}>
          <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: 14, marginBottom: 6 }}>Q: {item.q}</div>
          <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>A: {item.a}</div>
        </div>
      ))}
    </div>,

    /* 6 挑战升级 */
    <div>
      <SectionTitle accent={accent}>⚡ 挑战升级</SectionTitle>
      <InfoCard accent="#f97316">
        <h4 style={{ color: '#fed7aa', margin: '0 0 8px' }}>挑战：让 AI 给出两个可能原因</h4>
        <p style={{ margin: 0, fontSize: 13, color: '#ffedd5', lineHeight: 1.7 }}>
          在动手做里拿到 AI 的第一个分析之后，继续问：<br />
          <strong>"还有没有另一个可能的原因？给我两个，我自己判断。"</strong><br /><br />
          然后想想：如果是原因A，我会怎么验证？如果是原因B呢？
        </p>
      </InfoCard>
      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          '用 F12 打开 Console，把红色错误信息复制给 AI，看看 AI 能不能更快找到问题',
          '故意在你自己的代码里制造一个 bug（比如故意拼错一个函数名），再用今天的模板请 AI 帮你找',
          '对比：用"三要素"描述 bug 和只说"不能用"，AI 的回答质量差多少？',
        ].map((c, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 14px', background: 'rgba(15,23,42,0.5)', borderRadius: 10 }}>
            <span style={{ color: accent, fontWeight: 800, fontSize: 16, minWidth: 20 }}>💡</span>
            <span style={{ color: '#e2e8f0', fontSize: 13, lineHeight: 1.6 }}>{c}</span>
          </div>
        ))}
      </div>
    </div>,

    /* 7 本课作品输出 */
    <div>
      <SectionTitle accent={accent}>🏆 本课作品：我的查 Bug 提问模板卡</SectionTitle>
      <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 14, lineHeight: 1.6 }}>
        把今天学到的三要素格式，保存成你自己的专属模板。以后遇到 bug 直接拿来用。
      </p>

      <div style={{
        background: 'rgba(15,23,42,0.7)', border: `2px solid ${accent}`,
        borderRadius: 14, padding: '18px', marginBottom: 16,
      }}>
        <div style={{ fontWeight: 800, color: accent, fontSize: 15, marginBottom: 14 }}>
          🐛 我的查 Bug 提问模板
        </div>
        {[
          { label: '① 我想让它做：', value: '【在这里写你想要的效果】' },
          { label: '② 实际发生了：', value: '【在这里写实际发生的情况，或者报错信息】' },
          { label: '③ 我已经试了：', value: '【在这里写你已经尝试过的方法】' },
          { label: '代码：', value: '【粘贴出问题的代码】' },
        ].map((row, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: accent, fontWeight: 700, marginBottom: 3 }}>{row.label}</div>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#94a3b8', fontStyle: 'italic' }}>
              {row.value}
            </div>
          </div>
        ))}
        {result && (
          <div style={{ marginTop: 12, padding: '10px 12px', background: `${accent}10`, borderRadius: 8 }}>
            <div style={{ fontSize: 12, color: accent, fontWeight: 700, marginBottom: 4 }}>AI 给我的分析：</div>
            <div style={{ fontSize: 12, color: '#fde68a', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{result.slice(0, 200)}{result.length > 200 ? '…' : ''}</div>
          </div>
        )}
      </div>

      <button
        onClick={() => setCardSaved(true)}
        style={{
          width: '100%', padding: '14px', borderRadius: 12, border: 'none',
          background: accent, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 14,
        }}
      >
        💾 保存这张模板卡！
      </button>

      {cardSaved && (
        <OutputCard title="✅ 模板卡已保存！" accent={accent}>
          <div style={{ fontSize: 13, color: '#fde68a', lineHeight: 1.8 }}>
            以后遇到任何 bug，记住这三句话：<br />
            <strong>① 我想让它做什么</strong> — 说清楚目标<br />
            <strong>② 实际发生了什么</strong> — 描述现象<br />
            <strong>③ 我已经试了什么</strong> — 说明你的尝试<br />
            <br />
            ✅ 第33课完成！你掌握了程序员最重要的技能之一：会描述 bug！
          </div>
        </OutputCard>
      )}

      <InfoCard accent="#6b7280" style={{ marginTop: 14 }}>
        <p style={{ margin: 0, fontSize: 13, color: '#cbd5e1', lineHeight: 1.7 }}>
          📌 <strong>下一课预告</strong>：你学会了让 AI 帮你查 bug。
          下一课，你会让 AI 帮你把网页<strong>变得更好看</strong>——配色、排版、卡片、按钮，AI 来出主意！
        </p>
      </InfoCard>
    </div>,
  ]

  return (
    <LessonNewStructure
      onBack={onBack}
      accent={accent}
      module="模块 H · AI 协作开发"
      lessonNum={33}
      title="让 AI 帮我查 Bug"
      subtitle="AI Debug Helper · 三要素描述法"
      sections={sections}
    />
  )
}
