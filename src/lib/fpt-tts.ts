const FPT_API_KEY = 'aoAkkzaXRTLjS4thKMAWKKUtWJ913NvM'
const FPT_API_URL = 'https://api.fpt.ai/hmi/tts/v5'
const VOICE = 'linhsan'
const MAX_RETRIES = 2
const RETRY_DELAY = 500

export async function speak(text: string): Promise<void> {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(FPT_API_URL, {
        method: 'POST',
        headers: {
          api_key: FPT_API_KEY,
          'Content-Type': 'application/json',
          voice: VOICE,
        },
        body: JSON.stringify({ text }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      if (data.error !== 0 || !data.async) throw new Error(data.message || 'No audio')
      const audio = new Audio(data.async)
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
