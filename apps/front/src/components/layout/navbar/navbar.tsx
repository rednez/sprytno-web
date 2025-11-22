'use client';

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
import { Suspense, useState } from 'react';
import NavbarMenuLinks from './navbar-menu-links';
import NavbarTopLinks from './navbar-top-links';

const pages = [
  { name: 'Explore', href: '/explore' },
  { name: 'My Tasks', href: '/my-tasks' },
  { name: 'Participations', href: '/participations' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemSelect = () => setIsMenuOpen(false);

  return (
    <HeroNavbar
      isMenuOpen={isMenuOpen}
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
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
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
        <Suspense>
          <NavbarMenuLinks pages={pages} />
        </Suspense>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <UserMenu />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarTopLinks
          pages={pages}
          onItemSelect={handleMenuItemSelect}
        />
      </NavbarMenu>
    </HeroNavbar>
  );
}
