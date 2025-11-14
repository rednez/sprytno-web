import { createTasksRepository } from '@/lib/repositories/tasks';
import { ErrorParser } from '@/lib/utils/errors';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const repository = await createTasksRepository();
  const { error, data, ok } = await repository.getMyTaskParticipations(
    parseInt(id),
  );

  if (!ok) {
    return Response.json(ErrorParser.fromError(error).parse(), {
      status: 400,
    });
  }

  return Response.json(data);
}
