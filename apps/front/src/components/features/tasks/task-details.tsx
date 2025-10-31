'use client';

import {
  TaskDetailsSkeleton,
  TaskDistance,
  TaskRepeatingInfo,
  TaskTypeChip,
} from '@/components/ui';
import { usePublicTaskDetails } from '@/hooks/tasks';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Alert } from '@heroui/react';
import { User } from '@heroui/user';
import { use } from 'react';

export function TaskDetails(params: {
  taskId: Promise<string>;
  currentCoords: Promise<{ lat: string; lng: string }>;
}) {
  const taskId = use(params.taskId);
  const currentCoords = use(params.currentCoords);
  const { data, isPending, isError, error } = usePublicTaskDetails({
    taskId: parseInt(taskId),
    currentLat: parseFloat(currentCoords.lat),
    currentLng: parseFloat(currentCoords.lng),
  });

  if (isPending) {
    return <TaskDetailsSkeleton />;
  }

  if (isError) {
    return (
      <Alert
        title="Failed Network request"
        description={'error.message'}
        color="danger"
      />
    );
  }

  return (
    <Card className="mt-6 max-w-xl mx-auto">
      <CardHeader>
        <User
          name={data.user.publicDetails.nickname}
          avatarProps={{
            src: data.user.publicDetails.avatarUrl || '',
            name: data.user.publicDetails.nickname || undefined,
          }}
        />
      </CardHeader>

      <CardBody>
        <h4 className="text-lg font-medium">{data.title}</h4>
        <p className="mt-1 text-base">{data.description}</p>
      </CardBody>

      <CardFooter className="gap-1">
        <TaskTypeChip type={data.type} />
        <Divider
          orientation="vertical"
          className="h-4"
        />
        <TaskDistance meters={data.distanceMeters} />

        {!!data.repeatedDays.length && (
          <>
            <Divider
              orientation="vertical"
              className="h-4"
            />
            <TaskRepeatingInfo repeatedDays={data.repeatedDays} />
          </>
        )}
      </CardFooter>
    </Card>
  );
}
