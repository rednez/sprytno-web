import { MyTask, MyTaskDetails, Result, Task, TaskDetails } from '@/types';

export interface TasksParser {
  parsePublicTasks(row: unknown): Result<Task[]>;
  parseMyTasks(row: unknown): Result<MyTask[]>;
  parseMyTaskDetails(row: unknown): Result<MyTaskDetails>;
  parsePublicTaskDetails(row: unknown): Result<TaskDetails>;
}
