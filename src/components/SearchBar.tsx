interface Props {
  value: string
  onChange: (v: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative max-w-md mx-auto mb-8">
      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b9a690]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder="Search vocabulary..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3.5 rounded-full border border-[#e2d9cf] bg-white text-sm outline-none focus:border-[#d17a2b] focus:ring-3 focus:ring-[rgba(209,122,43,0.1)] transition-all"
      />
    </div>
  )
}
