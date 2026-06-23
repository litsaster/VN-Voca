import { useState, useEffect } from 'react'
import type { Tab } from '../components/Tabs'
import type { VocabItem } from '../lib/types'
import { loadVocabulary } from '../lib/data'
import { useLearned } from '../lib/store'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import TabsComponent from '../components/Tabs'
import Stats from '../components/Stats'
import VocabCard from '../components/VocabCard'

export default function HomePage() {
  const [data, setData] = useState<VocabItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('food')
  const [search, setSearch] = useState('')
  const { learned, toggle } = useLearned()

  useEffect(() => {
    loadVocabulary().then(d => { setData(d); setLoading(false) })
  }, [])

  const filtered = data
    .filter(i => i.category === activeTab)
    .filter(i => {
      if (!search) return true
      const q = search.toLowerCase()
      return (
        i.englishName.toLowerCase().includes(q) ||
        i.vietnamese.toLowerCase().includes(q) ||
        i.englishHint.toLowerCase().includes(q)
      )
    })

  const learnedInTab = filtered.filter(i => learned.has(i.id)).length

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
      <SearchBar value={search} onChange={setSearch} />
      <TabsComponent active={activeTab} onChange={setActiveTab} />
      <Stats
        learned={learnedInTab}
        total={filtered.length}
        totalLearned={learned.size}
      />
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[#b9a690]">No matching words found.</div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
          {filtered.map(item => (
            <VocabCard
              key={item.id}
              item={item}
              learned={learned.has(item.id)}
              onToggleLearned={toggle}
            />
          ))}
        </div>
      )}
    </>
  )
}
