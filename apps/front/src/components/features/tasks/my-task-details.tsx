'use client';

import {
  EmptyState,
  TaskDetailsSkeleton,
  TaskRepeatingInfo,
  TaskTypeChip,
} from '@/components/ui';
import { useMyTaskDetails } from '@/hooks/tasks';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { User } from '@heroui/user';
import { use } from 'react';

export function MyTaskDetails(params: { taskId: Promise<number> }) {
  const taskId = use(params.taskId);
  const { data, isPending, isError, error } = useMyTaskDetails(taskId);

  if (isPending) {
    return <TaskDetailsSkeleton />;
  }

  if (isError) {
    return (
      <EmptyState>
        <div>
          <p>Failed Network request: </p>
          <p>{error.message}</p>
        </div>
      </EmptyState>
    );
  }

  return (
    <Card className="mt-6 max-w-xl mx-auto">
      <CardHeader>
        <User
          name={data.user.publicDetails.nickname}
          avatarProps={{
            src: data.user.publicDetails.avatarUrl || '',
            name: data.user.publicDetails.nickname,
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
