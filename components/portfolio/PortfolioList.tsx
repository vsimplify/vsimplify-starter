'use client';

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Portfolio } from '@/types/portfolio'

export default function PortfolioList() {
  const [portfolios, setPortfolios] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        // First, log the user session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        if (sessionError) {
          console.error('Session error:', sessionError)
          throw new Error('Authentication error')
        }

        if (!session?.user) {
          console.log('No user session found')
          return
        }

        console.log('User ID:', session.user.id)

        // Simple query to check what's in the database
        const { data, error: portfolioError } = await supabase
          .from('portfolios')
          .select('*')

        if (portfolioError) {
          console.error('Portfolio fetch error:', portfolioError)
          throw portfolioError
        }

        console.log('Raw portfolio data:', data)
        setPortfolios(data || [])

      } catch (err) {
        console.error('Error in fetchPortfolios:', err)
        setError(err instanceof Error ? err.message : 'Failed to load portfolios')
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolios()
  }, [supabase])

  if (loading) {
    return <div>Loading portfolios...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <pre>{JSON.stringify(portfolios, null, 2)}</pre>
    </div>
  )
}
