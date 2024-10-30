import React, { useState, useMemo, useEffect } from 'react';
import Select, { SingleValue } from 'react-select';
import { domainData, Domain } from '../data/domainData';
import styles from './BrowseAIAgents.module.css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import supabase from '@/utils/supabaseClient';
import { Spinner } from '@/components/ui/spinner';
import { PortfolioCard } from '@/components/portfolio/PortfolioCard';
import { Agent } from '@/types/portfolio';

interface Option {
  value: string;
  label: string;
}

const fetchAgents = async (): Promise<Agent[]> => {
  try {
    // First check if we have a valid session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Auth session error:', sessionError);
      throw sessionError;
    }

    // Even without a session, try to fetch agents (RLS is disabled for MVP)
    const { data, error } = await supabase
      .from('Agent')
      .select('*');
    
    if (error) {
      console.error('Agent fetch error:', error);
      throw error;
    }

    if (!data) return [];

    return data as Agent[];
  } catch (error) {
    console.error('Fetch agents error:', error);
    return []; // Return empty array instead of throwing
  }
};

const BrowseAIAgents: React.FC = () => {
  const queryClient = useQueryClient();
  
  // State for each dropdown
  const [selectedFocusArea, setSelectedFocusArea] = useState<SingleValue<Option>>(null);
  const [selectedAudience, setSelectedAudience] = useState<SingleValue<Option>>(null);
  const [selectedDomain, setSelectedDomain] = useState<SingleValue<Option>>(null);
  const [selectedArea, setSelectedArea] = useState<SingleValue<Option>>(null);

  // Generate options for Focus Area
  const focusAreaOptions: Option[] = useMemo(() => {
    const uniqueFocusAreas = Array.from(new Set(domainData.map(item => item.ForUse)));
    return uniqueFocusAreas.map(area => ({ value: area, label: area }));
  }, []);

  // Generate options for Audience based on selected Focus Area
  const audienceOptions: Option[] = useMemo(() => {
    if (!selectedFocusArea) return [];
    const filtered = domainData.filter(item => item.ForUse === selectedFocusArea.value);
    const uniqueAudiences = Array.from(new Set(filtered.map(item => item.Audience)));
    return uniqueAudiences.map(audience => ({ value: audience, label: audience }));
  }, [selectedFocusArea]);

  // Generate options for Domain based on selected Audience
  const domainOptions: Option[] = useMemo(() => {
    if (!selectedAudience) return [];
    const filtered = domainData.filter(
      item =>
        item.ForUse === selectedFocusArea?.value &&
        item.Audience === selectedAudience.value
    );
    const uniqueDomains = Array.from(new Set(filtered.map(item => item.Domain)));
    return uniqueDomains.map(domain => ({ value: domain, label: domain }));
  }, [selectedFocusArea, selectedAudience]);

  // Generate options for Area based on selected Domain
  const areaOptions: Option[] = useMemo(() => {
    if (!selectedDomain) return [];
    const filtered = domainData.filter(
      item =>
        item.ForUse === selectedFocusArea?.value &&
        item.Audience === selectedAudience?.value &&
        item.Domain === selectedDomain.value
    );
    const uniqueAreas = Array.from(new Set(filtered.map(item => item.Area)));
    return uniqueAreas.map(area => ({ value: area, label: area }));
  }, [selectedFocusArea, selectedAudience, selectedDomain]);

  // Handlers for each dropdown
  const handleFocusAreaChange = (option: SingleValue<Option>) => {
    setSelectedFocusArea(option);
    setSelectedAudience(null);
    setSelectedDomain(null);
    setSelectedArea(null);
  };

  const handleAudienceChange = (option: SingleValue<Option>) => {
    setSelectedAudience(option);
    setSelectedDomain(null);
    setSelectedArea(null);
  };

  const handleDomainChange = (option: SingleValue<Option>) => {
    setSelectedDomain(option);
    setSelectedArea(null);
  };

  const handleAreaChange = (option: SingleValue<Option>) => {
    setSelectedArea(option);
  };

  // React Query hook for fetching agents
  const { data: agents, isLoading, isError, error } = useQuery({
    queryKey: ['agents'],
    queryFn: fetchAgents,
    retry: 1,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false // Don't refetch on window focus
  });

  // Handle error logging using useEffect
  useEffect(() => {
    if (error) {
      console.error('Agent query error:', error);
    }
  }, [error]);

  // Supabase real-time subscription setup
  useEffect(() => {
    const channel = supabase.channel('public:Agent')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Agent' }, payload => {
        queryClient.invalidateQueries({ queryKey: ['agents'] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Browse AI Agents</h2>
      <div className={styles.dropdownContainer}>
        <Select
          className={styles.select}
          placeholder="Select Focus Area"
          options={focusAreaOptions}
          value={selectedFocusArea}
          onChange={handleFocusAreaChange}
          isClearable
        />
        <Select
          className={styles.select}
          placeholder="Select Audience"
          options={audienceOptions}
          value={selectedAudience}
          onChange={handleAudienceChange}
          isClearable
          isDisabled={!selectedFocusArea}
        />
        <Select
          className={styles.select}
          placeholder="Select Domain"
          options={domainOptions}
          value={selectedDomain}
          onChange={handleDomainChange}
          isClearable
          isDisabled={!selectedAudience}
        />
        <Select
          className={styles.select}
          placeholder="Select Area"
          options={areaOptions}
          value={selectedArea}
          onChange={handleAreaChange}
          isClearable
          isDisabled={!selectedDomain}
        />
      </div>
      {isLoading && <Spinner />}
      {isError && (
        <div className="text-red-500">
          Error loading agents. Please try again later.
        </div>
      )}
      {!isLoading && !isError && agents && agents.length === 0 && (
        <div className="text-gray-500">
          No agents found.
        </div>
      )}
      {!isLoading && !isError && agents && agents.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {agents.map((agent: Agent) => (
            <PortfolioCard key={agent.id} agent={agent} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseAIAgents; 