import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/types/supabase";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type DBMission = {
  id: number;
  title: string;
  description: string;
  status: string;
  token_usage: number;
  cost_per_execution: number;
  agent_missions?: Array<{
    agent: any;
    status: string;
    token_usage: number;
    cost: number;
  }>;
};

type DBProject = {
  id: number;
  title: string;
  description: string;
  status: string;
  domain?: {
    id: number;
    Domain: string;
  };
  missions?: DBMission[];
};

type RawMission = {
  id: number;
  title: string | null;
  description: string | null;
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

type RawProject = {
  id: number;
  title: string | null;
  description: string | null;
  status: string | null;
  domain: {
    id: number;
    Domain: string;
  } | null;
};

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

  // Fetch related projects with proper type handling
  const { data: rawProjectsData, error: projectsError } = await supabase
    .from("Project")
    .select(`
      id,
      title,
      description,
      status,
      domain:Domain(id, Domain)
    `)
    .eq("portfolio_id", params.id);

  if (projectsError) {
    console.error("Error fetching projects:", projectsError);
    return <div>Failed to load projects.</div>;
  }

  // Fetch missions separately with explicit type handling
  const projectIds = rawProjectsData?.map(p => p.id) || [];
  const { data: rawMissionsData, error: missionsError } = await supabase
    .from("Mission")
    .select(`
      id,
      title,
      description,
      status,
      project_id,
      token_usage,
      agent_missions:_AgentToMission(
        agent:Agent(*),
        status,
        token_usage,
        cost
      )
    `)
    .in('project_id', projectIds);

  if (missionsError) {
    console.error("Error fetching missions:", missionsError);
    return <div>Failed to load missions.</div>;
  }

  // Process the data with proper type casting
  const projects = (rawProjectsData as RawProject[] || []).map(project => {
    // Safe type assertion for missions with unknown intermediate type
    const missionsList = ((rawMissionsData as unknown) as RawMission[] || []);
    const projectMissions = missionsList
      .filter((m): m is RawMission => {
        return m && 
          typeof m === 'object' && 
          'project_id' in m && 
          typeof m.project_id === 'number' && 
          m.project_id === project.id;
      })
      .map(mission => ({
        id: String(mission.id || ''),
        title: String(mission.title || ''),
        description: String(mission.description || ''),
        status: String(mission.status || 'pending'),
        tokenUsage: Number(mission.token_usage || 0),
        cost: 0, // Set default since we don't have cost_per_execution
        agents: Array.isArray(mission.agent_missions) 
          ? mission.agent_missions.map(am => am.agent)
          : []
      }));

    return {
      id: String(project.id),
      title: String(project.title || ''),
      description: String(project.description || ''),
      status: String(project.status || ''),
      domain: project.domain ? {
        id: String(project.domain.id),
        name: String(project.domain.Domain)
      } : undefined,
      missions: projectMissions
    };
  });

  const portfolio = portfolioData ? {
    ...portfolioData,
    projects
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
            {projects.length > 0 ? (
              <div className="grid gap-4">
                {projects.map((project) => (
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