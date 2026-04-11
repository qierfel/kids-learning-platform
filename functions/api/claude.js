// Cloudflare Pages Function
// 路径 /functions/api/claude.js → 自动映射到 /api/claude

export async function onRequestPost(context) {
  const { request, env } = context

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const { type, payload } = body
  if (!type || !payload) {
    return json({ error: 'type and payload are required' }, 400)
  }

  const apiKey = env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('[claude] ❌ ANTHROPIC_API_KEY not set')
    return json({ error: 'API key not configured' }, 500)
  }

  console.log(`[claude] → type=${type}`)

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

  } else if (type === 'chat') {
    const { messages: chatMessages = [], subject: chatSubject = '' } = payload
    const subjectStr = chatSubject && chatSubject !== '不限科目' ? chatSubject : '各科目'
    const systemPrompt = `你是"晓敏老师"，一位拥有20年教学经验的资深教师，精通语文、数学、英语、物理、化学、历史、地理，尤其擅长${subjectStr}。

你的风格：
• 温暖亲切，像朋友一样和学生交流，但专业权威
• 善于用生动比喻和生活实例解释抽象概念
• 遇到数学/物理/化学：给出完整解题步骤，不跳步
• 遇到语文/英语：引用课文原文，给出记忆技巧
• 遇到历史/地理：联系时代背景，帮助理解记忆
• 苏格拉底式引导：先问一个小问题让学生思考，不直接给答案
• 学生答对了真诚鼓励；遇困难给予信心

规则：
1. 每次回复200字以内，简洁有力
2. 用"你"称呼学生
3. 偶尔用"👍""💡""🌟"增加亲切感（不滥用）
4. 如果问题不清楚，礼貌请求补充
5. 绝不说"作为AI"或"我是AI"，你就是晓敏老师`

    const apiMessages = chatMessages
      .filter(m => m.role === 'user' || m.role === 'ai')
      .map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: String(m.content || '') }))
      .filter(m => m.content.trim().length > 0)

    if (apiMessages.length === 0) return json({ error: 'No valid messages' }, 400)

    return await callClaude(apiKey, {
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: systemPrompt,
      messages: apiMessages,
    })

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

    return await callClaude(apiKey, {
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      system: systemPrompt,
      messages,
    })

  } else if (type === 'grammar_explain') {
    const { grammarPoint, level, queryType } = payload
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

  } else if (type === 'photo_ocr') {
    const { imageBase64, mediaType = 'image/jpeg' } = payload
    if (!imageBase64) return json({ error: 'imageBase64 required' }, 400)
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5-20251001',
          max_tokens: 1024,
          messages: [{
            role: 'user',
            content: [
              { type: 'image', source: { type: 'base64', media_type: mediaType, data: imageBase64 } },
              { type: 'text', text: `请仔细识别这张试卷/作业照片中的错题信息，以JSON格式返回（只输出JSON，不要\`\`\`json标记）：\n{\n  "subject": "科目（语文/数学/英语/物理/化学/历史/地理之一）",\n  "topic": "具体知识点（如：一元一次方程/古诗词默写/欧姆定律等）",\n  "question": "完整的题目内容（包括题干和选项）",\n  "myAnswer": "学生的错误答案（若可见）",\n  "correctAnswer": "正确答案（若有红笔批改则提取）",\n  "errorType": "错误类型（概念错误/计算错误/粗心大意/方法错误/未掌握知识点之一）"\n}\n如某项无法识别填空字符串。题目内容要尽量完整准确。` }
            ]
          }],
        }),
      })
      if (!response.ok) { const err = await response.text(); return json({ error: 'Upstream API error', detail: err }, 502) }
      const data = await response.json()
      const text = data.content?.[0]?.text?.trim() || ''
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (jsonMatch) { return json({ parsed: JSON.parse(jsonMatch[0]) }) }
      } catch { /* fall through */ }
      return json({ text })
    } catch (e) { return json({ error: e.message }, 500) }

  } else {
    return json({ error: `Unknown type: ${type}` }, 400)
  }

  return await callClaude(apiKey, {
    model: 'claude-haiku-4-5-20251001',
    max_tokens,
    messages: [{ role: 'user', content: prompt }],
  })
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  })
}

async function callClaude(apiKey, body) {
  const t0 = Date.now()
  try {
    console.log(`[claude] calling model=${body.model} max_tokens=${body.max_tokens}`)
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (!response.ok) {
      const err = await response.text()
      console.error(`[claude] ❌ API error ${response.status}:`, err)
      return json({ error: 'Upstream API error', detail: err }, 502)
    }
    const data = await response.json()
    const text = data.content?.[0]?.text?.trim() || ''
    console.log(`[claude] ✅ done in ${Date.now() - t0}ms, chars=${text.length}`)
    return json({ text })
  } catch (e) {
    console.error(`[claude] ❌ exception:`, e.message)
    return json({ error: e.message }, 500)
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', ...corsHeaders() },
  })
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}
