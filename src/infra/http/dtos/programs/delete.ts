import * as z from 'zod/v4';
import { ZodValidationPipe } from '@/infra/http/pipes';

export const deleteProgramParamsSchema = z.object({
  id: z.uuidv4().describe('The id of the program'),
});

export type DeleteProgramParams = z.infer<typeof deleteProgramParamsSchema>;

export const deleteProgramParamsValidationPipe = new ZodValidationPipe(
  deleteProgramParamsSchema,
);
