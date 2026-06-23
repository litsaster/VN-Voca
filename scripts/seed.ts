import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seed() {
  // Load vocabulary
  const dataPath = resolve(__dirname, '../src/data/data.json')
  const quizPath = resolve(__dirname, '../src/data/quiz.json')
  const data = JSON.parse(readFileSync(dataPath, 'utf-8'))
  const quiz = JSON.parse(readFileSync(quizPath, 'utf-8'))

  // Insert foods
  const allItems = [
    ...data.foods.map((i: any) => ({ ...i, category: 'food' })),
    ...data.drinks.map((i: any) => ({ ...i, category: 'drink' })),
    ...data.pronouns.map((i: any) => ({ ...i, category: 'pronoun' })),
  ]

  for (const item of allItems) {
    const { error } = await supabase.from('vocabulary').upsert({
      slug: item.id,
      category: item.category,
      vietnamese: item.vietnamese,
      english_name: item.englishName,
      english_hint: item.englishHint,
      description: item.description,
      image_url: item.image || '',
      group: item.group || '',
      gender: item.gender || 'neutral',
      address: item.address || '',
      context: item.context || '',
      pair: item.pair || '',
      example: item.example || '',
    })
    if (error) console.error(`Error inserting ${item.id}:`, error.message)
    else console.log(`✓ ${item.id}`)
  }

  // Insert quiz
  for (const q of quiz) {
    const { error } = await supabase.from('quiz_questions').upsert({
      question_text: q.questionText,
      options: q.options,
      correct_index: q.correctIndex,
      explanation: q.explanation,
    })
    if (error) console.error(`Error inserting quiz:`, error.message)
    else console.log(`✓ Quiz question: ${q.questionText.slice(0, 40)}...`)
  }

  console.log('Seed complete!')
}

seed()
