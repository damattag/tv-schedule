import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvModule, envSchema } from '@/infra/env';
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
  ],
})
export class AppModule {}
