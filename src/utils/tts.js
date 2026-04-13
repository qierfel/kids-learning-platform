// Shared OpenAI TTS utility
// Usage: await ttsSpeak('Hello world')
// Usage: await ttsSpeak('你好', { voice: 'shimmer' })

const cache = new Map()
let currentAudio = null

export async function ttsSpeak(text, { voice = 'nova', onEnd } = {}) {
  // Stop any currently playing TTS audio
  ttsStop()

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
}
