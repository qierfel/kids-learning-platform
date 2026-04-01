/**
 * 生成同音字/形近字数据
 * 来源：pycorrector (Apache 2.0) + chinese-xinhua (MIT) + CC-CEDICT (BSD)
 */

import { writeFileSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
import { buildCharGradeMap } from './grade-chars.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const hanzi = require('../../chinese-homework-app/node_modules/hanzi')
hanzi.start()

async function fetchText(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`)
  return res.text()
}
async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`)
  return res.json()
}

function isHanzi(c) {
  const code = c.charCodeAt(0)
  return code >= 0x4e00 && code <= 0x9fa5
}

// 从 chinese-xinhua 的原始释义中提取简短含义
function cleanMeaning(raw) {
  if (!raw) return ''
  // 优先提取「本义X」
  let m = raw.match(/本义[：:（(]?([^）)。，；\n]{2,12})/)
  if (m) return m[1].replace(/[）)]/g, '').trim()
  // 去掉括号内的字形分析
  let s = raw
    .replace(/（[^）]{0,40}）/g, '')
    .replace(/\([^)]{0,40}\)/g, '')
    .replace(/〈[^〉]*〉/g, '')
    .replace(/[①②③④⑤⑥]/g, '')
    .replace(/[A-Za-z\-\s\.]+/g, '')
    .trim()
  return s.split(/[。；]/)[0].split('，')[0].trim().slice(0, 15)
}

// 获取常用组词（来自 hanzi 包的 CC-CEDICT 数据）
function getWords(char) {
  try {
    const ex = hanzi.getExamples(char)
    if (!ex?.[0]) return [char]
    return ex[0]
      .filter(e => e.simplified?.includes(char) && e.simplified.length >= 2 && e.simplified.length <= 4)
      .map(e => e.simplified)
      .filter(w => w.split('').every(isHanzi))
      .slice(0, 3)
      .concat([char])
      .filter((v, i, a) => a.indexOf(v) === i)
      .slice(0, 3)
  } catch { return [char] }
}

async function main() {
  console.log('加载数据...')

  // 1. 加载查字工具的字库作为"小学常用字"过滤集
  const charDataText = readFileSync(
    resolve(__dirname, '../../chinese-homework-app/src/data/characters.js'), 'utf8'
  )
  const charMatches = charDataText.match(/"([^\u4e00-\u9fa5"]{0}[\u4e00-\u9fa5])"\s*:/g) || []
  const schoolChars = new Set(charMatches.map(m => m.replace(/[":\s]/g, '')))
  console.log(`小学字库：${schoolChars.size} 字`)

  // 2. 字义字典
  let wordDict = {}
  try {
    const words = await fetchJson(
      'https://raw.githubusercontent.com/pwxcoo/chinese-xinhua/master/data/word.json'
    )
    for (const w of words) {
      if (w.word?.length === 1 && isHanzi(w.word)) {
        wordDict[w.word] = {
          pinyin: w.pinyin || '',
          meaning: cleanMeaning(w.explanation || ''),
        }
      }
    }
    console.log(`字义字典：${Object.keys(wordDict).length} 字`)
  } catch (e) { console.warn('字义加载失败:', e.message) }

  // 3. 同音字分组
  let homophoneGroups = []
  try {
    const text = await fetchText(
      'https://raw.githubusercontent.com/shibing624/pycorrector/master/pycorrector/data/same_pinyin.txt'
    )
    for (const line of text.split('\n')) {
      const parts = line.split('\t')
      if (parts.length < 2) continue
      const base = parts[0].trim()
      if (!base || !isHanzi(base) || !schoolChars.has(base)) continue
      const others = parts.slice(1).join('').split('')
        .filter(c => isHanzi(c) && c !== base && schoolChars.has(c))
      const group = [...new Set([base, ...others])].slice(0, 5)
      if (group.length >= 2) homophoneGroups.push(group)
    }
    console.log(`同音字组：${homophoneGroups.length}`)
  } catch (e) { console.warn('同音字加载失败:', e.message) }

  // 4. 形近字分组
  let similarGroups = []
  try {
    const text = await fetchText(
      'https://raw.githubusercontent.com/shibing624/pycorrector/master/pycorrector/data/same_stroke.txt'
    )
    for (const line of text.split('\n')) {
      const chars = [...new Set(
        line.trim().split('').filter(c => isHanzi(c) && schoolChars.has(c))
      )].slice(0, 4)
      if (chars.length >= 2) similarGroups.push(chars)
    }
    console.log(`形近字组：${similarGroups.length}`)
  } catch (e) { console.warn('形近字加载失败:', e.message) }

  // 5. 构建结果
  const charGradeMap = buildCharGradeMap()
  const results = []
  let id = 1

  function getGroupGrade(group) {
    // 年级 = 组内所有字中年级最高的（学完最后一个字才能做比较）
    const grades = group.map(c => charGradeMap[c]).filter(Boolean)
    if (grades.length < group.length) return null // 有字不在人教版字表，跳过
    return Math.max(...grades)
  }

  function buildEntry(group, type) {
    const grade = getGroupGrade(group)
    if (!grade) return null

    const pinyins = group.map(c => wordDict[c]?.pinyin || '')
    const meanings = group.map(c => wordDict[c]?.meaning || '')
    if (meanings.filter(Boolean).length < Math.ceil(group.length / 2)) return null
    const words = group.map(c => getWords(c))
    return {
      id: `${type === 'homophone' ? 'h' : 's'}-${id++}`,
      type,
      grade,
      chars: group,
      pinyin: pinyins,
      meaning: meanings,
      words,
      tip: type === 'homophone'
        ? `这${group.length}个字读音相同或相近，注意区分字义`
        : `这${group.length}个字字形相近，注意区分笔画`,
    }
  }

  for (const g of homophoneGroups) {
    const e = buildEntry(g, 'homophone')
    if (e) results.push(e)
    if (results.filter(r => r.type === 'homophone').length >= 300) break
  }
  for (const g of similarGroups) {
    const e = buildEntry(g, 'similar')
    if (e) results.push(e)
    if (results.filter(r => r.type === 'similar').length >= 300) break
  }

  console.log(`\n生成：${results.length} 组（同音 ${results.filter(r=>r.type==='homophone').length} / 形近 ${results.filter(r=>r.type==='similar').length}）`)

  // 预览
  console.log('\n样本预览：')
  ;[...results.filter(r=>r.type==='homophone').slice(0,2),
    ...results.filter(r=>r.type==='similar').slice(0,2)].forEach(r => {
    console.log(`[${r.type}] ${r.chars.join('/')}  ${r.pinyin.join('/')}`)
    console.log(`  义：${r.meaning.join(' | ')}`)
    console.log(`  词：${r.words.map(w=>w.join('、')).join(' / ')}`)
  })

  const output = `// 自动生成的同音字/形近字数据
// 来源：pycorrector (Apache 2.0) + chinese-xinhua (MIT) + CC-CEDICT (BSD)
// 生成时间：${new Date().toISOString()}
// 共 ${results.length} 组

const confusables = ${JSON.stringify(results, null, 2)}

export default confusables
`
  writeFileSync(resolve(__dirname, '../src/data/confusables.js'), output, 'utf8')
  console.log('\n已写入 src/data/confusables.js')
}

main().catch(console.error)
