import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Assessment from '../components/Assessment'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check authentication on page load
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [router])

  return <Assessment />
}
