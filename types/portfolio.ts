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
  name: string;
  // ... other agent properties ...
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
  tasks: JSON[] | null;
  updatedAt: string | null;
  user_id: string;
  verbose: boolean;
  // ... other mission properties based on your database schema ...
}

export interface Project {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: string;

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
  missions: Mission[];
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
