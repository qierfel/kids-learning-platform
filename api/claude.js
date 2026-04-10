export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { type, payload } = req.body
  if (!type || !payload) {
    return res.status(400).json({ error: 'type and payload are required' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  let prompt = ''
  let max_tokens = 512

  if (type === 'poem_explain') {
    const { title, author, dynasty, lines } = payload
    prompt = `请用小学生能理解的语言解释这首古诗：
《${title}》${dynasty}·${author}
${lines.join('\n')}

请按以下格式回答（每项不超过50字）：
【译文】逐句白话翻译
【背景】写作背景
【主题】表达的情感或道理`
    max_tokens = 600

  } else if (type === 'poem_line_explain') {
    const { line, title, author } = payload
    prompt = `《${title}》（${author}）中"${line}"这句话是什么意思？用小学生能理解的话解释，不超过60字。`
    max_tokens = 100

  } else if (type === 'quiz_hint') {
    const { question, options, correctAnswer } = payload
    prompt = `题目：${question}
选项：${options.join('、')}
正确答案是：${correctAnswer}
请用一句话（不超过30字）提示学生为什么选这个答案，不要直接说出答案。`
    max_tokens = 80

  } else if (type === 'mistake_explain') {
    const { subject, topic, question, myAnswer, correctAnswer } = payload
    prompt = `学生做错了一道${subject}题，知识点是"${topic}"。
题目：${question}
学生的答案：${myAnswer}
正确答案：${correctAnswer}

请用小学生能理解的语言：
1. 指出错误原因（1-2句）
2. 解释正确答案的思路（2-3句）
3. 给一个记忆技巧或口诀（1句）

语气温和鼓励，不超过120字。`
    max_tokens = 250

  } else if (type === 'mistake_similar') {
    const { subject, topic, question, correctAnswer, grade } = payload
    prompt = `基于这道${grade}年级${subject}题（知识点：${topic}）：
题目：${question}
答案：${correctAnswer}

请出3道同类型的练习题，难度相近，格式如下（只输出JSON，不要其他内容）：
[
  {"q": "题目1", "a": "答案1"},
  {"q": "题目2", "a": "答案2"},
  {"q": "题目3", "a": "答案3"}
]`
    max_tokens = 400

  } else if (type === 'question_guide') {
    const { question, history = [], subject = '学习' } = payload
    const systemPrompt = `你是一位温暖耐心的小学${subject}老师助手。
规则：
1. 绝对不直接给出答案，用启发式提问引导孩子自己思考
2. 每次回复不超过3句话，语言简单易懂
3. 如果孩子答对了，热情表扬，然后帮助深化理解
4. 如果孩子答错了，温柔纠正，继续引导
5. 偶尔用"👍""💡""🌟"等表情增加亲切感
6. 称呼孩子为"你"或"小朋友"`

    const messages = [
      ...history.map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content })),
    ]
    if (messages.length === 0) {
      messages.push({ role: 'user', content: question })
    }

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 200,
          system: systemPrompt,
          messages,
        }),
      })
      if (!response.ok) {
        return res.status(502).json({ error: 'Upstream API error' })
      }
      const data = await response.json()
      const text = data.content?.[0]?.text?.trim() || ''
      return res.status(200).json({ text })
    } catch (e) {
      return res.status(500).json({ error: e.message })
    }

  } else if (type === 'grammar_explain') {
    const { grammarPoint, level, queryType, summary } = payload
    if (queryType === 'deep') {
      prompt = `请为"${grammarPoint}"（${level}级别）补充3-4个不同场景的例句，并简要说明每句要点。格式：序号+例句+中文解释，不超过200字。`
    } else {
      prompt = `请为"${grammarPoint}"（${level}级别）补充3个初学者最容易犯的错误，每个错误包括：错误句、正确句、原因说明。不超过200字。`
    }
    max_tokens = 400

  } else if (type === 'grammar_practice') {
    const { grammarPoint, level } = payload
    prompt = `请针对英语语法点"${grammarPoint}"（${level}级别）出5道练习题。
要求：填空题或改错题，难度适合${level}考试。
格式（只输出JSON，不要其他内容）：
[
  {"q": "题目（用___表示填空）", "a": "正确答案", "explain": "简短解析"},
  ...
]`
    max_tokens = 600

  } else {
    return res.status(400).json({ error: `Unknown type: ${type}` })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      return res.status(502).json({ error: 'Upstream API error', detail: err })
    }

    const data = await response.json()
    const text = data.content?.[0]?.text?.trim() || ''
    return res.status(200).json({ text })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}
