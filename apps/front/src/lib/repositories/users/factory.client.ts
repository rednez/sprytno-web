import { createClient } from '@/lib/utils/supabase/client';
import { SupabaseUsersRepository } from './supabase-users.repository';
import { UsersRepository } from './users.repository.interface';

export function createUsersRepository(): UsersRepository {
  const supabase = createClient();
  const repository = new SupabaseUsersRepository(supabase);
  return repository;
}
