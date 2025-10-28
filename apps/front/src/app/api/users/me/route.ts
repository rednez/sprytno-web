import { createUsersRepository } from '@/lib/repositories/users';

export async function GET() {
  const repository = await createUsersRepository();
  const { ok, error, data } = await repository.getMe();

  if (!ok) {
    return Response.json({ error }, { status: 400 });
  }

  return Response.json(data);
}
