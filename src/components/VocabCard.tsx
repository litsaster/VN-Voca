import { useState } from 'react'
import type { VocabItem } from '../lib/types'
import PronounceBtn from './PronounceBtn'
import { optimizeCloudinaryUrl } from '../lib/cloudinary'

interface Props {
  item: VocabItem
  learned: boolean
  onToggleLearned: (id: string) => void
  onEdit?: (item: VocabItem) => void
}

export default function VocabCard({ item, learned, onToggleLearned, onEdit }: Props) {
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
          <div className="aspect-[4/3] bg-secondary/60 overflow-hidden relative">
            {!isPronoun && item.image ? (
              <img src={optimizeCloudinaryUrl(item.image)} alt={item.vietnamese} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">
                {item.englishName === 'I / me (formal)' ? '👤' : '👥'}
              </div>
            )}
            <button
              onClick={e => { e.stopPropagation(); onToggleLearned(item.id) }}
              className={`absolute top-2 left-2 z-10 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-sm cursor-pointer hover:bg-black/50 transition-colors ${learned ? 'text-[#f5b042]' : 'text-white/70'}`}
            >
              {learned ? '⭐' : '☆'}
            </button>
            {onEdit && (
              <button
                onClick={e => { e.stopPropagation(); onEdit(item) }}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors"
                title="Edit word"
              >
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
          </div>
          <div className="p-4 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <h3 className="text-[clamp(0.875rem,1.6vw,1.125rem)] font-bold text-ink truncate" title={item.vietnamese}>{item.vietnamese}</h3>
              <PronounceBtn text={item.vietnamese} size="sm" />
            </div>
            <div className="bg-secondary/60 rounded-lg px-2 py-1 border-l-3 border-primary/30">
              <p className="text-xs font-medium text-ink/80 truncate">"{item.englishHint}"</p>
            </div>
            <p className="text-[11px] text-primary/70 truncate">{item.englishName}</p>
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
