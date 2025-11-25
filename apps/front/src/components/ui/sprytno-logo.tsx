import { Oswald } from 'next/font/google';

const oswald = Oswald({
  subsets: ['latin'],
  weight: '500',
});

export function SprytnoLogo() {
  return (
    <div className="flex items-center gap-1">
      <h3 className={`text-2xl ${oswald.className}`}>sprytno</h3>
      <small className="text-xs font-light">Preview</small>
    </div>
  );
}
