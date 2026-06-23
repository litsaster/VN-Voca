import { createContext, useContext, useState, useRef, type ReactNode } from 'react'

interface ReadyContextValue {
  ready: boolean
  setReady: () => void
}

const ReadyContext = createContext<ReadyContextValue>({
  ready: false,
  setReady: () => {},
})

const MIN_SPLASH_MS = 1500

export function ReadyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady_] = useState(false)
  const mountedAt = useRef(Date.now())

  const setReady = () => {
    const elapsed = Date.now() - mountedAt.current
    const remaining = MIN_SPLASH_MS - elapsed
    if (remaining > 0) {
      setTimeout(() => setReady_(true), remaining)
    } else {
      setReady_(true)
    }
  }

  return (
    <ReadyContext.Provider value={{ ready, setReady }}>
      {children}
    </ReadyContext.Provider>
  )
}

export const useReady = () => useContext(ReadyContext)
