import { TasksParser } from '@/lib/parsers/tasks';
import { MyTask, Task } from '@/types';
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
    let rpcQuery = this.supabase.rpc('get_tasks', {
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

  getPublicTaskById(taskId: number): Promise<Task> {
    throw new Error('Method not implemented.');
  }

  getMyTasks(): Promise<MyTask[]> {
    throw new Error('Method not implemented.');
  }

  getMyTaskById(taskId: number): Promise<MyTask> {
    throw new Error('Method not implemented.');
  }
}
