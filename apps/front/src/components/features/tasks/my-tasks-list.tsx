'use client';

import { TaskCard, TaskCardSkeleton } from '@/components/ui';
import { useMyTasks } from '@/hooks/tasks';
import { useMe } from '@/hooks/users';
import { Button } from '@heroui/button';
import { Alert } from '@heroui/react';
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

  function toCompleteProfile() {
    router.push('/complete-profile');
  }

  function toCreateMyTask() {
    router.push('/my-tasks/create');
  }

  function toTaskDetails(id: number) {
    router.push(`/my-tasks/${id}`);
  }

  if (tasksLoading) {
    return <TaskCardSkeleton />;
  }

  if (isTasksError) {
    return (
      <Alert
        title="Error loading my tasks"
        description={tasksError.message}
        color="danger"
      />
    );
  }

  if (!tasks.length) {
    return me?.isProfileCompleted ? (
      <Alert
        title="You have no tasks yet"
        description="To create one click the button"
        variant="faded"
        endContent={
          <Button
            variant="flat"
            onPress={toCreateMyTask}
          >
            Create task
          </Button>
        }
      />
    ) : (
      <Alert
        color="warning"
        title="You have no tasks yet"
        description="To create a new task you should complete your profile"
        variant="faded"
        endContent={
          <Button
            color="warning"
            variant="flat"
            onPress={toCompleteProfile}
          >
            Complete profile
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      {tasks.map(({ id, title, description, repeatedDays, type }) => (
        <TaskCard
          key={id}
          {...{ id, title, description, repeatedDays, type }}
          onPress={toTaskDetails}
        />
      ))}
    </div>
  );
}
