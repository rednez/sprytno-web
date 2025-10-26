'use client';

import { EmptyState, TaskCard, TaskCardSkeleton } from '@/components/ui';
import { useMyTasks } from '@/hooks/tasks';
import { useRouter } from 'next/navigation';

export function MyTasksList() {
  const { data, isPending, isError, error } = useMyTasks();
  const router = useRouter();

  function redirectToMyTaskDetails(id: number) {
    router.push(`my-tasks/${id}`);
  }

  if (isPending) {
    return <TaskCardSkeleton />;
  }

  if (isError) {
    return (
      <EmptyState>
        <div>Failed to load your tasks: {error.message}</div>
      </EmptyState>
    );
  }

  if (!data.length) {
    return (
      <EmptyState>
        <div>You don't have any tasks yet. Create one to get started!</div>
      </EmptyState>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      {data
        .map((i) => ({
          id: i.id,
          title: i.title,
          description: i.description,
          type: i.type,
          repeatedDays: i.repeatedDays,
        }))
        .map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            onPress={redirectToMyTaskDetails}
          />
        ))}
    </div>
  );
}
