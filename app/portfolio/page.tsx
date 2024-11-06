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

  try {
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

    if (domainsError) {
      console.error("Domain fetch error:", domainsError);
      throw new Error(`Failed to fetch domains: ${domainsError.message}`);
    }

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

    if (portfoliosError) {
      console.error("Portfolio fetch error:", portfoliosError);
      throw new Error(`Failed to fetch portfolios: ${portfoliosError.message}`);
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

  } catch (error) {
    console.error("Error in PortfolioPage:", error);
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-red-800 font-semibold">Error Loading Portfolio Data</h3>
          <p className="text-red-600 mt-1">
            {error instanceof Error ? error.message : 'An unexpected error occurred'}
          </p>
          <pre className="mt-2 text-sm text-red-500 whitespace-pre-wrap">
            {error instanceof Error ? error.stack : JSON.stringify(error, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
}

