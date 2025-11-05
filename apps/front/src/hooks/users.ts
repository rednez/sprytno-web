'use client';

import { Me } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await fetch('/api/users/me');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed request');
      }
      return data as Me;
    },
    staleTime: Infinity,
  });
}
