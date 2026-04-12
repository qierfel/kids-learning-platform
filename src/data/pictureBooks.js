const EP_BASE = '/media/绘本，教材与动画/动画5【小猪小象音频视频】'
const FROG_BASE = '/media/绘本，教材与动画/弗洛格英文绘本'

const EP_FILES = [
  'Are you ready outside',
  'Elephants Cannot Dance',
  'Happy Pig Day',
  'I Am Going',
  'I Broke My Trunk',
  'I Will Take A Nap!',
  'I am invited to a party',
  'I love my new toy',
  'I really like slop',
  'I will surprise my friend!',
  "I'm A Frog",
  "Let's Go For A Drive",
  'Listen to my Trumpet!',
  'My New Friend is So Fun!',
  'My friend is sad',
  'Should I Share My Ice cream',
  'There is a bird on your head',
  'Today i will fly',
  'Waiting Is Not Easy',
  'Watch me throw the ball',
  'We Are In A Book!',
  'a big guy took my ball',
  'can i play too_',
]

const FROG_FILES = [
  'Frog and the birdsong.pdf',
  'Frog is Frog.pdf',
  'Frog is a hero.pdf',
  'Happy frog.pdf',
  'frog went a-courtin.pdf',
  '弗洛格和小猪-中英.pdf',
  '弗洛格和小鸭-中英.pdf',
  '弗洛格和老鼠-中英.pdf',
  '弗洛格和野兔-中英.pdf',
]

export const PICTURE_BOOKS = [
  {
    id: 'elephant_piggie',
    name: '小猪小象',
    nameEn: 'Elephant & Piggie',
    desc: 'Mo Willems · 23册 · MP3朗读',
    color: '#f59e0b',
    icon: '🐘',
    type: 'audio',
    books: EP_FILES.map((filename, i) => ({
      num: i + 1,
      title: filename,
      audio: `${EP_BASE}/${filename}.mp3`,
    })),
  },
  {
    id: 'frog',
    name: '弗洛格',
    nameEn: 'Frog',
    desc: 'Max Velthuijs · PDF绘本',
    color: '#10b981',
    icon: '🐸',
    type: 'pdf',
    books: FROG_FILES.map((filename, i) => ({
      num: i + 1,
      title: filename.replace(/\.pdf$/, ''),
      pdf: `${FROG_BASE}/${filename}`,
    })),
  },
]
