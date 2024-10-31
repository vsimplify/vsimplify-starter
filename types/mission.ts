import { Database } from '@/lib/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Agent } from './agent';
import { Task, TaskInput, TaskMetrics } from './task';
import type { Json } from '@/lib/database.types';
import { v4 as uuidv4 } from 'uuid';

type DBMission = Database['public']['Tables']['Mission']['Row'];
type AgentToMission = Database['public']['Tables']['_AgentToMission']['Row'];

export type ProcessType = Database['public']['Enums']['MissionProcess'];

export interface Mission extends Omit<DBMission, 'tasks'> {
	/** @deprecated Use tasks from Tasks table instead */
	legacyTasks?: Json | null;
	tasks: Task[];
	agents: Agent[];
	_AgentToMission: AgentToMission[];
}

export const getMissionTasks = async (missionId: number): Promise<Task[]> => {
	const supabase = createClientComponentClient<Database>();
	
	// First try to get tasks from new Tasks table
	const { data: newTasks, error: newError } = await supabase
		.from('Task')
		.select(`
			*,
			metrics
		`)
		.eq('missionId', missionId)
		.eq('user_id', 'f5cb0287-d141-4f8b-9632-98be8d7bcbe7');

	if (newTasks && newTasks.length > 0) {
		return newTasks.map(task => ({
			...task,
			metrics: task.metrics as TaskMetrics | null,
			expected_output: (task.metrics as any)?.expected_output || '',
			async_execution: (task.metrics as any)?.async_execution || false
		})) as Task[];
	}

	// Fallback to legacy tasks if no new tasks found
	const { data: mission, error: missionError } = await supabase
		.from('Mission')
		.select('tasks')
		.eq('id', missionId)
		.eq('user_id', 'f5cb0287-d141-4f8b-9632-98be8d7bcbe7')
		.single();

	if (mission?.tasks) {
		const legacyTasks = mission.tasks as any[];
		return legacyTasks.map(legacyTask => ({
			id: uuidv4(),
			name: legacyTask.name || '',
			description: legacyTask.description || '',
			assignedAgentId: legacyTask.agent_id,
			missionId,
			status: 'not_started' as const,
			priority: 'medium' as const,
			dependencies: null,
			metrics: null,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
				user_id: 'f5cb0287-d141-4f8b-9632-98be8d7bcbe7',
			expected_output: legacyTask.expected_output || '',
			async_execution: legacyTask.async_execution || false
		}));
	}

	return [];
};

export type CreateMissionInput = {
	id?: number;
	name: string;
	crew: Array<number>;
	tasks: Array<TaskInput>;
	verbose: boolean;
	process: ProcessType;
	taskResult?: string;
	projectId: number;
	email: string;
	inTokens: number;
	abandonedForTokens: boolean;
};

// Type guard
export const isMission = (item: any): item is Mission => {
	return item &&
		typeof item.id === 'number' &&
		typeof item.name === 'string' &&
		Array.isArray(item.tasks) &&
		Array.isArray(item.agents);
};

// Mission status utilities
export const isInProgress = (mission: Mission): boolean => 
	mission.tasks.some(task => task.status === 'in_progress');

export const isCompleted = (mission: Mission): boolean => 
	mission.tasks.every(task => task.status === 'done');

export const hasBlockedTasks = (mission: Mission): boolean => 
	mission.tasks.some(task => task.status === 'blocked');

// Mission metrics utilities
export const getTotalTokenUsage = (mission: Mission): number => 
	mission.token_usage || 0;

export const getTotalExecutionTime = (mission: Mission): number => 
	mission.execution_time || 0;

export const getTotalCost = (mission: Mission): number => 
	mission.cost_per_execution || 0;
