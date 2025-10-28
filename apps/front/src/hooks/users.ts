'use client';

import { Me } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await fetch('/api/users/me');
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const data = await response.json();
      return data as Me;
    },
    staleTime: Infinity,
  });
}
