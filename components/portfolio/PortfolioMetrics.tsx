'use client';

import { Portfolio } from "@/types/portfolio";
import { Card } from "@/components/ui/card";

type PortfolioMetricsProps = {
  portfolio: Portfolio;
};

export function PortfolioMetrics({ portfolio }: PortfolioMetricsProps) {
  const projects = portfolio.projects || [];
  const totalProjects = projects.length;
  const totalMissions = projects.reduce(
    (acc, project) => acc + (project.missions?.length || 0),
    0
  );
  const completedMissions = projects.reduce(
    (acc, project) => 
      acc + (project.missions?.filter(m => m.status === 'completed').length || 0),
    0
  );
  const missionSuccessRate = totalMissions > 0 
    ? Math.round((completedMissions / totalMissions) * 100) 
    : 0;

  const metrics = [
    {
      label: "Total Projects",
      value: totalProjects
    },
    {
      label: "Total Activities",
      value: totalMissions
    },
    {
      label: "Completed Activities",
      value: completedMissions
    },
    {
      label: "Success Rate",
      value: `${missionSuccessRate}%`
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.label} className="p-4">
          <div className="text-sm text-muted-foreground">{metric.label}</div>
          <div className="text-2xl font-bold">{metric.value}</div>
        </Card>
      ))}
    </div>
  );
} 