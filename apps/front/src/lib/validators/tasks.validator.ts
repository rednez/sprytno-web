import * as z from 'zod';
import { stringToNumber } from '../validation-schemas';

const NearbyTasksParamsSchema = z.object({
  lat: stringToNumber,
  lng: stringToNumber,
  type: z.enum(['offers', 'requests', 'all']),
  distance: stringToNumber,
});

export class TasksValidator {
  static validateNearbyTasksParams(params: URLSearchParams) {
    return NearbyTasksParamsSchema.parse({
      lat: params.get('lat'),
      lng: params.get('lng'),
      type: params.get('type'),
      distance: params.get('distance'),
    });
  }
}
