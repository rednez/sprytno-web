import { ZodTasksParser } from '@/lib/parsers/tasks';
import { SupabaseTasksRepository } from '@/lib/repositories/tasks';
import { createClient } from '@/lib/utils/supabase/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const tasksParser = new ZodTasksParser();
  const repository = new SupabaseTasksRepository(supabase, tasksParser);
  const result = await repository.getMyTasks();

  if (!result.ok) {
    return Response.json({ error: result.error }, { status: 400 });
  }

  return Response.json(result.data);
}
