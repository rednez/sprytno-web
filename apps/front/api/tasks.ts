'use client';

import { createClient } from '@/utils/supabase/client';
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
  const debouncedDistance = useDebounce(distance, 500);

  return useQuery({
    queryKey: ['tasks', lat, lng, type, debouncedDistance],
    queryFn: async () => {
      const supabase = createClient();

      let rpcQuery = supabase.rpc('get_tasks', {
        user_lat: lat,
        user_lng: lng,
        distance_meters: distance,
      });

      if (type === 'offers') {
        rpcQuery = rpcQuery.eq('type', 'offer');
      } else if (type === 'requests') {
        rpcQuery = rpcQuery.eq('type', 'request');
      }

      const { data: tasks } = await rpcQuery;

      return tasks as {
        id: number;
        user_id: string;
        type: 'offer' | 'request';
        title: string;
        description: string;
        repeated_days: string[] | null;
        is_me: boolean;
        distance_meters: number;
      }[];
    },
  });
}
