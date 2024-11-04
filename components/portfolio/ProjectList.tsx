'use client';

import React, { useState } from "react";
import { Project } from "@/types/portfolio";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Search, SortAsc, SortDesc, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects: initialProjects }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Project;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Search function
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term) {
      setProjects(initialProjects);
      return;
    }

    const filtered = initialProjects.filter(project => 
      project.title?.toLowerCase().includes(term.toLowerCase()) ||
      project.description?.toLowerCase().includes(term.toLowerCase())
    );
    setProjects(filtered);
  };

  // Sort function
  const handleSort = (key: keyof Project) => {
    const direction = sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });

    const sorted = [...projects].sort((a, b) => {
      if (!a[key] || !b[key]) return 0;
      if (direction === 'asc') {
        return String(a[key]).localeCompare(String(b[key]));
      }
      return String(b[key]).localeCompare(String(a[key]));
    });
    setProjects(sorted);
  };

  // Status color mapping
  const getStatusColor = (status: string | null | undefined) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="flex gap-4 items-center mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleSort('title')}>
              Sort by Name
              {sortConfig?.key === 'title' && (
                sortConfig.direction === 'asc' ? <SortAsc className="ml-2 h-4 w-4" /> : <SortDesc className="ml-2 h-4 w-4" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort('dueOn')}>
              Sort by Due Date
              {sortConfig?.key === 'dueOn' && (
                sortConfig.direction === 'asc' ? <SortAsc className="ml-2 h-4 w-4" /> : <SortDesc className="ml-2 h-4 w-4" />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Projects Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Missions</TableHead>
              <TableHead>Metrics</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{project.title}</div>
                    <div className="text-sm text-gray-500">{project.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status || 'Not Started'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="w-full max-w-xs">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{project.progress || 0}%</span>
                    </div>
                    <Progress value={project.progress || 0} />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    Total: {project.missions?.length || 0}
                    {project.missions && project.missions.length > 0 && (
                      <div className="mt-1 flex gap-1">
                        {project.missions.slice(0, 2).map((mission, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {mission.name}
                          </Badge>
                        ))}
                        {project.missions.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.missions.length - 2} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Tokens:</span>
                      <span>{project.metrics?.tokenUsage.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost:</span>
                      <span>${project.metrics?.costPerExecution.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success:</span>
                      <span>{(project.metrics?.successRate || 0).toFixed(1)}%</span>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProjectList;