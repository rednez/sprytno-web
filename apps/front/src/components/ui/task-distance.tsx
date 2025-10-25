import { distance } from '@/utils/formatters';

export default function TaskDistance({ meters }: { meters: number }) {
  return (
    <div className="text-xs text-gray-500 shrink-0">{distance(meters)}</div>
  );
}
