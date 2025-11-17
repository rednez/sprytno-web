import { MyParticipation, ParticipationMessage, Result } from '@/types';

export interface ParticipationsParser {
  parseMyTaskParticipationMessages(
    row: unknown,
  ): Result<ParticipationMessage[]>;

  parseMyParticipations(raw: unknown): Result<MyParticipation[]>;
}
