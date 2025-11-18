import { resultError, resultOk } from '@/lib/utils/result';
import {
  Participation,
  ParticipationDetails,
  ParticipationMessage,
  Result,
} from '@/types';
import * as z from 'zod';
import { ParticipationsParser } from './participations-parser.interface';
import {
  ServerParticipationDetailsSchema,
  ServerParticipationSchema,
  ServerParticipationMessageSchema,
} from './zod-schemas';

export class ZodParticipationsParser implements ParticipationsParser {
  parseMyTaskParticipationMessages(
    raw: unknown,
  ): Result<ParticipationMessage[]> {
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

  parseParticipations(raw: unknown): Result<Participation[]> {
    try {
      const parsed = Array.isArray(raw) ? raw.map(this.parseParticipation) : [];
      return resultOk(parsed);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return resultError(error);
      } else {
        return resultError(
          new Error('Unknown error occurred during parsing my participations'),
        );
      }
    }
  }

  parseParticipationDetails(raw: unknown): Result<ParticipationDetails> {
    const { data, error, success } =
      ServerParticipationDetailsSchema.safeParse(raw);

    if (!success) {
      return resultError(error);
    }

    return resultOk({
      id: data.id,
      status: data.status,
      updatedAt: data.updated_at,
      task: {
        title: data.task_title,
        description: data.task_description,
        type: data.task_type,
        repeatedDays: data.task_repeated_days || [],
        distanceMeters: data.task_distance_meters,
        lat: data.task_lat,
        lng: data.task_lng,
        user: {
          id: data.task_user_id,
          nickname: data.task_user_nickname,
          avatarUrl: data.task_user_avatar_url,
        },
      },
    });
  }

  private parseMyTaskParticipationMessage(raw: unknown): ParticipationMessage {
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

  private parseParticipation(raw: unknown): Participation {
    const data = ServerParticipationSchema.parse(raw);
    return {
      id: data.id,
      status: data.status,
      task: {
        title: data.task_title,
        description: data.task_description,
        type: data.task_type,
        repeatedDays: data.task_repeated_days || [],
      },
    };
  }
}
