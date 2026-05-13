// 部编版/人教版 小学古诗词数据库
// 涵盖一至六年级必背古诗（含75首课标必背 + 教材扩展篇目）

const poems = [
  {
    title: "咏鹅",
    author: "骆宾王",
    dynasty: "唐",
    grade: 1,
    lines: [
      "鹅，鹅，鹅，",
      "曲项向天歌。",
      "白毛浮绿水，",
      "红掌拨清波。"
    ],
    notes: "曲项：弯着脖子。歌：鸣叫。浮：漂浮。拨：划动。",
    theme: "抓住鹅的颜色、动作和姿态，写出鹅活泼可爱的样子。",
    exam: "常考：1. 诗中从哪些方面写鹅；2. “浮”“拨”两个动词的作用。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "画",
    author: "王维（存疑）",
    dynasty: "唐",
    grade: 1,
    lines: [
      "远看山有色，",
      "近听水无声。",
      "春去花还在，",
      "人来鸟不惊。"
    ],
    notes: "色：颜色。无声：没有声音。春去：春天过去。惊：害怕而飞走。",
    theme: "通过“远看、近听、春去、人来”的反常现象，表现画中的景物栩栩如生。",
    exam: "常考：1. 诗中哪些地方和现实相反；2. 这首诗为什么写得像谜语。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "江南",
    author: "汉乐府",
    dynasty: "汉",
    grade: 1,
    lines: [
      "江南可采莲，",
      "莲叶何田田，",
      "鱼戏莲叶间。",
      "鱼戏莲叶东，",
      "鱼戏莲叶西，",
      "鱼戏莲叶南，",
      "鱼戏莲叶北。"
    ],
    notes: "何田田：荷叶又多又密的样子。戏：嬉戏。",
    theme: "描绘江南采莲时节的热闹景象，表现水乡生活的活泼与快乐。",
    exam: "常考：1. “田田”写出了什么；2. 鱼在莲叶间嬉戏有什么表达效果。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "悯农·其二",
    author: "李绅",
    dynasty: "唐",
    grade: 1,
    lines: [
      "锄禾日当午，",
      "汗滴禾下土。",
      "谁知盘中餐，",
      "粒粒皆辛苦。"
    ],
    notes: "锄禾：给庄稼锄草。盘中餐：碗里的饭。皆：都。",
    theme: "写农民劳动辛苦，提醒人们珍惜粮食。",
    exam: "常考：1. 农民辛苦体现在哪里；2. 诗歌告诉我们什么道理。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "古朗月行",
    author: "李白",
    dynasty: "唐",
    grade: 1,
    lines: [
      "小时不识月，",
      "呼作白玉盘。",
      "又疑瑶台镜，",
      "飞在青云端。"
    ],
    notes: "呼作：称作。白玉盘：白玉做的盘子。瑶台镜：仙宫里的镜子。青云端：高高的云端。",
    theme: "写儿童眼中的月亮，表现月亮的圆润明亮和孩子丰富的想象力。",
    exam: "常考：1. 把月亮比作什么；2. 这首诗表现了儿童怎样的特点。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "风",
    author: "李峤",
    dynasty: "唐",
    grade: 1,
    lines: [
      "解落三秋叶，",
      "能开二月花。",
      "过江千尺浪，",
      "入竹万竿斜。"
    ],
    notes: "解落：能够吹落。三秋：秋季。二月花：早春的花。斜：倾斜。",
    theme: "从落叶、开花、江浪、竹林四方面写风的力量。",
    exam: "常考：1. 诗中风带来了哪些变化；2. 这首诗怎样把看不见的风写出来。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "春晓",
    author: "孟浩然",
    dynasty: "唐",
    grade: 1,
    lines: [
      "春眠不觉晓，",
      "处处闻啼鸟。",
      "夜来风雨声，",
      "花落知多少。"
    ],
    notes: "春眠：春天里睡觉。晓：天亮。闻：听见。知多少：不知道有多少。",
    theme: "写春晨醒来时的感受，表现诗人对春天的喜爱和惜花之情。",
    exam: "常考：1. 前两句写了什么春景；2. 后两句表达了怎样的感情。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "赠汪伦",
    author: "李白",
    dynasty: "唐",
    grade: 1,
    lines: [
      "李白乘舟将欲行，",
      "忽闻岸上踏歌声。",
      "桃花潭水深千尺，",
      "不及汪伦送我情。"
    ],
    notes: "将欲行：正要出发。踏歌：一边唱歌一边用脚打拍子。深千尺：极言水深。及：比得上。",
    theme: "通过夸张写法赞美朋友送别情深。",
    exam: "常考：1. 后两句用了什么修辞；2. 诗人怎样表现友情深厚。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "静夜思",
    author: "李白",
    dynasty: "唐",
    grade: 1,
    lines: [
      "床前明月光，",
      "疑是地上霜。",
      "举头望明月，",
      "低头思故乡。"
    ],
    notes: "疑：怀疑，以为。举头：抬头。思：思念。",
    theme: "借月光写思乡之情，语言明白自然。",
    exam: "常考：1. 诗中哪些动作表现了思乡；2. “疑是地上霜”有什么作用。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "池上",
    author: "白居易",
    dynasty: "唐",
    grade: 1,
    lines: [
      "小娃撑小艇，",
      "偷采白莲回。",
      "不解藏踪迹，",
      "浮萍一道开。"
    ],
    notes: "小娃：小孩。撑：划。艇：小船。踪迹：行动留下的痕迹。浮萍：浮在水面的植物。",
    theme: "写儿童偷采白莲后不懂掩饰的天真可爱。",
    exam: "常考：1. 小娃“可爱”体现在哪里；2. “浮萍一道开”的画面感。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "小池",
    author: "杨万里",
    dynasty: "宋",
    grade: 1,
    lines: [
      "泉眼无声惜细流，",
      "树阴照水爱晴柔。",
      "小荷才露尖尖角，",
      "早有蜻蜓立上头。"
    ],
    notes: "泉眼：泉水出口。惜：爱惜。晴柔：晴天里柔和的风光。尖尖角：刚露出的嫩尖。",
    theme: "描绘初夏小池的清新景象，充满生机和情趣。",
    exam: "常考：1. 诗中写了哪些景物；2. “才露”“早有”表现了什么。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "寻隐者不遇",
    author: "贾岛",
    dynasty: "唐",
    grade: 1,
    lines: [
      "松下问童子，",
      "言师采药去。",
      "只在此山中，",
      "云深不知处。"
    ],
    notes: "隐者：隐居的人。不遇：没有见到。童子：小徒弟。云深：云雾浓重。",
    theme: "通过问答写访友不遇，表现隐者生活的高洁和山中环境的幽深。",
    exam: "常考：1. 诗中人物对话说明了什么；2. “云深不知处”营造了怎样的意境。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "登鹳雀楼",
    author: "王之涣",
    dynasty: "唐",
    grade: 1,
    lines: [
      "白日依山尽，",
      "黄河入海流。",
      "欲穷千里目，",
      "更上一层楼。"
    ],
    notes: "依：挨着。欲：想要。穷：尽。更：再。",
    theme: "写登楼所见的壮阔景象，并借景说明只有站得高才能看得远。",
    exam: "常考：1. 前两句写景特点；2. 后两句蕴含的道理。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "望庐山瀑布",
    author: "李白",
    dynasty: "唐",
    grade: 2,
    lines: [
      "日照香炉生紫烟，",
      "遥看瀑布挂前川。",
      "飞流直下三千尺，",
      "疑是银河落九天。"
    ],
    notes: "香炉：香炉峰。紫烟：紫色的云烟。挂前川：像挂在前面的河流上。九天：极高的天空。",
    theme: "写庐山瀑布雄奇壮丽，表现诗人丰富想象和赞叹之情。",
    exam: "常考：1. “挂”字的妙处；2. “疑是银河落九天”的表达效果。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "绝句",
    author: "杜甫",
    dynasty: "唐",
    grade: 2,
    note: "两个黄鹂",
    lines: [
      "两个黄鹂鸣翠柳，",
      "一行白鹭上青天。",
      "窗含西岭千秋雪，",
      "门泊东吴万里船。"
    ],
    notes: "鸣：鸣叫。翠柳：翠绿色的柳树。千秋雪：终年不化的积雪。泊：停靠。",
    theme: "有声有色、有远有近地描绘明丽春景。",
    exam: "常考：1. 诗中写了哪些景物；2. 这首诗的画面有什么特点。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "敕勒歌",
    author: "北朝民歌",
    dynasty: "南北朝",
    grade: 2,
    lines: [
      "敕勒川，阴山下，",
      "天似穹庐，笼盖四野。",
      "天苍苍，野茫茫，",
      "风吹草低见牛羊。"
    ],
    notes: "敕勒川：草原地名。穹庐：像帐篷一样的圆顶。笼盖：笼罩。四野：四面八方的原野。见：同“现”。",
    theme: "展现草原辽阔壮美和牧场生机。",
    exam: "常考：1. “天似穹庐”写出了什么；2. 最后一句表现了怎样的草原景象。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "江雪",
    author: "柳宗元",
    dynasty: "唐",
    grade: 2,
    lines: [
      "千山鸟飞绝，",
      "万径人踪灭。",
      "孤舟蓑笠翁，",
      "独钓寒江雪。"
    ],
    notes: "绝：没有。径：小路。踪灭：踪迹消失。蓑笠翁：披蓑衣戴斗笠的老翁。",
    theme: "通过极静极冷的雪景，衬托渔翁孤高坚忍的形象。",
    exam: "常考：1. 前两句营造了怎样的环境；2. 渔翁形象有什么特点。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "梅花",
    author: "王安石",
    dynasty: "宋",
    grade: 2,
    lines: [
      "墙角数枝梅，",
      "凌寒独自开。",
      "遥知不是雪，",
      "为有暗香来。"
    ],
    notes: "凌寒：冒着严寒。遥知：远远知道。为：因为。暗香：清幽的香气。",
    theme: "赞美梅花不畏严寒、高洁坚强的品格。",
    exam: "常考：1. 梅花的特点；2. “遥知不是雪”为何能判断。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "夜宿山寺",
    author: "李白",
    dynasty: "唐",
    grade: 2,
    lines: [
      "危楼高百尺，",
      "手可摘星辰。",
      "不敢高声语，",
      "恐惊天上人。"
    ],
    notes: "宿：住宿。危楼：高楼。百尺：形容很高。恐：害怕。",
    theme: "用夸张写法表现山寺楼高，想象奇特。",
    exam: "常考：1. 诗中怎样表现楼高；2. 夸张手法的作用。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "小儿垂钓",
    author: "胡令能",
    dynasty: "唐",
    grade: 2,
    lines: [
      "蓬头稚子学垂纶，",
      "侧坐莓苔草映身。",
      "路人借问遥招手，",
      "怕得鱼惊不应人。"
    ],
    notes: "蓬头：头发乱蓬蓬。稚子：小孩子。莓苔：长着青苔的草地。侧坐：斜着身子坐。借问：向人打听。",
    theme: "写儿童学钓鱼的专注和天真。",
    exam: "常考：1. 孩子为什么“遥招手”；2. 诗中的儿童形象。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "咏柳",
    author: "贺知章",
    dynasty: "唐",
    grade: 2,
    lines: [
      "碧玉妆成一树高，",
      "万条垂下绿丝绦。",
      "不知细叶谁裁出，",
      "二月春风似剪刀。"
    ],
    notes: "碧玉：绿色的玉。妆成：装扮成。丝绦：丝带。裁：剪。",
    theme: "把柳树比作美人，写早春杨柳的柔美。",
    exam: "常考：1. 两个比喻分别写什么；2. “二月春风似剪刀”的妙处。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "晓出净慈寺送林子方",
    author: "杨万里",
    dynasty: "宋",
    grade: 2,
    lines: [
      "毕竟西湖六月中，",
      "风光不与四时同。",
      "接天莲叶无穷碧，",
      "映日荷花别样红。"
    ],
    notes: "晓出：早晨走出。净慈寺：寺名。毕竟：到底。四时：四季。映日：映照着太阳。",
    theme: "描绘西湖夏日荷花景色，赞叹西湖之美。",
    exam: "常考：1. 诗中哪些句子写荷花；2. “接天莲叶无穷碧”的画面特点。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "赋得古原草送别",
    author: "白居易",
    dynasty: "唐",
    grade: 2,
    lines: [
      "离离原上草，",
      "一岁一枯荣。",
      "野火烧不尽，",
      "春风吹又生。"
    ],
    notes: "赋得：按指定题目作诗。离离：草木茂盛的样子。枯荣：枯萎和茂盛。尽：完。",
    theme: "借草的顽强生命力表达送别之情。",
    exam: "常考：1. “野火烧不尽，春风吹又生”的含义；2. 草象征什么。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "村居",
    author: "高鼎",
    dynasty: "清",
    grade: 2,
    lines: [
      "草长莺飞二月天，",
      "拂堤杨柳醉春烟。",
      "儿童散学归来早，",
      "忙趁东风放纸鸢。"
    ],
    notes: "拂堤：轻轻擦过堤岸。醉：迷人。散学：放学。纸鸢：风筝。",
    theme: "写春天乡村景色和儿童放风筝的快乐。",
    exam: "常考：1. 春景体现在哪些地方；2. 后两句表现了怎样的儿童生活。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "舟夜书所见",
    author: "查慎行",
    dynasty: "清",
    grade: 2,
    lines: [
      "月黑见渔灯，",
      "孤光一点萤。",
      "微微风簇浪，",
      "散作满河星。"
    ],
    notes: "书：写。萤：萤火虫。孤光：一点点灯光。散作：散成。满河星：满河闪闪的倒影。",
    theme: "写夜晚行舟所见，表现宁静而有趣的夜色。",
    exam: "常考：1. 诗中写了哪两种光；2. “满河星”营造了怎样的画面。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "早发白帝城",
    author: "李白",
    dynasty: "唐",
    grade: 3,
    lines: [
      "朝辞白帝彩云间，",
      "千里江陵一日还。",
      "两岸猿声啼不尽，",
      "轻舟已过万重山。"
    ],
    notes: "朝：早晨。辞：告别。彩云间：彩云缭绕之间。还：返回。啼不住：不停地叫。",
    theme: "写三峡行船迅疾和诗人遇赦后的轻快心情。",
    exam: "常考：1. 从哪些词看出船快；2. 全诗表达了怎样的心情。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "望天门山",
    author: "李白",
    dynasty: "唐",
    grade: 3,
    lines: [
      "天门中断楚江开，",
      "碧水东流至北回。",
      "两岸青山相对出，",
      "孤帆一片日边来。"
    ],
    notes: "中断：从中间断开。楚江：长江中下游古称。开：劈开。出：耸出。",
    theme: "写天门山夹江对峙和江水奔流的壮丽景象。",
    exam: "常考：1. “碧水东流至此回”写出了什么；2. 诗中画面有什么气势。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "山行",
    author: "杜牧",
    dynasty: "唐",
    grade: 3,
    lines: [
      "远上寒山石径斜，",
      "白云生处有人家。",
      "停车坐爱枫林晚，",
      "霜叶红于二月花。"
    ],
    notes: "寒山：深秋时节的山。石径：石头小路。白云生处：白云升起的地方。坐：因为。",
    theme: "写秋山景色，赞美枫林晚景。",
    exam: "常考：1. 诗中哪些景物构成了秋景；2. “霜叶红于二月花”的含义。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "望洞庭",
    author: "刘禹锡",
    dynasty: "唐",
    grade: 3,
    lines: [
      "湖光秋月两相和，",
      "潭面无风镜未磨。",
      "遥望洞庭山水翠，",
      "白银盘里一青螺。"
    ],
    notes: "和：和谐，这里指水色与月光融为一体。镜未磨：没有打磨过的镜子。青螺：青绿色的螺。",
    theme: "描写月夜洞庭湖的宁静秀美。",
    exam: "常考：1. 把洞庭湖比作什么；2. “白银盘里一青螺”的妙处。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "所见",
    author: "袁枚",
    dynasty: "清",
    grade: 3,
    lines: [
      "牧童骑黄牛，",
      "歌声振林樾。",
      "意欲捕鸣蝉，",
      "忽然闭口立。"
    ],
    notes: "振：震荡。意欲：想要。捕：捉。立：停下。",
    theme: "写牧童由放声歌唱到忽然停下捕蝉的生动画面。",
    exam: "常考：1. 牧童形象特点；2. 诗中动静变化的作用。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "饮湖上初晴后雨",
    author: "苏轼",
    dynasty: "宋",
    grade: 3,
    lines: [
      "水光潋滟晴方好，",
      "山色空蒙雨亦奇。",
      "欲把西湖比西子，",
      "淡妆浓抹总相宜。"
    ],
    notes: "潋滟：水波荡漾的样子。空蒙：迷茫朦胧。相宜：都很适合。西子：西施。",
    theme: "写西湖晴天和雨天都很美。",
    exam: "常考：1. 晴雨西湖各有什么特点；2. 把西湖比作西子的作用。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "赠刘景文",
    author: "苏轼",
    dynasty: "宋",
    grade: 3,
    lines: [
      "荷尽已无擎雨盖，",
      "菊残犹有傲霜枝。",
      "一年好景君须记，",
      "最是橙黄橘绿时。"
    ],
    notes: "擎：举，向上托。傲霜枝：经霜不凋的枝干。君须记：你一定要记住。",
    theme: "借秋冬景物勉励朋友乐观向上。",
    exam: "常考：1. 诗中写了哪些景物；2. “最是橙黄橘绿时”表达了什么。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "夜书所见",
    author: "叶绍翁",
    dynasty: "宋",
    grade: 3,
    lines: [
      "萧萧梧叶送寒声，",
      "江上秋风动客情。",
      "知有儿童挑促织，",
      "夜深篱落一灯明。"
    ],
    notes: "书：写。萧萧：风声。挑：拨弄。促织：蟋蟀。篱落：篱笆。",
    theme: "写秋夜所见所感，抒发思乡怀人之情。",
    exam: "常考：1. 前两句营造了怎样的气氛；2. 后两句为什么触发思念。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "采莲曲",
    author: "王昌龄",
    dynasty: "唐",
    grade: 3,
    lines: [
      "荷叶罗裙一色裁，",
      "芙蓉向脸两边开。",
      "乱入池中看不见，",
      "闻歌始觉有人来。"
    ],
    notes: "罗裙：丝裙。芙蓉：荷花。乱入：混入其中。看不见：分辨不出。",
    theme: "写采莲少女和荷花相映成趣的美丽画面。",
    exam: "常考：1. 诗中怎样写采莲少女；2. 最后一句有什么妙处。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "忆江南",
    author: "白居易",
    dynasty: "唐",
    grade: 3,
    lines: [
      "江南好，",
      "风景旧曾谙。",
      "日出江花红胜火，",
      "春来江水绿如蓝，",
      "能不忆江南？"
    ],
    notes: "谙：熟悉。蓝：蓝草。胜：超过。",
    theme: "回忆江南春色，表达对江南的喜爱和怀念。",
    exam: "常考：1. 江南“好”在哪里；2. “能不忆江南”表达了什么感情。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "元日",
    author: "王安石",
    dynasty: "宋",
    grade: 3,
    lines: [
      "爆竹声中一岁除，",
      "春风送暖入屠苏。",
      "千门万户曈曈日，",
      "总把新桃换旧符。"
    ],
    notes: "元日：农历正月初一。屠苏：古代过年饮的酒。曈曈：日出时光亮的样子。",
    theme: "写春节喜庆热闹的景象。",
    exam: "常考：1. 诗中写了哪些过年习俗；2. 诗歌表达了怎样的节日气氛。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "绝句·迟日",
    author: "杜甫",
    dynasty: "唐",
    grade: 3,
    lines: [
      "迟日江山丽，",
      "春风花草香。",
      "泥融飞燕子，",
      "沙暖睡鸳鸯。"
    ],
    notes: "迟日：春天日光和煦。泥融：泥土湿润。鸳鸯：水鸟。",
    theme: "描绘春日景色，充满温暖和生机。",
    exam: "常考：1. 诗中哪些景物体现春天；2. “泥融飞燕子，沙暖睡鸳鸯”的作用。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "九月九日忆山东兄弟",
    author: "王维",
    dynasty: "唐",
    grade: 3,
    lines: [
      "独在异乡为异客，",
      "每逢佳节倍思亲。",
      "遥知兄弟登高处，",
      "遍插茱萸少一人。"
    ],
    notes: "九月九日：重阳节。山东：华山以东，指家乡。异乡：他乡。倍：更加。",
    theme: "写重阳佳节思念家乡亲人的感情。",
    exam: "常考：1. “每逢佳节倍思亲”的含义；2. 后两句怎样想象家乡情景。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "惠崇春江晚景",
    author: "苏轼",
    dynasty: "宋",
    grade: 3,
    lines: [
      "竹外桃花三两枝，",
      "春江水暖鸭先知。",
      "蒌蒿满地芦芽短，",
      "正是河豚欲上时。"
    ],
    notes: "蒌蒿：草名。芦芽：芦苇新芽。河豚：鱼名。欲上时：将要逆流而上的时候。",
    theme: "写春江景物，表现早春生机。",
    exam: "常考：1. 诗中哪些景物体现早春；2. 最后一句的联想作用。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "清明",
    author: "杜牧",
    dynasty: "唐",
    grade: 3,
    lines: [
      "清明时节雨纷纷，",
      "路上行人欲断魂。",
      "借问酒家何处有？",
      "牧童遥指杏花村。"
    ],
    notes: "清明：节日名。欲断魂：形容愁苦极深。借问：请问。遥指：远远指向。",
    theme: "写清明时节行人伤感和寻酒解愁的情景。",
    exam: "常考：1. “欲断魂”表达什么心情；2. 后两句在结构上的作用。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "滁州西涧",
    author: "韦应物",
    dynasty: "唐",
    grade: 3,
    lines: [
      "独怜幽草涧边生，",
      "上有黄鹂深树鸣。",
      "春潮带雨晚来急，",
      "野渡无人舟自横。"
    ],
    notes: "独怜：特别喜爱。深树：树丛深处。潮急：春潮上涨，水流急。",
    theme: "写山涧清幽景色，也流露诗人淡泊情怀。",
    exam: "常考：1. 诗中有声有色的景物；2. “野渡无人舟自横”营造了怎样的意境。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "三衢道中",
    author: "曾几",
    dynasty: "宋",
    grade: 3,
    lines: [
      "梅子黄时日日晴，",
      "小溪泛尽却山行。",
      "绿阴不减来时路，",
      "添得黄鹂四五声。"
    ],
    notes: "三衢：地名。道中：路上。却：再，又。",
    theme: "写山行途中所见的清新景色和愉快心情。",
    exam: "常考：1. 诗中写了哪些景物；2. “添得黄鹂四五声”有何作用。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "大林寺桃花",
    author: "白居易",
    dynasty: "唐",
    grade: 3,
    lines: [
      "人间四月芳菲尽，",
      "山寺桃花始盛开。",
      "长恨春归无觅处，",
      "不知转入此中来。"
    ],
    notes: "长恨：常常遗憾。春归：春天过去。始：才。",
    theme: "写高山寺中桃花盛开带来的惊喜。",
    exam: "常考：1. 前后句形成了什么反差；2. 诗人心情有何变化。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "悯农·其一",
    author: "李绅",
    dynasty: "唐",
    grade: 3,
    lines: [
      "春种一粒粟，",
      "秋收万颗子。",
      "四海无闲田，",
      "农夫犹饿死。"
    ],
    notes: "春种：春天播种。粟：谷子。子：谷粒。四海：天下。犹：还。",
    theme: "写农民辛劳与生活艰难，表达同情。",
    exam: "常考：1. 前两句与后两句构成什么对比；2. 诗歌表达了怎样的社会现实。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "鹿柴",
    author: "王维",
    dynasty: "唐",
    grade: 4,
    lines: [
      "空山不见人，",
      "但闻人语响。",
      "返景入深林，",
      "复照青苔上。"
    ],
    notes: "但：只。闻：听见。返景：夕阳返照的光。复照：又照到。",
    theme: "写深山傍晚的幽静空灵。",
    exam: "常考：1. 诗中如何以动衬静；2. “空山不见人”营造了怎样的意境。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "凉州词·葡萄",
    author: "王翰",
    dynasty: "唐",
    grade: 4,
    lines: [
      "葡萄美酒夜光杯，",
      "欲饮琵琶马上催。",
      "醉卧沙场君莫笑，",
      "古来征战几人回。"
    ],
    notes: "凉州词：乐府曲名。夜光杯：晶莹的酒杯。欲饮：正要喝。催：催促。",
    theme: "写边塞将士出征前豪迈悲壮的情绪。",
    exam: "常考：1. 前两句渲染了什么气氛；2. 全诗体现了怎样的边塞情怀。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "别董大",
    author: "高适",
    dynasty: "唐",
    grade: 4,
    lines: [
      "千里黄云白日曛，",
      "北风吹雁雪纷纷。",
      "莫愁前路无知己，",
      "天下谁人不识君。"
    ],
    notes: "曛：昏暗。黄云：昏黄的云。知己：知心朋友。识君：认识你。",
    theme: "在苍凉壮阔的送别环境中，表达对友人的深情劝慰和豪迈祝愿。",
    exam: "常考：1. 前两句营造了怎样的送别氛围；2. 后两句表现了诗人怎样的胸襟和情感。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "出塞",
    author: "王昌龄",
    dynasty: "唐",
    grade: 4,
    semester: "上",
    lines: [
      "秦时明月汉时关，",
      "万里长征人未还。",
      "但使龙城飞将在，",
      "不教胡马度阴山。"
    ],
    notes: "塞：边塞。秦时明月汉时关：边塞上的明月和关城自古如此。龙城飞将：指英勇善战的将领，常借指李广。不教：不让。胡马：敌人的骑兵。阴山：边防要地。",
    theme: "感慨边塞战争久远，赞颂守边名将，也表达对将士命运的关注。",
    exam: "常考：1. “秦时明月汉时关”的作用；2. “但使龙城飞将在”表达的愿望；3. 全诗的悲壮情感。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文四年级上册教材核对"
  },
  {
    title: "题西林壁",
    author: "苏轼",
    dynasty: "宋",
    grade: 4,
    semester: "上",
    lines: [
      "横看成岭侧成峰，",
      "远近高低各不同。",
      "不识庐山真面目，",
      "只缘身在此山中。"
    ],
    notes: "题：题写。西林：西林寺。缘：因为。真面目：真实的样子。只缘身在此山中：只因为自己就在庐山之中。",
    theme: "借写庐山不同角度的景象，说明看问题要全面，不能只看局部。",
    exam: "常考：后两句蕴含的哲理；前两句怎样写出庐山“变化多端”的特点。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文四年级上册教材核对"
  },
  {
    title: "浪淘沙",
    author: "刘禹锡",
    dynasty: "唐",
    grade: 4,
    lines: [
      "九曲黄河万里沙，",
      "浪淘风簸自天涯。",
      "如今直上银河去，",
      "同到牵牛织女家。"
    ],
    notes: "九曲：形容黄河曲折。簸：颠簸。自天涯：从天边而来。牵牛织女家：借指银河仙境。",
    theme: "写黄河奔腾壮阔，也寄托浪漫想象。",
    exam: "常考：1. 诗中怎样写黄河；2. 后两句体现了怎样的想象。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "夏日绝句",
    author: "李清照",
    dynasty: "宋",
    grade: 4,
    semester: "上",
    lines: [
      "生当作人杰，",
      "死亦为鬼雄。",
      "至今思项羽，",
      "不肯过江东。"
    ],
    notes: "人杰：人中的豪杰。鬼雄：鬼中的英雄。项羽：楚汉相争时的英雄人物。不肯过江东：宁死不退，保持气节。",
    theme: "借赞颂项羽，表达崇尚英雄气节和不屈精神的情感。",
    exam: "常考：诗人为什么写项羽；“生当作人杰，死亦为鬼雄”表达了怎样的价值追求。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文四年级上册教材核对"
  },
  {
    title: "暮江吟",
    author: "白居易",
    dynasty: "唐",
    grade: 4,
    semester: "上",
    lines: [
      "一道残阳铺水中，",
      "半江瑟瑟半江红。",
      "可怜九月初三夜，",
      "露似真珠月似弓。"
    ],
    notes: "吟：古代诗歌体裁。残阳：将落未落的夕阳。瑟瑟：这里形容江水在夕阳照射下呈现青绿色。可怜：可爱。真珠：珍珠。",
    theme: "描绘秋江傍晚到夜晚的美景，表达诗人对自然景色的喜爱。",
    exam: "常考：1. “可怜”在诗中的意思；2. “露似真珠月似弓”的比喻作用。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文四年级上册教材核对"
  },
  {
    title: "嫦娥",
    author: "李商隐",
    dynasty: "唐",
    grade: 4,
    lines: [
      "云母屏风烛影深，",
      "长河渐落晓星沉。",
      "嫦娥应悔偷灵药，",
      "碧海青天夜夜心。"
    ],
    notes: "云母屏风：饰有云母的屏风。长河：银河。晓星沉：晨星将落。碧海青天：广阔清冷的月宫环境。",
    theme: "借嫦娥写孤独寂寞之感。",
    exam: "常考：1. 前两句描绘了怎样的环境；2. 诗歌表达了怎样的感情。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "雪梅",
    author: "卢钺",
    dynasty: "宋",
    grade: 4,
    semester: "上",
    lines: [
      "梅雪争春未肯降，",
      "骚人阁笔费评章。",
      "梅须逊雪三分白，",
      "雪却输梅一段香。"
    ],
    notes: "降：服输。骚人：诗人。阁笔：放下笔。评章：评论。逊：比不上。",
    theme: "写出梅和雪各有长处，说明事物各有所长。",
    exam: "常考：梅和雪分别胜在什么；诗中蕴含的道理。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文四年级上册教材核对"
  },
  {
    title: "宿新市徐公店",
    author: "杨万里",
    dynasty: "宋",
    grade: 4,
    semester: "下",
    lines: [
      "篱落疏疏一径深，",
      "树头花落未成阴。",
      "儿童急走追黄蝶，",
      "飞入菜花无处寻。"
    ],
    notes: "宿：投宿。新市：地名。徐公店：姓徐的人开的客店。篱落：篱笆。疏疏：稀疏。急走：奔跑着追赶。",
    theme: "表现乡村春天的清新景色和儿童追蝶的快乐情趣。",
    exam: "常考：诗中描绘了怎样的春景；“未成阴”说明了什么。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文四年级下册教材核对"
  },
  {
    title: "四时田园杂兴·其二十五",
    author: "范成大",
    dynasty: "宋",
    grade: 4,
    semester: "下",
    lines: [
      "梅子金黄杏子肥，",
      "麦花雪白菜花稀。",
      "日长篱落无人过，",
      "惟有蜻蜓蛱蝶飞。"
    ],
    notes: "杂兴：随兴而写的诗。日长：白天渐长。篱落：篱笆。惟有：只有。蛱蝶：蝴蝶。",
    theme: "描绘夏初田园景色，展现乡村生活气息。",
    exam: "常考：诗中写了哪些景物；“惟有蜻蜓蛱蝶飞”营造了怎样的气氛。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文四年级下册教材核对"
  },
  {
    title: "清平乐·村居",
    author: "辛弃疾",
    dynasty: "宋",
    grade: 4,
    semester: "下",
    lines: [
      "茅檐低小，",
      "溪上青青草。",
      "醉里吴音相媚好，",
      "白发谁家翁媪？",
      "大儿锄豆溪东，",
      "中儿正织鸡笼。",
      "最喜小儿亡赖，",
      "溪头卧剥莲蓬。"
    ],
    notes: "清平乐：词牌名。吴音：吴地的方言。相媚好：互相逗趣，彼此说笑。翁媪：老翁和老妇。亡赖：同“无赖”，这里指顽皮、可爱。",
    theme: "展现温馨恬静的乡村家庭生活。",
    exam: "常考：写了哪几个人物活动；“最喜小儿亡赖”表现了怎样的感情。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文四年级下册教材核对"
  },
  {
    title: "塞下曲",
    author: "卢纶",
    dynasty: "唐",
    grade: 4,
    semester: "下",
    lines: [
      "月黑雁飞高，",
      "单于夜遁逃。",
      "欲将轻骑逐，",
      "大雪满弓刀。"
    ],
    notes: "单于：古代北方少数民族首领。遁：逃跑。轻骑：轻装快速的骑兵。",
    theme: "表现边塞将士英勇机警的战斗精神。",
    exam: "常考：“大雪满弓刀”如何渲染夜战气氛；诗歌体现了怎样的边塞豪情。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文四年级下册教材核对"
  },
  {
    title: "墨梅",
    author: "王冕",
    dynasty: "元",
    grade: 4,
    semester: "下",
    lines: [
      "吾家洗砚池头树，",
      "朵朵花开淡墨痕。",
      "不要人夸颜色好，",
      "只留清气满乾坤。"
    ],
    notes: "洗砚池：洗砚台的水池。淡墨痕：像用淡墨点染出来的一样。清气：清香之气，也象征高洁品格。乾坤：天地。",
    theme: "借梅花表达诗人淡泊名利、坚守高洁品格的志向。",
    exam: "常考：“只留清气满乾坤”表达了什么志向；墨梅象征了怎样的品格。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文四年级下册教材核对"
  },
  {
    title: "蜂",
    author: "罗隐",
    dynasty: "唐",
    grade: 4,
    lines: [
      "不论平地与山尖，",
      "无限风光尽被占。",
      "采得百花成蜜后，",
      "为谁辛苦为谁甜。"
    ],
    notes: "不论：无论。平地：平原。山尖：山峰。无限风光：美好的春光。尽：都。",
    theme: "赞美蜜蜂辛勤劳动、无私奉献。",
    exam: "常考：1. 蜜蜂具有什么品质；2. 后两句蕴含的道理。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "芙蓉楼送辛渐",
    author: "王昌龄",
    dynasty: "唐",
    grade: 4,
    semester: "下",
    lines: [
      "寒雨连江夜入吴，",
      "平明送客楚山孤。",
      "洛阳亲友如相问，",
      "一片冰心在玉壶。"
    ],
    notes: "芙蓉楼：楼名。平明：天刚亮。冰心：像冰一样晶莹纯洁的心。玉壶：比喻高洁品格。",
    theme: "表达送别朋友时的依依惜别之情，也表明自己清白高洁的品格。",
    exam: "常考：“一片冰心在玉壶”的含义；这首送别诗表达了怎样的双重情感。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文四年级下册教材核对"
  },
  {
    title: "独坐敬亭山",
    author: "李白",
    dynasty: "唐",
    grade: 4,
    lines: [
      "众鸟高飞尽，",
      "孤云独去闲。",
      "相看两不厌，",
      "只有敬亭山。"
    ],
    notes: "尽：没有了。孤云：单独飘浮的云。厌：满足。相看：互相看着。",
    theme: "写诗人孤独时与山相对，寄托情感。",
    exam: "常考：1. 诗中写了哪些景物；2. “只有敬亭山”表现了什么。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "卜算子·咏梅",
    author: "毛泽东",
    dynasty: "现代",
    grade: 4,
    lines: [
      "风雨送春归，",
      "飞雪迎春到。",
      "已是悬崖百丈冰，",
      "犹有花枝俏。",
      "俏也不争春，",
      "只把春来报。",
      "待到山花烂漫时，",
      "她在丛中笑。"
    ],
    notes: "卜算子：词牌名。寂寞开无主：独自开放无人欣赏。零落：飘落。碾作尘：化成尘土。",
    theme: "赞美梅花高洁坚贞、不争春的品格。",
    exam: "常考：1. 词中梅花形象特点；2. “只有香如故”表达了什么。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "游山西村",
    author: "陆游",
    dynasty: "宋",
    grade: 4,
    lines: [
      "莫笑农家腊酒浑，",
      "丰年留客足鸡豚。",
      "山重水复疑无路，",
      "柳暗花明又一村。",
      "箫鼓追随春社近，",
      "衣冠简朴古风存。",
      "从今若许闲乘月，",
      "拄杖无时夜叩门。"
    ],
    notes: "腊酒：腊月里酿的酒。足鸡豚：鸡豚丰足。山重水复：山峦重叠，流水曲折。柳暗花明：柳色深绿，花色明丽。",
    theme: "写农村风光和淳朴民风，也包含困境中见希望的哲理。",
    exam: "常考：1. “山重水复疑无路，柳暗花明又一村”的含义；2. 诗中村民有什么特点。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "黄鹤楼送孟浩然之广陵",
    author: "李白",
    dynasty: "唐",
    grade: 5,
    lines: [
      "故人西辞黄鹤楼，",
      "烟花三月下扬州。",
      "孤帆远影碧空尽，",
      "唯见长江天际流。"
    ],
    notes: "之：到。故人：老朋友。烟花：形容春天景色烂漫。尽：消失。唯见：只看见。",
    theme: "写送别友人时的依依惜别之情。",
    exam: "常考：1. 诗中哪些景物烘托送别；2. 后两句表达了怎样的感情。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "渔歌子",
    author: "张志和",
    dynasty: "唐",
    grade: 5,
    lines: [
      "西塞山前白鹭飞，",
      "桃花流水鳜鱼肥。",
      "青箬笠，绿蓑衣，",
      "斜风细雨不须归。"
    ],
    notes: "鳜鱼：鱼名。箬笠：竹笠。蓑衣：草编雨衣。斜风细雨：微风细雨。",
    theme: "描绘江南春汛时渔父悠然自得的生活。",
    exam: "常考：1. 词中写了哪些景物；2. “不须归”表现了什么心情。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "枫桥夜泊",
    author: "张继",
    dynasty: "唐",
    grade: 5,
    lines: [
      "月落乌啼霜满天，",
      "江枫渔火对愁眠。",
      "姑苏城外寒山寺，",
      "夜半钟声到客船。"
    ],
    notes: "啼：鸣叫。姑苏：苏州。寒山寺：寺名。夜半钟声：半夜传来的钟声。",
    theme: "写秋夜停船所见所闻，表达旅途愁思。",
    exam: "常考：1. 诗中通过哪些景物写夜色；2. “夜半钟声到客船”有何作用。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "题临安邸",
    author: "林升",
    dynasty: "宋",
    grade: 5,
    lines: [
      "山外青山楼外楼，",
      "西湖歌舞几时休。",
      "暖风熏得游人醉，",
      "直把杭州作汴州。"
    ],
    notes: "邸：旅店。休：停止。直把：简直把。汴州：北宋都城。",
    theme: "讽刺南宋统治者沉迷享乐、不思收复失地。",
    exam: "常考：1. 诗歌讽刺了什么；2. “暖风熏得游人醉”的深层含义。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "示儿",
    author: "陆游",
    dynasty: "宋",
    grade: 5,
    lines: [
      "死去元知万事空，",
      "但悲不见九州同。",
      "王师北定中原日，",
      "家祭无忘告乃翁。"
    ],
    notes: "示儿：给儿子看。元：同“原”，本来。九州：全国。王师：朝廷军队。",
    theme: "表达诗人至死不忘收复失地的爱国之情。",
    exam: "常考：1. 诗人最挂念什么；2. “家祭无忘告乃翁”体现了怎样的感情。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "己亥杂诗",
    author: "龚自珍",
    dynasty: "清",
    grade: 5,
    lines: [
      "九州生气恃风雷，",
      "万马齐喑究可哀。",
      "我劝天公重抖擞，",
      "不拘一格降人才。"
    ],
    notes: "九州：全国。恃：依靠。风雷：变革的力量。万马齐喑：大家都沉默不语。",
    theme: "呼唤社会变革和人才振兴。",
    exam: "常考：1. “万马齐喑”比喻什么；2. 诗人表达了怎样的愿望。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "观书有感·其一",
    author: "朱熹",
    dynasty: "宋",
    grade: 5,
    lines: [
      "半亩方塘一鉴开，",
      "天光云影共徘徊。",
      "问渠那得清如许？",
      "为有源头活水来。"
    ],
    notes: "方塘：方形池塘。鉴：镜子。徘徊：来回移动。源头活水：不断流来的新水。",
    theme: "借池塘清澈说明学习要不断吸收新知识。",
    exam: "常考：1. 诗中蕴含的学习道理；2. “源头活水”比喻什么。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "观书有感·其二",
    author: "朱熹",
    dynasty: "宋",
    grade: 5,
    lines: [
      "昨夜江边春水生，",
      "艨艟巨舰一毛轻。",
      "向来枉费推移力，",
      "此日中流自在行。"
    ],
    notes: "昨夜江边春水生：春水上涨。蒙冲：大船。一直：径直。",
    theme: "借行船变易说明做学问离不开积累和时机条件。",
    exam: "常考：1. 大船为何能轻快前行；2. 诗中包含什么道理。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "乞巧",
    author: "林杰",
    dynasty: "唐",
    grade: 5,
    lines: [
      "七夕今宵看碧霄，",
      "牵牛织女渡河桥。",
      "家家乞巧望秋月，",
      "穿尽红丝几万条。"
    ],
    notes: "乞巧：古代七夕向织女乞求灵巧。碧霄：青天。穿尽：穿过。",
    theme: "写七夕民俗，寄托少女对心灵手巧和美好生活的向往。",
    exam: "常考：1. 诗中写了哪些七夕习俗；2. 最后一句表达了什么。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "长相思",
    author: "纳兰性德",
    dynasty: "清",
    grade: 5,
    lines: [
      "山一程，水一程，",
      "身向榆关那畔行，",
      "夜深千帐灯。",
      "风一更，雪一更，",
      "聒碎乡心梦不成，",
      "故园无此声。"
    ],
    notes: "程：道路。榆关：山海关。那畔：那边。聒：声音嘈杂。故园：故乡。",
    theme: "写行军途中思念家乡的深情。",
    exam: "常考：1. 上片和下片分别写什么；2. “故园无此声”表达了什么情感。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "山居秋暝",
    author: "王维",
    dynasty: "唐",
    grade: 5,
    lines: [
      "空山新雨后，",
      "天气晚来秋。",
      "明月松间照，",
      "清泉石上流。",
      "竹喧归浣女，",
      "莲动下渔舟。",
      "随意春芳歇，",
      "王孙自可留。"
    ],
    notes: "暝：傍晚。浣女：洗衣的女子。歇：尽。王孙：原指贵族子弟，这里指诗人自己。",
    theme: "写秋后山村的清新宁静，表现对隐居生活的喜爱。",
    exam: "常考：1. 诗中静景和动景有哪些；2. 尾联表达了什么心愿。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "游子吟",
    author: "孟郊",
    dynasty: "唐",
    grade: 5,
    lines: [
      "慈母手中线，",
      "游子身上衣。",
      "临行密密缝，",
      "意恐迟迟归。",
      "谁言寸草心，",
      "报得三春晖。"
    ],
    notes: "游子：出门远行的人。寸草心：小草般微小的心。三春晖：春天温暖的阳光。",
    theme: "歌颂母爱伟大，抒发对母亲的感恩。",
    exam: "常考：1. “谁言寸草心，报得三春晖”的含义；2. 诗中怎样表现母爱。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "四时田园杂兴·其三十一",
    author: "范成大",
    dynasty: "宋",
    grade: 5,
    lines: [
      "昼出耘田夜绩麻，",
      "村庄儿女各当家。",
      "童孙未解供耕织，",
      "也傍桑阴学种瓜。"
    ],
    notes: "耘田：除草。绩麻：把麻搓成线。各当家：各管一摊家务。未解：不懂得。供：从事。",
    theme: "表现农村夏忙景象和儿童热爱劳动的情趣。",
    exam: "常考：1. 诗中写了哪些劳动场景；2. 小孩子的形象特点。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "送元二使安西",
    author: "王维",
    dynasty: "唐",
    grade: 5,
    lines: [
      "渭城朝雨浥轻尘，",
      "客舍青青柳色新。",
      "劝君更尽一杯酒，",
      "西出阳关无故人。"
    ],
    notes: "使：出使。浥：湿润。更尽：再喝完。阳关：古关名。",
    theme: "写送别友人时的深情叮嘱。",
    exam: "常考：1. 前两句写景有什么作用；2. “西出阳关无故人”表达什么。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "乡村四月",
    author: "翁卷",
    dynasty: "宋",
    grade: 5,
    lines: [
      "绿遍山原白满川，",
      "子规声里雨如烟。",
      "乡村四月闲人少，",
      "才了蚕桑又插田。"
    ],
    notes: "山原：山陵和原野。白满川：水田映着天光发白。子规：杜鹃鸟。了：结束。",
    theme: "写江南农村四月繁忙而生机勃勃的景象。",
    exam: "常考：1. 诗中写了哪些景和事；2. “闲人少”说明什么。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "凉州词·黄河",
    author: "王之涣",
    dynasty: "唐",
    grade: 5,
    lines: [
      "黄河远上白云间，",
      "一片孤城万仞山。",
      "羌笛何须怨杨柳，",
      "春风不度玉门关。"
    ],
    notes: "仞：古代长度单位。羌笛：羌族乐器。杨柳：折柳送别曲。玉门关：边关。",
    theme: "写边塞荒寒景象和戍边将士的乡愁。",
    exam: "常考：1. 前两句写出了怎样的环境；2. “春风不度玉门关”的含义。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "秋夜将晓出篱门迎凉有感",
    author: "陆游",
    dynasty: "宋",
    grade: 5,
    lines: [
      "三万里河东入海，",
      "五千仞岳上摩天。",
      "遗民泪尽胡尘里，",
      "南望王师又一年。"
    ],
    notes: "将晓：天快亮。三万里河：黄河。五千仞岳：华山。遗民：沦陷区人民。王师：朝廷军队。",
    theme: "表达对收复失地的强烈愿望和对百姓的同情。",
    exam: "常考：1. 前两句写景作用；2. 后两句包含怎样的爱国情感。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "从军行",
    author: "王昌龄",
    dynasty: "唐",
    grade: 5,
    lines: [
      "青海长云暗雪山，",
      "孤城遥望玉门关。",
      "黄沙百战穿金甲，",
      "不破楼兰终不还。"
    ],
    notes: "青海：地名。雪山：祁连山。孤城：边塞孤城。玉门关：边关。楼兰：借指敌人。",
    theme: "表现边塞将士誓死杀敌、保家卫国的豪情。",
    exam: "常考：1. “黄沙百战穿金甲”写了什么；2. 全诗体现怎样的精神。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "村晚",
    author: "雷震",
    dynasty: "宋",
    grade: 5,
    lines: [
      "草满池塘水满陂，",
      "山衔落日浸寒漪。",
      "牧童归去横牛背，",
      "短笛无腔信口吹。"
    ],
    notes: "陂：池塘。衔：含着。浸：映入。横牛背：横坐在牛背上。",
    theme: "写乡村傍晚牧童归来的悠闲景象。",
    exam: "常考：1. 诗中画面有什么特点；2. 牧童形象有什么情趣。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "稚子弄冰",
    author: "杨万里",
    dynasty: "宋",
    grade: 5,
    lines: [
      "稚子金盆脱晓冰，",
      "彩丝穿取当银铮。",
      "敲成玉磬穿林响，",
      "忽作玻璃碎地声。"
    ],
    notes: "稚子：小孩子。脱晓冰：早晨把冰从铜盆里取出。磬：像磬一样的声音。玻璃：古代指天然玉石一类的东西。",
    theme: "写儿童冬日玩冰的天真快乐。",
    exam: "常考：1. 诗中孩子做了哪些动作；2. “碎成玻璃声”有什么妙处。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "鸟鸣涧",
    author: "王维",
    dynasty: "唐",
    grade: 5,
    lines: [
      "人闲桂花落，",
      "夜静春山空。",
      "月出惊山鸟，",
      "时鸣春涧中。"
    ],
    notes: "人闲：人声寂静。春山空：春山显得空寂。时鸣：偶尔鸣叫。",
    theme: "写春夜山谷幽静，借鸟鸣反衬山涧清幽。",
    exam: "常考：1. 如何以动衬静；2. 诗中营造了怎样的意境。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "泊船瓜洲",
    author: "王安石",
    dynasty: "宋",
    grade: 5,
    lines: [
      "京口瓜洲一水间，",
      "钟山只隔数重山。",
      "春风又绿江南岸，",
      "明月何时照我还。"
    ],
    notes: "泊：停船。间：隔开。数重山：几座山。绿：吹绿。还：回。",
    theme: "写诗人停船瓜洲时强烈的思乡之情。",
    exam: "常考：1. “春风又绿江南岸”的“绿”好在哪里；2. 全诗表达了什么。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "秋思",
    author: "张籍",
    dynasty: "唐",
    grade: 5,
    lines: [
      "洛阳城里见秋风，",
      "欲作家书意万重。",
      "复恐匆匆说不尽，",
      "行人临发又开封。"
    ],
    notes: "洛阳城里：在洛阳城中。行人：将要远行的人。复恐：又担心。匆匆：匆忙。",
    theme: "写寄家书时言不尽意的深切思乡。",
    exam: "常考：1. 诗人为什么“又开封”；2. 这首诗怎样写思乡。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "闻官军收河南河北",
    author: "杜甫",
    dynasty: "唐",
    grade: 5,
    lines: [
      "剑外忽传收蓟北，",
      "初闻涕泪满衣裳。",
      "却看妻子愁何在，",
      "漫卷诗书喜欲狂。",
      "白日放歌须纵酒，",
      "青春作伴好还乡。",
      "即从巴峡穿巫峡，",
      "便下襄阳向洛阳。"
    ],
    notes: "闻：听说。官军：朝廷军队。却看：回头看。漫卷：胡乱卷起。放歌：放声歌唱。",
    theme: "写诗人听到捷报后极度喜悦。",
    exam: "常考：1. 诗人喜在哪里；2. 诗中哪些动作写出激动心情。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "马诗",
    author: "李贺",
    dynasty: "唐",
    grade: 6,
    lines: [
      "大漠沙如雪，",
      "燕山月似钩。",
      "何当金络脑，",
      "快走踏清秋。"
    ],
    notes: "大漠：广阔沙漠。燕山：山名。钩：弯刀。何当：什么时候才能。",
    theme: "借马抒怀，表达建功立业的愿望。",
    exam: "常考：1. 前两句营造了怎样的边塞环境；2. 诗人借马表达了什么。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "石灰吟",
    author: "于谦",
    dynasty: "明",
    grade: 6,
    lines: [
      "千锤万凿出深山，",
      "烈火焚烧若等闲。",
      "粉骨碎身浑不怕，",
      "要留清白在人间。"
    ],
    notes: "吟：古代诗歌体裁。若等闲：好像很平常。清白：高洁的节操。",
    theme: "赞美石灰不怕磨难、保持清白的品格。",
    exam: "常考：1. 诗中石灰象征什么；2. “要留清白在人间”表达了怎样的志向。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "竹石",
    author: "郑燮",
    dynasty: "清",
    grade: 6,
    lines: [
      "咬定青山不放松，",
      "立根原在破岩中。",
      "千磨万击还坚劲，",
      "任尔东西南北风。"
    ],
    notes: "咬定：比喻扎根牢固。破岩：裂开的岩石。千磨万击：无数次磨炼打击。任：任凭。",
    theme: "赞美竹子坚韧顽强的精神。",
    exam: "常考：1. 竹子的特点；2. 诗人借竹子表达了什么品格。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "迢迢牵牛星",
    author: "佚名",
    dynasty: "汉",
    grade: 6,
    lines: [
      "迢迢牵牛星，",
      "皎皎河汉女。",
      "纤纤擢素手，",
      "札札弄机杼。",
      "终日不成章，",
      "泣涕零如雨。",
      "河汉清且浅，",
      "相去复几许。",
      "盈盈一水间，",
      "脉脉不得语。"
    ],
    notes: "迢迢：遥远。皎皎：明亮。擢：伸出。札札：织布机声。盈盈：清澈的样子。",
    theme: "借牛郎织女写相思离别之苦。",
    exam: "常考：1. 诗中有哪些叠词；2. 织女形象和情感特点。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "十五夜望月",
    author: "王建",
    dynasty: "唐",
    grade: 6,
    lines: [
      "中庭地白树栖鸦，",
      "冷露无声湿桂花。",
      "今夜月明人尽望，",
      "不知秋思落谁家。"
    ],
    notes: "中庭：庭院中。地白：月光照得地上发白。栖：停留。",
    theme: "写中秋望月怀人。",
    exam: "常考：1. 前两句描绘了怎样的月夜；2. “不知秋思落谁家”的表达效果。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "寒食",
    author: "韩翃",
    dynasty: "唐",
    grade: 6,
    lines: [
      "春城无处不飞花，",
      "寒食东风御柳斜。",
      "日暮汉宫传蜡烛，",
      "轻烟散入五侯家。"
    ],
    notes: "寒食：古代节日。御柳：皇宫里的柳树。汉宫：借指皇宫。传蜡烛：分赐新火。",
    theme: "写寒食节景象，带有讽喻意味。",
    exam: "常考：1. 前两句写了怎样的春城景色；2. 后两句透露了什么意味。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "江上渔者",
    author: "范仲淹",
    dynasty: "宋",
    grade: 6,
    lines: [
      "江上往来人，",
      "但爱鲈鱼美。",
      "君看一叶舟，",
      "出没风波里。"
    ],
    notes: "但爱：只喜欢。鲈鱼：鱼名。君看：请看。出没：忽隐忽现。",
    theme: "借渔人与食鱼人对比，表现渔民生活艰辛。",
    exam: "常考：1. 前后两句形成什么对比；2. 诗歌表达了怎样的情感。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "六月二十七日望湖楼醉书",
    author: "苏轼",
    dynasty: "宋",
    grade: 6,
    lines: [
      "黑云翻墨未遮山，",
      "白雨跳珠乱入船。",
      "卷地风来忽吹散，",
      "望湖楼下水如天。"
    ],
    notes: "翻墨：像打翻的墨汁。跳珠：像跳动的珠子。未遮山：还没遮住远山。卷地风：贴地而来的大风。",
    theme: "写西湖夏日骤雨来去迅疾。",
    exam: "常考：1. 诗中如何写雨急；2. 诗的画面变化顺序。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "春日",
    author: "朱熹",
    dynasty: "宋",
    grade: 6,
    lines: [
      "胜日寻芳泗水滨，",
      "无边光景一时新。",
      "等闲识得东风面，",
      "万紫千红总是春。"
    ],
    notes: "胜日：天气晴朗的好日子。寻芳：游春赏花。泗水：河名。等闲：平常，轻易。",
    theme: "写春游所见，赞美春光无限。",
    exam: "常考：1. “万紫千红总是春”的含义；2. 诗中表现了怎样的春景。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "书湖阴先生壁",
    author: "王安石",
    dynasty: "宋",
    grade: 6,
    lines: [
      "茅檐常扫净无苔，",
      "花木成畦手自栽。",
      "一水护田将绿绕，",
      "两山排闼送青来。"
    ],
    notes: "茅檐：茅屋屋檐。长扫：经常打扫。畦：田园分界。排闼：推门而入。",
    theme: "写友人居处环境清雅，赞美主人的高洁情趣。",
    exam: "常考：1. 前两句写环境有什么特点；2. 后两句运用了什么修辞。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "江南春",
    author: "杜牧",
    dynasty: "唐",
    grade: 6,
    lines: [
      "千里莺啼绿映红，",
      "水村山郭酒旗风。",
      "南朝四百八十寺，",
      "多少楼台烟雨中。"
    ],
    notes: "郭：外城。酒旗：酒家的旗子。楼台：佛寺建筑。多少：很多。",
    theme: "写江南春景丰富秀丽。",
    exam: "常考：1. 诗中写了哪些江南春景；2. 后两句增添了怎样的意境。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "回乡偶书",
    author: "贺知章",
    dynasty: "唐",
    grade: 6,
    lines: [
      "少小离家老大回，",
      "乡音无改鬓毛衰。",
      "儿童相见不相识，",
      "笑问客从何处来。"
    ],
    notes: "少小离家老大回：年轻离乡，老年回乡。乡音无改：口音没变。鬓毛衰：鬓发稀疏。",
    theme: "写久别回乡的感慨和物是人非之感。",
    exam: "常考：1. 前后形成什么对比；2. 儿童不识体现了诗人怎样的感受。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "宿建德江",
    author: "孟浩然",
    dynasty: "唐",
    grade: 6,
    lines: [
      "移舟泊烟渚，",
      "日暮客愁新。",
      "野旷天低树，",
      "江清月近人。"
    ],
    notes: "移舟：靠船。烟渚：水中雾气笼罩的小洲。客愁新：旅愁又生。",
    theme: "写旅途中日暮停船引发的愁思。",
    exam: "常考：1. 诗中“愁”从何而来；2. 诗歌营造了怎样的意境。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "过故人庄",
    author: "孟浩然",
    dynasty: "唐",
    grade: 6,
    lines: [
      "故人具鸡黍，",
      "邀我至田家。",
      "绿树村边合，",
      "青山郭外斜。",
      "开轩面场圃，",
      "把酒话桑麻。",
      "待到重阳日，",
      "还来就菊花。"
    ],
    notes: "故人：老朋友。具鸡黍：准备饭菜。合：环绕。轩：窗。",
    theme: "写朋友相聚的田园乐趣和真挚友情。",
    exam: "常考：1. 诗中乡村生活有什么特点；2. 尾联表达了什么愿望。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "西江月·夜行黄沙道中",
    author: "辛弃疾",
    dynasty: "宋",
    grade: 6,
    lines: [
      "明月别枝惊鹊，",
      "清风半夜鸣蝉。",
      "稻花香里说丰年，",
      "听取蛙声一片。",
      "七八个星天外，",
      "两三点雨山前。",
      "旧时茅店社林边，",
      "路转溪桥忽见。"
    ],
    notes: "别枝惊鹊：惊起枝头喜鹊。鸣蝉：蝉叫。稻花香里说丰年：借蛙声写丰收在望。旧时茅店：往日的小客店。",
    theme: "写夏夜乡村景象和丰收喜悦。",
    exam: "常考：1. 词中写了哪些夏夜景物；2. 全词表达了怎样的心情。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "游园不值",
    author: "叶绍翁",
    dynasty: "宋",
    grade: 6,
    lines: [
      "应怜屐齿印苍苔，",
      "小扣柴扉久不开。",
      "春色满园关不住，",
      "一枝红杏出墙来。"
    ],
    notes: "不值：没有遇到主人。应怜：大概是爱惜。屐齿：木底鞋下的齿。柴扉：柴门。",
    theme: "写游园不遇却见春色，表达惊喜之情。",
    exam: "常考：1. “一枝红杏出墙来”的象征意义；2. 前后情感怎样变化。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "春夜喜雨",
    author: "杜甫",
    dynasty: "唐",
    grade: 6,
    lines: [
      "好雨知时节，",
      "当春乃发生。",
      "随风潜入夜，",
      "润物细无声。",
      "野径云俱黑，",
      "江船火独明。",
      "晓看红湿处，",
      "花重锦官城。"
    ],
    notes: "乃：就。潜：悄悄。润物：滋润万物。红湿处：花色被雨打湿的地方。",
    theme: "赞美春雨来得及时、滋润万物。",
    exam: "常考：1. “好雨”好在哪里；2. 诗中怎样写春雨无声。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "长歌行",
    author: "汉乐府",
    dynasty: "汉",
    grade: 6,
    lines: [
      "青青园中葵，",
      "朝露待日晞。",
      "阳春布德泽，",
      "万物生光辉。",
      "常恐秋节至，",
      "焜黄华叶衰。",
      "百川东到海，",
      "何时复西归。",
      "少壮不努力，",
      "老大徒伤悲。"
    ],
    notes: "青青：茂盛的样子。布德泽：施加恩泽。常恐：常常担心。焜黄：枯黄。",
    theme: "劝勉人珍惜时光，努力上进。",
    exam: "常考：1. 诗中怎样说明时光易逝；2. “少壮不努力，老大徒伤悲”的含义。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "早春呈水部张十八员外",
    author: "韩愈",
    dynasty: "唐",
    grade: 6,
    lines: [
      "天街小雨润如酥，",
      "草色遥看近却无。",
      "最是一年春好处，",
      "绝胜烟柳满皇都。"
    ],
    notes: "天街：京城街道。酥：形容细雨滋润。最是：正是。绝胜：远远胜过。",
    theme: "写早春细雨草色的独特美。",
    exam: "常考：1. “草色遥看近却无”的妙处；2. 诗人为何偏爱早春。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "浣溪沙",
    author: "苏轼",
    dynasty: "宋",
    grade: 6,
    lines: [
      "游蕲水清泉寺，寺临兰溪，溪水西流。",
      "山下兰芽短浸溪，",
      "松间沙路净无泥，",
      "萧萧暮雨子规啼。",
      "谁道人生无再少？",
      "门前流水尚能西！",
      "休将白发唱黄鸡。"
    ],
    notes: "浣溪沙：词牌名。谁道人生无再少：谁说人生不能再年轻。休将：不要拿。白发：老去。",
    theme: "表达积极乐观、老当益壮的人生态度。",
    exam: "常考：1. 词中表达了怎样的人生态度；2. “门前流水尚能西”的含义。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  },
  {
    title: "采薇·节选",
    author: "佚名",
    dynasty: "周",
    grade: 6,
    lines: [
      "昔我往矣，杨柳依依。",
      "今我来思，雨雪霏霏。",
      "行道迟迟，载渴载饥。",
      "我心伤悲，莫知我哀！"
    ],
    notes: "昔：从前。往矣：出征时。依依：柳枝柔弱随风摇摆。霏霏：雪花纷飞。迟迟：缓慢的样子。",
    theme: "写征人归来时的悲伤与劳苦。",
    exam: "常考：1. 诗中今昔对比的作用；2. 结尾表现了怎样的情感。",
    sourceType: "platform-draft",
    sourceName: "平台整理稿",
    sourceStatus: "待按统编语文对应册次教材核对"
  }
];

// Helper: get poems by grade
export function getPoemsByGrade(grade) {
  return poems.filter(p => p.grade === grade);
}

// Helper: find poem by title (partial match)
export function findPoem(title) {
  return poems.find(p => p.title.includes(title) || title.includes(p.title));
}

// Helper: get full text as a single string
export function getPoemText(poem) {
  return poem.lines.join('\n');
}

export default poems;
