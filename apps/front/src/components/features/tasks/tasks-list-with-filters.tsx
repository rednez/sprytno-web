'use client';

import { TasksFilters } from '@/components/ui';
import { useState } from 'react';
import { TasksList } from './tasks-list';

export function TasksListWithFilters() {
  const [taskType, setTaskType] = useState<'all' | 'offers' | 'requests'>(
    'all',
  );
  const [distance, setDistance] = useState<number>(500);

  return (
    <>
      <TasksFilters
        distance={distance}
        onChangeDistance={setDistance}
        onChangeTaskType={setTaskType}
      />

      <TasksList
        distance={distance}
        type={taskType}
      />
    </>
  );
}
