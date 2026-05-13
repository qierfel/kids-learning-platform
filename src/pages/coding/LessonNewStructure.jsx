import { useState } from 'react'
import './Lesson.css'

export const DEVICE_BADGE = (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
    <span style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>📱 手机</span>
    <span style={{ background: '#e0e7ff', color: '#4338ca', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>🖥️ iPad</span>
    <span style={{ background: '#dcfce7', color: '#15803d', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>💻 电脑</span>
    <span style={{ background: '#fdf4ff', color: '#86198f', fontSize: 11, padding: '4px 10px', borderRadius: 999 }}>🤖 AI工具手机/iPad/电脑都能用</span>
  </div>
)

const SECTION_LABELS = [
  '今天做什么',
  '学到什么',
  '看例子',
  '动手做',
  '让AI帮',
  'Q&A',
  '挑战升级',
  '作品输出',
]

/**
 * LessonNewStructure — 8-section container for L30-L41.
 *
 * props:
 *   onBack:   () => void
 *   accent:   string         – primary colour for this lesson
 *   module:   string         – e.g. "模块 H · AI 编程搭档"
 *   lessonNum: number        – e.g. 30
 *   title:    string
 *   subtitle: string
 *   sections: [ReactNode × 8]  – exactly 8 children, one per section
 */
export default function LessonNewStructure({ onBack, accent = '#6366f1', module = '模块 H', lessonNum, title, subtitle, sections }) {
  const [tab, setTab] = useState(0)

  return (
    <div className="lesson-page">
      <button className="lesson-back" onClick={onBack}>← 返回</button>
      {DEVICE_BADGE}

      <div className="lesson-header" style={{ padding: '0 16px 16px' }}>
        <div className="lesson-tag" style={{
          display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '4px 12px',
          borderRadius: 999, background: `${accent}20`, color: accent,
          marginBottom: 10, letterSpacing: 0.5,
        }}>
          {module}
        </div>
        <h1 style={{ margin: 0, fontSize: 'clamp(22px,5vw,30px)', fontWeight: 900, color: '#f8fafc', lineHeight: 1.2 }}>
          第{lessonNum}课：{title}
        </h1>
        {subtitle && (
          <p style={{ margin: '8px 0 0', color: 'rgba(203,213,225,0.8)', fontSize: 14 }}>{subtitle}</p>
        )}
      </div>

      {/* Tab bar */}
      <div style={{
        display: 'flex', overflowX: 'auto', gap: 6, padding: '0 16px 14px',
        scrollbarWidth: 'none', msOverflowStyle: 'none',
      }}>
        {SECTION_LABELS.map((label, i) => (
          <button
            key={i}
            onClick={() => setTab(i)}
            style={{
              flexShrink: 0,
              padding: '7px 14px',
              borderRadius: 999,
              border: 'none',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              background: tab === i ? accent : 'rgba(30,41,59,0.7)',
              color: tab === i ? '#fff' : 'rgba(203,213,225,0.8)',
              transition: 'all 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            {i + 1}. {label}
          </button>
        ))}
      </div>

      <div style={{ padding: '0 16px 16px' }}>
        {sections && sections[tab]}
      </div>
    </div>
  )
}

/* ── Small reusable UI atoms ── */

export function InfoCard({ children, accent = '#6366f1', style }) {
  return (
    <div style={{
      background: `${accent}12`, borderLeft: `4px solid ${accent}`,
      borderRadius: 12, padding: '14px 16px', marginBottom: 16,
      ...style,
    }}>
      {children}
    </div>
  )
}

export function SectionTitle({ children, accent = '#6366f1' }) {
  return (
    <h3 style={{ color: accent, fontSize: 16, fontWeight: 800, marginTop: 20, marginBottom: 10 }}>
      {children}
    </h3>
  )
}

export function AiCallButton({ onClick, loading, label = '✨ 让AI帮我', accent = '#6366f1' }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        width: '100%', padding: '14px', borderRadius: 12, border: 'none',
        background: loading ? '#cbd5e1' : accent,
        color: '#fff', fontSize: 15, fontWeight: 700,
        cursor: loading ? 'default' : 'pointer',
        marginTop: 12, transition: 'background 0.2s',
      }}
    >
      {loading ? '⏳ AI 正在思考…' : label}
    </button>
  )
}

export function AiResult({ text, error, accent = '#6366f1' }) {
  if (error) return (
    <div style={{ marginTop: 12, padding: '12px 16px', background: '#fef2f2', borderRadius: 10, color: '#b91c1c', fontSize: 14 }}>
      {error}
    </div>
  )
  if (!text) return null
  return (
    <div style={{
      marginTop: 12, padding: '16px', background: `${accent}08`,
      border: `1.5px solid ${accent}30`, borderRadius: 12,
      fontSize: 14, color: '#f8fafc', lineHeight: 1.8, whiteSpace: 'pre-wrap',
    }}>
      {text}
    </div>
  )
}

export function OutputCard({ title, children, accent = '#6366f1' }) {
  return (
    <div style={{
      border: `2px solid ${accent}`, borderRadius: 14,
      padding: '16px', marginTop: 16,
    }}>
      <div style={{ fontWeight: 800, color: accent, marginBottom: 10, fontSize: 15 }}>
        {title}
      </div>
      {children}
    </div>
  )
}
