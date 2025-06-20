import { SchemasObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import * as z from 'zod/v4';
import { ZodValidationPipe } from '@/infra/http/pipes';

const createProgramBodySchema = z.object({
  name: z.string().describe('The name of the program'),
  description: z.string().describe('The description of the program'),
  initial_date: z.coerce.date().describe('The initial date of the program'),
  final_date: z.coerce.date().describe('The final date of the program'),
});

export type CreateProgramBody = z.infer<typeof createProgramBodySchema>;

export const createProgramBodyValidationPipe = new ZodValidationPipe(
  createProgramBodySchema,
);

const createProgramBodySwaggerSchema = z.toJSONSchema(
  createProgramBodySchema.extend({
    initial_date: z.iso.datetime().describe('The initial date of the program'),
    final_date: z.iso.datetime().describe('The final date of the program'),
  }),
) as SchemasObject;

createProgramBodySwaggerSchema.properties['file'] = {
  type: 'string',
  format: 'binary',
};

export { createProgramBodySwaggerSchema };
