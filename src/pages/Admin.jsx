import { useState, useEffect } from 'react'
import './Admin.css'

const STATUS_LABEL = { pending: '待审批', approved: '已通过', rejected: '已拒绝' }
const STATUS_COLOR = { pending: '#f59e0b', approved: '#10b981', rejected: '#e53e3e' }

function getToken() { return localStorage.getItem('session_token') }

export default function Admin({ onBack }) {
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('pending')
  const [loading, setLoading] = useState(true)
  const [usageLoading, setUsageLoading] = useState(true)
  const [usageRows, setUsageRows] = useState([])
  const [usageTotals, setUsageTotals] = useState(null)
  const [recentUsage, setRecentUsage] = useState([])
  const [recentUid, setRecentUid] = useState('')

  useEffect(() => {
    loadUsers()
    loadUsage()
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

  async function loadUsage() {
    setUsageLoading(true)
    try {
      const res = await fetch('/api/usage', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'summary' }),
      })
      const data = await res.json()
      if (data.users) setUsageRows(data.users)
      if (data.totals) setUsageTotals(data.totals)
    } catch { /* silent */ }
    setUsageLoading(false)
  }

  async function loadRecentUsage(uid) {
    setRecentUid(uid)
    try {
      const res = await fetch('/api/usage', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'recent', uid }),
      })
      const data = await res.json()
      setRecentUsage(data.events || [])
    } catch {
      setRecentUsage([])
    }
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
        <button className="admin-refresh" onClick={loadUsage} style={{ fontSize: 13, color: '#0ea5e9', background: 'none', border: 'none', cursor: 'pointer' }}>
          刷新用量
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

      <div className="admin-usage-panel">
        <div className="admin-usage-header">
          <h3 className="admin-usage-title">API 调用统计</h3>
          <p className="admin-usage-sub">按用户统计本月调用量，为后续成本分摊提供依据</p>
        </div>

        {usageTotals && (
          <div className="admin-usage-totals">
            <div className="admin-usage-tile">
              <span className="admin-usage-num">{usageTotals.requests || 0}</span>
              <span className="admin-usage-lbl">本月请求数</span>
            </div>
            <div className="admin-usage-tile">
              <span className="admin-usage-num">{usageTotals.totalTokens || 0}</span>
              <span className="admin-usage-lbl">本月总 tokens</span>
            </div>
            <div className="admin-usage-tile">
              <span className="admin-usage-num">${Number(usageTotals.estCostUsd || 0).toFixed(2)}</span>
              <span className="admin-usage-lbl">本月预估成本</span>
            </div>
          </div>
        )}

        <div className="admin-usage-table-wrap">
          {usageLoading && <p className="admin-empty">正在加载用量统计...</p>}
          {!usageLoading && usageRows.length === 0 && <p className="admin-empty">暂无 API 用量数据</p>}
          {!usageLoading && usageRows.length > 0 && (
            <table className="admin-usage-table">
              <thead>
                <tr>
                  <th>用户</th>
                  <th>今日请求</th>
                  <th>本月请求</th>
                  <th>本月 tokens</th>
                  <th>本月预估成本</th>
                  <th>查看明细</th>
                </tr>
              </thead>
              <tbody>
                {usageRows.map(row => (
                  <tr key={row.uid}>
                    <td>
                      <div className="admin-usage-user">{row.nickname || '未命名用户'}</div>
                      <div className="admin-usage-email">{row.email}</div>
                    </td>
                    <td>{row.today?.requests || 0}</td>
                    <td>{row.month?.requests || 0}</td>
                    <td>{row.month?.totalTokens || 0}</td>
                    <td>${Number(row.month?.estCostUsd || 0).toFixed(3)}</td>
                    <td>
                      <button className="admin-usage-link" onClick={() => loadRecentUsage(row.uid)}>
                        查看最近 50 条
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {recentUid && (
          <div className="admin-usage-recent">
            <div className="admin-usage-recent-title">最近调用记录</div>
            {recentUsage.length === 0 ? (
              <p className="admin-empty">暂无最近记录</p>
            ) : (
              <div className="admin-usage-recent-list">
                {recentUsage.map(item => (
                  <div key={item.id} className="admin-usage-recent-item">
                    <div className="admin-usage-recent-main">
                      <strong>{item.endpoint}</strong> · {item.model}
                      <span className={`admin-usage-badge ${item.success ? 'ok' : 'fail'}`}>{item.success ? '成功' : '失败'}</span>
                    </div>
                    <div className="admin-usage-recent-meta">
                      {new Date(item.ts).toLocaleString('zh-CN')} · {item.totalTokens || 0} tokens · ${Number(item.estCostUsd || 0).toFixed(4)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
