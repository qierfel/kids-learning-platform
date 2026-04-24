// Badge definitions — hardcoded, no backend needed
// condition.type maps to values computable from activityLog + localStorage

export const ACHIEVEMENTS = [
  { id: 'first_login',   label: '初学者',      icon: '🌱', category: 'streak',   condition: { type: 'login_count',        value: 1 },    desc: '第一次使用平台' },
  { id: 'streak_7',      label: '坚持一周',    icon: '🔥', category: 'streak',   condition: { type: 'streak',             value: 7 },    desc: '连续打卡 7 天' },
  { id: 'streak_30',     label: '坚持一月',    icon: '💪', category: 'streak',   condition: { type: 'streak',             value: 30 },   desc: '连续打卡 30 天' },
  { id: 'streak_100',    label: '坚持百日',    icon: '🏅', category: 'streak',   condition: { type: 'streak',             value: 100 },  desc: '连续打卡 100 天' },
  { id: 'words_100',     label: '单词达人100', icon: '📖', category: 'words',    condition: { type: 'total_words',        value: 100 },  desc: '累计背完 100 词' },
  { id: 'words_500',     label: '单词达人500', icon: '📚', category: 'words',    condition: { type: 'total_words',        value: 500 },  desc: '累计背完 500 词' },
  { id: 'words_2000',    label: '单词大师',    icon: '🎓', category: 'words',    condition: { type: 'total_words',        value: 2000 }, desc: '累计背完 2000 词' },
  { id: 'mistakes_50',   label: '错题清理工',  icon: '🧹', category: 'mistakes', condition: { type: 'mastered_mistakes',  value: 50 },   desc: '掌握 50 道错题' },
  { id: 'mistakes_200',  label: '错题终结者',  icon: '⚡', category: 'mistakes', condition: { type: 'mastered_mistakes',  value: 200 },  desc: '掌握 200 道错题' },
  { id: 'study_1h',      label: '学习一小时',  icon: '⏱️', category: 'time',    condition: { type: 'total_minutes',      value: 60 },   desc: '累计有效学习 1 小时' },
  { id: 'study_10h',     label: '十小时勤学',  icon: '⏰', category: 'time',    condition: { type: 'total_minutes',      value: 600 },  desc: '累计有效学习 10 小时' },
  { id: 'study_50h',     label: '五十小时学霸', icon: '🏆', category: 'time',   condition: { type: 'total_minutes',      value: 3000 }, desc: '累计有效学习 50 小时' },
  { id: 'exercises_50',  label: '练习达人',    icon: '✏️', category: 'exercise', condition: { type: 'total_exercises',   value: 50 },   desc: '累计完成 50 道练习' },
  { id: 'exercises_200', label: '练习精英',    icon: '🎯', category: 'exercise', condition: { type: 'total_exercises',   value: 200 },  desc: '累计完成 200 道练习' },
]

// Check which achievements are unlocked given current stats
// stats: { streak, totalWords, masteredMistakes, totalMinutes, totalExercises, hasLoggedIn }
export function checkUnlocked(stats) {
  return ACHIEVEMENTS.filter(a => {
    const { type, value } = a.condition
    switch (type) {
      case 'login_count':       return stats.hasLoggedIn
      case 'streak':            return (stats.streak || 0) >= value
      case 'total_words':       return (stats.totalWords || 0) >= value
      case 'mastered_mistakes': return (stats.masteredMistakes || 0) >= value
      case 'total_minutes':     return (stats.totalMinutes || 0) >= value
      case 'total_exercises':   return (stats.totalExercises || 0) >= value
      default:                  return false
    }
  }).map(a => a.id)
}
