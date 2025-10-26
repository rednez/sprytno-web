import { TaskType } from '@/types/task';
import { Chip } from '@heroui/chip';

export function TaskTypeChip({ type }: { type: TaskType }) {
  return (
    <Chip
      variant="flat"
      size="sm"
      color={type === 'offer' ? 'warning' : 'success'}
    >
      {type}
    </Chip>
  );
}
