'use server';

import { createUsersRepository } from '@/lib/repositories/users';

export async function completeProfile(params: {
  nickname: string;
  avatarUrl: string;
}) {
  const repository = await createUsersRepository();
  const { error } = await repository.completeProfile(params);

  return error ? { errors: error.toObject() } : { errors: null };
}
