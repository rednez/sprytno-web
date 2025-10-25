import { ZodTasksParser } from '@/lib/parsers/tasks';
import { SupabaseTasksRepository } from '@/lib/repositories/tasks';
import { createClient } from '@/lib/utils/supabase/server';
import { TasksValidator } from '@/lib/validators';
import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();
  const tasksParser = new ZodTasksParser();
  const repository = new SupabaseTasksRepository(supabase, tasksParser);

  try {
    const params = TasksValidator.validatePublicTasksDetailsParams(
      request.nextUrl.searchParams,
    );
    const tasks = await repository.getPublicTaskDetails({
      taskId: parseInt(id),
      ...params,
    });
    return Response.json(tasks);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.issues }, { status: 400 });
    } else {
      return Response.json(
        {
          error: error instanceof Error ? error.message : 'Unexpected error',
        },
        { status: 500 },
      );
    }
  }
}
