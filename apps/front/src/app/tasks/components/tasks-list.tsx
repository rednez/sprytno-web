'use client';

import EmptyState from '@/components/ui/empty-state';
import TaskCard from '@/components/ui/task-card';
import useTasks from '@/hooks/tasks';
import { Spinner } from '@heroui/react';

export default function TasksList({
  lat,
  lng,
  type,
  distance,
}: {
  lat: number;
  lng: number;
  type: 'offers' | 'requests' | 'all';
  distance: number;
}) {
  const { data, isPending } = useTasks({ lat, lng, type, distance });

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
              key={task.id}
              {...task}
            />
          ))}
      </div>
    ) : (
      emptyState()
    );

  const emptyState = () => (
    <EmptyState>
      <div className="text-base">No tasks found</div>
    </EmptyState>
  );

  const loader = () => (
    <div className="text-center mt-4">
      <Spinner />
    </div>
  );

  return isPending ? loader() : loadedData();
}
