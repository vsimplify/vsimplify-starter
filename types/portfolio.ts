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

export interface Activity {
  id: number;
  name: string;
  // Add other necessary properties based on your database schema
}

export interface Agent {
  id: string;
  name: string;
  // ... other agent properties ...
}

export interface Project {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: string;

  // Added properties to align with fetched data
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
  activities: Activity[];
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
