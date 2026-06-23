import { Link } from 'react-router-dom'
import { useAuth } from '../lib/auth'

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="mb-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs text-[#b9a690] tracking-wider uppercase mb-1">Dictionary</p>
          <Link to="/" className="no-underline">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#1a1a1a] tracking-tight leading-tight">
              Vietnamese.
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-3 text-sm shrink-0">
          {user ? (
            <>
              <Link to="/admin" className="text-[#d17a2b] hover:underline">Admin</Link>
              <span className="text-xs text-[#b9a690]">{user.email}</span>
            </>
          ) : (
            <Link to="/login" className="text-[#7b6e5c] hover:text-[#d17a2b] transition-colors">Log in</Link>
          )}
        </div>
      </div>
      <p className="text-[#7b6e5c] text-sm leading-relaxed max-w-xl mb-5">
        A Vietnamese vocabulary app for English speakers. Browse words by theme, then tap any card to open an interactive flashcard.
      </p>
      <Link
        to="/quiz"
        className="inline-block px-6 py-3 bg-[#1a1a1a] text-white rounded-full text-sm font-semibold hover:opacity-85 transition-opacity"
      >
        Take the Quiz
      </Link>
    </header>
  )
}
