import {
  MyParticipation,
  ParticipationMessage,
  Result,
  TaskParticipation,
} from '@/types';

export interface ParticipationsParser {
  parseMyTaskParticipationMessages(
    row: unknown,
  ): Result<ParticipationMessage[]>;

  // parseMyParticipations(row: unknown): Result<MyParticipation[]>;
}
