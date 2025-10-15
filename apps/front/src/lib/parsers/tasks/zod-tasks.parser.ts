import { Task } from '@/types';
import * as z from 'zod';
import { TasksParser } from './tasks.parser.interface';

const TaskSchema = z.object({
  id: z.number(),
  user_id: z.uuid(),
  type: z.enum(['offer', 'request']),
  title: z.string(),
  description: z.string().nullable(),
  repeated_days: z.array(z.string()).nullable(),
  is_me: z.boolean(),
  distance_meters: z.number(),
});

export class ZodTasksParser implements TasksParser {
  parseTask(row: unknown): Task {
    const data = TaskSchema.parse(row);
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      repeatedDays: data.repeated_days ?? [],
      distanceMeters: data.distance_meters,
    };
  }

  parseTasks(row: unknown): Task[] {
    return Array.isArray(row) ? row.map(this.parseTask) : [];
  }
}
