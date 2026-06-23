import { useState } from 'react'
import { speak } from '../lib/fpt-tts'

interface Props {
  text: string
  size?: 'sm' | 'md'
}

export default function PronounceBtn({ text, size = 'md' }: Props) {
  const [loading, setLoading] = useState(false)

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (loading) return
    setLoading(true)
    try {
      await speak(text)
    } catch {
      console.warn('Speech failed')
    } finally {
      setLoading(false)
    }
  }

  const btnSize = size === 'sm' ? 'w-10 h-10' : 'w-11 h-11'

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`${btnSize} rounded-full bg-[#f1ede8] flex items-center justify-center cursor-pointer transition-colors hover:bg-[#e5ddd3] disabled:opacity-50 disabled:cursor-not-allowed`}
      title="Phát âm"
    >
      {loading ? (
        <svg className="w-5 h-5 text-[#b45f2b] animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-[#b45f2b]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
      )}
    </button>
  )
}
