import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Chinese from './pages/Chinese'
import MathPage from './pages/Math'
import English from './pages/English'
import Physics from './pages/Physics'
import Chemistry from './pages/Chemistry'
import History from './pages/History'
import Geography from './pages/Geography'
import Notebook from './pages/Notebook'
import Mistakes from './pages/Mistakes'
import Admin from './pages/Admin'
import Layout from './components/Layout'

function getToken() { return localStorage.getItem('session_token') }

export default function App() {
  const [user, setUser] = useState(undefined) // undefined=loading, null=not logged in, object=logged in
  const pollRef = useRef(null)

  // On mount: check if we have a valid session
  useEffect(() => {
    // 本地开发模式：跳过登录，直接以管理员身份进入
    if (import.meta.env.DEV) {
      setUser({ uid: 'dev', email: 'dev@local', nickname: '本地开发', status: 'approved', role: 'admin' })
      return
    }
    const token = getToken()
    if (!token) { setUser(null); return }
    fetch('/api/auth', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action: 'me', token }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.error) { localStorage.removeItem('session_token'); setUser(null) }
        else setUser(data.user)
      })
      .catch(() => setUser(null))
  }, [])

  // Poll approval status while user is pending
  useEffect(() => {
    if (user?.status !== 'pending') { clearInterval(pollRef.current); return }
    pollRef.current = setInterval(async () => {
      const token = getToken()
      if (!token) return
      try {
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ action: 'poll_status', token }),
        })
        const data = await res.json()
        if (data.status && data.status !== 'pending') {
          setUser(prev => ({ ...prev, status: data.status }))
        }
      } catch { /* ignore poll errors */ }
    }, 8000)
    return () => clearInterval(pollRef.current)
  }, [user?.status])

  function handleLogin(userData) { setUser(userData) }

  function handleLogout() {
    const token = getToken()
    if (token) {
      fetch('/api/auth', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'logout', token }),
      }).catch(() => {})
      localStorage.removeItem('session_token')
    }
    setUser(null)
  }

  if (user === undefined) return <div className="page-loading">加载中...</div>

  if (user?.status === 'pending') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f3ff' }}>
        <div style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '20px', maxWidth: '360px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <h2 style={{ color: '#1a1a2e', marginBottom: '8px' }}>等待审批</h2>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>
            你的账号（{user.nickname || user.email}）已提交，管理员审批通过后即可使用。
          </p>
          <p style={{ color: '#bbb', fontSize: '12px', marginBottom: '20px' }}>页面将自动检测状态...</p>
          <button
            onClick={handleLogout}
            style={{ padding: '10px 24px', background: '#f3f4f6', color: '#555', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px' }}
          >
            退出登录
          </button>
        </div>
      </div>
    )
  }

  if (user?.status === 'rejected') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff5f5' }}>
        <div style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '20px', maxWidth: '360px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>❌</div>
          <h2 style={{ color: '#e53e3e', marginBottom: '8px' }}>申请未通过</h2>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>请联系管理员了解原因。</p>
          <button
            onClick={handleLogout}
            style={{ padding: '10px 24px', background: '#f3f4f6', color: '#555', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px' }}
          >
            退出登录
          </button>
        </div>
      </div>
    )
  }

  const isAdmin = user?.role === 'admin'

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
        <Route element={<Layout user={user} profile={user} onLogout={handleLogout} />}>
          <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
          <Route path="/chinese" element={user ? <Chinese /> : <Navigate to="/login" />} />
          <Route path="/math" element={user ? <MathPage user={user} /> : <Navigate to="/login" />} />
          <Route path="/english" element={user ? <English user={user} /> : <Navigate to="/login" />} />
          <Route path="/physics" element={user ? <Physics user={user} /> : <Navigate to="/login" />} />
          <Route path="/chemistry" element={user ? <Chemistry user={user} /> : <Navigate to="/login" />} />
          <Route path="/history" element={user ? <History user={user} /> : <Navigate to="/login" />} />
          <Route path="/geography" element={user ? <Geography user={user} /> : <Navigate to="/login" />} />
          <Route path="/notebook" element={user ? <Notebook user={user} /> : <Navigate to="/login" />} />
          <Route path="/mistakes" element={user ? <Mistakes user={user} /> : <Navigate to="/login" />} />
          <Route path="/admin" element={
            !user ? <Navigate to="/login" /> :
            isAdmin ? <Admin onBack={() => window.history.back()} /> :
            <Navigate to="/" />
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
