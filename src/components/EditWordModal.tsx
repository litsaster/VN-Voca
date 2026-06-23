import { useState } from 'react'

interface Props {
  vietnamese: string
  englishName: string
  englishHint: string
  description: string
  image: string
  onSave: (data: { vietnamese: string; englishName: string; englishHint: string; description: string; image: string }) => void
  onClose: () => void
}

export default function EditWordModal({ vietnamese, englishName, englishHint, description, image, onSave, onClose }: Props) {
  const [form, setForm] = useState({ vietnamese, englishName, englishHint, description, image })

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-card rounded-2xl p-6 shadow-elevated border border-border"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-ink mb-4">Edit word</h3>
        <div className="space-y-3">
          <input
            placeholder="Vietnamese"
            value={form.vietnamese}
            onChange={e => setForm(f => ({ ...f, vietnamese: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm text-ink outline-none focus:border-accent"
          />
          <input
            placeholder="English Name"
            value={form.englishName}
            onChange={e => setForm(f => ({ ...f, englishName: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm text-ink outline-none focus:border-accent"
          />
          <input
            placeholder="English Hint (phonetic)"
            value={form.englishHint}
            onChange={e => setForm(f => ({ ...f, englishHint: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm text-ink outline-none focus:border-accent"
          />
          <input
            placeholder="Image URL"
            value={form.image}
            onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm text-ink outline-none focus:border-accent"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm text-ink outline-none focus:border-accent resize-none"
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onSave(form)}
            className="flex-1 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-border text-ink rounded-lg text-sm font-semibold cursor-pointer hover:opacity-80 transition-opacity"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
