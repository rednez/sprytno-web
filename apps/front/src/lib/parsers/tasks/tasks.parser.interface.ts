import { Task, TaskDetails } from '@/types';

export interface TasksParser {
  parseTask(row: unknown): Task;
  parseTasks(row: unknown): Task[];
  parsePublicTaskDetails(row: unknown): TaskDetails;
}
