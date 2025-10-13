import Navbar from '@/ui/navbar';
import type { Metadata } from 'next';
import { logout } from './actions';
import './globals.css';
import Providers from './providers';
import ThemeProviders from './theme-providers';

export const metadata: Metadata = {
  title: 'Sprytno Web Preview',
  description: 'Sprytno Web Preview',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Providers>
          <ThemeProviders>
            <Navbar logout={logout} />
            {children}
          </ThemeProviders>
        </Providers>
      </body>
    </html>
  );
}
