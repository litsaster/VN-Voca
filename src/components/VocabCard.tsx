import { useNavigate } from 'react-router-dom'
import type { VocabItem } from '../lib/types'
import PronounceBtn from './PronounceBtn'

interface Props {
  item: VocabItem
  learned: boolean
  onToggleLearned: (id: string) => void
}

export default function VocabCard({ item, learned, onToggleLearned }: Props) {
  const navigate = useNavigate()
  const isPronoun = item.category === 'pronoun'

  return (
    <div
      onClick={() => navigate(`/flashcard/${item.id}`)}
      className="block bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-shadow no-underline cursor-pointer"
    >
      <div className="aspect-[4/3] bg-[#faf7f0] overflow-hidden">
        {!isPronoun && item.image ? (
          <img
            src={item.image}
            alt={item.vietnamese}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {item.englishName === 'I / me (formal)' ? '👤' : '👥'}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-[#1a1a1a]">{item.vietnamese}</h3>
        <p className="text-sm text-[#8e7d68] mt-0.5">{item.englishName}</p>
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
  )
}
