import { createTasksRepository } from '@/lib/repositories/tasks';
import { ErrorParser } from '@/lib/utils/errors';

export async function GET() {
  const repository = await createTasksRepository();
  const { data, ok, error } = await repository.getMyTasks();

  if (!ok) {
    return Response.json(ErrorParser.fromError(error).parse(), { status: 400 });
  }

  return Response.json(data);
}
