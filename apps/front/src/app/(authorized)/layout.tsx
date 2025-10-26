import { Navbar } from '@/components/layout/navbar';

export default function AuthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4">{children}</div>
    </div>
  );
}
