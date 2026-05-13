/**
 * AITeacherSelector — lets kids choose an AI "teacher role" to call the API with.
 *
 * props:
 *   selected:    string   – current teacher id
 *   onSelect:    (id) => void
 *   accent:      string
 */

export const AI_TEACHERS = [
  {
    id: 'creative',
    name: '创意老师',
    emoji: '🎨',
    color: '#f97316',
    desc: '想出有趣的功能点子和创意',
    system: `你是一位充满创意的AI编程老师，专门帮10-12岁的孩子想出有趣的功能点子和创意方向。
你的风格：活泼、有趣、想象力丰富。
规则：用简单中文，回答控制在150字内，给具体可执行的创意建议，不要泛泛而谈。`,
  },
  {
    id: 'coder',
    name: '页面老师',
    emoji: '💻',
    color: '#0ea5e9',
    desc: '帮你写清楚的HTML/CSS代码',
    system: `你是一位专注网页实现的AI编程老师，专门帮10-12岁的孩子用HTML/CSS/JavaScript写代码。
你的风格：严谨、清晰、注重实际可运行。
规则：用简单中文，代码要加中文注释，每次只给最重要的一小段代码，控制在200字内。`,
  },
  {
    id: 'debugger',
    name: '查错老师',
    emoji: '🔍',
    color: '#f59e0b',
    desc: '帮找代码里的bug和错误',
    system: `你是一位专门排查代码错误的AI编程老师，帮10-12岁的孩子找出代码里的bug。
你的风格：耐心、细心、善于发现问题。
规则：用简单中文，先说可能的原因，再给修复建议，控制在200字内，不要写太多代码。`,
  },
  {
    id: 'reviewer',
    name: '复查老师',
    emoji: '✅',
    color: '#10b981',
    desc: '检查作品是否完整有没有遗漏',
    system: `你是一位仔细检查作品的AI编程老师，帮10-12岁的孩子检查他们的网页或代码项目。
你的风格：全面、认真、给出明确的改进清单。
规则：用简单中文，给出"做到了/还需要"两列清单，控制在200字内。`,
  },
]

export default function AITeacherSelector({ selected, onSelect, accent = '#6366f1' }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
      {AI_TEACHERS.map(t => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          style={{
            border: `2px solid ${selected === t.id ? t.color : 'rgba(148,163,184,0.2)'}`,
            background: selected === t.id ? `${t.color}15` : 'rgba(15,23,42,0.5)',
            borderRadius: 12, padding: '12px 14px', cursor: 'pointer',
            textAlign: 'left', transition: 'all 0.15s',
          }}
        >
          <div style={{ fontSize: 22, marginBottom: 4 }}>{t.emoji}</div>
          <div style={{ fontWeight: 700, fontSize: 13, color: selected === t.id ? t.color : '#e2e8f0' }}>
            {t.name}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(203,213,225,0.7)', marginTop: 2, lineHeight: 1.4 }}>
            {t.desc}
          </div>
        </button>
      ))}
    </div>
  )
}
