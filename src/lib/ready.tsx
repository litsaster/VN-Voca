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

function dismissSplash() {
  const splash = document.getElementById('splash')
  if (!splash) return
  splash.classList.add('hide')
  setTimeout(() => splash.remove(), 500)
  document.getElementById('root')?.classList.add('visible')
}

export function ReadyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady_] = useState(false)
  const mountedAt = useRef(Date.now())

  const setReady = () => {
    const elapsed = Date.now() - mountedAt.current
    const remaining = MIN_SPLASH_MS - elapsed
    const done = () => {
      setReady_(true)
      dismissSplash()
    }
    if (remaining > 0) {
      setTimeout(done, remaining)
    } else {
      done()
    }
  }

  return (
    <ReadyContext.Provider value={{ ready, setReady }}>
      {children}
    </ReadyContext.Provider>
  )
}

export const useReady = () => useContext(ReadyContext)
