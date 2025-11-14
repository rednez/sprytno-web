export type TaskParticipationStatus =
  | 'pending'
  | 'accepted'
  | 'declined'
  | 'completed';

export interface TaskParticipation {
  id: number;
  status: TaskParticipationStatus;
  updatedAt: Date;
  user: {
    nickname: string;
    avatarUrl: string | null;
  };
}

export interface TaskParticipationMessage {
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
