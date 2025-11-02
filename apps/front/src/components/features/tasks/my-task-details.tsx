'use client';

import {
  TaskDetailsSkeleton,
  TaskMap,
  TaskRepeatingInfo,
  TaskTypeChip,
} from '@/components/ui';
import { useMyTaskDetails } from '@/hooks/tasks';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Alert } from '@heroui/react';
import { use } from 'react';

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
    <Card className="mt-6 max-w-xl mx-auto">
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
      </CardBody>

      <CardFooter className="gap-2">
        <TaskTypeChip type={data.type} />

        {!!data.repeatedDays.length && (
          <>
            <Divider
              orientation="vertical"
              className="h-4"
            />
            <TaskRepeatingInfo
              repeatedDays={data.repeatedDays}
              isFull
            />
          </>
        )}
      </CardFooter>
    </Card>
  );
}
