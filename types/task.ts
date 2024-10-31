import { Database } from '@/lib/database.types';
import { MetricsData } from './portfolio';

type DBTask = Database['public']['Tables']['Task']['Row'];

export type TaskStatus = 'not_started' | 'next' | 'in_progress' | 'blocked' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export interface TaskMetrics extends MetricsData {
  expected_output?: string;
  async_execution?: boolean;
}

export type Task = Omit<DBTask, 'metrics'> & {
  metrics?: TaskMetrics;
  expected_output: string;
  async_execution: boolean;
};

export type TaskInput = Omit<Task, 'id' | 'created_at' | 'updated_at' | 'metrics'> & {
  id?: string;
  metrics?: Partial<TaskMetrics>;
};

// Type guard
export const isTask = (item: any): item is Task => {
  return item &&
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.description === 'string' &&
    typeof item.assignedAgentId === 'number' &&
    typeof item.missionId === 'number' &&
    typeof item.expected_output === 'string' &&
    typeof item.async_execution === 'boolean';
};

// Task status utilities
export const isTaskBlocked = (task: Task): boolean => task.status === 'blocked';
export const isTaskComplete = (task: Task): boolean => task.status === 'done';
export const isTaskInProgress = (task: Task): boolean => task.status === 'in_progress';
export const isTaskNext = (task: Task): boolean => task.status === 'next';
export const isTaskNotStarted = (task: Task): boolean => task.status === 'not_started';

// Task priority utilities
export const isHighPriority = (task: Task): boolean => task.priority === 'high' || task.priority === 'critical';
export const isCriticalPriority = (task: Task): boolean => task.priority === 'critical';

// Task metrics utilities
export const hasMetrics = (task: Task): boolean => !!task.metrics;
export const getTaskCost = (task: Task): number => task.metrics?.costPerExecution ?? 0;
export const getTaskTokenUsage = (task: Task): number => task.metrics?.tokenUsage ?? 0;
