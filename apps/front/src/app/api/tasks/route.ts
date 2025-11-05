import { createTasksRepository } from '@/lib/repositories/tasks';
import { ErrorParser, UnexpectedError } from '@/lib/utils/errors';
import { createTasksParamsValidator } from '@/lib/validators/tasks';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const repository = await createTasksRepository();

  try {
    const validator = createTasksParamsValidator();
    const validatedParams = validator.validateNearbyTasksParams(
      request.nextUrl.searchParams,
    );

    if (validatedParams.ok) {
      const result = await repository.getNearbyTasks(validatedParams.data);

      if (result.ok) {
        return Response.json(result.data);
      } else {
        return Response.json(ErrorParser.fromError(result.error).parse(), {
          status: 400,
        });
      }
    } else {
      return Response.json(
        ErrorParser.fromError(validatedParams.error).parse(),
        {
          status: 400,
        },
      );
    }
  } catch (error) {
    return Response.json(
      ErrorParser.fromError(new UnexpectedError(error)).parse(),
      {
        status: 500,
      },
    );
  }
}
