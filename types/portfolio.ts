import { Json } from '@/types/supabase';

type ForUse = 'Personal' | 'Business'
type Audience = 'Individual' | 'Team' | 'Enterprise'
type Domain = 'AI' | 'Web' | 'Mobile' | 'Data' | 'Cloud' | 'Security'
type Area = 'Development' | 'Analysis' | 'Design' | 'Testing' | 'Operations'

export interface CategoryFilter {
  forUse: ForUse
  audience: Audience
  domain: Domain
  area: Area
}

export interface Agent {
  id: number;
  allowDelegation: boolean;
  backstory: string | null;
  createdAt: string;
  creator: string;
  domainId: number;
  email: string;
  goal: string;
  image: string | null;
  memory: boolean;
  role: string;
  title: string;
  tools: string[] | null;
  updatedAt: string;
  user_id: string;
  verbose: boolean;
}

interface AgentToMission {
  A: number;  // Agent ID
  B: number;  // Mission ID
}

export interface Mission {
  id: number;
  abandonedForTokens: boolean;
  createdAt: string;
  domainId: number;
  email: string;
  inTokens: number;
  name: string;
  outTokens: number;
  process: string;
  projectId: number;
  result: string | null;
  taskResult: string | null;
  tasks: Json[] | null;
  updatedAt: string | null;
  user_id: string;
  verbose: boolean;
  _AgentToMission?: AgentToMission[];
}

export interface Project {
  id: number;
  description: string | null;
  createdAt: string;
  domainId: number;
  dueOn: string;
  email: string;
  goal: string;
  nugget: string;
  objective: string;
  outcome: string;
  updatedAt: string | null;
  user_id: string;
  title: string | null;
  progress: number | null;
  status: string | null;
  missions?: Mission[];
  agents: Agent[];
}

export interface Portfolio extends Project {
  // If needed, extend Project for Portfolio-specific properties
  // Otherwise, you can use Project directly
}

export interface Sample {
  id: number;
  uri: string;
  // Add other necessary properties based on your database schema
}
