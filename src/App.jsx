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
import Coding from './pages/Coding'
import Achievements from './pages/Achievements'
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

  // Persist user uid so modules without user prop (e.g. Dictation) can log activities
  useEffect(() => {
    if (user?.uid) localStorage.setItem('user_uid', user.uid)
    else if (user === null) localStorage.removeItem('user_uid')
  }, [user?.uid])

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
    localStorage.removeItem('user_uid')
    setUser(null)
  }

  if (user === undefined) {
    return (
      <div className="page-state-wrap">
        <div className="page-state-card">
          <div className="page-state-emoji">✨</div>
          <h2 className="page-state-title">正在准备学习空间</h2>
          <p className="page-state-text">页面和学习内容正在加载，请稍候一下。</p>
        </div>
      </div>
    )
  }

  if (user?.status === 'pending') {
    return (
      <div className="page-state-wrap">
        <div className="page-state-card">
          <div className="page-state-emoji">⏳</div>
          <h2 className="page-state-title">等待审批</h2>
          <p className="page-state-text">
            你的账号（{user.nickname || user.email}）已提交，管理员审批通过后即可使用。
          </p>
          <p className="page-state-note">页面会自动检测审批结果。</p>
          <button onClick={handleLogout} className="page-state-btn">退出登录</button>
        </div>
      </div>
    )
  }

  if (user?.status === 'rejected') {
    return (
      <div className="page-state-wrap page-state-wrap--warning">
        <div className="page-state-card">
          <div className="page-state-emoji">❌</div>
          <h2 className="page-state-title">申请未通过</h2>
          <p className="page-state-text">请联系管理员了解原因，或稍后重新申请。</p>
          <button onClick={handleLogout} className="page-state-btn">退出登录</button>
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
          <Route path="/coding" element={user ? <Coding user={user} /> : <Navigate to="/login" />} />
          <Route path="/notebook" element={user ? <Notebook user={user} /> : <Navigate to="/login" />} />
          <Route path="/mistakes" element={user ? <Mistakes user={user} /> : <Navigate to="/login" />} />
          <Route path="/achievements" element={user ? <Achievements user={user} /> : <Navigate to="/login" />} />
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
