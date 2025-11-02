import { TaskDay, TaskType } from './task';

export interface MyTask {
  id: number;
  title: string;
  description: string | null;
  type: TaskType;
  repeatedDays: TaskDay[];
}
