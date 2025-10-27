import { createTasksRepository } from '@/lib/repositories/tasks/factory.server';
import { TasksValidator } from '@/lib/validators';
import { NextRequest } from 'next/server';
import * as z from 'zod';

export async function GET(request: NextRequest) {
  const repository = await createTasksRepository();

  try {
    const params = TasksValidator.validateNearbyTasksParams(
      request.nextUrl.searchParams,
    );
    const result = await repository.getNearbyTasks(params);

    if (!result.ok) {
      return Response.json({ error: result.error }, { status: 400 });
    }

    return Response.json(result.data);
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
