import type { Agent } from "./agent";
import type { Task, TaskInput } from "./task";

type ProcessType = "SEQUENTIAL" | "HIERARCHICAL";

export type Mission = {
	id?: number | string;
	name: string;
	crew: Array<Agent>;
	tasks: Array<Task>;
	verbose: boolean;
	process: ProcessType;
	result?: string;
	projectId: number;
	domainId?: number;
	email: string;
	taskResult?: string;
	inTokens: number;
	outTokens: number;
	abandonedForTokens: boolean;
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
