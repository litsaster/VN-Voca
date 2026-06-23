const FPT_API_KEY = 'aoAkkzaXRTLjS4thKMAWKKUtWJ913NvM'
const FPT_API_URL = 'https://api.fpt.ai/hmi/tts/v5'
const VOICE = 'linhsan'
const MAX_RETRIES = 2
const RETRY_DELAY = 500

async function getAudioUrl(text: string): Promise<string> {
  const res = await fetch(FPT_API_URL, {
    method: 'POST',
    headers: {
      'api-key': FPT_API_KEY,
      voice: VOICE,
    },
    body: text,
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const raw = await res.text()
  try {
    const json = JSON.parse(raw)
    if (json.async) return json.async
    if (json.error !== 0) throw new Error(json.message || 'API error')
    throw new Error('No audio URL in response')
  } catch {
    const url = raw.trim()
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    const match = raw.match(/https?:\/\/[^\s"']+/)
    if (match) return match[0]
    throw new Error('Could not extract audio URL')
  }
}

export async function speak(text: string): Promise<void> {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const url = await getAudioUrl(text)
      const audio = new Audio(url)
      await new Promise<void>((resolve, reject) => {
        audio.onended = () => resolve()
        audio.onerror = () => reject(new Error('Audio playback failed'))
        audio.play().catch(reject)
      })
      return
    } catch (err) {
      if (attempt === MAX_RETRIES - 1) throw err
      await new Promise(r => setTimeout(r, RETRY_DELAY))
    }
  }
}
