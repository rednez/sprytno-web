import { MyTask, Task, TaskDetails } from '@/types';

export interface TasksParser {
  parsePublicTasks(row: unknown): Task[];
  parseMyTasks(row: unknown): MyTask[];
  parsePublicTaskDetails(row: unknown): TaskDetails;
}
