import { Portfolio } from '@/types/portfolio';

export const getMetricsSummary = (portfolio: Portfolio) => {
  // Calculate metrics from projects if portfolio metrics don't exist
  const totalTokenUsage = portfolio.projects.reduce((acc, project) => {
    return acc + (project.metrics?.tokenUsage || 0);
  }, 0);

  const totalCost = portfolio.projects.reduce((acc, project) => {
    return acc + (project.metrics?.costPerExecution || 0);
  }, 0);

  const successRate = portfolio.projects.reduce((acc, project) => {
    return acc + (project.metrics?.successRate || 0);
  }, 0) / (portfolio.projects.length || 1);

  return {
    tokenUsage: totalTokenUsage.toLocaleString(),
    cost: totalCost.toFixed(4),
    successRate: `${(successRate * 100).toFixed(1)}%`,
  };
}; 