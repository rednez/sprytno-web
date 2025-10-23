'use client';

import EmptyState from '@/components/ui/empty-state';
import TasksFilters from '@/components/ui/tasks-filters';
import useCoords from '@/hooks/coords';
import { Button } from '@heroui/react';
import { useState } from 'react';
import TasksList from '../components/tasks-list';

export default function NearbyTasks() {
  const { coords, getLocation, isProgress, isError } = useCoords();
  const [taskType, setTaskType] = useState<'all' | 'offers' | 'requests'>(
    'all',
  );
  const [distance, setDistance] = useState<number>(500);

  const nearbyTasks = () =>
    coords && !isError ? (
      <TasksList
        lat={coords.lat}
        lng={coords.lng}
        type={taskType}
        distance={distance}
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
