'use client';

import {
  TaskDetailsSkeleton,
  TaskDistance,
  TaskMap,
  TaskRepeatingInfo,
  TaskTypeChip,
} from '@/components/ui';
import useCoords from '@/hooks/coords';
import { useParticipationDetails } from '@/hooks/participations';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Alert } from '@heroui/react';
import { User } from '@heroui/user';
import { use } from 'react';
import { TaskParticipationStatus } from '../tasks/task-participation-status';
import { ParticipationMessages } from './participation-messages';

export function ParticipationDetails(params: {
  participationId: Promise<string>;
  googleMapsApiKey: string;
  googleMapsMapId: string;
}) {
  const participationId = use(params.participationId);
  const { coords } = useCoords();

  const { data, isPending, isError } = useParticipationDetails({
    participationId: parseInt(participationId),
    currentLat: coords?.lat,
    currentLng: coords?.lng,
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
          name={data.task.user.nickname}
          avatarProps={{
            src: data.task.user.avatarUrl || '',
            name: data.task.user.nickname || undefined,
          }}
        />
      </CardHeader>

      <CardBody>
        <h4 className="text-lg font-medium">{data.task.title}</h4>
        <p className="mt-1 text-base">{data.task.description}</p>

        <div className="w-full h-80 rounded-2xl overflow-hidden mt-4">
          <TaskMap
            apiKey={params.googleMapsApiKey}
            googleMapsMapId={params.googleMapsMapId}
            initPosition={{ lat: data.task.lat, lng: data.task.lng }}
          />
        </div>

        <div className="flex flex-row gap-2 items-center mt-5">
          <TaskTypeChip type={data.task.type} />
          <Divider
            orientation="vertical"
            className="h-4"
          />
          <TaskDistance meters={data.task.distanceMeters} />

          <Divider
            orientation="vertical"
            className="h-4"
          />
          <TaskRepeatingInfo
            repeatedDays={data.task.repeatedDays}
            isFull
          />
        </div>

        <TaskParticipationStatus
          taskId={data.id}
          status={data.status}
          updatedAt={data.updatedAt}
        />

        <ParticipationMessages
          participationId={data.id}
          readOnly={data.status !== 'accepted'}
        />
      </CardBody>
    </Card>
  );
}
