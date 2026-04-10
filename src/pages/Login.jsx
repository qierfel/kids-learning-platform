import { useState } from 'react'
import './Login.css'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (isRegister && !nickname.trim()) { setError('请输入昵称'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          action: isRegister ? 'register' : 'login',
          email: email.trim(),
          password,
          nickname: nickname.trim(),
        }),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      localStorage.setItem('session_token', data.token)
      onLogin(data.user)
    } catch {
      setError('网络错误，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">学</div>
        <h1 className="login-title">学习平台</h1>
        <p className="login-sub">语文 · 数学 · 英语 · 理综</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="邮箱"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="密码"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="login-input"
          />
          {isRegister && (
            <input
              type="text"
              placeholder="昵称（显示在平台上）"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              maxLength={20}
              className="login-input"
            />
          )}
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? '请稍候...' : (isRegister ? '申请注册' : '登录')}
          </button>
        </form>

        {isRegister && (
          <p className="login-notice">注册后需管理员审批，审批通过后即可使用</p>
        )}

        <button className="login-toggle" onClick={() => { setIsRegister(!isRegister); setError('') }}>
          {isRegister ? '已有账号？去登录' : '没有账号？申请注册'}
        </button>
      </div>
    </div>
  )
}
