import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import TopNavbar from './ui/top-navbar';

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
          <TopNavbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
