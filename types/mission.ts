import { Database } from '@/lib/database.types';
import { Agent } from './agent';
import { Task } from './task';
import { Json } from '@/types/supabase';
import { v4 as uuidv4 } from 'uuid';
import { Mission as PortfolioMission } from './portfolio';
import { MetricsData } from './portfolio';

// Existing types from database.types.ts
type DBMission = Database['public']['Tables']['Mission']['Row'] & {
  token_usage?: number;
  execution_time?: number;
  cost_per_execution?: number;
};

// Metrics types
export interface MissionMetrics {
  tokenUsage: number;
  executionTime: number;
  costPerExecution: number;
  successRate: number;
  lastUpdated: Date;
}

// Mission types
export type Mission = PortfolioMission;

// Add missing AgentToMission type
type AgentToMission = Database['public']['Tables']['_AgentToMission']['Row'];

// Type guards
export const isMission = (item: any): item is Mission => {
  return item && 
    typeof item.id === 'number' && 
    typeof item.name === 'string' &&
    typeof item.user_id === 'string';
};

// Conversion functions
export const convertToMission = (data: any): Mission => {
  if (!data) throw new Error('Mission data is required');
  
  const metrics: MetricsData = {
    tokenUsage: data.token_usage || 0,
    executionTime: data.execution_time || 0,
    costPerExecution: data.cost_per_execution || 0,
    successRate: 0,
    lastUpdated: new Date()
  };
  
  return {
    id: data.id,
    title: data.title || data.name || '',
    name: data.name || data.title || '',
    description: data.description || '',
    status: data.status || 'pending',
    projectId: data.projectId || data.project_id,
    project_id: data.project_id || data.projectId,
    createdAt: data.created_at || data.createdAt,
    updatedAt: data.updated_at || data.updatedAt,
    tokenUsage: data.token_usage || data.tokenUsage || 0,
    cost: data.cost_per_execution || data.cost || 0,
    tasks: data.tasks || [],
    agents: data.agents || [],
    metrics,
    process: data.process,
    email: data.email,
    inTokens: data.inTokens,
    outTokens: data.outTokens,
    abandonedForTokens: data.abandonedForTokens,
    verbose: data.verbose,
    result: data.result,
    user_id: data.user_id,
    domainId: data.domainId,
    _AgentToMission: data._AgentToMission,
    token_usage: data.token_usage,
    execution_time: data.execution_time,
    cost_per_execution: data.cost_per_execution,
    taskResult: data.taskResult
  };
};

// Helper function to convert legacy tasks to new Task type
const convertLegacyTasksToTasks = (mission: any): Task[] => {
  if (mission?.tasks) {
    const legacyTasks = mission.tasks as any[];
    return legacyTasks.map(legacyTask => ({
      id: uuidv4(),
      name: legacyTask.name || '',
      description: legacyTask.description || '',
      assignedAgentId: legacyTask.assignedAgentId || null,
      missionId: mission.id,
      status: legacyTask.status || 'not_started',
      priority: legacyTask.priority || 'medium',
      dependencies: legacyTask.dependencies || null,
      metrics: legacyTask.metrics || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: mission.user_id,
      expected_output: legacyTask.expected_output || null,
      async_execution: legacyTask.async_execution || false
    }));
  }
  return [];
};
