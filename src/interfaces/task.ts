export type TaskType = 'offer' | 'request';

export interface Task {
  id: number;
  title: string;
  description: string;
  type: TaskType;
  isRepeated: boolean;
  repeatedDays: string[];
  distanceMeters: number;
}
