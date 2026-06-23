import { useState } from 'react'
import { Link } from 'react-router-dom'
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
    <div className="h-80 [perspective:1000px]">
      <div
        className="relative w-full h-full cursor-pointer"
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-600 [transform-style:preserve-3d] rounded-[28px] ${
            flipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* Front */}
          <div className="absolute inset-0 bg-white rounded-[28px] p-5 shadow-[0_8px_20px_rgba(0,0,0,0.05)] flex flex-col justify-between [backface-visibility:hidden]">
            <div className="flex justify-between items-start">
              <Link
                to={`/flashcard/${item.id}`}
                onClick={e => e.stopPropagation()}
                className="text-xs text-[#b9a690] hover:text-[#d17a2b] transition-colors underline underline-offset-2"
              >
                Chi tiết →
              </Link>
              <button
                onClick={e => { e.stopPropagation(); onToggleLearned(item.id) }}
                className={`text-xl transition-colors cursor-pointer ${learned ? 'text-[#f5b042]' : 'text-[#e2d9cf]'}`}
              >
                {learned ? '⭐' : '☆'}
              </button>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[#d17a2b] mb-1">{item.englishName}</div>
              <div className="text-sm italic text-[#a48d72]">{item.vietnamese}</div>
            </div>
            <div className="flex justify-center">
              <PronounceBtn text={item.vietnamese} />
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 bg-[#fffaf5] rounded-[28px] p-5 shadow-[0_8px_20px_rgba(0,0,0,0.05)] flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto">
            <div className="flex justify-end">
              <button
                onClick={e => { e.stopPropagation(); onToggleLearned(item.id) }}
                className={`text-xl transition-colors cursor-pointer ${learned ? 'text-[#f5b042]' : 'text-[#e2d9cf]'}`}
              >
                {learned ? '⭐' : '☆'}
              </button>
            </div>
            <div className="space-y-1.5 text-xs">
              <p><strong className="text-[#b45f2b]">🇻🇳 {item.vietnamese}</strong></p>
              <p><strong className="text-[#b45f2b]">🗣️ Phonetic:</strong> "{item.englishHint}"</p>
              {!isPronoun && (
                <p><strong className="text-[#b45f2b]">📖 {item.englishName}:</strong> {item.description}</p>
              )}
              {isPronoun && (
                <>
                  <p><strong className="text-[#b45f2b]">👥 Used for:</strong> {item.address || 'N/A'}</p>
                  <p><strong className="text-[#b45f2b]">📌 Context:</strong> {item.context || 'N/A'}</p>
                  <p><strong className="text-[#b45f2b]">⚥ Gender:</strong> {item.gender === 'male' ? 'Male' : item.gender === 'female' ? 'Female' : 'Both'}</p>
                  <p><strong className="text-[#b45f2b]">🔗 Pair:</strong> {item.pair || 'N/A'}</p>
                  {item.description && <p><strong className="text-[#b45f2b]">📝</strong> {item.description}</p>}
                </>
              )}
            </div>
            <div className="flex justify-center">
              <PronounceBtn text={item.vietnamese} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
