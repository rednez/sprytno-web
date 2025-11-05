import { TasksParamsValidator } from './tasks-params-validator.interface';
import { ZodTasksParamsValidator } from './zod-tasks-params-validator';

export function createTasksParamsValidator(): TasksParamsValidator {
  return new ZodTasksParamsValidator();
}
