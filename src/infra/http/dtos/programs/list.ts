import { SchemasObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import * as z from 'zod/v4';
import { getProgramByIdSchema } from '@/infra/http/dtos/programs/get-by-id';
import { manyResponse } from '@/infra/http/dtos/shared/many-response';
import { paginationParamsSchema } from '@/infra/http/dtos/shared/pagination-params';
import { ZodValidationPipe } from '@/infra/http/pipes';

const listProgramsQueryParamsSchema = paginationParamsSchema.extend({
  search: z.string().optional().describe('The search query'),
  initial_date: z.coerce.date().optional().describe('The initial date'),
  final_date: z.coerce.date().optional().describe('The final date'),
});

export type ListProgramsQueryParams = z.infer<
  typeof listProgramsQueryParamsSchema
>;

export const listProgramsQueryParamsValidationPipe = new ZodValidationPipe(
  listProgramsQueryParamsSchema,
);

export const listProgramsQueryParamsSwaggerSchema = z.toJSONSchema(
  listProgramsQueryParamsSchema.extend({
    initial_date: z.iso.datetime().optional().describe('The initial date'),
    final_date: z.iso.datetime().optional().describe('The final date'),
  }),
) as SchemasObject;

export const listProgramsResponseSchema = manyResponse(getProgramByIdSchema);

export type ListProgramsResponse = z.infer<typeof listProgramsResponseSchema>;

export const listProgramsResponseSwaggerSchema = z.toJSONSchema(
  listProgramsResponseSchema,
) as SchemasObject;
