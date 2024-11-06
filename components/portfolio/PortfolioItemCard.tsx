'use client';

import { Portfolio } from "@/types/portfolio";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

type PortfolioItemCardProps = {
  portfolio: Portfolio;
};

export function PortfolioItemCard({ portfolio }: PortfolioItemCardProps) {
  const projects = portfolio.projects || [];
  const completedProjects = projects.filter(
    project => project.status === 'completed'
  ).length;
  
  const progress = portfolio.progress ?? 
    (projects.length > 0 
      ? Math.round((completedProjects / projects.length) * 100)
      : 0);

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold mb-2">{portfolio.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {portfolio.description}
          </p>
        </div>
        <Badge variant={portfolio.status === 'active' ? 'default' : 'secondary'}>
          {portfolio.status}
        </Badge>
      </div>

      {/* Progress */}
      <div className="mt-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <Progress value={progress} />
      </div>

      {/* Projects */}
      <div className="mt-6">
        <div className="space-y-4">
          {/* Project Count */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Projects</span>
            <span className="font-medium">{projects.length}</span>
          </div>

          {/* Project Tags */}
          {projects.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {projects.slice(0, 3).map((project) => (
                <Badge key={project.id} variant="outline" className="text-xs">
                  {project.title}
                </Badge>
              ))}
              {projects.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{projects.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Domain and Initiative */}
      <div className="mt-4 flex flex-wrap gap-2">
        {portfolio.domainId && (
          <Badge variant="secondary" className="text-xs">
            Domain: {portfolio.domainId}
          </Badge>
        )}
        {portfolio.initiative && (
          <Badge variant="secondary" className="text-xs">
            {portfolio.initiative}
          </Badge>
        )}
      </div>

      {/* Created Date */}
      <div className="mt-4 text-xs text-muted-foreground">
        Created {formatDistanceToNow(new Date(portfolio.created_at), { addSuffix: true })}
      </div>
    </Card>
  );
} 