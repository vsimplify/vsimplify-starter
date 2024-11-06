import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from '@/types/supabase';
import PortfolioDashboard from "@/components/portfolio/PortfolioDashboard";
import { Json } from '@/types/supabase';
import { convertToPortfolio } from '@/types/portfolio';

export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
  try {
    const supabase = createServerComponentClient<Database>({ cookies });

    // Check authentication
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser();

    if (authError) {
      console.error("Auth error:", authError);
      throw new Error(`Authentication error: ${authError.message}`);
    }

    if (!user) {
      return redirect("/login");
    }

    // Fetch domains with all required fields
    const { data: domains, error: domainsError } = await supabase
      .from('Domain')
      .select('*')
      .order('Domain');

    if (domainsError) {
      console.error("Domain fetch error:", domainsError);
      throw new Error(`Failed to fetch domains: ${domainsError.message}`);
    }

    // Fetch portfolios with related data
    const { data: portfoliosData, error: portfoliosError } = await supabase
      .from('portfolios')
      .select(`
        *,
        projects:Project (
          *,
          missions:Mission (*)
        )
      `)
      .eq('user_id', user.id);

    if (portfoliosError) {
      console.error("Portfolio fetch error:", portfoliosError);
      throw new Error(`Failed to fetch portfolios: ${portfoliosError.message}`);
    }

    console.log('Raw portfolios data:', portfoliosData); // Debug log

    if (!portfoliosData) {
      console.log('No portfolios found for user:', user.id);
      return (
        <div className="container mx-auto p-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <h3 className="text-yellow-800 font-semibold">No Portfolios Found</h3>
            <p className="text-yellow-600 mt-1">
              Create your first portfolio to get started.
            </p>
          </div>
        </div>
      );
    }

    // Format domains with default values
    const formattedDomains = domains?.map(domain => ({
      ...domain,
      Agents: domain.Agents || [],
      Area: domain.Area || null,
      agentAbsent: domain.agentAbsent || null,
      identifier: domain.identifier || 0,
      Missions: domain.Missions || []
    })) || [];

    // Convert portfolios data
    const formattedPortfolios = portfoliosData.map(portfolio => {
      try {
        return convertToPortfolio(portfolio);
      } catch (conversionError) {
        console.error('Error converting portfolio:', portfolio.id, conversionError);
        return null;
      }
    }).filter(Boolean);

    console.log('Formatted portfolios:', formattedPortfolios); // Debug log

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
          <pre className="mt-2 text-sm text-red-500 whitespace-pre-wrap overflow-auto max-h-[200px]">
            {error instanceof Error 
              ? `${error.message}\n\n${error.stack}` 
              : JSON.stringify(error, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
}

