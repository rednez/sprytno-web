import { ParticipationStatus } from '@/types';
import { Chip } from '@heroui/chip';
import { FaRegCheckCircle } from 'react-icons/fa';
import { GrCircleQuestion } from 'react-icons/gr';
import { ImCancelCircle } from 'react-icons/im';
import { RiProgress2Line } from 'react-icons/ri';

export function ParticipationStatusChip({
  status,
}: {
  status: ParticipationStatus;
}) {
  const color =
    status === 'accepted'
      ? 'secondary'
      : status === 'pending'
        ? 'primary'
        : status === 'declined'
          ? 'danger'
          : status === 'completed'
            ? 'success'
            : 'default';

  const icon =
    status === 'accepted' ? (
      <RiProgress2Line />
    ) : status === 'pending' ? (
      <GrCircleQuestion />
    ) : status === 'declined' ? (
      <ImCancelCircle />
    ) : status === 'completed' ? (
      <FaRegCheckCircle />
    ) : null;

  return (
    <Chip
      variant="flat"
      size="sm"
      color={color}
      startContent={icon}
    >
      {status}
    </Chip>
  );
}
