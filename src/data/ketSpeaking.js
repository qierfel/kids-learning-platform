export const ketSpeakingSample = {
  setId: 'ket-speaking-sample-1',
  title: 'KET 口语样板 1',
  source: '官方口语题库参考回答',
  totalDurationMinutes: 10,
  parts: [
    {
      id: 's1',
      title: 'Part 1 自我介绍',
      prepSeconds: 15,
      answerSeconds: 45,
      prompt: 'What is your name? How old are you? What do you enjoy doing after school?',
    },
    {
      id: 's2',
      title: 'Part 2 图片描述',
      prepSeconds: 20,
      answerSeconds: 60,
      prompt: 'Look at the picture and talk about what the children are doing.',
      followUps: ['Where are they?', 'Do you like this activity? Why?'],
    },
  ],
  rubric: {
    pronunciation: '发音是否清楚',
    grammar: '句子结构是否基本正确',
    vocabulary: '词汇是否适合 KET 水平',
    fluency: '回答是否顺畅',
  },
}
