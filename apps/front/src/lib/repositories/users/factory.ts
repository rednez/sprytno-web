import { createClient } from '@/lib/utils/supabase/server';
import { SupabaseUsersRepository } from './supabase-users-repository';
import { UsersRepository } from './users-repository.interface';

export async function createUsersRepository(): Promise<UsersRepository> {
  const supabase = await createClient();
  const repository = new SupabaseUsersRepository(supabase);
  return repository;
}
