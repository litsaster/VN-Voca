import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { VocabItem } from '../lib/types'
import { loadVocabulary } from '../lib/data'
import { speak } from '../lib/fpt-tts'
import Header from '../components/Header'

export default function FlashcardPage() {
  const { id } = useParams()
  const [item, setItem] = useState<VocabItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    loadVocabulary().then(all => {
      const found = all.find(i => i.id === id)
      setItem(found || null)
      setLoading(false)
    })
  }, [id])

  const handleSpeak = async () => {
    if (!item || speaking) return
    setSpeaking(true)
    try { await speak(item.vietnamese) } catch {}
    setSpeaking(false)
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="text-center py-20 text-[#b9a690]">Loading...</div>
      </>
    )
  }

  if (!item) {
    return (
      <>
        <Header />
        <div className="text-center py-20">
          <p className="text-[#b9a690] mb-4">Vocabulary not found</p>
          <Link to="/" className="text-[#d17a2b] underline">← Quay lại</Link>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto">
      <Link to="/" className="text-sm text-[#7b6e5c] hover:text-[#d17a2b] transition-colors">
← Back
      </Link>

      <div className="mt-4 bg-[#fffef7] rounded-[48px] shadow-[0_25px_45px_-12px_rgba(0,0,0,0.35)] overflow-hidden">
        <div className="bg-[#faf7f0] p-5 pb-0 text-center">
          {item.category !== 'pronoun' && item.image ? (
            <img
              src={item.image}
              alt={item.vietnamese}
              className="w-full max-h-[380px] object-cover rounded-[32px] shadow-[0_8px_20px_rgba(0,0,0,0.1)] bg-white"
            />
          ) : (
            <div className="w-full max-h-[380px] flex items-center justify-center text-8xl py-10">
              {item.englishName === 'I / me (formal)' ? '👤' : '👥'}
            </div>
          )}
        </div>

        <div className="p-7 sm:p-9">
          <div className="flex items-center justify-between flex-wrap gap-3 pb-4 mb-5 border-b-2 border-dashed border-[#f0e1c0]">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#b45f2b]">{item.vietnamese}</h1>
              <button
                onClick={handleSpeak}
                disabled={speaking}
                className="w-14 h-14 rounded-full bg-[#fdebd0] flex items-center justify-center cursor-pointer transition-colors hover:bg-[#fbcfb0] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {speaking ? (
                  <svg className="w-7 h-7 text-[#b45f2b] animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="w-7 h-7 text-[#b45f2b]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="bg-[#fcf8f0] rounded-[60px] p-4 text-center border-l-4 border-[#e2b47c]">
            <p className="text-lg font-medium text-[#7a4a20]">🥢 "{item.englishHint}" 🥢</p>
            <span className="block text-xs text-[#a07148] mt-1.5">
              ⚡ English phonetic hack
            </span>
          </div>

          <div className="mt-6 text-sm text-[#7b6e5c] leading-relaxed">
            <p><strong className="text-[#b45f2b]">English:</strong> {item.englishName}</p>
            <p className="mt-2"><strong className="text-[#b45f2b]">Description:</strong> {item.description}</p>
          </div>

          <div className="mt-6 text-xs text-[#bba88a] text-center">
            💡 Powered by FPT AI – auto-retry if first attempt fails
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
