'use client';

import { Portfolio } from "@/types/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

interface PortfolioItemCardProps {
  portfolio: Portfolio;
}

export function PortfolioItemCard({ portfolio }: PortfolioItemCardProps) {
  const completedProjects = portfolio.projects.filter(
    project => project.status === 'completed'
  ).length;
  const progress = portfolio.progress ?? 
    (portfolio.projects.length > 0 
      ? Math.round((completedProjects / portfolio.projects.length) * 100)
      : 0);

  return (
    <Link href={`/portfolio/${portfolio.id}`}>
      <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl mb-2">{portfolio.title}</CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {portfolio.description}
              </p>
            </div>
            {portfolio.status && (
              <Badge variant={portfolio.status === 'active' ? 'default' : 'secondary'}>
                {portfolio.status}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Progress Section */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Projects Summary */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Projects</span>
              <span className="font-medium">{portfolio.projects.length}</span>
            </div>

            {/* Project Tags */}
            {portfolio.projects.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {portfolio.projects.slice(0, 3).map((project) => (
                  <Badge key={project.id} variant="outline" className="text-xs">
                    {project.title}
                  </Badge>
                ))}
                {portfolio.projects.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{portfolio.projects.length - 3} more
                  </Badge>
                )}
              </div>
            )}

            {/* Created Date */}
            <div className="text-xs text-muted-foreground">
              Created {new Date(portfolio.created_at).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 