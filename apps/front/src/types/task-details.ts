import { Task } from './task';
import { User } from './user';

export type TaskInterestStatus = 'pending' | 'accepted' | 'declined';

export interface TaskDetails extends Task {
  user: User;
  lat: number;
  lng: number;
  interest: {
    status: TaskInterestStatus;
    updatedAt: Date;
  } | null;
}
