import { resultError, resultOk } from '@/lib/utils/result';
import { days, stringToNumber } from '@/lib/validation-schemas';
import { Result, TaskDay, TaskType } from '@/types';
import * as z from 'zod';
import { TasksParamsValidator } from './tasks-params-validator.interface';

const NearbyTasksParamsSchema = z.object({
  lat: stringToNumber,
  lng: stringToNumber,
  type: z.enum(['offers', 'requests', 'all']),
  distance: stringToNumber,
});

const PublicTasksDetailsParamsSchema = z.object({
  currentLat: stringToNumber,
  currentLng: stringToNumber,
});

const NewTaskParamsSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().min(10).max(1000).optional(),
  type: z.enum(['request', 'offer']),
  repeatedDays: z.array(z.enum(days)).default(() => []),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

export class ZodTasksParamsValidator implements TasksParamsValidator {
  validateNearbyTasksParams(params: URLSearchParams) {
    const { data, error, success } = NearbyTasksParamsSchema.safeParse({
      lat: params.get('lat'),
      lng: params.get('lng'),
      type: params.get('type'),
      distance: params.get('distance'),
    });

    if (success) {
      return resultOk(data);
    } else {
      return resultError(error);
    }
  }

  validatePublicTasksDetailsParams(params: URLSearchParams) {
    const { data, error, success } = PublicTasksDetailsParamsSchema.safeParse({
      currentLat: params.get('currentLat'),
      currentLng: params.get('currentLng'),
    });

    if (success) {
      return resultOk(data);
    } else {
      return resultError(error);
    }
  }

  validateNewTaskParams(raw: unknown): Result<{
    title: string;
    description?: string;
    type: TaskType;
    repeatedDays: TaskDay[];
    location: { lat: number; lng: number };
  }> {
    console.log('Validating new task params:', raw);
    const { data, error, success } = NewTaskParamsSchema.safeParse(raw);

    if (success) {
      return resultOk(data);
    } else {
      return resultError(error);
    }
  }
}
