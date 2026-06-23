import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="text-center mb-8">
      <Link to="/" className="no-underline">
        <h1 className="text-4xl font-bold bg-linear-to-r from-[#d17a2b] to-[#a55d1e] bg-clip-text text-transparent tracking-tight">
          VN Voca
        </h1>
      </Link>
      <p className="text-[#7b6e5c] mt-1 text-sm">
        Học tiếng Việt qua hình ảnh và phát âm thông minh
      </p>
      <nav className="flex justify-center gap-4 mt-4">
        <Link to="/" className="text-sm text-[#7b6e5c] hover:text-[#d17a2b] transition-colors underline underline-offset-4">
          Từ vựng
        </Link>
        <Link to="/quiz" className="text-sm text-[#7b6e5c] hover:text-[#d17a2b] transition-colors underline underline-offset-4">
          Quiz
        </Link>
      </nav>
    </header>
  )
}
