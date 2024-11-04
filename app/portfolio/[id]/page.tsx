import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/types/supabase";
import { convertToPortfolio, Mission } from "@/types/portfolio";
import { 
  PortfolioHeader,
  PortfolioMetrics,
  ProjectList,
  ActivityTimeline
} from "@/components/portfolio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export const revalidate = 0;

export default async function PortfolioPage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch portfolio with related data
  const { data, error } = await supabase
    .from("portfolios")
    .select(`
      *,
      domain:Domain(*),
      projects:Project!portfolio_id(
        *,
        domain:Domain(*),
        missions:Mission!project_id(
          *,
          agent_missions:_AgentToMission(
            agent:Agent(*),
            mission_id,
            status,
            token_usage,
            cost
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

  if (!portfolio) {
    return <div>Portfolio not found.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <PortfolioHeader portfolio={portfolio} />
      
      <div className="mt-8">
        <PortfolioMetrics portfolio={portfolio} />
      </div>

      <Tabs defaultValue="projects" className="mt-8">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="mt-6">
          <Card className="p-6">
            <ProjectList 
              projects={portfolio.projects}
              portfolioId={portfolio.id}
            />
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="mt-6">
          <Card className="p-6">
            <ActivityTimeline 
              activities={portfolio.projects
                .flatMap(p => p.missions ?? [])
                .filter((mission): mission is Mission => mission !== undefined)}
            />
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Add analytics components here */}
              <div className="col-span-2">
                <h3 className="text-lg font-medium mb-4">Token Usage & Costs</h3>
                {/* Add token usage chart component */}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 