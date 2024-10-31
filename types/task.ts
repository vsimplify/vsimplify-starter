import { Database } from '@/lib/database.types';
import { MetricsData } from './portfolio';

type DBTask = Database['public']['Tables']['Task']['Row'];

export type TaskStatus = 'not_started' | 'next' | 'in_progress' | 'blocked' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export type Task = DBTask & {
  metrics?: MetricsData;
  expected_output: string;
  async_execution: boolean;
};

export type TaskInput = Omit<Task, 'id' | 'created_at' | 'updated_at' | 'metrics'> & {
  id?: string;
  metrics?: Partial<MetricsData>;
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
