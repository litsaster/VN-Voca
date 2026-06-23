export interface VocabItem {
  id: string
  vietnamese: string
  englishName: string
  englishHint: string
  description: string
  image: string
  category: 'food' | 'drink' | 'pronoun'
  group?: string
  gender?: 'male' | 'female' | 'neutral'
  address?: string
  context?: string
  pair?: string
  example?: string
}

export interface QuizQuestion {
  questionText: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface VocabData {
  foods: Omit<VocabItem, 'category'>[]
  drinks: Omit<VocabItem, 'category'>[]
  pronouns: Omit<VocabItem, 'category'>[]
}
