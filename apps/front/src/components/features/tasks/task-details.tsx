'use client';

import {
  TaskDetailsSkeleton,
  TaskDistance,
  TaskMap,
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
  googleMapsApiKey: string;
  googleMapsMapId: string;
}) {
  const taskId = use(params.taskId);
  const currentCoords = use(params.currentCoords);
  const { data, isPending, isError } = usePublicTaskDetails({
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
