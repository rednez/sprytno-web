import { TaskDay, TaskType } from './task';

export type ParticipationStatus =
  | 'pending'
  | 'accepted'
  | 'declined'
  | 'completed';

export interface TaskParticipation {
  id: number;
  status: ParticipationStatus;
  updatedAt: Date;
  user: {
    nickname: string;
    avatarUrl: string | null;
  };
}

export interface ParticipationMessage {
  id: number;
  message: string;
  sender: {
    nickname: string;
    avatarUrl: string | null;
  };
  recipient: {
    nickname: string;
    avatarUrl: string | null;
  };
  createdAt: Date;
  sentByMe: boolean;
}

export interface MyParticipation {
  id: number;
  status: ParticipationStatus;
  task: {
    title: string;
    description: string | null;
    type: TaskType;
    repeatedDays: TaskDay[];
  };
}
