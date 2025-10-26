import { MyTask } from './my-task';
import { User } from './user';

export interface MyTaskDetails extends MyTask {
  user: User;
  lat: number;
  lng: number;
}
