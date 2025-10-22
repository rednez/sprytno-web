import { distance } from '@/utils/formatters';

export default function TaskDistance({ meters }: { meters: number }) {
  return <div className="text-xs text-gray-500">{distance(meters)}</div>;
}
