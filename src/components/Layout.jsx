import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import './Layout.css'

export default function Layout({ user }) {
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut(auth)
    navigate('/login')
  }

  return (
    <div className="layout">
      <nav className="navbar">
        <NavLink to="/" className="nav-logo">学习平台</NavLink>
        <div className="nav-links">
          <NavLink to="/chinese" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>语文</NavLink>
          <NavLink to="/math" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>数学</NavLink>
          <NavLink to="/english" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>英语</NavLink>
        </div>
        <div className="nav-user">
          <span className="user-email">{user.email}</span>
          <button onClick={handleLogout} className="logout-btn">退出</button>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
