import { useEffect, useRef, useState } from 'react'

/**
 * ImageGenLab — 让孩子直接在课程内输入提示词，让 AI 画一张图。
 *
 * props:
 *   defaultPrompt:    string    起始提示词
 *   presetPrompts:    string[]  预设提示词按钮（点击填入输入框）
 *   subject:          string    传给后端 metadata（用于追踪）
 *   accent:           string    主色，默认粉
 *   size:             "1024x1024" | "1024x1536" | "1536x1024"  默认 1024x1024
 *   quality:          "standard" | "hd"  默认 standard
 *   intro:            string    顶部说明
 *   savedKey:         string    "保存到我的作品" 的 localStorage key（可选）
 */
export default function ImageGenLab({
  defaultPrompt = '',
  presetPrompts = [],
  subject = 'ImageGenLab',
  accent = '#ec4899',
  size = '1024x1024',
  quality = 'standard',
  intro = '把你想画的画面写在下面，让 AI 帮你画一张！',
  savedKey,
}) {
  const [prompt, setPrompt] = useState(defaultPrompt)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [image, setImage] = useState(null)   // { url, revised_prompt, prompt }
  const [savedNote, setSavedNote] = useState('')
  const inflightRef = useRef(false)
  const lastPromptRef = useRef('')

  useEffect(() => {
    if (defaultPrompt && !prompt) setPrompt(defaultPrompt)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultPrompt])

  async function generate() {
    const text = prompt.trim()
    if (!text) { setError('先写一句你想画的内容～'); return }
    if (inflightRef.current) return
    if (lastPromptRef.current === text && image && !error) {
      setError('和上一张提示词一样～改几个字试试，或点"重画一张"')
      return
    }
    inflightRef.current = true
    lastPromptRef.current = text
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ prompt: text, size, quality, n: 1 }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || `HTTP ${res.status}`)
      const first = data.images?.[0]
      if (!first?.url) throw new Error('AI 没返回图片，再试一次')
      setImage({ url: first.url, revised_prompt: first.revised_prompt, prompt: text })
    } catch (e) {
      setImage(null)
      const msg = String(e?.message || '')
      if (/safety|content_policy|moderation/i.test(msg)) {
        setError('这个提示词被 AI 拦下来了，换一个更安全的描述试试 🌈')
      } else if (/rate|429/i.test(msg)) {
        setError('AI 老师有点忙，等一会儿再试 🌧️')
      } else {
        setError('生成失败：' + (msg || '未知错误'))
      }
    } finally {
      inflightRef.current = false
      setLoading(false)
    }
  }

  function retry() {
    lastPromptRef.current = ''
    generate()
  }

  function fillPreset(p) {
    setPrompt(p)
    setError('')
  }

  function saveToWorks() {
    if (!image || !savedKey) return
    try {
      const key = `imageGenLab:${savedKey}`
      const list = JSON.parse(localStorage.getItem(key) || '[]')
      list.unshift({ url: image.url, prompt: image.prompt, revised_prompt: image.revised_prompt, ts: Date.now() })
      localStorage.setItem(key, JSON.stringify(list.slice(0, 12)))
      setSavedNote('✅ 已保存到我的作品')
      setTimeout(() => setSavedNote(''), 2400)
    } catch {
      setSavedNote('⚠️ 保存失败（可能空间满了）')
      setTimeout(() => setSavedNote(''), 2400)
    }
  }

  return (
    <div style={{ background: '#fff', border: `2px solid ${accent}30`, borderRadius: 16, padding: '14px 14px 16px', marginTop: 12 }}>
      <div style={{ fontSize: 13, color: '#475569', marginBottom: 10, lineHeight: 1.6 }}>{intro}</div>

      {presetPrompts.length > 0 && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 6 }}>💡 试试这些（点一下填入）：</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {presetPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => fillPreset(p)}
                disabled={loading}
                style={{
                  padding: '5px 10px',
                  borderRadius: 999,
                  border: `1.5px solid ${accent}40`,
                  background: '#fff',
                  color: accent,
                  fontSize: 12,
                  cursor: loading ? 'wait' : 'pointer',
                  textAlign: 'left',
                  maxWidth: '100%',
                }}
              >
                {p.length > 26 ? p.slice(0, 26) + '…' : p}
              </button>
            ))}
          </div>
        </div>
      )}

      <textarea
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="比如：一只戴着宇航员头盔的橙色猫咪，在星空下望向地球，水彩风格，温暖光线，超清晰"
        maxLength={500}
        disabled={loading}
        style={{
          width: '100%',
          border: `2px solid ${accent}40`,
          borderRadius: 10,
          padding: '10px 12px',
          fontSize: 13,
          fontFamily: 'inherit',
          minHeight: 80,
          resize: 'vertical',
          boxSizing: 'border-box',
          outline: 'none',
          background: loading ? '#f8fafc' : '#fff',
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, gap: 8, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: '#94a3b8' }}>{prompt.length}/500</span>
        <button
          onClick={generate}
          disabled={loading || !prompt.trim()}
          style={{
            padding: '8px 18px',
            background: loading ? '#cbd5e1' : (!prompt.trim() ? '#e2e8f0' : accent),
            color: !prompt.trim() && !loading ? '#94a3b8' : '#fff',
            border: 'none',
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 700,
            cursor: loading ? 'wait' : (!prompt.trim() ? 'not-allowed' : 'pointer'),
          }}
        >
          {loading ? '⏳ AI 正在画…(10–30 秒)' : '🎨 让 AI 画一张'}
        </button>
      </div>

      {loading && (
        <div style={{ marginTop: 14, padding: '24px 16px', background: '#f8fafc', border: '1.5px dashed #cbd5e1', borderRadius: 12, textAlign: 'center', color: '#64748b', fontSize: 13, lineHeight: 1.7 }}>
          🎨 AI 正在帮你画…<br />
          <span style={{ fontSize: 12, color: '#94a3b8' }}>第一张图通常 10–30 秒，请耐心等待</span>
        </div>
      )}

      {error && !loading && (
        <div style={{ marginTop: 12, fontSize: 13, color: '#b91c1c', background: '#fff5f5', border: '1px solid #fca5a5', borderRadius: 8, padding: '8px 12px' }}>
          {error}
        </div>
      )}

      {image && !loading && (
        <div style={{ marginTop: 14, background: '#f8fafc', border: `2px solid ${accent}30`, borderRadius: 14, padding: '12px' }}>
          <img
            src={image.url}
            alt={image.prompt}
            style={{ width: '100%', maxWidth: 520, display: 'block', margin: '0 auto', borderRadius: 10, background: '#fff' }}
          />
          {image.revised_prompt && image.revised_prompt !== image.prompt && (
            <div style={{ marginTop: 10, fontSize: 12, color: '#475569', background: '#fff', borderRadius: 8, padding: '8px 10px', lineHeight: 1.6 }}>
              <strong style={{ color: accent }}>AI 理解后的描述：</strong> {image.revised_prompt}
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={retry}
              style={{
                padding: '7px 14px',
                background: '#fff',
                color: accent,
                border: `1.5px solid ${accent}`,
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              🔄 重画一张
            </button>
            {savedKey && (
              <button
                onClick={saveToWorks}
                style={{
                  padding: '7px 14px',
                  background: accent,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                💾 保存到我的作品
              </button>
            )}
            <a
              href={image.url}
              download={`ai-image-${Date.now()}.png`}
              style={{
                padding: '7px 14px',
                background: '#fff',
                color: '#475569',
                border: '1.5px solid #cbd5e1',
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              ⬇️ 下载
            </a>
          </div>
          {savedNote && (
            <div style={{ marginTop: 8, fontSize: 12, color: '#15803d', textAlign: 'center', fontWeight: 600 }}>{savedNote}</div>
          )}
        </div>
      )}
    </div>
  )
}
