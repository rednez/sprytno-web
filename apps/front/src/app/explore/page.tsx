'use client';

import { TasksList } from '@/components/features/tasks/tasks-list';
import EmptyState from '@/components/ui/empty-state';
import TasksFilters from '@/components/ui/tasks-filters';
import useCoords from '@/hooks/coords';
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
    <EmptyState>
      <div className="flex flex-col gap-2">
        <div className="text-base">
          You should allow location access to see tasks around you
        </div>
        <Button onPress={getLocation}>Enable location</Button>
      </div>
    </EmptyState>
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
