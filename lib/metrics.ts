import { Portfolio, MetricsData } from '@/types/portfolio';

export const getMetricsSummary = (portfolio: Portfolio) => {
  // Calculate metrics from projects if portfolio metrics don't exist
  if (!portfolio.metrics) {
    const projectMetrics = portfolio.projects?.reduce((acc, project) => {
      if (!project.metrics) return acc;
      return {
        tokenUsage: acc.tokenUsage + (project.metrics.tokenUsage || 0),
        costPerExecution: acc.costPerExecution + (project.metrics.costPerExecution || 0),
        executionTime: acc.executionTime + (project.metrics.executionTime || 0),
        successRate: acc.successRate + (project.metrics.successRate || 0),
        lastUpdated: project.metrics.lastUpdated
      };
    }, {
      tokenUsage: 0,
      costPerExecution: 0,
      executionTime: 0,
      successRate: 0,
      lastUpdated: new Date()
    } as MetricsData);

    if (!projectMetrics) return null;

    // Calculate average success rate
    const projectCount = portfolio.projects?.length || 1;
    projectMetrics.successRate = projectMetrics.successRate / projectCount;

    return {
      tokenUsage: projectMetrics.tokenUsage.toLocaleString(),
      successRate: `${(projectMetrics.successRate * 100).toFixed(1)}%`,
      cost: projectMetrics.costPerExecution.toFixed(4)
    };
  }

  // Use portfolio metrics if they exist
  return {
    tokenUsage: portfolio.metrics.tokenUsage.toLocaleString(),
    successRate: `${(portfolio.metrics.successRate * 100).toFixed(1)}%`,
    cost: portfolio.metrics.costPerExecution.toFixed(4)
  };
}; 