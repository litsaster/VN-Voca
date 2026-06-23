import { Link } from 'react-router-dom'
import { useAuth } from '../lib/auth'

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="text-center mb-8">
      <Link to="/" className="no-underline">
        <h1 className="text-4xl font-bold bg-linear-to-r from-[#d17a2b] to-[#a55d1e] bg-clip-text text-transparent tracking-tight">
          VN Voca
        </h1>
      </Link>
      <p className="text-[#7b6e5c] mt-1 text-sm">
        Learn Vietnamese vocabulary through smart flashcards
      </p>
      <nav className="flex justify-center items-center gap-4 mt-4 flex-wrap">
        <Link to="/" className="text-sm text-[#7b6e5c] hover:text-[#d17a2b] transition-colors underline underline-offset-4">
          Vocabulary
        </Link>
        <Link to="/quiz" className="text-sm text-[#7b6e5c] hover:text-[#d17a2b] transition-colors underline underline-offset-4">
          Quiz
        </Link>
        {user ? (
          <>
            <Link to="/admin" className="text-sm text-[#d17a2b] hover:underline underline-offset-4">
              Admin
            </Link>
            <span className="text-xs text-[#b9a690]">{user.email}</span>
          </>
        ) : (
          <Link to="/login" className="text-sm text-[#7b6e5c] hover:text-[#d17a2b] transition-colors underline underline-offset-4">
            Log in
          </Link>
        )}
      </nav>
    </header>
  )
}
