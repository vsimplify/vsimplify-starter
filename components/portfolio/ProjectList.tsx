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

type ProjectListProps = {
  projects: Project[];
  portfolioId: string;
};

export function ProjectList({ projects, portfolioId }: ProjectListProps) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="border rounded-lg p-4">
          <h3 className="font-medium">{project.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
        </div>
      ))}
    </div>
  );
}