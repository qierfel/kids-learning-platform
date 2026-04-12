// 苏教版小学数学知识点体系
// 结构：年级 → 单元 → 课时/知识点 → 学习目标 / 核心概念 / 易错点
// 内容依据：教育部《义务教育数学课程标准（2022年版）》及苏教版教材公开目录
// 所有学习目标、易错点描述均为原创，可用于平台内容生成

export const mathCurriculum = {
  edition: '苏教版',
  subject: '数学',
  grades: [
    // ============ 一年级上册 ============
    {
      grade: 1,
      semester: '上',
      units: [
        {
          id: 'g1s1-u1',
          order: 1,
          name: '数一数',
          overview: '通过观察数物体的个数，初步建立数感，体会"数"是描述数量的工具。',
          topics: [
            {
              id: 'g1s1-u1-t1',
              name: '数物体的个数（1~10）',
              objectives: [
                '能按顺序数出 1 到 10 的物体个数',
                '初步体会"一一对应"的数数方法',
                '能用手指或图形表示对应数量',
              ],
              keyPoints: ['一一对应', '从左到右/从上到下有序数数'],
              commonMistakes: [
                '数物体时遗漏或重复（没有按顺序数）',
                '把"第几个"和"几个"混淆',
              ],
              difficulty: 1,
              prerequisites: [],
            },
          ],
        },
        {
          id: 'g1s1-u2',
          order: 2,
          name: '比一比',
          overview: '通过直观比较，认识"长短、高矮、轻重"，建立量的初步概念。',
          topics: [
            {
              id: 'g1s1-u2-t1',
              name: '比长短',
              objectives: ['能直观比较两个或多个物体的长短', '会用"比……长/短"描述结果'],
              keyPoints: ['一端对齐再比较'],
              commonMistakes: ['比较时两端没对齐导致判断错误'],
              difficulty: 1,
              prerequisites: [],
            },
            {
              id: 'g1s1-u2-t2',
              name: '比高矮',
              objectives: ['会比较物体或人物的高矮', '会用"比……高/矮"描述'],
              keyPoints: ['站在同一水平面上比较'],
              commonMistakes: ['没站在同一平面就判断高矮'],
              difficulty: 1,
              prerequisites: [],
            },
            {
              id: 'g1s1-u2-t3',
              name: '比轻重',
              objectives: ['通过手掂或天平直观感知轻重', '会用"比……轻/重"描述'],
              keyPoints: ['天平平衡的意义'],
              commonMistakes: ['认为体积大的一定重'],
              difficulty: 2,
              prerequisites: [],
            },
          ],
        },
        {
          id: 'g1s1-u3',
          order: 3,
          name: '分一分',
          overview: '按一定标准对物体进行分类，体会分类的思想。',
          topics: [
            {
              id: 'g1s1-u3-t1',
              name: '按特征分类',
              objectives: ['能按颜色、形状、用途等单一标准分类', '能说出分类的依据'],
              keyPoints: ['同一标准下分类'],
              commonMistakes: ['标准不统一（一会按颜色一会按形状）'],
              difficulty: 2,
              prerequisites: [],
            },
          ],
        },
        {
          id: 'g1s1-u4',
          order: 4,
          name: '认位置',
          overview: '认识上下、前后、左右等位置关系，建立空间方位概念。',
          topics: [
            {
              id: 'g1s1-u4-t1',
              name: '上下、前后',
              objectives: ['能用上、下、前、后描述物体位置', '理解位置是相对的'],
              keyPoints: ['位置的相对性（A 在 B 上，B 就在 A 下）'],
              commonMistakes: ['以自己为中心，忽略参照物'],
              difficulty: 2,
              prerequisites: [],
            },
            {
              id: 'g1s1-u4-t2',
              name: '左右',
              objectives: ['能分清自己的左右手', '能判断物体在自己的左边或右边'],
              keyPoints: ['以自己的身体为参照'],
              commonMistakes: ['面对面时把对方的左右当成自己的左右'],
              difficulty: 3,
              prerequisites: [],
            },
          ],
        },
        {
          id: 'g1s1-u5',
          order: 5,
          name: '认识10以内的数',
          overview: '认识 0~10 的数，能读、写、比较大小，理解数的顺序和组成。',
          topics: [
            {
              id: 'g1s1-u5-t1',
              name: '认识 1~5',
              objectives: ['会读写 1~5', '能用 1~5 表示物体个数', '会比较大小'],
              keyPoints: ['数与量的对应'],
              commonMistakes: ['"5"写成镜像', '数字方向写反'],
              difficulty: 1,
              prerequisites: ['g1s1-u1-t1'],
            },
            {
              id: 'g1s1-u5-t2',
              name: '认识 0',
              objectives: ['理解 0 表示"没有"', '会读写 0', '知道 0 在数轴的位置'],
              keyPoints: ['0 是最小的自然数'],
              commonMistakes: ['认为 0 不是数', '0 写成椭圆或不闭合'],
              difficulty: 1,
              prerequisites: ['g1s1-u5-t1'],
            },
            {
              id: 'g1s1-u5-t3',
              name: '认识 6~10',
              objectives: ['会读写 6~10', '能比较 10 以内数的大小', '会用 > < = 表示'],
              keyPoints: ['> 和 < 的开口朝向大数', '数位顺序'],
              commonMistakes: ['> 和 < 方向写反', '"6"和"9"混淆'],
              difficulty: 2,
              prerequisites: ['g1s1-u5-t1'],
            },
            {
              id: 'g1s1-u5-t4',
              name: '第几',
              objectives: ['能准确表达"第几个"', '区分"几个"和"第几个"'],
              keyPoints: ['基数与序数的区别'],
              commonMistakes: ['把序数当基数（"第3个"理解为"3个"）'],
              difficulty: 3,
              prerequisites: ['g1s1-u5-t3'],
            },
          ],
        },
        {
          id: 'g1s1-u6',
          order: 6,
          name: '认识图形（一）',
          overview: '直观认识长方体、正方体、圆柱、球等立体图形。',
          topics: [
            {
              id: 'g1s1-u6-t1',
              name: '常见立体图形',
              objectives: ['能识别长方体、正方体、圆柱、球', '能说出生活中的实例'],
              keyPoints: ['立体图形的整体特征（不要求面、棱、顶点）'],
              commonMistakes: ['把正方体说成"方形"', '混淆圆柱和圆锥'],
              difficulty: 2,
              prerequisites: [],
            },
          ],
        },
        {
          id: 'g1s1-u7',
          order: 7,
          name: '分与合',
          overview: '理解 10 以内数的组成与分解，为加减法运算打基础。',
          topics: [
            {
              id: 'g1s1-u7-t1',
              name: '2~5 的分与合',
              objectives: ['掌握 2~5 各数的分与合', '能口头说出"几和几组成几"'],
              keyPoints: ['分与合的对称性'],
              commonMistakes: ['遗漏某种分法'],
              difficulty: 2,
              prerequisites: ['g1s1-u5-t1'],
            },
            {
              id: 'g1s1-u7-t2',
              name: '6~10 的分与合',
              objectives: ['熟练掌握 6~10 的所有分法', '为后续加减法做准备'],
              keyPoints: ['有序思考避免遗漏'],
              commonMistakes: ['没有规律地分，容易漏掉'],
              difficulty: 3,
              prerequisites: ['g1s1-u7-t1'],
            },
          ],
        },
        {
          id: 'g1s1-u8',
          order: 8,
          name: '10以内的加法和减法',
          overview: '理解加减法的含义，熟练计算 10 以内的加减法。',
          topics: [
            {
              id: 'g1s1-u8-t1',
              name: '加法的含义',
              objectives: ['理解"合并"是加法', '会写加法算式', '认识"+"和"="'],
              keyPoints: ['加号的含义', '加法表示合起来'],
              commonMistakes: ['加号写成乘号'],
              difficulty: 2,
              prerequisites: ['g1s1-u7-t2'],
            },
            {
              id: 'g1s1-u8-t2',
              name: '减法的含义',
              objectives: ['理解"去掉/剩下"是减法', '会写减法算式', '认识"−"'],
              keyPoints: ['减号的含义', '被减数 ≥ 减数'],
              commonMistakes: ['减数写在被减数前面', '小数减大数'],
              difficulty: 2,
              prerequisites: ['g1s1-u8-t1'],
            },
            {
              id: 'g1s1-u8-t3',
              name: '10以内加减法的计算',
              objectives: ['熟练计算 10 以内加减法', '速度达到 1 题/3 秒以内'],
              keyPoints: ['利用"分与合"快速计算'],
              commonMistakes: ['数手指依赖', '加减号看错'],
              difficulty: 3,
              prerequisites: ['g1s1-u8-t1', 'g1s1-u8-t2'],
            },
            {
              id: 'g1s1-u8-t4',
              name: '加减混合与连加连减',
              objectives: ['会按顺序计算连加连减', '能解决简单的实际问题'],
              keyPoints: ['从左到右计算'],
              commonMistakes: ['计算顺序颠倒'],
              difficulty: 3,
              prerequisites: ['g1s1-u8-t3'],
            },
          ],
        },
        {
          id: 'g1s1-u9',
          order: 9,
          name: '认识11~20各数',
          overview: '认识 11~20 的数，理解十进制和"满十进一"的概念。',
          topics: [
            {
              id: 'g1s1-u9-t1',
              name: '11~20 的认识',
              objectives: ['会读写 11~20', '理解"十几"是 1 个十和几个一'],
              keyPoints: ['十进制的初步认识', '数位（个位、十位）'],
              commonMistakes: ['"12"读成"一二"', '十位个位概念混淆'],
              difficulty: 3,
              prerequisites: ['g1s1-u5-t3'],
            },
            {
              id: 'g1s1-u9-t2',
              name: '不进位加法和不退位减法（20以内）',
              objectives: ['会算十几加几（不进位）', '会算十几减几（不退位）'],
              keyPoints: ['个位和个位相加减，十位不变'],
              commonMistakes: ['把十位上的1忘记带下来'],
              difficulty: 3,
              prerequisites: ['g1s1-u9-t1', 'g1s1-u8-t3'],
            },
          ],
        },
        {
          id: 'g1s1-u10',
          order: 10,
          name: '20以内的进位加法',
          overview: '掌握 20 以内进位加法，理解"凑十法"的算理。',
          topics: [
            {
              id: 'g1s1-u10-t1',
              name: '9 加几',
              objectives: ['掌握"凑十法"', '能熟练计算 9 加几'],
              keyPoints: ['看大数拆小数，凑成 10 再加'],
              commonMistakes: ['没凑十直接数手指', '拆分错误'],
              difficulty: 4,
              prerequisites: ['g1s1-u9-t2'],
            },
            {
              id: 'g1s1-u10-t2',
              name: '8、7、6 加几',
              objectives: ['迁移凑十法', '熟练计算 8/7/6 加几'],
              keyPoints: ['灵活拆分小数'],
              commonMistakes: ['只会 9 加几，不会迁移'],
              difficulty: 4,
              prerequisites: ['g1s1-u10-t1'],
            },
            {
              id: 'g1s1-u10-t3',
              name: '5、4、3、2 加几',
              objectives: ['熟练 20 以内所有进位加法', '速度和准确率达标'],
              keyPoints: ['可用"交换两数位置"简化'],
              commonMistakes: ['计算速度慢，依赖数数'],
              difficulty: 4,
              prerequisites: ['g1s1-u10-t2'],
            },
          ],
        },
      ],
    },

    // ============ 一年级下册 ============
    {
      grade: 1,
      semester: '下',
      units: [
        {
          id: 'g1s2-u1', order: 1, name: '20以内的退位减法',
          overview: '掌握 20 以内的退位减法，理解"破十法"和"想加算减"的算理。',
          topics: [
            { id: 'g1s2-u1-t1', name: '十几减 9', objectives: ['掌握破十法或想加算减', '熟练计算十几减 9'], keyPoints: ['破十法：先减 10 再加余数', '想加算减：想 9 加几等于十几'], commonMistakes: ['退位忘记从十位借', '想加算减时加错数'], difficulty: 4, prerequisites: ['g1s1-u10-t1'] },
            { id: 'g1s2-u1-t2', name: '十几减 8、7', objectives: ['迁移退位减法的方法', '熟练计算'], keyPoints: ['灵活选择算法'], commonMistakes: ['算法混乱'], difficulty: 4, prerequisites: ['g1s2-u1-t1'] },
            { id: 'g1s2-u1-t3', name: '十几减 6、5、4、3、2', objectives: ['熟练 20 以内所有退位减法'], keyPoints: ['速算的关键是"想加算减"'], commonMistakes: ['速度慢、准确率低'], difficulty: 4, prerequisites: ['g1s2-u1-t2'] },
          ],
        },
        {
          id: 'g1s2-u2', order: 2, name: '认识图形（二）',
          overview: '认识长方形、正方形、三角形、圆等平面图形。',
          topics: [
            { id: 'g1s2-u2-t1', name: '平面图形的认识', objectives: ['能识别长方形、正方形、三角形、圆', '能在生活中找到对应实例', '理解面与体的区别'], keyPoints: ['平面图形是"面"，立体图形是"体"'], commonMistakes: ['把正方形说成"四方形"', '混淆长方形和正方形'], difficulty: 2, prerequisites: ['g1s1-u6-t1'] },
            { id: 'g1s2-u2-t2', name: '拼一拼', objectives: ['能用基本图形拼出新图形', '培养空间想象'], keyPoints: ['七巧板的拼法'], commonMistakes: ['拼图时图形重叠或留缝'], difficulty: 2, prerequisites: ['g1s2-u2-t1'] },
          ],
        },
        {
          id: 'g1s2-u3', order: 3, name: '认识100以内的数',
          overview: '认识 100 以内的数，掌握数位概念和大小比较。',
          topics: [
            { id: 'g1s2-u3-t1', name: '数数和数的组成', objectives: ['能数 100 以内的数', '理解几个十和几个一组成几十几'], keyPoints: ['10 个一是 1 个十', '满十进一'], commonMistakes: ['数到几十九后接下一个十时卡顿'], difficulty: 3, prerequisites: ['g1s1-u9-t1'] },
            { id: 'g1s2-u3-t2', name: '读数和写数', objectives: ['会读写 100 以内的数', '认识个位、十位'], keyPoints: ['数位顺序表'], commonMistakes: ['"二十"写成"20"还是"02"', '中间有 0 时漏写'], difficulty: 3, prerequisites: ['g1s2-u3-t1'] },
            { id: 'g1s2-u3-t3', name: '比较大小', objectives: ['会比较 100 以内数的大小', '会用 > < = 表示'], keyPoints: ['先比十位，十位相同比个位'], commonMistakes: ['只看个位不看十位'], difficulty: 3, prerequisites: ['g1s2-u3-t2'] },
            { id: 'g1s2-u3-t4', name: '多一些、少一些、多得多、少得多', objectives: ['理解数量比较的程度词', '能描述数的相对大小'], keyPoints: ['程度词的语感'], commonMistakes: ['"多一些"和"多得多"混淆'], difficulty: 3, prerequisites: ['g1s2-u3-t3'] },
          ],
        },
        {
          id: 'g1s2-u4', order: 4, name: '100以内的加法和减法（一）',
          overview: '掌握整十数加减整十数、两位数加减一位数和整十数（不进位、不退位）。',
          topics: [
            { id: 'g1s2-u4-t1', name: '整十数加减整十数', objectives: ['会计算整十数加减整十数', '理解算理'], keyPoints: ['几个十加减几个十'], commonMistakes: ['算成 30+20=5'], difficulty: 3, prerequisites: ['g1s2-u3-t1'] },
            { id: 'g1s2-u4-t2', name: '两位数加一位数和整十数（不进位）', objectives: ['会算两位数加一位数', '会算两位数加整十数'], keyPoints: ['相同数位对齐相加'], commonMistakes: ['个位与十位相加'], difficulty: 3, prerequisites: ['g1s2-u4-t1'] },
            { id: 'g1s2-u4-t3', name: '两位数减一位数和整十数（不退位）', objectives: ['会算两位数减一位数和整十数'], keyPoints: ['相同数位对齐相减'], commonMistakes: ['数位对错'], difficulty: 3, prerequisites: ['g1s2-u4-t2'] },
          ],
        },
        {
          id: 'g1s2-u5', order: 5, name: '元、角、分',
          overview: '认识人民币的单位元、角、分，掌握简单的换算和使用。',
          topics: [
            { id: 'g1s2-u5-t1', name: '认识人民币', objectives: ['能识别各种面额的纸币和硬币', '认识"元、角、分"'], keyPoints: ['1 元 = 10 角，1 角 = 10 分'], commonMistakes: ['面额识别错误', '把 1 元当成 10 元'], difficulty: 2, prerequisites: [] },
            { id: 'g1s2-u5-t2', name: '简单的购物', objectives: ['能进行简单的人民币换算', '能解决简单购物问题'], keyPoints: ['付钱与找钱'], commonMistakes: ['换算单位时漏乘 10'], difficulty: 3, prerequisites: ['g1s2-u5-t1'] },
          ],
        },
        {
          id: 'g1s2-u6', order: 6, name: '100以内的加法和减法（二）',
          overview: '掌握两位数加减两位数（含进位、退位）的笔算方法。',
          topics: [
            { id: 'g1s2-u6-t1', name: '两位数加两位数（不进位）', objectives: ['会笔算两位数加两位数', '掌握竖式格式'], keyPoints: ['相同数位对齐，从个位加起'], commonMistakes: ['竖式数位没对齐'], difficulty: 3, prerequisites: ['g1s2-u4-t2'] },
            { id: 'g1s2-u6-t2', name: '两位数加两位数（进位）', objectives: ['理解满十进一', '会算进位加法'], keyPoints: ['个位满十向十位进 1'], commonMistakes: ['忘记进位', '进位标记不写'], difficulty: 4, prerequisites: ['g1s2-u6-t1'] },
            { id: 'g1s2-u6-t3', name: '两位数减两位数（不退位）', objectives: ['会笔算两位数减两位数'], keyPoints: ['相同数位对齐'], commonMistakes: ['数位错位'], difficulty: 3, prerequisites: ['g1s2-u6-t1'] },
            { id: 'g1s2-u6-t4', name: '两位数减两位数（退位）', objectives: ['理解退位算法', '会算退位减法'], keyPoints: ['个位不够向十位借 1 当 10'], commonMistakes: ['忘记退位', '退位后十位没减 1'], difficulty: 4, prerequisites: ['g1s2-u6-t3'] },
          ],
        },
      ],
    },

    // ============ 二年级上册 ============
    {
      grade: 2,
      semester: '上',
      units: [
        {
          id: 'g2s1-u1', order: 1, name: '100以内的加法和减法（三）',
          overview: '巩固两位数加减法，学习连加、连减、加减混合。',
          topics: [
            { id: 'g2s1-u1-t1', name: '连加、连减', objectives: ['会按顺序计算连加连减', '掌握竖式简便写法'], keyPoints: ['从左到右依次计算'], commonMistakes: ['第二步用错前一步结果'], difficulty: 3, prerequisites: ['g1s2-u6-t4'] },
            { id: 'g2s1-u1-t2', name: '加减混合', objectives: ['会按顺序计算加减混合算式'], keyPoints: ['运算顺序：从左到右'], commonMistakes: ['先算后面的减法'], difficulty: 3, prerequisites: ['g2s1-u1-t1'] },
          ],
        },
        {
          id: 'g2s1-u2', order: 2, name: '平行四边形的初步认识',
          overview: '初步认识平行四边形和四边形、五边形、六边形。',
          topics: [
            { id: 'g2s1-u2-t1', name: '认识四边形、五边形、六边形', objectives: ['能识别多边形', '能数出边的条数'], keyPoints: ['边的数量决定名称'], commonMistakes: ['数边时遗漏'], difficulty: 2, prerequisites: ['g1s2-u2-t1'] },
            { id: 'g2s1-u2-t2', name: '认识平行四边形', objectives: ['能识别平行四边形', '了解其稳定性差的特点'], keyPoints: ['对边平行且相等'], commonMistakes: ['把长方形归类成普通平行四边形'], difficulty: 2, prerequisites: ['g2s1-u2-t1'] },
          ],
        },
        {
          id: 'g2s1-u3', order: 3, name: '表内乘法（一）',
          overview: '理解乘法的含义，掌握 1~6 的乘法口诀。',
          topics: [
            { id: 'g2s1-u3-t1', name: '乘法的初步认识', objectives: ['理解几个相同加数相加可以用乘法', '会读写乘法算式', '认识"×"和因数'], keyPoints: ['乘法是相同加数的简便运算'], commonMistakes: ['不同加数相加列成乘法'], difficulty: 3, prerequisites: ['g2s1-u1-t2'] },
            { id: 'g2s1-u3-t2', name: '1~4 的乘法口诀', objectives: ['熟记 1~4 的乘法口诀', '能用口诀计算'], keyPoints: ['口诀的对称性'], commonMistakes: ['口诀背错', '口诀和算式对不上'], difficulty: 3, prerequisites: ['g2s1-u3-t1'] },
            { id: 'g2s1-u3-t3', name: '5 的乘法口诀', objectives: ['熟记 5 的乘法口诀'], keyPoints: ['五个一数的规律'], commonMistakes: ['五五二十五写成五五二十'], difficulty: 3, prerequisites: ['g2s1-u3-t2'] },
            { id: 'g2s1-u3-t4', name: '6 的乘法口诀', objectives: ['熟记 6 的乘法口诀'], keyPoints: ['口诀逐句记忆'], commonMistakes: ['六六三十六记成六六三十'], difficulty: 3, prerequisites: ['g2s1-u3-t3'] },
          ],
        },
        {
          id: 'g2s1-u4', order: 4, name: '表内除法（一）',
          overview: '理解除法的含义，能用 1~6 的口诀求商。',
          topics: [
            { id: 'g2s1-u4-t1', name: '平均分', objectives: ['理解"每份同样多"是平均分', '会用图示分一分'], keyPoints: ['平均分的两种含义：等分、包含'], commonMistakes: ['分得不平均'], difficulty: 3, prerequisites: ['g2s1-u3-t1'] },
            { id: 'g2s1-u4-t2', name: '认识除法', objectives: ['理解除法表示平均分', '认识"÷"和被除数、除数、商'], keyPoints: ['除号的含义', '除法算式各部分名称'], commonMistakes: ['被除数和除数位置颠倒'], difficulty: 3, prerequisites: ['g2s1-u4-t1'] },
            { id: 'g2s1-u4-t3', name: '用 1~6 的口诀求商', objectives: ['会用乘法口诀求商'], keyPoints: ['想"几乘几等于几"'], commonMistakes: ['只会乘不会除'], difficulty: 4, prerequisites: ['g2s1-u4-t2', 'g2s1-u3-t4'] },
          ],
        },
        {
          id: 'g2s1-u5', order: 5, name: '厘米和米',
          overview: '认识长度单位厘米和米，能用尺子测量。',
          topics: [
            { id: 'g2s1-u5-t1', name: '认识厘米', objectives: ['认识 1 厘米的长度', '会用直尺测量物体长度'], keyPoints: ['从 0 刻度开始量'], commonMistakes: ['从 1 开始量'], difficulty: 2, prerequisites: [] },
            { id: 'g2s1-u5-t2', name: '认识米', objectives: ['认识 1 米的长度', '知道 1 米 = 100 厘米'], keyPoints: ['米和厘米的换算'], commonMistakes: ['1 米 = 10 厘米'], difficulty: 2, prerequisites: ['g2s1-u5-t1'] },
            { id: 'g2s1-u5-t3', name: '简单单位换算', objectives: ['会进行米和厘米的换算'], keyPoints: ['1 米 = 100 厘米'], commonMistakes: ['换算时数位漏 0'], difficulty: 3, prerequisites: ['g2s1-u5-t2'] },
          ],
        },
        {
          id: 'g2s1-u6', order: 6, name: '表内乘法和表内除法（二）',
          overview: '掌握 7、8、9 的乘法口诀和相应的除法。',
          topics: [
            { id: 'g2s1-u6-t1', name: '7 的乘法口诀', objectives: ['熟记 7 的乘法口诀'], keyPoints: ['七八五十六易错'], commonMistakes: ['七七四十九写成五十'], difficulty: 4, prerequisites: ['g2s1-u3-t4'] },
            { id: 'g2s1-u6-t2', name: '8 的乘法口诀', objectives: ['熟记 8 的乘法口诀'], keyPoints: ['八八六十四'], commonMistakes: ['八九七十二写成七十'], difficulty: 4, prerequisites: ['g2s1-u6-t1'] },
            { id: 'g2s1-u6-t3', name: '9 的乘法口诀', objectives: ['熟记 9 的乘法口诀'], keyPoints: ['9 的口诀有"两个数字相加等于 9"的规律'], commonMistakes: ['口诀混乱'], difficulty: 4, prerequisites: ['g2s1-u6-t2'] },
            { id: 'g2s1-u6-t4', name: '用 7、8、9 的口诀求商', objectives: ['熟练用大数口诀求商'], keyPoints: ['想口诀求商'], commonMistakes: ['速度慢'], difficulty: 4, prerequisites: ['g2s1-u6-t3', 'g2s1-u4-t3'] },
          ],
        },
        {
          id: 'g2s1-u7', order: 7, name: '观察物体',
          overview: '从不同方向观察物体，体会看到的形状不同。',
          topics: [
            { id: 'g2s1-u7-t1', name: '从前面、上面、侧面看', objectives: ['能从三个方向观察物体', '能匹配看到的图形'], keyPoints: ['不同方向看到的形状不同'], commonMistakes: ['空间想象薄弱，方向混淆'], difficulty: 3, prerequisites: [] },
          ],
        },
      ],
    },

    // ============ 二年级下册 ============
    {
      grade: 2,
      semester: '下',
      units: [
        {
          id: 'g2s2-u1', order: 1, name: '有余数的除法',
          overview: '理解有余数除法的含义，掌握竖式计算和余数与除数的关系。',
          topics: [
            { id: 'g2s2-u1-t1', name: '认识有余数的除法', objectives: ['理解余数的含义', '会写有余数的除法算式'], keyPoints: ['余数 < 除数'], commonMistakes: ['余数比除数大'], difficulty: 4, prerequisites: ['g2s1-u6-t4'] },
            { id: 'g2s2-u1-t2', name: '除法竖式', objectives: ['会写除法竖式', '理解每一步的含义'], keyPoints: ['竖式的格式：商的位置、被减数'], commonMistakes: ['商写错位置', '减得不对'], difficulty: 4, prerequisites: ['g2s2-u1-t1'] },
          ],
        },
        {
          id: 'g2s2-u2', order: 2, name: '时、分、秒',
          overview: '认识钟面，学会读写时间，掌握时、分、秒的关系。',
          topics: [
            { id: 'g2s2-u2-t1', name: '认识时、分', objectives: ['认识钟面', '会读写时间', '知道 1 时 = 60 分'], keyPoints: ['时针走 1 大格是 1 时', '分针走 1 小格是 1 分'], commonMistakes: ['时针分针看反', '半时读错'], difficulty: 3, prerequisites: [] },
            { id: 'g2s2-u2-t2', name: '认识秒', objectives: ['认识秒', '知道 1 分 = 60 秒'], keyPoints: ['秒针走一圈是 1 分'], commonMistakes: ['1 分 = 100 秒'], difficulty: 3, prerequisites: ['g2s2-u2-t1'] },
            { id: 'g2s2-u2-t3', name: '时间的简单计算', objectives: ['会计算简单的经过时间'], keyPoints: ['结束时间 − 开始时间'], commonMistakes: ['跨小时计算错误'], difficulty: 4, prerequisites: ['g2s2-u2-t2'] },
          ],
        },
        {
          id: 'g2s2-u3', order: 3, name: '认识方向',
          overview: '认识东、南、西、北等八个方向。',
          topics: [
            { id: 'g2s2-u3-t1', name: '东南西北', objectives: ['认识四个基本方向', '能根据一个方向推出其他三个'], keyPoints: ['上北下南左西右东（地图）'], commonMistakes: ['左右与东西混淆'], difficulty: 3, prerequisites: ['g1s1-u4-t2'] },
            { id: 'g2s2-u3-t2', name: '东南、东北、西南、西北', objectives: ['认识八个方向'], keyPoints: ['方位词的组合'], commonMistakes: ['方向写反'], difficulty: 3, prerequisites: ['g2s2-u3-t1'] },
          ],
        },
        {
          id: 'g2s2-u4', order: 4, name: '认识万以内的数',
          overview: '认识千、万，掌握万以内数的读写和大小比较。',
          topics: [
            { id: 'g2s2-u4-t1', name: '认识千', objectives: ['知道 10 个百是 1 千', '会数千以内的数'], keyPoints: ['计数单位"千"'], commonMistakes: ['数到几百九十九后卡壳'], difficulty: 3, prerequisites: ['g1s2-u3-t1'] },
            { id: 'g2s2-u4-t2', name: '万以内数的认识', objectives: ['认识万', '会读写万以内的数'], keyPoints: ['10 个千是 1 万', '中间有 0 的读法'], commonMistakes: ['中间 0 漏读', '末尾 0 多读'], difficulty: 4, prerequisites: ['g2s2-u4-t1'] },
            { id: 'g2s2-u4-t3', name: '比较数的大小', objectives: ['会比较万以内数的大小'], keyPoints: ['位数多的数大', '位数相同从最高位比'], commonMistakes: ['只看个位'], difficulty: 3, prerequisites: ['g2s2-u4-t2'] },
            { id: 'g2s2-u4-t4', name: '近似数', objectives: ['初步认识近似数', '会用约等号'], keyPoints: ['四舍五入的初步思想'], commonMistakes: ['近似数和准确数混淆'], difficulty: 4, prerequisites: ['g2s2-u4-t3'] },
          ],
        },
        {
          id: 'g2s2-u5', order: 5, name: '分米和毫米',
          overview: '认识分米和毫米，掌握长度单位之间的换算。',
          topics: [
            { id: 'g2s2-u5-t1', name: '分米', objectives: ['认识 1 分米', '知道 1 分米 = 10 厘米'], keyPoints: ['分米与厘米、米的关系'], commonMistakes: ['1 分米 = 100 厘米'], difficulty: 3, prerequisites: ['g2s1-u5-t3'] },
            { id: 'g2s2-u5-t2', name: '毫米', objectives: ['认识 1 毫米', '知道 1 厘米 = 10 毫米'], keyPoints: ['毫米是较小的长度单位'], commonMistakes: ['毫米和厘米混淆'], difficulty: 3, prerequisites: ['g2s2-u5-t1'] },
          ],
        },
        {
          id: 'g2s2-u6', order: 6, name: '两、三位数的加法和减法',
          overview: '掌握三位数加减三位数的笔算方法。',
          topics: [
            { id: 'g2s2-u6-t1', name: '三位数加三位数（不进位、一次进位）', objectives: ['会笔算三位数加法'], keyPoints: ['相同数位对齐，从个位加起'], commonMistakes: ['进位标记忘写'], difficulty: 4, prerequisites: ['g1s2-u6-t2'] },
            { id: 'g2s2-u6-t2', name: '三位数加三位数（连续进位）', objectives: ['掌握连续进位加法'], keyPoints: ['每一位都可能进位'], commonMistakes: ['多次进位时漏加'], difficulty: 5, prerequisites: ['g2s2-u6-t1'] },
            { id: 'g2s2-u6-t3', name: '三位数减三位数（不退位、一次退位）', objectives: ['会笔算三位数减法'], keyPoints: ['相同数位对齐，从个位减起'], commonMistakes: ['退位忘记借'], difficulty: 4, prerequisites: ['g1s2-u6-t4'] },
            { id: 'g2s2-u6-t4', name: '三位数减三位数（连续退位、隔位退位）', objectives: ['掌握连续退位、隔位退位'], keyPoints: ['中间有 0 时的退位'], commonMistakes: ['隔位退位时 0 不会处理'], difficulty: 5, prerequisites: ['g2s2-u6-t3'] },
          ],
        },
        {
          id: 'g2s2-u7', order: 7, name: '角的初步认识',
          overview: '认识角，知道角的各部分名称，能比较角的大小。',
          topics: [
            { id: 'g2s2-u7-t1', name: '认识角', objectives: ['知道角由顶点和两条边组成', '会画角'], keyPoints: ['角的大小和边的长短无关'], commonMistakes: ['认为边长的角大'], difficulty: 3, prerequisites: ['g2s1-u2-t1'] },
            { id: 'g2s2-u7-t2', name: '直角、锐角、钝角', objectives: ['认识三种角', '会用三角板判断'], keyPoints: ['锐角 < 直角 < 钝角'], commonMistakes: ['锐角钝角判断错'], difficulty: 3, prerequisites: ['g2s2-u7-t1'] },
          ],
        },
        {
          id: 'g2s2-u8', order: 8, name: '数据的收集和整理（一）',
          overview: '初步学习用画"正"字法收集和整理数据。',
          topics: [
            { id: 'g2s2-u8-t1', name: '简单的数据整理', objectives: ['会用画"正"字记录数据', '能填写简单的统计表'], keyPoints: ['一画代表一次'], commonMistakes: ['"正"字笔画顺序错'], difficulty: 3, prerequisites: [] },
          ],
        },
      ],
    },

    // ============ 三年级上册 ============
    {
      grade: 3,
      semester: '上',
      units: [
        {
          id: 'g3s1-u1', order: 1, name: '两、三位数乘一位数',
          overview: '掌握两、三位数乘一位数的口算和笔算方法。',
          topics: [
            { id: 'g3s1-u1-t1', name: '整十、整百数乘一位数', objectives: ['会口算整十、整百数乘一位数'], keyPoints: ['先算非 0 部分，再添 0'], commonMistakes: ['末尾 0 漏写或多写'], difficulty: 3, prerequisites: ['g2s1-u6-t3'] },
            { id: 'g3s1-u1-t2', name: '两位数乘一位数（不进位）', objectives: ['会笔算不进位的乘法'], keyPoints: ['相同数位对齐'], commonMistakes: ['列竖式格式错'], difficulty: 3, prerequisites: ['g3s1-u1-t1'] },
            { id: 'g3s1-u1-t3', name: '两位数乘一位数（进位）', objectives: ['掌握进位乘法'], keyPoints: ['进位数加到下一位'], commonMistakes: ['进位忘加', '进位写错位置'], difficulty: 4, prerequisites: ['g3s1-u1-t2'] },
            { id: 'g3s1-u1-t4', name: '三位数乘一位数', objectives: ['会笔算三位数乘一位数', '处理中间或末尾有 0 的情况'], keyPoints: ['每一位都要乘'], commonMistakes: ['中间有 0 时漏乘'], difficulty: 4, prerequisites: ['g3s1-u1-t3'] },
          ],
        },
        {
          id: 'g3s1-u2', order: 2, name: '千克和克',
          overview: '认识质量单位千克和克，建立质量观念。',
          topics: [
            { id: 'g3s1-u2-t1', name: '认识千克', objectives: ['认识千克', '感受 1 千克的重量'], keyPoints: ['千克是较大的质量单位'], commonMistakes: ['千克和克混淆'], difficulty: 2, prerequisites: [] },
            { id: 'g3s1-u2-t2', name: '认识克', objectives: ['认识克', '知道 1 千克 = 1000 克'], keyPoints: ['克与千克的换算'], commonMistakes: ['1 千克 = 100 克'], difficulty: 3, prerequisites: ['g3s1-u2-t1'] },
          ],
        },
        {
          id: 'g3s1-u3', order: 3, name: '长方形和正方形',
          overview: '认识长方形和正方形的特征，掌握周长的计算。',
          topics: [
            { id: 'g3s1-u3-t1', name: '长方形和正方形的特征', objectives: ['知道四个角都是直角', '知道对边相等/四边相等'], keyPoints: ['正方形是特殊的长方形'], commonMistakes: ['认为正方形不是长方形'], difficulty: 3, prerequisites: ['g2s1-u2-t2'] },
            { id: 'g3s1-u3-t2', name: '周长的认识', objectives: ['理解周长的含义', '会量物体周长'], keyPoints: ['周长是封闭图形一周的长度'], commonMistakes: ['不封闭图形也算周长'], difficulty: 3, prerequisites: ['g3s1-u3-t1'] },
            { id: 'g3s1-u3-t3', name: '长方形和正方形的周长', objectives: ['掌握周长公式', '能解决实际问题'], keyPoints: ['长方形周长 = (长+宽)×2', '正方形周长 = 边长×4'], commonMistakes: ['只算长加宽不乘 2'], difficulty: 4, prerequisites: ['g3s1-u3-t2'] },
          ],
        },
        {
          id: 'g3s1-u4', order: 4, name: '两、三位数除以一位数',
          overview: '掌握两、三位数除以一位数的笔算方法。',
          topics: [
            { id: 'g3s1-u4-t1', name: '整十、整百数除以一位数', objectives: ['会口算整十、整百数除以一位数'], keyPoints: ['先算非 0 部分'], commonMistakes: ['末尾 0 漏写'], difficulty: 3, prerequisites: ['g2s2-u1-t2'] },
            { id: 'g3s1-u4-t2', name: '两位数除以一位数', objectives: ['会笔算两位数除以一位数', '掌握竖式格式'], keyPoints: ['从最高位除起'], commonMistakes: ['商的位置错'], difficulty: 4, prerequisites: ['g3s1-u4-t1'] },
            { id: 'g3s1-u4-t3', name: '三位数除以一位数', objectives: ['会笔算三位数除以一位数', '处理商中间或末尾有 0'], keyPoints: ['不够商 1 要写 0 占位'], commonMistakes: ['漏写 0', '商的位数错'], difficulty: 5, prerequisites: ['g3s1-u4-t2'] },
            { id: 'g3s1-u4-t4', name: '验算', objectives: ['学会用乘法验算除法'], keyPoints: ['商×除数+余数=被除数'], commonMistakes: ['余数没加上'], difficulty: 4, prerequisites: ['g3s1-u4-t3'] },
          ],
        },
        {
          id: 'g3s1-u5', order: 5, name: '解决问题的策略',
          overview: '学习"从条件出发"分析数量关系，解决两步计算的实际问题。',
          topics: [
            { id: 'g3s1-u5-t1', name: '从条件出发思考', objectives: ['能根据已知条件提出中间问题', '会列两步算式解决问题'], keyPoints: ['先求什么，再求什么'], commonMistakes: ['只列一步算式', '中间问题找不到'], difficulty: 4, prerequisites: ['g3s1-u1-t4'] },
          ],
        },
        {
          id: 'g3s1-u6', order: 6, name: '平移、旋转和轴对称',
          overview: '初步认识平移、旋转和轴对称图形。',
          topics: [
            { id: 'g3s1-u6-t1', name: '平移和旋转', objectives: ['能识别平移和旋转现象'], keyPoints: ['平移：方向不变', '旋转：绕一点转动'], commonMistakes: ['两者混淆'], difficulty: 3, prerequisites: [] },
            { id: 'g3s1-u6-t2', name: '轴对称图形', objectives: ['认识轴对称图形', '会画对称轴'], keyPoints: ['沿对称轴对折两边重合'], commonMistakes: ['对称轴画错位置'], difficulty: 3, prerequisites: ['g3s1-u6-t1'] },
          ],
        },
        {
          id: 'g3s1-u7', order: 7, name: '分数的初步认识（一）',
          overview: '初步认识分数，能读写简单分数，比较同分母分数大小。',
          topics: [
            { id: 'g3s1-u7-t1', name: '认识几分之一', objectives: ['理解几分之一的含义', '会读写'], keyPoints: ['平均分成几份，取其中一份'], commonMistakes: ['没平均分就用分数表示'], difficulty: 4, prerequisites: ['g2s1-u4-t1'] },
            { id: 'g3s1-u7-t2', name: '认识几分之几', objectives: ['理解几分之几的含义'], keyPoints: ['分母表示总份数，分子表示取的份数'], commonMistakes: ['分子分母含义混淆'], difficulty: 4, prerequisites: ['g3s1-u7-t1'] },
            { id: 'g3s1-u7-t3', name: '比较分数大小', objectives: ['会比较同分母分数的大小', '会比较分子是 1 的分数'], keyPoints: ['同分母比分子', '分子是 1 比分母'], commonMistakes: ['分母大的分数大'], difficulty: 4, prerequisites: ['g3s1-u7-t2'] },
            { id: 'g3s1-u7-t4', name: '简单的分数加减法', objectives: ['会算同分母分数加减法'], keyPoints: ['分母不变，分子相加减'], commonMistakes: ['分母也相加'], difficulty: 4, prerequisites: ['g3s1-u7-t3'] },
          ],
        },
      ],
    },

    // ============ 三年级下册 ============
    {
      grade: 3,
      semester: '下',
      units: [
        {
          id: 'g3s2-u1', order: 1, name: '两位数乘两位数',
          overview: '掌握两位数乘两位数的笔算方法。',
          topics: [
            { id: 'g3s2-u1-t1', name: '两位数乘整十数', objectives: ['会口算两位数乘整十数'], keyPoints: ['先算两位数乘十位上的数，再添 0'], commonMistakes: ['末尾 0 漏写'], difficulty: 3, prerequisites: ['g3s1-u1-t1'] },
            { id: 'g3s2-u1-t2', name: '两位数乘两位数（不进位）', objectives: ['会笔算两位数乘两位数'], keyPoints: ['第二部分积的末位与十位对齐'], commonMistakes: ['第二行写错位置'], difficulty: 4, prerequisites: ['g3s2-u1-t1'] },
            { id: 'g3s2-u1-t3', name: '两位数乘两位数（进位）', objectives: ['掌握进位乘法'], keyPoints: ['每一步进位都要加'], commonMistakes: ['多次进位漏加'], difficulty: 5, prerequisites: ['g3s2-u1-t2'] },
          ],
        },
        {
          id: 'g3s2-u2', order: 2, name: '千米和吨',
          overview: '认识较大的长度单位千米和质量单位吨。',
          topics: [
            { id: 'g3s2-u2-t1', name: '认识千米', objectives: ['认识千米', '知道 1 千米 = 1000 米'], keyPoints: ['千米用于较长距离'], commonMistakes: ['1 千米 = 100 米'], difficulty: 3, prerequisites: ['g2s1-u5-t2'] },
            { id: 'g3s2-u2-t2', name: '认识吨', objectives: ['认识吨', '知道 1 吨 = 1000 千克'], keyPoints: ['吨用于较重的物体'], commonMistakes: ['吨和千克换算错'], difficulty: 3, prerequisites: ['g3s1-u2-t2'] },
          ],
        },
        {
          id: 'g3s2-u3', order: 3, name: '解决问题的策略',
          overview: '学习"从问题出发"逆向思考，解决两步计算问题。',
          topics: [
            { id: 'g3s2-u3-t1', name: '从问题出发分析', objectives: ['会从问题倒推所需条件', '能解决两步问题'], keyPoints: ['要求 X，需要知道 Y 和 Z'], commonMistakes: ['倒推路径混乱'], difficulty: 5, prerequisites: ['g3s1-u5-t1'] },
          ],
        },
        {
          id: 'g3s2-u4', order: 4, name: '混合运算',
          overview: '掌握含有两级运算的混合运算顺序。',
          topics: [
            { id: 'g3s2-u4-t1', name: '不含括号的混合运算', objectives: ['知道先乘除后加减的顺序'], keyPoints: ['同级运算从左到右', '不同级先算高级'], commonMistakes: ['顺序颠倒'], difficulty: 4, prerequisites: ['g3s1-u4-t3'] },
            { id: 'g3s2-u4-t2', name: '含括号的混合运算', objectives: ['知道有括号先算括号里'], keyPoints: ['小括号优先'], commonMistakes: ['忽略括号'], difficulty: 4, prerequisites: ['g3s2-u4-t1'] },
          ],
        },
        {
          id: 'g3s2-u5', order: 5, name: '年、月、日',
          overview: '认识年、月、日，掌握平年闰年的判断。',
          topics: [
            { id: 'g3s2-u5-t1', name: '年、月、日', objectives: ['知道一年 12 个月、大月小月', '会数大月小月'], keyPoints: ['大月 31 天，小月 30 天，2 月特殊'], commonMistakes: ['记错大小月'], difficulty: 4, prerequisites: [] },
            { id: 'g3s2-u5-t2', name: '平年和闰年', objectives: ['会判断平年闰年'], keyPoints: ['四年一闰、百年不闰、四百年再闰'], commonMistakes: ['整百年不会判断'], difficulty: 5, prerequisites: ['g3s2-u5-t1'] },
            { id: 'g3s2-u5-t3', name: '24 时计时法', objectives: ['会用 24 时计时法表示时间'], keyPoints: ['下午时刻 + 12'], commonMistakes: ['12 时表示混淆'], difficulty: 4, prerequisites: ['g2s2-u2-t3'] },
          ],
        },
        {
          id: 'g3s2-u6', order: 6, name: '长方形和正方形的面积',
          overview: '认识面积单位，掌握长方形和正方形的面积计算。',
          topics: [
            { id: 'g3s2-u6-t1', name: '面积的意义', objectives: ['理解面积的含义'], keyPoints: ['面积是物体表面或封闭图形的大小'], commonMistakes: ['面积和周长混淆'], difficulty: 4, prerequisites: ['g3s1-u3-t2'] },
            { id: 'g3s2-u6-t2', name: '面积单位', objectives: ['认识平方厘米、平方分米、平方米'], keyPoints: ['面积单位的大小关系'], commonMistakes: ['长度单位代替面积单位'], difficulty: 4, prerequisites: ['g3s2-u6-t1'] },
            { id: 'g3s2-u6-t3', name: '长方形和正方形的面积', objectives: ['掌握面积公式', '能解决实际问题'], keyPoints: ['长方形面积=长×宽', '正方形面积=边长×边长'], commonMistakes: ['周长公式当面积公式'], difficulty: 4, prerequisites: ['g3s2-u6-t2'] },
            { id: 'g3s2-u6-t4', name: '面积单位换算', objectives: ['会换算 1 平方米=100 平方分米'], keyPoints: ['进率是 100'], commonMistakes: ['当成 10 来换算'], difficulty: 5, prerequisites: ['g3s2-u6-t3'] },
          ],
        },
        {
          id: 'g3s2-u7', order: 7, name: '分数的初步认识（二）',
          overview: '认识一个整体的几分之几。',
          topics: [
            { id: 'g3s2-u7-t1', name: '一个整体的几分之一', objectives: ['理解一个整体的几分之一'], keyPoints: ['整体平均分'], commonMistakes: ['只能看到单个物体的分数'], difficulty: 4, prerequisites: ['g3s1-u7-t1'] },
            { id: 'g3s2-u7-t2', name: '一个整体的几分之几', objectives: ['理解一个整体的几分之几', '能解决简单问题'], keyPoints: ['总数 ÷ 分母 × 分子'], commonMistakes: ['计算时分子分母用反'], difficulty: 5, prerequisites: ['g3s2-u7-t1'] },
          ],
        },
        {
          id: 'g3s2-u8', order: 8, name: '小数的初步认识',
          overview: '初步认识小数，能读写简单小数，会比较和加减。',
          topics: [
            { id: 'g3s2-u8-t1', name: '认识小数', objectives: ['认识一位小数', '会读写'], keyPoints: ['小数点的位置'], commonMistakes: ['读法错误'], difficulty: 3, prerequisites: ['g3s1-u7-t1'] },
            { id: 'g3s2-u8-t2', name: '比较小数大小', objectives: ['会比较一位小数的大小'], keyPoints: ['先比整数部分'], commonMistakes: ['只比小数部分'], difficulty: 4, prerequisites: ['g3s2-u8-t1'] },
            { id: 'g3s2-u8-t3', name: '简单的小数加减法', objectives: ['会算简单的一位小数加减法'], keyPoints: ['小数点对齐'], commonMistakes: ['小数点没对齐'], difficulty: 4, prerequisites: ['g3s2-u8-t2'] },
          ],
        },
      ],
    },

    // ============ 四年级上册 ============
    {
      grade: 4,
      semester: '上',
      units: [
        {
          id: 'g4s1-u1', order: 1, name: '升和毫升',
          overview: '认识容量单位升和毫升，建立容量观念。',
          topics: [
            { id: 'g4s1-u1-t1', name: '认识升', objectives: ['认识升', '感受 1 升的容量'], keyPoints: ['升用于较大容量'], commonMistakes: ['升和千克混淆'], difficulty: 3, prerequisites: [] },
            { id: 'g4s1-u1-t2', name: '认识毫升', objectives: ['认识毫升', '知道 1 升 = 1000 毫升'], keyPoints: ['进率是 1000'], commonMistakes: ['1 升 = 100 毫升'], difficulty: 3, prerequisites: ['g4s1-u1-t1'] },
          ],
        },
        {
          id: 'g4s1-u2', order: 2, name: '两、三位数除以两位数',
          overview: '掌握两、三位数除以两位数的笔算方法。',
          topics: [
            { id: 'g4s1-u2-t1', name: '除数是整十数的除法', objectives: ['会口算和笔算除数是整十数的除法'], keyPoints: ['用四舍五入法试商'], commonMistakes: ['试商不准'], difficulty: 4, prerequisites: ['g3s1-u4-t3'] },
            { id: 'g4s1-u2-t2', name: '试商方法', objectives: ['掌握"四舍"和"五入"试商', '能调商'], keyPoints: ['初商偏大要调小，初商偏小要调大'], commonMistakes: ['不会调商'], difficulty: 5, prerequisites: ['g4s1-u2-t1'] },
            { id: 'g4s1-u2-t3', name: '三位数除以两位数', objectives: ['会笔算三位数除以两位数', '处理商是两位的情况'], keyPoints: ['商的位数判断'], commonMistakes: ['商的位数错'], difficulty: 5, prerequisites: ['g4s1-u2-t2'] },
          ],
        },
        {
          id: 'g4s1-u3', order: 3, name: '观察物体',
          overview: '从不同角度观察由几个小正方体组成的物体。',
          topics: [
            { id: 'g4s1-u3-t1', name: '观察组合体', objectives: ['会从不同方向观察物体', '能画出看到的形状'], keyPoints: ['正面、侧面、上面'], commonMistakes: ['空间想象不足'], difficulty: 4, prerequisites: ['g2s1-u7-t1'] },
          ],
        },
        {
          id: 'g4s1-u4', order: 4, name: '统计表和条形统计图（一）',
          overview: '认识简单的条形统计图，能从图中获取信息。',
          topics: [
            { id: 'g4s1-u4-t1', name: '简单的统计表', objectives: ['会填写简单的统计表', '能从表中获取信息'], keyPoints: ['表格的行列含义'], commonMistakes: ['看错行列'], difficulty: 3, prerequisites: ['g2s2-u8-t1'] },
            { id: 'g4s1-u4-t2', name: '条形统计图', objectives: ['认识条形统计图', '会画简单的条形图'], keyPoints: ['条形高度表示数量'], commonMistakes: ['坐标轴看错'], difficulty: 4, prerequisites: ['g4s1-u4-t1'] },
          ],
        },
        {
          id: 'g4s1-u5', order: 5, name: '解决问题的策略',
          overview: '学习用列表整理信息解决问题。',
          topics: [
            { id: 'g4s1-u5-t1', name: '列表整理信息', objectives: ['会用列表法整理已知条件', '能解决归一、归总问题'], keyPoints: ['表格让数量关系更清晰'], commonMistakes: ['列表项不全'], difficulty: 5, prerequisites: ['g3s2-u3-t1'] },
          ],
        },
        {
          id: 'g4s1-u6', order: 6, name: '可能性',
          overview: '初步认识事件发生的可能性。',
          topics: [
            { id: 'g4s1-u6-t1', name: '可能性的大小', objectives: ['能判断"一定、可能、不可能"', '能比较可能性大小'], keyPoints: ['数量越多可能性越大'], commonMistakes: ['"可能"和"一定"混淆'], difficulty: 4, prerequisites: [] },
          ],
        },
        {
          id: 'g4s1-u7', order: 7, name: '整数四则混合运算',
          overview: '掌握含有两级运算和括号的三步混合运算。',
          topics: [
            { id: 'g4s1-u7-t1', name: '不含括号的三步运算', objectives: ['会按运算顺序计算'], keyPoints: ['先乘除后加减'], commonMistakes: ['顺序颠倒'], difficulty: 4, prerequisites: ['g3s2-u4-t1'] },
            { id: 'g4s1-u7-t2', name: '含小括号的三步运算', objectives: ['会算含小括号的三步算式'], keyPoints: ['先算括号里'], commonMistakes: ['忽略括号'], difficulty: 4, prerequisites: ['g4s1-u7-t1'] },
            { id: 'g4s1-u7-t3', name: '含中括号的运算', objectives: ['认识中括号', '会算含中括号的算式'], keyPoints: ['先小括号后中括号'], commonMistakes: ['顺序颠倒'], difficulty: 5, prerequisites: ['g4s1-u7-t2'] },
          ],
        },
        {
          id: 'g4s1-u8', order: 8, name: '垂线与平行线',
          overview: '认识射线、直线、角的度量，垂线与平行线。',
          topics: [
            { id: 'g4s1-u8-t1', name: '射线、直线和角', objectives: ['认识线段、射线、直线', '理解角的本质'], keyPoints: ['三种线的端点数不同'], commonMistakes: ['三种线混淆'], difficulty: 4, prerequisites: ['g2s2-u7-t1'] },
            { id: 'g4s1-u8-t2', name: '角的度量', objectives: ['认识量角器', '会用量角器量角'], keyPoints: ['中心点对顶点，0 刻度对一边'], commonMistakes: ['内外圈刻度看错'], difficulty: 5, prerequisites: ['g4s1-u8-t1'] },
            { id: 'g4s1-u8-t3', name: '角的分类', objectives: ['认识平角、周角', '掌握各类角的范围'], keyPoints: ['锐<直<钝<平<周'], commonMistakes: ['平角和直线混淆'], difficulty: 4, prerequisites: ['g4s1-u8-t2'] },
            { id: 'g4s1-u8-t4', name: '垂线和平行线', objectives: ['认识垂直和平行', '会画垂线和平行线'], keyPoints: ['垂直交于直角', '平行不相交'], commonMistakes: ['只看图判断不准'], difficulty: 5, prerequisites: ['g4s1-u8-t3'] },
          ],
        },
      ],
    },

    // ============ 四年级下册 ============
    {
      grade: 4,
      semester: '下',
      units: [
        {
          id: 'g4s2-u1', order: 1, name: '平移、旋转和轴对称',
          overview: '深入学习平移、旋转的画法和轴对称图形。',
          topics: [
            { id: 'g4s2-u1-t1', name: '图形的平移', objectives: ['能在方格纸上画平移后的图形'], keyPoints: ['平移方向和距离'], commonMistakes: ['距离数错格'], difficulty: 4, prerequisites: ['g3s1-u6-t1'] },
            { id: 'g4s2-u1-t2', name: '图形的旋转', objectives: ['能在方格纸上画旋转后的图形'], keyPoints: ['旋转中心、方向、角度'], commonMistakes: ['旋转方向错'], difficulty: 5, prerequisites: ['g4s2-u1-t1'] },
            { id: 'g4s2-u1-t3', name: '轴对称图形', objectives: ['会画对称轴', '能补全轴对称图形'], keyPoints: ['对应点到对称轴距离相等'], commonMistakes: ['对应点位置错'], difficulty: 4, prerequisites: ['g3s1-u6-t2'] },
          ],
        },
        {
          id: 'g4s2-u2', order: 2, name: '认识多位数',
          overview: '认识亿以内的数和亿以上的数，掌握数位顺序表。',
          topics: [
            { id: 'g4s2-u2-t1', name: '亿以内的数', objectives: ['会读写亿以内的数', '认识万级'], keyPoints: ['四位一级'], commonMistakes: ['分级出错'], difficulty: 4, prerequisites: ['g2s2-u4-t2'] },
            { id: 'g4s2-u2-t2', name: '亿以上的数', objectives: ['会读写亿以上的数', '认识亿级'], keyPoints: ['10 个千万是 1 亿'], commonMistakes: ['亿级位数搞错'], difficulty: 5, prerequisites: ['g4s2-u2-t1'] },
            { id: 'g4s2-u2-t3', name: '近似数和改写', objectives: ['会用四舍五入求近似数', '会改写成万或亿'], keyPoints: ['看尾数最高位'], commonMistakes: ['四舍五入位置错'], difficulty: 5, prerequisites: ['g4s2-u2-t2'] },
          ],
        },
        {
          id: 'g4s2-u3', order: 3, name: '三位数乘两位数',
          overview: '掌握三位数乘两位数的笔算方法。',
          topics: [
            { id: 'g4s2-u3-t1', name: '三位数乘两位数', objectives: ['会笔算三位数乘两位数'], keyPoints: ['第二部分积末位与十位对齐'], commonMistakes: ['对位错'], difficulty: 5, prerequisites: ['g3s2-u1-t3'] },
            { id: 'g4s2-u3-t2', name: '末尾有 0 的乘法', objectives: ['会简便计算末尾有 0 的乘法'], keyPoints: ['先算非 0 部分再添 0'], commonMistakes: ['0 个数算错'], difficulty: 4, prerequisites: ['g4s2-u3-t1'] },
          ],
        },
        {
          id: 'g4s2-u4', order: 4, name: '用计算器探索规律',
          overview: '学习使用计算器，探索运算中的规律。',
          topics: [
            { id: 'g4s2-u4-t1', name: '认识计算器', objectives: ['会用计算器进行四则运算'], keyPoints: ['按键功能'], commonMistakes: ['按键顺序错'], difficulty: 2, prerequisites: [] },
            { id: 'g4s2-u4-t2', name: '探索规律', objectives: ['用计算器探索积的变化规律'], keyPoints: ['一个因数不变，另一个因数扩大几倍，积也扩大几倍'], commonMistakes: ['总结不出规律'], difficulty: 4, prerequisites: ['g4s2-u4-t1'] },
          ],
        },
        {
          id: 'g4s2-u5', order: 5, name: '解决问题的策略',
          overview: '用画线段图的方法解决和差、倍数问题。',
          topics: [
            { id: 'g4s2-u5-t1', name: '画线段图解题', objectives: ['会画线段图整理信息', '能解决和差、和倍、差倍问题'], keyPoints: ['一份量是关键'], commonMistakes: ['线段比例严重不对'], difficulty: 5, prerequisites: ['g4s1-u5-t1'] },
          ],
        },
        {
          id: 'g4s2-u6', order: 6, name: '运算律',
          overview: '掌握加法、乘法的交换律、结合律和分配律。',
          topics: [
            { id: 'g4s2-u6-t1', name: '加法交换律和结合律', objectives: ['理解并会应用'], keyPoints: ['a+b=b+a', '(a+b)+c=a+(b+c)'], commonMistakes: ['只记公式不会用'], difficulty: 4, prerequisites: [] },
            { id: 'g4s2-u6-t2', name: '乘法交换律和结合律', objectives: ['理解并会应用'], keyPoints: ['a×b=b×a', '(a×b)×c=a×(b×c)'], commonMistakes: ['用错运算律'], difficulty: 4, prerequisites: ['g4s2-u6-t1'] },
            { id: 'g4s2-u6-t3', name: '乘法分配律', objectives: ['理解并会应用乘法分配律', '能简便计算'], keyPoints: ['(a+b)×c=a×c+b×c'], commonMistakes: ['漏乘其中一项'], difficulty: 5, prerequisites: ['g4s2-u6-t2'] },
            { id: 'g4s2-u6-t4', name: '减法和除法的性质', objectives: ['知道连减、连除的简便方法'], keyPoints: ['a-b-c=a-(b+c)', 'a÷b÷c=a÷(b×c)'], commonMistakes: ['性质用反'], difficulty: 5, prerequisites: ['g4s2-u6-t3'] },
          ],
        },
        {
          id: 'g4s2-u7', order: 7, name: '三角形、平行四边形和梯形',
          overview: '认识三角形的特性、分类，认识平行四边形和梯形。',
          topics: [
            { id: 'g4s2-u7-t1', name: '三角形的认识', objectives: ['理解三角形的特性', '认识底和高'], keyPoints: ['三角形具有稳定性', '三边关系：两边之和大于第三边'], commonMistakes: ['不满足三边关系也认为能围成'], difficulty: 4, prerequisites: ['g4s1-u8-t4'] },
            { id: 'g4s2-u7-t2', name: '三角形的分类', objectives: ['按角分类：锐角/直角/钝角', '按边分类：等腰/等边'], keyPoints: ['等边三角形是特殊的等腰三角形'], commonMistakes: ['分类标准混淆'], difficulty: 4, prerequisites: ['g4s2-u7-t1'] },
            { id: 'g4s2-u7-t3', name: '三角形内角和', objectives: ['知道三角形内角和是 180°'], keyPoints: ['180°是定值'], commonMistakes: ['以为不同形状内角和不同'], difficulty: 4, prerequisites: ['g4s2-u7-t2'] },
            { id: 'g4s2-u7-t4', name: '平行四边形和梯形', objectives: ['认识平行四边形和梯形', '会画高'], keyPoints: ['梯形只有一组对边平行'], commonMistakes: ['平行四边形高画错'], difficulty: 4, prerequisites: ['g4s2-u7-t3'] },
          ],
        },
        {
          id: 'g4s2-u8', order: 8, name: '确定位置',
          overview: '用数对确定平面上点的位置。',
          topics: [
            { id: 'g4s2-u8-t1', name: '用数对表示位置', objectives: ['理解数对的含义', '会用数对表示位置'], keyPoints: ['先列后行（先横后纵）'], commonMistakes: ['行列顺序颠倒'], difficulty: 4, prerequisites: [] },
          ],
        },
      ],
    },

    // ============ 五年级上册 ============
    {
      grade: 5,
      semester: '上',
      units: [
        {
          id: 'g5s1-u1', order: 1, name: '负数的初步认识',
          overview: '初步认识负数，会用正负数表示具有相反意义的量。',
          topics: [
            { id: 'g5s1-u1-t1', name: '认识负数', objectives: ['会读写负数', '理解 0 既不是正数也不是负数'], keyPoints: ['正负数表示相反意义'], commonMistakes: ['0 当成正数'], difficulty: 4, prerequisites: [] },
          ],
        },
        {
          id: 'g5s1-u2', order: 2, name: '多边形的面积',
          overview: '掌握平行四边形、三角形、梯形的面积计算。',
          topics: [
            { id: 'g5s1-u2-t1', name: '平行四边形的面积', objectives: ['推导并掌握公式 S=底×高'], keyPoints: ['转化成长方形'], commonMistakes: ['底和高不对应'], difficulty: 4, prerequisites: ['g4s2-u7-t4'] },
            { id: 'g5s1-u2-t2', name: '三角形的面积', objectives: ['推导并掌握公式 S=底×高÷2'], keyPoints: ['两个相同三角形拼成平行四边形'], commonMistakes: ['漏除以 2'], difficulty: 5, prerequisites: ['g5s1-u2-t1'] },
            { id: 'g5s1-u2-t3', name: '梯形的面积', objectives: ['推导并掌握公式 S=(上底+下底)×高÷2'], keyPoints: ['两个相同梯形拼成平行四边形'], commonMistakes: ['只算一个底'], difficulty: 5, prerequisites: ['g5s1-u2-t2'] },
            { id: 'g5s1-u2-t4', name: '组合图形面积', objectives: ['会用分割或添补法求组合图形面积'], keyPoints: ['转化为基本图形'], commonMistakes: ['分割重叠或漏算'], difficulty: 5, prerequisites: ['g5s1-u2-t3'] },
          ],
        },
        {
          id: 'g5s1-u3', order: 3, name: '小数的意义和性质',
          overview: '理解小数的意义，掌握小数的性质和大小比较。',
          topics: [
            { id: 'g5s1-u3-t1', name: '小数的意义', objectives: ['理解小数与分数的关系', '认识两位、三位小数'], keyPoints: ['十分之几用一位小数表示'], commonMistakes: ['小数位数和分母位数对不上'], difficulty: 4, prerequisites: ['g3s2-u8-t1'] },
            { id: 'g5s1-u3-t2', name: '小数的性质', objectives: ['知道小数末尾添去 0 大小不变'], keyPoints: ['末尾的 0 可以省略'], commonMistakes: ['中间的 0 也省略'], difficulty: 4, prerequisites: ['g5s1-u3-t1'] },
            { id: 'g5s1-u3-t3', name: '小数大小比较', objectives: ['会比较小数的大小'], keyPoints: ['先比整数部分，再依次比小数部分'], commonMistakes: ['位数多的小数就大'], difficulty: 4, prerequisites: ['g5s1-u3-t2'] },
            { id: 'g5s1-u3-t4', name: '求小数的近似数', objectives: ['会用四舍五入求小数近似数'], keyPoints: ['看保留位的下一位'], commonMistakes: ['保留位置数错'], difficulty: 5, prerequisites: ['g5s1-u3-t3'] },
          ],
        },
        {
          id: 'g5s1-u4', order: 4, name: '小数加法和减法',
          overview: '掌握小数加减法的笔算和简便运算。',
          topics: [
            { id: 'g5s1-u4-t1', name: '小数加减法', objectives: ['会笔算小数加减法'], keyPoints: ['小数点对齐就是数位对齐'], commonMistakes: ['末尾对齐'], difficulty: 4, prerequisites: ['g3s2-u8-t3'] },
            { id: 'g5s1-u4-t2', name: '小数加减法的简便计算', objectives: ['会用运算律简便计算'], keyPoints: ['加法运算律对小数同样成立'], commonMistakes: ['不会迁移'], difficulty: 5, prerequisites: ['g5s1-u4-t1'] },
          ],
        },
        {
          id: 'g5s1-u5', order: 5, name: '小数乘法和除法',
          overview: '掌握小数乘除法的计算方法。',
          topics: [
            { id: 'g5s1-u5-t1', name: '小数乘整数', objectives: ['会算小数乘整数'], keyPoints: ['先按整数乘，再点小数点'], commonMistakes: ['小数点位置错'], difficulty: 4, prerequisites: ['g4s2-u3-t1'] },
            { id: 'g5s1-u5-t2', name: '小数乘小数', objectives: ['掌握小数乘小数'], keyPoints: ['因数小数位数之和=积的小数位数'], commonMistakes: ['位数加错'], difficulty: 5, prerequisites: ['g5s1-u5-t1'] },
            { id: 'g5s1-u5-t3', name: '小数除以整数', objectives: ['会算小数除以整数'], keyPoints: ['商的小数点和被除数对齐'], commonMistakes: ['小数点不对齐'], difficulty: 5, prerequisites: ['g5s1-u5-t2'] },
            { id: 'g5s1-u5-t4', name: '一个数除以小数', objectives: ['掌握除数是小数的除法'], keyPoints: ['转化成除数是整数'], commonMistakes: ['只移动除数小数点'], difficulty: 5, prerequisites: ['g5s1-u5-t3'] },
            { id: 'g5s1-u5-t5', name: '商的近似数和循环小数', objectives: ['会取商的近似数', '认识循环小数'], keyPoints: ['循环节'], commonMistakes: ['循环节标错'], difficulty: 5, prerequisites: ['g5s1-u5-t4'] },
          ],
        },
        {
          id: 'g5s1-u6', order: 6, name: '统计表和条形统计图（二）',
          overview: '认识复式统计表和复式条形统计图。',
          topics: [
            { id: 'g5s1-u6-t1', name: '复式统计表', objectives: ['会读复式统计表', '能完成填写'], keyPoints: ['行列含义'], commonMistakes: ['看错行列'], difficulty: 4, prerequisites: ['g4s1-u4-t1'] },
            { id: 'g5s1-u6-t2', name: '复式条形统计图', objectives: ['会画和读复式条形图'], keyPoints: ['图例区分'], commonMistakes: ['没标图例'], difficulty: 4, prerequisites: ['g5s1-u6-t1'] },
          ],
        },
        {
          id: 'g5s1-u7', order: 7, name: '解决问题的策略',
          overview: '用列举的方法解决问题。',
          topics: [
            { id: 'g5s1-u7-t1', name: '一一列举', objectives: ['会用一一列举法解决问题'], keyPoints: ['有序、不重复、不遗漏'], commonMistakes: ['列举重复或遗漏'], difficulty: 5, prerequisites: ['g4s2-u5-t1'] },
          ],
        },
        {
          id: 'g5s1-u8', order: 8, name: '用字母表示数',
          overview: '初步认识用字母表示数和简单的代数式。',
          topics: [
            { id: 'g5s1-u8-t1', name: '用字母表示数', objectives: ['理解字母可以表示数', '会写含字母的式子'], keyPoints: ['a×b 简写为 ab', 'a×a 写作 a²'], commonMistakes: ['乘号不省略'], difficulty: 4, prerequisites: [] },
            { id: 'g5s1-u8-t2', name: '化简和求值', objectives: ['会化简简单代数式', '会求代数式的值'], keyPoints: ['代入数值计算'], commonMistakes: ['代入时漏代'], difficulty: 5, prerequisites: ['g5s1-u8-t1'] },
          ],
        },
      ],
    },

    // ============ 五年级下册 ============
    {
      grade: 5,
      semester: '下',
      units: [
        {
          id: 'g5s2-u1', order: 1, name: '简易方程',
          overview: '认识方程，会用方程解决简单实际问题。',
          topics: [
            { id: 'g5s2-u1-t1', name: '方程的认识', objectives: ['理解方程的含义', '会判断方程'], keyPoints: ['含未知数的等式'], commonMistakes: ['有等号就是方程'], difficulty: 4, prerequisites: ['g5s1-u8-t2'] },
            { id: 'g5s2-u1-t2', name: '等式的性质', objectives: ['理解等式的性质', '会用性质解方程'], keyPoints: ['两边同时加减乘除同一个数（除数不为 0）'], commonMistakes: ['只对一边操作'], difficulty: 5, prerequisites: ['g5s2-u1-t1'] },
            { id: 'g5s2-u1-t3', name: '解一步方程', objectives: ['会解 ax+b=c 类型方程'], keyPoints: ['利用等式性质'], commonMistakes: ['解的步骤跳过'], difficulty: 5, prerequisites: ['g5s2-u1-t2'] },
            { id: 'g5s2-u1-t4', name: '列方程解决实际问题', objectives: ['会找数量关系', '会列方程并解'], keyPoints: ['设未知数，列等量关系'], commonMistakes: ['等量关系找错'], difficulty: 5, prerequisites: ['g5s2-u1-t3'] },
          ],
        },
        {
          id: 'g5s2-u2', order: 2, name: '折线统计图',
          overview: '认识折线统计图，了解其特点。',
          topics: [
            { id: 'g5s2-u2-t1', name: '单式折线统计图', objectives: ['会读和画单式折线图', '能描述变化趋势'], keyPoints: ['折线表示变化'], commonMistakes: ['和条形图混淆'], difficulty: 4, prerequisites: ['g5s1-u6-t2'] },
            { id: 'g5s2-u2-t2', name: '复式折线统计图', objectives: ['会读和画复式折线图', '能比较两组数据变化'], keyPoints: ['两条折线对比'], commonMistakes: ['图例不分'], difficulty: 5, prerequisites: ['g5s2-u2-t1'] },
          ],
        },
        {
          id: 'g5s2-u3', order: 3, name: '因数与倍数',
          overview: '认识因数和倍数、质数与合数、奇数与偶数。',
          topics: [
            { id: 'g5s2-u3-t1', name: '因数和倍数', objectives: ['理解因数和倍数的含义', '会找一个数的因数和倍数'], keyPoints: ['有序找因数避免遗漏'], commonMistakes: ['漏掉某个因数'], difficulty: 5, prerequisites: ['g4s1-u2-t3'] },
            { id: 'g5s2-u3-t2', name: '2、5、3 的倍数特征', objectives: ['掌握三个特征'], keyPoints: ['2 看个位、5 看个位、3 看各位之和'], commonMistakes: ['3 的特征看个位'], difficulty: 4, prerequisites: ['g5s2-u3-t1'] },
            { id: 'g5s2-u3-t3', name: '奇数和偶数', objectives: ['理解奇数和偶数', '能判断'], keyPoints: ['2 的倍数是偶数'], commonMistakes: ['0 不是偶数'], difficulty: 3, prerequisites: ['g5s2-u3-t2'] },
            { id: 'g5s2-u3-t4', name: '质数和合数', objectives: ['理解质数和合数'], keyPoints: ['1 既不是质数也不是合数'], commonMistakes: ['1 是质数'], difficulty: 4, prerequisites: ['g5s2-u3-t3'] },
            { id: 'g5s2-u3-t5', name: '公因数和最大公因数', objectives: ['会求两个数的最大公因数'], keyPoints: ['列举法或短除法'], commonMistakes: ['少算因数'], difficulty: 5, prerequisites: ['g5s2-u3-t4'] },
            { id: 'g5s2-u3-t6', name: '公倍数和最小公倍数', objectives: ['会求两个数的最小公倍数'], keyPoints: ['列举法或短除法'], commonMistakes: ['和最大公因数混淆'], difficulty: 5, prerequisites: ['g5s2-u3-t5'] },
          ],
        },
        {
          id: 'g5s2-u4', order: 4, name: '分数的意义和性质',
          overview: '深入理解分数的意义，掌握约分和通分。',
          topics: [
            { id: 'g5s2-u4-t1', name: '分数的意义', objectives: ['理解单位"1"', '认识分数单位'], keyPoints: ['分数单位是几分之一'], commonMistakes: ['单位"1"找错'], difficulty: 4, prerequisites: ['g3s2-u7-t2'] },
            { id: 'g5s2-u4-t2', name: '真分数和假分数', objectives: ['会区分真分数和假分数', '认识带分数'], keyPoints: ['分子≥分母是假分数'], commonMistakes: ['假分数化带分数错'], difficulty: 4, prerequisites: ['g5s2-u4-t1'] },
            { id: 'g5s2-u4-t3', name: '分数的基本性质', objectives: ['理解分数基本性质'], keyPoints: ['分子分母同乘除一个非 0 数，分数大小不变'], commonMistakes: ['只乘分子'], difficulty: 4, prerequisites: ['g5s2-u4-t2'] },
            { id: 'g5s2-u4-t4', name: '约分', objectives: ['会用最大公因数约分'], keyPoints: ['约成最简分数'], commonMistakes: ['约不到最简'], difficulty: 5, prerequisites: ['g5s2-u4-t3', 'g5s2-u3-t5'] },
            { id: 'g5s2-u4-t5', name: '通分', objectives: ['会用最小公倍数通分'], keyPoints: ['公分母是分母的最小公倍数'], commonMistakes: ['公分母太大'], difficulty: 5, prerequisites: ['g5s2-u4-t4', 'g5s2-u3-t6'] },
            { id: 'g5s2-u4-t6', name: '分数和小数的互化', objectives: ['会分数小数互化'], keyPoints: ['分数化小数：分子÷分母'], commonMistakes: ['除不尽时取近似'], difficulty: 5, prerequisites: ['g5s2-u4-t5'] },
          ],
        },
        {
          id: 'g5s2-u5', order: 5, name: '分数加法和减法',
          overview: '掌握异分母分数加减法。',
          topics: [
            { id: 'g5s2-u5-t1', name: '异分母分数加减法', objectives: ['会用通分计算异分母分数加减'], keyPoints: ['通分后分母不变'], commonMistakes: ['不通分直接加'], difficulty: 5, prerequisites: ['g5s2-u4-t5'] },
            { id: 'g5s2-u5-t2', name: '分数加减混合运算', objectives: ['会算分数加减混合', '会简便计算'], keyPoints: ['运算律对分数同样成立'], commonMistakes: ['顺序错'], difficulty: 5, prerequisites: ['g5s2-u5-t1'] },
          ],
        },
        {
          id: 'g5s2-u6', order: 6, name: '圆',
          overview: '认识圆的特征，掌握圆的周长和面积。',
          topics: [
            { id: 'g5s2-u6-t1', name: '圆的认识', objectives: ['认识圆心、半径、直径', '理解 d=2r'], keyPoints: ['同圆中所有半径相等'], commonMistakes: ['直径和半径关系搞反'], difficulty: 4, prerequisites: [] },
            { id: 'g5s2-u6-t2', name: '圆的周长', objectives: ['理解圆周率', '掌握 C=πd=2πr'], keyPoints: ['π≈3.14'], commonMistakes: ['公式记反'], difficulty: 5, prerequisites: ['g5s2-u6-t1'] },
            { id: 'g5s2-u6-t3', name: '圆的面积', objectives: ['推导并掌握 S=πr²'], keyPoints: ['转化成长方形推导'], commonMistakes: ['用直径求面积'], difficulty: 5, prerequisites: ['g5s2-u6-t2'] },
            { id: 'g5s2-u6-t4', name: '扇形和环形面积', objectives: ['会求扇形和环形的面积'], keyPoints: ['环形=大圆-小圆'], commonMistakes: ['内外径混淆'], difficulty: 5, prerequisites: ['g5s2-u6-t3'] },
          ],
        },
        {
          id: 'g5s2-u7', order: 7, name: '解决问题的策略',
          overview: '用转化的策略解决问题。',
          topics: [
            { id: 'g5s2-u7-t1', name: '转化策略', objectives: ['能用转化的方法解决稍复杂问题'], keyPoints: ['化复杂为简单，化未知为已知'], commonMistakes: ['不会转化'], difficulty: 5, prerequisites: ['g5s1-u7-t1'] },
          ],
        },
      ],
    },

    // ============ 六年级上册 ============
    {
      grade: 6,
      semester: '上',
      units: [
        {
          id: 'g6s1-u1', order: 1, name: '长方体和正方体',
          overview: '认识长方体和正方体的特征，掌握表面积和体积的计算。',
          topics: [
            { id: 'g6s1-u1-t1', name: '长方体和正方体的认识', objectives: ['认识面、棱、顶点的特征', '知道相对面相等'], keyPoints: ['长方体 6 面 12 棱 8 顶点'], commonMistakes: ['棱数数错'], difficulty: 4, prerequisites: ['g1s1-u6-t1'] },
            { id: 'g6s1-u1-t2', name: '展开图', objectives: ['认识长方体和正方体的展开图'], keyPoints: ['六个面对应'], commonMistakes: ['折回去对不上'], difficulty: 5, prerequisites: ['g6s1-u1-t1'] },
            { id: 'g6s1-u1-t3', name: '表面积', objectives: ['会计算表面积', '能解决实际问题（无盖等）'], keyPoints: ['六个面面积之和'], commonMistakes: ['漏面或多面'], difficulty: 5, prerequisites: ['g6s1-u1-t2'] },
            { id: 'g6s1-u1-t4', name: '体积单位', objectives: ['认识立方厘米、立方分米、立方米', '认识升和毫升的关系'], keyPoints: ['1 立方分米=1 升'], commonMistakes: ['进率搞错'], difficulty: 4, prerequisites: ['g4s1-u1-t2'] },
            { id: 'g6s1-u1-t5', name: '体积计算', objectives: ['掌握体积公式', 'V=长×宽×高=底面积×高'], keyPoints: ['底面积×高的通用性'], commonMistakes: ['底面积算错'], difficulty: 5, prerequisites: ['g6s1-u1-t4'] },
            { id: 'g6s1-u1-t6', name: '体积单位换算', objectives: ['会进行体积单位换算'], keyPoints: ['进率是 1000'], commonMistakes: ['当成 100'], difficulty: 5, prerequisites: ['g6s1-u1-t5'] },
          ],
        },
        {
          id: 'g6s1-u2', order: 2, name: '分数乘法',
          overview: '掌握分数乘法的计算和应用。',
          topics: [
            { id: 'g6s1-u2-t1', name: '分数乘整数', objectives: ['会算分数乘整数'], keyPoints: ['分子乘整数，分母不变'], commonMistakes: ['分母也乘'], difficulty: 4, prerequisites: ['g5s2-u4-t6'] },
            { id: 'g6s1-u2-t2', name: '分数乘分数', objectives: ['会算分数乘分数'], keyPoints: ['分子乘分子，分母乘分母'], commonMistakes: ['没约分'], difficulty: 5, prerequisites: ['g6s1-u2-t1'] },
            { id: 'g6s1-u2-t3', name: '分数乘法的应用', objectives: ['能解决"求一个数的几分之几是多少"'], keyPoints: ['用单位"1"乘几分之几'], commonMistakes: ['单位"1"找错'], difficulty: 5, prerequisites: ['g6s1-u2-t2'] },
          ],
        },
        {
          id: 'g6s1-u3', order: 3, name: '分数除法',
          overview: '掌握分数除法的计算和应用。',
          topics: [
            { id: 'g6s1-u3-t1', name: '倒数', objectives: ['理解倒数', '会求倒数'], keyPoints: ['乘积是 1 的两个数互为倒数'], commonMistakes: ['0 的倒数'], difficulty: 4, prerequisites: ['g6s1-u2-t2'] },
            { id: 'g6s1-u3-t2', name: '分数除以整数', objectives: ['会算分数除以整数'], keyPoints: ['等于乘以这个整数的倒数'], commonMistakes: ['只把除号变乘号'], difficulty: 5, prerequisites: ['g6s1-u3-t1'] },
            { id: 'g6s1-u3-t3', name: '一个数除以分数', objectives: ['会算一个数除以分数'], keyPoints: ['等于乘以这个分数的倒数'], commonMistakes: ['倒数搞错'], difficulty: 5, prerequisites: ['g6s1-u3-t2'] },
            { id: 'g6s1-u3-t4', name: '分数除法的应用', objectives: ['能解决"已知一个数的几分之几是多少求这个数"'], keyPoints: ['列方程或除法'], commonMistakes: ['当作乘法'], difficulty: 5, prerequisites: ['g6s1-u3-t3'] },
          ],
        },
        {
          id: 'g6s1-u4', order: 4, name: '解决问题的策略',
          overview: '用假设的策略解决问题。',
          topics: [
            { id: 'g6s1-u4-t1', name: '假设策略', objectives: ['会用假设法解决鸡兔同笼等问题'], keyPoints: ['假设全是其中一种'], commonMistakes: ['假设后差量算错'], difficulty: 5, prerequisites: ['g5s2-u7-t1'] },
          ],
        },
        {
          id: 'g6s1-u5', order: 5, name: '比',
          overview: '认识比，掌握比的基本性质和应用。',
          topics: [
            { id: 'g6s1-u5-t1', name: '比的意义', objectives: ['理解比的含义', '认识比号、前项、后项'], keyPoints: ['两数相除可以写成比的形式'], commonMistakes: ['后项不能为 0'], difficulty: 4, prerequisites: ['g6s1-u3-t4'] },
            { id: 'g6s1-u5-t2', name: '比的基本性质和化简', objectives: ['理解比的基本性质', '会化简比'], keyPoints: ['前后项同乘除一个非 0 数'], commonMistakes: ['只化简一项'], difficulty: 5, prerequisites: ['g6s1-u5-t1'] },
            { id: 'g6s1-u5-t3', name: '按比分配', objectives: ['会用按比分配解决问题'], keyPoints: ['总份数 → 每份 → 各部分'], commonMistakes: ['总份数算错'], difficulty: 5, prerequisites: ['g6s1-u5-t2'] },
          ],
        },
        {
          id: 'g6s1-u6', order: 6, name: '百分数',
          overview: '认识百分数，掌握百分数与分数小数的互化和应用。',
          topics: [
            { id: 'g6s1-u6-t1', name: '百分数的意义', objectives: ['理解百分数的含义', '会读写'], keyPoints: ['百分数表示一个数是另一个数的百分之几'], commonMistakes: ['百分数和分数等同看'], difficulty: 4, prerequisites: ['g5s2-u4-t6'] },
            { id: 'g6s1-u6-t2', name: '百分数与分数小数互化', objectives: ['会三种数的互化'], keyPoints: ['小数点移动两位'], commonMistakes: ['移动方向错'], difficulty: 4, prerequisites: ['g6s1-u6-t1'] },
            { id: 'g6s1-u6-t3', name: '百分数的实际应用', objectives: ['能解决求百分率的问题'], keyPoints: ['出勤率、合格率等公式'], commonMistakes: ['公式套错'], difficulty: 5, prerequisites: ['g6s1-u6-t2'] },
            { id: 'g6s1-u6-t4', name: '纳税、利息和折扣', objectives: ['能解决简单的纳税、利息、折扣问题'], keyPoints: ['利息=本金×利率×时间'], commonMistakes: ['公式漏项'], difficulty: 5, prerequisites: ['g6s1-u6-t3'] },
          ],
        },
      ],
    },

    // ============ 六年级下册 ============
    {
      grade: 6,
      semester: '下',
      units: [
        {
          id: 'g6s2-u1', order: 1, name: '扇形统计图',
          overview: '认识扇形统计图，了解其特点和用途。',
          topics: [
            { id: 'g6s2-u1-t1', name: '扇形统计图', objectives: ['会读扇形统计图', '了解部分与整体的关系'], keyPoints: ['整个圆代表总数'], commonMistakes: ['百分数加起来不是 100%'], difficulty: 4, prerequisites: ['g6s1-u6-t1'] },
          ],
        },
        {
          id: 'g6s2-u2', order: 2, name: '圆柱和圆锥',
          overview: '认识圆柱和圆锥的特征，掌握表面积和体积的计算。',
          topics: [
            { id: 'g6s2-u2-t1', name: '圆柱的认识', objectives: ['认识圆柱的特征', '认识底面、侧面、高'], keyPoints: ['圆柱有两个相同的圆形底面'], commonMistakes: ['高的位置找不对'], difficulty: 4, prerequisites: ['g6s1-u1-t1'] },
            { id: 'g6s2-u2-t2', name: '圆柱的表面积', objectives: ['推导并掌握圆柱的表面积公式'], keyPoints: ['侧面展开是长方形：底面周长×高'], commonMistakes: ['漏算底面'], difficulty: 5, prerequisites: ['g6s2-u2-t1'] },
            { id: 'g6s2-u2-t3', name: '圆柱的体积', objectives: ['掌握 V=πr²h'], keyPoints: ['底面积×高'], commonMistakes: ['用直径'], difficulty: 5, prerequisites: ['g6s2-u2-t2'] },
            { id: 'g6s2-u2-t4', name: '圆锥的认识和体积', objectives: ['认识圆锥', '掌握 V=1/3×底面积×高'], keyPoints: ['等底等高时圆锥体积是圆柱的 1/3'], commonMistakes: ['漏除以 3'], difficulty: 5, prerequisites: ['g6s2-u2-t3'] },
          ],
        },
        {
          id: 'g6s2-u3', order: 3, name: '解决问题的策略',
          overview: '用综合多种策略解决稍复杂问题。',
          topics: [
            { id: 'g6s2-u3-t1', name: '综合应用策略', objectives: ['能综合运用画图、列表、转化等策略'], keyPoints: ['灵活选择策略'], commonMistakes: ['策略单一'], difficulty: 5, prerequisites: ['g6s1-u4-t1'] },
          ],
        },
        {
          id: 'g6s2-u4', order: 4, name: '比例',
          overview: '认识比例，掌握比例的性质和应用。',
          topics: [
            { id: 'g6s2-u4-t1', name: '比例的意义和性质', objectives: ['理解比例的含义', '掌握内项之积等于外项之积'], keyPoints: ['两个比相等组成比例'], commonMistakes: ['内外项搞错'], difficulty: 5, prerequisites: ['g6s1-u5-t3'] },
            { id: 'g6s2-u4-t2', name: '解比例', objectives: ['会解比例'], keyPoints: ['利用基本性质转化为方程'], commonMistakes: ['交叉相乘错'], difficulty: 5, prerequisites: ['g6s2-u4-t1'] },
            { id: 'g6s2-u4-t3', name: '比例尺', objectives: ['理解比例尺', '会进行实际距离和图上距离换算'], keyPoints: ['图上距离:实际距离=比例尺'], commonMistakes: ['单位不统一'], difficulty: 5, prerequisites: ['g6s2-u4-t2'] },
          ],
        },
        {
          id: 'g6s2-u5', order: 5, name: '确定位置',
          overview: '用方向和距离确定平面上点的位置。',
          topics: [
            { id: 'g6s2-u5-t1', name: '方向和距离', objectives: ['会用方向加距离描述位置'], keyPoints: ['北偏东 X 度，距离 Y'], commonMistakes: ['方向描述顺序错'], difficulty: 5, prerequisites: ['g4s2-u8-t1'] },
          ],
        },
        {
          id: 'g6s2-u6', order: 6, name: '正比例和反比例',
          overview: '认识正比例和反比例。',
          topics: [
            { id: 'g6s2-u6-t1', name: '正比例的意义', objectives: ['理解正比例的含义', '能判断成正比例'], keyPoints: ['y/x = k（k 一定）'], commonMistakes: ['只看变化方向'], difficulty: 5, prerequisites: ['g6s2-u4-t3'] },
            { id: 'g6s2-u6-t2', name: '正比例图象', objectives: ['认识正比例图象是直线'], keyPoints: ['过原点的直线'], commonMistakes: ['图象画曲'], difficulty: 5, prerequisites: ['g6s2-u6-t1'] },
            { id: 'g6s2-u6-t3', name: '反比例的意义', objectives: ['理解反比例的含义', '能判断成反比例'], keyPoints: ['xy = k（k 一定）'], commonMistakes: ['和正比例混淆'], difficulty: 5, prerequisites: ['g6s2-u6-t2'] },
          ],
        },
        {
          id: 'g6s2-u7', order: 7, name: '总复习',
          overview: '小学阶段数学知识的整理与复习。',
          topics: [
            { id: 'g6s2-u7-t1', name: '数与代数', objectives: ['整理整数、小数、分数、百分数', '整理方程和比例'], keyPoints: ['知识网络化'], commonMistakes: ['零散记忆'], difficulty: 5, prerequisites: [] },
            { id: 'g6s2-u7-t2', name: '图形与几何', objectives: ['整理平面图形和立体图形', '面积体积公式'], keyPoints: ['公式之间的联系'], commonMistakes: ['公式混用'], difficulty: 5, prerequisites: [] },
            { id: 'g6s2-u7-t3', name: '统计与概率', objectives: ['整理统计图表', '理解可能性'], keyPoints: ['图表选择'], commonMistakes: ['图表用错场景'], difficulty: 4, prerequisites: [] },
            { id: 'g6s2-u7-t4', name: '解决问题的策略', objectives: ['整理小学阶段的解题策略'], keyPoints: ['画图、列表、列举、转化、假设'], commonMistakes: ['策略生搬硬套'], difficulty: 5, prerequisites: [] },
          ],
        },
      ],
    },
  ],
}

export default mathCurriculum
