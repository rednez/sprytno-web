import { CreateTaskForm } from '@/components/features/tasks';
import { v4 as uid } from 'uuid';

export default function CreateMyTask() {
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY as string;
  const googleMapsMapId = process.env.GOOGLE_MAPS_MAP_ID as string;

  return (
    <div className="mt-2 mb-6">
      <h1 className="text-xl font-medium mb-8">Create Task</h1>
      <CreateTaskForm
        key={uid()}
        googleMapsApiKey={googleMapsApiKey}
        googleMapsMapId={googleMapsMapId}
      />
    </div>
  );
}
