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

// Task types
export type TaskMetrics = MetricsData & Json;

export type Task = Omit<DBTask, 'metrics'> & {
  metrics?: TaskMetrics;
};

// Agent types
export type Agent = DBAgent & {
  performanceRating?: number;
  successRate?: number;
  userFeedback?: string[];
  metrics?: MetricsData;
};

// Mission types
type AgentToMission = Database['public']['Tables']['_AgentToMission']['Row'];

export interface Mission extends Omit<DBMission, 'tasks'> {
  tasks: Task[];
  agents: Agent[];
  _AgentToMission: AgentToMission[];
  metrics?: MetricsData;
}

// Project types
export type Project = DBProject & {
  missions?: Mission[];
  agents?: Agent[];
  metrics?: MetricsData;
};

// Portfolio types
export type Portfolio = DBPortfolio & {
  projects?: Project[];
  releases?: Release[];
  teams?: Team[];
  themes?: Theme[];
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

export const isMission = (item: any): item is Mission => {
  return item && 
    typeof item.id === 'number' && 
    typeof item.name === 'string' &&
    Array.isArray(item.tasks);
};

export const isAgent = (item: any): item is Agent => {
  return item && 
    typeof item.id === 'number' && 
    typeof item.role === 'string' &&
    typeof item.goal === 'string';
};

// Response types
export type PortfolioResponse = {
  data: Portfolio | null;
  error: Error | null;
};

export type ProjectResponse = {
  data: Project | null;
  error: Error | null;
};

export type MissionResponse = {
  data: Mission | null;
  error: Error | null;
};

export type AgentResponse = {
  data: Agent | null;
  error: Error | null;
};
