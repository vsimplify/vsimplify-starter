'use client';

import { Project } from "@/types/portfolio";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

type ProjectListProps = {
  projects: Project[];
  portfolioId: string;
};

export function ProjectList({ projects, portfolioId }: ProjectListProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No projects found in this portfolio.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id} className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-medium">{project.title}</h3>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </div>
            <Badge>{project.status}</Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{project.progress || 0}%</span>
            </div>
            <Progress value={project.progress || 0} />
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            {project.missions?.length || 0} Activities
          </div>
        </Card>
      ))}
    </div>
  );
}