import {
  Participation,
  ParticipationDetails,
  ParticipationMessage,
  Result,
} from '@/types';

export interface ParticipationsParser {
  parseMyTaskParticipationMessages(
    row: unknown,
  ): Result<ParticipationMessage[]>;

  parseParticipations(raw: unknown): Result<Participation[]>;

  parseParticipationDetails(raw: unknown): Result<ParticipationDetails>;
}
