'use client';

import { markTaskAsInterested } from '@/actions/tasks';
import { TaskInterestStatus as Status } from '@/types';
import { Alert } from '@heroui/alert';
import { Button } from '@heroui/react';

export function TaskInterestStatus({
  taskId,
  status,
  updatedAt,
}: {
  taskId: number;
  status?: Status;
  updatedAt?: Date;
}) {
  if (status) {
    if (status === 'pending') {
      return (
        <Alert
          title="Task's interest status"
          description={`Pending at TODO`}
          variant="faded"
          className="mt-6"
          color="primary"
          endContent={
            <Button
              variant="flat"
              color="primary"
              onPress={() => markTaskAsInterested(taskId)}
            >
              Send
            </Button>
          }
        />
      );
    }
  }

  return (
    <Alert
      title="Task's interest status"
      description="If this task is interested for you then send a request to the task owner."
      variant="faded"
      className="mt-6"
      endContent={
        <Button
          variant="flat"
          onPress={() => markTaskAsInterested(taskId)}
        >
          Send
        </Button>
      }
    />
  );
}
