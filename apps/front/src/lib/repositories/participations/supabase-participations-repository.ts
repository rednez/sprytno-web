import { ParticipationsParser } from '@/lib/parsers/participations';
import { resultError, resultOk } from '@/lib/utils/result';
import { ParticipationMessage, Result } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { ParticipationsRepository } from './participations-repository.interface';

export class SupabaseParticipationsRepository
  implements ParticipationsRepository
{
  constructor(
    private supabase: SupabaseClient,
    private participationsParser: ParticipationsParser,
  ) {}

  async getMyTaskParticipationMessages(
    participationId: number,
  ): Promise<Result<ParticipationMessage[]>> {
    const { data, error } = await this.supabase
      .rpc('get_participation_messages', {
        p_participation_id: participationId,
      })
      .select();

    if (error) {
      return resultError(error);
    }

    return this.participationsParser.parseMyTaskParticipationMessages(data);
  }

  async acceptParticipation(participationId: number): Promise<Result<null>> {
    const { error } = await this.supabase
      .from('participations')
      .update({ status: 'accepted' })
      .eq('id', participationId)
      .select()
      .single();

    if (error) {
      return resultError(error);
    }

    return resultOk(null);
  }

  async declineParticipation(participationId: number): Promise<Result<null>> {
    const participation = await this.supabase
      .from('participations')
      .update({ status: 'declined' })
      .eq('id', participationId)
      .select()
      .single();

    if (participation.error) {
      return resultError(participation.error);
    }

    return resultOk(null);
  }

  async sendParticipationMessage(
    participationId: number,
    message: string,
  ): Promise<Result<null>> {
    const { error } = await this.supabase.rpc('create_participation_message', {
      p_participation_id: participationId,
      p_message: message,
    });

    if (error) {
      return resultError(error);
    }

    return resultOk(null);
  }
}
