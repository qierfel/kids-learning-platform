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

  // 透传 Range、Accept 等请求头（支持音视频 seek）
  const headers = new Headers()
  const passHeaders = ['range', 'accept', 'accept-encoding', 'if-range']
  for (const h of passHeaders) {
    if (request.headers.has(h)) headers.set(h, request.headers.get(h))
  }

  try {
    const upstream = await fetch(targetUrl, { headers, method: 'GET' })
    // 透传响应头
    const resHeaders = new Headers()
    const copyHeaders = ['content-type', 'content-length', 'content-range', 'accept-ranges', 'last-modified']
    for (const h of copyHeaders) {
      if (upstream.headers.has(h)) resHeaders.set(h, upstream.headers.get(h))
    }
    resHeaders.set('cache-control', 'public, max-age=86400')
    return new Response(upstream.body, { status: upstream.status, headers: resHeaders })
  } catch (e) {
    return new Response(`媒体服务器无法连接：${e.message}`, { status: 502 })
  }
}
