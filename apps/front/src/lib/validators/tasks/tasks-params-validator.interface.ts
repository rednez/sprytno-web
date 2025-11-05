import { Result, TaskDay, TaskType } from '@/types';

export interface TasksParamsValidator {
  validateNearbyTasksParams(params: URLSearchParams): Result<{
    lat: number;
    lng: number;
    type: 'offers' | 'requests' | 'all';
    distance: number;
  }>;

  validatePublicTasksDetailsParams(params: URLSearchParams): Result<{
    currentLat: number;
    currentLng: number;
  }>;

  validateNewTaskParams(raw: unknown): Result<{
    title: string;
    description?: string;
    type: TaskType;
    repeatedDays: TaskDay[];
    location: { lat: number; lng: number };
  }>;
}
