'use client';

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
import { MdLogout as LogoutIcon } from 'react-icons/md';

export default function ClientUserMenu({
  name,
  email,
  avatarUrl,
  logout,
}: {
  name: string;
  email: string;
  avatarUrl: string;
  logout: () => void;
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
              name={name}
              description={email}
            />
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Logout">
          <DropdownItem
            key="logout"
            endContent={<LogoutIcon className="text-large" />}
            onPress={logout}
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
