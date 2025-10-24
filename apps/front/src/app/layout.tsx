import Providers from '@/providers/providers';
import ThemeProviders from '@/providers/theme-providers';
import '@/styles/globals.css';
import type { Metadata } from 'next';

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
          <ThemeProviders>{children}</ThemeProviders>
        </Providers>
      </body>
    </html>
  );
}
