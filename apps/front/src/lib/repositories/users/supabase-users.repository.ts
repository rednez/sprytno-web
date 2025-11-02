import { Me, RepositoryResult } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { Result } from '../result';
import { UsersRepository } from './users.repository.interface';

export class SupabaseUsersRepository implements UsersRepository {
  constructor(private supabase: SupabaseClient) {}

  async getMe(): Promise<RepositoryResult<Me>> {
    const { data, error } = await this.supabase.from('my_details').select('*');

    if (error) {
      return Result.error(error.message, 'db');
    }
    if (!data || data.length === 0) {
      return Result.error('User not found', 'user_not_found');
    }

    const {
      user_id: id,
      nickname,
      avatar_url: avatarUrl,
      email,
      phone,
    } = data[0];

    return Result.ok({
      id,
      isProfileCompleted: !!nickname && !!avatarUrl,
      publicDetails: {
        avatarUrl,
        nickname,
      },
      privateDetails: {
        fullName: null,
        email,
        phone,
      },
    });
  }

  async completeProfile({
    nickname,
    avatarUrl,
  }: {
    nickname: string;
    avatarUrl: string;
  }): Promise<RepositoryResult<Me>> {
    const { error } = await this.supabase
      .from('users_public_details')
      .insert({ nickname, avatar_url: avatarUrl })
      .select();

    if (error) {
      if (error.code === '23505') {
        return Result.error('The nickname is already taken', 'nickname');
      } else {
        return Result.error(error.message, 'db');
      }
    }

    return this.getMe();
  }
}
