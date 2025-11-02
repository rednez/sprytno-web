import { TaskDay, TaskType } from '@/types';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
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
  repeatedDays: TaskDay[];
  distanceMeters?: number;
  onPress: (taskId: number) => void;
}) {
  return (
    <Card
      shadow="sm"
      isPressable
      disableRipple
      className="min-h-32"
      onPress={() => onPress(id)}
    >
      <CardBody>
        <div className="text-md font-medium line-clamp-1">{title}</div>
        <div className="text-sm line-clamp-1 mt-2">{description}</div>
      </CardBody>
      <CardFooter className="gap-2">
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

        <Divider
          orientation="vertical"
          className="h-4"
        />
        <TaskRepeatingInfo repeatedDays={repeatedDays} />
      </CardFooter>
    </Card>
  );
}
