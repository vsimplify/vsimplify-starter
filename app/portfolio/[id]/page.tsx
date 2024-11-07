import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import PortfolioList from '@/components/portfolio/xPortfolioList'

type RawMission = {
  id: number;
  name: string | null;
  process: string | null;
  status: string | null;
  project_id: number;
  token_usage: number | null;
  agent_missions: Array<{
    agent: any;
    status: string;
    token_usage: number;
    cost: number;
  }> | null;
};

export default async function PortfolioPage() {
  const supabase = createServerComponentClient({ cookies })

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return <div>Please sign in to view Portfolio</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Portfolio</h1>
      <PortfolioList />
    </div>
  )
} 