import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen bg-paper-texture flex flex-col">
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <footer className="text-center py-6 text-sm text-[#b9a690] border-t border-border">
        © 2025 VN Voca – Voice by FPT AI | Learn a new word every day
      </footer>
    </div>
  )
}
