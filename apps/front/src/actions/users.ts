'use server';

import { createUsersRepository } from '@/lib/repositories/users';
import { ErrorParser } from '@/lib/utils/errors';
import { createUsersParamsValidator } from '@/lib/validators/users';

export async function completeProfile(params: {
  nickname: string;
  avatarUrl: string;
}) {
  const validator = createUsersParamsValidator();
  const validatedParams = validator.validateProfileCompletionParams(params);

  if (validatedParams.ok) {
    const repository = await createUsersRepository();
    const result = await repository.completeProfile(validatedParams.data);

    return result.ok
      ? { error: null }
      : { error: ErrorParser.fromError(result.error).parse() };
  } else {
    return {
      error: ErrorParser.fromError(validatedParams.error).parse(),
    };
  }
}
