import { z } from 'zod';
import { AppEnvironment } from '@/infra/config/cors';

export const envSchema = z.object({
  NODE_ENV: z.nativeEnum(AppEnvironment).default(AppEnvironment.LOCAL),
  API_PORT: z.coerce.number().default(3001),

  DATABASE_URL: z.string(),

  FRONT_DEPLOY_URL: z.string().default(''),

  BASIC_USER: z.string().default('admin'),
  BASIC_PASS: z.string().default('VerySt0ngP4ss'),
});

export type Env = z.infer<typeof envSchema>;
