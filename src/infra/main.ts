import 'reflect-metadata';
import { type INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppEnvironment, corsOptions } from './config/cors';
import { openApi } from './config/docs';
import { EnvService } from './env';

let app: INestApplication | null = null;

async function bootstrap() {
  app = await NestFactory.create(AppModule);

  const configService = app.get(EnvService);

  app.enableCors(corsOptions);

  const appPort = configService.get('API_PORT');
  const appEnv = configService.get('NODE_ENV');

  if (appEnv !== AppEnvironment.PRODUCTION) {
    openApi(app);
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableShutdownHooks();

  await app.listen(appPort, () => {
    Logger.log(`Server running on http://localhost:${appPort}`, 'NestApplication');

    if (appEnv !== AppEnvironment.PRODUCTION) {
      Logger.log(
        `Swagger docs available at: http://localhost:${appPort}/docs`,
        'NestApplication',
      );
    }
  });
}
bootstrap();
