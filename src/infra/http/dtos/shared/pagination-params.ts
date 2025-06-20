import * as z from 'zod/v4';

export const paginationParamsSchema = z.object({
  page: z.coerce
    .number()
    .int()
    .positive()
    .default(1)
    .describe('The current page'),
  limit: z.coerce
    .number()
    .int()
    .positive()
    .default(10)
    .describe('The number of items per page'),
});
