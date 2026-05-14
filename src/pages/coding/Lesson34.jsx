import { useState } from 'react'
import LessonNewStructure, { InfoCard, SectionTitle, AiCallButton, AiResult, OutputCard } from './LessonNewStructure'

const accent = '#ec4899'

// 示例：一个朴素网页的 HTML 代码
const PLAIN_PAGE = `<!DOCTYPE html>
<html>
<head>
  <title>我的主页</title>
</head>
<body>
  <h1>你好，我叫小明</h1>
  <p>我喜欢打篮球和看漫画</p>
  <p>我最喜欢的食物是披萨</p>
  <button>了解更多</button>
</body>
</html>`

const BEAUTY_ASPECTS = [
  { id: 'color', label: '配色方案', emoji: '🎨', desc: '背景色、文字色、按钮颜色' },
  { id: 'layout', label: '排版布局', emoji: '📐', desc: '间距、对齐、卡片感' },
  { id: 'font', label: '字体样式', emoji: '🔤', desc: '大标题、字号、字重' },
  { id: 'button', label: '按钮设计', emoji: '🖱️', desc: '圆角、颜色、悬停效果' },
  { id: 'overall', label: '整体风格', emoji: '✨', desc: '统一感、视觉层次' },
]

const STYLE_THEMES = [
  { id: 'cute', label: '🌸 可爱风', desc: '粉色系、圆角大、温暖亲切' },
  { id: 'cool', label: '🌙 酷感风', desc: '深色背景、霓虹色、科技感' },
  { id: 'clean', label: '🍃 清爽风', desc: '白色为主、绿色点缀、简洁干净' },
  { id: 'warm', label: '🌻 暖色风', desc: '橙黄色调、温暖感、友好亲近' },
]

async function callClaudeBeauty(pageDesc, aspects, theme) {
  const aspectNames = aspects.map(id => BEAUTY_ASPECTS.find(a => a.id === id)?.label).filter(Boolean).join('、')
  const themeName = STYLE_THEMES.find(t => t.id === theme)?.label || '整体风格'

  const prompt = `我有一个很朴素的网页，我想让它变得更好看。

网页内容：${pageDesc}

请帮我提出3个具体的美化建议，重点在这些方面：${aspectNames || '整体'}
风格偏好：${themeName}

对于每个建议：
1. 说明改什么地方
2. 给出具体的改法（用CSS或HTML，代码要简短）
3. 说明改完之后视觉效果会有什么变化

用简单语言，像在和10岁的小朋友说话。`

  const res = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      type: 'chat',
      payload: {
        messages: [{ role: 'user', content: prompt }],
        subject: 'L34 AI美化建议',
        system: `你是一位帮10-12岁孩子美化网页的AI设计老师。
规则：
- 建议要具体、可执行
- 每个建议给一小段CSS或HTML示例（不超过5行）
- 用简单中文，描述视觉效果时用形象的语言
- 回答控制在300字以内，分3个清晰建议`,
      },
    }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.text || ''
}

async function callClaudeTwoStyles(pageDesc) {
  const prompt = `请给这个网页提供两套完全不同风格的美化方案：

网页内容：${pageDesc}

方案一：可爱清新风（粉色、圆角、温暖）
方案二：科技酷感风（深色、蓝绿荧光、现代）

每个方案只需要：
- 主要配色（3个颜色）
- 最关键的1-2个CSS改动（代码要简短）
- 一句话描述整体感觉

用简单语言，让10岁的孩子也能看懂。`

  const res = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      type: 'chat',
      payload: {
        messages: [{ role: 'user', content: prompt }],
        subject: 'L34 两套风格对比',
        system: `你是一位帮孩子美化网页的AI设计老师，给出两套风格对比方案，语言简洁清晰。`,
      },
    }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.text || ''
}

export default function Lesson34({ onBack }) {
  const [pageDesc, setPageDesc] = useState('一个个人主页，有名字、介绍爱好、一个"了解更多"按钮')
  const [selectedAspects, setSelectedAspects] = useState(['color', 'button'])
  const [selectedTheme, setSelectedTheme] = useState('clean')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [twoStyleResult, setTwoStyleResult] = useState('')
  const [twoStyleLoading, setTwoStyleLoading] = useState(false)
  const [twoStyleError, setTwoStyleError] = useState('')
  const [chosenSuggestion, setChosenSuggestion] = useState('')
  const [outputSaved, setOutputSaved] = useState(false)

  function toggleAspect(id) {
    setSelectedAspects(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  async function getBeautyTips() {
    setLoading(true); setError(''); setResult('')
    try {
      const text = await callClaudeBeauty(pageDesc, selectedAspects, selectedTheme)
      setResult(text)
    } catch {
      setError('AI 老师暂时没有响应，请稍后再试。')
    } finally {
      setLoading(false)
    }
  }

  async function getTwoStyles() {
    setTwoStyleLoading(true); setTwoStyleError(''); setTwoStyleResult('')
    try {
      const text = await callClaudeTwoStyles(pageDesc)
      setTwoStyleResult(text)
    } catch {
      setTwoStyleError('AI 老师暂时没有响应，请稍后再试。')
    } finally {
      setTwoStyleLoading(false)
    }
  }

  const sections = [
    /* 0 今天做什么 */
    <div>
      <InfoCard accent={accent}>
        <h3 style={{ color: accent, margin: '0 0 8px' }}>🎨 今天：让 AI 把你的网页从 1.0 变成 2.0</h3>
        <p style={{ margin: 0, lineHeight: 1.8, fontSize: 14, color: '#cbd5e1' }}>
          代码能跑不代表网页好看。今天你会让 AI 帮你
          <strong style={{ color: '#f8fafc' }}>提出 3 个具体的美化建议</strong>，
          然后你来选 1-2 个落实，完成网页的视觉升级。
        </p>
      </InfoCard>
      <SectionTitle accent={accent}>📋 今天的流程</SectionTitle>
      {[
        '看一个朴素的网页，想想它哪里可以改进',
        '选你想改的方向（配色/排版/按钮…），让 AI 提 3 个建议',
        '选 1-2 个建议，记录下来（或者落实到代码里）',
        '挑战：让 AI 给两套完全不同风格，你来选',
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
        { emoji: '🖼️', title: '网页可以改什么', body: '配色、排版间距、标题字号、卡片圆角、按钮样式……每一个细节都影响整体感觉。你不需要全改，改一两个关键点就能让网页焕然一新。' },
        { emoji: '🤝', title: 'AI 出主意，你来决定', body: 'AI 给的是建议，不是命令。你有权利说"这个我不喜欢，换一个"。美化的最终决定权在你手里。' },
        { emoji: '📊', title: '1.0 → 2.0 的思维', body: '网页不需要一次做到完美。先有 1.0（能跑），再有 2.0（好看），再有 3.0（好用）。每次只升级一点点，这叫迭代。' },
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
      <SectionTitle accent={accent}>👀 一个朴素网页，你来发现它的不足</SectionTitle>
      <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12, lineHeight: 1.6 }}>
        下面是一个真实可运行的网页代码，功能完整但非常朴素。你能找到几个可以改进的地方？
      </p>
      <div style={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: 12, padding: '16px', marginBottom: 14 }}>
        <pre style={{ margin: 0, fontSize: 12, color: '#e2e8f0', lineHeight: 1.7, overflowX: 'auto', fontFamily: 'monospace' }}>{PLAIN_PAGE}</pre>
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0', marginBottom: 10 }}>你能发现的问题（勾选你同意的）：</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          '没有颜色，全是白底黑字，太单调',
          '文字和边缘紧贴着，没有呼吸感（缺间距）',
          '按钮太朴素，看不出来是可以点的',
          '标题和正文看起来都差不多大',
          '没有任何视觉层次感',
        ].map((issue, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 12px', background: 'rgba(15,23,42,0.5)', borderRadius: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 16 }}>🔸</span>
            <span style={{ color: '#cbd5e1', fontSize: 13 }}>{issue}</span>
          </div>
        ))}
      </div>
    </div>,

    /* 3 自己动手做 */
    <div>
      <SectionTitle accent={accent}>🛠️ 描述你的网页，选方向，让 AI 给建议</SectionTitle>

      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0', marginBottom: 6 }}>你的网页是关于什么的？</div>
        <textarea
          value={pageDesc}
          onChange={e => setPageDesc(e.target.value)}
          rows={2}
          style={{
            width: '100%', borderRadius: 10, border: `1.5px solid ${accent}40`,
            padding: '10px 12px', fontSize: 13, background: 'rgba(15,23,42,0.8)',
            color: '#f8fafc', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit', lineHeight: 1.6,
          }}
        />
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0', marginBottom: 8 }}>你想重点改哪些方面？（可多选）</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {BEAUTY_ASPECTS.map(a => (
            <button
              key={a.id}
              onClick={() => toggleAspect(a.id)}
              style={{
                border: `2px solid ${selectedAspects.includes(a.id) ? accent : 'rgba(148,163,184,0.2)'}`,
                background: selectedAspects.includes(a.id) ? `${accent}20` : 'rgba(15,23,42,0.5)',
                borderRadius: 10, padding: '10px', cursor: 'pointer', textAlign: 'left',
              }}
            >
              <div style={{ fontSize: 18, marginBottom: 2 }}>{a.emoji}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: selectedAspects.includes(a.id) ? '#fbcfe8' : '#e2e8f0' }}>{a.label}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{a.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0', marginBottom: 8 }}>风格偏好：</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {STYLE_THEMES.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTheme(t.id)}
              style={{
                border: `2px solid ${selectedTheme === t.id ? accent : 'rgba(148,163,184,0.2)'}`,
                background: selectedTheme === t.id ? `${accent}20` : 'rgba(15,23,42,0.5)',
                borderRadius: 10, padding: '10px', cursor: 'pointer', textAlign: 'left',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: selectedTheme === t.id ? '#fbcfe8' : '#e2e8f0', marginBottom: 3 }}>{t.label}</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <AiCallButton onClick={getBeautyTips} loading={loading} label="🎨 让 AI 给我 3 个美化建议" accent={accent} />
      <AiResult text={result} error={error} accent={accent} />

      {result && (
        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0', marginBottom: 8 }}>✅ 你打算采纳哪个建议？</div>
          <textarea
            value={chosenSuggestion}
            onChange={e => setChosenSuggestion(e.target.value)}
            placeholder="例如：我打算先改配色，把背景换成浅蓝色，按钮换成圆角加粉色……"
            rows={3}
            style={{
              width: '100%', borderRadius: 10, border: `1.5px solid ${accent}40`,
              padding: '10px 12px', fontSize: 13, background: 'rgba(15,23,42,0.8)',
              color: '#f8fafc', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit', lineHeight: 1.6,
            }}
          />
        </div>
      )}
    </div>,

    /* 4 让AI帮你一次（挑战两套风格） */
    <div>
      <SectionTitle accent={accent}>🤝 进阶：让 AI 给 2 套完全不同的风格</SectionTitle>
      <InfoCard accent={accent}>
        <p style={{ margin: 0, fontSize: 14, color: '#fce7f3', lineHeight: 1.7 }}>
          不满足于一套方案？让 AI 给你两套截然不同的风格，
          你来决定哪套更适合你的网页！
        </p>
      </InfoCard>
      <AiCallButton onClick={getTwoStyles} loading={twoStyleLoading} label="✨ 生成 2 套对比风格方案" accent={accent} />
      <AiResult text={twoStyleResult} error={twoStyleError} accent={accent} />
      {twoStyleResult && (
        <InfoCard accent="#10b981" style={{ marginTop: 12 }}>
          <p style={{ margin: 0, fontSize: 13, color: '#d1fae5', lineHeight: 1.7 }}>
            💡 两套方案有没有你更喜欢的？选定之后，把你想改的那几行 CSS 复制到你的代码里试试看效果！
          </p>
        </InfoCard>
      )}
    </div>,

    /* 5 常见问题 */
    <div>
      <SectionTitle accent={accent}>❓ 常见问题</SectionTitle>
      {[
        { q: 'AI 给的代码我复制过去但没效果怎么办？', a: '检查这几件事：① CSS 是不是放在 <style> 标签里？② 选择器有没有对应你实际的元素？③ 有没有覆盖了已有样式？如果还是不行，把报错信息或截图告诉 AI。' },
        { q: '美化要花多少时间？', a: '每次改一个地方，保存刷新看效果。不需要一次把所有建议都落实。先选一个最想改的，5分钟就能看到变化！' },
        { q: '我完全不懂 CSS，怎么落实 AI 的建议？', a: '让 AI 给你一段可以直接复制进去的 CSS 代码。你告诉 AI："我完全不懂 CSS，给我一段可以直接粘贴进去的代码，并告诉我粘贴在哪里。"' },
        { q: '美化做完了但感觉还不好看怎么办？', a: '没关系！迭代是正常的。告诉 AI "我已经改了配色，但还是感觉缺少什么，能帮我再提一个建议吗？"一步一步来。' },
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
        <h4 style={{ color: '#fed7aa', margin: '0 0 8px' }}>挑战：让 AI 给 2 套风格，你做选择</h4>
        <p style={{ margin: 0, fontSize: 13, color: '#ffedd5', lineHeight: 1.7 }}>
          在第5节（让AI帮你一次）生成两套风格方案，然后：
        </p>
      </InfoCard>
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          '在两套方案里选你更喜欢的那一套，试着把配色改了看看',
          '截图（或记录）你改前 vs 改后的对比——这就是你的 1.0→2.0 记录',
          '如果你的网页代码在本地，直接把 AI 给的 CSS 粘贴进去，刷新看效果',
        ].map((c, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 14px', background: 'rgba(15,23,42,0.5)', borderRadius: 10 }}>
            <span style={{ color: accent, fontWeight: 800, minWidth: 20 }}>💡</span>
            <span style={{ color: '#e2e8f0', fontSize: 13, lineHeight: 1.6 }}>{c}</span>
          </div>
        ))}
      </div>
    </div>,

    /* 7 本课作品输出 */
    <div>
      <SectionTitle accent={accent}>🏆 本课作品：网页 1.0 → 2.0 对比记录</SectionTitle>
      <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 14, lineHeight: 1.6 }}>
        记录你今天做的美化决定。哪怕只是决定了"要改什么"也算！
      </p>

      <div style={{ background: 'rgba(15,23,42,0.7)', border: `2px solid ${accent}`, borderRadius: 14, padding: '18px', marginBottom: 16 }}>
        <div style={{ fontWeight: 800, color: accent, fontSize: 15, marginBottom: 14 }}>🎨 我的网页美化记录</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '12px' }}>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 6, fontWeight: 700 }}>📌 网页 1.0（改之前）</div>
            <div style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.6 }}>
              {pageDesc || '一个朴素的网页，没有配色，没有间距'}
            </div>
          </div>
          <div style={{ background: `${accent}10`, borderRadius: 10, padding: '12px' }}>
            <div style={{ fontSize: 12, color: accent, marginBottom: 6, fontWeight: 700 }}>🚀 网页 2.0（我打算改的）</div>
            <div style={{ fontSize: 13, color: '#fbcfe8', lineHeight: 1.6 }}>
              {chosenSuggestion || result ? (chosenSuggestion || '根据 AI 建议进行美化升级') : '先去"动手做"让 AI 给建议吧'}
            </div>
          </div>
        </div>
        {result && (
          <div style={{ marginTop: 12, padding: '10px 12px', background: `${accent}08`, borderRadius: 8, fontSize: 12, color: '#f9a8d4' }}>
            AI 给的建议摘要：{result.slice(0, 100)}…
          </div>
        )}
      </div>

      <button
        onClick={() => setOutputSaved(true)}
        style={{
          width: '100%', padding: '14px', borderRadius: 12, border: 'none',
          background: accent, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 14,
        }}
      >
        💾 保存我的美化记录！
      </button>

      {outputSaved && (
        <OutputCard title="✅ 美化记录已保存！" accent={accent}>
          <div style={{ fontSize: 13, color: '#fbcfe8', lineHeight: 1.8 }}>
            你完成了 1.0 → 2.0 的升级规划。记住：<br />
            <strong>• 不要一次改所有东西</strong>——一次一个地方<br />
            <strong>• 改完就刷新看效果</strong>——眼见为实<br />
            <strong>• AI 的建议是参考</strong>——最终决定是你的<br />
            <br />
            ✅ 第34课完成！你掌握了用 AI 进行网页美化设计！
          </div>
        </OutputCard>
      )}

      <InfoCard accent="#6b7280" style={{ marginTop: 14 }}>
        <p style={{ margin: 0, fontSize: 13, color: '#cbd5e1', lineHeight: 1.7 }}>
          📌 <strong>下一课预告</strong>：你学会了让 AI 帮你美化网页。
          下一课，你会进一步学习让 AI 帮你<strong>升级作品的功能</strong>——加按钮、加图片切换、加小问答，
          而不是推翻重做！
        </p>
      </InfoCard>
    </div>,
  ]

  return (
    <LessonNewStructure
      onBack={onBack}
      accent={accent}
      module="模块 H · AI 协作开发"
      lessonNum={34}
      title="让 AI 帮我美化网页"
      subtitle="AI UI Beautifier · 从 1.0 到 2.0"
      sections={sections}
    />
  )
}
