// Cloudflare Pages Function — Auth API (replaces Firebase Auth)
// POST /api/auth
// Body: { action: 'register'|'login'|'logout'|'me'|'poll_status'|'approve'|'reject'|'list_users', ...params }
// All state stored in Cloudflare KV (no Google/Firebase dependencies)

const SESSION_TTL = 30 * 24 * 60 * 60 // 30 days in seconds

export async function onRequestPost(context) {
  const { request, env } = context
  const KV = env.KV
  if (!KV) return json({ error: 'KV not configured. Bind KV namespace to this Pages project.' }, 500)

  let body
  try { body = await request.json() } catch { return json({ error: 'Invalid JSON' }, 400) }

  const { action } = body
  if (!action) return json({ error: 'action required' }, 400)

  if (action === 'register')    return handleRegister(KV, body)
  if (action === 'login')       return handleLogin(KV, body)
  if (action === 'logout')      return handleLogout(KV, body)
  if (action === 'me')          return handleMe(KV, body)
  if (action === 'poll_status') return handlePollStatus(KV, body)
  if (action === 'approve')     return handleSetStatus(KV, body, 'approved')
  if (action === 'reject')      return handleSetStatus(KV, body, 'rejected')
  if (action === 'list_users')  return handleListUsers(KV, body)

  return json({ error: `Unknown action: ${action}` }, 400)
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders() })
}

// ── Register ──────────────────────────────────────────────────────────────────
async function handleRegister(KV, body) {
  const { email, password, nickname } = body
  if (!email || !password || !nickname) return json({ error: '请填写邮箱、密码和昵称' }, 400)
  if (password.length < 6) return json({ error: '密码至少6位' }, 400)

  const emailKey = `user:email:${email.toLowerCase()}`
  const existingUid = await KV.get(emailKey)
  if (existingUid) return json({ error: '该邮箱已注册' }, 400)

  const allRaw = await KV.get('users:all')
  const allUids = allRaw ? JSON.parse(allRaw) : []
  const isFirstUser = allUids.length === 0

  const uid = generateId()
  const { hash, salt } = await hashPassword(password)
  const now = Date.now()

  const profile = {
    uid, email: email.toLowerCase(), nickname: nickname.trim(),
    passwordHash: hash, passwordSalt: salt,
    status: isFirstUser ? 'approved' : 'pending',
    role: isFirstUser ? 'admin' : 'user',
    createdAt: now,
  }

  await KV.put(`user:${uid}`, JSON.stringify(profile))
  await KV.put(emailKey, uid)
  await KV.put('users:all', JSON.stringify([...allUids, uid]))

  const token = generateToken()
  await KV.put(`session:${token}`, JSON.stringify({ uid, createdAt: now }), { expirationTtl: SESSION_TTL })

  return json({ token, user: sanitize(profile) })
}

// ── Login ─────────────────────────────────────────────────────────────────────
async function handleLogin(KV, body) {
  const { email, password } = body
  if (!email || !password) return json({ error: '请填写邮箱和密码' }, 400)

  const uid = await KV.get(`user:email:${email.toLowerCase()}`)
  if (!uid) return json({ error: '账号或密码错误' }, 401)

  const raw = await KV.get(`user:${uid}`)
  if (!raw) return json({ error: '账号或密码错误' }, 401)
  const profile = JSON.parse(raw)

  const ok = await verifyPassword(password, profile.passwordHash, profile.passwordSalt)
  if (!ok) return json({ error: '账号或密码错误' }, 401)

  const token = generateToken()
  await KV.put(`session:${token}`, JSON.stringify({ uid, createdAt: Date.now() }), { expirationTtl: SESSION_TTL })

  return json({ token, user: sanitize(profile) })
}

// ── Logout ────────────────────────────────────────────────────────────────────
async function handleLogout(KV, body) {
  if (body.token) await KV.delete(`session:${body.token}`)
  return json({ ok: true })
}

// ── Me ────────────────────────────────────────────────────────────────────────
async function handleMe(KV, body) {
  const profile = await fromToken(KV, body.token)
  if (!profile) return json({ error: 'Invalid or expired session' }, 401)
  return json({ user: sanitize(profile) })
}

// ── Poll status (pending users waiting for approval) ──────────────────────────
async function handlePollStatus(KV, body) {
  const profile = await fromToken(KV, body.token)
  if (!profile) return json({ error: 'Invalid or expired session' }, 401)
  return json({ status: profile.status })
}

// ── Approve / Reject ──────────────────────────────────────────────────────────
async function handleSetStatus(KV, body, newStatus) {
  const admin = await fromToken(KV, body.token)
  if (!admin) return json({ error: 'Unauthorized' }, 401)
  if (admin.role !== 'admin') return json({ error: 'Admin only' }, 403)

  const { targetUid } = body
  if (!targetUid) return json({ error: 'targetUid required' }, 400)

  const raw = await KV.get(`user:${targetUid}`)
  if (!raw) return json({ error: 'User not found' }, 404)

  const profile = JSON.parse(raw)
  profile.status = newStatus
  if (newStatus === 'approved') profile.approvedAt = Date.now()
  await KV.put(`user:${targetUid}`, JSON.stringify(profile))

  return json({ ok: true, user: sanitize(profile) })
}

// ── List users (admin only) ───────────────────────────────────────────────────
async function handleListUsers(KV, body) {
  const admin = await fromToken(KV, body.token)
  if (!admin) return json({ error: 'Unauthorized' }, 401)
  if (admin.role !== 'admin') return json({ error: 'Admin only' }, 403)

  const allRaw = await KV.get('users:all')
  const allUids = allRaw ? JSON.parse(allRaw) : []

  const users = await Promise.all(allUids.map(async uid => {
    const raw = await KV.get(`user:${uid}`)
    return raw ? sanitize(JSON.parse(raw)) : null
  }))

  return json({ users: users.filter(Boolean).sort((a, b) => b.createdAt - a.createdAt) })
}

// ── Helpers ───────────────────────────────────────────────────────────────────
async function fromToken(KV, token) {
  if (!token) return null
  const raw = await KV.get(`session:${token}`)
  if (!raw) return null
  const { uid } = JSON.parse(raw)
  const userRaw = await KV.get(`user:${uid}`)
  return userRaw ? JSON.parse(userRaw) : null
}

function sanitize({ passwordHash, passwordSalt, ...safe }) { return safe }

function generateId() {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0')).join('')
}

function generateToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0')).join('')
}

async function hashPassword(password) {
  const enc = new TextEncoder()
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, key, 256)
  const hex = arr => Array.from(new Uint8Array(arr)).map(b => b.toString(16).padStart(2, '0')).join('')
  return { hash: hex(bits), salt: hex(salt) }
}

async function verifyPassword(password, storedHash, storedSalt) {
  const enc = new TextEncoder()
  const salt = new Uint8Array(storedSalt.match(/../g).map(h => parseInt(h, 16)))
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, key, 256)
  const hash = Array.from(new Uint8Array(bits)).map(b => b.toString(16).padStart(2, '0')).join('')
  return hash === storedHash
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
