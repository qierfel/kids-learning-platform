import { useRef, useState } from 'react'

/**
 * PromptCompareLab — 让孩子直观感受"提示词不同 → AI 回答不同"。
 *
 * props:
 *   prompts:  [{ id, label, text, tone? }]   // 2-3 条提示词，按"差→好"顺序排列
 *   subject:  string                          // 传给 /api/claude 的 subject 字段
 *   accent:   string                          // 主色（与所在课程一致）
 *   hint:     string                          // 全部跑完后的小总结
 *   intro:    string                          // 顶部说明
 *   allowCustom: boolean                      // 是否提供"我自己写"输入框
 *   customLabel: string                       // 自定义提示词的标题
 *   customPlaceholder: string
 */
export default function PromptCompareLab({
  prompts,
  subject,
  accent = '#8b5cf6',
  hint = '提示词越具体、越能说清你想要什么，AI 的回答就越有用 ✨',
  intro = '点下面的按钮，让 AI 用每条提示词分别回答，看看差别！',
  allowCustom = false,
  customLabel = '✏️ 你自己写一条提示词',
  customPlaceholder = '把你自己的提示词写在这里，按下按钮看看 AI 怎么回答',
}) {
  const [results, setResults] = useState({}) // { [id]: text }
  const [loading, setLoading] = useState({}) // { [id]: bool }
  const [errors, setErrors] = useState({}) // { [id]: string }
  const [batchLoading, setBatchLoading] = useState(false)
  const [customText, setCustomText] = useState('')
  const inflightRef = useRef({}) // dedupe in-flight requests by id

  async function runOne(id, text) {
    if (!text || !text.trim()) return
    if (inflightRef.current[id]) return
    inflightRef.current[id] = true
    setLoading(s => ({ ...s, [id]: true }))
    setErrors(s => ({ ...s, [id]: '' }))
    try {
      const system = `你是一个面向10-12岁孩子的AI编程老师。
你的任务是直接回答孩子的提问，并让他们清楚看见"提示词质量不同，回答效果也不同"。
规则：
- 用简单中文
- 优先给可执行内容
- 不要自称AI
- 回答长度控制在120字内，除非用户明确要求更长
`
      const res = await fetch('/api/openai-text', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          system,
          messages: [{ role: 'user', content: text.trim() }],
          reasoningEffort: 'medium',
          verbosity: 'medium',
          maxOutputTokens: 260,
          metadata: { subject: subject || 'PromptCompareLab' },
        }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || `HTTP ${res.status}`)
      setResults(r => ({ ...r, [id]: data.text || '' }))
    } catch {
      setErrors(s => ({ ...s, [id]: 'AI 老师有点忙，等一下再试 🌧️' }))
    } finally {
      inflightRef.current[id] = false
      setLoading(s => ({ ...s, [id]: false }))
    }
  }

  async function runAll() {
    if (batchLoading) return
    setBatchLoading(true)
    try {
      await Promise.all(prompts.map(p => runOne(p.id, p.text)))
    } finally {
      setBatchLoading(false)
    }
  }

  const allDone = prompts.every(p => results[p.id])

  return (
    <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '14px 14px 16px', marginTop: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
        <div style={{ fontSize: 13, color: '#475569', flex: 1, minWidth: 160 }}>{intro}</div>
        <button
          onClick={runAll}
          disabled={batchLoading}
          style={{
            padding: '7px 14px',
            background: batchLoading ? '#cbd5e1' : accent,
            color: '#fff',
            border: 'none',
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            cursor: batchLoading ? 'wait' : 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {batchLoading ? '⏳ 全部生成中…' : '🚀 一起跑（让 AI 都回答）'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {prompts.map((p, i) => {
          const isLoading = !!loading[p.id]
          const result = results[p.id]
          const error = errors[p.id]
          const tone = p.tone || (i === 0 ? 'weak' : i === prompts.length - 1 ? 'strong' : 'medium')
          const palette = tone === 'weak'
            ? { bg: '#fff5f5', border: '#fca5a5', label: '#b91c1c', emoji: '❌' }
            : tone === 'strong'
              ? { bg: '#f0fdf4', border: '#86efac', label: '#15803d', emoji: '✅' }
              : { bg: '#fffbeb', border: '#fde68a', label: '#b45309', emoji: '⚠️' }

          return (
            <div key={p.id} style={{ background: palette.bg, border: `1.5px solid ${palette.border}`, borderRadius: 12, padding: '11px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 160 }}>
                  <div style={{ fontWeight: 700, color: palette.label, fontSize: 13, marginBottom: 4 }}>
                    {palette.emoji} {p.label}
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: 12, background: '#fff', borderRadius: 6, padding: '6px 10px', color: '#1e293b', wordBreak: 'break-word', lineHeight: 1.6 }}>
                    "{p.text}"
                  </div>
                </div>
                <button
                  onClick={() => runOne(p.id, p.text)}
                  disabled={isLoading || batchLoading}
                  style={{
                    flexShrink: 0,
                    padding: '6px 12px',
                    background: isLoading ? '#cbd5e1' : accent,
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: isLoading ? 'wait' : 'pointer',
                  }}
                >
                  {isLoading ? '⏳ 生成中' : result ? '🔁 再试一次' : '▶ 让 AI 回答'}
                </button>
              </div>
              {error && (
                <div style={{ fontSize: 12, color: '#b91c1c', background: '#fff', borderRadius: 6, padding: '6px 10px', marginTop: 6 }}>
                  {error}
                </div>
              )}
              {result && !error && (
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 12px', fontSize: 13, color: '#1e293b', lineHeight: 1.8, whiteSpace: 'pre-wrap', marginTop: 4 }}>
                  {result}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {allDone && (
        <div style={{ marginTop: 12, background: '#f0fdf4', border: '2px solid #86efac', borderRadius: 12, padding: '12px 14px', fontSize: 13, color: '#15803d', textAlign: 'center', fontWeight: 600 }}>
          👀 看到区别了吗？{hint}
        </div>
      )}

      {allowCustom && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px dashed #cbd5e1' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>{customLabel}</div>
          <textarea
            value={customText}
            onChange={e => setCustomText(e.target.value)}
            placeholder={customPlaceholder}
            maxLength={400}
            style={{ width: '100%', border: `2px solid ${accent}40`, borderRadius: 10, padding: '8px 12px', fontSize: 13, fontFamily: 'inherit', minHeight: 70, resize: 'vertical', boxSizing: 'border-box', outline: 'none' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, color: '#94a3b8' }}>{customText.length}/400</span>
            <button
              onClick={() => runOne('__custom__', customText)}
              disabled={!customText.trim() || loading.__custom__}
              style={{
                padding: '6px 14px',
                background: !customText.trim() ? '#e2e8f0' : (loading.__custom__ ? '#cbd5e1' : accent),
                color: !customText.trim() ? '#94a3b8' : '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                cursor: !customText.trim() ? 'not-allowed' : (loading.__custom__ ? 'wait' : 'pointer'),
              }}
            >
              {loading.__custom__ ? '⏳ AI 正在写…' : '🚀 我来试'}
            </button>
          </div>
          {errors.__custom__ && (
            <div style={{ fontSize: 12, color: '#b91c1c', background: '#fff5f5', borderRadius: 6, padding: '6px 10px', marginTop: 6 }}>
              {errors.__custom__}
            </div>
          )}
          {results.__custom__ && !errors.__custom__ && (
            <div style={{ marginTop: 8, background: '#fff', border: `2px solid ${accent}40`, borderRadius: 10, padding: '10px 12px', fontSize: 13, color: '#1e293b', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
              <div style={{ fontSize: 12, color: accent, fontWeight: 700, marginBottom: 4 }}>✍️ AI 给你的回答：</div>
              {results.__custom__}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
