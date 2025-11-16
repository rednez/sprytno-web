import { resultError, resultOk } from '@/lib/utils/result';
import * as z from 'zod';
import { ParticipationsParamsValidator } from './participations-params-validator.interface';

const NewMessageParamsSchema = z.object({
  participationId: z.number(),
  message: z.string().max(1000),
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
}
