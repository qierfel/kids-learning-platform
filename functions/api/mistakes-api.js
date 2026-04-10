// Cloudflare Pages Function — Mistake book storage (replaces Firestore)
// POST /api/mistakes-api
// Body: { action: 'list'|'create'|'update'|'delete', token: '...', ...params }

export async function onRequestPost(context) {
  const { request, env } = context
  const KV = env.KV
  if (!KV) return json({ error: 'KV not configured' }, 500)

  let body
  try { body = await request.json() } catch { return json({ error: 'Invalid JSON' }, 400) }

  const { action, token } = body
  const session = await getSession(KV, token)
  if (!session) return json({ error: 'Unauthorized' }, 401)

  if (action === 'list')   return handleList(KV, session.uid)
  if (action === 'create') return handleCreate(KV, session.uid, body)
  if (action === 'update') return handleUpdate(KV, session.uid, body)
  if (action === 'delete') return handleDelete(KV, session.uid, body)

  return json({ error: `Unknown action: ${action}` }, 400)
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders() })
}

async function handleList(KV, uid) {
  const listRaw = await KV.get(`mistakes:list:${uid}`)
  const ids = listRaw ? JSON.parse(listRaw) : []
  const items = await Promise.all(ids.map(async id => {
    const raw = await KV.get(`mistake:${id}`)
    return raw ? JSON.parse(raw) : null
  }))
  return json({ mistakes: items.filter(Boolean).sort((a, b) => b.createdAt - a.createdAt) })
}

async function handleCreate(KV, uid, body) {
  const { subject, topic, grade, question, myAnswer, correctAnswer } = body
  const id = generateId()
  const now = Date.now()
  const mistake = {
    id, userId: uid, subject, topic, grade,
    question, myAnswer, correctAnswer,
    status: 'new', explanation: null, similarQuestions: null, createdAt: now,
  }

  await KV.put(`mistake:${id}`, JSON.stringify(mistake))

  const listRaw = await KV.get(`mistakes:list:${uid}`)
  const ids = listRaw ? JSON.parse(listRaw) : []
  await KV.put(`mistakes:list:${uid}`, JSON.stringify([id, ...ids]))

  return json({ mistake })
}

async function handleUpdate(KV, uid, body) {
  const { id, action, token, ...updates } = body
  if (!id) return json({ error: 'id required' }, 400)

  const raw = await KV.get(`mistake:${id}`)
  if (!raw) return json({ error: 'Mistake not found' }, 404)
  const mistake = JSON.parse(raw)
  if (mistake.userId !== uid) return json({ error: 'Forbidden' }, 403)

  Object.assign(mistake, updates, { updatedAt: Date.now() })
  await KV.put(`mistake:${id}`, JSON.stringify(mistake))

  return json({ mistake })
}

async function handleDelete(KV, uid, body) {
  const { id } = body
  if (!id) return json({ error: 'id required' }, 400)

  const raw = await KV.get(`mistake:${id}`)
  if (!raw) return json({ error: 'Mistake not found' }, 404)
  const mistake = JSON.parse(raw)
  if (mistake.userId !== uid) return json({ error: 'Forbidden' }, 403)

  await KV.delete(`mistake:${id}`)

  const listRaw = await KV.get(`mistakes:list:${uid}`)
  const ids = listRaw ? JSON.parse(listRaw) : []
  await KV.put(`mistakes:list:${uid}`, JSON.stringify(ids.filter(i => i !== id)))

  return json({ ok: true })
}

async function getSession(KV, token) {
  if (!token) return null
  const raw = await KV.get(`session:${token}`)
  return raw ? JSON.parse(raw) : null
}

function generateId() {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0')).join('')
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', ...corsHeaders() },
  })
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}
