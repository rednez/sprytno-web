import { Me, Result } from '@/types';

export interface UsersRepository {
  getMe(): Promise<Result<Me>>;

  completeProfile(params: {
    nickname: string;
    avatarUrl: string;
  }): Promise<Result<Me>>;
}
