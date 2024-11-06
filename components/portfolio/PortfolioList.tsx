'use client';

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Portfolio } from '@/types/portfolio'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Spinner } from '@/components/ui/spinner'

export default function PortfolioList() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
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
          setPortfolios([])
          return
        }

        console.log('Fetching portfolios for user:', session.user.id)

        // Basic query first to test
        const { data, error: portfolioError } = await supabase
          .from('portfolios')
          .select('*')
          .eq('user_id', session.user.id)

        if (portfolioError) {
          console.error('Portfolio fetch error:', portfolioError)
          throw portfolioError
        }

        console.log('Raw portfolio data:', data)

        if (!data) {
          console.log('No portfolios found')
          setPortfolios([])
          return
        }

        // Set the raw data for now
        setPortfolios(data)

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
    return <Spinner />
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
        <pre className="mt-2 text-sm whitespace-pre-wrap">
          {error}
        </pre>
      </div>
    )
  }

  if (portfolios.length === 0) {
    return <p className="text-gray-500">No portfolios found. Create your first portfolio to get started!</p>
  }

  return (
    <Accordion type="single" collapsible>
      {portfolios.map((portfolio) => (
        <AccordionItem key={portfolio.id} value={portfolio.id}>
          <AccordionTrigger>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{portfolio.title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-4">
              <p className="text-gray-600">{portfolio.description}</p>
              <div className="mt-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {portfolio.focus_area}
                </span>
                {portfolio.initiative && (
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded ml-2">
                    {portfolio.initiative}
                  </span>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
