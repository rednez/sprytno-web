'use client';

import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';

export default function useTasks({
  lat,
  lng,
  type,
  distance,
}: {
  lat: number;
  lng: number;
  type: 'offers' | 'requests' | 'all';
  distance: number;
}) {
  const debounce = useDebounce(distance, 500);

  return useQuery({
    queryKey: ['tasks', lat, lng, type, debounce],
    queryFn: async () => {
      const queryString = new URLSearchParams({
        lat: String(lat),
        lng: String(lng),
        type,
        distance: String(distance),
      }).toString();

      const data = await fetch(`/api/tasks?${queryString}`);

      const result = await data.json();

      return result as Array<{
        id: number;
        user_id: string;
        type: 'offer' | 'request';
        title: string;
        description: string;
        repeated_days: string[] | null;
        is_me: boolean;
        distance_meters: number;
      }>;
    },
  });
}
