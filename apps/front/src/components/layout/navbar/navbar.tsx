import { UserMenu } from '@/components/features/user-menu';
import { SprytnoLogo, UserAvatarSkeleton } from '@/components/ui';
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from '@heroui/navbar';
import { Suspense } from 'react';
import NavbarLinks from './navbar-top-links';

const pages = [
  { name: 'Explore', href: '/explore' },
  { name: 'My Tasks', href: '/my-tasks' },
  { name: 'Favorites', href: '/favorites' },
];

export function Navbar() {
  return (
    <HeroNavbar
      classNames={{
        item: [
          'data-[active=true]:bg-gray-100',
          'data-[active=true]:dark:bg-gray-800',
          'data-[active=true]:p-1',
          'data-[active=true]:rounded-lg',
          'data-[active=true]:font-normal',
        ],
        menuItem: [
          'data-[active=true]:bg-gray-100',
          'data-[active=true]:dark:bg-gray-800',
          'data-[active=true]:p-1',
          'data-[active=true]:rounded-lg',
          'data-[active=true]:font-normal',
        ],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand className="hidden sm:block">
          <SprytnoLogo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:hidden">
        <NavbarBrand>
          <SprytnoLogo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      >
        <Suspense fallback={<div>...</div>}>
          <NavbarLinks pages={pages} />
        </Suspense>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Suspense fallback={<UserAvatarSkeleton />}>
            <UserMenu />
          </Suspense>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarLinks pages={pages} />
      </NavbarMenu>
    </HeroNavbar>
  );
}
