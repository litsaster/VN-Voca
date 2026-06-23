import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../lib/auth'

interface Props {
  searchValue?: string
  onSearchChange?: (val: string) => void
}

export default function Header({ searchValue, onSearchChange }: Props) {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <header className="relative -mx-4 sm:-mx-6 mb-8 overflow-hidden bg-lacquer text-accent-foreground">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(45deg,transparent,transparent_18px,oklch(0.78_0.14_75/0.4)_18px,oklch(0.78_0.14_75/0.4)_19px)]" />
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pb-12 pt-10 sm:pt-16">
        {/* Top row: Dictionary + Login/Admin */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-accent">
            <span className="h-px w-8 bg-accent" />
            Dictionary
          </div>
          <div className="flex items-center gap-3 text-sm shrink-0">
            {user ? (
              <>
                <Link to="/admin" className="text-white/70 hover:text-white transition-colors">Admin</Link>
                <span className="text-xs text-white/70">{user.email}</span>
              </>
            ) : (
              <Link to="/login" className="text-white/70 hover:text-white transition-colors">Log in</Link>
            )}
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-2 text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] text-white">
          Vietnamese<span className="ml-2 text-accent">.</span>
        </h1>

        {/* Tagline */}
        <p className="mt-3 max-w-xl text-base sm:text-lg text-white/80">
          A Vietnamese vocabulary app for English speakers. Browse words by theme, then tap any card to open an interactive flashcard.
        </p>

        {/* Search + Quiz button */}
        <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-center">
          {onSearchChange ? (
            <div className="relative flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.34-4.34" />
              </svg>
              <input
                type="text"
                placeholder="Search a word…"
                value={searchValue || ''}
                onChange={e => onSearchChange(e.target.value)}
                className="flex w-full h-14 rounded-full border border-accent/40 bg-white/10 pl-12 pr-4 text-base text-white placeholder:text-white/50 outline-none focus-visible:ring-1 focus-visible:ring-accent transition-colors shadow-lg shadow-black/20"
              />
            </div>
          ) : null}
          <button
            onClick={() => navigate('/quiz')}
            className="inline-flex items-center justify-center gap-2 h-14 rounded-full bg-emerald-500 px-6 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
              <path d="M20 2v4" />
              <path d="M22 4h-4" />
              <circle cx="4" cy="20" r="2" />
            </svg>
            Take the Quiz
          </button>
        </div>
      </div>
    </header>
  )
}
