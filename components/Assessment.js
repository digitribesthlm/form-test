// Assessment.js
'use client'

import { useState } from 'react'

const questions = [
  {
    id: 'q1',
    text: 'Har ni rutiner för kontroll av de bolag ni gör affärer med?',
    weight: 20,
  },
  {
    id: 'q2',
    text: 'Har ni genomfört en säkerhetsrevision de senaste två åren?',
    weight: 25,
  },
  {
    id: 'q3',
    text: 'Har ni en dokumenterad krisplan?',
    weight: 20,
  },
  {
    id: 'q4',
    text: 'Genomför ni regelbundna riskanalyser enligt branschstandard?',
    weight: 20,
  },
  {
    id: 'q5',
    text: 'Har ni utvärderat säkerhetsbehov för verksamhetens lokaler?',
    weight: 15,
  },
]

export default function SecurityAssessment() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState('')
  const [tokenError, setTokenError] = useState('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(null)
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', company: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleTokenSubmit = (e) => {
    e.preventDefault()
    if (token === process.env.NEXT_PUBLIC_TOKEN) {
      setIsAuthenticated(true)
      setTokenError('')
    } else {
      setTokenError('Invalid token')
    }
  }

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))

    // If this is the last question, calculate score
    if (currentQuestionIndex === questions.length - 1) {
      calculateScore(questionId, value)
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const calculateScore = (lastQuestionId, lastAnswer) => {
    // Combine the last answer with previous answers
    const finalAnswers = {
      ...answers,
      [lastQuestionId]: lastAnswer
    }
    
    let totalScore = 0
    questions.forEach(question => {
      if (finalAnswers[question.id] === 'no') {
        totalScore += question.weight
      }
    })
    
    setScore(totalScore)
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    console.log('Contact submission:', contactInfo)
    setSubmitted(true)
  }

  const getRiskLevel = () => {
    if (score >= 60) return { level: 'Hög risk', color: 'error' }
    if (score >= 40) return { level: 'Medel risk', color: 'warning' }
    return { level: 'Låg risk', color: 'success' }
  }

  const currentQuestion = questions[currentQuestionIndex]

  if (!isAuthenticated) {
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
              <form onSubmit={handleTokenSubmit} className="space-y-4">
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
                {tokenError && (
                  <div className="text-red-600 text-sm">{tokenError}</div>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-3xl font-extrabold text-white text-center tracking-tight">
              Säkerhetsbedömning
            </h2>
            <p className="mt-2 text-blue-100 text-center">
              Utvärdera er verksamhets säkerhetsnivå
            </p>
            {/* Progress bar */}
            <div className="mt-4 bg-blue-200 rounded-full h-2.5">
              <div 
                className="bg-white h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="px-8 py-6">
            {score === null ? (
              <div 
                key={currentQuestion.id}
                className="animate-fadeIn bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                      {currentQuestionIndex + 1}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-lg font-medium text-gray-900 mb-6">{currentQuestion.text}</p>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                      <button
                        onClick={() => handleAnswerChange(currentQuestion.id, 'yes')}
                        className="w-full sm:w-1/2 px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150"
                      >
                        Ja
                      </button>
                      <button
                        onClick={() => handleAnswerChange(currentQuestion.id, 'no')}
                        className="w-full sm:w-1/2 px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150"
                      >
                        Nej
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Results Section */}
                <div className={`animate-fadeIn mt-4 p-6 rounded-xl ${
                  score >= 60 ? 'bg-red-50 border-red-200' :
                  score >= 40 ? 'bg-yellow-50 border-yellow-200' :
                  'bg-green-50 border-green-200'
                } border-2`}>
                  <h3 className="text-xl font-semibold mb-2">Resultat</h3>
                  <div className="space-y-2">
                    <p className="text-lg">
                      Risknivå: <span className="font-medium">{getRiskLevel().level}</span>
                    </p>
                    <p className="text-lg">
                      Riskpoäng: <span className="font-medium">{score} av 100</span>
                    </p>
                  </div>
                </div>

                {/* Contact Form */}
                {score >= 40 && !submitted && (
                  <div className="animate-fadeIn mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4">Kontaktformulär</h3>
                    <p className="text-gray-600 mb-6">
                      Baserat på ert resultat rekommenderar vi en djupare genomgång av era säkerhetsrutiner.
                    </p>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Namn
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={contactInfo.name}
                          onChange={(e) => setContactInfo(prev => ({...prev, name: e.target.value}))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          E-post
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo(prev => ({...prev, email: e.target.value}))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Företag
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={contactInfo.company}
                          onChange={(e) => setContactInfo(prev => ({...prev, company: e.target.value}))}
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:-translate-y-0.5 transition-all duration-150"
                      >
                        Skicka
                      </button>
                    </form>
                  </div>
                )}

                {/* Success Message */}
                {submitted && (
                  <div className="animate-fadeIn mt-8 bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-700">
                          Tack för ditt intresse! Vi kommer att kontakta dig inom kort.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
