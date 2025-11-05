import { Result } from '@/types';

export interface UsersParamsValidator {
  validateProfileCompletionParams(raw: unknown): Result<{
    nickname: string;
    avatarUrl: string;
  }>;
}
