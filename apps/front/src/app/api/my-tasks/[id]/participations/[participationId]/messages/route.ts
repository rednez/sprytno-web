import { createTasksRepository } from '@/lib/repositories/tasks';
import { ErrorParser } from '@/lib/utils/errors';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ participationId: string }> },
) {
  const { participationId } = await params;
  const repository = await createTasksRepository();
  const { error, data, ok } = await repository.getMyTaskParticipationMessages(
    parseInt(participationId),
  );

  if (!ok) {
    return Response.json(ErrorParser.fromError(error).parse(), {
      status: 400,
    });
  }

  return Response.json(data);
}
