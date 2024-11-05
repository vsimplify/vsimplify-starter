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
  ResponsiveContainer,
  ComposedChart,
  Bar
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
  const lineData = projects.map(project => {
    const metrics = project.metrics || {
      tokenUsage: 0,
      costPerExecution: 0,
      successRate: 0
    };

    return {
      name: project.title || 'Untitled',
      tokenUsage: metrics.tokenUsage || 0,
      cost: metrics.costPerExecution || 0,
      successRate: metrics.successRate || 0
    };
  });

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Project Metrics</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            
            {/* Lines for Token Usage and Cost */}
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
            
            {/* Bar for Success Rate */}
            <Bar
              yAxisId="right"
              dataKey="successRate"
              fill="#ffc658"
              name="Success Rate (%)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}