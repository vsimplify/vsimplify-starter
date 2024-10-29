'use client'

import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { Accordion } from '@/components/ui/accordion'
import { motion, AnimatePresence } from 'framer-motion'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { PortfolioCard } from './PortfolioCard'
import { Spinner } from '@/components/ui/spinner'
import type { Portfolio } from '@/types/portfolio'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/supabase'

interface PortfolioListProps {
  userId: string
}

export default function PortfolioList({ userId }: PortfolioListProps) {
  const { ref, inView } = useInView()
  const supabase = createClientComponentClient<Database>()

  const fetchPortfolios = async (page: number) => {
    const from = (page - 1) * 10
    const to = from + 9
    
    const { data, error } = await supabase
      .from('portfolios')
      .select(`
        *,
        Project:project_id (
          id,
          description,
          goal,
          objective
        )
      `)
      .eq('user_id', userId)
      .range(from, to)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as unknown as Portfolio[]
  }

  const { data, loading, hasMore, loadMore } = useInfiniteScroll<Portfolio>({
    fetchFn: fetchPortfolios,
    initialPage: 1,
    pageSize: 10
  })

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore()
    }
  }, [inView, hasMore, loading, loadMore])

  return (
    <Accordion type="single" collapsible className="w-full">
      <AnimatePresence>
        {data?.map((portfolio, i) => (
          <motion.div
            key={portfolio.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <PortfolioCard portfolio={portfolio} />
          </motion.div>
        ))}
      </AnimatePresence>
      
      <div ref={ref} className="h-10 flex justify-center">
        {loading && <Spinner />}
      </div>
    </Accordion>
  )
}
