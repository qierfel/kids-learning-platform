// Cloudflare Pages Function — OpenAI Realtime API ephemeral session token
// POST /api/realtime-session  { level: 'KET' | 'PET' | 'FCE' }
// Returns OpenAI session object containing client_secret for WebRTC signaling
import { estimateCostUsd, getSessionFromRequest, recordUsage } from './_usage.js'

const LEVEL_CTX = {
  KET: 'The student is a beginner (A2). Speak slowly and clearly. Use very simple vocabulary and short sentences. Keep corrections simple and highly encouraging.',
  PET: 'The student is at elementary level (B1). Use common vocabulary at a moderate pace. Gently correct errors and introduce new words occasionally.',
  FCE: 'The student is at intermediate level (B2). Use varied vocabulary at a natural conversational pace. Actively suggest richer expressions and more sophisticated vocabulary.',
}

const BASE_INSTRUCTIONS = `You are Emma, a warm and encouraging English tutor for young learners.
Speak naturally and conversationally. Keep each response to 2-3 sentences, then ask one follow-up question.
React enthusiastically to what the student shares. Never say you are an AI.

Grammar correction: When the student makes a grammar error, gently say the correct version naturally. For example: "Almost! We actually say '[correct version]'" — then continue the conversation.

Expression improvement: When the student uses awkward or unnatural phrasing, offer a better alternative: "You could also say '[natural version]' — it sounds great!"

Vocabulary expansion: Occasionally introduce a useful new word related to the topic. Keep it brief: "By the way, a great word here is '___' — it means ___."

Expression enrichment: When the student uses a very simple sentence, model a richer version: "Nice! You could also say '[expanded version]' — that adds more colour."

Only correct the single most important mistake per turn. Prioritise keeping the conversation flowing naturally over heavy correction.`

export async function onRequestPost(context) {
  const { request, env } = context
  const KV = env.KV
  const startedAt = Date.now()

  if (!env.OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: 'OPENAI_API_KEY not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let body = {}
  let level = 'KET'
  try {
    body = await request.json()
    if (body.level && LEVEL_CTX[body.level]) level = body.level
  } catch {}

  const session = await getSessionFromRequest(KV, request, body)
  let user = null
  if (session?.uid && KV) {
    const userRaw = await KV.get(`user:${session.uid}`)
    user = userRaw ? JSON.parse(userRaw) : null
  }

  const instructions = `${BASE_INSTRUCTIONS}\n\n${LEVEL_CTX[level]}`

  const resp = await fetch('https://api.openai.com/v1/realtime/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-realtime-preview',
      voice: 'alloy',
      instructions,
      input_audio_transcription: { model: 'whisper-1' },
      turn_detection: {
        type: 'server_vad',
        threshold: 0.5,
        prefix_padding_ms: 300,
        silence_duration_ms: 600,
      },
    }),
  })

  const data = await resp.json()

  if (!resp.ok) {
    if (user) {
      await recordUsage(KV, {
        uid: user.uid,
        email: user.email,
        nickname: user.nickname,
        endpoint: 'realtime-session',
        provider: 'openai',
        model: 'gpt-4o-realtime-preview',
        success: false,
        latencyMs: Date.now() - startedAt,
        estCostUsd: 0,
        metadata: { level },
      })
    }
    return new Response(
      JSON.stringify({ error: data.error?.message || `OpenAI error ${resp.status}` }),
      { status: resp.status, headers: { 'Content-Type': 'application/json' } }
    )
  }

  if (user) {
    await recordUsage(KV, {
      uid: user.uid,
      email: user.email,
      nickname: user.nickname,
      endpoint: 'realtime-session',
      provider: 'openai',
      model: 'gpt-4o-realtime-preview',
      success: true,
      latencyMs: Date.now() - startedAt,
      estCostUsd: 0,
      metadata: { level },
    })
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
}
