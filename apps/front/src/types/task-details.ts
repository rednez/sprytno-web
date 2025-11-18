import { Task } from './tasks';
import { ParticipationStatus } from './participations';
import { User } from './user';

export interface TaskDetails extends Task {
  user: User;
  lat: number;
  lng: number;
  participation: {
    status: ParticipationStatus;
    updatedAt: Date;
  } | null;
}
