import {
  MyTask,
  MyTaskDetails,
  Result,
  Task,
  TaskDay,
  TaskDetails,
  TaskParticipation,
  TaskType,
} from '@/types';

export interface TasksRepository {
  getNearbyTasks(params: {
    lat: number;
    lng: number;
    type: 'offers' | 'requests' | 'all';
    distance: number;
  }): Promise<Result<Task[]>>;

  getPublicTaskDetails(params: {
    taskId: number;
    currentLat: number;
    currentLng: number;
  }): Promise<Result<TaskDetails>>;

  getMyTasks(): Promise<Result<MyTask[]>>;

  getMyTaskDetails(taskId: number): Promise<Result<MyTaskDetails>>;

  createTask(params: {
    title: string;
    description?: string;
    type: TaskType;
    repeatedDays: TaskDay[];
    location: { lat: number; lng: number };
  }): Promise<Result<null>>;

  sendParticipationRequest(
    taskId: number,
    message?: string,
  ): Promise<Result<null>>;

  getMyTaskParticipations(taskId: number): Promise<Result<TaskParticipation[]>>;
}
