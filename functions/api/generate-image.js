// Cloudflare Pages Function — OpenAI image generation + edit proxy
// POST /api/generate-image
//
// Body:
//   { prompt, inputImage?, mask?, size?, quality?, n? }
//   - prompt: string (required)
//   - inputImage: string (base64, data URL, or http(s) URL). If present → edit mode.
//   - mask: string (same formats as inputImage). Optional, only used in edit mode.
//   - size: "1024x1024" | "1024x1536" | "1536x1024" | "auto"   (default "1024x1024")
//   - quality: "standard" | "hd" | "low" | "medium" | "high" | "auto"  (default "medium")
//   - n: integer 1-4 (default 1)
//
// Response (200):
//   { images: [{ url, revised_prompt? }], mode, remaining, resetAt, ...compat }
//
// Response (429):
//   { error: "rate_limited", message, remaining: 0, resetAt }

import { getSessionFromRequest } from './_usage.js'

const MODEL = 'gpt-image-1'
const DAILY_LIMIT = 5
const KV_TTL_SECONDS = 48 * 60 * 60

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function mapQuality(q) {
  if (!q) return 'medium'
  if (q === 'hd' || q === 'high') return 'high'
  if (q === 'standard' || q === 'medium') return 'medium'
  if (q === 'low') return 'low'
  if (q === 'auto') return 'auto'
  return 'medium'
}

function normalizeSize(s) {
  const allowed = ['1024x1024', '1024x1536', '1536x1024', 'auto']
  if (allowed.includes(s)) return s
  return '1024x1024'
}

async function inputToBlob(input) {
  if (typeof input !== 'string' || !input) return null

  if (input.startsWith('http://') || input.startsWith('https://')) {
    const r = await fetch(input)
    if (!r.ok) throw new Error(`Cannot fetch image (${r.status})`)
    const buf = await r.arrayBuffer()
    const ct = r.headers.get('content-type') || 'image/png'
    return new Blob([buf], { type: ct })
  }

  let b64 = input
  let mime = 'image/png'
  const m = input.match(/^data:(image\/[\w+-]+);base64,(.+)$/)
  if (m) { mime = m[1]; b64 = m[2] }

  const bin = atob(b64.replace(/\s+/g, ''))
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  return new Blob([bytes], { type: mime })
}

function utcDateKey(ts = Date.now()) {
  return new Date(ts).toISOString().slice(0, 10)
}

function nextUtcMidnightISO(ts = Date.now()) {
  const d = new Date(ts)
  d.setUTCHours(24, 0, 0, 0)
  return d.toISOString()
}

async function reserveQuota(KV, identifier) {
  if (!KV || !identifier) return { allowed: true, remaining: DAILY_LIMIT, key: null }
  const key = `image_gen:${identifier}:${utcDateKey()}`
  let used = 0
  try {
    const raw = await KV.get(key)
    used = parseInt(raw, 10) || 0
  } catch {
    return { allowed: true, remaining: DAILY_LIMIT, key: null }
  }
  if (used >= DAILY_LIMIT) {
    return { allowed: false, remaining: 0, key }
  }
  try {
    await KV.put(key, String(used + 1), { expirationTtl: KV_TTL_SECONDS })
  } catch {
    return { allowed: true, remaining: DAILY_LIMIT - used, key: null }
  }
  return { allowed: true, remaining: DAILY_LIMIT - used - 1, key }
}

async function refundQuota(KV, key) {
  if (!KV || !key) return
  try {
    const raw = await KV.get(key)
    const used = parseInt(raw, 10) || 0
    if (used > 0) {
      await KV.put(key, String(used - 1), { expirationTtl: KV_TTL_SECONDS })
    }
  } catch {}
}

function pickImages(data) {
  const arr = Array.isArray(data?.data) ? data.data : []
  return arr.map(item => {
    if (item.b64_json) {
      return { url: `data:image/png;base64,${item.b64_json}`, revised_prompt: item.revised_prompt }
    }
    if (item.url) {
      return { url: item.url, revised_prompt: item.revised_prompt }
    }
    return { url: '', revised_prompt: item.revised_prompt }
  }).filter(x => x.url)
}

export async function onRequestPost(context) {
  const { request, env } = context

  if (!env.OPENAI_API_KEY) {
    return json({ error: 'OPENAI_API_KEY not configured' }, 500)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const prompt = String(body?.prompt || '').trim()
  if (!prompt) return json({ error: 'prompt is required' }, 400)
  if (prompt.length > 4000) return json({ error: 'prompt too long (max 4000 chars)' }, 400)

  const size = normalizeSize(body?.size)
  const quality = mapQuality(body?.quality)
  const n = Math.max(1, Math.min(4, parseInt(body?.n, 10) || 1))
  const inputImage = body?.inputImage
  const mask = body?.mask

  const session = await getSessionFromRequest(env.KV, request, body)
  const identifier = session?.uid
    || request.headers.get('CF-Connecting-IP')
    || request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim()
    || 'anon'

  const quota = await reserveQuota(env.KV, identifier)
  if (!quota.allowed) {
    return json({
      error: 'rate_limited',
      message: '今天已经画了 5 张图啦，明天再来吧～',
      remaining: 0,
      resetAt: nextUtcMidnightISO(),
    }, 429)
  }

  const editMode = !!inputImage
  let resp

  try {
    if (editMode) {
      const imageBlob = await inputToBlob(inputImage)
      if (!imageBlob) return json({ error: 'inputImage could not be parsed' }, 400)

      const form = new FormData()
      form.append('model', MODEL)
      form.append('prompt', prompt)
      form.append('size', size)
      form.append('quality', quality)
      form.append('n', String(n))
      form.append('image', imageBlob, 'image.png')

      if (mask) {
        const maskBlob = await inputToBlob(mask)
        if (maskBlob) form.append('mask', maskBlob, 'mask.png')
      }

      resp = await fetch('https://api.openai.com/v1/images/edits', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}` },
        body: form,
      })
    } else {
      resp = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL,
          prompt,
          size,
          quality,
          n,
        }),
      })
    }
  } catch (e) {
    await refundQuota(env.KV, quota.key)
    return json({ error: `Network error: ${e.message || 'unknown'}` }, 502)
  }

  let data
  try {
    data = await resp.json()
  } catch {
    await refundQuota(env.KV, quota.key)
    return json({ error: `OpenAI returned non-JSON (${resp.status})` }, 502)
  }

  if (!resp.ok) {
    await refundQuota(env.KV, quota.key)
    const msg = data?.error?.message || `OpenAI error ${resp.status}`
    return json({ error: msg, code: data?.error?.code }, resp.status)
  }

  const images = pickImages(data)
  if (!images.length) {
    await refundQuota(env.KV, quota.key)
    return json({ error: 'OpenAI returned no images' }, 502)
  }

  // Top-level compat fields for callers that didn't read the canonical
  // { images, mode } shape — keeps the homework-grading client working
  // without forcing a coordinated change there.
  const first = images[0]
  const m = first.url.match(/^data:image\/[\w+-]+;base64,(.+)$/)
  return json({
    images,
    mode: editMode ? 'edit' : 'generate',
    remaining: quota.remaining,
    resetAt: nextUtcMidnightISO(),
    url: first.url,
    ...(m ? { imageBase64: m[1], mediaType: 'image/png' } : {}),
  })
}
