import type { VocabItem, VocabData } from './types'

const SUPABASE_ENABLED = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)

let cachedVocab: VocabItem[] | null = null
let cachedQuiz: any[] | null = null

export function isSupabaseEnabled() {
  return SUPABASE_ENABLED
}

export async function loadVocabulary(): Promise<VocabItem[]> {
  if (cachedVocab) return cachedVocab

  if (SUPABASE_ENABLED) {
    try {
      const { supabase } = await import('./supabase')
      const { data, error } = await supabase.from('vocabulary').select('*')
      if (!error && data && data.length > 0) {
        cachedVocab = data.map((i: any) => ({
          id: i.slug,
          vietnamese: i.vietnamese,
          englishName: i.english_name,
          englishHint: i.english_hint,
          description: i.description,
          image: i.image_url,
          category: i.category,
          group: i.group,
          gender: i.gender,
          address: i.address,
          context: i.context,
          pair: i.pair,
          example: i.example,
        }))
        return cachedVocab
      }
    } catch {}
  }

  const res = await fetch('/src/data/data.json')
  const json: VocabData = await res.json()
  const all: VocabItem[] = [
    ...json.foods.map(i => ({ ...i, category: 'food' as const })),
    ...json.drinks.map(i => ({ ...i, category: 'drink' as const })),
    ...json.pronouns.map(i => ({ ...i, category: 'pronoun' as const })),
  ]
  cachedVocab = all
  return all
}

export async function loadQuiz(): Promise<any[]> {
  if (cachedQuiz) return cachedQuiz
  const res = await fetch('/src/data/quiz.json')
  cachedQuiz = await res.json()
  return cachedQuiz!
}

// === Supabase-only operations ===
export async function addVocabulary(item: {
  slug: string; vietnamese: string; english_name: string; english_hint: string
  description: string; image_url: string; category: string
  group?: string; gender?: string; address?: string; context?: string; pair?: string
}) {
  const { supabase } = await import('./supabase')
  const { error } = await supabase.from('vocabulary').insert(item)
  if (error) throw new Error(error.message)
  cachedVocab = null
}

export async function updateVocabulary(slug: string, updates: Record<string, any>) {
  const { supabase } = await import('./supabase')
  const { error } = await supabase.from('vocabulary').update(updates).eq('slug', slug)
  if (error) throw new Error(error.message)
  cachedVocab = null
}

export async function deleteVocabulary(slug: string) {
  const { supabase } = await import('./supabase')
  const { error } = await supabase.from('vocabulary').delete().eq('slug', slug)
  if (error) throw new Error(error.message)
  cachedVocab = null
}

export async function syncProgressToSupabase(userId: string, wordSlug: string, learned: boolean) {
  const { supabase } = await import('./supabase')
  const { error } = await supabase.from('user_progress').upsert({
    user_id: userId,
    word_slug: wordSlug,
    learned,
  }, { onConflict: 'user_id,word_slug' })
  if (error) console.error('Sync progress error:', error)
}

export async function loadProgressFromSupabase(userId: string): Promise<Set<string>> {
  const { supabase } = await import('./supabase')
  const { data } = await supabase.from('user_progress').select('word_slug').eq('user_id', userId).eq('learned', true)
  return new Set(data?.map((i: any) => i.word_slug) || [])
}
