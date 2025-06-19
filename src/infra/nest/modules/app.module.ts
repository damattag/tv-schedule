import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvModule, envSchema } from '@/infra/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    EnvModule,
  ],
})
export class AppModule {}
