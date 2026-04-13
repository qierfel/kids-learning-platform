// 牛津英语（上海版）/ 沪教版英语 单元词汇与句子
// 上海教育出版社，覆盖小学1-5年级上下册
// 结构：每册3个Module，每Module 3-4个Unit
// 音频：可通过新华一城书集（bookmall.com.cn）用提取码下载官方MP3

// ─── 数据结构 ──────────────────────────────────────────────────────────────
// TEXTBOOK_DATA[grade][semester] = [
//   { module: 1, title: 'Module title', units: [
//     { unit: 1, title: 'Unit title', words: [{en, cn}], sentences: [{en, cn}] },
//   ]}
// ]
// ──────────────────────────────────────────────────────────────────────────

export const TEXTBOOK_DATA = {
  1: {
    '上': [
      {
        module: 1,
        title: 'Hello!',
        units: [
          {
            unit: 1, title: 'Hello!',
            words: [
              { en: 'hello', cn: '你好' },
              { en: 'hi', cn: '嗨' },
              { en: 'I', cn: '我' },
              { en: 'am', cn: '是（我）' },
              { en: 'name', cn: '名字' },
            ],
            sentences: [
              { en: 'Hello! I\'m Sam.', cn: '你好！我是山姆。' },
              { en: 'Hi! I\'m Amy.', cn: '嗨！我是艾米。' },
            ],
          },
          {
            unit: 2, title: 'Goodbye!',
            words: [
              { en: 'goodbye', cn: '再见' },
              { en: 'bye', cn: '拜拜（口语）' },
              { en: 'see', cn: '看见' },
              { en: 'you', cn: '你' },
            ],
            sentences: [
              { en: 'Goodbye!', cn: '再见！' },
              { en: 'Bye-bye! See you!', cn: '拜拜！再见！' },
            ],
          },
          {
            unit: 3, title: 'How are you?',
            words: [
              { en: 'how', cn: '怎么，如何' },
              { en: 'are', cn: '是（你/你们）' },
              { en: 'fine', cn: '很好' },
              { en: 'thank', cn: '感谢' },
              { en: 'good', cn: '好的' },
            ],
            sentences: [
              { en: 'How are you?', cn: '你好吗？' },
              { en: 'I\'m fine, thank you.', cn: '我很好，谢谢你。' },
              { en: 'I\'m good.', cn: '我很好。' },
            ],
          },
        ],
      },
      {
        module: 2,
        title: 'My family',
        units: [
          {
            unit: 4, title: 'My family',
            words: [
              { en: 'father', cn: '父亲，爸爸' },
              { en: 'mother', cn: '母亲，妈妈' },
              { en: 'brother', cn: '兄弟' },
              { en: 'sister', cn: '姐妹' },
              { en: 'family', cn: '家庭' },
            ],
            sentences: [
              { en: 'This is my father.', cn: '这是我的父亲。' },
              { en: 'This is my mother.', cn: '这是我的母亲。' },
              { en: 'I love my family.', cn: '我爱我的家人。' },
            ],
          },
          {
            unit: 5, title: 'Colours',
            words: [
              { en: 'red', cn: '红色' },
              { en: 'yellow', cn: '黄色' },
              { en: 'blue', cn: '蓝色' },
              { en: 'green', cn: '绿色' },
              { en: 'white', cn: '白色' },
              { en: 'black', cn: '黑色' },
            ],
            sentences: [
              { en: 'What colour is it?', cn: '它是什么颜色？' },
              { en: 'It\'s red.', cn: '它是红色的。' },
              { en: 'I like blue.', cn: '我喜欢蓝色。' },
            ],
          },
          {
            unit: 6, title: 'Numbers 1–10',
            words: [
              { en: 'one', cn: '一' },
              { en: 'two', cn: '二' },
              { en: 'three', cn: '三' },
              { en: 'four', cn: '四' },
              { en: 'five', cn: '五' },
              { en: 'six', cn: '六' },
              { en: 'seven', cn: '七' },
              { en: 'eight', cn: '八' },
              { en: 'nine', cn: '九' },
              { en: 'ten', cn: '十' },
            ],
            sentences: [
              { en: 'How many?', cn: '多少个？' },
              { en: 'One, two, three!', cn: '一、二、三！' },
            ],
          },
        ],
      },
      {
        module: 3,
        title: 'My school',
        units: [
          {
            unit: 7, title: 'My school things',
            words: [
              { en: 'bag', cn: '书包' },
              { en: 'book', cn: '书' },
              { en: 'pencil', cn: '铅笔' },
              { en: 'pen', cn: '钢笔，圆珠笔' },
              { en: 'ruler', cn: '尺子' },
              { en: 'eraser', cn: '橡皮' },
            ],
            sentences: [
              { en: 'This is my book.', cn: '这是我的书。' },
              { en: 'Open your bag.', cn: '打开你的书包。' },
            ],
          },
          {
            unit: 8, title: 'My classroom',
            words: [
              { en: 'desk', cn: '课桌' },
              { en: 'chair', cn: '椅子' },
              { en: 'blackboard', cn: '黑板' },
              { en: 'window', cn: '窗户' },
              { en: 'door', cn: '门' },
            ],
            sentences: [
              { en: 'This is my desk.', cn: '这是我的课桌。' },
              { en: 'Open the window, please.', cn: '请打开窗户。' },
            ],
          },
          {
            unit: 9, title: 'My friends',
            words: [
              { en: 'friend', cn: '朋友' },
              { en: 'boy', cn: '男孩' },
              { en: 'girl', cn: '女孩' },
              { en: 'he', cn: '他' },
              { en: 'she', cn: '她' },
              { en: 'my', cn: '我的' },
            ],
            sentences: [
              { en: 'This is my friend.', cn: '这是我的朋友。' },
              { en: 'He is a boy.', cn: '他是一个男孩。' },
              { en: 'She is a girl.', cn: '她是一个女孩。' },
            ],
          },
        ],
      },
    ],
    '下': [
      {
        module: 1,
        title: 'Animals',
        units: [
          {
            unit: 1, title: 'Animals',
            words: [
              { en: 'dog', cn: '狗' },
              { en: 'cat', cn: '猫' },
              { en: 'bird', cn: '鸟' },
              { en: 'fish', cn: '鱼' },
              { en: 'rabbit', cn: '兔子' },
              { en: 'animal', cn: '动物' },
            ],
            sentences: [
              { en: 'I like dogs.', cn: '我喜欢狗。' },
              { en: 'Look at the cat!', cn: '看那只猫！' },
              { en: 'It\'s a bird.', cn: '它是一只鸟。' },
            ],
          },
          {
            unit: 2, title: 'My body',
            words: [
              { en: 'head', cn: '头' },
              { en: 'eye', cn: '眼睛' },
              { en: 'ear', cn: '耳朵' },
              { en: 'nose', cn: '鼻子' },
              { en: 'mouth', cn: '嘴巴' },
              { en: 'hand', cn: '手' },
            ],
            sentences: [
              { en: 'I have two eyes.', cn: '我有两只眼睛。' },
              { en: 'Touch your nose.', cn: '摸摸你的鼻子。' },
            ],
          },
          {
            unit: 3, title: 'Food',
            words: [
              { en: 'rice', cn: '米饭' },
              { en: 'bread', cn: '面包' },
              { en: 'milk', cn: '牛奶' },
              { en: 'water', cn: '水' },
              { en: 'apple', cn: '苹果' },
              { en: 'egg', cn: '鸡蛋' },
            ],
            sentences: [
              { en: 'I like rice.', cn: '我喜欢米饭。' },
              { en: 'Do you like milk?', cn: '你喜欢牛奶吗？' },
              { en: 'Yes, I do.', cn: '是的，我喜欢。' },
            ],
          },
        ],
      },
      {
        module: 2,
        title: 'My home',
        units: [
          {
            unit: 4, title: 'My home',
            words: [
              { en: 'home', cn: '家' },
              { en: 'room', cn: '房间' },
              { en: 'table', cn: '桌子' },
              { en: 'bed', cn: '床' },
              { en: 'sofa', cn: '沙发' },
              { en: 'kitchen', cn: '厨房' },
            ],
            sentences: [
              { en: 'Welcome to my home.', cn: '欢迎来我家。' },
              { en: 'This is my room.', cn: '这是我的房间。' },
            ],
          },
          {
            unit: 5, title: 'Clothes',
            words: [
              { en: 'coat', cn: '外套' },
              { en: 'shirt', cn: '衬衫' },
              { en: 'dress', cn: '连衣裙' },
              { en: 'shoes', cn: '鞋子' },
              { en: 'hat', cn: '帽子' },
              { en: 'socks', cn: '袜子' },
            ],
            sentences: [
              { en: 'I like this coat.', cn: '我喜欢这件外套。' },
              { en: 'Put on your shoes.', cn: '穿上你的鞋子。' },
            ],
          },
          {
            unit: 6, title: 'Shapes and numbers',
            words: [
              { en: 'circle', cn: '圆形' },
              { en: 'square', cn: '正方形' },
              { en: 'triangle', cn: '三角形' },
              { en: 'eleven', cn: '十一' },
              { en: 'twelve', cn: '十二' },
              { en: 'twenty', cn: '二十' },
            ],
            sentences: [
              { en: 'It\'s a circle.', cn: '这是一个圆形。' },
              { en: 'I can count to twenty.', cn: '我能数到二十。' },
            ],
          },
        ],
      },
      {
        module: 3,
        title: 'My day',
        units: [
          {
            unit: 7, title: 'My day',
            words: [
              { en: 'morning', cn: '早上' },
              { en: 'afternoon', cn: '下午' },
              { en: 'evening', cn: '晚上' },
              { en: 'get up', cn: '起床' },
              { en: 'go to school', cn: '去上学' },
              { en: 'eat', cn: '吃' },
            ],
            sentences: [
              { en: 'Good morning!', cn: '早上好！' },
              { en: 'I get up in the morning.', cn: '我早上起床。' },
            ],
          },
          {
            unit: 8, title: 'Toys',
            words: [
              { en: 'toy', cn: '玩具' },
              { en: 'ball', cn: '球' },
              { en: 'doll', cn: '玩具娃娃' },
              { en: 'car', cn: '小汽车' },
              { en: 'plane', cn: '飞机' },
              { en: 'train', cn: '火车' },
            ],
            sentences: [
              { en: 'I have a toy car.', cn: '我有一辆玩具汽车。' },
              { en: 'Can I play with your ball?', cn: '我可以玩你的球吗？' },
            ],
          },
          {
            unit: 9, title: 'The park',
            words: [
              { en: 'park', cn: '公园' },
              { en: 'tree', cn: '树' },
              { en: 'flower', cn: '花' },
              { en: 'sun', cn: '太阳' },
              { en: 'run', cn: '跑' },
              { en: 'play', cn: '玩耍' },
            ],
            sentences: [
              { en: 'Let\'s go to the park.', cn: '我们去公园吧。' },
              { en: 'I can run and jump.', cn: '我能跑和跳。' },
            ],
          },
        ],
      },
    ],
  },

  2: {
    '上': [
      {
        module: 1,
        title: 'My school',
        units: [
          {
            unit: 1, title: 'At school',
            words: [
              { en: 'teacher', cn: '老师' },
              { en: 'student', cn: '学生' },
              { en: 'class', cn: '班级，课' },
              { en: 'read', cn: '阅读' },
              { en: 'write', cn: '写' },
              { en: 'listen', cn: '听' },
            ],
            sentences: [
              { en: 'I go to school every day.', cn: '我每天去上学。' },
              { en: 'Listen and read.', cn: '听，然后读。' },
              { en: 'My teacher is kind.', cn: '我的老师很亲切。' },
            ],
          },
          {
            unit: 2, title: 'My school subjects',
            words: [
              { en: 'Chinese', cn: '语文，中文' },
              { en: 'maths', cn: '数学' },
              { en: 'English', cn: '英语' },
              { en: 'PE', cn: '体育' },
              { en: 'art', cn: '美术' },
              { en: 'music', cn: '音乐' },
            ],
            sentences: [
              { en: 'I like English.', cn: '我喜欢英语。' },
              { en: 'Maths is fun.', cn: '数学很有趣。' },
              { en: 'What subject do you like?', cn: '你喜欢什么科目？' },
            ],
          },
          {
            unit: 3, title: 'School activities',
            words: [
              { en: 'draw', cn: '画' },
              { en: 'sing', cn: '唱歌' },
              { en: 'dance', cn: '跳舞' },
              { en: 'swim', cn: '游泳' },
              { en: 'jump', cn: '跳' },
              { en: 'ride', cn: '骑' },
            ],
            sentences: [
              { en: 'I can draw.', cn: '我会画画。' },
              { en: 'Can you sing?', cn: '你会唱歌吗？' },
              { en: 'Yes, I can. / No, I can\'t.', cn: '是的，我会。/ 不，我不会。' },
            ],
          },
        ],
      },
      {
        module: 2,
        title: 'My community',
        units: [
          {
            unit: 4, title: 'Places in the community',
            words: [
              { en: 'shop', cn: '商店' },
              { en: 'hospital', cn: '医院' },
              { en: 'library', cn: '图书馆' },
              { en: 'park', cn: '公园' },
              { en: 'school', cn: '学校' },
              { en: 'supermarket', cn: '超市' },
            ],
            sentences: [
              { en: 'Where are you going?', cn: '你去哪里？' },
              { en: 'I\'m going to the library.', cn: '我去图书馆。' },
            ],
          },
          {
            unit: 5, title: 'Shops and food',
            words: [
              { en: 'buy', cn: '买' },
              { en: 'sell', cn: '卖' },
              { en: 'cake', cn: '蛋糕' },
              { en: 'juice', cn: '果汁' },
              { en: 'noodles', cn: '面条' },
              { en: 'price', cn: '价格' },
            ],
            sentences: [
              { en: 'I want to buy some juice.', cn: '我想买一些果汁。' },
              { en: 'How much is it?', cn: '多少钱？' },
              { en: 'It\'s five yuan.', cn: '五元钱。' },
            ],
          },
          {
            unit: 6, title: 'Days of the week',
            words: [
              { en: 'Monday', cn: '星期一' },
              { en: 'Tuesday', cn: '星期二' },
              { en: 'Wednesday', cn: '星期三' },
              { en: 'Thursday', cn: '星期四' },
              { en: 'Friday', cn: '星期五' },
              { en: 'Saturday', cn: '星期六' },
              { en: 'Sunday', cn: '星期日' },
            ],
            sentences: [
              { en: 'What day is it today?', cn: '今天是星期几？' },
              { en: 'Today is Monday.', cn: '今天是星期一。' },
              { en: 'I go to school on Monday.', cn: '我星期一上学。' },
            ],
          },
        ],
      },
      {
        module: 3,
        title: 'Nature',
        units: [
          {
            unit: 7, title: 'Weather',
            words: [
              { en: 'sunny', cn: '晴天的' },
              { en: 'cloudy', cn: '多云的' },
              { en: 'rainy', cn: '下雨的' },
              { en: 'windy', cn: '有风的' },
              { en: 'hot', cn: '热的' },
              { en: 'cold', cn: '冷的' },
            ],
            sentences: [
              { en: 'What\'s the weather like today?', cn: '今天天气怎么样？' },
              { en: 'It\'s sunny today.', cn: '今天是晴天。' },
              { en: 'Take your umbrella. It\'s rainy.', cn: '带上雨伞，在下雨。' },
            ],
          },
          {
            unit: 8, title: 'Seasons',
            words: [
              { en: 'spring', cn: '春天' },
              { en: 'summer', cn: '夏天' },
              { en: 'autumn', cn: '秋天' },
              { en: 'winter', cn: '冬天' },
              { en: 'season', cn: '季节' },
              { en: 'warm', cn: '温暖的' },
            ],
            sentences: [
              { en: 'What season is it?', cn: '现在是什么季节？' },
              { en: 'Spring is warm and beautiful.', cn: '春天温暖美丽。' },
              { en: 'I like summer.', cn: '我喜欢夏天。' },
            ],
          },
          {
            unit: 9, title: 'Animals in nature',
            words: [
              { en: 'elephant', cn: '大象' },
              { en: 'tiger', cn: '老虎' },
              { en: 'monkey', cn: '猴子' },
              { en: 'panda', cn: '熊猫' },
              { en: 'lion', cn: '狮子' },
              { en: 'giraffe', cn: '长颈鹿' },
            ],
            sentences: [
              { en: 'Pandas are black and white.', cn: '大熊猫是黑白色的。' },
              { en: 'Elephants are big.', cn: '大象很大。' },
              { en: 'I love animals.', cn: '我爱动物。' },
            ],
          },
        ],
      },
    ],
    '下': [
      {
        module: 1,
        title: 'My daily life',
        units: [
          {
            unit: 1, title: 'Daily routines',
            words: [
              { en: 'wake up', cn: '醒来' },
              { en: 'brush teeth', cn: '刷牙' },
              { en: 'have breakfast', cn: '吃早饭' },
              { en: 'go to bed', cn: '上床睡觉' },
              { en: 'do homework', cn: '做作业' },
              { en: 'watch TV', cn: '看电视' },
            ],
            sentences: [
              { en: 'I wake up at seven.', cn: '我七点钟醒来。' },
              { en: 'I brush my teeth every morning.', cn: '我每天早上刷牙。' },
              { en: 'Do you do your homework?', cn: '你做作业吗？' },
            ],
          },
          {
            unit: 2, title: 'Telling the time',
            words: [
              { en: 'o\'clock', cn: '……点钟' },
              { en: 'half', cn: '半，一半' },
              { en: 'quarter', cn: '一刻钟，四分之一' },
              { en: 'minute', cn: '分钟' },
              { en: 'time', cn: '时间' },
              { en: 'clock', cn: '时钟' },
            ],
            sentences: [
              { en: 'What time is it?', cn: '现在几点了？' },
              { en: 'It\'s seven o\'clock.', cn: '现在是七点。' },
              { en: 'It\'s half past eight.', cn: '现在是八点半。' },
            ],
          },
          {
            unit: 3, title: 'Sports and hobbies',
            words: [
              { en: 'football', cn: '足球' },
              { en: 'basketball', cn: '篮球' },
              { en: 'tennis', cn: '网球' },
              { en: 'hobby', cn: '爱好' },
              { en: 'collect', cn: '收集' },
              { en: 'stamp', cn: '邮票' },
            ],
            sentences: [
              { en: 'I like playing football.', cn: '我喜欢踢足球。' },
              { en: 'My hobby is collecting stamps.', cn: '我的爱好是集邮。' },
              { en: 'Can you play basketball?', cn: '你会打篮球吗？' },
            ],
          },
        ],
      },
      {
        module: 2,
        title: 'Festivals',
        units: [
          {
            unit: 4, title: 'Chinese New Year',
            words: [
              { en: 'festival', cn: '节日' },
              { en: 'fireworks', cn: '烟花' },
              { en: 'dumplings', cn: '饺子' },
              { en: 'lantern', cn: '灯笼' },
              { en: 'lucky money', cn: '压岁钱' },
              { en: 'celebrate', cn: '庆祝' },
            ],
            sentences: [
              { en: 'Happy New Year!', cn: '新年快乐！' },
              { en: 'We eat dumplings at New Year.', cn: '我们过年吃饺子。' },
              { en: 'I like watching fireworks.', cn: '我喜欢看烟花。' },
            ],
          },
          {
            unit: 5, title: 'Birthdays',
            words: [
              { en: 'birthday', cn: '生日' },
              { en: 'candle', cn: '蜡烛' },
              { en: 'present', cn: '礼物；现在' },
              { en: 'party', cn: '派对，聚会' },
              { en: 'blow', cn: '吹' },
              { en: 'wish', cn: '祝愿，心愿' },
            ],
            sentences: [
              { en: 'Happy birthday!', cn: '生日快乐！' },
              { en: 'How old are you?', cn: '你几岁了？' },
              { en: 'I\'m eight years old.', cn: '我八岁了。' },
              { en: 'Make a wish!', cn: '许个愿望！' },
            ],
          },
          {
            unit: 6, title: 'Christmas',
            words: [
              { en: 'Christmas', cn: '圣诞节' },
              { en: 'Santa Claus', cn: '圣诞老人' },
              { en: 'stocking', cn: '长筒袜' },
              { en: 'Christmas tree', cn: '圣诞树' },
              { en: 'gift', cn: '礼物' },
              { en: 'snow', cn: '雪，下雪' },
            ],
            sentences: [
              { en: 'Merry Christmas!', cn: '圣诞快乐！' },
              { en: 'Santa Claus brings gifts.', cn: '圣诞老人送礼物。' },
              { en: 'I like Christmas.', cn: '我喜欢圣诞节。' },
            ],
          },
        ],
      },
      {
        module: 3,
        title: 'Our world',
        units: [
          {
            unit: 7, title: 'Countries and cities',
            words: [
              { en: 'China', cn: '中国' },
              { en: 'Shanghai', cn: '上海' },
              { en: 'Beijing', cn: '北京' },
              { en: 'England', cn: '英格兰' },
              { en: 'London', cn: '伦敦' },
              { en: 'country', cn: '国家' },
            ],
            sentences: [
              { en: 'I live in Shanghai, China.', cn: '我住在中国上海。' },
              { en: 'London is in England.', cn: '伦敦在英格兰。' },
            ],
          },
          {
            unit: 8, title: 'Transport',
            words: [
              { en: 'bus', cn: '公共汽车' },
              { en: 'train', cn: '火车' },
              { en: 'plane', cn: '飞机' },
              { en: 'ship', cn: '轮船' },
              { en: 'bike', cn: '自行车' },
              { en: 'car', cn: '汽车' },
            ],
            sentences: [
              { en: 'I go to school by bus.', cn: '我乘公共汽车去上学。' },
              { en: 'Can we go by train?', cn: '我们可以坐火车去吗？' },
            ],
          },
          {
            unit: 9, title: 'The environment',
            words: [
              { en: 'clean', cn: '干净的；打扫' },
              { en: 'dirty', cn: '脏的' },
              { en: 'tree', cn: '树' },
              { en: 'river', cn: '河流' },
              { en: 'recycle', cn: '回收' },
              { en: 'protect', cn: '保护' },
            ],
            sentences: [
              { en: 'Keep our school clean.', cn: '保持我们的学校干净。' },
              { en: 'We must protect trees.', cn: '我们必须保护树木。' },
            ],
          },
        ],
      },
    ],
  },

  3: {
    '上': [
      {
        module: 1,
        title: 'Hello again!',
        units: [
          {
            unit: 1, title: 'A new term',
            words: [
              { en: 'term', cn: '学期' },
              { en: 'new', cn: '新的' },
              { en: 'classmate', cn: '同班同学' },
              { en: 'grade', cn: '年级' },
              { en: 'introduce', cn: '介绍' },
              { en: 'welcome', cn: '欢迎' },
            ],
            sentences: [
              { en: 'Welcome back to school!', cn: '欢迎回到学校！' },
              { en: 'Nice to see you again.', cn: '很高兴再次见到你。' },
              { en: 'I\'m in Grade Three now.', cn: '我现在在三年级了。' },
            ],
          },
          {
            unit: 2, title: 'Describing people',
            words: [
              { en: 'tall', cn: '高的' },
              { en: 'short', cn: '矮的' },
              { en: 'thin', cn: '瘦的' },
              { en: 'fat', cn: '胖的' },
              { en: 'long', cn: '长的' },
              { en: 'curly', cn: '卷曲的' },
            ],
            sentences: [
              { en: 'She has long hair.', cn: '她有长头发。' },
              { en: 'He is tall and thin.', cn: '他又高又瘦。' },
              { en: 'What does she look like?', cn: '她长什么样？' },
            ],
          },
          {
            unit: 3, title: 'Feelings',
            words: [
              { en: 'happy', cn: '快乐的' },
              { en: 'sad', cn: '悲伤的' },
              { en: 'angry', cn: '生气的' },
              { en: 'tired', cn: '疲倦的' },
              { en: 'hungry', cn: '饥饿的' },
              { en: 'thirsty', cn: '口渴的' },
            ],
            sentences: [
              { en: 'How do you feel?', cn: '你感觉怎么样？' },
              { en: 'I feel happy today.', cn: '我今天感觉很开心。' },
              { en: 'She looks sad.', cn: '她看起来很伤心。' },
            ],
          },
        ],
      },
      {
        module: 2,
        title: 'My home and neighbourhood',
        units: [
          {
            unit: 4, title: 'My neighbourhood',
            words: [
              { en: 'neighbourhood', cn: '邻近地区，社区' },
              { en: 'post office', cn: '邮局' },
              { en: 'bank', cn: '银行' },
              { en: 'restaurant', cn: '餐厅' },
              { en: 'bookshop', cn: '书店' },
              { en: 'chemist', cn: '药店' },
            ],
            sentences: [
              { en: 'Is there a post office near here?', cn: '这附近有邮局吗？' },
              { en: 'Yes, there is. / No, there isn\'t.', cn: '是的，有。/ 不，没有。' },
              { en: 'Turn left at the bank.', cn: '在银行那里左转。' },
            ],
          },
          {
            unit: 5, title: 'My house',
            words: [
              { en: 'living room', cn: '客厅' },
              { en: 'bedroom', cn: '卧室' },
              { en: 'bathroom', cn: '浴室' },
              { en: 'study', cn: '书房' },
              { en: 'upstairs', cn: '楼上' },
              { en: 'downstairs', cn: '楼下' },
            ],
            sentences: [
              { en: 'My bedroom is upstairs.', cn: '我的卧室在楼上。' },
              { en: 'The kitchen is downstairs.', cn: '厨房在楼下。' },
              { en: 'There are three bedrooms in my house.', cn: '我家有三间卧室。' },
            ],
          },
          {
            unit: 6, title: 'Furniture and household objects',
            words: [
              { en: 'curtain', cn: '窗帘' },
              { en: 'lamp', cn: '台灯' },
              { en: 'fridge', cn: '冰箱' },
              { en: 'washing machine', cn: '洗衣机' },
              { en: 'mirror', cn: '镜子' },
              { en: 'wardrobe', cn: '衣柜' },
            ],
            sentences: [
              { en: 'There is a fridge in the kitchen.', cn: '厨房里有一台冰箱。' },
              { en: 'The lamp is on the desk.', cn: '台灯在书桌上。' },
            ],
          },
        ],
      },
      {
        module: 3,
        title: 'Food and health',
        units: [
          {
            unit: 7, title: 'Healthy food',
            words: [
              { en: 'vegetable', cn: '蔬菜' },
              { en: 'fruit', cn: '水果' },
              { en: 'protein', cn: '蛋白质' },
              { en: 'carrot', cn: '胡萝卜' },
              { en: 'tomato', cn: '西红柿' },
              { en: 'spinach', cn: '菠菜' },
            ],
            sentences: [
              { en: 'Eat more vegetables and fruit.', cn: '多吃蔬菜和水果。' },
              { en: 'Carrots are good for your eyes.', cn: '胡萝卜对眼睛有益。' },
            ],
          },
          {
            unit: 8, title: 'At the restaurant',
            words: [
              { en: 'menu', cn: '菜单' },
              { en: 'order', cn: '点餐，订购' },
              { en: 'soup', cn: '汤' },
              { en: 'dessert', cn: '甜点' },
              { en: 'delicious', cn: '美味的' },
              { en: 'waiter', cn: '服务员（男）' },
            ],
            sentences: [
              { en: 'Can I see the menu, please?', cn: '请给我看看菜单，好吗？' },
              { en: 'I\'d like some soup, please.', cn: '我想要一些汤，谢谢。' },
              { en: 'This is delicious!', cn: '这太好吃了！' },
            ],
          },
          {
            unit: 9, title: 'Good habits',
            words: [
              { en: 'habit', cn: '习惯' },
              { en: 'healthy', cn: '健康的' },
              { en: 'exercise', cn: '锻炼' },
              { en: 'sleep', cn: '睡眠，睡觉' },
              { en: 'wash', cn: '洗' },
              { en: 'regularly', cn: '有规律地' },
            ],
            sentences: [
              { en: 'Exercise every day.', cn: '每天锻炼。' },
              { en: 'Go to bed early.', cn: '早点睡觉。' },
              { en: 'Wash your hands before meals.', cn: '饭前洗手。' },
            ],
          },
        ],
      },
    ],
    '下': [
      {
        module: 1,
        title: 'Travel and places',
        units: [
          {
            unit: 1, title: 'Going places',
            words: [
              { en: 'station', cn: '车站' },
              { en: 'airport', cn: '机场' },
              { en: 'ticket', cn: '票' },
              { en: 'luggage', cn: '行李' },
              { en: 'journey', cn: '旅程' },
              { en: 'arrive', cn: '到达' },
            ],
            sentences: [
              { en: 'We are going on a journey.', cn: '我们要去旅行了。' },
              { en: 'The train arrives at nine o\'clock.', cn: '火车九点到达。' },
              { en: 'Don\'t forget your ticket.', cn: '别忘了你的票。' },
            ],
          },
          {
            unit: 2, title: 'Famous places',
            words: [
              { en: 'the Great Wall', cn: '长城' },
              { en: 'the Palace Museum', cn: '故宫' },
              { en: 'famous', cn: '著名的' },
              { en: 'ancient', cn: '古代的' },
              { en: 'visit', cn: '参观，拜访' },
              { en: 'tourist', cn: '游客' },
            ],
            sentences: [
              { en: 'The Great Wall is very long.', cn: '长城非常长。' },
              { en: 'I want to visit the Palace Museum.', cn: '我想参观故宫。' },
            ],
          },
          {
            unit: 3, title: 'Asking for directions',
            words: [
              { en: 'excuse me', cn: '打扰一下' },
              { en: 'straight', cn: '笔直的，直走' },
              { en: 'turn left', cn: '左转' },
              { en: 'turn right', cn: '右转' },
              { en: 'crossroads', cn: '十字路口' },
              { en: 'traffic lights', cn: '红绿灯' },
            ],
            sentences: [
              { en: 'Excuse me, where is the station?', cn: '打扰一下，车站在哪里？' },
              { en: 'Go straight on and turn left.', cn: '直走然后左转。' },
              { en: 'It\'s about five minutes on foot.', cn: '步行大约五分钟。' },
            ],
          },
        ],
      },
      {
        module: 2,
        title: 'Science and nature',
        units: [
          {
            unit: 4, title: 'Plants',
            words: [
              { en: 'seed', cn: '种子' },
              { en: 'root', cn: '根' },
              { en: 'stem', cn: '茎' },
              { en: 'leaf', cn: '叶子（单数）' },
              { en: 'grow', cn: '生长' },
              { en: 'sunlight', cn: '阳光' },
            ],
            sentences: [
              { en: 'Plants need water and sunlight.', cn: '植物需要水和阳光。' },
              { en: 'Seeds grow into plants.', cn: '种子长成植物。' },
            ],
          },
          {
            unit: 5, title: 'The solar system',
            words: [
              { en: 'sun', cn: '太阳' },
              { en: 'moon', cn: '月亮' },
              { en: 'star', cn: '星星' },
              { en: 'planet', cn: '行星' },
              { en: 'Earth', cn: '地球' },
              { en: 'space', cn: '太空，宇宙' },
            ],
            sentences: [
              { en: 'The Earth moves around the Sun.', cn: '地球绕着太阳转。' },
              { en: 'There are eight planets.', cn: '有八颗行星。' },
              { en: 'I dream of travelling in space.', cn: '我梦想在太空旅行。' },
            ],
          },
          {
            unit: 6, title: 'Materials',
            words: [
              { en: 'wood', cn: '木头，木材' },
              { en: 'metal', cn: '金属' },
              { en: 'plastic', cn: '塑料' },
              { en: 'glass', cn: '玻璃' },
              { en: 'hard', cn: '硬的' },
              { en: 'soft', cn: '软的' },
            ],
            sentences: [
              { en: 'This table is made of wood.', cn: '这张桌子是木头做的。' },
              { en: 'Metal is hard.', cn: '金属是硬的。' },
              { en: 'What is this made of?', cn: '这是用什么做的？' },
            ],
          },
        ],
      },
      {
        module: 3,
        title: 'Stories and culture',
        units: [
          {
            unit: 7, title: 'Fairy tales',
            words: [
              { en: 'fairy tale', cn: '童话故事' },
              { en: 'once upon a time', cn: '从前' },
              { en: 'princess', cn: '公主' },
              { en: 'prince', cn: '王子' },
              { en: 'castle', cn: '城堡' },
              { en: 'magic', cn: '魔法' },
            ],
            sentences: [
              { en: 'Once upon a time, there was a princess.', cn: '从前，有一位公主。' },
              { en: 'They lived happily ever after.', cn: '他们从此幸福地生活在一起。' },
            ],
          },
          {
            unit: 8, title: 'Chinese culture',
            words: [
              { en: 'dragon', cn: '龙' },
              { en: 'chopsticks', cn: '筷子' },
              { en: 'Kung Fu', cn: '功夫' },
              { en: 'calligraphy', cn: '书法' },
              { en: 'opera', cn: '戏剧，歌剧' },
              { en: 'tradition', cn: '传统' },
            ],
            sentences: [
              { en: 'The dragon is a symbol of China.', cn: '龙是中国的象征。' },
              { en: 'I like Chinese calligraphy.', cn: '我喜欢中国书法。' },
            ],
          },
          {
            unit: 9, title: 'Around the world',
            words: [
              { en: 'pyramid', cn: '金字塔' },
              { en: 'Eiffel Tower', cn: '埃菲尔铁塔' },
              { en: 'continent', cn: '大洲' },
              { en: 'ocean', cn: '海洋' },
              { en: 'culture', cn: '文化' },
              { en: 'language', cn: '语言' },
            ],
            sentences: [
              { en: 'There are seven continents.', cn: '有七大洲。' },
              { en: 'People speak different languages.', cn: '人们说不同的语言。' },
            ],
          },
        ],
      },
    ],
  },

  4: {
    '上': [
      {
        module: 1,
        title: 'School life',
        units: [
          {
            unit: 1, title: 'School rules',
            words: [
              { en: 'rule', cn: '规则' },
              { en: 'must', cn: '必须' },
              { en: 'mustn\'t', cn: '禁止，不能' },
              { en: 'on time', cn: '准时' },
              { en: 'tidy', cn: '整洁的' },
              { en: 'respect', cn: '尊重' },
            ],
            sentences: [
              { en: 'We must be on time for school.', cn: '我们上学必须准时。' },
              { en: 'You mustn\'t run in the corridor.', cn: '你不能在走廊里跑步。' },
              { en: 'Respect your teachers.', cn: '尊重你的老师。' },
            ],
          },
          {
            unit: 2, title: 'School clubs',
            words: [
              { en: 'club', cn: '俱乐部，社团' },
              { en: 'drama', cn: '戏剧' },
              { en: 'chess', cn: '国际象棋' },
              { en: 'science', cn: '科学' },
              { en: 'join', cn: '加入' },
              { en: 'member', cn: '成员' },
            ],
            sentences: [
              { en: 'I am in the drama club.', cn: '我在戏剧社团。' },
              { en: 'Would you like to join our club?', cn: '你想加入我们的社团吗？' },
              { en: 'The chess club meets on Fridays.', cn: '象棋社团在星期五举行。' },
            ],
          },
          {
            unit: 3, title: 'Comparing things',
            words: [
              { en: 'bigger', cn: '更大的' },
              { en: 'smaller', cn: '更小的' },
              { en: 'taller', cn: '更高的' },
              { en: 'faster', cn: '更快的' },
              { en: 'heavier', cn: '更重的' },
              { en: 'compare', cn: '比较' },
            ],
            sentences: [
              { en: 'An elephant is bigger than a dog.', cn: '大象比狗大。' },
              { en: 'She is taller than me.', cn: '她比我高。' },
              { en: 'Which is faster, a train or a bus?', cn: '火车和公共汽车哪个更快？' },
            ],
          },
        ],
      },
      {
        module: 2,
        title: 'Past and present',
        units: [
          {
            unit: 4, title: 'Talking about the past',
            words: [
              { en: 'yesterday', cn: '昨天' },
              { en: 'last week', cn: '上个星期' },
              { en: 'went', cn: '去（go的过去式）' },
              { en: 'saw', cn: '看见（see的过去式）' },
              { en: 'had', cn: '有（have的过去式）' },
              { en: 'ago', cn: '……以前' },
            ],
            sentences: [
              { en: 'I went to the zoo yesterday.', cn: '我昨天去了动物园。' },
              { en: 'She saw a film last week.', cn: '她上周看了一部电影。' },
              { en: 'We had a great time.', cn: '我们玩得很开心。' },
            ],
          },
          {
            unit: 5, title: 'History',
            words: [
              { en: 'long ago', cn: '很久以前' },
              { en: 'emperor', cn: '皇帝' },
              { en: 'palace', cn: '宫殿' },
              { en: 'built', cn: '建造（build的过去式）' },
              { en: 'century', cn: '世纪' },
              { en: 'historical', cn: '历史的' },
            ],
            sentences: [
              { en: 'Long ago, there were emperors in China.', cn: '很久以前，中国有皇帝。' },
              { en: 'The Great Wall was built many centuries ago.', cn: '长城是在许多个世纪前建造的。' },
            ],
          },
          {
            unit: 6, title: 'Changes',
            words: [
              { en: 'change', cn: '改变' },
              { en: 'modern', cn: '现代的' },
              { en: 'technology', cn: '技术，科技' },
              { en: 'invention', cn: '发明' },
              { en: 'used to', cn: '过去常常' },
              { en: 'nowadays', cn: '现如今' },
            ],
            sentences: [
              { en: 'Technology has changed our lives.', cn: '科技改变了我们的生活。' },
              { en: 'People used to travel by horse.', cn: '人们过去骑马出行。' },
              { en: 'Nowadays, we use mobile phones.', cn: '现在，我们使用手机。' },
            ],
          },
        ],
      },
      {
        module: 3,
        title: 'The natural world',
        units: [
          {
            unit: 7, title: 'Wild animals',
            words: [
              { en: 'endangered', cn: '濒危的' },
              { en: 'extinct', cn: '灭绝的' },
              { en: 'habitat', cn: '栖息地' },
              { en: 'protect', cn: '保护' },
              { en: 'illegal', cn: '违法的' },
              { en: 'hunting', cn: '打猎' },
            ],
            sentences: [
              { en: 'Many wild animals are endangered.', cn: '许多野生动物濒临灭绝。' },
              { en: 'We must protect their habitats.', cn: '我们必须保护它们的栖息地。' },
              { en: 'Hunting wild animals is illegal.', cn: '猎杀野生动物是违法的。' },
            ],
          },
          {
            unit: 8, title: 'The weather and climate',
            words: [
              { en: 'temperature', cn: '温度，气温' },
              { en: 'flood', cn: '洪水' },
              { en: 'drought', cn: '干旱' },
              { en: 'typhoon', cn: '台风' },
              { en: 'climate', cn: '气候' },
              { en: 'global warming', cn: '全球变暖' },
            ],
            sentences: [
              { en: 'The temperature is rising.', cn: '气温正在上升。' },
              { en: 'Global warming causes many problems.', cn: '全球变暖导致了很多问题。' },
            ],
          },
          {
            unit: 9, title: 'Caring for the environment',
            words: [
              { en: 'pollution', cn: '污染' },
              { en: 'reduce', cn: '减少' },
              { en: 'reuse', cn: '重复使用' },
              { en: 'recycle', cn: '回收利用' },
              { en: 'rubbish', cn: '垃圾' },
              { en: 'energy', cn: '能源' },
            ],
            sentences: [
              { en: 'Reduce, reuse and recycle.', cn: '减少、重复使用和回收。' },
              { en: 'Don\'t throw rubbish anywhere.', cn: '不要随地扔垃圾。' },
              { en: 'Save energy every day.', cn: '每天节约能源。' },
            ],
          },
        ],
      },
    ],
    '下': [
      {
        module: 1,
        title: 'Communication',
        units: [
          {
            unit: 1, title: 'Ways of communicating',
            words: [
              { en: 'communicate', cn: '交流，沟通' },
              { en: 'message', cn: '信息，消息' },
              { en: 'email', cn: '电子邮件' },
              { en: 'text', cn: '短信；文字' },
              { en: 'video call', cn: '视频通话' },
              { en: 'social media', cn: '社交媒体' },
            ],
            sentences: [
              { en: 'I send emails to my friends.', cn: '我给朋友们发电子邮件。' },
              { en: 'We can video call our family.', cn: '我们可以和家人视频通话。' },
            ],
          },
          {
            unit: 2, title: 'Writing letters',
            words: [
              { en: 'pen pal', cn: '笔友' },
              { en: 'address', cn: '地址' },
              { en: 'postcard', cn: '明信片' },
              { en: 'envelope', cn: '信封' },
              { en: 'stamp', cn: '邮票' },
              { en: 'reply', cn: '回复' },
            ],
            sentences: [
              { en: 'I have a pen pal in Australia.', cn: '我有一个在澳大利亚的笔友。' },
              { en: 'Write your address on the envelope.', cn: '把你的地址写在信封上。' },
            ],
          },
          {
            unit: 3, title: 'Giving opinions',
            words: [
              { en: 'opinion', cn: '意见，观点' },
              { en: 'think', cn: '认为，想' },
              { en: 'agree', cn: '同意' },
              { en: 'disagree', cn: '不同意' },
              { en: 'important', cn: '重要的' },
              { en: 'reason', cn: '原因，理由' },
            ],
            sentences: [
              { en: 'In my opinion, reading is important.', cn: '在我看来，阅读很重要。' },
              { en: 'I think we should recycle more.', cn: '我认为我们应该多回收。' },
              { en: 'Do you agree?', cn: '你同意吗？' },
            ],
          },
        ],
      },
      {
        module: 2,
        title: 'Health and fitness',
        units: [
          {
            unit: 4, title: 'At the doctor\'s',
            words: [
              { en: 'symptom', cn: '症状' },
              { en: 'fever', cn: '发烧' },
              { en: 'cough', cn: '咳嗽' },
              { en: 'medicine', cn: '药' },
              { en: 'prescription', cn: '处方' },
              { en: 'recover', cn: '恢复，康复' },
            ],
            sentences: [
              { en: 'What are your symptoms?', cn: '你有什么症状？' },
              { en: 'I have a fever and a cough.', cn: '我发烧而且在咳嗽。' },
              { en: 'Take this medicine twice a day.', cn: '这个药一天服两次。' },
            ],
          },
          {
            unit: 5, title: 'Sports and fitness',
            words: [
              { en: 'fitness', cn: '健康，体能' },
              { en: 'muscle', cn: '肌肉' },
              { en: 'strength', cn: '力量' },
              { en: 'marathon', cn: '马拉松' },
              { en: 'champion', cn: '冠军' },
              { en: 'train', cn: '训练' },
            ],
            sentences: [
              { en: 'Regular exercise keeps you fit.', cn: '定期锻炼使你保持健康。' },
              { en: 'She trains every day to be a champion.', cn: '她每天训练，立志成为冠军。' },
            ],
          },
          {
            unit: 6, title: 'Food and nutrition',
            words: [
              { en: 'nutrition', cn: '营养' },
              { en: 'vitamin', cn: '维生素' },
              { en: 'calcium', cn: '钙' },
              { en: 'fibre', cn: '纤维素' },
              { en: 'balanced diet', cn: '均衡饮食' },
              { en: 'junk food', cn: '垃圾食品' },
            ],
            sentences: [
              { en: 'A balanced diet is important.', cn: '均衡饮食很重要。' },
              { en: 'Avoid eating too much junk food.', cn: '避免吃太多垃圾食品。' },
              { en: 'Milk contains lots of calcium.', cn: '牛奶含有大量钙质。' },
            ],
          },
        ],
      },
      {
        module: 3,
        title: 'Future plans',
        units: [
          {
            unit: 7, title: 'Future jobs',
            words: [
              { en: 'career', cn: '职业，事业' },
              { en: 'architect', cn: '建筑师' },
              { en: 'journalist', cn: '记者' },
              { en: 'programmer', cn: '程序员' },
              { en: 'chef', cn: '厨师' },
              { en: 'ambition', cn: '志向，抱负' },
            ],
            sentences: [
              { en: 'What do you want to be in the future?', cn: '你将来想做什么？' },
              { en: 'I want to be an architect.', cn: '我想成为一名建筑师。' },
              { en: 'Work hard to achieve your ambition.', cn: '努力实现你的志向。' },
            ],
          },
          {
            unit: 8, title: 'Plans and predictions',
            words: [
              { en: 'predict', cn: '预测' },
              { en: 'future', cn: '未来' },
              { en: 'robot', cn: '机器人' },
              { en: 'artificial intelligence', cn: '人工智能' },
              { en: 'renewable', cn: '可再生的' },
              { en: 'solar energy', cn: '太阳能' },
            ],
            sentences: [
              { en: 'In the future, robots will do many jobs.', cn: '在未来，机器人将承担许多工作。' },
              { en: 'We will use more solar energy.', cn: '我们将使用更多太阳能。' },
            ],
          },
          {
            unit: 9, title: 'Graduation',
            words: [
              { en: 'graduate', cn: '毕业' },
              { en: 'primary school', cn: '小学' },
              { en: 'memory', cn: '记忆，回忆' },
              { en: 'treasure', cn: '珍惜' },
              { en: 'grateful', cn: '感激的' },
              { en: 'bright', cn: '光明的，聪明的' },
            ],
            sentences: [
              { en: 'We are graduating from primary school.', cn: '我们即将从小学毕业。' },
              { en: 'I will treasure these memories.', cn: '我会珍惜这些回忆。' },
              { en: 'Your future is bright!', cn: '你的未来一片光明！' },
            ],
          },
        ],
      },
    ],
  },

  5: {
    '上': [
      {
        module: 1,
        title: 'Growing up',
        units: [
          {
            unit: 1, title: 'Changes as we grow',
            words: [
              { en: 'grow up', cn: '成长，长大' },
              { en: 'responsible', cn: '负责任的' },
              { en: 'independent', cn: '独立的' },
              { en: 'mature', cn: '成熟的' },
              { en: 'talent', cn: '天赋，才能' },
              { en: 'develop', cn: '发展，培养' },
            ],
            sentences: [
              { en: 'I am growing up fast.', cn: '我成长得很快。' },
              { en: 'Be responsible for your actions.', cn: '为你的行为负责。' },
              { en: 'Everyone has a special talent.', cn: '每个人都有特殊的天赋。' },
            ],
          },
          {
            unit: 2, title: 'Role models',
            words: [
              { en: 'role model', cn: '榜样' },
              { en: 'inspire', cn: '激励，鼓舞' },
              { en: 'achievement', cn: '成就' },
              { en: 'courage', cn: '勇气' },
              { en: 'determination', cn: '决心' },
              { en: 'admire', cn: '钦佩，赞赏' },
            ],
            sentences: [
              { en: 'My teacher is my role model.', cn: '我的老师是我的榜样。' },
              { en: 'She inspires me to work harder.', cn: '她激励我更加努力。' },
              { en: 'I admire her courage.', cn: '我钦佩她的勇气。' },
            ],
          },
          {
            unit: 3, title: 'Community service',
            words: [
              { en: 'volunteer', cn: '志愿者；自愿' },
              { en: 'community', cn: '社区' },
              { en: 'service', cn: '服务' },
              { en: 'donate', cn: '捐赠' },
              { en: 'elderly', cn: '老年人；年老的' },
              { en: 'kindness', cn: '善意，友善' },
            ],
            sentences: [
              { en: 'I volunteer at the community centre.', cn: '我在社区中心做志愿者。' },
              { en: 'We can help the elderly.', cn: '我们可以帮助老年人。' },
              { en: 'Small acts of kindness matter.', cn: '小小的善举很重要。' },
            ],
          },
        ],
      },
      {
        module: 2,
        title: 'Science and technology',
        units: [
          {
            unit: 4, title: 'Inventions',
            words: [
              { en: 'invent', cn: '发明' },
              { en: 'inventor', cn: '发明家' },
              { en: 'electricity', cn: '电' },
              { en: 'telephone', cn: '电话' },
              { en: 'internet', cn: '互联网' },
              { en: 'revolution', cn: '革命，变革' },
            ],
            sentences: [
              { en: 'Thomas Edison invented the light bulb.', cn: '托马斯·爱迪生发明了灯泡。' },
              { en: 'The internet has changed everything.', cn: '互联网改变了一切。' },
            ],
          },
          {
            unit: 5, title: 'Space exploration',
            words: [
              { en: 'spacecraft', cn: '宇宙飞船' },
              { en: 'astronaut', cn: '宇航员' },
              { en: 'orbit', cn: '轨道；绕轨道运行' },
              { en: 'gravity', cn: '重力，引力' },
              { en: 'explore', cn: '探索' },
              { en: 'galaxy', cn: '星系，银河' },
            ],
            sentences: [
              { en: 'Astronauts travel in spacecraft.', cn: '宇航员乘坐宇宙飞船旅行。' },
              { en: 'There is no gravity in space.', cn: '太空中没有重力。' },
              { en: 'China has its own space programme.', cn: '中国有自己的航天计划。' },
            ],
          },
          {
            unit: 6, title: 'Digital life',
            words: [
              { en: 'digital', cn: '数字的' },
              { en: 'device', cn: '设备，装置' },
              { en: 'download', cn: '下载' },
              { en: 'app', cn: '应用程序' },
              { en: 'password', cn: '密码' },
              { en: 'online safety', cn: '网络安全' },
            ],
            sentences: [
              { en: 'Protect your personal information online.', cn: '在网上保护你的个人信息。' },
              { en: 'Don\'t share your password with others.', cn: '不要把你的密码告诉别人。' },
            ],
          },
        ],
      },
      {
        module: 3,
        title: 'Global issues',
        units: [
          {
            unit: 7, title: 'Poverty and charity',
            words: [
              { en: 'poverty', cn: '贫困' },
              { en: 'charity', cn: '慈善' },
              { en: 'donate', cn: '捐赠' },
              { en: 'raise money', cn: '筹款' },
              { en: 'support', cn: '支持，帮助' },
              { en: 'equal', cn: '平等的' },
            ],
            sentences: [
              { en: 'We should help those in poverty.', cn: '我们应该帮助贫困中的人。' },
              { en: 'The charity raises money for children.', cn: '这家慈善机构为儿童筹款。' },
            ],
          },
          {
            unit: 8, title: 'Environmental challenges',
            words: [
              { en: 'deforestation', cn: '砍伐森林' },
              { en: 'greenhouse gas', cn: '温室气体' },
              { en: 'carbon footprint', cn: '碳足迹' },
              { en: 'sustainability', cn: '可持续性' },
              { en: 'conservation', cn: '保护，保存' },
              { en: 'impact', cn: '影响，冲击' },
            ],
            sentences: [
              { en: 'Deforestation destroys animal habitats.', cn: '砍伐森林破坏动物的栖息地。' },
              { en: 'We should reduce our carbon footprint.', cn: '我们应该减少碳足迹。' },
            ],
          },
          {
            unit: 9, title: 'World peace',
            words: [
              { en: 'peace', cn: '和平' },
              { en: 'war', cn: '战争' },
              { en: 'cooperation', cn: '合作' },
              { en: 'harmony', cn: '和谐' },
              { en: 'respect', cn: '尊重' },
              { en: 'united', cn: '团结的，联合的' },
            ],
            sentences: [
              { en: 'We hope for world peace.', cn: '我们希望世界和平。' },
              { en: 'Cooperation leads to harmony.', cn: '合作带来和谐。' },
              { en: 'Respect people from all cultures.', cn: '尊重来自各种文化的人。' },
            ],
          },
        ],
      },
    ],
    '下': [
      {
        module: 1,
        title: 'Moving on',
        units: [
          {
            unit: 1, title: 'Primary school memories',
            words: [
              { en: 'memory', cn: '记忆，回忆' },
              { en: 'unforgettable', cn: '难忘的' },
              { en: 'graduation', cn: '毕业' },
              { en: 'ceremony', cn: '典礼，仪式' },
              { en: 'achievement', cn: '成就' },
              { en: 'proud', cn: '自豪的，骄傲的' },
            ],
            sentences: [
              { en: 'Primary school has been unforgettable.', cn: '小学生活令人难忘。' },
              { en: 'I am proud of my achievements.', cn: '我为自己的成就感到自豪。' },
              { en: 'We will always remember these days.', cn: '我们将永远记住这些日子。' },
            ],
          },
          {
            unit: 2, title: 'New beginnings',
            words: [
              { en: 'secondary school', cn: '中学' },
              { en: 'challenge', cn: '挑战' },
              { en: 'opportunity', cn: '机会' },
              { en: 'prepare', cn: '准备' },
              { en: 'confidence', cn: '信心，自信' },
              { en: 'exciting', cn: '令人兴奋的' },
            ],
            sentences: [
              { en: 'Secondary school will be exciting.', cn: '中学生活将是令人兴奋的。' },
              { en: 'Prepare well for new challenges.', cn: '为新的挑战做好准备。' },
              { en: 'Have confidence in yourself.', cn: '对自己有信心。' },
            ],
          },
          {
            unit: 3, title: 'Thank you',
            words: [
              { en: 'appreciate', cn: '欣赏，感激' },
              { en: 'gratitude', cn: '感激，感谢' },
              { en: 'support', cn: '支持' },
              { en: 'encourage', cn: '鼓励' },
              { en: 'dedicate', cn: '致力于，奉献' },
              { en: 'farewell', cn: '告别，再见' },
            ],
            sentences: [
              { en: 'I appreciate everything my teachers did.', cn: '我感激老师们所做的一切。' },
              { en: 'Thank you for your support.', cn: '感谢你的支持。' },
              { en: 'Farewell, primary school!', cn: '再见，小学！' },
            ],
          },
        ],
      },
      {
        module: 2,
        title: 'Review and consolidation',
        units: [
          {
            unit: 4, title: 'Language review',
            words: [
              { en: 'summarise', cn: '总结' },
              { en: 'review', cn: '复习，回顾' },
              { en: 'practise', cn: '练习' },
              { en: 'improve', cn: '提高，改善' },
              { en: 'fluent', cn: '流利的' },
              { en: 'accurate', cn: '准确的' },
            ],
            sentences: [
              { en: 'Review your notes every day.', cn: '每天复习你的笔记。' },
              { en: 'Practise speaking English often.', cn: '经常练习说英语。' },
              { en: 'Work hard to become fluent.', cn: '努力学习以达到流利。' },
            ],
          },
          {
            unit: 5, title: 'Reading and writing skills',
            words: [
              { en: 'paragraph', cn: '段落' },
              { en: 'topic sentence', cn: '主题句' },
              { en: 'conclusion', cn: '结论' },
              { en: 'evidence', cn: '证据' },
              { en: 'argument', cn: '论点，争论' },
              { en: 'persuade', cn: '说服' },
            ],
            sentences: [
              { en: 'Start each paragraph with a topic sentence.', cn: '每个段落从主题句开始。' },
              { en: 'Use evidence to support your argument.', cn: '用证据来支持你的论点。' },
            ],
          },
          {
            unit: 6, title: 'Presentation skills',
            words: [
              { en: 'present', cn: '展示，呈现' },
              { en: 'audience', cn: '听众，观众' },
              { en: 'eye contact', cn: '眼神交流' },
              { en: 'volume', cn: '音量' },
              { en: 'clear', cn: '清晰的' },
              { en: 'confident', cn: '自信的' },
            ],
            sentences: [
              { en: 'Speak clearly when you present.', cn: '做展示时要说话清晰。' },
              { en: 'Make eye contact with your audience.', cn: '和你的听众保持眼神交流。' },
              { en: 'Be confident!', cn: '要自信！' },
            ],
          },
        ],
      },
      {
        module: 3,
        title: 'Looking forward',
        units: [
          {
            unit: 7, title: 'Dreams and goals',
            words: [
              { en: 'goal', cn: '目标' },
              { en: 'achieve', cn: '实现，达到' },
              { en: 'persevere', cn: '坚持不懈' },
              { en: 'commitment', cn: '承诺，投入' },
              { en: 'success', cn: '成功' },
              { en: 'failure', cn: '失败' },
            ],
            sentences: [
              { en: 'Set goals and work towards them.', cn: '设定目标并为之努力。' },
              { en: 'Persevere even when it is difficult.', cn: '即使困难也要坚持不懈。' },
              { en: 'Failure is a step towards success.', cn: '失败是走向成功的一步。' },
            ],
          },
          {
            unit: 8, title: 'A better world',
            words: [
              { en: 'justice', cn: '公正，正义' },
              { en: 'equality', cn: '平等' },
              { en: 'humanity', cn: '人类，人道' },
              { en: 'empathy', cn: '同理心，共情' },
              { en: 'responsibility', cn: '责任' },
              { en: 'contribute', cn: '贡献，做出贡献' },
            ],
            sentences: [
              { en: 'We can contribute to a better world.', cn: '我们可以为更美好的世界做出贡献。' },
              { en: 'Treat everyone with kindness and empathy.', cn: '用善意和同理心对待每个人。' },
            ],
          },
          {
            unit: 9, title: 'The journey ahead',
            words: [
              { en: 'journey', cn: '旅程' },
              { en: 'ahead', cn: '在前方，向前' },
              { en: 'adventure', cn: '冒险' },
              { en: 'discover', cn: '发现' },
              { en: 'potential', cn: '潜力，潜能' },
              { en: 'endless', cn: '无尽的，无限的' },
            ],
            sentences: [
              { en: 'Life is a wonderful journey.', cn: '生活是一段美妙的旅程。' },
              { en: 'Your potential is endless.', cn: '你的潜力是无限的。' },
              { en: 'Go forward with courage!', cn: '鼓起勇气向前进！' },
            ],
          },
        ],
      },
    ],
  },
}

// ── 工具函数 ────────────────────────────────────────────────────────────────
export function getModules(grade, semester) {
  return TEXTBOOK_DATA[grade]?.[semester] || []
}

export function getUnit(grade, semester, moduleNum, unitNum) {
  const mod = getModules(grade, semester).find(m => m.module === moduleNum)
  return mod?.units.find(u => u.unit === unitNum) || null
}

export const AVAILABLE_GRADES = [1, 2, 3, 4, 5]
export const AVAILABLE_SEMESTERS = ['上', '下']
