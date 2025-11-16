'use client';

import {
  useAcceptTaskParticipation,
  useDeclineTaskParticipation,
} from '@/hooks/tasks';
import { TaskParticipationStatus } from '@/types';
import { fullDate } from '@/utils/formatters/full-date';
import { Button, User } from '@heroui/react';
import { MdClose, MdDone } from 'react-icons/md';

export function MyTaskParticipationDetails({
  taskId,
  participationId,
  nickname,
  avatarUrl,
  updatedAt,
  status,
}: {
  taskId: number;
  participationId: number;
  nickname: string;
  avatarUrl: string | null;
  updatedAt: Date;
  status: TaskParticipationStatus;
}) {
  const { mutate: acceptParticipation, isPending: isAccepting } =
    useAcceptTaskParticipation(taskId, participationId);

  const { mutate: declineParticipation, isPending: isDeclining } =
    useDeclineTaskParticipation(taskId, participationId);

  return (
    <div className="flex gap-6">
      <User
        avatarProps={{
          src: avatarUrl || undefined,
        }}
        name={nickname}
        description={`Updated on ${fullDate(updatedAt)}`}
        className="self-start"
      />
      <div className="flex items-center gap-2 justify-end">
        {status === 'pending' && (
          <Button
            aria-label="accept-participation"
            variant="flat"
            color="success"
            isIconOnly
            size="sm"
            className="rounded-full"
            disabled={isAccepting || isDeclining}
            onPress={() => acceptParticipation()}
          >
            <MdDone />
          </Button>
        )}

        {(status === 'pending' || status === 'accepted') && (
          <Button
            aria-label="decline-participation"
            variant="flat"
            color="danger"
            isIconOnly
            size="sm"
            className="rounded-full"
            disabled={isAccepting || isDeclining}
            onPress={() => declineParticipation()}
          >
            <MdClose />
          </Button>
        )}
      </div>
    </div>
  );
}
