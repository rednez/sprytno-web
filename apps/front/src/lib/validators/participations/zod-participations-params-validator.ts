import { resultError, resultOk } from '@/lib/utils/result';
import { stringToNumber } from '@/lib/validation-schemas';
import * as z from 'zod';
import { ParticipationsParamsValidator } from './participations-params-validator.interface';

const NewMessageParamsSchema = z.object({
  participationId: z.number(),
  message: z.string().max(1000),
});

const ParticipationDetailsParamsSchema = z.object({
  currentLat: stringToNumber,
  currentLng: stringToNumber,
});

export class ZodParticipationsParamsValidator
  implements ParticipationsParamsValidator
{
  validateNewMessageParams(raw: unknown) {
    const { data, error, success } = NewMessageParamsSchema.safeParse(raw);

    if (success) {
      return resultOk(data);
    } else {
      return resultError(error);
    }
  }

  validateParticipationDetailsParams(params: URLSearchParams) {
    const { data, error, success } = ParticipationDetailsParamsSchema.safeParse(
      {
        currentLat: params.get('currentLat'),
        currentLng: params.get('currentLng'),
      },
    );

    if (success) {
      return resultOk(data);
    } else {
      return resultError(error);
    }
  }
}
