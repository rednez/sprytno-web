import { days, isoDatetimeToDate } from '@/lib/validation-schemas';
import * as z from 'zod';

export const ServerParticipationMessageSchema = z.object({
  id: z.number(),
  created_at: isoDatetimeToDate,
  message: z.string(),
  sender_nickname: z.string(),
  sender_avatar_url: z.url().nullable(),
  recipient_nickname: z.string(),
  recipient_avatar_url: z.url().nullable(),
  sent_by_me: z.boolean(),
});

export const ServerParticipationSchema = z.object({
  id: z.number(),
  status: z.enum(['pending', 'accepted', 'declined', 'completed']),
  task_title: z.string(),
  task_description: z.string().nullable(),
  task_type: z.enum(['offer', 'request']),
  task_repeated_days: z.array(z.enum(days)).nullable(),
});

export const ServerParticipationDetailsSchema = z.object({
  id: z.number(),
  status: z.enum(['pending', 'accepted', 'declined', 'completed']),
  updated_at: isoDatetimeToDate,
  task_user_id: z.uuidv4(),
  task_user_nickname: z.string(),
  task_user_avatar_url: z.url().nullable(),
  task_type: z.enum(['offer', 'request']),
  task_title: z.string(),
  task_description: z.string().nullable(),
  task_repeated_days: z.array(z.enum(days)).nullable(),
  task_distance_meters: z.number(),
  task_lat: z.number(),
  task_lng: z.number(),
});
