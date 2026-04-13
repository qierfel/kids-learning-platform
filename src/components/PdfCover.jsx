import { useEffect, useRef, useState } from 'react'

// PDF.js lazy singleton — only initialised when first cover is needed
let pdfjsLib = null
async function getPdfJs() {
  if (pdfjsLib) return pdfjsLib
  const lib = await import('pdfjs-dist')
  // Use bundled worker via a URL (Vite will copy it to /assets)
  lib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).href
  pdfjsLib = lib
  return lib
}

// Cache rendered data-URLs so we never render the same PDF twice
const coverCache = new Map()

/**
 * Renders page 1 of a PDF as an img element.
 * Falls back to <PlaceholderCover> on error or when no pdfUrl is given.
 */
export default function PdfCover({ pdfUrl, color = '#6366f1', title = '', style }) {
  const containerRef = useRef(null)
  const [src, setSrc]       = useState(coverCache.get(pdfUrl) || null)
  const [error, setError]   = useState(false)
  const [visible, setVisible] = useState(false)

  // IntersectionObserver — only start loading when card enters viewport
  useEffect(() => {
    if (!pdfUrl || src) return
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { rootMargin: '200px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [pdfUrl, src])

  // Render once visible
  useEffect(() => {
    if (!visible || !pdfUrl || src || error) return
    let cancelled = false
    ;(async () => {
      try {
        const lib = await getPdfJs()
        const loadingTask = lib.getDocument(pdfUrl)
        const pdf  = await loadingTask.promise
        const page = await pdf.getPage(1)
        const scale    = 1.5
        const viewport = page.getViewport({ scale })
        const canvas   = document.createElement('canvas')
        canvas.width   = viewport.width
        canvas.height  = viewport.height
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise
        if (cancelled) return
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82)
        coverCache.set(pdfUrl, dataUrl)
        setSrc(dataUrl)
      } catch {
        if (!cancelled) setError(true)
      }
    })()
    return () => { cancelled = true }
  }, [visible, pdfUrl, src, error])

  if (!pdfUrl || error) {
    return <PlaceholderCover color={color} title={title} style={style} />
  }

  return (
    <div ref={containerRef} style={{ width: '100%', aspectRatio: '3/4', ...style }}>
      {src
        ? <img src={src} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6, display: 'block' }} />
        : <PlaceholderCover color={color} title={title} loading />
      }
    </div>
  )
}

export function PlaceholderCover({ color = '#6366f1', title = '', loading = false, style }) {
  const initials = title
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')

  return (
    <div style={{
      width: '100%', aspectRatio: '3/4',
      background: `linear-gradient(135deg, ${color}dd, ${color}88)`,
      borderRadius: 6,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 6,
      ...style
    }}>
      {loading
        ? <div style={{ width: 24, height: 24, border: '3px solid rgba(255,255,255,.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin .8s linear infinite' }} />
        : <>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', opacity: 0.9, letterSpacing: -1 }}>{initials || '📖'}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,.8)', textAlign: 'center', padding: '0 8px', lineHeight: 1.3, fontWeight: 600 }}>
              {title.length > 30 ? title.slice(0, 28) + '…' : title}
            </div>
          </>
      }
    </div>
  )
}
