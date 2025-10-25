import { RepositoryResult, User } from '@/types';

export interface UsersRepository {
  getMe(): Promise<RepositoryResult<User>>;
}
