import { TaskDay, TaskType } from './tasks';

export interface MyTask {
  id: number;
  title: string;
  description: string | null;
  type: TaskType;
  repeatedDays: TaskDay[];
}
