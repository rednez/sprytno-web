import { createClient } from '@/lib/utils/supabase/server';
import { RepositoryResult, User } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { Result } from '../result';
import { UsersRepository } from './users.repository.interface';

export class SupabaseUsersRepository implements UsersRepository {
  constructor(private supabase: SupabaseClient) {}

  async getMe(): Promise<RepositoryResult<User>> {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return Result.error('user_not_found');
    }

    const email = (user?.user_metadata['email'] as string) || '';
    const fullName = (user?.user_metadata['full_name'] as string) || '';
    const avatarUrl = (user?.user_metadata['avatar_url'] as string) || '';

    return Result.ok({
      id: user.id,
      publicDetails: {
        avatarUrl,
        nickname: '',
      },
      privateDetails: {
        fullName,
        email,
      },
    });
  }
}
