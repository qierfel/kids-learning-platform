import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: (process.env.NETLIFY || process.env.VERCEL || process.env.CF_PAGES) ? '/' : '/kids-learning-platform/',
  plugins: [react()],
})
