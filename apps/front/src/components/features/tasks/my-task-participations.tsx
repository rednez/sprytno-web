'use client';

import { TaskParticipationsSkeleton } from '@/components/ui';
import { useMyTaskParticipations } from '@/hooks/tasks';
import { TaskParticipation } from '@/types';
import { Alert, Avatar, Chip } from '@heroui/react';
import { useState } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { GrCircleQuestion } from 'react-icons/gr';
import { ImCancelCircle } from 'react-icons/im';
import { RiProgress2Line } from 'react-icons/ri';
import { MyTaskParticipationDetails } from './my-task-participation-details';
import { MyTaskParticipationMessages } from './my-task-participation-messages';

export function MyTaskParticipations({ taskId }: { taskId: number }) {
  const [selectedParticipationId, setSelectedParticipationId] = useState<
    number | null
  >(null);

  const { data, isError, error, isPending } = useMyTaskParticipations(taskId);

  if (isPending) {
    return (
      <div className="mt-8">
        <TaskParticipationsSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert
        title="Fail to load participations"
        description={error.message}
        color="danger"
      />
    );
  }

  if (!data.length) {
    return (
      <Alert
        title="You have no participations yet"
        className="mt-6"
        variant="faded"
      />
    );
  }

  const acceptedList = data.filter((i) => i.status === 'accepted');
  const pendingList = data.filter((i) => i.status === 'pending');
  const declinedList = data.filter((i) => i.status === 'declined');
  const completedList = data.filter((i) => i.status === 'completed');
  const selectedParticipation = data.find(
    (i) => i.id === selectedParticipationId,
  );

  function handleAvatarClick(participation: TaskParticipation) {
    if (selectedParticipationId !== participation.id) {
      setSelectedParticipationId(participation.id);
    } else {
      setSelectedParticipationId(null);
    }
  }

  return (
    <div className="mt-6">
      <div className="text-base text-primary-500 font-medium mb-2">
        Participations
      </div>
      <div>
        <div className="flex gap-6">
          {acceptedList.length > 0 && (
            <div>
              <Chip
                color="secondary"
                variant="light"
                startContent={<RiProgress2Line />}
              >
                Accepted
              </Chip>

              <div className="flex flex-wrap gap-4 mt-3">
                {acceptedList.map((i) => (
                  <Avatar
                    key={i.id}
                    src={i.user.avatarUrl || undefined}
                    color={
                      selectedParticipation?.id === i.id ? 'primary' : undefined
                    }
                    isBordered
                    onClick={() => handleAvatarClick(i)}
                  />
                ))}
              </div>
            </div>
          )}

          {pendingList.length > 0 && (
            <div>
              <Chip
                color="primary"
                variant="light"
                startContent={<GrCircleQuestion />}
              >
                Pending
              </Chip>

              <div className="flex flex-wrap gap-4 mt-3">
                {pendingList.map((i) => (
                  <Avatar
                    key={i.id}
                    src={i.user.avatarUrl || undefined}
                    color={
                      selectedParticipation?.id === i.id ? 'primary' : undefined
                    }
                    isBordered
                    onClick={() => handleAvatarClick(i)}
                  />
                ))}
              </div>
            </div>
          )}

          {completedList.length > 0 && (
            <div>
              <Chip
                color="success"
                variant="light"
                startContent={<FaRegCheckCircle />}
              >
                Completed
              </Chip>

              <div className="flex flex-wrap gap-4 mt-3">
                {completedList.map((i) => (
                  <Avatar
                    key={i.id}
                    src={i.user.avatarUrl || undefined}
                    color={
                      selectedParticipation?.id === i.id ? 'primary' : undefined
                    }
                    isBordered
                    onClick={() => handleAvatarClick(i)}
                  />
                ))}
              </div>
            </div>
          )}

          {declinedList.length > 0 && (
            <div>
              <Chip
                color="danger"
                variant="light"
                startContent={<ImCancelCircle />}
              >
                Declined
              </Chip>

              <div className="flex flex-wrap gap-4 mt-3">
                {declinedList.map((i) => (
                  <Avatar
                    key={i.id}
                    src={i.user.avatarUrl || undefined}
                    color={
                      selectedParticipation?.id === i.id ? 'primary' : undefined
                    }
                    isBordered
                    onClick={() => handleAvatarClick(i)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {!!selectedParticipation && (
          <div className="mt-8">
            <MyTaskParticipationDetails
              taskId={taskId}
              participationId={selectedParticipation.id}
              nickname={selectedParticipation.user.nickname}
              avatarUrl={selectedParticipation.user.avatarUrl}
              status={selectedParticipation.status}
              updatedAt={selectedParticipation.updatedAt}
            />
            <MyTaskParticipationMessages
              taskId={taskId}
              participationId={selectedParticipation.id}
              readOnly={
                selectedParticipation.status === 'completed' ||
                selectedParticipation.status === 'declined'
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
