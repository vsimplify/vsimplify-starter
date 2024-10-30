export type Project = {
  id: number;
  title: string;
  description: string | null;
  status: string;
  progress: number | undefined;
  createdAt: string;
  updatedAt: string | null;
  dueOn: string;
  domainId: number;
  user_id: string;
  email: string;
  goal: string;
  objective: string;
  outcome: string;
  nugget: string;
  missions: Mission[];
  agents: Agent[];
};

export type Mission = {
  abandonedForTokens: boolean;
  createdAt: string;
  domainId: number;
  email: string;
  id: number;
  inTokens: number;
  name: string;
  outTokens: number;
  process: "SEQUENTIAL" | "HIERARCHICAL";
  projectId: number;
  status: string;
  updatedAt: string | null;
  user_id: string;
  verbose: boolean;
};

export type Agent = {
  // Define the properties for the Agent type
}; 