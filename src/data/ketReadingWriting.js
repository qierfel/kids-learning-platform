export const ketReadingWritingSample = {
  paperId: 'ket-sample-rw-1',
  title: 'KET 读写样板 1',
  source: '标准版真题样板',
  durationMinutes: 60,
  reading: [
    {
      id: 'r1',
      passage: 'Tom wants to visit the science museum on Saturday because there is a robot show.',
      prompt: 'Why does Tom want to visit the museum?',
      options: ['To buy a robot', 'To watch a robot show', 'To meet his teacher'],
      answer: 'To watch a robot show',
      explanation: '根据原文中的 robot show 判断。',
    },
    {
      id: 'r2',
      passage: 'Emma usually does her homework after dinner, but today she will go swimming first.',
      prompt: 'What will Emma do before homework today?',
      options: ['Go swimming', 'Go shopping', 'Visit a museum'],
      answer: 'Go swimming',
      explanation: 'today she will go swimming first。',
    },
  ],
  writing: {
    id: 'w1',
    taskType: 'email',
    prompt: 'Write an email to your English friend about your weekend plan. Write 25-35 words.',
    sampleAnswer: 'Hi Sam, I am going to visit my grandparents this weekend. On Sunday I will play football with my cousin. What are you going to do?',
    scoringHints: ['是否切题', '是否有清楚周末计划', '句子是否基本正确', '是否有结尾互动'],
  },
}
