'use client';

import { ParticipationDetails, ParticipationMessage } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useParticipationDetails({
  participationId,
  currentLat,
  currentLng,
}: {
  participationId: number;
  currentLat?: number;
  currentLng?: number;
}) {
  const hasCoords = !!currentLat && !!currentLng;

  return useQuery({
    queryKey: ['participationDetails', participationId, currentLat, currentLng],
    queryFn: async () => {
      const queryString = new URLSearchParams({
        currentLat: String(currentLat),
        currentLng: String(currentLng),
      }).toString();
      const response = await fetch(
        `/api/participations/${participationId}?${queryString}`,
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed request');
      }
      return data as ParticipationDetails;
    },
    enabled: hasCoords,
    refetchInterval: 60 * 1000,
  });
}

export function useParticipationMessages(participationId: number) {
  return useQuery({
    queryKey: ['myTaskParticipationMessages', participationId],
    queryFn: async () => {
      const response = await fetch(
        `/api/participations/${participationId}/messages`,
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed request');
      }
      return data as ParticipationMessage[];
    },
  });
}
