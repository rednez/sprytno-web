'use client';

import { NavbarItem } from '@heroui/navbar';
import { Link } from '@heroui/link';
import { usePathname } from 'next/navigation';

export default function NavbarTopLinks({
  pages,
}: {
  pages: Array<{ name: string; href: string }>;
}) {
  const pathname = usePathname();

  return pages.map((item) => (
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
  ));
}
