'use client';

import { ParticipationStatus, TaskDay, TaskType } from '@/types';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Divider } from '@heroui/divider';
import TaskRepeatingInfo from './task-repeating-info';
import { TaskTypeChip } from './task-type-chip';
import { useRouter } from 'next/navigation';
import { ParticipationStatusChip } from './participation-status-chip';

export function ParticipationCard({
  id,
  status,
  task,
}: {
  id: number;
  status: ParticipationStatus;
  task: {
    title: string;
    description: string | null;
    type: TaskType;
    repeatedDays: TaskDay[];
  };
}) {
  const router = useRouter();

  return (
    <Card
      shadow="sm"
      isPressable
      disableRipple
      className="min-h-32"
      onPress={() => router.push(`/participations/${id}`)}
    >
      <CardBody>
        <div className="text-md font-medium line-clamp-1">{task.title}</div>
        <div className="text-sm line-clamp-1 mt-2">{task.description}</div>
      </CardBody>
      <CardFooter className="gap-2">
        <ParticipationStatusChip status={status} />

        <Divider
          orientation="vertical"
          className="h-4"
        />

        <TaskTypeChip type={task.type} />

        <Divider
          orientation="vertical"
          className="h-4"
        />
        <TaskRepeatingInfo repeatedDays={task.repeatedDays} />
      </CardFooter>
    </Card>
  );
}
