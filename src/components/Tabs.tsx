type Tab = 'food' | 'drink' | 'pronoun'

const TABS: { key: Tab; label: string }[] = [
  { key: 'food', label: '🍲 Món ăn' },
  { key: 'drink', label: '🥤 Thức uống' },
  { key: 'pronoun', label: '🗣️ Đại từ' },
]

interface Props {
  active: Tab
  onChange: (tab: Tab) => void
}

export default function Tabs({ active, onChange }: Props) {
  return (
    <div className="flex justify-center gap-3 flex-wrap mb-8">
      {TABS.map(t => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition-all cursor-pointer ${
            active === t.key
              ? 'bg-[#d17a2b] border-[#d17a2b] text-white'
              : 'bg-white border-[#e2d9cf] text-[#5b4e3d] hover:bg-[#f3ede5]'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

export type { Tab }
