import { Task } from './task';
import { User } from './user';

export interface TaskDetails extends Task {
  user: User;
  lat: number;
  lng: number;
}
