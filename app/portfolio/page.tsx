import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from '@/types/supabase';
import { convertToPortfolio } from '@/types/portfolio';
import PortfolioList from "@/components/portfolio/PortfolioList";

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

  if (portfoliosError || domainsError) {
    console.error("Error fetching data:", portfoliosError || domainsError);
    return <div>Failed to load portfolios.</div>;
  }

  const portfolios = portfoliosData?.map(convertToPortfolio) || [];

  return <PortfolioList portfolios={portfolios} domains={domains || []} />;
}

