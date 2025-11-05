import { UsersParamsValidator } from './users-params-validator.interface';
import { ZodUsersParamsValidator } from './zod-users-params-validator';

export function createUsersParamsValidator(): UsersParamsValidator {
  return new ZodUsersParamsValidator();
}
