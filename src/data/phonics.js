// Phonics lesson data — 尼尔森自然拼读体系
// Media URL base: /media/35 I陪娃-尼尔森自然拼读【完结】/初级/${part}/${filename}

// ── P1: lesson1.mp4 – lesson55.mp4, MISSING 53 & 54 ──
// Valid: 1-52, 55
const P1_NUMS = [
  ...Array.from({ length: 52 }, (_, i) => i + 1),
  55,
]
const p1Lessons = P1_NUMS.map(n => ({
  num: n,
  filename: `lesson${n}.mp4`,
  part: 'P1',
}))

// ── P2: 65 files, mixed naming ──
// No-space group
const P2_NOSPACE = [63, 66, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116]
// With-space group (lesson 83–106, 117–122), skip (1) duplicates
const P2_SPACE_NUMS = [
  83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
  101, 102, 103, 104, 105, 106,
  117, 118, 119, 120, 121, 122,
]
// Chinese named: 第64课.mp4 – 第82课.mp4 (excluding 66 which has a no-space dedicated file)
const P2_CHINESE_NUMS = Array.from({ length: 19 }, (_, i) => i + 64).filter(n => n !== 66) // 64–82 excl. 66

// Build P2 in numeric order: 63, 64–82 (Chinese), 83–106 (space), 107–116 (nospace), 117–122 (space)
const p2Lessons = [
  { num: 63, filename: 'lesson63.mp4', part: 'P2' },
  { num: 66, filename: 'lesson66.mp4', part: 'P2' },
  ...P2_CHINESE_NUMS.map(n => ({
    num: n,
    filename: `第${n}课.mp4`,
    part: 'P2',
  })),
  ...P2_SPACE_NUMS.slice(0, 24).map(n => ({   // 83–106
    num: n,
    filename: `lesson ${n}.mp4`,
    part: 'P2',
  })),
  ...P2_NOSPACE.filter(n => n >= 107).map(n => ({  // 107–116
    num: n,
    filename: `lesson${n}.mp4`,
    part: 'P2',
  })),
  ...P2_SPACE_NUMS.slice(24).map(n => ({  // 117–122
    num: n,
    filename: `lesson ${n}.mp4`,
    part: 'P2',
  })),
]
// Sort by num
p2Lessons.sort((a, b) => a.num - b.num)

// ── P3: lesson 123–182, with gaps and quirks ──
// Missing: 131, 143
// Skip: lesson 178.mp4.baiduyun.p.downloading, lesson 182.mp4.baiduyun.p.downloading
// Quirky: lesson 157p.mp4, lesson 162 .mp4 (trailing space), lesson 172 .mp4 (trailing space)
// Mislabeled: lesson 13.mp4 → display first, num 13
const P3_QUIRK_MAP = {
  157: 'lesson 157p.mp4',
  162: 'lesson 162 .mp4',
  172: 'lesson 172 .mp4',
}
const P3_MISSING = new Set([131, 143, 178, 182])
const P3_NUMS_REGULAR = Array.from({ length: 60 }, (_, i) => i + 123).filter(
  n => !P3_MISSING.has(n)
)

const p3Lessons = [
  // mislabeled lesson 13, displayed first
  { num: 13, filename: 'lesson 13.mp4', part: 'P3' },
  ...P3_NUMS_REGULAR.map(n => ({
    num: n,
    filename: P3_QUIRK_MAP[n] || `lesson ${n}.mp4`,
    part: 'P3',
  })),
]

export const PHONICS_PARTS = [
  {
    id: 'p1',
    label: 'P1',
    desc: '初阶·第1-55课',
    color: '#10b981',
    lessons: p1Lessons,
  },
  {
    id: 'p2',
    label: 'P2',
    desc: '中阶·第63-122课',
    color: '#f59e0b',
    lessons: p2Lessons,
  },
  {
    id: 'p3',
    label: 'P3',
    desc: '高阶·第123-182课',
    color: '#8b5cf6',
    lessons: p3Lessons,
  },
]
