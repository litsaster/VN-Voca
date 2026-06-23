import { useState, useEffect, useCallback } from 'react'
import { isSupabaseEnabled, syncProgressToSupabase, loadProgressFromSupabase } from './data'
import { useAuth } from './auth'

const STORAGE_KEY = 'vnvoca_learned'

export function useLearned() {
  const { user } = useAuth()
  const [learned, setLearned] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? new Set(JSON.parse(stored)) : new Set()
    } catch {
      return new Set()
    }
  })
  const [synced, setSynced] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...learned]))
  }, [learned])

  useEffect(() => {
    if (user && !synced) {
      loadProgressFromSupabase(user.id).then(supabaseSet => {
        if (supabaseSet.size > 0) {
          setLearned(prev => new Set([...prev, ...supabaseSet]))
        }
        setSynced(true)
      })
    }
  }, [user, synced])

  const toggle = useCallback((id: string) => {
    setLearned(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      if (user && isSupabaseEnabled()) {
        syncProgressToSupabase(user.id, id, next.has(id))
      }
      return next
    })
  }, [user])

  return { learned, toggle }
}
