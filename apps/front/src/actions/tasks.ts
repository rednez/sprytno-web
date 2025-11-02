'use server';

import { createTasksRepository } from '@/lib/repositories/tasks';
import { TaskDay, TaskType } from '@/types';

export async function createTask(params: {
  title: string;
  description?: string;
  type: TaskType;
  repeatedDays: TaskDay[];
  lat: number;
  lng: number;
}) {
  const repository = await createTasksRepository();
  const { error } = await repository.createTask(params);
  return error ? { errors: error.toObject() } : { errors: null };
}
