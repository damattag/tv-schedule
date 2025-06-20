import * as z from 'zod/v4';
import { metaSchema } from './meta';

export function manyResponse<T>(schema: z.ZodSchema<T>) {
  return z.object({
    data: z.array(schema),
    meta: metaSchema,
  });
}
