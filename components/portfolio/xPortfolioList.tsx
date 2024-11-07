'use client';

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Portfolio } from '@/types/portfolio'

export default function PortfolioList() {
  const [Portfolio, setPortfolio] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        // First, log the user session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        if (sessionError) {
          console.error('Session error:', sessionError)
          throw new Error(`Authentication error: ${sessionError.message}`)
        }

        if (!session?.user) {
          console.log('No user session found')
          throw new Error('No authenticated user found. Please log in.')
        }

        console.log('User ID:', session.user.id)

        // Simple query to check what's in the database
        const { data, error: portfolioError } = await supabase
          .from('Portfolio')
          .select('*')

        if (portfolioError) {
          console.error('Portfolio fetch error:', portfolioError)
          throw new Error(`Database error: ${portfolioError.message}`)
        }

        console.log('Raw portfolio data:', data)
        
        if (!data) {
          throw new Error('No data returned from database')
        }

        setPortfolio(data)

      } catch (err) {
        console.error('Error in fetchPortfolio:', err)
        setError(err instanceof Error ? err.message : 'Unknown error occurred while loading Portfolio')
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolio()
  }, [supabase])

  if (loading) {
    return <div className="p-4 text-blue-600">Loading Portfolio...</div>
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h3 className="text-red-800 font-semibold">Error Loading Portfolio</h3>
        <p className="text-red-600">{error}</p>
        <pre className="mt-2 text-sm text-red-500 whitespace-pre-wrap">
          {error}
        </pre>
      </div>
    )
  }

  if (Portfolio.length === 0) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-yellow-700">No Portfolio found. Create your first portfolio to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Your Portfolio ({Portfolio.length})</h2>
      <pre className="bg-gray-50 p-4 rounded-md overflow-auto">
        {JSON.stringify(Portfolio, null, 2)}
      </pre>
    </div>
  )
}
