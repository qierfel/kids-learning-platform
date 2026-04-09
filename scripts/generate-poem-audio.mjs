/**
 * 批量生成古诗词朗读音频
 * 使用 edge-tts + SSML 确保课本拼音正确
 * 声音：zh-CN-XiaoxiaoNeural（清晰自然）
 */

import { execSync } from 'child_process'
import { existsSync, mkdirSync, writeFileSync, unlinkSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

// 加载诗词数据
const poemsModule = await import('../src/data/poems.js')
const poems = poemsModule.default || poemsModule.poems

// 输出目录
const OUTPUT_DIR = resolve(__dirname, '../public/audio/poems')
mkdirSync(OUTPUT_DIR, { recursive: true })

// ── 课本拼音校准表 ──
// 格式：字符 → [错误读音片段, SSML phoneme 标注]
// 只标注在古诗语境中可能读错的字
const PINYIN_CORRECTIONS = {
  // 重：花重锦官城 → zhòng（沉重），不是 chóng（重复）
  '花重': (text) => text.replace('花重', '<phoneme alphabet="sapi" ph="hua4 zhong4">花重</phoneme>'),
  // 更：风一更 → gēng（更次），不是 gèng（更加）
  '一更': (text) => text.replace('一更', '<phoneme alphabet="sapi" ph="yi1 geng1">一更</phoneme>'),
  '更筹': (text) => text.replace('更筹', '<phoneme alphabet="sapi" ph="geng1 chou2">更筹</phoneme>'),
  // 鳜：鳜鱼肥 → guì
  '鳜鱼': (text) => text.replace('鳜鱼', '<phoneme alphabet="sapi" ph="gui4 yu2">鳜鱼</phoneme>'),
  // 脉脉：脉脉不得语 → mò mò
  '脉脉': (text) => text.replace('脉脉', '<phoneme alphabet="sapi" ph="mo4 mo4">脉脉</phoneme>'),
  // 谙：旧曾谙 → ān
  '曾谙': (text) => text.replace('曾谙', '<phoneme alphabet="sapi" ph="ceng2 an1">曾谙</phoneme>'),
  // 聒：聒碎乡心 → guō
  '聒碎': (text) => text.replace('聒碎', '<phoneme alphabet="sapi" ph="guo1 sui4">聒碎</phoneme>'),
  // 衰：少小离家老大回，乡音无改鬓毛衰 → shuāi（现行课本）
  '鬓毛衰': (text) => text.replace('鬓毛衰', '<phoneme alphabet="sapi" ph="bin4 mao2 shuai1">鬓毛衰</phoneme>'),
}

// 把诗文转成 SSML，加入停顿和语速控制
function buildSSML(poem) {
  let text = poem.lines.join('，\n')

  // 应用课本拼音校准
  for (const [key, fn] of Object.entries(PINYIN_CORRECTIONS)) {
    if (text.includes(key)) text = fn(text)
  }

  // 构建 SSML：语速稍慢（rate=0.85），每句之间停顿
  const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="zh-CN">
  <voice name="zh-CN-XiaoxiaoNeural">
    <prosody rate="0.85" pitch="+0%">
      <break time="500ms"/>
      ${poem.title}，${poem.author}。
      <break time="800ms"/>
      ${text}
      <break time="500ms"/>
    </prosody>
  </voice>
</speak>`

  return ssml
}

// 生成安全的文件名
function safeFilename(title) {
  return title.replace(/[《》\s（）()]/g, '').replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '_')
}

// 生成单首诗的音频
async function generateAudio(poem) {
  const filename = safeFilename(poem.title)
  const outPath = resolve(OUTPUT_DIR, `${filename}.mp3`)

  if (existsSync(outPath)) {
    console.log(`已存在，跳过：${poem.title}`)
    return filename
  }

  const ssml = buildSSML(poem)
  const ssmlPath = `/tmp/poem_${filename}.xml`
  writeFileSync(ssmlPath, ssml, 'utf8')

  try {
    execSync(
      `edge-tts --voice zh-CN-XiaoxiaoNeural --file "${ssmlPath}" --write-media "${outPath}"`,
      { timeout: 30000 }
    )
    console.log(`✓ ${poem.title} (${poem.grade}年级)`)
  } catch (e) {
    // SSML 不支持时降级到纯文本
    const plainText = `${poem.title}，${poem.author}。${poem.lines.join('，')}`
    execSync(
      `edge-tts --voice zh-CN-XiaoxiaoNeural --text "${plainText}" --write-media "${outPath}"`,
      { timeout: 30000 }
    )
    console.log(`✓ ${poem.title} (纯文本降级)`)
  } finally {
    if (existsSync(ssmlPath)) unlinkSync(ssmlPath)
  }

  return filename
}

// 主流程
async function main() {
  console.log(`开始生成 ${poems.length} 首古诗词音频...\n`)

  const manifest = {}
  let success = 0, fail = 0

  for (const poem of poems) {
    try {
      const filename = await generateAudio(poem)
      manifest[poem.title] = `${filename}.mp3`
      success++
      // 稍微延迟避免请求过快
      await new Promise(r => setTimeout(r, 500))
    } catch (e) {
      console.error(`✗ ${poem.title}: ${e.message}`)
      fail++
    }
  }

  // 输出清单文件，供前端使用
  writeFileSync(
    resolve(__dirname, '../src/data/poem-audio-manifest.js'),
    `// 自动生成 - 古诗词音频文件清单\nconst poemAudioManifest = ${JSON.stringify(manifest, null, 2)}\nexport default poemAudioManifest\n`,
    'utf8'
  )

  console.log(`\n完成！成功：${success}，失败：${fail}`)
  console.log(`音频文件位置：${OUTPUT_DIR}`)
}

main().catch(console.error)
