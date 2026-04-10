// 英语语法知识点数据库——完整语法书版
// 覆盖初中 / KET / PET / FCE 核心语法考点，共10章 60+ 语法点

export const GRAMMAR_BOOK = [
  // ──────────────────────────────────────────────
  // 第一章  词类
  // ──────────────────────────────────────────────
  {
    id: 'parts_of_speech',
    chapter: '第一章',
    title: '词类',
    icon: '📝',
    points: [
      {
        id: 'nouns',
        title: '名词',
        level: 'KET',
        summary: '名词分可数与不可数，可数名词有单复数变化。',
        explain: '名词是表示人、地点、事物或概念的词，是句子最重要的词类之一。可数名词（如 book）可以有单复数变化；不可数名词（如 water、music）没有复数形式，不能直接加数字。学会判断名词是否可数，就能避免大多数名词错误。',
        structure: [
          { label: '规则复数', formula: 'noun + -s / -es / -ies', example: 'book → books, box → boxes, city → cities.' },
          { label: '不可数名词', formula: 'no plural form; use "some / much / a little"', example: 'There is some water in the glass.' },
          { label: '所有格', formula: 'singular noun + \'s  /  plural noun + \'', example: 'the boy\'s bag; the students\' books.' },
        ],
        tips: '以 f/fe 结尾变复数：去 f/fe 加 -ves（leaf→leaves, knife→knives）。man→men, woman→women, child→children 等为不规则复数。',
        traps: [
          { wrong: 'I need some informations.', right: 'I need some information.', explain: 'information 是不可数名词，没有复数形式' },
          { wrong: 'There are two sheeps in the field.', right: 'There are two sheep in the field.', explain: 'sheep 单复数同形，不加 -s' },
          { wrong: 'The childrens are playing.', right: 'The children are playing.', explain: 'child 的复数是 children，不是 childrens' },
        ],
      },
      {
        id: 'pronouns',
        title: '代词',
        level: 'KET',
        summary: '代词替代名词，分人称、物主、反身、指示、疑问等。',
        explain: '代词用来代替前面出现过的名词，让句子不显得重复。主格代词（I/he/she/we/they）用作主语，宾格代词（me/him/her/us/them）用在动词或介词后面。记住：作主语用 I，作宾语用 me，千万不要混用。',
        structure: [
          { label: '人称代词', formula: 'I / you / he / she / it / we / they (主格)  →  me / you / him / her / it / us / them (宾格)', example: 'She gave him a book.' },
          { label: '物主代词', formula: 'my/your/his/her/its/our/their + noun  OR  mine/yours/his/hers/ours/theirs (独立)', example: 'This is my pen. That one is mine.' },
          { label: '反身代词', formula: 'myself / yourself / himself / herself / itself / ourselves / themselves', example: 'He hurt himself while cooking.' },
        ],
        tips: '反身代词强调用法：I myself did it.（我亲自做的）；用作宾语时表示动作回到主语：She looked at herself in the mirror.',
        traps: [
          { wrong: 'Me and Tom went to the park.', right: 'Tom and I went to the park.', explain: '作主语用主格 I，且礼貌上将自己放在后面' },
          { wrong: 'Give the letter to Mary or I.', right: 'Give the letter to Mary or me.', explain: '介词后用宾格 me，不用主格 I' },
          { wrong: 'The dog washed hisself.', right: 'The dog washed itself.', explain: '动物（非人）反身代词用 itself，没有 hisself 这个词' },
        ],
      },
      {
        id: 'adjectives',
        title: '形容词',
        level: 'KET',
        summary: '形容词修饰名词，置于名词前或连系动词后，有比较级和最高级。',
        explain: '形容词用来描述名词的特征，比如颜色、大小、形状、感觉等。它可以放在名词前做定语（a big dog），也可以放在连系动词后做表语（The dog is big）。比较时用比较级（bigger）和最高级（biggest）。',
        structure: [
          { label: '定语用法', formula: 'adj + noun', example: 'a beautiful garden.' },
          { label: '表语用法', formula: 'S + linking verb + adj', example: 'The soup smells delicious.' },
          { label: '比较级 / 最高级', formula: 'adj-er + than  /  the + adj-est; more + adj + than  /  the most + adj', example: 'She is taller than her sister. He is the most talented student.' },
        ],
        tips: '单音节和部分双音节形容词直接加 -er/-est；多音节用 more/most。good→better→best, bad→worse→worst, many/much→more→most, little→less→least 为不规则变化。',
        traps: [
          { wrong: 'She is more tall than him.', right: 'She is taller than him.', explain: '单音节形容词用 -er 形式，不用 more' },
          { wrong: 'He is the most best player.', right: 'He is the best player.', explain: 'best 已经是最高级，不需要再加 most' },
          { wrong: 'It was a very interested talk.', right: 'It was a very interesting talk.', explain: '修饰事物用 -ing 形容词（interesting），-ed 形容词修饰人（I was interested）' },
        ],
      },
      {
        id: 'adverbs',
        title: '副词',
        level: 'KET',
        summary: '副词修饰动词、形容词或其他副词，常由形容词加 -ly 构成。',
        explain: '副词用来修饰动词、形容词或整个句子，告诉我们"如何做""在哪里"或"何时做"等信息。很多副词由形容词加 -ly 构成（slow → slowly），但要注意 fast、hard 这些本身既是形容词又是副词的词。特别注意：hard（努力）与 hardly（几乎不）含义完全不同！',
        structure: [
          { label: '修饰动词', formula: 'V + adv  /  adv + V', example: 'She speaks slowly. He carefully opened the box.' },
          { label: '修饰形容词', formula: 'adv + adj', example: 'The movie was extremely boring.' },
          { label: '频率副词', formula: 'S + frequency adv + V  (be 动词之后)', example: 'She always arrives on time. He is never late.' },
        ],
        tips: '部分副词与形容词同形：fast, hard, early, late, high, low, near, far。注意 hard（努力）≠ hardly（几乎不），late（晚）≠ lately（最近）。',
        traps: [
          { wrong: 'She sings beautiful.', right: 'She sings beautifully.', explain: '修饰动词 sings 要用副词 beautifully，不用形容词' },
          { wrong: 'He works very hardly.', right: 'He works very hard.', explain: 'hard 本身是副词，hardly 表示"几乎不"，含义不同' },
          { wrong: 'I always am late.', right: 'I am always late.', explain: '频率副词放在 be 动词之后，不放之前' },
        ],
      },
      {
        id: 'prepositions',
        title: '介词',
        level: 'KET',
        summary: '介词表示时间、地点、方向等关系，后接名词或代词宾格。',
        explain: '介词是一个小词，跟在它后面的名词或代词构成"介词短语"，表示时间、地点或关系。很多动词和形容词有固定的介词搭配，必须死记（good at、listen to、arrive at/in）。介词后面要用代词的宾格（give it to me，不是 to I）。',
        structure: [
          { label: '时间介词', formula: 'at + 时刻/节日; on + 日期/星期; in + 月/年/季节', example: 'at 8 o\'clock; on Monday; in July; in 2024.' },
          { label: '地点介词', formula: 'at + 具体地点; in + 封闭空间; on + 平面', example: 'at the bus stop; in the room; on the table.' },
          { label: '短语介词', formula: 'in front of / next to / because of / instead of ...', example: 'The café is in front of the library.' },
        ],
        tips: '固定搭配须死记：interested in, good at, afraid of, listen to, arrive at/in, depend on, agree with, look forward to（to 是介词，后接名词/动名词）。',
        traps: [
          { wrong: 'I was born on 1990.', right: 'I was born in 1990.', explain: '年份前用 in，日期前用 on，具体时刻用 at' },
          { wrong: 'She is good in math.', right: 'She is good at math.', explain: '固定搭配 be good at，不用 in' },
          { wrong: 'I look forward to see you.', right: 'I look forward to seeing you.', explain: 'look forward to 中的 to 是介词，后面用动名词 -ing' },
        ],
      },
      {
        id: 'conjunctions',
        title: '连词',
        level: 'KET',
        summary: '连词连接词、短语或句子，分并列连词和从属连词。',
        explain: '连词就像"纽带"，把词、短语或句子连接在一起。并列连词（and/but/or/so）连接对等的成分；从属连词（because/when/if）引导从句。特别提醒：because 和 so 不能同时出现在同一个句子里；although 和 but 也不能同时出现——各选其一就够了。',
        structure: [
          { label: '并列连词', formula: 'clause + and / but / or / so / yet + clause', example: 'I was tired, but I kept working.' },
          { label: '从属连词（时间/条件）', formula: 'when / if / although / because / while + clause', example: 'Although it was raining, we went out.' },
          { label: '关联连词', formula: 'both...and; either...or; neither...nor; not only...but also', example: 'She can speak both French and Spanish.' },
        ],
        tips: 'so 和 because 不能同时用：正确用"Because it rained, we stayed home." 或 "It rained, so we stayed home."，不能说 "Because it rained, so we stayed home."',
        traps: [
          { wrong: 'Because it was cold, so I wore a coat.', right: 'Because it was cold, I wore a coat.', explain: 'because 和 so 不能同时出现在同一句话里' },
          { wrong: 'Although she tried hard, but she failed.', right: 'Although she tried hard, she failed.', explain: 'although 和 but 不能同时使用' },
          { wrong: 'Neither Tom or Jerry came.', right: 'Neither Tom nor Jerry came.', explain: 'neither...nor 是固定搭配，不用 or' },
        ],
      },
      {
        id: 'articles',
        title: '冠词',
        level: 'KET',
        summary: '冠词分不定冠词 a/an 和定冠词 the，各有特定用法。',
        explain: '冠词就在名词前面，告诉听者"是哪一个"。a/an 是不定冠词（表示某一个，首次提到）；the 是定冠词（特指某个已知的事物）。判断用 a 还是 an：看后面单词的发音——元音音素开头用 an（an apple, an hour，hour 的 h 不发音）。',
        structure: [
          { label: '不定冠词', formula: 'a + 辅音开头单词; an + 元音开头单词', example: 'a cat, an apple, an hour.' },
          { label: '定冠词', formula: 'the + 特指/独一无二/上文提到的名词', example: 'The sun rises in the east. Pass me the book on the table.' },
          { label: '零冠词', formula: 'no article before: languages, sports, meals, most proper nouns', example: 'I like Chinese. She plays tennis. We have lunch at noon.' },
        ],
        tips: '注意发音而非字母：an hour（h 不发音）, a university（发/juː/，辅音开头）。the 用于: 乐器（play the piano）、方位（in the north）、河流山脉（the Nile）。',
        traps: [
          { wrong: 'She plays a piano.', right: 'She plays the piano.', explain: '表示演奏乐器用 the，不用不定冠词' },
          { wrong: 'He is a honest man.', right: 'He is an honest man.', explain: 'honest 发 /ɒnɪst/，元音音素开头，正确用 an' },
          { wrong: 'I go to the school by bus.', right: 'I go to school by bus.', explain: '作为功能性建筑（上学），school 前不加冠词；有 the 则表示具体某所学校' },
        ],
      },
      {
        id: 'numerals',
        title: '数词',
        level: 'KET',
        summary: '数词分基数词（one, two…）和序数词（first, second…），用法各异。',
        explain: '数词分两种：基数词表示数量（one, two, three…），序数词表示顺序（first, second, third…），序数词常配合 the 使用（the first day）。两位数之间要用连字符（twenty-one）；hundred/thousand 前有数字时不加 -s（three hundred，不是 three hundreds）。',
        structure: [
          { label: '基数词', formula: 'one / two / three ... twenty-one / a hundred / a thousand', example: 'There are thirty students in our class.' },
          { label: '序数词', formula: 'first / second / third / fourth ... (定冠词 the + 序数词)', example: 'Today is the first day of spring.' },
          { label: '分数 / 百分比', formula: '分子（基数词）+ 分母（序数词）; X percent', example: 'Two thirds of the students passed. About 80 percent agreed.' },
        ],
        tips: '21~99 的两位数须用连字符：twenty-one, forty-five。hundred/thousand/million 与基数词连用时不加 -s：two hundred（不是 two hundreds）。',
        traps: [
          { wrong: 'I live on the three floor.', right: 'I live on the third floor.', explain: '楼层用序数词，three 是基数词，应改为 third' },
          { wrong: 'There are five hundreds people.', right: 'There are five hundred people.', explain: 'hundred 前有数词时，hundred 不加 -s' },
          { wrong: 'She is in her thirty.', right: 'She is in her thirties.', explain: '表示某个年龄段（三十多岁）用复数 thirties' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 第二章  动词时态
  // ──────────────────────────────────────────────
  {
    id: 'tenses',
    chapter: '第二章',
    title: '动词时态',
    icon: '⏰',
    points: [
      {
        id: 'simple_present',
        title: '一般现在时',
        level: 'KET',
        summary: '表示习惯性动作、客观事实或现在的状态。',
        explain: '一般现在时用来表达经常发生的事、习惯和客观事实。当主语是 he/she/it 等第三人称单数时，谓语动词要加 -s 或 -es，这是初学者最容易犯的错误。常见标志词：every day、always、usually、often、sometimes、never。',
        structure: [
          { label: '肯定句', formula: 'S + V (三单加 -s/-es)', example: 'She reads books every day.' },
          { label: '否定句', formula: 'S + do/does not + V', example: 'He doesn\'t like coffee.' },
          { label: '疑问句', formula: 'Do/Does + S + V?', example: 'Do you play football?' },
        ],
        signals: ['every day', 'always', 'usually', 'often', 'sometimes', 'never', 'on Mondays'],
        tips: '第三人称单数（he/she/it）谓语动词加 -s 或 -es。动词 be 用 is/am/are。',
        traps: [
          { wrong: 'She don\'t like it.', right: 'She doesn\'t like it.', explain: '第三人称单数用 doesn\'t，不用 don\'t' },
          { wrong: 'He go to school every day.', right: 'He goes to school every day.', explain: '第三人称单数动词要加 -s/-es' },
          { wrong: 'Water freeze at 0°C.', right: 'Water freezes at 0°C.', explain: '客观事实也需要遵守三单加 -s 规则' },
        ],
      },
      {
        id: 'present_continuous',
        title: '现在进行时',
        level: 'KET',
        summary: '表示现在正在进行的动作，或按计划即将发生的事。',
        explain: '现在进行时表示"此时此刻正在做"的动作。结构是 am/is/are + 动词-ing。注意：know、like、love、hate、want、need 等表示状态或心理的动词，不能用进行时——你不会说"我正在喜欢你"。常见标志词：now、at the moment、look！listen！',
        structure: [
          { label: '肯定句', formula: 'S + am/is/are + V-ing', example: 'I am reading a book now.' },
          { label: '否定句', formula: 'S + am/is/are + not + V-ing', example: 'She isn\'t watching TV.' },
          { label: '疑问句', formula: 'Am/Is/Are + S + V-ing?', example: 'Are you listening?' },
        ],
        signals: ['now', 'at the moment', 'look!', 'listen!', 'at present'],
        tips: '状态动词不用进行时：know, like, love, hate, want, need, understand, believe, belong。-ing 变化：末尾 e 去掉（make→making）；重读闭音节双写（run→running）。',
        traps: [
          { wrong: 'I am knowing the answer.', right: 'I know the answer.', explain: 'know 是状态动词，不用进行时' },
          { wrong: 'She is come now.', right: 'She is coming now.', explain: '进行时助动词后接 V-ing，不用动词原形' },
          { wrong: 'They are haveing lunch.', right: 'They are having lunch.', explain: 'have 加 -ing 时，去掉 e 再加 -ing，拼写为 having' },
        ],
      },
      {
        id: 'simple_past',
        title: '一般过去时',
        level: 'KET',
        summary: '表示过去某时发生的动作或存在的状态。',
        explain: '一般过去时表示过去已经发生、完成的动作或状态。规则动词加 -ed（walk→walked），但有许多不规则动词需要单独记忆（go→went, eat→ate, buy→bought）。句子里有 yesterday、last week、ago、just now 等词时，通常就用一般过去时。',
        structure: [
          { label: '规则动词', formula: 'S + V-ed', example: 'I visited Beijing last year.' },
          { label: '不规则动词', formula: 'S + irregular past form', example: 'She went to the market yesterday.' },
          { label: '否定/疑问', formula: 'S + did not + V  /  Did + S + V?', example: 'Did you see that movie? No, I didn\'t.' },
        ],
        signals: ['yesterday', 'last week/month/year', 'ago', 'in 2020', 'just now'],
        tips: '规则动词加 -ed：以 e 结尾只加 -d（loved）；辅音+y 变 -ied（studied）；重读闭音节双写（stopped）。高频不规则动词必须记忆。',
        traps: [
          { wrong: 'I did went there.', right: 'I went there.', explain: '助动词 did 后接动词原形，不接过去式' },
          { wrong: 'She didn\'t came.', right: 'She didn\'t come.', explain: 'didn\'t 后用动词原形，不用过去式' },
          { wrong: 'He buyed a new phone.', right: 'He bought a new phone.', explain: 'buy 是不规则动词，过去式是 bought' },
        ],
      },
      {
        id: 'past_continuous',
        title: '过去进行时',
        level: 'PET',
        summary: '表示过去某时刻正在进行的动作，常与 when/while 连用。',
        explain: '过去进行时就像给过去某一刻拍了张"快照"——那时候正在做某件事。结构是 was/were + 动词-ing。when 引导另一个动作"插进来"（The phone rang when I was eating）；while 引导两件事"同时进行"（While she was cooking, I was watching TV）。',
        structure: [
          { label: '肯定句', formula: 'S + was/were + V-ing', example: 'She was cooking when I arrived.' },
          { label: 'when/while 从句', formula: 'past continuous + when + simple past  /  while + past continuous', example: 'While I was reading, the phone rang.' },
        ],
        signals: ['at 7 o\'clock yesterday', 'when', 'while', 'at that moment'],
        tips: 'when 常与一般过去时搭配（较短动作），while 常与过去进行时搭配（较长背景动作）。',
        traps: [
          { wrong: 'I was watch TV at 9 pm.', right: 'I was watching TV at 9 pm.', explain: '过去进行时需用 was/were + V-ing，不用动词原形' },
          { wrong: 'While he read, I cooked.', right: 'While he was reading, I cooked.', explain: 'while 引导的背景动作用进行时' },
          { wrong: 'She were sleeping when I called.', right: 'She was sleeping when I called.', explain: '第三人称单数用 was，不用 were' },
        ],
      },
      {
        id: 'simple_future',
        title: '一般将来时',
        level: 'KET',
        summary: '表示将来要发生的动作，can use will 或 be going to。',
        explain: '一般将来时表示将来要发生的事。will + 动词原形用于临时决定或预测；be going to + 动词原形用于事先计划好的事。有一个特别重要的规则：在 if、when、before、after 等引导的从句里，要用现在时代替将来时——不能说 "If it will rain"，要说 "If it rains"。',
        structure: [
          { label: 'will + V', formula: 'S + will + V (临时决定/预测)', example: 'I\'ll help you with that.' },
          { label: 'be going to + V', formula: 'S + am/is/are + going to + V (计划/迹象)', example: 'She is going to visit Paris next month.' },
          { label: 'be about to + V', formula: 'S + am/is/are + about to + V (即将)', example: 'The train is about to leave.' },
        ],
        signals: ['tomorrow', 'next week', 'soon', 'in the future', 'tonight'],
        tips: 'will 用于临时决定和对未来的预测；be going to 用于预先计划好的事情或根据迹象的预测（Look at those clouds—it\'s going to rain）。',
        traps: [
          { wrong: 'I will to go shopping.', right: 'I will go shopping.', explain: 'will 后直接接动词原形，不加 to' },
          { wrong: 'She is going to visited her friend.', right: 'She is going to visit her friend.', explain: 'be going to 后接动词原形，不接过去式' },
          { wrong: 'If it will rain, I\'ll stay home.', right: 'If it rains, I\'ll stay home.', explain: '条件状语从句用一般现在时表示将来，不用 will' },
        ],
      },
      {
        id: 'present_perfect',
        title: '现在完成时',
        level: 'PET',
        summary: '表示过去发生的动作对现在产生的影响，或从过去持续到现在的状态。',
        explain: '现在完成时把"过去"和"现在"连接起来，表示过去发生的事情对现在有影响。结构是 have/has + 过去分词。和一般过去时的区别：完成时不说具体的过去时间（不能说"I have seen him yesterday"），如果要说具体时间，就改用一般过去时（I saw him yesterday）。',
        structure: [
          { label: '肯定句', formula: 'S + have/has + V-ed (past participle)', example: 'I have visited Japan twice.' },
          { label: '否定句', formula: 'S + have/has + not + V-ed', example: 'She hasn\'t finished her homework yet.' },
          { label: '疑问句', formula: 'Have/Has + S + V-ed?', example: 'Have you ever tried sushi?' },
        ],
        signals: ['already', 'yet', 'ever', 'never', 'just', 'since', 'for', 'recently', 'so far'],
        tips: '区分 since 和 for：since + 时间点（since 2020）；for + 时间段（for three years）。与一般过去时区别：完成时不说具体过去时间，过去时说具体时间。',
        traps: [
          { wrong: 'I have seen that movie yesterday.', right: 'I saw that movie yesterday.', explain: '有具体过去时间（yesterday）用一般过去时，不用完成时' },
          { wrong: 'She has went to London.', right: 'She has gone to London.', explain: 'go 的过去分词是 gone，不是 went（went 是过去式）' },
          { wrong: 'He has lived here since three years.', right: 'He has lived here for three years.', explain: '接时间段用 for，接时间点用 since' },
        ],
      },
      {
        id: 'past_perfect',
        title: '过去完成时',
        level: 'PET',
        summary: '表示过去某时间之前已完成的动作（过去的过去）。',
        explain: '过去完成时表示"过去的过去"——两件过去的事情，用过去完成时说清楚哪件发生得更早。结构是 had + 过去分词。常与 by the time/before/when 搭配，构成"先（had done）……后（did）……"的逻辑。',
        structure: [
          { label: '肯定句', formula: 'S + had + V-ed', example: 'She had already left when I arrived.' },
          { label: '常见搭配', formula: 'by the time / before / when / after + simple past', example: 'By the time he called, I had already eaten.' },
        ],
        signals: ['by the time', 'before', 'already', 'after', 'when (过去的过去)'],
        tips: '过去完成时表示发生在过去某时刻之前的动作，与一般过去时形成"先（had done）后（did）"关系。',
        traps: [
          { wrong: 'When I arrived, she already left.', right: 'When I arrived, she had already left.', explain: '在"我到达"之前她已经离开，需要用过去完成时表示更早的动作' },
          { wrong: 'He had went to sleep before 10.', right: 'He had gone to sleep before 10.', explain: 'had 后接过去分词 gone，不接过去式 went' },
          { wrong: 'I had saw this film before.', right: 'I had seen this film before.', explain: 'see 的过去分词是 seen，不是 saw' },
        ],
      },
      {
        id: 'future_perfect',
        title: '将来完成时',
        level: 'FCE',
        summary: '表示到将来某时间点为止将已完成的动作。',
        explain: '将来完成时表示"到将来某个时间点，某件事将已经完成了"。结构是 will have + 过去分词，常与 by + 将来时间搭配（By next Monday, I will have finished the project）。这个时态使用频率较低，但理解它的逻辑对提高语感很有帮助。',
        structure: [
          { label: '肯定句', formula: 'S + will have + V-ed', example: 'By next June, I will have graduated.' },
          { label: '常见搭配', formula: 'by + future time point', example: 'She will have finished the report by Monday.' },
        ],
        signals: ['by tomorrow', 'by next year', 'by the time', 'by then'],
        tips: '常与 by + 将来时间 搭配，表示"到……时候将已经……"。',
        traps: [
          { wrong: 'By Friday, I will finish the project.', right: 'By Friday, I will have finished the project.', explain: '强调到某将来时间点前已完成的结果，需用将来完成时' },
          { wrong: 'She will have went home by then.', right: 'She will have gone home by then.', explain: 'will have 后接过去分词 gone，不接过去式' },
          { wrong: 'By the time you arrive, I leave.', right: 'By the time you arrive, I will have left.', explain: '主句动作在从句之前完成，主句用将来完成时' },
        ],
      },
      {
        id: 'present_perfect_continuous',
        title: '现在完成进行时',
        level: 'FCE',
        summary: '强调从过去持续到现在的动作过程，且动作可能还在继续。',
        explain: '现在完成进行时强调从过去某时开始的动作一直持续到现在，而且动作还可能在继续。结构是 have/has been + 动词-ing。与现在完成时的区别：I\'ve been reading this book（还没读完，在持续）vs I\'ve read this book（已经读完了）。',
        structure: [
          { label: '肯定句', formula: 'S + have/has + been + V-ing', example: 'I have been studying for three hours.' },
          { label: '与完成时比较', formula: 'have/has been V-ing (强调持续过程) vs have/has V-ed (强调结果)', example: 'I\'ve been reading this book. vs I\'ve read this book.' },
        ],
        signals: ['for', 'since', 'all day', 'all morning', 'lately', 'recently'],
        tips: '完成进行时强调动作持续的过程；完成时强调动作的结果或完成。I\'ve been painting the wall.（还没完）vs I\'ve painted the wall.（完成了）。',
        traps: [
          { wrong: 'She has been know him for years.', right: 'She has known him for years.', explain: 'know 是状态动词，不用进行时，用现在完成时即可' },
          { wrong: 'I have been study all day.', right: 'I have been studying all day.', explain: '现在完成进行时结构是 have/has been + V-ing' },
          { wrong: 'How long have you been waited?', right: 'How long have you been waiting?', explain: 'been 后接 V-ing（现在分词），不接过去式' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 第三章  语态
  // ──────────────────────────────────────────────
  {
    id: 'voice',
    chapter: '第三章',
    title: '语态',
    icon: '🔄',
    points: [
      {
        id: 'passive_basic',
        title: '被动语态基础',
        level: 'PET',
        summary: '当动作承受者是主语时使用被动语态，强调动作本身而非执行者。',
        explain: '被动语态用于强调动作的承受者，或者当我们不知道/不需要说明谁做了这件事时使用。把主动句变为被动句：原来的宾语变为主语，动词变成 be + 过去分词，原来的主语变成 by + 短语（可省）。例如：Tom broke the window → The window was broken by Tom。',
        structure: [
          { label: '基本结构', formula: 'S (受事) + be + V-ed (past participle) + (by + agent)', example: 'The cake was made by my mother.' },
          { label: '一般现在时被动', formula: 'S + am/is/are + V-ed', example: 'English is spoken all over the world.' },
          { label: '一般过去时被动', formula: 'S + was/were + V-ed', example: 'The window was broken yesterday.' },
        ],
        tips: '被动语态中 by + 行为者可省略（当行为者不重要或不知道时）。主动变被动：原宾语变主语，动词变 be+过去分词，原主语变 by 短语（可省）。',
        traps: [
          { wrong: 'The book was wrote by him.', right: 'The book was written by him.', explain: '被动语态需用过去分词，write 的过去分词是 written，不是 wrote' },
          { wrong: 'The letter is send every week.', right: 'The letter is sent every week.', explain: 'send 的过去分词是 sent，不是 send' },
          { wrong: 'They were told to leaving.', right: 'They were told to leave.', explain: 'tell sb to do 的被动是 be told to do，to 后接动词原形' },
        ],
      },
      {
        id: 'passive_tenses',
        title: '各时态被动语态',
        level: 'PET',
        summary: '被动语态可用于不同时态，关键是 be 动词随时态变化。',
        explain: '被动语态可以用在不同时态里，核心规律是：把对应时态 be 动词的形式 + 过去分词。例如：现在进行时被动（is/are being done）、将来时被动（will be done）、现在完成时被动（has/have been done）。牢记每种时态中 be 动词是如何变化的。',
        structure: [
          { label: '现在进行时被动', formula: 'S + am/is/are + being + V-ed', example: 'The road is being repaired now.' },
          { label: '将来时被动', formula: 'S + will be + V-ed', example: 'The report will be submitted tomorrow.' },
          { label: '现在完成时被动', formula: 'S + have/has + been + V-ed', example: 'The package has been delivered.' },
          { label: '情态动词被动', formula: 'S + modal + be + V-ed', example: 'This rule must be followed.' },
        ],
        tips: '各时态被动的核心：be 动词的时态形式 + 过去分词。情态动词后接 be 不变形（must be done, should be checked）。',
        traps: [
          { wrong: 'The car has been fixing.', right: 'The car has been fixed.', explain: '现在完成时被动：have/has been + 过去分词，不是 V-ing' },
          { wrong: 'It will being done soon.', right: 'It will be done soon.', explain: '将来时被动：will be + 过去分词，不用 being' },
          { wrong: 'The work should been finished.', right: 'The work should be finished.', explain: '情态动词后接动词原形 be，不接 been' },
        ],
      },
      {
        id: 'passive_special',
        title: '特殊动词被动结构',
        level: 'FCE',
        summary: '双宾语动词和短语动词变被动时有特殊规则。',
        explain: '有双宾语的动词（give, tell, show）变被动时有两种方式：可以把间接宾语（人）或直接宾语（物）变成主语。短语动词（look after, take care of）变被动时，必须把整个短语看作一个整体，介词或副词不能省略（He was taken care of by the nurse）。',
        structure: [
          { label: '双宾语变被动', formula: 'Indirect obj becomes S + be + V-ed + direct obj  OR  direct obj becomes S + be + V-ed + to/for + indirect obj', example: 'She was given a prize. / A prize was given to her.' },
          { label: '短语动词被动', formula: 'S + be + V-ed + particle (短语动词不拆开)', example: 'The problem was looked into by the police.' },
        ],
        tips: '短语动词整体视为一个动词，变被动时介词/副词不能去掉：take care of → be taken care of；look into → be looked into。',
        traps: [
          { wrong: 'She was given to a prize.', right: 'She was given a prize.', explain: '以间接宾语做主语时，直接宾语留在谓语之后，不加介词' },
          { wrong: 'The matter was looked.', right: 'The matter was looked into.', explain: '短语动词 look into 的 into 不能省略' },
          { wrong: 'He was laughed.', right: 'He was laughed at.', explain: 'laugh at 是短语动词，被动时 at 必须保留' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 第四章  语气
  // ──────────────────────────────────────────────
  {
    id: 'mood',
    chapter: '第四章',
    title: '语气',
    icon: '💬',
    points: [
      {
        id: 'imperative',
        title: '祈使语气',
        level: 'KET',
        summary: '表示命令、请求、建议，以动词原形开头，主语通常省略。',
        explain: '祈使句用来发出命令、请求或建议，直接用动词原形开头，不写出主语 you。表示礼貌时在前面或后面加 please（Please come in. / Come in, please）。否定祈使句在动词前加 Don\'t（Don\'t run in the hallway）。',
        structure: [
          { label: '肯定祈使', formula: 'V + (object/complement)', example: 'Open the window, please.' },
          { label: '否定祈使', formula: 'Don\'t + V ...', example: 'Don\'t touch that!' },
          { label: '礼貌请求', formula: 'Please + V  /  V + please', example: 'Please sit down. / Come in, please.' },
        ],
        tips: '祈使句主语通常省略（默认 you）。表示警告或强调时可加上 you：You be quiet!',
        traps: [
          { wrong: 'Please you open the door.', right: 'Please open the door.', explain: '祈使句省略主语 you，不写出来（除非强调）' },
          { wrong: 'Not make noise.', right: 'Don\'t make noise.', explain: '否定祈使句用 Don\'t，不用 Not' },
          { wrong: 'Do open the book slowly.', right: 'Open the book slowly.', explain: '普通祈使句不需要加 do（除非强调：Do be quiet!）' },
        ],
      },
      {
        id: 'subjunctive_if',
        title: '虚拟语气——if 条件句',
        level: 'FCE',
        summary: '虚拟条件句表示与事实相反的假设，分现在/过去虚拟。',
        explain: '虚拟语气用来表达"假如"或"与现实相反"的假设，不是真实的情况。与现在相反：if 从句用过去式（if I had a car...），主句用 would/could + 原形。与过去相反：if 从句用 had + 过去分词，主句用 would have + 过去分词。注意：虚拟语气中 if 从句里 be 动词统一用 were（不管主语是谁）。',
        structure: [
          { label: '与现在相反', formula: 'If + S + V-ed (过去式), S + would/could/might + V', example: 'If I had more time, I would travel the world.' },
          { label: '与过去相反', formula: 'If + S + had + V-ed, S + would/could/might + have + V-ed', example: 'If she had studied harder, she would have passed.' },
          { label: '混合虚拟', formula: 'If + S + had + V-ed (过去), S + would + V (现在)', example: 'If I had taken that job, I would be rich now.' },
        ],
        tips: '虚拟语气中 if 从句里 be 动词统一用 were（即使主语是 I/he/she/it）：If I were you... 但口语中 was 也可接受。',
        traps: [
          { wrong: 'If I would have money, I would buy it.', right: 'If I had money, I would buy it.', explain: 'if 从句中不用 would，用过去式表示与现在相反' },
          { wrong: 'If she studied harder, she would have passed.', right: 'If she had studied harder, she would have passed.', explain: '与过去相反，if 从句用过去完成时（had + V-ed）' },
          { wrong: 'If I was you, I would apologize.', right: 'If I were you, I would apologize.', explain: '书面语中，虚拟语气的 be 动词一律用 were' },
        ],
      },
      {
        id: 'subjunctive_wish',
        title: '虚拟语气——wish / if only',
        level: 'FCE',
        summary: '用 wish 或 if only 表达与现实不符的愿望。',
        explain: 'wish 后的从句表达与现实不符的愿望，语法与 if 虚拟一样——时态"退一步"。希望现在不一样用过去式（I wish I could fly）；希望过去不一样用过去完成时（I wish I had studied harder）。区别：hope 接真实可能实现的愿望（I hope it will be fine tomorrow），wish 接与现实相反的遗憾。',
        structure: [
          { label: '与现在相反的愿望', formula: 'S + wish + S + V-ed (过去式)', example: 'I wish I knew the answer.' },
          { label: '与过去相反的愿望', formula: 'S + wish + S + had + V-ed', example: 'She wishes she had taken the opportunity.' },
          { label: '对将来的期望', formula: 'S + wish + S + would + V', example: 'I wish you would stop making noise.' },
        ],
        tips: 'wish 引导的从句时态比主句"退一步"：希望现在不同→用过去式；希望过去不同→用过去完成时；hope 后接一般将来时（I hope it will be fine）。',
        traps: [
          { wrong: 'I wish I can fly.', right: 'I wish I could fly.', explain: 'wish 后的从句用过去式，can 变 could' },
          { wrong: 'She wishes she didn\'t say that.', right: 'She wishes she hadn\'t said that.', explain: '对过去的遗憾用过去完成时 hadn\'t said' },
          { wrong: 'I hope I were taller.', right: 'I wish I were taller.', explain: 'hope 表示有可能实现的希望，与现实相反的用 wish' },
        ],
      },
      {
        id: 'subjunctive_suggest',
        title: '虚拟语气——suggest / insist 等',
        level: 'FCE',
        summary: '某些动词（suggest, insist, recommend, demand 等）后接 that 从句用虚拟语气（should + V 或省略 should 直接用原形）。',
        explain: '在 suggest、insist、demand、recommend 等动词后的 that 从句里，动词要用原形（或 should + 原形），不受主语人称影响，也不随主句时态变化。例如：The teacher suggests that everyone (should) bring a pencil——bring 不能改成 brings 或 brought。',
        structure: [
          { label: 'that 从句虚拟', formula: 'suggest/insist/recommend/demand + that + S + (should) + V', example: 'The doctor suggested that he (should) rest for a week.' },
          { label: 'It is necessary/important + that', formula: 'It is necessary/vital/important + that + S + (should) + V', example: 'It is essential that everyone (should) attend the meeting.' },
        ],
        tips: '这类虚拟语气中，that 从句谓语动词用原形（或 should + 原形），不随主语人称变化，也不受主句时态影响。',
        traps: [
          { wrong: 'I suggest that he goes home.', right: 'I suggest that he go home.', explain: 'suggest 后的 that 从句用动词原形（虚拟语气），不加 -s' },
          { wrong: 'They insisted that she should was present.', right: 'They insisted that she should be present.', explain: 'should 后接动词原形，be 不变为 was' },
          { wrong: 'It is important that he studies more.', right: 'It is important that he study more.', explain: 'it is important that 后从句用动词原形（虚拟）' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 第五章  非谓语动词
  // ──────────────────────────────────────────────
  {
    id: 'non_finite',
    chapter: '第五章',
    title: '非谓语动词',
    icon: '🔗',
    points: [
      {
        id: 'infinitive',
        title: '不定式（to + V）',
        level: 'PET',
        summary: '不定式用作主语、宾语、表语、定语、目的状语等。',
        explain: '不定式（to + 动词原形）可以在句子里充当名词、形容词或副词的角色。最常见的用法：表示目的（She studied hard to pass the exam）；某些动词后接不定式（want to, hope to, decide to）。感官动词（see/hear/feel）和使役动词（make/let/have）后接宾语时省略 to。',
        structure: [
          { label: '作目的状语', formula: 'to + V (in order to / so as to)', example: 'She went to the library to borrow books.' },
          { label: '宾语补足语', formula: 'V + sb + to + V (ask/tell/want/allow/help)', example: 'My teacher asked me to rewrite the essay.' },
          { label: '感官动词/let/make', formula: 'see/hear/watch/let/make + sb + V (省略 to)', example: 'I heard her sing. / He made me laugh.' },
        ],
        tips: '不定式的否定：not to + V（She decided not to go.）。被动式：to be + V-ed。完成式：to have + V-ed（表先于主句动作）。',
        traps: [
          { wrong: 'She wants me help her.', right: 'She wants me to help her.', explain: 'want sb to do，不能省略 to' },
          { wrong: 'I saw him to cross the street.', right: 'I saw him cross the street.', explain: '感官动词 see 后接宾语补足语用省略 to 的不定式' },
          { wrong: 'He made her to cry.', right: 'He made her cry.', explain: 'make sb do，不加 to；但被动时要加：She was made to cry.' },
        ],
      },
      {
        id: 'gerund',
        title: '动名词（V-ing）',
        level: 'PET',
        summary: '动名词具有名词功能，可作主语、宾语、表语、介词宾语等。',
        explain: '动名词（动词-ing）形式像动词，功能像名词，可以做主语或宾语。关键记忆点：有些动词后面只能接动名词，如 enjoy、finish、avoid、mind、keep、stop（stop doing = 停止做，与 stop to do 含义不同）。介词后面必须接动名词，不能接不定式（good at swimming，不是 good at to swim）。',
        structure: [
          { label: '作主语', formula: 'V-ing + V', example: 'Swimming is great exercise.' },
          { label: '固定搭配宾语', formula: 'enjoy/finish/avoid/mind/keep/suggest + V-ing', example: 'I enjoy listening to music.' },
          { label: '介词后接动名词', formula: 'preposition + V-ing', example: 'She is good at drawing.' },
        ],
        tips: '动名词 vs 不定式：enjoy/finish/avoid/mind/stop/keep + -ing；want/decide/hope/plan/promise/agree + to do。某些动词两者皆可但含义不同（stop to do vs stop doing）。',
        traps: [
          { wrong: 'I enjoy to swim.', right: 'I enjoy swimming.', explain: 'enjoy 后接动名词，不接不定式' },
          { wrong: 'She stopped to smoke years ago.', right: 'She stopped smoking years ago.', explain: 'stop smoking 表示停止吸烟；stop to smoke 表示停下来去吸烟' },
          { wrong: 'He is interested in to learn Chinese.', right: 'He is interested in learning Chinese.', explain: '介词 in 后接动名词，不接不定式' },
        ],
      },
      {
        id: 'present_participle',
        title: '现在分词',
        level: 'PET',
        summary: '现在分词（V-ing）可作定语、状语、宾语补足语。',
        explain: '现在分词（动词-ing）作定语时表示主动或正在进行（a running dog = 正在跑的狗）；作状语时，它的隐含主语必须与句子主语相同，否则就是错误的"悬垂分词"。比如"Walking to school, it began to rain"是错的——不是"天气"在走路，应改为"Walking to school, I got caught in the rain"。',
        structure: [
          { label: '定语用法', formula: 'V-ing + noun  /  noun + V-ing phrase', example: 'the running water; the girl sitting by the window.' },
          { label: '状语用法', formula: 'V-ing (clause) + main clause (同一主语)', example: 'Seeing the traffic, she took the subway instead.' },
          { label: '宾语补足语', formula: 'see/hear/watch/find/catch/keep + sb + V-ing', example: 'I found her crying in the corner.' },
        ],
        tips: '分词短语作状语时，其主语必须与主句主语一致，否则为垂悬分词错误。',
        traps: [
          { wrong: 'Walking down the street, the trees were beautiful.', right: 'Walking down the street, I found the trees beautiful.', explain: '分词 walking 的逻辑主语应与主句主语一致，trees 不能走路' },
          { wrong: 'She heard him sang.', right: 'She heard him singing.', explain: '感官动词感知到正在进行的动作用 V-ing，感知到完整动作用原形' },
          { wrong: 'The fallen leaves covering the path was slippery.', right: 'The path covered by fallen leaves was slippery.', explain: '注意分词修饰的名词与逻辑关系' },
        ],
      },
      {
        id: 'past_participle_usage',
        title: '过去分词',
        level: 'PET',
        summary: '过去分词（V-ed）可作定语、状语（被动/完成含义）、宾语补足语。',
        explain: '过去分词（动词-ed）作定语时表示被动或已完成的状态（a broken window = 被打破的窗户；a fallen leaf = 已落下的叶子）。"have/get + 宾语 + 过去分词"是重要结构，表示请别人做某事（I had my hair cut = 我去理了发）。',
        structure: [
          { label: '定语用法', formula: 'V-ed + noun  /  noun + V-ed phrase', example: 'a broken window; the letter written in French.' },
          { label: '状语用法（被动/完成）', formula: 'V-ed (phrase) + main clause', example: 'Surprised by the news, she sat down quietly.' },
          { label: '宾语补足语', formula: 'have/get/want + sth + V-ed', example: 'I had my hair cut yesterday.' },
        ],
        tips: 'have sth done 表示请人做某事（使役）或遭受某事发生。注意：过去分词作定语表被动或完成，现在分词作定语表主动进行。',
        traps: [
          { wrong: 'The writing letter is on the desk.', right: 'The written letter is on the desk.', explain: '信是被写的，用过去分词 written 表被动' },
          { wrong: 'I got my car repairing.', right: 'I got my car repaired.', explain: 'have/get sth done，宾语补足语用过去分词' },
          { wrong: 'Exhausting from the journey, she fell asleep.', right: 'Exhausted from the journey, she fell asleep.', explain: '人感到疲惫用 exhausted（被动），exhausting 表示"令人精疲力竭"' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 第六章  句子成分
  // ──────────────────────────────────────────────
  {
    id: 'sentence_elements',
    chapter: '第六章',
    title: '句子成分',
    icon: '🏗️',
    points: [
      {
        id: 'subject_predicate',
        title: '主语与谓语',
        level: 'KET',
        summary: '主语是句子的核心话题，谓语是对主语的陈述，二者必须在人称和数上一致。',
        explain: '英语句子的核心是主语和谓语，两者在数上必须一致（主谓一致）。单数主语配单数谓语，复数主语配复数谓语。特别注意：each of...、everyone/everybody 后面的谓语用单数；a number of...（大量的）后面用复数，the number of...（……的数量）后面用单数。',
        structure: [
          { label: '主谓一致（单数）', formula: 'singular S + singular V', example: 'The cat sleeps on the sofa.' },
          { label: '主谓一致（复数）', formula: 'plural S + plural V', example: 'The children are playing outside.' },
          { label: '集合名词', formula: 'team/family/class + singular V (英式可复数)', example: 'The team is well-prepared.' },
        ],
        tips: '以下结构主语为单数：each/every + 单数名词；either/neither + 单数名词；不定式/动名词作主语；There + be 结构以 be 后名词决定单复数。',
        traps: [
          { wrong: 'Each of the students have a book.', right: 'Each of the students has a book.', explain: 'each of + 复数名词作主语，谓语用单数' },
          { wrong: 'The news are surprising.', right: 'The news is surprising.', explain: 'news 是不可数名词，谓语用单数' },
          { wrong: 'There is many problems.', right: 'There are many problems.', explain: 'there be 结构中 be 与其后名词一致，problems 是复数用 are' },
        ],
      },
      {
        id: 'object_complement',
        title: '宾语与补语',
        level: 'KET',
        summary: '宾语接受动作，补语补充说明主语或宾语。',
        explain: '宾语是动词动作的对象（She reads books）；补语用来补充说明主语或宾语的状态。连系动词（look/feel/become/seem/smell/taste/sound）后的表语要用形容词（The soup tastes good），不能用副词——你不能说"The soup tastes well"（除非表示汤"品尝能力很好"，这完全不对）。',
        structure: [
          { label: '直接宾语', formula: 'V + DO', example: 'She bought a dress.' },
          { label: '双宾语', formula: 'V + IO + DO  /  V + DO + to/for + IO', example: 'He gave me a gift. / He gave a gift to me.' },
          { label: '宾语补足语', formula: 'V + O + OC (adj/noun/to-V/V-ing/V-ed)', example: 'They elected him chairman. / She found the film boring.' },
        ],
        tips: '主语补语（表语）用形容词：The food tastes good.（不用副词 well）。宾语补足语是名词时与宾语为同位关系；是形容词时描述宾语状态。',
        traps: [
          { wrong: 'She looks beautifully.', right: 'She looks beautiful.', explain: 'look 是连系动词，后接形容词（表语），不接副词' },
          { wrong: 'He named his cat as Whiskers.', right: 'He named his cat Whiskers.', explain: 'name sb sth，宾语补足语直接跟在宾语后，不加 as' },
          { wrong: 'I found him to be very kind.', right: 'I found him very kind.', explain: 'find + O + adj，不需要加 to be（口语中两者均可，但直接加形容词更常见）' },
        ],
      },
      {
        id: 'attributive_adverbial',
        title: '定语与状语',
        level: 'PET',
        summary: '定语修饰名词，状语修饰动词/形容词/副词或整个句子。',
        explain: '定语修饰名词，说明它是"哪个/什么样的"（a tall boy 里 tall 是定语）；状语修饰动词，说明动作"如何/何时/在哪里/为何"发生（She sang beautifully——beautifully 是状语）。多个形容词同时修饰一个名词时，有固定顺序：观点→大小→形状→年龄→颜色→来源→材料。',
        structure: [
          { label: '前置定语', formula: 'adj / noun / V-ing / V-ed + noun', example: 'a beautiful red handmade bag.' },
          { label: '后置定语', formula: 'noun + prep phrase / relative clause / to-V phrase', example: 'the girl in blue; the book that I bought; something to eat.' },
          { label: '状语类型', formula: 'time / place / manner / reason / purpose / condition + adv/phrase/clause', example: 'She sang beautifully at the concert last night.' },
        ],
        tips: '多个形容词定语的顺序：限定词→数量→观点→大小→形状→新旧→颜色→来源→材料→名词（口诀：限数观大形新颜国材名）。',
        traps: [
          { wrong: 'I have something eating.', right: 'I have something to eat.', explain: 'something + to do（不定式作后置定语）表示"有……可做的事"' },
          { wrong: 'She is a Chinese beautiful girl.', right: 'She is a beautiful Chinese girl.', explain: '形容词顺序：观点（beautiful）在来源（Chinese）之前' },
          { wrong: 'He works hard because to earn money.', right: 'He works hard to earn money.', explain: '表目的用不定式（to earn），不用 because to' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 第七章  五种基本句型
  // ──────────────────────────────────────────────
  {
    id: 'sentence_patterns',
    chapter: '第七章',
    title: '五种基本句型',
    icon: '📐',
    points: [
      {
        id: 'sv',
        title: 'S + V（主谓）',
        level: 'KET',
        summary: '句子只由主语和不及物动词构成，动词后不带宾语。',
        explain: '最简单的英语句型，只有主语和不及物动词。不及物动词（arrive/appear/happen/sleep）不能直接接宾语，要接具体地点等，需加介词（arrive at the station）。如果忘记介词，就会犯一个很常见的错误。',
        structure: [
          { label: '主谓句型', formula: 'S + Vi (+ adverbial)', example: 'Birds fly. / She smiled quietly.' },
        ],
        tips: '不及物动词不能直接接宾语，如 arrive, appear, rise, fall, happen, exist, sleep。若要接，需加介词。',
        traps: [
          { wrong: 'He arrived the station late.', right: 'He arrived at the station late.', explain: 'arrive 是不及物动词，接地点需加介词 at/in' },
          { wrong: 'The accident happened on me.', right: 'The accident happened to me.', explain: 'happen to sb，固定介词搭配' },
          { wrong: 'She rose up early.', right: 'She rose early.', explain: 'rise 已含"起来"之意，up 是多余的' },
        ],
      },
      {
        id: 'svc',
        title: 'S + V + C（主系表）',
        level: 'KET',
        summary: '连系动词后接表语（形容词/名词），描述主语的状态或特征。',
        explain: '连系动词（be/look/feel/seem/become/sound/smell/taste）后面接表语，描述主语的状态。表语用形容词或名词，不用副词。记忆技巧：连系动词大多与感觉有关（看/听/闻/尝/感觉），可以把它们想象成感知"状态"的动词，后面跟的是状态描述词（形容词）。',
        structure: [
          { label: '主系表句型', formula: 'S + linking verb + adj/noun', example: 'The milk smells sour. / She became a doctor.' },
          { label: '常见连系动词', formula: 'be, seem, appear, become, get, grow, turn, stay, remain, feel, smell, taste, sound, look', example: 'The music sounds wonderful.' },
        ],
        tips: '连系动词后接形容词，不接副词。区别：He is good.（连系动词）vs He does good work.（行为动词）。',
        traps: [
          { wrong: 'The food smells well.', right: 'The food smells good.', explain: '连系动词后接形容词 good，不接副词 well' },
          { wrong: 'She became a successfully writer.', right: 'She became a successful writer.', explain: '修饰名词用形容词 successful，不用副词 successfully' },
          { wrong: 'It sounds like beautiful.', right: 'It sounds beautiful.', explain: '连系动词直接接形容词，不需要 like（但 look/sound like + 名词可以）' },
        ],
      },
      {
        id: 'svo',
        title: 'S + V + O（主谓宾）',
        level: 'KET',
        summary: '及物动词后接宾语，宾语是动作的承受者。',
        explain: '及物动词直接接宾语，是最常见的句型。注意有些及物动词后面只能接动名词（enjoy swimming），有些只能接不定式（want to go），这需要单独记忆。stop to smoke（停下来去抽烟）和 stop smoking（停止抽烟）含义截然不同！',
        structure: [
          { label: '主谓宾句型', formula: 'S + Vt + O', example: 'She loves dancing.' },
          { label: '宾语从句', formula: 'S + V + that/if/wh- clause', example: 'I think that she is right.' },
        ],
        tips: '动词 enjoy, finish, avoid, suggest, mind, keep, consider, deny, imagine, risk, practice, miss 后接动名词（-ing）作宾语，不接不定式。',
        traps: [
          { wrong: 'I suggested to go there.', right: 'I suggested going there.', explain: 'suggest 后接动名词，不接不定式' },
          { wrong: 'She denied to steal the money.', right: 'She denied stealing the money.', explain: 'deny 后接动名词' },
          { wrong: 'He considered to change his job.', right: 'He considered changing his job.', explain: 'consider 后接动名词，不接不定式' },
        ],
      },
      {
        id: 'svoo',
        title: 'S + V + IO + DO（主谓双宾）',
        level: 'PET',
        summary: '某些动词可接两个宾语：间接宾语（人）和直接宾语（物）。',
        explain: '可以接两个宾语的动词包括 give、send、tell、show、teach、lend、buy、make 等。顺序是：动词 + 间接宾语（人）+ 直接宾语（物）；或者：动词 + 直接宾语（物）+ to/for + 间接宾语（人）。注意 explain、suggest 不能直接接双宾语，要用介词（explain the rule to me）。',
        structure: [
          { label: '双宾语句型', formula: 'S + V + IO + DO  (give, send, tell, show, teach, lend, buy, make, cook)', example: 'She taught us English.' },
          { label: '转换为介词短语', formula: 'S + V + DO + to/for + IO', example: 'She taught English to us. / He bought a gift for her.' },
        ],
        tips: '用 to 的动词：give, send, tell, show, teach, pass, lend, offer, bring, write。用 for 的动词：buy, make, cook, get, find, order, prepare。',
        traps: [
          { wrong: 'She explained me the rules.', right: 'She explained the rules to me.', explain: 'explain 不能直接接间接宾语，需用介词 to：explain sth to sb' },
          { wrong: 'He bought to her a present.', right: 'He bought her a present. / He bought a present for her.', explain: '双宾语顺序：V + IO + DO；或 V + DO + for + IO，不是 V + to/for + IO + DO' },
          { wrong: 'Can you suggest me a good restaurant?', right: 'Can you suggest a good restaurant to me?', explain: 'suggest 不接双宾语，用 suggest sth to sb' },
        ],
      },
      {
        id: 'svoc',
        title: 'S + V + O + C（主谓宾补）',
        level: 'PET',
        summary: '某些动词需要宾语补足语来补充说明宾语的状态。',
        explain: '宾语补足语紧跟在宾语之后，补充说明宾语的状态或身份。宾补可以是形容词（keep you healthy）、名词（call him a genius）或不定式（ask her to wait）。宾语和宾补之间有主谓逻辑关系：宾语"做"或"是"宾补所指的事。',
        structure: [
          { label: '宾补为形容词', formula: 'make/find/keep/consider + O + adj', example: 'Exercise keeps you healthy.' },
          { label: '宾补为名词', formula: 'call/name/elect/appoint + O + noun', example: 'They elected her president.' },
          { label: '宾补为不定式', formula: 'want/ask/tell/advise/allow + O + to-V', example: 'She allowed him to leave early.' },
        ],
        tips: '宾语与宾语补足语之间存在主谓逻辑关系（宾语做补足语的动作或具有补足语的状态）。',
        traps: [
          { wrong: 'They appointed him as a manager.', right: 'They appointed him manager.', explain: 'appoint sb + 职位名词，不加 as（call/name/elect 同理，口语中 as 也可接受）' },
          { wrong: 'I want that you to come.', right: 'I want you to come.', explain: 'want sb to do，不用 that 从句' },
          { wrong: 'She had him to fix the car.', right: 'She had him fix the car.', explain: 'have sb do（使役），宾补用原形，不加 to' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 第八章  从句
  // ──────────────────────────────────────────────
  {
    id: 'clauses',
    chapter: '第八章',
    title: '从句',
    icon: '🔀',
    points: [
      {
        id: 'noun_clause',
        title: '名词性从句',
        level: 'PET',
        summary: '名词性从句包括主语从句、宾语从句、表语从句和同位语从句。',
        explain: '名词性从句在句子里充当名词的角色，可以做主语（What she said surprised me）、宾语（I know that she\'s right）或表语。最重要：无论用什么引导词（that/whether/where/what），从句内部要用陈述句语序，不能倒装。"I know where she is."对，"I know where is she."错。',
        structure: [
          { label: '宾语从句', formula: 'V + that/if/whether/wh- word + clause', example: 'I know that she is honest.' },
          { label: '主语从句', formula: 'That/Whether/What + clause + V  /  It + V + that-clause', example: 'What he said surprised everyone. / It is clear that she is talented.' },
          { label: '同位语从句', formula: 'abstract noun (fact/idea/news/belief) + that + clause', example: 'The news that she won the prize spread quickly.' },
        ],
        tips: '宾语从句语序为陈述句语序（不倒装）。主句是过去时，从句通常用相应过去时态（时态呼应），但客观事实用一般现在时。',
        traps: [
          { wrong: 'I wonder where is she.', right: 'I wonder where she is.', explain: '宾语从句用陈述句语序，不倒装' },
          { wrong: 'He said that he will come.', right: 'He said that he would come.', explain: '主句是过去时（said），从句时态呼应用 would' },
          { wrong: 'The fact which she left shocked us.', right: 'The fact that she left shocked us.', explain: '同位语从句用 that，不用 which（which 引导定语从句）' },
        ],
      },
      {
        id: 'attributive_clause',
        title: '定语从句',
        level: 'PET',
        summary: '定语从句修饰名词，用关系代词（who/which/that）或关系副词（when/where/why）引导。',
        explain: '定语从句放在名词后面修饰它，作用像形容词。who/whom 指人，which 指物，that 指人或物（但在非限定性从句中只能用 who/which）。注意：关系代词已经代替了从句里的名词，从句中不能再出现那个代词（The book which I bought it → 去掉 it）。',
        structure: [
          { label: '限制性定语从句', formula: 'antecedent + who/which/that/when/where/why + clause', example: 'The girl who sits next to me is my friend.' },
          { label: '非限制性定语从句', formula: 'antecedent + , + which/who/whom + clause', example: 'My father, who is a doctor, loves reading.' },
          { label: '关系副词', formula: 'time + when; place + where; reason + why', example: 'The day when we met was rainy.' },
        ],
        tips: '只能用 which 不能用 that 的情况：非限制性定语从句；介词后（the company in which I work）；先行词是 all, everything, nothing 等时优先用 that。',
        traps: [
          { wrong: 'The book which I bought it is interesting.', right: 'The book which I bought is interesting.', explain: '定语从句中，关系代词已充当宾语，不能再加代词 it' },
          { wrong: 'My mother, that is a nurse, works night shifts.', right: 'My mother, who is a nurse, works night shifts.', explain: '非限制性定语从句不用 that，用 who 或 which' },
          { wrong: 'This is the reason because I failed.', right: 'This is the reason why I failed.', explain: '引导原因定语从句用 why，不用 because' },
        ],
      },
      {
        id: 'adverbial_time',
        title: '时间状语从句',
        level: 'PET',
        summary: '时间状语从句说明主句动作发生的时间，由 when, while, as, before, after, since, until 等引导。',
        explain: '时间状语从句告诉我们主句动作"什么时候"发生，由 when/while/as/before/after/until/since/as soon as 引导。最重要的规则：主句是将来时态时，时间从句要用一般现在时，不用 will。"When I arrive"而不是"When I will arrive"——这是非常高频的考点。',
        structure: [
          { label: 'when / while / as', formula: 'when + point in time; while + period; as + simultaneous', example: 'As she was leaving, the phone rang.' },
          { label: 'before / after / until', formula: 'before/after/until + clause', example: 'Don\'t leave until I come back.' },
          { label: 'since / as soon as / once', formula: 'since + past event; as soon as = immediately when', example: 'I\'ll call you as soon as I arrive.' },
        ],
        tips: '时间状语从句中用现在时表将来（不用 will）。hardly...when / no sooner...than 表示"一……就……"，主句常倒装。',
        traps: [
          { wrong: 'I will call you when I will arrive.', right: 'I will call you when I arrive.', explain: '时间状语从句用现在时表将来，不用 will' },
          { wrong: 'She hadn\'t no sooner sat down when the phone rang.', right: 'No sooner had she sat down than the phone rang.', explain: 'no sooner...than 结构，than 不换成 when；主句倒装' },
          { wrong: 'Since she left, everything changes.', right: 'Since she left, everything has changed.', explain: 'since 引导时间状语从句，主句用完成时' },
        ],
      },
      {
        id: 'adverbial_condition',
        title: '条件状语从句',
        level: 'PET',
        summary: '条件状语从句由 if, unless, as long as, provided that 等引导，主句与从句时态有特定搭配。',
        explain: '条件状语从句由 if/unless/as long as 引导，说明动作发生的条件。真实条件句：if 从句用现在时，主句用 will/can + 原形。关键规则：if 从句里不用 will（除非是虚拟语气）。unless = if...not，后面接肯定形式（Unless you hurry = If you don\'t hurry）。',
        structure: [
          { label: '真实条件句', formula: 'If + present tense, S + will/can/may + V', example: 'If it rains, we will cancel the picnic.' },
          { label: '虚拟条件句', formula: 'If + past tense, S + would/could + V', example: 'If I were taller, I would play basketball.' },
          { label: 'unless / as long as', formula: 'unless (= if...not); as long as / provided (that)', example: 'Unless you hurry, you will miss the bus.' },
        ],
        tips: '条件状语从句中不用 will/would（虚拟语气除外）。unless = if...not，后面接肯定形式。',
        traps: [
          { wrong: 'If you will study hard, you will pass.', right: 'If you study hard, you will pass.', explain: '条件状语从句用现在时，不用 will' },
          { wrong: 'Unless you don\'t come, we\'ll start.', right: 'Unless you come, we\'ll start.', explain: 'unless 本身含否定，后接肯定形式，等于 if you don\'t come' },
          { wrong: 'As long as you will be careful, it is safe.', right: 'As long as you are careful, it is safe.', explain: '条件从句用现在时，不用 will' },
        ],
      },
      {
        id: 'adverbial_concession',
        title: '让步状语从句',
        level: 'FCE',
        summary: '让步状语从句由 although, though, even though, even if, however, no matter 等引导，表示"尽管……"。',
        explain: '让步状语从句表示"尽管……也……"，由 although/though/even if/even though/however/no matter what 等引导。关键规则：although/though 已经包含了"但是"的意思，不能再加 but；even if 表示假设让步；even though 表示事实让步（与 although 近义）。',
        structure: [
          { label: 'although / though', formula: 'Although/Though + clause, main clause', example: 'Although it was late, he kept working.' },
          { label: 'even if / even though', formula: 'even if (假设让步) / even though (事实让步)', example: 'Even if it rains, we will go out.' },
          { label: 'however / whatever / no matter', formula: 'However + adj/adv + S + V; No matter what/how/when + clause', example: 'However tired she is, she never complains.' },
        ],
        tips: 'although/though 引导事实；even if 引导假设（可能不发生）；even though 引导事实（与 although 近义）。however 引导让步从句时为连词（前后有逗号时为副词）。',
        traps: [
          { wrong: 'Although she tried, but she failed.', right: 'Although she tried, she failed.', explain: 'although 和 but 不能同时使用' },
          { wrong: 'However hard does he try, he can\'t win.', right: 'However hard he tries, he can\'t win.', explain: 'however 引导让步从句，从句用陈述句语序，不倒装' },
          { wrong: 'No matter what happens, he always stay calm.', right: 'No matter what happens, he always stays calm.', explain: '主句主语 he 是第三人称单数，谓语 stays 需加 -s' },
        ],
      },
      {
        id: 'adverbial_cause_result',
        title: '原因与结果状语从句',
        level: 'PET',
        summary: '原因从句（because/since/as/for）说明原因；结果从句（so...that/such...that）说明结果。',
        explain: '原因从句（because/since/as）说明原因；结果从句（so...that/such...that）表示结果。区分 so 和 such：so 后面直接接形容词或副词（so fast, so beautiful），such 后面接名词短语（such a fast runner, such beautiful weather）。so...that 和 so that 含义不同：前者表结果，后者表目的。',
        structure: [
          { label: '原因从句', formula: 'because + direct cause; since/as + known cause', example: 'She stayed home because she was ill.' },
          { label: 'so...that 结果从句', formula: 'so + adj/adv + that + clause', example: 'He spoke so quickly that we couldn\'t understand.' },
          { label: 'such...that 结果从句', formula: 'such + (a/an) + adj + noun + that + clause', example: 'It was such a hot day that we stayed indoors.' },
        ],
        tips: 'so 后接形容词/副词；such 后接名词短语。so...that vs so that：前者表结果，后者表目的。',
        traps: [
          { wrong: 'She was so tired that she couldn\'t to sleep.', right: 'She was so tired that she couldn\'t sleep.', explain: '情态动词 couldn\'t 后接动词原形，不加 to' },
          { wrong: 'He is so a good student that everyone likes him.', right: 'He is such a good student that everyone likes him.', explain: '后面有名词（student）用 such，不用 so；so 后接形容词不接名词' },
          { wrong: 'It was such hot weather that we stayed inside.', right: 'It was such hot weather that we stayed inside.', explain: '这是正确的——such + 形容词 + 不可数名词（没有 a/an）' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 第九章  情态动词
  // ──────────────────────────────────────────────
  {
    id: 'modals',
    chapter: '第九章',
    title: '情态动词',
    icon: '🎯',
    points: [
      {
        id: 'can_could',
        title: 'can / could',
        level: 'KET',
        summary: 'can 表示能力、许可或可能性；could 是 can 的过去式，也表示礼貌请求。',
        explain: 'can 是初学英语最先学的情态动词，表示"会/能/可以"。情态动词最重要的规则：后面只接动词原形，不加 to，也不加 -s/-ed（只能说 can swim，不能说 can swims 或 can to swim）。could 是 can 的过去式，也用于更礼貌的请求（Could you help me? 比 Can you help me? 更礼貌）。',
        structure: [
          { label: '能力', formula: 'can/could + V (现在能力 / 过去能力)', example: 'She can swim very fast. / He could run 10 km when young.' },
          { label: '许可/请求', formula: 'Can/Could + I/you + V? (could 更礼貌)', example: 'Could you help me, please?' },
          { label: '可能性', formula: 'can\'t + V (不可能) / could + V (也许)', example: 'That can\'t be right. / It could be raining later.' },
        ],
        tips: 'could have + V-ed 表示过去本可以做但没做：You could have told me earlier.（你本可以早点告诉我）。',
        traps: [
          { wrong: 'I can to swim.', right: 'I can swim.', explain: '情态动词后直接接动词原形，不加 to' },
          { wrong: 'She could swam 10 km.', right: 'She could swim 10 km.', explain: '情态动词后用动词原形，不用过去式' },
          { wrong: 'Can you to lend me your pen?', right: 'Can you lend me your pen?', explain: '情态动词后不加 to' },
        ],
      },
      {
        id: 'may_might',
        title: 'may / might',
        level: 'PET',
        summary: 'may 表示许可或较大可能性；might 表示较小可能性或虚拟语气。',
        explain: 'may 表示"可能"（约50%把握）或"允许"（You may go now）；might 表示"也许"（约30%把握），也用于虚拟语气。情态动词后接原形，没有人称变化。might have + 过去分词表示"过去可能发生了（某事）"，是推测过去的用法。',
        structure: [
          { label: '许可', formula: 'may + V (正式许可)', example: 'You may leave the room now.' },
          { label: '可能性', formula: 'may/might + V (可能但不确定)', example: 'She may be at home. / It might rain tonight.' },
          { label: '过去未实现', formula: 'might have + V-ed', example: 'He might have missed the bus.' },
        ],
        tips: 'may 的可能性（约50%）大于 might（约30%）。might have done 表示过去可能发生但不确定是否发生。',
        traps: [
          { wrong: 'May you help me?', right: 'Could you help me?', explain: 'may 不常用于请求帮助，礼貌请求用 could/can' },
          { wrong: 'She might to come later.', right: 'She might come later.', explain: '情态动词后不加 to' },
          { wrong: 'It may rains tomorrow.', right: 'It may rain tomorrow.', explain: '情态动词后接动词原形，不加 -s' },
        ],
      },
      {
        id: 'must_have_to',
        title: 'must / have to / mustn\'t / don\'t have to',
        level: 'PET',
        summary: 'must 表示内在义务或强烈推测；have to 表示外在义务；mustn\'t 表示禁止；don\'t have to 表示不必要。',
        explain: 'must 和 have to 都表示"必须"，但来源不同：must 是说话者的主观要求，have to 是客观必须。最容易混淆的是：mustn\'t 表示"禁止做"，don\'t have to 表示"不必做"（没有义务，但可以做）——这两个含义截然相反！一定要分清楚。',
        structure: [
          { label: '义务', formula: 'must + V (说话者认为必须) / have to + V (客观必须)', example: 'You must try harder. / I have to wear a uniform.' },
          { label: '禁止 vs 不必要', formula: 'mustn\'t + V (禁止) / don\'t have to + V (不必要)', example: 'You mustn\'t smoke here. / You don\'t have to wait.' },
          { label: '推测', formula: 'must + V (肯定推测) / can\'t + V (否定推测)', example: 'She must be tired. / He can\'t be serious.' },
        ],
        tips: 'must（有把握的推测，现在）；must have done（有把握的过去推测）；can\'t have done（否定过去推测）。mustn\'t ≠ don\'t have to，含义完全不同！',
        traps: [
          { wrong: 'You don\'t have to smoke inside—it\'s forbidden.', right: 'You mustn\'t smoke inside—it\'s forbidden.', explain: '禁止用 mustn\'t，don\'t have to 表示没有必要，不表示禁止' },
          { wrong: 'She must be left already.', right: 'She must have left already.', explain: '对过去的推测用 must have + 过去分词' },
          { wrong: 'He must to call you back.', right: 'He must call you back.', explain: '情态动词后接动词原形，不加 to' },
        ],
      },
      {
        id: 'should_ought',
        title: 'should / ought to / had better',
        level: 'PET',
        summary: '表示建议、义务或期望；should have done 表示过去本应做但没做。',
        explain: 'should 和 ought to 都表示"应该"，语气较温和，常用于给建议。should have + 过去分词表示"本来应该做但没做"，带有遗憾的语气（You should have called me）。had better 语气比 should 强，暗示"不做会有不好的结果"，后面不加 to（had better go，不是 had better to go）。',
        structure: [
          { label: '建议/义务', formula: 'should/ought to + V', example: 'You should see a doctor. / You ought to apologize.' },
          { label: '过去应该（但没做）', formula: 'should have + V-ed', example: 'I should have studied more for the exam.' },
          { label: '警告建议', formula: 'had better + V (not)', example: 'You had better leave now or you\'ll miss the train.' },
        ],
        tips: 'had better 表示强烈建议，语气比 should 强，暗含"否则会有不好的结果"。had better 不等同于 had better have done（那是错误形式）。',
        traps: [
          { wrong: 'You should to arrive on time.', right: 'You should arrive on time.', explain: '情态动词后不加 to（ought to 是例外，它本身带 to）' },
          { wrong: 'You had better to hurry.', right: 'You had better hurry.', explain: 'had better 后直接接动词原形，不加 to' },
          { wrong: 'He should studied harder.', right: 'He should have studied harder.', explain: '对过去未做之事的遗憾：should have + 过去分词' },
        ],
      },
      {
        id: 'will_would',
        title: 'will / would',
        level: 'PET',
        summary: 'will 表示将来、意愿或习惯；would 是 will 的过去式，也用于虚拟语气和礼貌表达。',
        explain: 'will 用于表达将来的事情、临时决定（"I\'ll help you move the boxes"）或预测。would 是 will 的过去式，也用于礼貌请求（Would you mind opening the window?）和过去的习惯（When I was young, I would play in the park every day）。would rather + 动词原形表示"宁愿"。',
        structure: [
          { label: '将来/意愿', formula: 'will + V', example: 'I will help you move tomorrow.' },
          { label: '礼貌请求', formula: 'Would you + V? / Would you mind + V-ing?', example: 'Would you please close the door?' },
          { label: '过去习惯', formula: 'would + V (过去反复做的事)', example: 'When I was young, I would go fishing every weekend.' },
        ],
        tips: 'would rather + V 表示"宁愿"：I would rather stay home. would rather + 从句（过去式）表示希望别人做：I\'d rather you didn\'t smoke here.',
        traps: [
          { wrong: 'Would you mind to open the window?', right: 'Would you mind opening the window?', explain: 'mind 后接动名词（-ing），不接不定式' },
          { wrong: 'I will rather go by train.', right: 'I would rather go by train.', explain: '宁愿用 would rather，不用 will rather' },
          { wrong: 'Would you to come with me?', right: 'Would you come with me?', explain: '情态动词后不加 to' },
        ],
      },
      {
        id: 'need_dare',
        title: 'need / dare',
        level: 'FCE',
        summary: 'need 和 dare 可作情态动词（后接原形，无人称变化）或行为动词（后接不定式）。',
        explain: 'need 和 dare 比较特殊，可以用作情态动词（needn\'t/daren\'t，后接原形，不变形），也可以用作普通动词（needs to/dares to，有人称变化）。需要重点记忆：needn\'t have done 和 didn\'t need to do 含义不同——前者表示"做了但没必要"，后者表示"没必要所以没做"。',
        structure: [
          { label: '情态动词用法（疑问/否定）', formula: 'Need/Dare + S + V?  /  S + needn\'t/daren\'t + V', example: 'Need you go so soon? / You needn\'t worry.' },
          { label: '行为动词用法', formula: 'need to + V  /  dare to + V (有人称变化)', example: 'She needs to rest. / He didn\'t dare to speak.' },
        ],
        tips: 'needn\'t have done 表示"本来没必要做但做了"；didn\'t need to do 表示"不需要做，也没做"。',
        traps: [
          { wrong: 'You needn\'t to call me.', right: 'You needn\'t call me.', explain: '情态动词 needn\'t 后直接接原形，不加 to' },
          { wrong: 'She need to go now.', right: 'She needs to go now.', explain: '行为动词 need 有人称变化，第三人称单数加 -s' },
          { wrong: 'You needn\'t have bring your umbrella—it didn\'t rain.', right: 'You needn\'t have brought your umbrella—it didn\'t rain.', explain: 'needn\'t have done 表示做了但没必要，brought 是 bring 的过去分词' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 第十章  特殊句式
  // ──────────────────────────────────────────────
  {
    id: 'special_structures',
    chapter: '第十章',
    title: '特殊句式',
    icon: '✨',
    points: [
      {
        id: 'emphasis',
        title: '强调句（It is...that/who...）',
        level: 'PET',
        summary: '用 It is/was...that/who... 结构强调句子的某一成分（主语、宾语、状语）。',
        explain: '强调句用 "It is/was + 强调内容 + that/who + 剩余部分" 的结构，把想要突出的成分放在聚光灯下。判断方法：去掉 It is/was 和 that/who，剩下部分能组成完整句子就是强调句。不管强调的是什么（除了人用 who），都用 that 引导，不能用 when/where/which。',
        structure: [
          { label: '基本结构', formula: 'It is/was + 强调部分 + that/who + 其余部分', example: 'It was Tom who broke the window.' },
          { label: '强调状语', formula: 'It is/was + adv/prep phrase + that + clause', example: 'It was in Paris that they first met.' },
          { label: '强调谓语（助动词）', formula: 'S + do/does/did + V (原形)', example: 'She did finish the report on time!' },
        ],
        tips: '辨别强调句与主语从句：去掉 It is...that 后，其余部分能否组成完整句子——能则为强调句，不能则为主语从句。',
        traps: [
          { wrong: 'It was the book which I lost.', right: 'It was the book that I lost.', explain: '强调句中用 that（不用 which），强调人时可用 who' },
          { wrong: 'It was yesterday when he called.', right: 'It was yesterday that he called.', explain: '强调句中连接词一律用 that，不用 when/where/which' },
          { wrong: 'It is Tom that are wrong.', right: 'It is Tom that is wrong.', explain: '强调句中 be 动词与被强调的主语一致（Tom 是单数用 is）' },
        ],
      },
      {
        id: 'inversion',
        title: '倒装句',
        level: 'FCE',
        summary: '某些情况下主谓语序颠倒，分为完全倒装和部分倒装（助动词提前）。',
        explain: '倒装就是把助动词移到主语前面。当否定词（never/seldom/hardly）或 only 放在句首时，主句要部分倒装（助动词提前）。地点或方向副词（here/there/away）开头时，用完全倒装。注意：主语是代词时不倒装（Here he comes，不是 Here comes he）。',
        structure: [
          { label: '否定副词开头（部分倒装）', formula: 'Never/Seldom/Hardly/Not only/No sooner + aux + S + V', example: 'Never have I seen such a beautiful sunset.' },
          { label: 'Only 开头（部分倒装）', formula: 'Only + adv/phrase + aux + S + V', example: 'Only then did I understand the truth.' },
          { label: '地点/方向副词开头（完全倒装）', formula: 'Here/There/Away/In/Out + V + S', example: 'Here comes the bus!' },
        ],
        tips: '完全倒装主语是代词时不倒装：Here he comes.（代词主语保持原位）。so/neither 引导的附和句：So do I.（我也是）；Neither did she.（她也不……）。',
        traps: [
          { wrong: 'Seldom she visits her grandparents.', right: 'Seldom does she visit her grandparents.', explain: '否定频率副词 seldom 开头，主谓需部分倒装（助动词提前）' },
          { wrong: 'Not only she sings but she dances.', right: 'Not only does she sing but she also dances.', explain: 'not only 开头的倒装：not only 后部分倒装，but also 后正常语序' },
          { wrong: 'Here comes he.', right: 'Here he comes.', explain: '主语是代词时，地点副词开头不倒装' },
        ],
      },
      {
        id: 'exclamation',
        title: '感叹句',
        level: 'KET',
        summary: '感叹句表达强烈情感，用 What 或 How 引导。',
        explain: '感叹句表达强烈情感（惊喜、赞叹等），由 What 或 How 引导。区别：What 后面有名词（What a beautiful day!）；How 后面直接接形容词或副词，没有名词（How beautiful!）。不可数名词或复数名词前不加 a/an（What beautiful weather! What lovely flowers!）。',
        structure: [
          { label: 'What 引导', formula: 'What + (a/an) + adj + noun + S + V!', example: 'What a beautiful painting this is!' },
          { label: 'How 引导', formula: 'How + adj/adv + S + V!', example: 'How quickly time flies!' },
        ],
        tips: 'What 后接名词短语（有名词）；How 后接形容词或副词（无名词）。可数单数名词前加 a/an；不可数或复数名词前不加。',
        traps: [
          { wrong: 'What a beautiful the weather is!', right: 'What beautiful weather it is!', explain: 'weather 是不可数名词，What 后不加 a/an' },
          { wrong: 'How a fast runner he is!', right: 'What a fast runner he is!  /  How fast he runs!', explain: '后面有名词（runner）用 What；How 后只接形容词/副词，不加名词' },
          { wrong: 'How great a game it was!', right: 'What a great game it was!', explain: '接名词用 What；How 后接形容词+从句即可（How great the game was!）' },
        ],
      },
      {
        id: 'tag_question',
        title: '反意疑问句',
        level: 'PET',
        summary: '反意疑问句附于陈述句之后寻求确认，前肯后否或前否后肯。',
        explain: '反意疑问句附在陈述句后面，请求对方确认。规则很简单：陈述部分肯定→疑问部分否定；陈述部分否定（包含 never/hardly/seldom 等否定词）→疑问部分肯定。几个特殊情况必须记牢：I am... → aren\'t I；Let\'s... → shall we；祈使句 → will you。',
        structure: [
          { label: '基本规则', formula: '肯定陈述 + 否定问尾  /  否定陈述 + 肯定问尾', example: 'She is a teacher, isn\'t she? / He didn\'t go, did he?' },
          { label: '情态动词', formula: 'S + modal, modal not + S?', example: 'You can swim, can\'t you? / He shouldn\'t do that, should he?' },
          { label: '特殊主语', formula: 'I am late, aren\'t I? / Let\'s go, shall we? / Don\'t move, will you?', example: 'Let\'s start, shall we?' },
        ],
        tips: 'I am... 的反问用 aren\'t I（不用 amn\'t I）。问尾的主语必须用代词，和陈述句的主语保持一致。',
        traps: [
          { wrong: 'She has never been abroad, hasn\'t she?', right: 'She has never been abroad, has she?', explain: '主句含否定词 never，问尾用肯定形式' },
          { wrong: 'Let\'s play, shan\'t we?', right: 'Let\'s play, shall we?', explain: 'Let\'s... 开头的反意疑问句固定用 shall we' },
          { wrong: 'Nobody came, didn\'t they?', right: 'Nobody came, did they?', explain: 'nobody 是否定词，问尾用肯定 did they' },
        ],
      },
      {
        id: 'ellipsis',
        title: '省略句',
        level: 'PET',
        summary: '为避免重复，省略已在上文出现或可从语境理解的成分。',
        explain: '省略句是避免重复的语言策略，把已经提到过或可以理解的成分省略掉。最常见的是用助动词代替整个谓语（She sings well, and so does her sister）。so + 助动词 + 主语表示"……也是"；neither/nor + 助动词 + 主语表示"……也不是"。注意助动词要与上文时态一致。',
        structure: [
          { label: '助动词代替谓语', formula: 'S + aux (替代上文谓语短语)', example: 'She plays piano and so does her sister.' },
          { label: '条件从句省略', formula: 'if 从句可省略 if，将 had/were/should 提前', example: 'Had I known, I would have helped. (= If I had known...)' },
          { label: '对话省略', formula: '疑问句答语可仅保留助动词', example: 'Are you ready? — I am. (= I am ready.)' },
        ],
        tips: 'so + 助动词 + 主语（表赞同：我也是）；nor/neither + 助动词 + 主语（表否定赞同：我也不）。注意助动词选择要与上文时态一致。',
        traps: [
          { wrong: 'Neither I do.', right: 'Neither do I.', explain: 'neither/nor 开头表示"我也不"，需要倒装：Neither do I.' },
          { wrong: 'So she does.', right: 'So does she.', explain: 'so + 助动词 + 主语（倒装），不是 so + 主语 + 助动词' },
          { wrong: 'Were I rich, I would travel.', right: 'Were I rich, I would travel.', explain: '这是正确的——were 提前省略 if，表示虚拟条件' },
        ],
      },
    ],
  },
];

// 兼容旧代码
export const GRAMMAR_CATEGORIES = GRAMMAR_BOOK;
