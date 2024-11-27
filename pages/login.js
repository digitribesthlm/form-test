import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (token === process.env.NEXT_PUBLIC_TOKEN) {
      // Store authentication state
      localStorage.setItem('isAuthenticated', 'true')
      // Redirect to assessment page
      router.push('/')
    } else {
      setError('Invalid token')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-3xl font-extrabold text-white text-center tracking-tight">
              Säkerhetsbedömning
            </h2>
            <p className="mt-2 text-blue-100 text-center">
              Vänligen ange token för att fortsätta
            </p>
          </div>
          <div className="px-8 py-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Token
                </label>
                <input
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your token"
                />
              </div>
              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:-translate-y-0.5 transition-all duration-150"
              >
                Fortsätt
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
