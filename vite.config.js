import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import https from 'https'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    // 本地媒体文件服务插件（仅开发模式）
    // 支持 HTTP Range 请求，视频/音频 seek 正常工作
    {
      name: 'local-media-server',
      configureServer(server) {
        const MEDIA_DIR = process.env.MEDIA_DIR || '/Volumes/D/kids-learning-media'
        // ── /api/tts 本地代理 ──────────────────────────────────────────
        server.middlewares.use('/api/tts', async (req, res) => {
          const apiKey = process.env.OPENAI_API_KEY
          if (!apiKey) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: 'OPENAI_API_KEY not set in environment' }))
            return
          }
          const qs     = new URLSearchParams(req.url.replace(/^\?/, '').replace(/^\/\?/, ''))
          const text   = (qs.get('text') || '').slice(0, 4096)
          const voice  = ['alloy','echo','fable','onyx','nova','shimmer'].includes(qs.get('voice')) ? qs.get('voice') : 'nova'
          const model  = ['tts-1','tts-1-hd'].includes(qs.get('model')) ? qs.get('model') : 'tts-1-hd'
          if (!text.trim()) { res.writeHead(400); res.end('text required'); return }

          const body = JSON.stringify({ model, input: text, voice, response_format: 'mp3', speed: 0.9 })
          const options = {
            hostname: 'api.openai.com',
            path: '/v1/audio/speech',
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(body),
            }
          }
          const proxyReq = https.request(options, (proxyRes) => {
            res.writeHead(proxyRes.statusCode, {
              'Content-Type': 'audio/mpeg',
              'Cache-Control': 'public, max-age=604800',
            })
            proxyRes.pipe(res)
          })
          proxyReq.on('error', (e) => { res.writeHead(500); res.end(e.message) })
          proxyReq.write(body)
          proxyReq.end()
        })

        // ── /media 本地媒体文件 ─────────────────────────────────────────
        server.middlewares.use('/media', (req, res, next) => {
          const filePath = path.join(MEDIA_DIR, decodeURIComponent(req.url))
          if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return next()

          const ext  = path.extname(filePath).toLowerCase()
          const mime = ext === '.mp3' ? 'audio/mpeg'
                     : ext === '.mp4' ? 'video/mp4'
                     : ext === '.pdf' ? 'application/pdf'
                     : 'application/octet-stream'

          const stat      = fs.statSync(filePath)
          const totalSize = stat.size
          const rangeHdr  = req.headers['range']

          res.setHeader('Content-Type', mime)
          res.setHeader('Accept-Ranges', 'bytes')

          if (rangeHdr) {
            // 解析 "bytes=start-end"
            const [, rangeStr] = rangeHdr.match(/bytes=(\d*)-(\d*)/) || []
            const parts = rangeHdr.replace(/bytes=/, '').split('-')
            const start = parseInt(parts[0], 10)
            const end   = parts[1] ? parseInt(parts[1], 10) : totalSize - 1
            const chunkSize = end - start + 1

            res.writeHead(206, {
              'Content-Range':  `bytes ${start}-${end}/${totalSize}`,
              'Content-Length': chunkSize,
            })
            fs.createReadStream(filePath, { start, end }).pipe(res)
          } else {
            res.setHeader('Content-Length', totalSize)
            res.writeHead(200)
            fs.createReadStream(filePath).pipe(res)
          }
        })
      }
    }
  ],
})
