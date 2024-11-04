'use client';

import { Project, MetricsData } from "@/types/portfolio";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Card } from "@/components/ui/card";

type MetricsChartProps = {
  projects: Project[];
};

type ChartData = {
  name: string;
  tokenUsage: number;
  cost: number;
  success: number;
};

export function MetricsChart({ projects }: MetricsChartProps) {
  // Calculate metrics for each project
  const calculateProjectMetrics = (project: Project): MetricsData => {
    const missions = project.missions || [];
    return {
      tokenUsage: missions.reduce((sum, m) => sum + (m.tokenUsage || 0), 0),
      costPerExecution: missions.reduce((sum, m) => sum + (m.cost || 0), 0),
      executionTime: missions.reduce((sum, m) => sum + (m.metrics?.executionTime || 0), 0),
      successRate: missions.length 
        ? missions.filter(m => m.status === 'completed').length / missions.length * 100 
        : 0,
      lastUpdated: new Date()
    };
  };

  const lineData: ChartData[] = projects.map((project: Project) => {
    const metrics = project.metrics || calculateProjectMetrics(project);
    return {
      name: project.title || 'Untitled',
      tokenUsage: metrics.tokenUsage || 0,
      cost: metrics.costPerExecution || 0,
      success: metrics.successRate || 0,
    };
  });

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Project Metrics</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="tokenUsage"
              stroke="#8884d8"
              name="Token Usage"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="cost"
              stroke="#82ca9d"
              name="Cost ($)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="success"
              stroke="#ffc658"
              name="Success Rate (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}