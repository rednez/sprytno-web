'use client';

import { useParticipationMessages } from '@/hooks/participations';
import { useSendTaskParticipationMessage } from '@/hooks/tasks';
import { fullDate } from '@/utils/formatters/full-date';
import { Alert, Button, Form, ScrollShadow, Textarea } from '@heroui/react';
import { useState } from 'react';
import { MdSend } from 'react-icons/md';

const maxMessageLength = 1000;

export function ParticipationMessages({
  participationId,
  readOnly,
}: {
  participationId: number;
  readOnly: boolean;
}) {
  const [message, setMessage] = useState('');
  const {
    data,
    error: messagesError,
    isError: isErrorMessages,
  } = useParticipationMessages(participationId);

  const { mutate: sendMessage, isPending: isMessageSending } =
    useSendTaskParticipationMessage(participationId);

  if (isErrorMessages) {
    return (
      <Alert
        title="Fail to load messages"
        description={messagesError.message}
        color="danger"
      />
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  return (
    <div className="mt-4">
      {!!data?.length && (
        <div>
          <div className="text-sm text-foreground-500">Messages</div>
          <ScrollShadow
            hideScrollBar
            className="max-h-[400px] flex flex-col gap-2 mt-2"
          >
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
          </ScrollShadow>
        </div>
      )}

      {!readOnly && (
        <Form onSubmit={onSubmit}>
          <Textarea
            value={message}
            className="mt-3"
            label="Send a message"
            required
            maxLength={maxMessageLength}
            size="sm"
            minRows={2}
            disabled={isMessageSending}
            endContent={
              <div className="flex items-center gap-2">
                {message.length > maxMessageLength - 20 && (
                  <span className="text-sm text-foreground-500">
                    {message.length}/{maxMessageLength}
                  </span>
                )}
                <Button
                  type="submit"
                  variant="flat"
                  isIconOnly
                  size="lg"
                >
                  <MdSend />
                </Button>
              </div>
            }
            onValueChange={setMessage}
          />
        </Form>
      )}
    </div>
  );
}
