'use client';

import { Link } from '@heroui/link';
import { NavbarMenuItem } from '@heroui/navbar';
import { usePathname } from 'next/navigation';

export default function NavbarMenuLinks({
  pages,
}: {
  pages: Array<{ name: string; href: string }>;
}) {
  const pathname = usePathname();

  return pages.map((item) => (
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
  ));
}
