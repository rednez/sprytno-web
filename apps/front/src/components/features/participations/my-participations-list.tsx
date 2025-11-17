import { ParticipationCard } from '@/components/ui';
import { createParticipationsRepository } from '@/lib/repositories/participations';
import { Alert } from '@heroui/alert';

export default async function MyParticipationsList() {
  const repository = await createParticipationsRepository();
  const { data, error, ok } = await repository.getMyParticipations();

  if (!ok) {
    return (
      <Alert
        title="Error loading my tasks"
        description={error.message}
        color="danger"
      />
    );
  }

  if (!data?.length) {
    return (
      <Alert
        color="primary"
        title="You have no participations yet"
        description="To create a new one, send a participation request for one of the tasks on the Explore tab."
        variant="faded"
      />
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 items-center">
      {data.map(({ id, status, task }) => (
        <ParticipationCard
          key={id}
          id={id}
          status={status}
          task={task}
        />
      ))}
    </div>
  );
}
