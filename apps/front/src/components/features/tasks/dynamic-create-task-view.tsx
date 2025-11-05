import { connection } from 'next/server';
import { CreateTaskForm } from './create-task-form';

export default async function DynamicCreateTaskView() {
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY as string;
  const googleMapsMapId = process.env.GOOGLE_MAPS_MAP_ID as string;

  await connection();

  const key = Date.now();

  return (
    <CreateTaskForm
      key={key}
      googleMapsApiKey={googleMapsApiKey}
      googleMapsMapId={googleMapsMapId}
    />
  );
}
