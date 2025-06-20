import { ConfigService } from '@nestjs/config';
import type { Env } from '@/infra/env';

export enum AppEnvironment {
  LOCAL = 'local',
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

const configService = new ConfigService<Env, true>();

const appEnv = configService.get('NODE_ENV');

const permitedUrls =
  appEnv === AppEnvironment.LOCAL
    ? ['*']
    : [configService.get('FRONT_DEPLOY_URL')];

export const corsOptions = {
  origin: permitedUrls,
};
