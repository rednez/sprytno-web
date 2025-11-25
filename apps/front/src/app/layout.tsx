import Providers from '@/providers/providers';
import ThemeProviders from '@/providers/theme-providers';
import '@/styles/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
});

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
    <html
      suppressHydrationWarning
      className={roboto.className}
    >
      <body>
        <Providers>
          <ThemeProviders>{children}</ThemeProviders>
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
