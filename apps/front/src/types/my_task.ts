import { TaskType } from './task';

export interface MyTask {
  id: number;
  title: string;
  description: string | null;
  type: TaskType;
  repeatedDays: string[];
}
