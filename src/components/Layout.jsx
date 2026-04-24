import { useState, useRef, useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import './Layout.css'

const PRIMARY_NAV = [
  { to: '/chinese', label: '语文' },
  { to: '/math', label: '数学' },
  { to: '/english', label: '英语' },
  { to: '/coding', label: 'AI编程' },
]

const JUNIOR_NAV = [
  { to: '/physics', label: '物理' },
  { to: '/chemistry', label: '化学' },
  { to: '/history', label: '历史' },
  { to: '/geography', label: '地理' },
]

const TOOL_NAV = [
  { to: '/mistakes', label: '错题本' },
  { to: '/notebook', label: '问题讨论' },
]

export default function Layout({ user, profile, onLogout }) {
  const navigate = useNavigate()
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef(null)

  function handleLogout() {
    onLogout()
    navigate('/login')
  }

  useEffect(() => {
    function handleClick(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false)
      }
    }
    if (moreOpen) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [moreOpen])

  return (
    <div className="layout">
      <nav className="navbar">
        <NavLink to="/" className="nav-logo">🏠 快乐学习屋</NavLink>
        <div className="nav-all">
          <div className="nav-links">
            {PRIMARY_NAV.map(({ to, label }) => (
              <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                {label}
              </NavLink>
            ))}
            <span className="nav-divider" />
            {JUNIOR_NAV.map(({ to, label }) => (
              <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'nav-item active junior' : 'nav-item junior'}>
                {label}
              </NavLink>
            ))}
            <span className="nav-divider" />
            {TOOL_NAV.map(({ to, label }) => (
              <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                {label}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="nav-user">
          <span className="user-email">{profile?.nickname || user?.email}</span>
          <span className="nav-user-desktop">
            {profile?.role === 'admin' && (
              <NavLink to="/admin" className="admin-nav-btn">管理</NavLink>
            )}
            {user && <button onClick={handleLogout} className="logout-btn">退出</button>}
          </span>
          <div className="nav-more-wrap" ref={moreRef}>
            <button className="nav-more-btn" onClick={() => setMoreOpen(v => !v)} aria-label="更多">···</button>
            {moreOpen && (
              <div className="nav-more-menu">
                {profile?.role === 'admin' && (
                  <NavLink to="/admin" className="nav-more-item" onClick={() => setMoreOpen(false)}>管理</NavLink>
                )}
                {user && (
                  <button className="nav-more-item nav-more-logout" onClick={() => { setMoreOpen(false); handleLogout() }}>退出登录</button>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
