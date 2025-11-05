'use client';

import { TaskCard } from '@/components/ui';
import { useTasks } from '@/hooks/tasks';
import { Alert, Button, Spinner } from '@heroui/react';

export function TasksList({
  lat,
  lng,
  type,
  distance,
  onTaskPress,
}: {
  lat: number;
  lng: number;
  type: 'offers' | 'requests' | 'all';
  distance: number;
  onTaskPress: (taskId: number) => void;
}) {
  const { data, isPending, error, refetch } = useTasks({
    lat,
    lng,
    type,
    distance,
  });

  if (error) {
    return (
      <Alert
        title="Failed request"
        description={error.message}
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

  const loadedData = () =>
    data?.length ? (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {data
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
              onPress={onTaskPress}
              key={task.id}
              {...task}
            />
          ))}
      </div>
    ) : (
      <Alert
        title="No tasks found"
        variant="faded"
      />
    );

  const loader = () => (
    <div className="text-center mt-4">
      <Spinner />
    </div>
  );

  return isPending ? loader() : loadedData();
}
