import { useState, useEffect } from 'react'
import type { VocabItem } from '../lib/types'
import { loadVocabulary } from '../lib/data'
import { useLearned } from '../lib/store'
import Header from '../components/Header'
import VocabCard from '../components/VocabCard'

type Category = 'food' | 'drink' | 'pronoun'

const CATEGORIES: { key: Category; label: string; emoji: string }[] = [
  { key: 'food', label: 'Foods', emoji: '🍜' },
  { key: 'drink', label: 'Drinks', emoji: '🥤' },
  { key: 'pronoun', label: 'Pronouns', emoji: '🗣️' },
]

export default function HomePage() {
  const [data, setData] = useState<VocabItem[]>([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState<Category>('food')
  const { learned, toggle } = useLearned()

  useEffect(() => {
    loadVocabulary().then(d => { setData(d); setLoading(false) })
  }, [])

  const filtered = data.filter(i => i.category === active)

  if (loading) {
    return (
      <>
        <Header />
        <div className="text-center py-20 text-[#b9a690]">Loading...</div>
      </>
    )
  }

  return (
    <>
      <Header />

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map(c => {
          const count = data.filter(i => i.category === c.key).length
          return (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                active === c.key
                  ? 'bg-[#1a1a1a] border-[#1a1a1a] text-white'
                  : 'bg-white border-[#e2d9cf] text-[#5b4e3d] hover:border-[#b9a690]'
              }`}
            >
              {c.emoji} {c.label} ({count})
            </button>
          )
        })}
      </div>

      {/* Section header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-[#1a1a1a]">
          {CATEGORIES.find(c => c.key === active)?.emoji}{' '}
          {CATEGORIES.find(c => c.key === active)?.label}
        </h2>
        <p className="text-sm text-[#8e7d68]">{filtered.length} words</p>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
        {filtered.map(item => (
          <VocabCard
            key={item.id}
            item={item}
            learned={learned.has(item.id)}
            onToggleLearned={toggle}
          />
        ))}
      </div>
    </>
  )
}
