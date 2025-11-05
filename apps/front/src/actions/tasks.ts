'use server';

import { createTasksRepository } from '@/lib/repositories/tasks';
import { ErrorParser } from '@/lib/utils/errors';
import { createTasksParamsValidator } from '@/lib/validators/tasks';
import { TaskDay, TaskType } from '@/types';
import { refresh } from 'next/cache';

export async function createTask(params: {
  title: string;
  description?: string;
  type: TaskType;
  repeatedDays: TaskDay[];
  location: { lat: number; lng: number };
}) {
  const validator = createTasksParamsValidator();
  const validatedParams = validator.validateNewTaskParams(params);

  if (!validatedParams.ok) {
    return { error: ErrorParser.fromError(validatedParams.error).parse() };
  }

  const repository = await createTasksRepository();
  const { error } = await repository.createTask(validatedParams.data);

  return error
    ? { error: ErrorParser.fromError(error).parse() }
    : { error: null };
}

export async function markTaskAsInterested(taskId: number) {
  const repository = await createTasksRepository();
  const { error } = await repository.markTaskAsInterested(taskId);
  if (!error) {
    refresh();
  }
  return error
    ? { error: ErrorParser.fromError(error).parse() }
    : { error: null };
}
