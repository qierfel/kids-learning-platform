// Cloudflare Pages Function — OpenAI Realtime API ephemeral session token
// POST /api/realtime-session  { level: 'KET' | 'PET' | 'FCE' }
// Returns OpenAI session object containing client_secret for WebRTC signaling

const LEVEL_CTX = {
  KET: 'The student is a beginner. Use very simple vocabulary and short sentences. Speak slowly and clearly.',
  PET: 'The student is at elementary level. Use common vocabulary at a moderate pace.',
  FCE: 'The student is at intermediate level. Use varied vocabulary at a natural conversational pace.',
}

const BASE_INSTRUCTIONS = `You are Emma, a warm and encouraging English tutor for young learners.
Keep responses concise — 1 to 3 sentences max. Correct mistakes gently by modeling the correct form.
Ask a follow-up question after each response to keep the conversation going.
React naturally and enthusiastically to what the student shares.`

export async function onRequestPost(context) {
  const { request, env } = context

  if (!env.OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: 'OPENAI_API_KEY not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let level = 'KET'
  try {
    const body = await request.json()
    if (body.level && LEVEL_CTX[body.level]) level = body.level
  } catch {}

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
    return new Response(
      JSON.stringify({ error: data.error?.message || `OpenAI error ${resp.status}` }),
      { status: resp.status, headers: { 'Content-Type': 'application/json' } }
    )
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
}
