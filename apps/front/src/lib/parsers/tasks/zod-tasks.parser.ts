import { resultError, resultOk } from '@/lib/utils/result';
import {
  MyTask,
  MyTaskDetails,
  Result,
  Task,
  TaskDay,
  TaskDetails,
  TaskParticipation,
  TaskParticipationMessage,
} from '@/types';
import * as z from 'zod';
import { TasksParser } from './tasks.parser.interface';
import {
  ServerMyTaskDetailsSchema,
  ServerMyTaskParticipationSchema,
  ServerMyTaskSchema,
  ServerParticipationMessageSchema,
  ServerPublicTaskDetailsSchema,
  ServerPublicTaskSchema,
} from './zod-schemas';

export class ZodTasksParser implements TasksParser {
  parsePublicTasks(raw: unknown): Result<Task[]> {
    try {
      const parsed = Array.isArray(raw) ? raw.map(this.parsePublicTask) : [];
      return resultOk(parsed);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return resultError(error);
      } else {
        return resultError(
          new Error('Unknown error occurred during parsing public tasks'),
        );
      }
    }
  }

  parsePublicTaskDetails(raw: unknown): Result<TaskDetails> {
    const { data, error, success } =
      ServerPublicTaskDetailsSchema.safeParse(raw);

    if (!success) {
      return resultError(error);
    }

    return resultOk({
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      repeatedDays: (data.repeated_days as TaskDay[]) ?? [],
      distanceMeters: data.distance_meters,
      user: {
        id: data.user_id,
        publicDetails: {
          nickname: data.user_nickname,
          avatarUrl: data.user_avatar_url,
        },
        privateDetails: null,
      },
      lat: data.lat,
      lng: data.lng,
      participation:
        data.participation_status && data.participation_updated_at
          ? {
              status: data.participation_status,
              updatedAt: data.participation_updated_at,
            }
          : null,
    });
  }

  parseMyTasks(raw: unknown): Result<MyTask[]> {
    try {
      const parsed = Array.isArray(raw) ? raw.map(this.parseMyTask) : [];
      return resultOk(parsed);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return resultError(error);
      } else {
        return resultError(
          new Error('Unknown error occurred during parsing my tasks'),
        );
      }
    }
  }

  parseMyTaskDetails(raw: unknown): Result<MyTaskDetails> {
    const { data, error, success } = ServerMyTaskDetailsSchema.safeParse(raw);

    if (!success) {
      return resultError(error);
    }

    return resultOk({
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      repeatedDays: (data.repeated_days as TaskDay[]) ?? [],
      user: {
        id: data.user_id,
        publicDetails: {
          nickname: data.user_nickname,
          avatarUrl: data.user_avatar_url,
        },
        privateDetails: null,
      },
      lat: data.lat,
      lng: data.lng,
    });
  }

  parseMyTaskParticipations(raw: unknown): Result<TaskParticipation[]> {
    try {
      const parsed = Array.isArray(raw)
        ? raw.map(this.parseMyTaskParticipation)
        : [];
      return resultOk(parsed);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return resultError(error);
      } else {
        return resultError(
          new Error(
            'Unknown error occurred during parsing task participations',
          ),
        );
      }
    }
  }

  parseMyTaskParticipationMessages(
    raw: unknown,
  ): Result<TaskParticipationMessage[]> {
    try {
      const parsed = Array.isArray(raw)
        ? raw.map(this.parseMyTaskParticipationMessage)
        : [];
      return resultOk(parsed);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return resultError(error);
      } else {
        return resultError(
          new Error(
            'Unknown error occurred during parsing task participation messages',
          ),
        );
      }
    }
  }

  private parsePublicTask(raw: unknown): Task {
    const data = ServerPublicTaskSchema.parse(raw);
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      repeatedDays: (data.repeated_days as TaskDay[]) ?? [],
      distanceMeters: data.distance_meters,
    };
  }

  private parseMyTask(raw: unknown): MyTask {
    const data = ServerMyTaskSchema.parse(raw);
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      repeatedDays: (data.repeated_days as TaskDay[]) ?? [],
    };
  }

  private parseMyTaskParticipation(raw: unknown): TaskParticipation {
    const data = ServerMyTaskParticipationSchema.parse(raw);
    return {
      id: data.id,
      status: data.status,
      updatedAt: data.updated_at,
      user: {
        nickname: data.user_nickname,
        avatarUrl: data.user_avatar_url,
      },
    };
  }

  private parseMyTaskParticipationMessage(
    raw: unknown,
  ): TaskParticipationMessage {
    const data = ServerParticipationMessageSchema.parse(raw);
    return {
      id: data.id,
      createdAt: data.created_at,
      message: data.message,
      sender: {
        nickname: data.sender_nickname,
        avatarUrl: data.sender_avatar_url,
      },
      recipient: {
        nickname: data.recipient_nickname,
        avatarUrl: data.recipient_avatar_url,
      },
      sentByMe: data.sent_by_me,
    };
  }
}
