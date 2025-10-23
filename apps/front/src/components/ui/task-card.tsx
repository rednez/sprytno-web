'use client';

import { Task } from '@/types';
import { Card, CardBody, Divider } from '@heroui/react';
import TaskDistance from './task-distance';
import TaskRepeatingInfo from './task-repeating-info';
import TaskTypeChip from './task-type-chip';

export default function TaskCard({
  id,
  title,
  description,
  type,
  distanceMeters,
  repeatedDays,
  onPress,
}: Task & { onPress: (taskId: number) => void }) {
  return (
    <Card
      shadow="sm"
      isPressable
      disableRipple
      onPress={() => onPress(id)}
    >
      <CardBody>
        <div className="flex flex-col gap-1">
          <div className="text-md font-medium">{title}</div>
          <div className="text-sm">{description}</div>
        </div>
        <div className="flex gap-1 mt-2 items-center">
          <TaskTypeChip type={type} />
          <Divider
            orientation="vertical"
            className="h-4"
          />
          <TaskDistance meters={distanceMeters} />

          {!!repeatedDays.length && (
            <>
              <Divider
                orientation="vertical"
                className="h-4"
              />
              <TaskRepeatingInfo repeatedDays={repeatedDays} />
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
