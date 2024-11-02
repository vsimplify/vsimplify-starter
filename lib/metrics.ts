import { Portfolio } from '@/types/portfolio';

export const getMetricsSummary = (portfolio: Portfolio) => {
  if (!portfolio.metrics) return null;

  return {
    tokenUsage: portfolio.metrics.tokenUsage.toLocaleString(),
    successRate: (portfolio.metrics.successRate * 100).toFixed(1),
    cost: portfolio.metrics.costPerExecution.toFixed(4)
  };
}; 