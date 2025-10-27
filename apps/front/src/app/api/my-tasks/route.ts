import { createTasksRepository } from '@/lib/repositories/tasks/factory.server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const repository = await createTasksRepository();
  const result = await repository.getMyTasks();

  if (!result.ok) {
    return Response.json({ error: result.error }, { status: 400 });
  }

  return Response.json(result.data);
}
