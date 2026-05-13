import { useState, useEffect } from 'react'

const STORAGE_KEY = 'ai_skill_cards_v1'

export const PRESET_SKILLS = [
  {
    id: 'start',
    name: '开工 Skill',
    emoji: '🚀',
    color: '#6366f1',
    template: `我要开始做【项目名称】。
请帮我：
1. 列出需要做的3-5个核心功能
2. 告诉我第一步应该先做什么
3. 预计大概多少步可以完成`,
  },
  {
    id: 'debug',
    name: '查 Bug Skill',
    emoji: '🔍',
    color: '#f59e0b',
    template: `我的代码出问题了：
- 我想让它做：【描述你想要的效果】
- 实际发生了：【描述实际情况/报错】
- 我已经试过：【你尝试过的方法】
请帮我找出可能的原因，给出修复建议。`,
  },
  {
    id: 'beauty',
    name: '美化 Skill',
    emoji: '🎨',
    color: '#ec4899',
    template: `请帮我给这个网页提3个具体的美化建议：
- 配色方面：
- 排版方面：
- 交互体验方面：
每个建议请给出具体的CSS或HTML修改思路。`,
  },
  {
    id: 'launch',
    name: '发布前检查 Skill',
    emoji: '✅',
    color: '#10b981',
    template: `我的项目准备发布了，请帮我检查：
1. 所有按钮点击后有没有正常响应？
2. 文字有没有错别字？
3. 在手机上看起来正常吗？
4. 加载速度如何？
5. 还有什么遗漏的功能？`,
  },
]

export default function SkillCardArea({ accent = '#6366f1', allowCreate = true }) {
  const [cards, setCards] = useState([])
  const [editing, setEditing] = useState(null) // { name, emoji, color, template }
  const [expanded, setExpanded] = useState(null)
  const [copied, setCopied] = useState(null)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      setCards(stored)
    } catch { setCards([]) }
  }, [])

  function save(newCards) {
    setCards(newCards)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCards))
  }

  function addPreset(preset) {
    if (cards.find(c => c.id === preset.id)) return
    save([...cards, { ...preset, isCustom: false }])
  }

  function saveCustom() {
    if (!editing) return
    const id = editing.id || `custom_${Date.now()}`
    const existing = cards.findIndex(c => c.id === id)
    const updated = { ...editing, id, isCustom: true }
    if (existing >= 0) {
      const next = [...cards]
      next[existing] = updated
      save(next)
    } else {
      save([...cards, updated])
    }
    setEditing(null)
  }

  function deleteCard(id) {
    save(cards.filter(c => c.id !== id))
    if (expanded === id) setExpanded(null)
  }

  function copyTemplate(id, template) {
    navigator.clipboard.writeText(template).catch(() => {})
    setCopied(id)
    setTimeout(() => setCopied(null), 1800)
  }

  return (
    <div>
      {/* Preset skill buttons */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: 'rgba(203,213,225,0.8)', marginBottom: 8 }}>
          💡 快速添加预设Skill卡：
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {PRESET_SKILLS.map(p => (
            <button
              key={p.id}
              onClick={() => addPreset(p)}
              disabled={!!cards.find(c => c.id === p.id)}
              style={{
                padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700,
                border: `1.5px solid ${cards.find(c => c.id === p.id) ? '#4b5563' : p.color}`,
                background: cards.find(c => c.id === p.id) ? 'rgba(15,23,42,0.3)' : `${p.color}15`,
                color: cards.find(c => c.id === p.id) ? '#6b7280' : p.color,
                cursor: cards.find(c => c.id === p.id) ? 'default' : 'pointer',
              }}
            >
              {p.emoji} {p.name} {cards.find(c => c.id === p.id) ? '✓' : '+'}
            </button>
          ))}
        </div>
      </div>

      {/* Saved cards */}
      {cards.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          {cards.map(card => (
            <div
              key={card.id}
              style={{
                border: `1.5px solid ${card.color || accent}40`,
                borderRadius: 12, overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '11px 14px', cursor: 'pointer',
                  background: expanded === card.id ? `${card.color || accent}15` : 'rgba(15,23,42,0.5)',
                }}
                onClick={() => setExpanded(expanded === card.id ? null : card.id)}
              >
                <span style={{ fontWeight: 700, fontSize: 14, color: card.color || accent }}>
                  {card.emoji || '🃏'} {card.name}
                </span>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {card.isCustom && (
                    <button
                      onClick={e => { e.stopPropagation(); setEditing({ ...card }) }}
                      style={{ fontSize: 11, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px' }}
                    >✏️ 编辑</button>
                  )}
                  <button
                    onClick={e => { e.stopPropagation(); deleteCard(card.id) }}
                    style={{ fontSize: 11, color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px' }}
                  >✕</button>
                  <span style={{ color: '#94a3b8', fontSize: 12 }}>{expanded === card.id ? '▲' : '▼'}</span>
                </div>
              </div>
              {expanded === card.id && (
                <div style={{ padding: '12px 14px', background: 'rgba(15,23,42,0.3)' }}>
                  <pre style={{
                    margin: 0, fontFamily: 'inherit', fontSize: 13, lineHeight: 1.7,
                    color: '#cbd5e1', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                  }}>
                    {card.template}
                  </pre>
                  <button
                    onClick={() => copyTemplate(card.id, card.template)}
                    style={{
                      marginTop: 10, padding: '7px 16px', borderRadius: 8, border: 'none',
                      background: copied === card.id ? '#10b981' : (card.color || accent),
                      color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    }}
                  >
                    {copied === card.id ? '✓ 已复制！' : '📋 复制模板'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create custom skill */}
      {allowCreate && (
        <>
          {editing ? (
            <div style={{
              border: `2px solid ${accent}`, borderRadius: 12, padding: '14px',
              background: 'rgba(15,23,42,0.6)',
            }}>
              <div style={{ fontWeight: 700, color: accent, marginBottom: 12 }}>
                ✏️ {editing.id ? '编辑' : '新建'} Skill 卡
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>Skill 名称</div>
                  <input
                    value={editing.name || ''}
                    onChange={e => setEditing(s => ({ ...s, name: e.target.value }))}
                    placeholder="例如：我的查bug Skill"
                    style={{
                      width: '100%', borderRadius: 8, border: `1.5px solid ${accent}50`,
                      padding: '8px 10px', fontSize: 13, background: 'rgba(15,23,42,0.8)',
                      color: '#f8fafc', boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>Emoji</div>
                  <input
                    value={editing.emoji || ''}
                    onChange={e => setEditing(s => ({ ...s, emoji: e.target.value }))}
                    placeholder="🃏"
                    style={{
                      width: '100%', borderRadius: 8, border: `1.5px solid ${accent}50`,
                      padding: '8px 10px', fontSize: 18, background: 'rgba(15,23,42,0.8)',
                      color: '#f8fafc', boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>Skill 模板（你问AI的时候会用到这段话）</div>
              <textarea
                value={editing.template || ''}
                onChange={e => setEditing(s => ({ ...s, template: e.target.value }))}
                placeholder="写下你想固定下来的提问模板，例如：&#10;我要做【项目名称】&#10;请先告诉我第一步..."
                style={{
                  width: '100%', minHeight: 120, borderRadius: 8, border: `1.5px solid ${accent}50`,
                  padding: '10px 12px', fontSize: 13, background: 'rgba(15,23,42,0.8)',
                  color: '#f8fafc', resize: 'vertical', boxSizing: 'border-box',
                  fontFamily: 'inherit', lineHeight: 1.6,
                }}
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <button
                  onClick={saveCustom}
                  disabled={!editing.name || !editing.template}
                  style={{
                    flex: 1, padding: '10px', borderRadius: 10, border: 'none',
                    background: !editing.name || !editing.template ? '#4b5563' : accent,
                    color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  💾 保存 Skill 卡
                </button>
                <button
                  onClick={() => setEditing(null)}
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
              onClick={() => setEditing({ name: '', emoji: '🃏', color: accent, template: '', isCustom: true })}
              style={{
                width: '100%', padding: '12px', borderRadius: 12,
                border: `2px dashed ${accent}50`, background: 'transparent',
                color: accent, fontSize: 13, fontWeight: 700, cursor: 'pointer',
              }}
            >
              + 创建我自己的 Skill 卡
            </button>
          )}
        </>
      )}

      {cards.length === 0 && !editing && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#6b7280', fontSize: 13 }}>
          还没有Skill卡，从上面选一个预设或者创建自己的吧！
        </div>
      )}
    </div>
  )
}
