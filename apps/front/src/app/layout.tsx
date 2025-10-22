import { logout } from '@/actions/auth';
import Navbar from '@/components/layout/navbar';
import { createClient } from '@/lib/utils/supabase/server';
import Providers from '@/providers/providers';
import ThemeProviders from '@/providers/theme-providers';
import '@/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sprytno Web Preview',
  description: 'Sprytno Web Preview',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const email = (user?.user_metadata['email'] as string) || '';
  const fullName = (user?.user_metadata['full_name'] as string) || '';
  const avatarUrl = (user?.user_metadata['avatar_url'] as string) || '';

  return (
    <html suppressHydrationWarning>
      <body>
        <Providers>
          <ThemeProviders>
            {user && (
              <Navbar
                email={email}
                fullName={fullName}
                avatarUrl={avatarUrl}
                logout={logout}
              />
            )}
            <div className="max-w-[1024px] mx-auto px-4">{children}</div>
          </ThemeProviders>
        </Providers>
      </body>
    </html>
  );
}
