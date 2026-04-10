import { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDoc, getDocs, collection } from 'firebase/firestore'
import { auth, db } from '../firebase/config'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (isRegister && !nickname.trim()) {
      setError('请输入昵称')
      return
    }
    setLoading(true)
    try {
      if (isRegister) {
        const cred = await createUserWithEmailAndPassword(auth, email, password)
        const uid = cred.user.uid

        // 检查是否是第一个注册的用户 → 自动成为管理员并通过
        const snap = await getDocs(collection(db, 'users'))
        const isFirstUser = snap.empty

        await setDoc(doc(db, 'users', uid), {
          uid,
          email,
          nickname: nickname.trim(),
          status: isFirstUser ? 'approved' : 'pending',
          role: isFirstUser ? 'admin' : 'user',
          createdAt: Date.now(),
        })
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
