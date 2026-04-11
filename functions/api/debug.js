// Temporary debug endpoint — tests API key + KV access
export async function onRequestGet(context) {
  const { env } = context
  const results = {}

  // 1. Check API key
  const apiKey = env.ANTHROPIC_API_KEY
  results.apiKey = apiKey ? `set (${apiKey.slice(0, 12)}...)` : 'NOT SET'

  // 2. Check KV
  const KV = env.KV
  if (!KV) {
    results.kv = 'NOT BOUND'
  } else {
    try {
      await KV.put('__debug_test__', 'ok', { expirationTtl: 60 })
      const val = await KV.get('__debug_test__')
      results.kv = val === 'ok' ? 'OK (read/write working)' : `unexpected value: ${val}`
    } catch (e) {
      results.kv = `ERROR: ${e.message}`
    }
  }

  // 3. Test Anthropic API
  if (apiKey) {
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
          max_tokens: 10,
          messages: [{ role: 'user', content: 'hi' }],
        }),
      })
      results.anthropic = `HTTP ${res.status}`
      if (!res.ok) {
        const txt = await res.text()
        results.anthropicError = txt.slice(0, 200)
      }
    } catch (e) {
      results.anthropic = `fetch error: ${e.message}`
    }
  }

  return new Response(JSON.stringify(results, null, 2), {
    headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  })
}
