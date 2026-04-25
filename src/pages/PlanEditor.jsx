import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlan, makeWeekRange, getTodayStr } from '../hooks/usePlan'
import './PlanEditor.css'

const MODULE_OPTIONS = [
  { subject: '英语', module: 'SRS词汇',   moduleKey: 'srs',        defaultUnit: '词',   defaultTarget: 20 },
  { subject: '英语', module: '写作批改', moduleKey: 'writing',    defaultUnit: '篇',   defaultTarget: 1, needsDate: true },
  { subject: '英语', module: '听力',     moduleKey: 'listening',  defaultUnit: '分钟', defaultTarget: 20 },
  { subject: '英语', module: '阅读',     moduleKey: 'reading',    defaultUnit: '分钟', defaultTarget: 20 },
  { subject: '数学', module: '口算练习', moduleKey: 'arithmetic', defaultUnit: '道',   defaultTarget: 20 },
  { subject: '语文', module: '古诗词',   moduleKey: 'poems',      defaultUnit: '首',   defaultTarget: 1 },
  { subject: '语文', module: '默写练习', moduleKey: 'dictation',  defaultUnit: '道',   defaultTarget: 10 },
  { subject: '跨学科', module: '错题复习', moduleKey: 'mistakes', defaultUnit: '道',   defaultTarget: 5 },
]

function makeItemId() {
  return `item_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
}

function makePlanId(type) {
  return `plan_${getTodayStr().replace(/-/g, '')}_${type}_${Date.now()}`
}

export default function PlanEditor({ user }) {
  const navigate = useNavigate()
  const { todayPlan, weekPlan, savePlan, deletePlan } = usePlan(user)
  const [planType, setPlanType] = useState('daily')
  const [items, setItems] = useState([])
  const [editingPlan, setEditingPlan] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const today = getTodayStr()
  const week = makeWeekRange()

  // Load existing plan when type or plans change
  useEffect(() => {
    if (planType === 'daily' && todayPlan) {
      setEditingPlan(todayPlan)
      setItems(todayPlan.items.map(i => ({ ...i })))
    } else if (planType === 'weekly' && weekPlan) {
      setEditingPlan(weekPlan)
      setItems(weekPlan.items.map(i => ({ ...i })))
    } else {
      setEditingPlan(null)
      setItems([])
    }
    setConfirmDelete(false)
  }, [planType, todayPlan?.id, weekPlan?.id])

  function addItem(opt) {
    setItems(prev => [
      ...prev,
      {
        id: makeItemId(),
        subject: opt.subject,
        module: opt.module,
        moduleKey: opt.moduleKey,
        targetValue: opt.defaultTarget,
        targetUnit: opt.defaultUnit,
        scheduledDate: opt.needsDate ? today : null,
        completedValue: 0,
        done: false,
      },
    ])
  }

  function updateItem(id, changes) {
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...changes } : item))
  }

  function removeItem(id) {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  function handleSave() {
    if (!user?.uid || items.length === 0) return
    const plan = {
      id: editingPlan?.id || makePlanId(planType),
      userId: user.uid,
      type: planType,
      startDate: planType === 'daily' ? today : week.start,
      endDate: planType === 'daily' ? today : week.end,
      status: 'active',
      items: items.map(({ completedValue: _cv, done: _d, ...rest }) => ({
        ...rest, completedValue: 0, done: false,
      })),
      createdAt: editingPlan?.createdAt || Date.now(),
      updatedAt: Date.now(),
    }
    savePlan(plan)
    navigate('/')
  }

  function handleDelete() {
    if (!editingPlan) return
    deletePlan(editingPlan.id)
    navigate('/')
  }

  const addedKeys = new Set(items.map(i => i.moduleKey))

  return (
    <div className="plan-editor">
      <div className="pe-header">
        <button className="pe-back-btn" onClick={() => navigate('/')}>← 返回</button>
        <h1 className="pe-title">制定学习计划</h1>
      </div>

      {/* Plan type selector */}
      <div className="pe-type-row">
        <button
          className={`pe-type-btn${planType === 'daily' ? ' pe-type-btn--active' : ''}`}
          onClick={() => setPlanType('daily')}
        >
          <span className="pe-type-icon">📅</span>
          <span className="pe-type-label">今日计划</span>
          <span className="pe-type-date">{today}</span>
        </button>
        <button
          className={`pe-type-btn${planType === 'weekly' ? ' pe-type-btn--active' : ''}`}
          onClick={() => setPlanType('weekly')}
        >
          <span className="pe-type-icon">📆</span>
          <span className="pe-type-label">本周计划</span>
          <span className="pe-type-date">{week.start} ~ {week.end}</span>
        </button>
      </div>

      {/* Current items */}
      <div className="pe-section">
        <div className="pe-section-title">
          {planType === 'daily' ? '今日' : '本周'}计划项目
          {items.length > 0 && <span className="pe-item-count"> ({items.length} 项)</span>}
        </div>

        {items.length === 0 ? (
          <div className="pe-empty">还没有计划项目 — 从下方添加学习模块。</div>
        ) : (
          <div className="pe-item-list">
            {items.map(item => (
              <div key={item.id} className="pe-item">
                <div className="pe-item-head">
                  <span className="pe-item-tag">{item.subject}</span>
                  <span className="pe-item-module">{item.module}</span>
                  <button className="pe-item-del" onClick={() => removeItem(item.id)} aria-label="删除">✕</button>
                </div>
                <div className="pe-item-body">
                  <label className="pe-item-label">目标数量</label>
                  <input
                    className="pe-item-input"
                    type="number"
                    min="1"
                    value={item.targetValue}
                    onChange={e => updateItem(item.id, { targetValue: Math.max(1, parseInt(e.target.value) || 1) })}
                  />
                  <span className="pe-item-unit">{item.targetUnit}</span>
                  {item.scheduledDate !== null && (
                    <>
                      <label className="pe-item-label pe-item-label--date">指定日期</label>
                      <input
                        className="pe-item-input pe-item-input--date"
                        type="date"
                        value={item.scheduledDate || today}
                        min={week.start}
                        max={week.end}
                        onChange={e => updateItem(item.id, { scheduledDate: e.target.value })}
                      />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Module picker */}
      <div className="pe-section">
        <div className="pe-section-title">添加模块</div>
        <div className="pe-module-grid">
          {MODULE_OPTIONS.map(opt => {
            const added = addedKeys.has(opt.moduleKey)
            return (
              <button
                key={opt.moduleKey}
                className={`pe-module-btn${added ? ' pe-module-btn--added' : ''}`}
                onClick={() => { if (!added) addItem(opt) }}
                disabled={added}
              >
                <div className="pe-module-sub">{opt.subject}</div>
                <div className="pe-module-name">{opt.module}</div>
                <div className="pe-module-hint">{opt.defaultTarget} {opt.defaultUnit}</div>
                {added && <div className="pe-module-added-mark">✓</div>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="pe-actions">
        {editingPlan && !confirmDelete && (
          <button className="pe-delete-btn" onClick={() => setConfirmDelete(true)}>
            删除此计划
          </button>
        )}
        {confirmDelete && (
          <div className="pe-confirm-row">
            <span className="pe-confirm-text">确认删除？</span>
            <button className="pe-confirm-yes" onClick={handleDelete}>确认</button>
            <button className="pe-confirm-no" onClick={() => setConfirmDelete(false)}>取消</button>
          </div>
        )}
        <button
          className="pe-save-btn"
          onClick={handleSave}
          disabled={items.length === 0}
        >
          {editingPlan ? '保存修改' : '创建计划'}
        </button>
      </div>
    </div>
  )
}
