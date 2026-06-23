import { useState, useEffect } from 'react'
import type { VocabItem } from '../lib/types'
import PronounceBtn from './PronounceBtn'

interface Props {
  item: VocabItem
  learned: boolean
  onToggleLearned: (id: string) => void
  onClose: () => void
}

export default function FlipModal({ item, learned, onToggleLearned, onClose }: Props) {
  const [flipped, setFlipped] = useState(false)
  const isPronoun = item.category === 'pronoun'

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-[32rem] [perspective:1000px]">
          <div
            className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer ${
              flipped ? '[transform:rotateY(180deg)]' : ''
            }`}
            onClick={() => setFlipped(!flipped)}
          >
            {/* Front */}
            <div className="absolute inset-0 [backface-visibility:hidden] flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-elevated">
              <div className="flex-1 bg-[#faf7f0] flex items-center justify-center p-6">
                {!isPronoun && item.image ? (
                  <img src={item.image} alt={item.vietnamese} className="w-full h-full object-contain max-h-64" />
                ) : (
                  <span className="text-8xl">
                    {item.englishName === 'I / me (formal)' ? '👤' : '👥'}
                  </span>
                )}
              </div>
              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-ink">{item.vietnamese}</h2>
                <p className="text-sm text-accent/80 mt-1">{item.englishName}</p>
                <p className="text-xs text-[#b9a690] mt-3">Tap to flip →</p>
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-elevated">
              <div className="space-y-2 overflow-y-auto">
                <p className="text-xl font-bold text-ink">{item.vietnamese}</p>
                <p className="text-sm font-medium text-accent/80">{item.englishName}</p>
                <div className="bg-[#fcf8f0] rounded-xl p-3 my-3 text-center border-l-4 border-[#e2b47c]">
                  <p className="text-sm font-medium text-[#7a4a20]">"{item.englishHint}"</p>
                </div>
                {!isPronoun && item.description && (
                  <p className="text-sm text-[#7b6e5c] leading-relaxed">{item.description}</p>
                )}
                {isPronoun && (
                  <div className="text-sm space-y-1 text-[#7b6e5c]">
                    {item.address && <p><strong className="text-ink">👥 Used for:</strong> {item.address}</p>}
                    {item.context && <p><strong className="text-ink">📌 Context:</strong> {item.context}</p>}
                    {item.gender && <p><strong className="text-ink">⚥ Gender:</strong> {item.gender === 'male' ? 'Male' : item.gender === 'female' ? 'Female' : 'Both'}</p>}
                    {item.pair && <p><strong className="text-ink">🔗 Pair:</strong> {item.pair}</p>}
                    {item.description && <p className="mt-1">{item.description}</p>}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-border">
                <button
                  onClick={e => { e.stopPropagation(); onToggleLearned(item.id) }}
                  className={`text-xl transition-colors cursor-pointer ${learned ? 'text-[#f5b042]' : 'text-[#e2d9cf] hover:text-[#f5b042]'}`}
                >
                  {learned ? '⭐' : '☆'}
                </button>
                <PronounceBtn text={item.vietnamese} />
              </div>
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="mx-auto mt-4 block px-6 py-2 bg-white/10 backdrop-blur rounded-full text-sm text-white hover:bg-white/20 transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  )
}
