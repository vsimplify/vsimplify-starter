import { Database } from '@/lib/database.types';

// Existing types from database.types.ts
type DBPortfolio = Database['public']['Tables']['portfolios']['Row'];
type DBProject = Database['public']['Tables']['Project']['Row'];
type DBMission = Database['public']['Tables']['Mission']['Row'];
type DBAgent = Database['public']['Tables']['Agent']['Row'];

// New types for JIRA-style portfolio management
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

export type MetricsData = {
  tokenUsage: number;
  executionTime: number;
  costPerExecution: number;
  successRate: number;
  lastUpdated: Date;
};

export type Task = {
  id: string;
  name: string;
  description: string;
  assignedAgentId: number;
  status: 'not_started' | 'next' | 'in_progress' | 'blocked' | 'done';
  metrics?: MetricsData;
  dependencies?: string[]; // Task IDs
  priority: 'low' | 'medium' | 'high' | 'critical';
};

export type Mission = DBMission & {
  tasks: Task[];
  metrics?: MetricsData;
  agents: Agent[];
};

export type Agent = DBAgent & {
  performanceRating?: number;
  successRate?: number;
  userFeedback?: string[];
  metrics?: MetricsData;
};

export type Project = DBProject & {
  missions?: Mission[];
  agents?: Agent[];
  metrics?: MetricsData;
};

export type Portfolio = DBPortfolio & {
  projects?: Project[];
  releases?: Release[];
  teams?: Team[];
  themes?: Theme[];
  metrics?: MetricsData;
};

// Type guards for runtime type checking
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

// Utility types for API responses
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
