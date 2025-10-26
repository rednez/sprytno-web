import { TasksParser } from '@/lib/parsers/tasks';
import {
  MyTask,
  MyTaskDetails,
  RepositoryResult,
  Task,
  TaskDetails,
} from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { Result } from '../result';
import { TasksRepository } from './tasks.repository.interface';

export class SupabaseTasksRepository implements TasksRepository {
  constructor(
    private supabase: SupabaseClient,
    private tasksParser: TasksParser,
  ) {}

  async getNearbyTasks({
    lat,
    lng,
    type,
    distance,
  }: {
    lat: number;
    lng: number;
    type: 'offers' | 'requests' | 'all';
    distance: number;
  }): Promise<RepositoryResult<Task[]>> {
    let rpcQuery = this.supabase.rpc('get_nearby_tasks', {
      user_lat: lat,
      user_lng: lng,
      distance_meters: distance,
    });

    if (type === 'offers') {
      rpcQuery = rpcQuery.eq('type', 'offer');
    } else if (type === 'requests') {
      rpcQuery = rpcQuery.eq('type', 'request');
    }

    const { data, error } = await rpcQuery;

    if (error) {
      return Result.error(`Supabase: ${error.message}`);
    }

    try {
      const parsedData = this.tasksParser.parsePublicTasks(data);
      return Result.ok(parsedData);
    } catch (error) {
      return Result.fromError(error);
    }
  }

  async getPublicTaskDetails(params: {
    taskId: number;
    currentLat: number;
    currentLng: number;
  }): Promise<RepositoryResult<TaskDetails>> {
    const { data, error } = await this.supabase.rpc('get_task_details', {
      task_id: params.taskId,
      current_lat: params.currentLat,
      current_lng: params.currentLng,
    });

    if (error) {
      return Result.error(`Supabase: ${error.message}`);
    }
    if (!data.length) {
      return Result.error('Supabase: no data');
    }

    try {
      const parsedData = this.tasksParser.parsePublicTaskDetails(data[0]);
      return Result.ok(parsedData);
    } catch (error) {
      return Result.fromError(error);
    }
  }

  async getMyTasks(): Promise<RepositoryResult<MyTask[]>> {
    const { data, error } = await this.supabase.from('my_tasks').select('*');
    if (error) {
      return Result.error(`Supabase: ${error.message}`);
    }

    try {
      const parsedData = this.tasksParser.parseMyTasks(data);
      return Result.ok(parsedData);
    } catch (error) {
      return Result.fromError(error);
    }
  }

  async getMyTaskDetails(
    taskId: number,
  ): Promise<RepositoryResult<MyTaskDetails>> {
    const { data, error } = await this.supabase.rpc('get_my_task_details', {
      task_id: taskId,
    });

    if (error) {
      return Result.error(`Supabase: ${error.message}`);
    }
    if (!data.length) {
      return Result.error('Supabase: no data');
    }

    try {
      const parsedData = this.tasksParser.parseMyTaskDetails(data[0]);
      return Result.ok(parsedData);
    } catch (error) {
      return Result.fromError(error);
    }
  }
}
