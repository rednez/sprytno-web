'use client';

import {
  LocationAlert,
  TaskDetailsSkeleton,
  TaskDistance,
  TaskMap,
  TaskRepeatingInfo,
  TaskTypeChip,
} from '@/components/ui';
import { usePublicTaskDetails } from '@/hooks/tasks';
import { useMe } from '@/hooks/users';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Alert, Button } from '@heroui/react';
import { User } from '@heroui/user';
import { use } from 'react';
import { TaskParticipationStatus } from './task-participation-status';
import { useRouter } from 'next/navigation';
import useCoords from '@/hooks/coords';

export function TaskDetails(params: {
  taskId: Promise<string>;
  googleMapsApiKey: string;
  googleMapsMapId: string;
}) {
  const taskId = use(params.taskId);
  const { coords } = useCoords();

  const { data, isPending, isError } = usePublicTaskDetails({
    taskId: parseInt(taskId),
    currentLat: coords?.lat,
    currentLng: coords?.lng,
  });
  const { data: me } = useMe();
  const router = useRouter();

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

  function toCompleteProfile() {
    router.push('/complete-profile');
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

        <div className="flex flex-row gap-2 items-center mt-5">
          <TaskTypeChip type={data.type} />
          <Divider
            orientation="vertical"
            className="h-4"
          />
          <TaskDistance meters={data.distanceMeters} />

          <Divider
            orientation="vertical"
            className="h-4"
          />
          <TaskRepeatingInfo
            repeatedDays={data.repeatedDays}
            isFull
          />
        </div>

        {me?.isProfileCompleted ? (
          <TaskParticipationStatus
            taskId={parseInt(taskId)}
            status={data.participation?.status}
            updatedAt={data.participation?.updatedAt}
          />
        ) : (
          <Alert
            color="warning"
            title="Your profile is incomplete"
            description="To participate in tasks, please complete your profile."
            variant="faded"
            className="mt-4"
            endContent={
              <Button
                color="warning"
                variant="flat"
                onPress={toCompleteProfile}
              >
                Complete profile
              </Button>
            }
          />
        )}
      </CardBody>
    </Card>
  );
}
