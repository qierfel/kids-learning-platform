let installed = false

function isApiRequest(resource) {
  const url = typeof resource === 'string' ? resource : resource?.url
  if (!url) return false
  if (url.startsWith('/api/')) return true
  try {
    const parsed = new URL(url, window.location.origin)
    return parsed.origin === window.location.origin && parsed.pathname.startsWith('/api/')
  } catch {
    return false
  }
}

export function installApiAuthBridge() {
  if (installed || typeof window === 'undefined' || typeof window.fetch !== 'function') return
  installed = true

  const originalFetch = window.fetch.bind(window)
  window.fetch = async (resource, init = {}) => {
    if (!isApiRequest(resource)) return originalFetch(resource, init)

    const token = localStorage.getItem('session_token')
    if (!token) return originalFetch(resource, init)

    const nextInit = { ...init }
    const headers = new Headers(init?.headers || {})
    if (!headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    nextInit.headers = headers
    return originalFetch(resource, nextInit)
  }
}
