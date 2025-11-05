import { FormDataValidationError } from '@/lib/utils/errors';
import { resultError, resultOk } from '@/lib/utils/result';
import { Me, Result } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { UsersRepository } from './users-repository.interface';

export class SupabaseUsersRepository implements UsersRepository {
  constructor(private supabase: SupabaseClient) {}

  async getMe(): Promise<Result<Me>> {
    const { data, error } = await this.supabase.from('my_details').select('*');

    if (error) {
      return resultError(error);
    }
    if (!data?.length) {
      return resultError(new Error('User not found'));
    }

    const {
      user_id: id,
      nickname,
      avatar_url: avatarUrl,
      email,
      phone,
    } = data[0];

    return resultOk({
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
  }): Promise<Result<Me>> {
    const { error } = await this.supabase
      .from('users_public_details')
      .insert({ nickname, avatar_url: avatarUrl })
      .select();

    if (error) {
      if (error.code === '23505') {
        return resultError(
          new FormDataValidationError({
            nickname: ['The nickname is already taken'],
          }),
        );
      } else {
        return resultError(error);
      }
    }

    return this.getMe();
  }
}
