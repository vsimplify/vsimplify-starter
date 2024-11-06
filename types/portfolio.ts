import { Database } from '@/lib/database.types';
import { Sample } from './sample';
import { Json } from '@/types/supabase';

// Existing types from database.types.ts
type DBPortfolio = Database['public']['Tables']['portfolios']['Row'];
type DBProject = Database['public']['Tables']['Project']['Row'];
type DBMission = Database['public']['Tables']['Mission']['Row'] & {
  _AgentToMission: AgentToMission[];
  token_usage?: number;
  execution_time?: number;
  cost_per_execution?: number;
  name: string;
  description: string;
  status: string;
  projectId: number;
  createdAt: string;
  updatedAt: string;
};
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
export type Mission = {
  id: string | number;
  title?: string;
  name?: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  createdAt?: string;
  updatedAt?: string;
  tokenUsage?: number;
  cost?: number;
  projectId: number;
  project_id?: number;
  tasks?: Task[];
  agents?: Agent[];
  metrics?: MetricsData;
  process?: string;
  email?: string;
  inTokens?: number;
  outTokens?: number;
  abandonedForTokens?: boolean;
  verbose?: boolean;
  result?: any;
  user_id?: string;
  domainId?: string;
  _AgentToMission?: AgentToMission[];
  token_usage?: number;
  execution_time?: number;
  cost_per_execution?: number;
  taskResult?: any;
};

// Agent types
export interface Agent extends Omit<DBAgent, 'metrics'> {
  name: string;
  description?: string;
  metrics?: MetricsData;
  performanceRating?: number;
}

// Task types
export interface Task {
  id: string;
  name: string;
  description: string;
  assignedAgentId: number;
  missionId: number;
  status: string;
  priority: string;
  dependencies: string[];
  expected_output: string;
  async_execution: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
  metrics?: MetricsData;
}

// Project types
export type Project = {
  id: string;
  title: string;
  description: string;
  status: string;
  missions: Mission[];
  domain?: {
    id: string;
    name: string;
  };
  metrics?: MetricsData;
  progress?: number;
  portfolio_id?: string;
};

// Portfolio types
export type Portfolio = {
  id: string;
  title: string;
  description: string;
  focus_area?: 'home' | 'work';
  created_at: string;
  updated_at?: string;
  user_id: string;
  initiative?: string;
  status: 'active' | 'archived';
  progress?: number;
  domainId?: string | number;
  projects?: Project[];
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
): Project => {
  const projectId = Number(project.id);
  const projectMissions = missions.filter(mission => mission.projectId === projectId);
  
  const metrics: MetricsData = {
    tokenUsage: projectMissions.reduce((sum, m) => sum + (m.tokenUsage || 0), 0),
    costPerExecution: projectMissions.reduce((sum, m) => sum + (m.cost || 0), 0),
    executionTime: projectMissions.reduce((sum, m) => sum + (m.metrics?.executionTime || 0), 0),
    successRate: projectMissions.length 
      ? projectMissions.filter(m => m.status === 'completed').length / projectMissions.length * 100 
      : 0,
    lastUpdated: new Date()
  };

  return {
    id: project.id.toString(),
    title: project.title || '',
    description: project.description || '',
    status: project.status || '',
    missions: projectMissions,
    domain: project.domainId ? {
      id: project.domainId.toString(),
      name: project.title || ''
    } : undefined,
    metrics
  };
};

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

// Add type conversion helper
export const convertToPortfolio = (data: any): Portfolio => {
  return {
    id: data.id,
    title: data.title || data.name || '',
    description: data.description || '',
    status: data.status || 'active',
    progress: data.progress || 0,
    user_id: data.user_id,
    created_at: data.created_at,
    updated_at: data.updated_at,
    domainId: data.domainId,
    projects: data.projects ? data.projects.map(convertToProject) : [],
    metrics: data.metrics || null,
    focus_area: data.focus_area,
    initiative: data.initiative
  };
};

// Add missing AgentToMission type
type AgentToMission = Database['public']['Tables']['_AgentToMission']['Row'];
