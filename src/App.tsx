import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './lib/auth'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import FlashcardPage from './pages/FlashcardPage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/flashcard/:id" element={<FlashcardPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
