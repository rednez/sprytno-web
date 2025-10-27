'use client';

import { createUsersRepository } from '@/lib/repositories/users/factory.client';
import { Me } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const repository = createUsersRepository();
      const { data, ok, error } = await repository.getMe();

      if (!ok) {
        throw new Error(error);
      }

      return data as Me;
    },
    staleTime: Infinity,
  });
}
