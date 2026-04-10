import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { auth, db } from './firebase/config'
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

export default function App() {
  const [user, setUser] = useState(undefined)       // undefined = 初始加载中
  const [profile, setProfile] = useState(undefined) // Firestore user profile

  useEffect(() => {
    return onAuthStateChanged(auth, async u => {
      if (!u) {
        setUser(null)
        setProfile(null)
        return
      }
      setUser(u)
      // 实时监听用户状态（审批通过后自动更新）
      const unsub = onSnapshot(doc(db, 'users', u.uid), snap => {
        if (snap.exists()) {
          setProfile({ uid: u.uid, ...snap.data() })
        } else {
          // 老用户没有 profile 文档，视为已通过
          setProfile({ uid: u.uid, email: u.email, status: 'approved', role: 'user' })
        }
      })
      return unsub
    })
  }, [])

  if (user === undefined || (user && profile === undefined)) {
    return <div className="page-loading">加载中...</div>
  }

  // 待审批 / 已拒绝
  if (user && profile) {
    if (profile.status === 'pending') {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f3ff' }}>
          <div style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '20px', maxWidth: '360px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
            <h2 style={{ color: '#1a1a2e', marginBottom: '8px' }}>等待审批</h2>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>
              你的账号（{profile.nickname || profile.email}）已提交，管理员审批通过后即可使用。
            </p>
            <button
              onClick={() => auth.signOut()}
              style={{ padding: '10px 24px', background: '#f3f4f6', color: '#555', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              退出登录
            </button>
          </div>
        </div>
      )
    }

    if (profile.status === 'rejected') {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff5f5' }}>
          <div style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '20px', maxWidth: '360px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>❌</div>
            <h2 style={{ color: '#e53e3e', marginBottom: '8px' }}>申请未通过</h2>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>请联系管理员了解原因。</p>
            <button
              onClick={() => auth.signOut()}
              style={{ padding: '10px 24px', background: '#f3f4f6', color: '#555', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              退出登录
            </button>
          </div>
        </div>
      )
    }
  }

  const isAdmin = profile?.role === 'admin'

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route element={<Layout user={user} profile={profile} />}>
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
