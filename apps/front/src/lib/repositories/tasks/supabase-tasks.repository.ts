import { TasksParser } from '@/lib/parsers/tasks';
import { Task, TaskDetails } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
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
  }): Promise<Task[]> {
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

    const { data } = await rpcQuery;
    const tasks = this.tasksParser.parseTasks(data);
    return tasks;
  }

  async getPublicTaskDetailsById(params: {
    taskId: number;
    currentLat: number;
    currentLng: number;
  }): Promise<TaskDetails> {
    // TODO: add caching
    await new Promise((res) => setTimeout(res, 1000));

    const { data, error } = await this.supabase.rpc('get_task_details', {
      task_id: params.taskId,
      current_lat: params.currentLat,
      current_lng: params.currentLng,
    });

    if (error) {
      throw new Error(`Supabase: ${error.message}`);
    }

    if (!data.length) {
      throw new Error('Supabase: no data');
    }

    const task = this.tasksParser.parsePublicTaskDetails(data[0]);
    return task;
  }

  // getMyTasks(): Promise<MyTask[]> {
  //   throw new Error('Method not implemented.');
  // }

  // getMyTaskById(taskId: number): Promise<MyTask> {
  //   throw new Error('Method not implemented.');
  // }
}
