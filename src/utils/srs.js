// SM-2 间隔重复算法
// quality: 0=不会(重置), 1=模糊(短间隔), 2=记得(正常), 3=很熟(加速)

const QUALITY_MAP = { fail: 0, hard: 1, good: 2, easy: 3 }

export function sm2Update(card, quality) {
  let { interval = 1, reps = 0, ease = 2.5 } = card

  if (quality === 0) {
    // 答错 → 重置
    reps = 0
    interval = 1
    ease = Math.max(1.3, ease - 0.2)
  } else {
    // 答对 → 推进
    if (reps === 0) interval = 1
    else if (reps === 1) interval = quality >= 2 ? 6 : 3
    else interval = Math.round(interval * ease)

    reps += 1

    // 根据难度调整 ease factor
    const delta = 0.1 - (2 - quality) * (0.08 + (2 - quality) * 0.02)
    ease = Math.max(1.3, ease + delta)
  }

  const nextReview = Date.now() + interval * 86400000 // ms
  const status = reps === 0 ? 'new' : reps <= 1 ? 'learning' : reps >= 5 ? 'mastered' : 'review'

  return { interval, reps, ease, nextReview, status }
}

// 初始化一个新单词的卡片状态
export function newCard() {
  return { interval: 1, reps: 0, ease: 2.5, nextReview: 0, status: 'new' }
}

// 给定词库 + 已有进度，计算今天的学习任务
export function getTodayPlan(words, progress, wordsPerDay) {
  const now = Date.now()

  const dueReviews = []   // 到期需要复习的
  const newWords = []      // 还没学过的

  words.forEach(w => {
    const p = progress[w.word]
    if (!p || p.status === 'new') {
      newWords.push(w)
    } else if (p.status !== 'mastered' && p.nextReview <= now) {
      dueReviews.push({ ...w, card: p })
    }
  })

  // 今天新词：取前 N 个（但不超过 wordsPerDay）
  const todayNew = newWords.slice(0, wordsPerDay)

  return { dueReviews, todayNew }
}

// 计划完成估算
export function estimatePlan(totalWords, wordsPerDay) {
  const learnDays = Math.ceil(totalWords / wordsPerDay)
  // 每个单词平均需要约 7 次复习才能掌握（SM-2 特性）
  // 大概需要额外 learnDays * 0.5 天用于复习
  const totalDays = Math.ceil(learnDays * 1.4)
  return { learnDays, totalDays }
}

// 词库统计
export function getStats(words, progress) {
  let mastered = 0, reviewing = 0, learning = 0, unseen = 0

  words.forEach(w => {
    const p = progress[w.word]
    if (!p || p.status === 'new') unseen++
    else if (p.status === 'mastered') mastered++
    else if (p.status === 'review') reviewing++
    else learning++
  })

  return { mastered, reviewing, learning, unseen, total: words.length }
}
