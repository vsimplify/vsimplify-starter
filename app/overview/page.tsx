"use client";

import { useState, useEffect, useMemo } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from '@/lib/database.types';
import { useQuery } from '@tanstack/react-query';
import PortfolioDashboard from "@/components/portfolio/PortfolioDashboard";
import BrowseAIAgents from "@/components/BrowseAIAgents";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@material-tailwind/react";
import NavigationMenu from '@/components/NavigationMenu';
import { User } from '@supabase/supabase-js';
import { Project, Mission, MetricsData } from '@/types/portfolio';
import { useRouter } from 'next/navigation';
import { convertToMission } from '@/types/mission';

export const dynamic = "force-dynamic";

const getErrorDetails = (error: any) => {
  if (error?.message) return error.message;
  if (error?.error_description) return error.error_description;
  if (typeof error === 'string') return error;
  return JSON.stringify(error, null, 2);
};

type AgentToMission = Database['public']['Tables']['_AgentToMission']['Row'];
type DBMission = Database['public']['Tables']['Mission']['Row'] & {
  _AgentToMission: AgentToMission[];
  token_usage?: number;
  execution_time?: number;
  cost_per_execution?: number;
  name?: string;
  process?: string;
  created_at: string;
  updated_at: string;
  project_id: number;
  mission_status?: 'pending' | 'in_progress' | 'completed' | 'failed';
};

const convertDBMissionToMission = (dbMission: DBMission): Mission => {
  if (!dbMission) return null as unknown as Mission;
  
  return {
    id: String(dbMission.id || ''),
    title: dbMission.name || dbMission.process || '',
    description: dbMission.process || '',
    status: (dbMission.mission_status as Mission['status']) || 'pending',
    createdAt: dbMission.created_at,
    updatedAt: dbMission.updated_at,
    tokenUsage: dbMission.token_usage || 0,
    cost: dbMission.cost_per_execution || 0,
    projectId: dbMission.project_id || 0,
    tasks: [],
    agents: [],
    metrics: {
      tokenUsage: dbMission.token_usage || 0,
      executionTime: dbMission.execution_time || 0,
      costPerExecution: dbMission.cost_per_execution || 0,
      successRate: 0,
      lastUpdated: new Date()
    }
  };
};

const convertToProject = (
  project: Database['public']['Tables']['Project']['Row'],
  missions: Mission[]
): Project => {
  if (!project?.id) return null as unknown as Project;
  
  const projectId = project.id;
  const filteredMissions = missions.filter(mission => 
    mission && mission.projectId === projectId
  );

  return {
    id: String(projectId),
    title: project.title || '',
    description: project.description || '',
    status: project.status || '',
    missions: filteredMissions,
    domain: project.domainId ? {
      id: String(project.domainId),
      name: project.title || ''
    } : undefined
  };
};

// Update the project card component
const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-all">
      <h3 className="font-medium">{project.title}</h3>
      <p className="text-sm text-muted-foreground">{project.description}</p>
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Activities: {project.missions.length}</span>
          <span>Completed: {project.missions.filter(m => m.status === 'completed').length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all"
            style={{ width: `${project.progress || 0}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

type Domain = {
  id: string;
  name: string;
};

type DomainFilterProps = {
  domains: Domain[];
  selectedDomain: string | null;
  onDomainChange: (domainId: string) => void;
};

type PortfolioGroup = {
  id: string;
  title: string;
  projects: Project[];
};

type PortfolioAccordionProps = {
  portfolios: PortfolioGroup[];
  expandedPortfolios: string[];
  togglePortfolio: (id: string) => void;
};

// Add domain filter component
const DomainFilter = ({ domains, selectedDomain, onDomainChange }: DomainFilterProps) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Domain</label>
        <select 
          className="form-select"
          value={selectedDomain || ""}
          onChange={(e) => onDomainChange(e.target.value)}
        >
          <option value="">All Domains</option>
          {domains.map(domain => (
            <option key={domain.id} value={domain.id}>{domain.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

// Add portfolio accordion component
const PortfolioAccordion = ({ portfolios, expandedPortfolios, togglePortfolio }: PortfolioAccordionProps) => {
  return (
    <div className="space-y-4">
      {portfolios.map((portfolio) => (
        <div key={portfolio.id} className="border rounded-lg overflow-hidden">
          <motion.div
            initial={false}
            className="p-4 bg-gray-50 cursor-pointer"
            onClick={() => togglePortfolio(portfolio.id)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">{portfolio.title}</h2>
              <ChevronDownIcon className="w-5 h-5" />
            </div>
          </motion.div>
          <AnimatePresence>
            {expandedPortfolios.includes(portfolio.id) && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 space-y-4">
                  {portfolio.projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

type FilterState = {
  domain: string;
  forUse: string;
  audience: string;
};

export default function OverviewPage() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [showBrowseAgents, setShowBrowseAgents] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [expandedPortfolios, setExpandedPortfolios] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    domain: '',
    forUse: '',
    audience: ''
  });

  // Add domains query with cascading filter data
  const { data: domainData, isLoading: domainsLoading } = useQuery({
    queryKey: ['domains'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Domain')
        .select('*')
        .order('Domain');
      
      if (error) throw error;

      // Get unique values for each filter level
      const domains = new Set<string>();
      const forUseByDomain = new Map<string, Set<string>>();
      const audienceByForUse = new Map<string, Set<string>>();

      data?.forEach(item => {
        domains.add(item.Domain || '');
        
        if (item.Domain && item.ForUse) {
          if (!forUseByDomain.has(item.Domain)) {
            forUseByDomain.set(item.Domain, new Set());
          }
          forUseByDomain.get(item.Domain)?.add(item.ForUse);
        }

        if (item.ForUse && item.Audience) {
          if (!audienceByForUse.has(item.ForUse)) {
            audienceByForUse.set(item.ForUse, new Set());
          }
          audienceByForUse.get(item.ForUse)?.add(item.Audience);
        }
      });

      return {
        domains: Array.from(domains),
        forUseByDomain: Object.fromEntries(
          Array.from(forUseByDomain.entries()).map(([k, v]) => [k, Array.from(v)])
        ),
        audienceByForUse: Object.fromEntries(
          Array.from(audienceByForUse.entries()).map(([k, v]) => [k, Array.from(v)])
        ),
        rawDomains: data || []
      };
    }
  });

  // Query for user data
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async (): Promise<User | null> => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Auth error:', error);
        router.push('/login');
        return null;
      }
      return user;
    }
  });

  // Query for projects data with agent relationships
  const { data: projects, isLoading: projectsLoading, error } = useQuery({
    queryKey: ["projects", user?.id, selectedAgentId],
    queryFn: async () => {
      if (!user?.id) return [];
      
      try {
        // First fetch projects
        const { data: projectData, error: projectError } = await supabase
          .from("Project")
          .select("*")
          .eq("user_id", user.id)
          .throwOnError();

        if (projectError) throw projectError;
        if (!projectData) return [];

        // Fetch missions for these projects
        const { data: missionData, error: missionError } = await supabase
          .from("Mission")
          .select(`
            *,
            _AgentToMission (
              A,
              B
            )
          `)
          .in(
            "project_id",
            projectData.map((project) => project.id)
          );

        if (missionError) throw missionError;

        // If an agent is selected, filter missions by agent
        const filteredMissions = selectedAgentId 
          ? (missionData as DBMission[])?.filter(mission => 
              mission._AgentToMission?.some(relation => relation.A === selectedAgentId)
            )
          : missionData as DBMission[];

        // Convert DBMission to Mission type with null checks
        const convertedMissions = (filteredMissions || [])
          .filter(Boolean)
          .map(convertDBMissionToMission)
          .filter(Boolean);

        // Map projects with their filtered missions
        return projectData
          .filter(Boolean)
          .map(project => convertToProject(project, convertedMissions))
          .filter(Boolean);

      } catch (error) {
        console.error('Data fetch error:', error);
        throw error;
      }
    },
    enabled: !!user?.id
  });

  // Filter handlers
  const handleDomainChange = (domain: string) => {
    setFilters(prev => ({
      domain,
      forUse: '',
      audience: ''
    }));
  };

  const handleForUseChange = (forUse: string) => {
    setFilters(prev => ({
      ...prev,
      forUse,
      audience: ''
    }));
  };

  const handleAudienceChange = (audience: string) => {
    setFilters(prev => ({
      ...prev,
      audience
    }));
  };

  // Filter and group projects
  const { filteredProjects, portfolioGroups } = useMemo(() => {
    if (!projects) return { filteredProjects: [], portfolioGroups: [] };
    
    // Filter projects based on domain filters
    const filtered = projects.filter(project => {
      const domain = domainData?.rawDomains.find(d => d.id.toString() === project.domain?.id);
      if (!domain) return false;

      return (
        (!filters.domain || domain.Domain === filters.domain) &&
        (!filters.forUse || domain.ForUse === filters.forUse) &&
        (!filters.audience || domain.Audience === filters.audience)
      );
    });

    // Group by portfolio
    const groups = filtered.reduce((acc, project) => {
      const portfolioId = project.portfolio_id || 'unassigned';
      if (!acc[portfolioId]) {
        acc[portfolioId] = {
          id: portfolioId,
          title: portfolioId === 'unassigned' ? 'Unassigned Projects' : 'Portfolio ' + portfolioId,
          projects: []
        };
      }
      acc[portfolioId].projects.push(project);
      return acc;
    }, {} as Record<string, PortfolioGroup>);

    return {
      filteredProjects: filtered,
      portfolioGroups: Object.values(groups)
    };
  }, [projects, filters, domainData?.rawDomains]);

  // Add domain filter handler
  const handleDomainChange = (domainId: string) => {
    setSelectedDomain(domainId);
    setSelectedAgentId(null);
  };

  // Add portfolio expansion handler
  const togglePortfolio = (portfolioId: string) => {
    setExpandedPortfolios(prev => 
      prev.includes(portfolioId)
        ? prev.filter(id => id !== portfolioId)
        : [...prev, portfolioId]
    );
  };

  if (userLoading || projectsLoading || domainsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Button variant="text" loading className="text-brown-700">
          Loading
        </Button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 max-w-md p-4">
          <p className="font-bold">Failed to load projects.</p>
          <p className="text-sm mt-2">{getErrorDetails(error)}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AI Product Dashboard</h1>
        <Button onClick={() => setShowBrowseAgents(true)}>
          Browse AI Agents
        </Button>
      </div>

      {/* Domain Filters */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium">Domain</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={filters.domain}
            onChange={(e) => handleDomainChange(e.target.value)}
          >
            <option value="">All Domains</option>
            {domainData?.domains.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">For Use</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={filters.forUse}
            onChange={(e) => handleForUseChange(e.target.value)}
            disabled={!filters.domain}
          >
            <option value="">All Uses</option>
            {filters.domain && 
              domainData?.forUseByDomain[filters.domain]?.map(forUse => (
                <option key={forUse} value={forUse}>{forUse}</option>
              ))
            }
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Audience</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={filters.audience}
            onChange={(e) => handleAudienceChange(e.target.value)}
            disabled={!filters.forUse}
          >
            <option value="">All Audiences</option>
            {filters.forUse && 
              domainData?.audienceByForUse[filters.forUse]?.map(audience => (
                <option key={audience} value={audience}>{audience}</option>
              ))
            }
          </select>
        </div>
      </div>

      {/* Project Metrics */}
      <div className="mb-6">
        <MetricsChart projects={filteredProjects} />
      </div>

      {/* Portfolio Groups */}
      <PortfolioAccordion 
        portfolios={portfolioGroups}
        expandedPortfolios={expandedPortfolios}
        togglePortfolio={togglePortfolio}
      />

      {showBrowseAgents && (
        <BrowseAIAgents
          onClose={() => setShowBrowseAgents(false)}
          selectedDomain={selectedDomain}
        />
      )}
    </div>
  );
}
