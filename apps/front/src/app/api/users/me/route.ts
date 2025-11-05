import { createUsersRepository } from '@/lib/repositories/users';
import { ErrorParser } from '@/lib/utils/errors';

export async function GET() {
  const repository = await createUsersRepository();
  const { ok, error, data } = await repository.getMe();

  if (!ok) {
    return Response.json(ErrorParser.fromError(error).parse(), { status: 400 });
  }

  return Response.json(data);
}
