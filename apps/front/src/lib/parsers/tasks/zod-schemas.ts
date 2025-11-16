import { days, isoDatetimeToDate } from '@/lib/validation-schemas';
import * as z from 'zod';

export const ServerPublicTaskSchema = z.object({
  id: z.number(),
  user_id: z.uuid(),
  type: z.enum(['offer', 'request']),
  title: z.string(),
  description: z.string().nullable(),
  repeated_days: z.array(z.enum(days)).nullable(),
  is_me: z.boolean(),
  distance_meters: z.number(),
});

export const ServerPublicTaskDetailsSchema = ServerPublicTaskSchema.extend({
  user_nickname: z.string(),
  user_avatar_url: z.url().nullable(),
  lat: z.number(),
  lng: z.number(),
  participation_status: z
    .enum(['pending', 'accepted', 'declined', 'completed'])
    .nullable(),
  participation_updated_at: isoDatetimeToDate.nullable(),
});

export const ServerMyTaskSchema = z.object({
  id: z.number(),
  type: z.enum(['offer', 'request']),
  title: z.string(),
  description: z.string().nullable(),
  repeated_days: z.array(z.enum(days)).nullable(),
});

export const ServerMyTaskDetailsSchema = ServerMyTaskSchema.extend({
  user_id: z.uuid(),
  user_nickname: z.string(),
  user_avatar_url: z.url().nullable(),
  lat: z.number(),
  lng: z.number(),
});

export const ServerMyTaskParticipationSchema = z.object({
  id: z.number(),
  status: z.enum(['pending', 'accepted', 'declined', 'completed']),
  updated_at: isoDatetimeToDate,
  user_nickname: z.string(),
  user_avatar_url: z.url().nullable(),
});
