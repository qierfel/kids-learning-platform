// Shared TTS utility
// Chinese text: uses Web Speech API with lang="zh-CN" for correct Mandarin tones
// English text: uses OpenAI TTS via /api/tts
// Usage: await ttsSpeak('Hello world')
// Usage: await ttsSpeak('你好', { lang: 'zh-CN' })

const cache = new Map()
let currentAudio = null

export async function ttsSpeak(text, { voice = 'nova', lang, onEnd } = {}) {
  ttsStop()

  if (lang === 'zh-CN' && typeof window !== 'undefined' && window.speechSynthesis) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN'
    utterance.rate = 0.85
    if (onEnd) utterance.onend = onEnd
    window.speechSynthesis.speak(utterance)
    return
  }

  let objUrl = cache.get(text)
  if (!objUrl) {
    const resp = await fetch(
      `/api/tts?voice=${encodeURIComponent(voice)}&text=${encodeURIComponent(text.slice(0, 4096))}`
    )
    if (!resp.ok) throw new Error(`TTS ${resp.status}`)
    const blob = await resp.blob()
    objUrl = URL.createObjectURL(blob)
    cache.set(text, objUrl)
  }

  const audio = new Audio(objUrl)
  currentAudio = audio
  if (onEnd) audio.onended = onEnd
  audio.onerror = () => { if (onEnd) onEnd() }
  return audio.play().catch(() => {})
}

export function ttsStop() {
  if (currentAudio) {
    currentAudio.pause()
    currentAudio = null
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
}
