import { resultError, resultOk } from '@/lib/utils/result';
import { MyParticipation, ParticipationMessage, Result } from '@/types';
import * as z from 'zod';
import { ParticipationsParser } from './participations-parser.interface';
import {
  ServerMyParticipationSchema,
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

  parseMyParticipations(raw: unknown): Result<MyParticipation[]> {
    try {
      const parsed = Array.isArray(raw)
        ? raw.map(this.parseMyParticipation)
        : [];
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

  private parseMyParticipation(raw: unknown): MyParticipation {
    const data = ServerMyParticipationSchema.parse(raw);
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
