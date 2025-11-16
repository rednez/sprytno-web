'use server';

import { createParticipationsRepository } from '@/lib/repositories/participations';
import { createTasksRepository } from '@/lib/repositories/tasks';
import { ErrorParser } from '@/lib/utils/errors';
import { createParticipationsParamsValidator } from '@/lib/validators/participations';

export async function sendParticipationRequest(
  taskId: number,
  message?: string,
) {
  const repository = await createTasksRepository();
  const { error } = await repository.sendParticipationRequest(taskId, message);
  return error
    ? { error: ErrorParser.fromError(error).parse() }
    : { error: null };
}

export async function acceptParticipation(participationId: number) {
  const repository = await createParticipationsRepository();
  const { error } = await repository.acceptParticipation(participationId);

  return error
    ? { error: ErrorParser.fromError(error).parse() }
    : { error: null };
}

export async function declineParticipation(participationId: number) {
  const repository = await createParticipationsRepository();
  const { error } = await repository.declineParticipation(participationId);
  return error
    ? { error: ErrorParser.fromError(error).parse() }
    : { error: null };
}

export async function sendParticipationMessage(params: {
  participationId: number;
  message: string;
}) {
  const validator = createParticipationsParamsValidator();
  const validatedParams = validator.validateNewMessageParams(params);

  if (!validatedParams.ok) {
    return { error: ErrorParser.fromError(validatedParams.error).parse() };
  }

  const repository = await createParticipationsRepository();
  const { error } = await repository.sendParticipationMessage(
    validatedParams.data.participationId,
    validatedParams.data.message,
  );
  return error
    ? { error: ErrorParser.fromError(error).parse() }
    : { error: null };
}
