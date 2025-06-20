import { SchemasObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import * as z from 'zod/v4';
import { ZodValidationPipe } from '@/infra/http/pipes';

const updateProgramParamsSchema = z.object({
  id: z.uuidv4().describe('The id of the program'),
});

export type UpdateProgramParams = z.infer<typeof updateProgramParamsSchema>;

export const updateProgramParamsValidationPipe = new ZodValidationPipe(
  updateProgramParamsSchema,
);

export const updateProgramBodySchema = z.object({
  name: z.string().describe('The name of the program'),
  description: z.string().describe('The description of the program'),
  initial_date: z.coerce.date().describe('The initial date of the program'),
  final_date: z.coerce.date().describe('The final date of the program'),
});

export type UpdateProgramBody = z.infer<typeof updateProgramBodySchema>;

export const updateProgramBodyValidationPipe = new ZodValidationPipe(
  updateProgramBodySchema,
);

const updateProgramBodySwaggerSchema = z.toJSONSchema(
  updateProgramBodySchema.extend({
    initial_date: z.iso.datetime().describe('The initial date of the program'),
    final_date: z.iso.datetime().describe('The final date of the program'),
  }),
) as SchemasObject;

updateProgramBodySwaggerSchema.properties['file'] = {
  type: 'string',
  format: 'binary',
};

export { updateProgramBodySwaggerSchema };
