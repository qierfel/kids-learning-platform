// Cloudflare Pages Function — SDP proxy for OpenAI Realtime API
// Proxies the WebRTC SDP offer/answer exchange so the browser doesn't need
// to make a cross-origin fetch to api.openai.com (which Safari blocks).
//
// POST /api/realtime-sdp?model=gpt-4o-realtime-preview
// Headers: Authorization: Bearer <ephemeral_key>
// Body: SDP offer (text/plain)
// Returns: SDP answer

export async function onRequestPost(context) {
  const { request } = context

  const url = new URL(request.url)
  const model = url.searchParams.get('model') || 'gpt-4o-realtime-preview'
  const auth = request.headers.get('Authorization')

  if (!auth) {
    return new Response(JSON.stringify({ error: 'Missing Authorization header' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const sdpOffer = await request.text()

  const resp = await fetch(
    `https://api.openai.com/v1/realtime?model=${encodeURIComponent(model)}`,
    {
      method: 'POST',
      headers: {
        Authorization: auth,
        'Content-Type': 'application/sdp',
      },
      body: sdpOffer,
    }
  )

  const body = await resp.text()

  return new Response(body, {
    status: resp.status,
    headers: {
      'Content-Type': resp.headers.get('Content-Type') || 'application/sdp',
    },
  })
}
