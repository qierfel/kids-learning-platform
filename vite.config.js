import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  base: (process.env.NETLIFY || process.env.VERCEL || process.env.CF_PAGES) ? '/' : '/kids-learning-platform/',
  plugins: [
    react(),
    // 本地媒体文件服务插件（仅开发模式）
    // 支持 HTTP Range 请求，视频/音频 seek 正常工作
    {
      name: 'local-media-server',
      configureServer(server) {
        const MEDIA_DIR = process.env.MEDIA_DIR || '/Volumes/D/kids-learning-media'
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
