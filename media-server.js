#!/usr/bin/env node
/**
 * 本地媒体服务器 — 运行在 Mac 上，通过 Cloudflare Tunnel 暴露给公网
 * 用法：node media-server.js
 * 默认端口：3001，媒体目录：/Volumes/D/kids-learning-media
 */
import http from 'http'
import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const PORT      = process.env.PORT      || 3001
const MEDIA_DIR = process.env.MEDIA_DIR || '/Volumes/D/kids-learning-media'

const MIME = {
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
  '.jpg': 'image/jpeg',
  '.jpeg':'image/jpeg',
  '.png': 'image/png',
  '.webp':'image/webp',
}

http.createServer((req, res) => {
  // CORS — 允许 qierfel-kid.com 和本地访问
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Range, Accept')

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return }

  const filePath = path.join(MEDIA_DIR, decodeURIComponent(req.url.split('?')[0]))

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not found: ' + req.url)
    return
  }

  const ext       = path.extname(filePath).toLowerCase()
  const mime      = MIME[ext] || 'application/octet-stream'
  const totalSize = fs.statSync(filePath).size
  const range     = req.headers['range']

  res.setHeader('Accept-Ranges', 'bytes')
  res.setHeader('Content-Type', mime)

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-')
    const start = parseInt(parts[0], 10)
    const end   = parts[1] ? parseInt(parts[1], 10) : totalSize - 1
    res.writeHead(206, {
      'Content-Range':  `bytes ${start}-${end}/${totalSize}`,
      'Content-Length': end - start + 1,
    })
    fs.createReadStream(filePath, { start, end }).pipe(res)
  } else {
    res.writeHead(200, { 'Content-Length': totalSize })
    fs.createReadStream(filePath).pipe(res)
  }
}).listen(PORT, () => {
  console.log(`✅ 媒体服务器已启动`)
  console.log(`   本地访问: http://localhost:${PORT}`)
  console.log(`   媒体目录: ${MEDIA_DIR}`)
  console.log(`   接下来运行 Cloudflare Tunnel:`)
  console.log(`   cloudflared tunnel run media-server`)
})
