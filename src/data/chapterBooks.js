function pad3(n) { return String(n).padStart(3, '0') }

const JW_TITLES = [
  'The Monkey', 'The Waterfall Cave', 'Subodhi', 'Secret Formulas',
  'The Demon of Chaos', 'The Dragon King', 'The Land of Darkness',
  'A Job in Heaven', 'The Peach Garden', 'The Powerful Sage',
  'Trouble in Heaven', 'The Bet', 'The True Scriptures',
  'A Promise to Protect', 'Tea with a Dragon', 'Wukong Gets Tricked',
  'The Dragon in the River', 'The Robe', 'An Evil Plan',
  'The Black Bear Spirit', "The Monster's Friend", 'A Very Strange Pill',
  'Great Protectors', 'The Great King Yellow Wind', 'Powerful Wind Magic',
  'The Monster in the River', 'The Ginseng Fruit', 'Wukong Leaves His Body',
  'The Magic Sleeve', 'The Frying Pan', "Guanyin's Vase",
  'Lady Whitebone', 'Bajie Takes a Nap', 'Tricked by the Princess',
  'A Visit to the King', 'Tricked Again', 'Missing from Heaven',
  'Bajie Tries to Sleep', 'The Injured Monk', 'The Magic Gourd',
  'A Trade', 'Sun Kongwu', 'A Visit from Laozi', "The King's Ghost",
  'The Treasure in the Well', 'One Thousand Pills', 'Two Tang Monks',
  'The Scared Boy', 'Red Boy', 'Magic Fire', 'Guanyin Becomes Angry',
  'An Ocean from a Vase', 'The Man in the Canoe', 'The River God',
  'The Monks and the Cart', 'The Tiger Immortal', 'A Guessing Game',
  'The Meditation Contest', 'Scared Villagers', 'Snow!',
  'The Demon under the Ice', 'The Goldfish in the Basket',
  'A Question for Buddha', 'Magnificent Silk Vests', 'The Metal Ring',
  'Help from Heaven', 'The Master Thief', 'The Woman in the Crowd',
  'The Stabbing Pain', 'The Star Lord', 'Money',
  'A Surprise at the Fruit and Flower Mountain', 'Two Wukongs',
  'Curious Ear', 'Battle of the Wukongs', 'The Iron Immortal',
  'The Magic Fan', 'Tricked Again and Again', 'The Mountain of Flames',
  'The Small Thunderclap Monastery', 'Help from a Dragon',
  'The Magic Cloth', 'The Melon Field', 'The Sad King',
  'Fire, Smoke, and Sand', 'Magic Bells', 'The Three Young Women',
  "The Priest's Plan", 'Many Eyes', "The Demons' Plan",
  'The Demon Officers', 'The Lion Demon', 'A Problem for the Lion Demon',
  'The Elephant Demon', 'The Raptor Demon', 'Wind and Fog',
  'Bajie and the Monster', 'Three Fights', "Squire Kou's Vow",
  'A Terrible Robbery', 'Arrested!', 'The Prisoners Are Released',
  'The Land of the West', 'The Tang Monk and the River',
  'The Thunderclap Monastery', 'The Question', 'Nothing Is Perfect',
  'Rewards',
]

const journeyChapters = JW_TITLES.map((title, i) => {
  const num = i + 1
  const filename = `lv05-${pad3(num)}_Journey to the West ${num}_${title}.mp3`
  return {
    num,
    title,
    audio: `/media/西游记英文版/Journey to the West音频/${filename}`,
  }
})

const READERS_2000_BOOKS = [
  { bookNum: 1, title: '第一册', trackCount: 81 },
  { bookNum: 2, title: '第二册', trackCount: 81 },
  { bookNum: 3, title: '第三册', trackCount: 82 },
  { bookNum: 4, title: '第四册', trackCount: 82 },
]

export const CHAPTER_BOOKS = [
  {
    id: 'journey_west',
    name: '西游记（英文版）',
    nameEn: 'Journey to the West',
    desc: 'Penguin Readers Lv.5 · 108章 · MP3',
    color: '#b8341f',
    icon: '🐒',
    chapters: journeyChapters,
  },
  {
    id: 'readers_2000',
    name: '2000词章节书',
    nameEn: 'Penguin Readers',
    desc: '4册 · 每册80+章节音频',
    color: '#6366f1',
    icon: '📗',
    books: READERS_2000_BOOKS,
    audioPath: (bookNum, trackNum) =>
      `/media/2000words/book${bookNum}/Track${String(trackNum).padStart(2, '0')}.mp3`,
  },
]
