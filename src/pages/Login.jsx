import { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
    } catch (err) {
      const msgs = {
        'auth/user-not-found': '账号不存在',
        'auth/wrong-password': '密码错误',
        'auth/email-already-in-use': '该邮箱已注册',
        'auth/weak-password': '密码至少6位',
        'auth/invalid-email': '邮箱格式不正确',
        'auth/invalid-credential': '账号或密码错误',
      }
      setError(msgs[err.code] || '操作失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">学</div>
        <h1 className="login-title">小学学习平台</h1>
        <p className="login-sub">语文 · 数学 · 英语</p>

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
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? '请稍候...' : (isRegister ? '注册' : '登录')}
          </button>
        </form>

        <button className="login-toggle" onClick={() => { setIsRegister(!isRegister); setError('') }}>
          {isRegister ? '已有账号？去登录' : '没有账号？去注册'}
        </button>
      </div>
    </div>
  )
}
