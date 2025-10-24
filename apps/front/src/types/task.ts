export type TaskType = 'offer' | 'request';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  type: TaskType;
  repeatedDays: string[];
  distanceMeters: number;
}
