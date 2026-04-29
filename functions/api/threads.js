// Cloudflare Pages Function — Chat thread storage (replaces Firestore)
// POST /api/threads
// Body: { action: 'list'|'create'|'update', token: '...', ...params }

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

  return json({ error: `Unknown action: ${action}` }, 400)
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders() })
}

async function handleList(KV, uid) {
  const listRaw = await KV.get(`threads:list:${uid}`)
  const ids = listRaw ? JSON.parse(listRaw) : []
  const threads = await Promise.all(ids.map(async id => {
    const raw = await KV.get(`thread:${id}`)
    return raw ? JSON.parse(raw) : null
  }))
  return json({ threads: threads.filter(Boolean).sort((a, b) => b.createdAt - a.createdAt) })
}

async function handleCreate(KV, uid, body) {
  const { userName, subject, teacherRole = 'academic', content, messages } = body
  const id = generateId()
  const now = Date.now()
  const thread = { id, userId: uid, userName, subject, teacherRole, content, messages: messages || [], createdAt: now, updatedAt: now }

  await KV.put(`thread:${id}`, JSON.stringify(thread))

  const listRaw = await KV.get(`threads:list:${uid}`)
  const ids = listRaw ? JSON.parse(listRaw) : []
  await KV.put(`threads:list:${uid}`, JSON.stringify([id, ...ids]))

  return json({ thread })
}

async function handleUpdate(KV, uid, body) {
  const { id, messages, teacherRole } = body
  if (!id) return json({ error: 'id required' }, 400)

  const raw = await KV.get(`thread:${id}`)
  if (!raw) return json({ error: 'Thread not found' }, 404)
  const thread = JSON.parse(raw)
  if (thread.userId !== uid) return json({ error: 'Forbidden' }, 403)

  thread.messages = messages
  if (teacherRole) thread.teacherRole = teacherRole
  thread.updatedAt = Date.now()
  await KV.put(`thread:${id}`, JSON.stringify(thread))

  return json({ thread })
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
