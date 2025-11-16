import { ParticipationsParamsValidator } from './participations-params-validator.interface';
import { ZodParticipationsParamsValidator } from './zod-participations-params-validator';

export function createParticipationsParamsValidator(): ParticipationsParamsValidator {
  return new ZodParticipationsParamsValidator();
}
