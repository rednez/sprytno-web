'use client';

import {
  TaskDetailsSkeleton,
  TaskMap,
  TaskRepeatingInfo,
  TaskTypeChip,
} from '@/components/ui';
import { useMyTaskDetails } from '@/hooks/tasks';
import { Card, CardBody } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Alert } from '@heroui/react';
import { use } from 'react';
import { MyTaskParticipations } from './my-task-participations';

export function MyTaskDetails(params: {
  taskId: Promise<number>;
  googleMapsApiKey: string;
  googleMapsMapId: string;
}) {
  const taskId = use(params.taskId);
  const { data, isPending, isError, error } = useMyTaskDetails(taskId);

  if (isPending) {
    return <TaskDetailsSkeleton />;
  }

  if (isError) {
    return (
      <Alert
        title="Failed request"
        description={error.message}
        color="danger"
      />
    );
  }

  return (
    <Card className="my-6 flex flex-col gap-3 max-w-xl mx-auto">
      <CardBody>
        <h4 className="text-lg font-medium">{data.title}</h4>
        <p className="mt-1 text-base">{data.description}</p>

        <div className="w-full h-80 rounded-2xl overflow-hidden mt-4">
          <TaskMap
            apiKey={params.googleMapsApiKey}
            googleMapsMapId={params.googleMapsMapId}
            initPosition={{ lat: data.lat, lng: data.lng }}
          />
        </div>

        <div className="flex gap-2 mt-5">
          <TaskTypeChip type={data.type} />

          <Divider
            orientation="vertical"
            className="h-4"
          />
          <TaskRepeatingInfo
            repeatedDays={data.repeatedDays}
            isFull
          />
        </div>

        <MyTaskParticipations taskId={taskId} />
      </CardBody>
    </Card>
  );
}
