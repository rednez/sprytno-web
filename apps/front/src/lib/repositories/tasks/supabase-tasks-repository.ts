import { TasksParser } from '@/lib/parsers/tasks';
import { resultError, resultOk } from '@/lib/utils/result';
import {
  MyTask,
  MyTaskDetails,
  Result,
  Task,
  TaskDay,
  TaskDetails,
  TaskType,
} from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { TasksRepository } from './tasks-repository.interface';

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
  }): Promise<Result<Task[]>> {
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
      return resultError(error);
    }

    return this.tasksParser.parsePublicTasks(data);
  }

  async getPublicTaskDetails(params: {
    taskId: number;
    currentLat: number;
    currentLng: number;
  }): Promise<Result<TaskDetails>> {
    const detailsQuery = this.supabase.rpc('get_task_details', {
      task_id: params.taskId,
      current_lat: params.currentLat,
      current_lng: params.currentLng,
    });

    const interestQuery = this.supabase
      .from('tasks_interests')
      .select('status, updated_at')
      .eq('task_id', params.taskId);

    const [
      { data: detailsData, error: detailsError },
      { data: interestData, error: interestError },
    ] = await Promise.all([detailsQuery, interestQuery]);

    if (detailsError) {
      return resultError(detailsError);
    }
    if (interestError) {
      return resultError(interestError);
    }
    if (!detailsData?.length) {
      return resultError(new Error('Task not found'));
    }

    return this.tasksParser.parsePublicTaskDetails({
      ...detailsData[0],
      interest: !!interestData.length ? interestData[0] : null,
    });
  }

  async getMyTasks(): Promise<Result<MyTask[]>> {
    const { data, error } = await this.supabase.from('my_tasks').select('*');
    if (error) {
      return resultError(error);
    }
    return this.tasksParser.parseMyTasks(data);
  }

  async getMyTaskDetails(taskId: number): Promise<Result<MyTaskDetails>> {
    const { data, error } = await this.supabase.rpc('get_my_task_details', {
      task_id: taskId,
    });

    if (error) {
      return resultError(error);
    }
    if (!data?.length) {
      return resultError(new Error('Item not found'));
    }

    return this.tasksParser.parseMyTaskDetails(data[0]);
  }

  async createTask({
    title,
    description,
    type,
    repeatedDays,
    location: { lat, lng },
  }: {
    title: string;
    description?: string;
    type: TaskType;
    repeatedDays: TaskDay[];
    location: { lat: number; lng: number };
  }): Promise<Result<null>> {
    const { error } = await this.supabase
      .from('tasks')
      .insert({
        title,
        description: description || null,
        type,
        repeated_days: repeatedDays,
        location: `POINT(${lng} ${lat})`,
      })
      .select();

    if (error) {
      return resultError(error);
    }

    return resultOk(null);
  }

  async markTaskAsInterested(taskId: number): Promise<Result<null>> {
    const { error } = await this.supabase
      .from('tasks_interests')
      .insert({ task_id: taskId })
      .select();

    if (error) {
      return resultError(error);
    }

    return resultOk(null);
  }
}
