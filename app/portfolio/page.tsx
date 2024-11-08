'use client';

import { useState } from 'react';
import { CascadingFilter } from '@/components/ui/CascadingFilter';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart2,
  Users,
  Target,
  Clock,
  Activity,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricsChart } from '@/components/portfolio/MetricsChart';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from '@hello-pangea/dnd';
import { Portfolio, Project, Task, Mission } from '@/types/portfolio';

const KPICard = ({
  title,
  value,
  change,
  icon
}: {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}) => (
  <Card className="bg-white dark:bg-gray-800">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={`text-xs ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change >= 0 ? '+' : ''}{change}% from last month
      </p>
    </CardContent>
  </Card>
);

const TaskCard = ({ task }: { task: Task }) => (
  <Card className="mb-2 p-3 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-medium text-sm">{task.name}</h4>
        <p className="text-xs text-gray-500 mt-1">{task.description}</p>
      </div>
      <Badge variant={
        task.status === 'completed' ? 'default' :
        task.status === 'in_progress' ? 'secondary' : 'outline'
      }>
        {task.status}
      </Badge>
    </div>
    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
      <span>Priority: {task.priority}</span>
      <span>•</span>
      <span>Due: {new Date(task.created_at).toLocaleDateString()}</span>
    </div>
  </Card>
);

const ProjectSection = ({
  project,
  onTaskMove
}: {
  project: Project;
  onTaskMove: (result: DropResult) => void;
}) => {
  const tasksByStatus = {
    'Open': project.missions?.flatMap(m => m.tasks?.filter(t => t.status === 'Open') || []) || [],
    'In Progress': project.missions?.flatMap(m => m.tasks?.filter(t => t.status === 'In Progress') || []) || [],
    'Completed': project.missions?.flatMap(m => m.tasks?.filter(t => t.status === 'Completed') || []) || []
  };

  return (
    <div className="mt-4">
      <DragDropContext onDragEnd={onTaskMove}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(tasksByStatus).map(([status, tasks]) => (
            <Droppable key={status} droppableId={`${project.id}-${status}`}>
              {(provided: DroppableProvided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg"
                >
                  <h3 className="font-medium mb-3">{status}</h3>
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided: DraggableProvided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default function PortfolioPage() {
  const [filteredDomain, setFilteredDomain] = useState<string | null>(null);
  const [expandedPortfolio, setExpandedPortfolio] = useState<string | null>(null);

  const portfolios: Portfolio[] = [
    {
      id: '1',
      title: 'AI Research Portfolio',
      description: 'Collection of AI research projects and experiments',
      status: 'active',
      progress: 75,
      created_at: new Date().toISOString(),
      user_id: '1',
      projects: [
        {
          id: '1',
          title: 'Neural Networks Research',
          description: 'Advanced neural network architectures',
          status: 'in_progress',
          missions: [
            {
              id: 1,
              title: 'Architecture Design',
              status: 'in_progress',
              projectId: 1,
              tasks: [
                {
                  id: '1',
                  name: 'Research Papers Review',
                  description: 'Review latest papers on neural architectures',
                  status: 'In Progress',
                  priority: 'High',
                  assignedAgentId: 1,
                  missionId: 1,
                  dependencies: [],
                  expected_output: '',
                  async_execution: false,
                  user_id: '1',
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                }
              ]
            }
          ],
          metrics: {
            tokenUsage: 1500,
            costPerExecution: 0.25,
            executionTime: 120,
            successRate: 85,
            lastUpdated: new Date()
          }
        }
      ]
    }
  ];

  const kpiCards = [
    {
      title: "Total Projects",
      value: portfolios.reduce((acc, p) => acc + (p.projects?.length || 0), 0),
      change: 12,
      icon: <BarChart2 className="h-4 w-4" />
    },
    {
      title: "Active Portfolios",
      value: portfolios.filter(p => p.status === 'active').length,
      change: 2,
      icon: <Target className="h-4 w-4" />
    },
    {
      title: "Success Rate",
      value: "78%",
      change: 5,
      icon: <CheckCircle2 className="h-4 w-4" />
    },
    {
      title: "In Progress Tasks",
      value: portfolios.reduce((acc, p) =>
        acc + (p.projects?.reduce((acc2, proj) =>
          acc2 + (proj.missions?.reduce((acc3, m) =>
            acc3 + (m.tasks?.filter(t => t.status === 'In Progress').length || 0), 0) || 0), 0) || 0), 0),
      change: 3,
      icon: <Activity className="h-4 w-4" />
    }
  ];

  const handleTaskMove = (result: DropResult) => {
    if (!result.destination) return;
    console.log('Task moved:', result);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="mb-8">
        <CascadingFilter
          forUseOptions={[
            { id: 'research', name: 'Research' },
            { id: 'commercial', name: 'Commercial' }
          ]}
          getAudienceOptions={() => [
            { id: 'internal', name: 'Internal' },
            { id: 'external', name: 'External' }
          ]}
          getDomainOptions={() => [
            { id: 'ai', name: 'AI' },
            { id: 'web', name: 'Web Development' }
          ]}
          getAreaOptions={() => [
            { id: 'nlp', name: 'NLP' },
            { id: 'vision', name: 'Computer Vision' }
          ]}
          onFilterChange={setFilteredDomain}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      <div className="grid gap-6">
        {portfolios.map((portfolio) => (
          <Accordion
            key={portfolio.id}
            type="single"
            collapsible
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md"
          >
            <AccordionItem value={portfolio.id}>
              <AccordionTrigger className="px-6 py-4">
                <div className="flex flex-1 items-center justify-between">
                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold">{portfolio.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{portfolio.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={portfolio.status === 'active' ? 'default' : 'secondary'}>
                      {portfolio.status}
                    </Badge>
                    <Progress value={portfolio.progress} className="w-24" />
                    <span className="text-sm font-medium">{portfolio.progress}%</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-6 py-4">
                  <Tabs defaultValue="projects">
                    <TabsList>
                      <TabsTrigger value="projects">Projects</TabsTrigger>
                      <TabsTrigger value="metrics">Metrics</TabsTrigger>
                    </TabsList>

                    <TabsContent value="projects">
                      {portfolio.projects?.map((project) => (
                        <Card key={project.id} className="mb-4">
                          <CardHeader>
                            <CardTitle>{project.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ProjectSection project={project} onTaskMove={handleTaskMove} />
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="metrics">
                      <Card>
                        <CardContent className="pt-6">
                          <MetricsChart projects={portfolio.projects || []} />
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
