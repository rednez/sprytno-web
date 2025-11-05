import { resultError, resultOk } from '@/lib/utils/result';
import { days, isoDatetimeToDate } from '@/lib/validation-schemas';
import {
  MyTask,
  MyTaskDetails,
  Result,
  Task,
  TaskDay,
  TaskDetails,
} from '@/types';
import * as z from 'zod';
import { TasksParser } from './tasks.parser.interface';

const ServerPublicTaskSchema = z.object({
  id: z.number(),
  user_id: z.uuid(),
  type: z.enum(['offer', 'request']),
  title: z.string(),
  description: z.string().nullable(),
  repeated_days: z.array(z.enum(days)).nullable(),
  is_me: z.boolean(),
  distance_meters: z.number(),
});

const ServerPublicTaskDetailsSchema = ServerPublicTaskSchema.extend({
  user_nickname: z.string(),
  user_avatar_url: z.url().nullable(),
  lat: z.number(),
  lng: z.number(),
  interest: z
    .object({
      status: z.enum(['pending', 'accepted', 'declined']),
      updated_at: isoDatetimeToDate,
    })
    .nullable(),
});

const ServerMyTaskSchema = z.object({
  id: z.number(),
  type: z.enum(['offer', 'request']),
  title: z.string(),
  description: z.string().nullable(),
  repeated_days: z.array(z.enum(days)).nullable(),
});

const ServerMyTaskDetailsSchema = ServerMyTaskSchema.extend({
  user_id: z.uuid(),
  user_nickname: z.string(),
  user_avatar_url: z.url().nullable(),
  lat: z.number(),
  lng: z.number(),
});

export class ZodTasksParser implements TasksParser {
  parsePublicTasks(raw: unknown): Result<Task[]> {
    try {
      const parsed = Array.isArray(raw) ? raw.map(this.parsePublicTask) : [];
      return resultOk(parsed);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return resultError(error);
      } else {
        return resultError(
          new Error('Unknown error occurred during parsing public tasks'),
        );
      }
    }
  }

  parsePublicTaskDetails(raw: unknown): Result<TaskDetails> {
    const { data, error, success } =
      ServerPublicTaskDetailsSchema.safeParse(raw);

    if (!success) {
      return resultError(error);
    }

    return resultOk({
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      repeatedDays: (data.repeated_days as TaskDay[]) ?? [],
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
      interest: data.interest
        ? {
            status: data.interest.status,
            updatedAt: data.interest.updated_at,
          }
        : null,
    });
  }

  parseMyTasks(raw: unknown): Result<MyTask[]> {
    try {
      const parsed = Array.isArray(raw) ? raw.map(this.parseMyTask) : [];
      return resultOk(parsed);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return resultError(error);
      } else {
        return resultError(
          new Error('Unknown error occurred during parsing my tasks'),
        );
      }
    }
  }

  parseMyTaskDetails(raw: unknown): Result<MyTaskDetails> {
    const { data, error, success } = ServerMyTaskDetailsSchema.safeParse(raw);

    if (!success) {
      return resultError(error);
    }

    return resultOk({
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      repeatedDays: (data.repeated_days as TaskDay[]) ?? [],
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
    });
  }

  private parsePublicTask(raw: unknown): Task {
    const data = ServerPublicTaskSchema.parse(raw);
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      repeatedDays: (data.repeated_days as TaskDay[]) ?? [],
      distanceMeters: data.distance_meters,
    };
  }

  private parseMyTask(raw: unknown): MyTask {
    const data = ServerMyTaskSchema.parse(raw);
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      repeatedDays: (data.repeated_days as TaskDay[]) ?? [],
    };
  }
}
