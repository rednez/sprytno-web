import 'server-only';

import { cache } from 'react';
import { createUsersRepository } from './users';

export const verifyProfileCompletion = cache(async () => {
  const userRepository = await createUsersRepository();
  const { data, ok } = await userRepository.getMe();
  if (!ok) {
    return false;
  }
  return data.isProfileCompleted;
});
