'use client';

import { LocationAlert, TaskCard, TaskCardSkeleton } from '@/components/ui';
import useCoords from '@/hooks/coords';
import { useTasks } from '@/hooks/tasks';
import { Alert, Button, Spinner } from '@heroui/react';
import { div } from 'framer-motion/client';
import { useRouter } from 'next/navigation';

export function TasksList({
  type,
  distance,
}: {
  type: 'offers' | 'requests' | 'all';
  distance: number;
}) {
  const {
    coords,
    isProgress: coordsLoading,
    isError: coordsError,
    getLocation,
  } = useCoords();

  const {
    data: tasks,
    isPending: tasksPending,
    error: tasksErrors,
    isPlaceholderData,
    refetch,
  } = useTasks({
    lat: coords?.lat,
    lng: coords?.lng,
    type,
    distance,
  });

  const router = useRouter();

  const toTaskDetails = (id: number) => {
    router.push(`explore/${id}`);
  };

  if (tasksPending || coordsLoading) {
    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        <TaskCardSkeleton />
      </div>
    );
  }

  if (!coords || coordsError) {
    return <LocationAlert onGetLocation={getLocation} />;
  }

  if (tasksErrors) {
    return (
      <Alert
        title="Failed request"
        description={tasksErrors.message}
        variant="faded"
        color="danger"
        endContent={
          <Button
            variant="flat"
            color="danger"
            onPress={() => refetch()}
          >
            Try Again
          </Button>
        }
      />
    );
  }

  if (!tasks.length) {
    return (
      <Alert
        title="No tasks found"
        variant="faded"
      />
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      {tasks
        .map((i) => ({
          id: i.id,
          title: i.title,
          description: i.description,
          type: i.type,
          repeatedDays: i.repeatedDays,
          distanceMeters: i.distanceMeters,
        }))
        .map((task) => (
          <TaskCard
            onPress={toTaskDetails}
            key={task.id}
            {...task}
          />
        ))}

      {isPlaceholderData && (
        <Spinner
          classNames={{ label: 'text-foreground mt-4' }}
          variant="dots"
        />
      )}
    </div>
  );
}
