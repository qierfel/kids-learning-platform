// Cloudflare Pages Function
// 路径 /functions/api/claude.js → 自动映射到 /api/claude
import { estimateCostUsd, getSessionFromRequest, recordUsage } from './_usage.js'

export async function onRequestPost(context) {
  try {
    return await handleRequest(context)
  } catch (e) {
    console.error('[claude] ❌ unhandled exception:', e.message, e.stack)
    return json({ error: `Server error: ${e.message}` }, 500)
  }
}

async function handleRequest(context) {
  const { request, env } = context
  const KV = env.KV
  const startedAt = Date.now()

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const session = await getSessionFromRequest(KV, request, body)
  let user = null
  if (session?.uid && KV) {
    const userRaw = await KV.get(`user:${session.uid}`)
    user = userRaw ? JSON.parse(userRaw) : null
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
• 如果收到图片，先仔细看清楚题目内容，再一步步解答
• 苏格拉底式引导：先问一个小问题让学生思考，不直接给答案
• 学生答对了真诚鼓励；遇困难给予信心

规则：
1. 每次回复200字以内，简洁有力
2. 用"你"称呼学生
3. 偶尔用"👍""💡""🌟"增加亲切感（不滥用）
4. 如果问题不清楚，礼貌请求补充
5. 绝不说"作为AI"或"我是AI"，你就是晓敏老师`

    // Build messages — support image content blocks
    const apiMessages = chatMessages
      .filter(m => m.role === 'user' || m.role === 'ai')
      .map(m => {
        const role = m.role === 'ai' ? 'assistant' : 'user'
        // Image messages (only user messages can have images)
        if (role === 'user' && m.image?.base64) {
          const contentBlocks = [
            { type: 'image', source: { type: 'base64', media_type: m.image.mediaType || 'image/jpeg', data: m.image.base64 } },
          ]
          if (m.content?.trim()) {
            contentBlocks.push({ type: 'text', text: m.content.trim() })
          } else {
            contentBlocks.push({ type: 'text', text: '请帮我看看这道题怎么做？' })
          }
          return { role, content: contentBlocks }
        }
        // Text-only message
        const text = String(m.content || '').trim()
        return text ? { role, content: text } : null
      })
      .filter(Boolean)

    if (apiMessages.length === 0) return json({ error: 'No valid messages' }, 400)

    // Use sonnet for image messages (better vision), haiku for text-only
    const hasImage = apiMessages.some(m => Array.isArray(m.content))
    return await callClaude(apiKey, {
      model: hasImage ? 'claude-sonnet-4-6' : 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: systemPrompt,
      messages: apiMessages,
    }, { KV, user, endpoint: 'claude-chat', startedAt, metadata: { type, subject: chatSubject } })

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
    }, { KV, user, endpoint: 'claude-question-guide', startedAt, metadata: { type, subject } })

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

  } else if (type === 'math_explain') {
    const { topic, grade, objectives, keyPoints } = payload
    prompt = `你是一位小学${grade}年级的数学老师，请用孩子能听懂的语言讲解「${topic}」这个知识点。

学习目标：${(objectives || []).join('；')}
核心概念：${(keyPoints || []).join('；')}

要求：
1. 先用1-2句话说清楚这是什么
2. 举1-2个贴近生活的例子帮助理解
3. 给出1道示范例题，写出完整解题过程
4. 语气亲切，适合${grade}年级孩子阅读
不超过300字。`
    max_tokens = 500

  } else if (type === 'math_practice') {
    const { topic, grade, difficulty } = payload
    const diffLabel = ['', '入门', '基础', '中等', '较难', '挑战'][difficulty || 3]
    prompt = `请针对小学${grade}年级数学知识点「${topic}」出5道练习题。
要求：难度为${diffLabel}，题型多样（填空、选择、判断、应用题均可），贴合苏教版教材。
格式（只输出JSON，不要其他内容）：
[
  {"q": "题目", "type": "填空/选择/判断/应用", "a": "正确答案", "explain": "简短解析（1-2句）"},
  ...
]`
    max_tokens = 800

  } else if (type === 'photo_ocr') {
    const { imageBase64, mediaType: rawMediaType = 'image/jpeg' } = payload
    if (!imageBase64) return json({ error: 'imageBase64 required' }, 400)
    const cleanBase64 = imageBase64.includes(',') ? imageBase64.split(',')[1].replace(/\s/g, '') : imageBase64.replace(/\s/g, '')
    const supported = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    const mediaType = supported.includes(rawMediaType) ? rawMediaType : 'image/jpeg'
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1024,
          messages: [{
            role: 'user',
            content: [
              { type: 'image', source: { type: 'base64', media_type: mediaType, data: cleanBase64 } },
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

  } else if (type === 'grade_homework') {
    const { imageBase64, mediaType: rawMediaType = 'image/jpeg', grade = '' } = payload
    if (!imageBase64) return json({ error: 'imageBase64 required' }, 400)
    const cleanBase64 = imageBase64.includes(',') ? imageBase64.split(',')[1].replace(/\s/g, '') : imageBase64.replace(/\s/g, '')
    const supported = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    const mediaType = supported.includes(rawMediaType) ? rawMediaType : 'image/jpeg'
    const gradeHint = grade ? `孩子是${grade}年级。` : ''
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 2048,
          messages: [{
            role: 'user',
            content: [
              { type: 'image', source: { type: 'base64', media_type: mediaType, data: cleanBase64 } },
              { type: 'text', text: `你是一位耐心专业的小学/初中作业批改老师。${gradeHint}请仔细查看这张作业照片，找出所有做错的题目。\n\n严格按以下JSON格式返回（只输出JSON，不要任何 markdown 代码块标记或额外说明）：\n{\n  "subject": "作业主科目（语文/数学/英语/物理/化学/历史/地理之一）",\n  "summary": "整体点评1-2句，温和鼓励，不超过60字",\n  "errors": [\n    {\n      "subject": "本题科目",\n      "topic": "知识点（如：两位数加法/古诗词默写/欧姆定律等）",\n      "question": "完整的错题原文",\n      "myAnswer": "孩子写的错误答案",\n      "correctAnswer": "正确答案",\n      "errorType": "错误类型（计算错误/概念错误/粗心大意/方法错误/未掌握知识点之一）",\n      "location": "错题在作业中的位置描述，如\"第一题\"\"第3题第二小题\"\"右上角应用题\"，方便后续在原图上标注",\n      "explanation": "讲解（用孩子能听懂的话说清楚错在哪、正确思路是什么、给一个记忆小技巧，不超过100字）"\n    }\n  ]\n}\n\n注意：\n- 只列出确实做错的题目，对的题目不要列。如果整张作业都对，errors 返回空数组并在 summary 中表扬。\n- 如果图片不清楚或不是作业，errors 返回空数组，summary 写明原因。\n- 题目最多列出 8 道，挑最重要的。\n- location 字段用于后续让图像编辑模型在原图上标注红圈，请尽量准确描述题目在版面中的位置。` }
            ]
          }],
        }),
      })
      if (!response.ok) {
        const err = await response.text()
        console.error(`[claude] grade_homework upstream error ${response.status}:`, err)
        return json({ error: 'Upstream API error', detail: err }, 502)
      }
      const data = await response.json()
      const text = data.content?.[0]?.text?.trim() || ''
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (jsonMatch) return json({ parsed: JSON.parse(jsonMatch[0]) })
      } catch { /* fall through */ }
      return json({ text, error: 'Failed to parse model output' }, 502)
    } catch (e) {
      console.error(`[claude] grade_homework exception:`, e.message)
      return json({ error: e.message }, 500)
    }

  } else if (type === 'speaking_tutor') {
    const { messages: chatMessages = [], level = 'KET' } = payload
    const levelDesc = level === 'KET' ? 'beginner (A2)' : level === 'PET' ? 'elementary (B1)' : 'intermediate (B2)'
    const systemPrompt = `You are Emma, a friendly and encouraging English tutor for Chinese students. The student is at ${levelDesc} level.

Core rules:
• Respond ONLY in English
• Keep replies to 2-4 sentences, then ask ONE follow-up question
• Be warm and celebratory — acknowledge effort before correcting
• Never say you are an AI
• If the student has multiple errors, correct only the most important one per turn

GRAMMAR CORRECTION — when the student makes a grammatical error:
  Gently point it out and model the correct form. Examples:
  "Nice try! Just a small fix: [correct version]."
  "Almost perfect! We say '[correct form]' — [very brief reason if helpful]."

EXPRESSION IMPROVEMENT — when the student uses an unnatural or awkward phrase:
  Suggest a more natural alternative. Examples:
  "You could also say: '[better phrasing]' — it sounds more natural!"
  "A more natural way to express this is: '[improved version]'"

VOCABULARY EXPANSION — once every few turns, introduce a useful new word or phrase:
  Keep it short: "By the way, a great word here is '___' — it means ___. For example: '___'."
  Choose words appropriate for ${levelDesc} level.

EXPRESSION ENRICHMENT — when the student uses a very simple sentence structure:
  Show a richer version to inspire them: "Great sentence! You could also say: '[expanded version]' — this adds more detail."

Adjust the amount of teaching to the student's level — beginners need simpler corrections and encouragement, intermediates can handle richer suggestions.`

    const apiMessages = chatMessages
      .filter(m => m.role === 'user' || m.role === 'ai')
      .map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: String(m.content || '') }))
      .filter(m => m.content.trim().length > 0)
    if (apiMessages.length === 0) return json({ error: 'No messages' }, 400)
    return await callClaude(apiKey, {
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 450,
      system: systemPrompt,
      messages: apiMessages,
    })

  } else if (type === 'writing_grade') {
    const { level = 'KET', prompt: writingPrompt, text: essay, targetWords = 50 } = payload
    const wordCount = essay.trim().split(/\s+/).length
    prompt = `You are an English examiner grading a ${level} level writing task.

Task: "${writingPrompt}"
Target word count: ${targetWords} words
Student's submission (${wordCount} words):
"""
${essay}
"""

Grade this writing and respond in Chinese with this exact format:
【总评】B+ (or appropriate grade A/B+/B/C+/C/D)
【语法】(2-3 sentences on grammar errors, give corrected examples)
【词汇】(1-2 sentences on vocabulary range and accuracy)
【内容】(1-2 sentences on relevance to task and ideas)
【建议】(2-3 specific improvement suggestions)
【错误列表】(list up to 3 specific grammar/spelling errors in format: "错误: xxx → 正确: yyy")`
    max_tokens = 600

  } else if (type === 'essay_ocr') {
    const { imageBase64, mediaType: rawMediaType = 'image/jpeg' } = payload
    if (!imageBase64) return json({ error: 'imageBase64 required' }, 400)
    // Strip any data URL prefix that may have slipped through, remove whitespace
    const cleanBase64 = imageBase64.includes(',') ? imageBase64.split(',')[1].replace(/\s/g, '') : imageBase64.replace(/\s/g, '')
    // Normalize media type to Anthropic-supported values
    const supported = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    const mediaType = supported.includes(rawMediaType) ? rawMediaType : 'image/jpeg'
    console.log(`[claude] essay_ocr mediaType=${mediaType} base64len=${cleanBase64.length}`)
    try {
      const reqBody = {
        model: 'claude-sonnet-4-6',
        max_tokens: 2048,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType, data: cleanBase64 } },
            { type: 'text', text: '请仔细识别这张作文/写作照片中的文字内容，完整准确地转录出来。只输出识别到的作文正文，不要加任何说明或标题。保留原文的段落结构。' }
          ]
        }],
      }
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
        body: JSON.stringify(reqBody),
      })
      if (!response.ok) {
        const errText = await response.text()
        console.error(`[claude] essay_ocr upstream error ${response.status}:`, errText)
        let errMsg = 'OCR 服务暂时不可用'
        try { const errJson = JSON.parse(errText); errMsg = errJson?.error?.message || errMsg } catch { /* */ }
        return json({ error: errMsg, detail: errText }, 502)
      }
      const data = await response.json()
      const text = data.content?.[0]?.text?.trim() || ''
      return json({ text })
    } catch (e) {
      console.error(`[claude] essay_ocr exception:`, e.message)
      return json({ error: e.message }, 500)
    }

  } else if (type === 'essay_correct') {
    const { essayText, level = 'KET' } = payload
    if (!essayText) return json({ error: 'essayText required' }, 400)
    const levelDesc = level === 'KET' ? 'A2 (KET)' : level === 'PET' ? 'B1 (PET)' : 'B2 (FCE)'
    prompt = `你是一位专业的英语写作批改老师，请批改以下英语作文。作文水平参考：${levelDesc}。

作文内容：
"""
${essayText}
"""

请按以下JSON格式返回批改结果（只输出JSON，不要任何其他内容）：
{
  "overallScore": "综合评级，如：B+ / 良好",
  "wordCount": 识别到的单词数（数字）,
  "summary": "总体评语，2-3句话",
  "errors": [
    {
      "original": "原文中的错误片段",
      "corrected": "正确写法",
      "explanation": "错误原因说明（中文，1句话）",
      "type": "错误类型：grammar/spelling/vocabulary/punctuation之一"
    }
  ],
  "grammar": {
    "score": "语法评级（A/B/C）",
    "feedback": "语法点评（1-2句）"
  },
  "vocabulary": {
    "score": "词汇评级（A/B/C）",
    "feedback": "词汇点评（1-2句）"
  },
  "content": {
    "score": "内容评级（A/B/C）",
    "feedback": "内容点评（1-2句）"
  },
  "suggestions": ["改进建议1", "改进建议2", "改进建议3"]
}

errors数组最多列出5个最典型的错误。`
    max_tokens = 1500

  } else if (type === 'reading_explain') {
    const { passage, question } = payload
    prompt = `Based on this English reading passage:
"${passage.slice(0, 500)}"

Explain in Chinese (简明扼要，不超过100字): ${question || '这篇文章的主旨和重点词汇'}`
    max_tokens = 200

  } else if (type === 'chinese_dict') {
    const { word } = payload
    prompt = `你是一部专业的中文词典。请查询"${word}"，用严格的JSON格式返回，不要有任何其他文字：
{
  "word": "${word}",
  "pinyin": "拼音（带声调）",
  "definitions": ["释义1", "释义2"],
  "examples": ["例句1", "例句2"],
  "synonyms": ["近义词1", "近义词2"],
  "antonyms": ["反义词1"],
  "tips": "易混淆用法或记忆技巧（如没有可省略此字段）"
}
注意：definitions最多3条，examples最多2条，synonyms/antonyms各最多3个，全部用中文。`
    max_tokens = 400

  } else {
    return json({ error: `Unknown type: ${type}` }, 400)
  }

  return await callClaude(apiKey, {
    model: 'claude-haiku-4-5-20251001',
    max_tokens,
    messages: [{ role: 'user', content: prompt }],
  }, { KV, user, endpoint: `claude-${type}`, startedAt, metadata: { type } })
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  })
}

async function callClaude(apiKey, body, usageCtx = {}) {
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
    if (usageCtx.user && usageCtx.KV) {
      const usage = data.usage || {}
      const inputTokens = Number(usage.input_tokens || 0)
      const outputTokens = Number(usage.output_tokens || 0)
      const totalTokens = inputTokens + outputTokens
      await recordUsage(usageCtx.KV, {
        uid: usageCtx.user.uid,
        email: usageCtx.user.email,
        nickname: usageCtx.user.nickname,
        endpoint: usageCtx.endpoint || 'claude',
        provider: 'anthropic',
        model: body.model,
        success: true,
        inputTokens,
        outputTokens,
        totalTokens,
        inputChars: JSON.stringify(body.messages || []).length,
        outputChars: text.length,
        latencyMs: Date.now() - (usageCtx.startedAt || t0),
        estCostUsd: estimateCostUsd({ provider: 'anthropic', model: body.model, inputTokens, outputTokens }),
        metadata: usageCtx.metadata || {},
      })
    }
    return json({ text })
  } catch (e) {
    console.error(`[claude] ❌ exception:`, e.message)
    if (usageCtx.user && usageCtx.KV) {
      await recordUsage(usageCtx.KV, {
        uid: usageCtx.user.uid,
        email: usageCtx.user.email,
        nickname: usageCtx.user.nickname,
        endpoint: usageCtx.endpoint || 'claude',
        provider: 'anthropic',
        model: body.model,
        success: false,
        inputChars: JSON.stringify(body.messages || []).length,
        latencyMs: Date.now() - (usageCtx.startedAt || t0),
        estCostUsd: 0,
        metadata: usageCtx.metadata || {},
      })
    }
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
