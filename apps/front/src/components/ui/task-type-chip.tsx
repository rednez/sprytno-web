import { TaskType } from '@/types/task';
import { Chip } from '@heroui/react';

export default function TaskTypeChip({ type }: { type: TaskType }) {
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
