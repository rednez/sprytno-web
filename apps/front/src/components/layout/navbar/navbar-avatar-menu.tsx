'use client';

import styled from '@emotion/styled';
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from '@heroui/react';
import { MdLogout } from 'react-icons/md';

const LogoutIcon = styled(MdLogout)({
  marginRight: '12px',
});

export default function NavbarAvatarMenu({
  onLogout,
  fullName,
  email,
  avatarUrl,
}: {
  fullName: string;
  email: string;
  avatarUrl: string;
  onLogout: () => void;
}) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          disableRipple
          radius="full"
        >
          <Avatar
            alt="user"
            src={avatarUrl}
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
                src: avatarUrl,
              }}
              classNames={{
                name: 'text-default-600',
                description: 'text-default-500',
              }}
              name={fullName}
              description={email}
            />
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Logout">
          <DropdownItem
            key="logout"
            endContent={<LogoutIcon className="text-large" />}
            onPress={onLogout}
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
