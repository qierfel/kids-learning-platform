export const ketReadingWritingOfficialSample = {
  paperId: 'ket-sample-2020-for-schools-reading-writing',
  title: 'KET 官方样题 2020 · 读写试运行',
  source: 'Sample Test 2020 (for Schools)',
  durationMinutes: 60,
  media: {
    questions: '/media/ket/sample-test-2020/for-schools/reading-writing-questions.pdf',
    answerKey: '/media/ket/sample-test-2020/for-schools/reading-writing-answer-key.pdf',
  },
  notes: [
    '本版先重点跑通 Reading Part 1-5 的自动判分。',
    'Writing Part 6-7 先保留官方任务说明和提交区，后续再接 AI 判卷。',
    '图片题和长篇阅读建议同时打开官方 PDF 对照作答。',
  ],
  scoredParts: [
    {
      id: 'part1',
      title: 'Part 1 标识与短消息',
      questionNumbers: [1, 2, 3, 4, 5, 6],
      type: 'choice',
      questions: [
        { id: 'r1', number: 1, prompt: 'Question 1', options: ['A', 'B', 'C'], answer: 'B' },
        { id: 'r2', number: 2, prompt: 'Question 2', options: ['A', 'B', 'C'], answer: 'C' },
        { id: 'r3', number: 3, prompt: 'Question 3', options: ['A', 'B', 'C'], answer: 'A' },
        { id: 'r4', number: 4, prompt: 'Question 4', options: ['A', 'B', 'C'], answer: 'A' },
        { id: 'r5', number: 5, prompt: 'Question 5', options: ['A', 'B', 'C'], answer: 'B' },
        { id: 'r6', number: 6, prompt: 'Question 6', options: ['A', 'B', 'C'], answer: 'B' },
      ],
    },
    {
      id: 'part2',
      title: 'Part 2 匹配题',
      questionNumbers: [7, 8, 9, 10, 11, 12, 13],
      type: 'choice',
      questions: [
        { id: 'r7', number: 7, prompt: 'Question 7', options: ['A', 'B', 'C'], answer: 'B' },
        { id: 'r8', number: 8, prompt: 'Question 8', options: ['A', 'B', 'C'], answer: 'C' },
        { id: 'r9', number: 9, prompt: 'Question 9', options: ['A', 'B', 'C'], answer: 'B' },
        { id: 'r10', number: 10, prompt: 'Question 10', options: ['A', 'B', 'C'], answer: 'A' },
        { id: 'r11', number: 11, prompt: 'Question 11', options: ['A', 'B', 'C'], answer: 'C' },
        { id: 'r12', number: 12, prompt: 'Question 12', options: ['A', 'B', 'C'], answer: 'A' },
        { id: 'r13', number: 13, prompt: 'Question 13', options: ['A', 'B', 'C'], answer: 'C' },
      ],
    },
    {
      id: 'part3',
      title: 'Part 3 阅读文章：Starting at a new school',
      questionNumbers: [14, 15, 16, 17, 18],
      type: 'choice',
      passage:
        '阅读文章主题为“Starting at a new school”。建议先打开官方 PDF 查看完整文章与选项，再在平台中答题。',
      questions: [
        { id: 'r14', number: 14, prompt: 'How did Anna feel about moving to a new school?', options: ['A', 'B', 'C'], answer: 'B' },
        { id: 'r15', number: 15, prompt: 'Who has become Anna’s best friend at her new school?', options: ['A', 'B', 'C'], answer: 'C' },
        { id: 'r16', number: 16, prompt: 'What is Anna’s opinion of the teachers?', options: ['A', 'B', 'C'], answer: 'A' },
        { id: 'r17', number: 17, prompt: 'What does Anna say about the school buildings?', options: ['A', 'B', 'C'], answer: 'C' },
        { id: 'r18', number: 18, prompt: 'What does Anna dislike most about her new school?', options: ['A', 'B', 'C'], answer: 'B' },
      ],
    },
    {
      id: 'part4',
      title: 'Part 4 阅读文章：Wivenhoe hotel',
      questionNumbers: [19, 20, 21, 22, 23, 24],
      type: 'choice',
      passage:
        '阅读文章主题为“Wivenhoe hotel”。建议打开官方 PDF 查看原文与选项。',
      questions: [
        { id: 'r19', number: 19, prompt: 'Question 19', options: ['A', 'B', 'C'], answer: 'C' },
        { id: 'r20', number: 20, prompt: 'Question 20', options: ['A', 'B', 'C'], answer: 'B' },
        { id: 'r21', number: 21, prompt: 'Question 21', options: ['A', 'B', 'C'], answer: 'A' },
        { id: 'r22', number: 22, prompt: 'Question 22', options: ['A', 'B', 'C'], answer: 'C' },
        { id: 'r23', number: 23, prompt: 'Question 23', options: ['A', 'B', 'C'], answer: 'B' },
        { id: 'r24', number: 24, prompt: 'Question 24', options: ['A', 'B', 'C'], answer: 'B' },
      ],
    },
    {
      id: 'part5',
      title: 'Part 5 完形填空',
      questionNumbers: [25, 26, 27, 28, 29, 30],
      type: 'fill',
      questions: [
        { id: 'r25', number: 25, prompt: 'Question 25', answer: ['your', 'the'] },
        { id: 'r26', number: 26, prompt: 'Question 26', answer: ['is'] },
        { id: 'r27', number: 27, prompt: 'Question 27', answer: ['lot'] },
        { id: 'r28', number: 28, prompt: 'Question 28', answer: ['on'] },
        { id: 'r29', number: 29, prompt: 'Question 29', answer: ['they'] },
        { id: 'r30', number: 30, prompt: 'Question 30', answer: ['to'] },
      ],
    },
  ],
  writing: {
    part6: {
      id: 'w6',
      title: 'Part 6 邮件任务',
      prompt:
        '你要给朋友写一封简短邮件。需要提到：meet place、meet time、what to buy。请先参考官方 PDF 里的任务卡。',
    },
    part7: {
      id: 'w7',
      title: 'Part 7 图片写作',
      prompt:
        '根据三幅图片写一个小故事。建议先打开官方 PDF 查看完整图片后再作答。',
    },
  },
}
