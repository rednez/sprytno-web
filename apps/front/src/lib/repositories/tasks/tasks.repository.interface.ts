import {
  MyTask,
  MyTaskDetails,
  RepositoryResult,
  Task,
  TaskDay,
  TaskDetails,
  TaskType,
} from '@/types';

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

  getMyTaskDetails(taskId: number): Promise<RepositoryResult<MyTaskDetails>>;

  createTask(params: {
    title: string;
    description?: string;
    type: TaskType;
    repeatedDays: TaskDay[];
    lat: number;
    lng: number;
  }): Promise<RepositoryResult<null>>;
}
