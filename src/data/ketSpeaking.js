export const ketSpeakingOfficialSample = {
  setId: 'ket-speaking-official-sample-2020',
  title: 'KET 官方样题 2020 · 口语试运行',
  source: 'Sample Test 2020 (for Schools)',
  totalDurationMinutes: 10,
  media: {
    speakingPdf: '/media/ket/sample-test-2020/for-schools/speaking-test.pdf',
  },
  notes: [
    '本版先按官方 speaking sample 的 Part 结构跑通口试流程。',
    '建议考生同时打开官方 speaking PDF 查看题卡和配图。',
    'AI 自动评分下一版再接入。',
  ],
  parts: [
    {
      id: 's1',
      title: 'Part 1 自我介绍与学校、家庭问答',
      prepSeconds: 20,
      answerSeconds: 180,
      prompt:
        '先完成基础信息问答，然后围绕 school 和 home 两组主题回答问题。',
      bullets: [
        'What’s your name? How old are you?',
        'School: favourite subject, uniform, finish time, snacks, homework.',
        'Home: who you live with, rooms, where you watch TV, favourite room.',
      ],
    },
    {
      id: 's2',
      title: 'Part 2 对话与延伸表达：Hobbies',
      prepSeconds: 20,
      answerSeconds: 300,
      prompt:
        '围绕 hobbies 题卡进行双人讨论，并完成延伸提问。',
      bullets: [
        'Discuss different hobbies and say why you like or dislike them.',
        'Say which hobby you like best.',
        'Talk about free time: alone or with other people.',
        'Compare playing sports and watching sports.',
      ],
    },
  ],
  rubric: {
    pronunciation: '发音是否清楚自然',
    grammar: '句子结构是否基本正确',
    vocabulary: '词汇是否适合 KET 水平',
    fluency: '回答是否顺畅、有基本连接',
    interaction: '是否能围绕问题持续回应和延伸',
  },
}
