/**
 * Cloudflare Pages Function: /media/* 代理
 *
 * 将所有 /media/... 请求转发到本地媒体服务器（通过 Cloudflare Tunnel 暴露）
 * 在 CF Pages 环境变量中设置：MEDIA_SERVER_URL = https://media.qierfel-kid.com
 */
export async function onRequest({ request, params, env }) {
  const base = env.MEDIA_SERVER_URL
  if (!base) {
    return new Response('媒体服务器未配置（缺少 MEDIA_SERVER_URL 环境变量）', { status: 503 })
  }

  const filePath = (params.path || []).join('/')
  const targetUrl = `${base.replace(/\/$/, '')}/${filePath}`

  // 视频文件直接重定向到媒体服务器，绕过 Worker 代理
  // （CF Workers 不适合代理大文件，视频 seek 会失效）
  const ext = filePath.split('.').pop().toLowerCase()
  if (ext === 'mp4' || ext === 'webm' || ext === 'mov') {
    return Response.redirect(targetUrl, 302)
  }

  // 音频/PDF 走代理透传
  const headers = new Headers()
  for (const h of ['range', 'accept', 'accept-encoding', 'if-range']) {
    if (request.headers.has(h)) headers.set(h, request.headers.get(h))
  }

  try {
    const upstream = await fetch(targetUrl, { headers, method: 'GET' })
    const resHeaders = new Headers()
    for (const h of ['content-type', 'content-length', 'content-range', 'accept-ranges', 'last-modified']) {
      if (upstream.headers.has(h)) resHeaders.set(h, upstream.headers.get(h))
    }
    resHeaders.set('cache-control', 'public, max-age=86400')
    return new Response(upstream.body, { status: upstream.status, headers: resHeaders })
  } catch (e) {
    return new Response(`媒体服务器无法连接：${e.message}`, { status: 502 })
  }
}
