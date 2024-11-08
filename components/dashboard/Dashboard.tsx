'use client';

import { useEffect, useState } from 'react';
import { DashboardData } from '@/types/dashboard';
import { generateMockDashboardData } from '@/lib/mockDashboardData';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];
const CHART_HEIGHT = 300;

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const mockData = generateMockDashboardData();
      setData(mockData);
      setLoading(false);
    } catch (err) {
      setError('Failed to load dashboard data');
      setLoading(false);
    }
  }, []);

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);

  const formatNumber = (value: number) =>
    new Intl.NumberFormat('en-US').format(value);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-error bg-error/10 px-4 py-2 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-10 mb-16">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Analytics Dashboard
        </h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
      
      {/* Primary Metrics */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Key Performance Indicators</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Money Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{formatCurrency(data.primary.moneySaved)}</div>
              <div className="text-xs text-success mt-1">+12% from last month</div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Time Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{formatNumber(data.primary.timeSaved)} hours</div>
              <div className="text-xs text-success mt-1">+8% from last month</div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Revenue Generated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{formatCurrency(data.primary.revenueGenerated)}</div>
              <div className="text-xs text-success mt-1">+15% from last month</div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Products Launched</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{data.primary.productsLaunched}</div>
              <div className="text-xs text-success mt-1">+5% from last month</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* LLM Usage and Portfolio Analytics */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">AI & Project Analytics</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>LLM Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.llm.llmDistribution}
                      dataKey="usage"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {data.llm.llmDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Project Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.portfolio.statusDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill={COLORS[0]}>
                      {data.portfolio.statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* User Engagement */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">User Engagement</h2>
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>User Feedback Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.engagement.feedbackRatings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rating" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke={COLORS[0]} 
                    strokeWidth={2}
                    dot={{ fill: COLORS[0] }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Additional Metrics */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Performance Metrics</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Token Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{formatNumber(data.llm.totalTokens)}</div>
              <div className="text-sm text-muted-foreground mt-1">Total tokens consumed</div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Cost Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{formatCurrency(data.llm.costSavings)}</div>
              <div className="text-sm text-muted-foreground mt-1">Total LLM cost reduction</div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {(data.portfolio.completionRate * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground mt-1">Project completion rate</div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
