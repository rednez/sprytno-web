import { Skeleton } from '@heroui/skeleton';

export function TaskParticipationsSkeleton() {
  return (
    <div>
      <Skeleton className="w-18 h-3 rounded-sm ml-1 mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-11 w-11 rounded-full" />
        <Skeleton className="h-11 w-11 rounded-full" />
      </div>
    </div>
  );
}
