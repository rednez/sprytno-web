import { Task } from '@/types';

export interface TasksParser {
  parseTask(row: unknown): Task;
  parseTasks(row: unknown): Task[];
}
