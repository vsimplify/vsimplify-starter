"use client";

import { useState, useMemo } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from '@/lib/database.types';
import { useQuery } from '@tanstack/react-query';
import { MetricsChart } from "@/components/portfolio/MetricsChart";
import { PortfolioAccordion } from "@/components/portfolio";
import { Button, ButtonProps } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { convertToProject } from '@/types/portfolio';
import { convertToMission } from '@/types/mission';
import { Project, Portfolio } from '@/types/portfolio';

export const dynamic = "force-dynamic";

type DomainData = {
  domains: string[];
  forUseByDomain: Record<string, string[]>;
  audienceByForUse: Record<string, string[]>;
  areaByAudience: Record<string, string[]>;
  rawDomains: any[];
};

export default function OverviewPage() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedForUse, setSelectedForUse] = useState<string | null>(null);
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [expandedPortfolios, setExpandedPortfolios] = useState<string[]>([]);
  const [showBrowseAgents, setShowBrowseAgents] = useState(false);

  // Define togglePortfolio function
  const togglePortfolio = (id: string) => {
    setExpandedPortfolios(prev => 
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  // Fetch domain data
  const { data: domainData, isLoading: domainsLoading } = useQuery<DomainData>({
    queryKey: ['domains'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Domain')
        .select('*')
        .order('Domain');
      
      if (error) throw error;

      const domains = new Set<string>();
      const forUseByDomain = new Map<string, Set<string>>();
      const audienceByForUse = new Map<string, Set<string>>();
      const areaByAudience = new Map<string, Set<string>>();

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

        if (item.Audience && item.Area) {
          if (!areaByAudience.has(item.Audience)) {
            areaByAudience.set(item.Audience, new Set());
          }
          areaByAudience.get(item.Audience)?.add(item.Area);
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
        areaByAudience: Object.fromEntries(
          Array.from(areaByAudience.entries()).map(([k, v]) => [k, Array.from(v)])
        ),
        rawDomains: data || []
      };
    }
  });

  // Fetch projects and missions
  const { data: projectsData } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Project')
        .select('*, missions:Mission(*)');
      
      if (error) throw error;
      return data || [];
    }
  });

  // Filter projects based on selected filters
  const filteredProjects = useMemo(() => {
    if (!projectsData) return [];
    return projectsData.map(project => convertToProject(
      project, 
      project.missions ? project.missions.map(convertToMission) : []
    ))
    .filter(project => {
      const domain = domainData?.rawDomains.find(d => d.id.toString() === project.domain?.id);
      if (!domain) return false;

      return (
        (!selectedDomain || domain.Domain === selectedDomain) &&
        (!selectedForUse || domain.ForUse === selectedForUse) &&
        (!selectedAudience || domain.Audience === selectedAudience) &&
        (!selectedArea || domain.Area === selectedArea)
      );
    });
  }, [projectsData, domainData, selectedDomain, selectedForUse, selectedAudience, selectedArea]);

  // Group projects into portfolios
  const portfolioGroups = useMemo(() => {
    const groups: Record<string, Portfolio> = {};

    filteredProjects.forEach(project => {
      const portfolioId = project.portfolio_id || 'unassigned';
      if (!groups[portfolioId]) {
        groups[portfolioId] = {
          id: portfolioId,
          title: portfolioId === 'unassigned' ? 'Unassigned Projects' : `Portfolio ${portfolioId}`,
          description: '',
          created_at: new Date().toISOString(),
          user_id: 'unknown',
          status: 'active',
          projects: []
        };
      }
      groups[portfolioId].projects?.push(project);
    });

    return Object.values(groups);
  }, [filteredProjects]);

  // Filter handlers
  const handleDomainChange = (domain: string) => {
    setSelectedDomain(domain);
    setSelectedForUse(null);
    setSelectedAudience(null);
    setSelectedArea(null);
  };

  const handleForUseChange = (forUse: string) => {
    setSelectedForUse(forUse);
    setSelectedAudience(null);
    setSelectedArea(null);
  };

  const handleAudienceChange = (audience: string) => {
    setSelectedAudience(audience);
    setSelectedArea(null);
  };

  const handleAreaChange = (area: string) => {
    setSelectedArea(area);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AI Product Dashboard</h1>
        <Button
          onClick={() => setShowBrowseAgents(true)}
          type="button"
          className="your-custom-class"
        >
          Browse AI Agents
        </Button>
      </div>

      {/* Domain Filters */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium">Domain</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={selectedDomain || ""}
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
            value={selectedForUse || ""}
            onChange={(e) => handleForUseChange(e.target.value)}
            disabled={!selectedDomain}
          >
            <option value="">All Uses</option>
            {selectedDomain && 
              domainData?.forUseByDomain[selectedDomain]?.map(forUse => (
                <option key={forUse} value={forUse}>{forUse}</option>
              ))
            }
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Audience</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={selectedAudience || ""}
            onChange={(e) => handleAudienceChange(e.target.value)}
            disabled={!selectedForUse}
          >
            <option value="">All Audiences</option>
            {selectedForUse && 
              domainData?.audienceByForUse[selectedForUse]?.map(audience => (
                <option key={audience} value={audience}>{audience}</option>
              ))
            }
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Area</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={selectedArea || ""}
            onChange={(e) => handleAreaChange(e.target.value)}
            disabled={!selectedAudience}
          >
            <option value="">All Areas</option>
            {selectedAudience && 
              domainData?.areaByAudience[selectedAudience]?.map(area => (
                <option key={area} value={area}>{area}</option>
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

      {/* Browse AI Agents Modal */}
      {showBrowseAgents && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowBrowseAgents(false)}>&times;</span>
            <h2>Browse AI Agents</h2>
            {/* Add your modal content here */}
          </div>
        </div>
      )}
    </div>
  );
}
