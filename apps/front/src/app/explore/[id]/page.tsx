import TaskDetails from '@/components/features/tasks/task-details';
import { TaskDetailsSkeleton } from '@/components/ui/task-details-skeleton';
import { Suspense } from 'react';

export default async function TaskDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  return (
    <Suspense fallback={<TaskDetailsSkeleton />}>
      <TaskDetails
        taskId={params.then((i) => i.id)}
        currentCoords={searchParams.then((i) => ({
          lat: i.currentLat || '',
          lng: i.currentLng || '',
        }))}
      />
    </Suspense>
  );
}
