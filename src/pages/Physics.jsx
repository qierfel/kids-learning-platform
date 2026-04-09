import { useState } from 'react'
import './Subject.css'
import './JuniorSubject.css'

const CHAPTERS = [
  {
    id: 'sound',
    title: '声学',
    icon: '🔊',
    tag: '中考必考',
    points: [
      {
        title: '声音的产生与传播',
        content: '声音由物体**振动**产生，通过介质（固体/液体/气体）传播，**真空不能传声**。声速：固体 > 液体 > 气体。空气中约 340 m/s。',
        formula: 'v = s / t（速度 = 路程 / 时间）',
        exam: '判断声音能否传播的关键：有无介质',
      },
      {
        title: '声音三要素',
        content: '**音调**：振动频率决定，频率越高音调越高。**响度**：振幅和距离决定，振幅越大响度越大。**音色**：由发声体材料和结构决定，是区分不同声音的依据。',
        exam: '闻其声知其人 → 辨别音色',
      },
      {
        title: '噪声控制',
        content: '从**声源处**减弱（消声器）、**传播途中**减弱（隔音墙）、**接收处**减弱（耳塞）。分贝（dB）衡量响度，0 dB 是听觉下限。',
        exam: '三种控制噪声方式各举一例',
      },
    ],
  },
  {
    id: 'light',
    title: '光学',
    icon: '💡',
    tag: '中考必考',
    points: [
      {
        title: '光的直线传播',
        content: '光在**同种均匀介质**中沿直线传播。现象：小孔成像、影子、日食月食。光速 c = 3×10⁸ m/s（真空中）。',
        exam: '小孔成像：倒立的实像，与物体形状相同',
      },
      {
        title: '光的反射',
        content: '反射定律：**入射角 = 反射角**，入射光线、法线、反射光线在同一平面。镜面反射（平整表面）vs 漫反射（粗糙表面）。平面镜成虚像，像与物等大，左右对称，像距 = 物距。',
        formula: 'θ反射 = θ入射',
        exam: '平面镜成像特点："等大、等距、垂直、虚像"',
      },
      {
        title: '光的折射与透镜',
        content: '光从一种介质进入另一种介质时发生折射。凸透镜对光**会聚**，凹透镜对光**发散**。焦距 f：平行光经凸透镜后交于焦点。',
        formula: '1/u + 1/v = 1/f（物距 u，像距 v，焦距 f）',
        exam: '凸透镜成像规律：u>2f→倒立缩小实像（照相机），f<u<2f→倒立放大实像（投影仪），u<f→正立放大虚像（放大镜）',
      },
    ],
  },
  {
    id: 'heat',
    title: '热学',
    icon: '🌡️',
    tag: '重点',
    points: [
      {
        title: '物态变化',
        content: '固→液：**熔化**（吸热）；液→固：**凝固**（放热）；液→气：**汽化**（吸热）；气→液：**液化**（放热）；固→气：**升华**（吸热）；气→固：**凝华**（放热）。',
        exam: '生活实例：水的沸腾（汽化）、结冰（凝固）、冰雪化水（熔化）、露水（液化）、霜（凝华）、干冰（升华）',
      },
      {
        title: '内能与热传递',
        content: '内能：物体内所有分子热运动的动能和势能之和。**热量**不能说"含有"，只能说"吸收"或"放出"。热传递方式：传导、对流、辐射。',
        formula: 'Q = cmΔt（Q 热量，c 比热容，m 质量，Δt 温度差）',
        exam: '水的比热容最大（4200 J/kg·℃），生活意义：海洋调节气候',
      },
    ],
  },
  {
    id: 'mechanics',
    title: '力学',
    icon: '⚙️',
    tag: '中考核心',
    points: [
      {
        title: '力与运动',
        content: '牛顿第一定律：物体不受力时保持静止或匀速直线运动（**惯性定律**）。力是改变运动状态的原因，不是维持运动的原因。合力：同向相加，反向相减。',
        exam: '惯性大小只与质量有关，与速度无关',
      },
      {
        title: '重力、弹力、摩擦力',
        content: '**重力** G = mg（g≈10 N/kg，方向竖直向下）。**弹力**：弹簧在弹性限度内 F = kx。**摩擦力**：f = μN（滑动摩擦），静摩擦力等于外力（最大静摩擦 > 滑动摩擦）。',
        exam: '增大/减小摩擦力的方法：改变压力或接触面粗糙程度',
      },
      {
        title: '压强与浮力',
        content: '**压强** p = F/S（单位：帕 Pa）。液体压强 p = ρgh。大气压约 1.01×10⁵ Pa。**浮力** F浮 = ρ液gV排（阿基米德原理）。浮沉条件：F浮 > G 上浮，F浮 < G 下沉，F浮 = G 悬浮/漂浮。',
        formula: 'F浮 = ρ液gV排',
        exam: '密度计：越稀的液体沉得越深（刻度越大在下）',
      },
      {
        title: '功与机械能',
        content: '功 W = Fs，单位焦耳（J）。功率 P = W/t = Fv。动能 Ek = ½mv²，重力势能 Ep = mgh。机械能守恒（只有重力做功时）。',
        formula: 'W = Fs，P = W/t，η = W有用/W总',
        exam: '简单机械：杠杆（力矩平衡：F₁L₁ = F₂L₂）、滑轮',
      },
    ],
  },
  {
    id: 'em',
    title: '电磁学',
    icon: '⚡',
    tag: '中考核心',
    points: [
      {
        title: '电路基础',
        content: '串联：电流处处相等，电压分配。并联：电压相等，电流分配。电阻串联：R = R₁+R₂；并联：1/R = 1/R₁+1/R₂。',
        formula: 'I = U/R（欧姆定律）',
        exam: '电流表内阻小（串联），电压表内阻大（并联）',
      },
      {
        title: '电功与电热',
        content: '电功 W = UIt = Pt。电功率 P = UI = I²R = U²/R。电热 Q = I²Rt（焦耳定律）。家庭电路：220V 交流电，安全电压 ≤ 36V。',
        formula: 'P = UI，Q = I²Rt',
        exam: '电热丝发热：串联时电阻大的发热多；并联时电阻小的发热多',
      },
      {
        title: '磁场与电磁感应',
        content: '磁场方向：由 N 极到 S 极（外部）。电流的磁效应（奥斯特实验）→ 电动机原理（磁场对电流有力）。电磁感应（法拉第）→ 发电机原理（导体在磁场中运动产生电流）。',
        exam: '电动机：电能→机械能；发电机：机械能→电能',
      },
    ],
  },
]

export default function Physics({ user }) {
  const [activeChapter, setActiveChapter] = useState('sound')
  const [expandedPoints, setExpandedPoints] = useState({})

  const chapter = CHAPTERS.find(c => c.id === activeChapter)

  function togglePoint(id) {
    setExpandedPoints(p => ({ ...p, [id]: !p[id] }))
  }

  return (
    <div className="junior-subject">
      <h2 className="subject-title">物理 <span className="edition">山西中考 · 人教版</span></h2>

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
                      <span className="formula-label">公式：</span>{p.formula}
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

// Simple bold markdown renderer
function renderMd(text) {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}
