import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from '@/types/supabase';
import { convertToPortfolio } from '@/types/portfolio';
import PortfolioList from "@/components/portfolio/PortfolioList";
import DomainFilter from "@/components/portfolio/DomainFilter";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const revalidate = 0;

export default async function PortfolioPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch all portfolios with their related projects
  const { data: portfoliosData, error: portfoliosError } = await supabase
    .from("portfolios")
    .select(`
      *,
      projects:Project(
        *,
        missions:Mission(
          *,
          _AgentToMission(
            A,
            B
          )
        )
      )
    `);

  // Fetch unique domainIds from portfolios
  const { data: domains, error: domainsError } = await supabase
    .from("Domain")
    .select("*")
    .order('id');

  if (portfoliosError) {
    console.error("Error fetching portfolios:", portfoliosError);
    return <div>Error loading portfolios: {portfoliosError.message}</div>;
  }

  if (domainsError) {
    console.error("Error fetching domains:", domainsError);
    return <div>Error loading domains: {domainsError.message}</div>;
  }

  const portfolios = portfoliosData?.map(convertToPortfolio) || [];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Portfolios</h1>
        <Link href="/portfolio/create">
          <Button>Create Portfolio</Button>
        </Link>
      </div>

      <div className="mb-6">
        <DomainFilter domains={domains || []} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio) => (
          <Link key={portfolio.id} href={`/portfolio/${portfolio.id}`}>
            <PortfolioItemCard
              portfolio={portfolio}
              metrics={getMetricsSummary(portfolio)}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

