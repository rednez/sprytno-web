'use client';

import { Tab, Tabs } from '@heroui/react';
import { usePathname } from 'next/navigation';

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div>
      <div className="flex justify-center">
        <Tabs
          aria-label="Tasks tabs"
          selectedKey={pathname}
        >
          <Tab
            href="/tasks/explore"
            key="/tasks/explore"
            title="Explore"
          />
          <Tab
            href="/tasks/my-tasks"
            key="/tasks/my-tasks"
            title="My Tasks"
          />
          <Tab
            href="/tasks/favorites"
            key="/tasks/favorites"
            title="Favorites"
          />
        </Tabs>
      </div>

      {children}
    </div>
  );
}
