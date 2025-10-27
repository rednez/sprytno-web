import { ZodTasksParser } from '@/lib/parsers/tasks';
import { createClient } from '@/lib/utils/supabase/server';
import { SupabaseTasksRepository } from './supabase-tasks.repository';
import { TasksRepository } from './tasks.repository.interface';

export async function createTasksRepository(): Promise<TasksRepository> {
  const supabase = await createClient();
  const tasksParser = new ZodTasksParser();
  const repository = new SupabaseTasksRepository(supabase, tasksParser);
  return repository;
}
