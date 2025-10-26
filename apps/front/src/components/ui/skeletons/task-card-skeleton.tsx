import { Card, CardBody } from '@heroui/card';
import { Skeleton } from '@heroui/skeleton';

export function TaskCardSkeleton() {
  return (
    <Card
      shadow="sm"
      disableRipple
      className="sm:max-w-sm"
    >
      <CardBody className="flex flex-col gap-1">
        <Skeleton className="h-5 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-3/4 rounded-lg" />
        <div className="flex gap-1 mt-2 items-center">
          <Skeleton className="h-4 w-10 rounded-lg" />
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton
              key={i}
              className="h-4 w-6 rounded-lg"
            />
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
