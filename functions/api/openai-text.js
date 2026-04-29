// Cloudflare Pages Function — OpenAI text proxy for coding lessons
// POST /api/openai-text
import { estimateCostUsd, getSessionFromRequest, recordUsage } from './_usage.js'

function extractText(data) {
  if (typeof data?.output_text === 'string' && data.output_text.trim()) return data.output_text.trim()

  const output = Array.isArray(data?.output) ? data.output : []
  const chunks = []
  for (const item of output) {
    const content = Array.isArray(item?.content) ? item.content : []
    for (const block of content) {
      if (block?.type === 'output_text' && block.text) chunks.push(block.text)
      if (block?.type === 'text' && block.text) chunks.push(block.text)
    }
  }
  return chunks.join('\n').trim()
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function onRequestPost(context) {
  const { request, env } = context
  const KV = env.KV
  const startedAt = Date.now()

  if (!env.OPENAI_API_KEY) {
    return json({ error: 'OPENAI_API_KEY not configured' }, 500)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const session = await getSessionFromRequest(KV, request, body)
  let user = null
  if (session?.uid && KV) {
    const userRaw = await KV.get(`user:${session.uid}`)
    user = userRaw ? JSON.parse(userRaw) : null
  }

  const {
    system = '',
    messages = [],
    reasoningEffort = 'medium',
    verbosity = 'medium',
    maxOutputTokens = 600,
    metadata = {},
  } = body || {}

  const input = []
  if (system?.trim()) {
    input.push({
      role: 'system',
      content: [{ type: 'input_text', text: system.trim() }],
    })
  }

  for (const message of messages) {
    const role = message?.role === 'assistant' ? 'assistant' : 'user'
    const text = String(message?.content || '').trim()
    if (!text) continue
    input.push({
      role,
      content: [{ type: 'input_text', text }],
    })
  }

  if (!input.length) {
    return json({ error: 'At least one system or message content is required' }, 400)
  }

  const resp = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-5.5',
      input,
      reasoning: { effort: reasoningEffort },
      text: { verbosity },
      max_output_tokens: maxOutputTokens,
      metadata,
    }),
  })

  const data = await resp.json()
  if (!resp.ok) {
    if (user) {
      const usage = data?.usage || {}
      const inputTokens = Number(usage.input_tokens || 0)
      const outputTokens = Number(usage.output_tokens || 0)
      const totalTokens = Number(usage.total_tokens || (inputTokens + outputTokens))
      await recordUsage(KV, {
        uid: user.uid,
        email: user.email,
        nickname: user.nickname,
        endpoint: 'openai-text',
        provider: 'openai',
        model: 'gpt-5.5',
        success: false,
        inputTokens,
        outputTokens,
        totalTokens,
        inputChars: JSON.stringify(input).length,
        latencyMs: Date.now() - startedAt,
        estCostUsd: estimateCostUsd({ provider: 'openai', model: 'gpt-5.5', inputTokens, outputTokens }),
        metadata,
      })
    }
    return json({ error: data?.error?.message || `OpenAI error ${resp.status}` }, resp.status)
  }

  const text = extractText(data)
  if (user) {
    const usage = data?.usage || {}
    const inputTokens = Number(usage.input_tokens || 0)
    const outputTokens = Number(usage.output_tokens || 0)
    const totalTokens = Number(usage.total_tokens || (inputTokens + outputTokens))
    await recordUsage(KV, {
      uid: user.uid,
      email: user.email,
      nickname: user.nickname,
      endpoint: 'openai-text',
      provider: 'openai',
      model: 'gpt-5.5',
      success: true,
      inputTokens,
      outputTokens,
      totalTokens,
      inputChars: JSON.stringify(input).length,
      outputChars: text.length,
      latencyMs: Date.now() - startedAt,
      estCostUsd: estimateCostUsd({ provider: 'openai', model: 'gpt-5.5', inputTokens, outputTokens }),
      metadata,
    })
  }
  return json({ text, raw: data })
}
