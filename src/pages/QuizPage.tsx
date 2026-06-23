import { useState, useEffect } from 'react'
import type { QuizQuestion } from '../lib/types'
import { loadQuiz } from '../lib/data'
import Header from '../components/Header'

export default function QuizPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    loadQuiz().then(setQuestions)
  }, [])

  const q = questions[current]
  if (!q) return (
    <>
      <Header />
      <div className="text-center py-20 text-[#b9a690]">Loading questions...</div>
    </>
  )

  const handleAnswer = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    if (idx === q.correctIndex) setScore(s => s + 1)
  }

  const next = () => {
    if (current + 1 >= questions.length) {
      setShowResult(true)
      return
    }
    setCurrent(c => c + 1)
    setSelected(null)
  }

  const restart = () => {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setShowResult(false)
  }

  if (showResult) {
    return (
      <>
        <Header />
        <div className="max-w-lg mx-auto text-center py-16">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-[#2c2b28] mb-2">Results</h2>
          <p className="text-lg text-[#7b6e5c] mb-6">
            You got <strong className="text-[#d17a2b]">{score}</strong>/{questions.length} correct
          </p>
          <div className="w-full bg-[#e7dfd5] rounded-full h-3 mb-8">
            <div
              className="bg-[#d17a2b] h-3 rounded-full transition-all"
              style={{ width: `${(score / questions.length) * 100}%` }}
            />
          </div>
          <button
            onClick={restart}
            className="px-8 py-3 bg-[#d17a2b] text-white rounded-full font-semibold text-sm cursor-pointer hover:bg-[#b8681f] transition-colors"
          >
            Retry
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-4 text-sm text-[#8e7d68]">
          Question {current + 1}/{questions.length}
        </div>
        <div className="w-full bg-[#e7dfd5] rounded-full h-2 mb-8">
          <div
            className="bg-[#d17a2b] h-2 rounded-full transition-all"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
          <h3 className="text-lg font-semibold text-[#2c2b28] mb-6 leading-relaxed">
            {q.questionText}
          </h3>
          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              let btnStyle = 'bg-[#f8f6f2] border-[#e2d9cf] hover:bg-[#f3ede5]'
              if (selected !== null) {
                if (idx === q.correctIndex) btnStyle = 'bg-green-100 border-green-400 text-green-800'
                else if (idx === selected) btnStyle = 'bg-red-100 border-red-400 text-red-800'
                else btnStyle = 'opacity-50'
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={selected !== null}
                  className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm font-medium transition-all cursor-pointer ${btnStyle} disabled:cursor-default`}
                >
                  {opt}
                </button>
              )
            })}
          </div>
          {selected !== null && (
            <div className="mt-6 p-4 bg-[#fcf8f0] rounded-xl border-l-4 border-[#e2b47c]">
              <p className="text-xs text-[#7a4a20] leading-relaxed">{q.explanation}</p>
            </div>
          )}
        </div>

        {selected !== null && (
          <div className="text-center mt-6">
            <button
              onClick={next}
              className="px-8 py-3 bg-[#d17a2b] text-white rounded-full font-semibold text-sm cursor-pointer hover:bg-[#b8681f] transition-colors"
            >
              {current + 1 >= questions.length ? 'View Results' : 'Next Question →'}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
