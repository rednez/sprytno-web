import {
  MyTask,
  MyTaskDetails,
  Result,
  Task,
  TaskDetails,
  TaskParticipation,
} from '@/types';

export interface TasksParser {
  parsePublicTasks(raw: unknown): Result<Task[]>;
  parseMyTasks(raw: unknown): Result<MyTask[]>;
  parseMyTaskDetails(raw: unknown): Result<MyTaskDetails>;
  parsePublicTaskDetails(raw: unknown): Result<TaskDetails>;
  parseMyTaskParticipations(raw: unknown): Result<TaskParticipation[]>;
}
