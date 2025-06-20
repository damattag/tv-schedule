import * as z from 'zod/v4';

export function oneResponse<T>(schema: z.ZodSchema<T>) {
  return z.object({
    data: schema,
  });
}
