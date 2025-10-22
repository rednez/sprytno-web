'use client';

import {
  Navbar as HeroNavbar,
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import SprytnoLogo from '../../ui/sprytno-logo';
import NavbarAvatarMenu from './navbar-avatar-menu';

const pages = [
  { name: 'Tasks', href: '/tasks' },
  { name: 'Projects', href: '/projects' },
  { name: 'Teams', href: '/teams' },
];

export default function Navbar({
  email,
  fullName,
  avatarUrl,
  logout,
}: {
  email: string;
  fullName: string;
  avatarUrl: string;
  logout: () => Promise<void>;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <HeroNavbar
      onMenuOpenChange={setIsMenuOpen}
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
        {pages.map((item) => (
          <NavbarItem
            key={item.href}
            isActive={pathname.includes(item.href)}
          >
            <Link
              href={item.href}
              className="text-gray-700 dark:text-gray-400"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <NavbarAvatarMenu
            fullName={fullName}
            avatarUrl={avatarUrl}
            email={email}
            onLogout={logout}
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {pages.map((item) => (
          <NavbarMenuItem
            key={item.href}
            isActive={pathname.includes(item.href)}
          >
            <Link
              href={item.href}
              className="text-gray-700 dark:text-gray-400"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroNavbar>
  );
}
