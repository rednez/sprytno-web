import { UserMenu } from '@/components/features/user-menu';
import { SprytnoLogo } from '@/components/ui';
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
  { name: 'Interested Tasks', href: '/interested-tasks' },
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
        <NavbarLinks pages={pages} />
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <UserMenu />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarLinks pages={pages} />
      </NavbarMenu>
    </HeroNavbar>
  );
}
