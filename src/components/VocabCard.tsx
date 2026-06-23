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
      className="h-80 [perspective:1000px] cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-card rounded-2xl overflow-hidden border border-border shadow-card">
          <div className="aspect-[4/3] bg-secondary/60 overflow-hidden">
            {!isPronoun && item.image ? (
              <img src={item.image} alt={item.vietnamese} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">
                {item.englishName === 'I / me (formal)' ? '👤' : '👥'}
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold text-ink">{item.vietnamese}</h3>
            <p className="text-sm text-primary/70 mt-0.5">{item.englishName}</p>
            <div className="flex items-center justify-end gap-2 mt-3">
              <button
                onClick={e => { e.stopPropagation(); onToggleLearned(item.id) }}
                className={`text-lg transition-colors cursor-pointer ${learned ? 'text-[#f5b042]' : 'text-[#e2d9cf] hover:text-[#f5b042]'}`}
              >
                {learned ? '⭐' : '☆'}
              </button>
              <PronounceBtn text={item.vietnamese} size="sm" />
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between bg-card rounded-2xl border border-border p-4 shadow-card">
          <div className="space-y-2 overflow-y-auto">
            <p className="text-base font-bold text-ink">{item.vietnamese}</p>
            <p className="text-sm text-primary/70 font-medium">{item.englishName}</p>
            <div className="bg-secondary/60 rounded-xl p-2.5 text-center border-l-4 border-primary/30 my-2">
              <p className="text-xs font-medium text-ink/80">"{item.englishHint}"</p>
            </div>
            {!isPronoun && item.description && (
              <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
            )}
            {isPronoun && (
              <div className="text-xs space-y-1 text-muted-foreground">
                {item.address && <p><strong className="text-ink">👥 Used for:</strong> {item.address}</p>}
                {item.context && <p><strong className="text-ink">📌 Context:</strong> {item.context}</p>}
                {item.gender && <p><strong className="text-ink">⚥ Gender:</strong> {item.gender === 'male' ? 'Male' : item.gender === 'female' ? 'Female' : 'Both'}</p>}
                {item.pair && <p><strong className="text-ink">🔗 Pair:</strong> {item.pair}</p>}
                {item.description && <p className="mt-1">{item.description}</p>}
              </div>
            )}
          </div>
          <div className="flex items-center justify-end gap-2 mt-2 pt-2 border-t border-border">
            <button
              onClick={e => { e.stopPropagation(); onToggleLearned(item.id) }}
              className={`text-lg transition-colors cursor-pointer ${learned ? 'text-[#f5b042]' : 'text-[#e2d9cf] hover:text-[#f5b042]'}`}
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
