import { createParticipationsRepository } from '@/lib/repositories/participations';
import { ErrorParser, UnexpectedError } from '@/lib/utils/errors';
import { createParticipationsParamsValidator } from '@/lib/validators/participations';

import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const repository = await createParticipationsRepository();

  try {
    const validator = createParticipationsParamsValidator();
    const validatedParams = validator.validateParticipationDetailsParams(
      request.nextUrl.searchParams,
    );

    if (validatedParams.ok) {
      const result = await repository.getParticipationDetails({
        participationId: parseInt(id),
        ...validatedParams.data,
      });

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
