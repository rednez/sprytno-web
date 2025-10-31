'use client';

import { EmptyState, TaskCardSkeleton } from '@/components/ui';
import { useMyTasks } from '@/hooks/tasks';
import { useMe } from '@/hooks/users';
import { Button } from '@heroui/button';
import { useRouter } from 'next/navigation';

export function MyTasksList() {
  const { data: me } = useMe();
  const {
    data: tasks,
    isPending: tasksLoading,
    isError: isTasksError,
    error: tasksError,
  } = useMyTasks();

  const router = useRouter();

  function redirectToProfile() {
    router.push('/complete-profile');
  }

  if (tasksLoading) {
    return <TaskCardSkeleton />;
  }

  if (isTasksError) {
    return (
      <EmptyState>
        <p>Error loading my tasks</p>
        <p>{tasksError.message}</p>
      </EmptyState>
    );
  }

  if (!tasks.length) {
    return (
      <EmptyState>
        <p className="mb-4">You have no tasks yet.</p>
        {me?.isProfileCompleted ? (
          <Button
            color="primary"
            variant="solid"
          >
            Create task
          </Button>
        ) : (
          <>
            <p className="mb-4">
              To create a new task you should complete your profile
            </p>
            <Button
              color="warning"
              variant="solid"
              onPress={redirectToProfile}
            >
              Complete profile
            </Button>
          </>
        )}
      </EmptyState>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      {tasks.map((task) => (
        <div>
          <p>title {task.title}</p>
          <p>email {me?.privateDetails.email}</p>
        </div>
      ))}
    </div>
  );
}
