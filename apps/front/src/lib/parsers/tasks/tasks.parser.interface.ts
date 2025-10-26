import { MyTask, MyTaskDetails, Task, TaskDetails } from '@/types';

export interface TasksParser {
  parsePublicTasks(row: unknown): Task[];
  parseMyTasks(row: unknown): MyTask[];
  parseMyTaskDetails(row: unknown): MyTaskDetails;
  parsePublicTaskDetails(row: unknown): TaskDetails;
}
