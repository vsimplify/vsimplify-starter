export interface PrimaryMetrics {
  moneySaved: number;
  timeSaved: number;
  revenueGenerated: number;
  productsLaunched: number;
}

export interface LLMMetrics {
  llmDistribution: {
    name: string;
    usage: number;
  }[];
  totalTokens: number;
  costSavings: number;
}

export interface PortfolioMetrics {
  statusDistribution: {
    status: string;
    count: number;
  }[];
  projectCount: number;
  successOutcomes: number;
  completionRate: number;
}

export interface ProjectMetrics {
  statusDistribution: {
    status: string;
    count: number;
  }[];
  missionCompletionRate: number;
  aiAgentUtilization: number;
}

export interface UserEngagementMetrics {
  feedbackRatings: {
    rating: number;
    count: number;
  }[];
  successStories: number;
  adoptionRate: number;
}

export interface DashboardData {
  primary: PrimaryMetrics;
  llm: LLMMetrics;
  portfolio: PortfolioMetrics;
  project: ProjectMetrics;
  engagement: UserEngagementMetrics;
}
