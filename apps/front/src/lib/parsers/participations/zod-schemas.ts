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

export const ServerMyParticipationSchema = z.object({
  id: z.number(),
  status: z.enum(['pending', 'accepted', 'declined', 'completed']),
  task_title: z.string(),
  task_description: z.string().nullable(),
  task_type: z.enum(['offer', 'request']),
  task_repeated_days: z.array(z.enum(days)).nullable(),
});
