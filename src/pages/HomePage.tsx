import { useState, useEffect } from 'react'
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
  const [search, setSearch] = useState('')
  const { learned, toggle } = useLearned()

  useEffect(() => {
    loadVocabulary().then(d => { setData(d); setLoading(false) })
  }, [])

  const filtered = data
    .filter(i => i.category === active)
    .filter(i => {
      if (!search) return true
      const q = search.toLowerCase()
      return (
        i.englishName.toLowerCase().includes(q) ||
        i.vietnamese.toLowerCase().includes(q) ||
        i.englishHint.toLowerCase().includes(q)
      )
    })

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
      <Header searchValue={search} onSearchChange={setSearch} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Category pills */}
        <nav className="mb-12 -mx-6 overflow-x-auto px-6">
          <div className="flex min-w-max items-center gap-2">
            <span className="mr-2 text-xs uppercase tracking-[0.3em] text-[#7b6e5c]">Categories</span>
            {CATEGORIES.map(c => {
              const count = data.filter(i => i.category === c.key).length
              return (
                <button
                  key={c.key}
                  onClick={() => setActive(c.key)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition cursor-pointer ${
                    active === c.key
                      ? 'border-[#d17a2b] bg-[#d17a2b] text-white'
                      : 'border-border bg-card text-ink hover:border-accent'
                  }`}
                >
                  <span>{c.emoji}</span>
                  <span>{c.label}</span>
                  <span className="text-xs opacity-60">({count})</span>
                </button>
              )
            })}
          </div>
        </nav>

        {/* Section header */}
        <section>
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-4">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-[#7b6e5c]">Theme</div>
              <h2 className="mt-1 text-3xl sm:text-4xl font-bold text-ink">
                <span className="mr-2">{CATEGORIES.find(c => c.key === active)?.emoji}</span>
                {CATEGORIES.find(c => c.key === active)?.label}
              </h2>
            </div>
            <span className="text-sm tabular-nums text-[#8e7d68]">{filtered.length} words</span>
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
        </section>
      </div>
    </>
  )
}
