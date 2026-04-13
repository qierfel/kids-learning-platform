// 媒体文件 URL 工具
// 本地开发：/media/... → 由 Vite dev 中间件从 /Volumes/D/kids-learning-media 提供
// 生产环境：/media/... → https://media.qierfel-kid.com/... （Cloudflare Tunnel）

const isLocal =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

const MEDIA_HOST = isLocal ? '' : 'https://media.qierfel-kid.com'

/**
 * 将 /media/foo/bar.mp3 转换为环境对应的完整 URL
 * 非 /media/ 开头的路径原样返回
 */
export function mediaUrl(path) {
  if (!path) return path
  if (!MEDIA_HOST) return path                // 本地直接用相对路径
  if (!path.startsWith('/media/')) return path
  // /media/foo → https://media.qierfel-kid.com/foo
  return MEDIA_HOST + path.slice(6)           // 去掉 '/media' 保留 '/foo'
}
