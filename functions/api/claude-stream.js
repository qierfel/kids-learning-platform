// Cloudflare Pages Function — SSE streaming for AI teacher chat
// Path: /functions/api/claude-stream.js → maps to /api/claude-stream
//
// IMPORTANT: Do NOT use context.waitUntil() for streaming.
// When returning new Response(readable), CF keeps the worker alive
// until the ReadableStream is closed. Start the write work via IIFE.

export async function onRequestPost(context) {
  const { request, env } = context
  const apiKey = env.ANTHROPIC_API_KEY

  if (!apiKey) {
    return sseError('API key not configured on server')
  }

  let body
  try { body = await request.json() } catch {
    return sseError('Invalid JSON body')
  }

  const { messages = [], subject = '' } = body
  if (!Array.isArray(messages) || messages.length === 0) {
    return sseError('No messages provided')
  }

  const subjectStr = subject && subject !== '不限科目' ? subject : '各科目'

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

  const apiMessages = messages
    .filter(m => m.role === 'user' || m.role === 'ai')
    .map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: String(m.content || '') }))
    .filter(m => m.content.trim().length > 0)

  if (apiMessages.length === 0) {
    return sseError('No valid messages to process')
  }

  const { readable, writable } = new TransformStream()
  const writer = writable.getWriter()
  const encoder = new TextEncoder()

  // CF Workers: returning Response(readable) keeps the worker alive
  // until the stream is closed. Start writing via IIFE — no waitUntil needed.
  ;(async () => {
    try {
      const upstream = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1024,
          stream: true,
          system: systemPrompt,
          messages: apiMessages,
        }),
      })

      if (!upstream.ok) {
        const errText = await upstream.text()
        await writer.write(encoder.encode(`data: ${JSON.stringify({ error: `Anthropic API error: ${upstream.status}` })}\n\n`))
        console.error('Anthropic error:', errText)
      } else {
        const reader = upstream.body.getReader()
        const decoder = new TextDecoder()
        let buf = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buf += decoder.decode(value, { stream: true })
          const lines = buf.split('\n')
          buf = lines.pop() || ''
          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            const data = line.slice(6).trim()
            if (data === '[DONE]') continue
            try {
              const event = JSON.parse(data)
              if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
                await writer.write(encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`))
              }
            } catch { /* ignore malformed SSE lines */ }
          }
        }
      }
    } catch (e) {
      try {
        await writer.write(encoder.encode(`data: ${JSON.stringify({ error: e.message })}\n\n`))
      } catch { /* writer might already be closed */ }
    } finally {
      try {
        await writer.write(encoder.encode('data: [DONE]\n\n'))
        await writer.close()
      } catch { /* ignore close errors */ }
    }
  })()

  return new Response(readable, {
    status: 200,
    headers: {
      'content-type': 'text/event-stream; charset=utf-8',
      'cache-control': 'no-cache, no-transform',
      'x-accel-buffering': 'no',
      ...corsHeaders(),
    },
  })
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders() })
}

// Return an immediate SSE stream with a single error event
function sseError(message) {
  const body = `data: ${JSON.stringify({ error: message })}\n\ndata: [DONE]\n\n`
  return new Response(body, {
    status: 200, // must be 200 for frontend to read SSE body
    headers: {
      'content-type': 'text/event-stream; charset=utf-8',
      'cache-control': 'no-cache',
      ...corsHeaders(),
    },
  })
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}
