import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/config'
import Home from './pages/Home'
import Login from './pages/Login'
import Chinese from './pages/Chinese'
import MathPage from './pages/Math'
import English from './pages/English'
import Notebook from './pages/Notebook'
import Mistakes from './pages/Mistakes'
import Layout from './components/Layout'

export default function App() {
  const [user, setUser] = useState(undefined) // undefined = 初始加载中

  useEffect(() => {
    return onAuthStateChanged(auth, u => setUser(u))
  }, [])

  if (user === undefined) return <div className="page-loading">加载中...</div>

  return (
    <BrowserRouter basename="/kids-learning-platform">
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route element={<Layout user={user} />}>
          <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
          <Route path="/chinese" element={user ? <Chinese /> : <Navigate to="/login" />} />
          <Route path="/math" element={user ? <MathPage user={user} /> : <Navigate to="/login" />} />
          <Route path="/english" element={user ? <English user={user} /> : <Navigate to="/login" />} />
          <Route path="/notebook" element={user ? <Notebook user={user} /> : <Navigate to="/login" />} />
          <Route path="/mistakes" element={user ? <Mistakes user={user} /> : <Navigate to="/login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
