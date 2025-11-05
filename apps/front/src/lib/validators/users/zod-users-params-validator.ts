import { resultError, resultOk } from '@/lib/utils/result';
import { Result } from '@/types';
import * as z from 'zod';
import { UsersParamsValidator } from './users-params-validator.interface';

export const CompleteProfileParamsSchema = z.object({
  nickname: z.string().min(4).max(40),
  avatarUrl: z.url(),
});

export class ZodUsersParamsValidator implements UsersParamsValidator {
  validateProfileCompletionParams(raw: unknown): Result<{
    nickname: string;
    avatarUrl: string;
  }> {
    const { data, error, success } = CompleteProfileParamsSchema.safeParse(raw);

    if (success) {
      return resultOk(data);
    } else {
      return resultError(error);
    }
  }
}
