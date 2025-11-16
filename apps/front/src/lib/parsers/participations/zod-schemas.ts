import { isoDatetimeToDate } from '@/lib/validation-schemas';
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
