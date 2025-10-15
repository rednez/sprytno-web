import { MyTask, Task } from '@/types';

export interface TasksRepository {
  getNearbyTasks(params: {
    lat: number;
    lng: number;
    type: 'offers' | 'requests' | 'all';
    distance: number;
  }): Promise<Task[]>;

  getPublicTaskById(taskId: number): Promise<Task>;

  getMyTasks(): Promise<MyTask[]>;

  getMyTaskById(taskId: number): Promise<MyTask>;
}
