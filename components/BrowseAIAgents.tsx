import React, { useState, useMemo } from 'react';
import Select, { SingleValue } from 'react-select';
import { domainData } from '../data/domainData';
import { domainData as domainDataPROD } from '../data/domainData-PROD';
import { useQuery } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { Agent } from '@/types/portfolio';
import { AgentSlider } from './ui/AgentSlider';
import { FEATURES } from '@/mvp/config/features';

interface Option {
  value: string;
  label: string;
}

type BrowseAIAgentsProps = {
  userId: string;
  onAgentSelect: (agentId: number) => void;
  selectedAgentId: number | null;
};

const fetchAgents = async (userId: string): Promise<Agent[]> => {
  const supabase = createClientComponentClient<Database>();
  
  try {
    const { data, error } = await supabase
      .from('Agent')
      .select('*')
      .eq('user_id', userId);
    
    if (error) throw error;

    // Filter based on environment
    if (!FEATURES.USE_PROD_DATA) {
      // MVP: Show only 7 agents (4 Home, 3 Work)
      return (data as Agent[]).filter((agent, index) => {
        const domain = domainData.find(d => d.Id === agent.domainId);
        if (!domain) return false;
        
        if (domain.ForUse === 'Home 🏠') {
          return index < 4; // First 4 Home agents
        } else if (domain.ForUse === 'Work 💼') {
          return index < 3; // First 3 Work agents
        }
        return false;
      });
    }

    return data as Agent[];
  } catch (error) {
    console.error('Error fetching agents:', error);
    return [];
  }
};

export const BrowseAIAgents: React.FC<BrowseAIAgentsProps> = ({
  userId,
  onAgentSelect,
  selectedAgentId
}) => {
  // Initialize with pre-selected filters
  const [selectedFocusArea, setSelectedFocusArea] = useState<SingleValue<Option>>({
    value: 'Work 💼',
    label: 'Work 💼'
  });
  const [selectedAudience, setSelectedAudience] = useState<SingleValue<Option>>({
    value: 'Individual 👤',
    label: 'Individual 👤'
  });
  const [selectedDomain, setSelectedDomain] = useState<SingleValue<Option>>({
    value: 'Digital Services 🌐',
    label: 'Digital Services 🌐'
  });
  const [selectedArea, setSelectedArea] = useState<SingleValue<Option>>({
    value: 'Productivity ⚡',
    label: 'Productivity ⚡'
  });

  // Use appropriate domain data based on environment
  const currentDomainData = FEATURES.USE_PROD_DATA ? domainDataPROD : domainData;

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['agents', userId, FEATURES.USE_PROD_DATA],
    queryFn: () => fetchAgents(userId)
  });

  // Filter options based on environment
  const focusAreaOptions = useMemo(() => {
    const areas = Array.from(new Set(currentDomainData.map(item => item.ForUse)));
    return areas.map(area => ({
      value: area,
      label: area === 'Work 💼' ? 'Work 💼' : 'Home 🏠'
    }));
  }, [currentDomainData]);

  // Generate options for Audience based on selected Focus Area
  const audienceOptions: Option[] = useMemo(() => {
    if (!selectedFocusArea) return [];
    const filtered = currentDomainData.filter(item => item.ForUse === selectedFocusArea.value);
    const uniqueAudiences = Array.from(new Set(filtered.map(item => item.Audience)));
    return uniqueAudiences
      .filter(audience => audience)
      .map(audience => ({ 
        value: audience,
        label: audience === 'Individual' ? 'Individual 👤' : audience
      }));
  }, [selectedFocusArea, currentDomainData]);

  // Generate options for Domain based on selected Audience
  const domainOptions: Option[] = useMemo(() => {
    if (!selectedAudience) return [];
    const filtered = currentDomainData.filter(
      item =>
        item.ForUse === selectedFocusArea?.value &&
        item.Audience === selectedAudience.value
    );
    const uniqueDomains = Array.from(new Set(filtered.map(item => item.Domain)));
    return uniqueDomains
      .filter(domain => domain)
      .map(domain => ({ 
        value: domain,
        label: domain === 'Digital Services' ? 'Digital Services 🌐' : domain
      }));
  }, [selectedFocusArea, selectedAudience, currentDomainData]);

  // Generate options for Area based on selected Domain
  const areaOptions: Option[] = useMemo(() => {
    if (!selectedDomain) return [];
    const filtered = currentDomainData.filter(
      item =>
        item.ForUse === selectedFocusArea?.value &&
        item.Audience === selectedAudience?.value &&
        item.Domain === selectedDomain.value
    );
    const uniqueAreas = Array.from(new Set(filtered.map(item => item.Area)));
    return uniqueAreas
      .filter(area => area)
      .map(area => ({ 
        value: area,
        label: area === 'Productivity' ? 'Productivity ⚡' : area
      }));
  }, [selectedFocusArea, selectedAudience, selectedDomain, currentDomainData]);

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

  // Filter agents based on selections
  const filteredAgents = useMemo(() => {
    let filtered = agents;

    if (selectedFocusArea) {
      filtered = filtered.filter(agent => {
        const domain = currentDomainData.find(d => d.Id === agent.domainId);
        return domain?.ForUse === selectedFocusArea.value;
      });
    }

    if (selectedAudience) {
      filtered = filtered.filter(agent => {
        const domainMatch = currentDomainData.find(d => 
          Number(d.Id) === Number(agent.domainId)
        );
        return domainMatch?.Audience === selectedAudience.value;
      });
    }

    if (selectedDomain) {
      filtered = filtered.filter(agent => {
        const domainMatch = currentDomainData.find(d => 
          Number(d.Id) === Number(agent.domainId)
        );
        return domainMatch?.Domain === selectedDomain.value;
      });
    }

    if (selectedArea) {
      filtered = filtered.filter(agent => {
        const domainMatch = currentDomainData.find(d => 
          Number(d.Id) === Number(agent.domainId)
        );
        return domainMatch?.Area === selectedArea.value;
      });
    }

    return filtered;
  }, [agents, selectedFocusArea, selectedAudience, selectedDomain, selectedArea, currentDomainData]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select
          placeholder="Select Focus Area"
          options={focusAreaOptions}
          value={selectedFocusArea}
          onChange={handleFocusAreaChange}
          isClearable
        />
        <Select
          placeholder="Select Audience"
          options={audienceOptions}
          value={selectedAudience}
          onChange={handleAudienceChange}
          isClearable
          isDisabled={!selectedFocusArea}
        />
        <Select
          placeholder="Select Domain"
          options={domainOptions}
          value={selectedDomain}
          onChange={handleDomainChange}
          isClearable
          isDisabled={!selectedAudience}
        />
        <Select
          placeholder="Select Area"
          options={areaOptions}
          value={selectedArea}
          onChange={handleAreaChange}
          isClearable
          isDisabled={!selectedDomain}
        />
      </div>

      {isLoading ? (
        <div>Loading agents...</div>
      ) : (
        <AgentSlider 
          agents={filteredAgents}
          itemsPerView={FEATURES.USE_PROD_DATA ? 4 : 3}
        />
      )}

      {FEATURES.DEBUG_MODE && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <pre>
            {JSON.stringify({
              environment: FEATURES.USE_PROD_DATA ? 'PROD' : 'MVP',
              totalAgents: agents.length,
              filteredAgents: filteredAgents.length,
              filters: {
                focusArea: selectedFocusArea?.value,
                audience: selectedAudience?.value,
                domain: selectedDomain?.value,
                area: selectedArea?.value
              }
            }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default BrowseAIAgents;