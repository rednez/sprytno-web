import { Result, ParticipationMessage } from '@/types';

export interface ParticipationsRepository {
  acceptParticipation(participationId: number): Promise<Result<null>>;

  declineParticipation(participationId: number): Promise<Result<null>>;

  getMyTaskParticipationMessages(
    participationId: number,
  ): Promise<Result<ParticipationMessage[]>>;

  sendParticipationMessage(
    participationId: number,
    message: string,
  ): Promise<Result<null>>;
}
