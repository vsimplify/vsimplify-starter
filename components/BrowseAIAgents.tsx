'use client';

import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { useQuery } from '@tanstack/react-query';
import { Agent } from '@/types/agent';
import { MetricsData } from '@/types/portfolio';
import styles from './BrowseAIAgents.module.css';

interface BrowseAIAgentsProps {
  userId: string;
  onAgentSelect: (agentId: number) => void;
  selectedAgentId: number | null;
}

type DBAgent = Database['public']['Tables']['Agent']['Row'] & {
  metrics?: {
    tokenUsage: number;
    executionTime: number;
    costPerExecution: number;
    successRate: number;
    lastUpdated: string;
  } | null;
};

const convertToAgent = (data: DBAgent): Agent => {
  const metrics: MetricsData | undefined = data.metrics ? {
    tokenUsage: data.metrics.tokenUsage || 0,
    executionTime: data.metrics.executionTime || 0,
    costPerExecution: data.metrics.costPerExecution || 0,
    successRate: data.metrics.successRate || 0,
    lastUpdated: new Date(data.metrics.lastUpdated)
  } : undefined;

  return {
    id: data.id,
    title: data.title,
    role: data.role,
    goal: data.goal,
    backstory: data.backstory,
    allowDelegation: data.allowDelegation,
    memory: data.memory,
    verbose: data.verbose,
    creator: data.creator,
    email: data.email,
    image: data.image,
    tools: data.tools,
    domainId: data.domainId,
    user_id: data.user_id,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    metrics
  };
};

export default function BrowseAIAgents({ userId, onAgentSelect, selectedAgentId }: BrowseAIAgentsProps) {
  const supabase = createClientComponentClient<Database>();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: agents, isLoading, error } = useQuery({
    queryKey: ['agents', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Agent')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data ? data.map((agent) => convertToAgent(agent as DBAgent)) : [];
    }
  });

  if (isLoading) {
    return <div className="text-center p-4">Loading agents...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error loading agents: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search agents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>
      
      <div className={styles.agentGrid}>
        {agents?.filter(agent => 
          agent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.role.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((agent) => (
          <div
            key={agent.id}
            className={`${styles.agentCard} ${selectedAgentId === agent.id ? styles.selected : ''}`}
            onClick={() => onAgentSelect(agent.id)}
          >
            {agent.image && (
              <img
                src={agent.image}
                alt={agent.title}
                className={styles.agentImage}
              />
            )}
            <div className={styles.agentInfo}>
              <h3 className={styles.agentTitle}>{agent.title}</h3>
              <p className={styles.agentRole}>{agent.role}</p>
              {agent.metrics && (
                <div className={styles.metrics}>
                  <p>Success Rate: {agent.metrics.successRate}%</p>
                  <p>Cost: ${agent.metrics.costPerExecution}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}