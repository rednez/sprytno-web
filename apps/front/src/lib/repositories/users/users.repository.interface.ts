import { Me, RepositoryResult } from '@/types';

export interface UsersRepository {
  getMe(): Promise<RepositoryResult<Me>>;
}
