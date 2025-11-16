import { ZodParticipationsParser } from '@/lib/parsers/participations';
import { createClient } from '@/lib/utils/supabase/server';
import { ParticipationsRepository } from './participations-repository.interface';
import { SupabaseParticipationsRepository } from './supabase-participations-repository';

export async function createParticipationsRepository(): Promise<ParticipationsRepository> {
  const supabase = await createClient();
  const participationsParser = new ZodParticipationsParser();
  const repository = new SupabaseParticipationsRepository(
    supabase,
    participationsParser,
  );
  return repository;
}
