import { MyTask, RepositoryResult, Task, TaskDetails } from '@/types';

export interface TasksRepository {
  getNearbyTasks(params: {
    lat: number;
    lng: number;
    type: 'offers' | 'requests' | 'all';
    distance: number;
  }): Promise<RepositoryResult<Task[]>>;

  getPublicTaskDetails(params: {
    taskId: number;
    currentLat: number;
    currentLng: number;
  }): Promise<RepositoryResult<TaskDetails>>;

  getMyTasks(): Promise<RepositoryResult<MyTask[]>>;
}
