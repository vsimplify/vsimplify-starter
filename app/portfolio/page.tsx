import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from '@/types/supabase';
import PortfolioDashboard from "@/components/portfolio/PortfolioDashboard";
import { Json } from '@/types/supabase';
import { convertToPortfolio } from '@/types/portfolio';

export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch domains with all required fields
  const { data: domains, error: domainsError } = await supabase
    .from('Domain')
    .select(`
      id,
      Domain,
      ForUse,
      Audience,
      Area,
      Agents,
      Missions,
      identifier,
      agentAbsent
    `)
    .order('Domain');

  // Fetch portfolios
  const { data: portfoliosData, error: portfoliosError } = await supabase
    .from('portfolios')
    .select(`
      id,
      title,
      description,
      status,
      progress,
      domainId,
      user_id,
      created_at,
      updated_at,
      project_id,
      projects:Project (
        id,
        title,
        description,
        status,
        domainId,
        email,
        goal,
        nugget,
        objective,
        outcome,
        dueOn,
        createdAt,
        user_id,
        missions:Mission (*)
      )
    `)
    .eq('user_id', user.id);

  if (domainsError || portfoliosError) {
    console.error("Error fetching data:", { domainsError, portfoliosError });
    return <div>Failed to load portfolio data.</div>;
  }

  // Format domains with default values for missing fields
  const formattedDomains = (domains || []).map(domain => ({
    ...domain,
    Agents: domain.Agents || [],
    Area: domain.Area || null,
    agentAbsent: domain.agentAbsent || null,
    identifier: domain.identifier || 0,
    Missions: domain.Missions || []
  }));

  // Convert portfolios data to Portfolio type
  const formattedPortfolios = (portfoliosData || []).map(portfolio => 
    convertToPortfolio(portfolio)
  );

  return (
    <PortfolioDashboard 
      initialDomains={formattedDomains}
      initialPortfolios={formattedPortfolios}
      userId={user.id}
    />
  );
}

