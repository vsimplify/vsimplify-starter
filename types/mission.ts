import type { Agent } from "./agent";
import type { Task, TaskInput } from "./task";
import { Database } from '@/lib/database.types';
import { Task } from './task';
import { createClientComponentClient } from 'supabase-auth-helpers-nextjs';
import { v4 as uuidv4 } from 'uuid';

type ProcessType = "SEQUENTIAL" | "HIERARCHICAL";

type DBMission = Database['public']['Tables']['Mission']['Row'];
type DBTask = Database['public']['Tables']['Task']['Row'];

export interface Mission extends Omit<DBMission, 'tasks'> {
	/** @deprecated Use tasks from Tasks table instead */
	legacyTasks?: Json | null;
	tasks: Task[];
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
		// Convert legacy tasks to new format
		return (mission.tasks as any[]).map(legacyTask => ({
			id: uuidv4(), // Generate new ID
			name: legacyTask.name,
			description: legacyTask.description,
			assignedAgentId: legacyTask.agent_id,
			missionId: missionId,
			status: 'not_started',
			priority: 'medium',
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
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
