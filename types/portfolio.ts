import { Database } from '@/lib/database.types';
import { Sample } from './sample';
import { Json } from '@/types/supabase';

// Existing types from database.types.ts
type DBPortfolio = Database['public']['Tables']['portfolios']['Row'];
type DBProject = Database['public']['Tables']['Project']['Row'];
type DBMission = Database['public']['Tables']['Mission']['Row'];
type DBAgent = Database['public']['Tables']['Agent']['Row'];
type DBTask = Database['public']['Tables']['Task']['Row'];

// Metrics types
export interface MetricsData {
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
  metrics?: MetricsData;
}

// Agent types
export interface Agent extends Omit<DBAgent, 'metrics'> {
  metrics?: MetricsData;
  performanceRating?: number;
}

// Task types
export interface Task extends Omit<DBTask, 'metrics'> {
  metrics?: MetricsData;
}

// Project types
export type Project = DBProject & {
  missions?: Mission[];
  agents?: Agent[];
  metrics?: MetricsData;
};

// Portfolio types
export type Portfolio = Database['public']['Tables']['portfolios']['Row'] & {
  project?: Project;
  missions?: Mission[];
  releases?: Release[];
  teams?: Team[];
  themes?: Theme[];
  metrics?: MetricsData | null;
};

// Additional types for portfolio management
export type ReleaseStatus = 'planned' | 'in_progress' | 'completed';

export type Release = {
  id: string;
  version: string;
  date: Date;
  status: ReleaseStatus;
  notes: string;
};

export type Team = {
  id: string;
  name: string;
  capacity: number;
  velocity: number;
  members: string[]; // User IDs
};

export type Theme = {
  id: string;
  name: string;
  priority: number;
  progress: number;
  description?: string;
};

// Type guards
export const isPortfolio = (item: any): item is Portfolio => {
  return item && 
    typeof item.id === 'string' && 
    typeof item.title === 'string' &&
    typeof item.user_id === 'string';
};

export const isProject = (item: any): item is Project => {
  return item && 
    typeof item.id === 'number' && 
    typeof item.title === 'string' &&
    typeof item.user_id === 'string';
};

// Conversion functions
export const convertToProject = (data: any): Project => {
  if (!data) return null as unknown as Project;
  
  return {
    id: data.id,
    title: data.title || '',
    description: data.description || '',
    domainId: data.domainId,
    dueOn: data.dueOn,
    email: data.email,
    goal: data.goal,
    nugget: data.nugget,
    objective: data.objective,
    outcome: data.outcome,
    progress: data.progress || 0,
    status: data.status || 'pending',
    user_id: data.user_id,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    missions: data.missions?.map(convertToMission) || [],
    agents: data.agents || [],
    metrics: data.metrics as MetricsData
  };
};

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
    tasks: data.tasks || [],
    agents: data.agents || [],
    _AgentToMission: data._AgentToMission || [],
    token_usage: data.token_usage || 0,
    execution_time: data.execution_time || 0,
    cost_per_execution: data.cost_per_execution || 0,
    legacyTasks: data.tasks,
    taskResult: data.taskResult
  };
};

// Add type conversion helper
export const convertToPortfolio = (data: any): Portfolio => {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    status: data.status,
    progress: data.progress,
    user_id: data.user_id,
    created_at: data.created_at,
    domainId: data.domainId,
    project_id: data.project_id,
    project: data.project ? convertToProject(data.project) : undefined,
    missions: data.missions?.map(convertToMission) || [],
    metrics: data.metrics as MetricsData | null,
    releases: data.releases as Release[],
    teams: data.teams as Team[],
    themes: data.themes as Theme[]
  };
};

// Add missing AgentToMission type
type AgentToMission = Database['public']['Tables']['_AgentToMission']['Row'];
