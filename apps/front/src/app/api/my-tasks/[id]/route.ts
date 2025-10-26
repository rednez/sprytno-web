import { ZodTasksParser } from '@/lib/parsers/tasks';
import { SupabaseTasksRepository } from '@/lib/repositories/tasks';
import { createClient } from '@/lib/utils/supabase/server';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();
  const tasksParser = new ZodTasksParser();
  const repository = new SupabaseTasksRepository(supabase, tasksParser);
  const result = await repository.getMyTaskDetails(parseInt(id));

  if (!result.ok) {
    return Response.json({ error: result.error }, { status: 400 });
  }

  return Response.json(result.data);
}
