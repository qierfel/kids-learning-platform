// Browse 生字表 by grade/semester, see 一类字 and 二类字
import { useState } from 'react'
import { CHARACTER_LISTS } from '../../data/characterLists'
import { ttsSpeak } from '../../utils/tts'

export default function CharacterList({ onBack }) {
  const [grade, setGrade] = useState(1)
  const [semester, setSemester] = useState('上')
  const [typeFilter, setTypeFilter] = useState('all') // 'all'|'type1'|'type2'

  const data = CHARACTER_LISTS.find(d => d.grade === grade && d.semester === semester)

  const chars = !data ? [] :
    typeFilter === 'type1' ? data.type1 :
    typeFilter === 'type2' ? data.type2 :
    [...data.type1, ...data.type2]

  return (
    <div style={{ padding: '0 16px 80px' }}>
      {/* grade selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {[1,2,3,4,5,6].map(g => (
          <button key={g} onClick={() => setGrade(g)}
            style={{ padding: '6px 14px', borderRadius: 20, border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer',
              background: grade === g ? '#e85d4a' : '#f1f5f9', color: grade === g ? '#fff' : '#64748b' }}>
            {g}年级
          </button>
        ))}
      </div>
      {/* semester */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {['上','下'].map(s => (
          <button key={s} onClick={() => setSemester(s)}
            style={{ padding: '6px 20px', borderRadius: 20, border: 'none', fontWeight: 700, cursor: 'pointer',
              background: semester === s ? '#e85d4a' : '#f1f5f9', color: semester === s ? '#fff' : '#64748b' }}>
            {s}册
          </button>
        ))}
      </div>
      {/* type filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[['all','全部字'],['type1','一类字（必写）'],['type2','二类字（认读）']].map(([v,l]) => (
          <button key={v} onClick={() => setTypeFilter(v)}
            style={{ padding: '5px 14px', borderRadius: 16, border: `2px solid ${typeFilter===v?'#e85d4a':'#e2e8f0'}`,
              fontWeight: 600, fontSize: 12, cursor: 'pointer', background: typeFilter===v?'#fff5f5':'#fff', color: typeFilter===v?'#e85d4a':'#64748b' }}>
            {l}
          </button>
        ))}
      </div>
      {/* stats */}
      {data && <div style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>
        一类字 {data.type1.length} 个 · 二类字 {data.type2.length} 个
      </div>}
      {/* char grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: 10 }}>
        {chars.map((char, i) => {
          const isType1 = data?.type1.includes(char)
          return (
            <button key={i} onClick={() => ttsSpeak(char, { voice: 'shimmer' }).catch(()=>{})}
              style={{ padding: '12px 4px', borderRadius: 10, border: `2px solid ${isType1?'#fca5a5':'#bfdbfe'}`,
                background: isType1?'#fff5f5':'#eff6ff', fontSize: 24, fontWeight: 700,
                cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              {char}
              <span style={{ fontSize: 9, color: isType1?'#ef4444':'#3b82f6', fontWeight: 600 }}>
                {isType1?'写':'认'}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
