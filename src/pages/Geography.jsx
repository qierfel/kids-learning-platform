import { useState } from 'react'
import './Subject.css'
import './JuniorSubject.css'

const CHAPTERS = [
  {
    id: 'earth',
    title: '地球与地图',
    icon: '🌐',
    points: [
      {
        title: '地球的形状与大小',
        content: '地球是一个**两极稍扁、赤道略鼓**的不规则球体。平均半径约 6371 km，赤道周长约 4 万千米，表面积约 5.1 亿 km²。证明地球是球体的证据：麦哲伦环球航行、卫星照片、轮船从远处驶来先见桅杆。',
        exam: '区分地球形状和大小的相关数据',
      },
      {
        title: '经纬线与经纬度',
        content: '**经线**（子午线）：连接南北极的半圆，指示南北方向，所有经线等长。**纬线**：与赤道平行的圆，指示东西方向，赤道最长向两极缩短。**本初子午线**（0°经线）。东西半球分界：20°W 和 160°E。南北半球分界：赤道（0°纬线）。低纬（0°-30°）、中纬（30°-60°）、高纬（60°-90°）。',
        exam: '判断东西半球：以20°W和160°E为界；高中低纬度的划分',
      },
      {
        title: '地图三要素',
        content: '**比例尺**：图上距离 ÷ 实际距离，越大表示的范围越小越详细。**方向**：一般上北下南左西右东；有指向标以指向标为准；经纬网地图按经纬线定方向。**图例**：地图上各种符号的说明。等高线：同一等高线上高度相同，密集处坡陡，稀疏处坡缓。',
        formula: '比例尺 = 图上距离 / 实地距离',
        exam: '等高线判断地形：山顶（闭合，中心高）、山谷（等高线向高处凸）、山脊（向低处凸）、陡崖（等高线重合）',
      },
    ],
  },
  {
    id: 'world_geo',
    title: '世界地理',
    icon: '🗺️',
    points: [
      {
        title: '大洲与大洋',
        content: '七大洲（从大到小）：**亚洲、非洲、北美洲、南美洲、南极洲、欧洲、大洋洲**。四大洋（从大到小）：**太平洋、大西洋、印度洋、北冰洋**。亚欧大陆最大，南极洲无人定居。亚洲和欧洲的分界线：乌拉尔山脉—乌拉尔河—里海—大高加索山脉—黑海—土耳其海峡。',
        exam: '"亚非拉"是发展中国家集中地区；"欧北美大洋"发达国家多',
      },
      {
        title: '气候类型与分布',
        content: '**热带**（0°-回归线）：热带雨林（赤道附近）、热带草原、热带季风、热带沙漠。**温带**（回归线-极圈）：地中海（夏干冬湿）、温带海洋性、温带大陆性、温带季风。**寒带**（极圈-极点）。**影响气候的因素**：纬度位置、海陆位置、地形、洋流。',
        exam: '地中海气候：夏季炎热干燥，冬季温和多雨（南北纬30°-40°大陆西岸）',
      },
      {
        title: '世界人口与资源',
        content: '人口分布：**亚洲东部和南部、欧洲西部、北美东部**人口密集；沙漠、寒带、热带雨林人口稀少。人口增长过快→粮食/环境问题（发展中国家）；人口老龄化→劳动力不足（发达国家）。世界三大宗教：**基督教**（欧美，最多）、**伊斯兰教**（西亚北非）、**佛教**（东南亚）。',
        exam: '人口问题：发展中国家（增长过快）vs 发达国家（老龄化）',
      },
    ],
  },
  {
    id: 'china_geo',
    title: '中国地理',
    icon: '🇨🇳',
    points: [
      {
        title: '中国地形与河流',
        content: '地势**西高东低**，三级阶梯。**第一级**（青藏高原，海拔>4000m）→**第二级**（内蒙古高原/黄土高原/云贵高原，1000-2000m）→**第三级**（东部平原丘陵，<500m）。四大高原：青藏/内蒙古/黄土/云贵。四大盆地：塔里木（最大）/准噶尔/柴达木/四川。三大平原：东北/华北/长江中下游。**长江**（6300km，最长）、**黄河**（5464km，第二长，"母亲河"，中游黄土高原水土流失严重）。',
        exam: '地势西高东低→大河自西向东流入海洋；三级阶梯界线',
      },
      {
        title: '中国气候与农业',
        content: '气候复杂多样：**东部季风气候**（南方热带/亚热带，北方温带季风）、西北干旱半干旱、青藏高寒气候。秦岭—淮河线：800mm等降水量线/1月0℃等温线/南北方界线。南方种水稻（热量充足），北方种小麦（耐旱）。**东部农业区、西部牧业区**。',
        exam: '秦岭—淮河的地理意义：南北气候/植被/农业/河流水文特征的分界线',
      },
      {
        title: '中国人口与城市',
        content: '人口约**14亿**，世界第一（2023年印度超过中国）。人口政策：计划生育→二孩→三孩政策。人口分布：**黑河—腾冲线**（胡焕庸线）东南密、西北稀。民族：**56个民族**，汉族占91.51%，少数民族主要分布在西南/西北/东北。四个直辖市：北京/天津/上海/重庆。',
        exam: '胡焕庸线：黑龙江黑河到云南腾冲，东南占94%人口',
      },
    ],
  },
  {
    id: 'shanxi',
    title: '山西地理',
    icon: '⛰️',
    points: [
      {
        title: '山西概况',
        content: '山西省位于**黄土高原**东部，太行山以西（"山西"由此得名），黄河以东。省会**太原**。地势：东高西低，南高北低。境内多山，山地面积占全省60%。山西被称为"表里山河"——**太行山**在东，**黄河**在西南。',
        exam: '山西地形以高原山地为主，黄土高原是其主体',
      },
      {
        title: '山西的河流与资源',
        content: '**汾河**：山西最大、最长的河流（发源于宁武管涔山，流经太原，注入黄河）。山西煤炭资源丰富，是全国重要的煤炭能源基地（"煤都"大同）。**大同煤矿**（优质动力煤）、**阳泉**（无烟煤）。晋城阳城蟒河自然保护区。五台山（佛教名山）、平遥古城（世界文化遗产）、云冈石窟（世界文化遗产）。',
        exam: '汾河流域是山西人口和经济最集中的地区；煤炭是山西最重要的矿产资源',
      },
      {
        title: '山西的气候与农业',
        content: '**温带大陆性季风气候**：四季分明，降水集中夏季（7-9月），年降水量400-650mm（南多北少）。冬季寒冷干燥，夏季炎热多雨。主要农作物：小麦/玉米/谷子（小米是山西特产）/高粱。**小米**：沁州黄等品种，太行山区有机旱作农业。黄土高原水土流失严重，退耕还林还草是治理重点。',
        exam: '山西属温带季风气候，但大陆性较强；汾河谷地是粮食主产区',
      },
    ],
  },
]

export default function Geography({ user }) {
  const [activeChapter, setActiveChapter] = useState('earth')
  const [expandedPoints, setExpandedPoints] = useState({})

  const chapter = CHAPTERS.find(c => c.id === activeChapter)

  function togglePoint(id) {
    setExpandedPoints(p => ({ ...p, [id]: !p[id] }))
  }

  return (
    <div className="junior-subject">
      <h2 className="subject-title">地理 <span className="edition">山西中考 · 人教版</span></h2>

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

function renderMd(text) {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}
