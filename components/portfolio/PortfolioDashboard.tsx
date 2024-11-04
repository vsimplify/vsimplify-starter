'use client';

import { Project } from "@/types/portfolio";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetricsChart } from "./MetricsChart";

type PortfolioDashboardProps = {
  projects: Project[];
};

export default function PortfolioDashboard({ projects }: PortfolioDashboardProps) {
  // Calculate project progress based on completed missions
  const calculateProgress = (project: Project): number => {
    if (project.progress !== undefined) return project.progress;
    if (!project.missions.length) return 0;
    
    const completedMissions = project.missions.filter(
      mission => mission.status === 'completed'
    ).length;
    
    return Math.round((completedMissions / project.missions.length) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const progress = calculateProgress(project);
          
          return (
            <Card key={project.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{project.title}</h3>
                <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                  {project.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {project.description}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-sm">{progress}%</span>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Missions: {project.missions.length}</span>
                  <span>
                    Completed: {project.missions.filter(m => m.status === 'completed').length}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      {projects.length > 0 && (
        <Card className="p-6">
          <MetricsChart projects={projects} />
        </Card>
      )}
    </div>
  );
}