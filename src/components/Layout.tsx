import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="text-center py-6 text-sm text-[#b9a690]">
        © 2025 VN Voca – Voice by FPT AI | Learn a new word every day
      </footer>
    </div>
  )
}
