import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/types/supabase";
import { convertToPortfolio } from "@/types/portfolio";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const { data: portfolioData, error: portfolioError } = await supabase
    .from("portfolios")
    .select(`
      *,
      domain:Domain(*)
    `)
    .eq("id", params.id)
    .single();

  if (portfolioError) {
    console.error("Error fetching portfolio:", portfolioError);
    return <div>Failed to load portfolio.</div>;
  }

  // Fetch related projects
  const { data: projectsData, error: projectsError } = await supabase
    .from("Project")
    .select(`
      *,
      domain:Domain(*),
      missions:Mission(
        *,
        agent_missions:_AgentToMission(
          agent:Agent(*),
          status,
          token_usage,
          cost
        )
      )
    `)
    .eq("portfolio_id", params.id);

  if (projectsError) {
    console.error("Error fetching projects:", projectsError);
    return <div>Failed to load projects.</div>;
  }

  const portfolio = portfolioData ? {
    ...portfolioData,
    projects: projectsData || []
  } : null;

  if (!portfolio) {
    return <div>Portfolio not found.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">{portfolio.title}</h1>
          <p className="text-muted-foreground mt-2">{portfolio.description}</p>
        </div>
      </div>

      <Tabs defaultValue="projects" className="mt-8">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="mt-6">
          <Card className="p-6">
            {portfolio.projects?.length > 0 ? (
              <div className="grid gap-4">
                {portfolio.projects.map((project) => (
                  <div key={project.id} className="border p-4 rounded-lg">
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No projects found.</p>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="mt-6">
          <Card className="p-6">
            <p className="text-muted-foreground">Activities will be shown here.</p>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card className="p-6">
            <p className="text-muted-foreground">Analytics will be shown here.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 