import { useState } from 'react'
import '../JuniorSubject.css'
import './ChineseJunior.css'

// ── 初中必背古诗文（人教版 7-9年级）
const JUNIOR_POEMS = [
  {
    grade: 7,
    title: '观沧海',
    author: '曹操',
    dynasty: '东汉',
    content: '东临碣石，以观沧海。\n水何澹澹，山岛竦峙。\n树木丛生，百草丰茂。\n秋风萧瑟，洪波涌起。\n日月之行，若出其中；\n星汉灿烂，若出其里。\n幸甚至哉，歌以咏志。',
    notes: '碣石：山名。澹澹：水波荡漾。竦峙：高耸挺立。星汉：银河。',
    theme: '登碣石山观大海，抒发统一天下的豪情壮志。',
    exam: '《观沧海》中最能体现诗人博大胸怀的句子：日月之行，若出其中；星汉灿烂，若出其里。',
  },
  {
    grade: 7,
    title: '次北固山下',
    author: '王湾',
    dynasty: '唐',
    content: '客路青山外，行舟绿水前。\n潮平两岸阔，风正一帆悬。\n海日生残夜，江春入旧年。\n乡书何处达？归雁洛阳边。',
    notes: '次：停宿。北固山：在今江苏镇江。悬：挂。残夜：天将亮未亮时。',
    theme: '旅途见闻，抒发思乡之情，蕴含新旧交替的哲理。',
    exam: '蕴含哲理的名句：海日生残夜，江春入旧年。（新旧交替，积极向上）',
  },
  {
    grade: 7,
    title: '闻王昌龄左迁龙标遥有此寄',
    author: '李白',
    dynasty: '唐',
    content: '杨花落尽子规啼，闻道龙标过五溪。\n我寄愁心与明月，随君直到夜郎西。',
    notes: '左迁：贬官。龙标：今湖南黔阳。子规：杜鹃鸟，啼声凄凉。五溪：五条溪流。',
    theme: '听闻友人被贬，借明月传递牵挂与安慰之情。',
    exam: '表达对友人关切的句子：我寄愁心与明月，随君直到夜郎西。',
  },
  {
    grade: 7,
    title: '天净沙·秋思',
    author: '马致远',
    dynasty: '元',
    content: '枯藤老树昏鸦，\n小桥流水人家，\n古道西风瘦马。\n夕阳西下，\n断肠人在天涯。',
    notes: '天净沙：曲牌名。昏鸦：黄昏中的乌鸦。断肠人：漂泊异乡、极度思乡的人。',
    theme: '描绘秋天荒凉景象，抒发漂泊天涯的孤寂愁苦。',
    exam: '被称为"秋思之祖"；全曲用9个名词叠加，无一动词，却意境深远。',
  },
  {
    grade: 7,
    title: '春望',
    author: '杜甫',
    dynasty: '唐',
    content: '国破山河在，城春草木深。\n感时花溅泪，恨别鸟惊心。\n烽火连三月，家书抵万金。\n白头搔更短，浑欲不胜簪。',
    notes: '国破：安史之乱，长安沦陷。烽火：战争。浑欲：简直要。簪：发簪。',
    theme: '安史之乱中忧国伤时、思念家人的沉痛情感。',
    exam: '表达战乱中思念亲人的千古名句：烽火连三月，家书抵万金。',
  },
  {
    grade: 8,
    title: '使至塞上',
    author: '王维',
    dynasty: '唐',
    content: '单车欲问边，属国过居延。\n征蓬出汉塞，归雁入胡天。\n大漠孤烟直，长河落日圆。\n萧关逢候骑，都护在燕然。',
    notes: '使至：出使到达。属国：典属国，官职名。征蓬：飘飞的蓬草。候骑：侦察骑兵。',
    theme: '出使边塞途中，描绘壮阔的塞外风光，暗含被排挤出朝廷的抑郁。',
    exam: '被誉为"千古壮观"的名句：大漠孤烟直，长河落日圆。（构图雄浑，色彩明丽）',
  },
  {
    grade: 8,
    title: '饮酒（其五）',
    author: '陶渊明',
    dynasty: '东晋',
    content: '结庐在人境，而无车马喧。\n问君何能尔？心远地自偏。\n采菊东篱下，悠然见南山。\n山气日夕佳，飞鸟相与还。\n此中有真意，欲辨已忘言。',
    notes: '结庐：建造房屋。尔：这样。偏：偏僻，远离尘世。欲辨已忘言：想说又忘了怎么说。',
    theme: '归隐田园后的悠然自得，追求心灵的宁静与自由。',
    exam: '流传最广的名句：采菊东篱下，悠然见南山。（"见"字妙在无意中所见，体现悠闲）',
  },
  {
    grade: 8,
    title: '渡荆门送别',
    author: '李白',
    dynasty: '唐',
    content: '渡远荆门外，来从楚国游。\n山随平野尽，江入大荒流。\n月下飞天镜，云生结海楼。\n仍怜故乡水，万里送行舟。',
    notes: '荆门：山名，今湖北宜都。楚国：古楚国地域。大荒：广阔无际的原野。海楼：海市蜃楼。',
    theme: '出蜀途中描写壮阔景色，抒发对故乡的依恋之情。',
    exam: '"仍怜故乡水，万里送行舟"：拟人手法，借故乡水送行表达对故乡的深情。',
  },
  {
    grade: 9,
    title: '酬乐天扬州初逢席上见赠',
    author: '刘禹锡',
    dynasty: '唐',
    content: '巴山楚水凄凉地，二十三年弃置身。\n怀旧空吟闻笛赋，到乡翻似烂柯人。\n沉舟侧畔千帆过，病树前头万木春。\n今日听君歌一曲，暂凭杯酒长精神。',
    notes: '弃置身：被贬谪。闻笛赋：指向秀的《思旧赋》。烂柯人：指晋人王质，喻长期离家。',
    theme: '被贬归来后，表达对仕途坎坷的感慨，同时展现乐观豁达的精神。',
    exam: '含哲理的千古名句：沉舟侧畔千帆过，病树前头万木春。（新事物必将取代旧事物）',
  },
  {
    grade: 9,
    title: '水调歌头·明月几时有',
    author: '苏轼',
    dynasty: '宋',
    content: '明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间。\n转朱阁，低绮户，照无眠。不应有恨，何事长向别时圆？人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。',
    notes: '宫阙：宫殿。琼楼玉宇：美玉建成的楼宇，指月宫。婵娟：指月亮，也指美好的事物。',
    theme: '中秋醉酒后对月抒怀，表达对弟弟苏辙的思念，蕴含人生哲理。',
    exam: '最广为人知的名句：但愿人长久，千里共婵娟。（表达美好祝愿和豁达胸怀）',
  },
]

// ── 初中语文知识点
const KNOWLEDGE_POINTS = [
  {
    category: '修辞手法',
    icon: '✍️',
    points: [
      {
        title: '比喻',
        content: '用某一事物来比喻另一事物，使表达更生动形象。三要素：本体、喻体、喻词（像/如/似/是）。**明喻**："像"；**暗喻**："是"；**借喻**：直接用喻体，不出现本体。',
        example: '明喻：叶子出水很高，像亭亭的舞女的裙。\n暗喻：月亮是夜晚的眼睛。\n借喻：弯弯的月儿小小的船。（月儿=船）',
        exam: '区分比喻和比拟：比喻是"像什么"，比拟是"当什么来写"',
      },
      {
        title: '拟人',
        content: '把事物当作人来写，赋予事物人的动作、情感或语言，使表达生动活泼。',
        example: '春天迈着轻盈的脚步向我们走来。\n太阳公公笑眯眯地看着大地。',
        exam: '拟人的作用：使文章生动形象，增强感染力，表达作者的情感',
      },
      {
        title: '排比',
        content: '三个或三个以上结构相似、语气一致的词组或句子排列在一起，起强调和加强语气的作用。',
        example: '爱心是一片照射在冬日的阳光，爱心是一泓出现在沙漠里的泉水，爱心是一首飘荡在夜空的歌谣。',
        exam: '排比的作用：加强语气，增强气势，增加文章的感染力',
      },
      {
        title: '夸张',
        content: '对事物进行扩大或缩小的描写，以突出事物的特征，引起强烈的联想。**扩大夸张**：飞流直下三千尺。**缩小夸张**：五岭逶迤腾细浪。',
        exam: '夸张的目的：突出特征，增强表现力，不是谎言',
      },
      {
        title: '对偶',
        content: '字数相等、结构相同（或相近）、意思相关的两个短语或句子对称排列。上下两句叫"对联"，诗中叫"对仗"。',
        example: '春蚕到死丝方尽，蜡炬成灰泪始干。\n两岸青山相对出，孤帆一片日边来。',
        exam: '对偶 vs 排比：对偶是两句对称；排比是三句以上',
      },
      {
        title: '反问',
        content: '用疑问的形式表达确定的意思，不需要回答，加强语气，引发思考。',
        example: '难道我们不应该尊敬老师吗？（意思是：我们应该尊敬老师）',
        exam: '反问的作用：加强语气，强调观点，引发读者思考',
      },
    ],
  },
  {
    category: '文体知识',
    icon: '📖',
    points: [
      {
        title: '记叙文六要素',
        content: '时间、地点、人物、事件起因、经过、结果。记叙文以记叙、描写为主要表达方式，叙述生活中真实或虚构的事件。',
        exam: '记叙顺序：顺叙（时间先后）、倒叙（先写结果/后来的情节）、插叙（暂停主线，插入相关内容）',
      },
      {
        title: '说明文分类与方法',
        content: '**分类**：事物说明文（介绍事物）、事理说明文（阐明事理）。**说明顺序**：时间顺序、空间顺序、逻辑顺序。**说明方法**：举例子、列数字、作比较、打比方、下定义、分类别、引资料、作诠释、摹状貌。',
        exam: '说明方法判断：举例子（"例如"）、列数字（数据）、作比较（"相当于"）、打比方（"像"）',
      },
      {
        title: '议论文三要素',
        content: '**论点**（中心论点/分论点）、**论据**（事实论据/道理论据）、**论证**（举例论证/道理论证/对比论证/比喻论证）。结构：提出问题→分析问题→解决问题。',
        exam: '找中心论点：常在开头、结尾或标题中；论点是一个判断句（是……的）',
      },
      {
        title: '古诗词体裁',
        content: '**古体诗**（唐以前）：不拘格律。**近体诗**：律诗（8句4联：首/颔/颈/尾）、绝句（4句）。**词**：有词牌名，长短句，又叫"诗余"。**曲**：元曲，有曲牌名，可加衬字。',
        exam: '律诗要求：颔联颈联必须对仗；绝句4句，不要求对仗',
      },
    ],
  },
  {
    category: '文言文基础',
    icon: '📜',
    points: [
      {
        title: '常见虚词',
        content: '**之**：助词（的/凑音节）、代词（他/这/它）、动词（去/往）。**而**：连词（表并列/递进/转折/修饰）。**其**：代词（他的/那）、语气词（大概/难道）。**以**：介词（用/凭/因为）、连词（而且/来）。**于**：介词（在/向/到/对/比）。',
        exam: '虚词"之"的用法：公输盘之攻械（助词，的）；吾欲之南海（动词，去）；忘之（代词，这件事）',
      },
      {
        title: '词类活用',
        content: '**名词活用为动词**：驴不胜怒，蹄之（蹄→用蹄子踢）。**形容词活用为动词**：亲贤臣，远小人（亲→亲近）。**名词作状语**：其一犬坐于前（犬→像狗一样）。**使动用法**：故天将降大任于是人也（任→让…承担）。',
        exam: '判断词类活用：结合上下文，看词在句中的语法位置和作用',
      },
      {
        title: '文言句式',
        content: '**判断句**："……者，……也"。**倒装句**：宾语前置（微斯人，吾谁与归）、定语后置（马之千里者）、状语后置（祭以尉首）。**省略句**：省主语/谓语/宾语/介词。**被动句**："为……所……"',
        exam: '宾语前置标志：否定句中代词宾语（不知其可也）；疑问词作宾语（微斯人，吾谁与归）',
      },
      {
        title: '常见通假字',
        content: '**曾**益其所不能（曾=增）；**甚矣，汝之不惠**（惠=慧）；**固以怪之矣**（以=已）；**河曲智叟亡以应**（亡=无）；**寒暑易节，始一反焉**（反=返）；**学而时习之，不亦说乎**（说=悦）。',
        exam: '通假字特点：字形不同，但读音相同或相近，意义通用',
      },
    ],
  },
  {
    category: '写作技巧',
    icon: '🖊️',
    points: [
      {
        title: '开头与结尾',
        content: '**好的开头**：开门见山、引用名言、设置悬念、景物描写点题。**好的结尾**：总结全文、照应开头、抒情议论升华主题、引用诗句作结。避免：开头空洞无物，结尾生硬突兀。',
        exam: '考场作文开头3种常用方式：题记式/引用式/设问式',
      },
      {
        title: '描写方法',
        content: '**人物描写**：外貌、语言、动作、心理、神态描写。**环境描写**：自然环境（烘托气氛、暗示人物心情）、社会环境（交代背景）。**直接描写** vs **侧面描写**（通过他人反应）。',
        exam: '细节描写的作用：使人物形象生动，情节真实可信',
      },
      {
        title: '表现手法',
        content: '**借景抒情**：融情于景（"一切景语皆情语"）。**托物言志**：借物品的特点象征某种品质（《爱莲说》）。**对比衬托**：通过对比突出主体。**虚实结合**：眼前实景与想象虚景结合。**象征**：用具体事物表示抽象意义。',
        exam: '区分借景抒情和托物言志：前者写景为主，后者咏物为主（物有人格化特点）',
      },
    ],
  },
]

export default function ChineseJunior({ section }) {
  const [activeCategory, setActiveCategory] = useState(0)
  const [expandedPoints, setExpandedPoints] = useState({})
  const [gradeFilter, setGradeFilter] = useState('all')
  const [selectedPoem, setSelectedPoem] = useState(null)

  if (section === 'junior_poems') {
    const filteredPoems = gradeFilter === 'all' ? JUNIOR_POEMS : JUNIOR_POEMS.filter(p => p.grade === Number(gradeFilter))

    if (selectedPoem) {
      return (
        <div className="junior-subject">
          <button className="junior-back" onClick={() => setSelectedPoem(null)}>← 返回列表</button>
          <div className="poem-detail-card">
            <div className="poem-detail-header">
              <h2 className="poem-detail-title">{selectedPoem.title}</h2>
              <div className="poem-detail-meta">{selectedPoem.dynasty} · {selectedPoem.author} · {selectedPoem.grade}年级</div>
            </div>
            <pre className="poem-detail-content">{selectedPoem.content}</pre>
            {selectedPoem.notes && (
              <div className="poem-detail-section">
                <div className="poem-detail-label">注释</div>
                <p className="poem-detail-text">{selectedPoem.notes}</p>
              </div>
            )}
            <div className="poem-detail-section">
              <div className="poem-detail-label">主题思想</div>
              <p className="poem-detail-text">{selectedPoem.theme}</p>
            </div>
            <div className="exam-tip" style={{ marginTop: 12 }}>
              <span className="exam-label">中考考点</span>
              {selectedPoem.exam}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="junior-subject">
        <h2 className="subject-title">初中必背古诗文 <span className="edition">人教版 7-9年级</span></h2>
        <div className="chapter-tabs">
          {['all', '7', '8', '9'].map(g => (
            <button key={g} className={`chapter-tab ${gradeFilter === g ? 'active' : ''}`} onClick={() => setGradeFilter(g)}>
              {g === 'all' ? '全部' : `${g}年级`}
            </button>
          ))}
        </div>
        <div className="poem-list">
          {filteredPoems.map((p, i) => (
            <div key={i} className="poem-list-item" onClick={() => setSelectedPoem(p)}>
              <div className="poem-list-left">
                <div className="poem-list-title">{p.title}</div>
                <div className="poem-list-meta">{p.dynasty} · {p.author}</div>
              </div>
              <div className="poem-list-right">
                <span className="poem-grade-badge">{p.grade}年级</span>
                <span className="poem-list-arrow">›</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // junior_knowledge
  const cat = KNOWLEDGE_POINTS[activeCategory]
  return (
    <div className="junior-subject">
      <h2 className="subject-title">语文知识点 <span className="edition">初中考点</span></h2>
      <div className="chapter-tabs">
        {KNOWLEDGE_POINTS.map((c, i) => (
          <button key={i} className={`chapter-tab ${activeCategory === i ? 'active' : ''}`} onClick={() => setActiveCategory(i)}>
            {c.icon} {c.category}
          </button>
        ))}
      </div>
      <div className="knowledge-list">
        {cat.points.map((p, i) => {
          const key = `${activeCategory}-${i}`
          const open = expandedPoints[key]
          return (
            <div key={key} className="knowledge-card" onClick={() => setExpandedPoints(prev => ({ ...prev, [key]: !prev[key] }))}>
              <div className="knowledge-header">
                <span className="knowledge-title">{p.title}</span>
                <span className="expand-icon">{open ? '▲' : '▼'}</span>
              </div>
              {open && (
                <div className="knowledge-body">
                  <div className="knowledge-content" dangerouslySetInnerHTML={{ __html: p.content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
                  {p.example && (
                    <div className="formula-box" style={{ fontFamily: 'inherit', whiteSpace: 'pre-line' }}>
                      <span className="formula-label">例句：</span>{p.example}
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
