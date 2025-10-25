'use client';

import { MyTask, Task, TaskDetails } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';

export function useTasks({
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

      const response = await fetch(`/api/tasks?${queryString}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data as Task[];
    },
  });
}

export function usePublicTaskDetails({
  taskId,
  currentLat,
  currentLng,
}: {
  taskId: number;
  currentLat: number;
  currentLng: number;
}) {
  return useQuery({
    queryKey: ['publicTaskDetails', taskId, currentLat, currentLng],
    queryFn: async () => {
      const queryString = new URLSearchParams({
        currentLat: String(currentLat),
        currentLng: String(currentLng),
      }).toString();
      const response = await fetch(`/api/tasks/${taskId}?${queryString}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data as TaskDetails;
    },
  });
}

export function useMyTasks() {
  return useQuery({
    queryKey: ['myTasks'],
    queryFn: async () => {
      const response = await fetch('/api/my-tasks');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data as MyTask[];
    },
  });
}
