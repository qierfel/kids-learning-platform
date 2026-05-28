export const ketListeningSample = {
  paperId: 'ket-sample-listening-1',
  title: 'KET 听力样板 1',
  source: 'Sample Test / 官方样题',
  durationMinutes: 30,
  parts: [
    {
      partId: 'part1',
      title: 'Part 1 图片选择',
      audio: '/media/ket/listening/sample-1.mp3',
      questions: [
        {
          id: 'l1',
          prompt: 'Where will the boy meet his friend?',
          options: ['At the park', 'At the station', 'At the cinema'],
          answer: 'At the station',
          explanation: '样板题：后续接入真实音频和答案。',
        },
        {
          id: 'l2',
          prompt: 'What time does the class start?',
          options: ['8:30', '9:00', '9:30'],
          answer: '9:00',
          explanation: '样板题：用于先跑通听力流程。',
        },
      ],
    },
  ],
}
