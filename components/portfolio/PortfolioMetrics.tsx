'use client';

import { Card } from "@/components/ui/card";
import { Portfolio } from "@/types/portfolio";

type PortfolioMetricsProps = {
  portfolio: Portfolio;
};

export function PortfolioMetrics({ portfolio }: PortfolioMetricsProps) {
  const totalProjects = portfolio.projects.length;
  const totalMissions = portfolio.projects.reduce(
    (acc, project) => acc + project.missions.length,
    0
  );
  const completedMissions = portfolio.projects.reduce(
    (acc, project) => 
      acc + project.missions.filter(m => m.status === 'completed').length,
    0
  );

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground">Projects</h3>
        <p className="text-2xl font-bold mt-2">{totalProjects}</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground">Total Activities</h3>
        <p className="text-2xl font-bold mt-2">{totalMissions}</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground">Completed</h3>
        <p className="text-2xl font-bold mt-2">{completedMissions}</p>
      </Card>
    </div>
  );
} 