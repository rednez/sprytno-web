import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import type { Metadata } from 'next';
import { logout } from './actions';
import './globals.css';
import { Providers } from './providers';
import ConditionalNavbar from './ui/conditional-navbar';

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
          <InitColorSchemeScript attribute="class" />
          <ConditionalNavbar onLogout={logout} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
