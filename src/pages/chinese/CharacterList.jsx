// Browse 生字表 by grade/semester, see 一类字 and 二类字; 词语表 tab shows vocabulary words
import { useState, useMemo } from 'react'
import { CHARACTER_LISTS } from '../../data/characterLists'
import characters from '../../data/characters'
import { vocabList } from '../../data/vocabList'
import { ttsSpeak } from '../../utils/tts'

// Get pinyin for a multi-character word by joining each character's pinyin
function getWordPinyin(word) {
  return [...word].map(ch => characters[ch]?.pinyin || '').filter(Boolean).join(' ')
}

export default function CharacterList({ onBack }) {
  const [grade, setGrade] = useState(1)
  const [semester, setSemester] = useState('上')
  const [typeFilter, setTypeFilter] = useState('all') // 'all'|'type1'|'type2'
  const [view, setView] = useState('chars') // 'chars'|'words'

  const data = CHARACTER_LISTS.find(d => d.grade === grade && d.semester === semester)

  const chars = !data ? [] :
    typeFilter === 'type1' ? data.type1 :
    typeFilter === 'type2' ? data.type2 :
    [...data.type1, ...data.type2]

  // Build lesson vocabulary from standard 部编版 vocab list
  const vocabKey = `${grade}-${semester === '上' ? '1' : '2'}`
  const lessonWords = useMemo(() => {
    return (vocabList[vocabKey] || []).filter(l => l.words.length > 0)
  }, [vocabKey])

  const totalWords = lessonWords.reduce((sum, l) => sum + l.words.length, 0)

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
      {/* view tabs: 生字 / 词语表 */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 16, borderBottom: '2px solid #e2e8f0' }}>
        {[['chars','生字本'],['words','词语表']].map(([v,l]) => (
          <button key={v} onClick={() => setView(v)}
            style={{ padding: '8px 20px', border: 'none', background: 'none', fontWeight: 700, fontSize: 14,
              cursor: 'pointer', color: view === v ? '#e85d4a' : '#94a3b8',
              borderBottom: `3px solid ${view === v ? '#e85d4a' : 'transparent'}`,
              marginBottom: -2 }}>
            {l}
          </button>
        ))}
      </div>

      {view === 'chars' && (
        <>
          {/* type filter */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
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
          {/* per-lesson char groups */}
          {data?.lessons ? (
            data.lessons.map(l => {
              const lessonChars = typeFilter === 'type1' ? (l.type1 || []) :
                typeFilter === 'type2' ? (l.type2 || []) :
                [...(l.type1 || []), ...(l.type2 || [])]
              if (lessonChars.length === 0) return null
              return (
                <div key={l.lesson} style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 8,
                    borderLeft: '3px solid #e85d4a', paddingLeft: 8 }}>
                    第{l.lesson}课 · {l.title}
                    <span style={{ marginLeft: 8, fontWeight: 400, fontSize: 11 }}>
                      {l.type1?.length > 0 && `写${l.type1.length}`}
                      {l.type1?.length > 0 && l.type2?.length > 0 && '·'}
                      {l.type2?.length > 0 && `认${l.type2.length}`}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(68px, 1fr))', gap: 10 }}>
                    {lessonChars.map((char, i) => {
                      const isType1 = (l.type1 || []).includes(char)
                      const pinyin = characters[char]?.pinyin || ''
                      return (
                        <button key={i} onClick={() => ttsSpeak(char, { voice: 'shimmer' }).catch(()=>{})}
                          style={{ padding: '10px 4px', borderRadius: 10, border: `2px solid ${isType1?'#fca5a5':'#bfdbfe'}`,
                            background: isType1?'#fff5f5':'#eff6ff', fontSize: 22, fontWeight: 700,
                            cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                          {char}
                          {pinyin && <span style={{ fontSize: 9, color: '#7c6b8e', fontWeight: 400, lineHeight: 1.4 }}>{pinyin}</span>}
                          <span style={{ fontSize: 9, color: isType1?'#ef4444':'#3b82f6', fontWeight: 600 }}>
                            {isType1?'写':'认'}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(68px, 1fr))', gap: 10 }}>
              {chars.map((char, i) => {
                const isType1 = data?.type1.includes(char)
                const pinyin = characters[char]?.pinyin || ''
                return (
                  <button key={i} onClick={() => ttsSpeak(char, { voice: 'shimmer' }).catch(()=>{})}
                    style={{ padding: '10px 4px', borderRadius: 10, border: `2px solid ${isType1?'#fca5a5':'#bfdbfe'}`,
                      background: isType1?'#fff5f5':'#eff6ff', fontSize: 22, fontWeight: 700,
                      cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    {char}
                    {pinyin && <span style={{ fontSize: 9, color: '#7c6b8e', fontWeight: 400, lineHeight: 1.4 }}>{pinyin}</span>}
                    <span style={{ fontSize: 9, color: isType1?'#ef4444':'#3b82f6', fontWeight: 600 }}>
                      {isType1?'写':'认'}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </>
      )}

      {view === 'words' && (
        <>
          {data && <div style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>
            共 {totalWords} 个词语
          </div>}
          {lessonWords.length === 0 && (
            <div style={{ color: '#94a3b8', textAlign: 'center', marginTop: 40, fontSize: 15 }}>
              暂无词语数据
            </div>
          )}
          {lessonWords.map(({ lesson, title, words }) => (
            <div key={lesson} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 8,
                borderLeft: '3px solid #e85d4a', paddingLeft: 8 }}>
                {typeof lesson === 'number' ? `第${lesson}课 · ${title}` : title}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 8 }}>
                {words.map((word, i) => {
                  const pinyin = getWordPinyin(word)
                  return (
                    <button key={i} onClick={() => ttsSpeak(word, { voice: 'shimmer' }).catch(()=>{})}
                      style={{ padding: '10px 6px', borderRadius: 10, border: '2px solid #fde68a',
                        background: '#fffbeb', cursor: 'pointer',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                      <span style={{ fontSize: 18, fontWeight: 700, color: '#1e293b' }}>{word}</span>
                      <span style={{ fontSize: 9, color: '#92400e', lineHeight: 1.2, textAlign: 'center' }}>{pinyin}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
