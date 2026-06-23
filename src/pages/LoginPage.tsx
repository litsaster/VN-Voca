import { useState } from 'react'
import { useAuth } from '../lib/auth'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const { signIn, signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<'login' | 'signup'>('login')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const err = mode === 'login' ? await signIn(email, password) : await signUp(email, password)
    if (err) setError(err)
  }

  return (
    <div className="max-w-sm mx-auto mt-20">
      <div className="bg-white rounded-3xl p-8 shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
        <h2 className="text-2xl font-bold text-center text-[#2c2b28] mb-6">
          {mode === 'login' ? 'Log in' : 'Sign up'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-[#e2d9cf] text-sm outline-none focus:border-[#d17a2b] transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-[#e2d9cf] text-sm outline-none focus:border-[#d17a2b] transition-colors"
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-[#d17a2b] text-white rounded-xl font-semibold text-sm cursor-pointer hover:bg-[#b8681f] transition-colors"
          >
            {mode === 'login' ? 'Log in' : 'Sign up'}
          </button>
        </form>
        <p className="text-center text-xs text-[#8e7d68] mt-4">
          {mode === 'login' ? (
            <>Don't have an account?{' '}
              <button onClick={() => { setMode('signup'); setError(null) }} className="text-[#d17a2b] underline cursor-pointer">
                Đăng ký
              </button>
            </>
          ) : (
            <>Already have an account?{' '}
              <button onClick={() => { setMode('login'); setError(null) }} className="text-[#d17a2b] underline cursor-pointer">
                Đăng nhập
              </button>
            </>
          )}
        </p>
      </div>
      <div className="text-center mt-4">
        <Link to="/" className="text-xs text-[#b9a690] hover:text-[#d17a2b] transition-colors">← Back</Link>
      </div>
    </div>
  )
}
