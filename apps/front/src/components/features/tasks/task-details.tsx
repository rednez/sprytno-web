import TaskDistance from '@/components/ui/task-distance';
import TaskRepeatingInfo from '@/components/ui/task-repeating-info';
import TaskTypeChip from '@/components/ui/task-type-chip';
import { ZodTasksParser } from '@/lib/parsers/tasks';
import { SupabaseTasksRepository } from '@/lib/repositories/tasks';
import { createClient } from '@/lib/utils/supabase/server';
import { stringToNumber } from '@/lib/validation-schemas';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { User } from '@heroui/user';
import * as z from 'zod';

const ParamsSchema = z.object({
  taskId: stringToNumber,
  currentLat: stringToNumber,
  currentLng: stringToNumber,
});

export default async function TaskDetails(params: {
  taskId: Promise<string>;
  currentCoords: Promise<{ lat: string; lng: string }>;
}) {
  const supabase = await createClient();
  const tasksParser = new ZodTasksParser();
  const repository = new SupabaseTasksRepository(supabase, tasksParser);

  const taskId = await params.taskId;
  const { lat: currentLat, lng: currentLng } = await params.currentCoords;
  const parsedParams = ParamsSchema.parse({ taskId, currentLat, currentLng });
  const task = await repository.getPublicTaskDetailsById(parsedParams);

  return (
    <Card className="mt-6 max-w-xl mx-auto">
      <CardHeader>
        <User
          name={task.user.publicDetails.nickname}
          avatarProps={{
            src: task.user.publicDetails.avatarUrl || '',
            name: task.user.publicDetails.nickname,
          }}
        />
      </CardHeader>

      <CardBody>
        <h4 className="text-lg font-medium">{task.title}</h4>
        <p className="mt-1 text-base">{task.description}</p>
      </CardBody>

      <CardFooter className="gap-1">
        <TaskTypeChip type={task.type} />
        <Divider
          orientation="vertical"
          className="h-4"
        />
        <TaskDistance meters={task.distanceMeters} />

        {!!task.repeatedDays.length && (
          <>
            <Divider
              orientation="vertical"
              className="h-4"
            />
            <TaskRepeatingInfo repeatedDays={task.repeatedDays} />
          </>
        )}
      </CardFooter>
    </Card>
  );

  // catch (error) {
  //     if (error instanceof z.ZodError) {
  //       return (
  //         <div>
  //           <div>Failed query params parsing</div>
  //           <pre>{JSON.stringify(error.issues, null, 2)}</pre>
  //         </div>
  //       );
  //     } else {
  //       return (
  //         <pre>
  //           {JSON.stringify(
  //             {
  //               error:
  //                 error instanceof Error ? error.message : 'Unexpected error',
  //             },
  //             null,
  //             2,
  //           )}
  //         </pre>
  //       );
  //     }
  //   }
}
