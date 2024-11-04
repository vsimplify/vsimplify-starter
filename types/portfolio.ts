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
export type MetricsData = {
  tokenUsage: number;
  costPerExecution: number;
  executionTime: number;
  successRate: number;
  lastUpdated: Date;
};

// Mission types
export interface Mission extends Omit<DBMission, 'tasks'> {
  /** @deprecated Use tasks from Tasks table instead */
  legacyTasks?: Json | null;
  tasks: Task[];
  agents: Agent[];
  _AgentToMission: AgentToMission[];
  metrics?: MetricsData;
  token_usage: number;
  execution_time: number;
  cost_per_execution: number;
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
export type Project = {
  id: number;
  title: string | null;
  description: string | null;
  dueOn: string;
  email: string;
  goal: string;
  nugget: string;
  objective: string;
  outcome: string;
  progress?: number | null;
  status?: string | null;
  createdAt: string;
  updatedAt: string | null;
  domainId: number;
  user_id: string;
  metrics?: MetricsData;
  missions?: Mission[];
  agents?: Agent[];
};

// Portfolio types
export type Portfolio = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  domainId?: number;
  progress?: number;
  project_id?: number;
  status?: string;
  user_id: string;
  projects: Project[];
  metrics?: MetricsData;
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
export const convertToProject = (
  project: Database['public']['Tables']['Project']['Row'],
  missions: Mission[] = []
): Project => ({
  ...project,
  title: project.title || '',
  description: project.description || '',
  missions: missions.filter(mission => mission.projectId === project.id),
  agents: [],
  metrics: {
    tokenUsage: missions.reduce((sum, m) => sum + (m.metrics?.tokenUsage ?? 0), 0),
    executionTime: missions.reduce((sum, m) => sum + (m.metrics?.executionTime ?? 0), 0),
    costPerExecution: missions.reduce((sum, m) => sum + (m.metrics?.costPerExecution ?? 0), 0),
    successRate: missions.length ? missions.reduce((sum, m) => sum + (m.metrics?.successRate ?? 0), 0) / missions.length : 0,
    lastUpdated: new Date()
  }
});

export const convertToMission = (data: any): Mission => {
  if (!data) return null as unknown as Mission;
  
  const metrics: MetricsData = {
    tokenUsage: data.token_usage || 0,
    executionTime: data.execution_time || 0,
    costPerExecution: data.cost_per_execution || 0,
    successRate: 0,
    lastUpdated: new Date()
  };
  
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
    metrics,
    token_usage: data.token_usage || 0,
    execution_time: data.execution_time || 0,
    cost_per_execution: data.cost_per_execution || 0,
    legacyTasks: data.tasks,
    taskResult: data.taskResult
  };
};

// Add type conversion helper
export const convertToPortfolio = (data: any): Portfolio => {
  // Calculate metrics from projects if they exist
  const projectMetrics = data.project?.reduce((acc: MetricsData, proj: any) => {
    if (!proj.metrics) return acc;
    return {
      tokenUsage: acc.tokenUsage + (proj.metrics.tokenUsage || 0),
      costPerExecution: acc.costPerExecution + (proj.metrics.costPerExecution || 0),
      executionTime: acc.executionTime + (proj.metrics.executionTime || 0),
      successRate: acc.successRate + (proj.metrics.successRate || 0),
      lastUpdated: new Date()
    };
  }, {
    tokenUsage: 0,
    costPerExecution: 0,
    executionTime: 0,
    successRate: 0,
    lastUpdated: new Date()
  });

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
    projects: data.project ? [convertToProject(data.project)] : [],
    metrics: projectMetrics || null
  };
};

// Add missing AgentToMission type
type AgentToMission = Database['public']['Tables']['_AgentToMission']['Row'];
