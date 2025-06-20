import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { EnvModule, envSchema } from '@/infra/env';
import { AppAuthGuard } from './auth';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    EnvModule,
    DatabaseModule,
    HttpModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AppAuthGuard,
    },
  ],
})
export class AppModule {}
