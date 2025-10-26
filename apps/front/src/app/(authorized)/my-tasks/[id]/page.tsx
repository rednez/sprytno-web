import { MyTaskDetails } from '@/components/features/tasks';
import { TaskDetailsSkeleton } from '@/components/ui';
import { Suspense } from 'react';

export default async function MyTaskDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<TaskDetailsSkeleton />}>
      <MyTaskDetails taskId={params.then(({ id }) => parseInt(id))} />
    </Suspense>
  );
}
