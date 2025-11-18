'use client';

import { logout } from '@/actions/auth';
import { UserAvatarSkeleton } from '@/components/ui';
import { useMe } from '@/hooks/users';
import { Avatar } from '@heroui/avatar';
import { Button } from '@heroui/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@heroui/dropdown';
import { User } from '@heroui/user';
import { useRouter } from 'next/navigation';
import { MdLogout } from 'react-icons/md';
import { TbUserEdit } from 'react-icons/tb';

export function UserMenu() {
  const { data, isPending, isError } = useMe();
  const router = useRouter();

  function redirectToProfile() {
    router.push('/complete-profile');
  }

  if (isPending) {
    return <UserAvatarSkeleton />;
  }

  if (isError) {
    return (
      <Avatar
        color="danger"
        name="N A"
      />
    );
  }

  const nickname = data?.publicDetails.nickname;
  const avatarUrl = data?.publicDetails.avatarUrl;
  const email = data?.privateDetails?.email;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          disableRipple
          radius="full"
        >
          <Avatar
            name={nickname || email || undefined}
            src={avatarUrl || ''}
            showFallback
          />
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="profile-menu"
        disabledKeys={['profile']}
      >
        <DropdownSection
          showDivider
          aria-label="Profile"
        >
          <DropdownItem
            key="profile"
            isReadOnly
            className="text-base opacity-100"
            textValue="userProfile"
          >
            <User
              avatarProps={{
                size: 'sm',
                src: avatarUrl || '',
                showFallback: true,
                name: nickname || email || undefined,
              }}
              classNames={{
                name: 'text-default-600',
                description: 'text-default-500',
              }}
              name={nickname}
              description={email}
            />
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Actions">
          {!data.isProfileCompleted ? (
            <DropdownItem
              key="completeProfile"
              endContent={<TbUserEdit className="text-large" />}
              className="text-orange-500"
              onPress={redirectToProfile}
            >
              Complete Profile
            </DropdownItem>
          ) : null}

          <DropdownItem
            key="logout"
            endContent={<MdLogout className="text-large" />}
            onPress={logout}
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
