import { ZodTasksParser } from '@/lib/parsers/tasks';
import { createClient } from '@/lib/utils/supabase/client';
import { SupabaseTasksRepository } from './supabase-tasks.repository';
import { TasksRepository } from './tasks.repository.interface';

export function createTasksRepository(): TasksRepository {
  const supabase = createClient();
  const tasksParser = new ZodTasksParser();
  const repository = new SupabaseTasksRepository(supabase, tasksParser);
  return repository;
}
