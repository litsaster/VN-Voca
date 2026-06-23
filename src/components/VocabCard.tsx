import { useState } from 'react'
import type { VocabItem } from '../lib/types'
import PronounceBtn from './PronounceBtn'

interface Props {
  item: VocabItem
  learned: boolean
  onToggleLearned: (id: string) => void
}

export default function VocabCard({ item, learned, onToggleLearned }: Props) {
  const [flipped, setFlipped] = useState(false)
  const isPronoun = item.category === 'pronoun'

  return (
    <div
      className="h-72 [perspective:1000px] cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] group relative flex flex-col items-center overflow-hidden rounded-2xl border border-border bg-card p-4 sm:p-5 text-center shadow-card transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-elevated">
          <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gold-gradient opacity-70" />
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl bg-[#f5f0e8]">
            {!isPronoun && item.image ? (
              <img
                src={item.image}
                alt={item.vietnamese}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-3xl">
                {item.englishName === 'I / me (formal)' ? '👤' : '👥'}
              </span>
            )}
          </div>
          <span className="mt-3 text-xl font-bold leading-tight text-ink">
            {item.vietnamese}
          </span>
          <span className="mt-1 text-[11px] uppercase tracking-[0.18em] text-accent/70 line-clamp-1">
            {item.englishName}
          </span>
        </div>

        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-card">
          <div className="space-y-1.5 text-xs overflow-y-auto">
            <p className="text-base font-bold text-ink mb-1">{item.vietnamese}</p>
            <p className="text-sm text-accent/80 font-medium">{item.englishName}</p>
            <p className="text-[#8e7d68]">"{item.englishHint}"</p>
            {!isPronoun && item.description && (
              <p className="text-[#8e7d68] mt-1">{item.description}</p>
            )}
            {isPronoun && (
              <>
                {item.address && <p><strong className="text-ink">👥 Used for:</strong> {item.address}</p>}
                {item.context && <p><strong className="text-ink">📌 Context:</strong> {item.context}</p>}
                {item.gender && <p><strong className="text-ink">⚥ Gender:</strong> {item.gender === 'male' ? 'Male' : item.gender === 'female' ? 'Female' : 'Both'}</p>}
                {item.pair && <p><strong className="text-ink">🔗 Pair:</strong> {item.pair}</p>}
                {item.description && <p className="mt-1">{item.description}</p>}
              </>
            )}
          </div>
          <div
            className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-border"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={e => { e.stopPropagation(); onToggleLearned(item.id) }}
              className={`text-lg transition-colors ${learned ? 'text-[#f5b042]' : 'text-[#e2d9cf] hover:text-[#f5b042]'}`}
            >
              {learned ? '⭐' : '☆'}
            </button>
            <PronounceBtn text={item.vietnamese} size="sm" />
          </div>
        </div>
      </div>
    </div>
  )
}
