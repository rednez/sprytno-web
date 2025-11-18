import ParticipationsList from '@/components/features/participations/participations-list';
import { TaskCardSkeleton } from '@/components/ui';
import { Suspense } from 'react';

export default function Participations() {
  return (
    <div className="mt-3 mb-2">
      <Suspense fallback={<TaskCardSkeleton />}>
        <ParticipationsList />
      </Suspense>
    </div>
  );
}
