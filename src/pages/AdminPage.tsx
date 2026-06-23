import { useState, useEffect } from 'react'
import { useAuth } from '../lib/auth'
import { loadVocabulary, addVocabulary, updateVocabulary, deleteVocabulary, isSupabaseEnabled } from '../lib/data'
import type { VocabItem } from '../lib/types'
import { Link } from 'react-router-dom'

type Category = 'food' | 'drink' | 'pronoun'

const EMPTY_FORM = {
  slug: '', vietnamese: '', english_name: '', english_hint: '',
  description: '', image_url: '', category: 'food' as Category,
  group: '', gender: 'neutral', address: '', context: '', pair: '',
}

export default function AdminPage() {
  const { user, signOut } = useAuth()
  const [items, setItems] = useState<VocabItem[]>([])
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadVocabulary().then(setItems)
  }, [])

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-[#b9a690] mb-4">Please log in to manage vocabulary</p>
        <Link to="/login" className="px-6 py-3 bg-[#d17a2b] text-white rounded-full text-sm font-semibold">
          Log in
        </Link>
      </div>
    )
  }

  if (!isSupabaseEnabled()) {
    return (
      <div className="text-center py-20">
        <p className="text-[#b9a690] mb-2">Supabase not connected</p>
        <p className="text-xs text-[#b9a690]">Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env</p>
      </div>
    )
  }

  const filtered = filter === 'all' ? items : items.filter(i => i.category === filter)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    try {
      if (editing) {
        await updateVocabulary(editing, form)
        setMessage('✅ Updated successfully')
      } else {
        await addVocabulary(form)
        setMessage('✅ Added successfully')
      }
      setForm(EMPTY_FORM)
      setEditing(null)
      const updated = await loadVocabulary()
      setItems(updated)
    } catch (err: any) {
      setMessage(`❌ ${err.message}`)
    }
  }

  const handleEdit = (item: VocabItem) => {
    setForm({
      slug: item.id,
      vietnamese: item.vietnamese,
      english_name: item.englishName,
      english_hint: item.englishHint,
      description: item.description,
      image_url: item.image,
      category: item.category,
      group: item.group || '',
      gender: item.gender || 'neutral',
      address: item.address || '',
      context: item.context || '',
      pair: item.pair || '',
    })
    setEditing(item.id)
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Delete this word?')) return
    try {
      await deleteVocabulary(slug)
      setMessage('✅ Deleted successfully')
      const updated = await loadVocabulary()
      setItems(updated)
    } catch (err: any) {
      setMessage(`❌ ${err.message}`)
    }
  }

  const cancelEdit = () => {
    setForm(EMPTY_FORM)
    setEditing(null)
    setMessage('')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#2c2b28]">Vocabulary Management</h2>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#8e7d68]">{user.email}</span>
          <button onClick={signOut} className="text-xs text-red-500 hover:underline cursor-pointer">Log out</button>
        </div>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-[#fcf8f0] rounded-xl text-sm">{message}</div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow mb-8 space-y-3">
        <h3 className="font-semibold text-sm text-[#2c2b28] mb-2">
          {editing ? 'Edit word' : 'Add new word'}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Slug (e.g. pho)" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} required className="col-span-2 px-3 py-2 rounded-lg border border-[#e2d9cf] text-sm outline-none focus:border-[#d17a2b]" />
          <input placeholder="Vietnamese" value={form.vietnamese} onChange={e => setForm(f => ({ ...f, vietnamese: e.target.value }))} required className="px-3 py-2 rounded-lg border border-[#e2d9cf] text-sm outline-none focus:border-[#d17a2b]" />
          <input placeholder="English Name" value={form.english_name} onChange={e => setForm(f => ({ ...f, english_name: e.target.value }))} required className="px-3 py-2 rounded-lg border border-[#e2d9cf] text-sm outline-none focus:border-[#d17a2b]" />
          <input placeholder="English Hint" value={form.english_hint} onChange={e => setForm(f => ({ ...f, english_hint: e.target.value }))} className="px-3 py-2 rounded-lg border border-[#e2d9cf] text-sm outline-none focus:border-[#d17a2b]" />
          <input placeholder="Image URL" value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} className="px-3 py-2 rounded-lg border border-[#e2d9cf] text-sm outline-none focus:border-[#d17a2b]" />
          <textarea placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="col-span-2 px-3 py-2 rounded-lg border border-[#e2d9cf] text-sm outline-none focus:border-[#d17a2b] h-20" />
          <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as Category }))} className="px-3 py-2 rounded-lg border border-[#e2d9cf] text-sm outline-none focus:border-[#d17a2b]">
            <option value="food">Food</option><option value="drink">Drink</option><option value="pronoun">Pronoun</option>
          </select>
          <div className="flex gap-2 col-span-2">
            <button type="submit" className="flex-1 py-2 bg-[#d17a2b] text-white rounded-lg text-sm font-semibold cursor-pointer hover:bg-[#b8681f] transition-colors">
              {editing ? 'Update' : 'Add'}
            </button>
            {editing && (
              <button type="button" onClick={cancelEdit} className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg text-sm cursor-pointer hover:bg-gray-300 transition-colors">
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        {(['all', 'food', 'drink', 'pronoun'] as const).map(c => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
              filter === c ? 'bg-[#d17a2b] text-white' : 'bg-white border border-[#e2d9cf] text-[#5b4e3d]'
            }`}
          >
            {c === 'all' ? 'All' : c === 'food' ? '🍲 Food' : c === 'drink' ? '🥤 Drink' : '🗣️ Pronoun'}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-2">
        {filtered.map(item => (
          <div key={item.id} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#2c2b28] truncate">{item.englishName}</p>
              <p className="text-xs text-[#8e7d68]">{item.vietnamese} — {item.category}</p>
            </div>
            <div className="flex gap-2 ml-3">
              <button onClick={() => handleEdit(item)} className="text-xs text-[#d17a2b] hover:underline cursor-pointer">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="text-xs text-red-500 hover:underline cursor-pointer">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
