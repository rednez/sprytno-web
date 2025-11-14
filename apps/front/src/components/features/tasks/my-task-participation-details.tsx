'use client';

import { useMyTaskParticipationMessages } from '@/hooks/tasks';
import { TaskParticipation } from '@/types';
import { fullDate } from '@/utils/formatters/full-date';
import { Alert, Button, Input, User } from '@heroui/react';
import { MdClose, MdDone, MdSend } from 'react-icons/md';

export function MyTaskParticipationDetails({
  taskId,
  participation,
}: {
  taskId: number;
  participation: TaskParticipation;
}) {
  const { data, error, isError, isPending } = useMyTaskParticipationMessages(
    taskId,
    participation.id,
  );

  if (isPending) {
    return <div>Loading messages...</div>;
  }

  if (isError) {
    return (
      <Alert
        title="Fail to load messages"
        description={error.message}
        color="danger"
      />
    );
  }

  return (
    <div className="mt-8">
      <div className="flex gap-6">
        <User
          avatarProps={{
            src: participation.user.avatarUrl || undefined,
          }}
          name={participation.user.nickname}
          className="self-start"
        />
        <div className="flex items-center gap-2 justify-end">
          {participation.status === 'pending' && (
            <Button
              variant="flat"
              color="success"
              isIconOnly
              size="sm"
              className="rounded-full"
            >
              <MdDone />
            </Button>
          )}
          <Button
            variant="flat"
            color="danger"
            isIconOnly
            size="sm"
            className="rounded-full"
          >
            <MdClose />
          </Button>
        </div>
      </div>

      <Input
        className="mt-3"
        label="Leave a message"
        maxLength={100}
        size="sm"
        endContent={
          <Button
            variant="flat"
            isIconOnly
            size="sm"
          >
            <MdSend />
          </Button>
        }
      />

      {data.length > 0 && (
        <div className="mt-4">
          <div className="text-sm text-foreground-500">Recent messages</div>

          <div className="flex flex-col gap-2 mt-2">
            {data.map((m) => (
              <div
                key={m.id}
                className={`w-fit rounded-lg py-1 px-3 ${m.sentByMe ? 'bg-primary-50 mr-10' : 'bg-secondary-50 self-end ml-10'}`}
              >
                <div className="flex gap-4 justify-between items-center text-sm text-foreground-500 mb-1">
                  <div>{m.sentByMe ? 'Me' : m.sender.nickname}</div>
                  <div className="text-[12px]">{fullDate(m.createdAt)}</div>
                </div>
                <div className="text-sm text-foreground-700 dark:text-foreground-600">
                  {m.message}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
