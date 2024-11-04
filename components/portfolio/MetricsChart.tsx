'use client';

import React, { useState } from "react";
import { Portfolio, Project } from "@/types/portfolio";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MetricsChartProps {
  portfolio: Portfolio;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const MetricsChart: React.FC<MetricsChartProps> = ({ portfolio }) => {
  const [activeMetric, setActiveMetric] = useState<'tokenUsage' | 'cost' | 'success'>('tokenUsage');

  // Prepare chart data
  const lineData = portfolio.projects?.map((project: Project) => ({
    name: project.title || 'Untitled',
    tokenUsage: project.metrics?.tokenUsage || 0,
    cost: project.metrics?.costPerExecution || 0,
    success: project.metrics?.successRate || 0,
  })) || [];

  // Prepare pie data
  const pieData = portfolio.projects?.map((project: Project) => ({
    name: project.title || 'Untitled',
    value: project.metrics?.[activeMetric === 'tokenUsage' ? 'tokenUsage' : 
           activeMetric === 'cost' ? 'costPerExecution' : 'successRate'] || 0,
  })) || [];

  // Calculate totals for summary
  const totals = {
    tokenUsage: lineData.reduce((sum, item) => sum + item.tokenUsage, 0),
    cost: lineData.reduce((sum, item) => sum + item.cost, 0),
    success: lineData.reduce((sum, item) => sum + item.success, 0) / (lineData.length || 1),
  };

  const formatValue = (value: number, metric: typeof activeMetric) => {
    switch (metric) {
      case 'tokenUsage':
        return value.toLocaleString();
      case 'cost':
        return `$${value.toFixed(4)}`;
      case 'success':
        return `${(value * 100).toFixed(1)}%`;
      default:
        return value;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-500">Total Token Usage</div>
          <div className="text-2xl font-bold">{totals.tokenUsage.toLocaleString()}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Average Cost</div>
          <div className="text-2xl font-bold">${totals.cost.toFixed(4)}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Average Success Rate</div>
          <div className="text-2xl font-bold">{(totals.success * 100).toFixed(1)}%</div>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="line" className="space-y-4">
        <TabsList>
          <TabsTrigger value="line">Timeline</TabsTrigger>
          <TabsTrigger value="bar">Comparison</TabsTrigger>
          <TabsTrigger value="pie">Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="line" className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="tokenUsage" name="Token Usage" stroke="#8884d8" />
              <Line type="monotone" dataKey="cost" name="Cost" stroke="#82ca9d" />
              <Line type="monotone" dataKey="success" name="Success Rate" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="bar" className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tokenUsage" name="Token Usage" fill="#8884d8" />
              <Bar dataKey="cost" name="Cost" fill="#82ca9d" />
              <Bar dataKey="success" name="Success Rate" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="pie" className="h-[400px]">
          <div className="flex items-center justify-center h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label={({ name, value }) => `${name}: ${formatValue(value, activeMetric)}`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MetricsChart;