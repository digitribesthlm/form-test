import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (isAuthenticated) {
      router.replace('/assessment')
    } else {
      router.replace('/login')
    }
  }, [router])

  // Return null to prevent any content flash
  return null
}
