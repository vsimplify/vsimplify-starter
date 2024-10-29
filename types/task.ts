import { Agent } from "./agent";

export type TaskInput = {
  name: string;
  description: string;
  agent?: number;
  async_execution: boolean;
};

export type Task = {
  name: string;
  description: string;
  expected_output: string;
  agent?: Agent | null;
  async_execution: boolean;
};
