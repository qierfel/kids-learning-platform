// Cloudflare Pages Function — OpenAI TTS proxy
// GET /api/tts?text=...&voice=nova&model=tts-1-hd
// Env vars needed: OPENAI_API_KEY

const ALLOWED_VOICES = new Set(['alloy','echo','fable','onyx','nova','shimmer'])
const ALLOWED_MODELS = new Set(['tts-1','tts-1-hd'])

export async function onRequestGet(context) {
  const { request, env } = context

  if (!env.OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: 'OPENAI_API_KEY not set in CF Pages env vars' }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    })
  }

  const url   = new URL(request.url)
  const text  = url.searchParams.get('text')?.slice(0, 4096)
  const voice = ALLOWED_VOICES.has(url.searchParams.get('voice'))  ? url.searchParams.get('voice')  : 'nova'
  const model = ALLOWED_MODELS.has(url.searchParams.get('model'))  ? url.searchParams.get('model')  : 'tts-1-hd'

  if (!text?.trim()) {
    return new Response(JSON.stringify({ error: 'text required' }), {
      status: 400, headers: { 'Content-Type': 'application/json' }
    })
  }

  const openaiResp = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model, input: text, voice, response_format: 'mp3', speed: 0.9 }),
  })

  if (!openaiResp.ok) {
    const err = await openaiResp.text()
    return new Response(err, { status: openaiResp.status, headers: { 'Content-Type': 'text/plain' } })
  }

  // Pass through audio with caching headers (same text = same audio)
  return new Response(openaiResp.body, {
    status: 200,
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'public, max-age=604800, immutable', // 7 days
      'X-Voice': voice,
      'X-Model': model,
    },
  })
}
