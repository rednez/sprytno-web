'use client';

import { TasksList } from '@/components/features/tasks';
import { LocationAlert, TasksFilters } from '@/components/ui';
import useCoords from '@/hooks/coords';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ExploreTasks() {
  const { coords, isProgress, isError, getLocation } = useCoords();
  const [taskType, setTaskType] = useState<'all' | 'offers' | 'requests'>(
    'all',
  );
  const [distance, setDistance] = useState<number>(500);

  const router = useRouter();

  const handleTaskPress = (id: number) => {
    router.push(`explore/${id}`);
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
      <LocationAlert onGetLocation={getLocation} />
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
