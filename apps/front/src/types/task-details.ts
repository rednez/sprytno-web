import { Task } from './task';
import { TaskParticipationStatus } from './task-participation';
import { User } from './user';

export interface TaskDetails extends Task {
  user: User;
  lat: number;
  lng: number;
  participation: {
    status: TaskParticipationStatus;
    updatedAt: Date;
  } | null;
}
