import { Database } from '@/lib/database.types';
import { Agent } from './agent';
import { Task } from './task';
import { Json } from './supabase';
import { v4 as uuidv4 } from 'uuid';

// Existing types from database.types.ts
type DBMission = Database['public']['Tables']['Mission']['Row'];

// Metrics types
export interface MissionMetrics {
  tokenUsage: number;
  executionTime: number;
  costPerExecution: number;
  successRate: number;
  lastUpdated: Date;
}

// Mission types
export interface Mission extends Omit<DBMission, 'tasks'> {
  /** @deprecated Use tasks from Tasks table instead */
  legacyTasks?: Json | null;
  tasks: Task[];
  agents: Agent[];
  _AgentToMission: AgentToMission[];
  metrics?: MissionMetrics;
  token_usage: number;
}

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
  if (!data) return null as unknown as Mission;
  
  return {
    id: data.id,
    name: data.name,
    process: data.process,
    projectId: data.projectId,
    email: data.email,
    inTokens: data.inTokens || 0,
    outTokens: data.outTokens || 0,
    abandonedForTokens: data.abandonedForTokens || false,
    verbose: data.verbose || false,
    result: data.result,
    user_id: data.user_id,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    domainId: data.domainId,
    tasks: convertLegacyTasksToTasks(data),
    agents: data.agents || [],
    _AgentToMission: data._AgentToMission || [],
    token_usage: data.token_usage || 0,
    execution_time: data.execution_time || 0,
    cost_per_execution: data.cost_per_execution || 0,
    legacyTasks: data.tasks,
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
