// 英语语法知识点数据库
// 覆盖初中/KET/PET/FCE 核心语法考点

export const GRAMMAR_CATEGORIES = [
  {
    id: 'tense',
    label: '时态',
    icon: '⏰',
    points: [
      {
        id: 'simple_present',
        title: '一般现在时',
        level: 'KET',
        summary: '表示习惯性动作、客观事实或现在的状态。',
        structure: [
          { label: '肯定句', formula: 'S + V (第三人称单数加 -s/-es)', example: 'She reads books every day.' },
          { label: '否定句', formula: 'S + do/does + not + V', example: "He doesn't like coffee." },
          { label: '疑问句', formula: 'Do/Does + S + V?', example: 'Do you play football?' },
        ],
        signals: ['every day', 'always', 'usually', 'often', 'sometimes', 'never', 'on Mondays'],
        tips: '第三人称单数（he/she/it）谓语动词加 -s 或 -es。动词 be 用 is/am/are。',
        traps: [
          { wrong: 'She don\'t like it.', right: "She doesn't like it.", explain: '第三人称单数用 doesn\'t，不用 don\'t' },
          { wrong: 'He go to school every day.', right: 'He goes to school every day.', explain: '第三人称单数动词要加 -s/-es' },
        ],
      },
      {
        id: 'present_continuous',
        title: '现在进行时',
        level: 'KET',
        summary: '表示现在正在进行的动作，或按计划即将发生的事。',
        structure: [
          { label: '肯定句', formula: 'S + am/is/are + V-ing', example: 'I am reading a book now.' },
          { label: '否定句', formula: 'S + am/is/are + not + V-ing', example: "She isn't watching TV." },
          { label: '疑问句', formula: 'Am/Is/Are + S + V-ing?', example: 'Are you listening?' },
        ],
        signals: ['now', 'at the moment', 'look!', 'listen!', 'at present'],
        tips: '动词 -ing 变化规则：一般加 -ing；以 e 结尾去 e 加 -ing（make→making）；重读闭音节双写末尾辅音加 -ing（run→running）。',
        traps: [
          { wrong: 'I am knowing the answer.', right: 'I know the answer.', explain: 'know/like/love/hate 等状态动词不用进行时' },
          { wrong: 'She is come now.', right: 'She is coming now.', explain: '进行时用 V-ing，不用动词原形' },
        ],
      },
      {
        id: 'simple_past',
        title: '一般过去时',
        level: 'KET',
        summary: '表示过去某时发生的动作或存在的状态。',
        structure: [
          { label: '肯定句', formula: 'S + V-ed（规则）/ 不规则动词过去式', example: 'I visited Beijing last year.' },
          { label: '否定句', formula: 'S + did not + V（原形）', example: "He didn't go to school yesterday." },
          { label: '疑问句', formula: 'Did + S + V（原形）?', example: 'Did she call you?' },
        ],
        signals: ['yesterday', 'last week/year', 'ago', 'in 2020', 'just now', 'once'],
        tips: '常见不规则动词：go→went，come→came，see→saw，get→got，have→had，do→did，say→said，make→made，take→took，know→knew。',
        traps: [
          { wrong: 'Did she went there?', right: 'Did she go there?', explain: 'Did 后面用动词原形，不用过去式' },
          { wrong: 'I didn\'t saw him.', right: "I didn't see him.", explain: "didn't 后面用动词原形" },
        ],
      },
      {
        id: 'past_continuous',
        title: '过去进行时',
        level: 'PET',
        summary: '表示过去某一时刻正在进行的动作，常与一般过去时连用。',
        structure: [
          { label: '肯定句', formula: 'S + was/were + V-ing', example: 'I was sleeping at 9 pm.' },
          { label: '常见搭配', formula: 'When + 一般过去时，过去进行时', example: 'When she called, I was having dinner.' },
        ],
        signals: ['at that time', 'at 8 o\'clock last night', 'when', 'while'],
        tips: 'when 引导的从句用一般过去时（短暂动作），主句用过去进行时（持续动作）。while 引导的从句用过去进行时。',
        traps: [
          { wrong: 'While I read, she came in.', right: 'While I was reading, she came in.', explain: 'while 强调持续动作，用过去进行时' },
        ],
      },
      {
        id: 'present_perfect',
        title: '现在完成时',
        level: 'PET',
        summary: '表示过去发生的动作对现在有影响，或从过去持续到现在的动作。',
        structure: [
          { label: '肯定句', formula: 'S + have/has + V-ed（过去分词）', example: 'I have visited Paris twice.' },
          { label: '否定句', formula: "S + haven't/hasn't + V-ed", example: "She hasn't finished yet." },
          { label: '疑问句', formula: 'Have/Has + S + V-ed?', example: 'Have you ever eaten sushi?' },
        ],
        signals: ['already', 'yet', 'ever', 'never', 'just', 'since', 'for', 'recently', 'so far'],
        tips: 'for + 时间段（for three years）；since + 时间点（since 2020）。ever/never 放在 have 和过去分词之间。',
        traps: [
          { wrong: 'I have seen him yesterday.', right: 'I saw him yesterday.', explain: '有明确过去时间（yesterday）用一般过去时，不用完成时' },
          { wrong: 'She has went there.', right: 'She has gone there.', explain: 'have/has 后用过去分词，go 的过去分词是 gone' },
        ],
      },
      {
        id: 'future',
        title: '将来时',
        level: 'KET',
        summary: '表示将来要发生的事，有多种表达方式。',
        structure: [
          { label: 'will + V', formula: '临时决定、预测、承诺', example: "I'll help you with that." },
          { label: 'be going to + V', formula: '计划好的事、有迹象的预测', example: 'It is going to rain.' },
          { label: '现在进行时', formula: '已确定的近期安排', example: "I'm meeting her tomorrow." },
        ],
        signals: ['tomorrow', 'next week', 'soon', 'in the future', 'one day'],
        tips: 'will 表示说话时做出的决定；be going to 表示事先计划好的。两者在口语中常可互换。',
        traps: [
          { wrong: "I will to go.", right: "I will go.", explain: 'will 后直接加动词原形，不加 to' },
          { wrong: "She is go to study.", right: "She is going to study.", explain: 'be going to 中 going 不可省略' },
        ],
      },
    ],
  },
  {
    id: 'sentence',
    label: '句型结构',
    icon: '📐',
    points: [
      {
        id: 'passive',
        title: '被动语态',
        level: 'PET',
        summary: '当动作的承受者是句子主语时，使用被动语态。',
        structure: [
          { label: '一般现在时被动', formula: 'S + am/is/are + V-ed', example: 'English is spoken here.' },
          { label: '一般过去时被动', formula: 'S + was/were + V-ed', example: 'The book was written in 1990.' },
          { label: '现在完成时被动', formula: 'S + have/has been + V-ed', example: 'The window has been broken.' },
        ],
        tips: '主动变被动：主动宾语→被动主语；主动主语→by + 宾格（常省略）；谓语变为 be + 过去分词。',
        traps: [
          { wrong: 'The cake was ate.', right: 'The cake was eaten.', explain: 'eat 的过去分词是 eaten，不是 ate' },
          { wrong: 'It is made by she.', right: 'It is made by her.', explain: 'by 后用宾格代词 her，不用主格 she' },
        ],
      },
      {
        id: 'conditional',
        title: '条件句',
        level: 'PET',
        summary: '表示假设条件及其结果，分真实条件句和虚拟条件句。',
        structure: [
          { label: '零型（客观事实）', formula: 'If + 一般现在时，一般现在时', example: 'If you heat water, it boils.' },
          { label: '一型（真实可能）', formula: 'If + 一般现在时，will + V', example: "If it rains, I'll stay home." },
          { label: '二型（虚拟/不太可能）', formula: 'If + 一般过去时，would + V', example: 'If I had wings, I would fly.' },
        ],
        tips: '条件句中 if 从句不用 will/would，用相应时态代替。二型条件句 be 动词全部用 were（不论人称）。',
        traps: [
          { wrong: 'If it will rain, I stay.', right: "If it rains, I'll stay.", explain: 'if 从句用一般现在时，主句用 will' },
          { wrong: 'If I was rich, I would travel.', right: 'If I were rich, I would travel.', explain: '虚拟语气 be 动词用 were' },
        ],
      },
      {
        id: 'relative_clause',
        title: '定语从句',
        level: 'FCE',
        summary: '用来修饰名词的从句，由关系词引导。',
        structure: [
          { label: '关系代词', formula: 'who（人/主宾格）, which（物）, that（人/物，限定性）', example: 'The man who called you is my uncle.' },
          { label: '关系副词', formula: 'where（地点）, when（时间）, why（原因）', example: 'The school where I studied is old.' },
          { label: '省略 that', formula: '从句中 that 作宾语时可省略', example: 'The book (that) I bought is great.' },
        ],
        tips: '先行词是人用 who/that；是物用 which/that；有 all/only/the first/最高级等修饰时只用 that；先行词前有介词时，介词后只用 which/whom。',
        traps: [
          { wrong: 'The girl which I like is tall.', right: 'The girl who(m) I like is tall.', explain: '先行词是人用 who/whom，不用 which' },
          { wrong: 'The house where I live it is old.', right: 'The house where I live is old.', explain: '关系副词 where 已含介词，从句中不再加 it' },
        ],
      },
      {
        id: 'reported_speech',
        title: '间接引语',
        level: 'PET',
        summary: '将别人说的话转述，需要改变人称、时态和时间状语。',
        structure: [
          { label: '陈述句', formula: 'said (that) + 时态后移', example: '"I am tired." → She said she was tired.' },
          { label: '疑问句', formula: 'asked + whether/if（一般疑问）/ 疑问词（特殊疑问）', example: '"Are you OK?" → He asked if I was OK.' },
          { label: '祈使句', formula: 'told/asked + sb + to do', example: '"Sit down." → She told me to sit down.' },
        ],
        tips: '时态变化：一般现在→一般过去；现在进行→过去进行；一般过去→过去完成；will→would。now→then，today→that day，tomorrow→the next day。',
        traps: [
          { wrong: 'She said she is happy.', right: 'She said she was happy.', explain: '间接引语时态要后移' },
          { wrong: 'He asked me where do I live.', right: 'He asked me where I lived.', explain: '间接疑问语序用陈述句语序（主语+谓语）' },
        ],
      },
    ],
  },
  {
    id: 'grammar_items',
    label: '核心语法项',
    icon: '🔧',
    points: [
      {
        id: 'articles',
        title: '冠词 a/an/the',
        level: 'KET',
        summary: '不定冠词 a/an 表泛指，定冠词 the 表特指。',
        structure: [
          { label: 'a/an', formula: '首次提及、泛指一类、职业身份', example: 'She is a doctor. I saw a dog.' },
          { label: 'the', formula: '再次提及、独一无二、特指双方都知道的', example: 'The sun rises in the east.' },
          { label: '零冠词', formula: '专有名词、球类/语言/三餐/学科前', example: 'I play football. He studies English.' },
        ],
        tips: 'a 用于辅音音素开头（a university），an 用于元音音素开头（an hour，h 不发音）。',
        traps: [
          { wrong: 'She plays the piano every the day.', right: 'She plays the piano every day.', explain: 'every day 中 every 后不加 the' },
          { wrong: 'I had a breakfast.', right: 'I had breakfast.', explain: '三餐前不加冠词' },
        ],
      },
      {
        id: 'modal_verbs',
        title: '情态动词',
        level: 'KET',
        summary: '情态动词表示能力、许可、义务、可能性等，后接动词原形。',
        structure: [
          { label: 'can/could', formula: '能力；请求（could 更礼貌）', example: 'Can you swim? Could you help me?' },
          { label: 'must/have to', formula: 'must 主观义务；have to 客观必须', example: 'You must study. I have to go now.' },
          { label: 'should', formula: '建议、应该', example: 'You should see a doctor.' },
          { label: 'may/might', formula: '可能性（might 可能性更小）', example: 'It may rain. He might be late.' },
        ],
        tips: "must not = 禁止；don't have to = 没必要（≠禁止）。这是常考混淆点。",
        traps: [
          { wrong: 'She can to swim.', right: 'She can swim.', explain: '情态动词后直接加动词原形，不加 to' },
          { wrong: 'You must not to leave.', right: 'You must not leave.', explain: 'must not 后直接加动词原形' },
        ],
      },
      {
        id: 'comparison',
        title: '形容词比较级和最高级',
        level: 'KET',
        summary: '比较两者用比较级（+er/more），三者及以上用最高级（+est/most）。',
        structure: [
          { label: '规则变化', formula: '单音节：加 -er/-est；多音节：more/most + adj', example: 'tall→taller→tallest; beautiful→more beautiful→most beautiful' },
          { label: '不规则变化', formula: 'good→better→best; bad→worse→worst; far→farther→farthest', example: 'This is the best film I have seen.' },
          { label: '原级比较', formula: 'as + adj + as', example: 'She is as tall as her sister.' },
        ],
        tips: '以 -e 结尾加 -r/-st（nice→nicer）；辅音+y 结尾，y 变 i 加 -er/-est（happy→happier）；重读闭音节双写加 -er/-est（big→bigger）。',
        traps: [
          { wrong: 'She is more tall than me.', right: 'She is taller than me.', explain: '单音节形容词用 -er，不用 more' },
          { wrong: 'He is the most best player.', right: 'He is the best player.', explain: 'best 本身是最高级，不再加 most' },
        ],
      },
      {
        id: 'gerund_infinitive',
        title: '动名词与不定式',
        level: 'PET',
        summary: '动词后接 to do 还是 doing，取决于动词本身，需要记忆。',
        structure: [
          { label: '只接动名词 V-ing', formula: 'enjoy, finish, mind, avoid, suggest, consider, keep, practice', example: 'I enjoy reading. She finished cooking.' },
          { label: '只接不定式 to do', formula: 'want, hope, decide, plan, agree, refuse, manage, need', example: 'I want to go. She decided to leave.' },
          { label: '两者均可（含义不同）', formula: 'remember/forget/stop/try + doing（过去）/ to do（将来/目的）', example: 'I remember meeting her. Remember to call me.' },
        ],
        tips: 'remember doing = 记得曾经做过；remember to do = 记得要去做。stop doing = 停止做某事；stop to do = 停下来去做另一件事。',
        traps: [
          { wrong: 'I enjoy to play football.', right: 'I enjoy playing football.', explain: 'enjoy 后只能接动名词（-ing）' },
          { wrong: 'She decided going abroad.', right: 'She decided to go abroad.', explain: 'decide 后只能接不定式（to do）' },
        ],
      },
      {
        id: 'prepositions',
        title: '介词',
        level: 'KET',
        summary: '介词表示时间、地点、方式等关系，需要配合固定搭配记忆。',
        structure: [
          { label: '时间介词', formula: 'at（时刻/节日）, on（具体日期/星期）, in（月/年/季节/早中晚）', example: 'at 8 o\'clock, on Monday, in July, in the morning' },
          { label: '地点介词', formula: 'at（小地点/具体位置）, in（大地方/空间内）, on（表面/楼层）', example: 'at school, in China, on the table, on the 3rd floor' },
          { label: '常见固定搭配', formula: 'good at, interested in, afraid of, different from, proud of, used to', example: 'She is good at maths.' },
        ],
        tips: '时间：at night 但 in the morning/afternoon/evening。交通：by car/bus/train（无冠词），on foot，in a car/taxi（有冠词）。',
        traps: [
          { wrong: 'I was born in 1st May.', right: 'I was born on 1st May.', explain: '具体日期用 on，不用 in' },
          { wrong: 'She is good in English.', right: 'She is good at English.', explain: 'be good at 是固定搭配' },
        ],
      },
    ],
  },
]
