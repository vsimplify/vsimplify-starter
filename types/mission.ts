import { Database } from '@/lib/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { v4 as uuidv4 } from 'uuid';
import { Agent } from './agent';
import { Task } from './task';
import type { Json } from '@/lib/database.types';

type DBMission = Database['public']['Tables']['Mission']['Row'];

export type ProcessType = Database['public']['Enums']['MissionProcess'];

export interface Mission extends Omit<DBMission, 'tasks'> {
	/** @deprecated Use tasks from Tasks table instead */
	legacyTasks?: Json | null;
	tasks: Task[];
	agents: Agent[];
}

export const getMissionTasks = async (missionId: number): Promise<Task[]> => {
	const supabase = createClientComponentClient<Database>();
	
	// First try to get tasks from new Tasks table
	const { data: newTasks, error: newError } = await supabase
		.from('Task')
		.select('*')
		.eq('missionId', missionId);

	if (newTasks && newTasks.length > 0) {
		return newTasks as Task[];
	}

	// Fallback to legacy tasks if no new tasks found
	const { data: mission, error: missionError } = await supabase
		.from('Mission')
		.select('tasks')
		.eq('id', missionId)
		.single();

	if (mission?.tasks) {
		// Convert legacy tasks to new format with required fields
		return (mission.tasks as any[]).map(legacyTask => ({
			id: uuidv4(),
			name: legacyTask.name,
			description: legacyTask.description,
			assignedAgentId: legacyTask.agent_id,
			missionId: missionId,
			status: 'not_started',
			priority: 'medium',
			dependencies: null,
			metrics: null,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			user_id: 'f5cb0287-d141-4f8b-9632-98be8d7bcbe7' // Using the specified user ID
		}));
	}

	return [];
};

export type Project = {
	id: number;
	objective: string;
	goal: string;
	dueOn: string;
	nugget: string;
	outcome: string;
	description?: string;
	email: string;
	createdAt: Date;
	updatedAt?: Date;
	domainId: number;
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
