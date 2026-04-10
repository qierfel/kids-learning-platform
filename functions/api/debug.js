// Temporary debug endpoint — shows env keys available in CF Pages Function
export async function onRequestGet(context) {
  const { env } = context
  const keys = Object.keys(env)
  const hasApiKey = !!env.ANTHROPIC_API_KEY
  const apiKeyPreview = env.ANTHROPIC_API_KEY
    ? `${env.ANTHROPIC_API_KEY.slice(0, 10)}...`
    : 'NOT SET'

  return new Response(JSON.stringify({
    envKeys: keys,
    hasApiKey,
    apiKeyPreview,
  }, null, 2), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
