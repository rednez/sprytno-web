'use client';

import { TasksList } from '@/components/features/tasks';
import { TasksFilters } from '@/components/ui';
import useCoords from '@/hooks/coords';
import { Alert } from '@heroui/alert';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ExploreTasks() {
  const { coords, getLocation, isProgress, isError } = useCoords();
  const [taskType, setTaskType] = useState<'all' | 'offers' | 'requests'>(
    'all',
  );
  const [distance, setDistance] = useState<number>(500);

  const router = useRouter();

  const handleTaskPress = (id: number) => {
    if (!coords) {
      return;
    }

    const params = new URLSearchParams({
      currentLat: String(coords.lat),
      currentLng: String(coords.lng),
    });

    router.push(`explore/${id}?${params.toString()}`);
  };

  const nearbyTasks = () =>
    coords && !isError ? (
      <TasksList
        lat={coords.lat}
        lng={coords.lng}
        type={taskType}
        distance={distance}
        onTaskPress={handleTaskPress}
      />
    ) : (
      emptyState()
    );

  const emptyState = () => (
    <Alert
      title="Enable Location"
      description="You should allow location access to see tasks around you"
      variant="faded"
      color="warning"
      endContent={
        <Button
          variant="flat"
          color="warning"
          onPress={getLocation}
        >
          Enable
        </Button>
      }
    />
  );

  return (
    <div className="mt-3 mb-2">
      <TasksFilters
        distance={distance}
        onChangeDistance={setDistance}
        onChangeTaskType={setTaskType}
      />

      {isProgress ? null : nearbyTasks()}
    </div>
  );
}
