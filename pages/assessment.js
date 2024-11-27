import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Assessment from '../components/Assessment'

export default function AssessmentPage() {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      router.replace('/login')
    }
  }, [router])

  // Only render the Assessment component if authenticated
  const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('isAuthenticated')
  if (!isAuthenticated) return null

  return <Assessment />
}
