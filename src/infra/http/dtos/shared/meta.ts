import * as z from 'zod/v4';

export const metaSchema = z.object({
  total: z.number().describe('The total number of items'),
  page: z.number().describe('The current page'),
  listed: z.number().describe('The number of items per page'),
});
