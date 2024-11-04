import React from "react";
import { Portfolio, Project } from "@/types/portfolio";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface MetricsChartProps {
  portfolio: Portfolio;
}

const MetricsChart: React.FC<MetricsChartProps> = ({ portfolio }) => {
  // Prepare chart data
  const data = portfolio.projects?.map((project: Project) => ({
    name: project.title,
    tokenUsage: project.metrics?.tokenUsage || 0,
    costPerExecution: project.metrics?.costPerExecution || 0,
  })) || [];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="tokenUsage" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line yAxisId="right" type="monotone" dataKey="costPerExecution" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MetricsChart; 