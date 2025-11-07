import { TaskDetails } from '@/components/features/tasks';
import { TaskDetailsSkeleton } from '@/components/ui';
import { Suspense } from 'react';

export default async function TaskDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY as string;
  const googleMapsMapId = process.env.GOOGLE_MAPS_MAP_ID as string;

  return (
    <Suspense fallback={<TaskDetailsSkeleton />}>
      <TaskDetails
        taskId={params.then((i) => i.id)}
        currentCoords={searchParams.then((i) => ({
          lat: i.currentLat || '',
          lng: i.currentLng || '',
        }))}
        googleMapsApiKey={googleMapsApiKey}
        googleMapsMapId={googleMapsMapId}
      />
    </Suspense>
  );
}
