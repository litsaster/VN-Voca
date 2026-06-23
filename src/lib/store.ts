import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'vnvoca_learned'

export function useLearned() {
  const [learned, setLearned] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? new Set(JSON.parse(stored)) : new Set()
    } catch {
      return new Set()
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...learned]))
  }, [learned])

  const toggle = useCallback((id: string) => {
    setLearned(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  return { learned, toggle }
}
