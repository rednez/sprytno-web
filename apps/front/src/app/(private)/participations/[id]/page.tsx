import { ParticipationDetails } from '@/components/features/participations';
import { TaskDetailsSkeleton } from '@/components/ui';
import { Suspense } from 'react';

export default async function ParticipationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY as string;
  const googleMapsMapId = process.env.GOOGLE_MAPS_MAP_ID as string;

  return (
    <Suspense fallback={<TaskDetailsSkeleton />}>
      <ParticipationDetails
        participationId={params.then((i) => i.id)}
        googleMapsApiKey={googleMapsApiKey}
        googleMapsMapId={googleMapsMapId}
      />
    </Suspense>
  );
}
