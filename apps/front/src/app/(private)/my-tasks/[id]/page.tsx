import { MyTaskDetails } from '@/components/features/tasks';
import { TaskDetailsSkeleton } from '@/components/ui';
import { Suspense } from 'react';

export default async function MyTaskDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY as string;
  const googleMapsMapId = process.env.GOOGLE_MAPS_MAP_ID as string;

  return (
    <Suspense fallback={<TaskDetailsSkeleton />}>
      <MyTaskDetails
        taskId={params.then(({ id }) => parseInt(id))}
        googleMapsApiKey={googleMapsApiKey}
        googleMapsMapId={googleMapsMapId}
      />
    </Suspense>
  );
}
