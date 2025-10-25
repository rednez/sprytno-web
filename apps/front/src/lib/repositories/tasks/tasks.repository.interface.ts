import { Task, TaskDetails } from '@/types';

export interface TasksRepository {
  getNearbyTasks(params: {
    lat: number;
    lng: number;
    type: 'offers' | 'requests' | 'all';
    distance: number;
  }): Promise<Task[]>;

  getPublicTaskDetails(params: {
    taskId: number;
    currentLat: number;
    currentLng: number;
  }): Promise<TaskDetails>;

  // getMyTasks(): Promise<MyTask[]>;

  // getMyTaskById(taskId: number): Promise<MyTask>;
}
