'use client';

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Portfolio } from '@/types/portfolio'
import { Accordion } from '@/components/ui/accordion'
import { Spinner } from '@/components/ui/spinner'

export default function PortfolioList() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolios')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        setPortfolios(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load portfolios')
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolios()
  }, [supabase])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    )
  }

  if (portfolios.length === 0) {
    return <p className="text-gray-500">No portfolios found.</p>
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {portfolios.map((portfolio) => (
        <div key={portfolio.id} className="mb-4">
          <h3 className="text-lg font-semibold">{portfolio.title}</h3>
          <p className="text-gray-600">{portfolio.description}</p>
          <div className="mt-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {portfolio.focus_area}
            </span>
            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded ml-2">
              {portfolio.initiative}
            </span>
          </div>
        </div>
      ))}
    </Accordion>
  )
}
