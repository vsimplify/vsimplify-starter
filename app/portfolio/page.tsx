'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/database.types';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { PropsWithChildren } from 'react';
import * as RadixSelect from '@radix-ui/react-select';

// Define the Portfolio type using the generated Database types
type Portfolio = Database['public']['Tables']['Portfolio']['Row'];
type Project = Database['public']['Tables']['Project']['Row'];
type Mission = Database['public']['Tables']['Mission']['Row'];
type Task = Database['public']['Tables']['Task']['Row'];
type Domain = Database['public']['Tables']['Domain']['Row'];

// Types for related data
type MissionWithRelations = Mission & {
  Project?: Pick<Project, 'id' | 'title'> | null;
  Domain?: Pick<Domain, 'id' | 'Domain'> | null;
};

// Example: Task with relationships
type TaskWithRelations = Task & {
  Mission?: Pick<Mission, 'id' | 'name'> | null;
};

// Add type definition for Select props
type SelectWithChildren = React.ComponentProps<typeof Select> & {
  children: React.ReactNode;
};

// Add type declarations to fix the children prop issue
declare module '@radix-ui/react-select' {
  export interface SelectProps extends PropsWithChildren {}
  export interface SelectTriggerProps extends PropsWithChildren {}
  export interface SelectContentProps extends PropsWithChildren {}
  export interface SelectItemProps extends PropsWithChildren {}
}

export default function PortfolioDashboard() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const [selectedForUse, setSelectedForUse] = useState<string | undefined>(undefined);
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const [domains, setDomains] = useState<Domain[]>([]);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Domains
        const { data: domainsData, error: domainsError } = await supabase
          .from('Domain')
          .select('id, Domain, ForUse, Audience, Area')
          .returns<Domain[]>();

        if (domainsError) throw domainsError;
        setDomains(domainsData || []);

        // Fetch Portfolios
        const { data: portfoliosData, error: portfoliosError } = await supabase
          .from('Portfolio')
          .select('id, title, status, domainId, user_id, created_at')
          .returns<Portfolio[]>();

        if (portfoliosError) throw portfoliosError;
        setPortfolios(portfoliosData || []);

        // Fetch Projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('Project')
          .select(`
            id, 
            title, 
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
            portfolio_id,
            Portfolio(id, title),
            Domain(id, Domain)
          `)
          .returns<(Project & {
            Portfolio: Pick<Portfolio, 'id' | 'title'> | null,
            Domain: Pick<Domain, 'id' | 'Domain'> | null
          })[]>();

        if (projectsError) throw projectsError;
        setProjects(projectsData || []);

        // Fetch Missions
        const { data: missionsData, error: missionsError } = await supabase
          .from('Mission')
          .select(`
            id,
            name,
            process,
            project_id,
            domainId,
            email,
            createdAt,
            updatedAt,
            user_id,
            inTokens,
            outTokens,
            abandonedForTokens,
            verbose,
            Project (
              id,
              title
            ),
            Domain (
              id,
              Domain
            )
          `)
          .returns<MissionWithRelations[]>();

        if (missionsError) throw missionsError;
        setMissions(missionsData || []);

        // Fetch Tasks
        const { data: tasksData, error: tasksError } = await supabase
          .from('Task')
          .select(`
            id,
            name,
            status,
            missionId,
            user_id,
            Mission (
              id,
              name
            )
          `)
          .returns<TaskWithRelations[]>();

        if (tasksError) throw tasksError;
        setTasks(tasksData || []);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase]);

  if (loading) {
    return <div className="text-center text-white">Loading portfolios...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-red-800 font-semibold">Error Loading Data</h3>
          <p className="text-red-600 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  // Apply filters
  const filteredDomains = domains.filter(
    (domain) =>
      (!selectedForUse || domain.ForUse === selectedForUse) &&
      (!selectedAudience || domain.Audience === selectedAudience) &&
      (!selectedDomain || domain.Domain === selectedDomain) &&
      (!selectedArea || domain.Area === selectedArea)
  );

  const filteredPortfolios = portfolios.filter((portfolio) =>
    filteredDomains.some((domain) => domain.id === portfolio.domainId)
  );

  const groupedPortfolios = filteredPortfolios.reduce((acc, portfolio) => {
    const status = portfolio.status || 'Unknown';
    if (!acc[status]) acc[status] = [];
    acc[status].push(portfolio);
    return acc;
  }, {} as Record<string, Portfolio[]>);

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
        AI Portfolio Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* For Use Filter */}
        <RadixSelect.Root
          value={selectedForUse || ""}
          onValueChange={(value: string) => setSelectedForUse(value)}
        >
          <RadixSelect.Trigger className="w-full bg-gray-700 text-white border-gray-600">
            <RadixSelect.Value placeholder="Select For Use" />
          </RadixSelect.Trigger>
          <RadixSelect.Portal>
            <RadixSelect.Content>
              <RadixSelect.Viewport>
                {Array.from(new Set(domains.map((d) => d.ForUse))).map((forUse) => (
                  <RadixSelect.Item key={forUse || ""} value={forUse || ""}>
                    <RadixSelect.ItemText>{forUse}</RadixSelect.ItemText>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Viewport>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>

        {/* Audience Filter */}
        <RadixSelect.Root onValueChange={setSelectedAudience}>
          <RadixSelect.Trigger className="w-full bg-gray-700 text-white border-gray-600">
            <RadixSelect.Value placeholder="Select Audience" />
          </RadixSelect.Trigger>
          <RadixSelect.Portal>
            <RadixSelect.Content>
              <RadixSelect.Viewport>
                {Array.from(new Set(domains.map((d) => d.Audience))).map(
                  (audience) => (
                    <RadixSelect.Item key={audience || ""} value={audience || ""}>
                      <RadixSelect.ItemText>{audience}</RadixSelect.ItemText>
                    </RadixSelect.Item>
                  )
                )}
              </RadixSelect.Viewport>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>

        {/* Domain Filter */}
        <RadixSelect.Root onValueChange={setSelectedDomain}>
          <RadixSelect.Trigger className="w-full bg-gray-700 text-white border-gray-600">
            <RadixSelect.Value placeholder="Select Domain" />
          </RadixSelect.Trigger>
          <RadixSelect.Portal>
            <RadixSelect.Content>
              <RadixSelect.Viewport>
                {Array.from(new Set(domains.map((d) => d.Domain))).map((domain) => (
                  <RadixSelect.Item key={domain || ""} value={domain || ""}>
                    <RadixSelect.ItemText>{domain}</RadixSelect.ItemText>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Viewport>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>

        {/* Area Filter */}
        <RadixSelect.Root onValueChange={setSelectedArea}>
          <RadixSelect.Trigger className="w-full bg-gray-700 text-white border-gray-600">
            <RadixSelect.Value placeholder="Select Area" />
          </RadixSelect.Trigger>
          <RadixSelect.Portal>
            <RadixSelect.Content>
              <RadixSelect.Viewport>
                {Array.from(new Set(domains.map((d) => d.Area))).map(
                  (area) =>
                    area && (
                      <RadixSelect.Item key={area} value={area}>
                        <RadixSelect.ItemText>{area}</RadixSelect.ItemText>
                      </RadixSelect.Item>
                    )
                )}
              </RadixSelect.Viewport>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>
      </div>

      {Object.entries(groupedPortfolios).map(([status, portfolios]) => (
        <div key={status} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-blue-300">
            {status} Portfolios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio) => (
              <Card
                key={portfolio.id}
                className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <CardTitle className="text-white">
                    {portfolio.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="bg-gray-800"
                  >
                    <AccordionItem
                      value="projects"
                      className="border-b-0"
                    >
                      <AccordionTrigger className="text-blue-300 hover:text-blue-400">
                        Projects
                      </AccordionTrigger>
                      <AccordionContent>
                        {projects
                          .filter(
                            (p) => p.portfolio_id === portfolio.id
                          )
                          .map((project) => (
                            <Accordion
                              key={project.id}
                              type="single"
                              collapsible
                              className="mb-2"
                            >
                              <AccordionItem
                                value={`project-${project.id}`}
                                className="border-gray-700"
                              >
                                <AccordionTrigger className="text-gray-300 hover:text-gray-100">
                                  {project.title}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {['To Do', 'In Progress', 'Done'].map(
                                      (status) => (
                                        <div
                                          key={status}
                                          className="bg-gray-700 p-4 rounded-lg"
                                        >
                                          <h4 className="font-semibold mb-2 text-blue-300">
                                            {status}
                                          </h4>
                                          {tasks
                                            .filter((t) => {
                                              const mission = missions.find(
                                                (m) =>
                                                  m.id === t.missionId
                                              );
                                              return (
                                                mission &&
                                                mission.project_id ===
                                                  project.id &&
                                                t.status === status
                                              );
                                            })
                                            .map((task) => (
                                              <Card
                                                key={task.id}
                                                className="mb-2 p-2 bg-gray-600 border-gray-500"
                                              >
                                                <p className="text-sm text-gray-200">
                                                  {task.name}
                                                </p>
                                                <Badge
                                                  variant="outline"
                                                  className="mt-1 text-xs"
                                                >
                                                  {task.status}
                                                </Badge>
                                              </Card>
                                            ))}
                                        </div>
                                      )
                                    )}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

