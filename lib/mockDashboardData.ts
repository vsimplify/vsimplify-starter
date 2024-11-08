import { DashboardData } from '@/types/dashboard';

export const generateMockDashboardData = (): DashboardData => ({
  primary: {
    moneySaved: 1250000,
    timeSaved: 5840,
    revenueGenerated: 3750000,
    productsLaunched: 42
  },
  llm: {
    llmDistribution: [
      { name: 'GPT-4', usage: 45 },
      { name: 'GPT-3.5', usage: 30 },
      { name: 'Claude', usage: 15 },
      { name: 'Others', usage: 10 }
    ],
    totalTokens: 15750000,
    costSavings: 28500
  },
  portfolio: {
    statusDistribution: [
      { status: 'Completed', count: 85 },
      { status: 'In Progress', count: 45 },
      { status: 'Planned', count: 30 },
      { status: 'On Hold', count: 15 }
    ],
    projectCount: 175,
    successOutcomes: 142,
    completionRate: 0.85
  },
  project: {
    statusDistribution: [
      { status: 'Active', count: 65 },
      { status: 'Completed', count: 95 },
      { status: 'Pending', count: 25 }
    ],
    missionCompletionRate: 0.78,
    aiAgentUtilization: 0.92
  },
  engagement: {
    feedbackRatings: [
      { rating: 5, count: 450 },
      { rating: 4, count: 320 },
      { rating: 3, count: 120 },
      { rating: 2, count: 45 },
      { rating: 1, count: 15 }
    ],
    successStories: 85,
    adoptionRate: 0.88
  }
});
