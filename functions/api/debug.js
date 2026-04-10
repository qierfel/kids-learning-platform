// Temporary debug endpoint
export async function onRequestGet(context) {
  const { env } = context
  const apiKey = env.ANTHROPIC_API_KEY

  if (!apiKey) {
    return resp({ error: 'ANTHROPIC_API_KEY not set', envKeys: Object.keys(env) })
  }

  // Try a minimal Anthropic API call
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 20,
        messages: [{ role: 'user', content: 'say hi' }],
      }),
    })
    const text = await res.text()
    return resp({
      apiKeyPrefix: apiKey.slice(0, 12) + '...',
      status: res.status,
      statusText: res.statusText,
      body: text.slice(0, 500),
    })
  } catch (e) {
    return resp({ fetchError: e.message })
  }
}

function resp(data) {
  return new Response(JSON.stringify(data, null, 2), {
    headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  })
}
