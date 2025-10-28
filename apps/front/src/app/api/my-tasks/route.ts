import { createTasksRepository } from '@/lib/repositories/tasks';

export async function GET() {
  const repository = await createTasksRepository();
  const { data, ok, error } = await repository.getMyTasks();

  if (!ok) {
    return Response.json({ error }, { status: 400 });
  }

  return Response.json(data);
}
