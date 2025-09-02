'use client';

import { usePathname } from 'next/navigation';
import TopNavbar from './top-navbar';

interface ConditionalNavbarProps {
  onLogout: () => void;
}

export default function ConditionalNavbar({
  onLogout,
}: ConditionalNavbarProps) {
  const pathname = usePathname();

  if (pathname === '/login') {
    return null;
  }

  return <TopNavbar onLogout={onLogout} />;
}
