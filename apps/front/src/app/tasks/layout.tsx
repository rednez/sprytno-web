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
            href="/tasks/nearby"
            key="/tasks/nearby"
            title="Nearby"
          />
          <Tab
            href="/tasks/my"
            key="/tasks/my"
            title="Created by me"
          />
          <Tab
            href="/tasks/picked"
            key="/tasks/picked"
            title="Picked tasks"
          />
        </Tabs>
      </div>

      {children}
    </div>
  );
}
