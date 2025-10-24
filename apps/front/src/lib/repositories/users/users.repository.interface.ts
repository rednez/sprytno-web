import { Task, TaskDetails, User } from '@/types';

export interface UsersRepository {
  getMe(): Promise<User>;
}
