import { Result, TaskDay, TaskType } from '@/types';

export interface ParticipationsParamsValidator {
  validateNewMessageParams(raw: unknown): Result<{
    participationId: number;
    message: string;
  }>;

  validateParticipationDetailsParams(params: URLSearchParams): Result<{
    currentLat: number;
    currentLng: number;
  }>;
}
