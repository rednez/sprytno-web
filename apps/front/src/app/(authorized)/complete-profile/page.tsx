'use client';

import { completeProfile } from '@/actions/users';
import { AvatarSelector } from '@/components/ui';
import { useMe } from '@/hooks/users';
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Form,
  Input,
} from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Profile() {
  const [nickname, setNickname] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState({});

  const { refetch } = useMe();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    if (!!nickname && !!avatarUrl) {
      const { errors } = await completeProfile({ nickname, avatarUrl });
      if (errors) {
        setErrors(errors);

        if (errors.other) {
          addToast({
            title: 'Failed operation',
            description: errors.other,
            color: 'warning',
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
    <Card className="max-w-md m-auto mt-4">
      <CardHeader>
        <h4 className="text-lg font-medium">Complete Profile</h4>
      </CardHeader>

      <CardBody>
        <Form
          className="flex flex-col"
          validationErrors={errors}
          onSubmit={onSubmit}
        >
          <Input
            value={nickname}
            isRequired
            label="Nickname"
            labelPlacement="outside"
            name="nickname"
            placeholder="Enter your nickname"
            description="The nickname will be visible for all users"
            type="text"
            size="lg"
            validate={(value) => {
              if (value.length < 5) {
                return 'Nickname must be at least 5 characters long';
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
      </CardBody>
    </Card>
  );
}
