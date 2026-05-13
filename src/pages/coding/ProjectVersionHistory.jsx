import { useState, useEffect } from 'react'

const STORAGE_KEY = 'ai_project_versions_v1'

/**
 * ProjectVersionHistory — stores and displays project upgrade history.
 * Each entry: { id, date, version, changes, type: 'min'|'bold'|'custom' }
 */
export default function ProjectVersionHistory({ accent = '#8b5cf6', projectKey = 'default' }) {
  const storageKey = `${STORAGE_KEY}_${projectKey}`
  const [versions, setVersions] = useState([])
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ version: '', changes: '', type: 'custom' })

  useEffect(() => {
    try {
      setVersions(JSON.parse(localStorage.getItem(storageKey) || '[]'))
    } catch { setVersions([]) }
  }, [storageKey])

  function save(next) {
    setVersions(next)
    localStorage.setItem(storageKey, JSON.stringify(next))
  }

  function addVersion() {
    if (!form.version || !form.changes) return
    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('zh-CN'),
      version: form.version,
      changes: form.changes,
      type: form.type,
    }
    save([entry, ...versions])
    setForm({ version: '', changes: '', type: 'custom' })
    setAdding(false)
  }

  const typeLabel = { min: '🔧 最小升级', bold: '🚀 大胆升级', custom: '✏️ 自定义' }
  const typeColor = { min: '#10b981', bold: '#f97316', custom: accent }

  return (
    <div>
      {versions.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
          {versions.map(v => (
            <div
              key={v.id}
              style={{
                border: `1.5px solid ${typeColor[v.type] || accent}40`,
                borderRadius: 12, padding: '12px 14px',
                background: `${typeColor[v.type] || accent}08`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: typeColor[v.type] || accent }}>
                  {typeLabel[v.type] || '✏️ 升级'} · v{v.version}
                </div>
                <div style={{ fontSize: 11, color: '#6b7280' }}>{v.date}</div>
              </div>
              <div style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {v.changes}
              </div>
              <button
                onClick={() => save(versions.filter(x => x.id !== v.id))}
                style={{ marginTop: 8, fontSize: 11, color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                ✕ 删除
              </button>
            </div>
          ))}
        </div>
      )}

      {adding ? (
        <div style={{ border: `2px solid ${accent}`, borderRadius: 12, padding: '14px', background: 'rgba(15,23,42,0.6)' }}>
          <div style={{ fontWeight: 700, color: accent, marginBottom: 12 }}>📝 记录一次升级</div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>版本号（例如：1.1 / 2.0）</div>
            <input
              value={form.version}
              onChange={e => setForm(s => ({ ...s, version: e.target.value }))}
              placeholder="1.1"
              style={{
                width: '100%', borderRadius: 8, border: `1.5px solid ${accent}50`,
                padding: '8px 10px', fontSize: 13, background: 'rgba(15,23,42,0.8)',
                color: '#f8fafc', boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>升级类型</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {Object.entries(typeLabel).map(([k, label]) => (
                <button
                  key={k}
                  onClick={() => setForm(s => ({ ...s, type: k }))}
                  style={{
                    flex: 1, padding: '7px', borderRadius: 8, border: `1.5px solid ${form.type === k ? typeColor[k] : '#4b5563'}`,
                    background: form.type === k ? `${typeColor[k]}20` : 'transparent',
                    color: form.type === k ? typeColor[k] : '#94a3b8',
                    fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>升级了什么</div>
            <textarea
              value={form.changes}
              onChange={e => setForm(s => ({ ...s, changes: e.target.value }))}
              placeholder="例如：加了一个返回顶部按钮&#10;换了蓝色配色方案&#10;修复了点击按钮没有反应的bug"
              style={{
                width: '100%', minHeight: 90, borderRadius: 8, border: `1.5px solid ${accent}50`,
                padding: '10px 12px', fontSize: 13, background: 'rgba(15,23,42,0.8)',
                color: '#f8fafc', resize: 'vertical', boxSizing: 'border-box',
                fontFamily: 'inherit', lineHeight: 1.6,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={addVersion}
              disabled={!form.version || !form.changes}
              style={{
                flex: 1, padding: '10px', borderRadius: 10, border: 'none',
                background: !form.version || !form.changes ? '#4b5563' : accent,
                color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              }}
            >
              💾 保存升级记录
            </button>
            <button
              onClick={() => setAdding(false)}
              style={{
                padding: '10px 16px', borderRadius: 10, border: '1.5px solid #4b5563',
                background: 'transparent', color: '#94a3b8', fontSize: 13, cursor: 'pointer',
              }}
            >
              取消
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          style={{
            width: '100%', padding: '12px', borderRadius: 12,
            border: `2px dashed ${accent}50`, background: 'transparent',
            color: accent, fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}
        >
          + 记录一次升级
        </button>
      )}

      {versions.length === 0 && !adding && (
        <div style={{ textAlign: 'center', padding: '16px', color: '#6b7280', fontSize: 13 }}>
          还没有升级记录，每次改进项目后来记一笔吧！
        </div>
      )}
    </div>
  )
}
