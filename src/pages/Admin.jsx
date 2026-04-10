import { useState, useEffect } from 'react'
import './Admin.css'

const STATUS_LABEL = { pending: '待审批', approved: '已通过', rejected: '已拒绝' }
const STATUS_COLOR = { pending: '#f59e0b', approved: '#10b981', rejected: '#e53e3e' }

function getToken() { return localStorage.getItem('session_token') }

export default function Admin({ onBack }) {
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('pending')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    setLoading(true)
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'list_users', token: getToken() }),
      })
      const data = await res.json()
      if (data.users) setUsers(data.users)
    } catch { /* silent */ }
    setLoading(false)
  }

  async function approve(uid) {
    await fetch('/api/auth', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action: 'approve', token: getToken(), targetUid: uid }),
    })
    setUsers(prev => prev.map(u => u.uid === uid ? { ...u, status: 'approved' } : u))
  }

  async function reject(uid) {
    await fetch('/api/auth', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action: 'reject', token: getToken(), targetUid: uid }),
    })
    setUsers(prev => prev.map(u => u.uid === uid ? { ...u, status: 'rejected' } : u))
  }

  const filtered = filter === 'all' ? users : users.filter(u => u.status === filter)
  const counts = { pending: 0, approved: 0, rejected: 0 }
  users.forEach(u => { if (counts[u.status] !== undefined) counts[u.status]++ })

  return (
    <div className="admin-page">
      <div className="admin-header">
        <button className="admin-back" onClick={onBack}>← 返回</button>
        <h2 className="admin-title">管理后台</h2>
        <button className="admin-refresh" onClick={loadUsers} style={{ marginLeft: 'auto', fontSize: 13, color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer' }}>
          刷新
        </button>
      </div>

      <div className="admin-stats">
        {['pending', 'approved', 'rejected'].map(s => (
          <button
            key={s}
            className={`admin-stat-btn ${filter === s ? 'active' : ''}`}
            style={{ '--color': STATUS_COLOR[s] }}
            onClick={() => setFilter(s)}
          >
            <span className="admin-stat-num">{counts[s]}</span>
            <span className="admin-stat-lbl">{STATUS_LABEL[s]}</span>
          </button>
        ))}
        <button
          className={`admin-stat-btn ${filter === 'all' ? 'active' : ''}`}
          style={{ '--color': '#6366f1' }}
          onClick={() => setFilter('all')}
        >
          <span className="admin-stat-num">{users.length}</span>
          <span className="admin-stat-lbl">全部</span>
        </button>
      </div>

      <div className="admin-user-list">
        {loading && <p className="admin-empty">加载中...</p>}
        {!loading && filtered.length === 0 && <p className="admin-empty">暂无用户</p>}
        {filtered.map(u => (
          <div key={u.uid} className="admin-user-card">
            <div className="admin-user-info">
              <div className="admin-user-name">{u.nickname || '未设置昵称'}</div>
              <div className="admin-user-email">{u.email}</div>
              <div className="admin-user-time">
                注册：{u.createdAt ? new Date(u.createdAt).toLocaleString('zh-CN') : '-'}
              </div>
            </div>
            <div className="admin-user-right">
              <span
                className="admin-status-badge"
                style={{ background: STATUS_COLOR[u.status] + '20', color: STATUS_COLOR[u.status] }}
              >
                {STATUS_LABEL[u.status] || u.status}
              </span>
              {u.status === 'pending' && (
                <div className="admin-actions">
                  <button className="admin-approve-btn" onClick={() => approve(u.uid)}>通过</button>
                  <button className="admin-reject-btn" onClick={() => reject(u.uid)}>拒绝</button>
                </div>
              )}
              {u.status === 'approved' && u.role !== 'admin' && (
                <button className="admin-reject-btn" onClick={() => reject(u.uid)}>撤销</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
