'use client';

import { completeProfile } from '@/actions/users';
import { AvatarSelector } from '@/components/ui';
import { useMe } from '@/hooks/users';
import { nicknameRegexp } from '@/utils/regexps';
import { addToast, Button, Divider, Form, Input } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function CompleteProfileForm() {
  const [nickname, setNickname] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState({});

  const router = useRouter();
  const { refetch } = useMe();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    if (!!nickname && !!avatarUrl) {
      const { error } = await completeProfile({ nickname, avatarUrl });
      if (error) {
        if (error.details.hasFields) {
          setFormErrors(error.details.fields);
        } else {
          addToast({
            title: 'Failed operation',
            description: error.message,
            color: 'danger',
          });
        }
      } else {
        await refetch();

        addToast({
          title: 'Profile completed',
          description: 'Yor profile has been successfully completed',
          color: 'success',
          timeout: 3000,
        });

        router.back();
      }
    }
  };

  return (
    <Form
      className="flex flex-col"
      validationErrors={formErrors}
      onSubmit={onSubmit}
    >
      <Input
        value={nickname}
        isRequired
        label="Nickname"
        labelPlacement="outside"
        name="nickname"
        placeholder="Enter your public nickname"
        description="The nickname can consists from 4-40 letters, numbers, spaces and _ - @ * ( ) ^ ~ & $ # ! '"
        type="text"
        size="lg"
        maxLength={40}
        validate={(value) => {
          if (!nicknameRegexp.test(value)) {
            return `Nickname don't match the pattern: 4-40 letters, numbers, spaces and _ - @ * ( ) ^ ~ & $ # ! '`;
          }
          return null;
        }}
        onValueChange={setNickname}
      />

      <Divider className="mt-6 mb-1" />

      <AvatarSelector
        isInvalid={!avatarUrl && submitted}
        onPick={setAvatarUrl}
      />

      <Button
        type="submit"
        variant="solid"
        color="primary"
        className="mt-9 mb-1 w-full"
      >
        Save
      </Button>
    </Form>
  );
}
