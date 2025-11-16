'use client';

import {
  acceptParticipation,
  declineParticipation,
  sendParticipationMessage,
  sendParticipationRequest,
} from '@/actions/participations';
import {
  MyTask,
  MyTaskDetails,
  ParticipationMessage,
  Task,
  TaskDetails,
  TaskParticipation,
} from '@/types';
import { addToast } from '@heroui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed request');
      }
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
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed request');
      }
      return data as TaskDetails;
    },
    refetchInterval: 60 * 1000,
  });
}

export function useMyTasks() {
  return useQuery({
    queryKey: ['myTasks'],
    queryFn: async () => {
      const response = await fetch(`/api/my-tasks`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed request');
      }
      return data as MyTask[];
    },
  });
}

export function useMyTaskDetails(taskId: number) {
  return useQuery({
    queryKey: ['myTaskDetails', taskId],
    queryFn: async () => {
      const response = await fetch(`/api/my-tasks/${taskId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed request');
      }
      return data as MyTaskDetails;
    },
  });
}

export function useSendTaskParticipationRequest(taskId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (message?: string) => {
      return sendParticipationRequest(taskId, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['publicTaskDetails', taskId],
      });
    },
  });
}

export function useMyTaskParticipations(taskId: number) {
  return useQuery({
    queryKey: ['myTaskParticipations', taskId],
    queryFn: async () => {
      const response = await fetch(`/api/my-tasks/${taskId}/participations`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed request');
      }
      return data as TaskParticipation[];
    },
  });
}

export function useMyTaskParticipationMessages(
  taskId: number,
  participationId: number,
) {
  return useQuery({
    queryKey: ['myTaskParticipationMessages', participationId],
    queryFn: async () => {
      const response = await fetch(
        `/api/my-tasks/${taskId}/participations/${participationId}/messages`,
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed request');
      }
      return data as ParticipationMessage[];
    },
  });
}

export function useAcceptTaskParticipation(
  taskId: number,
  participationId: number,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return acceptParticipation(participationId);
    },
    onSuccess: (data) => {
      if (data.error) {
        addToast({
          title: 'Failed operation',
          description: data.error.message,
          color: 'warning',
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ['myTaskParticipations', taskId],
        });
      }
    },
  });
}

export function useDeclineTaskParticipation(
  taskId: number,
  participationId: number,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return declineParticipation(participationId);
    },
    onSuccess: (data) => {
      if (data.error) {
        addToast({
          title: 'Failed operation',
          description: data.error.message,
          color: 'warning',
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ['myTaskParticipations', taskId],
        });
      }
    },
  });
}

export function useSendTaskParticipationMessage(participationId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (message: string) => {
      return sendParticipationMessage({ participationId, message });
    },
    onSuccess: (data) => {
      if (data.error) {
        addToast({
          title: 'Failed operation',
          description: data.error.message,
          color: 'warning',
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ['myTaskParticipationMessages', participationId],
        });
      }
    },
  });
}
