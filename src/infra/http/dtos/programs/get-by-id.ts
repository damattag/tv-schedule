import { SchemasObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import * as z from 'zod/v4';
import { ZodValidationPipe } from '@/infra/http/pipes';
import { oneResponse } from '../shared/one-response';

export const getProgramByIdParamsSchema = z.object({
  id: z.uuidv4().describe('The id of the program'),
});

export type GetProgramByIdParams = z.infer<typeof getProgramByIdParamsSchema>;

export const getProgramByIdParamsValidationPipe = new ZodValidationPipe(
  getProgramByIdParamsSchema,
);

export const getProgramByIdParamsSwaggerSchema = z.toJSONSchema(
  getProgramByIdParamsSchema,
) as SchemasObject;

export const getProgramByIdSchema = z.object({
  id: z.uuidv4().describe('The id of the program'),
  name: z.string().describe('The name of the program'),
  description: z.string().describe('The description of the program'),
  exhibition_date: z.iso.date().describe('The exhibition date of the program'),
  start_time: z.iso.time().describe('The start time of the program'),
  end_time: z.iso.time().describe('The end time of the program'),
  banner_base64: z
    .string()
    .nullable()
    .describe('The banner url of the program'),
});

const getProgramByIdResponseSchema = oneResponse(getProgramByIdSchema);

export type GetProgramByIdResponse = z.infer<
  typeof getProgramByIdResponseSchema
>;

export const getProgramByIdResponseSwaggerSchema = z.toJSONSchema(
  getProgramByIdResponseSchema,
) as SchemasObject;
