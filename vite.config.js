import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { createServer } from 'http'

// https://vite.dev/config/
export default defineConfig({
  base: (process.env.NETLIFY || process.env.VERCEL || process.env.CF_PAGES) ? '/' : '/kids-learning-platform/',
  plugins: [
    react(),
    // 本地媒体文件服务插件（仅开发模式）
    {
      name: 'local-media-server',
      configureServer(server) {
        const MEDIA_DIR = process.env.MEDIA_DIR || '/Volumes/D/kids-learning-media'
        server.middlewares.use('/media', (req, res, next) => {
          const filePath = path.join(MEDIA_DIR, decodeURIComponent(req.url))
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase()
            const mime = ext === '.mp3' ? 'audio/mpeg'
                       : ext === '.mp4' ? 'video/mp4'
                       : ext === '.pdf' ? 'application/pdf'
                       : 'application/octet-stream'
            res.setHeader('Content-Type', mime)
            res.setHeader('Accept-Ranges', 'bytes')
            fs.createReadStream(filePath).pipe(res)
          } else {
            next()
          }
        })
      }
    }
  ],
})
