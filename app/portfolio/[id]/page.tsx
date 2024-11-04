import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/types/supabase";
import { Portfolio, convertToPortfolio } from "@/types/portfolio";
import dynamic from 'next/dynamic';

const DynamicPortfolioDetails = dynamic(() => import('@/components/portfolio/PortfolioDetails'), {
  ssr: false
});

export const revalidate = 0;

export default async function PortfolioPage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
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
    `)
    .eq("id", params.id)
    .single();

  if (error) {
    console.error("Error fetching portfolio:", error);
    return <div>Failed to load portfolio.</div>;
  }

  const portfolio = data ? convertToPortfolio(data) : null;

  return (
    <div className="p-4">
      {portfolio ? (
        <DynamicPortfolioDetails portfolio={portfolio} />
      ) : (
        <div>Portfolio not found.</div>
      )}
    </div>
  );
} 