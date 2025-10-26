import { TaskType } from '@/types';
import { Card, CardBody } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { TaskDistance } from './task-distance';
import TaskRepeatingInfo from './task-repeating-info';
import { TaskTypeChip } from './task-type-chip';

export function TaskCard({
  id,
  title,
  description,
  type,
  distanceMeters,
  repeatedDays,
  onPress,
}: {
  id: number;
  title: string;
  description: string | null;
  type: TaskType;
  repeatedDays: string[];
  distanceMeters?: number;
  onPress: (taskId: number) => void;
}) {
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

          {distanceMeters && (
            <>
              <Divider
                orientation="vertical"
                className="h-4"
              />
              <TaskDistance meters={distanceMeters} />
            </>
          )}

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
