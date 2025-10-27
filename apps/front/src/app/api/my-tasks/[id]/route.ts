import { createTasksRepository } from '@/lib/repositories/tasks';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const repository = await createTasksRepository();
  const result = await repository.getMyTaskDetails(parseInt(id));

  if (!result.ok) {
    return Response.json({ error: result.error }, { status: 400 });
  }

  return Response.json(result.data);
}
