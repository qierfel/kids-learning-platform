function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', ...corsHeaders() },
  })
}

export async function getSessionFromRequest(KV, request, parsedBody = null) {
  if (!KV) return null
  const auth = request.headers.get('Authorization') || request.headers.get('authorization') || ''
  let token = ''
  if (auth.startsWith('Bearer ')) token = auth.slice(7).trim()
  if (!token && parsedBody?.token) token = parsedBody.token
  if (!token) {
    try {
      const url = new URL(request.url)
      token = url.searchParams.get('token') || ''
    } catch {}
  }
  if (!token) return null
  const raw = await KV.get(`session:${token}`)
  return raw ? JSON.parse(raw) : null
}

function todayKey(ts = Date.now()) {
  return new Date(ts).toISOString().slice(0, 10)
}

function monthKey(ts = Date.now()) {
  return new Date(ts).toISOString().slice(0, 7)
}

function usageKey(scope, id, period) {
  return `usage:${scope}:${id}:${period}`
}

function eventKey(id) {
  return `usage:event:${id}`
}

function generateId() {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0')).join('')
}

function toNumber(v) {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

function mergeSummary(prev = {}, patch = {}) {
  const next = {
    requests: toNumber(prev.requests) + toNumber(patch.requests ?? 1),
    success: toNumber(prev.success) + toNumber(patch.success ?? 0),
    failed: toNumber(prev.failed) + toNumber(patch.failed ?? 0),
    inputTokens: toNumber(prev.inputTokens) + toNumber(patch.inputTokens),
    outputTokens: toNumber(prev.outputTokens) + toNumber(patch.outputTokens),
    totalTokens: toNumber(prev.totalTokens) + toNumber(patch.totalTokens),
    inputChars: toNumber(prev.inputChars) + toNumber(patch.inputChars),
    outputChars: toNumber(prev.outputChars) + toNumber(patch.outputChars),
    audioChars: toNumber(prev.audioChars) + toNumber(patch.audioChars),
    estCostUsd: round6(toNumber(prev.estCostUsd) + toNumber(patch.estCostUsd)),
    avgLatencyMs: 0,
    totalLatencyMs: toNumber(prev.totalLatencyMs) + toNumber(patch.latencyMs),
    byEndpoint: prev.byEndpoint || {},
    byModel: prev.byModel || {},
    updatedAt: Date.now(),
  }
  next.avgLatencyMs = next.requests ? Math.round(next.totalLatencyMs / next.requests) : 0

  const endpoint = patch.endpoint || 'unknown'
  const model = patch.model || 'unknown'
  next.byEndpoint = { ...next.byEndpoint }
  next.byModel = { ...next.byModel }
  next.byEndpoint[endpoint] = mergeTiny(next.byEndpoint[endpoint], patch)
  next.byModel[model] = mergeTiny(next.byModel[model], patch)
  return next
}

function mergeTiny(prev = {}, patch = {}) {
  return {
    requests: toNumber(prev.requests) + toNumber(patch.requests ?? 1),
    success: toNumber(prev.success) + toNumber(patch.success ?? 0),
    failed: toNumber(prev.failed) + toNumber(patch.failed ?? 0),
    totalTokens: toNumber(prev.totalTokens) + toNumber(patch.totalTokens),
    estCostUsd: round6(toNumber(prev.estCostUsd) + toNumber(patch.estCostUsd)),
  }
}

function round6(n) {
  return Math.round(n * 1e6) / 1e6
}

export function estimateCostUsd({ provider, model, inputTokens = 0, outputTokens = 0, audioChars = 0 }) {
  const m = String(model || '')
  const p = String(provider || '')

  // Conservative, manually-maintained estimates for internal cost tracking only.
  if (p === 'openai' && m === 'gpt-5.5') {
    return round6((inputTokens / 1_000_000) * 1.25 + (outputTokens / 1_000_000) * 10)
  }
  if (p === 'openai' && (m === 'tts-1' || m === 'tts-1-hd')) {
    return round6((audioChars / 1_000_000) * (m === 'tts-1-hd' ? 30 : 15))
  }
  if (p === 'openai' && m.includes('realtime')) {
    return round6((inputTokens / 1_000_000) * 5 + (outputTokens / 1_000_000) * 20)
  }
  if (p === 'anthropic' && m.includes('haiku')) {
    return round6((inputTokens / 1_000_000) * 0.8 + (outputTokens / 1_000_000) * 4)
  }
  if (p === 'anthropic' && m.includes('sonnet')) {
    return round6((inputTokens / 1_000_000) * 3 + (outputTokens / 1_000_000) * 15)
  }
  return 0
}

export async function recordUsage(KV, event) {
  if (!KV || !event?.uid) return

  const now = Date.now()
  const day = todayKey(now)
  const month = monthKey(now)
  const id = generateId()
  const eventRecord = {
    id,
    ts: now,
    uid: event.uid,
    email: event.email || '',
    nickname: event.nickname || '',
    endpoint: event.endpoint || 'unknown',
    provider: event.provider || 'unknown',
    model: event.model || 'unknown',
    success: !!event.success,
    failed: event.success ? 0 : 1,
    requests: 1,
    inputTokens: toNumber(event.inputTokens),
    outputTokens: toNumber(event.outputTokens),
    totalTokens: toNumber(event.totalTokens) || (toNumber(event.inputTokens) + toNumber(event.outputTokens)),
    inputChars: toNumber(event.inputChars),
    outputChars: toNumber(event.outputChars),
    audioChars: toNumber(event.audioChars),
    latencyMs: toNumber(event.latencyMs),
    estCostUsd: round6(toNumber(event.estCostUsd)),
    metadata: event.metadata || {},
  }

  await KV.put(eventKey(id), JSON.stringify(eventRecord), { expirationTtl: 60 * 60 * 24 * 90 })

  const userDayKey = usageKey('user-day', event.uid, day)
  const userMonthKey = usageKey('user-month', event.uid, month)
  const globalDayKey = usageKey('global-day', 'all', day)
  const recentKey = `usage:recent:${event.uid}`

  const [userDayRaw, userMonthRaw, globalDayRaw, recentRaw] = await Promise.all([
    KV.get(userDayKey),
    KV.get(userMonthKey),
    KV.get(globalDayKey),
    KV.get(recentKey),
  ])

  const userDay = mergeSummary(userDayRaw ? JSON.parse(userDayRaw) : { period: day, uid: event.uid }, eventRecord)
  const userMonth = mergeSummary(userMonthRaw ? JSON.parse(userMonthRaw) : { period: month, uid: event.uid }, eventRecord)
  const globalDay = mergeSummary(globalDayRaw ? JSON.parse(globalDayRaw) : { period: day, scope: 'global' }, eventRecord)
  const recent = recentRaw ? JSON.parse(recentRaw) : []
  const nextRecent = [eventRecord, ...recent].slice(0, 50)

  await Promise.all([
    KV.put(userDayKey, JSON.stringify(userDay)),
    KV.put(userMonthKey, JSON.stringify(userMonth)),
    KV.put(globalDayKey, JSON.stringify(globalDay)),
    KV.put(recentKey, JSON.stringify(nextRecent), { expirationTtl: 60 * 60 * 24 * 31 }),
  ])
}

export async function listUserUsageSummaries(KV) {
  const raw = await KV.get('users:all')
  const uids = raw ? JSON.parse(raw) : []
  const month = monthKey()
  const day = todayKey()

  const rows = await Promise.all(uids.map(async (uid) => {
    const [userRaw, monthRaw, dayRaw] = await Promise.all([
      KV.get(`user:${uid}`),
      KV.get(usageKey('user-month', uid, month)),
      KV.get(usageKey('user-day', uid, day)),
    ])
    if (!userRaw) return null
    const user = JSON.parse(userRaw)
    return {
      uid,
      email: user.email,
      nickname: user.nickname,
      status: user.status,
      role: user.role,
      month: monthRaw ? JSON.parse(monthRaw) : null,
      today: dayRaw ? JSON.parse(dayRaw) : null,
    }
  }))
  return rows.filter(Boolean)
}

export async function readRecentUsage(KV, uid) {
  const raw = await KV.get(`usage:recent:${uid}`)
  return raw ? JSON.parse(raw) : []
}

export { corsHeaders }
