import { useState } from 'react'
import './Subject.css'
import './JuniorSubject.css'

const CHAPTERS = [
  {
    id: 'matter',
    title: '物质构成',
    icon: '⚗️',
    points: [
      {
        title: '原子、分子、离子',
        content: '**原子**是化学变化中最小的粒子。**分子**是保持物质化学性质的最小粒子。**离子**是带电的原子或原子团（阳离子 / 阴离子）。',
        exam: '化学变化中：分子分裂→原子重组→新分子；原子个数、种类、质量不变',
      },
      {
        title: '元素与化学式',
        content: '元素：具有相同**质子数**的一类原子。化合物化学式中各元素化合价代数和为零。常见化合价：Na⁺、K⁺、Ca²⁺、Mg²⁺、Al³⁺、Fe²⁺/³⁺、Cu²⁺、H⁺、OH⁻、O²⁻、Cl⁻、SO₄²⁻、CO₃²⁻、NO₃⁻。',
        exam: '根据化合价写化学式：交叉约简法',
      },
      {
        title: '相对原子/分子质量',
        content: '相对原子质量 ≈ 质子数 + 中子数。相对分子质量 = 各原子相对原子质量之和。物质的量 n = m/M，1 mol 任何粒子含 6.02×10²³ 个（阿伏加德罗常数）。',
        formula: 'M(H₂O) = 2×1 + 16 = 18；M(CO₂) = 44',
        exam: '计算物质中某元素的质量分数',
      },
    ],
  },
  {
    id: 'reaction',
    title: '化学反应',
    icon: '🔥',
    points: [
      {
        title: '四种基本反应类型',
        content: '**化合**：A+B→AB。**分解**：AB→A+B。**置换**：A+BC→AC+B（活动性强的金属置换弱的）。**复分解**：AB+CD→AD+CB（生成沉淀/气体/水时才能发生）。',
        exam: '判断反应类型是中考常见题型',
      },
      {
        title: '质量守恒定律',
        content: '化学反应前后**原子种类和数目不变**，所以各物质质量之和不变。氧化还原反应：氧化剂得氧（被还原），还原剂失氧（被氧化）。',
        exam: '用质量守恒定律求未知物的化学式或质量',
      },
      {
        title: '常见化学方程式',
        content: '**燃烧**：C+O₂→CO₂；2H₂+O₂→2H₂O。**分解**：2H₂O₂→2H₂O+O₂↑；2KClO₃→2KCl+3O₂↑。**中和**：HCl+NaOH→NaCl+H₂O。**置换**：Fe+CuSO₄→FeSO₄+Cu。',
        exam: '配平化学方程式：原子守恒，最小公倍数法',
      },
    ],
  },
  {
    id: 'acid_base',
    title: '酸碱盐',
    icon: '🧪',
    points: [
      {
        title: '酸与碱',
        content: '**酸**：电离时产生的阳离子全是 H⁺。常见酸：盐酸（HCl）、硫酸（H₂SO₄）、硝酸（HNO₃）。**碱**：电离时产生的阴离子全是 OH⁻。常见碱：NaOH、Ca(OH)₂、NH₃·H₂O。',
        exam: '酸的通性：与指示剂、活泼金属、碱性氧化物、碱、某些盐反应',
      },
      {
        title: 'pH 与中和反应',
        content: 'pH < 7 酸性，pH = 7 中性，pH > 7 碱性。中和反应：酸 + 碱 → 盐 + 水（复分解反应）。酸碱指示剂：石蕊（酸→红，碱→蓝）；酚酞（酸→无色，碱→红）。',
        exam: '配制溶液：pH 的测量与应用',
      },
      {
        title: '盐的化学性质',
        content: '**盐**：由金属离子和酸根离子构成。Na₂CO₃（纯碱/苏打）、NaHCO₃（小苏打）、NaCl（食盐）、CaCO₃（大理石）、BaSO₄（不溶于酸，白色）。碳酸钙与盐酸：CaCO₃+2HCl→CaCl₂+H₂O+CO₂↑。',
        exam: '区别 Na₂CO₃ 和 NaCl：加稀盐酸，有气泡的是碳酸钠',
      },
    ],
  },
  {
    id: 'life',
    title: '化学与生活',
    icon: '🌱',
    points: [
      {
        title: '空气与水',
        content: '空气组成：N₂（78%）、O₂（21%）、稀有气体（0.94%）、CO₂（0.03%）。硬水（含 Ca²⁺/Mg²⁺）软化：煮沸（暂时硬水）或蒸馏。净水：沉降→过滤→吸附→消毒。',
        exam: '过滤操作：一贴二低三靠（滤纸紧贴漏斗，液面低于滤纸，玻璃棒靠三层滤纸）',
      },
      {
        title: '碳与碳的氧化物',
        content: '碳的同素异形体：金刚石（最硬）、石墨（导电）、C₆₀。CO：无色无味有毒，可燃（2CO+O₂→2CO₂），还原性（用于炼铁）。CO₂：不燃不助燃，温室效应。',
        exam: 'CO₂验满：带火星木条放瓶口（熄灭则满）；CO₂检验：通入澄清石灰水变浑浊',
      },
      {
        title: '金属与材料',
        content: '金属活动性顺序：K Ca Na Mg Al Zn Fe Sn Pb **H** Cu Hg Ag Pt Au。排在 H 前的金属能与稀酸置换出 H₂。铁的冶炼：3CO+Fe₂O₃→2Fe+3CO₂（高炉）。防锈：涂油漆、镀锌、做合金。',
        exam: '比较金属活动性：与同种酸反应的剧烈程度；置换反应判断',
      },
    ],
  },
]

export default function Chemistry({ user }) {
  const [activeChapter, setActiveChapter] = useState('matter')
  const [expandedPoints, setExpandedPoints] = useState({})

  const chapter = CHAPTERS.find(c => c.id === activeChapter)

  function togglePoint(id) {
    setExpandedPoints(p => ({ ...p, [id]: !p[id] }))
  }

  return (
    <div className="junior-subject">
      <h2 className="subject-title">化学 <span className="edition">山西中考 · 人教版</span></h2>

      <div className="chapter-tabs">
        {CHAPTERS.map(c => (
          <button
            key={c.id}
            className={`chapter-tab ${activeChapter === c.id ? 'active' : ''}`}
            onClick={() => setActiveChapter(c.id)}
          >
            {c.icon} {c.title}
          </button>
        ))}
      </div>

      <div className="knowledge-list">
        {chapter.points.map((p, i) => {
          const key = `${activeChapter}-${i}`
          const open = expandedPoints[key]
          return (
            <div key={key} className="knowledge-card" onClick={() => togglePoint(key)}>
              <div className="knowledge-header">
                <span className="knowledge-title">{p.title}</span>
                <span className="expand-icon">{open ? '▲' : '▼'}</span>
              </div>
              {open && (
                <div className="knowledge-body">
                  <div className="knowledge-content" dangerouslySetInnerHTML={{ __html: renderMd(p.content) }} />
                  {p.formula && (
                    <div className="formula-box">
                      <span className="formula-label">方程式：</span>{p.formula}
                    </div>
                  )}
                  {p.exam && (
                    <div className="exam-tip">
                      <span className="exam-label">中考考点</span>
                      {p.exam}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function renderMd(text) {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}
