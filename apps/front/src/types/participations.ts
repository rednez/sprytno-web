import { TaskDay, TaskType } from './tasks';

export type ParticipationStatus =
  | 'pending'
  | 'accepted'
  | 'declined'
  | 'completed';

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

export interface Participation {
  id: number;
  status: ParticipationStatus;
  task: {
    title: string;
    description: string | null;
    type: TaskType;
    repeatedDays: TaskDay[];
  };
}

export interface ParticipationDetails {
  id: number;
  status: ParticipationStatus;
  updatedAt: Date;
  task: {
    title: string;
    description: string | null;
    type: TaskType;
    repeatedDays: TaskDay[];
    distanceMeters: number;
    lat: number;
    lng: number;
    user: {
      id: string;
      nickname: string;
      avatarUrl: string | null;
    };
  };
}
