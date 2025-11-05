import { Card, CardBody, CardHeader } from '@heroui/card';
import { Skeleton } from '@heroui/skeleton';

export function TaskDetailsSkeleton() {
  return (
    <Card className="mt-6 max-w-xl mx-auto">
      <CardHeader>
        <Skeleton className="flex rounded-full w-12 h-12" />
      </CardHeader>
      <CardBody>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-5 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg mt-2" />
          <Skeleton className="h-80 w-full rounded-2xl mt-2" />
          <div className="mt-2 flex gap-2">
            <Skeleton className="h-3 w-8 rounded-lg" />
            <Skeleton className="h-3 w-8 rounded-lg" />
            <Skeleton className="h-3 w-8 rounded-lg" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
