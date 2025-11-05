import DynamicCreateTaskView from '@/components/features/tasks/dynamic-create-task-view';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Suspense } from 'react';

export default async function CreateMyTask() {
  return (
    <Card className="mt-4 mb-6 sm:px-8">
      <CardHeader>
        <h1 className="text-xl font-medium">Create Task</h1>
      </CardHeader>
      <CardBody className="mb-4">
        <Suspense fallback={<div>...</div>}>
          <DynamicCreateTaskView />
        </Suspense>
      </CardBody>
    </Card>
  );
}
