import { Portfolio } from '@/types/portfolio';

export const getMetricsSummary = (portfolio: Portfolio) => {
  const projects = portfolio.projects || [];
  
  // Calculate metrics from projects if portfolio metrics don't exist
  const totalTokenUsage = projects.reduce((acc, project) => {
    return acc + (project.metrics?.tokenUsage || 0);
  }, 0);

  const totalCost = projects.reduce((acc, project) => {
    return acc + (project.metrics?.costPerExecution || 0);
  }, 0);

  const totalExecutionTime = projects.reduce((acc, project) => {
    return acc + (project.metrics?.executionTime || 0);
  }, 0);

  const successRate = projects.length > 0
    ? (projects.filter(project => project.missions?.every(m => m.status === 'completed')).length / projects.length) * 100
    : 0;

  return {
    totalTokenUsage,
    totalCost,
    totalExecutionTime,
    successRate
  };
}; 