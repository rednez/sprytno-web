import { createParticipationsRepository } from '@/lib/repositories/participations';
import { ErrorParser } from '@/lib/utils/errors';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const repository = await createParticipationsRepository();
  const { error, data, ok } = await repository.getMyTaskParticipationMessages(
    parseInt(id),
  );

  if (!ok) {
    return Response.json(ErrorParser.fromError(error).parse(), {
      status: 400,
    });
  }

  return Response.json(data);
}
