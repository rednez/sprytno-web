'use client';

import { useMyTaskParticipations } from '@/hooks/tasks';
import { TaskParticipation } from '@/types';
import { Alert, Avatar, Chip } from '@heroui/react';
import { useState } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { MdOutlinePending } from 'react-icons/md';
import { MyTaskParticipationDetails } from './my-task-participation-details';

export function MyTaskParticipations({ taskId }: { taskId: number }) {
  const [selectedParticipation, setSelectedParticipation] =
    useState<TaskParticipation | null>(null);

  const { data, isError, error, isPending } = useMyTaskParticipations(taskId);

  if (isPending) {
    return <div>Loading participations...</div>;
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

  // const participants: Participation[] = [
  //   {
  //     id: '1',
  //     status: 'accepted',
  //     nickname: 'kiki1',
  //     avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  //     messages: [],
  //   },
  //   {
  //     id: '2',
  //     status: 'accepted',
  //     nickname: 'abram.linkoln',
  //     avatarUrl: 'https://i.pravatar.cc/150?u=a04258a2462d826712d',
  //     messages: [
  //       {
  //         id: 12,
  //         text: 'The first message',
  //         author: 'me',
  //         dateTime: new Date(),
  //       },
  //       {
  //         id: 1,
  //         text: 'Hello! I am on my way. Slslsk kslkd lsdlslkd jskdl ksdlk dslkl lksd ksdllsdk skdsdk ksldk ksd. lsldldl.',
  //         author: 'me',
  //         dateTime: new Date(),
  //       },
  //       {
  //         id: 2,
  //         text: 'The response is coming soon. Slsdklks osdlk 9093. lsdl ksdk lksdlk lsdkl ksldklkdsldsldlsldk. lsdkl ksdlk.',
  //         author: 'abram.linkoln',
  //         dateTime: new Date('2023-10-08T10:20:34Z'),
  //       },
  //       {
  //         id: 3,
  //         text: 'I am on my way',
  //         author: 'me',
  //         dateTime: new Date('2023-10-07T12:21:33Z'),
  //       },
  //     ],
  //   },
  //   {
  //     id: '13',
  //     status: 'pending',
  //     nickname: 'slut.ass2023',
  //     avatarUrl: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
  //     messages: [],
  //   },
  // ];

  const acceptedList = data.filter((i) => i.status === 'accepted');
  const pendingList = data.filter((i) => i.status === 'pending');

  function handleAvatarClick(participation: TaskParticipation) {
    if (selectedParticipation?.id !== participation.id) {
      setSelectedParticipation(participation);
    } else {
      setSelectedParticipation(null);
    }
  }

  return (
    <div className="mt-6">
      <div className="text-base mb-2">Participations</div>
      <div>
        <div className="flex gap-6">
          {acceptedList.length > 0 && (
            <div>
              <Chip
                color="success"
                variant="light"
                startContent={<FaRegCheckCircle />}
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
                startContent={<MdOutlinePending />}
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
        </div>

        {!!selectedParticipation && (
          <MyTaskParticipationDetails
            taskId={taskId}
            participation={selectedParticipation}
          />
        )}
      </div>
    </div>
  );
}
