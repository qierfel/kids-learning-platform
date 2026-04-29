import { corsHeaders, getSessionFromRequest, json, listUserUsageSummaries, readRecentUsage } from './_usage.js'

export async function onRequestPost(context) {
  const { request, env } = context
  const KV = env.KV
  if (!KV) return json({ error: 'KV not configured' }, 500)

  let body
  try { body = await request.json() } catch { return json({ error: 'Invalid JSON' }, 400) }
  const session = await getSessionFromRequest(KV, request, body)
  if (!session) return json({ error: 'Unauthorized' }, 401)

  const userRaw = await KV.get(`user:${session.uid}`)
  if (!userRaw) return json({ error: 'Unauthorized' }, 401)
  const user = JSON.parse(userRaw)
  if (user.role !== 'admin') return json({ error: 'Admin only' }, 403)

  const { action = 'summary', uid = '' } = body
  if (action === 'summary') {
    const users = await listUserUsageSummaries(KV)
    const totals = users.reduce((acc, row) => {
      const month = row.month || {}
      acc.requests += Number(month.requests || 0)
      acc.success += Number(month.success || 0)
      acc.failed += Number(month.failed || 0)
      acc.totalTokens += Number(month.totalTokens || 0)
      acc.estCostUsd += Number(month.estCostUsd || 0)
      return acc
    }, { requests: 0, success: 0, failed: 0, totalTokens: 0, estCostUsd: 0 })
    return json({ users, totals })
  }

  if (action === 'recent') {
    if (!uid) return json({ error: 'uid required' }, 400)
    const events = await readRecentUsage(KV, uid)
    return json({ events })
  }

  return json({ error: `Unknown action: ${action}` }, 400)
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders() })
}
