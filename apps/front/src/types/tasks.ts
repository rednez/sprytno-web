import { ParticipationStatus } from './participations';

export type TaskType = 'offer' | 'request';
export type TaskDay = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  type: TaskType;
  repeatedDays: TaskDay[];
  distanceMeters: number;
}

export interface TaskParticipation {
  id: number;
  status: ParticipationStatus;
  updatedAt: Date;
  user: {
    nickname: string;
    avatarUrl: string | null;
  };
}
