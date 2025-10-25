import { MyTask, Task, TaskDetails } from '@/types';
import * as z from 'zod';
import { TasksParser } from './tasks.parser.interface';

const ServerPublicTaskSchema = z.object({
  id: z.number(),
  user_id: z.uuid(),
  type: z.enum(['offer', 'request']),
  title: z.string(),
  description: z.string().nullable(),
  repeated_days: z.array(z.string()).nullable(),
  is_me: z.boolean(),
  distance_meters: z.number(),
});

const ServerPublicTaskDetailsSchema = ServerPublicTaskSchema.extend({
  user_nickname: z.string(),
  user_avatar_url: z.url().nullable(),
  lat: z.number(),
  lng: z.number(),
});

const ServerMyTaskSchema = z.object({
  id: z.number(),
  type: z.enum(['offer', 'request']),
  title: z.string(),
  description: z.string().nullable(),
  repeated_days: z.array(z.string()).nullable(),
});

export class ZodTasksParser implements TasksParser {
  parsePublicTasks(row: unknown): Task[] {
    return Array.isArray(row) ? row.map(this.parsePublicTask) : [];
  }

  parsePublicTaskDetails(row: unknown): TaskDetails {
    const data = ServerPublicTaskDetailsSchema.parse(row);
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      repeatedDays: data.repeated_days ?? [],
      distanceMeters: data.distance_meters,
      user: {
        id: data.user_id,
        publicDetails: {
          nickname: data.user_nickname,
          avatarUrl: data.user_avatar_url,
        },
        privateDetails: null,
      },
      lat: data.lat,
      lng: data.lng,
    };
  }

  parseMyTasks(row: unknown): MyTask[] {
    return Array.isArray(row) ? row.map(this.parseMyTask) : [];
  }

  private parsePublicTask(row: unknown): Task {
    const data = ServerPublicTaskSchema.parse(row);
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      repeatedDays: data.repeated_days ?? [],
      distanceMeters: data.distance_meters,
    };
  }

  private parseMyTask(row: unknown): MyTask {
    const data = ServerMyTaskSchema.parse(row);
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      repeatedDays: data.repeated_days ?? [],
    };
  }
}
