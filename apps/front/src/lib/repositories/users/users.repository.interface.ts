import { Me, RepositoryResult } from '@/types';

export interface UsersRepository {
  getMe(): Promise<RepositoryResult<Me>>;
  completeProfile(params: {
    nickname: string;
    avatarUrl: string;
  }): Promise<RepositoryResult<Me>>;
}
