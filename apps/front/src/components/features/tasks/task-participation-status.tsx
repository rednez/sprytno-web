'use client';

import { useSendTaskParticipationRequest } from '@/hooks/tasks';
import { ParticipationStatus as Status } from '@/types';
import { fullDate } from '@/utils/formatters/full-date';
import { Alert } from '@heroui/alert';
import { Button, Form, Input } from '@heroui/react';
import { useState } from 'react';
import { MdSend } from 'react-icons/md';
import { MdInfoOutline } from 'react-icons/md';

export function TaskParticipationStatus({
  taskId,
  status,
  updatedAt,
}: {
  taskId: number;
  status?: Status;
  updatedAt?: Date;
}) {
  const label = 'Participation status';
  const { mutate } = useSendTaskParticipationRequest(taskId);
  const [message, setMessage] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(message);
  };

  if (status && updatedAt) {
    if (status === 'pending') {
      return (
        <Alert
          title={label}
          description={`Pending at ${fullDate(updatedAt)}`}
          variant="faded"
          className="mt-6"
          color="primary"
        />
      );
    }
    if (status === 'accepted') {
      return (
        <Alert
          title={label}
          description={`Accepted at ${fullDate(updatedAt)}`}
          variant="faded"
          className="mt-6"
          color="secondary"
        />
      );
    }
    if (status === 'declined') {
      return (
        <Alert
          title={label}
          description={`Declined at ${fullDate(updatedAt)}`}
          variant="faded"
          className="mt-6"
          color="danger"
        />
      );
    }
    if (status === 'completed') {
      return (
        <Alert
          title={label}
          description={`Completed at ${fullDate(updatedAt)}`}
          variant="faded"
          className="mt-6"
          color="success"
        />
      );
    }
  }

  return (
    <div className="bg-foreground-50 py-2 px-4 rounded-lg mt-4">
      <div className="flex items-center gap-1 text-foreground-600">
        <MdInfoOutline />
        <div>You can send a request to participate in this task</div>
      </div>
      <Form onSubmit={onSubmit}>
        <Input
          value={message}
          className="mt-2"
          label="Leave a short message (optional)"
          minLength={10}
          maxLength={500}
          size="sm"
          variant="faded"
          endContent={
            <Button
              type="submit"
              variant="flat"
              isIconOnly
              size="sm"
            >
              <MdSend />
            </Button>
          }
          onValueChange={setMessage}
        />
      </Form>
    </div>
  );
}
