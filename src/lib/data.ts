import type { VocabData, VocabItem, QuizQuestion } from './types'

let cachedVocab: VocabItem[] | null = null
let cachedQuiz: QuizQuestion[] | null = null

export async function loadVocabulary(): Promise<VocabItem[]> {
  if (cachedVocab) return cachedVocab
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

export async function loadQuiz(): Promise<QuizQuestion[]> {
  if (cachedQuiz) return cachedQuiz
  const res = await fetch('/src/data/quiz.json')
  const json: QuizQuestion[] = await res.json()
  cachedQuiz = json
  return json
}
