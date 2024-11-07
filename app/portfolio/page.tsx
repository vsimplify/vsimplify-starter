'use client';

import { useState, useEffect, PropsWithChildren } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectProps } from "@/components/ui/select"; // Import from your custom select component
import { Database } from './database.types';

type Portfolio = Database['public']['Tables']['Portfolio']['Row'];
type Project = Database['public']['Tables']['Project']['Row'];
type Mission = Database['public']['Tables']['Mission']['Row'];
type Task = Database['public']['Tables']['Task']['Row'];

// Mock data - replace with actual API calls
const mockPortfolios: Portfolio[] = [
  { id: '1', title: 'Portfolio 1', status: 'Active', domainId: 1, user_id: 'user1', created_at: new Date().toISOString(), description: null, progress: null, project_id: null },
  { id: '2', title: 'Portfolio 2', status: 'Completed', domainId: 2, user_id: 'user1', created_at: new Date().toISOString(), description: null, progress: null, project_id: null },
]

const mockProjects: Project[] = [
  {
    id: 1,
    title: 'Project 1',
    status: 'In Progress',
    domainId: 1,
    email: 'user@example.com',
    goal: 'Goal 1',
    nugget: 'Nugget 1',
    objective: 'Objective 1',
    outcome: 'Outcome 1',
    dueOn: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user_id: 'user1',
    description: null,
    portfolio_id: null,
    progress: null
  },
  {
    id: 2,
    title: 'Project 2',
    status: 'Completed',
    domainId: 1,
    email: 'user@example.com',
    goal: 'Goal 2',
    nugget: 'Nugget 2',
    objective: 'Objective 2',
    outcome: 'Outcome 2',
    dueOn: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user_id: 'user1',
    description: null,
    portfolio_id: null,
    progress: null
  }
]

const mockMissions: Mission[] = [
  {
    id: 1,
    name: 'Mission 1',
    process: 'SEQUENTIAL',
    project_id: 1,
    domainId: 1,
    email: 'user@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user_id: 'user1',
    inTokens: 0,
    outTokens: 0,
    abandonedForTokens: false,
    verbose: false,
    emoji: null,
    result: null,
    taskResult: null,
    tasks: []
  },
  {
    id: 2,
    name: 'Mission 2',
    process: 'HIERARCHICAL',
    project_id: 1,
    domainId: 1,
    email: 'user@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user_id: 'user1',
    inTokens: 0,
    outTokens: 0,
    abandonedForTokens: false,
    verbose: false,
    emoji: null,
    result: null,
    taskResult: null,
    tasks: []
  }
]

const mockTasks: Task[] = [
  {
    id: '1',
    name: 'Task 1',
    status: 'To Do',
    missionId: 1,
    user_id: 'user1',
    assignedAgentId: null,
    created_at: null,
    dependencies: null,
    description: null,
    metrics: {}, // Assuming Json is an object type
    priority: null,
    updated_at: null
  },
  {
    id: '2',
    name: 'Task 2',
    status: 'In Progress',
    missionId: 1,
    user_id: 'user1',
    assignedAgentId: null,
    created_at: null,
    dependencies: null,
    description: null,
    metrics: {},
    priority: null,
    updated_at: null
  },
  {
    id: '3',
    name: 'Task 3',
    status: 'Done',
    missionId: 2,
    user_id: 'user1',
    assignedAgentId: null,
    created_at: null,
    dependencies: null,
    description: null,
    metrics: {},
    priority: null,
    updated_at: null
  }
]

export default function PortfolioDashboard() {
  const [selectedDomain, setSelectedDomain] = useState<number | null>(null);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Simulating API calls - replace with actual data fetching
    setPortfolios(mockPortfolios);
    setProjects(mockProjects);
    setMissions(mockMissions);
    setTasks(mockTasks);
  }, []);

  const filteredPortfolios = selectedDomain
    ? portfolios.filter(p => p.domainId === selectedDomain)
    : portfolios;

  const groupedPortfolios = filteredPortfolios.reduce((acc, portfolio) => {
    const status = portfolio.status || 'Unknown';
    if (!acc[status]) acc[status] = [];
    acc[status].push(portfolio);
    return acc;
  }, {} as Record<string, Portfolio[]>);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Portfolio Dashboard</h1>
      
      <Select
        value={selectedDomain?.toString() || ''}
        onValueChange={(value) => setSelectedDomain(Number(value))}
        options={[
          { value: '1', label: 'Domain 1' },
          { value: '2', label: 'Domain 2' }
        ]}
        placeholder="Select Domain"
        className="w-[180px] mb-4"
      />

      {Object.entries(groupedPortfolios).map(([status, portfolios]) => (
        <div key={status} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{status} Portfolios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolios.map(portfolio => (
              <Card key={portfolio.id}>
                <CardHeader>
                  <CardTitle>{portfolio.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="projects">
                      <AccordionTrigger>Projects</AccordionTrigger>
                      <AccordionContent>
                        {projects.filter(p => p.domainId === portfolio.domainId).map(project => (
                          <Accordion key={project.id} type="single" collapsible className="mb-2">
                            <AccordionItem value={`project-${project.id}`}>
                              <AccordionTrigger>{project.title}</AccordionTrigger>
                              <AccordionContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {['To Do', 'In Progress', 'Done'].map(status => (
                                    <div key={status} className="bg-secondary p-4 rounded-lg">
                                      <h4 className="font-semibold mb-2">{status}</h4>
                                      {tasks
                                        .filter(t => t.missionId && missions.find(m => m.id === t.missionId)?.project_id === project.id && t.status === status)
                                        .map(task => (
                                          <Card key={task.id} className="mb-2 p-2">
                                            <p>{task.name}</p>
                                            <Badge>{task.status}</Badge>
                                          </Card>
                                        ))}
                                    </div>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

